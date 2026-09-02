import React from 'react';
import { CaretLeft, CaretRight, Faders, Clock } from '@phosphor-icons/react';
import { class_schedules, campus_branches } from '../data/mockData';

export default function CalendarView() {
  // Just showing all mock schedules for the calendar demo
  
  return (
    <div className="content-container animate-stagger" style={{ height: 'calc(100vh - 160px)', display: 'flex', flexDirection: 'column' }}>
      <div className="page-header">
        <h1>Schedule & Events</h1>
        <div className="filter-tabs">
          <div className="filter-tab active">Month</div>
          <div className="filter-tab">Week</div>
          <div className="filter-tab">Day</div>
          <div className="filter-tab">List</div>
        </div>
      </div>

      <div className="table-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <h2 style={{ fontSize: '1.3rem', color: 'var(--text-heading)', margin: 0, fontWeight: 700 }}>September 2026</h2>
            <div style={{ display: 'flex', gap: 4 }}>
              <button style={{ width: 34, height: 34, borderRadius: 'var(--r-sm)', border: '1px solid var(--border-strong)', background: 'var(--bg-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)', cursor: 'pointer' }}><CaretLeft size={16} /></button>
              <button style={{ width: 34, height: 34, borderRadius: 'var(--r-sm)', border: '1px solid var(--border-strong)', background: 'var(--bg-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)', cursor: 'pointer' }}><CaretRight size={16} /></button>
            </div>
            <button style={{ padding: '6px 14px', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-full)', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', background: 'var(--bg-color)', cursor: 'pointer' }}>Today</button>
          </div>
          <button style={{ padding: '8px 18px', background: 'var(--primary)', color: '#fff', borderRadius: 'var(--r-full)', fontSize: '0.85rem', fontWeight: 600, border: 'none', cursor: 'pointer' }}>+ Add Event</button>
        </div>
        
        {/* Mock Calendar Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', flex: 1, background: 'var(--border-light)', gap: 1 }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} style={{ background: 'var(--card-bg)', padding: '12px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', textAlign: 'center' }}>{day}</div>
          ))}
          
          {/* Creating 35 blocks for a month view */}
          {Array.from({ length: 35 }).map((_, i) => {
            const date = i - 1; // Offset for September 2026 starting Tuesday
            const isToday = date === 2;
            const isCurrentMonth = date > 0 && date <= 30;
            
            return (
              <div key={i} style={{ 
                background: isCurrentMonth ? 'var(--card-bg)' : 'var(--bg-color)', 
                padding: '8px', 
                minHeight: 100,
                display: 'flex',
                flexDirection: 'column',
                gap: 4
              }}>
                <div style={{ 
                  width: 26, height: 26, 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  borderRadius: '50%', 
                  background: isToday ? 'var(--primary)' : 'transparent',
                  color: isToday ? '#fff' : (isCurrentMonth ? 'var(--text-main)' : 'var(--text-muted)'),
                  fontWeight: 600, fontSize: '0.85rem',
                  alignSelf: 'flex-end',
                  marginBottom: 4
                }}>
                  {date > 0 ? (date <= 30 ? date : date - 30) : 31 + date}
                </div>
                
                {/* Events */}
                {isToday && class_schedules.slice(0, 2).map((cs, idx) => (
                  <div key={cs.id} style={{ padding: '4px 6px', borderRadius: '4px', background: 'rgba(5,150,105,0.08)', color: 'var(--primary)', border: '1px solid rgba(5,150,105,0.2)', fontSize: '0.72rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {cs.time} - {cs.subject}
                  </div>
                ))}
                
                {date === 15 && (
                  <div style={{ padding: '4px 6px', borderRadius: '4px', background: 'var(--card-bg)', border: '1px solid var(--border-strong)', color: 'var(--text-heading)', fontSize: '0.72rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    Midterm Exam Week
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
