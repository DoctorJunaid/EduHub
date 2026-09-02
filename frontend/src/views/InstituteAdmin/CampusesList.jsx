import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Building2, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { campus_branches, getInstituteData, deleteCampus } from '../../data/mockData';

export default function CampusesList({ user }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const instituteId = user?.profile?.instituteId;
  const data = instituteId ? getInstituteData(instituteId) : null;
  
  if (!data) return <div>No institute data found.</div>;

  const branches = data.branches.filter(b => 
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id, e) => {
    e.stopPropagation();
    if(confirm('Are you sure you want to delete this campus?')) {
      deleteCampus(id);
      // Force re-render for mock data purposes
      navigate(0); 
    }
  };

  return (
    <div className="content-container animate-fade-in">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Campus Branches</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage your physical locations and facilities.</p>
        </div>
        <button 
          onClick={() => navigate('/dashboard/campuses/new')}
          style={{ padding: '10px 20px', background: 'var(--primary)', color: '#fff', borderRadius: '8px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}
        >
          <Plus size={18} /> Add Campus
        </button>
      </div>

      <div className="table-card">
        <div className="table-header" style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-light)' }}>
          <div className="search-bar" style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--bg-color)', padding: '10px 16px', borderRadius: '8px', width: '300px', border: '1px solid var(--border-strong)' }}>
            <Search size={18} color="var(--text-muted)" />
            <input 
              type="text" 
              placeholder="Search campuses..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', color: 'var(--text-main)' }}
            />
          </div>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Campus Name</th>
              <th>Address</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {branches.length === 0 && (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>No campuses found.</td>
              </tr>
            )}
            {branches.map(branch => (
              <tr 
                key={branch.id} 
                style={{ cursor: 'pointer', transition: 'background 0.2s' }}
                onClick={() => navigate(`/dashboard/campuses/${branch.id}`)}
              >
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--bg-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-light)' }}>
                      <Building2 size={20} color="var(--primary)" />
                    </div>
                    <div>
                      <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-heading)', display: 'block', marginBottom: 2 }}>{branch.name}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ID: {branch.id}</span>
                    </div>
                  </div>
                </td>
                <td style={{ color: 'var(--text-muted)' }}>{branch.address}</td>
                <td>
                  <span className="status-pill completed">Active</span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', alignItems: 'center' }}>
                    <button
                      onClick={(e) => { e.stopPropagation(); navigate(`/dashboard/campuses/${branch.id}`); }}
                      style={{ padding: '6px 14px', background: 'rgba(16,185,129,0.08)', color: 'var(--primary)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 8, fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Manage
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); navigate(`/dashboard/campuses/${branch.id}/edit`); }}
                      style={{ padding: 8, color: 'var(--text-muted)', background: 'var(--bg-color)', borderRadius: 8, border: '1px solid var(--border-light)', cursor: 'pointer' }}
                      title="Edit Campus Details"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={(e) => handleDelete(branch.id, e)}
                      style={{ padding: 8, color: '#ef4444', background: 'var(--bg-color)', borderRadius: 8, border: '1px solid var(--border-light)', cursor: 'pointer' }}
                      title="Delete Campus"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
