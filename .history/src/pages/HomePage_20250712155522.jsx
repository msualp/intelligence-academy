import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [isBannerHidden, setIsBannerHidden] = useState(false);
  const [isNavDropdownOpen, setIsNavDropdownOpen] = useState(false);
  const [isHeaderShrunk, setIsHeaderShrunk] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
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
          header.style.background = 'rgba(255, 255, 255, 0.95)';
          header.style.backdropFilter = 'blur(30px) saturate(200%)';
          header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
        }
      } else {
        setIsHeaderShrunk(false);
        if (header) {
          header.style.background = 'rgba(255, 255, 255, 0.85)';
          header.style.backdropFilter = 'blur(25px) saturate(180%)';
          header.style.boxShadow = '0 1px 20px rgba(0, 0, 0, 0.1)';
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
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleOutsideClick);
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
      {/* Particle Container */}
      <div className="particles-container">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="particle"></div>
        ))}
      </div>

      {/* Draft Banner */}
      <div className={`draft-banner ${isBannerHidden ? 'hidden' : ''}`}>
        <span className="warning-icon">⚠️</span>
        CONCEPT DEMO - Not an official Rowan University program
        <button className="banner-close" onClick={() => setIsBannerHidden(true)}>×</button>
      </div>

      {/* Header */}
      <header className={`header ${isBannerHidden ? 'banner-hidden' : ''}`}>
        <nav className={`nav ${isHeaderShrunk ? 'shrink' : ''}`}>
          <Link to="/" className={`logo ${isHeaderShrunk ? 'shrink' : ''}`}>
            <div>Intelligence Academy <span className="rowan">@ Rowan</span></div>
            <div className={`logo-subtitle ${isHeaderShrunk ? 'shrink' : ''}`}>
              AI Startup Accelerator & <span className="unicorn-factory">Unicorn Factory</span>
              <span className="asterisk">*</span>
            </div>
          </Link>
          
          <div className="header-actions">
            <div className="cta-container">
              <Link to="/apply" className={`cta-button ${isHeaderShrunk ? 'shrink' : ''}`}>
                Apply Now
              </Link>
              <div className={`cohort-pill ${isHeaderShrunk ? 'shrink' : ''}`}>Spring 2026 Cohort</div>
            </div>
            <button 
              className={`hamburger-menu ${isHeaderShrunk ? 'shrink' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                setIsNavDropdownOpen(!isNavDropdownOpen);
              }}
            >
              ☰
            </button>
            <div className={`nav-dropdown ${isNavDropdownOpen ? 'show' : ''}`}>
              <a href="#home" onClick={() => setIsNavDropdownOpen(false)}>Home</a>
              <a href="#program" onClick={() => setIsNavDropdownOpen(false)}>Program</a>
              <a href="#vision" onClick={() => setIsNavDropdownOpen(false)}>Our Vision</a>
              <a href="#partners" onClick={() => setIsNavDropdownOpen(false)}>Partners</a>
              <a href="#about" onClick={() => setIsNavDropdownOpen(false)}>About</a>
              <a href="#contact" onClick={() => setIsNavDropdownOpen(false)}>Contact</a>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className={`hero loading ${isBannerHidden ? 'banner-hidden' : ''}`}>
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">Transform Your AI Vision Into Reality</h1>
            <h2 className="hero-subtitle">The AI Unicorn Advantage is Real</h2>
            <p className="hero-description">
              More AI startups are reaching billion-dollar valuations in <span className="stat-highlight">quarter the time</span> with <span className="stat-highlight">half the team</span> and <span className="stat-highlight">double the success rate</span><a href="#footnote-1" className="footnote-ref">¹</a> vs. traditional unicorns. Our program focuses on the specific methodology and partnerships that maximize your AI startup's unicorn potential.
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
        
        <div className="hero-footer">
          <p className="disclaimer">
            <span className="asterisk">*</span>Aspiring unicorn catalyst based on AI sector performance data. While unicorn outcomes remain statistically rare (2% of AI startups vs. 1% traditional), our methodology systematically addresses the factors that give AI companies demonstrable advantages in achieving billion-dollar valuations.<a href="#stats" className="learn-more-link">Learn More</a>
          </p>
          
          <p className="footnote" id="footnote-1">
            ¹ Source: CB Insights State of AI Report 2024, PitchBook Unicorn Analysis<a href="#stats" className="learn-more-link">Learn More</a>
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
