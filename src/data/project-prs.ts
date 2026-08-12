import type { ProjectPullRequest } from '@/types/project'

export function pullRequests(
  github: string,
  numbers: number[],
): ProjectPullRequest[] {
  return numbers.map((number) => ({
    number,
    url: `${github}/pull/${number}`,
  }))
}
