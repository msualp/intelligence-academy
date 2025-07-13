import React, { useState, useEffect } from 'react'
import ParticleBackground from '../components/ParticleBackground'
import './ApplyPage.css'

function ApplyPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [formData, setFormData] = useState({
    primaryFounder: '',
    email: '',
    phone: '',
    coFounders: '',
    affiliation: '',
    startupIdea: '',
    marketOpportunity: '',
    unicornPotential: '',
    whyIA: '',
    technicalExpertise: '',
    businessExperience: '',
    previousAchievements: ''
  })
  
  const [gdprConsent, setGdprConsent] = useState(false)
  const [showGdprNotice, setShowGdprNotice] = useState(false)

  const [charCounts, setCharCounts] = useState({
    startupIdea: 0,
    marketOpportunity: 0,
    unicornPotential: 0,
    whyIA: 0,
    technicalExpertise: 0,
    businessExperience: 0,
    previousAchievements: 0
  })

  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')

  const charLimits = {
    startupIdea: 500,
    marketOpportunity: 300,
    unicornPotential: 300,
    whyIA: 300,
    technicalExpertise: 200,
    businessExperience: 200,
    previousAchievements: 200
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    
    if (charLimits[name] && value.length > charLimits[name]) {
      return
    }
    
    setFormData({ ...formData, [name]: value })
    
    if (charLimits[name]) {
      setCharCounts({ ...charCounts, [name]: value.length })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    // Required field validation
    if (!formData.primaryFounder.trim()) newErrors.primaryFounder = 'Primary founder name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!formData.affiliation) newErrors.affiliation = 'Please select your affiliation'
    if (!formData.startupIdea.trim()) newErrors.startupIdea = 'Startup idea is required'
    if (!formData.marketOpportunity.trim()) newErrors.marketOpportunity = 'Market opportunity is required'
    if (!formData.unicornPotential.trim()) newErrors.unicornPotential = 'Unicorn potential is required'
    if (!formData.whyIA.trim()) newErrors.whyIA = 'This field is required'
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    // Phone validation
    const phoneRegex = /^[\d\s\-\+\(\)]+$/
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }
    
    // GDPR consent validation
    if (!gdprConsent) {
      newErrors.gdprConsent = 'You must accept the data processing terms to submit your application'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')
    
    // Validate form
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/submit-application-simple', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          gdprConsent,
          consentTimestamp: new Date().toISOString()
        }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.details || data.error || 'Failed to submit application')
      }
      
      // Store application ID for confirmation
      localStorage.setItem('applicationId', data.applicationId)
      setSubmitted(true)
      
    } catch (error) {
      console.error('Submission error:', error)
      setSubmitError(error.message || 'An error occurred. Please try again.')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <>
        <ParticleBackground />
        <main className="apply-page">
          <section className="success-section">
            <div className="success-content">
              <div className="success-icon">✅</div>
              <h1 className="success-title">Application Submitted Successfully!</h1>
              <p className="success-description">
                Thank you for applying to Intelligence Academy. We'll review your submission within 2 weeks 
                and contact qualified candidates for the next phase.
              </p>
              <a href="/" className="btn-primary">Return to Home</a>
            </div>
          </section>
        </main>
      </>
    )
  }

  return (
    <>
      <ParticleBackground />
      <main className="apply-page">
        {/* Hero Section */}
        <section className="apply-hero">
          <div className="hero-content">
            <h1 className="hero-title">Submit Your 2-Minute Application</h1>
            <p className="hero-description">
              Get invited to apply for Spring 2026 cohort
            </p>
            <p className="hero-paragraph">
              Our unicorn-focused program has limited spots. Submit your 2-minute application to be considered for the most ambitious AI startup accelerator.
            </p>
            <div className="deadline-banner">
              <span className="deadline-label">Application Deadline:</span>
              <span className="deadline-date">December 15, 2025</span>
            </div>
            <p className="hero-invitation">
              Get invited to apply for our exclusive Spring 2026 cohort
            </p>
            <button 
              className="hero-learn-more"
              onClick={() => document.querySelector('.application-section').scrollIntoView({ behavior: 'smooth' })}
            >
              Learn more about our program
            </button>
            <p className="hero-disclaimer">
              <span className="asterisk">*</span>While we focus on unicorn potential, we recognize that unicorn outcomes remain 
              statistically rare. Our methodology systematically addresses the factors that give AI companies 
              demonstrable advantages in achieving billion-dollar valuations.
            </p>
            <p className="hero-source">
              <span className="asterisk">*</span>Source: CB Insights Global Unicorn Report 2024, McKinsey AI Index 2024
            </p>
          </div>
        </section>

        {/* Application Form */}
        <section className="application-section">
          <div className="container">
            {submitError && (
              <div className="error-banner">
                <span className="error-icon">⚠️</span>
                <span className="error-message">{submitError}</span>
                <button 
                  className="error-close"
                  onClick={() => setSubmitError('')}
                  aria-label="Close error message"
                >
                  ×
                </button>
              </div>
            )}
            
            <form className="application-form" onSubmit={handleSubmit}>
              {/* Founder Information */}
              <div className="form-section">
                <h2 className="form-section-title">Founder Information</h2>
                
                <div className="form-group">
                  <label htmlFor="primaryFounder">Primary Founder Name <span className="required">*</span></label>
                  <input
                    type="text"
                    id="primaryFounder"
                    name="primaryFounder"
                    value={formData.primaryFounder}
                    onChange={handleChange}
                    required
                    className={errors.primaryFounder ? 'error' : ''}
                    aria-invalid={errors.primaryFounder ? 'true' : 'false'}
                    aria-describedby={errors.primaryFounder ? 'primaryFounder-error' : undefined}
                  />
                  {errors.primaryFounder && (
                    <span id="primaryFounder-error" className="field-error">{errors.primaryFounder}</span>
                  )}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address <span className="required">*</span></label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={errors.email ? 'error' : ''}
                      aria-invalid={errors.email ? 'true' : 'false'}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <span id="email-error" className="field-error">{errors.email}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number <span className="required">*</span></label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className={errors.phone ? 'error' : ''}
                      aria-invalid={errors.phone ? 'true' : 'false'}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                    />
                    {errors.phone && (
                      <span id="phone-error" className="field-error">{errors.phone}</span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="coFounders">All Co-Founder Names</label>
                  <textarea
                    id="coFounders"
                    name="coFounders"
                    value={formData.coFounders}
                    onChange={handleChange}
                    placeholder="List all co-founder names (if any)"
                    rows="2"
                  />
                </div>
              </div>

              {/* Startup Information */}
              <div className="form-section">
                <h2 className="form-section-title">Startup Information</h2>
                <p className="form-section-note">
                  Focus on your AI startup's unicorn potential - what makes it a billion-dollar opportunity?
                </p>

                <div className="form-group">
                  <label htmlFor="affiliation">Current Affiliation <span className="required">*</span></label>
                  <select
                    id="affiliation"
                    name="affiliation"
                    value={formData.affiliation}
                    onChange={handleChange}
                    required
                    className={errors.affiliation ? 'error' : ''}
                    aria-invalid={errors.affiliation ? 'true' : 'false'}
                    aria-describedby={errors.affiliation ? 'affiliation-error' : undefined}
                  >
                    <option value="">Select your affiliation</option>
                    <option value="rowan-student">Rowan Student</option>
                    <option value="rowan-faculty">Rowan Faculty</option>
                    <option value="rowan-alumni">Rowan Alumni</option>
                    <option value="external-entrepreneur">External Entrepreneur</option>
                    <option value="corporate-employee">Corporate Employee</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.affiliation && (
                    <span id="affiliation-error" className="field-error">{errors.affiliation}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="startupIdea">
                    AI Startup Idea <span className="required">*</span> (500 characters max)
                  </label>
                  <textarea
                    id="startupIdea"
                    name="startupIdea"
                    value={formData.startupIdea}
                    onChange={handleChange}
                    required
                    rows="4"
                    placeholder="Describe your AI solution, target market, and the problem you're solving"
                    className={errors.startupIdea ? 'error' : ''}
                    aria-invalid={errors.startupIdea ? 'true' : 'false'}
                    aria-describedby={errors.startupIdea ? 'startupIdea-error' : undefined}
                  />
                  <div className={`char-count ${charCounts.startupIdea > charLimits.startupIdea * 0.9 ? 'danger' : charCounts.startupIdea > charLimits.startupIdea * 0.7 ? 'warning' : ''}`}>
                    {charCounts.startupIdea} / {charLimits.startupIdea}
                  </div>
                  {errors.startupIdea && (
                    <span id="startupIdea-error" className="field-error">{errors.startupIdea}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="marketOpportunity">
                    Market Opportunity <span className="required">*</span> (300 characters max)
                  </label>
                  <textarea
                    id="marketOpportunity"
                    name="marketOpportunity"
                    value={formData.marketOpportunity}
                    onChange={handleChange}
                    required
                    rows="3"
                    placeholder="What's the size of the market and why is timing right now?"
                    className={errors.marketOpportunity ? 'error' : ''}
                    aria-invalid={errors.marketOpportunity ? 'true' : 'false'}
                    aria-describedby={errors.marketOpportunity ? 'marketOpportunity-error' : undefined}
                  />
                  <div className={`char-count ${charCounts.marketOpportunity > charLimits.marketOpportunity * 0.9 ? 'danger' : charCounts.marketOpportunity > charLimits.marketOpportunity * 0.7 ? 'warning' : ''}`}>
                    {charCounts.marketOpportunity} / {charLimits.marketOpportunity}
                  </div>
                  {errors.marketOpportunity && (
                    <span id="marketOpportunity-error" className="field-error">{errors.marketOpportunity}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="unicornPotential">
                    Unicorn Potential <span className="required">*</span> (300 characters max)
                  </label>
                  <textarea
                    id="unicornPotential"
                    name="unicornPotential"
                    value={formData.unicornPotential}
                    onChange={handleChange}
                    required
                    rows="3"
                    placeholder="Why do you believe this could become a billion-dollar company?"
                    className={errors.unicornPotential ? 'error' : ''}
                    aria-invalid={errors.unicornPotential ? 'true' : 'false'}
                    aria-describedby={errors.unicornPotential ? 'unicornPotential-error' : undefined}
                  />
                  <div className={`char-count ${charCounts.unicornPotential > charLimits.unicornPotential * 0.9 ? 'danger' : charCounts.unicornPotential > charLimits.unicornPotential * 0.7 ? 'warning' : ''}`}>
                    {charCounts.unicornPotential} / {charLimits.unicornPotential}
                  </div>
                  {errors.unicornPotential && (
                    <span id="unicornPotential-error" className="field-error">{errors.unicornPotential}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="whyIA">
                    Why Intelligence Academy <span className="required">*</span> (300 characters max)
                  </label>
                  <textarea
                    id="whyIA"
                    name="whyIA"
                    value={formData.whyIA}
                    onChange={handleChange}
                    required
                    rows="3"
                    placeholder="What specifically attracts you to our unicorn-focused program?"
                    className={errors.whyIA ? 'error' : ''}
                    aria-invalid={errors.whyIA ? 'true' : 'false'}
                    aria-describedby={errors.whyIA ? 'whyIA-error' : undefined}
                  />
                  <div className={`char-count ${charCounts.whyIA > charLimits.whyIA * 0.9 ? 'danger' : charCounts.whyIA > charLimits.whyIA * 0.7 ? 'warning' : ''}`}>
                    {charCounts.whyIA} / {charLimits.whyIA}
                  </div>
                  {errors.whyIA && (
                    <span id="whyIA-error" className="field-error">{errors.whyIA}</span>
                  )}
                </div>
              </div>

              {/* Team Background */}
              <div className="form-section">
                <h2 className="form-section-title">Team Background</h2>

                <div className="form-group">
                  <label htmlFor="technicalExpertise">
                    Technical Expertise (200 characters max)
                  </label>
                  <textarea
                    id="technicalExpertise"
                    name="technicalExpertise"
                    value={formData.technicalExpertise}
                    onChange={handleChange}
                    rows="2"
                    placeholder="Brief summary of your team's AI/technical capabilities"
                  />
                  <div className={`char-count ${charCounts.technicalExpertise > charLimits.technicalExpertise * 0.9 ? 'danger' : charCounts.technicalExpertise > charLimits.technicalExpertise * 0.7 ? 'warning' : ''}`}>
                    {charCounts.technicalExpertise} / {charLimits.technicalExpertise}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="businessExperience">
                    Business Experience (200 characters max)
                  </label>
                  <textarea
                    id="businessExperience"
                    name="businessExperience"
                    value={formData.businessExperience}
                    onChange={handleChange}
                    rows="2"
                    placeholder="Relevant business, sales, or entrepreneurship experience"
                  />
                  <div className={`char-count ${charCounts.businessExperience > charLimits.businessExperience * 0.9 ? 'danger' : charCounts.businessExperience > charLimits.businessExperience * 0.7 ? 'warning' : ''}`}>
                    {charCounts.businessExperience} / {charLimits.businessExperience}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="previousAchievements">
                    Previous Achievements (200 characters max)
                  </label>
                  <textarea
                    id="previousAchievements"
                    name="previousAchievements"
                    value={formData.previousAchievements}
                    onChange={handleChange}
                    rows="2"
                    placeholder="Notable accomplishments that demonstrate execution capability"
                  />
                  <div className={`char-count ${charCounts.previousAchievements > charLimits.previousAchievements * 0.9 ? 'danger' : charCounts.previousAchievements > charLimits.previousAchievements * 0.7 ? 'warning' : ''}`}>
                    {charCounts.previousAchievements} / {charLimits.previousAchievements}
                  </div>
                </div>
              </div>

              {/* GDPR Consent Section */}
              <div className="form-section gdpr-section">
                <h2 className="form-section-title">Data Protection & Privacy</h2>
                
                <div className="gdpr-notice">
                  <div className="gdpr-icon">🔐</div>
                  <div className="gdpr-content">
                    <h4>How we handle your data</h4>
                    <ul className="gdpr-list">
                      <li>We process your application data solely for program admission purposes</li>
                      <li>Your information is stored securely and never sold to third parties</li>
                      <li>We retain application data for 2 years for program records</li>
                      <li>You can request data deletion at any time via apply@iamunicorn.org</li>
                    </ul>
                  </div>
                </div>

                <div className="consent-box">
                  <label className="consent-label">
                    <input
                      type="checkbox"
                      checked={gdprConsent}
                      onChange={(e) => setGdprConsent(e.target.checked)}
                      className="consent-checkbox"
                    />
                    <span className="consent-text">
                      I agree to the processing of my personal data for the Intelligence Academy application 
                      process as described above. I understand I can withdraw consent or request data deletion 
                      at any time. <button 
                        type="button" 
                        className="privacy-link"
                        onClick={() => setShowGdprNotice(!showGdprNotice)}
                      >
                        Learn more
                      </button>
                    </span>
                  </label>
                  {errors.gdprConsent && (
                    <span className="field-error">{errors.gdprConsent}</span>
                  )}
                </div>

                {showGdprNotice && (
                  <div className="gdpr-details">
                    <h5>Detailed Privacy Information</h5>
                    <p><strong>Data Controller:</strong> Intelligence Academy @ Rowan University</p>
                    <p><strong>Legal Basis:</strong> Consent & Legitimate Interest for application processing</p>
                    <p><strong>Your Rights:</strong> Access, rectification, erasure, portability, and objection</p>
                    <p><strong>Data Security:</strong> Industry-standard encryption and secure storage</p>
                    <p><strong>International Transfers:</strong> Data may be processed in the United States with appropriate safeguards</p>
                    <p><strong>Contact:</strong> privacy@iamunicorn.org for all data protection inquiries</p>
                  </div>
                )}
              </div>

              <div className="form-submit">
                <button 
                  type="submit" 
                  className="btn-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span>
                      Submitting...
                    </>
                  ) : (
                    'Submit 2-Min Application'
                  )}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  )
}

export default ApplyPage