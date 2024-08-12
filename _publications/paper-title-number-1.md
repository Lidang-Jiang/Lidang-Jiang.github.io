---
title: "Flexible Parallel Neural Network Architecture Model for Early Prediction of Lithium Battery Life"
collection: publications
category: manuscripts
permalink: /publication/2024-flexible-parallel-neural-network
excerpt: 'This paper proposes a flexible parallel neural network (FPNN) architecture for early prediction of lithium battery life, achieving outstanding predictive accuracy on the MIT dataset.'
date: 2024-01-16  # 假设发布日期为2024年1月16日
venue: 'arXiv'
paperurl: 'https://arxiv.org/abs/2401.16102'
citation: 'Lidang Jiang, Zhuoxiang Li, Changyan Hu, Qingsong Huang, Ge He. (2024). "Flexible Parallel Neural Network Architecture Model for Early Prediction of Lithium Battery Life." <i>arXiv</i>.'
---

The early prediction of battery life (EPBL) is vital for enhancing the efficiency and extending the lifespan of lithium batteries. Traditional models with fixed architectures often encounter underfitting or overfitting issues due to the diverse data distributions in different EPBL tasks. An interpretable deep learning model of flexible parallel neural network (FPNN) is proposed, which includes an InceptionBlock, a 3D convolutional neural network (CNN), a 2D CNN, and a dual-stream network. The proposed model effectively extracts electrochemical features from video-like formatted data using the 3D CNN and achieves advanced multi-scale feature abstraction through the InceptionBlock. The FPNN can adaptively adjust the number of InceptionBlocks to flexibly handle tasks of varying complexity in EPBL. The test on the MIT dataset shows that the FPNN model achieves outstanding predictive accuracy in EPBL tasks, with MAPEs of 2.47%, 1.29%, 1.08%, and 0.88% when the input cyclic data volumes are 10, 20, 30, and 40, respectively. The interpretability of the FPNN is mainly reflected in its flexible unit structure and parameter selection: its diverse branching structure enables the model to capture features at different scales, thus allowing the machine to learn informative features. The approach presented herein provides an accurate, adaptable, and comprehensible solution for early life prediction of lithium batteries, opening new possibilities in the field of battery health monitoring.
