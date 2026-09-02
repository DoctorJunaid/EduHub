import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, FloppyDisk, Buildings, Image as ImageIcon, MapPin, Globe, Phone, EnvelopeSimple } from '@phosphor-icons/react';
import { institutes, addInstitute, updateInstitute } from '../../data/mockData';

export default function InstituteForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: '', type: 'University', board: 'Federal', status: 'Active',
    email: '', phone: '', address: '', image: ''
  });

  useEffect(() => {
    if (isEdit) {
      const inst = institutes.find(i => i.id === id);
      if (inst) setFormData(inst);
    }
  }, [id, isEdit]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      updateInstitute(id, formData);
    } else {
      addInstitute({
        ...formData,
        createdAt: new Date().toISOString().split('T')[0],
        rating: 0
      });
    }
    navigate('/dashboard/institutes');
  };

  return (
    <div className="content-container animate-stagger" style={{ maxWidth: 800, margin: '0 auto' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
        <button 
          onClick={() => navigate('/dashboard/institutes')}
          style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--card-bg)', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)', boxShadow: 'var(--sh-sm)' }}
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 style={{ fontSize: '2rem', color: 'var(--text-heading)', lineHeight: 1.1 }}>
            {isEdit ? 'Edit Institute' : 'Register New Institute'}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: 4 }}>
            {isEdit ? 'Update the details for this network.' : 'Add a new educational network to the global system.'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="table-card" style={{ padding: 40 }}>
        
        {/* Section 1: Basic Info */}
        <h3 style={{ fontSize: '1.2rem', color: 'var(--text-heading)', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Buildings size={20} color="var(--primary)" /> General Information
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>Institute Name *</label>
            <input 
              type="text" name="name" value={formData.name} onChange={handleChange} required
              style={{ width: '100%', padding: '16px', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-md)', outline: 'none', fontSize: '1rem', background: 'var(--bg-color)' }} 
              placeholder="e.g. Stanford University"
            />
          </div>

          <div style={{ display: 'flex', gap: 24 }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>Type</label>
              <select 
                name="type" value={formData.type} onChange={handleChange}
                style={{ width: '100%', padding: '16px', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-md)', outline: 'none', fontSize: '1rem', background: 'var(--bg-color)', appearance: 'none' }}
              >
                <option>University</option>
                <option>College</option>
                <option>School</option>
                <option>Academy</option>
              </select>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>Board / Affiliation</label>
              <select 
                name="board" value={formData.board} onChange={handleChange}
                style={{ width: '100%', padding: '16px', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-md)', outline: 'none', fontSize: '1rem', background: 'var(--bg-color)', appearance: 'none' }}
              >
                <option>Federal</option>
                <option>State</option>
                <option>Private</option>
                <option>International</option>
              </select>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>Status</label>
              <select 
                name="status" value={formData.status} onChange={handleChange}
                style={{ width: '100%', padding: '16px', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-md)', outline: 'none', fontSize: '1rem', background: 'var(--bg-color)', appearance: 'none' }}
              >
                <option>Active</option>
                <option>Pending</option>
                <option>Suspended</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Contact Info */}
        <h3 style={{ fontSize: '1.2rem', color: 'var(--text-heading)', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Globe size={20} color="var(--primary)" /> Contact & Location
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 40 }}>
          <div style={{ display: 'flex', gap: 24 }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: 6 }}><EnvelopeSimple size={14}/> Email Address</label>
              <input 
                type="email" name="email" value={formData.email} onChange={handleChange}
                style={{ width: '100%', padding: '16px', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-md)', outline: 'none', fontSize: '1rem', background: 'var(--bg-color)' }} 
                placeholder="admin@institute.edu"
              />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: 6 }}><Phone size={14}/> Phone Number</label>
              <input 
                type="text" name="phone" value={formData.phone} onChange={handleChange}
                style={{ width: '100%', padding: '16px', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-md)', outline: 'none', fontSize: '1rem', background: 'var(--bg-color)' }} 
                placeholder="+1 234 567 8900"
              />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: 6 }}><MapPin size={14}/> Head Office Address</label>
            <input 
              type="text" name="address" value={formData.address} onChange={handleChange}
              style={{ width: '100%', padding: '16px', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-md)', outline: 'none', fontSize: '1rem', background: 'var(--bg-color)' }} 
              placeholder="Full address of the main campus or headquarters"
            />
          </div>
        </div>

        {/* Section 3: Media */}
        <h3 style={{ fontSize: '1.2rem', color: 'var(--text-heading)', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
          <ImageIcon size={20} color="var(--primary)" /> Media
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 40 }}>
          <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>Cover Image URL</label>
          <input 
            type="text" name="image" value={formData.image} onChange={handleChange}
            style={{ width: '100%', padding: '16px', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-md)', outline: 'none', fontSize: '1rem', background: 'var(--bg-color)' }} 
            placeholder="https://images.unsplash.com/..."
          />
          {formData.image && (
            <div style={{ marginTop: 16, width: '100%', height: 200, borderRadius: 'var(--r-md)', overflow: 'hidden', border: '1px solid var(--border-light)' }}>
              <img src={formData.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16, borderTop: '1px solid var(--border-light)', paddingTop: 32 }}>
          <button 
            type="button"
            onClick={() => navigate('/dashboard/institutes')}
            style={{ padding: '14px 28px', borderRadius: 'var(--r-full)', fontWeight: 600, color: 'var(--text-main)', border: '1px solid var(--border-strong)' }}
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="nav-btn-primary"
            style={{ padding: '14px 32px', borderRadius: 'var(--r-full)', fontWeight: 600, color: '#fff', background: 'var(--primary)', display: 'flex', alignItems: 'center', gap: 8, border: 'none', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)' }}
          >
            <FloppyDisk size={18} /> {isEdit ? 'FloppyDisk Changes' : 'Register Institute'}
          </button>
        </div>
      </form>
    </div>
  );
}
