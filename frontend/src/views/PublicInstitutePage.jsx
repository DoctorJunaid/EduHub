import React from 'react';
import { Star, MapPin, ArrowLeft, ChevronRight, Users, Monitor, Palette, LineChart, HeartPulse, ShieldCheck } from 'lucide-react';
import { institutes, trainers, top_alumni, facilities, getInstituteData } from '../data/mockData';
import { useParams, useNavigate } from 'react-router-dom';

export default function PublicInstitutePage() {
  const { id: instituteId } = useParams();
  const navigate = useNavigate();
  const inst = getInstituteData(instituteId);
  const instTrainers = trainers.filter(t => t.instituteId === instituteId);
  const instAlumni = top_alumni.filter(a => a.instituteId === instituteId);
  const instFacilities = facilities.filter(f => f.instituteId === instituteId);

  const iconMap = { Users, Monitor, Palette, LineChart, HeartPulse, ShieldCheck };

  if (!inst) return <div>Institute not found</div>;

  return (
    <div className="content-container animate-stagger" style={{ maxWidth: 1200, margin: '0 auto' }}>
      
      {/* Back Navigation */}
      <button 
        style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontWeight: 600, transition: 'color 0.2s', cursor: 'pointer' }}
        onClick={() => navigate('/')}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
      >
        <ArrowLeft size={18} /> Back to All Institutes
      </button>

      {/* Hero Banner */}
      <div className="pub-inst-hero">
        <img src={inst.image} alt={inst.name} />
        <div className="hero-overlay">
          <h1>{inst.name}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, fontSize: '1.1rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <MapPin size={18} /> {inst.branches.length} Campuses
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {[1,2,3,4,5].map(s => (
                <Star key={s} size={18} color={s <= Math.floor(inst.rating) ? '#f59e0b' : 'rgba(255,255,255,0.3)'} fill={s <= Math.floor(inst.rating) ? '#f59e0b' : 'none'} />
              ))}
              <span style={{ fontWeight: 700, marginLeft: 4 }}>{inst.rating}</span>
            </span>
            <button 
              style={{ marginLeft: 'auto', padding: '12px 32px', background: '#fff', color: 'var(--primary)', borderRadius: 'var(--r-full)', fontWeight: 700, fontSize: '1rem', transition: 'transform 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ display: 'flex', gap: 40, marginTop: 40 }}>
        
        {/* Left: Trainers + Alumni */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 60 }}>
          
          {/* Trainers */}
          <div>
            <div className="landing-section-header">
              <div>
                <div className="section-label">Faculty</div>
                <h2>Top Trainers</h2>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
              {instTrainers.map(trainer => (
                <div key={trainer.id} className="trainer-card">
                  <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20 }}>
                    <img src={trainer.avatar} alt={trainer.name} style={{ width: 56, height: 56, borderRadius: '50%', border: '3px solid var(--border-light)' }} />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-heading)' }}>{trainer.name}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600 }}>{trainer.position}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px solid var(--border-light)' }}>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{trainer.experience}</span>
                    <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} size={14} color={s <= Math.floor(trainer.rating) ? '#f59e0b' : '#e2e8f0'} fill={s <= Math.floor(trainer.rating) ? '#f59e0b' : 'none'} />
                      ))}
                      <span style={{ marginLeft: 6, fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-heading)' }}>{trainer.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alumni */}
          <div>
            <div className="landing-section-header">
              <div>
                <div className="section-label">Network</div>
                <h2>Top Alumni</h2>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
              {instAlumni.map(alumni => (
                <div key={alumni.id} className="alumni-card">
                  <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 16 }}>
                    <img src={alumni.picture} alt={alumni.name} className="alumni-avatar" style={{ marginBottom: 0 }} />
                    <h3 style={{ marginBottom: 0 }}>{alumni.name}</h3>
                  </div>
                  <p className="alumni-quote">{alumni.successStory}</p>
                </div>
              ))}
              {instAlumni.length === 0 && (
                <div style={{ padding: 32, color: 'var(--text-muted)', gridColumn: '1 / -1', textAlign: 'center' }}>
                  Alumni stories coming soon.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Facilities */}
        <div style={{ width: 360 }}>
          <div className="landing-section-header" style={{ marginBottom: 24 }}>
            <div>
              <div className="section-label">Why Us</div>
              <h2>Our Facilities</h2>
            </div>
          </div>
          <div className="table-card" style={{ padding: 8 }}>
            {instFacilities.map(fac => {
              const Icon = iconMap[fac.icon] || ShieldCheck;
              return (
                <div key={fac.id} className="facility-item">
                  <div className="facility-icon">
                    <Icon size={24} color="var(--primary)" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-heading)', marginBottom: 4 }}>{fac.title}</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{fac.description}</div>
                  </div>
                </div>
              );
            })}
            {instFacilities.length === 0 && (
              <div className="facility-item" style={{ justifyContent: 'center', color: 'var(--text-muted)' }}>
                Facility details coming soon.
              </div>
            )}
          </div>

          {/* Campus Locations */}
          <div style={{ marginTop: 32 }}>
            <div className="landing-section-header" style={{ marginBottom: 16 }}>
              <div>
                <div className="section-label">Locations</div>
                <h2>Campuses</h2>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {inst.branches.map(branch => (
                <div key={branch.id} className="table-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 'var(--r-sm)', background: 'rgba(0, 86, 224, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-heading)' }}>{branch.name}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{branch.address}</div>
                  </div>
                  <ChevronRight size={16} style={{ marginLeft: 'auto', color: 'var(--text-muted)' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
