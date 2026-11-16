import assert from 'node:assert/strict'
import { execFileSync, spawnSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { it } from 'node:test'
import { fileURLToPath } from 'node:url'
import { writeDeploymentRevision } from './write-deployment-revision.mjs'

it('发布标记采用实际 checkout 的完整提交 SHA，而非事件默认 SHA', () => {
  const directory = mkdtempSync(join(tmpdir(), 'website-revision-'))
  const revision = 'abcdef1234567890abcdef1234567890abcdef12'
  try {
    assert.equal(writeDeploymentRevision(directory, {
      execFileSync: (command, args, options) => {
        assert.equal(command, 'git')
        assert.deepEqual(args, ['rev-parse', 'HEAD'])
        assert.equal(options.encoding, 'utf8')
        return `${revision}\n`
      },
    }), revision)
    assert.equal(readFileSync(join(directory, 'deployment-revision.txt'), 'utf8'), `${revision}\n`)
    assert.throws(() => writeDeploymentRevision(directory, { execFileSync: () => 'main\n' }), /SHA/)
  } finally {
    rmSync(directory, { recursive: true, force: true })
  }
})

it('CLI 写入当前仓库 SHA，目标目录缺失时返回失败', () => {
  const directory = mkdtempSync(join(tmpdir(), 'website-revision-cli-'))
  const script = fileURLToPath(new URL('./write-deployment-revision.mjs', import.meta.url))
  try {
    const result = spawnSync(process.execPath, [script, directory], { encoding: 'utf8' })
    assert.equal(result.status, 0)
    assert.equal(readFileSync(join(directory, 'deployment-revision.txt'), 'utf8'),
      execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }))
    const failure = spawnSync(process.execPath, [script, join(directory, 'missing')], { encoding: 'utf8' })
    assert.equal(failure.status, 1)
    assert.match(failure.stderr, /ENOENT/)
  } finally {
    rmSync(directory, { recursive: true, force: true })
  }
})
