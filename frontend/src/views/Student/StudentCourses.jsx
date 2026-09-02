import React from 'react';
import { BookOpen, Calendar, Clock, UserCheck, MapPin, CheckCircle } from '@phosphor-icons/react';
import { class_schedules, teacher_profiles, users } from '../../data/mockData';

export default function StudentCourses({ user }) {
  const myCampusId = user?.profile?.campusId || 'camp_1';
  const myCourses = class_schedules.filter(cs => cs.campusId === myCampusId);

  return (
    <div className="content-container animate-fade-in" style={{ gap: 24 }}>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>My Enrolled Courses & Routine</h1>
          <p style={{ color: 'var(--text-muted)' }}>Semester course allocations, syllabus modules, and instructor details.</p>
        </div>
      </div>

      {/* Courses Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
        {myCourses.map(course => {
          const tp = teacher_profiles.find(t => t.id === course.teacherProfileId);
          const teacherUser = tp ? users.find(u => u.id === tp.userId) : null;

          return (
            <div key={course.id} className="table-card" style={{ padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <span className="status-pill completed" style={{ fontSize: '0.75rem', padding: '2px 8px' }}>Sec {course.section}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>3 Credit Hours</span>
                </div>

                <h2 style={{ fontSize: '1.2rem', margin: '0 0 6px 0', color: 'var(--text-heading)' }}>{course.subject}</h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0 0 16px 0' }}>
                  Comprehensive theory and lab sessions covering advanced industry methodologies.
                </p>

                <div style={{ background: 'var(--bg-color)', padding: 14, borderRadius: 8, border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-main)' }}>
                    <Clock size={15} color="var(--text-muted)" /> <strong>Schedule:</strong> {course.day}, {course.time}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-main)' }}>
                    <MapPin size={15} color="var(--text-muted)" /> <strong>Location:</strong> {course.room}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-main)' }}>
                    <UserCheck size={15} color="var(--primary)" /> <strong>Instructor:</strong> {teacherUser?.name || 'Dr. Usman Khan'}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 20, paddingTop: 14, borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--primary)', fontWeight: 600 }}>Active Semester</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Attendance: 95%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
