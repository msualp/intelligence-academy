import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import DarkModeToggle from '../components/DarkModeToggle';
import './HomePage.css';

const HomePage = () => {
  const [isBannerHidden, setIsBannerHidden] = useState(false);
  const [isNavDropdownOpen, setIsNavDropdownOpen] = useState(false);
  const [isHeaderShrunk, setIsHeaderShrunk] = useState(false);
  const [showUnicornPopup, setShowUnicornPopup] = useState(false);
  const [showStatsPopup, setShowStatsPopup] = useState(false);
  const observerRef = useRef(null);
  const unicornPopupRef = useRef(null);
  const statsPopupRef = useRef(null);
  
  // Create portal container for popups
  useEffect(() => {
    // Create portal container if it doesn't exist
    let portalContainer = document.getElementById('popup-portal');
    if (!portalContainer) {
      portalContainer = document.createElement('div');
      portalContainer.id = 'popup-portal';
      document.body.appendChild(portalContainer);
    }
    
    // Clean up on unmount
    return () => {
      if (portalContainer && document.body.contains(portalContainer)) {
        document.body.removeChild(portalContainer);
      }
    };
  }, []);

  useEffect(() => {
    // Close popups when clicking outside
    const handleClickOutside = (e) => {
      // Only close if the click is not on the trigger elements
      if (!e.target.classList.contains('unicorn-factory') && 
          !e.target.classList.contains('asterisk') &&
          !e.target.classList.contains('stat-highlight') && 
          !e.target.classList.contains('footnote-ref') &&
          !e.target.closest('.popup-content')) {
        setShowUnicornPopup(false);
        setShowStatsPopup(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    
    // Enhanced scroll handler for header shrink effect with glassmorphism
    const handleScroll = () => {
      const header = document.querySelector('.header');
      const nav = document.querySelector('.nav');
      const logo = document.querySelector('.logo');
      const logoSubtitle = document.querySelector('.logo-subtitle');
      const ctaButton = document.querySelector('.cta-button');
      const hamburger = document.querySelector('.hamburger-menu');
      const cohortPill = document.querySelector('.cohort-pill');
      
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

    window.addEventListener('scroll', handleScroll);
    
    // Loading animation observer
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observe all loading sections
    const loadingSections = document.querySelectorAll('.loading');
    loadingSections.forEach(section => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(30px)';
      section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      observerRef.current.observe(section);
    });

    // Close dropdown on outside click
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.hamburger-menu') && !e.target.closest('.nav-dropdown')) {
        setIsNavDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '' || href.length <= 1) {
          return;
        }
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          // Get header height to adjust scroll position
          const header = document.querySelector('.header');
          const headerHeight = header ? header.offsetHeight : 0;
          const banner = document.querySelector('.draft-banner');
          const bannerHeight = banner && !banner.classList.contains('hidden') ? banner.offsetHeight : 0;
          
          // Calculate total offset (header + banner + extra padding)
          const totalOffset = headerHeight + bannerHeight + 20;
          
          // Get the target's position
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
          
          // Scroll to the target with offset
          window.scrollTo({
            top: targetPosition - totalOffset,
            behavior: 'smooth'
          });
        }
      });
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('mousedown', handleClickOutside);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Interactive hover effect
  const handleInteractiveMouseEnter = (e) => {
    e.currentTarget.style.transform = 'translateY(-5px)';
    e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)';
  };

  const handleInteractiveMouseLeave = (e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
  };

  return (
    <>
    <div className="homepage-wrapper">
      {/* Draft Banner - Fixed at top */}
      <div className={`draft-banner ${isBannerHidden ? 'hidden' : ''}`}>
        <span className="warning-icon">⚠️</span>
        CONCEPT DEMO - Not an official Rowan University program
        <button className="banner-close" onClick={() => setIsBannerHidden(true)}>×</button>
      </div>

      {/* Banner Spacer - Pushes content down */}
      <div className={`banner-spacer ${isBannerHidden ? 'hidden' : ''}`}></div>

      {/* Header Wrapper for Sticky Behavior */}
      <div className="header-wrapper">
        {/* Header */}
        <header className={`header ${isBannerHidden ? 'banner-hidden' : ''}`}>
        <nav className={`nav ${isHeaderShrunk ? 'shrink' : ''}`}>
          <Link to="/" className={`logo ${isHeaderShrunk ? 'shrink' : ''}`}>
            <div className="logo-container">
              <span className="unicorn-emoji">🦄</span>
              <div className="logo-text">
                <div className="logo-main">Intelligence Academy <span className="rowan">@ Rowan</span></div>
                <div className={`logo-subtitle ${isHeaderShrunk ? 'shrink' : ''}`}>
                  AI Startup Accelerator & <span 
                    className="unicorn-factory"
                    onClick={() => setShowUnicornPopup(!showUnicornPopup)}
                  >Unicorn Factory<span className="asterisk">*</span></span>
                  
                  {/* Unicorn Factory Popup rendered via portal */}
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
                <p className="tray-deadline">Applications Due: March 15, 2026</p>
              </div>
              
              <nav className="side-tray-nav">
                <a href="#home" onClick={() => setIsNavDropdownOpen(false)}>
                  <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9,22 9,12 15,12 15,22"/>
                  </svg>
                  Home
                </a>
                <a href="#program" onClick={() => setIsNavDropdownOpen(false)}>
                  <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
                  </svg>
                  Program Overview
                </a>
                <a href="#differentiators" onClick={() => setIsNavDropdownOpen(false)}>
                  <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                  </svg>
                  What Makes Us Different
                </a>
                <a href="#stats" onClick={() => setIsNavDropdownOpen(false)}>
                  <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="20" x2="18" y2="10"/>
                    <line x1="12" y1="20" x2="12" y2="4"/>
                    <line x1="6" y1="20" x2="6" y2="14"/>
                  </svg>
                  AI Unicorn Statistics
                </a>
                <Link to="/partners" onClick={() => setIsNavDropdownOpen(false)}>
                  <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="m22 21-3-3m0 0a5.5 5.5 0 1 0-7.78-7.78 5.5 5.5 0 0 0 7.78 7.78Z"/>
                  </svg>
                  Corporate Partners
                </Link>
                <Link to="/about" onClick={() => setIsNavDropdownOpen(false)}>
                  <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                    <path d="M12 17h.01"/>
                  </svg>
                  About Us
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
      </div>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Hero Section */}
        <section id="home" className={`hero loading ${isBannerHidden ? 'banner-hidden' : ''}`}>
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">Transform Your AI Vision Into Reality</h1>
            <h2 className="hero-subtitle">The AI Unicorn Advantage is Real</h2>
            <p className="hero-description">
              More AI startups are reaching billion-dollar valuations in <span 
                className="stat-highlight"
                onClick={() => setShowStatsPopup(!showStatsPopup)}
              >quarter the time</span> with <span 
                className="stat-highlight"
                onClick={() => setShowStatsPopup(!showStatsPopup)}
              >half the team</span> and <span 
                className="stat-highlight"
                onClick={() => setShowStatsPopup(!showStatsPopup)}
              >double the success rate</span><span 
                className="footnote-ref"
                onClick={() => setShowStatsPopup(!showStatsPopup)}
              >¹</span> vs. traditional unicorns. Our program focuses on the specific methodology and partnerships that maximize your AI startup's unicorn potential.
              
              {/* Stats Popup rendered via portal */}
            </p>
            
            <div className="hero-cta">
              <Link to="/apply" className="primary-cta">Submit 2-Min Application</Link>
              <p className="secondary-text">Get invited to apply for Spring 2026 cohort</p>
            </div>
            
            <div className="scroll-indicator">
              <a href="#differentiators" className="scroll-link">
                Learn More <span className="scroll-arrow">↓</span>
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Fine Print Section */}
      <section className="fine-print-section">
        <div className="container">
          <p className="disclaimer">
            <span className="asterisk">*</span>Aspiring unicorn catalyst based on AI sector performance data. While unicorn outcomes remain statistically rare (2% of AI startups vs. 1% traditional), our methodology systematically addresses the factors that give AI companies demonstrable advantages in achieving billion-dollar valuations.<a href="#differentiators" className="learn-more-link">Learn More</a>
          </p>
          
          <p className="footnote" id="footnote-1">
            <span className="footnote-number">¹</span> Source: CB Insights State of AI Report 2024, PitchBook Unicorn Analysis<a href="#stats" className="learn-more-link">Learn More</a>
          </p>
        </div>
      </section>

      {/* What Makes Us Different Section */}
      <section id="differentiators" className="differentiators-section loading">
        <div className="container">
          <div className="differentiators-intro">
            <h2 className="section-title">What Makes Us Different</h2>
            <p>Our unicorn-focused methodology combines the best of regional connection, university research, corporate partnerships, and entrepreneurial excellence all with a strong focus on AI.</p>
          </div>
          
          <div className="hero-highlights">
            <div 
              className="highlight-card interactive"
              onMouseEnter={handleInteractiveMouseEnter}
              onMouseLeave={handleInteractiveMouseLeave}
            >
              <h3 className="highlight-title">$100K Investment</h3>
              <p>Per team with founder-friendly terms</p>
            </div>
            <div 
              className="highlight-card interactive"
              onMouseEnter={handleInteractiveMouseEnter}
              onMouseLeave={handleInteractiveMouseLeave}
            >
              <h3 className="highlight-title">Fortune 500 Partnerships</h3>
              <p>For pilot customers and strategic exits</p>
            </div>
            <div 
              className="highlight-card interactive"
              onMouseEnter={handleInteractiveMouseEnter}
              onMouseLeave={handleInteractiveMouseLeave}
            >
              <h3 className="highlight-title">Proven NSF I-Corps</h3>
              <p>Methodology with 40% survival rates</p>
            </div>
            <div 
              className="highlight-card interactive"
              onMouseEnter={handleInteractiveMouseEnter}
              onMouseLeave={handleInteractiveMouseLeave}
            >
              <h3 className="highlight-title">30% Cost Savings</h3>
              <p>vs. coastal alternatives in Greater Philadelphia</p>
            </div>
            <div 
              className="highlight-card interactive"
              onMouseEnter={handleInteractiveMouseEnter}
              onMouseLeave={handleInteractiveMouseLeave}
            >
              <h3 className="highlight-title">Access to Compute</h3>
              <p>High-performance GPU clusters and cloud credits for AI development and training</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section id="stats" className="stats-section loading">
        <div className="container">
          <h2 className="section-title">Why AI Companies Become Unicorns Differently</h2>
          <p className="section-subtitle">The statistics that drive our unicorn-focused methodology</p>
          
          <div className="stats-grid">
            <div 
              className="stat-card interactive"
              onMouseEnter={handleInteractiveMouseEnter}
              onMouseLeave={handleInteractiveMouseLeave}
            >
              <div className="stat-number">4x</div>
              <div className="stat-label">Faster to $1B</div>
              <div className="stat-description">7 years vs. 25 years average</div>
            </div>
            <div 
              className="stat-card interactive"
              onMouseEnter={handleInteractiveMouseEnter}
              onMouseLeave={handleInteractiveMouseLeave}
            >
              <div className="stat-number">½</div>
              <div className="stat-label">Team Size</div>
              <div className="stat-description">200-500 vs. 1,000+ employees</div>
            </div>
            <div 
              className="stat-card interactive"
              onMouseEnter={handleInteractiveMouseEnter}
              onMouseLeave={handleInteractiveMouseLeave}
            >
              <div className="stat-number">2x</div>
              <div className="stat-label">Success Rate</div>
              <div className="stat-description">2% vs. 1% traditional startups</div>
            </div>
          </div>
          
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Unicorn Metric</th>
                <th>Traditional Startups</th>
                <th>AI Startups</th>
                <th>AI Advantage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Time to $1B Valuation</strong></td>
                <td>25 years average</td>
                <td>7 years average</td>
                <td className="advantage">Quarter the time</td>
              </tr>
              <tr>
                <td><strong>Team Size at Unicorn Status</strong></td>
                <td>1,000+ employees</td>
                <td>200-500 employees</td>
                <td className="advantage">Half the team size</td>
              </tr>
              <tr>
                <td><strong>Success Rate to Unicorn</strong></td>
                <td>1% of startups</td>
                <td>2% of AI startups</td>
                <td className="advantage">Double the success</td>
              </tr>
              <tr>
                <td><strong>Capital Efficiency</strong></td>
                <td>$500M+ raised</td>
                <td>$100-200M raised</td>
                <td className="advantage">2.5x more efficient</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Program Section */}
      <section id="program" className="program-section loading">
        <div className="container">
          <h2 className="section-title">How We Maximize Your Unicorn Potential</h2>
          <p className="section-subtitle">Every program element designed for exponential growth</p>
          
          <div className="program-grid">
            <div 
              className="program-card interactive"
              onMouseEnter={handleInteractiveMouseEnter}
              onMouseLeave={handleInteractiveMouseLeave}
            >
              <div className="program-icon">🏢</div>
              <h3>Fortune 500 Corporate Partnerships</h3>
              <p>Real customers from day one, not just mentors. Skip generic advice and get direct access to Fortune 500 pilot customers.</p>
              <ul className="program-features">
                <li>Jefferson Health partnerships</li>
                <li>Campbell Soup Company projects</li>
                <li>Boeing manufacturing solutions</li>
                <li>TD Bank financial services</li>
              </ul>
            </div>
            
            <div 
              className="program-card interactive"
              onMouseEnter={handleInteractiveMouseEnter}
              onMouseLeave={handleInteractiveMouseLeave}
            >
              <div className="program-icon">🔬</div>
              <h3>NSF I-Corps Customer Discovery</h3>
              <p>40% survival rate vs. 20% industry average through battle-tested methodology validated over 3,000 startups.</p>
              <ul className="program-features">
                <li>50+ customer interviews</li>
                <li>Market validation before building</li>
                <li>Business model development</li>
                <li>Revenue generation preparation</li>
              </ul>
            </div>
            
            <div 
              className="program-card interactive"
              onMouseEnter={handleInteractiveMouseEnter}
              onMouseLeave={handleInteractiveMouseLeave}
            >
              <div className="program-icon">💰</div>
              <h3>Regional Cost Advantage</h3>
              <p>30-40% lower costs extend runway and reduce dilution while maintaining access to Fortune 500 headquarters.</p>
              <ul className="program-features">
                <li>Extended runway (18+ months)</li>
                <li>Fortune 500 access within 50 miles</li>
                <li>Top talent at regional rates</li>
                <li>Collaborative ecosystem</li>
              </ul>
            </div>
            
            <div 
              className="program-card interactive"
              onMouseEnter={handleInteractiveMouseEnter}
              onMouseLeave={handleInteractiveMouseLeave}
            >
              <div className="program-icon">🎓</div>
              <h3>University Research Pipeline</h3>
              <p>Competitive advantages from cutting-edge research and exclusive technology access from Rowan University's AI labs.</p>
              <ul className="program-features">
                <li>Exclusive technology access</li>
                <li>Faculty expertise and advisory</li>
                <li>Engineering talent pipeline</li>
                <li>Research partnerships and IP</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="apply" className="cta-section loading">
        <div className="container">
          <h2 className="section-title">Ready to Build Your AI Unicorn<span className="asterisk">*</span>?</h2>
          <p className="section-subtitle">Submit your 2-minute application and take the first step toward billion-dollar impact</p>
          <Link to="/apply" className="btn-primary">Submit 2-Min Application</Link>
          <p className="cta-subtext">Spring 2026 Cohort - Limited to 8 Teams</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Intelligence Academy @ Rowan University</h4>
            <p>AI Startup Accelerator & Unicorn Factory<span className="asterisk">*</span></p>
            <p>Mission: Greater Philadelphia's First AI Unicorn<span className="asterisk">*</span> by 2030</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <Link to="/program">Program Overview</Link>
            <Link to="/vision">Our Vision</Link>
            <Link to="/partners">Corporate Partners</Link>
            <Link to="/about">About Us</Link>
            <Link to="/apply">Apply Now</Link>
          </div>
          
          <div className="footer-section">
            <h4>Contact</h4>
            <p>apply@intelligence-academy.rowan.edu</p>
            <p>(856) 256-4000</p>
            <p>South Jersey Technology Park</p>
            <p>Glassboro, NJ 08028</p>
          </div>
          
          <div className="footer-section">
            <h4>Connect</h4>
            <a href="#">LinkedIn</a>
            <a href="#">Twitter</a>
            <a href="#">YouTube</a>
            <a href="#">Newsletter</a>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p><span className="asterisk">*</span>Intelligence Academy aspires to create Greater Philadelphia's first AI <span style={{ color: 'var(--primary-blue)', fontWeight: 700 }}>unicorn</span> by 2030 through systematic methodology and strategic partnerships. <span style={{ color: 'var(--primary-blue)', fontWeight: 700 }}>unicorn</span> outcomes remain statistically rare and depend on execution, market conditions, and other factors. Past performance does not guarantee future results.</p>
          <p>&copy; 2026 Intelligence Academy @ Rowan University. All rights reserved.</p>
        </div>
      </footer>
      </main>
    </div>
    
    {/* Portal for Unicorn Popup */}
    {showUnicornPopup && ReactDOM.createPortal(
      <div className="info-popup unicorn-popup" ref={unicornPopupRef}>
        <div className="popup-content">
          <button className="popup-close" onClick={() => setShowUnicornPopup(false)}>×</button>
          <p>
            <span className="asterisk">*</span>Aspiring unicorn catalyst based on AI sector performance data. While unicorn outcomes remain statistically rare (2% of AI startups vs. 1% traditional).
          </p>
          <p style={{ marginTop: '1rem', fontSize: '1.2rem', fontWeight: '500' }}>
            Our methodology systematically addresses the factors that give AI companies demonstrable advantages in achieving billion-dollar valuations.
          </p>
          <p style={{ marginTop: '1rem', fontSize: '1.25rem', fontWeight: '700', color: 'var(--accent-orange)' }}>
            Intelligence Academy aspires to create Greater Philadelphia's first AI unicorn by 2030.
          </p>
          <a 
            href="#differentiators" 
            className="popup-learn-more"
            onClick={() => setShowUnicornPopup(false)}
          >
            Learn More
          </a>
        </div>
      </div>,
      document.getElementById('popup-portal') || document.body
    )}
    
    {/* Portal for Stats Popup */}
    {showStatsPopup && ReactDOM.createPortal(
      <div className="info-popup stats-popup" ref={statsPopupRef}>
        <div className="popup-content">
          <button className="popup-close" onClick={() => setShowStatsPopup(false)}>×</button>
          <p>
            <span className="footnote-number">¹</span> Based on analysis of AI startup success metrics:
          </p>
          <p style={{ fontSize: '1.15rem', marginTop: '0.5rem', fontWeight: '500' }}>
            • <strong>Quarter the time:</strong> AI startups reach $1B valuation in avg. 3.5 years vs. 7+ years for traditional tech (CB Insights)
          </p>
          <p style={{ fontSize: '1.15rem', marginTop: '0.5rem', fontWeight: '500' }}>
            • <strong>Half the team:</strong> Median AI unicorn team size: 250 employees vs. 500+ for traditional unicorns (PitchBook 2024)
          </p>
          <p style={{ fontSize: '1.15rem', marginTop: '0.5rem', fontWeight: '500' }}>
            • <strong>Double the success:</strong> 82% survival rate for accelerator-backed AI startups vs. 40% industry average (NSF I-Corps data)
          </p>
          <p style={{ fontSize: '1rem', marginTop: '1rem', fontStyle: 'italic', fontWeight: '500' }}>
            Sources: CB Insights State of AI Report 2024, PitchBook Unicorn Analysis, NSF I-Corps Program Statistics
          </p>
          <a 
            href="https://www.cbinsights.com/research/report/ai-trends-2024/" 
            className="popup-learn-more"
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginTop: '0.5rem' }}
          >
            View CB Insights Report
          </a>
        </div>
      </div>,
      document.getElementById('popup-portal') || document.body
    )}
    </>
  );
};

export default HomePage;
