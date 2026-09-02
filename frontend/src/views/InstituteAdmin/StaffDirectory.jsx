import React, { useState } from 'react';
import { Users, Filter, Plus, Edit2, Trash2, Search, Mail, Phone, BookOpen, GraduationCap, Building2 } from 'lucide-react';
import { teacher_profiles, users, campus_branches, addTeacher, updateTeacher, deleteTeacher } from '../../data/mockData';

export default function StaffDirectory({ user }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [dataVersion, setDataVersion] = useState(0);

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);

  const initialForm = {
    name: '',
    email: '',
    phone: '+92 300 ',
    department: 'Computer Science',
    designation: 'Associate Professor',
    qualification: 'Ph.D. in Computer Science',
    campusId: user?.profile?.campusId || 'camp_1',
    subjects: 'Advanced Web Design, Data Structures',
    status: 'Active'
  };

  const [formData, setFormData] = useState(initialForm);

  const isCampusManager = user?.role === 'campus_manager';
  const managerCampusId = user?.profile?.campusId;

  let allTeachers = teacher_profiles.map(tp => {
    const teacherUser = users.find(u => u.id === tp.userId);
    const campus = campus_branches.find(c => c.id === tp.campusId);
    return {
      ...tp,
      name: teacherUser?.name || 'Faculty Member',
      email: teacherUser?.email || 'faculty@eduhub.pk',
      avatar: teacherUser?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(teacherUser?.name || 'Faculty')}`,
      campusName: campus?.name || 'Main Campus'
    };
  });

  if (isCampusManager && managerCampusId) {
    allTeachers = allTeachers.filter(t => t.campusId === managerCampusId);
  }

  const filtered = allTeachers.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (t.department && t.department.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (t.designation && t.designation.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleOpenAdd = () => {
    setFormData(initialForm);
    setShowAddModal(true);
  };

  const handleOpenEdit = (teacher, e) => {
    e.stopPropagation();
    setEditingTeacher(teacher);
    setFormData({
      name: teacher.name,
      email: teacher.email,
      phone: teacher.phone || '',
      department: teacher.department || 'Computer Science',
      designation: teacher.designation || 'Lecturer',
      qualification: teacher.qualification || 'Masters',
      campusId: teacher.campusId || 'camp_1',
      subjects: teacher.subjects || '',
      status: teacher.status || 'Active'
    });
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to remove this faculty member?')) {
      deleteTeacher(id);
      setDataVersion(v => v + 1);
    }
  };

  const handleSaveAdd = (e) => {
    e.preventDefault();
    addTeacher(formData);
    setShowAddModal(false);
    setDataVersion(v => v + 1);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingTeacher || !editingTeacher.id) return;
    updateTeacher(editingTeacher.id, formData);
    setEditingTeacher(null);
    setDataVersion(v => v + 1);
  };

  return (
    <div className="content-container animate-fade-in" style={{ gap: 24 }}>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1>Faculty & Staff Directory</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage professors, lecturers, departments, and course assignments.</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          style={{ padding: '10px 20px', background: 'var(--primary)', color: '#fff', borderRadius: 8, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, border: 'none', cursor: 'pointer' }}
        >
          <Plus size={18} /> Add New Teacher
        </button>
      </div>

      <div className="table-card">
        <div className="table-header" style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div className="search-bar" style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--bg-color)', padding: '10px 16px', borderRadius: '8px', width: '320px', border: '1px solid var(--border-strong)' }}>
            <Search size={18} color="var(--text-muted)" />
            <input 
              type="text" 
              placeholder="Search by name, department, designation..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', color: 'var(--text-main)' }}
            />
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{filtered.length} faculty members registered</span>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Teacher / Faculty</th>
              <th>Designation & Qualification</th>
              <th>Department & Subjects</th>
              <th>Campus Branch</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>No faculty members found.</td>
              </tr>
            )}
            {filtered.map(t => (
              <tr key={t.id}>
                <td>
                  <div className="td-user">
                    <img src={t.avatar} alt={t.name} style={{ width: 42, height: 42, borderRadius: '50%' }} />
                    <div>
                      <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-heading)', display: 'block' }}>{t.name}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.email}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '0.9rem' }}>{t.designation}</div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 500 }}>{t.qualification}</span>
                </td>
                <td>
                  <div style={{ color: 'var(--text-main)', fontWeight: 500, fontSize: '0.9rem' }}>{t.department}</div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.subjects}</span>
                </td>
                <td style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{t.campusName}</td>
                <td>
                  <span className={`status-pill ${t.status === 'Active' ? 'completed' : 'inprogress'}`} style={{ padding: '6px 12px' }}>
                    {t.status || 'Active'}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', alignItems: 'center' }}>
                    <button 
                      onClick={(e) => handleOpenEdit(t, e)}
                      style={{ padding: 6, color: 'var(--primary)', background: 'var(--bg-color)', borderRadius: 6, border: '1px solid var(--border-light)', cursor: 'pointer' }}
                      title="Edit Faculty"
                    >
                      <Edit2 size={15} />
                    </button>
                    <button 
                      onClick={(e) => handleDelete(t.id, e)}
                      style={{ padding: 6, color: '#ef4444', background: 'var(--bg-color)', borderRadius: 6, border: '1px solid var(--border-light)', cursor: 'pointer' }}
                      title="Delete Faculty"
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

      {/* MODAL: ADD TEACHER */}
      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: 20 }}>
          <div className="table-card animate-fade-in" style={{ width: '100%', maxWidth: 600, padding: 28, background: 'var(--card-bg)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Add New Faculty Member</h3>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
            </div>

            <form onSubmit={handleSaveAdd} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Full Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Dr. Usman Khan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Email Address</label>
                  <input 
                    type="email" 
                    required
                    placeholder="usman.khan@nust.edu.pk"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Qualification</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Ph.D. Computer Science"
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
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
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Phone Number</label>
                  <input 
                    type="text" 
                    placeholder="+92 300 1234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Subjects Taught</label>
                <input 
                  type="text" 
                  placeholder="e.g. Advanced Web Design, Data Structures"
                  value={formData.subjects}
                  onChange={(e) => setFormData({ ...formData, subjects: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Assigned Campus</label>
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
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  >
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Visiting">Visiting</option>
                  </select>
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
                  Save Teacher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT TEACHER */}
      {editingTeacher && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: 20 }}>
          <div className="table-card animate-fade-in" style={{ width: '100%', maxWidth: 600, padding: 28, background: 'var(--card-bg)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Edit Faculty Member</h3>
              <button onClick={() => setEditingTeacher(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
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
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Qualification</label>
                  <input 
                    type="text" 
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
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
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Phone Number</label>
                  <input 
                    type="text" 
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Subjects Taught</label>
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
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  >
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Visiting">Visiting</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Assigned Campus</label>
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
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 12 }}>
                <button 
                  type="button" 
                  onClick={() => setEditingTeacher(null)}
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
    </div>
  );
}
