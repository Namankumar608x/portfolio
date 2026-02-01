import React, { useState, useEffect } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE;


const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_BASE}/projects/`);
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error('Error fetching projects:', err);
      }
    };
    fetchProjects();
  }, []);

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

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '2.5rem',
    marginTop: '3rem'
  };

  const getCardStyle = (index) => ({
    background: 'linear-gradient(135deg, rgba(3, 11, 26, 0.8) 0%, rgba(5, 15, 35, 0.6) 100%)',
    borderRadius: '0',
    padding: '2.5rem',
    border: hoveredCard === index 
      ? '1px solid rgba(74, 123, 167, 0.4)' 
      : '1px solid rgba(74, 123, 167, 0.15)',
    borderLeft: '3px solid rgba(74, 123, 167, 0.5)',
    backdropFilter: 'blur(20px)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    animation: `fadeInUp 0.8s ease-out ${index * 0.15}s both`,
    transform: hoveredCard === index ? 'translateY(-12px)' : 'translateY(0)',
    boxShadow: hoveredCard === index 
      ? '0 25px 50px rgba(0, 0, 0, 0.7), 0 0 40px rgba(74, 123, 167, 0.2)' 
      : '0 8px 32px rgba(0, 0, 0, 0.5)'
  });

  const projectTitleStyle = {
    fontSize: '1.8rem',
    fontWeight: '700',
    marginBottom: '1.2rem',
    color: '#b8d4e8',
    textShadow: '0 0 15px rgba(184, 212, 232, 0.2)',
    letterSpacing: '-0.01em'
  };

  const descriptionStyle = {
    color: '#7aa3c4',
    fontSize: '1.05rem',
    lineHeight: '1.8',
    marginBottom: '2rem',
    opacity: 0.9
  };

  const techStackContainerStyle = {
    marginBottom: '2rem',
    paddingTop: '1.5rem',
    borderTop: '1px solid rgba(74, 123, 167, 0.15)'
  };

  const techLabelStyle = {
    color: '#5a8ab8',
    fontSize: '0.85rem',
    fontWeight: '600',
    marginBottom: '0.8rem',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    opacity: 0.8
  };

  const techStackStyle = {
    color: '#6b9ac4',
    fontSize: '1rem',
    lineHeight: '1.7',
    opacity: 0.85
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap'
  };

  const linkButtonStyle = (isPrimary) => ({
    padding: '0.9rem 1.8rem',
    borderRadius: '0',
    border: isPrimary 
      ? '1px solid rgba(74, 123, 167, 0.4)' 
      : '1px solid rgba(74, 123, 167, 0.25)',
    background: isPrimary 
      ? 'linear-gradient(135deg, rgba(74, 123, 167, 0.2) 0%, rgba(45, 89, 130, 0.3) 100%)'
      : 'transparent',
    color: isPrimary ? '#b8d4e8' : '#7aa3c4',
    fontSize: '0.9rem',
    fontWeight: '600',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    textDecoration: 'none',
    backdropFilter: 'blur(10px)',
    boxShadow: isPrimary ? '0 0 20px rgba(74, 123, 167, 0.15)' : 'none',
    textShadow: '0 0 8px rgba(184, 212, 232, 0.2)'
  });

  return (
    <div style={containerStyle}>
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(40px);
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

          .link-btn:hover {
            background: rgba(74, 123, 167, 0.25) !important;
            border-color: rgba(74, 123, 167, 0.5) !important;
            color: #b8d4e8 !important;
            box-shadow: 0 0 25px rgba(74, 123, 167, 0.3) !important;
            transform: translateY(-2px);
          }

          @media (max-width: 768px) {
            .project-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>

      <div style={starsStyle} />
      <div style={mistLayerStyle} />

      <div style={contentStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>
            <span>💼</span>
            <span>Featured Projects</span>
          </h2>
          <p style={subtitleStyle}>
            Explore my digital territory
          </p>
        </div>

        <div className="project-grid" style={gridStyle}>
          {projects.map((project, index) => (
            <div
              key={project.id}
              style={getCardStyle(index)}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <h3 style={projectTitleStyle}>{project.title}</h3>
              <p style={descriptionStyle}>{project.description}</p>
              
              <div style={techStackContainerStyle}>
                <div style={techLabelStyle}>Tech Stack</div>
                <div style={techStackStyle}>{project.tech_stack}</div>
              </div>

              <div style={buttonContainerStyle}>
                {project.github_link && (
                  <a
                    href={project.github_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-btn"
                    style={linkButtonStyle(false)}
                  >
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    <span>View Code</span>
                  </a>
                )}
                {project.live_link && (
                  <a
                    href={project.live_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-btn"
                    style={linkButtonStyle(true)}
                  >
                    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
