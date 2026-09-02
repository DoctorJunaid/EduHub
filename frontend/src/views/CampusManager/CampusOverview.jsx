import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, UserCheck, Calendar, CreditCard, BookOpen, 
  MapPin, Plus, UserPlus, Filter, Eye, Clock, CheckCircle2 
} from 'lucide-react';
import { 
  getCampusFullData, getCampusFees, addStudent, addTeacher, 
  campus_branches, users 
} from '../../data/mockData';

export default function CampusOverview({ user }) {
  const navigate = useNavigate();
  const campusId = user?.profile?.campusId || 'camp_1';
  const [dataVersion, setDataVersion] = useState(0);

  // Modals state
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showAddTeacherModal, setShowAddTeacherModal] = useState(false);

  const [studentForm, setStudentForm] = useState({
    name: '',
    email: '',
    phone: '+92 333 ',
    rollNo: '',
    program: 'BS Computer Science',
    section: 'CS-4A',
    semester: '4th Semester',
    subjects: 'Advanced Web Design, Data Structures, AI',
    campusId: campusId,
    guardianName: '',
    guardianPhone: '+92 300 ',
    enrollmentStatus: 'Active'
  });

  const [teacherForm, setTeacherForm] = useState({
    name: '',
    email: '',
    phone: '+92 300 ',
    department: 'Computer Science',
    designation: 'Associate Professor',
    qualification: 'Ph.D. in Computer Science',
    campusId: campusId,
    subjects: 'Advanced Web Design, Data Structures',
    status: 'Active'
  });

  const campusData = getCampusFullData(campusId);
  const fees = getCampusFees(campusId);

  if (!campusData) return <div>No campus data found.</div>;

  const { campus, parentInstitute, teachers, students, classes, exams, teacherAttendanceToday, performanceRecords } = campusData;

  const totalFeesExpected = fees.reduce((sum, f) => sum + f.amount, 0);
  const totalFeesCollected = fees.filter(f => f.status === 'Paid').reduce((sum, f) => sum + f.amount, 0);

  const handleSaveStudent = (e) => {
    e.preventDefault();
    addStudent(studentForm);
    setShowAddStudentModal(false);
    setStudentForm({
      name: '',
      email: '',
      phone: '+92 333 ',
      rollNo: '',
      program: 'BS Computer Science',
      section: 'CS-4A',
      semester: '4th Semester',
      subjects: 'Advanced Web Design, Data Structures, AI',
      campusId: campusId,
      guardianName: '',
      guardianPhone: '+92 300 ',
      enrollmentStatus: 'Active'
    });
    setDataVersion(v => v + 1);
  };

  const handleSaveTeacher = (e) => {
    e.preventDefault();
    addTeacher(teacherForm);
    setShowAddTeacherModal(false);
    setTeacherForm({
      name: '',
      email: '',
      phone: '+92 300 ',
      department: 'Computer Science',
      designation: 'Associate Professor',
      qualification: 'Ph.D. in Computer Science',
      campusId: campusId,
      subjects: 'Advanced Web Design, Data Structures',
      status: 'Active'
    });
    setDataVersion(v => v + 1);
  };

  return (
    <div className="content-container animate-stagger">
      {/* Consistent Page Header */}
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1>{campus.name}</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <MapPin size={15} /> {campus.address} • <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{parentInstitute?.name}</span>
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button 
            onClick={() => setShowAddStudentModal(true)}
            style={{ padding: '10px 18px', background: 'var(--primary)', color: '#fff', borderRadius: 'var(--r-sm)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, border: 'none', cursor: 'pointer' }}
          >
            <UserPlus size={16} /> Add Student
          </button>
          <button 
            onClick={() => setShowAddTeacherModal(true)}
            style={{ padding: '10px 18px', background: 'var(--card-bg)', color: 'var(--text-heading)', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-sm)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
          >
            <Plus size={16} /> Add Teacher
          </button>
        </div>
      </div>

      {/* Consistent Stats Grid */}
      <div className="course-grid">
        <div className="c-card" onClick={() => navigate('/dashboard/students')} style={{ cursor: 'pointer' }}>
          <h3>Total Enrolled Students</h3>
          <div className="c-card-stat">{students.length}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)' }}>
            <Users size={18} />
            <span style={{ fontSize: '0.85rem' }}>Active student body</span>
          </div>
        </div>

        <div className="c-card" onClick={() => navigate('/dashboard/staff')} style={{ cursor: 'pointer' }}>
          <h3>Faculty Members</h3>
          <div className="c-card-stat">{teachers.length}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)' }}>
            <UserCheck size={18} />
            <span style={{ fontSize: '0.85rem' }}>Professors & Lecturers</span>
          </div>
        </div>

        <div className="c-card" onClick={() => navigate('/dashboard/fees')} style={{ cursor: 'pointer' }}>
          <h3>Tuition Collected</h3>
          <div className="c-card-stat" style={{ fontSize: '1.6rem' }}>PKR {totalFeesCollected.toLocaleString()}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)' }}>
            <CreditCard size={18} />
            <span style={{ fontSize: '0.85rem' }}>Term fee recovery</span>
          </div>
        </div>

        <div className="c-card" onClick={() => navigate('/dashboard/classes')} style={{ cursor: 'pointer' }}>
          <h3>Class Schedules</h3>
          <div className="c-card-stat">{classes.length}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)' }}>
            <Calendar size={18} />
            <span style={{ fontSize: '0.85rem' }}>Weekly timetable routines</span>
          </div>
        </div>
      </div>

      {/* Quick Action Buttons Bar */}
      <div style={{ display: 'flex', gap: 16, marginTop: -8, marginBottom: 8, flexWrap: 'wrap' }}>
        <button 
          onClick={() => navigate('/dashboard/students')}
          style={{ flex: 1, minWidth: 200, padding: '14px', background: 'var(--card-bg)', border: '1px dashed var(--border-strong)', borderRadius: 'var(--r-md)', fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer' }}
        >
          <span>+</span> Students Directory
        </button>
        <button 
          onClick={() => navigate('/dashboard/staff')}
          style={{ flex: 1, minWidth: 200, padding: '14px', background: 'var(--card-bg)', border: '1px dashed var(--border-strong)', borderRadius: 'var(--r-md)', fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer' }}
        >
          <span>+</span> Faculty Directory
        </button>
        <button 
          onClick={() => navigate('/dashboard/classes')}
          style={{ flex: 1, minWidth: 200, padding: '14px', background: 'var(--card-bg)', border: '1px dashed var(--border-strong)', borderRadius: 'var(--r-md)', fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer' }}
        >
          <span>+</span> Class Timetable
        </button>
        <button 
          onClick={() => navigate('/dashboard/fees')}
          style={{ flex: 1, minWidth: 200, padding: '14px', background: 'var(--card-bg)', border: '1px dashed var(--border-strong)', borderRadius: 'var(--r-md)', fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer' }}
        >
          <span>+</span> Fee Vouchers
        </button>
      </div>

      {/* Consistent Full-Width Data Table 1: Today's Class Timetable */}
      <div className="table-card">
        <div className="table-header">
          <div>
            <h2>Active Class Timetable</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '2px 0 0 0' }}>Current weekly course allocations for this campus</p>
          </div>
          <button 
            onClick={() => navigate('/dashboard/classes')}
            style={{ padding: '6px 14px', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-full)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', background: 'var(--card-bg)' }}
          >
            View All Schedules →
          </button>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Subject & Section</th>
              <th>Day & Time Routine</th>
              <th>Room / Lab</th>
              <th>Assigned Instructor</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {classes.slice(0, 4).map((c) => (
              <tr key={c.id}>
                <td>
                  <div style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{c.subject}</div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Sec: {c.section}</span>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.9rem', color: 'var(--text-main)' }}>
                    <Clock size={14} color="var(--text-muted)" /> {c.day}, {c.time}
                  </div>
                </td>
                <td style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{c.room}</td>
                <td>
                  <span style={{ fontWeight: 500, color: 'var(--text-main)' }}>{c.teacherName}</span>
                </td>
                <td>
                  <span className="status-pill completed">Active</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Consistent Full-Width Data Table 2: Registered Students Overview */}
      <div className="table-card">
        <div className="table-header">
          <div>
            <h2>Campus Enrolled Students</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '2px 0 0 0' }}>Recent enrollments and guardian contact records</p>
          </div>
          <button 
            onClick={() => navigate('/dashboard/students')}
            style={{ padding: '6px 14px', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-full)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', background: 'var(--card-bg)' }}
          >
            Manage Students Directory →
          </button>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Student Name & Roll No</th>
              <th>Program & Section</th>
              <th>Enrollment Status</th>
              <th>Guardian Contact</th>
              <th style={{ textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => {
              const studentUser = users.find(u => u.id === s.userId);
              return (
                <tr key={s.id}>
                  <td>
                    <div className="td-user">
                      <img src={studentUser?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(studentUser?.name || 'Student')}`} alt="" style={{ width: 36, height: 36, borderRadius: '50%' }} />
                      <div>
                        <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-heading)', display: 'block' }}>{studentUser?.name || 'Student'}</span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{s.rollNo}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ color: 'var(--text-main)', fontWeight: 500 }}>{s.program}</div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Sec: {s.section}</span>
                  </td>
                  <td>
                    <span className={`status-pill ${s.enrollmentStatus === 'Active' ? 'completed' : 'inprogress'}`}>
                      {s.enrollmentStatus}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    <div>{s.guardianName || 'N/A'}</div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{s.guardianPhone || ''}</span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button 
                      onClick={() => navigate('/dashboard/students')}
                      style={{ padding: '6px 12px', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-full)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', background: 'var(--card-bg)', cursor: 'pointer' }}
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* MODAL: ADD STUDENT */}
      {showAddStudentModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: 20 }}>
          <div className="table-card animate-fade-in" style={{ width: '100%', maxWidth: 640, padding: 28, background: 'var(--card-bg)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Add New Student to {campus.name}</h3>
              <button onClick={() => setShowAddStudentModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
            </div>

            <form onSubmit={handleSaveStudent} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Full Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Ali Raza"
                    value={studentForm.name}
                    onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Roll Number / ID</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. NUST-CS-2024-001"
                    value={studentForm.rollNo}
                    onChange={(e) => setStudentForm({ ...studentForm, rollNo: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Email Address</label>
                  <input 
                    type="email" 
                    required
                    placeholder="ali.raza@nust.edu.pk"
                    value={studentForm.email}
                    onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Student Phone</label>
                  <input 
                    type="text" 
                    placeholder="+92 333 1234567"
                    value={studentForm.phone}
                    onChange={(e) => setStudentForm({ ...studentForm, phone: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Class / Program</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. BS Computer Science"
                    value={studentForm.program}
                    onChange={(e) => setStudentForm({ ...studentForm, program: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Section</label>
                  <input 
                    type="text" 
                    placeholder="e.g. CS-4A"
                    value={studentForm.section}
                    onChange={(e) => setStudentForm({ ...studentForm, section: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Semester</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 4th Semester"
                    value={studentForm.semester}
                    onChange={(e) => setStudentForm({ ...studentForm, semester: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Enrolled Subjects</label>
                <input 
                  type="text" 
                  placeholder="e.g. Advanced Web Design, Data Structures, AI"
                  value={studentForm.subjects}
                  onChange={(e) => setStudentForm({ ...studentForm, subjects: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, paddingTop: 8, borderTop: '1px solid var(--border-light)' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Guardian Name</label>
                  <input 
                    type="text" 
                    placeholder="Father / Guardian Name"
                    value={studentForm.guardianName}
                    onChange={(e) => setStudentForm({ ...studentForm, guardianName: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Guardian Phone</label>
                  <input 
                    type="text" 
                    placeholder="+92 300 1234567"
                    value={studentForm.guardianPhone}
                    onChange={(e) => setStudentForm({ ...studentForm, guardianPhone: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 12 }}>
                <button 
                  type="button" 
                  onClick={() => setShowAddStudentModal(false)}
                  style={{ padding: '10px 18px', background: 'var(--bg-color)', border: '1px solid var(--border-strong)', borderRadius: 8, color: 'var(--text-main)', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  style={{ padding: '10px 24px', background: 'var(--primary)', color: '#fff', borderRadius: 8, fontWeight: 600, border: 'none', cursor: 'pointer' }}
                >
                  Save Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD TEACHER */}
      {showAddTeacherModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: 20 }}>
          <div className="table-card animate-fade-in" style={{ width: '100%', maxWidth: 600, padding: 28, background: 'var(--card-bg)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Add New Faculty to {campus.name}</h3>
              <button onClick={() => setShowAddTeacherModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
            </div>

            <form onSubmit={handleSaveTeacher} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Full Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Dr. Usman Khan"
                    value={teacherForm.name}
                    onChange={(e) => setTeacherForm({ ...teacherForm, name: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Email Address</label>
                  <input 
                    type="email" 
                    required
                    placeholder="usman.khan@nust.edu.pk"
                    value={teacherForm.email}
                    onChange={(e) => setTeacherForm({ ...teacherForm, email: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Designation</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Associate Professor"
                    value={teacherForm.designation}
                    onChange={(e) => setTeacherForm({ ...teacherForm, designation: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Qualification</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Ph.D. Computer Science"
                    value={teacherForm.qualification}
                    onChange={(e) => setTeacherForm({ ...teacherForm, qualification: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Department</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Computer Science"
                    value={teacherForm.department}
                    onChange={(e) => setTeacherForm({ ...teacherForm, department: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Phone Number</label>
                  <input 
                    type="text" 
                    placeholder="+92 300 1234567"
                    value={teacherForm.phone}
                    onChange={(e) => setTeacherForm({ ...teacherForm, phone: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Subjects Taught</label>
                <input 
                  type="text" 
                  placeholder="e.g. Advanced Web Design, Data Structures"
                  value={teacherForm.subjects}
                  onChange={(e) => setTeacherForm({ ...teacherForm, subjects: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 12 }}>
                <button 
                  type="button" 
                  onClick={() => setShowAddTeacherModal(false)}
                  style={{ padding: '10px 18px', background: 'var(--bg-color)', border: '1px solid var(--border-strong)', borderRadius: 8, color: 'var(--text-main)', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  style={{ padding: '10px 24px', background: 'var(--primary)', color: '#fff', borderRadius: 8, fontWeight: 600, border: 'none', cursor: 'pointer' }}
                >
                  Save Teacher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
