import React, { useState, useEffect } from 'react';
import { Trophy, Home, MapPin, Globe, ArrowUpRight, Award, Zap, Loader2, LogOut, ShieldCheck, User as UserIcon, LayoutDashboard } from 'lucide-react';
import { fetchLeaderboard } from './services/api';
import ActivityReporter from './components/ActivityReporter';
import AuthView from './views/AuthView';
import AdminView from './views/AdminView';
import ProfileView from './views/ProfileView';

const LeaderboardItem = ({ rank, name, score, trend, isTop, isVerified }) => (
  <div className={`rank-item ${isTop ? `top-${rank}` : ''}`}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
      <span className="rank-number">{rank}</span>
      <div>
        <h4 style={{ fontSize: '1.1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {name} {isVerified && <CheckCircle size={14} color="#3b82f6" fill="#3b82f6" />}
        </h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{trend > 0 ? `+${trend} ranks this week` : 'Stable'}</p>
      </div>
    </div>
    <div style={{ textAlign: 'right' }}>
      <span className="stat-value" style={{ fontSize: '1.2rem' }}>{score.toLocaleString()}</span>
      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>pts</p>
    </div>
  </div>
);

function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('citizen'); // citizen, admin, profile
  const [level, setLevel] = useState('Household');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const levels = ['Household', 'Society', 'District', 'State'];

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      if (parsedUser.username === 'admin') parsedUser.role = 'ADMIN';
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setView('citizen');
  };

  const mockData = {
    Household: [
      { id: 1, name: 'Flat 402 - Green Villa', score: 1250, trend: 2, isVerified: true },
      { id: 2, name: 'Flat 101 - Serene Oaks', score: 1180, trend: 1, isVerified: true },
      { id: 3, name: 'Flat 305 - Green Villa', score: 1100, trend: -1, isVerified: false },
    ],
    Society: [
      { id: 1, name: 'Green Villa Residency', score: 45000, trend: 5, isVerified: true },
      { id: 2, name: 'Skyline Apartments', score: 42000, trend: 2, isVerified: true },
      { id: 3, name: 'Eco Park Society', score: 38500, trend: 0, isVerified: false },
    ],
    District: [
      { id: 1, name: 'Indore Central', score: 850000, trend: 1 },
      { id: 2, name: 'Surat East', score: 820000, trend: 3 },
      { id: 3, name: 'Mysuru West', score: 790000, trend: -2 },
    ],
    State: [
      { id: 1, name: 'Madhya Pradesh', score: 5400000, trend: 0 },
      { id: 2, name: 'Gujarat', score: 5200000, trend: 1 },
      { id: 3, name: 'Karnataka', score: 4900000, trend: 2 },
    ]
  };

  useEffect(() => {
    if (!user || view !== 'citizen') return;
    
    const loadData = async () => {
      setLoading(true);
      const result = await fetchLeaderboard(level);
      
      if (result && result.length > 0) {
        const mappedData = result.map(item => ({
          id: item.id,
          name: item.householdName || item.name,
          score: item.currentPoints || item.totalScore,
          trend: Math.floor(Math.random() * 5)
        }));
        setData(mappedData);
      } else {
        setData(mockData[level] || []);
      }
      setLoading(false);
    };

    loadData();
  }, [level, user, view]);

  if (!user) {
    return (
      <div className="leaderboard-container">
        <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '0.5rem' }}>
            Clean <span style={{ color: 'var(--primary)' }}>&</span> Green
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Competition for a Sustainable Future</p>
        </header>
        <AuthView onLogin={setUser} />
      </div>
    );
  }

  return (
    <div className="leaderboard-container">
      <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, cursor: 'pointer' }} onClick={() => setView('citizen')}>
            Clean <span style={{ color: 'var(--primary)' }}>&</span> Green
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Role: <b style={{ color: 'var(--primary)' }}>{user.role}</b> • 
            <b style={{ color: 'white', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginLeft: '0.5rem' }}>
              {user.username} <CheckCircle size={14} color="#3b82f6" fill="#3b82f6" />
            </b>
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem', 
              background: 'var(--glass)', border: '1px solid var(--glass-border)',
              padding: '0.75rem 1rem', borderRadius: '0.75rem', color: '#fff', cursor: 'pointer',
              fontWeight: 600, background: 'linear-gradient(45deg, #10b981, #3b82f6)'
            }}
          >
            <Globe size={18} /> Share Impact
          </button>
          <button 
            onClick={() => setView('profile')}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem', 
              background: view === 'profile' ? 'var(--primary)' : 'var(--glass)', 
              border: '1px solid var(--glass-border)',
              padding: '0.75rem 1rem', borderRadius: '0.75rem', color: 'white', cursor: 'pointer',
              fontWeight: 600
            }}
          >
            <UserIcon size={18} /> My Profile
          </button>
          
          {user.role === 'ADMIN' && (
            <button 
              onClick={() => setView(view === 'admin' ? 'citizen' : 'admin')}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem', 
                background: view === 'admin' ? 'var(--primary)' : 'var(--glass)', 
                border: '1px solid var(--glass-border)',
                padding: '0.75rem 1rem', borderRadius: '0.75rem', color: 'white', cursor: 'pointer',
                fontWeight: 600
              }}
            >
              <ShieldCheck size={18} /> Admin Console
            </button>
          )}
          <button onClick={handleLogout} style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem', 
            background: 'var(--glass)', border: '1px solid var(--glass-border)',
            padding: '0.75rem 1rem', borderRadius: '0.75rem', color: 'var(--text-muted)', cursor: 'pointer'
          }}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </header>

      {view === 'admin' && <AdminView />}
      {view === 'profile' && <ProfileView user={user} />}
      {view === 'citizen' && (
        <>
          <div className="stats-grid">
            <div className="glass-card stat-card">
              <span style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Zap size={18} /> Your Rank
              </span>
              <span className="stat-value">#12</span>
              <p style={{ color: 'var(--text-muted)' }}>Top 5% in Society</p>
            </div>
            <div className="glass-card stat-card">
              <span style={{ color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Award size={18} /> Total Points
              </span>
              <span className="stat-value">2,840</span>
              <div className="progress-bar-container">
                <div className="progress-bar-fill" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div className="glass-card stat-card">
              <span style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Trophy size={18} /> Badges
              </span>
              <span className="stat-value">8</span>
              <p style={{ color: 'var(--text-muted)' }}>2 earned this week</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem', alignItems: 'start' }}>
            <div className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Globe className="animate-pulse" /> Live Leaderboard
                </h2>
                <div style={{ display: 'flex', background: 'var(--glass)', padding: '0.25rem', borderRadius: '0.75rem' }}>
                  {levels.map(l => (
                    <button 
                      key={l}
                      onClick={() => setLevel(l)}
                      style={{
                        padding: '0.5rem 1rem',
                        border: 'none',
                        borderRadius: '0.5rem',
                        background: level === l ? 'var(--primary)' : 'transparent',
                        color: level === l ? 'white' : 'var(--text-muted)',
                        cursor: 'pointer',
                        fontWeight: 600,
                        transition: 'all 0.3s'
                      }}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
                  <Loader2 className="animate-spin" size={40} color="var(--primary)" />
                </div>
              ) : (
                <div className="rank-list">
                  {data.map((item, idx) => (
                    <LeaderboardItem 
                      key={item.id}
                      rank={idx + 1}
                      name={item.name}
                      score={item.score}
                      trend={item.trend}
                      isTop={idx < 3}
                      isVerified={item.isVerified}
                    />
                  ))}
                </div>
              )}

              <button style={{
                width: '100%',
                marginTop: '2rem',
                padding: '1rem',
                background: 'transparent',
                border: '1px solid var(--glass-border)',
                borderRadius: '0.75rem',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}>
                View Full {level} Rankings <ArrowUpRight size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <ActivityReporter />
              <div className="glass-card">
                <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Award size={20} color="var(--secondary)" /> Weekly Goals
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  Complete 5 segregations to earn "Green Citizen" badge.
                </p>
                <div className="progress-bar-container">
                  <div className="progress-bar-fill" style={{ width: '60%' }}></div>
                </div>
                <p style={{ fontSize: '0.75rem', marginTop: '0.5rem', textAlign: 'right' }}>3/5 Complete</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
