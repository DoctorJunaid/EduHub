import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Hexagon, LayoutDashboard, Building2, Calendar, MessageSquare, Menu, Settings, LogOut, Moon, Sun, ChevronRight, Users, BookOpen, UserCheck, CheckCircle2, CreditCard, Award, FileText, BookMarked } from 'lucide-react';

export default function Sidebar({ user, isDark, setIsDark, onLogout }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Define navigation based on role
  let navItems = [
    { label: 'Overview', icon: LayoutDashboard, path: '/dashboard' }
  ];

  if (user?.role === 'super_admin') {
    navItems.push(
      { label: 'Institutes', icon: Building2, path: '/dashboard/institutes' }
    );
  } else if (user?.role === 'institute_admin') {
    navItems.push(
      { label: 'Campuses', icon: Building2, path: '/dashboard/campuses' },
      { label: 'Staff Directory', icon: Users, path: '/dashboard/staff' },
      { label: 'Students', icon: BookOpen, path: '/dashboard/students' },
      { label: 'Broadcast Alerts', icon: MessageSquare, path: '/dashboard/alerts' }
    );
  } else if (user?.role === 'campus_manager') {
    navItems = [
      { label: 'Campus Overview', icon: LayoutDashboard, path: '/dashboard' },
      { label: 'Faculty Directory', icon: Users, path: '/dashboard/staff' },
      { label: 'Students Directory', icon: BookOpen, path: '/dashboard/students' },
      { label: 'Class Timetable', icon: Calendar, path: '/dashboard/classes' },
      { label: 'Exam Schedules', icon: BookOpen, path: '/dashboard/exams' },
      { label: 'Teacher Attendance', icon: UserCheck, path: '/dashboard/teacher-attendance' },
      { label: 'Student Attendance', icon: CheckCircle2, path: '/dashboard/student-attendance' },
      { label: 'Fee Management', icon: CreditCard, path: '/dashboard/fees' },
      { label: 'Exam Results & GPA', icon: Award, path: '/dashboard/results' },
      { label: 'Messages', icon: MessageSquare, path: '/dashboard/messages' }
    ];
  } else if (user?.role === 'teacher') {
    navItems = [
      { label: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
      { label: 'My Classes', icon: Calendar, path: '/dashboard/classes' },
      { label: 'Assignments & Grading', icon: FileText, path: '/dashboard/assignments' },
      { label: 'Take Attendance', icon: UserCheck, path: '/dashboard/attendance' },
      { label: 'Daily Diary', icon: BookMarked, path: '/dashboard/diary' },
      { label: 'Gradebook & Marks', icon: Award, path: '/dashboard/gradebook' },
      { label: 'Messages', icon: MessageSquare, path: '/dashboard/messages' }
    ];
  } else if (user?.role === 'student') {
    navItems = [
      { label: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
      { label: 'My Courses', icon: BookOpen, path: '/dashboard/courses' },
      { label: 'Assignments', icon: FileText, path: '/dashboard/assignments' },
      { label: 'Attendance Record', icon: CheckCircle2, path: '/dashboard/attendance' },
      { label: 'Daily Diary', icon: BookMarked, path: '/dashboard/diary' },
      { label: 'Grades & CGPA', icon: Award, path: '/dashboard/results' },
      { label: 'Fee Vouchers', icon: CreditCard, path: '/dashboard/fees' },
      { label: 'Messages', icon: MessageSquare, path: '/dashboard/messages' }
    ];
  } else {
    // For other roles, keep generic tabs
    navItems.push(
      { label: 'Directory', icon: Users, path: '/dashboard/directory' },
      { label: 'Calendar', icon: Calendar, path: '/dashboard/calendar' },
      { label: 'Messages', icon: MessageSquare, path: '/dashboard/messages' }
    );
  }

  const isActive = (path) => {
    if (path === '/dashboard') return location.pathname === '/dashboard';
    return location.pathname.startsWith(path);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }} onClick={() => navigate('/')}>
          <div className="logo-icon" style={{ background: 'var(--primary)', padding: 4, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Hexagon size={24} color="#fff" fill="#fff" />
          </div>
          {!isCollapsed && <span style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.4rem', color: 'var(--text-heading)' }}>EduHub</span>}
        </div>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Menu size={20} />
        </button>
      </div>

      <div className="sidebar-nav">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <div 
              key={idx} 
              className={`sidebar-link ${active ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <img src={user?.avatar} alt={user?.name} />
          <div className="user-details">
            <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-heading)', lineHeight: 1.2 }}>{user?.name}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user?.email}</div>
          </div>
        </div>

        <div 
          className="sidebar-link" 
          onClick={() => setIsDark(!isDark)}
          style={{ color: 'var(--text-main)', marginTop: 'auto' }}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
          <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
        </div>
        
        <div 
          className="sidebar-link" 
          onClick={onLogout}
          style={{ color: '#ef4444' }}
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </div>
      </div>
    </div>
  );
}
