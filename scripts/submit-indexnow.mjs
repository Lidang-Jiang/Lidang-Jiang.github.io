import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'
import { blocksIndexing, hasNoindex, parseCanonical } from './seo-html.mjs'

export { parseCanonical } from './seo-html.mjs'
export const SITE_ORIGIN = 'https://lidang-jiang.pages.dev'
export const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'
// 协议要求公开的站点所有权证明，内容同时发布于网站根目录。
export const INDEXNOW_KEY = '85457fbc08a2481098b2b252aafc8440'
const KEY_LOCATION = `${SITE_ORIGIN}/${INDEXNOW_KEY}.txt`

export function validateSubmission({ revision, urls }) {
  if (typeof revision !== 'string' || !/^[a-f0-9]{40}$/.test(revision)) {
    throw new Error('必须提供已发布的完整提交 SHA（40 位小写十六进制）')
  }
  if (!Array.isArray(urls) || urls.length === 0 || urls.length > 10000) {
    throw new Error('至少提供一个 URL，单次最多 10000 个')
  }
  const validated = urls.map((value) => {
    let url
    try { url = new URL(value) } catch { throw new Error('URL 必须为完整生产网址') }
    if (typeof value !== 'string' || url.origin !== SITE_ORIGIN || url.href !== value
      || url.username || url.password || /[?#]/.test(value)
      || (url.pathname !== '/' && url.pathname.endsWith('/')) || /\.html$/i.test(url.pathname)) {
      throw new Error('URL 必须使用生产域名的规范路径，不含凭证、查询参数、片段或重定向别名')
    }
    return value
  })
  return { revision, urls: [...new Set(validated)] }
}

export function parseOptions(args, environment = {}) {
  let revision = environment.INDEXNOW_REVISION ?? ''
  let dryRun = false
  const urls = (environment.INDEXNOW_URLS ?? '').split(/\s+/).filter(Boolean)
  for (let index = 0; index < args.length; index += 1) {
    const option = args[index]
    if (option === '--dry-run') {
      dryRun = true
    } else if (option === '--revision' || option === '--url') {
      const value = args[index + 1]
      if (!value || value.startsWith('--')) throw new Error(`${option} 缺少值`)
      if (option === '--revision') revision = value
      else urls.push(value)
      index += 1
    } else {
      throw new Error(`未知参数：${option}`)
    }
  }
  return { revision, urls, dryRun }
}

function requestOptions(method = 'GET') {
  return {
    method,
    redirect: 'error',
    cache: 'no-store',
    signal: AbortSignal.timeout(20000),
    headers: { 'User-Agent': 'LidangWebsite-IndexNow/1.0 (+https://lidang-jiang.pages.dev/)' },
  }
}

async function fetchText(url, fetch) {
  const response = await fetch(url, requestOptions())
  if (response.status !== 200) throw new Error(`生产核验失败：${url} HTTP ${response.status}`)
  return { response, text: await response.text() }
}

async function verifyProduction({ revision, urls }, fetch) {
  const marker = await fetchText(`${SITE_ORIGIN}/deployment-revision.txt`, fetch)
  if (marker.text !== `${revision}\n`) throw new Error('线上版本与要求的提交 SHA 不一致，停止通知')
  const key = await fetchText(KEY_LOCATION, fetch)
  if (key.text !== INDEXNOW_KEY) throw new Error('IndexNow 验证文件内容不匹配，停止通知')
  for (const url of urls) {
    const { response, text } = await fetchText(url, fetch)
    if (!/^text\/html(?:;|$)/i.test(response.headers.get('content-type') ?? '')) {
      throw new Error(`页面不是 HTML：${url}`)
    }
    if (blocksIndexing(response.headers.get('x-robots-tag') ?? '', { header: true }) || hasNoindex(text)) {
      throw new Error(`页面禁止索引（noindex）：${url}`)
    }
    if (parseCanonical(text) !== url) throw new Error(`页面 canonical 不匹配：${url}`)
  }
}

export async function submitIndexNow(options, { fetch = globalThis.fetch } = {}) {
  const validated = validateSubmission(options)
  await verifyProduction(validated, fetch)
  if (options.dryRun) return { status: 'dry-run', count: validated.urls.length }
  const request = requestOptions('POST')
  const response = await fetch(INDEXNOW_ENDPOINT, {
    ...request,
    headers: { ...request.headers, 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: new URL(SITE_ORIGIN).host,
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList: validated.urls,
    }),
  })
  if (response.status === 429) {
    const retryAfter = response.headers.get('retry-after')
    throw new Error(`IndexNow HTTP 429；${retryAfter ? `Retry-After=${retryAfter}` : '稍后'}，按限流要求等待后再手动重试`)
  }
  if (response.status !== 200 && response.status !== 202) {
    throw new Error(`IndexNow 提交失败：HTTP ${response.status}`)
  }
  return { status: response.status === 200 ? 'received' : 'pending', count: validated.urls.length }
}

async function main() {
  try {
    const options = parseOptions(process.argv.slice(2), process.env)
    const result = await submitIndexNow(options)
    const messages = {
      'dry-run': '生产核验通过，未发送通知',
      received: '搜索引擎已接收通知，尚不代表收录',
      pending: '搜索引擎已接收通知，等待验证，尚不代表收录',
    }
    process.stdout.write(`${new Date().toISOString()} ${result.count} 个 URL：${messages[result.status]}\n`)
    for (const url of [...new Set(options.urls)]) process.stdout.write(`${url}\n`)
  } catch (error) {
    process.stderr.write(`${error.message}\n`)
    process.exitCode = 1
  }
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  await main()
}
