import type { Project } from '@/types/project'
import { PROJECT_CATEGORIES } from '@/utils/project-groups'

export const embodiedAiProjects: Project[] = [
  {
    id: 27,
    title: {
      en: 'HighwayEnv',
      zh: 'HighwayEnv',
    },
    period: '2026.04.08',
    category: PROJECT_CATEGORIES.embodiedAi,
    projectType: {
      en: 'Open-Source Contribution',
      zh: '开源贡献',
    },
    role: {
      en: 'Contributor',
      zh: '贡献者',
    },
    background: {
      en: 'Reinforcement-learning environment library for autonomous-driving scenarios.',
      zh: '面向自动驾驶场景的强化学习环境库。',
    },
    techStack: ['Python', 'Reinforcement Learning', 'SubprocVecEnv', 'Multiprocessing'],
    contributions: {
      en: [
        'Fixed SubprocVecEnv ConnectionResetError failures under forkserver and spawn start methods.',
      ],
      zh: [
        '修复 SubprocVecEnv 在 forkserver 与 spawn 模式下的 ConnectionResetError。',
      ],
    },
    github: 'https://github.com/Farama-Foundation/HighwayEnv',
    githubStars: '3,217',
  },
  {
    id: 19,
    title: {
      en: 'Genesis',
      zh: 'Genesis',
    },
    period: '2026.03.28 — 2026.04.05',
    category: PROJECT_CATEGORIES.embodiedAi,
    projectType: {
      en: 'Open-Source Contribution',
      zh: '开源贡献',
    },
    role: {
      en: 'Contributor',
      zh: '贡献者',
    },
    background: {
      en: 'General-purpose physics simulation platform for embodied AI and robotics workloads.',
      zh: '面向具身智能与机器人任务的通用物理仿真平台。',
    },
    techStack: ['Python', 'C++', 'Physics Simulation', 'Robotics', 'WSL2'],
    contributions: {
      en: [
        'Fixed GPU detection in WSL2 test infrastructure and corrected camera lookat behavior when entity_idx is set.',
        'Added public APIs for rigid-body kinetic and potential energy and fixed multi-robot IK DOF mapping.',
        'Fixed motion planning crashes on short paths and corrected the set_propellers_rpm API spelling.',
      ],
      zh: [
        '修复 WSL2 测试环境 GPU 检测问题，并修正设置 entity_idx 后 camera lookat 失效的问题。',
        '新增刚体动能与势能公开 API，并修复多机器人场景 IK 的 DOF 映射错误。',
        '修复短路径下 motion planning 崩溃，并更正 set_propellers_rpm API 拼写。',
      ],
    },
    github: 'https://github.com/Genesis-Embodied-AI/Genesis',
    githubStars: '28,444',
  },
  {
    id: 20,
    title: {
      en: 'PyTorch RL',
      zh: 'PyTorch RL',
    },
    period: '2026.04.05',
    category: PROJECT_CATEGORIES.embodiedAi,
    projectType: {
      en: 'Open-Source Contribution',
      zh: '开源贡献',
    },
    role: {
      en: 'Contributor',
      zh: '贡献者',
    },
    background: {
      en: 'Reinforcement learning library and training toolkit in the PyTorch ecosystem.',
      zh: 'PyTorch 生态中的强化学习组件库与训练工具集。',
    },
    techStack: ['Python', 'PyTorch', 'Reinforcement Learning'],
    contributions: {
      en: [
        'Added a strict_shape parameter to QValueModule for stronger action-shape enforcement.',
      ],
      zh: [
        '为 QValueModule 新增 strict_shape 参数，强化 action shape 校验。',
      ],
    },
    github: 'https://github.com/pytorch/rl',
    githubStars: '3,377',
  },
  {
    id: 21,
    title: {
      en: 'ManiSkill',
      zh: 'ManiSkill',
    },
    period: '2026.03.30',
    category: PROJECT_CATEGORIES.embodiedAi,
    projectType: {
      en: 'Open-Source Contribution',
      zh: '开源贡献',
    },
    role: {
      en: 'Contributor',
      zh: '贡献者',
    },
    background: {
      en: 'Robotics simulation and benchmark platform for manipulation tasks.',
      zh: '面向机器人操作任务的仿真与 benchmark 平台。',
    },
    techStack: ['Python', 'Robotics', 'Gymnasium', 'Benchmark'],
    contributions: {
      en: [
        'Fixed trajectory replay compatibility with gymnasium>=1.0.',
        'Corrected the PlugCharger-v1 dense reward label in the docs.',
      ],
      zh: [
        '修复 replay_trajectory 在 gymnasium>=1.0 下的 AttributeError。',
        '修正文档中 PlugCharger-v1 dense reward 标签错误。',
      ],
    },
    github: 'https://github.com/haosulab/ManiSkill',
    githubStars: '2,753',
  },
]
