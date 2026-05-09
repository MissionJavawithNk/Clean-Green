import React, { useState } from 'react';
import { User, Lock, Mail, ArrowRight, Loader2, Shield } from 'lucide-react';

const AuthView = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call for now (or connect to /api/auth/login)
    setTimeout(() => {
      const mockUser = { username: formData.username, role: 'CITIZEN', token: 'mock-jwt-token' };
      localStorage.setItem('user', JSON.stringify(mockUser));
      onLogin(mockUser);
      setLoading(false);
    }, 1500);
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh'
    }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '450px' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', textAlign: 'center' }}>
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '2rem' }}>
          {isLogin ? 'Log in to track your green impact.' : 'Join the competition for a cleaner planet.'}
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ position: 'relative' }}>
            <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text"
              placeholder="Username"
              required
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              style={{
                width: '100%',
                padding: '0.85rem 1rem 0.85rem 3rem',
                background: 'var(--glass)',
                border: '1px solid var(--glass-border)',
                borderRadius: '0.75rem',
                color: 'white',
                fontSize: '1rem'
              }}
            />
          </div>

          {!isLogin && (
            <>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="email"
                  placeholder="Email Address"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem 0.85rem 3rem',
                    background: 'var(--glass)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '0.75rem',
                    color: 'white',
                    fontSize: '1rem'
                  }}
                />
              </div>
              <div style={{ position: 'relative' }}>
                <Shield size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="text"
                  placeholder="12-Digit Aadhaar Number"
                  required
                  maxLength="12"
                  pattern="\d{12}"
                  value={formData.aadhaarNumber || ''}
                  onChange={(e) => setFormData({...formData, aadhaarNumber: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem 0.85rem 3rem',
                    background: 'var(--glass)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '0.75rem',
                    color: 'white',
                    fontSize: '1rem'
                  }}
                />
              </div>
            </>
          )}

          <div style={{ position: 'relative' }}>
            <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              style={{
                width: '100%',
                padding: '0.85rem 1rem 0.85rem 3rem',
                background: 'var(--glass)',
                border: '1px solid var(--glass-border)',
                borderRadius: '0.75rem',
                color: 'white',
                fontSize: '1rem'
              }}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{
              padding: '1rem',
              background: 'linear-gradient(to right, var(--primary), var(--secondary))',
              border: 'none',
              borderRadius: '0.75rem',
              color: 'white',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              marginTop: '1rem'
            }}
          >
            {loading ? <Loader2 className="animate-spin" /> : (isLogin ? 'Log In' : 'Sign Up')}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <button 
            onClick={() => setIsLogin(!isLogin)}
            style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '0.9rem' }}
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthView;
