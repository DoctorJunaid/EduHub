import React, { useState } from 'react';
import { Medal, MagnifyingGlass, TrendUp, Sparkle, Faders } from '@phosphor-icons/react';
import { getCampusFullData } from '../../data/mockData';

export default function CampusExamResults({ user }) {
  const campusId = user?.profile?.campusId || 'camp_1';
  const [searchTerm, setSearchTerm] = useState('');

  const campusData = getCampusFullData(campusId);
  const { performanceRecords = [] } = campusData || {};

  const filtered = performanceRecords.filter(p => 
    p.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.semester.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const avgGpa = (performanceRecords.reduce((sum, p) => sum + p.gpa, 0) / (performanceRecords.length || 1)).toFixed(2);
  const topPerformers = performanceRecords.filter(p => p.gpa >= 3.8);

  return (
    <div className="content-container animate-fade-in" style={{ gap: 24 }}>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Examination Results & Academic Performance</h1>
          <p style={{ color: 'var(--text-muted)' }}>Student semester transcripts, letter grades, GPA ratings, and evaluation remarks.</p>
        </div>
      </div>

      {/* Analytics Overview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        <div className="table-card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--primary)' }}>
            <TrendUp size={20} />
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Campus Average GPA</span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-heading)', marginTop: 8 }}>
            {avgGpa} <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>/ 4.0</span>
          </div>
        </div>

        <div className="table-card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text-muted)' }}>
            <Sparkle size={20} />
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Dean's Honor Roll</span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-heading)', marginTop: 8 }}>
            {topPerformers.length} Students
          </div>
        </div>

        <div className="table-card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text-muted)' }}>
            <Medal size={20} />
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Pass Rate</span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-heading)', marginTop: 8 }}>
            100%
          </div>
        </div>
      </div>

      {/* Results Gradebook Table */}
      <div className="table-card">
        <div className="table-header" style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="search-bar" style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--bg-color)', padding: '10px 16px', borderRadius: '8px', width: '300px', border: '1px solid var(--border-strong)' }}>
            <MagnifyingGlass size={18} color="var(--text-muted)" />
            <input 
              type="text" 
              placeholder="MagnifyingGlass by student or course..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', color: 'var(--text-main)' }}
            />
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{filtered.length} examination transcripts</span>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Course / Subject</th>
              <th>Score & %</th>
              <th>Grade</th>
              <th>GPA</th>
              <th>Academic Remarks</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                  No result records found.
                </td>
              </tr>
            )}
            {filtered.map(item => (
              <tr key={item.id}>
                <td>
                  <div style={{ fontWeight: 600, color: 'var(--text-heading)', fontSize: '0.95rem' }}>{item.studentName}</div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.semester}</span>
                </td>
                <td style={{ color: 'var(--text-main)', fontWeight: 500 }}>{item.subject}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{item.marks} / {item.totalMarks}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>({((item.marks / item.totalMarks) * 100).toFixed(0)}%)</span>
                  </div>
                </td>
                <td>
                  <span className="status-pill completed" style={{ fontWeight: 700 }}>{item.grade}</span>
                </td>
                <td>
                  <span style={{ fontWeight: 700, color: item.gpa >= 3.5 ? 'var(--green)' : 'var(--text-heading)', fontSize: '1rem' }}>
                    {item.gpa.toFixed(2)}
                  </span>
                </td>
                <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem', maxWidth: 260 }}>
                  {item.remarks}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
