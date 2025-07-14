import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './HeroSection.css'

function HeroSection() {
  // Ensure hero section takes full viewport height
  useEffect(() => {
    const setHeroHeight = () => {
      const hero = document.querySelector('.hero');
      if (hero) {
        hero.style.height = `${window.innerHeight}px`;
      }
    };
    
    // Set initial height
    setHeroHeight();
    
    // Update on resize
    window.addEventListener('resize', setHeroHeight);
    
    return () => {
      window.removeEventListener('resize', setHeroHeight);
    };
  }, []);

  const scrollToNext = () => {
    const nextSection = document.querySelector('.differentiators-section') || document.querySelector('.stats-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero">
      <div className="hero-background">
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        <div className="floating-element"></div>
      </div>
      
      <div className="hero-content">
        <h1 className="hero-title">Transform Your AI Vision Into Reality</h1>
        <h2 className="hero-subtitle">The AI Unicorn Advantage is Real</h2>
        <p className="hero-description">
          Join Greater Philadelphia's premier AI startup accelerator. $100K investment, Fortune 500 partnerships, 
          and proven unicorn methodology. We're building the next generation of billion-dollar AI companies.
        </p>
        <div className="hero-buttons">
          <Link to="/apply" className="btn-primary">Apply Now for Spring 2026</Link>
          <Link to="/about" className="btn-secondary">Learn Our Methodology</Link>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">$100K</span>
            <span className="stat-label">Investment</span>
          </div>
          <div className="stat">
            <span className="stat-number">30+</span>
            <span className="stat-label">Fortune 500 Partners</span>
          </div>
          <div className="stat">
            <span className="stat-number">12</span>
            <span className="stat-label">Week Program</span>
          </div>
        </div>
        
        {/* Learn More Scroll Indicator */}
        <div className="scroll-indicator">
          <button onClick={scrollToNext} className="scroll-link">
            Learn More
            <span className="scroll-arrow">↓</span>
          </button>
        </div>
        
        {/* Disclaimers moved to content flow */}
        <div className="hero-disclaimers">
          <p className="disclaimer">
            <span className="asterisk">*</span>Aspiring unicorn catalyst based on AI sector performance data. While unicorn outcomes remain statistically rare (2% of AI startups vs. 1% traditional), our methodology systematically addresses the factors that give AI companies demonstrable advantages in achieving billion-dollar valuations.
            <Link to="/about" className="learn-more-link">Learn More</Link>
          </p>
          
          <p className="footnote" id="footnote-1">
            ¹ Source: CB Insights State of AI Report 2024, PitchBook Unicorn Analysis
            <Link to="/about" className="learn-more-link">Learn More</Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
