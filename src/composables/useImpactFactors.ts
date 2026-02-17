import { ref, onMounted } from 'vue'

interface OpenAlexResponse {
  results: Array<{
    issn_l: string
    summary_stats: { '2yr_mean_citedness': number }
  }>
}

export function useImpactFactors(issns: string[]) {
  const impactFactors = ref<Map<string, number>>(new Map())
  const loading = ref(false)

  async function fetchOne(issn: string): Promise<[string, number] | null> {
    const url = `https://api.openalex.org/sources?filter=issn:${issn}&select=issn_l,summary_stats`
    const res = await fetch(url)
    if (!res.ok) return null
    const data: OpenAlexResponse = await res.json()
    if (!data.results?.length) return null
    const val = data.results[0].summary_stats['2yr_mean_citedness']
    return [issn, Math.round(val * 10) / 10]
  }

  onMounted(async () => {
    const unique = [...new Set(issns)]
    if (unique.length === 0) return

    loading.value = true
    const results = await Promise.allSettled(unique.map(fetchOne))
    for (const r of results) {
      if (r.status === 'fulfilled' && r.value) {
        impactFactors.value.set(r.value[0], r.value[1])
      }
    }
    loading.value = false
  })

  return { impactFactors, loading }
}
