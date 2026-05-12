import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { logActivity } from '../services/api';

const ActivityReporter = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    householdId: 1, // Mock current user
    category: 'SEGREGATION',
    points: 10,
    reason: 'Proper segregation of wet and dry waste.'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await logActivity(formData);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      alert('Error submitting report. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card" style={{ marginTop: '2rem' }}>
      <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Send size={20} color="var(--primary)" /> Log Daily Disposal
      </h3>
      
      {submitted ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--primary)' }}>
          <CheckCircle size={48} style={{ marginBottom: '1rem' }} />
          <h4>Report Submitted! +10 Points Earned</h4>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Category</label>
            <select 
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '0.5rem',
                color: '#0f172a'
              }}
            >
              <option value="SEGREGATION">Proper Segregation (+10)</option>
              <option value="RECYCLING">Recycling Submission (+15)</option>
              <option value="REPORTING">Reporting Issue (+3)</option>
            </select>
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            style={{
              padding: '1rem',
              background: 'var(--primary)',
              border: 'none',
              borderRadius: '0.5rem',
              color: 'white',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'opacity 0.2s'
            }}
          >
            {loading ? 'Submitting...' : 'Submit Daily Report'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ActivityReporter;
