import type { Project } from '@/types/project'
import { PROJECT_CATEGORIES } from '@/utils/project-groups'

export const aiInfraProjects: Project[] = [
  {
    id: 13,
    title: {
      en: 'vLLM-Kunlun (Baidu Kunlun Chip Inference Framework)',
      zh: 'vLLM-Kunlun（百度昆仑芯大模型推理框架）',
    },
    period: '2025.08.18 — Present',
    category: PROJECT_CATEGORIES.aiInfra,
    projectType: {
      en: 'Open-Source Contribution + Product Delivery',
      zh: '开源贡献 + 业务落地',
    },
    role: {
      en: 'Contributor / MLsys Engineer',
      zh: '贡献者 / MLsys 工程',
    },
    background: {
      en: 'vLLM inference framework for Kunlun XPU, used to bring high-performance LLM serving to Baidu Kunlun P800 hardware.',
      zh: '面向 Kunlun XPU 的 vLLM 推理框架，用于在百度昆仑 P800 上支撑高性能大模型服务。',
    },
    techStack: ['Python', 'PyTorch', 'vLLM', 'Kunlun XPU', 'LLM Inference'],
    contributions: {
      en: [
        'Helped narrow a Qwen2.5-7B Attention failure on P800 Float16 before open-sourcing.',
        'Landed 6 merged PRs spanning InternVL KeyError fixes, collect_env.py diagnostics, 0.15.1 release alignment, and documentation cleanup.',
      ],
      zh: [
        '在开源前协助定位 Qwen2.5-7B 在 P800 Float16 下的 Attention 故障。',
        '开源后累计合入 6 个 PR，覆盖 InternVL KeyError、collect_env.py 环境诊断、0.15.1 版本治理与文档清理。',
      ],
    },
    achievements: {
      en: 'Credited in the official acknowledgments after landing 6 merged PRs.',
      zh: '名字被收录进官方致谢，并已有 6 个已合并 PR。',
    },
    github: 'https://github.com/baidu/vLLM-Kunlun',
    githubStars: '397',
  },
  {
    id: 29,
    title: {
      en: 'ExecuTorch',
      zh: 'ExecuTorch',
    },
    period: '2026.04.10',
    category: PROJECT_CATEGORIES.aiInfra,
    projectType: {
      en: 'Open-Source Contribution',
      zh: '开源贡献',
    },
    role: {
      en: 'Contributor',
      zh: '贡献者',
    },
    background: {
      en: 'PyTorch runtime for on-device AI inference across mobile and edge environments.',
      zh: '面向移动端与边缘设备的 PyTorch 端侧 AI 推理运行时。',
    },
    techStack: ['PyTorch', 'ExecuTorch', 'XNNPACK', 'Dynamic Shapes', 'Testing'],
    contributions: {
      en: ['Added dynamic-shape tests for xnnpack to improve on-device regression coverage.'],
      zh: ['为 xnnpack 新增动态 shape 测试，补齐端侧推理回归覆盖。'],
    },
    github: 'https://github.com/pytorch/executorch',
    githubStars: '4,509',
  },
  {
    id: 25,
    title: {
      en: 'LitServe',
      zh: 'LitServe',
    },
    period: '2026.04.07 — 2026.04.09',
    category: PROJECT_CATEGORIES.aiInfra,
    projectType: {
      en: 'Open-Source Contribution',
      zh: '开源贡献',
    },
    role: {
      en: 'Contributor',
      zh: '贡献者',
    },
    background: {
      en: 'AI inference serving framework maintained by Lightning AI for multi-API and multi-model deployments.',
      zh: 'Lightning AI 维护的 AI 推理服务框架，支持多 API 与多模型部署。',
    },
    techStack: ['Python', 'Model Serving', 'Authentication', 'Health Checks'],
    contributions: {
      en: [
        'Fixed an authentication bypass in multi-API deployments.',
        'Fixed health-check exception handling, stale state, and concurrency behavior.',
      ],
      zh: [
        '修复多 API 部署场景下的鉴权绕过问题。',
        '修复健康检查的异常处理、状态过期与并发一致性问题。',
      ],
    },
    github: 'https://github.com/Lightning-AI/LitServe',
    githubStars: '3,857',
  },
  {
    id: 30,
    title: {
      en: 'Olive',
      zh: 'Olive',
    },
    period: '2026.04.08',
    category: PROJECT_CATEGORIES.aiInfra,
    projectType: {
      en: 'Open-Source Contribution',
      zh: '开源贡献',
    },
    role: {
      en: 'Contributor',
      zh: '贡献者',
    },
    background: {
      en: 'Microsoft toolkit for model finetuning, conversion, quantization, and deployment optimization.',
      zh: '微软维护的模型微调、转换、量化与部署优化工具。',
    },
    techStack: ['Python', 'Olive', 'Quantization', 'HQQ', 'RTN'],
    contributions: {
      en: ['Fixed external data loading in the HQQ and RTN quantization workflows.'],
      zh: ['修复 HQQ 与 RTN 量化流程对外部数据文件的加载问题。'],
    },
    github: 'https://github.com/microsoft/Olive',
    githubStars: '2,296',
  },
  {
    id: 31,
    title: {
      en: 'anomalib',
      zh: 'anomalib',
    },
    period: '2026.04.08',
    category: PROJECT_CATEGORIES.aiInfra,
    projectType: {
      en: 'Open-Source Contribution',
      zh: '开源贡献',
    },
    role: {
      en: 'Contributor',
      zh: '贡献者',
    },
    background: {
      en: 'Open-source anomaly detection library for industrial inspection and vision workloads.',
      zh: '面向工业检测与视觉任务的开源异常检测库。',
    },
    techStack: ['Python', 'anomalib', 'Pandas', 'DataFrame', 'Vision'],
    contributions: {
      en: ['Fixed pandas>=3.0 DataFrame compatibility by switching enum serialization to .value semantics.'],
      zh: ['修复 pandas>=3.0 下的 DataFrame 兼容性问题，避免枚举值写入异常。'],
    },
    github: 'https://github.com/open-edge-platform/anomalib',
    githubStars: '5,636',
  },
  {
    id: 28,
    title: {
      en: 'PyTorch AO',
      zh: 'PyTorch AO',
    },
    period: '2026.04.07',
    category: PROJECT_CATEGORIES.aiInfra,
    projectType: {
      en: 'Open-Source Contribution',
      zh: '开源贡献',
    },
    role: {
      en: 'Contributor',
      zh: '贡献者',
    },
    background: {
      en: 'PyTorch model optimization and quantization toolkit for compiler and inference workflows.',
      zh: 'PyTorch 模型优化与量化工具库，服务于编译与推理工作流。',
    },
    techStack: ['Python', 'PyTorch', 'PT2E', 'Quantization'],
    contributions: {
      en: ['Skipped linear+bn fusion for inputs above rank 2 in PT2E flows to prevent invalid graph rewrites.'],
      zh: ['在 PT2E 场景下为高于 2 维输入跳过 linear+bn 融合，避免错误图优化。'],
    },
    github: 'https://github.com/pytorch/ao',
    githubStars: '2,775',
  },
  {
    id: 14,
    title: {
      en: 'SGLang',
      zh: 'SGLang',
    },
    period: '2026.04.06',
    category: PROJECT_CATEGORIES.aiInfra,
    projectType: {
      en: 'Open-Source Contribution',
      zh: '开源贡献',
    },
    role: {
      en: 'Contributor',
      zh: '贡献者',
    },
    background: {
      en: 'High-performance LLM and multimodal serving framework focused on optimized runtime and deployment.',
      zh: '面向大模型与多模态服务的高性能推理框架，聚焦运行时优化与部署能力。',
    },
    techStack: ['Python', 'PyTorch', 'LLM Serving', 'Authentication', 'Testing'],
    contributions: {
      en: [
        'Added auth and token validation unit tests for auth.py.',
        'Added regression coverage for Hermes, Llama32, and Mistral function_call detectors.',
      ],
      zh: [
        '为 auth.py 增补鉴权与 token 校验单元测试。',
        '为 Hermes、Llama32、Mistral 的 function_call detector 补充回归测试。',
      ],
    },
    github: 'https://github.com/sgl-project/sglang',
    githubStars: '25,831',
  },
  {
    id: 15,
    title: {
      en: 'RLLM',
      zh: 'RLLM',
    },
    period: '2026.04.04',
    category: PROJECT_CATEGORIES.aiInfra,
    projectType: {
      en: 'Open-Source Contribution',
      zh: '开源贡献',
    },
    role: {
      en: 'Contributor',
      zh: '贡献者',
    },
    background: {
      en: 'RL-for-LLM research framework with integrations such as verl for training workflows.',
      zh: '面向强化学习与大模型协同训练的研究框架，可与 verl 等组件集成。',
    },
    techStack: ['Python', 'RLHF', 'verl', 'Training'],
    contributions: {
      en: ['Updated import-path compatibility for verl 0.7.1+ after upstream path changes.'],
      zh: ['更新 verl 0.7.1+ 的 import path 兼容逻辑，修复上游路径变更导致的导入失败。'],
    },
    github: 'https://github.com/rllm-org/rllm',
    githubStars: '5,426',
  },
  {
    id: 16,
    title: {
      en: 'vLLM-Omni',
      zh: 'vLLM-Omni',
    },
    period: '2026.03.05 — 2026.04.03',
    category: PROJECT_CATEGORIES.aiInfra,
    projectType: {
      en: 'Open-Source Contribution',
      zh: '开源贡献',
    },
    role: {
      en: 'Contributor',
      zh: '贡献者',
    },
    background: {
      en: 'Multimodal and omni inference extension built on vLLM for speech and text generation scenarios.',
      zh: '基于 vLLM 的 omni 与多模态推理扩展，覆盖语音和文本生成场景。',
    },
    techStack: ['Python', 'vLLM', 'Multimodal', 'Gradio', 'Logging'],
    contributions: {
      en: [
        'Fixed error-response HTTP status handling for create_speech.',
        'Made gradio optional and replaced bare print calls with structured logging.',
      ],
      zh: [
        '修复 create_speech 错误响应的 HTTP 状态码处理。',
        '将 gradio 调整为可选依赖，并用结构化 logger 替换 bare print。',
      ],
    },
    github: 'https://github.com/vllm-project/vllm-omni',
    githubStars: '4,302',
  },
  {
    id: 17,
    title: {
      en: 'OpenRLHF',
      zh: 'OpenRLHF',
    },
    period: '2026.04.03',
    category: PROJECT_CATEGORIES.aiInfra,
    projectType: {
      en: 'Open-Source Contribution',
      zh: '开源贡献',
    },
    role: {
      en: 'Contributor',
      zh: '贡献者',
    },
    background: {
      en: 'Distributed RLHF training framework for alignment experiments on large models.',
      zh: '面向大模型对齐实验的分布式 RLHF 训练框架。',
    },
    techStack: ['Python', 'Ray', 'RLHF', 'NCCL'],
    contributions: {
      en: ['Ensured the Ray runtime respects user-defined NCCL_DEBUG values instead of overwriting them.'],
      zh: ['在 Ray runtime 中尊重用户显式设置的 NCCL_DEBUG 环境变量，避免配置被覆盖。'],
    },
    github: 'https://github.com/OpenRLHF/OpenRLHF',
    githubStars: '9,347',
  },
  {
    id: 26,
    title: {
      en: 'Baidu AIAK-SGLang DeepSeek / GLM5 PD Deployment',
      zh: '百度 AIAK-SGLang DeepSeek / GLM5 PD 分离部署',
    },
    period: '2026.03.17 — 2026.04.02',
    category: PROJECT_CATEGORIES.aiInfra,
    projectType: {
      en: 'Closed-Source Baidu AI Inference System',
      zh: '百度闭源 AI 推理系统',
    },
    role: {
      en: 'MLsys / Inference Engineer',
      zh: 'MLsys / 推理工程',
    },
    module: {
      en: 'PD deployment, benchmarking, and operator-level performance debugging',
      zh: 'PD 分离部署、性能压测与算子级性能排查',
    },
    background: {
      en: 'Built Prefill/Decode-disaggregated deployments for DeepSeek-V3.2 and GLM5 on Kunlun P800 clusters with the AIAK-customized SGLang stack.',
      zh: '基于 AIAK 定制版 SGLang，在昆仑 P800 集群上推进 DeepSeek-V3.2 与 GLM5 的 Prefill/Decode 分离部署。',
    },
    techStack: ['SGLang', 'AIAK', 'Kunlun P800', 'Kubernetes', 'aiakperf'],
    contributions: {
      en: [
        'Completed TP/DP/EP tuning plus multi-node deployment bring-up for DeepSeek and GLM5.',
        'Ran aiakperf benchmarking while tracking TTFT, TPOT, and running-queue metrics.',
        'Maintained dump pipelines to support operator-level performance investigations.',
      ],
      zh: [
        '完成 DeepSeek 与 GLM5 的多机多卡 TP/DP/EP 参数调优与部署联调。',
        '使用 aiakperf 压测并持续跟踪 TTFT、TPOT 与 running queue 等指标。',
        '维护 dump 脚本链路，为算子级性能排查提供定位基础。',
      ],
    },
  },
  {
    id: 18,
    title: {
      en: 'Transformers',
      zh: 'Transformers',
    },
    period: '2026.03.30',
    category: PROJECT_CATEGORIES.aiInfra,
    projectType: {
      en: 'Open-Source Contribution',
      zh: '开源贡献',
    },
    role: {
      en: 'Contributor',
      zh: '贡献者',
    },
    background: {
      en: "Hugging Face's flagship model library for model implementations, training, and inference tooling.",
      zh: 'Hugging Face 的主流模型库，覆盖模型实现、训练与推理工具链。',
    },
    techStack: ['Python', 'Transformers', 'PIL', 'TorchVision'],
    contributions: {
      en: ['Removed an incorrect torchvision dependency from PIL backend image processors.'],
      zh: ['移除 PIL backend image processor 对 torchvision 的错误依赖，减少不必要安装与运行失败。'],
    },
    github: 'https://github.com/huggingface/transformers',
    githubStars: '159,387',
  },
]
