import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, Calendar, Clock, CheckCircle2, AlertCircle, 
  FileText, Award, CreditCard, BookMarked, ArrowRight, User 
} from 'lucide-react';
import { 
  class_schedules, attendance, assignments, submissions, 
  student_performance, fee_records, daily_diary, teacher_profiles, users 
} from '../../data/mockData';

export default function StudentOverview({ user }) {
  const navigate = useNavigate();
  const studentProfile = user?.profile;
  const studentProfileId = studentProfile?.id || 'sp_1';
  const myCampusId = studentProfile?.campusId || 'camp_1';

  // Academic Records
  const myCourses = class_schedules.filter(cs => cs.campusId === myCampusId);
  const myAttendance = attendance.filter(a => a.studentProfileId === studentProfileId);
  const myAssignments = assignments.filter(a => a.campusId === myCampusId);
  const mySubmissions = submissions.filter(s => s.studentProfileId === studentProfileId);
  const myGrades = student_performance.filter(p => p.studentProfileId === studentProfileId);
  const myFees = fee_records.filter(f => f.studentProfileId === studentProfileId);
  const myDiaries = daily_diary.filter(d => d.campusId === myCampusId);

  // Stats calculation
  const totalClasses = myAttendance.length;
  const presentClasses = myAttendance.filter(a => a.status === 'Present').length;
  const attendanceRate = totalClasses > 0 ? Math.round((presentClasses / totalClasses) * 100) : 95;

  const totalGpa = myGrades.length > 0 
    ? (myGrades.reduce((sum, g) => sum + g.gpa, 0) / myGrades.length).toFixed(2) 
    : '3.85';

  const pendingAssignments = myAssignments.filter(a => {
    const sub = mySubmissions.find(s => s.assignmentId === a.id);
    return !sub;
  });

  const unpaidFee = myFees.find(f => f.status === 'Pending' || f.status === 'Overdue');

  return (
    <div className="content-container animate-stagger">
      {/* Student Banner Header */}
      <div className="table-card" style={{ padding: '24px 28px', background: 'var(--card-bg)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <img 
              src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'Student')}`} 
              alt={user?.name} 
              style={{ width: 60, height: 60, borderRadius: '50%', border: '2px solid var(--border-strong)' }} 
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-heading)' }}>{user?.name || 'Ali Raza'}</h1>
                <span className="status-pill completed" style={{ fontSize: '0.75rem', padding: '2px 10px' }}>Active Student</span>
              </div>
              <p style={{ margin: '4px 0 0 0', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                <strong style={{ color: 'var(--text-main)' }}>{studentProfile?.rollNo || 'NUST-CS-2023-042'}</strong> • {studentProfile?.program || 'BS Computer Science'} ({studentProfile?.section || 'CS-4A'}) • {studentProfile?.semester || '4th Semester'}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button 
              onClick={() => navigate('/dashboard/assignments')}
              style={{ padding: '9px 18px', background: 'var(--primary)', color: '#fff', borderRadius: 'var(--r-sm)', fontWeight: 600, border: 'none', cursor: 'pointer', fontSize: '0.85rem' }}
            >
              My Assignments
            </button>
            <button 
              onClick={() => navigate('/dashboard/fees')}
              style={{ padding: '9px 18px', background: 'var(--bg-color)', color: 'var(--text-heading)', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-sm)', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem' }}
            >
              Fee Challans
            </button>
          </div>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="course-grid">
        <div className="c-card" onClick={() => navigate('/dashboard/courses')} style={{ cursor: 'pointer' }}>
          <h3>Enrolled Courses</h3>
          <div className="c-card-stat">{myCourses.length}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)' }}>
            <BookOpen size={18} />
            <span style={{ fontSize: '0.85rem' }}>Active semester courses</span>
          </div>
        </div>

        <div className="c-card" onClick={() => navigate('/dashboard/attendance')} style={{ cursor: 'pointer' }}>
          <h3>Attendance Rate</h3>
          <div className="c-card-stat">{attendanceRate}%</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)' }}>
            <CheckCircle2 size={18} />
            <span style={{ fontSize: '0.85rem' }}>{presentClasses} / {totalClasses} lectures attended</span>
          </div>
        </div>

        <div className="c-card" onClick={() => navigate('/dashboard/results')} style={{ cursor: 'pointer' }}>
          <h3>Current CGPA</h3>
          <div className="c-card-stat">{totalGpa}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)' }}>
            <Award size={18} />
            <span style={{ fontSize: '0.85rem' }}>Out of 4.0 scale</span>
          </div>
        </div>

        <div className="c-card" onClick={() => navigate('/dashboard/assignments')} style={{ cursor: 'pointer' }}>
          <h3>Pending Tasks</h3>
          <div className="c-card-stat">{pendingAssignments.length}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)' }}>
            <FileText size={18} />
            <span style={{ fontSize: '0.85rem' }}>Assignments due this week</span>
          </div>
        </div>
      </div>

      {/* Unpaid Fee Alert if Any */}
      {unpaidFee && (
        <div style={{ background: 'var(--card-bg)', border: '1px solid #fcd34d', borderLeft: '4px solid var(--yellow)', padding: '16px 20px', borderRadius: 'var(--r-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <AlertCircle size={22} color="var(--yellow)" />
            <div>
              <div style={{ fontWeight: 600, color: 'var(--text-heading)' }}>Pending Tuition Fee Voucher: {unpaidFee.voucherNo}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Amount: <strong>PKR {unpaidFee.amount.toLocaleString()}</strong> • Due Date: {unpaidFee.dueDate}</div>
            </div>
          </div>
          <button 
            onClick={() => navigate('/dashboard/fees')}
            style={{ padding: '8px 18px', background: 'var(--primary)', color: '#fff', borderRadius: 'var(--r-full)', fontSize: '0.85rem', fontWeight: 600, border: 'none', cursor: 'pointer' }}
          >
            Pay Voucher Online →
          </button>
        </div>
      )}

      {/* Today's Timetable */}
      <div className="table-card">
        <div className="table-header">
          <div>
            <h2>Today's Class Timetable</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '2px 0 0 0' }}>Weekly lecture schedule for Section {studentProfile?.section || 'CS-4A'}</p>
          </div>
          <button 
            onClick={() => navigate('/dashboard/courses')}
            style={{ padding: '6px 14px', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-full)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', background: 'var(--card-bg)' }}
          >
            View All Courses →
          </button>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Course / Subject</th>
              <th>Timing & Routine</th>
              <th>Room / Lab</th>
              <th>Instructor</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {myCourses.map(cs => (
              <tr key={cs.id}>
                <td>
                  <div style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{cs.subject}</div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Sec: {cs.section}</span>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.9rem', color: 'var(--text-main)' }}>
                    <Clock size={14} color="var(--text-muted)" /> {cs.day}, {cs.time}
                  </div>
                </td>
                <td style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{cs.room}</td>
                <td>
                  <span style={{ fontWeight: 500, color: 'var(--text-main)' }}>{cs.teacherName || 'Dr. Usman Khan'}</span>
                </td>
                <td>
                  <span className="status-pill completed">Scheduled</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Split Row: Upcoming Deadlines & Recent Daily Diary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
        {/* Upcoming Assignments Card */}
        <div className="table-card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h2 style={{ fontSize: '1.15rem', margin: 0 }}>Upcoming Assignments</h2>
            <button onClick={() => navigate('/dashboard/assignments')} style={{ fontSize: '0.82rem', color: 'var(--primary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>View All →</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {myAssignments.slice(0, 3).map(asg => {
              const sub = mySubmissions.find(s => s.assignmentId === asg.id);
              return (
                <div key={asg.id} style={{ background: 'var(--bg-color)', padding: 14, borderRadius: 8, border: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text-heading)', fontSize: '0.92rem' }}>{asg.title}</div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{asg.subject} • Due: {asg.dueDate}</span>
                  </div>
                  <span className={`status-pill ${sub?.status === 'Graded' ? 'completed' : sub ? 'inprogress' : 'cancelled'}`} style={{ fontSize: '0.75rem', padding: '2px 8px' }}>
                    {sub ? sub.status : 'Pending'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Daily Diary Card */}
        <div className="table-card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h2 style={{ fontSize: '1.15rem', margin: 0 }}>Today's Class Diary</h2>
            <button onClick={() => navigate('/dashboard/diary')} style={{ fontSize: '0.82rem', color: 'var(--primary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>All Notes →</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {myDiaries.slice(0, 2).map(diary => (
              <div key={diary.id} style={{ background: 'var(--bg-color)', padding: 14, borderRadius: 8, border: '1px solid var(--border-light)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-heading)' }}>{diary.topic}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{diary.date}</span>
                </div>
                <p style={{ margin: '0 0 6px 0', fontSize: '0.83rem', color: 'var(--text-muted)' }}>{diary.summary}</p>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-main)', background: 'var(--card-bg)', padding: '6px 10px', borderRadius: 6, border: '1px solid var(--border-light)' }}>
                  <strong>Homework:</strong> {diary.homework}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
