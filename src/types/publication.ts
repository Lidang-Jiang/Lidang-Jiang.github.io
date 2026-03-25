export interface Publication {
  id: string
  title: string
  authors: string
  journal: string
  volume: string
  year: number
  doi: string
  impactFactor: number
  issn?: string
  pdf: string
  image: string
  abstract: {
    en: string
    zh: string
  }
  citation: string
}
