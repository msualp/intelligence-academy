import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [isBannerHidden, setIsBannerHidden] = useState(false);
  const [isNavDropdownOpen, setIsNavDropdownOpen] = useState(false);
  const [isHeaderShrunk, setIsHeaderShrunk] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    // Scroll handler for header shrink effect
    const handleScroll = () => {
      setIsHeaderShrunk(window.scrollY > 50);
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
            <span className="logo-icon">🦄</span>
            <div className="logo-text">
              <div>Intelligence Academy <span className="rowan">@ Rowan</span></div>
              <div className={`logo-subtitle ${isHeaderShrunk ? 'shrink' : ''}`}>
                AI Startup Accelerator & <span className="unicorn-factory">Unicorn Factory</span>
                <span className="asterisk">*</span>
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
              <Link to="/" onClick={() => setIsNavDropdownOpen(false)}>Home</Link>
              <Link to="/program" onClick={() => setIsNavDropdownOpen(false)}>Program</Link>
              <Link to="/vision" onClick={() => setIsNavDropdownOpen(false)}>Our Vision</Link>
              <Link to="/partners" onClick={() => setIsNavDropdownOpen(false)}>Partners</Link>
              <Link to="/about" onClick={() => setIsNavDropdownOpen(false)}>About</Link>
              <Link to="/contact" onClick={() => setIsNavDropdownOpen(false)}>Contact</Link>
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

      {/* Our Vision Section */}
      <section id="vision" className="vision-section loading">
        <div className="container">
          <h2 className="section-title">Our Vision</h2>
          <p className="section-subtitle">Creating Greater Philadelphia's First AI Unicorn by 2030</p>
          <div className="vision-content">
            <p>We believe the next wave of billion-dollar AI companies will emerge from unexpected places. With our unique combination of Fortune 500 partnerships, university research, regional advantages, and proven methodologies, we're building the ecosystem to make this vision a reality.</p>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="partners-section loading">
        <div className="container">
          <h2 className="section-title">Our Partners</h2>
          <p className="section-subtitle">Working with industry leaders to accelerate your success</p>
          <div className="partners-grid">
            <div className="partner-card">
              <h3>Fortune 500 Partners</h3>
              <ul>
                <li>Jefferson Health</li>
                <li>Campbell Soup Company</li>
                <li>Boeing</li>
                <li>TD Bank</li>
              </ul>
            </div>
            <div className="partner-card">
              <h3>Academic Partners</h3>
              <ul>
                <li>Rowan University AI Lab</li>
                <li>Engineering Department</li>
                <li>Business School</li>
                <li>Technology Transfer Office</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mentors Section */}
      <section id="mentors" className="mentors-section loading">
        <div className="container">
          <h2 className="section-title">World-Class Mentors</h2>
          <p className="section-subtitle">Learn from successful founders and industry experts</p>
          <div className="mentors-content">
            <p>Our mentors include successful AI entrepreneurs, Fortune 500 executives, venture capitalists, and leading AI researchers who provide hands-on guidance throughout your journey.</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="apply" className="cta-section loading">
        <div className="container">
          <h2 className="section-title">Ready to Build Your AI Unicorn<span className="asterisk">*</span>?</h2>
          <p className="section-subtitle">Submit your 2-minute application and take the first step toward billion-dollar impact</p>
          <Link to="/application-form" className="cta-white">Submit 2-Min Application</Link>
          <p style={{ marginTop: '1rem', opacity: 0.8 }}>Spring 2026 Cohort - Limited to 8 Teams</p>
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
    </>
  );
};

export default HomePage;