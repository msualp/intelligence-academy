import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DarkModeToggle from './DarkModeToggle'
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
              <p className="tray-deadline">Applications Due: December 15, 2025</p>
            </div>
            
            <nav className="side-tray-nav">
              <Link to="/" onClick={() => setIsNavDropdownOpen(false)}>
                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9,22 9,12 15,12 15,22"/>
                </svg>
                Home
              </Link>
              <Link to="/about" onClick={() => setIsNavDropdownOpen(false)}>
                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                  <path d="M12 17h.01"/>
                </svg>
                About Us
              </Link>
              <Link to="/partners" onClick={() => setIsNavDropdownOpen(false)}>
                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="m22 21-3-3m0 0a5.5 5.5 0 1 0-7.78-7.78 5.5 5.5 0 0 0 7.78 7.78Z"/>
                </svg>
                Corporate Partners
              </Link>
              <Link to="/mentors" onClick={() => setIsNavDropdownOpen(false)}>
                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
                </svg>
                Mentors & Advisors
              </Link>
              <Link to="/apply" onClick={() => setIsNavDropdownOpen(false)}>
                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                </svg>
                Apply Now
              </Link>
              <Link to="/contact" onClick={() => setIsNavDropdownOpen(false)}>
                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                Contact
              </Link>
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