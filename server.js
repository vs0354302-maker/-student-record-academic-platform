const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const DATA_DIR = path.join(__dirname, 'data');
const DOCS_DIR = path.join(__dirname, 'docs');

// Helper to read JSON
function readData(fileName) {
  try {
    const filePath = path.join(DATA_DIR, fileName);
    if (!fs.existsSync(filePath)) return [];
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (err) {
    console.error(`Error reading ${fileName}:`, err);
    return [];
  }
}

// Helper to write JSON
function writeData(fileName, data) {
  try {
    const filePath = path.join(DATA_DIR, fileName);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error(`Error writing ${fileName}:`, err);
    return false;
  }
}

// --- Health ---
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    platform: 'Student Record and Academic Management Platform (SRAMP)',
    version: '1.0.0',
    agileSprint: 'Sprint 4 - Release 1.0',
    timestamp: new Date().toISOString()
  });
});

// --- Students API (Epic 1) ---
app.get('/api/students', (req, res) => {
  const students = readData('students.json');
  res.json(students);
});

app.post('/api/students', (req, res) => {
  const students = readData('students.json');
  const { id, name, email, phone, department, year, status } = req.body;

  if (!id || !name || !email || !department) {
    return res.status(400).json({ error: 'Missing required student fields (ID, Name, Email, Department).' });
  }

  if (students.some(s => s.id.toLowerCase() === id.toLowerCase())) {
    return res.status(409).json({ error: `Student with ID "${id}" already exists.` });
  }

  const newStudent = {
    id: id.trim(),
    name: name.trim(),
    email: email.trim(),
    phone: phone ? phone.trim() : '+91 98000 00000',
    department: department.trim(),
    year: year || '1st Year',
    status: status || 'Active',
    cgpa: 8.0,
    attendance: 100.0,
    enrollmentDate: new Date().toISOString().split('T')[0],
    courses: []
  };

  students.push(newStudent);
  writeData('students.json', students);
  res.status(201).json(newStudent);
});

app.put('/api/students/:id', (req, res) => {
  const students = readData('students.json');
  const studentIndex = students.findIndex(s => s.id === req.params.id);

  if (studentIndex === -1) {
    return res.status(404).json({ error: 'Student not found.' });
  }

  const updated = {
    ...students[studentIndex],
    ...req.body,
    id: students[studentIndex].id // immutable ID
  };

  students[studentIndex] = updated;
  writeData('students.json', students);
  res.json(updated);
});

app.delete('/api/students/:id', (req, res) => {
  let students = readData('students.json');
  const targetId = req.params.id;

  if (!students.some(s => s.id === targetId)) {
    return res.status(404).json({ error: 'Student not found.' });
  }

  students = students.filter(s => s.id !== targetId);
  writeData('students.json', students);

  // Cascade un-enroll from courses
  const courses = readData('courses.json');
  courses.forEach(c => {
    if (c.enrolledStudents) {
      c.enrolledStudents = c.enrolledStudents.filter(sid => sid !== targetId);
    }
  });
  writeData('courses.json', courses);

  res.json({ success: true, message: `Student ${targetId} removed successfully.` });
});

// --- Courses API (Epic 2) ---
app.get('/api/courses', (req, res) => {
  const courses = readData('courses.json');
  res.json(courses);
});

app.post('/api/courses', (req, res) => {
  const courses = readData('courses.json');
  const { code, name, department, credits, instructor, description, semester } = req.body;

  if (!code || !name || !department) {
    return res.status(400).json({ error: 'Course Code, Name, and Department are required.' });
  }

  if (courses.some(c => c.code.toLowerCase() === code.toLowerCase())) {
    return res.status(409).json({ error: `Course Code "${code}" already exists.` });
  }

  const newCourse = {
    id: code.trim().toUpperCase(),
    code: code.trim().toUpperCase(),
    name: name.trim(),
    department: department.trim(),
    credits: Number(credits) || 3,
    instructor: instructor ? instructor.trim() : 'Unassigned',
    facultyId: 'FAC-' + Math.floor(100 + Math.random() * 900),
    semester: semester || 'Semester 5',
    enrolledStudents: [],
    description: description ? description.trim() : 'Course syllabus and learning objectives.'
  };

  courses.push(newCourse);
  writeData('courses.json', courses);
  res.status(201).json(newCourse);
});

app.post('/api/courses/:id/enroll', (req, res) => {
  const courses = readData('courses.json');
  const students = readData('students.json');
  const courseId = req.params.id;
  const course = courses.find(c => c.id === courseId || c.code === courseId);

  if (!course) return res.status(404).json({ error: 'Course not found.' });

  const { studentIds } = req.body; // array of student IDs
  if (!Array.isArray(studentIds)) {
    return res.status(400).json({ error: 'studentIds must be an array of student IDs.' });
  }

  course.enrolledStudents = studentIds;
  writeData('courses.json', courses);

  // Sync to students table
  students.forEach(student => {
    if (studentIds.includes(student.id)) {
      if (!student.courses.includes(course.code)) {
        student.courses.push(course.code);
      }
    } else {
      student.courses = student.courses.filter(c => c !== course.code);
    }
  });
  writeData('students.json', students);

  res.json({ success: true, enrolledCount: studentIds.length, course });
});

// --- Attendance API (Epic 3) ---
app.get('/api/attendance', (req, res) => {
  const attendance = readData('attendance.json');
  const { courseId } = req.query;
  if (courseId) {
    return res.json(attendance.filter(a => a.courseId === courseId));
  }
  res.json(attendance);
});

app.post('/api/attendance', (req, res) => {
  const attendance = readData('attendance.json');
  const students = readData('students.json');
  const { courseId, date, topic, markedBy, records } = req.body;

  if (!courseId || !date || !records || !Array.isArray(records)) {
    return res.status(400).json({ error: 'Missing required attendance data (courseId, date, records).' });
  }

  const newLog = {
    id: `ATT-${Date.now()}`,
    courseId,
    date,
    topic: topic || 'Regular Lecture',
    markedBy: markedBy || 'Faculty Member',
    records
  };

  attendance.push(newLog);
  writeData('attendance.json', attendance);

  // Recompute student attendance rates across all sessions
  records.forEach(rec => {
    const student = students.find(s => s.id === rec.studentId);
    if (student) {
      let totalSessions = 0;
      let attended = 0;
      attendance.forEach(att => {
        const found = att.records.find(r => r.studentId === student.id);
        if (found) {
          totalSessions++;
          if (found.status === 'Present' || found.status === 'Late') attended++;
        }
      });
      student.attendance = totalSessions > 0 ? parseFloat(((attended / totalSessions) * 100).toFixed(1)) : 100;
    }
  });
  writeData('students.json', students);

  res.status(201).json(newLog);
});

// --- Marks API (Epic 4) ---
app.get('/api/marks', (req, res) => {
  const marks = readData('marks.json');
  const { courseId, studentId } = req.query;
  let result = marks;
  if (courseId) result = result.filter(m => m.courseId === courseId);
  if (studentId) result = result.filter(m => m.studentId === studentId);
  res.json(result);
});

function calculateGrade(total) {
  if (total >= 90) return { grade: 'A+', gpa: 10.0 };
  if (total >= 80) return { grade: 'A', gpa: 9.0 };
  if (total >= 70) return { grade: 'B', gpa: 8.0 };
  if (total >= 60) return { grade: 'C', gpa: 7.0 };
  if (total >= 50) return { grade: 'D', gpa: 6.0 };
  return { grade: 'F', gpa: 0.0 };
}

app.post('/api/marks', (req, res) => {
  const marks = readData('marks.json');
  const students = readData('students.json');
  const { studentId, courseId, internal, midterm, endSem } = req.body;

  const intVal = Math.min(20, Math.max(0, Number(internal) || 0));
  const midVal = Math.min(30, Math.max(0, Number(midterm) || 0));
  const endVal = Math.min(50, Math.max(0, Number(endSem) || 0));
  const total = intVal + midVal + endVal;
  const { grade, gpa } = calculateGrade(total);

  const existingIndex = marks.findIndex(m => m.studentId === studentId && m.courseId === courseId);

  const markEntry = {
    id: existingIndex >= 0 ? marks[existingIndex].id : `MRK-${Date.now()}`,
    studentId,
    courseId,
    internal: intVal,
    midterm: midVal,
    endSem: endVal,
    total,
    grade,
    gpa,
    lastUpdated: new Date().toISOString().split('T')[0]
  };

  if (existingIndex >= 0) {
    marks[existingIndex] = markEntry;
  } else {
    marks.push(markEntry);
  }
  writeData('marks.json', marks);

  // Update student CGPA
  const student = students.find(s => s.id === studentId);
  if (student) {
    const studentMarks = marks.filter(m => m.studentId === studentId);
    if (studentMarks.length > 0) {
      const avgGpa = studentMarks.reduce((acc, m) => acc + m.gpa, 0) / studentMarks.length;
      student.cgpa = parseFloat(avgGpa.toFixed(2));
      writeData('students.json', students);
    }
  }

  res.json(markEntry);
});

// --- Notifications API (Epic 6) ---
app.get('/api/notifications', (req, res) => {
  const notifs = readData('notifications.json');
  res.json(notifs);
});

app.put('/api/notifications/:id/read', (req, res) => {
  const notifs = readData('notifications.json');
  const target = notifs.find(n => n.id === req.params.id);
  if (target) {
    target.read = true;
    writeData('notifications.json', notifs);
  }
  res.json({ success: true, target });
});

app.post('/api/notifications', (req, res) => {
  const notifs = readData('notifications.json');
  const { title, message, type, targetRole } = req.body;
  const newNotif = {
    id: `NOTIF-${Date.now()}`,
    type: type || 'info',
    title: title || 'System Announcement',
    message: message || '',
    date: new Date().toLocaleString(),
    read: false,
    targetRole: targetRole || 'all'
  };
  notifs.unshift(newNotif);
  writeData('notifications.json', notifs);
  res.status(201).json(newNotif);
});

// --- Backlog & Scrum Board API (Agile Suite) ---
app.get('/api/backlog', (req, res) => {
  const backlog = readData('backlog.json');
  res.json(backlog);
});

app.post('/api/backlog', (req, res) => {
  const backlog = readData('backlog.json');
  const { title, epic, role, want, soThat, priority, storyPoints, sprint, assignee } = req.body;

  const newStory = {
    id: `US-${Math.floor(100 + Math.random() * 900)}`,
    epic: epic || 'General',
    title: title || 'New User Story',
    role: role || 'User',
    want: want || 'perform an action',
    soThat: soThat || 'achieve business value',
    storyPoints: Number(storyPoints) || 3,
    priority: priority || 'Medium',
    sprint: sprint || 'Sprint 4',
    status: 'backlog',
    assignee: assignee || 'Unassigned'
  };

  backlog.push(newStory);
  writeData('backlog.json', backlog);
  res.status(201).json(newStory);
});

app.patch('/api/backlog/:id/status', (req, res) => {
  const backlog = readData('backlog.json');
  const { status } = req.body;
  const validStatuses = ['backlog', 'todo', 'in-progress', 'testing', 'completed'];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
  }

  const story = backlog.find(s => s.id === req.params.id);
  if (!story) return res.status(404).json({ error: 'User story not found.' });

  story.status = status;
  writeData('backlog.json', backlog);
  res.json(story);
});

// --- Sprints API (Agile Suite) ---
app.get('/api/sprints', (req, res) => {
  const sprints = readData('sprints.json');
  res.json(sprints);
});

// --- Deliverables / Docs API ---
app.get('/api/docs', (req, res) => {
  try {
    const files = fs.readdirSync(DOCS_DIR).filter(f => f.endsWith('.md'));
    const docList = files.map(filename => {
      const fullPath = path.join(DOCS_DIR, filename);
      const title = filename.replace('.md', '').replace(/_/g, ' ');
      return { filename, title };
    });
    res.json(docList);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read docs directory.' });
  }
});

app.get('/api/docs/:filename', (req, res) => {
  try {
    const filename = req.params.filename;
    const safePath = path.join(DOCS_DIR, path.basename(filename));
    if (!fs.existsSync(safePath)) {
      return res.status(404).json({ error: 'Document not found.' });
    }
    const content = fs.readFileSync(safePath, 'utf8');
    res.json({ filename, content });
  } catch (err) {
    res.status(500).json({ error: 'Failed to read document.' });
  }
});

// --- Summary & Analytics API (Epic 7) ---
app.get('/api/reports/summary', (req, res) => {
  const students = readData('students.json');
  const courses = readData('courses.json');
  const marks = readData('marks.json');
  const backlog = readData('backlog.json');

  const totalStudents = students.length;
  const totalCourses = courses.length;

  const avgAttendance = totalStudents > 0
    ? (students.reduce((acc, s) => acc + (s.attendance || 0), 0) / totalStudents).toFixed(1)
    : 0;

  const avgCgpa = totalStudents > 0
    ? (students.reduce((acc, s) => acc + (s.cgpa || 0), 0) / totalStudents).toFixed(2)
    : 0;

  const lowAttendanceCount = students.filter(s => (s.attendance || 0) < 75).length;

  // Grade distributions
  const gradeCounts = { 'A+': 0, 'A': 0, 'B': 0, 'C': 0, 'D': 0, 'F': 0 };
  marks.forEach(m => {
    if (gradeCounts[m.grade] !== undefined) {
      gradeCounts[m.grade]++;
    }
  });

  // Story point totals
  const totalStoryPoints = backlog.reduce((acc, s) => acc + (s.storyPoints || 0), 0);
  const completedStoryPoints = backlog
    .filter(s => s.status === 'completed')
    .reduce((acc, s) => acc + (s.storyPoints || 0), 0);

  res.json({
    totalStudents,
    totalCourses,
    avgAttendance: Number(avgAttendance),
    avgCgpa: Number(avgCgpa),
    lowAttendanceCount,
    gradeCounts,
    totalStoryPoints,
    completedStoryPoints,
    backlogCount: backlog.length
  });
});

// Root catchall for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`  SRAMP - Student Record & Academic Management Platform`);
  console.log(`  Unit-2 Agile Mini-Project Live Server`);
  console.log(`  Running on: http://localhost:${PORT}`);
  console.log(`=======================================================`);
});
