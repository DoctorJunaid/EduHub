import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlass, Faders, Plus, PencilSimple, Trash, Eye, Buildings } from '@phosphor-icons/react';
import { institutes, deleteInstitute } from '../../data/mockData';

export default function InstitutesList() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate network delay
    const load = () => setData([...institutes]);
    load();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this institute?')) {
      deleteInstitute(id);
      setData([...institutes]); // Force re-render with new array
    }
  };

  const filteredData = data.filter(i => 
    i.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="content-container animate-stagger" style={{ maxWidth: 1400 }}>
      
      <div className="page-header" style={{ marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: 8 }}>Institutes</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>Manage all registered networks across the global system.</p>
        </div>
        <button 
          className="nav-btn-primary" 
          style={{ background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 'var(--r-full)' }}
          onClick={() => navigate('/dashboard/institutes/new')}
        >
          <Plus size={18} /> Add Institute
        </button>
      </div>

      <div className="table-card" style={{ padding: 0, overflow: 'hidden' }}>
        {/* Table Toolbar */}
        <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: 320 }}>
            <MagnifyingGlass size={18} color="var(--text-muted)" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              placeholder="MagnifyingGlass institutes..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '12px 16px 12px 48px', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-full)', outline: 'none', fontSize: '0.95rem' }} 
            />
          </div>
          <button style={{ padding: '10px 20px', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-full)', display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600, color: 'var(--text-main)' }}>
            <Faders size={16} /> Filters
          </button>
        </div>

        {/* Data Table */}
        <div style={{ overflowX: 'auto', padding: '0 32px 32px' }}>
          <table className="data-table" style={{ marginTop: 16 }}>
            <thead>
              <tr>
                <th>Institute Name</th>
                <th>Board / Type</th>
                <th>Status</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
                    No institutes found.
                  </td>
                </tr>
              )}
              {filteredData.map(inst => (
                <tr key={inst.id} style={{ transition: 'background 0.2s', cursor: 'pointer' }} onClick={() => navigate(`/dashboard/institutes/${inst.id}`)}>
                  <td>
                    <div className="td-user">
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--bg-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-light)' }}>
                        {inst.image ? (
                          <img src={inst.image} alt={inst.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '11px' }} />
                        ) : (
                          <Buildings size={20} color="var(--primary)" />
                        )}
                      </div>
                      <div>
                        <span style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-heading)', display: 'block', marginBottom: 2 }}>{inst.name}</span>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Added {new Date(inst.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-main)', marginBottom: 2 }}>{inst.type}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{inst.board}</div>
                  </td>
                  <td>
                    <span className={`status-pill ${inst.status === 'Active' || !inst.status ? 'completed' : 'inprogress'}`}>
                      {inst.status || 'Active'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, color: 'var(--text-heading)' }}>
                      <span style={{ color: '#f59e0b' }}>★</span> {inst.rating || 'N/A'}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }} onClick={e => e.stopPropagation()}>
                      <button 
                        style={{ padding: 8, color: 'var(--text-muted)', background: 'var(--bg-color)', borderRadius: '50%', border: '1px solid var(--border-light)' }}
                        onClick={() => navigate(`/dashboard/institutes/${inst.id}`)}
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        style={{ padding: 8, color: 'var(--primary)', background: 'var(--bg-color)', borderRadius: '50%', border: '1px solid var(--border-light)' }}
                        onClick={() => navigate(`/dashboard/institutes/${inst.id}/edit`)}
                      >
                        <PencilSimple size={16} />
                      </button>
                      <button 
                        style={{ padding: 8, color: '#ef4444', background: 'var(--bg-color)', borderRadius: '50%', border: '1px solid var(--border-light)' }}
                        onClick={() => handleDelete(inst.id)}
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
