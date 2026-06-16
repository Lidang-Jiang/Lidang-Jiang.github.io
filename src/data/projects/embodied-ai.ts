import type { Project } from '@/types/project'
import { pullRequests } from '@/data/project-prs'
import { PROJECT_CATEGORIES } from '@/utils/project-groups'

export const embodiedAiProjects: Project[] = [
  {
    id: 38,
    title: {
      en: 'rclcpp',
      zh: 'rclcpp',
    },
    period: '2026.06.08',
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
      en: 'ROS 2 C++ client library.',
      zh: 'ROS 2 C++ 客户端库。',
    },
    techStack: ['C++', 'ROS 2', 'rclcpp', 'Client Library'],
    contributions: {
      en: [
        'Backported the already-merged rolling/kilted fix to Jazzy by initializing GenericClient result response offsets, reducing uninitialized-offset build and runtime risk.',
      ],
      zh: [
        '将 rolling/kilted 已合并修复 backport 到 Jazzy，初始化 GenericClient result response offsets，降低未初始化 offset 带来的编译与运行风险。',
      ],
    },
    github: 'https://github.com/ros2/rclcpp',
    githubStars: '764',
    pullRequests: pullRequests('https://github.com/ros2/rclcpp', [3139]),
  },
  {
    id: 37,
    title: {
      en: 'Launch ROS',
      zh: 'launch_ros',
    },
    period: '2026.05.10',
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
      en: 'ROS 2 launch tooling for starting and testing ROS nodes.',
      zh: 'ROS 2 节点启动与测试工具。',
    },
    techStack: ['Python', 'ROS 2', 'Launch', 'Testing'],
    contributions: {
      en: [
        'Rejected the deprecated node-name frontend key to keep launch descriptions aligned with current ROS 2 node naming behavior.',
      ],
      zh: [
        '拒绝 deprecated node-name frontend key，使 launch 描述与当前 ROS 2 节点命名行为保持一致。',
      ],
    },
    github: 'https://github.com/ros2/launch_ros',
    githubStars: '80',
    pullRequests: pullRequests('https://github.com/ros2/launch_ros', [538]),
  },
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
    githubStars: '12,048',
    pullRequests: pullRequests('https://github.com/Farama-Foundation/Gymnasium', [
      1553,
    ]),
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
    githubStars: '3,276',
    pullRequests: pullRequests('https://github.com/Farama-Foundation/HighwayEnv', [
      668,
    ]),
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
      en: 'General-purpose embodied-AI simulation platform.',
      zh: '通用具身智能仿真平台。',
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
    github: 'https://github.com/Genesis-Embodied-AI/genesis-world',
    githubStars: '29,350',
    pullRequests: pullRequests('https://github.com/Genesis-Embodied-AI/genesis-world', [
      2609,
      2610,
      2612,
      2613,
      2614,
      2653,
    ]),
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
    githubStars: '3,463',
    pullRequests: pullRequests('https://github.com/pytorch/rl', [3593]),
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
    github: 'https://github.com/mani-skill/ManiSkill',
    githubStars: '3,005',
    pullRequests: pullRequests('https://github.com/mani-skill/ManiSkill', [
      1402,
      1403,
    ]),
  },
]
