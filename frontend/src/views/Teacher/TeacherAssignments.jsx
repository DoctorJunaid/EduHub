import React, { useState } from 'react';
import { Plus, Search, Filter, FileText, CheckCircle2, Clock, Trash2, Edit2, Eye, ExternalLink } from 'lucide-react';
import { 
  assignments, submissions, student_profiles, users, 
  createAssignment, deleteAssignment, gradeSubmission 
} from '../../data/mockData';

export default function TeacherAssignments({ user }) {
  const teacherProfileId = user?.profile?.id || 'tp_1';
  const myCampusId = user?.profile?.campusId || 'camp_1';
  const [dataVersion, setDataVersion] = useState(0);

  // Selected assignment to view submissions
  const [selectedAsgId, setSelectedAsgId] = useState(assignments[0]?.id || 'asg_1');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [gradingSubmission, setGradingSubmission] = useState(null);

  const [newAsg, setNewAsg] = useState({
    title: '',
    subject: 'Advanced Web Design',
    section: 'CS-4A',
    description: '',
    totalMarks: 50,
    dueDate: '2026-09-15',
    campusId: myCampusId,
    teacherProfileId
  });

  const [gradeData, setGradeData] = useState({
    marks: '',
    feedback: ''
  });

  const myAssignments = assignments.filter(a => a.teacherProfileId === teacherProfileId);
  const selectedAsg = assignments.find(a => a.id === selectedAsgId) || myAssignments[0];
  const currentSubmissions = submissions.filter(s => s.assignmentId === selectedAsgId);

  const handleCreate = (e) => {
    e.preventDefault();
    createAssignment(newAsg);
    setShowCreateModal(false);
    setDataVersion(v => v + 1);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this assignment and its submissions?')) {
      deleteAssignment(id);
      if (selectedAsgId === id && myAssignments.length > 1) {
        setSelectedAsgId(myAssignments.find(a => a.id !== id)?.id);
      }
      setDataVersion(v => v + 1);
    }
  };

  const handleOpenGrade = (sub) => {
    setGradingSubmission(sub);
    setGradeData({
      marks: sub.marksObtained !== null ? sub.marksObtained : '',
      feedback: sub.feedback || ''
    });
  };

  const handleSaveGrade = (e) => {
    e.preventDefault();
    if (!gradingSubmission) return;
    gradeSubmission(gradingSubmission.id, gradeData.marks, gradeData.feedback);
    setGradingSubmission(null);
    setDataVersion(v => v + 1);
  };

  return (
    <div className="content-container animate-fade-in" style={{ gap: 24 }}>
      {/* Header */}
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1>Course Assignments & Evaluation</h1>
          <p style={{ color: 'var(--text-muted)' }}>Publish homework, track submissions, and evaluate student deliverables.</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          style={{ padding: '10px 18px', background: 'var(--primary)', color: '#fff', borderRadius: 'var(--r-sm)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, border: 'none', cursor: 'pointer' }}
        >
          <Plus size={16} /> Create Assignment
        </button>
      </div>

      {/* Assignment Picker Tabs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
        {myAssignments.map(asg => {
          const subs = submissions.filter(s => s.assignmentId === asg.id);
          const gradedCount = subs.filter(s => s.status === 'Graded').length;
          const isSelected = selectedAsgId === asg.id;

          return (
            <div 
              key={asg.id}
              onClick={() => setSelectedAsgId(asg.id)}
              style={{
                background: 'var(--card-bg)',
                padding: 20,
                borderRadius: 'var(--r-md)',
                border: `1px solid ${isSelected ? 'var(--primary)' : 'var(--border-strong)'}`,
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: isSelected ? '0 2px 8px rgba(5,150,105,0.1)' : 'none'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>{asg.subject} • Sec {asg.section}</span>
                <button 
                  onClick={(e) => { e.stopPropagation(); handleDelete(asg.id); }}
                  style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}
                  title="Delete Assignment"
                >
                  <Trash2 size={15} />
                </button>
              </div>
              <h3 style={{ margin: '8px 0 6px 0', fontSize: '1.05rem', color: 'var(--text-heading)' }}>{asg.title}</h3>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{asg.description.substring(0, 80)}...</p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--border-light)', fontSize: '0.8rem' }}>
                <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>Due: {asg.dueDate}</span>
                <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{subs.length} Submitted ({gradedCount} Graded)</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Submissions Table for Selected Assignment */}
      {selectedAsg && (
        <div className="table-card">
          <div className="table-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2>Submissions for "{selectedAsg.title}"</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '2px 0 0 0' }}>Max Marks: {selectedAsg.totalMarks} • Due Date: {selectedAsg.dueDate}</p>
            </div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{currentSubmissions.length} submissions received</span>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Student & Roll No</th>
                <th>Submission Content</th>
                <th>Submitted At</th>
                <th>Score / Total</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentSubmissions.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>No student submissions yet for this assignment.</td>
                </tr>
              )}
              {currentSubmissions.map(sub => {
                const sp = student_profiles.find(s => s.id === sub.studentProfileId);
                const studentUser = sp ? users.find(u => u.id === sp.userId) : null;

                return (
                  <tr key={sub.id}>
                    <td>
                      <div className="td-user">
                        <img src={studentUser?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(studentUser?.name || 'Student')}`} alt="" style={{ width: 36, height: 36, borderRadius: '50%' }} />
                        <div>
                          <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-heading)', display: 'block' }}>{studentUser?.name}</span>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{sp?.rollNo}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', maxWidth: 300 }}>{sub.submissionText}</div>
                      {sub.fileUrl && (
                        <a href={sub.fileUrl} target="_blank" rel="noreferrer" style={{ fontSize: '0.8rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                          <ExternalLink size={12} /> View Attached Deliverable
                        </a>
                      )}
                    </td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{sub.submittedAt}</td>
                    <td>
                      {sub.status === 'Graded' ? (
                        <span style={{ fontWeight: 700, color: 'var(--text-heading)' }}>
                          {sub.marksObtained} / {selectedAsg.totalMarks}
                        </span>
                      ) : (
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Ungraded</span>
                      )}
                    </td>
                    <td>
                      <span className={`status-pill ${sub.status === 'Graded' ? 'completed' : 'inprogress'}`}>
                        {sub.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button 
                        onClick={() => handleOpenGrade(sub)}
                        style={{ padding: '6px 14px', background: sub.status === 'Graded' ? 'var(--bg-color)' : 'var(--primary)', color: sub.status === 'Graded' ? 'var(--text-main)' : '#fff', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-full)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                      >
                        {sub.status === 'Graded' ? 'Edit Grade' : 'Grade Now'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL: CREATE ASSIGNMENT */}
      {showCreateModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: 20 }}>
          <div className="table-card animate-fade-in" style={{ width: '100%', maxWidth: 580, padding: 28, background: 'var(--card-bg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Create Assignment</h3>
              <button onClick={() => setShowCreateModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
            </div>

            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Midterm Project: State Flow & JWT"
                  value={newAsg.title}
                  onChange={e => setNewAsg({ ...newAsg, title: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Subject</label>
                  <select 
                    value={newAsg.subject} 
                    onChange={e => setNewAsg({ ...newAsg, subject: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  >
                    <option value="Advanced Web Design">Advanced Web Design</option>
                    <option value="Data Structures & Algorithms">Data Structures & Algorithms</option>
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Section</label>
                  <input 
                    type="text" 
                    value={newAsg.section}
                    onChange={e => setNewAsg({ ...newAsg, section: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Total Marks</label>
                  <input 
                    type="number" 
                    required
                    value={newAsg.totalMarks}
                    onChange={e => setNewAsg({ ...newAsg, totalMarks: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Due Date</label>
                  <input 
                    type="date" 
                    required
                    value={newAsg.dueDate}
                    onChange={e => setNewAsg({ ...newAsg, dueDate: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Description & Instructions</label>
                <textarea 
                  rows={3} 
                  required
                  placeholder="Requirements, rubric, and deliverables..."
                  value={newAsg.description}
                  onChange={e => setNewAsg({ ...newAsg, description: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 8 }}>
                <button 
                  type="button" 
                  onClick={() => setShowCreateModal(false)}
                  style={{ padding: '10px 18px', background: 'var(--bg-color)', border: '1px solid var(--border-strong)', borderRadius: 8, color: 'var(--text-main)', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  style={{ padding: '10px 24px', background: 'var(--primary)', color: '#fff', borderRadius: 8, fontWeight: 600, border: 'none', cursor: 'pointer' }}
                >
                  Save Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: GRADE SUBMISSION */}
      {gradingSubmission && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: 20 }}>
          <div className="table-card animate-fade-in" style={{ width: '100%', maxWidth: 540, padding: 28, background: 'var(--card-bg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Evaluate Submission</h3>
              <button onClick={() => setGradingSubmission(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
            </div>

            <div style={{ background: 'var(--bg-color)', padding: 16, borderRadius: 8, border: '1px solid var(--border-light)', marginBottom: 16 }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Student Submission Text:</span>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem', color: 'var(--text-main)' }}>{gradingSubmission.submissionText}</p>
              {gradingSubmission.fileUrl && (
                <a href={gradingSubmission.fileUrl} target="_blank" rel="noreferrer" style={{ fontSize: '0.8rem', color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 8 }}>
                  <ExternalLink size={12} /> Open Submitted File / Repo
                </a>
              )}
            </div>

            <form onSubmit={handleSaveGrade} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>
                  Marks Obtained (Max: {selectedAsg.totalMarks})
                </label>
                <input 
                  type="number" 
                  required
                  max={selectedAsg.totalMarks}
                  min={0}
                  placeholder={`0 - ${selectedAsg.totalMarks}`}
                  value={gradeData.marks}
                  onChange={e => setGradeData({ ...gradeData, marks: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Teacher Feedback & Remarks</label>
                <textarea 
                  rows={3} 
                  required
                  placeholder="Provide constructive feedback on code quality, design, and logic..."
                  value={gradeData.feedback}
                  onChange={e => setGradeData({ ...gradeData, feedback: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 8 }}>
                <button 
                  type="button" 
                  onClick={() => setGradingSubmission(null)}
                  style={{ padding: '10px 18px', background: 'var(--bg-color)', border: '1px solid var(--border-strong)', borderRadius: 8, color: 'var(--text-main)', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  style={{ padding: '10px 24px', background: 'var(--primary)', color: '#fff', borderRadius: 8, fontWeight: 600, border: 'none', cursor: 'pointer' }}
                >
                  Save & Publish Grade
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
