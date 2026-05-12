import React, { useState, useEffect, useRef } from 'react';
import { Trophy, Globe, ArrowUpRight, Award, Zap, Loader2, ShieldCheck, User as UserIcon, CheckCircle, ArrowLeft, Plus, History, ShoppingBag, Map as MapIcon, Search } from 'lucide-react';
import { fetchLeaderboard } from './services/api';
import ActivityReporter from './components/ActivityReporter';
import AdminView from './views/AdminView';
import ProfileView from './views/ProfileView';

const PuneMap = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      // Pune coordinates: 18.5204, 73.8567
      mapInstance.current = L.map(mapRef.current, {
        center: [18.5204, 73.8567],
        zoom: 12,
        zoomControl: false
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
      }).addTo(mapInstance.current);

      // Add markers for major societies
      const societies = [
        { name: 'Amanora Park Town', coords: [18.5236, 73.9351] },
        { name: 'Blue Ridge', coords: [18.5793, 73.7388] },
        { name: 'Magarpatta City', coords: [18.5134, 73.9248] }
      ];

      societies.forEach(soc => {
        L.marker(soc.coords).addTo(mapInstance.current)
          .bindPopup(`<b>${soc.name}</b><br>Rank: #1 in Hadapsar`);
      });
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <div ref={mapRef} style={{ height: '250px', width: '100%', borderRadius: '1rem', border: '1px solid #e5e5d1' }} />
  );
};

const StoreItem = ({ title, cost, image, desc }) => (
  <div style={{ background: 'white', border: '1px solid #f0f0e8', borderRadius: '1rem', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
    <div style={{ height: '120px', background: '#f8fafb', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>{image}</div>
    <div style={{ fontWeight: 800, fontSize: '1rem' }}>{title}</div>
    <p style={{ fontSize: '0.8rem', color: '#71717a' }}>{desc}</p>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
      <span style={{ fontWeight: 900, color: '#365314' }}>{cost} pts</span>
      <button className="btn-action" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>Redeem</button>
    </div>
  </div>
);

function App() {
  const [user, setUser] = useState({ username: 'Green Citizen', role: 'CITIZEN', token: 'mock-jwt-token' });
  const [view, setView] = useState('citizen');
  const [showReporter, setShowReporter] = useState(false);
  const [level, setLevel] = useState('Household');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const levels = ['Household', 'Society', 'District', 'State'];

  const storeItems = [
    { title: 'Home Composting Kit', cost: 1500, image: '🌿', desc: 'Complete aerobic composting for Pune homes.' },
    { title: 'PMC Property Tax Rebate', cost: 5000, image: '📜', desc: '5% discount on Pune Municipal Tax.' },
    { title: 'Organic Cotton Bag', cost: 200, image: '👜', desc: 'Reusable grocery bag for zero-waste shopping.' },
    { title: 'Waste Audit Sensor', cost: 3000, image: '🔋', desc: 'IoT sensor for society-wide waste tracking.' }
  ];

  const puneMockData = {
    Household: [
      { id: 1, name: 'Flat 1204 - Blue Ridge (T-5)', score: 1250, isVerified: true },
      { id: 2, name: 'Flat 402 - Amanora Aspire', score: 1180, isVerified: true },
      { id: 3, name: 'Flat 801 - Magarpatta City', score: 1100, isVerified: false },
      { id: 4, name: 'Flat 303 - Godrej Infinity', score: 950, isVerified: true }
    ],
    Society: [
      { id: 1, name: 'Amanora Park Town', score: 85400, isVerified: true },
      { id: 2, name: 'Blue Ridge Society', score: 72100, isVerified: true },
      { id: 3, name: 'Magarpatta City', score: 68500, isVerified: true },
      { id: 4, name: 'Life Republic', score: 54000, isVerified: false }
    ],
    District: [
      { id: 1, name: 'Pune Central', score: 9500000 },
      { id: 2, name: 'Mumbai Suburban', score: 9200000 },
      { id: 3, name: 'Nagpur East', score: 7800000 }
    ],
    State: [
      { id: 1, name: 'Maharashtra', score: 45000000 },
      { id: 2, name: 'Karnataka', score: 42000000 },
      { id: 3, name: 'Gujarat', score: 39000000 }
    ]
  };



  useEffect(() => {
    if (!user || view !== 'citizen') return;
    setLoading(true);
    setTimeout(() => {
      setData(puneMockData[level] || puneMockData['Household']);
      setLoading(false);
    }, 600);
  }, [level, user, view]);

  
  return (
    <div className="leaderboard-container">
      <nav className="top-nav">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {view !== 'citizen' && <button onClick={() => setView('citizen')} className="btn-ghost"><ArrowLeft size={18} /></button>}
          <h1 className="logo" onClick={() => setView('citizen')}>CLEAN & GREEN</h1>
        </div>
        <div style={{ display: 'flex', gap: '0.25rem' }}>
          <button onClick={() => setView('citizen')} className={`btn-ghost ${view === 'citizen' ? 'active' : ''}`} title="Home"><Globe size={20} /></button>
          <button onClick={() => setView('store')} className={`btn-ghost ${view === 'store' ? 'active' : ''}`} title="Store"><ShoppingBag size={20} /></button>
          <button onClick={() => setView('profile')} className={`btn-ghost ${view === 'profile' ? 'active' : ''}`} title="Profile"><UserIcon size={20} /></button>
          {user.role === 'ADMIN' && <button onClick={() => setView('admin')} className={`btn-ghost ${view === 'admin' ? 'active' : ''}`} title="Admin"><ShieldCheck size={20} /></button>}
        </div>
      </nav>

      {view === 'admin' && <AdminView />}
      {view === 'profile' && <ProfileView user={user} />}
      {view === 'store' && (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Rewards Store</h2>
              <p style={{ color: '#71717a' }}>Redeem your points for Pune-specific sustainability rewards.</p>
            </div>
            <div style={{ background: '#f8fafb', padding: '1rem 1.5rem', borderRadius: '1rem', border: '1px solid #e5e5d1' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#71717a', textTransform: 'uppercase' }}>Available Balance</span>
              <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#365314' }}>2,840 pts</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
            {storeItems.map(item => <StoreItem key={item.title} {...item} />)}
          </div>
        </div>
      )}
      
      {view === 'citizen' && (
        <main>
          <div className="status-bar">
            <div className="status-item">
              <span className="status-label">Your Rank</span>
              <span className="status-value">#12</span>
            </div>
            <div className="status-item">
              <span className="status-label">Pune Points</span>
              <span className="status-value">2,840</span>
              <div className="progress-bar"><div className="progress-fill" style={{ width: '75%' }}></div></div>
            </div>
            <div className="status-item" style={{ marginLeft: 'auto', justifyContent: 'center' }}>
              <button className="btn-action" onClick={() => setShowReporter(!showReporter)}>
                {showReporter ? 'Close Reporter' : 'Record Activity'}
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '4rem', alignItems: 'start' }}>
            <section>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '0.8rem', fontWeight: 900, letterSpacing: '0.1em', color: '#71717a' }}>MAHARASHTRA LEADERBOARD</h3>
                <div style={{ position: 'relative' }}>
                  <Search size={14} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#71717a' }} />
                  <input type="text" placeholder="Find neighbor/society..." style={{ padding: '0.4rem 2rem 0.4rem 0.75rem', borderRadius: '0.5rem', border: '1px solid #e5e5d1', fontSize: '0.8rem', width: '200px' }} />
                </div>
              </div>
              <div className="tab-row">
                {levels.map(l => (
                  <div key={l} onClick={() => setLevel(l)} className={`tab-link ${level === l ? 'active' : ''}`}>{l}</div>
                ))}
              </div>

              <div className="data-table">
                {loading ? <div style={{ padding: '3rem', textAlign: 'center' }}><Loader2 className="animate-spin" size={24} color="#64748b" /></div> :
                  data.map((item, idx) => (
                    <div key={item.id} className="data-row">
                      <div className="rank-index">{idx + 1}</div>
                      <div className="rank-title">{item.name} {item.isVerified && <CheckCircle size={12} color="#3b82f6" fill="#3b82f6" style={{ marginLeft: '4px' }} />}</div>
                      <div className="rank-points">{item.score.toLocaleString()} pts</div>
                    </div>
                  ))
                }
              </div>
            </section>

            <aside>
              {showReporter && (
                <div style={{ marginBottom: '3rem', padding: '2rem', border: '1px solid #e5e5d1', borderRadius: '1rem', background: '#f8fafb' }}>
                  <ActivityReporter />
                </div>
              )}

              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '0.8rem', fontWeight: 900, color: '#365314', textTransform: 'uppercase', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', letterSpacing: '0.05em' }}>
                  <MapIcon size={16} /> Pune Performance
                </h3>
                <div style={{ padding: '1.5rem', background: 'white', border: '1px solid #e5e5d1', borderRadius: '1.5rem' }}>
                  <div style={{ fontSize: '0.85rem', color: '#71717a', marginBottom: '1.5rem', lineHeight: 1.6 }}>Your district, <b>Pune Central</b>, is leading in community recycling!</div>
                  <PuneMap />
                  <button className="btn-ghost" style={{ width: '100%', marginTop: '1.5rem', fontSize: '0.8rem', fontWeight: 800 }}>Expand Map</button>
                </div>
              </div>
            </aside>
          </div>
        </main>
      )}
    </div>
  );
}

export default App;
