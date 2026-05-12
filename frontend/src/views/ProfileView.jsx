import React from 'react';
import { Award, Zap, Shield, Recycle, Trash2, Droplets, Leaf, Share2, Download, Globe } from 'lucide-react';

const Badge = ({ icon: Icon, title, desc, unlocked }) => (
  <div style={{ 
    padding: '1.5rem', 
    background: unlocked ? '#f0fdf4' : '#f8fafc', 
    borderRadius: '1rem', 
    border: unlocked ? '1px solid #bdf4d4' : '1px solid #f1f5f9',
    textAlign: 'center',
    opacity: unlocked ? 1 : 0.5
  }}>
    <div style={{ 
      width: '56px', height: '56px', 
      background: unlocked ? '#10b981' : '#cbd5e1', 
      borderRadius: '50%', margin: '0 auto 1rem', 
      display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
    }}>
      <Icon size={28} />
    </div>
    <h4 style={{ fontWeight: 700, fontSize: '0.9rem', color: unlocked ? '#064e3b' : '#64748b' }}>{title}</h4>
    <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>{desc}</p>
  </div>
);

const ProfileView = ({ user }) => {
  const metrics = [
    { label: 'Recycled', value: '124kg', icon: Recycle, color: '#059669' },
    { label: 'Organic', value: '45kg', icon: Droplets, color: '#3b82f6' },
    { label: 'E-Waste', value: '3.2kg', icon: Trash2, color: '#ef4444' }
  ];

  const badges = [
    { icon: Leaf, title: 'Seedling', desc: '1st Activity Logged', unlocked: true },
    { icon: Zap, title: 'Fast Mover', desc: '5 logs in 1 week', unlocked: true },
    { icon: Award, title: 'Waste Warrior', desc: 'Reach 1000 Points', unlocked: true },
    { icon: Shield, title: 'Guardian', desc: 'Verified Resident', unlocked: true },
    { icon: Globe, title: 'Earth Hero', desc: 'Top 1% in District', unlocked: false }
  ];

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start' }}>
        <div style={{ flex: '1' }}>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginBottom: '3rem' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#065f46', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2.5rem', fontWeight: 800 }}>
              {user.username[0].toUpperCase()}
            </div>
            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#064e3b' }}>{user.username}</h2>
              <p style={{ color: '#64748b' }}>Resident since May 2026 • <b>Verified</b></p>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button className="btn-action" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Share2 size={16} /> Share Impact
                </button>
                <button className="btn-ghost" style={{ border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Download size={16} /> Certificate
                </button>
              </div>
            </div>
          </div>

          <h3 style={{ fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>Your Impact Metrics</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '4rem' }}>
            {metrics.map(m => (
              <div key={m.label} style={{ padding: '1.5rem', border: '1px solid #f1f5f9', borderRadius: '1rem' }}>
                <m.icon size={20} color={m.color} style={{ marginBottom: '0.75rem' }} />
                <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{m.value}</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ width: '350px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>Unlocked Badges</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            {badges.map(b => <Badge key={b.title} {...b} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
