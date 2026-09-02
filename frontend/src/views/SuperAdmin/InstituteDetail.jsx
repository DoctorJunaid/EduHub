import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Users, GraduationCap, Building2, ExternalLink, Calendar, Edit2, ShieldCheck, Mail, Phone } from 'lucide-react';
import { getInstituteData } from '../../data/mockData';

export default function InstituteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const inst = getInstituteData(id);

  if (!inst) {
    return <div style={{ padding: 40, textAlign: 'center' }}>Institute not found.</div>;
  }

  return (
    <div className="content-container animate-stagger" style={{ maxWidth: 1400 }}>
      
      {/* Header Area */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 32 }}>
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
          <button 
            onClick={() => navigate('/dashboard/institutes')}
            style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--card-bg)', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)', boxShadow: 'var(--sh-sm)', flexShrink: 0, marginTop: 4 }}
          >
            <ArrowLeft size={18} />
          </button>
          
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <h1 style={{ fontSize: '2.5rem', color: 'var(--text-heading)', lineHeight: 1.1, margin: 0 }}>{inst.name}</h1>
              <span className={`status-pill ${inst.status === 'Active' || !inst.status ? 'completed' : 'inprogress'}`}>
                {inst.status || 'Active'}
              </span>
              <span className="status-pill purple" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <ShieldCheck size={14} /> {inst.board}
              </span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Building2 size={16} /> {inst.type}</span>
              {inst.email && <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Mail size={16} /> {inst.email}</span>}
              {inst.phone && <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Phone size={16} /> {inst.phone}</span>}
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Calendar size={16} /> Registered: {new Date(inst.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button 
            onClick={() => window.open(`/institute/${inst.id}`, '_blank')}
            style={{ padding: '12px 24px', borderRadius: 'var(--r-full)', border: '1px solid var(--border-strong)', background: 'var(--card-bg)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <ExternalLink size={16} /> Public Page
          </button>
          <button 
            onClick={() => navigate(`/dashboard/institutes/${inst.id}/edit`)}
            className="nav-btn-primary"
            style={{ padding: '12px 32px', borderRadius: 'var(--r-full)', border: 'none', background: 'var(--primary)', color: '#fff', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)' }}
          >
            <Edit2 size={16} /> Edit Details
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: 32 }}>
        
        {/* Left Column (Main Info) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          
          {/* Quick Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            <div className="c-card" style={{ minHeight: 'auto', padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <h3 style={{ margin: 0 }}>Total Campuses</h3>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MapPin size={20} />
                </div>
              </div>
              <div className="c-card-stat" style={{ margin: 0, color: 'var(--text-heading) !important' }}>{inst.branches.length}</div>
            </div>
            
            <div className="c-card" style={{ minHeight: 'auto', padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <h3 style={{ margin: 0 }}>Enrolled Students</h3>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#e0e7ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Users size={20} />
                </div>
              </div>
              <div className="c-card-stat" style={{ margin: 0, color: 'var(--text-heading) !important' }}>{inst.totalStudents}</div>
            </div>

            <div className="c-card" style={{ minHeight: 'auto', padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <h3 style={{ margin: 0 }}>Total Faculty</h3>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <GraduationCap size={20} />
                </div>
              </div>
              <div className="c-card-stat" style={{ margin: 0, color: 'var(--text-heading) !important' }}>{inst.totalTeachers}</div>
            </div>
          </div>

          {/* Campuses List Table */}
          <div className="table-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div className="table-header" style={{ padding: '24px 32px', borderBottom: '1px solid var(--border-light)', margin: 0 }}>
              <h2 style={{ fontSize: '1.3rem', margin: 0 }}>Campus Locations</h2>
            </div>
            <div style={{ padding: '0 32px 32px' }}>
              <table className="data-table" style={{ marginTop: 16 }}>
                <thead>
                  <tr>
                    <th>Campus Name</th>
                    <th>Address</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {inst.branches.length === 0 && (
                    <tr><td colSpan="3" style={{ textAlign: 'center', padding: '40px 0' }}>No campuses registered yet.</td></tr>
                  )}
                  {inst.branches.map(b => (
                    <tr key={b.id}>
                      <td style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{b.name}</td>
                      <td>{b.address}</td>
                      <td><span className="status-pill completed">Operational</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
        </div>

        {/* Right Column (Sidebar details) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          
          <div className="table-card" style={{ padding: 24 }}>
            <h2 style={{ fontSize: '1.2rem', marginBottom: 20 }}>Cover Identity</h2>
            <div style={{ width: '100%', height: 200, borderRadius: 'var(--r-md)', overflow: 'hidden', border: '1px solid var(--border-light)', background: 'var(--bg-color)' }}>
              {inst.image ? (
                <img src={inst.image} alt={inst.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>No Cover Image</div>
              )}
            </div>
          </div>

          <div className="table-card" style={{ padding: 24 }}>
            <h2 style={{ fontSize: '1.2rem', marginBottom: 20 }}>Contact Information</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 4 }}>Head Office</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 500 }}>{inst.address || 'Not specified'}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 4 }}>Support Email</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--primary)' }}>{inst.email || 'Not specified'}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 4 }}>Primary Phone</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 500 }}>{inst.phone || 'Not specified'}</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
