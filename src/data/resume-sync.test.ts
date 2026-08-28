import { describe, expect, it } from 'vitest'

import { profile } from '@/data/profile'
import { projects } from '@/data/projects'
import { workExperiences } from '@/data/work'
import en from '@/i18n/en'
import zh from '@/i18n/zh'

const EXPECTED_GITHUB_STARS = new Map<string, string>([
  ['https://github.com/baidu/vLLM-Kunlun', '461'],
  ['https://github.com/modelscope/FunASR', '19,728'],
  ['https://github.com/vllm-project/vllm', '88,561'],
  ['https://github.com/openclaw/openclaw', '385,590'],
  ['https://github.com/pytorch/executorch', '4,876'],
  ['https://github.com/Lightning-AI/LitServe', '3,923'],
  ['https://github.com/microsoft/Olive', '2,377'],
  ['https://github.com/open-edge-platform/anomalib', '6,025'],
  ['https://github.com/pytorch/ao', '2,932'],
  ['https://github.com/sgl-project/sglang', '31,555'],
  ['https://github.com/rllm-org/rllm', '5,771'],
  ['https://github.com/vllm-project/vllm-omni', '5,976'],
  ['https://github.com/OpenRLHF/OpenRLHF', '9,897'],
  ['https://github.com/huggingface/transformers', '163,484'],
  ['https://github.com/ros2/rclcpp', '787'],
  ['https://github.com/ros2/launch_ros', '82'],
  ['https://github.com/Farama-Foundation/Gymnasium', '12,301'],
  ['https://github.com/Farama-Foundation/HighwayEnv', '3,298'],
  ['https://github.com/Genesis-Embodied-AI/genesis-world', '29,718'],
  ['https://github.com/pytorch/rl', '3,512'],
  ['https://github.com/mani-skill/ManiSkill', '3,209'],
  ['https://github.com/kubernetes/kubernetes', '124,377'],
  ['https://github.com/apify/crawlee-python', '9,414'],
  ['https://github.com/FreeOpcUa/opcua-asyncio', '1,453'],
  ['https://github.com/docker/compose', '38,035'],
  ['https://github.com/affaan-m/ECC', '238,856'],
  ['https://github.com/Lidang-Jiang/UniversityResearcherProfiles', '0'],
])

const EXPECTED_CURRENT_INTERESTS = {
  en: 'my current interests include embodied AI, robotics, inference acceleration, AI infrastructure, embedded software, and hardware engineering.',
  zh: '当前关注方向包括具身智能、机器人、推理加速、AI 基础设施、嵌入式开发与硬件工程。',
}

const EXPECTED_ABOUT_PARAGRAPHS = {
  en: `After completing my master's degree, I have continued to build hands-on experience in AI systems engineering and open-source collaboration. I am passionate about using AI to build everything from inference systems to embodied robots, and ${EXPECTED_CURRENT_INTERESTS.en}`,
  zh: `硕士毕业后，我持续在 AI 系统工程与开源协作中积累工程能力，也始终热衷于用 AI 构建从推理系统到具身机器人的工程系统。${EXPECTED_CURRENT_INTERESTS.zh}`,
}

describe('resume website synchronization', () => {
  it('matches the current target role, compensation, and employment status', () => {
    const expectedPosition = {
      en: 'MLsys - Embodied Intelligence - AI - Robotics - Embedded Software / Hardware Engineer',
      zh: 'MLsys-具身智能-AI-机器人-嵌入式软件/硬件工程师',
    }

    expect(profile.title).toEqual(expectedPosition)
    expect(profile.position).toEqual(expectedPosition)
    expect(profile.targetRoles).toEqual({
      en: [
        'MLsys',
        'Embodied Intelligence',
        'AI',
        'Robotics',
        'Embedded Software Engineer',
        'Hardware Engineer',
      ],
      zh: [
        'MLsys',
        '具身智能',
        'AI',
        '机器人',
        '嵌入式软件工程师',
        '硬件工程师',
      ],
    })
    expect(en.cv.position).toBe('Career Focus')
    expect(zh.cv.position).toBe('求职方向')
    expect(profile.salary).toEqual({
      en: '30k-35k/mo × 15 monthly salaries',
      zh: '30k-35k/月 × 15薪',
    })
    expect(profile.employmentStatus).toEqual({
      en: 'Employed; start date negotiable',
      zh: '在职，到岗时间面议',
    })
  })

  it('lists the current embedded role first with localized dates and compensation', () => {
    expect(workExperiences[0]).toEqual({
      company: {
        en: 'ManpowerGroup Enterprise Management Consulting (Shanghai) Co., Ltd.',
        zh: '万宝盛华企业管理咨询（上海）有限公司',
      },
      position: {
        en: 'Software Development Engineer (Embedded Systems)',
        zh: '软件开发工程师（嵌入式方向）',
      },
      period: {
        en: '2026.07 - Present',
        zh: '2026.07 - 至今',
      },
      description: {
        en: 'Department: OpenHarmony Enablement Department (Device BG); base: Bantian, Shenzhen; compensation: CNY 19,500/month | 14–16 monthly salaries',
        zh: '部门：OpenHarmony使能部（终端BG）；工作地点：深圳坂田；薪资：19,500 元/月 | （14–16）薪',
      },
    })

    expect(workExperiences[0]?.description?.en).toContain(' | ')
    expect(workExperiences[0]?.description?.en).not.toContain('×')
    expect(workExperiences[0]?.description?.zh).toContain(' | ')
    expect(workExperiences[0]?.description?.zh).not.toContain('×')

    expect(workExperiences[1]?.position).toEqual({
      en: 'Python Backend Developer (AI Inference Framework)',
      zh: 'AI计算-Python后端开发工程师（AI推理框架）',
    })
  })

  it('lists prior-role compensation and introductory pay discounts', () => {
    expect(workExperiences[1]?.description).toEqual({
      en: 'Compensation: CNY 16,500/month | 12 monthly salaries | first 3 months paid at 80%',
      zh: '薪资：16,500 元/月 | 12 薪 | 前 3 个月按 80% 发放',
    })
    expect(workExperiences[2]?.description).toEqual({
      en: 'Large Language Model Algorithm Engineer (2024.07 - 2024.09), Front-end Development Engineer (2024.09 - 2025.06); compensation: CNY 8,000/month | 12 monthly salaries | first 2 months paid at 80%',
      zh: '大模型算法工程师（2024.07 - 2024.09），前端开发工程师（2024.09 - 2025.06）；薪资：8,000 元/月 | 12 薪 | 前 2 个月按 80% 发放',
    })
  })

  it('includes embedded software and hardware in both introductions', () => {
    expect(en.about.p3).toBe(EXPECTED_ABOUT_PARAGRAPHS.en)
    expect(en.cv.selfEvaluation.content).toContain(EXPECTED_CURRENT_INTERESTS.en)
    expect(zh.about.p3).toBe(EXPECTED_ABOUT_PARAGRAPHS.zh)
    expect(zh.cv.selfEvaluation.content).toContain(EXPECTED_CURRENT_INTERESTS.zh)
  })

  it('matches the resume GitHub Stars snapshot for every linked repository', () => {
    const actualGithubStars = new Map(
      projects.flatMap((project) =>
        project.github && project.githubStars
          ? [[project.github, project.githubStars] as const]
          : [],
      ),
    )

    expect(actualGithubStars).toEqual(EXPECTED_GITHUB_STARS)
  })

  it('includes both merged OpenClaw pull requests and the Gmail watcher fix', () => {
    const openClaw = projects.find((project) => project.title.en === 'OpenClaw')

    expect(openClaw?.period).toBe('2026.04.28 — 2026.07.29')
    expect(openClaw?.pullRequests?.map(({ number }) => number)).toEqual([
      66285,
      56720,
    ])
    expect(openClaw?.contributions.en).toContain(
      'Made the Gmail watcher exclude SPAM, TRASH, DRAFT, and SENT labels to prevent sent mail and drafts from entering inbound hook processing, with regression coverage.',
    )
    expect(openClaw?.contributions.zh).toContain(
      '为 Gmail watcher 固定排除 SPAM、TRASH、DRAFT、SENT 标签，避免已发送邮件和草稿进入入站 hook 处理流程，并补充回归测试。',
    )
  })
})
