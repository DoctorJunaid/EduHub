// mockData.js - Relational Schema Mock Database
// Built to mirror the exact ER diagram relationships with a Pakistani context

// --- 1. Base Entities ---

export let institutes = [
  { id: 'inst_1', name: 'NUST (National University of Sciences and Technology)', board: 'Federal', type: 'University', createdAt: '2023-01-15', rating: 4.9, image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80', email: 'admissions@nust.edu.pk', phone: '+92 51 9085 1000', address: 'H-12 Sector, Islamabad', status: 'Active' },
  { id: 'inst_2', name: 'National College of Arts (NCA)', board: 'Punjab Board', type: 'College', createdAt: '2023-03-22', rating: 4.8, image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800&q=80', email: 'info@nca.edu.pk', phone: '+92 42 9921 1622', address: '4-Shahrah-e-Quaid-e-Azam, Lahore', status: 'Active' },
  { id: 'inst_3', name: 'LUMS (Lahore University of Management Sciences)', board: 'HEC', type: 'University', createdAt: '2023-06-10', rating: 4.9, image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&q=80', email: 'admissions@lums.edu.pk', phone: '+92 42 3560 8000', address: 'D.H.A. Phase 5, Lahore', status: 'Active' },
  { id: 'inst_4', name: 'Aga Khan University', board: 'Sindh Board', type: 'University', createdAt: '2023-08-05', rating: 5.0, image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80', email: 'aku.karachi@aku.edu', phone: '+92 21 3493 0051', address: 'Stadium Road, Karachi', status: 'Active' },
];

export const addInstitute = (inst) => {
  institutes = [...institutes, { ...inst, id: 'inst_' + Date.now() }];
};

export const updateInstitute = (id, updates) => {
  institutes = institutes.map(i => i.id === id ? { ...i, ...updates } : i);
};

export const deleteInstitute = (id) => {
  institutes = institutes.filter(i => i.id !== id);
};

export let campus_branches = [
  { id: 'camp_1', instituteId: 'inst_1', name: 'NUST Main Campus (H-12)', address: 'Sector H-12, Islamabad', deletedAt: null },
  { id: 'camp_2', instituteId: 'inst_1', name: 'EME College Campus', address: 'Peshawar Road, Rawalpindi', deletedAt: null },
  { id: 'camp_3', instituteId: 'inst_2', name: 'NCA Lahore Campus', address: '4-Shahrah-e-Quaid-e-Azam, Lahore', deletedAt: null },
  { id: 'camp_4', instituteId: 'inst_3', name: 'LUMS Business Block', address: 'D.H.A. Phase 5, Lahore', deletedAt: null },
  { id: 'camp_5', instituteId: 'inst_4', name: 'AKUH Main Campus', address: 'Stadium Road, Karachi', deletedAt: null },
];

export const addCampus = (campus) => {
  campus_branches = [...campus_branches, { ...campus, id: 'camp_' + Date.now(), deletedAt: null }];
};

export const updateCampus = (id, updates) => {
  campus_branches = campus_branches.map(c => c.id === id ? { ...c, ...updates } : c);
};

export const deleteCampus = (id) => {
  campus_branches = campus_branches.filter(c => c.id !== id);
};

export let users = [
  // Super Admin
  { id: 'u_super1', email: 'super@eduhub.pk', passwordHash: 'hashed', role: 'super_admin', createdAt: '2023-01-01', updatedAt: '2024-01-01', name: 'System Admin', avatar: 'https://ui-avatars.com/api/?name=System+Admin' },
  // Institute Admins (Using a custom profile structure or just linking to campus/institute)
  { id: 'u_admin1', email: 'admin@nust.edu.pk', passwordHash: 'hashed', role: 'institute_admin', createdAt: '2023-01-16', updatedAt: '2024-01-01', name: 'Ahmed Ali', avatar: 'https://ui-avatars.com/api/?name=Ahmed+Ali' },
  // Campus Manager
  { id: 'u_manager1', email: 'manager.h12@nust.edu.pk', passwordHash: 'hashed', role: 'campus_manager', createdAt: '2023-02-15', updatedAt: '2024-01-01', name: 'Bilal Tariq', avatar: 'https://ui-avatars.com/api/?name=Bilal+Tariq' },
  // Teachers
  { id: 'u_teach1', email: 'dr.usman@nust.edu.pk', passwordHash: 'hashed', role: 'teacher', createdAt: '2023-02-01', updatedAt: '2024-01-01', name: 'Dr. Usman Khan', avatar: 'https://ui-avatars.com/api/?name=Usman+Khan' },
  { id: 'u_teach2', email: 'fatima@nca.edu.pk', passwordHash: 'hashed', role: 'teacher', createdAt: '2023-03-25', updatedAt: '2024-01-01', name: 'Fatima Tariq', avatar: 'https://ui-avatars.com/api/?name=Fatima+Tariq' },
  // Students
  { id: 'u_stud1', email: 'ali.raza@nust.edu.pk', passwordHash: 'hashed', role: 'student', createdAt: '2023-08-01', updatedAt: '2024-01-01', name: 'Ali Raza', avatar: 'https://ui-avatars.com/api/?name=Ali+Raza' },
  { id: 'u_stud2', email: 'zainab.b@nust.edu.pk', passwordHash: 'hashed', role: 'student', createdAt: '2023-08-02', updatedAt: '2024-01-01', name: 'Zainab Bilal', avatar: 'https://ui-avatars.com/api/?name=Zainab+Bilal' },
];

// --- 2. Profile Entities (Foreign Keys to Users & Campuses) ---

export const super_admins = [
  { id: 'sa_1', userId: 'u_super1', createdAt: '2023-01-01' }
];

export const institute_admins = [
  // Not explicitly in ER diagram, but necessary for the UI flow to know which inst they manage
  { id: 'ia_1', userId: 'u_admin1', instituteId: 'inst_1' }
];

export const campus_managers = [
  { id: 'cm_1', userId: 'u_manager1', campusId: 'camp_1', instituteId: 'inst_1' }
];

export let teacher_profiles = [
  { id: 'tp_1', userId: 'u_teach1', campusId: 'camp_1', department: 'Computer Science', designation: 'Associate Professor', qualification: 'Ph.D. Computer Science', phone: '+92 300 1234567', subjects: 'Advanced Web Design, Data Structures', joinDate: '2023-02-01', status: 'Active' },
  { id: 'tp_2', userId: 'u_teach2', campusId: 'camp_3', department: 'Fine Arts', designation: 'Senior Lecturer', qualification: 'M.F.A. Fine Arts', phone: '+92 321 9876543', subjects: 'Fine Arts Studio & Sculpting', joinDate: '2023-03-25', status: 'Active' },
];

export const addTeacher = ({ name, email, phone, department, designation, qualification, campusId, subjects, status = 'Active' }) => {
  const userId = 'u_' + Date.now();
  const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`;
  users = [...users, { id: userId, name, email, role: 'teacher', avatar, passwordHash: 'hashed', createdAt: new Date().toISOString().split('T')[0] }];
  teacher_profiles = [...teacher_profiles, {
    id: 'tp_' + Date.now(),
    userId,
    campusId,
    department: department || 'General',
    designation: designation || 'Instructor',
    qualification: qualification || 'Masters',
    phone: phone || '+92 300 0000000',
    subjects: subjects || 'General',
    joinDate: new Date().toISOString().split('T')[0],
    status
  }];
};

export const updateTeacher = (teacherProfileId, updates) => {
  const tp = teacher_profiles.find(t => t.id === teacherProfileId);
  if (tp && (updates.name || updates.email)) {
    users = users.map(u => u.id === tp.userId ? {
      ...u,
      name: updates.name || u.name,
      email: updates.email || u.email,
      avatar: updates.name ? `https://ui-avatars.com/api/?name=${encodeURIComponent(updates.name)}` : u.avatar
    } : u);
  }
  teacher_profiles = teacher_profiles.map(t => t.id === teacherProfileId ? { ...t, ...updates } : t);
};

export const deleteTeacher = (teacherProfileId) => {
  const tp = teacher_profiles.find(t => t.id === teacherProfileId);
  if (tp) {
    users = users.filter(u => u.id !== tp.userId);
  }
  teacher_profiles = teacher_profiles.filter(t => t.id !== teacherProfileId);
};

export let student_profiles = [
  { id: 'sp_1', userId: 'u_stud1', campusId: 'camp_1', rollNo: 'NUST-CS-2023-042', program: 'BS Computer Science', section: 'CS-4A', semester: '4th Semester', subjects: 'Advanced Web Design, Data Structures, AI', phone: '+92 333 5551234', guardianName: 'Muhammad Raza', guardianPhone: '+92 300 9998877', enrollmentStatus: 'Active', admissionDate: '2023-08-01' },
  { id: 'sp_2', userId: 'u_stud2', campusId: 'camp_1', rollNo: 'NUST-CS-2023-088', program: 'BS Computer Science', section: 'CS-4B', semester: '4th Semester', subjects: 'Advanced Web Design, Data Structures', phone: '+92 334 7776655', guardianName: 'Bilal Ahmed', guardianPhone: '+92 301 4443322', enrollmentStatus: 'Pending', admissionDate: '2023-08-02' },
];

export const addStudent = ({ name, email, phone, rollNo, program, section, semester, subjects, campusId, guardianName, guardianPhone, enrollmentStatus = 'Active' }) => {
  const userId = 'u_' + Date.now();
  const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`;
  users = [...users, { id: userId, name, email, role: 'student', avatar, passwordHash: 'hashed', createdAt: new Date().toISOString().split('T')[0] }];
  student_profiles = [...student_profiles, {
    id: 'sp_' + Date.now(),
    userId,
    campusId,
    rollNo: rollNo || ('NUST-' + Math.floor(1000 + Math.random() * 9000)),
    program: program || 'BS Computer Science',
    section: section || 'A',
    semester: semester || '1st Semester',
    subjects: subjects || 'General Core',
    phone: phone || '+92 333 0000000',
    guardianName: guardianName || 'Guardian',
    guardianPhone: guardianPhone || '+92 300 0000000',
    enrollmentStatus,
    admissionDate: new Date().toISOString().split('T')[0]
  }];
};

export const updateStudent = (studentProfileId, updates) => {
  const sp = student_profiles.find(s => s.id === studentProfileId);
  if (sp && (updates.name || updates.email)) {
    users = users.map(u => u.id === sp.userId ? {
      ...u,
      name: updates.name || u.name,
      email: updates.email || u.email,
      avatar: updates.name ? `https://ui-avatars.com/api/?name=${encodeURIComponent(updates.name)}` : u.avatar
    } : u);
  }
  student_profiles = student_profiles.map(s => s.id === studentProfileId ? { ...s, ...updates } : s);
};

export const deleteStudent = (studentProfileId) => {
  const sp = student_profiles.find(s => s.id === studentProfileId);
  if (sp) {
    users = users.filter(u => u.id !== sp.userId);
  }
  student_profiles = student_profiles.filter(s => s.id !== studentProfileId);
};

// --- 3. Activity Entities (Foreign Keys to Profiles) ---

export let class_schedules = [
  { id: 'cs_1', campusId: 'camp_1', teacherProfileId: 'tp_1', subject: 'Advanced Web Design', dayOfWeek: 'Monday & Wednesday', startTime: '10:00 AM', endTime: '12:00 PM', room: 'Lab 302', section: 'CS-4A' },
  { id: 'cs_2', campusId: 'camp_1', teacherProfileId: 'tp_1', subject: 'Data Structures & Algorithms', dayOfWeek: 'Tuesday & Thursday', startTime: '02:00 PM', endTime: '03:30 PM', room: 'Hall B', section: 'CS-3B' },
  { id: 'cs_3', campusId: 'camp_1', teacherProfileId: 'tp_1', subject: 'Artificial Intelligence', dayOfWeek: 'Friday', startTime: '09:00 AM', endTime: '12:00 PM', room: 'AI Research Lab', section: 'CS-4B' },
  { id: 'cs_4', campusId: 'camp_3', teacherProfileId: 'tp_2', subject: 'Fine Arts Studio & Sculpting', dayOfWeek: 'Mon, Wed, Fri', startTime: '09:00 AM', endTime: '01:00 PM', room: 'Studio 12', section: 'FA-2' },
];

export const addClassSchedule = (cls) => {
  class_schedules = [...class_schedules, { ...cls, id: 'cs_' + Date.now() }];
};

export const deleteClassSchedule = (id) => {
  class_schedules = class_schedules.filter(c => c.id !== id);
};

export let exam_schedules = [
  { id: 'ex_1', campusId: 'camp_1', subject: 'Advanced Web Design', examType: 'Midterm Exam', date: '2025-03-15', time: '10:00 AM - 01:00 PM', room: 'Examination Hall 1', invigilator: 'Dr. Usman Khan', totalMarks: 100 },
  { id: 'ex_2', campusId: 'camp_1', subject: 'Data Structures & Algorithms', examType: 'Midterm Exam', date: '2025-03-18', time: '02:00 PM - 05:00 PM', room: 'Auditorium A', invigilator: 'Dr. Pervez Hoodbhoy', totalMarks: 100 },
  { id: 'ex_3', campusId: 'camp_1', subject: 'Artificial Intelligence', examType: 'Final Exam', date: '2025-04-10', time: '09:00 AM - 12:00 PM', room: 'Computing Wing 4', invigilator: 'Dr. Usman Khan', totalMarks: 100 },
];

export const addExamSchedule = (exam) => {
  exam_schedules = [...exam_schedules, { ...exam, id: 'ex_' + Date.now() }];
};

export const deleteExamSchedule = (id) => {
  exam_schedules = exam_schedules.filter(e => e.id !== id);
};

export let teacher_attendance = [
  { id: 'ta_1', campusId: 'camp_1', teacherProfileId: 'tp_1', date: '2026-09-02', status: 'Present', checkInTime: '08:45 AM' },
  { id: 'ta_2', campusId: 'camp_3', teacherProfileId: 'tp_2', date: '2026-09-02', status: 'Present', checkInTime: '08:55 AM' },
];

export const updateTeacherAttendance = (teacherProfileId, campusId, status) => {
  const today = '2026-09-02';
  const existing = teacher_attendance.find(t => t.teacherProfileId === teacherProfileId && t.date === today);
  if (existing) {
    teacher_attendance = teacher_attendance.map(t => t.id === existing.id ? { ...t, status } : t);
  } else {
    teacher_attendance = [...teacher_attendance, { id: 'ta_' + Date.now(), campusId, teacherProfileId, date: today, status, checkInTime: '09:00 AM' }];
  }
};

export let attendance = [
  { id: 'att_1', campusId: 'camp_1', studentProfileId: 'sp_1', date: '2026-09-02', subject: 'Advanced Web Design', status: 'Present' },
  { id: 'att_2', campusId: 'camp_1', studentProfileId: 'sp_2', date: '2026-09-02', subject: 'Advanced Web Design', status: 'Absent' },
  { id: 'att_3', campusId: 'camp_1', studentProfileId: 'sp_1', date: '2026-09-01', subject: 'Data Structures', status: 'Present' },
  { id: 'att_4', campusId: 'camp_1', studentProfileId: 'sp_2', date: '2026-09-01', subject: 'Data Structures', status: 'Present' },
];

export const updateStudentAttendance = (studentProfileId, campusId, subject, status) => {
  const today = '2026-09-02';
  const existing = attendance.find(a => a.studentProfileId === studentProfileId && a.subject === subject && a.date === today);
  if (existing) {
    attendance = attendance.map(a => a.id === existing.id ? { ...a, status } : a);
  } else {
    attendance = [...attendance, { id: 'att_' + Date.now(), campusId, studentProfileId, date: today, subject, status }];
  }
};

export let student_performance = [
  { id: 'pf_1', campusId: 'camp_1', studentProfileId: 'sp_1', subject: 'Advanced Web Design', marks: 92, totalMarks: 100, grade: 'A+', gpa: 4.0, semester: 'Fall 2025', remarks: 'Exceptional UI/UX portfolio & project work' },
  { id: 'pf_2', campusId: 'camp_1', studentProfileId: 'sp_1', subject: 'Data Structures', marks: 88, totalMarks: 100, grade: 'A', gpa: 3.8, semester: 'Fall 2025', remarks: 'Strong algorithmic efficiency' },
  { id: 'pf_3', campusId: 'camp_1', studentProfileId: 'sp_2', subject: 'Advanced Web Design', marks: 74, totalMarks: 100, grade: 'B', gpa: 3.0, semester: 'Fall 2025', remarks: 'Good frontend code, needs backend polish' },
  { id: 'pf_4', campusId: 'camp_1', studentProfileId: 'sp_2', subject: 'Data Structures', marks: 68, totalMarks: 100, grade: 'C+', gpa: 2.7, semester: 'Fall 2025', remarks: 'Needs revision in dynamic programming' },
];

export let fee_records = [
  { id: 'fee_1', campusId: 'camp_1', studentProfileId: 'sp_1', voucherNo: 'VCH-9821', feeType: 'Semester Tuition Fee', amount: 85000, month: 'Fall 2025', dueDate: '2025-09-15', paidDate: '2025-09-10', status: 'Paid', paymentMethod: '1Link Online Bank Transfer' },
  { id: 'fee_2', campusId: 'camp_1', studentProfileId: 'sp_2', voucherNo: 'VCH-9822', feeType: 'Semester Tuition Fee', amount: 85000, month: 'Fall 2025', dueDate: '2025-09-15', paidDate: null, status: 'Pending', paymentMethod: 'Pending Payment' },
  { id: 'fee_3', campusId: 'camp_1', studentProfileId: 'sp_1', voucherNo: 'VCH-9940', feeType: 'Exam & Lab Access Fee', amount: 15000, month: 'Spring 2026', dueDate: '2026-03-01', paidDate: '2026-02-28', status: 'Paid', paymentMethod: 'KuickPay' },
  { id: 'fee_4', campusId: 'camp_1', studentProfileId: 'sp_2', voucherNo: 'VCH-9941', feeType: 'Exam & Lab Access Fee', amount: 15000, month: 'Spring 2026', dueDate: '2026-03-01', paidDate: null, status: 'Overdue', paymentMethod: 'Unpaid' },
];

export const markFeeAsPaid = (feeId, paymentMethod = '1Link Online') => {
  fee_records = fee_records.map(f => f.id === feeId ? { ...f, status: 'Paid', paidDate: '2026-09-02', paymentMethod } : f);
};

export const addFeeRecord = (fee) => {
  fee_records = [...fee_records, { ...fee, id: 'fee_' + Date.now(), voucherNo: 'VCH-' + Math.floor(1000 + Math.random() * 9000) }];
};

// --- 3. Academic & Classroom Entities (Assignments, Submissions, Diary) ---

export let assignments = [
  {
    id: 'asg_1',
    teacherProfileId: 'tp_1',
    subject: 'Advanced Web Design',
    section: 'CS-4A',
    campusId: 'camp_1',
    title: 'Responsive Dashboard Design & State Architecture',
    description: 'Implement a React dashboard with state synchronization, responsive grid, and clean typography tokens.',
    totalMarks: 50,
    dueDate: '2026-09-10',
    createdAt: '2026-09-01',
    status: 'Active'
  },
  {
    id: 'asg_2',
    teacherProfileId: 'tp_1',
    subject: 'Data Structures & Algorithms',
    section: 'CS-4A',
    campusId: 'camp_1',
    title: 'Balanced Binary Search Tree & Graph Traversal',
    description: 'Write an AVL tree implementation with automated rotations and Dijkstra shortest path algorithm.',
    totalMarks: 50,
    dueDate: '2026-09-15',
    createdAt: '2026-09-02',
    status: 'Active'
  },
  {
    id: 'asg_3',
    teacherProfileId: 'tp_1',
    subject: 'Advanced Web Design',
    section: 'CS-4A',
    campusId: 'camp_1',
    title: 'REST API Integration & JWT Auth Flow',
    description: 'Build robust token refresh, role guards, and Axios interceptors for client side requests.',
    totalMarks: 40,
    dueDate: '2026-08-25',
    createdAt: '2026-08-15',
    status: 'Completed'
  }
];

export const createAssignment = (asg) => {
  assignments = [{ ...asg, id: 'asg_' + Date.now(), createdAt: '2026-09-02', status: 'Active' }, ...assignments];
};

export const deleteAssignment = (id) => {
  assignments = assignments.filter(a => a.id !== id);
  submissions = submissions.filter(s => s.assignmentId !== id);
};

export let submissions = [
  {
    id: 'sub_1',
    assignmentId: 'asg_1',
    studentProfileId: 'sp_1',
    submittedAt: '2026-09-02 11:30 AM',
    submissionText: 'GitHub repo: github.com/ali-raza/eduhub-dashboard - Implemented role-based routing and live state mutators.',
    fileUrl: 'https://example.com/downloads/ali_raza_web_assignment.zip',
    marksObtained: null,
    status: 'Submitted',
    feedback: '',
    gradedAt: null
  },
  {
    id: 'sub_2',
    assignmentId: 'asg_3',
    studentProfileId: 'sp_1',
    submittedAt: '2026-08-24 04:15 PM',
    submissionText: 'Implemented JWT auth with secure HTTP cookies and bearer tokens.',
    fileUrl: 'https://example.com/downloads/ali_jwt_auth.zip',
    marksObtained: 38,
    status: 'Graded',
    feedback: 'Excellent clean architecture and proper error boundary handling!',
    gradedAt: '2026-08-26'
  },
  {
    id: 'sub_3',
    assignmentId: 'asg_1',
    studentProfileId: 'sp_2',
    submittedAt: '2026-09-02 01:20 PM',
    submissionText: 'Figma wireframes and initial React prototype attached.',
    fileUrl: 'https://example.com/downloads/zainab_dashboard_v1.zip',
    marksObtained: null,
    status: 'Submitted',
    feedback: '',
    gradedAt: null
  }
];

export const submitAssignment = ({ assignmentId, studentProfileId, submissionText, fileUrl }) => {
  const existing = submissions.find(s => s.assignmentId === assignmentId && s.studentProfileId === studentProfileId);
  if (existing) {
    submissions = submissions.map(s => s.id === existing.id ? {
      ...s,
      submittedAt: '2026-09-02 ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      submissionText,
      fileUrl: fileUrl || s.fileUrl,
      status: 'Submitted'
    } : s);
  } else {
    submissions = [{
      id: 'sub_' + Date.now(),
      assignmentId,
      studentProfileId,
      submittedAt: '2026-09-02 ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      submissionText,
      fileUrl: fileUrl || 'https://example.com/downloads/student_submission.pdf',
      marksObtained: null,
      status: 'Submitted',
      feedback: '',
      gradedAt: null
    }, ...submissions];
  }
};

export const gradeSubmission = (submissionId, marksObtained, feedback) => {
  submissions = submissions.map(s => s.id === submissionId ? {
    ...s,
    marksObtained: Number(marksObtained),
    feedback: feedback || 'Graded by instructor',
    status: 'Graded',
    gradedAt: '2026-09-02'
  } : s);
};

export let daily_diary = [
  {
    id: 'diary_1',
    teacherProfileId: 'tp_1',
    subject: 'Advanced Web Design',
    section: 'CS-4A',
    campusId: 'camp_1',
    date: '2026-09-02',
    topic: 'React 19 Hooks, Context API & Enterprise Architecture',
    summary: 'Discussed clean separation of concerns, global CSS tokens, and responsive dashboards.',
    homework: 'Complete Assignment 1 wireframe implementation and push code to Git repository.',
    resources: 'Read React Docs (Beta) on useActionState and Vite Rolldown build configurations.'
  },
  {
    id: 'diary_2',
    teacherProfileId: 'tp_1',
    subject: 'Data Structures & Algorithms',
    section: 'CS-4A',
    campusId: 'camp_1',
    date: '2026-09-01',
    topic: 'Graph Theory & Dijkstra Shortest Path Algorithm',
    summary: 'Analyzed adjacency lists, priority queues, and time complexity in sparse graphs.',
    homework: 'Solve LeetCode problem 743 (Network Delay Time) and submit solution in C++ or Python.',
    resources: 'GeeksforGeeks Dijkstra tutorial & MIT 6.006 Lecture 16 notes.'
  }
];

export const addDailyDiary = (entry) => {
  daily_diary = [{ ...entry, id: 'diary_' + Date.now(), date: entry.date || '2026-09-02' }, ...daily_diary];
};

export const deleteDailyDiary = (id) => {
  daily_diary = daily_diary.filter(d => d.id !== id);
};

export const recordStudentGrade = ({ studentProfileId, campusId, subject, marks, totalMarks = 100, remarks = '', semester = 'Fall 2025' }) => {
  const score = Number(marks);
  let grade = 'F';
  let gpa = 0.0;
  if (score >= 90) { grade = 'A+'; gpa = 4.0; }
  else if (score >= 85) { grade = 'A'; gpa = 3.8; }
  else if (score >= 80) { grade = 'B+'; gpa = 3.4; }
  else if (score >= 70) { grade = 'B'; gpa = 3.0; }
  else if (score >= 60) { grade = 'C'; gpa = 2.4; }
  else if (score >= 50) { grade = 'D'; gpa = 2.0; }

  const existing = student_performance.find(p => p.studentProfileId === studentProfileId && p.subject === subject && p.semester === semester);
  if (existing) {
    student_performance = student_performance.map(p => p.id === existing.id ? { ...p, marks: score, totalMarks, grade, gpa, remarks } : p);
  } else {
    student_performance = [...student_performance, {
      id: 'pf_' + Date.now(),
      campusId,
      studentProfileId,
      subject,
      marks: score,
      totalMarks,
      grade,
      gpa,
      semester,
      remarks: remarks || 'Recorded by instructor'
    }];
  }
};

export function getCampusFees(campusId) {
  return fee_records
    .filter(f => f.campusId === campusId)
    .map(f => {
      const sp = student_profiles.find(s => s.id === f.studentProfileId);
      const studentUser = sp ? users.find(u => u.id === sp.userId) : null;
      return { ...f, studentName: studentUser?.name || 'Student', studentEmail: studentUser?.email, avatar: studentUser?.avatar };
    });
}

// --- Helper functions to simulate backend JOIN queries ---

export function getFullUserRecord(userId) {
  const user = users.find(u => u.id === userId);
  if (!user) return null;

  let profile = null;
  if (user.role === 'super_admin') profile = super_admins.find(p => p.userId === userId);
  if (user.role === 'institute_admin') profile = institute_admins.find(p => p.userId === userId);
  if (user.role === 'campus_manager') profile = campus_managers.find(p => p.userId === userId);
  if (user.role === 'teacher') profile = teacher_profiles.find(p => p.userId === userId);
  if (user.role === 'student') profile = student_profiles.find(p => p.userId === userId);

  return { ...user, profile };
}

export function getInstituteData(instituteId) {
  const inst = institutes.find(i => i.id === instituteId);
  const branches = campus_branches.filter(cb => cb.instituteId === instituteId);
  
  // Get all students across all branches of this institute
  const branchIds = branches.map(b => b.id);
  const students = student_profiles.filter(sp => branchIds.includes(sp.campusId));
  const teachers = teacher_profiles.filter(tp => branchIds.includes(tp.campusId));

  return { ...inst, branches, totalStudents: students.length, totalTeachers: teachers.length, students, teachers };
}

export function getCampusFullData(campusId) {
  const campus = campus_branches.find(c => c.id === campusId);
  if (!campus) return null;

  const parentInstitute = institutes.find(i => i.id === campus.instituteId);
  
  const teachers = teacher_profiles
    .filter(tp => tp.campusId === campusId)
    .map(tp => ({ ...tp, user: users.find(u => u.id === tp.userId) }));

  const students = student_profiles
    .filter(sp => sp.campusId === campusId)
    .map(sp => ({ ...sp, user: users.find(u => u.id === sp.userId) }));

  const classes = class_schedules
    .filter(cs => cs.campusId === campusId)
    .map(cs => {
      const tp = teacher_profiles.find(t => t.id === cs.teacherProfileId);
      const teacherUser = tp ? users.find(u => u.id === tp.userId) : null;
      return { ...cs, teacherName: teacherUser?.name || 'Assigned Instructor' };
    });

  const exams = exam_schedules.filter(ex => ex.campusId === campusId);

  const teacherAttendanceToday = teachers.map(t => {
    const record = teacher_attendance.find(ta => ta.teacherProfileId === t.id && ta.date === '2026-09-02');
    return {
      teacher: t,
      status: record?.status || 'Present',
      checkInTime: record?.checkInTime || '09:00 AM'
    };
  });

  const studentAttendanceRecords = attendance
    .filter(a => a.campusId === campusId)
    .map(a => {
      const sp = student_profiles.find(s => s.id === a.studentProfileId);
      const studentUser = sp ? users.find(u => u.id === sp.userId) : null;
      return { ...a, studentName: studentUser?.name || 'Student', email: studentUser?.email };
    });

  const performanceRecords = student_performance
    .filter(p => p.campusId === campusId)
    .map(p => {
      const sp = student_profiles.find(s => s.id === p.studentProfileId);
      const studentUser = sp ? users.find(u => u.id === sp.userId) : null;
      return { ...p, studentName: studentUser?.name || 'Student', avatar: studentUser?.avatar };
    });

  return {
    campus,
    parentInstitute,
    teachers,
    students,
    classes,
    exams,
    teacherAttendanceToday,
    studentAttendanceRecords,
    performanceRecords
  };
}

// --- 4. Public Page Entities ---

export const top_alumni = [
  { id: 'al_1', name: 'Sadia Hassan', picture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80', successStory: 'Secured a Senior Dev role at Google Dubai right after graduation.', instituteId: 'inst_1' },
  { id: 'al_2', name: 'Zohaib Sheikh', picture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', successStory: 'Founded a successful design agency in Lahore.', instituteId: 'inst_2' },
  { id: 'al_3', name: 'Ayesha Khan', picture: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80', successStory: 'Lead AI Researcher, published 10+ papers on NLP for Urdu.', instituteId: 'inst_1' },
  { id: 'al_4', name: 'Fahad Mustafa', picture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80', successStory: 'CEO of a rising Fintech startup in Karachi.', instituteId: 'inst_3' },
  { id: 'al_5', name: 'Dr. Yasmin Rashid', picture: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80', successStory: 'Chief Surgeon at Aga Khan University Hospital.', instituteId: 'inst_4' },
];

export const events = [
  { id: 'ev_1', title: 'Pakistan Tech Innovation Summit', date: 'Oct 15, 2024', instituteId: 'inst_1' },
  { id: 'ev_2', title: 'National Art Exhibition', date: 'Nov 02, 2024', instituteId: 'inst_2' },
  { id: 'ev_3', title: 'Hackathon: Pakistan 2.0', date: 'Dec 10, 2024', instituteId: 'inst_1' },
  { id: 'ev_4', title: 'Islamic Finance Seminar', date: 'Jan 20, 2025', instituteId: 'inst_3' },
  { id: 'ev_5', title: 'Medical Research Symposium', date: 'Feb 14, 2025', instituteId: 'inst_4' },
];

export const trainers = [
  { id: 'tr_1', name: 'Dr. Pervez Hoodbhoy', position: 'Head of Physics & CS', experience: '35+ Years Experience', rating: 5.0, instituteId: 'inst_1', avatar: 'https://ui-avatars.com/api/?name=Pervez+Hoodbhoy' },
  { id: 'tr_2', name: 'Dr. Atta-ur-Rahman', position: 'Lead Researcher', experience: '40+ Years Experience', rating: 4.9, instituteId: 'inst_1', avatar: 'https://ui-avatars.com/api/?name=Atta-ur-Rahman' },
  { id: 'tr_3', name: 'Salima Hashmi', position: 'Master Artist', experience: '30+ Years Experience', rating: 4.8, instituteId: 'inst_2', avatar: 'https://ui-avatars.com/api/?name=Salima+Hashmi' },
  { id: 'tr_4', name: 'Rashid Rana', position: 'Contemporary Design', experience: '25+ Years Experience', rating: 4.7, instituteId: 'inst_2', avatar: 'https://ui-avatars.com/api/?name=Rashid+Rana' },
  { id: 'tr_5', name: 'Atif Mian', position: 'Economics Professor', experience: '20+ Years Experience', rating: 4.9, instituteId: 'inst_3', avatar: 'https://ui-avatars.com/api/?name=Atif+Mian' },
  { id: 'tr_6', name: 'Dr. Adeebul Hasan Rizvi', position: 'Surgical Medicine', experience: '45+ Years Experience', rating: 5.0, instituteId: 'inst_4', avatar: 'https://ui-avatars.com/api/?name=Adeebul+Hasan+Rizvi' },
];

export const facilities = [
  { id: 'fac_1', title: 'Best Trainers', description: 'Learn from industry experts with decades of real-world experience.', instituteId: 'inst_1', icon: 'Users' },
  { id: 'fac_2', title: 'Practical Web Labs', description: 'State-of-the-art computer labs with the latest hardware and software.', instituteId: 'inst_1', icon: 'Monitor' },
  { id: 'fac_3', title: 'Art Studios', description: 'Massive open studios with premium supplies and natural lighting.', instituteId: 'inst_2', icon: 'Palette' },
  { id: 'fac_4', title: 'Bloomberg Terminals', description: 'Live financial data access for all business students.', instituteId: 'inst_3', icon: 'LineChart' },
  { id: 'fac_5', title: 'Simulation Hospital', description: 'A fully functional mock hospital ward for practical training.', instituteId: 'inst_4', icon: 'HeartPulse' },
];
