# Complete Agile Project Planning Report
# Student Record and Academic Management Platform (SRAMP)
### Unit-2 Agile Mini-Project — Comprehensive Final Submission

---

## 1. Introduction & Project Background
The **Student Record and Academic Management Platform (SRAMP)** is an enterprise-grade academic management system engineered to modernize campus administration. Higher education institutions face mounting challenges with manual paper attendance rosters, scattered grade spreadsheets, and delayed notifications that prevent students from identifying attendance shortages before semester exams.

This project executes the full Agile software development lifecycle—from discovery, persona profiling, and epic definition to story estimation, sprint backlog planning, simulated Scrum ceremonies, and live interactive board execution.

---

## 2. Agile Product Vision & Objectives
* **Product Vision Statement**:
  > *"Develop a secure, high-performance, and user-friendly Student Record and Academic Management Platform that enables educational institutions to efficiently manage student records, attendance, academic performance, course registration, and reporting through a scalable web-based application."*
* **Core Objectives**:
  1. Digitize student lifecycle records with sub-second retrieval and multi-attribute search.
  2. Accelerate classroom attendance logging to under 60 seconds with 1-click bulk marking.
  3. Eradicate human calculation errors in GPA/CGPA grading through automated assessment algorithms.
  4. Provide proactive notification alerts for students falling below the statutory 75% attendance threshold.
  5. Provide academic deans with unified real-time institutional analytics.

---

## 3. Scrum Team Structure & Roles
The project operates under the Scrum Framework:
* **Product Owner**: Anita Desai (Academic Administration Representative) — Responsible for backlog prioritization, stakeholder alignment, and accepting completed user stories.
* **Scrum Master**: Priya Iyer (Agile Coach) — Responsible for ceremony facilitation, impediment removal, team coaching, and burndown monitoring.
* **Development Team**: Aarav Mehta (Lead Architect), Sanya Verma (Frontend/UX), Rohan Gupta (Backend/Security), Kavita Patel (QA Automation), Vikram Joshi (DevOps/Docs).

---

## 4. Project Epics Breakdown
The software platform is decomposed into 7 functional Epics:
1. **Epic 1 – Student Management**: Registration, profile management, real-time search, update, deletion.
2. **Epic 2 – Course Management**: Add course, update syllabus, batch assign students, view rosters.
3. **Epic 3 – Attendance Management**: Select course and date, 1-click "Mark All Present", toggle P/A/L, calculate rates.
4. **Epic 4 – Marks and Academic Performance**: Enter continuous marks, calculate letter grades (A-F) and GPA, generate printable transcripts.
5. **Epic 5 – Authentication and Security**: Multi-role login (Admin, Faculty, Student), RBAC permissions, demo persona switcher.
6. **Epic 6 – Notifications**: Automated attendance warning alerts (<75%), exam alerts, result publication notices.
7. **Epic 7 – Reporting**: Interactive dashboards, grade distribution histograms, course enrollment statistics, CSV export.

---

## 5. User Stories & Acceptance Criteria Highlights
* **US-101 (Add Student - 3 SP)**: Given valid student details, when submitted, a unique ID is verified, the record is stored, and the student directory updates dynamically.
* **US-301 (Record Attendance - 5 SP)**: Given a course and lecture date, faculty can click "Mark All Present" or toggle individual students; saving commits attendance logs and recomputes the student's cumulative rate.
* **US-402 (Automated GPA - 3 SP)**: Automatically converts internal (20), midterm (30), and end-semester (50) scores into standardized 10.0 scale GPA and letter grades (A+, A, B, C, D, F).
* **US-503 (RBAC Security - 5 SP)**: Guarantees that students cannot modify grades or attendance and faculty are restricted to their assigned courses.

---

## 6. Story Point Estimation & Planning Poker
* **Estimation Scale**: Modified Fibonacci (1 = Very Easy, 2 = Easy, 3 = Moderate, 5 = Difficult, 8 = Very Difficult, 13 = Complex).
* **Baseline Reference**: `US-101 (Add Student)` established as the golden 3-point reference story.
* **Total Product Backlog**: 25 User Stories totaling **75 Story Points**.

---

## 7. Sprint Execution & Burndown Analytics
* **Sprint Cadence**: 2-Week Sprints (4 iterations).
* **Sprint 1 (11 SP)**: Auth, Setup, RBAC, Persona Switcher — **100% Delivered**.
* **Sprint 2 (13 SP)**: Student Registration, Profile Modal, Search & Filters — **100% Delivered**.
* **Sprint 3 (20 SP)**: Course Catalog, Roster Allocation, 1-Click Attendance — **100% Delivered**.
* **Sprint 4 (23 SP)**: Assessment Marks, GPA Calculator, Alerts, Printable Result Sheet, Analytics — **100% Delivered**.
* **Burndown Performance**: Sprints 1–3 achieved a combined velocity of 44 SP, stabilizing team throughput at 20-23 SP per sprint.

---

## 8. Scrum Ceremonies Simulation Summary
* **Daily Scrum**: 15-minute time-boxed standups structured around yesterday's progress, today's targets, and active impediments.
* **Sprint Review**: End-of-sprint demonstration to stakeholders (Dr. Rajesh Kumar and Priya Sharma); feedback incorporated into subsequent sprints.
* **Sprint Retrospective**: Identified bottlenecks with 5 SP stories; instituted rule to decompose any story > 3 SP and enforce strict WIP limits on the Scrum Board.

---

## 9. Comparative Agile Framework Study & Selection
Evaluated seven industry frameworks: Scrum, Kanban, Extreme Programming (XP), Lean Software Development, Large Scale Scrum (LeSS), Scaled Agile Framework (SAFe), and Scrum@Scale.
* **Final Selection**: **Scrum + XP Engineering Practices**.
* **Rationale**: Single cross-functional team (7 members) benefits from Scrum's predictable sprint cadence and clear PO/SM accountabilities, while XP practices (TDD, CI, code review) guarantee high software reliability without the bureaucratic overhead of enterprise frameworks like SAFe.

---

## 10. Deliverables Index in Repository
1. `docs/01_Product_Vision_Document.md`
2. `docs/02_Scrum_Team_Structure_and_Roles.md`
3. `docs/03_Epic_Documentation.md`
4. `docs/04_User_Story_Repository.md`
5. `docs/05_Acceptance_Criteria_Document.md`
6. `docs/06_Prioritized_Product_Backlog.md`
7. `docs/07_Story_Point_Estimation_Sheet.md`
8. `docs/08_Sprint_Planning_Document.md`
9. `docs/09_Sprint_Backlog.md`
10. `docs/10_Scrum_Board_Specification.md`
11. `docs/11_Burndown_Chart_Analysis.md`
12. `docs/12_Sprint_Review_Report.md`
13. `docs/13_Sprint_Retrospective_Report.md`
14. `docs/14_Agile_Framework_Comparison_Report.md`
15. `docs/15_Project_Timeline_and_Release_Roadmap.md`
16. `README.md`
