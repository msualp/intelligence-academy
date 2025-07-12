import React from 'react'
import './DifferentiatorsSection.css'

function DifferentiatorsSection() {
  const differentiators = [
    {
      title: "Unicorn-Focused Strategy",
      subtitle: "We Don't Build Small Businesses",
      description: "Our methodology is designed for billion-dollar outcomes. We focus exclusively on AI startups with unicorn potential.",
      icon: "🦄"
    },
    {
      title: "Fortune 500 Network",
      subtitle: "Direct Access to Enterprise Clients",
      description: "Pre-qualified partnerships with 30+ Fortune 500 companies actively seeking AI solutions.",
      icon: "🏢"
    },
    {
      title: "$100K Investment",
      subtitle: "Real Capital, Real Commitment",
      description: "Non-dilutive funding to accelerate your growth, plus access to millions in follow-on capital.",
      icon: "💰"
    },
    {
      title: "Proven Methodology",
      subtitle: "NSF I-Corps & Silicon Valley Best Practices",
      description: "Combine academic rigor with venture-backed strategies that have created multiple unicorns.",
      icon: "🚀"
    }
  ]

  return (
    <section className="differentiators loading">
      <div className="differentiators-header">
        <h2 className="section-title">The Unicorn Factory<span className="asterisk">*</span> Advantage</h2>
        <p className="section-subtitle">Why Intelligence Academy Creates Billion-Dollar AI Companies</p>
      </div>
      
      <div className="differentiators-grid">
        {differentiators.map((item, index) => (
          <div key={index} className="differentiator-card">
            <div className="card-icon">{item.icon}</div>
            <h3 className="card-title">{item.title}</h3>
            <h4 className="card-subtitle">{item.subtitle}</h4>
            <p className="card-description">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default DifferentiatorsSection