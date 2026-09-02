import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Users, UserCheck, Calendar, CreditCard, BookOpen, 
  MapPin, Plus, UserPlus, Faders, Eye, Clock, CheckCircle,
  TrendUp, ArrowUpRight, Sparkle, GraduationCap, Buildings,
  ArrowRight
} from '@phosphor-icons/react';
import { 
  getCampusFullData, getCampusFees, addStudent, addTeacher, 
  campus_branches, users 
} from '../../data/mockData';

// Interactive Mouse-Tracking Spotlight Card
function SpotlightCard({ children, onClick, className = '', style = {} }) {
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <motion.div
      className={`spotlight-card ${className}`}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: 'spring', stiffness: 450, damping: 28 }}
      style={{ cursor: onClick ? 'pointer' : 'default', ...style }}
    >
      {children}
    </motion.div>
  );
}

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

  if (!campusData) return <div style={{ padding: 40, textAlign: 'center' }}>No campus data found.</div>;

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
    <div className="content-container" style={{ maxWidth: 1400, margin: '0 auto', paddingBottom: 60 }}>
      
      {/* ─── Awwwards-Tier Glass Hero Header ─── */}
      <motion.div 
        className="overview-hero-card"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="overview-hero-glow" />
        
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <div className="live-indicator">
              <span className="live-dot" />
              <span style={{ fontSize: '0.8rem', letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 700 }}>
                Operational Campus
              </span>
            </div>
            <span style={{ color: 'var(--border-strong)' }}>•</span>
            <span className="status-pill neutral" style={{ fontSize: '0.78rem', padding: '3px 10px', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              <Buildings size={13} /> {parentInstitute?.name}
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-heading)', margin: 0, lineHeight: 1.15 }}>
            {campus.name}
          </h1>

          <p style={{ color: 'var(--text-muted)', marginTop: 8, display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.92rem' }}>
            <MapPin size={16} color="var(--primary)" /> {campus.address}
          </p>
        </div>

        {/* Quick Modal Triggers */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowAddStudentModal(true)}
            style={{ 
              padding: '12px 24px', 
              background: 'linear-gradient(135deg, var(--primary) 0%, #059669 100%)', 
              color: '#fff', 
              borderRadius: 'var(--r-full)', 
              fontWeight: 650, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 8, 
              border: 'none', 
              cursor: 'pointer',
              boxShadow: '0 8px 20px -4px rgba(16, 185, 129, 0.4)'
            }}
          >
            <UserPlus size={18} weight="bold" /> Add Student
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowAddTeacherModal(true)}
            style={{ 
              padding: '12px 22px', 
              background: 'var(--card-bg)', 
              color: 'var(--text-heading)', 
              border: '1px solid var(--border-strong)', 
              borderRadius: 'var(--r-full)', 
              fontWeight: 650, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 8, 
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)'
            }}
          >
            <Plus size={18} weight="bold" /> Add Teacher
          </motion.button>
        </div>
      </motion.div>

      {/* ─── Asymmetrical Bento Stat Grid (Spotlight Cards) ─── */}
      <div className="bento-stats-grid">
        
        {/* Card 1: Students */}
        <SpotlightCard onClick={() => navigate('/dashboard/students')}>
          <div className="bento-stat-inner">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ width: 42, height: 42, borderRadius: 'var(--r-md)', background: 'var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                <Users size={22} />
              </div>
              <span className="bento-stat-badge">
                <TrendUp size={13} weight="bold" /> +14.2%
              </span>
            </div>
            <div className="bento-stat-val">{students.length}</div>
            <div style={{ color: 'var(--text-heading)', fontWeight: 600, fontSize: '0.95rem' }}>Total Enrolled Students</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: 4 }}>Active enrolled student body</div>
          </div>
        </SpotlightCard>

        {/* Card 2: Faculty */}
        <SpotlightCard onClick={() => navigate('/dashboard/staff')}>
          <div className="bento-stat-inner">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ width: 42, height: 42, borderRadius: 'var(--r-md)', background: 'var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-heading)' }}>
                <UserCheck size={22} />
              </div>
              <span className="status-pill neutral" style={{ fontSize: '0.75rem', padding: '3px 8px' }}>
                Full-time
              </span>
            </div>
            <div className="bento-stat-val">{teachers.length}</div>
            <div style={{ color: 'var(--text-heading)', fontWeight: 600, fontSize: '0.95rem' }}>Faculty Members</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: 4 }}>Professors & teaching staff</div>
          </div>
        </SpotlightCard>

        {/* Card 3: Tuition Revenue */}
        <SpotlightCard onClick={() => navigate('/dashboard/fees')}>
          <div className="bento-stat-inner">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ width: 42, height: 42, borderRadius: 'var(--r-md)', background: 'rgba(16, 185, 129, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                <CreditCard size={22} />
              </div>
              <span className="bento-stat-badge">
                <Sparkle size={13} weight="fill" /> Recovered
              </span>
            </div>
            <div className="bento-stat-val" style={{ fontSize: 'clamp(1.5rem, 2.2vw, 1.95rem)', color: 'var(--primary)' }}>
              PKR {totalFeesCollected.toLocaleString()}
            </div>
            <div style={{ color: 'var(--text-heading)', fontWeight: 600, fontSize: '0.95rem' }}>Tuition Collected</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: 4 }}>Term fee recovery on schedule</div>
          </div>
        </SpotlightCard>

        {/* Card 4: Class Schedules */}
        <SpotlightCard onClick={() => navigate('/dashboard/classes')}>
          <div className="bento-stat-inner">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ width: 42, height: 42, borderRadius: 'var(--r-md)', background: 'var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-heading)' }}>
                <Calendar size={22} />
              </div>
              <span className="status-pill neutral" style={{ fontSize: '0.75rem', padding: '3px 8px' }}>
                Weekly
              </span>
            </div>
            <div className="bento-stat-val">{classes.length}</div>
            <div style={{ color: 'var(--text-heading)', fontWeight: 600, fontSize: '0.95rem' }}>Class Schedules</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: 4 }}>Active course routine blocks</div>
          </div>
        </SpotlightCard>

      </div>

      {/* ─── Floating Glass Action Dock ─── */}
      <div className="glass-action-dock">
        <motion.button 
          className="glass-dock-btn"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/dashboard/students')}
        >
          <Users size={18} color="var(--primary)" />
          <span>Students Directory</span>
          <ArrowUpRight size={14} style={{ marginLeft: 'auto', opacity: 0.5 }} />
        </motion.button>
        
        <motion.button 
          className="glass-dock-btn"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/dashboard/staff')}
        >
          <UserCheck size={18} color="var(--primary)" />
          <span>Faculty Directory</span>
          <ArrowUpRight size={14} style={{ marginLeft: 'auto', opacity: 0.5 }} />
        </motion.button>

        <motion.button 
          className="glass-dock-btn"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/dashboard/classes')}
        >
          <Calendar size={18} color="var(--primary)" />
          <span>Class Timetable</span>
          <ArrowUpRight size={14} style={{ marginLeft: 'auto', opacity: 0.5 }} />
        </motion.button>

        <motion.button 
          className="glass-dock-btn"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/dashboard/fees')}
        >
          <CreditCard size={18} color="var(--primary)" />
          <span>Fee Vouchers</span>
          <ArrowUpRight size={14} style={{ marginLeft: 'auto', opacity: 0.5 }} />
        </motion.button>
      </div>

      {/* ─── Modern Table 1: Active Class Timetable ─── */}
      <motion.div 
        className="table-card"
        style={{ marginBottom: 28 }}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="table-header">
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 750, margin: 0, color: 'var(--text-heading)' }}>
              Active Class Timetable
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', margin: '4px 0 0 0' }}>
              Current weekly course allocations for this campus
            </p>
          </div>
          <button 
            onClick={() => navigate('/dashboard/classes')}
            className="glass-dock-btn"
            style={{ padding: '8px 16px', fontSize: '0.84rem', borderRadius: 'var(--r-full)' }}
          >
            View All Schedules <ArrowRight size={14} />
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
                  <div style={{ fontWeight: 650, color: 'var(--text-heading)', fontSize: '0.95rem' }}>{c.subject}</div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Sec: {c.section}</span>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.9rem', color: 'var(--text-main)' }}>
                    <Clock size={15} color="var(--primary)" /> {c.day}, {c.time}
                  </div>
                </td>
                <td>
                  <span className="status-pill neutral" style={{ fontSize: '0.82rem', padding: '4px 10px' }}>
                    {c.room}
                  </span>
                </td>
                <td>
                  <span style={{ fontWeight: 550, color: 'var(--text-main)' }}>{c.teacherName}</span>
                </td>
                <td>
                  <span className="status-pill neutral" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <span className="live-dot" style={{ width: 6, height: 6 }} /> Active
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* ─── Modern Table 2: Campus Enrolled Students ─── */}
      <motion.div 
        className="table-card"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        <div className="table-header">
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 750, margin: 0, color: 'var(--text-heading)' }}>
              Campus Enrolled Students
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', margin: '4px 0 0 0' }}>
              Recent enrollments and guardian contact records
            </p>
          </div>
          <button 
            onClick={() => navigate('/dashboard/students')}
            className="glass-dock-btn"
            style={{ padding: '8px 16px', fontSize: '0.84rem', borderRadius: 'var(--r-full)' }}
          >
            Manage Directory <ArrowRight size={14} />
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
                      <img 
                        src={studentUser?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(studentUser?.name || 'Student')}`} 
                        alt="" 
                        style={{ width: 38, height: 38, borderRadius: '50%', border: '1px solid var(--border-light)' }} 
                      />
                      <div>
                        <span style={{ fontSize: '0.95rem', fontWeight: 650, color: 'var(--text-heading)', display: 'block' }}>
                          {studentUser?.name || 'Student'}
                        </span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{s.rollNo}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ color: 'var(--text-main)', fontWeight: 550 }}>{s.program}</div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Sec: {s.section}</span>
                  </td>
                  <td>
                    <span className="status-pill neutral">
                      {s.enrollmentStatus}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    <div style={{ color: 'var(--text-main)', fontWeight: 500 }}>{s.guardianName || 'N/A'}</div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{s.guardianPhone || ''}</span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <motion.button 
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => navigate('/dashboard/students')}
                      className="glass-dock-btn"
                      style={{ padding: '6px 14px', fontSize: '0.8rem', borderRadius: 'var(--r-full)', display: 'inline-flex' }}
                    >
                      View Profile
                    </motion.button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </motion.div>


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
