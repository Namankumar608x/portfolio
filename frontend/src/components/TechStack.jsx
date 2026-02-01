import React, { useState, useEffect } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE;


const TechStack = () => {
  const [techStack, setTechStack] = useState([]);
  const [hoveredTech, setHoveredTech] = useState(null);

  useEffect(() => {
    const fetchTechStack = async () => {
      try {
        const res = await fetch(`${API_BASE}/tech-stack/`);
        const data = await res.json();
        setTechStack(data);
      } catch (err) {
        console.error('Error fetching tech stack:', err);
      }
    };
    fetchTechStack();
  }, []);

  const groupedTech = techStack.reduce((acc, tech) => {
    const category = tech.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(tech);
    return acc;
  }, {});

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
    maxWidth: '1400px',
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

  const categoryContainerStyle = {
    marginBottom: '3.5rem'
  };

  const categoryCardStyle = {
    background: 'linear-gradient(135deg, rgba(3, 11, 26, 0.7) 0%, rgba(5, 15, 35, 0.5) 100%)',
    borderRadius: '0',
    padding: '3rem',
    border: '1px solid rgba(74, 123, 167, 0.15)',
    borderLeft: '3px solid rgba(74, 123, 167, 0.5)',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
  };

  const categoryTitleStyle = {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#b8d4e8',
    marginBottom: '2.5rem',
    textShadow: '0 0 15px rgba(184, 212, 232, 0.2)',
    letterSpacing: '-0.01em'
  };

  const techGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1.5rem'
  };

  const getTechItemStyle = (techId) => ({
    padding: '1.5rem',
    background: hoveredTech === techId
      ? 'linear-gradient(135deg, rgba(74, 123, 167, 0.2) 0%, rgba(45, 89, 130, 0.3) 100%)'
      : 'rgba(3, 11, 26, 0.6)',
    borderRadius: '0',
    border: hoveredTech === techId 
      ? '1px solid rgba(74, 123, 167, 0.5)' 
      : '1px solid rgba(74, 123, 167, 0.2)',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: hoveredTech === techId ? 'translateY(-8px) scale(1.03)' : 'translateY(0) scale(1)',
    boxShadow: hoveredTech === techId 
      ? '0 15px 35px rgba(0, 0, 0, 0.6), 0 0 30px rgba(74, 123, 167, 0.2)' 
      : '0 4px 15px rgba(0, 0, 0, 0.4)'
  });

  const techNameStyle = {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#b8d4e8',
    textShadow: '0 0 10px rgba(184, 212, 232, 0.2)'
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

          @keyframes twinkle {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }

          @keyframes mistFloat {
            0%, 100% { transform: translateX(0) translateY(0); }
            50% { transform: translateX(50px) translateY(-30px); }
          }

          .tech-category {
            animation: fadeInUp 0.8s ease-out both;
          }

          @media (max-width: 768px) {
            .tech-grid {
              grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)) !important;
            }
          }
        `}
      </style>

      <div style={starsStyle} />
      <div style={mistLayerStyle} />

      <div style={contentStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>
            <span>⚡</span>
            <span>Tech Stack</span>
          </h2>
          <p style={subtitleStyle}>
            Technologies I hunt with
          </p>
        </div>

        <div>
          {Object.entries(groupedTech).map(([category, techs], categoryIndex) => (
            <div 
              key={category}
              className="tech-category"
              style={{
                ...categoryContainerStyle,
                animationDelay: `${categoryIndex * 0.2}s`
              }}
            >
              <div style={categoryCardStyle}>
                <h3 style={categoryTitleStyle}>{category}</h3>
                <div className="tech-grid" style={techGridStyle}>
                  {techs.map((tech) => (
                    <div
                      key={tech.id}
                      style={getTechItemStyle(tech.id)}
                      onMouseEnter={() => setHoveredTech(tech.id)}
                      onMouseLeave={() => setHoveredTech(null)}
                    >
                      <p style={techNameStyle}>{tech.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechStack;
