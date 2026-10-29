// EduPulse SRAMP — Main Application Controller
// Unit-2 Agile Mini-Project

let state = {
  activeRole: 'admin',
  currentTab: 'dashboard',
  agileSubTab: 'board',
  students: [],
  courses: [],
  attendance: [],
  marks: [],
  notifications: [],
  backlog: [],
  sprints: [],
  activeDoc: '01_Product_Vision_Document.md'
};

// Initialize Application
document.addEventListener('DOMContentLoaded', async () => {
  // Set default attendance date to today
  const dateInput = document.getElementById('attDateInput');
  if (dateInput) {
    dateInput.value = new Date().toISOString().split('T')[0];
  }

  await loadAllData();
  applyRolePermissions();
  renderDashboard();
  renderStudentsTable();
  renderCourseCards();
  populateCourseSelectors();
  loadAttendanceRoster();
  loadMarksSheet();
  renderNotifications();
  renderScrumBoard();
  renderBurndownChart();
  populatePokerStories();
  loadMemberStandup('aarav');
  loadDocsIndex();
});

// Load All Data from API
async function loadAllData() {
  try {
    const [stRes, crRes, atRes, mkRes, ntRes, blRes, spRes] = await Promise.all([
      fetch('/api/students'),
      fetch('/api/courses'),
      fetch('/api/attendance'),
      fetch('/api/marks'),
      fetch('/api/notifications'),
      fetch('/api/backlog'),
      fetch('/api/sprints')
    ]);

    state.students = await stRes.json();
    state.courses = await crRes.json();
    state.attendance = await atRes.json();
    state.marks = await mkRes.json();
    state.notifications = await ntRes.json();
    state.backlog = await blRes.json();
    state.sprints = await spRes.json();

    updateKPISummaries();
    renderDashboard();
  } catch (err) {
    console.error('Failed to load initial data:', err);
    showToast('Failed to connect to backend server. Make sure node server.js is running.', 'danger');
  }
}

// ==========================================
// PERSONA & RBAC MANAGEMENT (Epic 5)
// ==========================================
function changePersona(role) {
  state.activeRole = role;
  applyRolePermissions();
  renderDashboard();
  showToast(`Switched active persona to: ${role.toUpperCase()}`, 'info');
}

function applyRolePermissions() {
  const adminElements = document.querySelectorAll('.rbac-admin-only');
  const facultyElements = document.querySelectorAll('.rbac-faculty-only');

  if (state.activeRole === 'student') {
    adminElements.forEach(el => el.style.display = 'none');
    facultyElements.forEach(el => el.style.display = 'none');
  } else if (state.activeRole === 'faculty') {
    adminElements.forEach(el => el.style.display = 'none');
    facultyElements.forEach(el => el.style.display = '');
  } else {
    // Admin
    adminElements.forEach(el => el.style.display = '');
    facultyElements.forEach(el => el.style.display = '');
  }
}

// ==========================================
// NAVIGATION TAB SWITCHING
// ==========================================
function switchMainTab(tabId) {
  state.currentTab = tabId;

  document.querySelectorAll('.main-nav-bar .nav-tab-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById(`tabBtn-${tabId}`);
  if (activeBtn) activeBtn.classList.add('active');

  document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
  const activeSec = document.getElementById(`view-${tabId}`);
  if (activeSec) activeSec.classList.add('active');

  if (tabId === 'dashboard') {
    setTimeout(renderDashboard, 50);
  }
  if (tabId === 'reports') {
    setTimeout(renderAnalyticsCharts, 100);
  }
  if (tabId === 'agile' && state.agileSubTab === 'burndown') {
    setTimeout(renderBurndownChart, 100);
  }
}

// ==========================================
// EXECUTIVE DASHBOARD RENDERING
// ==========================================
function renderDashboard() {
  // Update Hero Persona Greeting
  const heroNameEl = document.getElementById('dashHeroUserName');
  if (heroNameEl) {
    if (state.activeRole === 'admin') heroNameEl.textContent = 'Dean Anita Desai (Administrator)';
    else if (state.activeRole === 'faculty') heroNameEl.textContent = 'Dr. Rajesh Kumar (Faculty Lead)';
    else heroNameEl.textContent = 'Priya Sharma (Student Scholar)';
  }

  // Update Hero Stat Tiles
  const total = state.students.length;
  const avgAtt = total > 0 ? (state.students.reduce((acc, s) => acc + (s.attendance || 100), 0) / total).toFixed(1) : 0;
  const avgCgpa = total > 0 ? (state.students.reduce((acc, s) => acc + (s.cgpa || 8.0), 0) / total).toFixed(2) : 0;
  
  const completedSP = state.backlog.filter(s => s.status === 'completed').reduce((acc, s) => acc + (s.storyPoints || 0), 0);
  const totalSP = state.backlog.reduce((acc, s) => acc + (s.storyPoints || 0), 0) || 75;

  const hStudents = document.getElementById('dashHeroStudents');
  const hAtt = document.getElementById('dashHeroAttendance');
  const hCgpa = document.getElementById('dashHeroCgpa');
  const hSP = document.getElementById('dashHeroStoryPoints');

  if (hStudents) hStudents.textContent = total;
  if (hAtt) hAtt.textContent = `${avgAtt}%`;
  if (hCgpa) hCgpa.textContent = avgCgpa;
  if (hSP) hSP.textContent = `${completedSP} / ${totalSP}`;

  // Draw Charts
  drawDashGradeCurve();
  drawDashDeptCompare();

  // Render Honors List
  renderDashHonorsList();

  // Render At-Risk Intervention List
  renderDashAtRiskList();

  // Render Live Activity Timeline
  renderDashActivityStream();
}

function drawDashGradeCurve() {
  const canvas = document.getElementById('dashGradeDistCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const gradeCounts = { 'A+': 0, 'A': 0, 'B': 0, 'C': 0, 'D': 0, 'F': 0 };
  state.marks.forEach(m => {
    if (gradeCounts[m.grade] !== undefined) gradeCounts[m.grade]++;
  });

  const labels = Object.keys(gradeCounts);
  const values = Object.values(gradeCounts);
  const maxVal = Math.max(...values, 4);

  const paddingLeft = 45;
  const paddingRight = 20;
  const paddingTop = 25;
  const paddingBottom = 35;
  const chartW = canvas.width - paddingLeft - paddingRight;
  const chartH = canvas.height - paddingTop - paddingBottom;
  const barW = chartW / (labels.length * 1.7);

  // Background grid
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = paddingTop + (chartH / 4) * i;
    ctx.beginPath();
    ctx.moveTo(paddingLeft, y);
    ctx.lineTo(canvas.width - paddingRight, y);
    ctx.stroke();
  }

  labels.forEach((label, i) => {
    const val = values[i];
    const barHeight = (val / maxVal) * chartH;
    const x = paddingLeft + i * (chartW / labels.length) + (chartW / labels.length - barW) / 2;
    const y = canvas.height - paddingBottom - barHeight;

    // Gradient bar
    const grad = ctx.createLinearGradient(0, y, 0, canvas.height - paddingBottom);
    if (label.includes('A')) {
      grad.addColorStop(0, '#6366f1');
      grad.addColorStop(1, '#a855f7');
    } else if (label === 'B' || label === 'C') {
      grad.addColorStop(0, '#06b6d4');
      grad.addColorStop(1, '#3b82f6');
    } else {
      grad.addColorStop(0, '#f59e0b');
      grad.addColorStop(1, '#ef4444');
    }

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(x, y, barW, barHeight, [6, 6, 0, 0]);
    ctx.fill();

    // Value text
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(val, x + barW / 2, y - 6);

    // Label text
    ctx.fillStyle = '#94a3b8';
    ctx.font = '600 12px Inter, sans-serif';
    ctx.fillText(label, x + barW / 2, canvas.height - paddingBottom + 18);
  });
}

function drawDashDeptCompare() {
  const canvas = document.getElementById('dashDeptCompareCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const depts = [
    { name: 'CS', fullName: 'Computer Science' },
    { name: 'IT', fullName: 'Information Tech' },
    { name: 'EE', fullName: 'Electrical Eng' },
    { name: 'ME', fullName: 'Mechanical Eng' }
  ];

  const paddingLeft = 45;
  const paddingRight = 20;
  const paddingTop = 25;
  const paddingBottom = 35;
  const chartW = canvas.width - paddingLeft - paddingRight;
  const chartH = canvas.height - paddingTop - paddingBottom;

  const barGroupWidth = chartW / depts.length;
  const singleBarW = barGroupWidth * 0.28;

  // Background grid
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = paddingTop + (chartH / 4) * i;
    ctx.beginPath();
    ctx.moveTo(paddingLeft, y);
    ctx.lineTo(canvas.width - paddingRight, y);
    ctx.stroke();
  }

  depts.forEach((dept, i) => {
    const deptStudents = state.students.filter(s => s.department === dept.fullName || s.department.startsWith(dept.name));
    const attVal = deptStudents.length > 0 ? (deptStudents.reduce((a, s) => a + (s.attendance || 100), 0) / deptStudents.length) : 85;
    const cgpaVal = deptStudents.length > 0 ? (deptStudents.reduce((a, s) => a + (s.cgpa || 8.0), 0) / deptStudents.length) * 10 : 80;

    const groupX = paddingLeft + i * barGroupWidth + (barGroupWidth - singleBarW * 2 - 8) / 2;

    // Bar 1: Attendance %
    const attHeight = (attVal / 100) * chartH;
    const attY = canvas.height - paddingBottom - attHeight;
    ctx.fillStyle = '#6366f1';
    ctx.beginPath();
    ctx.roundRect(groupX, attY, singleBarW, attHeight, [4, 4, 0, 0]);
    ctx.fill();

    // Bar 2: CGPA (x10)
    const cgpaHeight = (cgpaVal / 100) * chartH;
    const cgpaY = canvas.height - paddingBottom - cgpaHeight;
    ctx.fillStyle = '#06b6d4';
    ctx.beginPath();
    ctx.roundRect(groupX + singleBarW + 6, cgpaY, singleBarW, cgpaHeight, [4, 4, 0, 0]);
    ctx.fill();

    // Group Label
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 12px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(dept.name, groupX + singleBarW + 3, canvas.height - paddingBottom + 18);
  });
}

function renderDashHonorsList() {
  const container = document.getElementById('dashHonorsList');
  if (!container) return;

  const topStudents = [...state.students].sort((a, b) => (b.cgpa || 0) - (a.cgpa || 0)).slice(0, 3);
  const rankBadges = ['rank-1', 'rank-2', 'rank-3'];

  container.innerHTML = topStudents.map((s, idx) => `
    <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 1rem; background: rgba(15,23,42,0.5); border: 1px solid var(--border-subtle); border-radius: var(--radius-md);">
      <div style="display: flex; align-items: center; gap: 0.85rem;">
        <span class="honor-rank-badge ${rankBadges[idx]}">${idx + 1}</span>
        <div>
          <div style="font-weight: 700; font-size: 0.92rem;">${s.name} <span style="font-size: 0.75rem; color: var(--accent); font-family: var(--font-mono);">(${s.id})</span></div>
          <div style="font-size: 0.75rem; color: var(--text-dim);">${s.department} &bull; Attendance: ${s.attendance || 100}%</div>
        </div>
      </div>
      <div style="text-align: right; display: flex; align-items: center; gap: 1rem;">
        <div>
          <div style="font-size: 1.1rem; font-weight: 800; color: #fff;">${s.cgpa ? s.cgpa.toFixed(2) : '8.00'}</div>
          <div style="font-size: 0.68rem; color: var(--text-dim); text-transform: uppercase;">CGPA / 10.0</div>
        </div>
        <button class="btn btn-secondary btn-sm" onclick="viewStudentProfile('${s.id}')" title="View Dossier"><i class="fa-solid fa-eye"></i></button>
      </div>
    </div>
  `).join('');
}

function renderDashAtRiskList() {
  const container = document.getElementById('dashAtRiskList');
  const badge = document.getElementById('dashAtRiskBadge');
  if (!container) return;

  const atRisk = state.students.filter(s => (s.attendance || 100) < 75);
  if (badge) badge.textContent = `${atRisk.length} Students < 75%`;

  if (atRisk.length === 0) {
    container.innerHTML = `
      <div style="padding: 1.5rem; text-align: center; color: var(--success); font-weight: 600;">
        <i class="fa-solid fa-circle-check" style="font-size: 1.8rem; margin-bottom: 0.5rem; display: block;"></i>
        Excellent! All students currently comply with the >= 75% attendance threshold.
      </div>
    `;
    return;
  }

  container.innerHTML = atRisk.map(s => `
    <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 1rem; background: rgba(244,63,94,0.06); border: 1px solid rgba(244,63,94,0.25); border-radius: var(--radius-md);">
      <div>
        <div style="font-weight: 700; font-size: 0.92rem; color: #fff;">${s.name} <span style="font-size: 0.75rem; color: var(--danger); font-family: var(--font-mono);">(${s.id})</span></div>
        <div style="font-size: 0.75rem; color: var(--text-muted);">${s.department} &bull; Status: <span class="status-pill probation" style="padding: 0.1rem 0.4rem; font-size: 0.68rem;">${s.attendance}% Attendance</span></div>
      </div>
      <div>
        <button class="btn btn-danger btn-sm" onclick="sendInterventionNotice('${s.id}', '${s.name}', ${s.attendance})">
          <i class="fa-solid fa-paper-plane"></i> Dispatch Notice
        </button>
      </div>
    </div>
  `).join('');
}

async function sendInterventionNotice(studentId, name, attRate) {
  try {
    const res = await fetch('/api/notifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: `Official Attendance Shortage Notice: ${name}`,
        message: `Student ${name} (${studentId}) attendance is critically low at ${attRate}%. Official notice dispatched to student and faculty advisor.`,
        type: 'warning',
        targetRole: 'all'
      })
    });

    if (res.ok) {
      const newNotif = await res.json();
      state.notifications.unshift(newNotif);
      renderNotifications();
      showToast(`Warning notice dispatched for ${name} (${attRate}%)!`, 'warning');
    }
  } catch (err) {
    showToast('Failed to dispatch notice.', 'danger');
  }
}

function renderDashActivityStream() {
  const container = document.getElementById('dashActivityStream');
  if (!container) return;

  const events = [
    { icon: 'fa-clipboard-user', type: 'info', title: 'Daily Attendance Committed', desc: 'Dr. Rajesh Kumar recorded lecture session for CS301 (Data Structures). 6 of 7 enrolled marked Present.', time: '14 minutes ago' },
    { icon: 'fa-award', type: 'success', title: 'Assessment Marks Published', desc: 'Semester midterm scores published for CS301 by examination board. Class average calculated at 86.4%.', time: '1 hour ago' },
    { icon: 'fa-bolt', type: 'warning', title: 'Agile Sprint Increment', desc: 'User Story US-401 moved to "Testing" by Aarav Mehta. 5 Story Points queued for PO acceptance.', time: '3 hours ago' },
    { icon: 'fa-user-plus', type: 'info', title: 'New Student Intake Processed', desc: 'Aditi Sen officially registered under Computer Science cohort for Academic Year 2026–2027.', time: 'Yesterday' }
  ];

  container.innerHTML = events.map(ev => `
    <div class="activity-event-item">
      <div class="activity-icon-badge notif-item-icon ${ev.type}">
        <i class="fa-solid ${ev.icon}"></i>
      </div>
      <div style="flex: 1;">
        <div style="font-weight: 700; font-size: 0.88rem; color: #fff;">${ev.title}</div>
        <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.15rem; line-height: 1.4;">${ev.desc}</p>
        <span style="font-size: 0.68rem; color: var(--text-dim); margin-top: 0.35rem; display: block;"><i class="fa-regular fa-clock"></i> ${ev.time}</span>
      </div>
    </div>
  `).join('');
}


function switchAgileSubTab(subTabId) {
  state.agileSubTab = subTabId;

  document.querySelectorAll('.agile-subnav .agile-subtab-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById(`subtabBtn-${subTabId}`);
  if (activeBtn) activeBtn.classList.add('active');

  document.querySelectorAll('.agile-subview').forEach(view => view.style.display = 'none');
  const targetView = document.getElementById(`agile-subview-${subTabId}`);
  if (targetView) targetView.style.display = 'block';

  if (subTabId === 'burndown') {
    setTimeout(renderBurndownChart, 50);
  }
}

// ==========================================
// KPI & METRICS SUMMARY
// ==========================================
function updateKPISummaries() {
  const total = state.students.length;
  const active = state.students.filter(s => s.status === 'Active').length;
  const probation = state.students.filter(s => (s.attendance || 0) < 75).length;
  const avgCgpa = total > 0 ? (state.students.reduce((acc, s) => acc + (s.cgpa || 0), 0) / total).toFixed(2) : 0;

  const statTotal = document.getElementById('statTotalStudents');
  const statActive = document.getElementById('statActiveStudents');
  const statProb = document.getElementById('statProbationStudents');
  const statCgpa = document.getElementById('statAvgCgpa');

  if (statTotal) statTotal.textContent = total;
  if (statActive) statActive.textContent = active;
  if (statProb) statProb.textContent = probation;
  if (statCgpa) statCgpa.textContent = avgCgpa;
}

// ==========================================
// EPIC 1: STUDENT MANAGEMENT
// ==========================================
function renderStudentsTable(filterList = null) {
  const tbody = document.getElementById('studentsTableBody');
  if (!tbody) return;

  const list = filterList !== null ? filterList : state.students;
  tbody.innerHTML = '';

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 2rem; color: var(--text-muted);"><i class="fa-solid fa-folder-open" style="font-size: 1.5rem; margin-bottom: 0.5rem; display: block;"></i> No student records found.</td></tr>`;
    return;
  }

  list.forEach(student => {
    const tr = document.createElement('tr');

    const attVal = student.attendance !== undefined ? student.attendance : 100;
    let attBadgeClass = 'active';
    if (attVal < 70) attBadgeClass = 'probation';
    else if (attVal < 75) attBadgeClass = 'warning';

    const statusClass = student.status === 'Active' ? 'active' : (student.status === 'Probation' ? 'probation' : 'graduated');

    tr.innerHTML = `
      <td><span style="font-family: var(--font-mono); font-weight: 700; color: var(--accent);">${student.id}</span></td>
      <td>
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <div style="width: 34px; height: 34px; border-radius: 50%; background: rgba(99,102,241,0.2); display: flex; align-items: center; justify-content: center; font-weight: 700; color: #a5b4fc; font-size: 0.8rem;">
            ${student.name.charAt(0)}
          </div>
          <div>
            <div style="font-weight: 600;">${student.name}</div>
            <div style="font-size: 0.75rem; color: var(--text-dim);">${student.email}</div>
          </div>
        </div>
      </td>
      <td>${student.department}</td>
      <td>${student.year}</td>
      <td>
        <span class="status-pill ${attBadgeClass}">
          <i class="fa-solid ${attVal < 75 ? 'fa-triangle-exclamation' : 'fa-circle-check'}"></i> ${attVal}%
        </span>
      </td>
      <td><strong style="color: #f8fafc;">${student.cgpa ? student.cgpa.toFixed(2) : '8.00'}</strong></td>
      <td><span class="status-pill ${statusClass}">${student.status}</span></td>
      <td style="text-align: right;">
        <button class="btn btn-secondary btn-sm" onclick="viewStudentProfile('${student.id}')" title="View Profile Dossier"><i class="fa-solid fa-eye"></i></button>
        <button class="btn btn-danger btn-sm rbac-admin-only" onclick="deleteStudentRecord('${student.id}')" title="Delete Student"><i class="fa-solid fa-trash"></i></button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  applyRolePermissions();
}

function handleStudentSearch() {
  const query = (document.getElementById('studentSearchInput')?.value || '').toLowerCase().trim();
  const dept = document.getElementById('studentDeptFilter')?.value || 'ALL';
  const status = document.getElementById('studentStatusFilter')?.value || 'ALL';

  const filtered = state.students.filter(s => {
    const matchesQuery = s.name.toLowerCase().includes(query) ||
                         s.id.toLowerCase().includes(query) ||
                         s.email.toLowerCase().includes(query);
    const matchesDept = dept === 'ALL' || s.department === dept;
    const matchesStatus = status === 'ALL' || s.status === status;
    return matchesQuery && matchesDept && matchesStatus;
  });

  renderStudentsTable(filtered);
}

function openAddStudentModal() {
  const form = document.getElementById('addStudentForm');
  if (form) form.reset();
  const nextId = 'STU' + (1001 + state.students.length);
  const idInput = document.getElementById('newStudentId');
  if (idInput) idInput.value = nextId;
  openModal('addStudentModal');
}

async function submitAddStudent(e) {
  e.preventDefault();
  const id = document.getElementById('newStudentId').value.trim();
  const name = document.getElementById('newStudentName').value.trim();
  const email = document.getElementById('newStudentEmail').value.trim();
  const phone = document.getElementById('newStudentPhone').value.trim();
  const department = document.getElementById('newStudentDept').value;
  const year = document.getElementById('newStudentYear').value;

  try {
    const res = await fetch('/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, name, email, phone, department, year, status: 'Active' })
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to add student');
    }

    const newStudent = await res.json();
    state.students.push(newStudent);
    renderStudentsTable();
    updateKPISummaries();
    closeModal('addStudentModal');
    showToast(`Student ${name} (${id}) registered successfully!`, 'success');
  } catch (err) {
    showToast(err.message, 'danger');
  }
}

async function deleteStudentRecord(studentId) {
  const student = state.students.find(s => s.id === studentId);
  const name = student ? student.name : studentId;

  if (!confirm(`Are you sure you want to delete student "${name}" (${studentId})? This action will remove all enrolled course entries.`)) {
    return;
  }

  try {
    const res = await fetch(`/api/students/${studentId}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete student');

    state.students = state.students.filter(s => s.id !== studentId);
    renderStudentsTable();
    updateKPISummaries();
    showToast(`Student ${name} removed successfully.`, 'info');
  } catch (err) {
    showToast(err.message, 'danger');
  }
}

function viewStudentProfile(studentId) {
  const student = state.students.find(s => s.id === studentId);
  if (!student) return;

  const container = document.getElementById('studentProfileContent');
  if (!container) return;

  const enrolledCourseObjects = state.courses.filter(c => c.enrolledStudents && c.enrolledStudents.includes(student.id));

  container.innerHTML = `
    <div style="display: flex; gap: 1.5rem; align-items: center; margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--border-subtle);">
      <div style="width: 72px; height: 72px; border-radius: 50%; background: var(--primary-gradient); display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: 800; color: #fff;">
        ${student.name.charAt(0)}
      </div>
      <div>
        <h3 style="font-size: 1.35rem; font-weight: 800;">${student.name}</h3>
        <p style="color: var(--accent); font-family: var(--font-mono); font-weight: 600; font-size: 0.85rem;">Roll No: ${student.id} | ${student.department}</p>
        <p style="color: var(--text-muted); font-size: 0.8rem; margin-top: 0.2rem;"><i class="fa-regular fa-envelope"></i> ${student.email} &bull; <i class="fa-solid fa-phone"></i> ${student.phone || 'N/A'}</p>
      </div>
    </div>

    <div class="kpi-grid" style="margin-bottom: 1.5rem;">
      <div class="kpi-card" style="padding: 1rem;">
        <div class="kpi-info">
          <h3>${student.attendance || 100}%</h3>
          <p>Overall Attendance Rate</p>
        </div>
      </div>
      <div class="kpi-card" style="padding: 1rem;">
        <div class="kpi-info">
          <h3>${student.cgpa || 8.0}</h3>
          <p>Cumulative GPA (10.0 Scale)</p>
        </div>
      </div>
      <div class="kpi-card" style="padding: 1rem;">
        <div class="kpi-info">
          <h3>${student.year}</h3>
          <p>Academic Cohort</p>
        </div>
      </div>
    </div>

    <h4 style="margin-bottom: 0.75rem;"><i class="fa-solid fa-book"></i> Enrolled Academic Courses (${enrolledCourseObjects.length})</h4>
    <div class="table-responsive">
      <table class="modern-table">
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Course Title</th>
            <th>Credits</th>
            <th>Faculty Instructor</th>
          </tr>
        </thead>
        <tbody>
          ${enrolledCourseObjects.length > 0 ? enrolledCourseObjects.map(c => `
            <tr>
              <td><span class="course-code">${c.code}</span></td>
              <td><strong>${c.name}</strong></td>
              <td>${c.credits} Credits</td>
              <td>${c.instructor}</td>
            </tr>
          `).join('') : '<tr><td colspan="4" style="text-align: center; color: var(--text-muted);">Not currently enrolled in any courses.</td></tr>'}
        </tbody>
      </table>
    </div>
  `;

  openModal('studentProfileModal');
}

function printStudentProfile() {
  window.print();
}

function exportStudentsCsv() {
  let csv = 'Student ID,Name,Email,Phone,Department,Year,Status,Attendance Rate,CGPA\n';
  state.students.forEach(s => {
    csv += `"${s.id}","${s.name}","${s.email}","${s.phone || ''}","${s.department}","${s.year}","${s.status}","${s.attendance || 100}%","${s.cgpa || 8.0}"\n`;
  });
  downloadBlob(csv, 'students_directory.csv', 'text/csv');
  showToast('Students directory exported to CSV!', 'success');
}

// ==========================================
// EPIC 2: COURSE MANAGEMENT
// ==========================================
function renderCourseCards() {
  const grid = document.getElementById('courseCardsGrid');
  if (!grid) return;

  grid.innerHTML = '';
  state.courses.forEach(course => {
    const card = document.createElement('div');
    card.className = 'course-card';

    const enrolledCount = course.enrolledStudents ? course.enrolledStudents.length : 0;

    card.innerHTML = `
      <div>
        <div class="course-header">
          <span class="course-code">${course.code}</span>
          <span class="course-credits"><i class="fa-solid fa-award"></i> ${course.credits} Credits</span>
        </div>
        <h3 class="course-title">${course.name}</h3>
        <p class="course-desc">${course.description || 'Core departmental curriculum offering.'}</p>
      </div>

      <div>
        <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.85rem;">
          <div><i class="fa-solid fa-chalkboard-user"></i> <strong>Instructor:</strong> ${course.instructor}</div>
          <div style="margin-top: 0.25rem;"><i class="fa-solid fa-users"></i> <strong>Enrolled:</strong> ${enrolledCount} Students</div>
        </div>
        <div class="course-footer">
          <button class="btn btn-secondary btn-sm" onclick="openEnrollModal('${course.id}')"><i class="fa-solid fa-user-plus"></i> Manage Enrollment</button>
          <span style="font-size: 0.72rem; color: var(--text-dim);">${course.semester || 'Semester 5'}</span>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function openAddCourseModal() {
  const form = document.getElementById('addCourseForm');
  if (form) form.reset();
  openModal('addCourseModal');
}

async function submitAddCourse(e) {
  e.preventDefault();
  const code = document.getElementById('newCourseCode').value.trim().toUpperCase();
  const credits = document.getElementById('newCourseCredits').value;
  const name = document.getElementById('newCourseTitle').value.trim();
  const department = document.getElementById('newCourseDept').value;
  const instructor = document.getElementById('newCourseInstructor').value.trim();
  const description = document.getElementById('newCourseDesc').value.trim();

  try {
    const res = await fetch('/api/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, credits, name, department, instructor, description })
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to create course');
    }

    const newCourse = await res.json();
    state.courses.push(newCourse);
    renderCourseCards();
    populateCourseSelectors();
    closeModal('addCourseModal');
    showToast(`Course ${newCourse.code} created successfully!`, 'success');
  } catch (err) {
    showToast(err.message, 'danger');
  }
}

let activeEnrollCourseId = null;

function openEnrollModal(courseId) {
  activeEnrollCourseId = courseId;
  const course = state.courses.find(c => c.id === courseId || c.code === courseId);
  if (!course) return;

  const heading = document.getElementById('enrollCourseHeading');
  if (heading) heading.textContent = `Enroll Students in ${course.code} — ${course.name}`;

  const container = document.getElementById('enrollStudentChecklist');
  if (!container) return;

  container.innerHTML = '';
  const currentlyEnrolled = course.enrolledStudents || [];

  state.students.forEach(student => {
    const isChecked = currentlyEnrolled.includes(student.id) ? 'checked' : '';
    const item = document.createElement('label');
    item.style.cssText = 'display: flex; align-items: center; gap: 0.75rem; padding: 0.65rem 1rem; background: rgba(15,23,42,0.6); border: 1px solid var(--border-subtle); border-radius: 8px; cursor: pointer;';
    item.innerHTML = `
      <input type="checkbox" class="enroll-checkbox" value="${student.id}" ${isChecked}>
      <div>
        <div style="font-weight: 600; font-size: 0.88rem;">${student.name} <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent);">(${student.id})</span></div>
        <div style="font-size: 0.72rem; color: var(--text-dim);">${student.department} &bull; ${student.year}</div>
      </div>
    `;
    container.appendChild(item);
  });

  openModal('enrollModal');
}

async function saveEnrollmentChanges() {
  if (!activeEnrollCourseId) return;

  const checkboxes = document.querySelectorAll('.enroll-checkbox:checked');
  const selectedStudentIds = Array.from(checkboxes).map(cb => cb.value);

  try {
    const res = await fetch(`/api/courses/${activeEnrollCourseId}/enroll`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentIds: selectedStudentIds })
    });

    if (!res.ok) throw new Error('Failed to update enrollments');

    const course = state.courses.find(c => c.id === activeEnrollCourseId || c.code === activeEnrollCourseId);
    if (course) {
      course.enrolledStudents = selectedStudentIds;
    }

    renderCourseCards();
    loadAttendanceRoster();
    closeModal('enrollModal');
    showToast(`Updated enrollments for ${course.code} (${selectedStudentIds.length} students enrolled)!`, 'success');
  } catch (err) {
    showToast(err.message, 'danger');
  }
}

// Populate Dropdown Selectors
function populateCourseSelectors() {
  const attSelect = document.getElementById('attCourseSelect');
  const marksSelect = document.getElementById('marksCourseSelect');

  if (attSelect) {
    attSelect.innerHTML = state.courses.map(c => `
      <option value="${c.code}">${c.code} — ${c.name} (${c.instructor})</option>
    `).join('');
  }

  if (marksSelect) {
    marksSelect.innerHTML = state.courses.map(c => `
      <option value="${c.code}">${c.code} — ${c.name}</option>
    `).join('');
  }
}

// ==========================================
// EPIC 3: ATTENDANCE MANAGEMENT
// ==========================================
function loadAttendanceRoster() {
  const courseCode = document.getElementById('attCourseSelect')?.value;
  const course = state.courses.find(c => c.code === courseCode || c.id === courseCode);
  const tbody = document.getElementById('attRosterTableBody');
  const badge = document.getElementById('attEnrolledCountBadge');
  const title = document.getElementById('attRosterCourseTitle');

  if (!tbody) return;
  tbody.innerHTML = '';

  if (!course) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 1.5rem;">Select a course to view roster.</td></tr>`;
    return;
  }

  if (title) title.innerHTML = `<i class="fa-solid fa-list-check"></i> ${course.code} — ${course.name}`;
  const enrolledIds = course.enrolledStudents || [];
  if (badge) badge.textContent = `Enrolled: ${enrolledIds.length} Students`;

  const enrolledStudents = state.students.filter(s => enrolledIds.includes(s.id));

  if (enrolledStudents.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 1.5rem;">No students enrolled yet. Click "Courses" tab to enroll students.</td></tr>`;
    return;
  }

  enrolledStudents.forEach(student => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><span style="font-family: var(--font-mono); font-weight: 700; color: var(--accent);">${student.id}</span></td>
      <td><strong>${student.name}</strong></td>
      <td>${student.department}</td>
      <td><span class="status-pill ${student.attendance < 75 ? 'warning' : 'active'}">${student.attendance || 100}%</span></td>
      <td>
        <div class="att-toggle-group" data-student-id="${student.id}">
          <button type="button" class="att-btn present active" onclick="setStudentAttStatus('${student.id}', 'Present')">P</button>
          <button type="button" class="att-btn absent" onclick="setStudentAttStatus('${student.id}', 'Absent')">A</button>
          <button type="button" class="att-btn late" onclick="setStudentAttStatus('${student.id}', 'Late')">L</button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });

  loadPastAttendanceSessions(course.code);
}

function setStudentAttStatus(studentId, status) {
  const group = document.querySelector(`.att-toggle-group[data-student-id="${studentId}"]`);
  if (!group) return;

  group.querySelectorAll('.att-btn').forEach(btn => btn.classList.remove('active'));
  if (status === 'Present') group.querySelector('.present').classList.add('active');
  if (status === 'Absent') group.querySelector('.absent').classList.add('active');
  if (status === 'Late') group.querySelector('.late').classList.add('active');
}

function markAllAttendancePresent() {
  document.querySelectorAll('.att-toggle-group').forEach(group => {
    group.querySelectorAll('.att-btn').forEach(b => b.classList.remove('active'));
    group.querySelector('.present').classList.add('active');
  });
  showToast('All students marked Present!', 'success');
}

async function saveAttendanceSession() {
  const courseCode = document.getElementById('attCourseSelect')?.value;
  const date = document.getElementById('attDateInput')?.value;
  const topic = document.getElementById('attTopicInput')?.value.trim() || 'Class Lecture Session';
  const faculty = 'Dr. Rajesh Kumar';

  const groups = document.querySelectorAll('.att-toggle-group');
  if (groups.length === 0) {
    showToast('No students in roster to mark attendance.', 'warning');
    return;
  }

  const records = [];
  groups.forEach(group => {
    const studentId = group.getAttribute('data-student-id');
    let status = 'Present';
    if (group.querySelector('.absent.active')) status = 'Absent';
    if (group.querySelector('.late.active')) status = 'Late';
    records.push({ studentId, status });
  });

  try {
    const res = await fetch('/api/attendance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseId: courseCode, date, topic, markedBy: faculty, records })
    });

    if (!res.ok) throw new Error('Failed to save attendance log');

    const newLog = await res.json();
    state.attendance.push(newLog);

    // Refresh students data
    const stRes = await fetch('/api/students');
    state.students = await stRes.json();
    renderStudentsTable();
    updateKPISummaries();
    loadPastAttendanceSessions(courseCode);

    showToast(`Attendance saved successfully for ${courseCode} (${records.length} records)!`, 'success');
  } catch (err) {
    showToast(err.message, 'danger');
  }
}

function loadPastAttendanceSessions(courseCode) {
  const tbody = document.getElementById('attPastSessionsBody');
  if (!tbody) return;

  const sessions = state.attendance.filter(a => a.courseId === courseCode);
  tbody.innerHTML = '';

  if (sessions.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted); padding: 1.5rem;">No historical lecture records found for ${courseCode}.</td></tr>`;
    return;
  }

  sessions.forEach(sess => {
    const presentCount = sess.records.filter(r => r.status === 'Present' || r.status === 'Late').length;
    const absentCount = sess.records.filter(r => r.status === 'Absent').length;
    const total = sess.records.length;
    const rate = total > 0 ? ((presentCount / total) * 100).toFixed(1) : 0;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent);">${sess.id}</span></td>
      <td><strong>${sess.date}</strong></td>
      <td>${sess.topic}</td>
      <td>${sess.markedBy}</td>
      <td><span class="status-pill active">${presentCount} Present</span></td>
      <td><span class="status-pill probation">${absentCount} Absent</span></td>
      <td><strong>${rate}%</strong></td>
    `;
    tbody.appendChild(tr);
  });
}

function exportAttendanceSummary() {
  const courseCode = document.getElementById('attCourseSelect')?.value;
  const sessions = state.attendance.filter(a => a.courseId === courseCode);

  let csv = `Session ID,Course ID,Date,Topic,Marked By,Present Count,Absent Count\n`;
  sessions.forEach(s => {
    const p = s.records.filter(r => r.status === 'Present' || r.status === 'Late').length;
    const a = s.records.filter(r => r.status === 'Absent').length;
    csv += `"${s.id}","${s.courseId}","${s.date}","${s.topic}","${s.markedBy}","${p}","${a}"\n`;
  });
  downloadBlob(csv, `attendance_${courseCode}.csv`, 'text/csv');
  showToast(`Attendance report for ${courseCode} exported to CSV!`, 'success');
}

// ==========================================
// EPIC 4: MARKS & PERFORMANCE
// ==========================================
function loadMarksSheet() {
  const courseCode = document.getElementById('marksCourseSelect')?.value;
  const course = state.courses.find(c => c.code === courseCode || c.id === courseCode);
  const tbody = document.getElementById('marksTableBody');

  if (!tbody) return;
  tbody.innerHTML = '';

  if (!course) return;

  const enrolledIds = course.enrolledStudents || [];
  const enrolledStudents = state.students.filter(s => enrolledIds.includes(s.id));

  if (enrolledStudents.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align: center; color: var(--text-muted); padding: 1.5rem;">No students enrolled in this course.</td></tr>`;
    return;
  }

  enrolledStudents.forEach(student => {
    const markEntry = state.marks.find(m => m.studentId === student.id && m.courseId === course.code) || {
      internal: 15,
      midterm: 22,
      endSem: 38,
      total: 75,
      grade: 'B',
      gpa: 8.0
    };

    const tr = document.createElement('tr');
    tr.id = `mark-row-${student.id}`;
    tr.innerHTML = `
      <td><span style="font-family: var(--font-mono); font-weight: 700; color: var(--accent);">${student.id}</span></td>
      <td><strong>${student.name}</strong></td>
      <td>
        <input type="number" class="form-input form-input-int" style="width: 80px;" min="0" max="20" value="${markEntry.internal}" oninput="recalcRowMarks('${student.id}')">
      </td>
      <td>
        <input type="number" class="form-input form-input-mid" style="width: 80px;" min="0" max="30" value="${markEntry.midterm}" oninput="recalcRowMarks('${student.id}')">
      </td>
      <td>
        <input type="number" class="form-input form-input-end" style="width: 80px;" min="0" max="50" value="${markEntry.endSem}" oninput="recalcRowMarks('${student.id}')">
      </td>
      <td><span class="row-total" style="font-weight: 800; font-size: 1rem;">${markEntry.total}</span> / 100</td>
      <td><span class="status-pill active row-grade" style="font-weight: 800;">${markEntry.grade}</span></td>
      <td><strong class="row-gpa">${markEntry.gpa.toFixed(1)}</strong></td>
      <td style="text-align: right;">
        <button class="btn btn-primary btn-sm rbac-faculty-only" onclick="saveStudentMark('${student.id}')"><i class="fa-solid fa-floppy-disk"></i> Save</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  applyRolePermissions();
}

function recalcRowMarks(studentId) {
  const row = document.getElementById(`mark-row-${studentId}`);
  if (!row) return;

  const intVal = Math.min(20, Math.max(0, Number(row.querySelector('.form-input-int').value) || 0));
  const midVal = Math.min(30, Math.max(0, Number(row.querySelector('.form-input-mid').value) || 0));
  const endVal = Math.min(50, Math.max(0, Number(row.querySelector('.form-input-end').value) || 0));

  const total = intVal + midVal + endVal;
  let grade = 'F';
  let gpa = 0.0;

  if (total >= 90) { grade = 'A+'; gpa = 10.0; }
  else if (total >= 80) { grade = 'A'; gpa = 9.0; }
  else if (total >= 70) { grade = 'B'; gpa = 8.0; }
  else if (total >= 60) { grade = 'C'; gpa = 7.0; }
  else if (total >= 50) { grade = 'D'; gpa = 6.0; }

  row.querySelector('.row-total').textContent = total;
  row.querySelector('.row-grade').textContent = grade;
  row.querySelector('.row-gpa').textContent = gpa.toFixed(1);
}

async function saveStudentMark(studentId) {
  const row = document.getElementById(`mark-row-${studentId}`);
  const courseCode = document.getElementById('marksCourseSelect')?.value;
  if (!row || !courseCode) return;

  const internal = Number(row.querySelector('.form-input-int').value);
  const midterm = Number(row.querySelector('.form-input-mid').value);
  const endSem = Number(row.querySelector('.form-input-end').value);

  try {
    const res = await fetch('/api/marks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId, courseId: courseCode, internal, midterm, endSem })
    });

    if (!res.ok) throw new Error('Failed to save assessment marks');

    const markEntry = await res.json();
    const existingIdx = state.marks.findIndex(m => m.studentId === studentId && m.courseId === courseCode);
    if (existingIdx >= 0) state.marks[existingIdx] = markEntry;
    else state.marks.push(markEntry);

    // Refresh students table to update CGPA
    const stRes = await fetch('/api/students');
    state.students = await stRes.json();
    renderStudentsTable();
    updateKPISummaries();

    showToast(`Marks updated for student ${studentId} in ${courseCode}!`, 'success');
  } catch (err) {
    showToast(err.message, 'danger');
  }
}

function openResultSheetModal() {
  const container = document.getElementById('resultSheetContent');
  if (!container) return;

  const student = state.students[0] || { name: 'Priya Sharma', id: 'STU1001', department: 'Computer Science' };
  const studentMarks = state.marks.filter(m => m.studentId === student.id);

  let marksRows = '';
  studentMarks.forEach(m => {
    const course = state.courses.find(c => c.code === m.courseId) || { name: m.courseId, credits: 3 };
    marksRows += `
      <tr>
        <td><span class="course-code">${m.courseId}</span></td>
        <td><strong>${course.name}</strong></td>
        <td>${course.credits}</td>
        <td>${m.internal} / 20</td>
        <td>${m.midterm} / 30</td>
        <td>${m.endSem} / 50</td>
        <td><strong>${m.total}</strong></td>
        <td><span class="status-pill active">${m.grade}</span></td>
        <td><strong>${m.gpa.toFixed(1)}</strong></td>
      </tr>
    `;
  });

  container.innerHTML = `
    <div style="text-align: center; border-bottom: 2px solid var(--border-subtle); padding-bottom: 1.25rem; margin-bottom: 1.5rem;">
      <h2 style="font-size: 1.5rem; font-weight: 800; letter-spacing: -0.02em;">INSTITUTE OF HIGHER ACADEMIC STUDIES</h2>
      <h4 style="color: var(--accent); font-weight: 600; text-transform: uppercase; font-size: 0.85rem; margin-top: 0.25rem;">Official Semester Examination Grade Transcript</h4>
      <p style="color: var(--text-dim); font-size: 0.75rem;">Academic Year 2026–2027 &bull; Semester 5 Examination</p>
    </div>

    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-bottom: 1.5rem; font-size: 0.88rem;">
      <div><strong>Student Name:</strong> ${student.name}</div>
      <div><strong>Roll Number / ID:</strong> ${student.id}</div>
      <div><strong>Department:</strong> ${student.department}</div>
      <div><strong>Overall CGPA:</strong> ${student.cgpa || 8.85} / 10.0</div>
    </div>

    <div class="table-responsive" style="margin-bottom: 1.5rem;">
      <table class="modern-table">
        <thead>
          <tr>
            <th>Course</th>
            <th>Title</th>
            <th>Credits</th>
            <th>Internal</th>
            <th>Midterm</th>
            <th>End-Sem</th>
            <th>Total</th>
            <th>Grade</th>
            <th>GP</th>
          </tr>
        </thead>
        <tbody>
          ${marksRows || '<tr><td colspan="9" style="text-align: center; color: var(--text-muted);">No marks compiled yet.</td></tr>'}
        </tbody>
      </table>
    </div>

    <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--border-subtle);">
      <div style="font-size: 0.75rem; color: var(--text-muted);">
        Verified Digital Credential &bull; System Generated Result Sheet &bull; ${new Date().toLocaleDateString()}
      </div>
      <div style="text-align: center; font-size: 0.8rem; font-weight: 600;">
        <div style="border-bottom: 1px dashed var(--text-dim); width: 180px; margin-bottom: 0.4rem;"></div>
        Dean of Academic Affairs
      </div>
    </div>
  `;

  openModal('resultSheetModal');
}

// ==========================================
// EPIC 7: REPORTS & ANALYTICS
// ==========================================
function renderAnalyticsCharts() {
  renderGradeDistChart();
  renderAttendanceDonut();
  renderDeptSummaryTable();
}

function renderGradeDistChart() {
  const canvas = document.getElementById('gradeDistCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const gradeCounts = { 'A+': 0, 'A': 0, 'B': 0, 'C': 0, 'D': 0, 'F': 0 };
  state.marks.forEach(m => {
    if (gradeCounts[m.grade] !== undefined) gradeCounts[m.grade]++;
  });

  const labels = Object.keys(gradeCounts);
  const values = Object.values(gradeCounts);
  const maxVal = Math.max(...values, 4);

  const padding = 40;
  const chartWidth = canvas.width - padding * 2;
  const chartHeight = canvas.height - padding * 2;
  const barWidth = chartWidth / (labels.length * 1.8);

  labels.forEach((label, i) => {
    const val = values[i];
    const barHeight = (val / maxVal) * chartHeight;
    const x = padding + i * (chartWidth / labels.length) + (chartWidth / labels.length - barWidth) / 2;
    const y = canvas.height - padding - barHeight;

    // Gradient Bar
    const grad = ctx.createLinearGradient(0, y, 0, canvas.height - padding);
    grad.addColorStop(0, '#6366f1');
    grad.addColorStop(1, '#a855f7');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(x, y, barWidth, barHeight, [6, 6, 0, 0]);
    ctx.fill();

    // Value on top
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 12px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(val, x + barWidth / 2, y - 6);

    // Label below
    ctx.fillStyle = '#94a3b8';
    ctx.font = '600 12px Inter, sans-serif';
    ctx.fillText(label, x + barWidth / 2, canvas.height - padding + 18);
  });
}

function renderAttendanceDonut() {
  const canvas = document.getElementById('attendanceDonutCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const goodStanding = state.students.filter(s => (s.attendance || 100) >= 75).length;
  const warning = state.students.filter(s => (s.attendance || 100) < 75).length;
  const total = goodStanding + warning || 1;

  const centerX = canvas.width / 2 - 60;
  const centerY = canvas.height / 2;
  const radius = 80;
  const innerRadius = 50;

  const angles = [
    (goodStanding / total) * 2 * Math.PI,
    (warning / total) * 2 * Math.PI
  ];

  let startAngle = -Math.PI / 2;

  // Good Standing slice
  ctx.fillStyle = '#10b981';
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, startAngle, startAngle + angles[0]);
  ctx.arc(centerX, centerY, innerRadius, startAngle + angles[0], startAngle, true);
  ctx.closePath();
  ctx.fill();
  startAngle += angles[0];

  // Warning slice
  ctx.fillStyle = '#f43f5e';
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, startAngle, startAngle + angles[1]);
  ctx.arc(centerX, centerY, innerRadius, startAngle + angles[1], startAngle, true);
  ctx.closePath();
  ctx.fill();

  // Center text
  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 16px Outfit, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`${Math.round((goodStanding / total) * 100)}%`, centerX, centerY + 5);

  // Legend
  const legendX = canvas.width / 2 + 50;
  ctx.textAlign = 'left';

  ctx.fillStyle = '#10b981';
  ctx.fillRect(legendX, centerY - 25, 12, 12);
  ctx.fillStyle = '#f8fafc';
  ctx.font = '600 12px Inter, sans-serif';
  ctx.fillText(`Eligible (>= 75%): ${goodStanding}`, legendX + 20, centerY - 15);

  ctx.fillStyle = '#f43f5e';
  ctx.fillRect(legendX, centerY + 10, 12, 12);
  ctx.fillStyle = '#f8fafc';
  ctx.fillText(`Debarred Risk (< 75%): ${warning}`, legendX + 20, centerY + 20);
}

function renderDeptSummaryTable() {
  const tbody = document.getElementById('deptSummaryTableBody');
  if (!tbody) return;

  const depts = ['Computer Science', 'Information Technology', 'Electrical Engineering', 'Mechanical Engineering'];
  tbody.innerHTML = '';

  depts.forEach(dept => {
    const studentsInDept = state.students.filter(s => s.department === dept);
    const count = studentsInDept.length;
    const coursesCount = state.courses.filter(c => c.department === dept).length;
    const avgAtt = count > 0 ? (studentsInDept.reduce((acc, s) => acc + (s.attendance || 100), 0) / count).toFixed(1) : 0;
    const avgCgpa = count > 0 ? (studentsInDept.reduce((acc, s) => acc + (s.cgpa || 8.0), 0) / count).toFixed(2) : 0;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${dept}</strong></td>
      <td>${count} Students</td>
      <td>${coursesCount} Offerings</td>
      <td><span class="status-pill ${avgAtt < 75 ? 'warning' : 'active'}">${avgAtt}%</span></td>
      <td><strong>${avgCgpa}</strong></td>
      <td><span class="status-pill ${avgAtt >= 75 ? 'active' : 'probation'}">${avgAtt >= 75 ? 'Compliant' : 'Audit Review'}</span></td>
    `;
    tbody.appendChild(tr);
  });
}

// ==========================================
// AGILE SCRUM SUITE: INTERACTIVE BOARD (Unit 2, Act 10)
// ==========================================
function renderScrumBoard() {
  const sprintFilter = document.getElementById('scrumSprintFilter')?.value || 'Sprint 4';
  const columns = ['backlog', 'todo', 'in-progress', 'testing', 'completed'];

  const filteredStories = state.backlog.filter(s => {
    return sprintFilter === 'ALL' || s.sprint === sprintFilter;
  });

  columns.forEach(col => {
    const container = document.getElementById(`cards-${col}`);
    const countBadge = document.getElementById(`count-${col}`);
    if (!container) return;

    container.innerHTML = '';
    const cardsInCol = filteredStories.filter(s => s.status === col);
    if (countBadge) countBadge.textContent = cardsInCol.length;

    cardsInCol.forEach(story => {
      const card = document.createElement('div');
      card.className = 'story-card';
      card.draggable = true;
      card.ondragstart = (e) => handleDragStart(e, story.id);

      const priorityClass = `priority-${story.priority.toLowerCase()}`;

      card.innerHTML = `
        <div class="story-card-top">
          <span class="story-id">${story.id}</span>
          <span class="story-pts">${story.storyPoints} SP</span>
        </div>
        <div class="story-card-title">${story.title}</div>
        <div class="story-card-footer">
          <span class="story-priority-tag ${priorityClass}">${story.priority}</span>
          <span><i class="fa-regular fa-user"></i> ${story.assignee || 'Unassigned'}</span>
        </div>
        <div class="card-move-actions">
          ${col !== 'backlog' ? `<button class="btn-card-move" onclick="moveStoryStep('${story.id}', -1)" title="Move Left">&larr;</button>` : ''}
          ${col !== 'completed' ? `<button class="btn-card-move" onclick="moveStoryStep('${story.id}', 1)" title="Move Right">&rarr;</button>` : ''}
        </div>
      `;
      container.appendChild(card);
    });
  });
}

async function moveStoryStep(storyId, direction) {
  const columns = ['backlog', 'todo', 'in-progress', 'testing', 'completed'];
  const story = state.backlog.find(s => s.id === storyId);
  if (!story) return;

  const currentIndex = columns.indexOf(story.status);
  const newIndex = currentIndex + direction;

  if (newIndex >= 0 && newIndex < columns.length) {
    const newStatus = columns[newIndex];
    try {
      const res = await fetch(`/api/backlog/${storyId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        story.status = newStatus;
        renderScrumBoard();
        showToast(`Moved ${story.id} to ${newStatus.toUpperCase()}`, 'info');
      }
    } catch (err) {
      console.error(err);
    }
  }
}

// Drag & Drop
let draggedStoryId = null;
function handleDragStart(e, storyId) {
  draggedStoryId = storyId;
  e.dataTransfer.setData('text/plain', storyId);
}
function allowDrop(e) {
  e.preventDefault();
}
async function handleDrop(e, targetStatus) {
  e.preventDefault();
  const storyId = draggedStoryId || e.dataTransfer.getData('text/plain');
  if (!storyId) return;

  const story = state.backlog.find(s => s.id === storyId);
  if (story && story.status !== targetStatus) {
    try {
      const res = await fetch(`/api/backlog/${storyId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: targetStatus })
      });
      if (res.ok) {
        story.status = targetStatus;
        renderScrumBoard();
        showToast(`Moved ${story.id} to ${targetStatus.toUpperCase()}`, 'info');
      }
    } catch (err) {
      console.error(err);
    }
  }
}

function openAddStoryModal() {
  const form = document.getElementById('addStoryForm');
  if (form) form.reset();
  openModal('addStoryModal');
}

async function submitAddStory(e) {
  e.preventDefault();
  const title = document.getElementById('newStoryTitle').value.trim();
  const epic = document.getElementById('newStoryEpic').value;
  const role = document.getElementById('newStoryRole').value.trim();
  const want = document.getElementById('newStoryWant').value.trim();
  const soThat = document.getElementById('newStorySoThat').value.trim();
  const storyPoints = Number(document.getElementById('newStoryPoints').value);
  const priority = document.getElementById('newStoryPriority').value;
  const sprint = document.getElementById('newStorySprint').value;
  const assignee = document.getElementById('newStoryAssignee').value;

  try {
    const res = await fetch('/api/backlog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, epic, role, want, soThat, storyPoints, priority, sprint, assignee })
    });

    if (!res.ok) throw new Error('Failed to create user story');

    const newStory = await res.json();
    state.backlog.push(newStory);
    renderScrumBoard();
    populatePokerStories();
    closeModal('addStoryModal');
    showToast(`Added ${newStory.id} to Product Backlog!`, 'success');
  } catch (err) {
    showToast(err.message, 'danger');
  }
}

// ==========================================
// AGILE SCRUM SUITE: BURNDOWN CHARTS (Unit 2, Act 8-9)
// ==========================================
function renderBurndownChart() {
  const sprintId = document.getElementById('burndownSprintSelect')?.value || 'SP-3';
  const sprint = state.sprints.find(s => s.id === sprintId);
  const canvas = document.getElementById('burndownCanvas');
  const title = document.getElementById('burndownTitle');
  const tbody = document.getElementById('burndownTableBody');

  if (!sprint || !canvas) return;

  if (title) title.innerHTML = `<i class="fa-solid fa-chart-line text-primary"></i> ${sprint.name} Burndown Chart (${sprint.goal})`;

  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const days = sprint.burndownDays || [];
  if (days.length === 0) return;

  const paddingLeft = 50;
  const paddingRight = 40;
  const paddingTop = 30;
  const paddingBottom = 40;

  const chartW = canvas.width - paddingLeft - paddingRight;
  const chartH = canvas.height - paddingTop - paddingBottom;

  const maxPoints = Math.max(...days.map(d => Math.max(d.ideal, d.actual))) * 1.15;

  // Draw Grid Lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
  ctx.lineWidth = 1;
  const gridSteps = 5;
  for (let i = 0; i <= gridSteps; i++) {
    const y = paddingTop + (chartH / gridSteps) * i;
    ctx.beginPath();
    ctx.moveTo(paddingLeft, y);
    ctx.lineTo(canvas.width - paddingRight, y);
    ctx.stroke();

    const val = Math.round(maxPoints * (1 - i / gridSteps));
    ctx.fillStyle = '#64748b';
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(`${val} SP`, paddingLeft - 8, y + 4);
  }

  // Draw Ideal Line (Dashed)
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 6]);
  ctx.beginPath();
  days.forEach((d, i) => {
    const x = paddingLeft + (chartW / (days.length - 1)) * i;
    const y = paddingTop + chartH - (d.ideal / maxPoints) * chartH;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
  ctx.setLineDash([]); // reset

  // Draw Actual Gradient Area & Line
  ctx.strokeStyle = '#6366f1';
  ctx.lineWidth = 3;
  ctx.beginPath();
  days.forEach((d, i) => {
    const x = paddingLeft + (chartW / (days.length - 1)) * i;
    const y = paddingTop + chartH - (d.actual / maxPoints) * chartH;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  // Points & Labels
  days.forEach((d, i) => {
    const x = paddingLeft + (chartW / (days.length - 1)) * i;
    const y = paddingTop + chartH - (d.actual / maxPoints) * chartH;

    // Outer circle
    ctx.fillStyle = '#6366f1';
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fill();

    // Inner circle
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(x, y, 2.5, 0, 2 * Math.PI);
    ctx.fill();

    // X Axis Label
    ctx.fillStyle = '#94a3b8';
    ctx.font = '600 11px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(d.day, x, canvas.height - paddingBottom + 20);
  });

  // Populate Table
  if (tbody) {
    tbody.innerHTML = '';
    days.forEach(d => {
      const diff = (d.actual - d.ideal).toFixed(1);
      const isAhead = Number(diff) <= 0;
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${d.day}</strong></td>
        <td>${d.ideal} SP</td>
        <td><strong>${d.actual} SP</strong></td>
        <td><span style="color: ${isAhead ? 'var(--success)' : 'var(--danger)'}; font-weight: 700;">${isAhead ? '' : '+'}${diff} SP</span></td>
        <td><span class="status-pill ${isAhead ? 'active' : 'probation'}">${isAhead ? 'On / Ahead of Track' : 'Behind Schedule'}</span></td>
      `;
      tbody.appendChild(tr);
    });
  }
}

// ==========================================
// AGILE SCRUM SUITE: PLANNING POKER (Unit 2, Act 8)
// ==========================================
function populatePokerStories() {
  const select = document.getElementById('pokerStorySelect');
  if (!select) return;

  select.innerHTML = state.backlog.map(s => `
    <option value="${s.id}">${s.id}: ${s.title} (${s.epic} - ${s.storyPoints} SP)</option>
  `).join('');

  if (state.backlog.length > 0) {
    selectPokerStory(state.backlog[0].id);
  }
}

function selectPokerStory(storyId) {
  const story = state.backlog.find(s => s.id === storyId);
  const box = document.getElementById('pokerStoryDetailBox');
  const consensusBox = document.getElementById('pokerConsensusBox');
  if (consensusBox) consensusBox.style.display = 'none';

  if (!story || !box) return;

  box.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
      <div>
        <span class="status-pill active" style="margin-bottom: 0.4rem; font-size: 0.75rem;">Epic: ${story.epic}</span>
        <h4 style="font-size: 1.15rem; font-weight: 700; margin-top: 0.2rem;">${story.title}</h4>
      </div>
      <span style="font-family: var(--font-mono); font-weight: 800; color: var(--accent);">${story.id}</span>
    </div>
    <div style="background: rgba(0,0,0,0.25); padding: 0.85rem; border-radius: 8px; font-size: 0.88rem; line-height: 1.5; color: var(--text-main);">
      <strong>As a</strong> <em>${story.role}</em>, <strong>I want to</strong> <em>${story.want}</em> <strong>so that</strong> <em>${story.soThat}</em>.
    </div>
  `;
}

function castPokerVote(points) {
  const consensusBox = document.getElementById('pokerConsensusBox');
  const storyId = document.getElementById('pokerStorySelect')?.value;
  const story = state.backlog.find(s => s.id === storyId);
  if (!consensusBox || !story) return;

  consensusBox.style.display = 'block';

  // Simulate teammates' votes based on complexity
  const base = points;
  const aaravVote = base;
  const sanyaVote = Math.max(1, base + (Math.random() > 0.6 ? 1 : 0));
  const rohanVote = base;
  const kavitaVote = base;

  consensusBox.innerHTML = `
    <h4 style="color: #a5b4fc; font-weight: 700; margin-bottom: 1rem;"><i class="fa-solid fa-users-viewfinder"></i> Planning Poker Team Consensus Achieved!</h4>
    <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
      <div style="background: rgba(15,23,42,0.8); padding: 0.75rem 1rem; border-radius: 8px; border: 1px solid var(--border-subtle);">
        <div style="font-size: 0.75rem; color: var(--text-muted);">Your Estimate</div>
        <div style="font-size: 1.5rem; font-weight: 800; color: #fff;">${points} SP</div>
      </div>
      <div style="background: rgba(15,23,42,0.8); padding: 0.75rem 1rem; border-radius: 8px; border: 1px solid var(--border-subtle);">
        <div style="font-size: 0.75rem; color: var(--text-muted);">Aarav Mehta</div>
        <div style="font-size: 1.5rem; font-weight: 800; color: #fff;">${aaravVote} SP</div>
      </div>
      <div style="background: rgba(15,23,42,0.8); padding: 0.75rem 1rem; border-radius: 8px; border: 1px solid var(--border-subtle);">
        <div style="font-size: 0.75rem; color: var(--text-muted);">Sanya Verma</div>
        <div style="font-size: 1.5rem; font-weight: 800; color: #fff;">${sanyaVote} SP</div>
      </div>
      <div style="background: rgba(15,23,42,0.8); padding: 0.75rem 1rem; border-radius: 8px; border: 1px solid var(--border-subtle);">
        <div style="font-size: 0.75rem; color: var(--text-muted);">Rohan Gupta</div>
        <div style="font-size: 1.5rem; font-weight: 800; color: #fff;">${rohanVote} SP</div>
      </div>
    </div>
    <p style="font-size: 0.85rem; color: var(--text-muted);">
      <strong>Consensus Verdict:</strong> Story <strong>${story.id}</strong> consensus committed at <strong>${points} Story Points</strong>.
    </p>
  `;

  showToast(`Consensus reached for ${story.id}: ${points} Story Points!`, 'success');
}

// ==========================================
// AGILE SCRUM SUITE: CEREMONIES SIMULATOR (Unit 2, Act 11)
// ==========================================
const standupData = {
  aarav: {
    name: 'Aarav Mehta (Lead Architect)',
    yesterday: 'Designed the Express REST endpoints for student attendance and marks calculation.',
    today: 'Collaborate with Sanya to bind the 1-click attendance toggle buttons with the attendance persistence API.',
    blockers: 'None currently. Test seed data was populated smoothly.'
  },
  sanya: {
    name: 'Sanya Verma (Frontend / UI)',
    yesterday: 'Finished the responsive course catalog cards and enrollment checklist modal.',
    today: 'Wire up the interactive Scrum Board drag-and-drop column transitions.',
    blockers: 'Clarified with Product Owner regarding Late attendance counting towards compliance threshold.'
  },
  rohan: {
    name: 'Rohan Gupta (Backend & Security)',
    yesterday: 'Implemented role-based access control guards restricting Student persona mutations.',
    today: 'Build automated CGPA calculation logic on marks submission.',
    blockers: 'None. Test fixtures are passing.'
  },
  kavita: {
    name: 'Kavita Patel (QA Automation)',
    yesterday: 'Authored test cases verifying duplicate roll-number rejection in student registration.',
    today: 'Run boundary value analysis on internal (20), midterm (30), and end-sem (50) inputs.',
    blockers: 'Awaiting updated marks schema from Rohan.'
  }
};

function loadMemberStandup(memberKey) {
  const data = standupData[memberKey];
  const container = document.getElementById('standupResponsesBox');
  if (!data || !container) return;

  container.innerHTML = `
    <h4 style="color: #a5b4fc; margin-bottom: 0.75rem;"><i class="fa-solid fa-user-tag"></i> ${data.name}</h4>
    <div style="margin-bottom: 0.75rem;">
      <div style="font-size: 0.75rem; font-weight: 700; color: var(--accent); text-transform: uppercase;">1. What did I complete yesterday?</div>
      <p style="color: var(--text-muted); margin-top: 0.2rem;">${data.yesterday}</p>
    </div>
    <div style="margin-bottom: 0.75rem;">
      <div style="font-size: 0.75rem; font-weight: 700; color: var(--success); text-transform: uppercase;">2. What will I do today?</div>
      <p style="color: var(--text-muted); margin-top: 0.2rem;">${data.today}</p>
    </div>
    <div>
      <div style="font-size: 0.75rem; font-weight: 700; color: var(--warning); text-transform: uppercase;">3. What challenges / blockers am I facing?</div>
      <p style="color: var(--text-muted); margin-top: 0.2rem;">${data.blockers}</p>
    </div>
  `;
}

// ==========================================
// AGILE DELIVERABLES VIEWER
// ==========================================
async function loadDocsIndex() {
  const container = document.getElementById('docsIndexList');
  if (!container) return;

  try {
    const res = await fetch('/api/docs');
    const docs = await res.json();

    container.innerHTML = docs.map(doc => `
      <div class="doc-nav-item ${doc.filename === state.activeDoc ? 'active' : ''}" onclick="selectDoc('${doc.filename}')">
        <i class="fa-regular fa-file-lines"></i>
        <span>${doc.title}</span>
      </div>
    `).join('');

    if (docs.length > 0) {
      loadDocContent(state.activeDoc || docs[0].filename);
    }
  } catch (err) {
    console.error('Failed to load docs index:', err);
  }
}

async function selectDoc(filename) {
  state.activeDoc = filename;
  document.querySelectorAll('.doc-nav-item').forEach(el => el.classList.remove('active'));
  // Re-highlight active
  const items = document.querySelectorAll('.doc-nav-item');
  items.forEach(item => {
    if (item.textContent.trim().toLowerCase().includes(filename.replace('.md', '').replace(/_/g, ' ').toLowerCase())) {
      item.classList.add('active');
    }
  });

  await loadDocContent(filename);
}

let currentDocMarkdown = '';

async function loadDocContent(filename) {
  const container = document.getElementById('docViewerContent');
  if (!container) return;

  container.innerHTML = '<p style="color: var(--text-muted);"><i class="fa-solid fa-spinner fa-spin"></i> Loading deliverable documentation...</p>';

  try {
    const res = await fetch(`/api/docs/${filename}`);
    const data = await res.json();
    currentDocMarkdown = data.content || '';

    // Convert Markdown to clean readable HTML
    container.innerHTML = renderMarkdown(currentDocMarkdown);
  } catch (err) {
    container.innerHTML = '<p style="color: var(--danger);">Failed to load document.</p>';
  }
}

function renderMarkdown(md) {
  let html = md
    .replace(/^# (.*$)/gim, '<h1 style="font-size: 1.85rem; font-weight: 800; margin-bottom: 1rem; color: #fff;">$1</h1>')
    .replace(/^## (.*$)/gim, '<h2 style="font-size: 1.4rem; font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.75rem; color: #a5b4fc;">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 style="font-size: 1.15rem; font-weight: 700; margin-top: 1.25rem; margin-bottom: 0.5rem; color: #38bdf8;">$1</h3>')
    .replace(/^#### (.*$)/gim, '<h4 style="font-size: 1rem; font-weight: 600; margin-top: 1rem; margin-bottom: 0.35rem; color: #e2e8f0;">$1</h4>')
    .replace(/^\> (.*$)/gim, '<blockquote style="border-left: 4px solid var(--primary); padding-left: 1rem; margin: 1rem 0; color: #cbd5e1; font-style: italic;">$1</blockquote>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    .replace(/`([^`]+)`/gim, '<code style="background: rgba(15,23,42,0.8); padding: 0.15rem 0.4rem; border-radius: 4px; font-family: var(--font-mono); font-size: 0.85em; color: var(--accent);">$1</code>')
    .replace(/\n\n/gim, '<br><br>');

  return html;
}

function copyActiveDocContent() {
  if (!currentDocMarkdown) return;
  navigator.clipboard.writeText(currentDocMarkdown);
  showToast('Markdown documentation copied to clipboard!', 'success');
}

function printDocContent() {
  window.print();
}

// ==========================================
// NOTIFICATIONS (Epic 6)
// ==========================================
function toggleNotifDropdown() {
  const dd = document.getElementById('notifDropdown');
  if (dd) dd.classList.toggle('show');
}

function renderNotifications() {
  const container = document.getElementById('notifListContainer');
  const badge = document.getElementById('notifCountBadge');
  if (!container) return;

  const unreadCount = state.notifications.filter(n => !n.read).length;
  if (badge) {
    badge.textContent = unreadCount;
    badge.style.display = unreadCount > 0 ? 'flex' : 'none';
  }

  container.innerHTML = state.notifications.map(n => `
    <div class="notif-item ${n.read ? '' : 'unread'}" onclick="markNotifRead('${n.id}')">
      <div class="notif-item-icon ${n.type}">
        <i class="fa-solid ${n.type === 'warning' ? 'fa-triangle-exclamation' : (n.type === 'success' ? 'fa-check' : 'fa-bell')}"></i>
      </div>
      <div class="notif-item-content">
        <h5>${n.title}</h5>
        <p>${n.message}</p>
        <div class="notif-item-time">${n.date}</div>
      </div>
    </div>
  `).join('');
}

async function markNotifRead(notifId) {
  const target = state.notifications.find(n => n.id === notifId);
  if (target) {
    target.read = true;
    renderNotifications();
    try {
      await fetch(`/api/notifications/${notifId}/read`, { method: 'PUT' });
    } catch (err) {
      console.error(err);
    }
  }
}

async function markAllNotifsRead() {
  state.notifications.forEach(n => n.read = true);
  renderNotifications();
  showToast('All notifications marked as read', 'info');
}

// ==========================================
// MODAL & UTILITY HELPERS
// ==========================================
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('show');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('show');
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  let icon = 'fa-info-circle text-info';
  if (type === 'success') icon = 'fa-check-circle text-success';
  if (type === 'warning') icon = 'fa-triangle-exclamation text-warning';
  if (type === 'danger') icon = 'fa-circle-xmark text-danger';

  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(15px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function downloadBlob(content, filename, contentType) {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
