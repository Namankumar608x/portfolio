import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Projects from './components/Projects';
import TechStack from './components/Techstack';
import Education from './components/Education';
import Contact from './components/Contact';

const App = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'projects', 'techstack', 'education', 'contact'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #0a0118, #1a0b2e, #0a0118)',
      color: 'white',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />
      
      <div id="home">
        <Home scrollToSection={scrollToSection} />
      </div>
      
      <div id="projects">
        <Projects />
      </div>
      
      <div id="techstack">
        <TechStack />
      </div>
      
      <div id="education">
        <Education />
      </div>
      
      <div id="contact">
        <Contact />
      </div>
      
      <footer style={{
        padding: '2rem',
        textAlign: 'center',
        borderTop: '1px solid rgba(139, 92, 246, 0.2)',
        background: 'rgba(0, 0, 0, 0.5)'
      }}>
        <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          © 2026 Portfolio. Built with React & Django ❤️
        </p>
      </footer>
    </div>
  );
};

export default App;