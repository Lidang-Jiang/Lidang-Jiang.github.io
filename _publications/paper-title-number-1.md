---
title: "<a href='https://www.sciencedirect.com/science/article/pii/S0360544224026148' target='_blank'>A Robust Adapted Flexible Parallel Neural Network Architecture for Early Prediction of Lithium Battery Lifespan</a>"
collection: publications
category: manuscripts
permalink: /publication/2024-flexible-parallel-neural-network
excerpt: 'This paper presents a robust adapted Flexible Parallel Neural Network (FPNN) architecture for the early prediction of lithium battery lifespan, demonstrating superior predictive performance on the MIT dataset.'
date: 2024-08-22  # 假设发布日期为2024年1月16日
venue: 'Energy'
paperurl: '/files/paper1.pdf'  # 链接到对应的 PDF 文件
citation: 'Lidang Jiang, Zhuoxiang Li, Changyan Hu, Junxiong Chen, Qingsong Huang, Ge He. (2024). "A Robust Adapted Flexible Parallel Neural Network Architecture for Early Prediction of Lithium Battery Lifespan." <i>Energy</i>, 308, 132840.'
image: '/images/paper1.jpg' # 这里添加图片路径
---

<!-- <img src="/images/paper1.jpg" alt="Paper Image" style="width: 10%;"> -->

Early prediction of End of Life (EPEOL) is crucial for improving lithium battery efficiency and lifespan. Traditional fixed-architecture neural networks often suffer from underfitting or overfitting due to diverse data distributions. To address this, we propose the Flexible Parallel Neural Network (FPNN). This model integrates modules like InceptionBlock, 3D CNN, 2D CNN, and dual-stream networks. By effectively extracting electrochemical features from video-format data through the 3D CNN and achieving multi-scale feature abstraction with InceptionBlock, FPNN ensures effective module coordination. The model can adaptively adjust the number of InceptionBlocks to handle tasks of varying complexity. Experimental results on the MIT dataset show that FPNN achieves MAPE values of 1.26%, 0.41%, 0.37%, 0.33%, 0.32%, 0.32%, 0.31%, 0.31%, 0.22%, and 0.34% using the first 10, 20, 30, 40, 50, 60, 70, 80, 90, and 100 cycle data, respectively. The interpretability of FPNN is reflected in its structural design and flexible unit choices, providing a basis for model interpretation. Comprising multiple modules, FPNN enables smooth feature extraction from electrochemical data through collaborative interaction. The diverse branching structure of the flexible units allows the model to capture features at different scales, learning richer information. Our approach offers a precise, adaptable, and easy-to-understand solution for EPEOL, opening new possibilities in battery health monitoring.
