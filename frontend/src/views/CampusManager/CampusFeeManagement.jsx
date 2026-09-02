import React, { useState } from 'react';
import { CreditCard, Plus, CheckCircle, Clock, Warning, DownloadSimple, MagnifyingGlass } from '@phosphor-icons/react';
import { getCampusFees, markFeeAsPaid, addFeeRecord, student_profiles, users } from '../../data/mockData';

export default function CampusFeeManagement({ user }) {
  const campusId = user?.profile?.campusId || 'camp_1';
  const [dataVersion, setDataVersion] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  const fees = getCampusFees(campusId);

  const [newFee, setNewFee] = useState({
    studentProfileId: 'sp_1',
    feeType: 'Semester Tuition Fee',
    amount: 85000,
    month: 'Spring 2026',
    dueDate: '2026-03-31',
    status: 'Pending',
    paymentMethod: 'Pending Payment'
  });

  const totalCollected = fees.filter(f => f.status === 'Paid').reduce((sum, f) => sum + f.amount, 0);
  const totalPending = fees.filter(f => f.status !== 'Paid').reduce((sum, f) => sum + f.amount, 0);

  const filtered = fees.filter(f => 
    f.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    f.voucherNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.feeType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePay = (id) => {
    markFeeAsPaid(id);
    setDataVersion(v => v + 1);
  };

  const handleCreateVoucher = (e) => {
    e.preventDefault();
    addFeeRecord({ ...newFee, campusId, amount: Number(newFee.amount) });
    setShowModal(false);
    setDataVersion(v => v + 1);
  };

  return (
    <div className="content-container animate-fade-in" style={{ gap: 24 }}>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Fee Management & Voucher Collection</h1>
          <p style={{ color: 'var(--text-muted)' }}>Track student tuition fees, invoice vouchers, and bank payment reconciliations.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          style={{ padding: '10px 20px', background: 'var(--primary)', color: '#fff', borderRadius: 8, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, border: 'none', cursor: 'pointer' }}
        >
          <Plus size={18} /> Issue Fee Voucher
        </button>
      </div>

      {/* Revenue Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        <div className="table-card" style={{ padding: 20 }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>Total Collected (PKR)</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-heading)', marginTop: 4 }}>
            PKR {totalCollected.toLocaleString()}
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 4, display: 'block' }}>Verified & Received</span>
        </div>

        <div className="table-card" style={{ padding: 20 }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>Outstanding / Pending</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-heading)', marginTop: 4 }}>
            PKR {totalPending.toLocaleString()}
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 4, display: 'block' }}>Awaiting Bank Processing</span>
        </div>

        <div className="table-card" style={{ padding: 20 }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>Collection Ratio</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-heading)', marginTop: 4 }}>
            {((totalCollected / (totalCollected + totalPending || 1)) * 100).toFixed(0)}%
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 4, display: 'block' }}>On-time payment rate</span>
        </div>
      </div>

      {/* Fee Table */}
      <div className="table-card">
        <div className="table-header" style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="search-bar" style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--bg-color)', padding: '10px 16px', borderRadius: '8px', width: '300px', border: '1px solid var(--border-strong)' }}>
            <MagnifyingGlass size={18} color="var(--text-muted)" />
            <input 
              type="text" 
              placeholder="MagnifyingGlass by voucher or student..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', color: 'var(--text-main)' }}
            />
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{filtered.length} vouchers logged</span>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Voucher / Student</th>
              <th>Fee Category</th>
              <th>Amount (PKR)</th>
              <th>Due Date</th>
              <th>Payment Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>No fee vouchers found.</td>
              </tr>
            )}
            {filtered.map(f => (
              <tr key={f.id}>
                <td>
                  <div style={{ fontWeight: 600, color: 'var(--text-heading)', fontSize: '0.95rem' }}>{f.studentName}</div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>{f.voucherNo}</span>
                </td>
                <td>
                  <div style={{ color: 'var(--text-main)', fontWeight: 500, fontSize: '0.9rem' }}>{f.feeType}</div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{f.month}</span>
                </td>
                <td>
                  <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-heading)' }}>
                    PKR {f.amount.toLocaleString()}
                  </span>
                </td>
                <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{f.dueDate}</td>
                <td>
                  <span className={`status-pill ${f.status === 'Paid' ? 'completed' : f.status === 'Pending' ? 'inprogress' : 'cancelled'}`} style={{ padding: '6px 14px' }}>
                    {f.status}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  {f.status !== 'Paid' ? (
                    <button
                      onClick={() => handlePay(f.id)}
                      style={{ padding: '6px 14px', background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: 8, fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Mark Paid
                    </button>
                  ) : (
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Paid on {f.paidDate}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: 20 }}>
          <div className="table-card animate-fade-in" style={{ width: '100%', maxWidth: 520, padding: 28, background: 'var(--card-bg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Issue Student Fee Voucher</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
            </div>

            <form onSubmit={handleCreateVoucher} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Select Student</label>
                <select
                  value={newFee.studentProfileId}
                  onChange={(e) => setNewFee({ ...newFee, studentProfileId: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                >
                  <option value="sp_1">Ali Raza (ali.raza@nust.edu.pk)</option>
                  <option value="sp_2">Zainab Bilal (zainab.b@nust.edu.pk)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Fee Category</label>
                <input 
                  type="text" 
                  required
                  value={newFee.feeType}
                  onChange={(e) => setNewFee({ ...newFee, feeType: e.target.value })}
                  placeholder="e.g. Semester Tuition Fee"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Amount (PKR)</label>
                  <input 
                    type="number" 
                    required
                    value={newFee.amount}
                    onChange={(e) => setNewFee({ ...newFee, amount: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Due Date</label>
                  <input 
                    type="date" 
                    required
                    value={newFee.dueDate}
                    onChange={(e) => setNewFee({ ...newFee, dueDate: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 12 }}>
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  style={{ padding: '10px 18px', background: 'var(--bg-color)', border: '1px solid var(--border-strong)', borderRadius: 8, color: 'var(--text-main)', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  style={{ padding: '10px 20px', background: 'var(--primary)', color: '#fff', borderRadius: 8, fontWeight: 600, border: 'none', cursor: 'pointer' }}
                >
                  Generate Voucher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
