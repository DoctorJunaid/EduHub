import React from 'react';
import { CaretLeft, CaretRight, DotsThreeVertical, Faders } from '@phosphor-icons/react';
import { class_schedules, attendance, teacher_profiles, users } from '../data/mockData';

export default function StudentDashboard({ user }) {
  const studentProfile = user?.profile;
  const myCampusId = studentProfile?.campusId;

  // For mock purposes, get all schedules for this campus as this student's courses
  const myCourses = class_schedules.filter(cs => cs.campusId === myCampusId);
  const myAttendance = attendance.filter(a => a.studentProfileId === studentProfile?.id);

  // Calculate streak based on consecutive present days (simplified for mock)
  const streakCount = myAttendance.filter(a => a.status === 'Present').length;

  return (
    <div className="content-container animate-stagger">
      <div className="split-layout">
        <div className="main-col">
          <div className="page-header">
            <h1>Courses</h1>
            <div className="filter-tabs">
              <div className="filter-tab active">Overview</div>
              <div className="filter-tab">Courses</div>
              <div className="filter-tab">Grades</div>
              <div className="filter-tab">Certificates</div>
              <div className="filter-tab">Resources</div>
              <div className="filter-tab"><DotsThreeVertical size={16} /></div>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="course-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            {myCourses.map((course, idx) => {
              // Find teacher
              const tProf = teacher_profiles.find(tp => tp.id === course.teacherProfileId);
              const tUser = users.find(u => u.id === tProf?.userId);

              return (
                <div key={course.id} className={`c-card ${idx === 0 ? 'dark' : ''}`}>
                  <h3>{course.subject}</h3>
                  <div style={{ fontSize: '0.85rem', marginBottom: 12, color: idx === 0 ? 'var(--bg-color)' : 'var(--text-muted)' }}>
                    {tUser?.name || 'TBA'}
                  </div>
                  {idx === 0 && <button className="c-card-btn">Go to course</button>}
                </div>
              );
            })}
          </div>

          {/* Homework Table */}
          <div className="table-card">
            <div className="table-header">
              <h2>Recent Attendance</h2>
              <button style={{ border: '1px solid var(--border-strong)', padding: 6, borderRadius: '50%' }}><Faders size={16} /></button>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Notes</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {myAttendance.map(att => (
                  <tr key={att.id}>
                    <td style={{ fontWeight: 600 }}>{att.date}</td>
                    <td>
                      <span className={`status-pill ${att.status === 'Present' ? 'completed' : 'purple'}`}>
                        {att.status}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-muted)' }}>{att.status === 'Present' ? 'On time' : 'Absent without leave'}</td>
                    <td><DotsThreeVertical size={16} color="var(--text-muted)" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="side-col">
          <h2 className="streak-header">You're on a<br />{streakCount}-day streak</h2>

          <div className="calendar-widget">
            <div className="cal-top">
              <span>June 2024</span>
              <div className="cal-nav">
                <button><CaretLeft size={16} /></button>
                <button className="active"><CaretRight size={16} /></button>
              </div>
            </div>
            <div className="cal-days">
              <div className="cal-day"><span>Mon</span><span>16</span></div>
              <div className="cal-day"><span>Tue</span><span>17</span></div>
              <div className="cal-day"><span>Wed</span><span>18</span></div>
              <div className="cal-day active"><span>Thu</span><span>19</span></div>
              <div className="cal-day"><span>Fri</span><span>20</span></div>
            </div>
          </div>

          <div className="timeline">
            {myCourses.map((course, idx) => (
              <div key={`tl_${course.id}`} className="tl-item">
                <div className="tl-time">{course.startTime}</div>
                <div className="tl-box">
                  {course.subject}
                </div>
              </div>
            ))}
          </div>

          <div className="table-card" style={{ padding: 20 }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: 16 }}>Upcoming Deadlines</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>UI Wireframes</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Visual Design</div>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--red)', fontWeight: 600, background: 'var(--red-light)', padding: '4px 8px', borderRadius: 'var(--r-sm)' }}>Tomorrow</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>User Flow Prototype</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>UX Design</div>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>In 3 days</div>
              </div>
            </div>
          </div>

          <div className="promo-card">
            <div style={{ fontSize: '2rem', marginBottom: 12 }}>🚀</div>
            <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>Unlock Full Access</div>
            <p style={{ fontSize: '0.85rem', opacity: 0.9, marginTop: 8 }}>Get all premium courses and mentorship.</p>
            <button className="promo-btn">Get Pro Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
