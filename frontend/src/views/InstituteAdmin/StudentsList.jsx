import React, { useState } from 'react';
import { Search, Filter, Plus, Edit2, Trash2, Eye, BookOpen, User, Phone, Mail, Shield, CheckCircle2 } from 'lucide-react';
import { student_profiles, users, campus_branches, addStudent, updateStudent, deleteStudent } from '../../data/mockData';

export default function StudentsList({ user }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [dataVersion, setDataVersion] = useState(0);

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [viewingStudent, setViewingStudent] = useState(null);

  const initialForm = {
    name: '',
    email: '',
    phone: '+92 333 ',
    rollNo: '',
    program: 'BS Computer Science',
    section: 'CS-4A',
    semester: '4th Semester',
    subjects: 'Advanced Web Design, Data Structures, AI',
    campusId: user?.profile?.campusId || 'camp_1',
    guardianName: '',
    guardianPhone: '+92 300 ',
    enrollmentStatus: 'Active'
  };

  const [formData, setFormData] = useState(initialForm);

  // Determine which campus filter applies
  const isCampusManager = user?.role === 'campus_manager';
  const managerCampusId = user?.profile?.campusId;

  let allStudents = student_profiles.map(sp => {
    const studentUser = users.find(u => u.id === sp.userId);
    const campus = campus_branches.find(c => c.id === sp.campusId);
    return {
      ...sp,
      name: studentUser?.name || 'Student',
      email: studentUser?.email || 'email@eduhub.pk',
      avatar: studentUser?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(studentUser?.name || 'Student')}`,
      campusName: campus?.name || 'Main Campus'
    };
  });

  if (isCampusManager && managerCampusId) {
    allStudents = allStudents.filter(s => s.campusId === managerCampusId);
  }

  const filtered = allStudents.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.rollNo && s.rollNo.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (s.program && s.program.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (s.section && s.section.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleOpenAdd = () => {
    setFormData(initialForm);
    setShowAddModal(true);
  };

  const handleOpenEdit = (student, e) => {
    e.stopPropagation();
    setEditingStudent(student);
    setFormData({
      name: student.name,
      email: student.email,
      phone: student.phone || '',
      rollNo: student.rollNo || '',
      program: student.program || 'BS Computer Science',
      section: student.section || 'A',
      semester: student.semester || '1st Semester',
      subjects: student.subjects || '',
      campusId: student.campusId || 'camp_1',
      guardianName: student.guardianName || '',
      guardianPhone: student.guardianPhone || '',
      enrollmentStatus: student.enrollmentStatus || 'Active'
    });
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this student record?')) {
      deleteStudent(id);
      setDataVersion(v => v + 1);
    }
  };

  const handleSaveAdd = (e) => {
    e.preventDefault();
    addStudent(formData);
    setShowAddModal(false);
    setDataVersion(v => v + 1);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingStudent || !editingStudent.id) return;
    updateStudent(editingStudent.id, formData);
    setEditingStudent(null);
    setDataVersion(v => v + 1);
  };

  return (
    <div className="content-container animate-fade-in" style={{ gap: 24 }}>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1>Students Directory & Records</h1>
          <p style={{ color: 'var(--text-muted)' }}>Complete management of enrolled students, sections, subjects, and guardians.</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          style={{ padding: '10px 20px', background: 'var(--primary)', color: '#fff', borderRadius: 8, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, border: 'none', cursor: 'pointer' }}
        >
          <Plus size={18} /> Add New Student
        </button>
      </div>

      <div className="table-card">
        <div className="table-header" style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div className="search-bar" style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--bg-color)', padding: '10px 16px', borderRadius: '8px', width: '320px', border: '1px solid var(--border-strong)' }}>
            <Search size={18} color="var(--text-muted)" />
            <input 
              type="text" 
              placeholder="Search by name, roll no, program..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', color: 'var(--text-main)' }}
            />
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{filtered.length} students enrolled</span>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Student & Roll No</th>
              <th>Class / Program & Section</th>
              <th>Enrolled Subjects</th>
              <th>Campus Branch</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>No students found.</td>
              </tr>
            )}
            {filtered.map((s) => (
              <tr key={s.id} style={{ cursor: 'pointer' }} onClick={() => setViewingStudent(s)}>
                <td>
                  <div className="td-user">
                    <img src={s.avatar} alt={s.name} style={{ width: 42, height: 42, borderRadius: '50%' }} />
                    <div>
                      <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-heading)', display: 'block' }}>{s.name}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>{s.rollNo}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '0.9rem' }}>{s.program}</div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Sec: {s.section} • {s.semester}</span>
                </td>
                <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem', maxWidth: 220 }}>
                  {s.subjects}
                </td>
                <td style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{s.campusName}</td>
                <td>
                  <span className={`status-pill ${s.enrollmentStatus === 'Active' ? 'completed' : s.enrollmentStatus === 'Pending' ? 'inprogress' : 'cancelled'}`} style={{ padding: '6px 12px' }}>
                    {s.enrollmentStatus}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end', alignItems: 'center' }}>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setViewingStudent(s); }}
                      style={{ padding: 6, color: 'var(--text-muted)', background: 'var(--bg-color)', borderRadius: 6, border: '1px solid var(--border-light)', cursor: 'pointer' }}
                      title="View Details"
                    >
                      <Eye size={15} />
                    </button>
                    <button 
                      onClick={(e) => handleOpenEdit(s, e)}
                      style={{ padding: 6, color: 'var(--primary)', background: 'var(--bg-color)', borderRadius: 6, border: '1px solid var(--border-light)', cursor: 'pointer' }}
                      title="Edit Student"
                    >
                      <Edit2 size={15} />
                    </button>
                    <button 
                      onClick={(e) => handleDelete(s.id, e)}
                      style={{ padding: 6, color: '#ef4444', background: 'var(--bg-color)', borderRadius: 6, border: '1px solid var(--border-light)', cursor: 'pointer' }}
                      title="Delete Student"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL: ADD STUDENT */}
      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: 20 }}>
          <div className="table-card animate-fade-in" style={{ width: '100%', maxWidth: 640, padding: 28, background: 'var(--card-bg)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Add New Student</h3>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
            </div>

            <form onSubmit={handleSaveAdd} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Full Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Ali Raza"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Roll Number / ID</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. NUST-CS-2024-001"
                    value={formData.rollNo}
                    onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
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
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Student Phone</label>
                  <input 
                    type="text" 
                    placeholder="+92 333 1234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Section</label>
                  <input 
                    type="text" 
                    placeholder="e.g. CS-4A"
                    value={formData.section}
                    onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Semester</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 4th Semester"
                    value={formData.semester}
                    onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Enrolled Subjects</label>
                <input 
                  type="text" 
                  placeholder="e.g. Advanced Web Design, Data Structures, AI"
                  value={formData.subjects}
                  onChange={(e) => setFormData({ ...formData, subjects: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Campus Branch</label>
                  <select
                    value={formData.campusId}
                    onChange={(e) => setFormData({ ...formData, campusId: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  >
                    {campus_branches.map(b => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Enrollment Status</label>
                  <select
                    value={formData.enrollmentStatus}
                    onChange={(e) => setFormData({ ...formData, enrollmentStatus: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Graduated">Graduated</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, paddingTop: 8, borderTop: '1px solid var(--border-light)' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Guardian Name</label>
                  <input 
                    type="text" 
                    placeholder="Father / Guardian Name"
                    value={formData.guardianName}
                    onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Guardian Phone</label>
                  <input 
                    type="text" 
                    placeholder="+92 300 1234567"
                    value={formData.guardianPhone}
                    onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 12 }}>
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
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

      {/* MODAL: EDIT STUDENT */}
      {editingStudent && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: 20 }}>
          <div className="table-card animate-fade-in" style={{ width: '100%', maxWidth: 640, padding: 28, background: 'var(--card-bg)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Edit Student Record</h3>
              <button onClick={() => setEditingStudent(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
            </div>

            <form onSubmit={handleSaveEdit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Roll Number</label>
                  <input 
                    type="text" 
                    required
                    value={formData.rollNo}
                    onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Email</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Phone</label>
                  <input 
                    type="text" 
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Program</label>
                  <input 
                    type="text" 
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Section</label>
                  <input 
                    type="text" 
                    value={formData.section}
                    onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Semester</label>
                  <input 
                    type="text" 
                    value={formData.semester}
                    onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Enrolled Subjects</label>
                <input 
                  type="text" 
                  value={formData.subjects}
                  onChange={(e) => setFormData({ ...formData, subjects: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Status</label>
                  <select
                    value={formData.enrollmentStatus}
                    onChange={(e) => setFormData({ ...formData, enrollmentStatus: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Graduated">Graduated</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Guardian Name</label>
                  <input 
                    type="text" 
                    value={formData.guardianName}
                    onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 12 }}>
                <button 
                  type="button" 
                  onClick={() => setEditingStudent(null)}
                  style={{ padding: '10px 18px', background: 'var(--bg-color)', border: '1px solid var(--border-strong)', borderRadius: 8, color: 'var(--text-main)', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  style={{ padding: '10px 24px', background: 'var(--primary)', color: '#fff', borderRadius: 8, fontWeight: 600, border: 'none', cursor: 'pointer' }}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DRAWER / MODAL: VIEW STUDENT DETAILS */}
      {viewingStudent && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: 20 }}>
          <div className="table-card animate-fade-in" style={{ width: '100%', maxWidth: 540, padding: 32, background: 'var(--card-bg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <img src={viewingStudent.avatar} alt={viewingStudent.name} style={{ width: 56, height: 56, borderRadius: '50%', border: '2px solid var(--primary)' }} />
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.3rem' }}>{viewingStudent.name}</h2>
                  <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600 }}>{viewingStudent.rollNo}</span>
                </div>
              </div>
              <button onClick={() => setViewingStudent(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, background: 'var(--bg-color)', padding: 20, borderRadius: 12, border: '1px solid var(--border-light)' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Class / Program</span>
                <div style={{ fontWeight: 600, color: 'var(--text-heading)', marginTop: 2 }}>{viewingStudent.program}</div>
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Section & Semester</span>
                <div style={{ fontWeight: 600, color: 'var(--text-heading)', marginTop: 2 }}>{viewingStudent.section} • {viewingStudent.semester}</div>
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Campus Branch</span>
                <div style={{ fontWeight: 600, color: 'var(--text-heading)', marginTop: 2 }}>{viewingStudent.campusName}</div>
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Enrollment Status</span>
                <div style={{ marginTop: 2 }}>
                  <span className={`status-pill ${viewingStudent.enrollmentStatus === 'Active' ? 'completed' : 'inprogress'}`}>{viewingStudent.enrollmentStatus}</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 20 }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>Enrolled Subjects</span>
              <div style={{ padding: '10px 14px', background: 'var(--bg-color)', borderRadius: 8, border: '1px solid var(--border-light)', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                {viewingStudent.subjects}
              </div>
            </div>

            <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, borderTop: '1px solid var(--border-light)', paddingTop: 16 }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Father / Guardian</span>
                <div style={{ fontWeight: 600, color: 'var(--text-heading)', marginTop: 2 }}>{viewingStudent.guardianName || 'N/A'}</div>
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Guardian Contact</span>
                <div style={{ fontWeight: 600, color: 'var(--primary)', marginTop: 2 }}>{viewingStudent.guardianPhone || 'N/A'}</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
              <button 
                onClick={() => setViewingStudent(null)}
                style={{ padding: '10px 24px', background: 'var(--primary)', color: '#fff', borderRadius: 8, fontWeight: 600, border: 'none', cursor: 'pointer' }}
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
