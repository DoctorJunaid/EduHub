import React, { useState } from 'react';
import { BookOpen, Plus, Trash2 } from 'lucide-react';
import { getCampusFullData, addExamSchedule, deleteExamSchedule } from '../../data/mockData';

export default function CampusExamSchedules({ user }) {
  const campusId = user?.profile?.campusId || 'camp_1';
  const [dataVersion, setDataVersion] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const campusData = getCampusFullData(campusId);
  const { exams = [], teachers = [] } = campusData || {};

  const [newExam, setNewExam] = useState({
    subject: '',
    examType: 'Midterm Exam',
    date: '2025-04-15',
    time: '10:00 AM - 01:00 PM',
    room: 'Main Examination Hall',
    invigilator: teachers[0]?.user?.name || 'Dr. Usman Khan',
    totalMarks: 100
  });

  const handleCreateExam = (e) => {
    e.preventDefault();
    if (!newExam.subject) return;
    addExamSchedule({ ...newExam, campusId });
    setShowModal(false);
    setNewExam({
      subject: '',
      examType: 'Midterm Exam',
      date: '2025-04-15',
      time: '10:00 AM - 01:00 PM',
      room: 'Main Examination Hall',
      invigilator: teachers[0]?.user?.name || 'Dr. Usman Khan',
      totalMarks: 100
    });
    setDataVersion(v => v + 1);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this exam datesheet record?')) {
      deleteExamSchedule(id);
      setDataVersion(v => v + 1);
    }
  };

  return (
    <div className="content-container animate-fade-in" style={{ gap: 24 }}>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Examination Datesheets & Schedules</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage midterm, final exams, test dates, and assigned invigilators.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          style={{ padding: '10px 20px', background: 'var(--primary)', color: '#fff', borderRadius: 8, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, border: 'none', cursor: 'pointer' }}
        >
          <Plus size={18} /> Schedule Exam
        </button>
      </div>

      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Subject & Exam Type</th>
              <th>Date & Time</th>
              <th>Exam Hall / Room</th>
              <th>Invigilator</th>
              <th>Total Marks</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {exams.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                  No examination routines scheduled for this campus.
                </td>
              </tr>
            )}
            {exams.map(exam => (
              <tr key={exam.id}>
                <td>
                  <div style={{ fontWeight: 600, color: 'var(--text-heading)', fontSize: '0.95rem' }}>{exam.subject}</div>
                  <span className="status-pill completed" style={{ fontSize: '0.75rem', padding: '2px 8px', marginTop: 4 }}>{exam.examType}</span>
                </td>
                <td>
                  <div style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.9rem' }}>{exam.date}</div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{exam.time}</span>
                </td>
                <td style={{ color: 'var(--text-main)', fontWeight: 500 }}>{exam.room}</td>
                <td>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-heading)' }}>{exam.invigilator}</span>
                </td>
                <td>
                  <span style={{ fontWeight: 600, color: 'var(--primary)' }}>{exam.totalMarks} pts</span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button 
                    onClick={() => handleDelete(exam.id)}
                    style={{ padding: '6px', color: '#ef4444', background: 'var(--bg-color)', border: '1px solid var(--border-light)', borderRadius: 6, cursor: 'pointer' }}
                    title="Delete exam entry"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: 20 }}>
          <div className="table-card animate-fade-in" style={{ width: '100%', maxWidth: 520, padding: 28, background: 'var(--card-bg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Schedule Exam</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
            </div>

            <form onSubmit={handleCreateExam} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Subject Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Artificial Intelligence"
                  value={newExam.subject}
                  onChange={(e) => setNewExam({ ...newExam, subject: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Exam Type</label>
                  <select
                    value={newExam.examType}
                    onChange={(e) => setNewExam({ ...newExam, examType: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  >
                    <option value="Midterm Exam">Midterm Exam</option>
                    <option value="Final Exam">Final Exam</option>
                    <option value="Practical / Viva">Practical / Viva</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Exam Date</label>
                  <input 
                    type="date" 
                    value={newExam.date}
                    onChange={(e) => setNewExam({ ...newExam, date: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Time Window</label>
                  <input 
                    type="text" 
                    value={newExam.time}
                    onChange={(e) => setNewExam({ ...newExam, time: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Total Marks</label>
                  <input 
                    type="number" 
                    value={newExam.totalMarks}
                    onChange={(e) => setNewExam({ ...newExam, totalMarks: Number(e.target.value) })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Hall / Room</label>
                  <input 
                    type="text" 
                    value={newExam.room}
                    onChange={(e) => setNewExam({ ...newExam, room: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Invigilator</label>
                  <input 
                    type="text" 
                    value={newExam.invigilator}
                    onChange={(e) => setNewExam({ ...newExam, invigilator: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 12 }}>
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  style={{ padding: '10px 18px', background: 'var(--bg-color)', border: '1px solid var(--border-strong)', borderRadius: 8, color: 'var(--text-main)', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  style={{ padding: '10px 20px', background: 'var(--primary)', color: '#fff', borderRadius: 8, fontWeight: 600, border: 'none', cursor: 'pointer' }}
                >
                  Confirm Exam
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
