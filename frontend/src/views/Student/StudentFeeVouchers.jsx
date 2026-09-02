import React, { useState } from 'react';
import { CreditCard, CheckCircle, Clock, WarningCircle, DownloadSimple, ArrowSquareOut, ShieldCheck } from '@phosphor-icons/react';
import { fee_records, markFeeAsPaid } from '../../data/mockData';

export default function StudentFeeVouchers({ user }) {
  const studentProfile = user?.profile;
  const studentProfileId = studentProfile?.id || 'sp_1';
  const [dataVersion, setDataVersion] = useState(0);

  // Pay Modal & Voucher Modal State
  const [payingFee, setPayingFee] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState('1Link Online Banking');
  const [viewingVoucher, setViewingVoucher] = useState(null);

  const myFees = fee_records.filter(f => f.studentProfileId === studentProfileId);

  const handleConfirmPay = (e) => {
    e.preventDefault();
    if (!payingFee) return;
    markFeeAsPaid(payingFee.id, selectedMethod);
    setPayingFee(null);
    setDataVersion(v => v + 1);
  };

  const totalPaid = myFees.filter(f => f.status === 'Paid').reduce((sum, f) => sum + f.amount, 0);
  const totalDue = myFees.filter(f => f.status !== 'Paid').reduce((sum, f) => sum + f.amount, 0);

  return (
    <div className="content-container animate-fade-in" style={{ gap: 24 }}>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Tuition Fee Challans & Vouchers</h1>
          <p style={{ color: 'var(--text-muted)' }}>View semester fee invoices, download printable 1Link bank challans, and pay securely online.</p>
        </div>
      </div>

      {/* Fee Summary Cards */}
      <div className="course-grid">
        <div className="c-card">
          <h3>Total Paid Fees</h3>
          <div className="c-card-stat">PKR {totalPaid.toLocaleString()}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)' }}>
            <CheckCircle size={18} />
            <span style={{ fontSize: '0.85rem' }}>Cleared invoices</span>
          </div>
        </div>

        <div className="c-card">
          <h3>Pending Dues</h3>
          <div className="c-card-stat" style={{ color: totalDue > 0 ? 'var(--yellow)' : 'var(--text-heading)' }}>PKR {totalDue.toLocaleString()}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)' }}>
            <WarningCircle size={18} />
            <span style={{ fontSize: '0.85rem' }}>Current term balance</span>
          </div>
        </div>

        <div className="c-card">
          <h3>Payment Gateway</h3>
          <div className="c-card-stat" style={{ fontSize: '1.5rem' }}>1Link / KuickPay</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)' }}>
            <ShieldCheck size={18} />
            <span style={{ fontSize: '0.85rem' }}>100% Secure Transaction</span>
          </div>
        </div>

        <div className="c-card">
          <h3>Billing Account</h3>
          <div className="c-card-stat" style={{ fontSize: '1.4rem' }}>{studentProfile?.rollNo || 'NUST-CS-2023-042'}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)' }}>
            <CreditCard size={18} />
            <span style={{ fontSize: '0.85rem' }}>Student Reference ID</span>
          </div>
        </div>
      </div>

      {/* Fee Vouchers Table */}
      <div className="table-card">
        <div className="table-header">
          <h2>Fee Vouchers & Payment History</h2>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>All amounts in Pakistani Rupees (PKR)</span>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Voucher No & Type</th>
              <th>Term / Month</th>
              <th>Amount (PKR)</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Payment Method</th>
              <th style={{ textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {myFees.map(fee => (
              <tr key={fee.id}>
                <td>
                  <div style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{fee.voucherNo}</div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{fee.feeType}</span>
                </td>
                <td style={{ color: 'var(--text-main)', fontWeight: 500 }}>{fee.month}</td>
                <td style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-heading)' }}>
                  PKR {fee.amount.toLocaleString()}
                </td>
                <td style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>{fee.dueDate}</td>
                <td>
                  <span className={`status-pill ${fee.status === 'Paid' ? 'completed' : fee.status === 'Pending' ? 'inprogress' : 'cancelled'}`}>
                    {fee.status}
                  </span>
                </td>
                <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{fee.paymentMethod || '—'}</td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                    <button 
                      onClick={() => setViewingVoucher(fee)}
                      style={{ padding: '6px 12px', background: 'var(--bg-color)', color: 'var(--text-main)', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-full)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Print Challan
                    </button>
                    {fee.status !== 'Paid' && (
                      <button 
                        onClick={() => setPayingFee(fee)}
                        style={{ padding: '6px 14px', background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: 'var(--r-full)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                      >
                        Pay Online
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL: PAY ONLINE SIMULATION */}
      {payingFee && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: 20 }}>
          <div className="table-card animate-fade-in" style={{ width: '100%', maxWidth: 520, padding: 28, background: 'var(--card-bg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Online Fee Payment</h3>
                <p style={{ margin: '2px 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Voucher: {payingFee.voucherNo} • {payingFee.feeType}</p>
              </div>
              <button onClick={() => setPayingFee(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
            </div>

            <div style={{ background: 'var(--bg-color)', padding: 18, borderRadius: 10, border: '1px solid var(--border-light)', textAlign: 'center', marginBottom: 18 }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Payable Amount</span>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-heading)', margin: '4px 0' }}>
                PKR {payingFee.amount.toLocaleString()}
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>Zero Transaction Fee via 1Link</span>
            </div>

            <form onSubmit={handleConfirmPay} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>Select Payment Channel</label>
                <select 
                  value={selectedMethod} 
                  onChange={e => setSelectedMethod(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-strong)', background: 'var(--bg-color)', color: 'var(--text-main)', fontWeight: 600 }}
                >
                  <option value="1Link Online Bank Transfer">1Link / 1Bill Internet Banking</option>
                  <option value="KuickPay Online">KuickPay Direct Portal</option>
                  <option value="JazzCash Wallet">JazzCash Mobile Wallet</option>
                  <option value="EasyPaisa Wallet">EasyPaisa Mobile Wallet</option>
                  <option value="Debit / Credit Card (Visa/Mastercard)">Debit / Credit Card (Visa / Mastercard)</option>
                </select>
              </div>

              <div style={{ background: 'var(--bg-color)', padding: 12, borderRadius: 8, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Your payment will be instantly verified and reflected across your campus student ledger.
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 8 }}>
                <button 
                  type="button" 
                  onClick={() => setPayingFee(null)}
                  style={{ padding: '10px 18px', background: 'var(--bg-color)', border: '1px solid var(--border-strong)', borderRadius: 8, color: 'var(--text-main)', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  style={{ padding: '10px 24px', background: 'var(--primary)', color: '#fff', borderRadius: 8, fontWeight: 600, border: 'none', cursor: 'pointer' }}
                >
                  Confirm PKR {payingFee.amount.toLocaleString()} Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: PRINTABLE CHALLAN */}
      {viewingVoucher && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: 20 }}>
          <div className="table-card animate-fade-in" style={{ width: '100%', maxWidth: 540, padding: 28, background: 'var(--card-bg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Bank Fee Challan</h3>
                <p style={{ margin: '2px 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>1Link 1Bill Invoice #{viewingVoucher.voucherNo}</p>
              </div>
              <button onClick={() => setViewingVoucher(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
            </div>

            <div style={{ border: '2px dashed var(--border-strong)', padding: 20, borderRadius: 10, background: 'var(--bg-color)', marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Student Name:</span>
                <span style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{user?.name || 'Ali Raza'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Roll No / ID:</span>
                <span style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{studentProfile?.rollNo || 'NUST-CS-2023-042'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Fee Description:</span>
                <span style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{viewingVoucher.feeType}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Due Date:</span>
                <span style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{viewingVoucher.dueDate}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-strong)', paddingTop: 12 }}>
                <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-heading)' }}>Total Payable:</span>
                <span style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--primary)' }}>PKR {viewingVoucher.amount.toLocaleString()}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <button 
                onClick={() => window.print()}
                style={{ padding: '9px 18px', background: 'var(--bg-color)', border: '1px solid var(--border-strong)', borderRadius: 8, fontWeight: 600, color: 'var(--text-main)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
              >
                <DownloadSimple size={15} /> Print Challan
              </button>
              <button 
                onClick={() => setViewingVoucher(null)}
                style={{ padding: '9px 20px', background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
