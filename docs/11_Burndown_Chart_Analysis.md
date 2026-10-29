# Burndown Chart Analysis
## Student Record and Academic Management Platform (SRAMP)

---

### 1. Burndown Chart Concepts & Purpose
A Sprint Burndown Chart is a vital Agile telemetry artifact that tracks remaining work against time throughout a sprint iteration.
* **X-Axis**: Working days in the sprint (Day 0 to Day 10).
* **Y-Axis**: Remaining effort measured in **Story Points (SP)**.
* **Ideal Guideline**: A linear projection from total committed story points at Day 0 down to 0 points at Day 10.
* **Actual Trend Line**: Daily calculation of remaining points as stories reach the Definition of Done.

---

### 2. Sprint 1 Burndown Metric Log (Committed: 11 SP)

| Sprint Day | Ideal Remaining (SP) | Actual Remaining (SP) | Completed Today (Stories) | Notes & Observations |
|---|---|---|---|---|
| **Day 0** | 11.0 | **11** | - | Sprint Planning complete; backlog committed. |
| **Day 1** | 9.9 | **11** | - | Architecture setup and database initialization. |
| **Day 2** | 8.8 | **11** | - | Express backend boilerplate and router structures. |
| **Day 3** | 7.7 | **8** | `US-501` (3 SP) | Login UI and token validation complete. |
| **Day 4** | 6.6 | **7** | `US-502` (1 SP) | Logout handler completed. |
| **Day 5** | 5.5 | **7** | - | RBAC middleware coding in progress. |
| **Day 6** | 4.4 | **7** | - | Sanya and Rohan refining role guards. |
| **Day 7** | 3.3 | **5** | `US-504` (2 SP) | Persona switcher completed. |
| **Day 8** | 2.2 | **0** | `US-503` (5 SP) | RBAC tests passed; all stories accepted by PO. |
| **Day 9** | 1.1 | **0** | - | Code cleanup and documentation. |
| **Day 10** | 0.0 | **0** | - | Sprint Review & Retrospective. |

---

### 3. Sprint 2 Burndown Metric Log (Committed: 13 SP)

| Sprint Day | Ideal Remaining (SP) | Actual Remaining (SP) | Completed Today (Stories) | Notes & Observations |
|---|---|---|---|---|
| **Day 0** | 13.0 | **13** | - | Sprint 2 committed. |
| **Day 2** | 10.4 | **10** | `US-101` (3 SP) | Student Registration form and API done. |
| **Day 4** | 7.8 | **8** | `US-102` (2 SP) | Real-time Search & Filter functional. |
| **Day 6** | 5.2 | **5** | `US-104` (3 SP) | Student Update profile editor verified. |
| **Day 8** | 2.6 | **2** | `US-103` (3 SP) | Profile modal and course overview verified. |
| **Day 9** | 1.3 | **0** | `US-105` (2 SP) | Safe delete dialog completed and tested. |
| **Day 10** | 0.0 | **0** | - | Sprint 2 increment fully accepted. |

---

### 4. Sprint 3 Burndown Metric Log (Committed: 20 SP)

| Sprint Day | Ideal Remaining (SP) | Actual Remaining (SP) | Completed Today (Stories) | Notes & Observations |
|---|---|---|---|---|
| **Day 0** | 20.0 | **20** | - | Sprint 3 committed. |
| **Day 2** | 16.0 | **17** | `US-201` (3 SP) | Add Course feature completed. |
| **Day 3** | 14.0 | **15** | `US-202` (2 SP) | Course update details complete. |
| **Day 5** | 10.0 | **10** | `US-203` (5 SP) | Batch student enrollment functional. |
| **Day 6** | 8.0 | **8** | `US-204` (2 SP) | Course roster view verified. |
| **Day 8** | 4.0 | **3** | `US-301` (5 SP) | 1-click Attendance engine verified. |
| **Day 9** | 2.0 | **1** | `US-302` (3 SP) | Attendance session logs completed. |
| **Day 10** | 0.0 | **0** | `US-303` (2 SP), `US-304` (3 SP) - Completed in testing. | All 20 SP delivered. |

---

### 5. Burndown Curve Interpretation & Velocity Insights
1. **Sprint 1 Curve**: Exhibited a "staircase burndown" pattern due to `US-503` (5 SP) taking longer to reach testing before clearing all points on Day 8.
2. **Sprint 2 Curve**: Closely mirrored the ideal linear burndown line, indicating effective task decomposition into smaller 2-3 SP chunks.
3. **Sprint 3 Curve**: Handled high-complexity batch enrollment and attendance logic efficiently, demonstrating increasing team maturity and stabilized velocity.
4. **Average Velocity**:
   $$\text{Velocity} = \frac{11 + 13 + 20}{3} \approx 14.67 \text{ SP per sprint}$$
   With full team onboarding, velocity peaked at 20-23 SP by Sprint 3 and 4.
