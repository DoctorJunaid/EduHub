import React, { useState } from 'react';
import { CheckCircle2, Search, Filter } from 'lucide-react';
import { getCampusFullData, updateStudentAttendance } from '../../data/mockData';

export default function CampusStudentAttendance({ user }) {
  const campusId = user?.profile?.campusId || 'camp_1';
  const [dataVersion, setDataVersion] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const campusData = getCampusFullData(campusId);
  const { studentAttendanceRecords = [] } = campusData || {};

  const filtered = studentAttendanceRecords.filter(r => 
    r.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggle = (studentProfileId, subject, currentStatus) => {
    const nextStatus = currentStatus === 'Present' ? 'Absent' : 'Present';
    updateStudentAttendance(studentProfileId, campusId, subject, nextStatus);
    setDataVersion(v => v + 1);
  };

  return (
    <div className="content-container animate-fade-in" style={{ gap: 24 }}>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Student Attendance Register</h1>
          <p style={{ color: 'var(--text-muted)' }}>Daily student lecture presence and class attendance logs.</p>
        </div>
      </div>

      <div className="table-card">
        <div className="table-header" style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="search-bar" style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--bg-color)', padding: '10px 16px', borderRadius: '8px', width: '300px', border: '1px solid var(--border-strong)' }}>
            <Search size={18} color="var(--text-muted)" />
            <input 
              type="text" 
              placeholder="Filter by student or subject..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', color: 'var(--text-main)' }}
            />
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{filtered.length} records found</span>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Lecture / Subject</th>
              <th>Date</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                  No attendance records match your filter.
                </td>
              </tr>
            )}
            {filtered.map(rec => (
              <tr key={rec.id}>
                <td>
                  <div style={{ fontWeight: 600, color: 'var(--text-heading)', fontSize: '0.95rem' }}>{rec.studentName}</div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{rec.email}</span>
                </td>
                <td style={{ color: 'var(--text-main)', fontWeight: 500 }}>{rec.subject}</td>
                <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{rec.date}</td>
                <td>
                  <span className={`status-pill ${rec.status === 'Present' ? 'completed' : 'cancelled'}`} style={{ padding: '6px 14px' }}>
                    {rec.status}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button
                    onClick={() => handleToggle(rec.studentProfileId, rec.subject, rec.status)}
                    style={{ padding: '6px 14px', background: 'var(--bg-color)', border: '1px solid var(--border-strong)', borderRadius: 8, fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', cursor: 'pointer' }}
                  >
                    Mark {rec.status === 'Present' ? 'Absent' : 'Present'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
