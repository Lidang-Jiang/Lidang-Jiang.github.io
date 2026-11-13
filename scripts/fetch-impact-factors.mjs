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
  {
    issn: '0360-5442',
    name: 'Energy',
    url: 'https://shop.elsevier.com/journals/energy/0360-5442',
  },
  {
    issn: '0306-2619',
    name: 'Applied Energy',
    url: 'https://shop.elsevier.com/journals/applied-energy/0306-2619',
  },
]

const DEFAULT_RETRY_DELAYS_MS = [2000, 5000]
const DEFAULT_TIMEOUT_SECONDS = 30
const USER_AGENT = 'Mozilla/5.0 (compatible; GitHub-Actions-Bot)'

function cellText(html) {
  return html
    .replace(/<(?:[^>"']|"[^"]*"|'[^']*')*>/g, ' ')
    .replace(/&nbsp;|&#160;|&#xA0;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function parseImpactFactorHtml(html, journal) {
  const content = html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, '')
  const title = content.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)
  if (!title || cellText(title[1]).toLowerCase() !== journal.name.toLowerCase()) {
    throw new Error('official journal title missing or mismatched')
  }

  const items = [...content.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)]
    .map((match) => cellText(match[1]))
  const issns = items.flatMap((item) => item.match(/^ISSN:\s*(.*)$/i)?.[1] ?? [])
  if (issns.length === 0 || issns.some((issn) => issn !== journal.issn)) {
    throw new Error('official journal ISSN missing or mismatched')
  }

  const values = items.flatMap((item) => item.match(/^Impact factor:\s*(.*)$/i)?.[1] ?? [])
  const numbers = values.map(Number)
  if (values.length === 0
    || values.some((value) => !/^\d+(?:\.\d+)?$/.test(value))
    || numbers.some((value) => !Number.isFinite(value))
    || new Set(numbers).size !== 1) {
    throw new Error('official impact factor missing, invalid or conflicting')
  }

  return {
    realtimeIF: null,
    jcrIF: numbers[0],
    jcrYear: null,
    jcrSource: getJournalUrl(journal),
  }
}

function hasImpactFactorData(entry, journal) {
  return Number.isFinite(entry?.jcrIF)
    && entry.jcrIF >= 0
    && entry.jcrSource === getJournalUrl(journal)
}

function hasVerifiedCache(entry, journal) {
  return hasImpactFactorData(entry, journal)
    && /^\d{4}-\d{2}-\d{2}$/.test(entry.verifiedAt)
    && Number.isFinite(Date.parse(entry.verifiedAt))
}

function getToday() {
  return new Date().toISOString().slice(0, 10)
}

function getJournalUrl(journal) {
  return journal.url
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
  { timeoutSeconds = DEFAULT_TIMEOUT_SECONDS, execFile: execFileImpl = execFile } = {},
) {
  const url = getJournalUrl(journal)

  try {
    const { stdout } = await execFileImpl(
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
  const parsed = parseImpactFactorHtml(html, journal)

  if (!hasImpactFactorData(parsed, journal)) {
    throw new Error('no valid official impact factor found')
  }

  console.log(
    `  ${journal.name}: official JCR IF=${parsed.jcrIF}, year=${parsed.jcrYear ?? 'unknown'}`,
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

      if (!hasImpactFactorData(entry, journal)) {
        throw new Error('no valid official impact factor found')
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
        ...existingEntry,
        realtimeIF: null,
        jcrIF: entry.jcrIF,
        jcrYear: entry.jcrYear ?? null,
        jcrSource: entry.jcrSource,
        verifiedAt: today,
        updatedAt: today,
      }
    } catch (error) {
      const normalizedError = normalizeError(error)

      if (hasVerifiedCache(existingEntry, journal)) {
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
