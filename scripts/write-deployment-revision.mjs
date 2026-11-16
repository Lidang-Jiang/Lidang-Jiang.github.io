import { execFileSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

export function writeDeploymentRevision(directory, { execFileSync: execute = execFileSync } = {}) {
  const revision = execute('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim()
  if (!/^[a-f0-9]{40}$/.test(revision)) throw new Error('无法取得实际 checkout 的完整提交 SHA')
  writeFileSync(join(directory, 'deployment-revision.txt'), `${revision}\n`, 'utf8')
  return revision
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  try {
    writeDeploymentRevision(process.argv[2] ?? 'dist')
  } catch (error) {
    process.stderr.write(`${error.message}\n`)
    process.exitCode = 1
  }
}
