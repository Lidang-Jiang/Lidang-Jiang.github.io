/**
 * 从 LetPub 爬取期刊实时影响因子
 * 运行方式: node scripts/fetch-impact-factors.mjs
 * 输出: src/data/impact-factors.json
 */

import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUTPUT_PATH = resolve(__dirname, '../src/data/impact-factors.json')

const JOURNALS = [
  { issn: '0360-5442', journalId: 2496, name: 'Energy' },
  { issn: '0306-2619', journalId: 729, name: 'Applied Energy' },
]

const LETPUB_BASE = 'https://www.letpub.com.cn/index.php?page=journalapp&view=detail&journalid='

async function fetchJournalIF(journal) {
  const url = `${LETPUB_BASE}${journal.journalId}`
  console.log(`Fetching ${journal.name} (ISSN: ${journal.issn}) from ${url}`)

  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; GitHub-Actions-Bot)',
      'Accept': 'text/html,application/xhtml+xml',
      'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
    },
  })

  if (!res.ok) {
    console.error(`  Failed to fetch ${journal.name}: HTTP ${res.status}`)
    return null
  }

  const html = await res.text()

  // 提取实时影响因子: 找到 "实时影响因子" 表头 TD，取下一个 TD 的内容（如 "截止2026年1月20日：9.3"）
  let realtimeIF = null
  const realtimeTdMatch = html.match(/实时影响因子[\s\S]*?<\/td>\s*<TD[^>]*>([\s\S]*?)<\/td>/i)
  if (realtimeTdMatch) {
    const numMatch = realtimeTdMatch[1].match(/(\d+\.?\d*)\s*$/)
    realtimeIF = numMatch ? parseFloat(numMatch[1]) : null
  }

  // 提取 JCR IF: 找到 "最新影响因子" 表头 TD，取下一个 TD 的内容（如 "9.4"）
  let jcrIF = null
  const jcrTdMatch = html.match(/最新影响因子[\s\S]*?<\/td>\s*<TD[^>]*>([\s\S]*?)<\/td>/i)
  if (jcrTdMatch) {
    const numMatch = jcrTdMatch[1].match(/^\s*(\d+\.?\d*)/)
    jcrIF = numMatch ? parseFloat(numMatch[1]) : null
  }

  console.log(`  ${journal.name}: realtimeIF=${realtimeIF}, jcrIF=${jcrIF}`)

  return {
    realtimeIF,
    jcrIF,
    updatedAt: new Date().toISOString().slice(0, 10),
  }
}

async function main() {
  const results = {}

  for (const journal of JOURNALS) {
    const data = await fetchJournalIF(journal)
    if (data && (data.realtimeIF !== null || data.jcrIF !== null)) {
      results[journal.issn] = data
    } else {
      console.warn(`  Skipping ${journal.name}: no IF data found`)
    }
  }

  if (Object.keys(results).length === 0) {
    console.error('No impact factor data fetched. Aborting.')
    process.exit(1)
  }

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true })
  writeFileSync(OUTPUT_PATH, JSON.stringify(results, null, 2) + '\n')
  console.log(`\nWrote ${Object.keys(results).length} entries to ${OUTPUT_PATH}`)
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
