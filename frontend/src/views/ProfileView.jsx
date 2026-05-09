import React, { useState, useEffect } from 'react';
import { Award, Calendar, History, TrendingUp, CheckCircle, XCircle, Clock, Share2 } from 'lucide-react';
import ImpactCard from '../components/ImpactCard';

const ProfileView = ({ user }) => {
  const [showCard, setShowCard] = useState(false);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const mockHistory = [
    { id: 1, category: 'SEGREGATION', points: 10, status: 'APPROVED', date: 'Today, 08:30 AM', reason: 'Waste segregation verified' },
    { id: 2, category: 'RECYCLING', points: 15, status: 'PENDING', date: 'Yesterday', reason: 'Plastic bottles recycling' },
    { id: 3, category: 'SEGREGATION', points: 10, status: 'APPROVED', date: '2 days ago', reason: 'Waste segregation verified' },
    { id: 4, category: 'REPORTING', points: 3, status: 'REJECTED', date: '3 days ago', reason: 'Duplicate report of bin overflow' },
  ];

  const badges = [
    { id: 1, name: 'Eco Starter', icon: '🌱', date: 'May 1st' },
    { id: 2, name: 'Plastic Free', icon: '🚫', date: 'May 4th' },
    { id: 3, name: 'Consistency King', icon: '👑', date: 'May 7th' },
    { id: 4, name: 'Early Bird', icon: '🌅', date: 'May 8th' },
  ];

  useEffect(() => {
    setTimeout(() => {
      setHistory(mockHistory);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'APPROVED': return <CheckCircle size={16} color="var(--primary)" />;
      case 'REJECTED': return <XCircle size={16} color="#ef4444" />;
      default: return <Clock size={16} color="var(--accent)" />;
    }
  };

  return (
    <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem', alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div className="glass-card" style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(var(--primary), var(--secondary))', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>
            {user.username[0].toUpperCase()}
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{user.username}</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Green Warrior Level 4</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ background: 'var(--glass)', padding: '0.5rem 1rem', borderRadius: '0.5rem' }}>
              <span style={{ display: 'block', fontSize: '1.2rem', fontWeight: 800 }}>12</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>BADGES</span>
            </div>
            <div style={{ background: 'var(--glass)', padding: '0.5rem 1rem', borderRadius: '0.5rem' }}>
              <span style={{ display: 'block', fontSize: '1.2rem', fontWeight: 800 }}>#12</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>RANK</span>
            </div>
          </div>
          <button 
            onClick={() => setShowCard(!showCard)}
            style={{ 
              width: '100%', padding: '0.75rem', background: 'var(--glass)', 
              border: '1px solid var(--primary)', color: 'var(--primary)', 
              borderRadius: '0.5rem', cursor: 'pointer', display: 'flex', 
              alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              fontWeight: 600
            }}
          >
            <Share2 size={18} /> {showCard ? 'Close Impact Card' : 'Generate Impact Card'}
          </button>
        </div>

        {showCard && (
          <ImpactCard user={user} score={2840} rank={12} />
        )}

        <div className="glass-card">
          <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Award size={18} color="var(--accent)" /> Badges
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            {badges.map(badge => (
              <div key={badge.id} style={{ background: 'var(--glass)', padding: '1rem', borderRadius: '0.75rem', textAlign: 'center' }}>
                <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.25rem' }}>{badge.icon}</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{badge.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-card">
        <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <History color="var(--primary)" /> Impact History
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {history.map(item => (
            <div key={item.id} style={{ display: 'flex', gap: '1.5rem', position: 'relative', paddingBottom: '1.5rem', borderLeft: '2px solid var(--glass-border)', paddingLeft: '1.5rem', marginLeft: '0.75rem' }}>
              <div style={{ position: 'absolute', left: '-11px', top: '0', width: '20px', height: '20px', borderRadius: '50%', background: 'var(--bg-dark)', border: '2px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                {getStatusIcon(item.status)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <h4 style={{ color: 'var(--primary)' }}>{item.category}</h4>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.date}</span>
                </div>
                <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>{item.reason}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.5rem', background: 'var(--glass)', borderRadius: '4px', color: 'var(--text-muted)' }}>
                    {item.status}
                  </span>
                  <span style={{ fontWeight: 800, color: item.status === 'REJECTED' ? '#ef4444' : 'var(--primary)' }}>
                    {item.points > 0 ? `+${item.points}` : item.points} pts
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
