---
layout: single  # 这里可换成其他Layout，比如 'splash'、'page'、'single'等
title: ""
permalink: /projects/   # 生成网址 https://xxx.github.io/projects/
author_profile: true    # 在页面顶部/侧边显示作者信息，视主题设置而定
---


## Project Experience
### **Digital Campus System V2.0.5 (2024.12.13 - 2024.12.24)**  

- **Modules**:
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


### **Red Detachment of Women V1.0 (2024.11.11 - 2024.11.30)**  

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


### **Management Platform V2.5 (2024.10.22 - 2024.11.20)**  

- **PC and Mobile Vehicle Management Function Development**
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

