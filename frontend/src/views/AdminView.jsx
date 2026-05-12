import React, { useState } from 'react';
import { Check, X, AlertCircle, Clock, ShieldCheck, User } from 'lucide-react';

const AdminView = () => {
  const [requests, setRequests] = useState([
    { id: 1, user: 'Flat 402 - Green Villa', type: 'Plastic Recycling', weight: '5kg', date: 'Today, 09:15 AM', status: 'Pending' },
    { id: 2, user: 'Flat 101 - Serene Oaks', type: 'Organic Waste', weight: '3kg', date: 'Yesterday', status: 'Pending' },
    { id: 3, user: 'Flat 305 - Sky High', type: 'E-Waste', weight: '1.5kg', date: '2 days ago', status: 'Pending' }
  ]);

  const handleAction = (id, newStatus) => {
    setRequests(requests.map(req => req.id === id ? { ...req, status: newStatus } : req));
  };

  const pendingCount = requests.filter(r => r.status === 'Pending').length;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#064e3b' }}>Municipal Console</h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Verify and approve community waste logs.</p>
        </div>
        <div style={{ background: '#ecfdf5', color: '#065f46', padding: '0.5rem 1rem', borderRadius: '2rem', fontWeight: 700, fontSize: '0.85rem' }}>
          {pendingCount} Pending Requests
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {requests.map(req => (
          <div key={req.id} style={{ 
            padding: '1.5rem', 
            background: 'white', 
            border: '1px solid #f1f5f9', 
            borderRadius: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            opacity: req.status !== 'Pending' ? 0.6 : 1,
            transition: 'all 0.3s'
          }}>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ width: '48px', height: '48px', background: '#f8fafc', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                <User size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1rem' }}>{req.user}</div>
                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                  {req.type} • <b>{req.weight}</b> • {req.date}
                </div>
              </div>
            </div>

            {req.status === 'Pending' ? (
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button 
                  onClick={() => handleAction(req.id, 'Rejected')}
                  style={{ background: '#fef2f2', border: 'none', borderRadius: '0.75rem', padding: '0.6rem', cursor: 'pointer', color: '#ef4444' }}
                >
                  <X size={20} />
                </button>
                <button 
                  onClick={() => handleAction(req.id, 'Approved')}
                  style={{ background: '#ecfdf5', border: 'none', borderRadius: '0.75rem', padding: '0.6rem 1.25rem', cursor: 'pointer', color: '#059669', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <Check size={20} /> Approve
                </button>
              </div>
            ) : (
              <div style={{ 
                fontWeight: 800, 
                fontSize: '0.8rem', 
                textTransform: 'uppercase', 
                letterSpacing: '0.05em',
                color: req.status === 'Approved' ? '#059669' : '#ef4444'
              }}>
                {req.status}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: '4rem', padding: '2rem', border: '1px dashed #e2e8f0', borderRadius: '1rem', textAlign: 'center' }}>
        <ShieldCheck size={32} color="#94a3b8" style={{ marginBottom: '1rem' }} />
        <p style={{ color: '#64748b', fontSize: '0.85rem' }}>
          All approvals are logged and auditable by the Municipal Head Office.
        </p>
      </div>
    </div>
  );
};

export default AdminView;
