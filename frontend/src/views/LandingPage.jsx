import React, { useState } from 'react';
import { Star, MapPin, Calendar, Users, Briefcase, GraduationCap, Building2, Video, MessageSquare, Cloud, FileText, ChevronLeft, ChevronRight, X, CheckCircle, Play } from 'lucide-react';
import { top_alumni, institutes, events } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

export default function LandingPage({ onGetStarted }) {
  const navigate = useNavigate();
  
  // Duplicate arrays for infinite scrolling marquee effect
  // Duplicate arrays for infinite scrolling marquee effect
  const marqueeInstitutes = [...institutes, ...institutes, ...institutes];
  const marqueeAlumni = [...top_alumni, ...top_alumni, ...top_alumni];

  return (
    <div className="content-container animate-stagger" style={{ maxWidth: '100%', padding: '0', margin: '0 auto', overflowX: 'hidden' }}>
      
      {/* ─── Hero Section (Modern Premium SaaS Style) ─── */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingTop: 'clamp(120px, 15vw, 180px)', overflow: 'hidden' }}>
        
        {/* Subtle top glow */}
        <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: '100vw', height: '80vh', background: 'radial-gradient(ellipse at top, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0) 70%)', zIndex: 0, pointerEvents: 'none' }}></div>

        {/* Main Typography */}
        <h1 style={{ fontSize: 'clamp(3.5rem, 8vw, 6rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05, color: 'var(--text-heading)', marginBottom: 24, position: 'relative', zIndex: 10, maxWidth: 1000 }}>
          Manage your campus <br />
          <span style={{ color: 'var(--primary)' }}>without the chaos.</span>
        </h1>
        
        <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', color: 'var(--text-muted)', maxWidth: 640, margin: '0 auto 48px', lineHeight: 1.6, position: 'relative', zIndex: 10, fontWeight: 500 }}>
          A single, unified ecosystem for admissions, performance tracking, and global administration. Engineered for modern institutions.
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', position: 'relative', zIndex: 10, flexWrap: 'wrap' }}>
          <button 
            className="nav-btn-primary" 
            style={{ padding: '16px 36px', fontSize: '1.05rem', fontWeight: 600, background: 'var(--primary)', color: '#fff', borderRadius: 'var(--r-full)', border: 'none', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)' }}
            onClick={onGetStarted}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(16, 185, 129, 0.4)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.25)'; }}
          >
            Get Started
          </button>
          <button 
            className="nav-btn-primary" 
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '16px 36px', fontSize: '1.05rem', fontWeight: 600, background: 'var(--card-bg)', color: 'var(--text-heading)', borderRadius: 'var(--r-full)', border: '1px solid var(--border-strong)', cursor: 'pointer', transition: 'all 0.2s', boxShadow: 'var(--sh-sm)' }}
            onMouseOver={(e) => e.currentTarget.style.background = 'var(--border-light)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'var(--card-bg)'}
          >
            <Play size={18} fill="currentColor" /> Watch Demo
          </button>
        </div>

        {/* Hero Image / Dashboard Mockup representation */}
        <div style={{ position: 'relative', zIndex: 5, width: '100%', maxWidth: 1200, margin: '60px auto 0', padding: '0 20px' }}>
          <div style={{ 
              width: '100%', 
              height: 'clamp(400px, 60vw, 700px)', 
              background: 'var(--card-bg)', 
              borderRadius: '24px 24px 0 0', 
              border: '1px solid var(--border-strong)',
              borderBottom: 'none',
              boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
              overflow: 'hidden',
              position: 'relative',
              WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
              maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'
            }}>
            {/* Top Mac-like browser bar for aesthetic */}
            <div style={{ height: 48, background: 'var(--border-light)', display: 'flex', alignItems: 'center', padding: '0 20px', gap: 8, borderBottom: '1px solid var(--border-strong)' }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444' }}></div>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#f59e0b' }}></div>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#10b981' }}></div>
            </div>
            {/* Image content inside the mockup */}
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=80" alt="Dashboard Preview" style={{ width: '100%', height: 'calc(100% - 48px)', objectFit: 'cover' }} />
          </div>
        </div>
      </div>

      {/* ─── Top Alumni List (Marquee) ─── */}
      <div id="alumni" style={{ padding: '80px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-heading)' }}>Top Alumni List</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>Success stories from our integrated network.</p>
        </div>
        
        <div className="marquee-container">
          <div className="marquee-track">
            {marqueeAlumni.map((alumni, idx) => {
              const instName = institutes.find(i => i.id === alumni.instituteId)?.name || 'EduHub Institute';
              return (
              <div key={`${alumni.id}-${idx}`} className="bento-card" style={{ width: 360, minHeight: 480, padding: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <img src={alumni.picture} alt={alumni.name} style={{ width: 140, height: 140, borderRadius: '50%', objectFit: 'cover', border: '4px solid var(--border-light)', marginBottom: 24, flexShrink: 0 }} />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: 4, color: 'var(--text-heading)' }}>{alumni.name}</h3>
                  <p 
                    style={{ fontSize: '0.95rem', color: 'var(--primary)', fontWeight: 600, marginBottom: 16, cursor: 'pointer', display: 'inline-block' }}
                    onClick={() => navigate('/institute/' + alumni.instituteId)}
                  >
                    {instName}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, marginBottom: 24 }}>
                    <div style={{ display: 'flex', gap: 4 }}>
                      {[1,2,3,4,5].map(s => <Star key={s} size={16} color="#f59e0b" fill="#f59e0b" />)}
                    </div>
                    <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-heading)' }}>5.0</span>
                  </div>
                  <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.6, flex: 1 }}>
                    "{alumni.successStory}"
                  </p>
                </div>
              </div>
            )})}
          </div>
        </div>
      </div>

      {/* ─── Top Ranking Institutes (Marquee Reverse) ─── */}
      <div id="institutes" style={{ padding: '80px 0', background: 'var(--card-bg)' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-heading)' }}>Top Ranking Institutes</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>Explore the best campuses evaluated globally.</p>
        </div>
        
        <div className="marquee-container">
          <div className="marquee-track reverse">
            {marqueeInstitutes.map((inst, idx) => (
              <div key={`${inst.id}-${idx}`} className="bento-card" style={{ width: 360, minHeight: 480, padding: 24, cursor: 'pointer', display: 'flex', flexDirection: 'column' }} onClick={() => navigate('/institute/' + inst.id)}>
                <div style={{ width: '100%', height: 260, borderRadius: 16, overflow: 'hidden', marginBottom: 24 }}>
                  <img src={inst.image} alt={inst.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: 12, color: 'var(--text-heading)' }}>{inst.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: 'auto' }}>
                    <Star size={20} color="#f59e0b" fill="#f59e0b" /> <span style={{ fontWeight: 600 }}>{inst.rating}</span> / 5.0
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: 16 }}>
                    <MapPin size={18} /> {inst.branches?.length || 1} Campuses
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Upcoming Events (Premium Layout) ─── */}
      <div style={{ padding: '120px 20px', background: 'var(--bg-color)', borderBottom: '1px solid var(--border-light)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 80, flexWrap: 'wrap', gap: 24 }}>
            <div>
              <h2 style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--text-heading)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>Upcoming <br /> <span style={{ color: 'var(--primary)' }}>Events</span></h2>
            </div>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: 400, textAlign: 'right' }}>
              Exclusive seminars, hackathons, and global meetups across all campuses.
            </p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {events.map((ev, idx) => {
              const inst = institutes.find(i => i.id === ev.instituteId);
              const dateParts = ev.date.split(' ');
              const month = dateParts[0];
              const day = dateParts[1]?.replace(',', '');
              
              return (
                <div key={ev.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '40px 0', borderTop: '1px solid var(--border-strong)', cursor: 'pointer', transition: 'all 0.3s ease' }} onMouseOver={(e) => e.currentTarget.style.paddingLeft = '24px'} onMouseOut={(e) => e.currentTarget.style.paddingLeft = '0'}>
                  <div style={{ display: 'flex', gap: 60, alignItems: 'center' }}>
                    <div style={{ width: 80 }}>
                      <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--primary)', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>{month}</span>
                      <span style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-heading)', lineHeight: 1 }}>{day}</span>
                    </div>
                    <div>
                      <h3 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: 8, color: 'var(--text-heading)', letterSpacing: '-0.02em' }}>{ev.title}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontSize: '1.1rem' }} onClick={(e) => { e.stopPropagation(); navigate('/institute/' + ev.instituteId); }}>
                        <MapPin size={18} /> <span style={{ transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary)'} onMouseOut={(e) => e.currentTarget.style.color = 'inherit'}>{inst?.name || 'EduHub Campus'}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', border: '1px solid var(--border-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-heading)', flexShrink: 0 }}>
                    <ChevronRight size={24} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── Top Facilities (Bento Grid) ─── */}
      <div id="features" style={{ padding: '120px 20px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--text-heading)' }}>Built for everyone</h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: 600, margin: '16px auto 0' }}>
            Thousands of users, from students to enterprise campus admins, use EduHub to handle education.
          </p>
        </div>

        <div className="bento-grid">
          {/* Bento 1: Students */}
          <div className="bento-card">
            <div className="bento-img-container" style={{ padding: 0 }}>
              <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80" alt="Students" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <h3>For Students & Learners</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: 12, lineHeight: 1.5 }}>
              Use a single cloud system for your applications, track your attendance, and monitor grades in real-time.
            </p>
          </div>

          {/* Bento 2: Teachers */}
          <div className="bento-card">
            <div className="bento-img-container" style={{ padding: 0 }}>
              <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80" alt="Teachers" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <h3>For Teachers & Trainers</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: 12, lineHeight: 1.5 }}>
              Get always up-to-date data on student performance, manage classes, and utilize practical web labs easily.
            </p>
          </div>

          {/* Bento 3: Admins */}
          <div className="bento-card">
            <div className="bento-img-container" style={{ padding: 0 }}>
              <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80" alt="Admins" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <h3>For Institute Admins</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: 12, lineHeight: 1.5 }}>
              EduHub helps admin teams streamline compliance, manage campus branches, and monitor overall performance.
            </p>
          </div>

          {/* Bento 4: Large Analytics */}
          <div className="bento-card large" style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: 16 }}>All campus data at once</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
                Contact and personal information, past and upcoming events, career history, projects, and more all in one unified dashboard.
              </p>
            </div>
            <div style={{ flex: 1, background: 'var(--bg-color)', borderRadius: 16, height: 200, display: 'flex', flexDirection: 'column', gap: 12, padding: 20, boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.05)' }}>
              {/* Fake UI for illustration */}
              <div style={{ height: 16, width: '40%', background: 'var(--border-strong)', borderRadius: 8 }}></div>
              <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--primary)' }}></div>
                <div style={{ flex: 1, background: '#fff', borderRadius: 8, border: '1px solid var(--border-light)' }}></div>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#f59e0b' }}></div>
                <div style={{ flex: 1, background: '#fff', borderRadius: 8, border: '1px solid var(--border-light)' }}></div>
              </div>
            </div>
          </div>

          {/* Bento 5: Events */}
          <div className="bento-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="bento-img-container" style={{ padding: 0, flex: 1, marginBottom: 20 }}>
              <img src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80" alt="Events" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: 8 }}>Upcoming Events</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5 }}>
              Stay up to date with the latest seminars, webinars, and hackathons across all campuses.
            </p>
          </div>
        </div>
      </div>

      {/* ─── Integrations (Animated Floating Icons) ─── */}
      <div style={{ padding: '80px 20px 120px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 700, color: 'var(--text-heading)', marginBottom: 60 }}>Integrate with your existing tools in seconds</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(16px, 4vw, 40px)', alignItems: 'center', minHeight: 120, flexWrap: 'wrap' }}>
           <div className="floating-icon" style={{ position: 'relative', width: 'clamp(48px, 10vw, 64px)', height: 'clamp(48px, 10vw, 64px)', borderRadius: 16, animation: 'float2 6s infinite' }}><Video size={32} color="#ea4335" /></div>
           <div className="floating-icon" style={{ position: 'relative', width: 'clamp(56px, 12vw, 72px)', height: 'clamp(56px, 12vw, 72px)', borderRadius: 16, animation: 'float1 7s infinite', transform: 'translateY(-20px)' }}><MessageSquare size={36} color="#4a154b" /></div>
           <div className="floating-icon" style={{ position: 'relative', width: 'clamp(72px, 15vw, 96px)', height: 'clamp(72px, 15vw, 96px)', borderRadius: 24, animation: 'float3 5s infinite' }}><Cloud size={48} color="#0056e0" /></div>
           <div className="floating-icon" style={{ position: 'relative', width: 'clamp(56px, 12vw, 72px)', height: 'clamp(56px, 12vw, 72px)', borderRadius: 16, animation: 'float2 8s infinite', transform: 'translateY(-20px)' }}><FileText size={36} color="#2563eb" /></div>
           <div className="floating-icon" style={{ position: 'relative', width: 'clamp(48px, 10vw, 64px)', height: 'clamp(48px, 10vw, 64px)', borderRadius: 16, animation: 'float1 6s infinite' }}><Calendar size={32} color="#16a34a" /></div>
        </div>
      </div>

      {/* ─── Words of Appreciation (Premium Layout) ─── */}
      <div style={{ padding: 'clamp(80px, 10vw, 160px) 20px', background: 'var(--card-bg)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 'clamp(40px, 8vw, 80px)', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ flex: '1 1 400px', position: 'relative' }}>
            <span style={{ position: 'absolute', top: '-0.5em', left: '-0.2em', fontSize: 'clamp(6rem, 15vw, 12rem)', color: 'var(--primary)', opacity: 0.1, fontFamily: 'serif', lineHeight: 1 }}>"</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: 'var(--text-heading)', lineHeight: 1.3, letterSpacing: '-0.02em', marginBottom: 40, position: 'relative', zIndex: 10 }}>
              EduHub has <span style={{ color: 'var(--primary)' }}>streamlined</span> our entire campus process, making tasks incredibly efficient.
            </h2>
            <div style={{ display: 'flex', gap: 16 }}>
              <button className="nav-btn-primary" style={{ width: 56, height: 56, borderRadius: '50%', background: 'transparent', color: 'var(--text-heading)', border: '1px solid var(--border-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ChevronLeft size={24} /></button>
              <button className="nav-btn-primary" style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--text-heading)', color: 'var(--bg-color)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ChevronRight size={24} /></button>
            </div>
          </div>
          
          <div style={{ flex: '1 1 320px', display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 400 }}>
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80" alt="Sarah Mitchell" style={{ width: '100%', height: 'auto', aspectRatio: '3/4', objectFit: 'cover', borderRadius: 24, boxShadow: '0 24px 48px rgba(0,0,0,0.1)' }} />
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-heading)' }}>Sarah Mitchell</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Director of Education</p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Footer ─── */}
      <div style={{ padding: '80px 20px 0', position: 'relative', overflow: 'hidden', background: 'var(--primary)', color: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 40, position: 'relative', zIndex: 10 }}>
          <div style={{ maxWidth: 300 }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 16, color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 32, height: 32, background: 'rgba(255,255,255,0.2)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <GraduationCap size={20} color="#fff" />
              </div>
              EduHub
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>The all-in-one education platform that builds thriving campus cultures.</p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 80 }}>
            <div>
              <h4 style={{ fontWeight: 600, marginBottom: 20, color: '#fff' }}>Product</h4>
              <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 12, cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'} onClick={() => document.getElementById('features')?.scrollIntoView({behavior: 'smooth'})}>Features</p>
              <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 12, cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}>Pricing</p>
              <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 12, cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'} onClick={() => document.getElementById('institutes')?.scrollIntoView({behavior: 'smooth'})}>Institutes</p>
            </div>
            <div>
              <h4 style={{ fontWeight: 600, marginBottom: 20, color: '#fff' }}>Resources</h4>
              <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 12, cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}>Blog</p>
              <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 12, cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}>Help Center</p>
              <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 12, cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}>Contact</p>
            </div>
            <div>
              <h4 style={{ fontWeight: 600, marginBottom: 20, color: '#fff' }}>Follow us</h4>
              <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 12, cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}>Twitter</p>
              <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 12, cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}>LinkedIn</p>
            </div>
          </div>
        </div>
        
        {/* Massive Text Background */}
        <div style={{ textAlign: 'center', marginTop: 60, position: 'relative', overflow: 'hidden', height: '20vw', pointerEvents: 'none', userSelect: 'none', WebkitUserSelect: 'none' }}>
          <h1 style={{ 
            fontSize: '25vw', 
            fontWeight: 900, 
            lineHeight: 0.8, 
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0,
            whiteSpace: 'nowrap',
            position: 'absolute',
            bottom: -20,
            left: '50%',
            transform: 'translateX(-50%)'
          }}>EduHub</h1>
        </div>
      </div>

    </div>
  );
}
