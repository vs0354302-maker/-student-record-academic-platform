# Sprint Planning Document
## Student Record and Academic Management Platform (SRAMP)

---

### 1. Sprint Framework & Planning Parameters
* **Sprint Cadence**: 2-Week Sprints (10 working days per sprint).
* **Team Capacity**: 5 Developers x 8 productive hours/day x 10 days = 400 gross hours.
* **Historical Team Velocity**: 18 to 22 Story Points per sprint.
* **Planning Ceremonies Conducted**:
  * Part 1: Product Owner presents priority backlog items and clarifies business goals.
  * Part 2: Development Team decomposes stories into technical tasks, sizes capacity, and commits to the Sprint Goal.

---

### 2. Sprint 1 Plan: Foundation, Auth & Project Setup
* **Sprint Goal**: *"Establish core repository architecture, design system, and implement robust role-based authentication with demo persona switching."*
* **Sprint Duration**: Sprint 1 (Weeks 1-2)
* **Committed Velocity**: 11 Story Points
* **Planned Activities**:
  1. Repository initialization with Git, standard directory structure, and package dependencies.
  2. Setup Express backend with RESTful API foundations and data storage persistence.
  3. Design foundational CSS design system (dark glassmorphism, responsive tokens, typography).
  4. Develop User Login and Session Management (`US-501`).
  5. Develop Role-Based Access Control guards for Admin, Faculty, Student (`US-503`).
  6. Develop Quick Persona Switcher for stakeholder review (`US-504`).
  7. Develop Logout & Session Invalidation (`US-502`).
  8. Automated and manual testing of authentication flows.
* **Sprint Deliverables**:
  * Functional web app shell with interactive login and role switching.
  * Initial Git repository with version tags.
  * Test validation report for authentication credentials.

---

### 3. Sprint 2 Plan: Student Management Module
* **Sprint Goal**: *"Deliver a complete, high-performance Student Directory enabling administrators and faculty to add, search, update, and manage student lifecycle records."*
* **Sprint Duration**: Sprint 2 (Weeks 3-4)
* **Committed Velocity**: 13 Story Points
* **Planned Activities**:
  1. Implement student registration modal with dynamic validation (`US-101`).
  2. Implement real-time multi-criteria search and department filter (`US-102`).
  3. Implement detailed student profile inspector modal with enrolled courses and stats (`US-103`).
  4. Implement student profile update interface (`US-104`).
  5. Implement safe student deletion / deactivation with confirmation safeguards (`US-105`).
  6. Unit and integration testing across student CRUD endpoints.
* **Sprint Deliverables**:
  * Live Student Management tab with responsive tabular UI and interactive modal dialogs.
  * Search latency verified at < 100ms.
  * Verified persistent data mutations.

---

### 4. Sprint 3 Plan: Course & Attendance Management
* **Sprint Goal**: *"Implement academic course cataloging, student course enrollment, and a fast 1-click classroom attendance recording system."*
* **Sprint Duration**: Sprint 3 (Weeks 5-6)
* **Committed Velocity**: 20 Story Points
* **Planned Activities**:
  1. Implement Add Course form and catalog listing (`US-201`).
  2. Implement course details and faculty syllabus editor (`US-202`).
  3. Implement batch course-student enrollment system (`US-203`).
  4. Build course roster inspector (`US-204`).
  5. Build lecture attendance recording interface with 1-click "Mark All Present" toggle (`US-301`).
  6. Build lecture session history viewer (`US-302`).
  7. Build student real-time attendance compliance view (`US-303`).
  8. Build course-wise attendance summary report with percentage calculations (`US-304`).
* **Sprint Deliverables**:
  * Working Course Catalog and Enrollment Manager.
  * Daily Lecture Attendance recording interface with automated percentage computations.
  * Test execution logs for edge cases (0% attendance, 100% attendance, late arrivals).

---

### 5. Sprint 4 Plan: Marks, Performance, Alerts & Reports
* **Sprint Goal**: *"Deliver continuous assessment scoring, automated letter grading, result sheet generation, real-time alert center, and executive analytics."*
* **Sprint Duration**: Sprint 4 (Weeks 7-8)
* **Committed Velocity**: 23 Story Points
* **Planned Activities**:
  1. Assessment marks entry (Internal, Midterm, End-Sem) (`US-401`).
  2. Automated GPA/CGPA and letter grade computation engine (`US-402`).
  3. Formal printable result sheet / transcript generator (`US-403`).
  4. Low attendance warning threshold alert listener (`US-601`).
  5. Exam and result announcement feed (`US-602`, `US-603`).
  6. Executive analytics dashboard with interactive charts (`US-701`).
  7. Structured CSV report exporter (`US-702`).
* **Sprint Deliverables**:
  * Complete, integrated academic assessment and grading suite.
  * Interactive Notification Center with dynamic unread badges.
  * Printable academic report cards.
  * Executive dashboard with graphical charts.
