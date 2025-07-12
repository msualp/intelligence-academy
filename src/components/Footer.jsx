import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Intelligence Academy @ Rowan University</h4>
          <p>AI Startup Accelerator & Unicorn Factory<span className="asterisk">*</span></p>
          <p>Mission: Greater Philadelphia's First AI Unicorn<span className="asterisk">*</span> by 2030</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <a href="#program">Program Overview</a>
          <a href="#vision">Our Vision</a>
          <a href="#partners">Corporate Partners</a>
          <a href="#about">About Us</a>
          <a href="#apply">Apply Now</a>
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
        <p><span className="asterisk">*</span>Intelligence Academy aspires to create Greater Philadelphia's first AI <span style={{color: 'var(--primary-blue)', fontWeight: 700}}>unicorn</span> by 2030 through systematic methodology and strategic partnerships. <span style={{color: 'var(--primary-blue)', fontWeight: 700}}>Unicorn</span> outcomes remain statistically rare and depend on execution, market conditions, and other factors. Past performance does not guarantee future results.</p>
        <p>&copy; 2026 Intelligence Academy @ Rowan University. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer