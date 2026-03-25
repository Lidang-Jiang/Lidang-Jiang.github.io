import { ref } from 'vue'
import impactFactorData from '@/data/impact-factors.json'

interface ImpactFactorEntry {
  realtimeIF: number | null
  jcrIF: number | null
  updatedAt: string
}

const data = impactFactorData as Record<string, ImpactFactorEntry>

export function useImpactFactors(issns: string[]) {
  const map = new Map<string, number>()

  for (const issn of issns) {
    const entry = data[issn]
    if (!entry) continue
    const value = entry.realtimeIF ?? entry.jcrIF
    if (value !== null) {
      map.set(issn, value)
    }
  }

  const impactFactors = ref(map)

  return { impactFactors }
}
