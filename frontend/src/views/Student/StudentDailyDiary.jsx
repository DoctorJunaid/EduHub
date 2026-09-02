import React, { useState } from 'react';
import { Bookmark, Calendar, BookOpen, Clock, FileText, CheckCircle } from '@phosphor-icons/react';
import { daily_diary, teacher_profiles, users } from '../../data/mockData';

export default function StudentDailyDiary({ user }) {
  const myCampusId = user?.profile?.campusId || 'camp_1';
  const [selectedSubject, setSelectedSubject] = useState('All');

  const myDiaries = daily_diary.filter(d => d.campusId === myCampusId);
  const filtered = selectedSubject === 'All' ? myDiaries : myDiaries.filter(d => d.subject === selectedSubject);

  return (
    <div className="content-container animate-fade-in" style={{ gap: 24 }}>
      {/* Header */}
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1>Daily Lecture Diary & Homework</h1>
          <p style={{ color: 'var(--text-muted)' }}>Class summaries, topics covered today, homework tasks, and instructor reading notes.</p>
        </div>

        <div>
          <select 
            value={selectedSubject}
            onChange={e => setSelectedSubject(e.target.value)}
            style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)', fontWeight: 600 }}
          >
            <option value="All">All Subjects</option>
            <option value="Advanced Web Design">Advanced Web Design</option>
            <option value="Data Structures & Algorithms">Data Structures & Algorithms</option>
          </select>
        </div>
      </div>

      {/* Diary Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {filtered.length === 0 && (
          <div className="table-card" style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>
            No lecture diary entries found for the selected subject.
          </div>
        )}

        {filtered.map(diary => {
          const tp = teacher_profiles.find(t => t.id === diary.teacherProfileId);
          const teacherUser = tp ? users.find(u => u.id === tp.userId) : null;

          return (
            <div key={diary.id} className="table-card" style={{ padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, borderBottom: '1px solid var(--border-light)', paddingBottom: 14, marginBottom: 16 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <h2 style={{ margin: 0, fontWeight: 700, fontSize: '1.15rem', color: 'var(--text-heading)' }}>{diary.topic}</h2>
                    <span className="status-pill completed" style={{ fontSize: '0.75rem', padding: '2px 8px' }}>Sec {diary.section}</span>
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginTop: 2 }}>
                    <strong>{diary.subject}</strong> • Instructor: {teacherUser?.name || 'Dr. Usman Khan'} • Date: {diary.date}
                  </span>
                </div>

                <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600, background: 'rgba(5,150,105,0.08)', padding: '4px 10px', borderRadius: 'var(--r-full)' }}>
                  Verified Entry
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
                <div style={{ background: 'var(--bg-color)', padding: 16, borderRadius: 8, border: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, display: 'block', marginBottom: 4 }}>LECTURE RECAP</span>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.5 }}>{diary.summary}</p>
                </div>

                <div style={{ background: 'var(--bg-color)', padding: 16, borderRadius: 8, border: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--primary)', fontWeight: 700, display: 'block', marginBottom: 4 }}>HOMEWORK & PRACTICE QUESTIONS</span>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-heading)', fontWeight: 600, lineHeight: 1.5 }}>{diary.homework}</p>
                </div>
              </div>

              {diary.resources && (
                <div style={{ marginTop: 14, fontSize: '0.85rem', color: 'var(--text-muted)', background: 'var(--bg-color)', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-light)' }}>
                  <strong>Recommended Resources:</strong> {diary.resources}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
