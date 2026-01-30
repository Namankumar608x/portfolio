import React, { useState } from 'react';

const API_BASE = 'http://localhost:8000/api';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus('error');
      setTimeout(() => setFormStatus(''), 3000);
      return;
    }
    
    setFormStatus('sending');
    
    try {
      const res = await fetch(`${API_BASE}/contact/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormStatus(''), 4000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus(''), 3000);
      }
    } catch (err) {
      setFormStatus('error');
      setTimeout(() => setFormStatus(''), 3000);
    }
  };

  const containerStyle = {
    minHeight: '100vh',
    padding: '8rem 2rem 4rem',
    position: 'relative',
    background: 'linear-gradient(to bottom, #000408 0%, #020814 30%, #030b1a 70%, #000204 100%)',
    overflow: 'hidden'
  };

  const starsStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(2px 2px at 20% 30%, rgba(184, 212, 232, 0.3), transparent),
      radial-gradient(2px 2px at 60% 70%, rgba(122, 163, 196, 0.3), transparent),
      radial-gradient(1px 1px at 50% 50%, rgba(184, 212, 232, 0.2), transparent),
      radial-gradient(1px 1px at 80% 10%, rgba(122, 163, 196, 0.2), transparent),
      radial-gradient(2px 2px at 90% 60%, rgba(184, 212, 232, 0.25), transparent),
      radial-gradient(1px 1px at 33% 80%, rgba(122, 163, 196, 0.2), transparent)
    `,
    backgroundSize: '200px 200px, 300px 300px, 250px 250px, 350px 350px, 280px 280px, 320px 320px',
    pointerEvents: 'none',
    animation: 'twinkle 4s ease-in-out infinite'
  };

  const mistLayerStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    background: 'linear-gradient(to top, rgba(30, 50, 80, 0.08) 0%, transparent 100%)',
    pointerEvents: 'none',
    animation: 'mistFloat 20s ease-in-out infinite'
  };

  const contentStyle = {
    maxWidth: '900px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 10
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '4rem',
    animation: 'fadeInUp 1s ease-out'
  };

  const titleStyle = {
    fontSize: 'clamp(2.5rem, 6vw, 5rem)',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #c8dce8 0%, #7aa3c4 30%, #4a7ba7 60%, #2d5982 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    filter: 'drop-shadow(0 0 30px rgba(74, 123, 167, 0.4))',
    letterSpacing: '-0.02em'
  };

  const subtitleStyle = {
    fontSize: '1.3rem',
    color: '#6b9ac4',
    fontWeight: '300',
    opacity: 0.75,
    letterSpacing: '0.1em',
    textShadow: '0 0 10px rgba(107, 154, 196, 0.2)'
  };

  const formCardStyle = {
    background: 'linear-gradient(135deg, rgba(3, 11, 26, 0.8) 0%, rgba(5, 15, 35, 0.6) 100%)',
    borderRadius: '0',
    padding: '3rem',
    border: '1px solid rgba(74, 123, 167, 0.2)',
    borderLeft: '3px solid rgba(74, 123, 167, 0.5)',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 15px 50px rgba(0, 0, 0, 0.6)',
    animation: 'fadeInUp 0.8s ease-out 0.2s both'
  };

  const inputGroupStyle = {
    marginBottom: '2rem'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#7aa3c4',
    marginBottom: '0.8rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    opacity: 0.9
  };

  const getInputStyle = (fieldName) => ({
    width: '100%',
    padding: '1.2rem 1.5rem',
    background: focusedField === fieldName 
      ? 'rgba(3, 11, 26, 0.9)' 
      : 'rgba(3, 11, 26, 0.7)',
    border: `1px solid ${focusedField === fieldName ? 'rgba(74, 123, 167, 0.5)' : 'rgba(74, 123, 167, 0.25)'}`,
    borderRadius: '0',
    color: '#b8d4e8',
    fontSize: '1rem',
    outline: 'none',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit',
    boxShadow: focusedField === fieldName ? '0 0 25px rgba(74, 123, 167, 0.2)' : 'none'
  });

  const textareaStyle = {
    ...getInputStyle('message'),
    minHeight: '180px',
    resize: 'vertical'
  };

  const buttonStyle = {
    width: '100%',
    padding: '1.3rem',
    background: formStatus === 'sending' 
      ? 'rgba(74, 123, 167, 0.3)' 
      : 'linear-gradient(135deg, rgba(74, 123, 167, 0.2) 0%, rgba(45, 89, 130, 0.3) 100%)',
    border: '1px solid rgba(74, 123, 167, 0.4)',
    borderRadius: '0',
    color: '#b8d4e8',
    fontSize: '1rem',
    fontWeight: '700',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    cursor: formStatus === 'sending' ? 'not-allowed' : 'pointer',
    transition: 'all 0.4s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.8rem',
    boxShadow: '0 0 25px rgba(74, 123, 167, 0.15)',
    textShadow: '0 0 10px rgba(184, 212, 232, 0.3)'
  };

  const statusMessageStyle = (type) => ({
    marginTop: '2rem',
    padding: '1.5rem',
    borderRadius: '0',
    textAlign: 'center',
    fontSize: '1rem',
    fontWeight: '600',
    letterSpacing: '0.05em',
    background: type === 'success' 
      ? 'rgba(74, 123, 167, 0.15)' 
      : 'rgba(122, 95, 140, 0.15)',
    border: `1px solid ${type === 'success' ? 'rgba(74, 123, 167, 0.4)' : 'rgba(122, 95, 140, 0.4)'}`,
    color: type === 'success' ? '#7aa3c4' : '#9d7d8d',
    animation: 'slideDown 0.4s ease-out',
    boxShadow: `0 0 20px ${type === 'success' ? 'rgba(74, 123, 167, 0.2)' : 'rgba(122, 95, 140, 0.2)'}`
  });

  const contactInfoStyle = {
    marginTop: '3rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem'
  };

  const infoCardStyle = {
    padding: '1.5rem',
    background: 'linear-gradient(135deg, rgba(3, 11, 26, 0.7) 0%, rgba(5, 15, 35, 0.5) 100%)',
    borderRadius: '0',
    border: '1px solid rgba(74, 123, 167, 0.2)',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.4)'
  };

  return (
    <div style={containerStyle}>
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes twinkle {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }

          @keyframes mistFloat {
            0%, 100% { transform: translateX(0) translateY(0); }
            50% { transform: translateX(50px) translateY(-30px); }
          }

          input::placeholder,
          textarea::placeholder {
            color: rgba(122, 163, 196, 0.4);
          }

          .submit-btn:hover:not(:disabled) {
            background: rgba(74, 123, 167, 0.3) !important;
            border-color: rgba(74, 123, 167, 0.6) !important;
            box-shadow: 0 0 35px rgba(74, 123, 167, 0.3) !important;
          }

          .info-card:hover {
            background: linear-gradient(135deg, rgba(3, 11, 26, 0.9) 0%, rgba(5, 15, 35, 0.7) 100%) !important;
            border-color: rgba(74, 123, 167, 0.5) !important;
            transform: translateY(-5px) !important;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6), 0 0 30px rgba(74, 123, 167, 0.2) !important;
          }

          @media (max-width: 768px) {
            .form-card {
              padding: 2rem !important;
            }
          }

          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>

      <div style={starsStyle} />
      <div style={mistLayerStyle} />

      <div style={contentStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>
            <span>✉️</span>
            <span>Get In Touch</span>
          </h2>
          <p style={subtitleStyle}>
            Join the pack or howl at the moon
          </p>
        </div>

        <div className="form-card" style={formCardStyle}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Your Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              style={getInputStyle('name')}
              placeholder="John Doe"
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Your Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              style={getInputStyle('email')}
              placeholder="john@example.com"
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Your Message</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField(null)}
              style={textareaStyle}
              placeholder="Share your thoughts from the wilderness..."
            />
          </div>

          <button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={formStatus === 'sending'}
            style={buttonStyle}
          >
            {formStatus === 'sending' ? (
              <>
                <div style={{
                  width: '24px',
                  height: '24px',
                  border: '3px solid rgba(184, 212, 232, 0.3)',
                  borderTop: '3px solid #b8d4e8',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                <span>SENDING...</span>
              </>
            ) : (
              <>
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                <span>SEND MESSAGE</span>
              </>
            )}
          </button>

          {formStatus === 'success' && (
            <div style={statusMessageStyle('success')}>
              ✓ Message sent successfully! I'll get back to you soon.
            </div>
          )}
          {formStatus === 'error' && (
            <div style={statusMessageStyle('error')}>
              ✗ Failed to send message. Please try again or email me directly.
            </div>
          )}
        </div>

        <div style={contactInfoStyle}>
          <a 
            href="mailto:namanm608@gmail.com" 
            className="info-card"
            style={{...infoCardStyle, textDecoration: 'none', color: '#b8d4e8'}}
          >
            <div style={{ fontSize: '2rem', marginBottom: '0.8rem', filter: 'drop-shadow(0 0 10px rgba(184, 212, 232, 0.3))' }}>📧</div>
            <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#7aa3c4', marginBottom: '0.5rem' }}>
              Email
            </div>
            <div style={{ fontSize: '0.95rem', color: '#5a8ab8', opacity: 0.8 }}>
              namanm608@gmail.com
            </div>
          </a>

          <a 
            href="https://github.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="info-card"
            style={{...infoCardStyle, textDecoration: 'none', color: '#b8d4e8'}}
          >
            <div style={{ fontSize: '2rem', marginBottom: '0.8rem', filter: 'drop-shadow(0 0 10px rgba(184, 212, 232, 0.3))' }}>💻</div>
            <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#7aa3c4', marginBottom: '0.5rem' }}>
              GitHub
            </div>
            <div style={{ fontSize: '0.95rem', color: '#5a8ab8', opacity: 0.8 }}>
              Check my projects
            </div>
          </a>

          <a 
            href="https://www.linkedin.com/in/naman-kumar-5ba0a7328/" 
            target="_blank"
            rel="noopener noreferrer"
            className="info-card"
            style={{...infoCardStyle, textDecoration: 'none', color: '#b8d4e8'}}
          >
            <div style={{ fontSize: '2rem', marginBottom: '0.8rem', filter: 'drop-shadow(0 0 10px rgba(184, 212, 232, 0.3))' }}>🔗</div>
            <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#7aa3c4', marginBottom: '0.5rem' }}>
              LinkedIn
            </div>
            <div style={{ fontSize: '0.95rem', color: '#5a8ab8', opacity: 0.8 }}>
              Let's connect
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;