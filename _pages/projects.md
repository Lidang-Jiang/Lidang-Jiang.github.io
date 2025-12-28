---
layout: single # 这里可换成其他Layout，比如 'splash'、'page'、'single'等
title: ""
permalink: /projects/ # 生成网址 https://xxx.github.io/projects/
author_profile: true # 在页面顶部/侧边显示作者信息，视主题设置而定
---


## Project Experience

### **Project 13: vLLM-Kunlun (Baidu Kunlun Chip Large Model Inference Framework)** (2025.08.18 — Present)

- **Project Role**: Contributor | **Open Source**: [https://github.com/baidu/vLLM-Kunlun](https://github.com/baidu/vLLM-Kunlun)
- **Project Background**: vLLM-Kunlun aims to adapt core technologies such as PagedAttention to Baidu Kunlun Chip (XPU) hardware, supporting high-performance inference of mainstream models like Qwen.

- **Technology Stack**:
  - Core Languages: Python (PyTorch), C++
  - Hardware Environment: NVIDIA A800 (Golden Baseline) vs Kunlun P800 (Target)

- **Core Contributions**:
  1. **Heterogeneous Hardware Operator Precision Debugging (System Debugging)**:
     - **Problem Solving**: Resolved the issue of garbled inference output for Qwen2.5-7B model in P800 (Float16) environment.
     - **Root Cause Analysis**: Through statistical analysis, discovered that Q/K/V tensors, q_seq_start_loc and other tensors before entering the Attention layer had identical mean and variance on both ends, but output tensors showed differences. Successfully narrowed down the fault scope from the entire model to the **Attention** operator internals, assisting the team in fixing the XPU operator's computational logic defects.
  2. **Open Source Ecosystem and Engineering Construction**:
     - **Documentation Engineering**: Responsible for building the official project documentation website (Sphinx+ReadTheDocs). Authored relevant development documentation to lower the entry barrier for developers.
     - **Quality Assurance**: Responsible for release readiness testing, establishing accuracy and performance Benchmark baselines for Qwen series models.

- **Project Achievements**:
  - Name included in official documentation _Acknowledgments_: [https://vllm-kunlun.readthedocs.io/en/latest/community/contributors.html](https://vllm-kunlun.readthedocs.io/en/latest/community/contributors.html)

---

### **Project 12: University Researcher Profile System** (2025.05.25 — 2025.06.04)

- **Module (Full-Stack)**: Front-end systems for client and admin + backend API development
- **Project Background**: Personal portal system for university researchers, integrating academic achievements display, project management and news updates, supporting multilingual internationalization. GitHub open-source project, deployed and applied in actual research team websites.

- **Technology Stack**:
  - Front-end: Vue 2.7 + Element UI + Vue I18n + Vue Router + Vite + Quill editor
  - Backend: Java (Spring Boot) + MyBatis-Plus + MySQL

- **Core Contributions**:
  1. **Developed complete front-end code for client and admin systems**: Implemented multilingual switching system based on Vue I18n: supporting seamless Chinese-English switching
  2. **Backend API development**: Designed and implemented RESTful APIs for News and Project modules for both client and admin

- **Project Achievements**:
  - Successfully deployed on research team's official website: [https://www.hegelab.com/](https://www.hegelab.com/)
  - GitHub open-source address: [https://github.com/Lidang-Jiang/UniversityResearcherProfiles](https://github.com/Lidang-Jiang/UniversityResearcherProfiles)

---

### **Project 11: Government-Enterprise Platform V3.1** (2025.05.15 — 2025.05.31)

- **Module (Front-end)**: Government Data Intelligent Management Suite
- **Project Background**: Added data status tracking, batch approval and other features to solve cross-department data coordination challenges.
- **Technology Stack**: Front-end, Vue2 + Element-UI + Vuex + Vite
- **Core Implementation**: Batch approval, Data status tracking list

---

### **Project 10: Haikou 12345 Intelligent Report System V1.0** (2025.05.13 — 2025.05.31)

- **Module (Front-end)**: Intelligent Report Editor and Template Management Center
- **Project Background**: Government hotline report automation system, enabling intelligent generation of structured reports from work order data, solving pain points of low efficiency in manual report preparation and inconsistent formats
- **Technology Stack**: Front-end, Vue2 + Element-UI + Quill + Vuex + Vite
- **Core Contributions**: **Intelligent Template Management System**. **Interactive Report Template Editor**: Developed extensible table component, deepseek instruction dialog component.

---

### **Project 9: 928 Hospital - Model Command System V2.0** (2025.03.31 - 2025.04.09)

- **Module (Front-end)**: To-Do Items Module
- **Project Background**: Added to-do items module to establish closed-loop task supervision mechanism. Solved V1.0 issues of scattered task management, cross-department collaboration difficulties, and progress tracking blind spots.
- **Technology Stack**: Front-end, Vue2 + Element-UI + Vuex + Vite
- **Main Contributions**: Implemented dual-view mode for tasks, Developed department tree selection component

---

### **Project 8: Risk Monitoring and Early Warning System Common Service Platform V1.0.1** (2025.03.10 - 2025.03.21)

- **Module (Front-end)**: Warning Model Management System CRUD Module
- **Project Background**: Restructured core modules of government-level risk warning platform, establishing warning linkage mechanism. Solved V1.0.0 issues of scattered model management and poor multi-source data adaptability.
- **Technology Stack**: Front-end, Vue2 + Element-UI + Vuex + Vite
- **Main Contributions**: Implemented three-state filtering mechanism, Built model type-entity type linkage component, automatically populating warning names based on tree-structured data

---

### **Project 7: Red Detachment of Women Memorial Park Digital Platform V1.2.0** (2025.02.25 - 2025.03.06)

- **Module (Front-end)**: Multi-terminal collaborative development (Official Chinese Website/Youth Version/Admin Panel)
- **Project Background**: Experience upgrade based on V1.0, focusing on restructuring the visiting service process, achieving data intercommunication across three terminals. Solved V1.0 issues of poor compatibility and lengthy reservation process.
- **Technology Stack**: Vue2 + Element-UI + Vuex + Vite
- **Main Contributions**: Designed and implemented a unified reservation service system across three terminals: Secure document download, implemented server-side rendering of Word templates

---

### **Project 6: Government-Enterprise Platform V2** (2025.02.21 - 2025.02.25)

- **Module (Front-end)**: Enterprise Data Validation Module
- **Project Background**: Government enterprise data verification platform, providing enterprise information verification services for government, banks and other institutions. By connecting to the National Market Entity API, it enables batch verification of enterprise names and unified credit codes, solving the pain point of inefficient manual verification.
- **Technology Stack**: Front-end, Vue2 + Element-UI + Axios + Vite + ESLint + Prettier
- **Main Contributions**: Implemented batch import functionality for Excel files, Developed real-time validation progress display component

---

### **Project 5: Project Platform Management System V2.6** (2025.01.13 - 2025.02.06)

- **Module (Front-end)**: Mobile "Approval Center" module development
- **Project Background**: This project is the company's internal project management platform, covering multiple approval processes and management functions. V2.6 version added the "Business Opportunity Approval" feature to better manage and review the company's business opportunities.
- **Technology Stack**: Mobile, Vue2 + Vue Router + Pinia + Vant + ESLint + Prettier
- **Main Contributions**: Responsible for developing the mobile "Approval Center" module, supporting viewing and managing various approval tasks, such as business opportunity approval, overtime task approval, contract approval, etc.

---

### **Project 4: Digital Campus System V2.0.5** (2024.12.13 - 2024.12.24)

- **Module (Front-end)**: PC-side work assignment settings and WeChat public account delegation verification and push module development
- **Project Background**: The Digital Campus System aims to provide schools with a comprehensive management and service platform to improve the work efficiency of head teachers and parents, ensuring student safety and management convenience. The project covers both PC and WeChat public account platforms, implementing class duty management and student pickup delegation verification functions respectively.
- **Technology Stack**: Front-end, Vue2 + Vue Router + Vuex + Element-UI + uni-app + ESLint + Prettier
- **Main Contributions**: PC-side "Work Assignment Settings" module. WeChat Public Account "Delegation Verification and Push" module: Implemented QR code verification function, Designed and developed delegation verification form

---

### **Project 3: Red Detachment of Women Memorial Park Digital Platform V1.0** (2024.11.11 - 2024.11.30)

- **Module (Front-end)**: Multi-terminal front-end module development
- **Project Background**: Development of Red Detachment of Women Memorial Park digital platform, including admin panel, PC client and youth PC client, providing visit services, study tour activity management, transportation guides and other functions to enhance users' online interaction and service experience.
- **Technology Stack**: Vue2 + Vue Router, Element-UI, Vant, ESLint, Prettier
- **Main Contributions**: **Admin Panel**, Responsible for "Study Tour Registration Management" module development. **Youth PC Client**, Responsible for "Visit Services" section development.

---

### **Project 2: Project Operation Management Platform V2.5** (2024.10.22 - 2024.11.20)

- **Module (Front-end)**: PC and mobile vehicle management functionality development
- **Project Background**: Internal enterprise vehicle management system, covering both PC and mobile platforms. Mainly used for vehicle usage management and statistics, including permission management, data filtering and export functions.
- **Technology Stack**: Front-end, Vite + Vue2 + Vue Router + Pinia + Element-UI + Husky + ESLint + Stylelint + Prettier + Vant
- **Main Contributions**: **PC Platform**, Responsible for "Vehicle Reports" module development. **Mobile Platform**, Responsible for "Workbench", "Approval Center", and "Vehicle Management" module development.

---

### **Project 1: Haikou Police Administrative Knowledge Base** (2024.07.25 - 2024.09.25)

- **Module (Algorithm)**: RAG System Construction and LLM Evaluation
- **Project Background**: Developed an intelligent administrative knowledge base for Haikou Police System, employing Retrieval-Augmented Generation (RAG) technology to enhance the accuracy of large language models in responding to administrative knowledge queries, addressing issues such as low retrieval efficiency and inconsistent answer quality in traditional knowledge bases.
- **Technology Stack**:
  - RAG System: Embedding Models + Vector Database (Milvus) + TeleChat LLM
  - Evaluation Tools: Self-developed Evaluation Framework + Data Processing Scripts + Result Visualization
- **Main Contributions**:
  - **Knowledge Base Construction**: Participated in administrative data cleaning and structured processing
  - **LLM Testing and Optimization**: Conducted large-scale answer quality testing, collected and analyzed model responses to 20000+ real administrative queries

---