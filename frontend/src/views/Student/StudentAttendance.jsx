import React from 'react';
import { UserCheck, CheckCircle2, XCircle, Clock, Calendar } from 'lucide-react';
import { attendance } from '../../data/mockData';

export default function StudentAttendance({ user }) {
  const studentProfileId = user?.profile?.id || 'sp_1';
  const myAttendance = attendance.filter(a => a.studentProfileId === studentProfileId);

  const total = myAttendance.length;
  const present = myAttendance.filter(a => a.status === 'Present').length;
  const absent = myAttendance.filter(a => a.status === 'Absent').length;
  const late = myAttendance.filter(a => a.status === 'Late').length;
  const percentage = total > 0 ? Math.round((present / total) * 100) : 95;

  const subjectStats = [
    { subject: 'Advanced Web Design', attended: 18, total: 20, pct: 90 },
    { subject: 'Data Structures & Algorithms', attended: 19, total: 20, pct: 95 },
    { subject: 'Artificial Intelligence', attended: 16, total: 18, pct: 88 },
  ];

  return (
    <div className="content-container animate-fade-in" style={{ gap: 24 }}>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Attendance Record & History</h1>
          <p style={{ color: 'var(--text-muted)' }}>Daily attendance logs, course-wise eligibility threshold, and overall attendance percentage.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="course-grid">
        <div className="c-card">
          <h3>Overall Attendance</h3>
          <div className="c-card-stat">{percentage}%</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)' }}>
            <CheckCircle2 size={18} />
            <span style={{ fontSize: '0.85rem' }}>Eligibility threshold: 75%</span>
          </div>
        </div>

        <div className="c-card">
          <h3>Lectures Attended</h3>
          <div className="c-card-stat">{present}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)' }}>
            <UserCheck size={18} />
            <span style={{ fontSize: '0.85rem' }}>Verified present</span>
          </div>
        </div>

        <div className="c-card">
          <h3>Absences</h3>
          <div className="c-card-stat" style={{ color: absent > 0 ? '#ef4444' : 'var(--text-heading)' }}>{absent}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)' }}>
            <XCircle size={18} />
            <span style={{ fontSize: '0.85rem' }}>Unexcused absences</span>
          </div>
        </div>

        <div className="c-card">
          <h3>Late / Leave</h3>
          <div className="c-card-stat">{late}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)' }}>
            <Clock size={18} />
            <span style={{ fontSize: '0.85rem' }}>Approved leaves</span>
          </div>
        </div>
      </div>

      {/* Course-wise Attendance Progress Bars */}
      <div className="table-card" style={{ padding: 24 }}>
        <h2 style={{ fontSize: '1.15rem', marginBottom: 16 }}>Course-Wise Attendance Percentage</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {subjectStats.map((item, idx) => (
            <div key={idx}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-heading)' }}>{item.subject}</span>
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: item.pct >= 75 ? 'var(--primary)' : '#ef4444' }}>
                  {item.attended}/{item.total} lectures ({item.pct}%)
                </span>
              </div>
              <div style={{ width: '100%', height: 8, background: 'var(--border-light)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: `${item.pct}%`, height: '100%', background: item.pct >= 75 ? 'var(--primary)' : '#ef4444', borderRadius: 4 }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Attendance Log Table */}
      <div className="table-card">
        <div className="table-header">
          <h2>Daily Attendance Log</h2>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Recent lecture check-in history</span>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Course / Subject</th>
              <th>Status</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {myAttendance.map(att => (
              <tr key={att.id}>
                <td style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{att.date}</td>
                <td style={{ color: 'var(--text-main)', fontWeight: 500 }}>{att.subject}</td>
                <td>
                  <span className={`status-pill ${att.status === 'Present' ? 'completed' : att.status === 'Absent' ? 'cancelled' : 'inprogress'}`}>
                    {att.status}
                  </span>
                </td>
                <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  {att.status === 'Present' ? 'Marked on time by instructor' : 'Absent'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
