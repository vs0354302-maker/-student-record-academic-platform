# Sprint Retrospective & Scrum Ceremonies Report
## Student Record and Academic Management Platform (SRAMP)

---

### 1. Simulated Daily Scrum Logs (3-Question Protocol)
Daily Scrums were conducted every morning at 09:30 AM, time-boxed to 15 minutes.

#### Sample Daily Standup Log (Sprint 3, Day 4)
* **Facilitator**: Priya Iyer (Scrum Master)

* **Aarav Mehta (Lead Dev)**:
  * *What did I complete yesterday?* Implemented the batch student enrollment backend API logic.
  * *What will I do today?* Coordinate with Sanya to integrate the 1-click attendance UI with the attendance API.
  * *What challenges am I facing?* None currently; need test student data with edge-case attendance records.

* **Sanya Verma (Frontend Dev)**:
  * *What did I complete yesterday?* Finished the Course Catalog grid view and course details modal.
  * *What will I do today?* Build the interactive attendance roster view with status toggle buttons (P/A/L).
  * *What challenges am I facing?* Clarification on whether "Late" counts toward positive attendance percentage. *(Resolved: PO confirmed Late counts as Present for 75% threshold).*

* **Rohan Gupta (Backend Dev)**:
  * *What did I complete yesterday?* Finished `POST /api/attendance` endpoint and duplicate date session checks.
  * *What will I do today?* Build aggregate percentage calculation service for the student dashboard.
  * *What challenges am I facing?* Blocked briefly waiting for updated schema; unblocked by Aarav.

* **Kavita Patel (QA Engineer)**:
  * *What did I complete yesterday?* Executed regression test suite on Student Management CRUD operations.
  * *What will I do today?* Write automated test scenarios for the 1-click attendance button and date boundaries.
  * *What challenges am I facing?* Need sample student accounts across multiple departments.

---

### 2. Sprint Retrospective Execution
* **Format**: Start-Stop-Continue & "What Went Well / What Challenges Occurred / What Improvements to Implement"
* **Facilitator**: Priya Iyer (Scrum Master)

```
+---------------------------+---------------------------+---------------------------+
|      WHAT WENT WELL?      |   CHALLENGES OCCURRED     |   IMPROVEMENTS PLANNED    |
+---------------------------+---------------------------+---------------------------+
| • High team velocity      | • Initial ambiguity in    | • Enforce stricter story  |
| • Quick persona switching |   grading formulas        |   refinement with PO      |
| • 100% test pass rate     | • 5 SP story caused       | • Decompose 5 SP stories  |
| • Seamless UI styling     |   mid-sprint WIP bottleneck|   into smaller 2-3 SP tasks|
+---------------------------+---------------------------+---------------------------+
```

---

### 3. Detailed Retrospective Analysis

#### 3.1 What Went Well?
1. **Clean Architectural Separation**: Decoupling the frontend UI components and backend REST endpoints allowed frontend and backend developers to work simultaneously without merge conflicts.
2. **Demo Persona Switcher**: Adding 1-click role switching saved dozens of minutes during internal testing and client demonstrations.
3. **Daily Standup Discipline**: Maintaining a strict 15-minute timebox kept discussions focused and prevented technical deep-dives from consuming meeting time.
4. **Active Stakeholder Collaboration**: Product Owner Anita was readily accessible to clarify requirement ambiguities within hours.

#### 3.2 What Challenges Occurred?
1. **Large Story Bottleneck**: The 5-point story `US-301: Record Daily Attendance` remained in "In Progress" for 4 consecutive days, temporarily inflating Work-In-Progress (WIP) and starving downstream testing.
2. **Edge Cases in Grading Calculations**: Initial acceptance criteria lacked precise rounding rules for fractional marks (e.g., 79.5% rounding to 80% Grade A).
3. **Context Switching**: Developers were occasionally interrupted during active sprints with requests for ad-hoc UI customizations.

#### 3.3 What Improvements Should Be Implemented?
1. **Decompose Stories Larger than 3 SP**: Any story sized at 5 SP or above must be split into two smaller, independently testable user stories before sprint commitment.
2. **Explicit Formula Spec Sheet**: Mathematical formulas for GPA, CGPA, and attendance percentages must be documented with explicit test vectors before development starts.
3. **Strict WIP Limits**: Enforce maximum WIP limit of 4 cards in "In Progress" and 3 cards in "Testing" to prevent task starvation.
4. **Scrum Master Gatekeeping**: Protect development focus by funneling all ad-hoc stakeholder inquiries exclusively through the Product Owner.

---

### 4. Action Item Commitments

| Action Item | Owner | Target Timeline | Success Verification Criteria |
|---|---|---|---|
| Split all upcoming Sprint 4 stories > 3 SP | Aarav & Sanya | Sprint 4 Planning | No story in Sprint 4 backlog exceeds 3 SP. |
| Add GPA calculation test fixtures to test suite | Rohan & Kavita | Day 1, Sprint 4 | Test cases cover 100% of grade boundary scenarios. |
| Implement WIP limit alerts on Scrum Board | Vikram Joshi | Sprint 4 | Visual alert appears when WIP exceeds 4 cards. |
