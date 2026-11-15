import { execFile as execFileCallback } from 'node:child_process'
import { existsSync, readFileSync, renameSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { setTimeout as delay } from 'node:timers/promises'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'

const execFile = promisify(execFileCallback)
const OUTPUT_PATH = fileURLToPath(new URL('../src/data/citation-counts.json', import.meta.url))
const SCHOLAR_ORIGIN = 'https://scholar.google.com'
export const PROFILE_URL = 'https://scholar.google.com/citations?user=SvUCAeQAAAAJ&hl=en'
export const PUBLICATIONS = [
  {
    id: 'energy-2024',
    scholarId: 'SvUCAeQAAAAJ:u5HHmVD_uO8C',
    title: 'A Robust Adapted Flexible Parallel Neural Network Architecture for Early Prediction of Lithium Battery Lifespan',
  },
  {
    id: 'applied-energy-2025',
    scholarId: 'SvUCAeQAAAAJ:9yKSN-GCB0IC',
    title: 'Generating Comprehensive Lithium Battery Charging Data with Generative AI',
  },
]

function decodeEntities(value) {
  return value.replace(/&(?:amp|quot|apos|lt|gt|nbsp|#\d+|#x[\da-f]+);/gi, (entity) => {
    const named = { '&amp;': '&', '&quot;': '"', '&apos;': "'", '&lt;': '<', '&gt;': '>', '&nbsp;': ' ' }
    const key = entity.toLowerCase()
    if (named[key]) return named[key]
    const number = key.startsWith('&#x') ? parseInt(key.slice(3), 16) : parseInt(key.slice(2), 10)
    return number <= 0x10ffff ? String.fromCodePoint(number) : entity
  })
}

function attribute(attributes, name) {
  return decodeEntities(attributes.match(new RegExp(`(?:^|\\s)${name}\\s*=\\s*(["'])(.*?)\\1`, 'i'))?.[2] ?? '')
}

function elements(html, tag, className) {
  return [...html.matchAll(new RegExp(`<${tag}\\b([^>]*)>([\\s\\S]*?)<\\/${tag}>`, 'gi'))]
    .filter((match) => attribute(match[1], 'class').split(/\s+/).includes(className))
    .map((match) => ({ attributes: match[1], inner: match[2] }))
}

function plainText(html) {
  return decodeEntities(html.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim()
}

function sourceUrl(publication) {
  return `${SCHOLAR_ORIGIN}/citations?view_op=view_citation&hl=en&user=SvUCAeQAAAAJ&citation_for_view=${publication.scholarId}`
}

function scholarUrl(value, pathname) {
  const url = new URL(value, SCHOLAR_ORIGIN)
  if (url.origin !== SCHOLAR_ORIGIN || url.pathname !== pathname || url.username || url.password) {
    throw new Error('Google Scholar 来源链接不匹配')
  }
  return url
}

function checkAccess(html) {
  if (/g-recaptcha|unusual traffic|automated queries|\/sorry\/|id=["']captcha/i.test(html)) {
    throw new Error('Google Scholar 访问限制或验证码，停止请求')
  }
}

function citationRow(html, publication) {
  checkAccess(html)
  const clean = html.replace(/<!--[\s\S]*?-->/g, '').replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, '')
  const matches = elements(clean, 'tr', 'gsc_a_tr').flatMap((row) => {
    const title = elements(row.inner, 'a', 'gsc_a_at')[0]
    if (!title) return []
    const url = scholarUrl(attribute(title.attributes, 'href'), '/citations')
    return url.searchParams.get('citation_for_view') === publication.scholarId ? [{ row, title }] : []
  })
  if (matches.length !== 1) throw new Error('Google Scholar 论文记录缺失或重复')
  const { row, title } = matches[0]
  if (plainText(title.inner).toLowerCase() !== publication.title.toLowerCase()) {
    throw new Error('Google Scholar 论文标题与记录 ID 不匹配')
  }
  return row.inner
}

/** 从公开个人主页按记录 ID 和标题提取单篇计数，保留 Scholar 的估算星号。 */
export function parseCitationHtml(html, publication) {
  const row = citationRow(html, publication)
  const cells = elements(row, 'td', 'gsc_a_c')
  const anchors = cells.length === 1 ? elements(cells[0].inner, 'a', 'gsc_a_ac') : []
  const text = anchors.length === 1 ? plainText(anchors[0].inner) : ''
  const count = Number(text.replaceAll(',', ''))
  if (!/^(?:0|[1-9]\d*|[1-9]\d{0,2}(?:,\d{3})+)$/.test(text) || !Number.isSafeInteger(count)) {
    throw new Error('Google Scholar 引用数字缺失或无效')
  }
  const citedByUrl = scholarUrl(attribute(anchors[0].attributes, 'href'), '/scholar')
  if (!/^\d+(?:,\d+)*$/.test(citedByUrl.searchParams.get('cites') ?? '')) {
    throw new Error('Google Scholar 引用列表标识缺失')
  }
  const markers = elements(cells[0].inner, 'span', 'gsc_a_m').map((marker) => plainText(marker.inner))
  if (markers.some((marker) => marker !== '*')) throw new Error('Google Scholar 估算标记无效')
  return {
    count,
    estimated: markers.includes('*'),
    scholarId: publication.scholarId,
    source: 'Google Scholar',
    sourceUrl: sourceUrl(publication),
    citedByUrl: citedByUrl.href,
  }
}

async function requestProfile(execFileImpl, timeoutSeconds) {
  let stdout
  try {
    ({ stdout } = await execFileImpl('curl', [
      '--silent', '--show-error', '--max-time', String(timeoutSeconds),
      '--proto', '=https', '--write-out', '\n%{http_code}', PROFILE_URL,
    ], { maxBuffer: 2 * 1024 * 1024 }))
  } catch (error) {
    throw Object.assign(new Error(`Google Scholar 请求失败（curl ${error.code ?? 'unknown'}）`), {
      retryable: [5, 6, 7, 18, 28, 35, 52, 55, 56].includes(error.code),
    })
  }
  const status = Number(stdout.slice(stdout.lastIndexOf('\n') + 1))
  const html = stdout.slice(0, stdout.lastIndexOf('\n'))
  checkAccess(html)
  if (status !== 200) {
    throw Object.assign(new Error(`Google Scholar HTTP ${status}`), { retryable: status >= 500 && status <= 599 })
  }
  return html
}

/** 限时请求公开主页；仅临时网络和服务错误重试，访问限制立即停止。 */
export async function fetchScholarHtml({ execFile: execFileImpl = execFile, timeoutSeconds = 30, retryDelayMs = 2000 } = {}) {
  for (let attempt = 0; ; attempt += 1) {
    try {
      return await requestProfile(execFileImpl, timeoutSeconds)
    } catch (error) {
      if (!error.retryable || attempt === 2) throw error
      await delay(retryDelayMs)
    }
  }
}

function validCache(entry, publication) {
  try {
    const citedByUrl = scholarUrl(entry.citedByUrl, '/scholar')
    return Number.isSafeInteger(entry.count) && entry.count >= 0
      && typeof entry.estimated === 'boolean'
      && entry.source === 'Google Scholar' && entry.scholarId === publication.scholarId
      && entry.sourceUrl === sourceUrl(publication)
      && /^\d+(?:,\d+)*$/.test(citedByUrl.searchParams.get('cites') ?? '')
      && /^\d{4}-\d{2}-\d{2}$/.test(entry.verifiedAt)
      && new Date(entry.verifiedAt).toISOString().slice(0, 10) === entry.verifiedAt
  } catch {
    return false
  }
}

/** 一次主页请求更新所有论文；失败项只沿用同源已核实缓存。 */
export async function updateCitations({
  existingData = {}, fetchHtml = fetchScholarHtml, today = new Date().toISOString().slice(0, 10),
} = {}) {
  let html
  let requestError
  try {
    html = await fetchHtml()
  } catch (error) {
    requestError = error
  }
  const results = {}
  const warnings = []
  const failures = []
  for (const publication of PUBLICATIONS) {
    try {
      if (requestError) throw requestError
      results[publication.id] = { ...parseCitationHtml(html, publication), verifiedAt: today }
    } catch (error) {
      const cached = existingData[publication.id]
      if (validCache(cached, publication)) {
        results[publication.id] = cached
        warnings.push(`${publication.id} 刷新失败，保留 ${cached.verifiedAt} 的缓存：${error.message}`)
      } else {
        failures.push(`${publication.id} 没有有效 Google Scholar 缓存：${error.message}`)
      }
    }
  }
  return { results, warnings, failures }
}

/** 所有论文都有有效数据时才原子替换缓存，避免写入残缺快照。 */
export async function refreshCitations({ outputPath = OUTPUT_PATH, requireFresh = false, ...options } = {}) {
  const existingData = existsSync(outputPath) ? JSON.parse(readFileSync(outputPath, 'utf8')) : {}
  const result = await updateCitations({ existingData, ...options })
  if (result.failures.length) throw new Error(`未覆盖引用缓存：${result.failures.join('；')}`)
  if (requireFresh && result.warnings.length) {
    throw new Error(`未获得全新引用数据：${result.warnings.join('；')}`)
  }
  const temporaryPath = `${outputPath}.tmp`
  writeFileSync(temporaryPath, JSON.stringify(result.results, null, 2) + '\n')
  renameSync(temporaryPath, outputPath)
  return result
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  refreshCitations({ requireFresh: process.argv.includes('--require-fresh') }).then(({ results, warnings }) => {
    for (const warning of warnings) console.warn(warning)
    for (const [id, entry] of Object.entries(results)) {
      console.log(`${id}: Google Scholar ${entry.count}${entry.estimated ? '*' : ''}，核验日期 ${entry.verifiedAt}`)
    }
  }).catch((error) => {
    console.error(error.message)
    process.exitCode = 1
  })
}
