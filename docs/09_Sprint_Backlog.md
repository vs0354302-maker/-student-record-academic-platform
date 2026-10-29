# Sprint Backlog Document
## Student Record and Academic Management Platform (SRAMP)

---

### Sprint 1 Backlog: Foundation, Auth & Setup
* **Goal**: Establish core architecture and role-based authentication.
* **Target Points**: 11 SP | **Status**: Completed

| Story ID | Technical Task Breakdown | Assignee | Est. Hours | Story Points | Status |
|---|---|---|---|---|---|
| `US-501` | **Task 1.1**: Initialize Express server with CORS & JSON body parser. | Aarav Mehta | 4 hrs | 3 SP | Done |
| | **Task 1.2**: Build UI login component with email & password validation. | Sanya Verma | 4 hrs | | Done |
| | **Task 1.3**: Implement credential verification endpoint & token storage. | Rohan Gupta | 6 hrs | | Done |
| `US-502` | **Task 2.1**: Implement user session invalidation and cleanup handler. | Rohan Gupta | 2 hrs | 1 SP | Done |
| `US-503` | **Task 3.1**: Create RBAC permission map for Admin, Faculty, Student. | Aarav Mehta | 6 hrs | 5 SP | Done |
| | **Task 3.2**: Implement UI route/tab guardrails based on active role. | Sanya Verma | 6 hrs | | Done |
| | **Task 3.3**: Verify student role restrictions against mutation actions. | Kavita Patel | 4 hrs | | Done |
| `US-504` | **Task 4.1**: Build Quick Demo Persona Switcher in header navbar. | Sanya Verma | 3 hrs | 2 SP | Done |

---

### Sprint 2 Backlog: Student Management Module
* **Goal**: Complete student lifecycle management directory.
* **Target Points**: 13 SP | **Status**: Completed

| Story ID | Technical Task Breakdown | Assignee | Est. Hours | Story Points | Status |
|---|---|---|---|---|---|
| `US-101` | **Task 5.1**: Design Student Registration Modal with HTML5 validation. | Sanya Verma | 5 hrs | 3 SP | Done |
| | **Task 5.2**: Build `POST /api/students` endpoint with ID uniqueness check. | Rohan Gupta | 4 hrs | | Done |
| `US-102` | **Task 6.1**: Implement client-side debounce search filter by ID/Name. | Aarav Mehta | 3 hrs | 2 SP | Done |
| | **Task 6.2**: Add department & status dropdown filter logic. | Sanya Verma | 3 hrs | | Done |
| `US-103` | **Task 7.1**: Build Student Profile modal component with stats & avatar. | Sanya Verma | 5 hrs | 3 SP | Done |
| | **Task 7.2**: Connect enrolled course list & attendance percentage summary. | Rohan Gupta | 4 hrs | | Done |
| `US-104` | **Task 8.1**: Create edit student handler with pre-populated form values. | Aarav Mehta | 4 hrs | 3 SP | Done |
| | **Task 8.2**: Implement `PUT /api/students/:id` endpoint and error checks. | Rohan Gupta | 4 hrs | | Done |
| `US-105` | **Task 9.1**: Build safe delete confirmation dialog with cancel option. | Sanya Verma | 2 hrs | 2 SP | Done |
| | **Task 9.2**: Implement `DELETE /api/students/:id` endpoint. | Rohan Gupta | 2 hrs | | Done |

---

### Sprint 3 Backlog: Course & Attendance Management
* **Goal**: Course catalog, student enrollment, and 1-click attendance tracking.
* **Target Points**: 20 SP | **Status**: Completed

| Story ID | Technical Task Breakdown | Assignee | Est. Hours | Story Points | Status |
|---|---|---|---|---|---|
| `US-201` | **Task 10.1**: Build Add Course modal form (Code, Title, Dept, Faculty). | Sanya Verma | 4 hrs | 3 SP | Done |
| | **Task 10.2**: Create `POST /api/courses` and duplicate code validation. | Rohan Gupta | 4 hrs | | Done |
| `US-202` | **Task 11.1**: Build Course Update and Faculty instructor reassignment. | Rohan Gupta | 3 hrs | 2 SP | Done |
| `US-203` | **Task 12.1**: Implement Course Enrollment interface with student selector. | Aarav Mehta | 6 hrs | 5 SP | Done |
| | **Task 12.2**: Build atomic batch enrollment persistence logic. | Rohan Gupta | 6 hrs | | Done |
| `US-204` | **Task 13.1**: Build course roster view displaying enrolled students. | Sanya Verma | 3 hrs | 2 SP | Done |
| `US-301` | **Task 14.1**: Build daily attendance sheet UI with date and course picker. | Sanya Verma | 6 hrs | 5 SP | Done |
| | **Task 14.2**: Implement 1-click "Mark All Present" toggle and P/A/L buttons. | Aarav Mehta | 5 hrs | | Done |
| | **Task 14.3**: Implement `POST /api/attendance` endpoint with session logs. | Rohan Gupta | 5 hrs | | Done |
| `US-302` | **Task 15.1**: Build historical attendance sessions table view. | Sanya Verma | 4 hrs | 3 SP | Done |
| `US-303` | **Task 16.1**: Implement student attendance calculation & alert badge. | Rohan Gupta | 3 hrs | 2 SP | Done |
| `US-304` | **Task 17.1**: Build course attendance summary metrics generator. | Aarav Mehta | 4 hrs | 3 SP | Done |

---

### Sprint 4 Backlog: Marks, Alerts & Reporting
* **Goal**: Grading calculations, report sheets, alert center, and analytics.
* **Target Points**: 21 SP | **Status**: Completed

| Story ID | Technical Task Breakdown | Assignee | Est. Hours | Story Points | Status |
|---|---|---|---|---|---|
| `US-401` | **Task 18.1**: Create marks entry matrix (Internal, Midterm, End-Sem). | Aarav Mehta | 6 hrs | 5 SP | Done |
| `US-402` | **Task 19.1**: Implement automated letter grade (A-F) & GPA math engine. | Rohan Gupta | 4 hrs | 3 SP | Done |
| `US-403` | **Task 20.1**: Build printable result sheet card with print CSS layout. | Sanya Verma | 5 hrs | 3 SP | Done |
| `US-601` | **Task 21.1**: Implement threshold listener for <75% attendance alerts. | Rohan Gupta | 4 hrs | 3 SP | Done |
| `US-602` | **Task 22.1**: Create interactive notification bell & dropdown feed. | Sanya Verma | 3 hrs | 2 SP | Done |
| `US-701` | **Task 23.1**: Build analytics dashboard with HTML5 canvas charts. | Aarav Mehta | 6 hrs | 5 SP | Done |
