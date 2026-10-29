# Prioritized Product Backlog
## Student Record and Academic Management Platform (SRAMP)

---

### 1. Prioritization Framework & Methodology
The Product Backlog is prioritized collaboratively by the Product Owner and Scrum Team using a weighted evaluation model based on four core criteria:
1. **Business Value (1-10)**: Financial and operational impact on institutional workflows.
2. **User Importance (1-10)**: Daily necessity to primary end-users (students and faculty).
3. **Technical Dependencies**: Foundation required before subsequent features can be built (e.g., Auth & DB before CRUD).
4. **Implementation Complexity**: Architectural risk and development effort.

Stories are classified into **High**, **Medium**, and **Low** priority tiers, aligning directly with the MoSCoW prioritization model (Must have, Should have, Could have, Won't have this release).

---

### 2. Consolidated Prioritized Backlog

| Rank | Story ID | Epic | User Story Summary | Business Value | User Importance | Technical Dependency | Complexity | Priority | Target Sprint | Story Points |
|---|---|---|---|---|---|---|---|---|---|---|
| **1** | `US-501` | Authentication | User Login & Authentication System | 10 | 10 | None (Foundation) | Moderate | **High** | Sprint 1 | 3 |
| **2** | `US-503` | Authentication | Role-Based Access Control (RBAC) | 10 | 9 | US-501 | Difficult | **High** | Sprint 1 | 5 |
| **3** | `US-101` | Student Mgmt | Add / Register New Student | 9 | 9 | US-503 | Moderate | **High** | Sprint 2 | 3 |
| **4** | `US-102` | Student Mgmt | Search & Filter Students Dynamic Directory | 9 | 9 | US-101 | Easy | **High** | Sprint 2 | 2 |
| **5** | `US-201` | Course Mgmt | Add & Configure Academic Courses | 8 | 8 | US-101 | Moderate | **High** | Sprint 3 | 3 |
| **6** | `US-203` | Course Mgmt | Assign / Enroll Students to Courses | 9 | 9 | US-201, US-101 | Difficult | **High** | Sprint 3 | 5 |
| **7** | `US-301` | Attendance | Record Daily Lecture Attendance (1-Click) | 10 | 10 | US-203 | Difficult | **High** | Sprint 3 | 5 |
| **8** | `US-303` | Attendance | Real-time Student Attendance View & Rate | 8 | 9 | US-301 | Easy | **High** | Sprint 3 | 2 |
| **9** | `US-401` | Performance | Enter Internal & Exam Marks | 9 | 9 | US-203 | Difficult | **High** | Sprint 4 | 5 |
| **10** | `US-402` | Performance | Automated GPA / CGPA & Letter Grade Calculator | 8 | 8 | US-401 | Moderate | **High** | Sprint 4 | 3 |
| **11** | `US-601` | Notifications | Low Attendance Alert Trigger (<75%) | 8 | 8 | US-301 | Moderate | **High** | Sprint 4 | 3 |
| **12** | `US-103` | Student Mgmt | View Detailed Student Profile & Enrolled Stats | 7 | 8 | US-101 | Moderate | **Medium** | Sprint 2 | 3 |
| **13** | `US-104` | Student Mgmt | Update Student Profile & Academic Year | 7 | 7 | US-101 | Moderate | **Medium** | Sprint 2 | 3 |
| **14** | `US-202` | Course Mgmt | Update Course Syllabus & Faculty Assignment | 7 | 6 | US-201 | Easy | **Medium** | Sprint 3 | 2 |
| **15** | `US-204` | Course Mgmt | View Course Details & Enrolled Roster | 7 | 7 | US-203 | Easy | **Medium** | Sprint 3 | 2 |
| **16** | `US-302` | Attendance | View Course Attendance History Logs | 7 | 7 | US-301 | Moderate | **Medium** | Sprint 3 | 3 |
| **17** | `US-304` | Attendance | Generate Course Attendance Summary Report | 7 | 7 | US-301 | Moderate | **Medium** | Sprint 3 | 3 |
| **18** | `US-403` | Performance | Generate Printable Student Result Sheet / Transcript | 7 | 8 | US-402 | Moderate | **Medium** | Sprint 4 | 3 |
| **19** | `US-602` | Notifications | Examination & Timetable Alerts | 6 | 7 | US-501 | Easy | **Medium** | Sprint 4 | 2 |
| **20** | `US-603` | Notifications | Semester Result Publication Notification | 6 | 7 | US-402 | Easy | **Medium** | Sprint 4 | 2 |
| **21** | `US-702` | Reporting | Export Attendance & Performance Data to CSV | 6 | 6 | US-301, US-401 | Moderate | **Medium** | Sprint 4 | 3 |
| **22** | `US-504` | Authentication | Quick Persona Switcher for Stakeholder Review | 5 | 5 | US-501 | Easy | **Medium** | Sprint 1 | 2 |
| **23** | `US-105` | Student Mgmt | Delete Student Record with Safe Confirmation | 5 | 4 | US-101 | Easy | **Low** | Sprint 2 | 2 |
| **24** | `US-502` | Authentication | User Logout & Token Cleanup | 5 | 5 | US-501 | Very Easy | **Low** | Sprint 1 | 1 |
| **25** | `US-701` | Dashboard | Academic Analytics & Executive Trend Charts | 6 | 6 | US-101, US-401 | Difficult | **Low** | Sprint 4 | 5 |

---

### 3. Summary of Story Points by Priority
* **High Priority Items**: 41 Story Points (Must-have core platform functionality)
* **Medium Priority Items**: 26 Story Points (Should-have operational features)
* **Low Priority Items**: 8 Story Points (Enhancements, safety checks, analytics)
* **Total Product Backlog Size**: **75 Story Points**
