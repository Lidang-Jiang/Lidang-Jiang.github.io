import assert from 'node:assert/strict'
import { execFileSync, spawn, spawnSync } from 'node:child_process'
import { once } from 'node:events'
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { afterEach, beforeEach, describe, it } from 'node:test'

const script = fileURLToPath(new URL('./sync-citations.sh', import.meta.url))
const dataPath = 'src/data/citation-counts.json'
const updater = `import { writeFileSync } from 'node:fs'
if (!process.argv.includes('--require-fresh')) process.exit(9)
const path = 'src/data/citation-counts.json'
if (process.env.FIXTURE_MODE === 'fail') {
  writeFileSync(path, 'partial output')
  process.exit(2)
}
writeFileSync(path, JSON.stringify({ count: Number(process.env.FIXTURE_COUNT ?? 11) }) + '\\n')
if (process.env.FIXTURE_MODE === 'unexpected') writeFileSync('unexpected.txt', 'unexpected')
`

describe('隔离的本机引用数据同步', () => {
  let root
  let origin
  let seed
  let state
  let checkout
  let env

  function git(cwd, ...args) {
    return execFileSync('git', ['-C', cwd, ...args], { env, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim()
  }

  function run(extra = {}) {
    return spawnSync('bash', [script], { env: { ...env, ...extra }, encoding: 'utf8', timeout: 20_000 })
  }

  function clone() {
    git(root, 'clone', '--branch', 'main', origin, checkout)
  }

  function remoteHead() {
    return git(origin, 'rev-parse', 'refs/heads/main')
  }

  beforeEach(() => {
    root = mkdtempSync(join(tmpdir(), 'citations-sync-'))
    origin = join(root, 'origin.git')
    seed = join(root, 'seed')
    state = join(root, 'state')
    checkout = join(state, 'checkout')
    const config = join(root, 'gitconfig')
    writeFileSync(config, '[user]\nname = Test Author\nemail = test@example.com\n[core]\nhooksPath = /dev/null\n')
    env = {
      ...Object.fromEntries(Object.entries(process.env).filter(([key]) => !key.startsWith('GIT_'))),
      GIT_CONFIG_GLOBAL: config,
      GIT_CONFIG_NOSYSTEM: '1',
      CITATIONS_STATE_DIR: state,
      CITATIONS_REPO_URL: origin,
    }
    mkdirSync(seed)
    mkdirSync(state)
    git(root, 'init', '--bare', '--initial-branch=main', origin)
    git(seed, 'init', '--initial-branch=main')
    mkdirSync(join(seed, 'src/data'), { recursive: true })
    mkdirSync(join(seed, 'scripts'))
    writeFileSync(join(seed, dataPath), '{"count":11}\n')
    writeFileSync(join(seed, 'scripts/fetch-citations.mjs'), updater)
    git(seed, 'add', '--', dataPath, 'scripts/fetch-citations.mjs')
    git(seed, 'commit', '-m', 'test: seed citation fixture')
    git(seed, 'remote', 'add', 'origin', origin)
    git(seed, 'push', '-u', 'origin', 'main')
  })

  afterEach(() => rmSync(root, { recursive: true, force: true }))

  it('首次建立专用克隆，严格刷新并只提交引用数据，推送后本地远端一致', () => {
    const result = run({ FIXTURE_COUNT: '12' })
    assert.equal(result.status, 0, result.stderr)
    assert.equal(git(checkout, 'rev-parse', 'HEAD'), remoteHead())
    assert.equal(git(origin, 'show', `main:${dataPath}`), '{"count":12}')
    assert.equal(git(checkout, 'show', '--format=', '--name-only', 'HEAD'), dataPath)
    assert.equal(git(checkout, 'show', '-s', '--format=%an <%ae> / %cn <%ce>', 'HEAD'),
      'Test Author <test@example.com> / Test Author <test@example.com>')
    assert.equal(git(checkout, 'status', '--porcelain'), '')
    assert.equal(git(seed, 'status', '--porcelain'), '')
  })

  it('没有数据变化时不创建提交', () => {
    const before = remoteHead()
    const result = run()
    assert.equal(result.status, 0, result.stderr)
    assert.equal(remoteHead(), before)
    assert.equal(git(checkout, 'rev-parse', 'HEAD'), before)
  })

  it('先拉取远端的新内容再执行抓取', () => {
    clone()
    writeFileSync(join(seed, 'scripts/fetch-citations.mjs'), updater.replace("?? 11", "?? 19"))
    git(seed, 'add', '--', 'scripts/fetch-citations.mjs')
    git(seed, 'commit', '-m', 'test: update fixture')
    git(seed, 'push', 'origin', 'main')
    const result = run()
    assert.equal(result.status, 0, result.stderr)
    assert.equal(git(origin, 'show', `main:${dataPath}`), '{"count":19}')
  })

  for (const dirty of ['unstaged', 'staged', 'untracked']) {
    it(`已有 ${dirty} 变更时失败并保留现场`, () => {
      clone()
      const target = dirty === 'untracked' ? 'notes.txt' : dataPath
      writeFileSync(join(checkout, target), 'existing changes')
      if (dirty === 'staged') git(checkout, 'add', '--', target)
      const before = remoteHead()
      const status = git(checkout, 'status', '--porcelain')
      const result = run({ FIXTURE_COUNT: '12' })
      assert.notEqual(result.status, 0)
      assert.equal(remoteHead(), before)
      assert.equal(git(checkout, 'status', '--porcelain'), status)
      assert.equal(readFileSync(join(checkout, target), 'utf8'), 'existing changes')
    })
  }

  it('克隆 origin 不匹配时失败，且不修改其配置', () => {
    clone()
    git(checkout, 'remote', 'set-url', 'origin', join(root, 'different.git'))
    const result = run()
    assert.notEqual(result.status, 0)
    assert.equal(git(checkout, 'remote', 'get-url', 'origin'), join(root, 'different.git'))
  })

  it('origin pushurl 不匹配时拒绝更新与推送', () => {
    clone()
    git(checkout, 'remote', 'set-url', '--push', 'origin', join(root, 'different.git'))
    const result = run({ FIXTURE_COUNT: '12' })
    assert.notEqual(result.status, 0)
    assert.equal(git(checkout, 'status', '--porcelain'), '')
    assert.equal(git(checkout, 'rev-parse', 'HEAD'), remoteHead())
  })

  it('克隆不在 main 分支时失败，且不替用户切换分支', () => {
    clone()
    git(checkout, 'switch', '-c', 'other')
    assert.notEqual(run().status, 0)
    assert.equal(git(checkout, 'branch', '--show-current'), 'other')
  })

  it('已有未推送提交时失败，避免以后将其混入自动推送', () => {
    clone()
    writeFileSync(join(checkout, 'notes.txt'), 'local commit')
    git(checkout, 'add', '--', 'notes.txt')
    git(checkout, 'commit', '-m', 'test: existing local work')
    const before = remoteHead()
    assert.notEqual(run().status, 0)
    assert.equal(remoteHead(), before)
    assert.equal(git(checkout, 'show', '-s', '--format=%s'), 'test: existing local work')
  })

  it('抓取失败时非零退出，保留现场且不推送', () => {
    const before = remoteHead()
    const result = run({ FIXTURE_MODE: 'fail' })
    assert.notEqual(result.status, 0)
    assert.equal(remoteHead(), before)
    assert.equal(readFileSync(join(checkout, dataPath), 'utf8'), 'partial output')
    assert.equal(git(checkout, 'diff', '--cached', '--name-only'), '')
  })

  it('抓取产生额外文件时拒绝提交任何变更', () => {
    const before = remoteHead()
    const result = run({ FIXTURE_MODE: 'unexpected', FIXTURE_COUNT: '12' })
    assert.notEqual(result.status, 0)
    assert.equal(remoteHead(), before)
    assert.equal(readFileSync(join(checkout, 'unexpected.txt'), 'utf8'), 'unexpected')
    assert.equal(git(checkout, 'diff', '--cached', '--name-only'), '')
  })

  it('推送失败时保留本次提交，之后不会自动混入其他更新', () => {
    const hooks = join(root, 'hooks')
    mkdirSync(hooks)
    writeFileSync(join(hooks, 'pre-receive'), '#!/bin/sh\nexit 1\n', { mode: 0o755 })
    git(origin, 'config', 'core.hooksPath', hooks)
    const before = remoteHead()
    const result = run({ FIXTURE_COUNT: '12' })
    assert.notEqual(result.status, 0)
    assert.equal(remoteHead(), before)
    const localHead = git(checkout, 'rev-parse', 'HEAD')
    assert.notEqual(localHead, before)
    assert.equal(git(checkout, 'status', '--porcelain'), '')
    assert.notEqual(run({ FIXTURE_COUNT: '13' }).status, 0)
    assert.equal(git(checkout, 'rev-parse', 'HEAD'), localHead)
    assert.equal(git(checkout, 'show', `HEAD:${dataPath}`), '{"count":12}')
  })

  it('另一个同步持有锁时跳过，不建立克隆', async () => {
    const lockPath = join(state, 'sync.lock')
    const holder = spawn('flock', [lockPath, process.execPath, '-e', "console.log('locked');setInterval(()=>{},1000)"], {
      env,
      detached: true,
    })
    try {
      await once(holder.stdout, 'data')
      const before = remoteHead()
      const result = run({ FIXTURE_COUNT: '12' })
      assert.equal(result.status, 0, result.stderr)
      assert.equal(remoteHead(), before)
      assert.match(result.stdout, /已有.*任务/)
    } finally {
      process.kill(-holder.pid, 'SIGTERM')
      await once(holder, 'close')
    }
  })
})
