import React, { useState } from 'react';
import { Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import { getInstituteData } from '../../data/mockData';

export default function AlertsBroadcast({ user }) {
  const instituteId = user?.profile?.instituteId;
  const data = instituteId ? getInstituteData(instituteId) : null;
  
  const [target, setTarget] = useState('all');
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('info');
  const [status, setStatus] = useState('idle'); // idle, sending, success

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    setStatus('sending');
    // Simulate network delay
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 3000);
    }, 800);
  };

  if (!data) return <div>No institute data found.</div>;

  return (
    <div className="content-container animate-fade-in" style={{ maxWidth: 800 }}>
      <div className="page-header">
        <h1>Broadcast Alerts</h1>
        <p style={{ color: 'var(--text-muted)' }}>Send real-time notifications to staff and students across your campuses.</p>
      </div>

      <div className="table-card" style={{ padding: 32 }}>
        {status === 'success' ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 0', color: 'var(--green)' }}>
            <CheckCircle2 size={64} style={{ marginBottom: 16 }} />
            <h2 style={{ margin: 0, fontSize: '1.4rem' }}>Message Broadcasted Successfully</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: 8 }}>The alert has been pushed to the selected audience.</p>
          </div>
        ) : (
          <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: 'var(--text-heading)' }}>Target Audience</label>
              <select 
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)', fontSize: '1rem', appearance: 'none' }}
              >
                <option value="all">All Campuses (Staff & Students)</option>
                <option value="staff_only">All Staff Only</option>
                <option value="students_only">All Students Only</option>
                <optgroup label="Specific Campuses">
                  {data.branches.map(b => (
                    <option key={b.id} value={`campus_${b.id}`}>{b.name}</option>
                  ))}
                </optgroup>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: 'var(--text-heading)' }}>Alert Severity</label>
              <div style={{ display: 'flex', gap: 16 }}>
                {['info', 'warning', 'critical'].map(sev => (
                  <label key={sev} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', border: `1px solid ${severity === sev ? 'var(--primary)' : 'var(--border-strong)'}`, borderRadius: 8, cursor: 'pointer', background: severity === sev ? 'rgba(16,185,129,0.05)' : 'var(--bg-color)' }}>
                    <input 
                      type="radio" 
                      name="severity" 
                      value={sev} 
                      checked={severity === sev} 
                      onChange={() => setSeverity(sev)} 
                      style={{ margin: 0 }}
                    />
                    <span style={{ textTransform: 'capitalize', fontWeight: severity === sev ? 600 : 400, color: severity === sev ? 'var(--primary)' : 'var(--text-main)' }}>{sev}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: 'var(--text-heading)' }}>Message Content</label>
              <textarea 
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your alert message here..."
                rows={5}
                style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)', fontSize: '1rem', resize: 'vertical' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
              <button 
                type="submit" 
                disabled={status === 'sending' || !message.trim()}
                style={{ padding: '12px 32px', borderRadius: 8, border: 'none', background: 'var(--primary)', color: '#fff', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, opacity: (status === 'sending' || !message.trim()) ? 0.6 : 1, cursor: (status === 'sending' || !message.trim()) ? 'not-allowed' : 'pointer' }}
              >
                {status === 'sending' ? (
                  <>Sending...</>
                ) : (
                  <><Send size={18} /> Broadcast Now</>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
