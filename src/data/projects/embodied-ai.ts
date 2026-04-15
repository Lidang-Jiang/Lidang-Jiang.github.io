import type { Project } from '@/types/project'
import { PROJECT_CATEGORIES } from '@/utils/project-groups'

export const embodiedAiProjects: Project[] = [
  {
    id: 32,
    title: {
      en: 'Gymnasium',
      zh: 'Gymnasium',
    },
    period: '2026.04.12',
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
      en: 'Standard reinforcement-learning environment API maintained by the Farama Foundation.',
      zh: 'Farama Foundation 维护的单智能体强化学习环境标准库。',
    },
    techStack: ['Python', 'Gymnasium', 'RL Environments', 'Wrappers'],
    contributions: {
      en: ['Added a RepeatAction wrapper to support repeated-action execution.'],
      zh: ['新增 RepeatAction wrapper，补充动作重复封装能力。'],
    },
    github: 'https://github.com/Farama-Foundation/Gymnasium',
    githubStars: '11,713',
  },
  {
    id: 27,
    title: {
      en: 'HighwayEnv',
      zh: 'HighwayEnv',
    },
    period: '2026.04.07',
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
      en: 'Autonomous-driving reinforcement-learning environment library.',
      zh: '面向自动驾驶场景的强化学习环境库。',
    },
    techStack: ['Python', 'Reinforcement Learning', 'SubprocVecEnv', 'Multiprocessing'],
    contributions: {
      en: ['Fixed SubprocVecEnv ConnectionResetError failures under forkserver and spawn start methods.'],
      zh: ['修复 SubprocVecEnv 在 forkserver 与 spawn 模式下的 ConnectionResetError。'],
    },
    github: 'https://github.com/Farama-Foundation/HighwayEnv',
    githubStars: '3,229',
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
      en: 'General-purpose embodied-AI and robotics simulation platform.',
      zh: '面向具身智能与机器人任务的通用物理仿真平台。',
    },
    techStack: ['Python', 'C++', 'Physics Simulation', 'Robotics', 'WSL2'],
    contributions: {
      en: [
        'Fixed short-path motion planning crashes, multi-robot IK DOF mapping, and camera lookat behavior.',
        'Added public APIs for rigid-body kinetic and potential energy, and fixed WSL2 GPU detection.',
      ],
      zh: [
        '修复短路径 motion planning 崩溃、多机器人 IK DOF 映射与 camera lookat 行为问题。',
        '新增刚体动能与势能公开 API，并修复 WSL2 GPU 检测与 propeller API 相关问题。',
      ],
    },
    github: 'https://github.com/Genesis-Embodied-AI/Genesis',
    githubStars: '28,501',
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
      en: 'Reinforcement-learning toolkit in the PyTorch ecosystem.',
      zh: 'PyTorch 生态中的强化学习组件库与训练工具集。',
    },
    techStack: ['Python', 'PyTorch', 'Reinforcement Learning'],
    contributions: {
      en: ['Added a strict_shape parameter to QValueModule for stronger action-shape validation.'],
      zh: ['为 QValueModule 新增 strict_shape 参数，强化 action shape 校验。'],
    },
    github: 'https://github.com/pytorch/rl',
    githubStars: '3,392',
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
      en: 'Robotics manipulation simulator and benchmark platform.',
      zh: '机器人操作仿真与 benchmark 平台。',
    },
    techStack: ['Python', 'Robotics', 'Gymnasium', 'Benchmark'],
    contributions: {
      en: [
        'Fixed replay_trajectory compatibility with gymnasium>=1.0.',
        'Corrected the PlugCharger-v1 dense-reward label in the documentation.',
      ],
      zh: [
        '修复 replay_trajectory 在 gymnasium>=1.0 下的兼容性问题。',
        '修正文档中的 PlugCharger-v1 dense reward 标签。',
      ],
    },
    github: 'https://github.com/haosulab/ManiSkill',
    githubStars: '2,779',
  },
]
