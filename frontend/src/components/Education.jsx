import React, { useState } from 'react';

const Education = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const educationData = [
    {
      id: 1,
      degree: "Bachelor of Technology in Computer Science",
      institution: "Indian Institute of Information Technology, Vadodara",
      period: "2024 - 2028",
      description: "CPI: 8.06",
      icon: "🎓"
    },
    { 
      id: 2,
      degree: "CBSE CLASS XII",
      institution: "Score 84.8%",
      period: "",
      description: "",
      icon: "🏫"
    },
    { 
      id: 3,
      degree: "CBSE CLASS X",
      institution: "Score 89.8%",
      period: "",
      description: "",
      icon: "🏫"
    }
  ];

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
    maxWidth: '1200px',
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

  const timelineStyle = {
    position: 'relative',
    paddingLeft: '3rem'
  };

  const timelineLineStyle = {
    position: 'absolute',
    left: '1.5rem',
    top: '0',
    bottom: '0',
    width: '2px',
    background: 'linear-gradient(180deg, rgba(74, 123, 167, 0.5) 0%, rgba(45, 89, 130, 0.3) 100%)',
    transform: 'translateX(-50%)',
    boxShadow: '0 0 10px rgba(74, 123, 167, 0.3)'
  };

  const getCardStyle = (index) => ({
    position: 'relative',
    marginBottom: '3rem',
    background: 'linear-gradient(135deg, rgba(3, 11, 26, 0.8) 0%, rgba(5, 15, 35, 0.6) 100%)',
    borderRadius: '0',
    padding: '2.5rem',
    border: hoveredCard === index 
      ? '1px solid rgba(74, 123, 167, 0.5)' 
      : '1px solid rgba(74, 123, 167, 0.15)',
    borderLeft: '3px solid rgba(74, 123, 167, 0.5)',
    backdropFilter: 'blur(20px)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    transform: hoveredCard === index ? 'translateX(15px)' : 'translateX(0)',
    boxShadow: hoveredCard === index 
      ? '0 20px 45px rgba(0, 0, 0, 0.7), 0 0 40px rgba(74, 123, 167, 0.2)' 
      : '0 8px 32px rgba(0, 0, 0, 0.5)',
    animation: `slideIn 0.8s ease-out ${index * 0.2}s both`
  });

  const dotStyle = (index) => ({
    position: 'absolute',
    left: '-2.35rem',
    top: '2.5rem',
    width: '1.5rem',
    height: '1.5rem',
    borderRadius: '50%',
    background: hoveredCard === index
      ? '#4a7ba7'
      : 'rgba(74, 123, 167, 0.5)',
    border: '3px solid #030b1a',
    transition: 'all 0.3s ease',
    transform: hoveredCard === index ? 'scale(1.3)' : 'scale(1)',
    boxShadow: hoveredCard === index ? '0 0 25px rgba(74, 123, 167, 0.8)' : '0 0 10px rgba(74, 123, 167, 0.3)'
  });

  const iconStyle = {
    fontSize: '3rem',
    marginBottom: '1rem',
    filter: 'drop-shadow(0 0 10px rgba(184, 212, 232, 0.3))'
  };

  const degreeStyle = {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#b8d4e8',
    marginBottom: '0.8rem',
    textShadow: '0 0 15px rgba(184, 212, 232, 0.2)',
    letterSpacing: '-0.01em'
  };

  const institutionStyle = {
    fontSize: '1.3rem',
    color: '#7aa3c4',
    marginBottom: '0.5rem',
    fontWeight: '600',
    opacity: 0.9
  };

  const periodStyle = {
    color: '#5a8ab8',
    fontSize: '1rem',
    marginBottom: '1.5rem',
    fontWeight: '500',
    opacity: 0.8,
    letterSpacing: '0.05em'
  };

  const descriptionStyle = {
    color: '#6b9ac4',
    fontSize: '1.05rem',
    lineHeight: '1.7',
    opacity: 0.85
  };

  return (
    <div style={containerStyle}>
      <style>
        {`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(-40px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

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

          @media (max-width: 768px) {
            .timeline {
              padding-left: 2rem !important;
            }
            .timeline-line {
              left: 1rem !important;
            }
            .timeline-dot {
              left: -1.85rem !important;
            }
          }
        `}
      </style>

      <div style={starsStyle} />
      <div style={mistLayerStyle} />

      <div style={contentStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>
            <span>🎓</span>
            <span>Education</span>
          </h2>
          <p style={subtitleStyle}>
            My journey through the wilderness of learning
          </p>
        </div>

        <div className="timeline" style={timelineStyle}>
          <div className="timeline-line" style={timelineLineStyle} />
          
          {educationData.map((edu, index) => (
            <div
              key={edu.id}
              style={getCardStyle(index)}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="timeline-dot" style={dotStyle(index)} />
              
              <div style={iconStyle}>{edu.icon}</div>
              <h3 style={degreeStyle}>{edu.degree}</h3>
              <p style={institutionStyle}>{edu.institution}</p>
              <p style={periodStyle}>{edu.period}</p>
              <p style={descriptionStyle}>{edu.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education;