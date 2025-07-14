import React, { useEffect } from 'react'
import './AboutPage.css'

function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const unicornStats = [
    { metric: 'Time to $1B Valuation', ai: '7 years average', traditional: '25 years average', advantage: 'Quarter the time' },
    { metric: 'Team Size at Unicorn Status', ai: '200-500 employees', traditional: '1,000+ employees', advantage: 'Half the team size' },
    { metric: 'Success Rate to Unicorn', ai: '2% of AI startups', traditional: '1% of startups', advantage: 'Double the success' },
    { metric: 'Capital Efficiency', ai: '$100-200M raised', traditional: '$500M+ raised', advantage: '2.5x more efficient' }
  ]

  const methodology = [
    {
      title: 'Fortune 500 Corporate Partnerships',
      description: 'Direct access to enterprise clients who need AI solutions now. Our partners provide pilot opportunities, validation, and pathways to strategic exits.',
      icon: '🏢'
    },
    {
      title: 'NSF I-Corps Customer Discovery',
      description: 'Proven methodology with 40% survival rates. We combine Silicon Valley best practices with academic rigor to validate billion-dollar opportunities.',
      icon: '🔬'
    },
    {
      title: 'Regional Cost Advantage',
      description: '30% cost savings vs. coastal alternatives in Greater Philadelphia. Build 2x faster while maintaining runway to reach product-market fit.',
      icon: '💰'
    },
    {
      title: 'University Research Pipeline',
      description: 'Exclusive access to cutting-edge AI research, PhD talent, and high-performance GPU clusters. Partner with faculty on breakthrough technologies.',
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
      <main className="about-page">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="hero-content">
            <h1 className="hero-title">Building AI Unicorns Since Day One</h1>
            <p className="hero-description">
              More AI startups are reaching billion-dollar valuations in <strong>quarter the time</strong> with <strong>half the team</strong> 
              and <strong>double the success rate</strong>¹ vs. traditional unicorns. Our program focuses on the specific methodology 
              and partnerships that maximize your AI startup's unicorn potential.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="unicorn-stats-section loading">
          <div className="container">
            <h2 className="section-title">Why AI Companies Become Unicorns Differently</h2>
            <p className="section-subtitle">The statistics that drive our unicorn-focused methodology</p>
            
            {/* Key Stats Cards */}
            <div className="key-stats-grid">
              <div className="key-stat-card">
                <div className="stat-number">4x</div>
                <div className="stat-label">Faster to $1B</div>
                <div className="stat-detail">7 years vs. 25 years average</div>
              </div>
              <div className="key-stat-card">
                <div className="stat-number">½</div>
                <div className="stat-label">Team Size</div>
                <div className="stat-detail">200-500 vs. 1,000+ employees</div>
              </div>
              <div className="key-stat-card">
                <div className="stat-number">2x</div>
                <div className="stat-label">Success Rate</div>
                <div className="stat-detail">2% vs. 1% traditional startups</div>
              </div>
            </div>
            
            <div className="stats-table">
              <div className="table-header">
                <div className="header-cell">Unicorn Metric</div>
                <div className="header-cell">Traditional Startups</div>
                <div className="header-cell highlight">AI Startups</div>
                <div className="header-cell advantage">AI Advantage</div>
              </div>
              {unicornStats.map((stat, index) => (
                <div key={index} className="table-row">
                  <div className="table-cell metric">{stat.metric}</div>
                  <div className="table-cell traditional-value" data-label="Traditional Startups">{stat.traditional}</div>
                  <div className="table-cell ai-value" data-label="AI Startups">{stat.ai}</div>
                  <div className="table-cell advantage-value" data-label="AI Advantage">{stat.advantage}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Methodology Section */}
        <section className="methodology-section loading">
          <div className="container">
            <h2 className="section-title">How We Maximize Your Unicorn Potential</h2>
            <p className="section-subtitle">Every program element designed for exponential growth</p>
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
              <p className="investment-disclaimer">
                <span className="asterisk">*</span>Aspiring unicorn catalyst based on AI sector performance data. While unicorn outcomes remain 
                statistically rare (2% of AI startups vs. 1% traditional), our methodology systematically addresses the factors 
                that give AI companies demonstrable advantages in achieving billion-dollar valuations.
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
            <a href="/apply" className="btn-primary">Submit 2-Min Application</a>
            <p className="cta-subtext">Get invited to apply for Spring 2026 cohort</p>
            <p className="footnote">
              <sup>1</sup> Source: CB Insights State of AI Report 2024, PitchBook Unicorn Analysis
            </p>
          </div>
        </section>
      </main>
    </>
  )
}

export default AboutPage
