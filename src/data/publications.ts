import type { Publication } from '@/types/publication'

export const publications: Publication[] = [
  {
    id: 'energy-2024',
    title: 'A Robust Adapted Flexible Parallel Neural Network Architecture for Early Prediction of Lithium Battery Lifespan',
    authors: 'Lidang Jiang, Zhuoxiang Li, Changyan Hu, Junxiong Chen, Qingsong Huang, Ge He',
    journal: 'Energy',
    issn: '0360-5442',
    volume: '308:132840',
    year: 2024,
    doi: 'https://doi.org/10.1016/j.energy.2024.132840',
    impactFactor: 8.8,
    pdf: '/files/paper1.pdf',
    image: '/images/paper1.jpg',
    abstract: {
      en: 'This paper proposes a Flexible Parallel Neural Network (FPNN) architecture for early prediction of lithium battery lifespan, demonstrating superior prediction performance on the MIT dataset. The architecture integrates InceptionBlock, 3D CNN, 2D CNN, and dual-stream network modules, extracting electrochemical features from video-format data through 3D CNN and achieving multi-scale feature abstraction via InceptionBlock. Using the first 10-100 cycles of data from the MIT dataset, the MAPE values are 1.26%, 0.41%, 0.37%, 0.33%, 0.32%, 0.32%, 0.31%, 0.31%, 0.22%, and 0.34% respectively.',
      zh: '本文提出灵活并行神经网络（FPNN）架构，用于锂电池寿命的早期预测，在 MIT 数据集上展示了卓越预测性能。融合 InceptionBlock、3D CNN、2D CNN 和双流网络模块，通过 3D CNN 从视频格式数据中提取电化学特征，InceptionBlock 实现多尺度特征抽象。在 MIT 数据集上使用前 10-100 个循环数据，MAPE 值分别为 1.26%, 0.41%, 0.37%, 0.33%, 0.32%, 0.32%, 0.31%, 0.31%, 0.22%, 0.34%。',
    },
    citation: 'Lidang Jiang, Zhuoxiang Li, Changyan Hu, Junxiong Chen, Qingsong Huang, Ge He. "A Robust Adapted Flexible Parallel Neural Network Architecture for Early Prediction of Lithium Battery Lifespan." Energy, 308:132840, 2024.',
  },
  {
    id: 'applied-energy-2025',
    title: 'Generating Comprehensive Lithium Battery Charging Data with Generative AI',
    authors: 'Lidang Jiang, Changyan Hu, Sibei Ji, Hang Zhao, Junxiong Chen, Ge He',
    journal: 'Applied Energy',
    issn: '0306-2619',
    volume: '377:124604',
    year: 2025,
    doi: 'https://doi.org/10.1016/j.apenergy.2024.124604',
    impactFactor: 11.2,
    pdf: '/files/paper2.pdf',
    image: '/images/paper2.jpg',
    abstract: {
      en: 'This paper introduces a generative AI model for synthesizing complete lithium battery charging data, addressing data incompleteness and the challenge of generating high-quality datasets. Using EOL and ECL as supervisory conditions, an embedding layer is integrated into the CVAE model to develop the Refined Conditional Variational Autoencoder (RCVAE). By preprocessing data into a video-like format, RCVAE can generate charging data in real-time (voltage, current, temperature, charging capacity).',
      zh: '本文引入生成式 AI 模型合成完整锂电池充电数据，解决数据不完整和高质量数据集生成难题。以 EOL 和 ECL 为监督条件，将 embedding 层集成到 CVAE 模型中，开发了精炼条件变分自编码器（RCVAE）。通过将数据预处理为类视频格式，RCVAE 可实时生成所需充电数据（电压、电流、温度、充电容量）。',
    },
    citation: 'Lidang Jiang, Changyan Hu, Sibei Ji, Hang Zhao, Junxiong Chen, Ge He. "Generating Comprehensive Lithium Battery Charging Data with Generative AI." Applied Energy, 377:124604, 2025.',
  },
]
