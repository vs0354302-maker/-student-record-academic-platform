# Story Point Estimation Sheet & Planning Poker Record
## Student Record and Academic Management Platform (SRAMP)

---

### 1. Estimation Methodology: Planning Poker
The Scrum Team utilized the **Planning Poker** estimation technique, a consensus-based gamified Agile sizing protocol. Story points reflect relative effort, architectural complexity, uncertainty, and cognitive overhead rather than raw calendar hours.

#### Estimation Scale (Modified Fibonacci)
* **1 Point - Very Easy**: Trivial UI adjustment, simple label change, minor state cleanup (e.g., Logout button handler).
* **2 Points - Easy**: Standard component with known patterns, basic filter, small form validation (e.g., Search input, alert badge).
* **3 Points - Moderate**: Standard CRUD operation, form with validation and database interaction (e.g., Add Student, Course Profile).
* **5 Points - Difficult**: Multi-entity interaction, state management across views, role-based security rules, or batch processing (e.g., 1-Click Attendance Roster, Role-Based Access Control).
* **8 Points - Very Difficult**: Complex algorithm, multi-step asynchronous workflow, heavy mathematical models (e.g., Multi-semester dynamic CGPA calculator across arbitrary credit weightings).
* **13 Points - Highly Complex**: System architectural migration, third-party payment/ERP biometric integration with high uncertainty.

---

### 2. Planning Poker Session Consensus Log

| Story ID | Story Title | Developer Initial Votes (Aarav, Sanya, Rohan, Kavita) | Final Consensus | Primary Estimation Drivers & Complexity Factors |
|---|---|---|---|---|
| `US-501` | User Login & Authentication | [3, 2, 3, 3] | **3** | Session token creation, input validation, bcrypt hashing, error notifications. |
| `US-502` | User Logout & Token Cleanup | [1, 1, 1, 1] | **1** | Instant consensus: trivial cache clearing and redirect. |
| `US-503` | Role-Based Access Control (RBAC) | [5, 5, 8, 5] | **5** | Route guards, DOM element conditional rendering for 3 roles (Admin, Faculty, Student), authorization middleware. |
| `US-504` | Fast Persona Switcher | [2, 3, 2, 2] | **2** | Dropdown handler pre-populating session tokens for rapid testing. |
| `US-101` | Add Student Record | [3, 3, 3, 5] | **3** | Form validation, unique roll-number check, real-time table append without page refresh. |
| `US-102` | Search & Filter Students | [2, 2, 3, 2] | **2** | Debounced multi-field string matching across name, department, and status. |
| `US-103` | View Student Profile Modal | [3, 3, 2, 3] | **3** | Aggregate data aggregation (courses, attendance percentage, GPA calculation). |
| `US-104` | Update Student Record | [3, 3, 3, 3] | **3** | Pre-population of fields, dirty check, selective field update, persistence. |
| `US-105` | Delete Student Record | [2, 2, 1, 2] | **2** | Confirmation modal dialog, soft-delete or cascade removal from courses. |
| `US-201` | Add Academic Course | [3, 3, 2, 3] | **3** | Course code uniqueness, credit constraints (1-4), instructor binding. |
| `US-202` | Update Course Details | [2, 2, 2, 2] | **2** | In-place update of syllabus and assigned instructor. |
| `US-203` | Assign Students to Course | [5, 5, 5, 8] | **5** | Many-to-many relationship management, batch enrollment toggle, roster updates. |
| `US-204` | View Course Details & Roster | [2, 2, 3, 2] | **2** | Query and render enrolled students for selected course ID. |
| `US-301` | Record Daily Attendance | [5, 8, 5, 5] | **5** | Bulk toggle ("Mark All Present"), individual status toggles (P/A/L), date validation, atomic database commit. |
| `US-302` | View Attendance History | [3, 3, 3, 2] | **3** | Historical date-wise logs, course filter, attendance percentage breakdown. |
| `US-303` | Student View Personal Attendance | [2, 2, 2, 3] | **2** | Student-specific calculation, color-coded threshold badges (<75% warning). |
| `US-304` | Course Attendance Report | [3, 3, 5, 3] | **3** | Aggregate course-wide calculations, CSV export generation. |
| `US-401` | Enter Assessment Marks | [5, 5, 5, 8] | **5** | Boundary validation (0-20, 0-30, 0-50), live sum calculation, student roster iteration. |
| `US-402` | Automated GPA & Letter Grade | [3, 3, 3, 3] | **3** | Formulaic grading tier execution, weighted grade point calculations. |
| `US-403` | Printable Result Sheet / Transcript | [3, 5, 3, 3] | **3** | Clean HTML/CSS print layout, official institution header, GPA summary. |
| `US-601` | Low Attendance Alert Trigger | [3, 3, 5, 3] | **3** | Threshold listener (<75%), badge count increment, actionable warning card. |
| `US-602` | Exam Schedule Alerts | [2, 2, 2, 2] | **2** | Notification feed item generation with exam date and venue details. |
| `US-603` | Result Publication Notice | [2, 2, 2, 2] | **2** | Notification broadcast when grades are finalized. |
| `US-701` | Executive Summary Dashboard | [5, 5, 5, 8] | **5** | Multi-metric KPI cards, interactive HTML5 canvas charts, grade distribution histogram. |
| `US-702` | Export Data to CSV | [3, 2, 3, 3] | **3** | Client-side CSV blob creation, RFC-4180 escaping, direct file download. |

---

### 3. Sizing Reference Story ("Golden Story")
The team selected **`US-101: Add Student Record` (3 Story Points)** as the golden baseline reference story:
* Requires a standard 5-field responsive form.
* Involves input validation and asynchronous JSON persistence.
* Involves state synchronization with the active table view.
* Any story simpler than `US-101` was sized at 1 or 2; stories with multi-entity orchestration were sized at 5 or above.
