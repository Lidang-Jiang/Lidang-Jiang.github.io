import type { Project } from '@/types/project'

import { aiInfraProjects } from './projects/ai-infra'
import { embodiedAiProjects } from './projects/embodied-ai'
import { systemsEngineeringProjects } from './projects/systems-engineering'
import { webProjects } from './projects/web'

export const projects: Project[] = [
  ...aiInfraProjects,
  ...embodiedAiProjects,
  ...systemsEngineeringProjects,
  ...webProjects,
]
