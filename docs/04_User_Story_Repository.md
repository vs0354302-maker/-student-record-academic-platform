# User Story Repository
## Student Record and Academic Management Platform (SRAMP)

---

### Overview
This repository contains the complete catalog of Agile User Stories decomposed from Epics 1 through 7. Every story adheres to the standard Agile formulation:
> **"As a [Role], I want to [Action/Feature] so that [Business Benefit/Outcome]."**

---

### Epic 1: Student Management User Stories

#### US-101: Add New Student
* **User Story**: As an **Academic Administrator**, I want to register a new student with demographic and academic details so that their official university profile is established in the system.
* **Story Points**: 3
* **Sprint**: Sprint 2
* **Priority**: High

#### US-102: Search & Filter Students
* **User Story**: As a **Faculty Member or Administrator**, I want to search students by name, registration ID, department, or enrollment status so that I can quickly locate specific student records.
* **Story Points**: 2
* **Sprint**: Sprint 2
* **Priority**: High

#### US-103: View Detailed Student Profile
* **User Story**: As a **Faculty Advisor**, I want to inspect a student's full profile including enrolled courses, attendance rate, and CGPA so that I can provide personalized academic counseling.
* **Story Points**: 3
* **Sprint**: Sprint 2
* **Priority**: Medium

#### US-104: Update Student Information
* **User Story**: As an **Administrator**, I want to update a student's contact details, status, or academic year so that records reflect changes in the student's status accurately.
* **Story Points**: 3
* **Sprint**: Sprint 2
* **Priority**: Medium

#### US-105: Delete / Archive Student Record
* **User Story**: As an **Administrator**, I want to delete or deactivate a student record with confirmation safeguards so that incorrect entries can be expunged without accidental data loss.
* **Story Points**: 2
* **Sprint**: Sprint 2
* **Priority**: Low

---

### Epic 2: Course Management User Stories

#### US-201: Add New Course Offering
* **User Story**: As a **Department Head**, I want to create a new course with a code, title, credits, department, and assigned faculty instructor so that the curriculum is available for registration.
* **Story Points**: 3
* **Sprint**: Sprint 3
* **Priority**: High

#### US-202: Update Course Syllabus & Faculty Assignment
* **User Story**: As an **Administrator**, I want to modify course information or reassign the instructor so that changes in academic staffing and syllabus are maintained.
* **Story Points**: 2
* **Sprint**: Sprint 3
* **Priority**: Medium

#### US-203: Assign Students to Courses
* **User Story**: As an **Academic Registrar**, I want to enroll students into designated courses so that class rosters are formed for attendance and assessment.
* **Story Points**: 5
* **Sprint**: Sprint 3
* **Priority**: High

#### US-204: View Course Details & Enrolled Roster
* **User Story**: As a **Faculty Member**, I want to view the complete roster of students enrolled in my course so that I know my class composition and headcount.
* **Story Points**: 2
* **Sprint**: Sprint 3
* **Priority**: Medium

---

### Epic 3: Attendance Management User Stories

#### US-301: Record Daily Lecture Attendance
* **User Story**: As a **Faculty Member**, I want to select a course and lecture date to mark students as Present, Absent, or Late with a fast 1-click interface so that daily attendance records remain accurate and updated.
* **Story Points**: 5
* **Sprint**: Sprint 3
* **Priority**: High

#### US-302: View Attendance History by Course
* **User Story**: As a **Faculty Member or Administrator**, I want to view lecture-by-lecture attendance logs so that I can audit past sessions and verify student presence.
* **Story Points**: 3
* **Sprint**: Sprint 3
* **Priority**: Medium

#### US-303: Student View of Personal Attendance
* **User Story**: As a **Student**, I want to monitor my course-by-course attendance percentage in real-time so that I can remain compliant with mandatory attendance regulations.
* **Story Points**: 2
* **Sprint**: Sprint 3
* **Priority**: High

#### US-304: Generate Course Attendance Report
* **User Story**: As an **Administrator**, I want to generate consolidated course attendance reports so that attendance percentages can be submitted for exam eligibility audits.
* **Story Points**: 3
* **Sprint**: Sprint 3
* **Priority**: Medium

---

### Epic 4: Marks and Academic Performance User Stories

#### US-401: Enter Continuous Assessment Marks
* **User Story**: As a **Faculty Member**, I want to enter internal assessment, midterm, and end-semester marks for enrolled students so that their evaluation data is captured digitally.
* **Story Points**: 5
* **Sprint**: Sprint 4
* **Priority**: High

#### US-402: Automated Letter Grade and GPA Calculation
* **User Story**: As a **System User**, I want the platform to automatically compute percentage totals, letter grades (A, B, C, D, F), and Grade Point Averages so that human calculation errors are completely eliminated.
* **Story Points**: 3
* **Sprint**: Sprint 4
* **Priority**: High

#### US-403: Generate Printable Result Sheet / Transcript
* **User Story**: As a **Student or Registrar**, I want to generate and print a formal semester result sheet detailing all course marks, credits, and CGPA so that official records can be distributed.
* **Story Points**: 3
* **Sprint**: Sprint 4
* **Priority**: Medium

---

### Epic 5: Authentication and Security User Stories

#### US-501: User Login
* **User Story**: As a **Registered User (Admin, Faculty, Student)**, I want to securely log in with my credentials so that I gain access to my authorized academic portal.
* **Story Points**: 3
* **Sprint**: Sprint 1
* **Priority**: High

#### US-502: User Logout & Session Invalidation
* **User Story**: As a **User**, I want to log out of my active session so that unauthorized individuals cannot access my account from shared campus computers.
* **Story Points**: 1
* **Sprint**: Sprint 1
* **Priority**: High

#### US-503: Role-Based Access Control (RBAC)
* **User Story**: As a **Security Administrator**, I want to enforce strict role-based access permissions so that students cannot manipulate marks or attendance and faculty are restricted to their assigned courses.
* **Story Points**: 5
* **Sprint**: Sprint 1
* **Priority**: High

#### US-504: Fast Persona / Account Switcher for Demo
* **User Story**: As an **Evaluator or Agile Reviewer**, I want to switch effortlessly between Administrator, Faculty, and Student personas with 1 click so that I can inspect the application from all stakeholder perspectives.
* **Story Points**: 2
* **Sprint**: Sprint 1
* **Priority**: Medium

---

### Epic 6: Notifications User Stories

#### US-601: Low Attendance Alert Trigger
* **User Story**: As a **Student**, I want to receive an automated notification alert whenever my attendance in any course drops below 75% so that I can take corrective action before exam debarment.
* **Story Points**: 3
* **Sprint**: Sprint 4
* **Priority**: High

#### US-602: Examination & Schedule Alerts
* **User Story**: As a **Student**, I want to receive notifications regarding upcoming examination dates and room allocations so that I can prepare accordingly.
* **Story Points**: 2
* **Sprint**: Sprint 4
* **Priority**: Medium

#### US-603: Result Publication Notice
* **User Story**: As a **Student**, I want to be notified as soon as semester grades are published so that I can review my academic performance.
* **Story Points**: 2
* **Sprint**: Sprint 4
* **Priority**: Medium

---

### Epic 7: Reporting User Stories

#### US-701: Institutional Summary Dashboard
* **User Story**: As an **Academic Administrator**, I want to view interactive summary charts of total students, courses, overall average attendance, and grade distribution on a single dashboard so that I have executive insight into institutional health.
* **Story Points**: 5
* **Sprint**: Sprint 4
* **Priority**: High

#### US-702: Export Attendance & Performance Data
* **User Story**: As an **Administrator**, I want to export student, attendance, and grade records to structured CSV or printable formats so that external reporting and archiving requirements are met.
* **Story Points**: 3
* **Sprint**: Sprint 4
* **Priority**: Medium
