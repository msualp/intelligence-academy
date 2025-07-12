import React from 'react'
import { Link } from 'react-router-dom'
import './CTASection.css'

function CTASection() {
  return (
    <section className="final-cta loading" id="apply">
      <div className="cta-background">
        <div className="floating-element"></div>
        <div className="floating-element"></div>
      </div>
      
      <div className="cta-content">
        <h2 className="cta-title">Your AI Unicorn Journey Starts Here</h2>
        <p className="cta-subtitle">
          Join the elite cohort of AI entrepreneurs building the next generation of billion-dollar companies. 
          Limited to 8 exceptional teams per cohort.
        </p>
        
        <div className="cta-features">
          <div className="cta-feature">
            <span className="feature-icon">💰</span>
            <span className="feature-text">$100K Non-Dilutive Investment</span>
          </div>
          <div className="cta-feature">
            <span className="feature-icon">🏢</span>
            <span className="feature-text">30+ Fortune 500 Partners</span>
          </div>
          <div className="cta-feature">
            <span className="feature-icon">🚀</span>
            <span className="feature-text">12-Week Intensive Program</span>
          </div>
          <div className="cta-feature">
            <span className="feature-icon">🦄</span>
            <span className="feature-text">Unicorn-Focused Methodology</span>
          </div>
        </div>
        
        <div className="cta-buttons">
          <Link to="/apply" className="btn-apply">Apply Now</Link>
          <Link to="/contact" className="btn-contact">Contact Us</Link>
        </div>
        
        <p className="cta-deadline">Application Deadline: December 15, 2025</p>
      </div>
    </section>
  )
}

export default CTASection