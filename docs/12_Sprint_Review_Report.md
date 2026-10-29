# Sprint Review Report
## Student Record and Academic Management Platform (SRAMP)

---

### 1. Sprint Review Meeting Overview
* **Ceremony**: Sprint Review & Demonstration (Simulated Scrum Ceremony)
* **Date Conducted**: End of Sprint 3 Iteration
* **Attendees**:
  * **Product Owner**: Anita Desai
  * **Scrum Master**: Priya Iyer
  * **Development Team**: Aarav Mehta, Sanya Verma, Rohan Gupta, Kavita Patel, Vikram Joshi
  * **Key Stakeholders**: Dr. Rajesh Kumar (Faculty Representative), Priya Sharma (Student Council Representative)

---

### 2. Sprint Goals & Commitment Audit

| Sprint | Committed Goal | Planned SP | Accepted SP | Acceptance Status |
|---|---|---|---|---|
| **Sprint 1** | Repository setup, design tokens, role-based authentication & quick persona switcher. | 11 SP | 11 SP | **100% Accepted** |
| **Sprint 2** | Full Student Management lifecycle directory with search, filter, profile modal, and update. | 13 SP | 13 SP | **100% Accepted** |
| **Sprint 3** | Course catalog, student enrollment, and 1-click classroom attendance recording. | 20 SP | 20 SP | **100% Accepted** |

---

### 3. Increment Demonstration Highlights

#### Demo 1: Multi-Role Authentication & Quick Switcher
* **Demonstrated by**: Rohan Gupta & Sanya Verma
* **Execution**: Showed instant 1-click persona switching between Administrator, Faculty Member (Dr. Rajesh), and Student (Priya Sharma).
* **Stakeholder Feedback**: Dr. Rajesh commended the elimination of relogging delays during testing; Product Owner Anita approved the role permission guards.

#### Demo 2: Real-time Student Directory & Profile Modal
* **Demonstrated by**: Sanya Verma
* **Execution**: Created new student record "Aditi Sen", tested real-time filter by Department ("Computer Science"), opened profile modal displaying enrolled courses and calculated stats.
* **Stakeholder Feedback**: Highly rated for responsiveness; Student Representative Priya noted the clarity of the profile overview.

#### Demo 3: Fast 1-Click Attendance Recording
* **Demonstrated by**: Aarav Mehta & Kavita Patel
* **Execution**: Selected course CS301 (Data Structures), demonstrated "Mark All Present" button, toggled two absent students, and saved. Proved attendance percentage recomputation in real-time.
* **Stakeholder Feedback**: Dr. Rajesh praised the workflow, estimating it will save faculty over 5 minutes per class.

---

### 4. Stakeholder Feedback & Backlog Adjustments
1. **Attendance Warning Color Coding**: Stakeholders requested immediate visual badges (red tag for attendance < 75%) so students can spot danger zones instantly.
   * *PO Decision*: Accepted and scheduled as a high-priority enhancement in Sprint 4 (`US-601`).
2. **Print-Friendly Format for Result Sheets**: Examination officers requested result sheets to strip UI elements when printed.
   * *PO Decision*: Added to Sprint 4 scope (`US-403`).
3. **Formal PO Acceptance Statement**:
   > *"The increment meets all established acceptance criteria and conforms to the Definition of Done. The working software is formally accepted for staging deployment."* — Anita Desai, Product Owner.
