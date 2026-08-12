/**
 * 从 LetPub 抓取期刊实时影响因子。
 * 运行方式: node scripts/fetch-impact-factors.mjs
 * 输出: src/data/impact-factors.json
 */

import { execFile as execFileCallback } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { setTimeout as delay } from 'node:timers/promises'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'

const execFile = promisify(execFileCallback)

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const OUTPUT_PATH = resolve(__dirname, '../src/data/impact-factors.json')

export const JOURNALS = [
  { issn: '0360-5442', journalId: 2496, name: 'Energy' },
  { issn: '0306-2619', journalId: 729, name: 'Applied Energy' },
]

const LETPUB_BASE =
  'https://www.letpub.com.cn/index.php?page=journalapp&view=detail&journalid='
const DEFAULT_RETRY_DELAYS_MS = [2000, 5000]
const DEFAULT_TIMEOUT_SECONDS = 30
const USER_AGENT = 'Mozilla/5.0 (compatible; GitHub-Actions-Bot)'

export function parseImpactFactorHtml(html) {
  let realtimeIF = null
  const realtimeTdMatch = html.match(
    /实时影响因子[\s\S]*?<\/td>\s*<TD[^>]*>([\s\S]*?)<\/td>/i,
  )

  if (realtimeTdMatch) {
    const numMatch = realtimeTdMatch[1].match(/(\d+\.?\d*)\s*$/)
    realtimeIF = numMatch ? parseFloat(numMatch[1]) : null
  }

  let jcrIF = null
  const jcrTdMatch = html.match(
    /最新影响因子[\s\S]*?<\/td>\s*<TD[^>]*>([\s\S]*?)<\/td>/i,
  )

  if (jcrTdMatch) {
    const numMatch = jcrTdMatch[1].match(/^\s*(\d+\.?\d*)/)
    jcrIF = numMatch ? parseFloat(numMatch[1]) : null
  }

  return { realtimeIF, jcrIF }
}

function hasImpactFactorData(entry) {
  return entry.realtimeIF !== null || entry.jcrIF !== null
}

function getToday() {
  return new Date().toISOString().slice(0, 10)
}

function getJournalUrl(journal) {
  return `${LETPUB_BASE}${journal.journalId}`
}

function normalizeError(error) {
  if (error instanceof Error) {
    return error
  }

  return new Error(String(error))
}

function formatExecError(error) {
  const normalized = normalizeError(error)
  const stderr =
    typeof error === 'object' && error !== null && 'stderr' in error
      ? String(error.stderr).trim()
      : ''

  if (stderr) {
    const lastLine = stderr.split('\n').at(-1)?.trim()
    if (lastLine) {
      return new Error(lastLine)
    }
  }

  return new Error(normalized.message)
}

function getRetryDelayMs(attemptIndex, retryDelayMs, retryDelaysMs) {
  if (retryDelayMs !== undefined) {
    return retryDelayMs
  }

  return (
    retryDelaysMs[attemptIndex] ??
    retryDelaysMs.at(-1) ??
    DEFAULT_RETRY_DELAYS_MS.at(-1) ??
    0
  )
}

export async function fetchJournalHtml(
  journal,
  { timeoutSeconds = DEFAULT_TIMEOUT_SECONDS } = {},
) {
  const url = getJournalUrl(journal)

  try {
    const { stdout } = await execFile(
      'curl',
      [
        '-L',
        '--silent',
        '--show-error',
        '--fail',
        '--max-time',
        String(timeoutSeconds),
        '-A',
        USER_AGENT,
        '-H',
        'Accept: text/html,application/xhtml+xml',
        '-H',
        'Accept-Language: zh-CN,zh;q=0.9,en;q=0.8',
        url,
      ],
      { maxBuffer: 8 * 1024 * 1024 },
    )

    return stdout
  } catch (error) {
    throw formatExecError(error)
  }
}

export async function fetchJournalData(journal, options = {}) {
  const url = getJournalUrl(journal)
  console.log(`Fetching ${journal.name} (ISSN: ${journal.issn}) from ${url}`)

  const html = await fetchJournalHtml(journal, options)
  const parsed = parseImpactFactorHtml(html)

  if (!hasImpactFactorData(parsed)) {
    throw new Error('no impact factor fields found')
  }

  console.log(
    `  ${journal.name}: realtimeIF=${parsed.realtimeIF}, jcrIF=${parsed.jcrIF}`,
  )

  return parsed
}

async function fetchWithRetry(
  journal,
  { fetchJournalData: fetchJournalDataImpl, retries, retryDelayMs, retryDelaysMs },
) {
  let lastError = new Error('unknown error')

  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      const entry = await fetchJournalDataImpl(journal)

      if (!hasImpactFactorData(entry)) {
        throw new Error('no impact factor fields found')
      }

      return entry
    } catch (error) {
      lastError = normalizeError(error)

      if (attempt < retries) {
        const delayMs = getRetryDelayMs(
          attempt - 1,
          retryDelayMs,
          retryDelaysMs,
        )

        console.warn(
          `Attempt ${attempt} failed for ${journal.name}, retrying: ${lastError.message}`,
        )

        if (delayMs > 0) {
          await delay(delayMs)
        }
      }
    }
  }

  throw lastError
}

function buildOrderedResults(journals, results) {
  return Object.fromEntries(
    journals.flatMap((journal) =>
      results[journal.issn] ? [[journal.issn, results[journal.issn]]] : [],
    ),
  )
}

export async function updateImpactFactors({
  journals = JOURNALS,
  existingData = {},
  fetchJournalData: fetchJournalDataImpl = fetchJournalData,
  retries = DEFAULT_RETRY_DELAYS_MS.length + 1,
  retryDelayMs,
  retryDelaysMs = DEFAULT_RETRY_DELAYS_MS,
  today = getToday(),
} = {}) {
  const results = {}
  const warnings = []
  const failures = []

  for (const journal of journals) {
    const existingEntry = existingData[journal.issn]

    try {
      const entry = await fetchWithRetry(journal, {
        fetchJournalData: fetchJournalDataImpl,
        retries,
        retryDelayMs,
        retryDelaysMs,
      })

      results[journal.issn] = {
        realtimeIF: entry.realtimeIF,
        jcrIF: entry.jcrIF,
        updatedAt: today,
      }
    } catch (error) {
      const normalizedError = normalizeError(error)

      if (existingEntry) {
        warnings.push(
          `Using cached impact factors for ${journal.name} after refresh failed: ${normalizedError.message}`,
        )
        results[journal.issn] = existingEntry
      } else {
        failures.push(
          `Missing impact factor data for ${journal.name}: ${normalizedError.message}`,
        )
      }
    }
  }

  return {
    results: buildOrderedResults(journals, results),
    warnings,
    failures,
  }
}

export function loadExistingImpactFactors(path = OUTPUT_PATH) {
  if (!existsSync(path)) {
    return {}
  }

  return JSON.parse(readFileSync(path, 'utf8'))
}

export function writeImpactFactors(results, path = OUTPUT_PATH) {
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, JSON.stringify(results, null, 2) + '\n')
}

export async function main() {
  const existingData = loadExistingImpactFactors()
  const { results, warnings, failures } = await updateImpactFactors({
    existingData,
  })

  for (const warning of warnings) {
    console.warn(warning)
  }

  for (const failure of failures) {
    console.error(failure)
  }

  if (Object.keys(results).length === 0) {
    console.error('No impact factor data fetched or recovered from cache. Aborting.')
    process.exit(1)
  }

  writeImpactFactors(results)
  console.log(`\nWrote ${Object.keys(results).length} entries to ${OUTPUT_PATH}`)

  if (failures.length > 0) {
    process.exit(1)
  }
}

if (process.argv[1] && resolve(process.argv[1]) === __filename) {
  main().catch((error) => {
    console.error('Fatal error:', normalizeError(error))
    process.exit(1)
  })
}
