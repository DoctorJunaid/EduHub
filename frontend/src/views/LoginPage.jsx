import React from 'react';
import { Hexagon, User, Shield, GraduationCap, Briefcase, Buildings } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage({ onLogin }) {
  const navigate = useNavigate();

  const demoUsers = [
    { id: 'u_super1', label: 'Super Admin', icon: Shield, desc: 'Full system access & network oversight' },
    { id: 'u_admin1', label: 'Institute Admin', icon: Briefcase, desc: 'Manage institute, branches & alerts' },
    { id: 'u_manager1', label: 'Campus Manager', icon: Buildings, desc: 'Manage classes, exams & branch attendance' },
    { id: 'u_teach1', label: 'Teacher', icon: User, desc: 'Manage assigned classes & evaluations' },
    { id: 'u_stud1', label: 'Student', icon: GraduationCap, desc: 'View timetable, grades & attendance' }
  ];

  const handleLogin = (id) => {
    onLogin(id);
    navigate('/dashboard');
  };

  return (
    <div className="public-layout" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', background: 'var(--bg-color)', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background Decor */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)', zIndex: 0 }}></div>
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, transparent 70%)', zIndex: 0 }}></div>

      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 440 }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40, cursor: 'pointer' }} onClick={() => navigate('/')}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, background: 'var(--card-bg)', borderRadius: 20, boxShadow: '0 8px 24px rgba(16,185,129,0.15)', marginBottom: 24, border: '1px solid var(--border-light)' }}>
            <Hexagon size={36} color="var(--primary)" fill="var(--primary)" />
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-heading)', letterSpacing: '-0.02em', marginBottom: 8 }}>Welcome back</h1>
          <p style={{ color: 'var(--text-muted)' }}>Select a demo profile to continue.</p>
        </div>

        {/* Login Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {demoUsers.map(user => (
            <div 
              key={user.id}
              onClick={() => handleLogin(user.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 20, padding: 24, background: 'var(--card-bg)', border: '1px solid var(--border-strong)', borderRadius: 20, cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: 'var(--sh-sm)'
              }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(16,185,129,0.1)'; }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--sh-sm)'; }}
            >
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--bg-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-light)' }}>
                <user.icon size={24} color="var(--primary)" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-heading)', marginBottom: 4 }}>{user.label}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{user.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: 40, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          By continuing, you agree to our <span style={{ color: 'var(--primary)', cursor: 'pointer' }}>Terms of Service</span>.
        </div>
      </div>
    </div>
  );
}
