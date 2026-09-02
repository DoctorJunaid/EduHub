import React, { useState } from 'react';
import { UserCheck, CheckCircle2, XCircle, Clock, Users, Calendar, Save, Check } from 'lucide-react';
import { 
  student_profiles, users, attendance, updateStudentAttendance, 
  class_schedules 
} from '../../data/mockData';

export default function TeacherAttendance({ user }) {
  const teacherProfileId = user?.profile?.id || 'tp_1';
  const myCampusId = user?.profile?.campusId || 'camp_1';

  const myClasses = class_schedules.filter(c => c.teacherProfileId === teacherProfileId);
  const [selectedSubject, setSelectedSubject] = useState(myClasses[0]?.subject || 'Advanced Web Design');
  const [selectedSection, setSelectedSection] = useState(myClasses[0]?.section || 'CS-4A');
  const [selectedDate, setSelectedDate] = useState('2026-09-02');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Filter students enrolled in this campus / section
  const enrolledStudents = student_profiles.filter(s => s.campusId === myCampusId);

  // Local attendance state
  const [localAttendance, setLocalAttendance] = useState(() => {
    const init = {};
    enrolledStudents.forEach(s => {
      const existing = attendance.find(a => a.studentProfileId === s.id && a.subject === selectedSubject && a.date === selectedDate);
      init[s.id] = existing ? existing.status : 'Present';
    });
    return init;
  });

  const handleStatusChange = (studentId, status) => {
    setLocalAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
    setSavedSuccess(false);
  };

  const handleMarkAll = (status) => {
    const next = {};
    enrolledStudents.forEach(s => {
      next[s.id] = status;
    });
    setLocalAttendance(next);
    setSavedSuccess(false);
  };

  const handleSaveAttendance = (e) => {
    e.preventDefault();
    enrolledStudents.forEach(s => {
      const st = localAttendance[s.id] || 'Present';
      updateStudentAttendance(s.id, myCampusId, selectedSubject, st);
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const presentCount = Object.values(localAttendance).filter(v => v === 'Present').length;
  const absentCount = Object.values(localAttendance).filter(v => v === 'Absent').length;
  const lateCount = Object.values(localAttendance).filter(v => v === 'Late').length;

  return (
    <div className="content-container animate-fade-in" style={{ gap: 24 }}>
      {/* Header */}
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1>Class Attendance Register</h1>
          <p style={{ color: 'var(--text-muted)' }}>Take daily attendance, mark student statuses, and track attendance records.</p>
        </div>

        <button 
          onClick={handleSaveAttendance}
          style={{ padding: '10px 22px', background: 'var(--primary)', color: '#fff', borderRadius: 'var(--r-sm)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px rgba(5,150,105,0.2)' }}
        >
          <Save size={16} /> Save Attendance
        </button>
      </div>

      {savedSuccess && (
        <div style={{ background: 'rgba(5, 150, 105, 0.1)', border: '1px solid var(--primary)', padding: '12px 18px', borderRadius: 8, color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Check size={18} /> Attendance record for {selectedSubject} on {selectedDate} saved successfully!
        </div>
      )}

      {/* Controls Bar & Quick Stats */}
      <div className="table-card" style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: 4 }}>SUBJECT / COURSE</label>
            <select 
              value={selectedSubject} 
              onChange={e => setSelectedSubject(e.target.value)}
              style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)', fontWeight: 600 }}
            >
              <option value="Advanced Web Design">Advanced Web Design</option>
              <option value="Data Structures & Algorithms">Data Structures & Algorithms</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: 4 }}>SECTION</label>
            <input 
              type="text" 
              value={selectedSection}
              onChange={e => setSelectedSection(e.target.value)}
              style={{ width: 100, padding: '8px 12px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)', fontWeight: 600 }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: 4 }}>ATTENDANCE DATE</label>
            <input 
              type="date" 
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)', fontWeight: 600 }}
            />
          </div>
        </div>

        {/* Quick Batch Actions */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button 
            type="button"
            onClick={() => handleMarkAll('Present')}
            style={{ padding: '7px 14px', background: 'var(--bg-color)', border: '1px solid var(--border-strong)', borderRadius: 6, fontSize: '0.82rem', fontWeight: 600, color: 'var(--primary)', cursor: 'pointer' }}
          >
            Mark All Present
          </button>
          <button 
            type="button"
            onClick={() => handleMarkAll('Absent')}
            style={{ padding: '7px 14px', background: 'var(--bg-color)', border: '1px solid var(--border-strong)', borderRadius: 6, fontSize: '0.82rem', fontWeight: 600, color: '#ef4444', cursor: 'pointer' }}
          >
            Mark All Absent
          </button>
        </div>
      </div>

      {/* Quick Summary Pill Bar */}
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1, background: 'var(--card-bg)', padding: '14px 20px', borderRadius: 10, border: '1px solid var(--border-strong)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Students</span>
          <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-heading)' }}>{enrolledStudents.length}</span>
        </div>
        <div style={{ flex: 1, background: 'var(--card-bg)', padding: '14px 20px', borderRadius: 10, border: '1px solid var(--border-strong)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Present</span>
          <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary)' }}>{presentCount}</span>
        </div>
        <div style={{ flex: 1, background: 'var(--card-bg)', padding: '14px 20px', borderRadius: 10, border: '1px solid var(--border-strong)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Absent</span>
          <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ef4444' }}>{absentCount}</span>
        </div>
        <div style={{ flex: 1, background: 'var(--card-bg)', padding: '14px 20px', borderRadius: 10, border: '1px solid var(--border-strong)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Late / Leave</span>
          <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--yellow)' }}>{lateCount}</span>
        </div>
      </div>

      {/* Attendance Roster Table */}
      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Student Name & Roll No</th>
              <th>Program & Section</th>
              <th>Current Status</th>
              <th style={{ textAlign: 'right' }}>Mark Status</th>
            </tr>
          </thead>
          <tbody>
            {enrolledStudents.map(student => {
              const studentUser = users.find(u => u.id === student.userId);
              const currentStatus = localAttendance[student.id] || 'Present';

              return (
                <tr key={student.id}>
                  <td>
                    <div className="td-user">
                      <img src={studentUser?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(studentUser?.name || 'Student')}`} alt="" style={{ width: 38, height: 38, borderRadius: '50%' }} />
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
                    <span className={`status-pill ${currentStatus === 'Present' ? 'completed' : currentStatus === 'Absent' ? 'cancelled' : 'inprogress'}`}>
                      {currentStatus}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: 6 }}>
                      <button 
                        type="button"
                        onClick={() => handleStatusChange(student.id, 'Present')}
                        style={{
                          padding: '6px 12px',
                          borderRadius: 6,
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          border: '1px solid',
                          borderColor: currentStatus === 'Present' ? 'var(--primary)' : 'var(--border-strong)',
                          background: currentStatus === 'Present' ? 'var(--primary)' : 'var(--bg-color)',
                          color: currentStatus === 'Present' ? '#fff' : 'var(--text-main)',
                          cursor: 'pointer'
                        }}
                      >
                        Present
                      </button>
                      <button 
                        type="button"
                        onClick={() => handleStatusChange(student.id, 'Absent')}
                        style={{
                          padding: '6px 12px',
                          borderRadius: 6,
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          border: '1px solid',
                          borderColor: currentStatus === 'Absent' ? '#ef4444' : 'var(--border-strong)',
                          background: currentStatus === 'Absent' ? '#ef4444' : 'var(--bg-color)',
                          color: currentStatus === 'Absent' ? '#fff' : 'var(--text-main)',
                          cursor: 'pointer'
                        }}
                      >
                        Absent
                      </button>
                      <button 
                        type="button"
                        onClick={() => handleStatusChange(student.id, 'Late')}
                        style={{
                          padding: '6px 12px',
                          borderRadius: 6,
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          border: '1px solid',
                          borderColor: currentStatus === 'Late' ? 'var(--yellow)' : 'var(--border-strong)',
                          background: currentStatus === 'Late' ? 'var(--yellow)' : 'var(--bg-color)',
                          color: currentStatus === 'Late' ? '#fff' : 'var(--text-main)',
                          cursor: 'pointer'
                        }}
                      >
                        Late
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
