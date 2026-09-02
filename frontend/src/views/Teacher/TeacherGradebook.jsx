import React, { useState } from 'react';
import { Medal, Plus, PencilSimple, FloppyDisk, Check, Faders } from '@phosphor-icons/react';
import { 
  student_profiles, users, student_performance, recordStudentGrade, 
  class_schedules 
} from '../../data/mockData';

export default function TeacherGradebook({ user }) {
  const teacherProfileId = user?.profile?.id || 'tp_1';
  const myCampusId = user?.profile?.campusId || 'camp_1';
  const [dataVersion, setDataVersion] = useState(0);

  const myClasses = class_schedules.filter(c => c.teacherProfileId === teacherProfileId);
  const [selectedSubject, setSelectedSubject] = useState(myClasses[0]?.subject || 'Advanced Web Design');
  const [selectedSemester, setSelectedSemester] = useState('Fall 2025');

  // Modal state for entering / editing marks
  const [editingRecord, setEditingRecord] = useState(null);
  const [formData, setFormData] = useState({
    studentProfileId: '',
    marks: '',
    totalMarks: 100,
    remarks: ''
  });

  const enrolledStudents = student_profiles.filter(s => s.campusId === myCampusId);

  const handleOpenGrade = (student) => {
    const existing = student_performance.find(p => p.studentProfileId === student.id && p.subject === selectedSubject);
    setEditingRecord(student);
    setFormData({
      studentProfileId: student.id,
      marks: existing ? existing.marks : '',
      totalMarks: existing ? existing.totalMarks : 100,
      remarks: existing ? existing.remarks : ''
    });
  };

  const handleSaveGrade = (e) => {
    e.preventDefault();
    if (!editingRecord) return;
    recordStudentGrade({
      studentProfileId: editingRecord.id,
      campusId: myCampusId,
      subject: selectedSubject,
      marks: formData.marks,
      totalMarks: formData.totalMarks,
      remarks: formData.remarks,
      semester: selectedSemester
    });
    setEditingRecord(null);
    setDataVersion(v => v + 1);
  };

  return (
    <div className="content-container animate-fade-in" style={{ gap: 24 }}>
      {/* Header */}
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1>Exam Gradebook & Marks Entry</h1>
          <p style={{ color: 'var(--text-muted)' }}>Input midterm, final, and sessional scores. Calculate letter grades and transcripts.</p>
        </div>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div>
            <select 
              value={selectedSubject} 
              onChange={e => setSelectedSubject(e.target.value)}
              style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)', fontWeight: 600 }}
            >
              <option value="Advanced Web Design">Advanced Web Design</option>
              <option value="Data Structures">Data Structures</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
            </select>
          </div>

          <div>
            <select 
              value={selectedSemester} 
              onChange={e => setSelectedSemester(e.target.value)}
              style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)', fontWeight: 600 }}
            >
              <option value="Fall 2025">Fall 2025</option>
              <option value="Spring 2026">Spring 2026</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grade Sheet Table */}
      <div className="table-card">
        <div className="table-header">
          <div>
            <h2>{selectedSubject} Grade Sheet</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '2px 0 0 0' }}>Term: {selectedSemester} • Evaluation Scheme (Out of 100)</p>
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{enrolledStudents.length} students enrolled</span>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Student Name & Roll No</th>
              <th>Program & Section</th>
              <th>Marks Obtained</th>
              <th>Letter Grade</th>
              <th>GPA Point</th>
              <th>Teacher Remarks</th>
              <th style={{ textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {enrolledStudents.map(student => {
              const studentUser = users.find(u => u.id === student.userId);
              const perf = student_performance.find(p => p.studentProfileId === student.id && p.subject === selectedSubject);

              return (
                <tr key={student.id}>
                  <td>
                    <div className="td-user">
                      <img src={studentUser?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(studentUser?.name || 'Student')}`} alt="" style={{ width: 36, height: 36, borderRadius: '50%' }} />
                      <div>
                        <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-heading)', display: 'block' }}>{studentUser?.name}</span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{student.rollNo}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ color: 'var(--text-main)', fontWeight: 500 }}>{student.program}</div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Sec: {student.section}</span>
                  </td>
                  <td>
                    {perf ? (
                      <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-heading)' }}>
                        {perf.marks} / {perf.totalMarks}
                      </span>
                    ) : (
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Not Entered</span>
                    )}
                  </td>
                  <td>
                    {perf ? (
                      <span className={`status-pill ${perf.grade.startsWith('A') ? 'completed' : perf.grade === 'B' ? 'inprogress' : 'cancelled'}`} style={{ padding: '4px 10px' }}>
                        {perf.grade}
                      </span>
                    ) : (
                      <span style={{ color: 'var(--text-muted)' }}>—</span>
                    )}
                  </td>
                  <td>
                    {perf ? (
                      <span style={{ fontWeight: 700, color: 'var(--text-heading)' }}>{perf.gpa.toFixed(2)}</span>
                    ) : (
                      <span style={{ color: 'var(--text-muted)' }}>—</span>
                    )}
                  </td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem', maxWidth: 240 }}>
                    {perf?.remarks || '—'}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button 
                      onClick={() => handleOpenGrade(student)}
                      style={{ padding: '6px 14px', background: perf ? 'var(--bg-color)' : 'var(--primary)', color: perf ? 'var(--text-main)' : '#fff', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-full)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                    >
                      {perf ? 'Edit Marks' : 'Enter Marks'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* MODAL: ENTER / EDIT MARKS */}
      {editingRecord && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: 20 }}>
          <div className="table-card animate-fade-in" style={{ width: '100%', maxWidth: 520, padding: 28, background: 'var(--card-bg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Record Exam Marks</h3>
                <p style={{ margin: '2px 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Student: {users.find(u => u.id === editingRecord.userId)?.name} ({editingRecord.rollNo})</p>
              </div>
              <button onClick={() => setEditingRecord(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
            </div>

            <form onSubmit={handleSaveGrade} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Marks Obtained</label>
                  <input 
                    type="number" 
                    required
                    min={0}
                    max={formData.totalMarks}
                    placeholder="0 - 100"
                    value={formData.marks}
                    onChange={e => setFormData({ ...formData, marks: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Total Marks</label>
                  <input 
                    type="number" 
                    required
                    value={formData.totalMarks}
                    onChange={e => setFormData({ ...formData, totalMarks: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Transcript Remarks</label>
                <textarea 
                  rows={3} 
                  required
                  placeholder="e.g. Excellent project implementation, strong grasp of concepts..."
                  value={formData.remarks}
                  onChange={e => setFormData({ ...formData, remarks: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 8 }}>
                <button 
                  type="button" 
                  onClick={() => setEditingRecord(null)}
                  style={{ padding: '10px 18px', background: 'var(--bg-color)', border: '1px solid var(--border-strong)', borderRadius: 8, color: 'var(--text-main)', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  style={{ padding: '10px 24px', background: 'var(--primary)', color: '#fff', borderRadius: 8, fontWeight: 600, border: 'none', cursor: 'pointer' }}
                >
                  FloppyDisk to Gradebook
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
