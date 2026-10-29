# Scrum Board Specification & Workflow
## Student Record and Academic Management Platform (SRAMP)

---

### 1. Scrum Board Workflow Architecture
The Scrum Board provides real-time information radiator capabilities, visualizing the flow of value from prioritization to production deployment.

```
+---------------+     +---------------+     +---------------+     +---------------+     +---------------+
|    Backlog    | --> |     To Do     | --> |  In Progress  | --> |    Testing    | --> |   Completed   |
| (Prioritized) |     | (Sprint Ready)|     |  (WIP: Max 4) |     |  (WIP: Max 3) |     | (Done DoD OK) |
+---------------+     +---------------+     +---------------+     +---------------+     +---------------+
```

---

### 2. Column Definitions & Transition Policies

| Column Name | Entry Criteria | Exit Criteria (Transition Rules) | WIP Limit |
|---|---|---|---|
| **Backlog** | Stories refined and prioritized by Product Owner with initial estimates. | Selected for active sprint during Sprint Planning. | Unlimited |
| **To Do** | Committed to the Sprint Backlog; tasks identified; acceptance criteria clear. | Developer pulls card and begins active coding. | 6 Cards |
| **In Progress** | Developer is actively writing code or schema migrations. | Code written; unit tests passing; ready for code review and QA. | **4 Cards** |
| **Testing / Review** | Deployed to test environment; QA verifying acceptance criteria. | All acceptance criteria validated; DoD satisfied; PO approval. | **3 Cards** |
| **Completed** | Definition of Done (DoD) 100% verified; demonstrated at Sprint Review. | Archived at sprint closure. | Unlimited |

---

### 3. Sprint State Snapshot (Mid-Sprint Execution)

```
-----------------------------------------------------------------------------------------------------------------
| Backlog            | To Do              | In Progress        | Testing            | Completed                 |
-----------------------------------------------------------------------------------------------------------------
| • US-603: Result   | • US-204: Course   | • US-301: Record   | • US-203: Batch    | • US-501: User Login      |
|   Notifications    |   Roster View      |   Daily Attendance |   Student Assign   | • US-502: User Logout     |
|   (2 SP, Med)      |   (2 SP, Med)      |   (5 SP, High)     |   (5 SP, High)     | • US-503: RBAC Security   |
| • US-702: CSV      | • US-304: Course   | • US-401: Enter    | • US-103: View     | • US-504: Persona Switch  |
|   Export Reports   |   Attendance Report|   Assessment Marks |   Student Profile  | • US-101: Add Student     |
|   (3 SP, Med)      |   (3 SP, Med)      |   (5 SP, High)     |   (3 SP, Med)      | • US-102: Search Filter   |
|                    |                    |                    |                    | • US-104: Update Student  |
|                    |                    |                    |                    | • US-105: Delete Student  |
|                    |                    |                    |                    | • US-201: Add Course      |
|                    |                    |                    |                    | • US-202: Update Course   |
-----------------------------------------------------------------------------------------------------------------
```

---

### 4. Interactive In-App Scrum Board Capabilities
The web application includes a built-in, real-time interactive **Scrum Board**:
1. **Interactive Column Transitions**: Users can transition cards across columns (`Backlog` -> `To Do` -> `In Progress` -> `Testing` -> `Completed`) or use instant quick-advance controls.
2. **Filtering by Sprint**: Filter views by All Sprints, Sprint 1, Sprint 2, Sprint 3, or Sprint 4.
3. **Filtering by Priority**: Filter dynamically by High, Medium, or Low priority items.
4. **New Story Creation**: Direct modal to add new user stories to the backlog with custom Story Points, Assignee, and Priority.
5. **Real-time Metrics**: Live count of cards and aggregate Story Points displayed in each column header.
