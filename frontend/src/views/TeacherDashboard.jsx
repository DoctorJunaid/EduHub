import React from 'react';
import { ChevronLeft, ChevronRight, MoreVertical, Filter } from 'lucide-react';
import { class_schedules, campus_branches, users, student_profiles, attendance } from '../data/mockData';

export default function TeacherDashboard({ user }) {
  const teacherProfileId = user?.profile?.id;
  const mySchedules = class_schedules.filter(s => s.teacherProfileId === teacherProfileId);

  // We can also fetch the campus details for these classes
  const campusIds = [...new Set(mySchedules.map(s => s.campusId))];
  const campuses = campus_branches.filter(c => campusIds.includes(c.id));

  // Get students who belong to the campuses this teacher teaches at, for the submissions table
  const studentsInCampus = student_profiles.filter(sp => campusIds.includes(sp.campusId));

  return (
    <div className="content-container animate-stagger">
      <div className="split-layout">
        <div className="main-col">
          <div className="page-header">
            <h1>My Classes</h1>
            <div className="filter-tabs">
              <div className="filter-tab active">Overview</div>
              <div className="filter-tab">Assignments</div>
              <div className="filter-tab">Grades</div>
              <div className="filter-tab">Attendance</div>
              <div className="filter-tab"><MoreVertical size={16} /></div>
            </div>
          </div>

          {/* Classes Grid */}
          <div className="course-grid">
            {mySchedules.map((schedule, idx) => {
              const campus = campuses.find(c => c.id === schedule.campusId);
              return (
                <div key={schedule.id} className={`c-card ${idx === 0 ? 'dark' : ''}`}>
                  <h3>{schedule.subject}</h3>
                  <div style={{ color: idx === 0 ? 'var(--bg-color)' : 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>
                    {schedule.startTime} - {schedule.endTime} <br /> {campus?.name}
                  </div>
                  {idx === 0 && <button className="c-card-btn">Manage Class</button>}
                </div>
              );
            })}
          </div>

          {/* Action Alerts */}
          <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 'var(--r-md)', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, background: '#fef3c7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>⚠️</div>
              <div>
                <div style={{ fontWeight: 600, color: '#92400e' }}>12 Assignments need grading</div>
                <div style={{ fontSize: '0.85rem', color: '#b45309' }}>From {mySchedules[0]?.subject || 'your classes'}.</div>
              </div>
            </div>
            <button style={{ background: '#d97706', color: '#fff', padding: '8px 16px', borderRadius: 'var(--r-full)', fontWeight: 600, fontSize: '0.85rem' }}>Review Now</button>
          </div>

          {/* Submissions Table */}
          <div className="table-card">
            <div className="table-header">
              <h2>Recent Submissions</h2>
              <button style={{ border: '1px solid var(--border-strong)', padding: 6, borderRadius: '50%' }}><Filter size={16} /></button>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Assignment</th>
                  <th>Status</th>
                  <th>Course</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {studentsInCampus.slice(0, 2).map((sp, idx) => {
                  const studentUser = users.find(u => u.id === sp.userId);
                  const relatedSchedule = mySchedules[idx % mySchedules.length];
                  return (
                    <tr key={sp.id}>
                      <td>
                        <div className="td-user">
                          <img src={studentUser?.avatar} alt="" />
                          <span>{studentUser?.name}</span>
                        </div>
                      </td>
                      <td>{idx === 0 ? 'Wireframe Draft' : 'Final Prototype'}</td>
                      <td>
                        <span className={`status-pill ${idx === 0 ? 'backlog' : 'inprogress'}`}>
                          {idx === 0 ? 'Pending Review' : 'Needs Revision'}
                        </span>
                      </td>
                      <td style={{ color: 'var(--text-muted)' }}>{relatedSchedule?.subject}</td>
                      <td><MoreVertical size={16} color="var(--text-muted)" /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="side-col">
          <h2 className="streak-header">Teaching<br />Schedule</h2>

          <div className="calendar-widget">
            <div className="cal-top">
              <span>June 2024</span>
              <div className="cal-nav">
                <button><ChevronLeft size={16} /></button>
                <button className="active"><ChevronRight size={16} /></button>
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
            {mySchedules.map((schedule, idx) => (
              <div key={`tl_${schedule.id}`} className="tl-item">
                <div className="tl-time">{schedule.startTime}</div>
                <div className="tl-box">
                  {schedule.subject}
                </div>
              </div>
            ))}
            <div className="tl-item">
              <div className="tl-time">16:00</div>
              <div className="tl-box" style={{ flex: 0.7 }}>Office Hours</div>
            </div>
          </div>

          <div className="promo-card dark">
            <div style={{ fontSize: '2rem', marginBottom: 12 }}>⭐</div>
            <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>Top Rated Teacher</div>
            <p style={{ fontSize: '0.85rem', opacity: 0.9, marginTop: 8 }}>Your average student rating is 4.9/5 this month.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
