import React, { useState } from 'react';
import { UserCheck, Check, Clock, AlertCircle } from 'lucide-react';
import { getCampusFullData, updateTeacherAttendance } from '../../data/mockData';

export default function CampusTeacherAttendance({ user }) {
  const campusId = user?.profile?.campusId || 'camp_1';
  const [dataVersion, setDataVersion] = useState(0);

  const campusData = getCampusFullData(campusId);
  const { teacherAttendanceToday = [] } = campusData || {};

  const handleToggle = (teacherProfileId, currentStatus) => {
    const nextStatus = currentStatus === 'Present' ? 'Late' : currentStatus === 'Late' ? 'On Leave' : 'Present';
    updateTeacherAttendance(teacherProfileId, campusId, nextStatus);
    setDataVersion(v => v + 1);
  };

  return (
    <div className="content-container animate-fade-in" style={{ gap: 24 }}>
      <div className="page-header">
        <h1>Faculty & Staff Attendance</h1>
        <p style={{ color: 'var(--text-muted)' }}>Real-time teacher presence tracker and daily punch-in register.</p>
      </div>

      <div className="table-card">
        <div className="table-header" style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.2rem', margin: 0 }}>Today's Check-in Log (2026-09-02)</h2>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Click status badge or action button to update</span>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Teacher / Faculty</th>
              <th>Department</th>
              <th>Check-in Time</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {teacherAttendanceToday.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                  No teachers assigned to this branch.
                </td>
              </tr>
            )}
            {teacherAttendanceToday.map(({ teacher, status, checkInTime }) => (
              <tr key={teacher.id}>
                <td>
                  <div className="td-user">
                    <img src={teacher.user?.avatar} alt="" style={{ width: 40, height: 40, borderRadius: '50%' }} />
                    <div>
                      <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-heading)', display: 'block' }}>{teacher.user?.name}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{teacher.user?.email}</span>
                    </div>
                  </div>
                </td>
                <td style={{ color: 'var(--text-main)', fontWeight: 500 }}>{teacher.department || 'General'}</td>
                <td style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{status === 'On Leave' ? '-' : checkInTime}</td>
                <td>
                  <span 
                    className={`status-pill ${status === 'Present' ? 'completed' : status === 'Late' ? 'inprogress' : 'cancelled'}`}
                    style={{ padding: '6px 14px', cursor: 'pointer' }}
                    onClick={() => handleToggle(teacher.id, status)}
                  >
                    {status}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button
                    onClick={() => handleToggle(teacher.id, status)}
                    style={{ padding: '6px 14px', background: 'var(--bg-color)', border: '1px solid var(--border-strong)', borderRadius: 8, fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', cursor: 'pointer' }}
                  >
                    Set {status === 'Present' ? 'Late' : status === 'Late' ? 'On Leave' : 'Present'}
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
