---
layout: single  # 这里可换成其他Layout，比如 'splash'、'page'、'single'等
title: ""
permalink: /projects/   # 生成网址 https://xxx.github.io/projects/
author_profile: true    # 在页面顶部/侧边显示作者信息，视主题设置而定
---


## Project Experience



### **Project 8: Model-based Command System for Hospital 928 V2.0 (2025.03.31 - 2025.04.09)**

- **Module (Front-end)**: To-Do Items Module
- **Project Background**: Added a to-do items module to establish a closed-loop task supervision mechanism, addressing decentralized task management, cross-department collaboration difficulties, and progress-tracking blind spots in V1.0.
- **Technology Stack**: Vue2 + Element-UI + Vuex + Vite
- **Key Contributions**:
  - **Core Feature Development**:
    - Implemented a dual-view task mode (“Created by Me” / “Assigned to Me”), with distinct permissions for creators and assignees.
    - Developed a department tree-selector component supporting three hierarchical levels (Level 1 > Level 2 > Level 3).
    - Built an automatic red‑flagging mechanism for overdue tasks.
  - **Interaction Implementation**:
    - Created a pagination loader (20 items/page by default, switchable to 10/20/50).
    - Developed a progress input validator enforcing the rule $\text{New Progress} \ge \text{Historical Max Progress}$.
- **Project Outcomes**:
  - **Feature Coverage**: Restored list views and form controls as per prototype requirements.

---

### **Project 7: Common Service Platform for Risk Monitoring & Early Warning V1.0.1 (2025.03.10 - 2025.03.21)**

- **Module (Front-end)**: Warning Model Management CRUD
- **Project Background**: Refactored the core module of the government-grade risk warning platform to establish an alert linkage mechanism, solving scattered model management and poor multi-source data adaptability in V1.0.0.
- **Technology Stack**: Vue2 + Element-UI + Vuex + Vite
- **Key Contributions**:
  - **Core Feature Development**:
    - Implemented a tri-state filter (“All” / “Warned” / “Unwarned”) with dynamic switching.
    - Built a model-type to entity-type linkage component that auto-populates warning names based on tree data.
- **Project Outcomes**:
  - **Feature Coverage**: Fully implemented all interactive controls shown in the prototype.
  - **User Feedback**: Added success/failure notifications for all form operations.

---


### ​**Project 6: Red Detachment of Women Memorial Park Digital Platform V1.2.0 (2025.02.25 - 2025.03.06)**  

- ​**Module (Front-end)**: Multi-terminal Collaborative Development (Official Chinese Version/Youth Version/Management Backend)
- ​**Project Background**:  
  Experience upgrade based on V1.0, focusing on reconstructing visit service processes and achieving three-terminal data interoperability. Solving pain points in V1.0 such as poor compatibility and lengthy reservation processes.
- ​**Technology Stack**: Vue2 + Vuex + Element-UI
- ​**Main Contributions**:
  - ​**Core Feature Reconstruction**:
    - Designed and implemented a unified reservation service system across three terminals:  
      - Dynamic form engine: Automatically switches required fields based on user type (individual/group)  
      - Secure document download: Implemented Word template server-side rendering

---

### ​**Project 5: QianQiWanHu Platform (2025.02.21 - 2025.02.25)**  


- ​**Module (Front-end)**: Enterprise Data Verification Module
- ​**Project Background**:  
  Government enterprise data verification platform providing validation services for government agencies and banks. By integrating with National Market Entity API, achieved batch verification of enterprise names and unified credit codes, solving the pain point of low manual verification efficiency.
- ​**Technology Stack**:
  - Front-end: Vue2 + Element-UI + Axios
  - Engineering: Vite + ESLint + Prettier
- ​**Main Contributions**:
  - ​**Core Feature Development**:
    - Implemented Excel file batch import function, supporting parsing of two data structures: 
      - Table 1 (Basic Information Table) 
      - Table 5 (Credit Information Table)
    - Developed real-time verification progress display components including: 
      - Progress bar 
      - Success/failure statistics 
      - Remaining API call credits display
    - Designed verification status management logic to dynamically update table data based on API responses:  
      - Verification success: Automatic backfilling of unified credit codes  
      - Verification failure: Marked "Enterprise Not Found" and cleared codes  
      - API exhaustion: Marked "API Credits Depleted" and disabled operations
- ​**Project Outcomes**:
  - ​**Efficiency Improvement**: Daily processing capacity increased from manual 200 entries to 8,000 entries with 100% accuracy
  - ​**Experience Optimization**: Visual progress components made operations more intuitive
  - ​**System Robustness**: Flexible adaptation to different table structures reduced new table type development cycles
  - ​**Resource Control**: API credit counter prevented over-limit calls

---






### **Project 4 : Project Platform Management System V2.6 (2025.01.13 - 2025.02.06)**

- **Module (Front-end)**: Mobile 'Approval Center' Module Development
- **Project Background**:  
  This project is an internal project management platform for the company, covering multiple approval processes and management functions. Version 2.6 adds the 'Business Opportunity Approval' feature to better manage and review the company’s business opportunities.

- **Technology Stack**:
  - **Mobile**: Vue2 + Vue Router + Pinia + Vant + ESLint (EcmaScript Lint), Prettier

- **Main Contributions**:
  - **Approval Center Module Development**:
    - Responsible for developing the mobile 'Approval Center' module, which supports viewing and managing various approval tasks, such as Business Opportunity Approval, Overtime Task Approval, and Contract Approval.
    - Designed and implemented the query and operation functionality for approval tasks, supporting filtering approval records based on approval names, initiators, etc., improving task management efficiency.
    - Integrated the display functionality for approval statuses, including "In Progress," "Approved," "Rejected," etc., ensuring that users can quickly understand the approval status.
    - Developed the detailed Business Opportunity Approval page, including business opportunity number, approval status, and risk indicators (Business Opportunity Red/Green Light functionality), optimizing the business opportunity management process.
    - Used Pinia (a lightweight state management library for Vue) to ensure real-time data updates and efficient communication between components.

- **Project Outcomes**:
  - **Improved Approval Efficiency**: The Approval Center module has made the approval process more efficient, allowing users to easily manage and view approval tasks on mobile, reducing the approval cycle.
  - **Optimized User Experience**: By integrating the Vant component library, the UI design was optimized, making approval task viewing more intuitive and easier.
  - **Enhanced Business Opportunity Management Functionality**: The addition of Business Opportunity Approval functionality helps users clearly understand the details of business opportunity approvals and supports approval status and risk indicators, enhancing the transparency of business opportunity approvals.

---


### **Project 3 : Digital Campus System V2.0.5 (2024.12.13 - 2024.12.24)**  

- **Modules (Front-end)**:
  - PC End: Task Assignment
  - WeChat Official Account End: Delegated Verification and Notification

- **Project Background**:  
  The Digital Campus System aims to provide schools with a comprehensive management and service platform to enhance the efficiency of homeroom teachers and parents, ensuring the safety and convenient management of students. The project encompasses both PC and WeChat Official Account ends, implementing class duty assignment management and student pickup delegation verification functionalities respectively.

- **Technology Stack**:
  - Frontend: Vue2 + Vue Router + Vuex, Element-UI, uni-app
  - Tools: ESLint, Prettier, Git

- **Main Contributions**:
  - **PC End Task Assignment Module**:
    - Designed and implemented the class selection dropdown component, supporting multiple class switching and automatic display for single classes.
    - Developed the duty assignment list, supporting ascending order display based on sorting values, and providing edit, delete, and add functionalities.
    - Implemented filter and search functionality, allowing keyword-based fuzzy search for task names.
    - Designed and implemented add/edit modals, including form validation for task names and sorting values to ensure data accuracy.
    - Added permission checks for delete operations to enhance system security.
  - **WeChat Official Account End Delegated Verification and Notification Module**:
    - Implemented the scan verification feature, allowing authorized persons to enter the verification page by scanning a QR code.
    - Designed and developed the delegated verification form, including student name, delegate name, phone number, and SMS verification code to ensure accurate information submission.
    - Developed the delegated details page, displaying detailed information upon successful verification and providing a button to complete the pickup process.
    - Integrated WeChat template message interface to automatically send pickup status notifications to parents or homeroom teachers, ensuring timely information delivery.

- **Project Outcomes**:
  - **Increased Efficiency for Homeroom Teachers**: Through the PC End Task Assignment module, homeroom teachers can efficiently manage duty tasks for multiple classes, reducing manual management time and errors.
  - **Enhanced Student Pickup Safety**: The WeChat Official Account End Delegated Verification feature ensures that only authorized delegates can pick up students, enhancing student safety.
  - **Optimized User Experience**: User-friendly frontend interface with simple operations, supporting dynamic forms and real-time validation, improving the ease of use for users.
  - **Facilitated System Maintenance**: Modular development and adherence to code standards enable more efficient future feature expansions and maintenance, reducing operational costs.

---


### **Project 2 : Red Detachment of Women Memorial Park Digital Platform  V1.0 (2024.11.11 - 2024.11.30)**  

- **Multi-terminal Front-end Module Development**
- **Project Background**: Digital platform development for the Red Detachment of Women Memorial Park, including management backend, PC terminal, and Youth PC terminal, providing visit management, study activities, and traffic guidance services.
- **Tech Stack**: Vue2 + Vue Router, Element-UI, Vant, ESLint, Prettier.
- **Key Contributions**:
  - **Management Backend**:
    - Built the "Study Registration Management" module, including functionalities for adding, editing, and publishing.
    - Developed dynamic forms for study activities with rich text editing and file attachments.
    - Supported multi-status management operations like save, temporary save, and publish.
  - **Youth PC Terminal**:
    - Developed the "Visit Services" module, showcasing visit guidelines and reservation functionality.
    - Optimized UI design with card-style layouts, enhancing usability.
- **Project Achievements**:
  - Enhanced user interaction by integrating form validations and dynamic updates.
  - Reduced operational costs for content updates via dynamic backend management.
  - Integrated multi-terminal functionality, meeting diverse user needs.

---


### **Project 1 : Project Platform Management System V2.5 (2024.10.22 - 2024.11.20)**  

- **PC and Mobile Vehicle Management Function Development (Front-end)**
- **Project Background**: Internal vehicle management system covering both PC and mobile platforms, mainly used for vehicle usage management and statistics, including permission management, data filtering, and export.
- **Tech Stack**:
  - **PC**: Vite + Vue2 + Vue Router + Pinia + Element-UI + Husky + ESLint + Stylelint + Prettier.
  - **Mobile**: Vue2 + Vue Router + Pinia + Vant + ESLint + Prettier.
- **Key Contributions**:
  - **PC**:
    - Developed the "Vehicle Report" module:
      - Implemented permission management, controlling access rights for different roles to ensure data security.
      - Created multi-character input filtering for license plates, departments, and date ranges, improving data query efficiency.
      - Implemented data export functionality with SMS verification, ensuring data compliance.
    - Utilized code quality tools (ESLint, Stylelint, Prettier) and introduced Husky for pre-commit checks, improving code quality and readability.
  - **Mobile**:
    - Developed modules such as "Workstation," "Approval Center," and "Vehicle Management":
      - **Workstation**: Optimized user dashboard for mobile users, improving page load speed and interaction experience.
      - **Approval Center**: Added features for task filtering, status updates, and instant feedback to enhance approval efficiency.
      - **Vehicle Management**: Built complete workflows for vehicle application and approvals, including monitoring and record tracking.
    - Enhanced responsive design for mobile, integrating Vant components to improve UI/UX.
- **Project Achievements**:
  - Improved data access efficiency and system security.
  - Addressed multi-terminal business needs, supporting consistent data interactions.
  - Streamlined mobile approval processes, reducing average approval time.

---

