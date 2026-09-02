import React from 'react';
import { Search, Bell } from 'lucide-react';

export default function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="page-header">
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.5px' }}>{title}</h1>
        {subtitle && <p style={{ fontSize: '0.875rem', color: 'var(--muted)', marginTop: 2 }}>{subtitle}</p>}
      </div>
      <div className="header-actions">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input type="text" placeholder="Search anything..." />
        </div>
        <button className="icon-btn">
          <Bell size={18} />
          <span className="notif-dot" />
        </button>
        {actions}
      </div>
    </div>
  );
}
