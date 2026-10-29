# Scrum Team Structure and Roles Document
## Student Record and Academic Management Platform (SRAMP)

---

### 1. Scrum Framework Organization
The project is executed using the Scrum framework with a cross-functional, self-organizing team dedicated to delivering high-value increments in rapid sprints.

```
                      +-----------------------------+
                      |   Key Stakeholders          |
                      |  (Deans, Faculty, Students) |
                      +--------------+--------------+
                                     |
                                     v
                      +-----------------------------+
                      |       Product Owner         |
                      |  (Voice of the Stakeholder) |
                      +--------------+--------------+
                                     |
             +-----------------------+-----------------------+
             |                                               |
             v                                               v
+-------------------------+                     +-------------------------+
|      Scrum Master       |<------------------->|    Development Team     |
| (Agile Coach & Servant) |                     | (Design, Code, Test)    |
+-------------------------+                     +-------------------------+
```

---

### 2. Scrum Roles & Detailed Responsibilities

#### 2.1 Product Owner (PO)
* **Designated Lead**: Anita Desai (Academic Administration Representative)
* **Primary Responsibilities**:
  1. **Defining Product Requirements**: Translates high-level academic workflows and institutional rules into clear, testable User Stories with unambiguous Acceptance Criteria.
  2. **Prioritizing the Product Backlog**: Continuously refines and ranks the Product Backlog according to business value, user importance, technical dependencies, and complexity.
  3. **Representing Stakeholder Interests**: Serves as the single source of truth for faculty, student, and registrar priorities.
  4. **Accepting Completed Work**: Evaluates increment demonstrations against the Definition of Done (DoD) and formally accepts or rejects user stories at Sprint Review.
  5. **Release Management**: Authorizes sprint goals, release boundaries, and rollout schedules.

#### 2.2 Scrum Master (SM)
* **Designated Lead**: Priya Iyer (Certified Scrum Master / Agile Coach)
* **Primary Responsibilities**:
  1. **Facilitating Scrum Ceremonies**: Coordinates Sprint Planning, Daily Scrums, Sprint Reviews, and Sprint Retrospectives to keep them time-boxed and goal-oriented.
  2. **Removing Project Impediments**: Proactively clears technical and organizational roadblocks (e.g., test environment blockers, API contract ambiguities).
  3. **Ensuring Agile Practices are Followed**: Protects the team from scope creep during active sprints and coaches the team on WIP limits and estimation standards.
  4. **Supporting Team Collaboration**: Fosters psychological safety, transparent communication, and continuous inspect-and-adapt culture.
  5. **Metric Tracking**: Monitors sprint velocity, burndown charts, and cycle times to provide team performance insights.

#### 2.3 Development Team
The development team is cross-functional, autonomous, and composed of specialized yet T-shaped engineers:

| Team Member | Primary Specialty | Key Responsibilities |
|---|---|---|
| **Aarav Mehta** | Full-Stack Lead / Architect | System architecture, REST API design, database schemas, code reviews. |
| **Sanya Verma** | Frontend Engineer / UI/UX | Component styling, responsive dashboards, modern glassmorphic interface, UX workflows. |
| **Rohan Gupta** | Backend Engineer | Authentication security, RBAC middleware, grading algorithms, data persistence. |
| **Kavita Patel** | QA & Automation Engineer | Test case authoring, acceptance criteria verification, cross-browser compatibility, regression testing. |
| **Vikram Joshi** | DevOps & Documentation | Git workflows, CI/CD pipeline, artifact generation, release deployment. |

* **Collective Development Team Responsibilities**:
  * Designing the application architecture and database schema.
  * Writing clean, modular, maintainable, and self-documenting code.
  * Writing unit and end-to-end integration tests.
  * Preparing technical and user-facing documentation.
  * Demonstrating completed, working software increments at the end of every sprint.

---

### 3. RACI Matrix for Key Project Activities

| Activity / Artifact | Product Owner | Scrum Master | Dev Team | Stakeholders |
|---|---|---|---|---|
| **Product Vision & Goals** | Accountable (A) | Consulted (C) | Consulted (C) | Informed (I) |
| **Product Backlog Prioritization** | Accountable (A) | Consulted (C) | Consulted (C) | Informed (I) |
| **Sprint Backlog Creation** | Consulted (C) | Facilitates (F) | Accountable (A) | Informed (I) |
| **Daily Standup Execution** | Informed (I) | Facilitates (F) | Responsible (R) | - |
| **Software Implementation & Testing** | Consulted (C) | Supports (S) | Accountable (A) | - |
| **Story Acceptance / Rejection** | Accountable (A) | Consulted (C) | Responsible (R) | Consulted (C) |
| **Sprint Retrospective Action Items** | Responsible (R) | Facilitates (F) | Accountable (A) | - |

---

### 4. Working Agreements & Definition of Done (DoD)
To uphold engineering rigor, a User Story is considered **"Done"** only when:
1. Code is implemented following ES6+ standards and modular architecture.
2. Acceptance criteria defined in the story are 100% verified and validated.
3. UI is fully responsive across desktop and mobile screen viewports.
4. No critical or high-severity bugs remain unaddressed.
5. Peer code review has been completed and approved.
6. Documentation and user guide notes are updated.
7. The feature is demonstrated to and accepted by the Product Owner.
