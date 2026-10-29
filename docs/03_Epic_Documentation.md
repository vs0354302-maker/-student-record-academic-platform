# Epic Documentation
## Student Record and Academic Management Platform (SRAMP)

---

### Epic Portfolio Overview
The SRAMP platform is organized into 7 foundational Epics representing high-level functional domains. Each Epic encapsulates cohesive user journeys, business outcomes, and measurable technical deliverables.

```
       +-------------------------------------------------------------+
       |   Student Record and Academic Management Platform (SRAMP)   |
       +-------------------------------------------------------------+
          |           |           |           |           |        |
          v           v           v           v           v        v
     [Epic 1]    [Epic 2]    [Epic 3]    [Epic 4]    [Epic 5]   [Epic 6/7]
     Student      Course     Attendance   Academic     Auth &    Alerts &
     Management  Management  Tracking   Performance  Security   Reports
```

---

### Epic 1: Student Management
* **Epic ID**: `EPC-001`
* **Target Sprint**: Sprint 2
* **Epic Purpose**: Provide a centralized, reliable repository for complete student lifecycle management from initial institutional intake to graduation.
* **Scope**:
  * Digital registration of new students with demographic, academic, and contact attributes.
  * Searchable directory supporting multi-parameter filtering (by Name, ID, Department, Status, Year).
  * Comprehensive Student Profile Management modal displaying enrolled courses, attendance summary, and current CGPA.
  * Real-time profile updates (contact info, enrollment status).
  * Safe student record deletion / archiving with confirmation safeguards.
* **Features Included**:
  1. `FEAT-1.1`: Student Registration Form & Validation
  2. `FEAT-1.2`: Student Profile Management & Detail Inspector
  3. `FEAT-1.3`: Instant Search & Dynamic Multi-Filter System
  4. `FEAT-1.4`: Student Information Update Interface
  5. `FEAT-1.5`: Student Deletion / Record Deactivation Safeguards
* **Business Value**: Eliminates physical record folders, reduces record lookup time to sub-second speeds, and prevents duplicate records.

---

### Epic 2: Course Management
* **Epic ID**: `EPC-002`
* **Target Sprint**: Sprint 3
* **Epic Purpose**: Structure academic curricula, catalog course offerings, assign primary faculty instructors, and manage student enrollments.
* **Scope**:
  * Course creation with code, title, credits, department, semester, and instructor allocation.
  * Updating syllabus details, course descriptions, and capacity limits.
  * Student course assignment and batch enrollment management.
  * Course profile inspection showing total enrolled students and syllabus breakdown.
* **Features Included**:
  1. `FEAT-2.1`: Add New Course Offering
  2. `FEAT-2.2`: Update Course Details & Syllabus Information
  3. `FEAT-2.3`: Assign Students to Courses (Batch & Individual Enrollment)
  4. `FEAT-2.4`: View Detailed Course Catalog & Instructor Allocation
* **Business Value**: Standardizes academic offerings, clarifies faculty workloads, and maintains clean prerequisite and credit tracking.

---

### Epic 3: Attendance Management
* **Epic ID**: `EPC-003`
* **Target Sprint**: Sprint 3
* **Epic Purpose**: Digitize daily classroom attendance tracking to ensure high pedagogical compliance, minimize lost lecture time, and maintain audit-proof records.
* **Scope**:
  * Lecture session initialization: course selection, lecture date, topic.
  * Roster-based 1-click status assignment (`Present`, `Absent`, `Late`).
  * Quick-action bulk toggle ("Mark All Present").
  * Instant automatic computation of cumulative student attendance percentage.
  * Course-level and student-level attendance summaries.
* **Features Included**:
  1. `FEAT-3.1`: Daily Lecture Attendance Recording Interface
  2. `FEAT-3.2`: View Attendance History & Session Logs
  3. `FEAT-3.3`: Automated Attendance Threshold Calculation & Course Reports
* **Business Value**: Saves 5-10 minutes per lecture, eliminates attendance tampering, and enables automated flagging of students needing intervention.

---

### Epic 4: Marks and Academic Performance
* **Epic ID**: `EPC-004`
* **Target Sprint**: Sprint 4
* **Epic Purpose**: Provide a continuous assessment engine that records exam components, computes standardized letter grades, tracks GPA/CGPA, and generates printable result sheets.
* **Scope**:
  * Score entry for continuous internal assessments, midterms, and final examinations.
  * In-line score modification with audit history.
  * Configurable automatic grading logic (e.g., A: 90+, B: 80-89, C: 70-79, D: 60-69, F: <60) and Grade Point Average (GPA) scaling.
  * Dynamic result sheet / report card generation ready for printing or exporting.
* **Features Included**:
  1. `FEAT-4.1`: Enter Assessment Marks (Internal, Midterm, End-Semester)
  2. `FEAT-4.2`: Update & Correct Examination Scores
  3. `FEAT-4.3`: Automated Grade Point Average (GPA / CGPA) & Letter Grade Calculator
  4. `FEAT-4.4`: Generate Printable Student Result Sheets & Academic Transcripts
* **Business Value**: Eradicates human calculation errors, reduces grade publication turnaround from weeks to minutes, and delivers immediate performance transparency.

---

### Epic 5: Authentication and Security
* **Epic ID**: `EPC-005`
* **Target Sprint**: Sprint 1
* **Epic Purpose**: Ensure zero-trust security, protect sensitive academic data, enforce privacy compliance, and deliver seamless role-based navigation.
* **Scope**:
  * Multi-role user authentication with pre-configured personas (Administrator, Faculty, Student).
  * Secure credential validation with intuitive error feedback.
  * Role-Based Access Control (RBAC) restricting views and mutations (e.g., students cannot alter attendance or grades).
  * Session state management, quick role switching for demonstrations, and clean logout.
* **Features Included**:
  1. `FEAT-5.1`: Secure User Login Interface
  2. `FEAT-5.2`: Session Termination & Secure Logout
  3. `FEAT-5.3`: Password Reset & Recovery Workflow
  4. `FEAT-5.4`: Role-Based Access Control (RBAC) Guardrails
* **Business Value**: Enforces regulatory compliance (FERPA / GDPR academic data protection), guarantees institutional security, and ensures personalized user experiences.

---

### Epic 6: Notifications & Alerts
* **Epic ID**: `EPC-006`
* **Target Sprint**: Sprint 4
* **Epic Purpose**: Provide real-time operational alerts keeping all campus stakeholders informed of critical deadlines, academic thresholds, and institutional notices.
* **Scope**:
  * Automated early-warning attendance alerts triggered when a student's attendance drops below 75%.
  * Examination timetable announcements and venue alerts.
  * Result publication and grade finalization notifications.
  * In-app notification center with read/unread status badges.
* **Features Included**:
  1. `FEAT-6.1`: Automated Attendance Shortage Alerts (<75% Threshold)
  2. `FEAT-6.2`: Examination Schedule Notifications
  3. `FEAT-6.3`: Result Publication & Grade Release Alerts
  4. `FEAT-6.4`: Interactive Notification Bell & Status Management
* **Business Value**: Prevents student debarment through early interventions and keeps students and faculty synchronized on important academic events.

---

### Epic 7: Reporting & Academic Analytics
* **Epic ID**: `EPC-007`
* **Target Sprint**: Sprint 4
* **Epic Purpose**: Aggregate campus-wide academic metrics into executive dashboards, visual charts, and exportable reports for data-driven institutional decision making.
* **Scope**:
  * Student enrollment and demographic distribution reports.
  * Attendance aggregate trends across courses and departments.
  * Academic grade distribution histograms and performance percentiles.
  * Course enrollment capacity and faculty workload reports.
  * Export options (CSV, Print-ready view).
* **Features Included**:
  1. `FEAT-7.1`: Comprehensive Student Registry Reports
  2. `FEAT-7.2`: Course-wise & Department-wise Attendance Reports
  3. `FEAT-7.3`: Grade Distribution & Academic Performance Analytics
  4. `FEAT-7.4`: Course Capacity & Faculty Allocation Reports
* **Business Value**: Enables deans and department heads to monitor institutional health, identify underperforming courses, and satisfy accreditation audit requirements.
