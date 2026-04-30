'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';

interface NavbarProps {
  lang: 'EN' | 'ID';
  toggleLang: (newLang: 'EN' | 'ID') => void;
  showLangDrop: boolean;
  setShowLangDrop: (show: boolean) => void;
  t: any;
}

export default function Navbar({ lang, toggleLang, showLangDrop, setShowLangDrop, t }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          
          const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
          const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const scrolledPercent = height > 0 ? (winScroll / height) * 100 : 0;
          setProgress(scrolledPercent);
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, targetId: string) => {
    if (targetId.startsWith('#')) {
      e.preventDefault();
      setIsOpen(false);
      
      const id = targetId.replace('#', '');
      const element = document.getElementById(id);
      
      if (element) {
        // Calculate offset to account for fixed navbar
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
        // Smooth native scroll
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });

        // Add a premium glow effect to highlight the section
        const originalBoxShadow = element.style.boxShadow;
        const originalTransition = element.style.transition;
        
        element.style.transition = 'box-shadow 0.5s ease-in-out';
        element.style.boxShadow = 'inset 0 0 100px rgba(56, 189, 248, 0.15), 0 0 50px rgba(56, 189, 248, 0.2)';
        
        setTimeout(() => {
          element.style.boxShadow = originalBoxShadow;
          setTimeout(() => {
            element.style.transition = originalTransition;
          }, 500);
        }, 1000);

      } else if (targetId === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <>

      
      <nav className={`glass-navbar ${scrolled ? 'scrolled' : ''}`}>
        {/* Navbar Shimmer Effect */}
        <div className="nav-shimmer" />
        
        <div style={navContainerStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <Link href="/" style={logoStyle} onClick={() => setIsOpen(false)}>
              <span className="text-gradient">BONI</span>.AI
            </Link>

            {/* Language Switcher in Header */}
            <div style={{ position: 'relative', zIndex: 102 }}>
              <button 
                onClick={() => setShowLangDrop(!showLangDrop)}
                style={navLangButtonStyle}
                className="glass-card"
              >
                <img 
                  src={lang === 'EN' ? "https://flagcdn.com/w40/gb.png" : "https://flagcdn.com/w40/id.png"} 
                  alt={lang}
                  style={{ width: '18px', height: 'auto', borderRadius: '2px', marginRight: '8px' }}
                />
                <span style={{ fontWeight: '700', fontSize: '0.75rem' }}>{lang}</span>
                <span style={{ fontSize: '0.5rem', marginLeft: '6px', opacity: 0.5 }}>▼</span>
              </button>
              
              {showLangDrop && (
                <div className="glass-card" style={navLangDropStyle}>
                  <div 
                    onClick={() => toggleLang('EN')} 
                    style={{...navLangItemStyle, background: lang === 'EN' ? 'rgba(255,255,255,0.05)' : 'transparent'}}
                    className="lang-option"
                  >
                    <img src="https://flagcdn.com/w20/gb.png" alt="EN" style={{ marginRight: '10px', borderRadius: '2px' }} />
                    <span style={{ fontSize: '0.75rem' }}>English</span>
                  </div>
                  <div 
                    onClick={() => toggleLang('ID')} 
                    style={{...navLangItemStyle, background: lang === 'ID' ? 'rgba(255,255,255,0.05)' : 'transparent'}}
                    className="lang-option"
                  >
                    <img src="https://flagcdn.com/w20/id.png" alt="ID" style={{ marginRight: '10px', borderRadius: '2px' }} />
                    <span style={{ fontSize: '0.75rem' }}>Indonesia</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Hamburger Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            style={hamburgerButtonStyle}
            className="hamburger-btn"
            aria-label="Toggle menu"
          >
            <div style={{...barStyle, transform: isOpen ? 'rotate(45deg) translate(5px, 6px)' : 'none'}} />
            <div style={{...barStyle, opacity: isOpen ? 0 : 1}} />
            <div style={{...barStyle, transform: isOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'none'}} />
          </button>

          {/* Desktop & Mobile Links */}
          <ul style={{
            ...navLinksStyle, 
            ...(isOpen ? mobileLinksActiveStyle : {})
          }} className="nav-links">
            <li><Link href="#" style={linkStyle} onClick={(e) => handleNavClick(e, '#')}>{t.navHome}</Link></li>
            <li><Link href="#about" style={linkStyle} onClick={(e) => handleNavClick(e, '#about')}>{t.navAbout}</Link></li>
            <li><Link href="#expertise" style={linkStyle} onClick={(e) => handleNavClick(e, '#expertise')}>{t.navExpertise}</Link></li>

            <li><Link href="#contact" className="glow-btn" onClick={(e) => handleNavClick(e, '#contact')}>{t.navContact}</Link></li>
          </ul>
        </div>

        {/* Scroll Progress Bar */}
        <div style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          right: '0',
          height: '2px',
          background: 'rgba(255, 255, 255, 0.05)',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            background: 'linear-gradient(to right, var(--primary), var(--accent))',
            transition: 'width 0.1s ease-out',
            boxShadow: '0 0 10px var(--primary)'
          }} />
        </div>
      </nav>
    </>
  );
}

const navContainerStyle: React.CSSProperties = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 2rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'relative',
};

const logoStyle: React.CSSProperties = {
  fontSize: '1.2rem',
  fontWeight: '800',
  letterSpacing: '1px',
  zIndex: 101,
};

const navLinksStyle: React.CSSProperties = {
  display: 'flex',
  gap: '2.5rem',
  alignItems: 'center',
};

const linkStyle: React.CSSProperties = {
  fontSize: '0.9rem',
  fontWeight: '500',
  opacity: '0.8',
  transition: 'opacity 0.3s ease',
};

const hamburgerButtonStyle: React.CSSProperties = {
  display: 'none',
  flexDirection: 'column',
  justifyContent: 'space-around',
  width: '30px',
  height: '24px',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
  zIndex: 101,
};

const barStyle: React.CSSProperties = {
  width: '30px',
  height: '2px',
  background: 'white',
  borderRadius: '10px',
  transition: 'all 0.3s linear',
  position: 'relative',
};

const mobileLinksActiveStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100vh',
  background: 'rgba(3, 7, 18, 0.98)',
  backdropFilter: 'blur(10px)',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '3rem',
  zIndex: 100,
};

const navLangButtonStyle: React.CSSProperties = {
  padding: '6px 12px',
  display: 'flex',
  alignItems: 'center',
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '10px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  color: 'white',
};

const navLangDropStyle: React.CSSProperties = {
  position: 'absolute',
  top: 'calc(100% + 10px)',
  left: '0',
  minWidth: '160px',
  padding: '8px',
  background: 'rgba(3, 7, 18, 0.95)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
};

const navLangItemStyle: React.CSSProperties = {
  padding: '10px 12px',
  borderRadius: '10px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  transition: 'all 0.2s ease',
  color: 'white',
};
