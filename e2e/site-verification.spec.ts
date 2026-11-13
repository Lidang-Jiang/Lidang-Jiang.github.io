import { expect, test } from '@playwright/test'

test('微信验证 TXT 原样直出，不回退到首页或跳转', async ({ request }) => {
  const response = await request.get('/f2d512139db34f256cb94797c2d8264b.txt', {
    maxRedirects: 0,
  })

  expect(response.status()).toBe(200)
  expect(response.headers()['content-type']).toMatch(/^text\/plain(?:;|$)/i)
  expect(await response.body()).toEqual(
    Buffer.from('3bc8822430afca54781eacf4b93ad679f2ecf6b6', 'utf8'),
  )
})
