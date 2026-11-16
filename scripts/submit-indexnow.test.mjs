import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'

import {
  INDEXNOW_ENDPOINT,
  INDEXNOW_KEY,
  SITE_ORIGIN,
  parseCanonical,
  parseOptions,
  submitIndexNow,
  validateSubmission,
} from './submit-indexnow.mjs'

const revision = '1234567890abcdef1234567890abcdef12345678'
const urls = [`${SITE_ORIGIN}/`, `${SITE_ORIGIN}/zh`]
const options = { revision, urls }
const page = (url) => `<html><head><title>页面</title>
  <link href="${url}" data-label="a > b" rel="canonical">
  </head><body><main><h1>江李当</h1><p>研究与工程经历。</p></main></body></html>`

function mockSite(overrides = {}, status = 200, headers = {}) {
  const calls = []
  const fetch = async (url, init) => {
    calls.push({ url, init })
    if (url === INDEXNOW_ENDPOINT) return new Response('', { status, headers })
    if (Object.hasOwn(overrides, url)) return overrides[url]()
    if (url === `${SITE_ORIGIN}/deployment-revision.txt`) return new Response(`${revision}\n`)
    if (url === `${SITE_ORIGIN}/${INDEXNOW_KEY}.txt`) return new Response(INDEXNOW_KEY)
    return new Response(page(url), { headers: { 'content-type': 'text/html; charset=utf-8' } })
  }
  return { calls, fetch }
}

describe('IndexNow 输入与 canonical 解析', () => {
  it('显式解析 URL、版本与 dry-run；环境输入不经过 shell', () => {
    assert.deepEqual(parseOptions(['--revision', revision, '--url', urls[0], '--dry-run']), {
      revision, urls: [urls[0]], dryRun: true,
    })
    assert.deepEqual(parseOptions([], { INDEXNOW_REVISION: revision, INDEXNOW_URLS: urls.join('\n') }), {
      revision, urls, dryRun: false,
    })
    assert.throws(() => parseOptions(['--unknown']), /未知参数/)
    assert.throws(() => parseOptions(['--url']), /缺少/)
  })

  it('规范化去重但不接受模糊 URL 或预览域名', () => {
    assert.deepEqual(validateSubmission({ revision, urls: [...urls, urls[0]] }), options)
    for (const invalid of [
      'http://lidang-jiang.pages.dev/', 'https://preview.lidang-jiang.pages.dev/',
      'https://example.com/', `${SITE_ORIGIN}/?lang=zh`, `${SITE_ORIGIN}/#about`,
      `${SITE_ORIGIN}/cv?`, `${SITE_ORIGIN}/cv#`,
      `${SITE_ORIGIN}/cv/`, `${SITE_ORIGIN}/cv.html`, `${SITE_ORIGIN}/a/../cv`,
      'https://user:password@lidang-jiang.pages.dev/', '/zh',
    ]) assert.throws(() => validateSubmission({ revision, urls: [invalid] }), /URL/)
    assert.throws(() => validateSubmission({ revision: 'main', urls }), /提交 SHA/)
    assert.throws(() => validateSubmission({ revision, urls: [] }), /至少/)
  })

  it('解析属性顺序、大小写、引号和字符实体，不把字符串伪装当 link', () => {
    assert.equal(parseCanonical(page(urls[0])), urls[0])
    assert.equal(parseCanonical(`<head><LINK REL='canonical' HREF='${urls[1]}'></head>`), urls[1])
    assert.equal(parseCanonical(`<head><link rel=canonical href=${urls[1]}></head>`), urls[1])
    assert.equal(parseCanonical(`<head><!--<link rel=canonical href=wrong>-->
      <script>const x = '<link rel=canonical href=wrong>'</script>
      <link rel="canonical" href="https:&#47;&#47;lidang-jiang.pages.dev&#47;"></head>`), urls[0])
    assert.throws(() => parseCanonical('<body><link rel=canonical href=wrong></body>'), /canonical/)
    assert.throws(() => parseCanonical(`<head><link rel=canonical href="${urls[0]}">
      <link rel=canonical href="${urls[1]}"></head>`), /canonical/)
  })

  it('根目录公开验证文件内容与提交密钥一致', () => {
    assert.match(INDEXNOW_KEY, /^[a-zA-Z0-9-]{8,128}$/)
    assert.equal(readFileSync(new URL(`../public/${INDEXNOW_KEY}.txt`, import.meta.url), 'utf8'), INDEXNOW_KEY)
  })
})

describe('生产发布核验与 IndexNow 通知', () => {
  for (const status of [200, 202]) {
    it(`核验生产版本和每个 URL 后发送一次，${status} 仅表示接收状态`, async () => {
      const client = mockSite({}, status)
      const result = await submitIndexNow(options, { fetch: client.fetch })
      assert.equal(result.status, status === 200 ? 'received' : 'pending')
      assert.equal(result.count, 2)
      assert.equal(client.calls.length, 5)
      const submission = client.calls.at(-1)
      assert.equal(submission.url, INDEXNOW_ENDPOINT)
      assert.equal(submission.init.method, 'POST')
      assert.deepEqual(JSON.parse(submission.init.body), {
        host: new URL(SITE_ORIGIN).host,
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_ORIGIN}/${INDEXNOW_KEY}.txt`,
        urlList: urls,
      })
      for (const call of client.calls) {
        assert.equal(call.init.redirect, 'error')
        assert.ok(call.init.signal)
        assert.match(call.init.headers['User-Agent'], /LidangWebsite/)
      }
    })
  }

  it('dry-run 完成只读核验但没有 POST', async () => {
    const client = mockSite()
    const result = await submitIndexNow({ ...options, dryRun: true }, { fetch: client.fetch })
    assert.equal(result.status, 'dry-run')
    assert.equal(client.calls.length, 4)
    assert.equal(client.calls.some((call) => call.init.method === 'POST'), false)
  })

  it('允许仅限制图片预览的 none 值，不误判为禁止索引', async () => {
    const client = mockSite({ [urls[1]]: () => new Response(page(urls[1]).replace('</head>',
      '<meta name="robots" content="max-image-preview:none, follow"></head>'), { headers: {
      'content-type': 'text/html', 'x-robots-tag': 'max-image-preview: none',
    } }) })
    assert.equal((await submitIndexNow(options, { fetch: client.fetch })).status, 'received')
  })

  const invalidResponses = [
    ['旧版发布', '/deployment-revision.txt', () => new Response('0'.repeat(40)), /版本/],
    ['验证文件不匹配', `/${INDEXNOW_KEY}.txt`, () => new Response(`${INDEXNOW_KEY}\n`), /验证文件/],
    ['验证文件回退首页', `/${INDEXNOW_KEY}.txt`, () => new Response(page(urls[0])), /验证文件/],
    ['页面 404', '/zh', () => new Response('not found', { status: 404 }), /404/],
    ['错误 canonical', '/zh', () => new Response(page(urls[0]), { headers: { 'content-type': 'text/html' } }), /canonical/],
    ['非 HTML', '/zh', () => new Response(page(urls[1])), /HTML/],
    ['禁止索引', '/zh', () => new Response(page(urls[1]), { headers: {
      'content-type': 'text/html', 'x-robots-tag': 'noindex',
    } }), /noindex/],
    ['meta 禁止索引', '/zh', () => new Response(page(urls[1]).replace('</head>',
      '<meta content="noindex, follow" name="robots"></head>'), { headers: {
      'content-type': 'text/html',
    } }), /noindex/],
    ['响应头 none 禁止索引', '/zh', () => new Response(page(urls[1]), { headers: {
      'content-type': 'text/html', 'x-robots-tag': 'bingbot: none',
    } }), /noindex/],
    ['meta none 禁止索引', '/zh', () => new Response(page(urls[1]).replace('</head>',
      '<meta content="NONE" name="bingbot"></head>'), { headers: {
      'content-type': 'text/html',
    } }), /noindex/],
  ]
  for (const [name, path, response, error] of invalidResponses) {
    it(`${name} 时停止且不提交`, async () => {
      const client = mockSite({ [`${SITE_ORIGIN}${path}`]: response })
      await assert.rejects(submitIndexNow(options, { fetch: client.fetch }), error)
      assert.equal(client.calls.some((call) => call.url === INDEXNOW_ENDPOINT), false)
    })
  }

  it('不合法的生产输入在联网前拒绝', async () => {
    let calls = 0
    await assert.rejects(submitIndexNow({ revision, urls: ['https://preview.lidang-jiang.pages.dev/'] }, {
      fetch: async () => { calls += 1 },
    }), /URL/)
    assert.equal(calls, 0)
  })

  it('429 读取 Retry-After 并停止，等待后可显式重试', async () => {
    const client = mockSite({}, 429, { 'retry-after': '120' })
    await assert.rejects(submitIndexNow(options, { fetch: client.fetch }), /429.*120.*重试/)
    assert.equal(client.calls.filter((call) => call.url === INDEXNOW_ENDPOINT).length, 1)
  })

  for (const status of [400, 403, 422, 500]) {
    it(`提交 HTTP ${status} 清晰失败`, async () => {
      const client = mockSite({}, status)
      await assert.rejects(submitIndexNow(options, { fetch: client.fetch }), new RegExp(String(status)))
    })
  }

  it('网络错误保留明确原因，不进行隐式重试', async () => {
    let calls = 0
    await assert.rejects(submitIndexNow(options, { fetch: async () => {
      calls += 1
      throw new Error('connect timeout')
    } }), /connect timeout/)
    assert.equal(calls, 1)
  })

  it('CLI 参数错误返回非零退出码', () => {
    const result = spawnSync(process.execPath, [fileURLToPath(new URL('./submit-indexnow.mjs', import.meta.url)), '--revision', 'main'], {
      encoding: 'utf8', env: { ...process.env, INDEXNOW_REVISION: '', INDEXNOW_URLS: '' },
    })
    assert.equal(result.status, 1)
    assert.match(result.stderr, /提交 SHA/)
  })
})
