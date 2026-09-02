import React from 'react';
import { Medal, BookOpen, CheckCircle, TrendUp, DownloadSimple } from '@phosphor-icons/react';
import { student_performance } from '../../data/mockData';

export default function StudentResults({ user }) {
  const studentProfile = user?.profile;
  const studentProfileId = studentProfile?.id || 'sp_1';
  const myGrades = student_performance.filter(p => p.studentProfileId === studentProfileId);

  const totalCredits = myGrades.length * 3;
  const avgGpa = myGrades.length > 0 
    ? (myGrades.reduce((sum, g) => sum + g.gpa, 0) / myGrades.length).toFixed(2) 
    : '3.90';

  return (
    <div className="content-container animate-fade-in" style={{ gap: 24 }}>
      {/* Header */}
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1>Academic Results & CGPA Transcript</h1>
          <p style={{ color: 'var(--text-muted)' }}>Semester evaluation breakdown, letter grades, GPA index, and faculty remarks.</p>
        </div>

        <button 
          onClick={() => window.print()}
          style={{ padding: '10px 18px', background: 'var(--card-bg)', color: 'var(--text-heading)', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-sm)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
        >
          <DownloadSimple size={16} /> Print Official Transcript
        </button>
      </div>

      {/* CGPA Summary Cards */}
      <div className="course-grid">
        <div className="c-card">
          <h3>Cumulative GPA (CGPA)</h3>
          <div className="c-card-stat">{avgGpa}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)' }}>
            <Medal size={18} />
            <span style={{ fontSize: '0.85rem' }}>Out of 4.0 scale</span>
          </div>
        </div>

        <div className="c-card">
          <h3>Completed Credits</h3>
          <div className="c-card-stat">{totalCredits}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)' }}>
            <BookOpen size={18} />
            <span style={{ fontSize: '0.85rem' }}>Credit hours earned</span>
          </div>
        </div>

        <div className="c-card">
          <h3>Current Semester</h3>
          <div className="c-card-stat" style={{ fontSize: '1.5rem' }}>{studentProfile?.semester || '4th Semester'}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)' }}>
            <TrendUp size={18} />
            <span style={{ fontSize: '0.85rem' }}>{studentProfile?.program || 'BS Computer Science'}</span>
          </div>
        </div>

        <div className="c-card">
          <h3>Academic Standing</h3>
          <div className="c-card-stat" style={{ fontSize: '1.4rem', color: 'var(--primary)' }}>Dean's Honor</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)' }}>
            <CheckCircle size={18} />
            <span style={{ fontSize: '0.85rem' }}>Top 5% batch percentile</span>
          </div>
        </div>
      </div>

      {/* Official Grade Sheet Table */}
      <div className="table-card">
        <div className="table-header">
          <div>
            <h2>Semester Grade Sheet (Fall 2025)</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '2px 0 0 0' }}>Roll No: {studentProfile?.rollNo || 'NUST-CS-2023-042'}</p>
          </div>
          <span className="status-pill completed">Official Transcript</span>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Course / Subject</th>
              <th>Marks Obtained</th>
              <th>Total Marks</th>
              <th>Letter Grade</th>
              <th>Grade Point (GPA)</th>
              <th>Faculty Evaluation Remarks</th>
            </tr>
          </thead>
          <tbody>
            {myGrades.map(perf => (
              <tr key={perf.id}>
                <td>
                  <div style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{perf.subject}</div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>3 Credit Hours</span>
                </td>
                <td style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-heading)' }}>{perf.marks}</td>
                <td style={{ color: 'var(--text-muted)' }}>{perf.totalMarks}</td>
                <td>
                  <span className={`status-pill ${perf.grade.startsWith('A') ? 'completed' : 'inprogress'}`} style={{ padding: '4px 10px' }}>
                    {perf.grade}
                  </span>
                </td>
                <td style={{ fontWeight: 700, color: 'var(--text-heading)' }}>{perf.gpa.toFixed(2)}</td>
                <td style={{ color: 'var(--text-muted)', fontSize: '0.88rem', maxWidth: 300 }}>
                  {perf.remarks}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
