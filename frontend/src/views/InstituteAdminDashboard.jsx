import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, Users, Building2, UserCheck, GraduationCap } from 'lucide-react';
import { getInstituteData, users } from '../data/mockData';

export default function InstituteAdminDashboard({ user }) {
  const navigate = useNavigate();
  // If user is institute admin, their profile has instituteId
  const instituteId = user?.profile?.instituteId;
  const data = instituteId ? getInstituteData(instituteId) : null;

  if (!data) return <div>No institute data found for this user.</div>;

  return (
    <div className="content-container animate-stagger">
      <div className="page-header">
        <div>
          <h1>{data.name}</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>Administrative control center & campus operations</p>
        </div>
      </div>

      {/* Stats Grid - Clean Professional Full Width */}
      <div className="course-grid">
        <div className="c-card">
          <h3>Total Students</h3>
          <div className="c-card-stat">{data.totalStudents}</div>
          <div style={{ display:'flex', alignItems:'center', gap:8, color:'var(--text-muted)' }}>
            <Users size={18} />
            <span style={{ fontSize:'0.85rem' }}>Enrolled across branches</span>
          </div>
        </div>
        
        <div className="c-card">
          <h3>Active Teachers</h3>
          <div className="c-card-stat">{data.totalTeachers}</div>
          <div style={{ display:'flex', alignItems:'center', gap:8, color:'var(--text-muted)' }}>
            <UserCheck size={18} />
            <span style={{ fontSize:'0.85rem' }}>Assigned to classes</span>
          </div>
        </div>

        <div className="c-card">
          <h3>Campus Branches</h3>
          <div className="c-card-stat">{data.branches.length}</div>
          <div style={{ display:'flex', alignItems:'center', gap:8, color:'var(--text-muted)' }}>
            <Building2 size={18} />
            <span style={{ fontSize:'0.85rem' }}>Operating locations</span>
          </div>
        </div>

        <div className="c-card">
          <h3>Institute Type</h3>
          <div className="c-card-stat" style={{ fontSize:'1.6rem' }}>{data.type}</div>
          <div style={{ display:'flex', alignItems:'center', gap:8, color:'var(--text-muted)' }}>
            <GraduationCap size={18} />
            <span style={{ fontSize:'0.85rem' }}>Board: {data.board}</span>
          </div>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div style={{ display:'flex', gap:16, marginTop:-8, marginBottom:8, flexWrap: 'wrap' }}>
        <button 
          onClick={() => navigate('/dashboard/campuses/new')}
          style={{ flex:1, minWidth: 200, padding:'16px', background:'var(--card-bg)', border:'1px dashed var(--border-strong)', borderRadius:'var(--r-md)', fontWeight:600, color:'var(--text-main)', display:'flex', alignItems:'center', justifyContent:'center', gap:8, cursor:'pointer' }}>
          <span>+</span> Add New Campus
        </button>
        <button 
          onClick={() => navigate('/dashboard/staff')}
          style={{ flex:1, minWidth: 200, padding:'16px', background:'var(--card-bg)', border:'1px dashed var(--border-strong)', borderRadius:'var(--r-md)', fontWeight:600, color:'var(--text-main)', display:'flex', alignItems:'center', justifyContent:'center', gap:8, cursor:'pointer' }}>
          <span>+</span> View Staff Directory
        </button>
        <button 
          onClick={() => navigate('/dashboard/alerts')}
          style={{ flex:1, minWidth: 200, padding:'16px', background:'var(--card-bg)', border:'1px dashed var(--border-strong)', borderRadius:'var(--r-md)', fontWeight:600, color:'var(--text-main)', display:'flex', alignItems:'center', justifyContent:'center', gap:8, cursor:'pointer' }}>
          <span>+</span> Broadcast Message
        </button>
      </div>

      {/* Action Table - Full Width */}
      <div className="table-card">
        <div className="table-header">
          <h2>Registered Students</h2>
          <button style={{border:'1px solid var(--border-strong)', padding:6, borderRadius:'50%'}}><Filter size={16}/></button>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Email</th>
              <th>Enrollment Status</th>
              <th>Campus Branch</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.students.map((s) => {
              const studentUser = users.find(u => u.id === s.userId);
              const campus = data.branches.find(b => b.id === s.campusId);
              return (
                <tr key={s.id}>
                  <td>
                    <div className="td-user">
                      <img src={studentUser?.avatar} alt=""/>
                      <span style={{ fontSize:'1rem' }}>{studentUser?.name}</span>
                    </div>
                  </td>
                  <td>{studentUser?.email}</td>
                  <td>
                    <span className={`status-pill ${s.enrollmentStatus === 'Active' ? 'completed' : 'inprogress'}`}>
                      {s.enrollmentStatus}
                    </span>
                  </td>
                  <td style={{color:'var(--text-muted)'}}>{campus?.name}</td>
                  <td>
                    <button style={{ padding: '6px 12px', border:'1px solid var(--border-strong)', borderRadius:'var(--r-full)', fontSize:'0.8rem', fontWeight:600, color:'var(--text-main)' }}>
                      View Profile
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
