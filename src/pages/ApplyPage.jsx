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

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
    setSubmitted(true)
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
            <div className="deadline-banner">
              <span className="deadline-label">Application Deadline:</span>
              <span className="deadline-date">December 15, 2025</span>
            </div>
            <p className="hero-note">
              Our unicorn-focused program has limited spots. Submit your 2-minute application to be considered.
            </p>
          </div>
        </section>

        {/* Application Form */}
        <section className="application-section loading">
          <div className="container">
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
                  />
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
                    />
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
                    />
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
                  >
                    <option value="">Select your affiliation</option>
                    <option value="rowan-student">Rowan Student</option>
                    <option value="rowan-faculty">Rowan Faculty</option>
                    <option value="rowan-alumni">Rowan Alumni</option>
                    <option value="external-entrepreneur">External Entrepreneur</option>
                    <option value="corporate-employee">Corporate Employee</option>
                    <option value="other">Other</option>
                  </select>
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
                  />
                  <div className={`char-count ${charCounts.startupIdea > charLimits.startupIdea * 0.9 ? 'danger' : charCounts.startupIdea > charLimits.startupIdea * 0.7 ? 'warning' : ''}`}>
                    {charCounts.startupIdea} / {charLimits.startupIdea}
                  </div>
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
                  />
                  <div className={`char-count ${charCounts.marketOpportunity > charLimits.marketOpportunity * 0.9 ? 'danger' : charCounts.marketOpportunity > charLimits.marketOpportunity * 0.7 ? 'warning' : ''}`}>
                    {charCounts.marketOpportunity} / {charLimits.marketOpportunity}
                  </div>
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
                  />
                  <div className={`char-count ${charCounts.unicornPotential > charLimits.unicornPotential * 0.9 ? 'danger' : charCounts.unicornPotential > charLimits.unicornPotential * 0.7 ? 'warning' : ''}`}>
                    {charCounts.unicornPotential} / {charLimits.unicornPotential}
                  </div>
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
                  />
                  <div className={`char-count ${charCounts.whyIA > charLimits.whyIA * 0.9 ? 'danger' : charCounts.whyIA > charLimits.whyIA * 0.7 ? 'warning' : ''}`}>
                    {charCounts.whyIA} / {charLimits.whyIA}
                  </div>
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

              <div className="form-submit">
                <button type="submit" className="btn-submit">
                  Submit 2-Min Application
                </button>
                <p className="form-disclaimer">
                  <span className="asterisk">*</span>While we focus on unicorn potential, we recognize that unicorn outcomes remain 
                  statistically rare. Our methodology systematically addresses the factors that give AI companies 
                  demonstrable advantages in achieving billion-dollar valuations.
                </p>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  )
}

export default ApplyPage