import React, { useEffect } from 'react'
import ParticleBackground from '../components/ParticleBackground'
import './PartnersPage.css'

function PartnersPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const partners = [
    {
      name: 'Jefferson Health',
      industry: 'Healthcare',
      description: 'Leading academic health system with 14 hospitals seeking AI solutions for patient care, diagnostics, and operational efficiency.',
      opportunities: ['Clinical AI', 'Diagnostic Imaging', 'Patient Flow', 'Revenue Cycle'],
      logo: '🏥'
    },
    {
      name: 'Campbell Soup Company',
      industry: 'Consumer Goods',
      description: 'Global food company leveraging AI for supply chain optimization, consumer insights, and product innovation.',
      opportunities: ['Supply Chain AI', 'Consumer Analytics', 'Quality Control', 'Demand Forecasting'],
      logo: '🥫'
    },
    {
      name: 'Boeing',
      industry: 'Aerospace',
      description: 'Aerospace leader exploring AI applications in manufacturing, safety systems, and autonomous flight technologies.',
      opportunities: ['Manufacturing AI', 'Predictive Maintenance', 'Safety Systems', 'Autonomous Systems'],
      logo: '✈️'
    },
    {
      name: 'TD Bank',
      industry: 'Financial Services',
      description: 'Top 10 U.S. bank implementing AI for fraud detection, customer service, and personalized financial products.',
      opportunities: ['Fraud Detection', 'Risk Assessment', 'Customer Analytics', 'Process Automation'],
      logo: '🏦'
    },
    {
      name: 'Subaru',
      industry: 'Automotive',
      description: 'Automotive innovator developing AI-powered safety features, manufacturing optimization, and connected car technologies.',
      opportunities: ['Autonomous Driving', 'Manufacturing AI', 'Predictive Analytics', 'Connected Services'],
      logo: '🚗'
    },
    {
      name: 'More Partners Coming',
      industry: 'Various Industries',
      description: 'We\'re continuously adding Fortune 500 partners across healthcare, finance, retail, and technology sectors.',
      opportunities: ['Join our growing network', 'Shape AI partnerships', 'Early access to pilots', 'Strategic advantages'],
      logo: '🤝',
      isPlaceholder: true
    }
  ]

  const regionalStats = [
    { number: '12', label: 'Fortune 500 HQs within 50 miles' },
    { number: '$400B+', label: 'Regional Economy' },
    { number: '$2T+', label: 'Combined Market Cap' },
    { number: '5M+', label: 'Employees in Region' }
  ]

  return (
    <>
      <ParticleBackground />
      <main className="partners-page">
        {/* Hero Section */}
        <section className="partners-hero">
          <div className="hero-content">
            <h1 className="hero-title">Fortune 500 Partners Ready to Deploy AI</h1>
            <p className="hero-description">
              Our corporate partners aren't just logos on a website. They're actively seeking AI solutions, 
              providing pilot opportunities, and fast-tracking procurement for our startups.
            </p>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="partners-intro loading">
          <div className="container">
            <h2 className="section-title">Why Corporate Partnerships Create Unicorns</h2>
            <div className="intro-grid">
              <div className="intro-card">
                <div className="card-number">85%</div>
                <p className="card-text">Of AI unicorns have Fortune 500 customers before Series A</p>
              </div>
              <div className="intro-card">
                <div className="card-number">$15M</div>
                <p className="card-text">Average first enterprise contract value for our alumni</p>
              </div>
              <div className="intro-card">
                <div className="card-number">6 months</div>
                <p className="card-text">Average time from program to first enterprise deployment</p>
              </div>
            </div>
          </div>
        </section>

        {/* Partners Grid */}
        <section className="partners-grid-section loading">
          <div className="container">
            <h2 className="section-title">Our Corporate Innovation Network</h2>
            <div className="partners-grid">
              {partners.map((partner, index) => (
                <div key={index} className={`partner-card ${partner.isPlaceholder ? 'placeholder' : ''}`}>
                  <div className="partner-header">
                    <div className="partner-logo">{partner.logo}</div>
                    <div className="partner-info">
                      <h3 className="partner-name">{partner.name}</h3>
                      <p className="partner-industry">{partner.industry}</p>
                    </div>
                  </div>
                  <p className="partner-description">{partner.description}</p>
                  <div className="partner-opportunities">
                    <h4 className="opportunities-title">AI Opportunities:</h4>
                    <div className="opportunities-list">
                      {partner.opportunities.map((opp, oppIndex) => (
                        <span key={oppIndex} className="opportunity-tag">{opp}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Regional Advantage */}
        <section className="regional-advantage loading">
          <div className="container">
            <h2 className="section-title">Greater Philadelphia's Unicorn Ecosystem</h2>
            <div className="regional-stats">
              {regionalStats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-number">{stat.number}</div>
                  <p className="stat-label">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="regional-content">
              <p className="regional-description">
                Greater Philadelphia offers the perfect launching pad for AI unicorns: world-class universities, 
                dense corporate headquarters, lower costs than Silicon Valley, and access to the entire East Coast market. 
                Our location provides strategic advantages that accelerate growth and reduce burn rate.
              </p>
            </div>
          </div>
        </section>

        {/* Partnership Process */}
        <section className="partnership-process loading">
          <div className="container">
            <h2 className="section-title">How We Connect You to Fortune 500 Partners</h2>
            <div className="process-timeline">
              <div className="process-step">
                <div className="step-number">1</div>
                <h3 className="step-title">Pre-Program Matching</h3>
                <p className="step-description">
                  We analyze your AI solution and identify 5-10 potential corporate partners before you even arrive.
                </p>
              </div>
              <div className="process-connector"></div>
              <div className="process-step">
                <div className="step-number">2</div>
                <h3 className="step-title">Executive Introductions</h3>
                <p className="step-description">
                  Direct meetings with innovation leaders, not just vendor portals. Average 10+ meetings per startup.
                </p>
              </div>
              <div className="process-connector"></div>
              <div className="process-step">
                <div className="step-number">3</div>
                <h3 className="step-title">Pilot Development</h3>
                <p className="step-description">
                  Co-develop pilot programs with clear success metrics and paths to enterprise-wide deployment.
                </p>
              </div>
              <div className="process-connector"></div>
              <div className="process-step">
                <div className="step-number">4</div>
                <h3 className="step-title">Contract Acceleration</h3>
                <p className="step-description">
                  Navigate procurement with our support, reducing sales cycles from 18 months to 6 months.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="partners-cta loading">
          <div className="container">
            <h2 className="cta-title">Turn Corporate Partnerships Into Unicorn Valuations</h2>
            <p className="cta-description">
              Join our program and get direct access to Fortune 500 decision-makers ready to pilot your AI solution.
            </p>
            <a href="/apply" className="btn-primary">Apply Now</a>
          </div>
        </section>
      </main>
    </>
  )
}

export default PartnersPage