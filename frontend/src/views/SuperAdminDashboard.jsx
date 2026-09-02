import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DotsThreeVertical, Faders, Heartbeat, Users, Buildings, CurrencyDollar, MapPin, BookOpen } from '@phosphor-icons/react';
import { institutes } from '../data/mockData';

export default function SuperAdminDashboard() {
  const navigate = useNavigate();
  return (
    <div className="content-container animate-stagger">
      <div className="page-header">
        <h1>Global System</h1>
      </div>

      {/* Global Stats Grid - Full Width */}
      <div className="course-grid">
        <div className="c-card">
          <h3>Registered Institutes</h3>
          <div className="c-card-stat">24</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)' }}>
            <Buildings size={18} />
            <span style={{ fontSize: '0.85rem' }}>Total networks in system</span>
          </div>
        </div>

        <div className="c-card">
          <h3>Total Users</h3>
          <div className="c-card-stat">12,450</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)' }}>
            <Users size={18} />
            <span style={{ fontSize: '0.85rem' }}>Across all institutes</span>
          </div>
        </div>

        <div className="c-card">
          <h3>Total Campuses</h3>
          <div className="c-card-stat">142</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)' }}>
            <MapPin size={18} />
            <span style={{ fontSize: '0.85rem' }}>Branches globally</span>
          </div>
        </div>

        <div className="c-card">
          <h3>Active Programs</h3>
          <div className="c-card-stat">850+</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)' }}>
            <BookOpen size={18} />
            <span style={{ fontSize: '0.85rem' }}>Courses across networks</span>
          </div>
        </div>
      </div>

      {/* Two column split for data tables to make it look complex and real */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>

        {/* Institutes Premium List */}
        <div className="table-card" style={{ padding: '32px', background: 'var(--card-bg)', borderRadius: '24px', border: '1px solid var(--border-light)', boxShadow: 'var(--sh-card)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <h2 style={{ fontSize: '1.4rem', color: 'var(--text-heading)', margin: 0, fontWeight: 700 }}>Registered Institutes</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>Overview of top-performing networks</p>
            </div>
            <button style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--bg-color)', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)', cursor: 'pointer', transition: 'all 0.2s' }}>
              <Faders size={18} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {institutes.slice(0, 4).map((inst, idx) => (
              <div key={inst.id} style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) auto auto auto', gap: '24px', alignItems: 'center', padding: '16px 24px', background: 'var(--bg-color)', borderRadius: '16px', border: '1px solid var(--border-light)', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--sh-sm)'; e.currentTarget.style.borderColor = 'var(--primary)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'var(--border-light)'; }}
                onClick={() => navigate(`/dashboard/institutes/${inst.id}`)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: 0 }}>
                  <div style={{ width: 48, height: 48, borderRadius: '12px', background: 'var(--card-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-strong)', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', flexShrink: 0 }}>
                    {inst.image ? (
                      <img src={inst.image} alt={inst.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '11px' }} />
                    ) : (
                      <Buildings size={20} color="var(--primary)" />
                    )}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <h4 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-heading)', fontWeight: 600, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{inst.name}</h4>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{inst.type} • {inst.board}</span>
                  </div>
                </div>

                <div>
                  <span className={`status-pill ${inst.status === 'Active' || !inst.status ? 'completed' : 'inprogress'}`} style={{ padding: '6px 12px' }}>
                    {inst.status || 'Active'}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)' }}>{inst.branches?.length || (idx+2)} Campuses</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{inst.totalStudents || (idx*500 + 1200)} Students</span>
                </div>

                <button style={{ padding: '8px 16px', background: 'var(--card-bg)', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-full)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'var(--primary)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--card-bg)'; e.currentTarget.style.color = 'var(--text-main)'; e.currentTarget.style.borderColor = 'var(--border-strong)'; }}
                  onClick={(e) => { e.stopPropagation(); navigate(`/dashboard/institutes/${inst.id}/edit`); }}
                >
                  Manage
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Premium Heartbeat Feed */}
        <div className="table-card" style={{ padding: '32px', background: 'var(--card-bg)', borderRadius: '24px', border: '1px solid var(--border-light)', boxShadow: 'var(--sh-card)' }}>
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.4rem', color: 'var(--text-heading)', margin: 0, fontWeight: 700 }}>System Heartbeat</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>Real-time event stream</p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0', position: 'relative' }}>
            {/* Vertical Line */}
            <div style={{ position: 'absolute', left: '11px', top: '16px', bottom: '16px', width: '2px', background: 'linear-gradient(to bottom, var(--border-strong) 0%, rgba(209,232,222,0) 100%)', zIndex: 0 }}></div>
            
            <div style={{ display: 'flex', gap: '20px', position: 'relative', zIndex: 1, paddingBottom: '28px' }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 12px var(--green)' }}></div>
              </div>
              <div>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-heading)', letterSpacing: '-0.3px' }}>New Institute Registered</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.4 }}>Pinnacle Medical College has joined the EduHub network.</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--primary)', marginTop: '8px', fontWeight: 500 }}>Just now</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '20px', position: 'relative', zIndex: 1 }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--bg-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px', border: '2px solid var(--card-bg)' }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--yellow)' }}></div>
              </div>
              <div>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-heading)', letterSpacing: '-0.3px' }}>System Maintenance</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.4 }}>Scheduled database optimizations completed.</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px', fontWeight: 500 }}>5 hours ago</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
