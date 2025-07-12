import React, { useEffect } from 'react'
import ParticleBackground from '../components/ParticleBackground'
import './AboutPage.css'

function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const unicornStats = [
    { metric: 'Time to $1B Valuation', ai: '7 years', traditional: '25 years' },
    { metric: 'Team Size at Unicorn', ai: '200-500', traditional: '1,000+' },
    { metric: 'Success Rate', ai: '2%', traditional: '1%' },
    { metric: 'Capital Efficiency', ai: '2.5x', traditional: '1x' },
    { metric: 'Market Penetration', ai: '5x faster', traditional: 'Baseline' }
  ]

  const methodology = [
    {
      title: 'Fortune 500 Corporate Partnerships',
      description: 'Direct access to enterprise clients who need AI solutions now. Our partners provide pilot opportunities, validation, and pathways to million-dollar contracts.',
      icon: '🏢'
    },
    {
      title: 'NSF I-Corps Customer Discovery',
      description: 'Proven methodology that has launched 1,000+ startups. We combine Silicon Valley best practices with academic rigor to validate billion-dollar opportunities.',
      icon: '🔬'
    },
    {
      title: 'Regional Cost Advantage',
      description: 'Build 2x faster with 40% lower costs. Access world-class talent while maintaining runway to reach product-market fit and scale efficiently.',
      icon: '💰'
    },
    {
      title: 'University Research Pipeline',
      description: 'Exclusive access to cutting-edge AI research, PhD talent, and computational resources. Partner with faculty on breakthrough technologies.',
      icon: '🎓'
    }
  ]

  const timeline = [
    {
      phase: 'Phase 1: Foundation',
      weeks: 'Weeks 1-4',
      items: [
        'Unicorn thesis development',
        'Market opportunity validation',
        'Team optimization',
        'IP strategy'
      ]
    },
    {
      phase: 'Phase 2: Corporate Validation',
      weeks: 'Weeks 5-8',
      items: [
        'Fortune 500 meetings (10+)',
        'Pilot program development',
        'Enterprise pricing strategy',
        'Product roadmap refinement'
      ]
    },
    {
      phase: 'Phase 3: Growth Preparation',
      weeks: 'Weeks 9-12',
      items: [
        'Fundraising deck creation',
        'VC partner introductions',
        'Hiring strategy',
        'Scaling playbook'
      ]
    },
    {
      phase: 'Phase 4: Launch',
      weeks: 'Weeks 13-16',
      items: [
        'Demo Day presentation',
        'Series A preparation',
        'Board formation',
        'Growth execution'
      ]
    }
  ]

  return (
    <>
      <ParticleBackground />
      <main className="about-page">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="hero-content">
            <h1 className="hero-title">Building AI Unicorns Since Day One</h1>
            <p className="hero-description">
              Intelligence Academy is the only accelerator designed exclusively for creating billion-dollar AI companies. 
              Our methodology, network, and resources are optimized for one outcome: unicorn status.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="unicorn-stats-section loading">
          <div className="container">
            <h2 className="section-title">Why AI Companies Become Unicorns Differently</h2>
            <div className="stats-table">
              <div className="table-header">
                <div className="header-cell">Metric</div>
                <div className="header-cell highlight">AI Startups</div>
                <div className="header-cell">Traditional Startups</div>
              </div>
              {unicornStats.map((stat, index) => (
                <div key={index} className="table-row">
                  <div className="table-cell metric">{stat.metric}</div>
                  <div className="table-cell ai-value">{stat.ai}</div>
                  <div className="table-cell traditional-value">{stat.traditional}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Methodology Section */}
        <section className="methodology-section loading">
          <div className="container">
            <h2 className="section-title">Our Unicorn-Focused Methodology</h2>
            <div className="methodology-grid">
              {methodology.map((method, index) => (
                <div key={index} className="methodology-card">
                  <div className="card-icon">{method.icon}</div>
                  <h3 className="card-title">{method.title}</h3>
                  <p className="card-description">{method.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="timeline-section loading">
          <div className="container">
            <h2 className="section-title">16-Week Unicorn Development Timeline</h2>
            <div className="timeline-grid">
              {timeline.map((phase, index) => (
                <div key={index} className="timeline-phase">
                  <div className="phase-header">
                    <h3 className="phase-title">{phase.phase}</h3>
                    <span className="phase-weeks">{phase.weeks}</span>
                  </div>
                  <ul className="phase-items">
                    {phase.items.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Investment Section */}
        <section className="investment-section loading">
          <div className="container">
            <h2 className="section-title">Investment & Resources</h2>
            <div className="investment-card">
              <div className="investment-header">
                <h3 className="investment-amount">$100,000</h3>
                <p className="investment-subtitle">Non-Dilutive SAFE Investment</p>
              </div>
              <div className="investment-details">
                <div className="detail-item">
                  <span className="detail-label">Investment Type:</span>
                  <span className="detail-value">Post-Money SAFE</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Valuation Cap:</span>
                  <span className="detail-value">$20M (Standard)</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Discount:</span>
                  <span className="detail-value">20%</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Additional Resources:</span>
                  <span className="detail-value">$50M+ Follow-on Network</span>
                </div>
              </div>
              <p className="investment-note">
                Our investment is structured to maximize your runway while preserving founder equity for future rounds.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="about-cta loading">
          <div className="container">
            <h2 className="cta-title">Ready to Build a Unicorn?</h2>
            <p className="cta-description">
              Join the next cohort of AI entrepreneurs building billion-dollar companies.
            </p>
            <a href="/apply" className="btn-primary">Apply Now</a>
          </div>
        </section>
      </main>
    </>
  )
}

export default AboutPage