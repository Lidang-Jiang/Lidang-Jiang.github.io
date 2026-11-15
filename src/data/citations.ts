import data from '@/data/citation-counts.json'
import type { CitationMetric } from '@/types/citation'

export const citationCounts = data as Partial<Record<string, CitationMetric>>
