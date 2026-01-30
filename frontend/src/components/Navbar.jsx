import React, { useState, useEffect } from 'react';

const Navbar = ({ activeSection, scrollToSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', id: 'home', icon: '🏠' },
    { name: 'Projects', id: 'projects', icon: '💼' },
    { name: 'Tech Stack', id: 'techstack', icon: '⚡' },
    { name: 'Education', id: 'education', icon: '🎓' },
    { name: 'Contact', id: 'contact', icon: '✉️' }
  ];

  const navStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    transition: 'all 0.3s ease',
    background: isScrolled 
      ? 'rgba(3, 11, 26, 0.95)' 
      : 'rgba(0, 4, 8, 0.8)',
    backdropFilter: 'blur(20px)',
    borderBottom: `1px solid ${isScrolled ? 'rgba(74, 123, 167, 0.2)' : 'rgba(74, 123, 167, 0.1)'}`,
    boxShadow: isScrolled ? '0 4px 30px rgba(0, 0, 0, 0.5)' : 'none'
  };

  const containerStyle = {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '1.5rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const logoStyle = {
    fontSize: '1.8rem',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #c8dce8 0%, #7aa3c4 50%, #4a7ba7 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    letterSpacing: '-0.02em',
    filter: 'drop-shadow(0 0 20px rgba(74, 123, 167, 0.3))'
  };

  const desktopMenuStyle = {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center'
  };

  const getButtonStyle = (isActive) => ({
    padding: '0.8rem 1.8rem',
    borderRadius: '0',
    background: isActive 
      ? 'linear-gradient(135deg, rgba(74, 123, 167, 0.2) 0%, rgba(45, 89, 130, 0.3) 100%)'
      : 'transparent',
    color: isActive ? '#b8d4e8' : '#7aa3c4',
    border: isActive 
      ? '1px solid rgba(74, 123, 167, 0.4)' 
      : '1px solid transparent',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: '600',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    boxShadow: isActive ? '0 0 20px rgba(74, 123, 167, 0.2)' : 'none',
    textShadow: isActive ? '0 0 10px rgba(184, 212, 232, 0.3)' : 'none'
  });

  const mobileButtonStyle = {
    display: 'none',
    background: 'transparent',
    border: '1px solid rgba(74, 123, 167, 0.3)',
    color: '#7aa3c4',
    fontSize: '1.5rem',
    cursor: 'pointer',
    padding: '0.5rem 0.8rem',
    transition: 'all 0.3s ease'
  };

  const mobileMenuStyle = {
    display: mobileMenuOpen ? 'flex' : 'none',
    flexDirection: 'column',
    gap: '0.5rem',
    marginTop: '1rem',
    paddingTop: '1rem',
    borderTop: '1px solid rgba(74, 123, 167, 0.2)'
  };

  return (
    <nav style={navStyle}>
      <style>
        {`
          @media (max-width: 768px) {
            .desktop-menu { display: none !important; }
            .mobile-button { display: block !important; }
          }
          
          .nav-button:hover {
            background: rgba(74, 123, 167, 0.15) !important;
            border-color: rgba(74, 123, 167, 0.3) !important;
            color: #b8d4e8 !important;
            box-shadow: 0 0 15px rgba(74, 123, 167, 0.2) !important;
          }

          .mobile-button:hover {
            background: rgba(74, 123, 167, 0.1) !important;
            border-color: rgba(74, 123, 167, 0.5) !important;
          }
        `}
      </style>
      
      <div style={containerStyle}>
        <div style={logoStyle}>
          <span>🐺</span>
          <span>Portfolio</span>
        </div>
        
        <div className="desktop-menu" style={desktopMenuStyle}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="nav-button"
              style={getButtonStyle(activeSection === item.id)}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </div>

        <button 
          className="mobile-button"
          style={mobileButtonStyle}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      <div style={mobileMenuStyle}>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              scrollToSection(item.id);
              setMobileMenuOpen(false);
            }}
            style={{
              ...getButtonStyle(activeSection === item.id),
              width: '100%',
              justifyContent: 'center',
              margin: '0 1rem'
            }}
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;