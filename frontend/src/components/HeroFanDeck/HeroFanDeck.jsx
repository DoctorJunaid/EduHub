import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Play, 
  ArrowsClockwise, 
  GraduationCap, 
  Buildings, 
  CheckCircle, 
  Sparkle, 
  Star, 
  X, 
  MapPin, 
  Users, 
  Globe 
} from '@phosphor-icons/react';
import HeroCard from './HeroCard';
import HeroBadge from './HeroBadge';
import './heroFanDeck.css';

const HERO_CARDS = [
  {
    id: 'feature_universities',
    title: 'Top Universities',
    subtitle: 'Explore 50+ Campuses',
    category: 'Discover',
    accent: '#10b981',
    stat: 'Accredited Institutes',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
    instituteId: null,
    description: 'Discover accredited degree programs and explore top-tier universities integrated into our ecosystem.'
  },
  {
    id: 'feature_ranking',
    title: 'Ranking System',
    subtitle: 'Performance Metrics',
    category: 'Leaderboard',
    accent: '#3b82f6',
    stat: 'Real-time Stats',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80',
    instituteId: null,
    description: 'Track and compare institutional performance, student achievements, and academic rankings dynamically.'
  },
  {
    id: 'feature_centralized',
    title: 'Centralize Record',
    subtitle: 'Unified Data Vault',
    category: 'Database',
    accent: '#f59e0b',
    stat: '100% Secure Storage',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80',
    instituteId: null,
    description: 'A single cloud system for your applications, attendance, grades, and personal information, all in one place.'
  },
  {
    id: 'hero_eduhub_os',
    title: 'EduHub Campus OS',
    subtitle: 'Unified Campus Ecosystem',
    category: 'Live Network',
    accent: '#10b981',
    stat: '120k+ Active Students',
    isCrown: true,
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
    instituteId: null,
    description: 'The central nervous system for modern universities — automating admissions, grading, fee settlements, and student tracking.'
  },
  {
    id: 'feature_student_manage',
    title: 'Managing Student',
    subtitle: 'Track & Empower',
    category: 'Administration',
    accent: '#6366f1',
    stat: 'Holistic Profiles',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80',
    instituteId: null,
    description: 'Monitor student performance, manage classes, and utilize practical web labs to ensure academic success.'
  },
  {
    id: 'feature_alumni',
    title: 'Alumni Network',
    subtitle: 'Community & Connections',
    category: 'Community',
    accent: '#8b5cf6',
    stat: 'Global Reach',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80',
    instituteId: null,
    description: 'Keep graduates engaged with exclusive networking events, career history tracking, and continuous learning.'
  },
  {
    id: 'feature_events',
    title: 'Upcoming Events',
    subtitle: 'Campus Activities',
    category: 'Events',
    accent: '#e11d48',
    stat: 'Stay Updated',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    instituteId: null,
    description: 'Stay up to date with the latest seminars, conferences, and student activities across all campus branches.'
  }
];

export default function HeroFanDeck({ onGetStarted, navigate }) {
  const [isFanned, setIsFanned] = useState(false);
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });
  const stageRef = useRef(null);

  // Trigger unfurl animation shortly after mount to replicate video entrance
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFanned(true);
    }, 450);
    const introTimer = setTimeout(() => {
      setIsIntroComplete(true);
    }, 2000);
    return () => {
      clearTimeout(timer);
      clearTimeout(introTimer);
    };
  }, []);

  // 3D Parallax tilt on mouse movement
  const handleMouseMove = (e) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1
    setMouseTilt({
      x: x * 6, // max 6deg rotateY
      y: -y * 4  // max 4deg rotateX
    });
  };

  const handleMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0 });
    setHoveredIndex(null);
  };

  // Replay animation effect
  const handleReplay = () => {
    setIsFanned(false);
    setIsIntroComplete(false);
    setTimeout(() => {
      setIsFanned(true);
    }, 300);
    setTimeout(() => {
      setIsIntroComplete(true);
    }, 2000);
  };

  const handleCardClick = (card) => {
    if (card.instituteId && navigate) {
      navigate(`/institute/${card.instituteId}`);
    } else {
      setSelectedCard(card);
    }
  };

  return (
    <section className="hero-fan-container" id="top">
      {/* Ambient Radial Illumination */}
      <div className="hero-ambient-glow" />

      {/* Main Headline matching video phrasing & rhythm */}
      <motion.h1 
        className="hero-headline"
        initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      >
        <span className="headline-light">A place to empower your</span> <br />
        <span className="headline-bold headline-highlight">academic future.</span>
      </motion.h1>

      {/* ─── The Grand Fan Deck Stage (0.6s – 1.6s bloom) ─── */}
      <div 
        className="hero-deck-stage"
        ref={stageRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div 
          className="hero-deck-wrapper"
          animate={{
            rotateY: mouseTilt.x,
            rotateX: mouseTilt.y
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        >
          {/* ─── Floating Speech-Bubble Badges matching video ─── */}
          <AnimatePresence>
            {isFanned && (
              <>
                {/* Left Badge: Admissions pointing to Left Card */}
                <HeroBadge
                  variant="blue"
                  handle="@sarah.admin"
                  subtext="Admissions Director"
                  avatar="https://ui-avatars.com/api/?name=Sarah&background=2563eb&color=fff"
                  style={{
                    top: '12%',
                    left: 'clamp(8%, 18vw, 24%)',
                  }}
                  delay={1.1}
                  onClick={() => handleCardClick(HERO_CARDS[0])}
                />

                {/* Right Badge: Finance pointing to Right Card */}
                <HeroBadge
                  variant="green"
                  handle="@david.cfo"
                  subtext="University CFO"
                  avatar="https://ui-avatars.com/api/?name=David&background=059669&color=fff"
                  style={{
                    top: '14%',
                    right: 'clamp(8%, 18vw, 24%)',
                  }}
                  delay={1.3}
                  onClick={() => handleCardClick(HERO_CARDS[2])}
                />
              </>
            )}
          </AnimatePresence>

          {/* ─── 7-Card Fan Arc Deck ─── */}
          {HERO_CARDS.map((card, index) => (
            <HeroCard
              key={card.id}
              card={card}
              index={index}
              totalCards={HERO_CARDS.length}
              isFanned={isFanned}
              isIntroComplete={isIntroComplete}
              hoveredIndex={hoveredIndex}
              onHover={setHoveredIndex}
              onSelect={handleCardClick}
            />
          ))}
        </motion.div>
      </div>

      {/* Subtitle Description */}
      <motion.p 
        className="hero-subtitle"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
      >
        Automate and unify your institution's operations—from student enrollment and interactive grading, to seamless fee management and deep analytics, all in one intelligent portal.
      </motion.p>

      {/* Dual Pill CTA Buttons matching video styling */}
      <motion.div 
        className="hero-actions"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.85 }}
      >


        <button 
          className="hero-btn-primary"
          onClick={() => onGetStarted && onGetStarted()}
        >
          <span>Get Started</span>
          <ArrowRight size={18} weight="bold" />
        </button>

        <button 
          className="hero-btn-secondary"
          onClick={() => {
            // Placeholder for video modal or demo section scroll
            alert("Demo video player would open here!");
          }}
        >
          <Play size={18} weight="bold" />
          <span>Watch Demo</span>
        </button>

        {/* Replay button to trigger the unfurl sensation */}
        <button 
          className="hero-btn-replay"
          onClick={handleReplay}
          title="Replay card unfurl animation"
        >
          <ArrowsClockwise size={18} weight="bold" />
        </button>
      </motion.div>

      {/* Quick Glance Modal for Center OS Card or Details */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div 
            className="hero-card-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCard(null)}
          >
            <motion.div 
              className="hero-card-modal"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
                <img 
                  src={selectedCard.image} 
                  alt={selectedCard.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 100%)' }} />
                <button 
                  onClick={() => setSelectedCard(null)}
                  style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(0,0,0,0.6)', border: 'none', color: '#fff', width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                >
                  <X size={16} weight="bold" />
                </button>
                <div style={{ position: 'absolute', bottom: 16, left: 20, right: 20 }}>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: selectedCard.accent, fontWeight: 700 }}>
                    {selectedCard.category}
                  </span>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff', margin: '4px 0 0' }}>
                    {selectedCard.title}
                  </h3>
                </div>
              </div>

              <div style={{ padding: '24px' }}>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: '0 0 20px' }}>
                  {selectedCard.description}
                </p>

                <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', color: 'var(--text-heading)', background: 'var(--border-light)', padding: '6px 12px', borderRadius: 8 }}>
                    <Sparkle size={14} color="var(--primary)" weight="fill" />
                    <span>{selectedCard.subtitle}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', color: 'var(--text-heading)', background: 'var(--border-light)', padding: '6px 12px', borderRadius: 8 }}>
                    <Star size={14} color="#f59e0b" weight="fill" />
                    <span>{selectedCard.stat}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                  <button 
                    className="hero-btn-primary" 
                    style={{ flex: 1, justifyContent: 'center' }}
                    onClick={() => {
                      setSelectedCard(null);
                      if (selectedCard.instituteId && navigate) {
                        navigate(`/institute/${selectedCard.instituteId}`);
                      } else {
                        onGetStarted();
                      }
                    }}
                  >
                    <span>{selectedCard.instituteId ? 'View Institute' : 'Get Started'}</span>
                    <ArrowRight size={16} weight="bold" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
