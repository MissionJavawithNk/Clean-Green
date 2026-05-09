import React from 'react';
import { Award, CheckCircle, Share2, Download } from 'lucide-react';

const ImpactCard = ({ user, score, rank }) => {
  return (
    <div className="glass-card" style={{
      width: '100%',
      maxWidth: '400px',
      padding: '2.5rem',
      background: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)',
      border: '2px solid #10b981',
      position: 'relative',
      overflow: 'hidden',
      color: 'white',
      textAlign: 'center'
    }}>
      {/* Decorative background elements */}
      <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '50%', filter: 'blur(40px)' }}></div>
      <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', width: '100px', height: '100px', background: 'rgba(59, 130, 246, 0.2)', borderRadius: '50%', filter: 'blur(30px)' }}></div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '2rem', letterSpacing: '1px' }}>
          CLEAN <span style={{ color: '#10b981' }}>&</span> GREEN
        </h2>
        
        <div style={{ 
          width: '100px', height: '100px', borderRadius: '50%', 
          background: 'rgba(255,255,255,0.1)', margin: '0 auto 1.5rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '2px solid rgba(255,255,255,0.2)'
        }}>
          <Award size={48} color="#fbbf24" />
        </div>

        <h3 style={{ fontSize: '1.8rem', marginBottom: '0.25rem' }}>{user.username}</h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', color: '#60a5fa', fontSize: '0.9rem', marginBottom: '2rem' }}>
          <CheckCircle size={14} fill="#60a5fa" color="white" /> AADHAAR VERIFIED CITIZEN
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '1rem' }}>
            <span style={{ display: 'block', fontSize: '1.5rem', fontWeight: 900, color: '#10b981' }}>{score}</span>
            <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>Points Earned</span>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '1rem' }}>
            <span style={{ display: 'block', fontSize: '1.5rem', fontWeight: 900, color: '#60a5fa' }}>#{rank}</span>
            <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>Society Rank</span>
          </div>
        </div>

        <p style={{ fontSize: '0.85rem', color: '#94a3b8', fontStyle: 'italic', marginBottom: '2rem' }}>
          "Helping my society lead the green revolution!"
        </p>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button style={{ flex: 1, padding: '0.75rem', background: 'white', color: '#064e3b', border: 'none', borderRadius: '0.5rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <Download size={16} /> Download
          </button>
          <button style={{ flex: 1, padding: '0.75rem', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '0.5rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <Share2 size={16} /> Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImpactCard;
