import React, { useEffect } from 'react'
import ParticleBackground from '../components/ParticleBackground'
import './ContactPage.css'

function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const contactInfo = [
    {
      type: 'General Inquiries',
      email: 'info@intelligence-academy.rowan.edu',
      description: 'Questions about the program, partnerships, or general information'
    },
    {
      type: 'Applications',
      email: 'apply@intelligence-academy.rowan.edu',
      description: 'Application status, requirements, and cohort information'
    },
    {
      type: 'Corporate Partnerships',
      email: 'partners@intelligence-academy.rowan.edu',
      description: 'Fortune 500 companies interested in AI innovation partnerships'
    },
    {
      type: 'Media & Press',
      email: 'media@intelligence-academy.rowan.edu',
      description: 'Press inquiries, interviews, and media kit requests'
    }
  ]

  const locations = [
    {
      name: 'Main Office',
      building: 'South Jersey Technology Park',
      address: '107 Gilbreth Parkway',
      city: 'Mullica Hill, NJ 08062',
      phone: '(856) 256-4000',
      isPrimary: true
    },
    {
      name: 'Rowan Campus',
      building: 'College of Engineering',
      address: '201 Mullica Hill Road',
      city: 'Glassboro, NJ 08028',
      phone: '(856) 256-5300',
      isPrimary: false
    }
  ]

  return (
    <>
      <ParticleBackground />
      <main className="contact-page">
        {/* Hero Section */}
        <section className="contact-hero">
          <div className="hero-content">
            <h1 className="hero-title">Let's Build the Future Together</h1>
            <p className="hero-description">
              Whether you're an AI entrepreneur, corporate partner, or investor, 
              we're here to help you create billion-dollar impact.
            </p>
          </div>
        </section>

        {/* Contact Cards */}
        <section className="contact-cards-section loading">
          <div className="container">
            <h2 className="section-title">Get in Touch</h2>
            <div className="contact-grid">
              {contactInfo.map((contact, index) => (
                <div key={index} className="contact-card">
                  <h3 className="contact-type">{contact.type}</h3>
                  <a href={`mailto:${contact.email}`} className="contact-email">
                    {contact.email}
                  </a>
                  <p className="contact-description">{contact.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Locations */}
        <section className="locations-section loading">
          <div className="container">
            <h2 className="section-title">Visit Us</h2>
            <div className="locations-grid">
              {locations.map((location, index) => (
                <div key={index} className={`location-card ${location.isPrimary ? 'primary' : ''}`}>
                  {location.isPrimary && <span className="primary-badge">Primary Location</span>}
                  <h3 className="location-name">{location.name}</h3>
                  <p className="location-building">{location.building}</p>
                  <p className="location-address">{location.address}</p>
                  <p className="location-city">{location.city}</p>
                  <p className="location-phone">{location.phone}</p>
                  <a 
                    href={`https://maps.google.com/?q=${encodeURIComponent(`${location.building}, ${location.address}, ${location.city}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="map-link"
                  >
                    View on Map →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Office Hours */}
        <section className="office-hours-section loading">
          <div className="container">
            <h2 className="section-title">Office Hours & Availability</h2>
            <div className="hours-card">
              <div className="hours-grid">
                <div className="hours-item">
                  <h4>Regular Hours</h4>
                  <p>Monday - Friday: 9:00 AM - 5:00 PM EST</p>
                </div>
                <div className="hours-item">
                  <h4>Virtual Office Hours</h4>
                  <p>Tuesdays & Thursdays: 3:00 PM - 5:00 PM EST</p>
                  <p className="hours-note">Book via Calendly link sent after application</p>
                </div>
                <div className="hours-item">
                  <h4>Demo Days</h4>
                  <p>Quarterly events - check calendar</p>
                </div>
                <div className="hours-item">
                  <h4>Emergency Support</h4>
                  <p>Current cohort members have 24/7 Slack access</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social & Community */}
        <section className="social-section loading">
          <div className="container">
            <h2 className="section-title">Join Our Community</h2>
            <div className="social-links">
              <a href="#" className="social-link">
                <span className="social-icon">🔗</span>
                <span className="social-name">LinkedIn</span>
              </a>
              <a href="#" className="social-link">
                <span className="social-icon">🐦</span>
                <span className="social-name">Twitter</span>
              </a>
              <a href="#" className="social-link">
                <span className="social-icon">📺</span>
                <span className="social-name">YouTube</span>
              </a>
              <a href="#" className="social-link">
                <span className="social-icon">📰</span>
                <span className="social-name">Newsletter</span>
              </a>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="contact-cta loading">
          <div className="container">
            <h2 className="cta-title">Ready to Build Your AI Unicorn?</h2>
            <p className="cta-description">
              Don't wait - applications are reviewed on a rolling basis and spots fill quickly.
            </p>
            <a href="/apply" className="btn-primary">Apply Now</a>
          </div>
        </section>
      </main>
    </>
  )
}

export default ContactPage