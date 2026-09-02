import React, { useState, useEffect } from 'react';
import { X, CheckCircle, CaretDown, ArrowRight } from '@phosphor-icons/react';

export default function GetStartedModal({ isOpen, onClose }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeField, setActiveField] = useState(null);

  // Reset form when opened
  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  // Premium Minimalist White Theme
  const modalBg = '#ffffff'; 
  const textMain = '#0f172a'; // Deep slate for high contrast
  const textMuted = '#64748b'; // Slate gray
  const borderColor = '#e2e8f0';
  const accentColor = '#10b981'; // EduHub primary green

  const inputStyle = {
    width: '100%',
    padding: '10px 0',
    background: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${borderColor}`,
    color: textMain,
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    fontFamily: 'inherit',
    letterSpacing: '-0.01em'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.7rem',
    fontWeight: 600,
    color: textMuted,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: 2,
    transition: 'color 0.3s'
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      {/* Backdrop */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(8px)' }} onClick={handleClose}></div>
      
      {/* Modal Box */}
      <div className="animate-stagger" style={{ 
        position: 'relative', 
        width: '100%', 
        maxWidth: 560, 
        maxHeight: '90vh',
        background: modalBg, 
        borderRadius: 20, 
        boxShadow: '0 24px 48px -12px rgba(0,0,0,0.15)', 
        overflowY: 'auto', 
        border: '1px solid #f1f5f9',
        color: textMain
      }}>
        
        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '32px 32px 12px' }}>
          <div>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, margin: 0, letterSpacing: '-0.04em', lineHeight: 1.1 }}>
              {isSubmitted ? 'Received.' : 'Let\'s talk.'}
            </h3>
            {!isSubmitted && (
              <p style={{ fontSize: '0.95rem', color: textMuted, marginTop: 8, maxWidth: 360, lineHeight: 1.4 }}>
                Elevate your campus management. Tell us about your institution.
              </p>
            )}
          </div>
          <button 
            onClick={handleClose}
            style={{ 
              background: 'transparent', 
              border: 'none', 
              color: textMuted, 
              cursor: 'pointer', 
              padding: 6, 
              display: 'flex', 
              transition: 'transform 0.3s, color 0.3s',
              alignSelf: 'flex-start',
              transform: 'rotate(0deg)'
            }}
            onMouseOver={(e) => { e.currentTarget.style.color = textMain; e.currentTarget.style.transform = 'rotate(90deg)'; }}
            onMouseOut={(e) => { e.currentTarget.style.color = textMuted; e.currentTarget.style.transform = 'rotate(0deg)'; }}
          >
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '0 32px 32px' }}>
          {isSubmitted ? (
            <div style={{ padding: '32px 0 16px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, borderRadius: '50%', border: `1px solid ${accentColor}`, color: accentColor, marginBottom: 24, background: 'rgba(16, 185, 129, 0.05)' }}>
                <CheckCircle size={28} strokeWidth={2} />
              </div>
              <h4 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 12, letterSpacing: '-0.02em' }}>Welcome to the future.</h4>
              <p style={{ color: textMuted, fontSize: '1rem', lineHeight: 1.6, maxWidth: 400 }}>
                Our team in Lahore is reviewing your details. We will contact you at your provided number to schedule a personalized onboarding session.
              </p>
              <button 
                onClick={handleClose}
                style={{ 
                  marginTop: 32, 
                  padding: '14px 40px', 
                  fontSize: '0.95rem', 
                  fontWeight: 600, 
                  background: textMain, 
                  color: modalBg, 
                  borderRadius: 100, 
                  border: 'none', 
                  cursor: 'pointer', 
                  transition: 'all 0.3s',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateX(4px)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateX(0)'; }}
              >
                Return to site <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 12 }}>
              
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 200px', position: 'relative' }}>
                  <label style={{ ...labelStyle, color: activeField === 'name' ? accentColor : textMuted }}>Full Name</label>
                  <input 
                    required type="text" placeholder="e.g. Ali Khan" 
                    style={{ ...inputStyle, borderBottomColor: activeField === 'name' ? accentColor : borderColor }}
                    onFocus={() => setActiveField('name')} onBlur={() => setActiveField(null)} 
                  />
                </div>
                <div style={{ flex: '1 1 200px', position: 'relative' }}>
                  <label style={{ ...labelStyle, color: activeField === 'institute' ? accentColor : textMuted }}>Institute Name</label>
                  <input 
                    required type="text" placeholder="e.g. LUMS" 
                    style={{ ...inputStyle, borderBottomColor: activeField === 'institute' ? accentColor : borderColor }}
                    onFocus={() => setActiveField('institute')} onBlur={() => setActiveField(null)} 
                  />
                </div>
              </div>

              <div style={{ position: 'relative' }}>
                <label style={{ ...labelStyle, color: activeField === 'type' ? accentColor : textMuted }}>Institute Type</label>
                <div style={{ position: 'relative' }}>
                  <select 
                    required defaultValue="" 
                    style={{ ...inputStyle, appearance: 'none', cursor: 'pointer', borderBottomColor: activeField === 'type' ? accentColor : borderColor }}
                    onFocus={() => setActiveField('type')} onBlur={() => setActiveField(null)}
                  >
                    <option value="" disabled style={{ color: textMuted }}>Select an option...</option>
                    <option value="college" style={{ color: textMain }}>University / Degree College</option>
                    <option value="school" style={{ color: textMain }}>K-12 School / Metric System</option>
                    <option value="coaching" style={{ color: textMain }}>Academy / Coaching Center</option>
                    <option value="other" style={{ color: textMain }}>Other</option>
                  </select>
                  <CaretDown size={18} color={textMuted} style={{ position: 'absolute', right: 4, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 200px', position: 'relative' }}>
                  <label style={{ ...labelStyle, color: activeField === 'email' ? accentColor : textMuted }}>Email Address</label>
                  <input 
                    required type="email" placeholder="ali@example.pk" 
                    style={{ ...inputStyle, borderBottomColor: activeField === 'email' ? accentColor : borderColor }}
                    onFocus={() => setActiveField('email')} onBlur={() => setActiveField(null)} 
                  />
                </div>
                <div style={{ flex: '1 1 200px', position: 'relative' }}>
                  <label style={{ ...labelStyle, color: activeField === 'phone' ? accentColor : textMuted }}>Phone Number</label>
                  <input 
                    required type="tel" placeholder="+92 300 1234567" 
                    style={{ ...inputStyle, borderBottomColor: activeField === 'phone' ? accentColor : borderColor }}
                    onFocus={() => setActiveField('phone')} onBlur={() => setActiveField(null)} 
                  />
                </div>
              </div>

              <div style={{ position: 'relative' }}>
                <label style={{ ...labelStyle, color: activeField === 'message' ? accentColor : textMuted }}>How can we help? (Optional)</label>
                <textarea 
                  placeholder="Tell us about your campus scale or specific modules you need..." 
                  style={{ ...inputStyle, minHeight: 44, resize: 'vertical', borderBottomColor: activeField === 'message' ? accentColor : borderColor, paddingTop: 10 }}
                  onFocus={() => setActiveField('message')} onBlur={() => setActiveField(null)}
                ></textarea>
              </div>

              <button 
                type="submit" 
                style={{ 
                  marginTop: 16, 
                  padding: '14px', 
                  fontSize: '0.95rem', 
                  fontWeight: 700, 
                  background: textMain, 
                  color: modalBg, 
                  borderRadius: 12, 
                  border: 'none', 
                  cursor: 'pointer', 
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)', 
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 10,
                  letterSpacing: '0.02em'
                }} 
                onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 12px 24px -8px rgba(15, 23, 42, 0.4)`; }} 
                onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                Submit Request <ArrowRight size={18} />
              </button>

            </form>
          )}
        </div>
      </div>
    </div>
  );
}
