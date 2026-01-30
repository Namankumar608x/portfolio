import React, { useState, useEffect } from 'react';

const Home = ({ scrollToSection }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [hoveredStat, setHoveredStat] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const containerStyle = {
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden',
    background: 'linear-gradient(to bottom, #000408 0%, #020814 30%, #030b1a 70%, #000204 100%)',
  };

  const forestOverlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(ellipse at 50% 0%, rgba(30, 60, 90, 0.1) 0%, transparent 50%),
      radial-gradient(ellipse at ${mousePosition.x}px ${mousePosition.y}px, rgba(50, 80, 120, 0.08) 0%, transparent 30%)
    `,
    pointerEvents: 'none',
    transition: 'background 0.3s ease-out'
  };

  const mistLayerStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    background: 'linear-gradient(to top, rgba(30, 50, 80, 0.08) 0%, transparent 100%)',
    pointerEvents: 'none',
    animation: 'mistFloat 20s ease-in-out infinite'
  };

  const contentWrapperStyle = {
    position: 'relative',
    zIndex: 10,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    transform: `translateY(${scrollY * 0.3}px)`,
    transition: 'transform 0.1s ease-out'
  };

  const heroSectionStyle = {
    textAlign: 'center',
    maxWidth: '1200px',
    animation: 'fadeInUp 1.5s ease-out both'
  };

  const greetingStyle = {
    fontSize: 'clamp(1rem, 2vw, 1.3rem)',
    color: '#4a7ba7',
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    fontWeight: '300',
    marginBottom: '1.5rem',
    opacity: 0.8,
    animation: 'fadeIn 2s ease-out 0.5s both',
    textShadow: '0 0 20px rgba(74, 123, 167, 0.4)',
    position: 'relative',
    display: 'inline-block'
  };

  const nameStyle = {
    fontSize: 'clamp(3rem, 10vw, 8rem)',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #c8dce8 0%, #7aa3c4 30%, #4a7ba7 60%, #2d5982 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '1rem',
    lineHeight: '1.1',
    letterSpacing: '-0.02em',
    filter: 'drop-shadow(0 0 40px rgba(74, 123, 167, 0.5))',
    animation: 'titleGlow 3s ease-in-out infinite alternate'
  };

  const titleStyle = {
    fontSize: 'clamp(1.2rem, 3vw, 2rem)',
    color: '#6b9ac4',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    fontWeight: '300',
    marginBottom: '3rem',
    opacity: 0.75,
    animation: 'fadeIn 2s ease-out 1s both',
    textShadow: '0 0 15px rgba(107, 154, 196, 0.3)'
  };

  const wolfQuoteStyle = {
    fontSize: 'clamp(1rem, 2vw, 1.4rem)',
    color: '#5a8ab8',
    fontStyle: 'italic',
    fontWeight: '300',
    maxWidth: '800px',
    margin: '0 auto 4rem',
    lineHeight: '1.9',
    opacity: 0.85,
    animation: 'fadeIn 2s ease-out 1.5s both',
    borderLeft: '2px solid rgba(74, 123, 167, 0.4)',
    paddingLeft: '2rem',
    textShadow: '0 0 12px rgba(90, 138, 184, 0.3)',
    position: 'relative'
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '2rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: '5rem',
    animation: 'fadeIn 2s ease-out 2s both'
  };

  const primaryButtonStyle = {
    padding: '1.3rem 3rem',
    background: 'linear-gradient(135deg, rgba(74, 123, 167, 0.2) 0%, rgba(45, 89, 130, 0.3) 100%)',
    border: '2px solid rgba(74, 123, 167, 0.5)',
    borderRadius: '0',
    color: '#b8d4e8',
    fontSize: '1rem',
    fontWeight: '600',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6), 0 0 20px rgba(74, 123, 167, 0.2)',
    textShadow: '0 0 10px rgba(184, 212, 232, 0.4)'
  };

  const secondaryButtonStyle = {
    padding: '1.3rem 3rem',
    background: 'transparent',
    border: '2px solid rgba(74, 123, 167, 0.3)',
    borderRadius: '0',
    color: '#7aa3c4',
    fontSize: '1rem',
    fontWeight: '600',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'all 0.4s ease',
    backdropFilter: 'blur(10px)',
    textShadow: '0 0 8px rgba(122, 163, 196, 0.3)'
  };

  const wolfSilhouetteStyle = {
    position: 'absolute',
    bottom: '8%',
    left: '50%',
    transform: `translateX(-50%) translateY(${scrollY * 0.1}px)`,
    width: '250px',
    height: '250px',
    opacity: 0.15,
    animation: 'wolfHowl 6s ease-in-out infinite',
    filter: 'drop-shadow(0 0 40px rgba(74, 123, 167, 0.5))',
    transition: 'transform 0.1s ease-out'
  };

  const statsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2.5rem',
    marginTop: '4rem',
    maxWidth: '1200px',
    width: '100%',
    animation: 'fadeIn 2s ease-out 2.5s both'
  };

  const getStatCardStyle = (index) => ({
    padding: '2.5rem',
    background: hoveredStat === index 
      ? 'linear-gradient(135deg, rgba(3, 11, 26, 0.85) 0%, rgba(5, 15, 35, 0.7) 100%)'
      : 'linear-gradient(135deg, rgba(3, 11, 26, 0.7) 0%, rgba(5, 15, 35, 0.5) 100%)',
    border: `1px solid ${hoveredStat === index ? 'rgba(74, 123, 167, 0.3)' : 'rgba(74, 123, 167, 0.15)'}`,
    borderLeft: `3px solid ${hoveredStat === index ? 'rgba(74, 123, 167, 0.6)' : 'rgba(74, 123, 167, 0.4)'}`,
    backdropFilter: 'blur(20px)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: hoveredStat === index 
      ? '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 40px rgba(74, 123, 167, 0.3)'
      : '0 8px 32px rgba(0, 0, 0, 0.5)',
    transform: hoveredStat === index ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)'
  });

  const decorativeElementsStyle = {
    position: 'absolute',
    top: '10%',
    right: '5%',
    width: '350px',
    height: '350px',
    background: 'radial-gradient(circle, rgba(74, 123, 167, 0.08) 0%, transparent 70%)',
    borderRadius: '50%',
    filter: 'blur(70px)',
    animation: 'pulse 8s ease-in-out infinite',
    pointerEvents: 'none'
  };

  const decorativeElements2Style = {
    position: 'absolute',
    bottom: '15%',
    left: '8%',
    width: '300px',
    height: '300px',
    background: 'radial-gradient(circle, rgba(45, 89, 130, 0.06) 0%, transparent 70%)',
    borderRadius: '50%',
    filter: 'blur(60px)',
    animation: 'pulse 10s ease-in-out infinite 2s',
    pointerEvents: 'none'
  };

  const starsStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(2px 2px at 20% 30%, rgba(184, 212, 232, 0.4), transparent),
      radial-gradient(2px 2px at 60% 70%, rgba(122, 163, 196, 0.35), transparent),
      radial-gradient(1px 1px at 50% 50%, rgba(184, 212, 232, 0.3), transparent),
      radial-gradient(1px 1px at 80% 10%, rgba(122, 163, 196, 0.25), transparent),
      radial-gradient(2px 2px at 90% 60%, rgba(184, 212, 232, 0.3), transparent),
      radial-gradient(1px 1px at 33% 80%, rgba(122, 163, 196, 0.25), transparent),
      radial-gradient(1px 1px at 15% 60%, rgba(184, 212, 232, 0.2), transparent),
      radial-gradient(2px 2px at 70% 25%, rgba(122, 163, 196, 0.3), transparent)
    `,
    backgroundSize: '200px 200px, 300px 300px, 250px 250px, 350px 350px, 280px 280px, 320px 320px, 240px 240px, 290px 290px',
    pointerEvents: 'none',
    animation: 'twinkle 5s ease-in-out infinite'
  };

  return (
    <div style={containerStyle}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&display=swap');
          
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(50px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes titleGlow {
            0% {
              filter: drop-shadow(0 0 40px rgba(74, 123, 167, 0.5));
            }
            100% {
              filter: drop-shadow(0 0 60px rgba(74, 123, 167, 0.7));
            }
          }

          @keyframes pulse {
            0%, 100% {
              opacity: 1;
              transform: scale(1);
            }
            50% {
              opacity: 0.6;
              transform: scale(1.1);
            }
          }

          @keyframes twinkle {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.4;
            }
          }

          @keyframes mistFloat {
            0%, 100% {
              transform: translateX(0) translateY(0);
              opacity: 1;
            }
            50% {
              transform: translateX(50px) translateY(-40px);
              opacity: 0.8;
            }
          }

          @keyframes wolfHowl {
            0%, 100% {
              transform: translateX(-50%) scale(1);
              opacity: 0.15;
            }
            50% {
              transform: translateX(-50%) scale(1.05);
              opacity: 0.2;
            }
          }

          .primary-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(184, 212, 232, 0.2), transparent);
            transition: left 0.5s ease;
          }

          .primary-btn:hover::before {
            left: 100%;
          }

          .primary-btn:hover {
            border-color: rgba(74, 123, 167, 0.7) !important;
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.7), 0 0 40px rgba(74, 123, 167, 0.4) !important;
            transform: translateY(-3px);
            color: #e8f4ff !important;
          }

          .secondary-btn:hover {
            background: rgba(74, 123, 167, 0.15) !important;
            border-color: rgba(74, 123, 167, 0.5) !important;
            color: #b8d4e8 !important;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5), 0 0 25px rgba(74, 123, 167, 0.3) !important;
            transform: translateY(-3px);
          }

          .stat-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, transparent, rgba(74, 123, 167, 0.5), transparent);
            opacity: 0;
            transition: opacity 0.4s ease;
          }

          .stat-card:hover::before {
            opacity: 1;
          }

          @media (max-width: 768px) {
            .button-container {
              flex-direction: column;
              align-items: center;
            }
          }
        `}
      </style>

      {/* Stars background */}
      <div style={starsStyle} />

      {/* Atmospheric overlays */}
      <div style={forestOverlayStyle} />
      <div style={mistLayerStyle} />
      <div style={decorativeElementsStyle} />
      <div style={decorativeElements2Style} />

      {/* Enhanced Wolf silhouette */}
      <svg style={wolfSilhouetteStyle} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Wolf head and body */}
        <path d="M100 40 L115 65 L110 85 L120 100 L115 115 L110 130 L100 150 L90 130 L85 115 L80 100 L90 85 L85 65 Z" 
          fill="rgba(74, 123, 167, 0.3)" 
          stroke="rgba(74, 123, 167, 0.5)" 
          strokeWidth="1.5"/>
        
        {/* Eyes with glow */}
        <circle cx="92" cy="75" r="4" fill="rgba(184, 212, 232, 0.9)">
          <animate attributeName="opacity" values="0.9;0.5;0.9" dur="3s" repeatCount="indefinite"/>
        </circle>
        <circle cx="108" cy="75" r="4" fill="rgba(184, 212, 232, 0.9)">
          <animate attributeName="opacity" values="0.9;0.5;0.9" dur="3s" repeatCount="indefinite"/>
        </circle>
        
        {/* Ears */}
        <path d="M80 50 L68 35 L62 42 L68 55" fill="rgba(74, 123, 167, 0.3)" stroke="rgba(74, 123, 167, 0.5)" strokeWidth="1"/>
        <path d="M120 50 L132 35 L138 42 L132 55" fill="rgba(74, 123, 167, 0.3)" stroke="rgba(74, 123, 167, 0.5)" strokeWidth="1"/>
        
        {/* Snout */}
        <path d="M100 85 L95 95 L100 100 L105 95 Z" fill="rgba(74, 123, 167, 0.4)" stroke="rgba(74, 123, 167, 0.6)" strokeWidth="1"/>
        
        {/* Moon in background */}
        <circle cx="160" cy="40" r="20" fill="rgba(184, 212, 232, 0.1)" stroke="rgba(184, 212, 232, 0.2)" strokeWidth="1">
          <animate attributeName="opacity" values="0.1;0.2;0.1" dur="4s" repeatCount="indefinite"/>
        </circle>
      </svg>

      <div style={contentWrapperStyle}>
        <div style={heroSectionStyle}>
          <p style={greetingStyle}>🐺 Lone Wolf Developer</p>
          
          <h1 style={nameStyle}>Naman Kumar</h1>
          
          <p style={titleStyle}>Full Stack Developer</p>
          
          <p style={wolfQuoteStyle}>
            "The strength of the pack is the wolf, and the strength of the wolf is the pack. 
            But sometimes, a lone wolf must forge their own path through the digital wilderness."
          </p>

          <div className="button-container" style={buttonContainerStyle}>
            <button 
              className="primary-btn"
              style={primaryButtonStyle}
              onClick={() => scrollToSection('projects')}
            >
              Explore My Territory
            </button>
            <button 
              className="secondary-btn"
              style={secondaryButtonStyle}
              onClick={() => scrollToSection('contact')}
            >
              Join The Pack
            </button>
          </div>

          {/* Coding Stats */}
          <div style={statsContainerStyle}>
            <a
              href="https://www.codechef.com/users/naman608x"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
              onMouseEnter={() => setHoveredStat(0)}
              onMouseLeave={() => setHoveredStat(null)}
            >
              <div className="stat-card" style={getStatCardStyle(0)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{
                    width: '55px',
                    height: '55px',
                    background: 'rgba(91, 70, 56, 0.25)',
                    border: '2px solid rgba(184, 146, 90, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    color: '#B8925A',
                    letterSpacing: '0.1em',
                    boxShadow: '0 0 15px rgba(184, 146, 90, 0.2)'
                  }}>
                    CC
                  </div>
                  <div>
                    <div style={{ 
                      fontSize: '0.8rem', 
                      color: '#9d7d4d', 
                      letterSpacing: '0.2em',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      textShadow: '0 0 10px rgba(157, 125, 77, 0.3)'
                    }}>
                      CodeChef
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'rgba(122, 163, 196, 0.6)', marginTop: '0.3rem' }}>
                      Competitive Hunter
                    </div>
                  </div>
                </div>
                <div style={{
                  fontSize: '3.5rem',
                  fontWeight: '800',
                  color: '#b8d4e8',
                  marginBottom: '0.5rem',
                  fontFamily: 'Cinzel, serif',
                  textShadow: '0 0 25px rgba(184, 212, 232, 0.4)',
                  letterSpacing: '-0.02em'
                }}>
                  1451
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: 'rgba(122, 163, 196, 0.7)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase'
                }}>
                  Max Rating
                </div>
              </div>
            </a>

            <a
              href="https://codeforces.com/profile/Naman_kumar608"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
              onMouseEnter={() => setHoveredStat(1)}
              onMouseLeave={() => setHoveredStat(null)}
            >
              <div className="stat-card" style={getStatCardStyle(1)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{
                    width: '55px',
                    height: '55px',
                    background: 'rgba(74, 123, 167, 0.2)',
                    border: '2px solid rgba(74, 123, 167, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.8rem',
                    boxShadow: '0 0 15px rgba(74, 123, 167, 0.2)'
                  }}>
                    📊
                  </div>
                  <div>
                    <div style={{ 
                      fontSize: '0.8rem', 
                      color: '#5a8ab8', 
                      letterSpacing: '0.2em',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      textShadow: '0 0 10px rgba(90, 138, 184, 0.3)'
                    }}>
                      Codeforces
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'rgba(122, 163, 196, 0.6)', marginTop: '0.3rem' }}>
                      Algorithm Tracker
                    </div>
                  </div>
                </div>
                <div style={{
                  fontSize: '3.5rem',
                  fontWeight: '800',
                  color: '#b8d4e8',
                  marginBottom: '0.5rem',
                  fontFamily: 'Cinzel, serif',
                  textShadow: '0 0 25px rgba(184, 212, 232, 0.4)',
                  letterSpacing: '-0.02em'
                }}>
                  1080
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: 'rgba(122, 163, 196, 0.7)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase'
                }}>
                  Max Rating
                </div>
              </div>
            </a>

            <a
              href="https://leetcode.com/u/Namankumar608x"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
              onMouseEnter={() => setHoveredStat(2)}
              onMouseLeave={() => setHoveredStat(null)}
            >
              <div className="stat-card" style={getStatCardStyle(2)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{
                    width: '55px',
                    height: '55px',
                    background: 'rgba(122, 95, 140, 0.2)',
                    border: '2px solid rgba(122, 95, 140, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.8rem',
                    boxShadow: '0 0 15px rgba(122, 95, 140, 0.2)'
                  }}>
                    ⚡
                  </div>
                  <div>
                    <div style={{ 
                      fontSize: '0.8rem', 
                      color: '#7a5f8c', 
                      letterSpacing: '0.2em',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      textShadow: '0 0 10px rgba(122, 95, 140, 0.3)'
                    }}>
                      LeetCode
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'rgba(122, 163, 196, 0.6)', marginTop: '0.3rem' }}>
                      Problem Solver
                    </div>
                  </div>
                </div>
                <div style={{
                  fontSize: '3.5rem',
                  fontWeight: '800',
                  color: '#b8d4e8',
                  marginBottom: '0.5rem',
                  fontFamily: 'Cinzel, serif',
                  textShadow: '0 0 25px rgba(184, 212, 232, 0.4)',
                  letterSpacing: '-0.02em'
                }}>
                  1527
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: 'rgba(122, 163, 196, 0.7)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase'
                }}>
                  Max Rating
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;