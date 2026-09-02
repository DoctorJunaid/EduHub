import React, { useState, useEffect } from 'react';
import { Search, Bell, Hexagon } from 'lucide-react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import SuperAdminDashboard from './views/SuperAdminDashboard';
import InstitutesList from './views/SuperAdmin/InstitutesList';
import InstituteForm from './views/SuperAdmin/InstituteForm';
import InstituteDetail from './views/SuperAdmin/InstituteDetail';
import InstituteAdminDashboard from './views/InstituteAdminDashboard';
import CampusesList from './views/InstituteAdmin/CampusesList';
import CampusForm from './views/InstituteAdmin/CampusForm';
import StaffDirectory from './views/InstituteAdmin/StaffDirectory';
import StudentsList from './views/InstituteAdmin/StudentsList';
import AlertsBroadcast from './views/InstituteAdmin/AlertsBroadcast';
import CampusDetail from './views/InstituteAdmin/CampusDetail';
import CampusOverview from './views/CampusManager/CampusOverview';
import CampusClassSchedules from './views/CampusManager/CampusClassSchedules';
import CampusExamSchedules from './views/CampusManager/CampusExamSchedules';
import CampusTeacherAttendance from './views/CampusManager/CampusTeacherAttendance';
import CampusStudentAttendance from './views/CampusManager/CampusStudentAttendance';
import CampusFeeManagement from './views/CampusManager/CampusFeeManagement';
import CampusExamResults from './views/CampusManager/CampusExamResults';
import TeacherOverview from './views/Teacher/TeacherOverview';
import TeacherAssignments from './views/Teacher/TeacherAssignments';
import TeacherAttendance from './views/Teacher/TeacherAttendance';
import TeacherDailyDiary from './views/Teacher/TeacherDailyDiary';
import TeacherGradebook from './views/Teacher/TeacherGradebook';
import StudentOverview from './views/Student/StudentOverview';
import StudentCourses from './views/Student/StudentCourses';
import StudentAssignments from './views/Student/StudentAssignments';
import StudentAttendance from './views/Student/StudentAttendance';
import StudentResults from './views/Student/StudentResults';
import StudentFeeVouchers from './views/Student/StudentFeeVouchers';
import StudentDailyDiary from './views/Student/StudentDailyDiary';
import DirectoryView from './views/DirectoryView';
import CalendarView from './views/CalendarView';
import MessagesView from './views/MessagesView';
import LandingPage from './views/LandingPage';
import PublicInstitutePage from './views/PublicInstitutePage';
import LoginPage from './views/LoginPage';
import { getFullUserRecord } from './data/mockData';
import GetStartedModal from './components/GetStartedModal';
import Sidebar from './components/Sidebar';
import Breadcrumbs from './components/Breadcrumbs';
import './index.css';

function DashboardRoutes({ user }) {
  if (!user) return <Navigate to="/login" replace />;

  if (user.role === 'super_admin') {
    return (
      <Routes>
        <Route path="/" element={<SuperAdminDashboard user={user} />} />
        <Route path="/institutes" element={<InstitutesList />} />
        <Route path="/institutes/new" element={<InstituteForm />} />
        <Route path="/institutes/:id" element={<InstituteDetail />} />
        <Route path="/institutes/:id/edit" element={<InstituteForm />} />
        <Route path="/directory" element={<DirectoryView user={user} />} />
        <Route path="/calendar" element={<CalendarView user={user} />} />
        <Route path="/messages" element={<MessagesView user={user} />} />
      </Routes>
    );
  }
  
  if (user.role === 'institute_admin') {
    return (
      <Routes>
        <Route path="/" element={<InstituteAdminDashboard user={user} />} />
        <Route path="/campuses" element={<CampusesList user={user} />} />
        <Route path="/campuses/new" element={<CampusForm user={user} />} />
        <Route path="/campuses/:id" element={<CampusDetail user={user} />} />
        <Route path="/campuses/:id/edit" element={<CampusForm user={user} />} />
        <Route path="/staff" element={<StaffDirectory user={user} />} />
        <Route path="/students" element={<StudentsList user={user} />} />
        <Route path="/alerts" element={<AlertsBroadcast user={user} />} />
      </Routes>
    );
  }

  if (user.role === 'campus_manager') {
    return (
      <Routes>
        <Route path="/" element={<CampusOverview user={user} />} />
        <Route path="/staff" element={<StaffDirectory user={user} />} />
        <Route path="/students" element={<StudentsList user={user} />} />
        <Route path="/classes" element={<CampusClassSchedules user={user} />} />
        <Route path="/exams" element={<CampusExamSchedules user={user} />} />
        <Route path="/teacher-attendance" element={<CampusTeacherAttendance user={user} />} />
        <Route path="/student-attendance" element={<CampusStudentAttendance user={user} />} />
        <Route path="/fees" element={<CampusFeeManagement user={user} />} />
        <Route path="/results" element={<CampusExamResults user={user} />} />
        <Route path="/messages" element={<MessagesView user={user} />} />
      </Routes>
    );
  }

  if (user.role === 'teacher') {
    return (
      <Routes>
        <Route path="/" element={<TeacherOverview user={user} />} />
        <Route path="/classes" element={<CampusClassSchedules user={user} />} />
        <Route path="/assignments" element={<TeacherAssignments user={user} />} />
        <Route path="/attendance" element={<TeacherAttendance user={user} />} />
        <Route path="/diary" element={<TeacherDailyDiary user={user} />} />
        <Route path="/gradebook" element={<TeacherGradebook user={user} />} />
        <Route path="/messages" element={<MessagesView user={user} />} />
      </Routes>
    );
  }

  if (user.role === 'student') {
    return (
      <Routes>
        <Route path="/" element={<StudentOverview user={user} />} />
        <Route path="/courses" element={<StudentCourses user={user} />} />
        <Route path="/assignments" element={<StudentAssignments user={user} />} />
        <Route path="/attendance" element={<StudentAttendance user={user} />} />
        <Route path="/diary" element={<StudentDailyDiary user={user} />} />
        <Route path="/results" element={<StudentResults user={user} />} />
        <Route path="/fees" element={<StudentFeeVouchers user={user} />} />
        <Route path="/messages" element={<MessagesView user={user} />} />
      </Routes>
    );
  }
  
  return null;
}

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isDark, setIsDark] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [isDark]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const switchUser = (id) => {
    if (currentUser?.id === id) return;
    setIsLoading(true);
    setCurrentUser(getFullUserRecord(id));
    setTimeout(() => setIsLoading(false), 600);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/');
  };

  const scrollToSection = (id) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <div className={`app-shell ${!currentUser ? 'public-layout' : 'lms-layout'}`}>
        <div className="page-content">
          <div className="content-container animate-stagger" style={{ gap: 32 }}>
            <div className="skeleton" style={{ width: '30%', height: 40, marginBottom: 16 }}></div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
              <div className="skeleton" style={{ height: 160 }}></div>
              <div className="skeleton" style={{ height: 160 }}></div>
              <div className="skeleton" style={{ height: 160 }}></div>
              <div className="skeleton" style={{ height: 160 }}></div>
            </div>
            <div className="skeleton" style={{ width: '100%', height: 400 }}></div>
          </div>
        </div>
      </div>
    );
  }

  const isPublicRoute = location.pathname === '/' || location.pathname === '/login' || location.pathname.startsWith('/institute');

  return (
    <div className={`app-shell ${isPublicRoute ? 'public-layout' : 'lms-layout'}`}>
      
      {/* ─── PUBLIC LAYOUT TOP NAV ─── */}
      {isPublicRoute && (
        <div className="public-nav-container">
          <div className="public-nav">
            <div className="logo" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }} onClick={() => navigate('/')}>
              <div className="logo-icon" style={{ background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, width: 32, height: 32 }}>
                <Hexagon size={20} color="#ffffff" fill="#ffffff" />
              </div>
              <span style={{ fontWeight: 700, fontSize: '1.2rem', color: '#ffffff' }}>EduHub</span>
            </div>
            
            <div className="nav-links">
              <span onClick={() => scrollToSection('top')}>Home</span>
              <span onClick={() => scrollToSection('institutes')}>Institutes</span>
              <span onClick={() => scrollToSection('features')}>Features</span>
              <span onClick={() => scrollToSection('alumni')}>Alumni</span>
            </div>

            <div className="nav-actions">
              {currentUser ? (
                <button className="nav-btn-primary" style={{ background: '#ffffff', color: 'var(--primary)' }} onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
              ) : (
                <>
                  <span className="nav-link-login" style={{ color: 'rgba(255,255,255,0.9)' }} onClick={() => navigate('/login')}>Sign in</span>
                  <button className="nav-btn-primary" style={{ background: '#ffffff', color: 'var(--primary)' }} onClick={() => setIsGetStartedOpen(true)}>Get Started</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─── LMS LAYOUT (SIDEBAR + MAIN CONTENT) ─── */}
      {!isPublicRoute && !currentUser && (
        <Navigate to="/login" replace />
      )}

      {!isPublicRoute && currentUser && (
        <>
          <Sidebar user={currentUser} isDark={isDark} setIsDark={setIsDark} onLogout={handleLogout} />
          <div className="main-content-wrapper">
            <div className="top-header">
              <Breadcrumbs />
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <button style={{ color: 'var(--text-muted)' }}><Search size={20} /></button>
                <button style={{ position: 'relative', color: 'var(--text-muted)' }}>
                  <Bell size={20} />
                  <div style={{ position:'absolute', top:-2, right:-2, width:8, height:8, background:'var(--red)', borderRadius:'50%' }}></div>
                </button>
              </div>
            </div>
            <div className="page-content">
              <Routes>
                <Route path="/dashboard/*" element={<DashboardRoutes user={currentUser} />} />
              </Routes>
            </div>
          </div>
        </>
      )}

      {/* ─── PUBLIC ROUTES CONTENT ─── */}
      {isPublicRoute && (
        <div className="page-content">
          <Routes>
            <Route path="/" element={<LandingPage onGetStarted={() => setIsGetStartedOpen(true)} />} />
            <Route path="/institute/:id" element={<PublicInstitutePage />} />
            <Route path="/login" element={<LoginPage onLogin={switchUser} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      )}

      <GetStartedModal isOpen={isGetStartedOpen} onClose={() => setIsGetStartedOpen(false)} />
    </div>
  );
}
