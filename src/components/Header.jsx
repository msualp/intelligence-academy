import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DarkModeToggle from './DarkModeToggle'
import { navigationItems, applicationDeadline } from '../config/navigation.jsx'
import './Header.css'

function Header() {
  const [isNavDropdownOpen, setIsNavDropdownOpen] = useState(false)
  const [isHeaderShrunk, setIsHeaderShrunk] = useState(false)

  useEffect(() => {
    // Enhanced scroll handler for header shrink effect with glassmorphism
    const handleScroll = () => {
      const header = document.querySelector('.header');
      
      if (window.scrollY > 50) {
        setIsHeaderShrunk(true);
        if (header) {
          header.style.background = 'var(--header-bg-scrolled)';
          header.style.backdropFilter = 'blur(30px) saturate(200%)';
          header.style.boxShadow = 'var(--shadow-medium)';
        }
      } else {
        setIsHeaderShrunk(false);
        if (header) {
          header.style.background = 'var(--header-bg)';
          header.style.backdropFilter = 'blur(25px) saturate(180%)';
          header.style.boxShadow = 'var(--shadow-light)';
        }
      }
    };

    const handleClickOutside = (e) => {
      if (!e.target.closest('.side-tray') && !e.target.closest('.hamburger-menu')) {
        setIsNavDropdownOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    document.addEventListener('click', handleClickOutside)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <header className="header">
      <nav className={`nav ${isHeaderShrunk ? 'shrink' : ''}`}>
        <Link to="/" className={`logo ${isHeaderShrunk ? 'shrink' : ''}`}>
          <div className="logo-container">
            <span className="unicorn-emoji">🦄</span>
            <div className="logo-text">
              <div className="logo-main">Intelligence Academy <span className="rowan">@ Rowan</span></div>
              <div className={`logo-subtitle ${isHeaderShrunk ? 'shrink' : ''}`}>
                AI Startup Accelerator & <span className="unicorn-factory">Unicorn Factory</span>
                <span className="asterisk">*</span>
              </div>
            </div>
          </div>
        </Link>
        
        <div className="header-actions">
          <div className="cta-container">
            <Link to="/apply" className={`cta-button ${isHeaderShrunk ? 'shrink' : ''}`}>
              Apply Now
            </Link>
            <div className={`cohort-pill ${isHeaderShrunk ? 'shrink' : ''}`}>Spring 2026 Cohort</div>
          </div>
          
          <div className="menu-container">
            <button 
              className={`hamburger-menu ${isHeaderShrunk ? 'shrink' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                setIsNavDropdownOpen(!isNavDropdownOpen);
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Full Side Tray */}
        <div className={`side-tray ${isNavDropdownOpen ? 'open' : ''}`}>
          <div className="side-tray-content">
            <div className="side-tray-header">
              <h3>Intelligence Academy</h3>
              <div className="tray-header-controls">
                <DarkModeToggle 
                  show={true} 
                  className="tray-dark-mode"
                />
                <button 
                  className="close-tray"
                  onClick={() => setIsNavDropdownOpen(false)}
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="side-tray-cta">
              <Link to="/apply" className="tray-cta-button" onClick={() => setIsNavDropdownOpen(false)}>
                Apply Now
              </Link>
              <p className="tray-cta-text">Spring 2026 Cohort</p>
              <p className="tray-deadline">Applications Due: {applicationDeadline}</p>
            </div>
            
            <nav className="side-tray-nav">
              {navigationItems.map((item) => {
                // For items with href (homepage sections), always link to homepage with hash
                if (item.href) {
                  return (
                    <Link 
                      key={item.id} 
                      to={`/${item.href}`} 
                      onClick={() => setIsNavDropdownOpen(false)}
                    >
                      <span className="nav-icon">{item.icon}</span>
                      {item.label}
                    </Link>
                  );
                }
                // For regular pages, use normal routing
                return (
                  <Link 
                    key={item.id} 
                    to={item.to} 
                    onClick={() => setIsNavDropdownOpen(false)}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            
            <div className="side-tray-footer">
              <p>🦄 Building Greater Philadelphia's First AI Unicorn by 2030</p>
              <div className="tray-social">
                <a href="#" aria-label="LinkedIn">💼</a>
                <a href="#" aria-label="Twitter">🐦</a>
                <a href="#" aria-label="YouTube">📺</a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Overlay */}
        <div 
          className={`tray-overlay ${isNavDropdownOpen ? 'show' : ''}`}
          onClick={() => setIsNavDropdownOpen(false)}
        ></div>
      </nav>
    </header>
  )
}

export default Header