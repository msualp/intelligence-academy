import React from 'react'
import { Link } from 'react-router-dom'
import './ProgramSection.css'

function ProgramSection() {
  const programFeatures = [
    {
      week: "Weeks 1-4",
      title: "Unicorn Foundation",
      items: [
        "AI market opportunity analysis & unicorn thesis development",
        "Product-market fit validation with Fortune 500 partners",
        "IP strategy and competitive moat building",
        "Founding team optimization for billion-dollar scale"
      ]
    },
    {
      week: "Weeks 5-8",
      title: "Enterprise Acceleration",
      items: [
        "Direct meetings with 10+ Fortune 500 decision makers",
        "Enterprise pilot program development",
        "Pricing strategy for 7-figure contracts",
        "Building scalable AI infrastructure"
      ]
    },
    {
      week: "Weeks 9-12",
      title: "Unicorn Scaling",
      items: [
        "Series A fundraising preparation",
        "Venture capital partner introductions",
        "Global expansion strategy",
        "Building a world-class AI team"
      ]
    }
  ]

  return (
    <section className="program loading" id="program">
      <div className="program-content">
        <h2 className="section-title">The 12-Week Unicorn Sprint</h2>
        <p className="section-subtitle">From AI Concept to Billion-Dollar Trajectory</p>
        
        <div className="program-grid">
          {programFeatures.map((phase, index) => (
            <div key={index} className="program-phase">
              <div className="phase-header">
                <span className="phase-week">{phase.week}</span>
                <h3 className="phase-title">{phase.title}</h3>
              </div>
              <ul className="phase-items">
                {phase.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="program-cta">
          <p className="cta-text">Ready to build the next AI unicorn?</p>
          <Link to="/apply" className="btn-primary">Apply for Spring 2026 Cohort</Link>
        </div>
      </div>
    </section>
  )
}

export default ProgramSection