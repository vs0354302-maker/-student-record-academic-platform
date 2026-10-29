# Acceptance Criteria Document
## Student Record and Academic Management Platform (SRAMP)

---

### Purpose
Acceptance Criteria define the measurable conditions that determine whether a User Story is fully functional and meets stakeholder expectations. They form the objective contract between the Product Owner and the Development Team, serving as the definitive criteria for "Done."

---

### Epic 1: Student Management Acceptance Criteria

#### US-101: Add New Student
* **Acceptance Criteria**:
  1. The "Add Student" modal/form displays mandatory fields: Full Name, Student ID (Roll No), Email Address, Department, and Academic Year.
  2. Input validation triggers immediate user feedback if email format is invalid or required fields are left blank.
  3. Student ID must be unique; submitting an existing ID displays an error toast.
  4. On valid submission, the record is immediately persisted to the database and appears in the student directory without requiring a page reload.
  5. A success notification toast confirms "Student registered successfully."

#### US-102: Search & Filter Students
* **Acceptance Criteria**:
  1. Search input filters student rows in real-time (< 100ms response time) matching either Name, Student ID, or Email.
  2. Department dropdown dynamically filters records by selected department (e.g., Computer Science, Electrical Engineering, Mechanical Engineering, Information Technology, or All).
  3. Status dropdown filters records by "Active", "Probation", or "Graduated".
  4. If no records match, an informative "No matching student records found" empty state is displayed with a quick clear-filter button.

#### US-103: View Detailed Student Profile
* **Acceptance Criteria**:
  1. Clicking "View Profile" on any student row opens a detailed profile drawer or modal.
  2. The view displays student avatar, contact info, department, year, overall attendance percentage, and current CGPA.
  3. Displays a breakdown table of enrolled courses with respective attendance rates and current marks.
  4. Closing the profile returns the user to the active filtered table state without reset.

#### US-104: Update Student Information
* **Acceptance Criteria**:
  1. Clicking "Edit" populates the modal with the student's existing information.
  2. Modifying fields (e.g., Phone, Status, Year) and saving updates the record instantly across all views.
  3. Student ID cannot be modified after initial creation to preserve foreign key integrity.

#### US-105: Delete Student Record
* **Acceptance Criteria**:
  1. Clicking "Delete" opens a confirmation dialog warning the user of irreversible deletion.
  2. Confirming deletion removes the student from the registry, course enrollment lists, and active attendance rosters.
  3. A cancellation option aborts the action without data mutation.

---

### Epic 2: Course Management Acceptance Criteria

#### US-201: Add New Course
* **Acceptance Criteria**:
  1. Course form requires: Course Code (e.g., CS301), Course Title, Credit Hours (1 to 4), Department, and Assigned Faculty Member.
  2. Course Code must be unique. Duplicate codes are rejected with an explicit error.
  3. Saved course is instantly visible in the course catalog and available in the attendance course selector.

#### US-203: Assign Students to Courses
* **Acceptance Criteria**:
  1. Course assignment view allows selecting a course and toggling student enrollments via multi-select checkboxes.
  2. Shows total enrolled student count and maximum capacity.
  3. Enrolled students automatically populate in that course's attendance roster and grade sheet.

---

### Epic 3: Attendance Management Acceptance Criteria

#### US-301: Record Daily Lecture Attendance
* **Acceptance Criteria**:
  1. Faculty member selects a Course from dropdown; lecture date defaults to the current date with ability to pick past dates.
  2. The system loads the active enrolled student roster for the selected course.
  3. Faculty can toggle each student's status between `Present` (green), `Absent` (red), and `Late` (amber).
  4. "Mark All Present" button sets all students to `Present` in 1 click for high efficiency.
  5. Clicking "Save Attendance" validates that every student has a status and persists the session log with a timestamp.
  6. Cumulative course attendance percentage for each student is recomputed instantly.

#### US-303: Student View of Personal Attendance
* **Acceptance Criteria**:
  1. Logged-in students can view their attendance summary table across all enrolled courses.
  2. Displays total sessions conducted, sessions attended, and exact percentage.
  3. Visual badge highlights status: Green (>= 75%), Amber (70-74.9%), Red (< 70%).

---

### Epic 4: Marks and Academic Performance Acceptance Criteria

#### US-401 & US-402: Enter Marks and Automatic Grade Calculation
* **Acceptance Criteria**:
  1. Marks entry interface allows entering continuous assessment scores: Internal (out of 20), Midterm (out of 30), and End-Semester Exam (out of 50).
  2. System enforces boundary validation: inputs cannot exceed max marks or be negative.
  3. Total marks (out of 100) are computed dynamically in real-time as values are typed.
  4. Letter grade and Grade Points are assigned according to standard grading scale:
     - 90 - 100%: Grade **A+** (10.0 GP)
     - 80 - 89.9%: Grade **A** (9.0 GP)
     - 70 - 79.9%: Grade **B** (8.0 GP)
     - 60 - 69.9%: Grade **C** (7.0 GP)
     - 50 - 59.9%: Grade **D** (6.0 GP)
     - Below 50%: Grade **F** (0.0 GP - Fail)
  5. Student CGPA is automatically updated on the student's profile.

#### US-403: Generate Printable Result Sheet
* **Acceptance Criteria**:
  1. Clicking "Generate Result Sheet" opens a formatted, printable report card view.
  2. Contains student details, roll number, semester, breakdown of all subjects, marks, letter grades, SGPA, and status (Pass/Fail).
  3. Formatted with clean print styles (`@media print`) stripping navigation bars for official paper printing.

---

### Epic 5: Authentication and Security Acceptance Criteria

#### US-501: User Login
* **Acceptance Criteria**:
  1. Login screen renders smoothly with email/username and password fields.
  2. Quick "Demo Login" buttons allow testing as Administrator, Faculty, or Student with 1 click.
  3. Submitting invalid credentials shows a clear error toast without system crashes.
  4. Successful authentication redirects the user to the dashboard with role-appropriate permissions.
  5. Session state is retained on page refresh using persistent storage.

#### US-503: Role-Based Access Control (RBAC)
* **Acceptance Criteria**:
  1. **Administrator**: Full CRUD access across students, courses, faculty, system settings, and agile board.
  2. **Faculty**: Can record attendance, enter/update marks for assigned courses, view student directory. Cannot delete students or modify system configurations.
  3. **Student**: Read-only access to own profile, personal enrolled courses, personal attendance, personal marks card, and notifications. All edit/delete buttons are disabled or hidden.
