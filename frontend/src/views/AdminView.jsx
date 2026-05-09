import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, Filter, Search } from 'lucide-react';

const AdminView = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const mockReports = [
    { id: 101, householdName: 'Flat 402 - Green Villa', category: 'SEGREGATION', points: 10, reason: 'Photo verified disposal', status: 'PENDING', time: '2h ago' },
    { id: 102, householdName: 'Flat 101 - Serene Oaks', category: 'RECYCLING', points: 15, reason: '10kg plastic submission', status: 'PENDING', time: '5h ago' },
    { id: 103, householdName: 'Flat 202 - Sky Tower', category: 'REPORTING', points: 3, reason: 'Overflowing bin reported', status: 'PENDING', time: '1d ago' },
  ];

  useEffect(() => {
    // In real app: fetch('/api/admin/pending')
    setTimeout(() => {
      setReports(mockReports);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAction = (id, action) => {
    setReports(reports.filter(r => r.id !== id));
    // In real app: fetch(`/api/admin/${action}/${id}`, { method: 'POST' })
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Clock color="var(--primary)" /> Pending Verifications
        </h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              placeholder="Search households..." 
              style={{ background: 'var(--glass)', border: '1px solid var(--glass-border)', padding: '0.5rem 1rem 0.5rem 2.25rem', borderRadius: '0.5rem', color: 'white' }}
            />
          </div>
          <button style={{ background: 'var(--glass)', border: '1px solid var(--glass-border)', padding: '0.5rem 1rem', borderRadius: '0.5rem', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter size={16} /> Filter
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {reports.map(report => (
          <div key={report.id} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem' }}>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ width: '48px', height: '48px', background: 'var(--glass)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'var(--primary)' }}>
                {report.points}+
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem' }}>{report.householdName}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{report.category}</span> • {report.reason}
                </p>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginRight: '1rem' }}>{report.time}</span>
              <button 
                onClick={() => handleAction(report.id, 'approve')}
                style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--primary)', color: 'var(--primary)', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}
              >
                <CheckCircle size={18} /> Approve
              </button>
              <button 
                onClick={() => handleAction(report.id, 'reject')}
                style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#ef4444', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}
              >
                <XCircle size={18} /> Reject
              </button>
            </div>
          </div>
        ))}
        {reports.length === 0 && !loading && (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
            <h3>All caught up!</h3>
            <p>No pending reports to verify at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminView;
