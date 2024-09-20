---
title: "<a href='https://arxiv.org/abs/2404.07577' target='_blank'>Generating Comprehensive Lithium Battery Charging Data with Generative AI</a>"
collection: publications
category: manuscripts
permalink: /publication/2024-generating-comprehensive-lithium-battery-data
excerpt: 'This study introduces a generative AI model to synthesize comprehensive lithium battery charging data, addressing the challenges of data incompleteness and high-quality dataset generation.'
date: 2024-04-07  # 假设发布日期为2024年4月7日
venue: 'arXiv'
paperurl: '/files/paper2.pdf'  # 替换为指向PDF的路径
citation: 'Lidang Jiang, Changyan Hu, Sibei Ji, Hang Zhao, Junxiong Chen, Ge He. (2024). "Generating Comprehensive Lithium Battery Charging Data with Generative AI." <i>arXiv</i>.'
image: '/images/paper2.jpg' # 这里添加图片路径
---

In optimizing performance and extending the lifespan of lithium batteries, accurate state prediction is pivotal. Traditional regression and classification methods have achieved some success in battery state prediction. However, the efficacy of these data-driven approaches heavily relies on the availability and quality of public datasets. Additionally, generating electrochemical data predominantly through battery experiments is a lengthy and costly process, making it challenging to acquire high-quality electrochemical data. This difficulty, coupled with data incompleteness, significantly impacts prediction accuracy. Addressing these challenges, this study introduces the End of Life (EOL) and Equivalent Cycle Life (ECL) as conditions for generative AI models. By integrating an embedding layer into the CVAE model, we developed the Refined Conditional Variational Autoencoder (RCVAE). Through preprocessing data into a quasi-video format, our study achieves an integrated synthesis of electrochemical data, including voltage, current, temperature, and charging capacity, which is then processed by the RCVAE model. Coupled with customized training and inference algorithms, this model can generate specific electrochemical data for EOL and ECL under supervised conditions. This method provides users with a comprehensive electrochemical dataset, pioneering a new research domain for the artificial synthesis of lithium battery data. Furthermore, based on the detailed synthetic data, various battery state indicators can be calculated, offering new perspectives and possibilities for lithium battery performance prediction.
