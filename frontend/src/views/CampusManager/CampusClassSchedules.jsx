import React, { useState } from 'react';
import { Calendar, Clock, Plus, Trash } from '@phosphor-icons/react';
import { getCampusFullData, addClassSchedule, deleteClassSchedule } from '../../data/mockData';

export default function CampusClassSchedules({ user }) {
  const campusId = user?.profile?.campusId || 'camp_1';
  const [dataVersion, setDataVersion] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const campusData = getCampusFullData(campusId);
  const { classes = [], teachers = [] } = campusData || {};

  const [newClass, setNewClass] = useState({
    subject: '',
    dayOfWeek: 'Monday & Wednesday',
    startTime: '10:00 AM',
    endTime: '12:00 PM',
    room: 'Lab 101',
    section: 'CS-4A',
    teacherProfileId: teachers[0]?.id || 'tp_1'
  });

  const handleCreateClass = (e) => {
    e.preventDefault();
    if (!newClass.subject) return;
    addClassSchedule({ ...newClass, campusId });
    setShowModal(false);
    setNewClass({
      subject: '',
      dayOfWeek: 'Monday & Wednesday',
      startTime: '10:00 AM',
      endTime: '12:00 PM',
      room: 'Lab 101',
      section: 'CS-4A',
      teacherProfileId: teachers[0]?.id || 'tp_1'
    });
    setDataVersion(v => v + 1);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this scheduled class?')) {
      deleteClassSchedule(id);
      setDataVersion(v => v + 1);
    }
  };

  return (
    <div className="content-container animate-fade-in" style={{ gap: 24 }}>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Class Timetable & Schedules</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage lecture routines, weekly schedules, and classroom allocations.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          style={{ padding: '10px 20px', background: 'var(--primary)', color: '#fff', borderRadius: 8, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, border: 'none', cursor: 'pointer' }}
        >
          <Plus size={18} /> Schedule New Class
        </button>
      </div>

      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Subject & Section</th>
              <th>Days & Time</th>
              <th>Room / Lab</th>
              <th>Assigned Instructor</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                  No classes scheduled yet.
                </td>
              </tr>
            )}
            {classes.map(cls => (
              <tr key={cls.id}>
                <td>
                  <div style={{ fontWeight: 600, color: 'var(--text-heading)', fontSize: '0.95rem' }}>{cls.subject}</div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Section: {cls.section || 'General'}</span>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-main)', fontSize: '0.9rem', fontWeight: 500 }}>
                    <Clock size={15} color="var(--primary)" /> {cls.startTime} - {cls.endTime}
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{cls.dayOfWeek}</span>
                </td>
                <td>
                  <span style={{ padding: '4px 10px', background: 'var(--bg-color)', border: '1px solid var(--border-strong)', borderRadius: 6, fontSize: '0.85rem', fontWeight: 500 }}>
                    {cls.room}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(59,130,246,0.15)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '0.75rem' }}>
                      {cls.teacherName.charAt(0)}
                    </div>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-heading)', fontWeight: 500 }}>{cls.teacherName}</span>
                  </div>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button 
                    onClick={() => handleDelete(cls.id)}
                    style={{ padding: '6px', color: '#ef4444', background: 'var(--bg-color)', border: '1px solid var(--border-light)', borderRadius: 6, cursor: 'pointer' }}
                    title="Remove class"
                  >
                    <Trash size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: 20 }}>
          <div className="table-card animate-fade-in" style={{ width: '100%', maxWidth: 520, padding: 28, background: 'var(--card-bg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Schedule New Class</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
            </div>

            <form onSubmit={handleCreateClass} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Subject Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Operating Systems"
                  value={newClass.subject}
                  onChange={(e) => setNewClass({ ...newClass, subject: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Days of Week</label>
                  <input 
                    type="text" 
                    value={newClass.dayOfWeek}
                    onChange={(e) => setNewClass({ ...newClass, dayOfWeek: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Section / Batch</label>
                  <input 
                    type="text" 
                    value={newClass.section}
                    onChange={(e) => setNewClass({ ...newClass, section: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Start Time</label>
                  <input 
                    type="text" 
                    value={newClass.startTime}
                    onChange={(e) => setNewClass({ ...newClass, startTime: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>End Time</label>
                  <input 
                    type="text" 
                    value={newClass.endTime}
                    onChange={(e) => setNewClass({ ...newClass, endTime: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Room / Lab</label>
                  <input 
                    type="text" 
                    value={newClass.room}
                    onChange={(e) => setNewClass({ ...newClass, room: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Instructor</label>
                  <select
                    value={newClass.teacherProfileId}
                    onChange={(e) => setNewClass({ ...newClass, teacherProfileId: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  >
                    {teachers.map(t => (
                      <option key={t.id} value={t.id}>{t.user?.name || 'Instructor'}</option>
                    ))}
                    {teachers.length === 0 && <option value="tp_1">Default Instructor</option>}
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 12 }}>
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  style={{ padding: '10px 18px', background: 'var(--bg-color)', border: '1px solid var(--border-strong)', borderRadius: 8, color: 'var(--text-main)', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  style={{ padding: '10px 20px', background: 'var(--primary)', color: '#fff', borderRadius: 8, fontWeight: 600, border: 'none', cursor: 'pointer' }}
                >
                  Save Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
