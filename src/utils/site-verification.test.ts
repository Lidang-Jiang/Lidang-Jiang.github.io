import { describe, expect, it } from 'vitest'
import verificationContent from '../../public/f2d512139db34f256cb94797c2d8264b.txt?raw'

describe('微信站点所有权验证文件', () => {
  it('在静态资源根目录保留完整文件名与原始验证内容', () => {
    expect(verificationContent).toBe('3bc8822430afca54781eacf4b93ad679f2ecf6b6')
  })
})
