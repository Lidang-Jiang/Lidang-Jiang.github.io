import type { Project } from '@/types/project'
import { PROJECT_CATEGORIES } from '@/utils/project-groups'

export const aiInfraProjects: Project[] = [
  {
    id: 13,
    title: {
      en: 'vLLM-Kunlun (Baidu Kunlun Chip LLM Inference Framework)',
      zh: 'vLLM-Kunlun（百度昆仑芯大模型推理框架）',
    },
    period: '2025.08.18 — Present',
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
      en: 'LLM inference framework for Baidu Kunlun XPU that adapts capabilities such as PagedAttention to Kunlun P800 on a Python (PyTorch) / C++ stack, enabling high-performance inference for mainstream models such as Qwen.',
      zh: '面向百度昆仑芯（XPU）的大模型推理框架，在 Python（PyTorch）/ C++ 栈上将 PagedAttention 等关键能力适配到 Kunlun P800，支持 Qwen 等主流模型高性能推理。',
    },
    techStack: ['Python', 'PyTorch', 'C++', 'Kunlun P800', 'PagedAttention'],
    contributions: {
      en: [
        'Resolved garbled Qwen2.5-7B outputs on P800 Float16 by comparing tensor statistics around the Attention path and narrowing the issue to the Attention operator internals.',
        'Fixed an InternVL inference KeyError, added built-in environment diagnostics, and aligned code plus documentation versioning to 0.15.1.',
        'Improved installation and tutorial docs, fixed Sphinx warnings that broke Read the Docs builds, and removed deprecated flags across 15 documentation files.',
      ],
      zh: [
        '解决 Qwen2.5-7B 在 P800 Float16 环境下输出乱码问题，通过比对 Attention 路径前后的张量统计信息，将故障范围收敛到 Attention 算子内部。',
        '修复 InternVL 推理 KeyError，新增内置环境诊断能力，并统一代码与文档版本到 0.15.1。',
        '优化安装与教程文档，修复导致 Read the Docs 构建失败的 Sphinx warnings，并移除 15 个文档文件中的废弃参数。',
      ],
    },
    achievements: {
      en: 'Included in the official documentation Acknowledgments and credited for 6 merged PRs after open-sourcing.',
      zh: '名字被收录于官方文档 Acknowledgments，开源后已有 6 个已合并 PR。',
    },
    github: 'https://github.com/baidu/vLLM-Kunlun',
    githubStars: '388',
  },
  {
    id: 25,
    title: {
      en: 'LitServe',
      zh: 'LitServe',
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
      en: 'Model serving framework maintained by Lightning AI, supporting multi-API and multi-model deployments.',
      zh: 'Lightning AI 维护的模型服务框架，支持多 API 与多模型部署。',
    },
    techStack: ['Python', 'Model Serving', 'Authentication', 'Multi-API'],
    contributions: {
      en: [
        'Fixed an authentication bypass in multi-API deployments.',
      ],
      zh: [
        '修复多 API 部署场景下的鉴权绕过问题。',
      ],
    },
    github: 'https://github.com/Lightning-AI/LitServe',
    githubStars: '3,859',
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
      en: 'High-performance LLM serving and inference framework focused on optimized runtime and multi-backend deployment.',
      zh: '面向大模型在线服务、推理优化与多后端部署的高性能推理框架。',
    },
    techStack: ['Python', 'PyTorch', 'LLM Serving', 'Testing'],
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
    githubStars: '25,531',
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
      en: 'Research framework for reinforcement learning and LLM training workflows with integrations such as verl.',
      zh: '面向强化学习与大模型协同训练的研究框架，支持与 verl 等组件集成。',
    },
    techStack: ['Python', 'RLHF', 'verl', 'Training'],
    contributions: {
      en: [
        'Updated import-path compatibility for verl 0.7.1+ to prevent failures after upstream path changes.',
      ],
      zh: [
        '更新 verl 0.7.1+ 的 import path 兼容逻辑，修复上游路径变更导致的导入失败。',
      ],
    },
    github: 'https://github.com/rllm-org/rllm',
    githubStars: '5,391',
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
      en: 'Omni and multimodal inference extension built on vLLM for speech and text generation scenarios.',
      zh: '基于 vLLM 的 omni 与多模态推理扩展，覆盖语音与文本等生成场景。',
    },
    techStack: ['Python', 'vLLM', 'Multimodal', 'Gradio', 'Logging'],
    contributions: {
      en: [
        'Replaced bare print calls with structured logging and narrowed exception handling.',
        'Made gradio optional and updated the version floor to improve dependency flexibility.',
        'Fixed HTTP status handling for create_speech error responses.',
      ],
      zh: [
        '用结构化 logger 替换 bare print，并收紧异常处理范围。',
        '将 gradio 调整为可选依赖并更新版本下界，提升依赖兼容性。',
        '修复 create_speech 错误响应的 HTTP 状态码处理。',
      ],
    },
    github: 'https://github.com/vllm-project/vllm-omni',
    githubStars: '4,152',
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
      en: 'Distributed training framework for RLHF and alignment experiments.',
      zh: '面向 RLHF 训练与对齐实验的分布式训练框架。',
    },
    techStack: ['Python', 'Ray', 'RLHF', 'NCCL'],
    contributions: {
      en: [
        'Ensured the Ray runtime respects user-defined NCCL_DEBUG values instead of overwriting them.',
      ],
      zh: [
        '确保 Ray runtime 尊重用户显式设置的 NCCL_DEBUG 环境变量，避免配置被覆盖。',
      ],
    },
    github: 'https://github.com/OpenRLHF/OpenRLHF',
    githubStars: '9,321',
  },
  {
    id: 26,
    title: {
      en: 'Baidu AIAK-SGLang DeepSeek / GLM5 PD Deployment and Performance Debugging',
      zh: '百度 AIAK-SGLang DeepSeek / GLM5 PD 分离部署与性能排查',
    },
    period: '2026.03.17 — 2026.04.02',
    category: PROJECT_CATEGORIES.aiInfra,
    projectType: {
      en: 'Closed-Source Baidu AI Inference System',
      zh: '百度闭源 AI 推理系统项目',
    },
    role: {
      en: 'MLsys / Inference Engineer',
      zh: 'MLsys / 推理工程',
    },
    module: {
      en: 'Kubernetes PD deployment, benchmarking, and operator debugging preparation',
      zh: 'Kubernetes PD 分离部署、性能压测与算子排障准备',
    },
    background: {
      en: 'Built Prefill/Decode disaggregated deployments for DeepSeek-V3.2 and GLM5 on Baidu Kunlun P800 clusters with the AIAK-customized SGLang stack, covering multi-node parameter tuning, Mooncake/RDMA KV-cache transport, and service scheduling bring-up.',
      zh: '基于 AIAK 定制版 SGLang，在昆仑 P800 集群上推进 DeepSeek-V3.2 与 GLM5 的 Prefill/Decode 分离部署，覆盖多机多卡参数调优、Mooncake/RDMA KV Cache 传输与服务调度链路联调。',
    },
    techStack: [
      'SGLang',
      'Kubernetes',
      'FedDeployment',
      'RDMA',
      'Performance Benchmarking',
    ],
    contributions: {
      en: [
        'Implemented K8s and FedDeployment manifests, launch scripts, and TP/DP/EP tuning for DeepSeek and GLM5.',
        'Ran QPS 1-5 benchmarking with aiakperf and dashboards while tracking TTFT, TPOT, and running-queue metrics.',
        'Prepared dump pipelines for topk, sparse prefill, gather paged scale, and I8 MQA logits to support operator-level performance investigations.',
      ],
      zh: [
        '完成 DeepSeek 与 GLM5 的 K8s / FedDeployment 配置、启动脚本与 TP/DP/EP 参数调优。',
        '使用 aiakperf 与监控面板开展 QPS 1-5 压测，跟踪 TTFT、TPOT 与 running queue 等指标。',
        '为 topk、sparse prefill、gather paged scale、I8 MQA logits 等算子排查准备 dump 数据采集链路。',
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
      en: 'Flagship Hugging Face library for model implementations plus training and inference utilities.',
      zh: 'Hugging Face 维护的主流模型库与训练、推理工具链。',
    },
    techStack: ['Python', 'Transformers', 'PIL', 'TorchVision'],
    contributions: {
      en: [
        'Removed the incorrect torchvision requirement from PIL backend image processors to reduce unnecessary installs and runtime breakage.',
      ],
      zh: [
        '移除 PIL backend image processor 对 torchvision 的错误依赖，减少不必要安装与运行失败。',
      ],
    },
    github: 'https://github.com/huggingface/transformers',
    githubStars: '158,994',
  },
  {
    id: 1,
    title: {
      en: 'Haikou Police Administrative Knowledge Base',
      zh: '海口公安政务知识库',
    },
    period: '2024.07.25 — 2024.09.25',
    category: PROJECT_CATEGORIES.aiInfra,
    projectType: {
      en: 'Government AI Application',
      zh: '政务AI应用',
    },
    role: {
      en: 'Algorithm Engineer',
      zh: '算法工程',
    },
    module: {
      en: 'RAG system construction and LLM evaluation',
      zh: 'RAG 系统构建和大模型评测',
    },
    background: {
      en: 'Developed an intelligent administrative knowledge base for the Haikou Police System, using Retrieval-Augmented Generation to improve answer quality for administrative knowledge queries.',
      zh: '为海口市公安系统打造智能政务知识库，通过检索增强生成（RAG）提升大模型对政务知识问答的回答准确性。',
    },
    techStack: ['Python', 'RAG', 'Milvus', 'TeleChat LLM', 'Embeddings'],
    contributions: {
      en: [
        'Participated in administrative data cleaning and structured processing for knowledge-base construction.',
        'Collected and analyzed responses to more than 20,000 real administrative queries for LLM testing and optimization.',
      ],
      zh: [
        '参与政务数据清洗与结构化处理，完成知识库构建。',
        '收集并分析 20000+ 条真实政务问题的模型回答，支撑大模型测试与优化。',
      ],
    },
  },
]
