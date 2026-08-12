import { ref } from 'vue'

type KeyboardEventLike = Pick<KeyboardEvent, 'key'>

export function useDisclosure(initiallyOpen = false) {
  const isOpen = ref(initiallyOpen)

  function toggle() {
    isOpen.value = !isOpen.value
  }

  function close() {
    isOpen.value = false
  }

  function handleKeydown(event: KeyboardEventLike): boolean {
    if (event.key !== 'Escape' || !isOpen.value) return false

    close()
    return true
  }

  return {
    isOpen,
    toggle,
    close,
    handleKeydown,
  }
}
