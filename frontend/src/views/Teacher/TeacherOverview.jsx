import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, Calendar, Clock, CheckCircle2, AlertCircle, 
  FileText, Users, Plus, Award, ArrowRight, UserCheck, BookMarked 
} from 'lucide-react';
import { 
  class_schedules, assignments, submissions, attendance, 
  daily_diary, student_profiles, users, createAssignment, addDailyDiary 
} from '../../data/mockData';

export default function TeacherOverview({ user }) {
  const navigate = useNavigate();
  const teacherProfileId = user?.profile?.id || 'tp_1';
  const myCampusId = user?.profile?.campusId || 'camp_1';

  // State for quick modals
  const [showAddAsgModal, setShowAddAsgModal] = useState(false);
  const [showAddDiaryModal, setShowAddDiaryModal] = useState(false);
  const [dataVersion, setDataVersion] = useState(0);

  const [asgForm, setAsgForm] = useState({
    title: '',
    subject: 'Advanced Web Design',
    section: 'CS-4A',
    description: '',
    totalMarks: 50,
    dueDate: '2026-09-12',
    campusId: myCampusId,
    teacherProfileId
  });

  const [diaryForm, setDiaryForm] = useState({
    subject: 'Advanced Web Design',
    section: 'CS-4A',
    topic: '',
    summary: '',
    homework: '',
    resources: '',
    campusId: myCampusId,
    teacherProfileId
  });

  const mySchedules = class_schedules.filter(s => s.teacherProfileId === teacherProfileId);
  const myAssignments = assignments.filter(a => a.teacherProfileId === teacherProfileId);
  const pendingSubmissions = submissions.filter(s => s.status === 'Submitted');
  const myStudents = student_profiles.filter(sp => sp.campusId === myCampusId);
  const recentDiary = daily_diary.filter(d => d.teacherProfileId === teacherProfileId);

  const handleCreateAssignment = (e) => {
    e.preventDefault();
    createAssignment(asgForm);
    setShowAddAsgModal(false);
    setAsgForm({
      title: '',
      subject: 'Advanced Web Design',
      section: 'CS-4A',
      description: '',
      totalMarks: 50,
      dueDate: '2026-09-12',
      campusId: myCampusId,
      teacherProfileId
    });
    setDataVersion(v => v + 1);
  };

  const handleAddDiary = (e) => {
    e.preventDefault();
    addDailyDiary(diaryForm);
    setShowAddDiaryModal(false);
    setDiaryForm({
      subject: 'Advanced Web Design',
      section: 'CS-4A',
      topic: '',
      summary: '',
      homework: '',
      resources: '',
      campusId: myCampusId,
      teacherProfileId
    });
    setDataVersion(v => v + 1);
  };

  return (
    <div className="content-container animate-stagger">
      {/* Page Header */}
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1>Faculty Portal & Class Hub</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>Welcome back, {user?.name}. Manage your courses, grading, attendance, and daily diaries.</p>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button 
            onClick={() => setShowAddAsgModal(true)}
            style={{ padding: '10px 18px', background: 'var(--primary)', color: '#fff', borderRadius: 'var(--r-sm)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, border: 'none', cursor: 'pointer' }}
          >
            <Plus size={16} /> New Assignment
          </button>
          <button 
            onClick={() => setShowAddDiaryModal(true)}
            style={{ padding: '10px 18px', background: 'var(--card-bg)', color: 'var(--text-heading)', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-sm)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
          >
            <BookMarked size={16} /> Post Daily Diary
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="course-grid">
        <div className="c-card" onClick={() => navigate('/dashboard/classes')} style={{ cursor: 'pointer' }}>
          <h3>Assigned Courses</h3>
          <div className="c-card-stat">{mySchedules.length}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)' }}>
            <Calendar size={18} />
            <span style={{ fontSize: '0.85rem' }}>Active teaching sections</span>
          </div>
        </div>

        <div className="c-card" onClick={() => navigate('/dashboard/assignments')} style={{ cursor: 'pointer' }}>
          <h3>Pending Submissions</h3>
          <div className="c-card-stat">{pendingSubmissions.length}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)' }}>
            <FileText size={18} />
            <span style={{ fontSize: '0.85rem' }}>Awaiting evaluation</span>
          </div>
        </div>

        <div className="c-card" onClick={() => navigate('/dashboard/attendance')} style={{ cursor: 'pointer' }}>
          <h3>Enrolled Students</h3>
          <div className="c-card-stat">{myStudents.length}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)' }}>
            <Users size={18} />
            <span style={{ fontSize: '0.85rem' }}>Under your mentorship</span>
          </div>
        </div>

        <div className="c-card" onClick={() => navigate('/dashboard/diary')} style={{ cursor: 'pointer' }}>
          <h3>Daily Diaries Posted</h3>
          <div className="c-card-stat">{recentDiary.length}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)' }}>
            <BookMarked size={18} />
            <span style={{ fontSize: '0.85rem' }}>Lecture summaries shared</span>
          </div>
        </div>
      </div>

      {/* Quick Action Navigation Buttons */}
      <div style={{ display: 'flex', gap: 16, marginTop: -8, marginBottom: 8, flexWrap: 'wrap' }}>
        <button 
          onClick={() => navigate('/dashboard/assignments')}
          style={{ flex: 1, minWidth: 200, padding: '14px', background: 'var(--card-bg)', border: '1px dashed var(--border-strong)', borderRadius: 'var(--r-md)', fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer' }}
        >
          <span>+</span> Assignments & Grading
        </button>
        <button 
          onClick={() => navigate('/dashboard/attendance')}
          style={{ flex: 1, minWidth: 200, padding: '14px', background: 'var(--card-bg)', border: '1px dashed var(--border-strong)', borderRadius: 'var(--r-md)', fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer' }}
        >
          <span>+</span> Take Student Attendance
        </button>
        <button 
          onClick={() => navigate('/dashboard/diary')}
          style={{ flex: 1, minWidth: 200, padding: '14px', background: 'var(--card-bg)', border: '1px dashed var(--border-strong)', borderRadius: 'var(--r-md)', fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer' }}
        >
          <span>+</span> Daily Lecture Diary
        </button>
        <button 
          onClick={() => navigate('/dashboard/gradebook')}
          style={{ flex: 1, minWidth: 200, padding: '14px', background: 'var(--card-bg)', border: '1px dashed var(--border-strong)', borderRadius: 'var(--r-md)', fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer' }}
        >
          <span>+</span> Exam Marks & Gradebook
        </button>
      </div>

      {/* Teaching Schedule Table */}
      <div className="table-card">
        <div className="table-header">
          <div>
            <h2>My Teaching Schedule & Classes</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '2px 0 0 0' }}>Assigned weekly lectures and room allocations</p>
          </div>
          <button 
            onClick={() => navigate('/dashboard/attendance')}
            style={{ padding: '6px 14px', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-full)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', background: 'var(--card-bg)' }}
          >
            Mark Attendance Now →
          </button>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Course / Subject</th>
              <th>Section / Batch</th>
              <th>Day & Time Routine</th>
              <th>Room / Lab</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mySchedules.map(cs => (
              <tr key={cs.id}>
                <td>
                  <div style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{cs.subject}</div>
                </td>
                <td>
                  <span style={{ fontWeight: 500, color: 'var(--text-main)' }}>Section {cs.section}</span>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.9rem', color: 'var(--text-main)' }}>
                    <Clock size={14} color="var(--text-muted)" /> {cs.day}, {cs.time}
                  </div>
                </td>
                <td style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{cs.room}</td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                    <button 
                      onClick={() => navigate('/dashboard/attendance')}
                      style={{ padding: '6px 12px', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-full)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', background: 'var(--bg-color)', cursor: 'pointer' }}
                    >
                      Attendance
                    </button>
                    <button 
                      onClick={() => navigate('/dashboard/diary')}
                      style={{ padding: '6px 12px', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-full)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', background: 'var(--bg-color)', cursor: 'pointer' }}
                    >
                      Diary
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pending Student Submissions Table */}
      <div className="table-card">
        <div className="table-header">
          <div>
            <h2>Pending Assignment Submissions</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '2px 0 0 0' }}>Review and grade student deliverables</p>
          </div>
          <button 
            onClick={() => navigate('/dashboard/assignments')}
            style={{ padding: '6px 14px', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-full)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', background: 'var(--card-bg)' }}
          >
            All Submissions →
          </button>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Assignment Title</th>
              <th>Submission Date</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Grade</th>
            </tr>
          </thead>
          <tbody>
            {pendingSubmissions.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: 32, color: 'var(--text-muted)' }}>All submissions have been evaluated!</td>
              </tr>
            )}
            {pendingSubmissions.map(sub => {
              const asg = assignments.find(a => a.id === sub.assignmentId);
              const sp = student_profiles.find(s => s.id === sub.studentProfileId);
              const studentUser = sp ? users.find(u => u.id === sp.userId) : null;

              return (
                <tr key={sub.id}>
                  <td>
                    <div className="td-user">
                      <img src={studentUser?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(studentUser?.name || 'Student')}`} alt="" style={{ width: 34, height: 34, borderRadius: '50%' }} />
                      <div>
                        <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-heading)' }}>{studentUser?.name}</span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>{sp?.rollNo}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{asg?.title}</div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{asg?.subject}</span>
                  </td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{sub.submittedAt}</td>
                  <td>
                    <span className="status-pill inprogress">Needs Grading</span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button 
                      onClick={() => navigate('/dashboard/assignments')}
                      style={{ padding: '6px 14px', background: 'var(--primary)', color: '#fff', borderRadius: 'var(--r-full)', fontSize: '0.8rem', fontWeight: 600, border: 'none', cursor: 'pointer' }}
                    >
                      Evaluate
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* MODAL: CREATE ASSIGNMENT */}
      {showAddAsgModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: 20 }}>
          <div className="table-card animate-fade-in" style={{ width: '100%', maxWidth: 560, padding: 28, background: 'var(--card-bg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Create New Assignment</h3>
              <button onClick={() => setShowAddAsgModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
            </div>

            <form onSubmit={handleCreateAssignment} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Assignment Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Redux Toolkit State Flow & Async Thunks"
                  value={asgForm.title}
                  onChange={e => setAsgForm({ ...asgForm, title: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Subject</label>
                  <select 
                    value={asgForm.subject} 
                    onChange={e => setAsgForm({ ...asgForm, subject: e.target.value })}
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
                    value={asgForm.section}
                    onChange={e => setAsgForm({ ...asgForm, section: e.target.value })}
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
                    value={asgForm.totalMarks}
                    onChange={e => setAsgForm({ ...asgForm, totalMarks: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Submission Deadline</label>
                  <input 
                    type="date" 
                    required
                    value={asgForm.dueDate}
                    onChange={e => setAsgForm({ ...asgForm, dueDate: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Instructions & Requirements</label>
                <textarea 
                  rows={3}
                  required
                  placeholder="Enter detailed guidelines for the students..."
                  value={asgForm.description}
                  onChange={e => setAsgForm({ ...asgForm, description: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 8 }}>
                <button 
                  type="button" 
                  onClick={() => setShowAddAsgModal(false)}
                  style={{ padding: '10px 18px', background: 'var(--bg-color)', border: '1px solid var(--border-strong)', borderRadius: 8, color: 'var(--text-main)', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  style={{ padding: '10px 24px', background: 'var(--primary)', color: '#fff', borderRadius: 8, fontWeight: 600, border: 'none', cursor: 'pointer' }}
                >
                  Publish Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: POST DAILY DIARY */}
      {showAddDiaryModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: 20 }}>
          <div className="table-card animate-fade-in" style={{ width: '100%', maxWidth: 560, padding: 28, background: 'var(--card-bg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Post Today's Class Diary</h3>
              <button onClick={() => setShowAddDiaryModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
            </div>

            <form onSubmit={handleAddDiary} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Subject</label>
                  <select 
                    value={diaryForm.subject} 
                    onChange={e => setDiaryForm({ ...diaryForm, subject: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  >
                    <option value="Advanced Web Design">Advanced Web Design</option>
                    <option value="Data Structures & Algorithms">Data Structures & Algorithms</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Section</label>
                  <input 
                    type="text" 
                    value={diaryForm.section}
                    onChange={e => setDiaryForm({ ...diaryForm, section: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Lecture Topic Covered</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Asynchronous JavaScript & Promises"
                  value={diaryForm.topic}
                  onChange={e => setDiaryForm({ ...diaryForm, topic: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Class Summary</label>
                <textarea 
                  rows={2}
                  placeholder="Key concepts discussed in class..."
                  value={diaryForm.summary}
                  onChange={e => setDiaryForm({ ...diaryForm, summary: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Homework / Practice Task</label>
                <textarea 
                  rows={2}
                  required
                  placeholder="Assigned tasks for students to practice at home..."
                  value={diaryForm.homework}
                  onChange={e => setDiaryForm({ ...diaryForm, homework: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 8 }}>
                <button 
                  type="button" 
                  onClick={() => setShowAddDiaryModal(false)}
                  style={{ padding: '10px 18px', background: 'var(--bg-color)', border: '1px solid var(--border-strong)', borderRadius: 8, color: 'var(--text-main)', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  style={{ padding: '10px 24px', background: 'var(--primary)', color: '#fff', borderRadius: 8, fontWeight: 600, border: 'none', cursor: 'pointer' }}
                >
                  Post Diary Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
