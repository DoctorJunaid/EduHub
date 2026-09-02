import React, { useState } from 'react';
import { Star, MapPin, Calendar, Users, Briefcase, GraduationCap, Buildings, VideoCamera, ChatCircle, Cloud, FileText, CaretLeft, CaretRight, X, CheckCircle, Play, Moon, Sun } from '@phosphor-icons/react';
import { top_alumni, institutes, events } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import HeroFanDeck from '../components/HeroFanDeck/HeroFanDeck';

export default function LandingPage({ onGetStarted, isDark, setIsDark }) {
  const navigate = useNavigate();

  // Duplicate arrays for infinite scrolling marquee effect
  // Duplicate arrays for infinite scrolling marquee effect
  const marqueeInstitutes = [...institutes, ...institutes, ...institutes];
  const marqueeAlumni = [...top_alumni, ...top_alumni, ...top_alumni];

  return (
    <div className="content-container animate-stagger" style={{ maxWidth: '100%', padding: '0', margin: '0 auto', overflowX: 'hidden' }}>

      {/* ─── Hero Section: Animated Fan Deck (Inspired by Reference) ─── */}
      <HeroFanDeck onGetStarted={onGetStarted} navigate={navigate} />

      {/* ─── Top Alumni List (Extraordinary Cards) ─── */}
      <div id="alumni" style={{ padding: '100px 0', background: 'var(--bg-color)' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="lp-section-label">Success Stories</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: 'var(--text-heading)', letterSpacing: '-0.03em' }}>Where Our Graduates Are Now</h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: 500, margin: '12px auto 0' }}>The network effect of Pakistan's finest institutions.</p>
        </div>

        <div className="marquee-container">
          <div className="marquee-track">
            {marqueeAlumni.map((alumni, idx) => {
              const instName = institutes.find(i => i.id === alumni.instituteId)?.name || 'EduHub Institute';
              return (
                <div key={`${alumni.id}-${idx}`} className="xcard-alumni">
                  {/* Animated corner brackets */}
                  <div className="xcard-corner xcard-corner-tl" />
                  <div className="xcard-corner xcard-corner-tr" />
                  <div className="xcard-corner xcard-corner-bl" />
                  <div className="xcard-corner xcard-corner-br" />
                  {/* Shimmer sweep */}
                  <div className="xcard-shimmer" />
                  {/* Content */}
                  <div className="xcard-alumni-inner">
                    {/* Avatar with spinning ring */}
                    <div className="xcard-avatar-wrap">
                      <div className="xcard-avatar-ring" />
                      <div className="xcard-avatar-ring-inner" />
                      <img src={alumni.picture} alt={alumni.name} className="xcard-avatar-img" />
                      {/* Floating status dot */}
                      <div className="xcard-avatar-status" />
                    </div>
                    <h3 className="xcard-alumni-name">{alumni.name}</h3>
                    <p className="xcard-alumni-inst" onClick={() => navigate('/institute/' + alumni.instituteId)}>{instName}</p>
                    {/* Decorative line */}
                    <div className="xcard-divider-fancy">
                      <div className="xcard-divider-line" />
                      <div className="xcard-divider-diamond" />
                      <div className="xcard-divider-line" />
                    </div>
                    <p className="xcard-alumni-quote">"{alumni.successStory}"</p>
                    {/* Bottom accent orb */}
                    <div className="xcard-orb" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>


      {/* ─── Top Ranking Institutes (Extraordinary Cards) ─── */}
      <div id="institutes" style={{ padding: '100px 0', background: 'var(--card-bg)', borderTop: '1px solid var(--border-light)' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="lp-section-label">Our Network</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: 'var(--text-heading)', letterSpacing: '-0.03em' }}>Pakistan's Top-Ranked Institutions</h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: 500, margin: '12px auto 0' }}>From NUST to AKU — the country's finest campuses trust EduHub.</p>
        </div>

        <div className="marquee-container">
          <div className="marquee-track reverse">
            {marqueeInstitutes.map((inst, idx) => (
              <div key={`${inst.id}-${idx}`} className="xcard-institute" onClick={() => navigate('/institute/' + inst.id)}>
                {/* Animated corner brackets */}
                <div className="xcard-corner xcard-corner-tl" />
                <div className="xcard-corner xcard-corner-tr" />
                <div className="xcard-corner xcard-corner-bl" />
                <div className="xcard-corner xcard-corner-br" />
                {/* Shimmer sweep */}
                <div className="xcard-shimmer" />
                {/* Animated border glow */}
                <div className="xcard-border-glow" />
                {/* Image area */}
                <div className="xcard-inst-img-wrap">
                  <img src={inst.image} alt={inst.name} className="xcard-inst-img" />
                  <div className="xcard-inst-img-overlay" />
                  {/* Glassmorphism rating badge */}
                  <div className="xcard-inst-rating">
                    <Star size={13} color="#f59e0b" fill="#f59e0b" />
                    <span>{inst.rating}</span>
                  </div>
                  {/* Type badge */}
                  <div className="xcard-inst-type">{inst.type || 'University'}</div>
                </div>
                {/* Content */}
                <div className="xcard-inst-content">
                  <h3 className="xcard-inst-name">{inst.name}</h3>
                  <div className="xcard-inst-meta">
                    <MapPin size={14} strokeWidth={2.5} />
                    <span>{inst.address?.split(',').pop()?.trim() || 'Pakistan'}</span>
                  </div>
                  {/* Bottom animated line */}
                  <div className="xcard-inst-bottom-line" />
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
                    <CaretRight size={24} />
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

        <div className="xbento-grid">
          {/* Bento 1: Students */}
          <div className="xbento-card">
            <div className="xbento-img-wrap">
              <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80" alt="Students" className="xbento-img" />
              <div className="xbento-img-overlay" />
            </div>
            <div className="xbento-content">
              <h3 className="xbento-title">For Students & Learners</h3>
              <p className="xbento-desc">
                Use a single cloud system for your applications, track your attendance, and monitor grades in real-time.
              </p>
            </div>
          </div>

          {/* Bento 2: Teachers */}
          <div className="xbento-card">
            <div className="xbento-img-wrap">
              <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80" alt="Teachers" className="xbento-img" />
              <div className="xbento-img-overlay" />
            </div>
            <div className="xbento-content">
              <h3 className="xbento-title">For Teachers & Trainers</h3>
              <p className="xbento-desc">
                Get always up-to-date data on student performance, manage classes, and utilize practical web labs easily.
              </p>
            </div>
          </div>

          {/* Bento 3: Admins */}
          <div className="xbento-card">
            <div className="xbento-img-wrap">
              <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80" alt="Admins" className="xbento-img" />
              <div className="xbento-img-overlay" />
            </div>
            <div className="xbento-content">
              <h3 className="xbento-title">For Institute Admins</h3>
              <p className="xbento-desc">
                EduHub helps admin teams streamline compliance, manage campus branches, and monitor overall performance.
              </p>
            </div>
          </div>

          {/* Bento 4: Large Analytics */}
          <div className="xbento-card large">
            <div className="xbento-content">
              <h3 className="xbento-title">All campus data at once</h3>
              <p className="xbento-desc">
                Contact and personal information, past and upcoming events, career history, projects, and more all in one unified dashboard.
              </p>
            </div>
            <div className="xbento-visual">
              {/* Fake UI for illustration */}
              <div style={{ width: '100%', maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'var(--card-bg)', padding: 16, borderRadius: 16, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid var(--border-light)' }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--primary)', opacity: 0.8 }}></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ width: '60%', height: 12, background: 'var(--border-strong)', borderRadius: 6, marginBottom: 8 }}></div>
                    <div style={{ width: '40%', height: 10, background: 'var(--border-light)', borderRadius: 5 }}></div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'var(--card-bg)', padding: 16, borderRadius: 16, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid var(--border-light)', opacity: 0.7 }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#f59e0b', opacity: 0.8 }}></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ width: '50%', height: 12, background: 'var(--border-strong)', borderRadius: 6, marginBottom: 8 }}></div>
                    <div style={{ width: '30%', height: 10, background: 'var(--border-light)', borderRadius: 5 }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bento 5: Events */}
          <div className="xbento-card">
            <div className="xbento-img-wrap">
              <img src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80" alt="Events" className="xbento-img" />
              <div className="xbento-img-overlay" />
            </div>
            <div className="xbento-content">
              <h3 className="xbento-title">Upcoming Events</h3>
              <p className="xbento-desc">
                Stay up to date with the latest seminars, webinars, and hackathons across all campuses.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Integrations (Animated Floating Icons) ─── */}
      <div style={{ padding: '80px 20px 120px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 700, color: 'var(--text-heading)', marginBottom: 60 }}>Integrate with your existing tools in seconds</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(16px, 4vw, 40px)', alignItems: 'center', minHeight: 120, flexWrap: 'wrap' }}>
          <div className="floating-icon" style={{ position: 'relative', width: 'clamp(48px, 10vw, 64px)', height: 'clamp(48px, 10vw, 64px)', borderRadius: 16, animation: 'float2 6s infinite' }}><VideoCamera size={32} color="#ea4335" /></div>
          <div className="floating-icon" style={{ position: 'relative', width: 'clamp(56px, 12vw, 72px)', height: 'clamp(56px, 12vw, 72px)', borderRadius: 16, animation: 'float1 7s infinite', transform: 'translateY(-20px)' }}><ChatCircle size={36} color="#4a154b" /></div>
          <div className="floating-icon" style={{ position: 'relative', width: 'clamp(72px, 15vw, 96px)', height: 'clamp(72px, 15vw, 96px)', borderRadius: 24, animation: 'float3 5s infinite' }}><Cloud size={48} color="#0056e0" /></div>
          <div className="floating-icon" style={{ position: 'relative', width: 'clamp(56px, 12vw, 72px)', height: 'clamp(56px, 12vw, 72px)', borderRadius: 16, animation: 'float2 8s infinite', transform: 'translateY(-20px)' }}><FileText size={36} color="#2563eb" /></div>
          <div className="floating-icon" style={{ position: 'relative', width: 'clamp(48px, 10vw, 64px)', height: 'clamp(48px, 10vw, 64px)', borderRadius: 16, animation: 'float1 6s infinite' }}><Calendar size={32} color="#16a34a" /></div>
        </div>
      </div>

      {/* ─── Words of Appreciation (Extraordinary 3D Layout) ─── */}
      <div style={{ padding: 'clamp(100px, 12vw, 180px) 20px', background: 'var(--bg-color)', position: 'relative', overflow: 'hidden' }}>

        <div style={{ textAlign: 'center', marginBottom: 60, position: 'relative', zIndex: 2 }}>
          <span className="lp-section-label">Founder's Note</span>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, color: 'var(--text-heading)', letterSpacing: '-0.03em' }}>Built by students, for students.</h2>
        </div>

        <div className="xcard-testimonial-wrapper">
          <div className="xcard-testimonial-quote-mark">"</div>

          <div className="xcard-testimonial">
            {/* Left Content */}
            <div className="xcard-test-content">
              <h2 className="xcard-test-text">
                EduHub was created to <span className="xcard-test-text-highlight">eliminate the chaos</span> of campus management. We believe technology should get out of the way, so you can focus on learning.
              </h2>

              <div className="xcard-test-controls">
                <div className="xcard-test-btn"><CaretLeft size={24} /></div>
                <div className="xcard-test-btn active"><CaretRight size={24} /></div>
              </div>
            </div>

            {/* Right Image */}
            <div className="xcard-test-image-wrap">
              <div className="xcard-test-img-container">
                <img src="/founder.png" alt="Muhammad Junaid" className="xcard-test-img" />

                <div className="xcard-test-info">
                  <h3 className="xcard-test-name">Muhammad Junaid</h3>
                  <p className="xcard-test-role">Founder & CEO, EduHub</p>
                </div>
              </div>
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
              <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 12, cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'} onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>Features</p>
              <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 12, cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}>Pricing</p>
              <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 12, cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'} onClick={() => document.getElementById('institutes')?.scrollIntoView({ behavior: 'smooth' })}>Institutes</p>
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

      {/* ─── Floating Quick Theme Switcher ─── */}
      {setIsDark && (
        <div style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 9999 }}>
          <button
            onClick={() => setIsDark(!isDark)}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 18px',
              borderRadius: 'var(--r-full)',
              background: 'var(--card-bg)',
              color: 'var(--text-heading)',
              border: '1px solid var(--border-strong)',
              boxShadow: '0 8px 24px -4px rgba(0, 0, 0, 0.2)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              fontWeight: 650,
              fontSize: '0.86rem',
              cursor: 'pointer',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
              e.currentTarget.style.borderColor = 'var(--primary)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.borderColor = 'var(--border-strong)';
            }}
          >
            {isDark ? <Sun size={18} color="var(--primary)" weight="bold" /> : <Moon size={18} color="var(--primary)" weight="bold" />}
            <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      )}

    </div>
  );
}
