import React from 'react'
import './StatsSection.css'

function StatsSection() {
  return (
    <section className="unicorn-stats loading">
      <div className="stats-content">
        <h2 className="stats-title">Unicorn Metrics That Matter</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">$2.8B</div>
            <div className="stat-description">Combined portfolio valuation potential based on AI market analysis</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">30+</div>
            <div className="stat-description">Fortune 500 companies ready to pilot your AI solution</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">93%</div>
            <div className="stat-description">Of our startups secure enterprise contracts within 6 months</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">$50M+</div>
            <div className="stat-description">Follow-on funding available through our venture network</div>
          </div>
        </div>
        <p className="stats-disclaimer">
          <span className="asterisk">*</span>Based on projected market opportunity and successful execution. 
          Unicorn outcomes require exceptional performance and favorable market conditions.
        </p>
      </div>
    </section>
  )
}

export default StatsSection