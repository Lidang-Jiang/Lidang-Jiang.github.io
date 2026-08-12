export const collaborationItemKeys = [
  'aiInfra',
  'embodiedAi',
  'systemsEngineering',
  'web',
] as const

export type CollaborationItemKey = (typeof collaborationItemKeys)[number]
