import { describe, expect, it } from 'vitest'
import { useDisclosure } from './useDisclosure'

describe('useDisclosure', () => {
  it('toggles and closes an open disclosure', () => {
    const disclosure = useDisclosure()

    expect(disclosure.isOpen.value).toBe(false)

    disclosure.toggle()
    expect(disclosure.isOpen.value).toBe(true)

    disclosure.close()
    expect(disclosure.isOpen.value).toBe(false)
  })

  it('closes on Escape and reports that the key was handled', () => {
    const disclosure = useDisclosure(true)

    expect(disclosure.handleKeydown({ key: 'Escape' })).toBe(true)
    expect(disclosure.isOpen.value).toBe(false)
  })

  it('ignores unrelated keys', () => {
    const disclosure = useDisclosure(true)

    expect(disclosure.handleKeydown({ key: 'Enter' })).toBe(false)
    expect(disclosure.isOpen.value).toBe(true)
  })
})
