import React, { useState } from 'react';
import { Bookmark, Plus, Trash, Calendar, BookOpen, Clock, FileText } from '@phosphor-icons/react';
import { daily_diary, addDailyDiary, deleteDailyDiary } from '../../data/mockData';

export default function TeacherDailyDiary({ user }) {
  const teacherProfileId = user?.profile?.id || 'tp_1';
  const myCampusId = user?.profile?.campusId || 'camp_1';
  const [dataVersion, setDataVersion] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    subject: 'Advanced Web Design',
    section: 'CS-4A',
    date: '2026-09-02',
    topic: '',
    summary: '',
    homework: '',
    resources: '',
    campusId: myCampusId,
    teacherProfileId
  });

  const myDiaries = daily_diary.filter(d => d.teacherProfileId === teacherProfileId);

  const handleCreate = (e) => {
    e.preventDefault();
    addDailyDiary(formData);
    setShowModal(false);
    setFormData({
      subject: 'Advanced Web Design',
      section: 'CS-4A',
      date: '2026-09-02',
      topic: '',
      summary: '',
      homework: '',
      resources: '',
      campusId: myCampusId,
      teacherProfileId
    });
    setDataVersion(v => v + 1);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this diary entry?')) {
      deleteDailyDiary(id);
      setDataVersion(v => v + 1);
    }
  };

  return (
    <div className="content-container animate-fade-in" style={{ gap: 24 }}>
      {/* Header */}
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1>Daily Class Lecture Diary</h1>
          <p style={{ color: 'var(--text-muted)' }}>Publish daily class summaries, topics taught, and homework tasks for students and parents.</p>
        </div>

        <button 
          onClick={() => setShowModal(true)}
          style={{ padding: '10px 18px', background: 'var(--primary)', color: '#fff', borderRadius: 'var(--r-sm)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, border: 'none', cursor: 'pointer' }}
        >
          <Plus size={16} /> New Diary Entry
        </button>
      </div>

      {/* Diary Entries List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {myDiaries.length === 0 && (
          <div className="table-card" style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>
            No lecture diary entries posted yet.
          </div>
        )}

        {myDiaries.map(diary => (
          <div key={diary.id} className="table-card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, borderBottom: '1px solid var(--border-light)', paddingBottom: 14, marginBottom: 16 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-heading)' }}>{diary.topic}</span>
                  <span className="status-pill completed" style={{ fontSize: '0.75rem', padding: '2px 8px' }}>Sec {diary.section}</span>
                </div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{diary.subject} • Date: {diary.date}</span>
              </div>

              <button 
                onClick={() => handleDelete(diary.id)}
                style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
                title="Delete Diary Entry"
              >
                <Trash size={16} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div style={{ background: 'var(--bg-color)', padding: 16, borderRadius: 8, border: '1px solid var(--border-light)' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, display: 'block', marginBottom: 4 }}>CLASS LECTURE SUMMARY</span>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.5 }}>{diary.summary || 'No summary notes provided.'}</p>
              </div>

              <div style={{ background: 'var(--bg-color)', padding: 16, borderRadius: 8, border: '1px solid var(--border-light)' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--primary)', fontWeight: 700, display: 'block', marginBottom: 4 }}>HOMEWORK / PRACTICE TASK</span>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-heading)', fontWeight: 500, lineHeight: 1.5 }}>{diary.homework}</p>
              </div>
            </div>

            {diary.resources && (
              <div style={{ marginTop: 14, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <strong>Recommended Study Material:</strong> {diary.resources}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* MODAL: NEW DIARY ENTRY */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: 20 }}>
          <div className="table-card animate-fade-in" style={{ width: '100%', maxWidth: 580, padding: 28, background: 'var(--card-bg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Post Lecture Diary & Homework</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
            </div>

            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Subject</label>
                  <select 
                    value={formData.subject} 
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
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
                    value={formData.section}
                    onChange={e => setFormData({ ...formData, section: e.target.value })}
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
                  value={formData.topic}
                  onChange={e => setFormData({ ...formData, topic: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Class Summary Notes</label>
                <textarea 
                  rows={2}
                  placeholder="Overview of core concepts explained during the lecture..."
                  value={formData.summary}
                  onChange={e => setFormData({ ...formData, summary: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Homework / Assigned Problem Set</label>
                <textarea 
                  rows={2}
                  required
                  placeholder="Tasks students must solve or read before next lecture..."
                  value={formData.homework}
                  onChange={e => setFormData({ ...formData, homework: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Study Material / Reading Links</label>
                <input 
                  type="text" 
                  placeholder="e.g. Chapter 4 MDN Web Docs or Slide Deck link"
                  value={formData.resources}
                  onChange={e => setFormData({ ...formData, resources: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 8 }}>
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  style={{ padding: '10px 18px', background: 'var(--bg-color)', border: '1px solid var(--border-strong)', borderRadius: 8, color: 'var(--text-main)', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  style={{ padding: '10px 24px', background: 'var(--primary)', color: '#fff', borderRadius: 8, fontWeight: 600, border: 'none', cursor: 'pointer' }}
                >
                  Post to Diary
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
