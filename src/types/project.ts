export interface ProjectPullRequest {
  number: number
  url: string
}

export interface Project {
  id: number
  title: {
    en: string
    zh: string
  }
  period: string
  category?: {
    en: string
    zh: string
  }
  projectType?: {
    en: string
    zh: string
  }
  role?: {
    en: string
    zh: string
  }
  module?: {
    en: string
    zh: string
  }
  background: {
    en: string
    zh: string
  }
  techStack: string[]
  contributions: {
    en: string[]
    zh: string[]
  }
  achievements?: {
    en: string
    zh: string
  }
  github?: string
  githubStars?: string
  pullRequests?: ProjectPullRequest[]
  demo?: string
}
