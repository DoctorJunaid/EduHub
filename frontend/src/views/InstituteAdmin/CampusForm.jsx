import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, FloppyDisk } from '@phosphor-icons/react';
import { campus_branches, addCampus, updateCampus } from '../../data/mockData';

export default function CampusForm({ user }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const instituteId = user?.profile?.instituteId;

  const [formData, setFormData] = useState({
    name: '',
    address: ''
  });

  useEffect(() => {
    if (isEdit) {
      const existing = campus_branches.find(c => c.id === id);
      if (existing) setFormData(existing);
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      updateCampus(id, formData);
    } else {
      addCampus({ ...formData, instituteId });
    }
    navigate('/dashboard/campuses');
  };

  return (
    <div className="content-container animate-fade-in" style={{ maxWidth: 800 }}>
      <button 
        onClick={() => navigate('/dashboard/campuses')}
        style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', marginBottom: 24, cursor: 'pointer', background: 'none', border: 'none' }}
      >
        <ArrowLeft size={18} /> Back to Campuses
      </button>

      <div className="page-header">
        <h1>{isEdit ? 'Edit Campus' : 'Add New Campus'}</h1>
        <p style={{ color: 'var(--text-muted)' }}>Configure the branch details below.</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div className="table-card" style={{ padding: 32 }}>
          <h3 style={{ marginBottom: 24, fontSize: '1.1rem' }}>Basic Information</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: 'var(--text-heading)' }}>Campus Name</label>
              <input 
                required
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. North Campus"
                style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)', fontSize: '1rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: 'var(--text-heading)' }}>Full Address</label>
              <textarea 
                required
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter complete address..."
                rows={3}
                style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)', fontSize: '1rem', resize: 'vertical' }}
              />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16 }}>
          <button 
            type="button" 
            onClick={() => navigate('/dashboard/campuses')}
            style={{ padding: '12px 24px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--card-bg)', color: 'var(--text-main)', fontWeight: 600 }}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            style={{ padding: '12px 24px', borderRadius: 8, border: 'none', background: 'var(--primary)', color: '#fff', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <FloppyDisk size={18} /> {isEdit ? 'FloppyDisk Changes' : 'Create Campus'}
          </button>
        </div>
      </form>
    </div>
  );
}
