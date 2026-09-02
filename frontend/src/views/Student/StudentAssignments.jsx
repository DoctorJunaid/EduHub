import React, { useState } from 'react';
import { FileText, CheckCircle, Clock, CloudArrowUp, ArrowSquareOut, Medal } from '@phosphor-icons/react';
import { assignments, submissions, submitAssignment } from '../../data/mockData';

export default function StudentAssignments({ user }) {
  const studentProfileId = user?.profile?.id || 'sp_1';
  const myCampusId = user?.profile?.campusId || 'camp_1';
  const [dataVersion, setDataVersion] = useState(0);

  // Submit Modal state
  const [submittingAsg, setSubmittingAsg] = useState(null);
  const [submissionText, setSubmissionText] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [viewingGradeSub, setViewingGradeSub] = useState(null);

  const myAssignments = assignments.filter(a => a.campusId === myCampusId);
  const mySubmissions = submissions.filter(s => s.studentProfileId === studentProfileId);

  const handleOpenSubmit = (asg) => {
    const existing = mySubmissions.find(s => s.assignmentId === asg.id);
    setSubmittingAsg(asg);
    setSubmissionText(existing?.submissionText || '');
    setFileUrl(existing?.fileUrl || '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!submittingAsg) return;
    submitAssignment({
      assignmentId: submittingAsg.id,
      studentProfileId,
      submissionText,
      fileUrl
    });
    setSubmittingAsg(null);
    setDataVersion(v => v + 1);
  };

  return (
    <div className="content-container animate-fade-in" style={{ gap: 24 }}>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>My Assignments & Submissions</h1>
          <p style={{ color: 'var(--text-muted)' }}>Submit project deliverables, track review statuses, and view teacher grading remarks.</p>
        </div>
      </div>

      {/* Assignments Table */}
      <div className="table-card">
        <div className="table-header">
          <h2>Active Course Tasks & Homework</h2>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{myAssignments.length} total assignments</span>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Assignment Title & Subject</th>
              <th>Due Date</th>
              <th>Total Marks</th>
              <th>Submission Status</th>
              <th>Score / Feedback</th>
              <th style={{ textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {myAssignments.map(asg => {
              const sub = mySubmissions.find(s => s.assignmentId === asg.id);
              const isGraded = sub?.status === 'Graded';
              const isSubmitted = sub?.status === 'Submitted';

              return (
                <tr key={asg.id}>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-heading)', fontSize: '0.95rem' }}>{asg.title}</div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{asg.subject} • Sec {asg.section}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.88rem', color: 'var(--text-main)' }}>
                      <Clock size={14} color="var(--text-muted)" /> {asg.dueDate}
                    </div>
                  </td>
                  <td style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{asg.totalMarks} Pts</td>
                  <td>
                    <span className={`status-pill ${isGraded ? 'completed' : isSubmitted ? 'inprogress' : 'cancelled'}`}>
                      {sub ? sub.status : 'Pending Submission'}
                    </span>
                  </td>
                  <td>
                    {isGraded ? (
                      <span style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '0.95rem' }}>
                        {sub.marksObtained} / {asg.totalMarks}
                      </span>
                    ) : isSubmitted ? (
                      <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Awaiting Grading</span>
                    ) : (
                      <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Not Submitted</span>
                    )}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                      {isGraded ? (
                        <button 
                          onClick={() => setViewingGradeSub({ asg, sub })}
                          style={{ padding: '6px 14px', background: 'var(--bg-color)', color: 'var(--text-heading)', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-full)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                        >
                          View Feedback
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleOpenSubmit(asg)}
                          style={{ padding: '6px 14px', background: isSubmitted ? 'var(--bg-color)' : 'var(--primary)', color: isSubmitted ? 'var(--text-heading)' : '#fff', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-full)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                        >
                          {isSubmitted ? 'Edit Submission' : 'Submit Now'}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* MODAL: SUBMIT ASSIGNMENT */}
      {submittingAsg && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: 20 }}>
          <div className="table-card animate-fade-in" style={{ width: '100%', maxWidth: 560, padding: 28, background: 'var(--card-bg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Submit: {submittingAsg.title}</h3>
                <p style={{ margin: '2px 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Due: {submittingAsg.dueDate} • Total Marks: {submittingAsg.totalMarks}</p>
              </div>
              <button onClick={() => setSubmittingAsg(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
            </div>

            <div style={{ background: 'var(--bg-color)', padding: 14, borderRadius: 8, border: '1px solid var(--border-light)', marginBottom: 16 }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, display: 'block' }}>TASK INSTRUCTIONS</span>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.4 }}>{submittingAsg.description}</p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Submission Notes & Answers</label>
                <textarea 
                  rows={4}
                  required
                  placeholder="Paste your solution notes, explanation, or GitHub repository URL..."
                  value={submissionText}
                  onChange={e => setSubmissionText(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Deliverable URL / Cloud Attachment</label>
                <input 
                  type="text" 
                  placeholder="https://drive.google.com/... or github.com/..."
                  value={fileUrl}
                  onChange={e => setFileUrl(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 8 }}>
                <button 
                  type="button" 
                  onClick={() => setSubmittingAsg(null)}
                  style={{ padding: '10px 18px', background: 'var(--bg-color)', border: '1px solid var(--border-strong)', borderRadius: 8, color: 'var(--text-main)', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  style={{ padding: '10px 24px', background: 'var(--primary)', color: '#fff', borderRadius: 8, fontWeight: 600, border: 'none', cursor: 'pointer' }}
                >
                  Turn In Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: VIEW GRADE FEEDBACK */}
      {viewingGradeSub && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: 20 }}>
          <div className="table-card animate-fade-in" style={{ width: '100%', maxWidth: 520, padding: 28, background: 'var(--card-bg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Grading Result</h3>
                <p style={{ margin: '2px 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{viewingGradeSub.asg.title}</p>
              </div>
              <button onClick={() => setViewingGradeSub(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
            </div>

            <div style={{ background: 'var(--bg-color)', padding: 18, borderRadius: 10, border: '1px solid var(--border-light)', textAlign: 'center', marginBottom: 16 }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Score Obtained</span>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', margin: '4px 0' }}>
                {viewingGradeSub.sub.marksObtained} / {viewingGradeSub.asg.totalMarks}
              </div>
              <span className="status-pill completed">Graded & Verified</span>
            </div>

            <div style={{ background: 'var(--bg-color)', padding: 16, borderRadius: 8, border: '1px solid var(--border-light)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, display: 'block', marginBottom: 4 }}>INSTRUCTOR FEEDBACK</span>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                {viewingGradeSub.sub.feedback || 'Good effort and clean submission.'}
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
              <button 
                onClick={() => setViewingGradeSub(null)}
                style={{ padding: '9px 20px', background: 'var(--primary)', color: '#fff', borderRadius: 8, fontWeight: 600, border: 'none', cursor: 'pointer' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
