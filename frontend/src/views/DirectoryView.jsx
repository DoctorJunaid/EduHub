import React, { useState } from 'react';
import { MagnifyingGlass, Faders, DotsThreeVertical, EnvelopeSimple, Phone } from '@phosphor-icons/react';
import { users } from '../data/mockData';

export default function DirectoryView({ user }) {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Faders out the super_admin from the directory for a cleaner look
  let directoryUsers = users.filter(u => u.role !== 'super_admin');

  if (filter !== 'All') {
    directoryUsers = directoryUsers.filter(u => u.role === filter.toLowerCase());
  }

  if (searchTerm.trim()) {
    directoryUsers = directoryUsers.filter(u => 
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return (
    <div className="content-container animate-stagger">
      <div className="page-header">
        <h1>Global Directory</h1>
        <div className="filter-tabs">
          {['All', 'Student', 'Teacher', 'Institute_Admin'].map(tab => (
            <div
              key={tab}
              className={`filter-tab ${filter === tab ? 'active' : ''}`}
              onClick={() => setFilter(tab)}
            >
              {tab.replace('_', ' ')}
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16, marginBottom: 8 }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', background: 'var(--card-bg)', border: '1px solid var(--border-strong)', padding: '12px 16px', borderRadius: 'var(--r-md)' }}>
          <MagnifyingGlass size={20} color="var(--text-muted)" style={{ marginRight: 12 }} />
          <input
            type="text"
            placeholder="MagnifyingGlass for students, teachers, or administrators..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '1rem', color: 'var(--text-main)' }}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
        {directoryUsers.map((u, idx) => (
          <div key={u.id} className="c-card" style={{ minHeight: 'auto', padding: 24 }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20 }}>
              <img src={u.avatar} alt={u.name} style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border-strong)' }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--text-heading)' }}>{u.name}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>
                  {u.role.replace('_', ' ')}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-main)', fontSize: '0.9rem' }}>
                <EnvelopeSimple size={16} color="var(--text-muted)" />
                {u.email}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-main)', fontSize: '0.9rem' }}>
                <Phone size={16} color="var(--text-muted)" />
                +92 300 555010{idx + 1}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              <button style={{ flex: 1, padding: '10px', background: 'var(--bg-color)', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-full)', fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-main)', cursor: 'pointer' }}>View Profile</button>
              <button style={{ flex: 1, padding: '10px', background: 'var(--primary)', borderRadius: 'var(--r-full)', fontWeight: 600, fontSize: '0.85rem', color: '#fff', border: 'none', cursor: 'pointer' }}>Message</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
