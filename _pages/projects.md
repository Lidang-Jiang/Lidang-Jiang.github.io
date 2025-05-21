---
layout: single # 这里可换成其他Layout，比如 'splash'、'page'、'single'等
title: ""
permalink: /projects/ # 生成网址 https://xxx.github.io/projects/
author_profile: true # 在页面顶部/侧边显示作者信息，视主题设置而定
---

## Project Experience


### Project 10: Ganqi Wanhua Platform V3.1 (May 15, 2025 – May 31, 2025)

- **Module (Frontend)**: Smart Government Data Management Suite

- **Project Background**:  
  Added data status tracking and batch approval features to solve cross-department data collaboration challenges.

- **Technology Stack**:  
  - Frontend: Vue2 + Element-UI  
  - State Management: Vuex  
  - Build Tool: Vite

- **Core Implementation**:  
  1. **Visit Status Field Annotation**  
  2. **Batch Approval Engine**:  
     - Implemented multi-select operations  
  3. **Data Status Tracking List**:  
     - CRUD operations for the list  

---

### Project 9: Haikou 12345 Intelligent Reporting System V1.0 (May 13, 2025 – May 31, 2025)

- **Module (Frontend)**: Intelligent Report Editor and Template Management Center

- **Project Background**:  
  An automated government hotline reporting system that generates structured reports from ticket data, solving low efficiency in manual report preparation and inconsistent formats.

- **Technology Stack**:  
  - Frontend: Vue2 + Element-UI + Quill  
  - State Management: Vuex  
  - Build Tool: Vite

- **Core Contributions**:  
  1. **Intelligent Template Management System**:  
     - Table CRUD operations  
  2. **Interactive Report Template Editor**:  
     - Developed an extensible table component supporting dynamic rows and columns with external data links  
     - Developed an extensible deepseek directive modal component supporting insertion of deepseek directives  
     - Implemented a data binding system: $\Delta\text{Data} \leftrightarrow \Delta\text{View}$






### Project 8: 928 Hospital – Model-based Command System V2.0 (March 31, 2025 – April 9, 2025)

- **Module (Frontend)**: To-Do Tasks Module

- **Project Background**:  
  Added a to-do tasks module to establish a closed-loop task supervision mechanism. Solved issues in V1.0 such as fragmented task management, difficult cross-department collaboration, and blind spots in progress tracking.

- **Technology Stack**:  
  - Frontend: Vue2 + Element-UI  
  - State Management: Vuex  
  - Build Tool: Vite

- **Main Contributions**:  
  - **Core Feature Development**:  
    - Implemented dual-view task modes (“Created by Me” / “Assigned to Me”), supporting different permissions for creators and executors  
    - Developed a department tree selection component supporting three levels (Level 1 > Level 2 > Level 3)  
    - Built an overdue auto-highlight mechanism

  - **Interaction Implementation**:  
    - Implemented a pagination loading component with default 20 items/page and support for 10/20/50 switching  
    - Developed a progress input validator enforcing the rule $\text{New Progress} \ge \text{Historical Max Progress}$

---

### Project 7: Common Service Platform for Risk Monitoring and Early Warning System V1.0.1 (March 10, 2025 – March 21, 2025)

- **Module (Frontend)**: CRUD section of the early warning model management system

- **Project Background**:  
  Refactored the core module of the government-grade risk early warning platform to establish an early warning linkage mechanism. Addressed issues in version V1.0.0 such as dispersed model management and poor multi-source data adaptability.

- **Technology Stack**:  
  - Frontend: Vue2 + Element-UI  
  - State Management: Vuex  
  - Build Tool: Vite

- **Main Contributions**:  
  - **Core Feature Development**:  
    - Implemented a tri-state filtering mechanism supporting dynamic toggling among “All / Warned / Unwarned”  
    - Built a model-type to entity-type linkage component that auto-populates warning names based on tree-structured data

---

### Project 6: Red Army Women’s Memorial Park Digital Platform V1.2.0 (February 25, 2025 – March 6, 2025)

- **Module (Frontend)**: Collaborative development across multiple ends (Official Website Chinese Version / Youth Version / Admin Backend)

- **Project Background**:  
  Based on V1.0 with experience upgrades, focused on refactoring the tour services workflow and achieving data interoperability across three ends. Solved pain points in V1.0 like poor compatibility and lengthy reservation processes.

- **Technology Stack**:  
  Vue2 + Vuex + Element-UI

- **Main Contributions**:  
  - **Core Feature Refactoring**:  
    - Designed and implemented a unified reservation service system across three ends:  
      - Dynamic form engine: auto-switches fields based on user type (Individual / Team)  
      - Secure document download: implemented server-side rendering for Word templates




### Project 5: Ganqi Wanhua Platform V2 (February 21, 2025 – February 25, 2025)

- **Module (Frontend)**: Enterprise data validation module

- **Project Background**:  
  A government-enterprise data verification platform providing enterprise information validation services for government bodies, banks, etc. Integrated the national market entity API for batch verification of enterprise names and unified social credit codes to solve low-efficiency manual checks.

- **Technology Stack**:  
  - Frontend: Vue2 + Element-UI + Axios  
  - Engineering: Vite + ESLint + Prettier

- **Main Contributions**:  
  - **Core Feature Development**:  
    - Implemented batch Excel import, supporting parsing of Table 1 (Basic Information) and Table 5 (Credit Information)  
    - Developed a real-time validation progress component with progress bar, success/failure statistics, and remaining API call count display  
    - **Designed validation status management logic** to dynamically update table data based on API responses:  
      - Validation success: auto-fill the unified social credit code  
      - Validation failure: mark “Enterprise not found” and clear the code  
      - API quota exhausted: mark “API calls exhausted” and disable operations

---

### Project 4: Project Platform Management System V2.6 (January 13, 2025 – February 6, 2025)

- **Module (Frontend)**: Mobile-end “Approval Center” module development

- **Project Background**:  
  An internal company project management platform covering multiple approval workflows and management functions. Version V2.6 added the “Business Opportunity Approval” feature to better manage and review corporate opportunities.

- **Technology Stack**:  
  - Mobile End: Vue2 + Vue Router + Pinia + Vant + ESLint + Prettier

- **Main Contributions**:  
  - **Approval Center Module Development**:  
    - Developed the mobile-end “Approval Center” module, supporting viewing and managing various approval tasks such as business opportunity approvals, overtime task approvals, contract approvals, etc.  
    - Designed and implemented query and action features for approval tasks, supporting filtering by approval name, initiator, etc., improving task management efficiency.  
    - Integrated status display for approvals, including “In Progress,” “Approved,” “Rejected,” etc., ensuring users can quickly understand the approval status.  
    - Implemented a detailed view page for business opportunity approvals, including opportunity ID, approval status, and risk indicator (Business Opportunity Red-Green Light), optimizing the business opportunity management workflow.  
    - Used Pinia for state management to ensure real-time data updates and efficient communication between components.





### Project 3: Digital Campus System V2.0.5 (December 13, 2024 – December 24, 2024)

- **Module (Frontend)**: Development of PC-end duty assignment settings and WeChat Official Account delegation verification and push modules

- **Project Background**:  
  The Digital Campus System is designed to provide schools with a comprehensive management and service platform, improving efficiency for homeroom teachers and parents, and ensuring student safety and convenient management. The project covers both the PC end and the WeChat Official Account end, implementing class duty assignment management and student pickup delegation verification functions respectively.

- **Technology Stack**:  
  - Frontend: Vue2 + Vue Router + Vuex, Element-UI, uni-app  
  - Tools: ESLint, Prettier, Git

- **Main Contributions**:  
  - **PC-end “Duty Assignment Settings” Module**:  
    - Designed and implemented a class selection dropdown component, supporting multiple class switching and automatic display of a single class.  
    - Developed a duty assignment list with ascending order sorting, providing edit, delete, and add functions.  
    - Implemented filter and search functionality with keyword fuzzy search for assignment names.  
    - Designed and implemented add/edit modals, including form validation for assignment name and sort order to ensure data accuracy.  
    - Added permission checks for delete operations to enhance system security.

  - **WeChat Official Account “Delegation Verification and Push” Module**:  
    - Implemented QR code scanning verification, allowing delegates to enter the verification page by scanning a QR code.  
    - Designed and developed a delegation verification form, including student name, delegate name, phone number, and SMS verification code, ensuring accurate information submission.  
    - Implemented a delegation details page to display verified information and provide a completion button for pick-up operations.  
    - Integrated WeChat template message API to automatically send pick-up status notifications to parents or homeroom teachers, ensuring timely information delivery.

---

### Project 2: Red Army Women’s Memorial Park Digital Platform V1.0 (November 11, 2024 – November 30, 2024)

- **Module (Frontend)**: Multi-end frontend module development

- **Project Background**:  
  Development of the Red Army Women’s Memorial Park digital platform, including an administration backend, PC end, and youth PC end, providing tour services, study program management, transportation guides, and more to enhance online interaction and user experience.

- **Technology Stack**:  
  - Vue2 + Vue Router, Element-UI, Vant, ESLint, Prettier

- **Main Contributions**:  
  - **Administration Backend**:  
    - Developed the “Study Program Enrollment Management” module, including create, edit, and publish functions.  
    - Implemented dynamic forms for study programs, supporting title, notes, rich-text content editing, and attachment upload.

  - **Youth PC End**:  
    - Developed the “Tour Services” section, displaying visitor guidelines and reservation modules.

---

### Project 1: Project Operation Management Platform V2.5 (October 22, 2024 – November 20, 2024)

- **Module (Frontend)**: PC-end and mobile-end vehicle management feature development

- **Project Background**:  
  An internal enterprise vehicle management system covering both PC and mobile platforms. It is used for vehicle usage management and statistics, including permission management, data filtering, and exporting functions.

- **Technology Stack**:  
  - PC End: Vite + Vue2 + Vue Router + Pinia + Element-UI + Husky + ESLint + Stylelint + Prettier  
  - Mobile End: Vue2 + Vue Router + Pinia + Vant + ESLint + Prettier

- **Main Contributions**:  
  - **PC End**:  
    - Developed the “Vehicle Reports” module.

  - **Mobile End**:  
    - Developed the “Dashboard,” “Approval Center,” and “Vehicle Management” modules:  
      - **Dashboard**: Implemented data overview and quick access on the mobile user homepage, optimizing load time and interaction.  
      - **Approval Center**: Built task query and action features, supporting filtering, status updates, and instant feedback to improve approval efficiency.  
      - **Vehicle Management**: Completed the full workflow for vehicle requests and approvals, including request records and status monitoring.
