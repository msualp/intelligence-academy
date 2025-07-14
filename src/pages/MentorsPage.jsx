import React, { useEffect } from 'react'
import './MentorsPage.css'

function MentorsPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const leadership = [
    {
      name: 'Mustafa Sualp',
      title: 'Co-Director & Entrepreneur-in-Residence',
      bio: 'Serial entrepreneur with 3 successful exits. Former CTO of AI unicorn. Expert in scaling AI startups from idea to IPO.',
      expertise: ['AI Strategy', 'Fundraising', 'Product Development', 'Scaling'],
      photo: '👨‍💼'
    },
    {
      name: 'Dr. [Faculty Co-Director]',
      title: 'Academic Co-Director',
      bio: 'Leading AI researcher with 100+ publications. NSF CAREER Award recipient. Expert in machine learning and computer vision.',
      expertise: ['Deep Learning', 'Research Commercialization', 'IP Strategy', 'Academic Partnerships'],
      photo: '👩‍🏫'
    }
  ]

  const mentorCategories = [
    {
      category: 'Successful Entrepreneurs',
      icon: '🚀',
      description: 'Founders who\'ve built and exited AI companies',
      mentors: [
        'Former unicorn founders',
        'Serial entrepreneurs',
        'Y Combinator alumni',
        'Techstars mentors'
      ]
    },
    {
      category: 'AI Technical Experts',
      icon: '🤖',
      description: 'World-class AI researchers and engineers',
      mentors: [
        'Google AI researchers',
        'OpenAI alumni',
        'University faculty',
        'Patent holders'
      ]
    },
    {
      category: 'Corporate Executives',
      icon: '🏢',
      description: 'Fortune 500 innovation leaders',
      mentors: [
        'Chief Innovation Officers',
        'VP of AI/ML',
        'Digital Transformation leaders',
        'Strategic Partnership executives'
      ]
    },
    {
      category: 'Investors & VCs',
      icon: '💰',
      description: 'Partners from top-tier venture firms',
      mentors: [
        'Andreessen Horowitz advisors',
        'Sequoia scouts',
        'AI-focused VCs',
        'Angel investors'
      ]
    },
    {
      category: 'Growth Specialists',
      icon: '📈',
      description: 'Experts in scaling AI companies',
      mentors: [
        'Growth hackers',
        'Sales strategists',
        'Marketing leaders',
        'Customer success experts'
      ]
    },
    {
      category: 'Legal & IP Advisors',
      icon: '⚖️',
      description: 'Specialists in AI law and patents',
      mentors: [
        'IP attorneys',
        'AI ethics experts',
        'Regulatory advisors',
        'Contract specialists'
      ]
    }
  ]

  const mentorshipBenefits = [
    {
      title: '1-on-1 Weekly Sessions',
      description: 'Dedicated time with mentors who\'ve built billion-dollar companies'
    },
    {
      title: 'Warm Introductions',
      description: 'Direct connections to customers, investors, and partners'
    },
    {
      title: 'Board Preparation',
      description: 'Learn to build and manage a world-class board of directors'
    },
    {
      title: 'Scaling Strategies',
      description: 'Proven playbooks for growing from 10 to 1,000 employees'
    }
  ]

  return (
    <>
      <main className="mentors-page">
        {/* Hero Section */}
        <section className="mentors-hero">
          <div className="hero-content">
            <h1 className="hero-title">Learn From Those Who've Built Unicorns<span className="asterisk">*</span></h1>
            <p className="hero-description">
              Our 4:1 mentor-to-startup ratio ensures you get personalized guidance from entrepreneurs, 
              executives, and investors who've created billion-dollar companies.
            </p>
            <div className="hero-stat">
              <span className="stat-number">4:1</span>
              <span className="stat-label">Mentor to Startup Ratio</span>
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="leadership-section loading">
          <div className="container">
            <h2 className="section-title">Program Leadership</h2>
            <div className="leadership-grid">
              {leadership.map((leader, index) => (
                <div key={index} className="leader-card">
                  <div className="leader-photo">{leader.photo}</div>
                  <h3 className="leader-name">{leader.name}</h3>
                  <p className="leader-title">{leader.title}</p>
                  <p className="leader-bio">{leader.bio}</p>
                  <div className="leader-expertise">
                    {leader.expertise.map((skill, skillIndex) => (
                      <span key={skillIndex} className="expertise-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mentor Categories */}
        <section className="mentor-categories loading">
          <div className="container">
            <h2 className="section-title">World-Class Mentor Network</h2>
            <div className="categories-grid">
              {mentorCategories.map((category, index) => (
                <div key={index} className="category-card">
                  <div className="category-icon">{category.icon}</div>
                  <h3 className="category-title">{category.category}</h3>
                  <p className="category-description">{category.description}</p>
                  <ul className="mentor-list">
                    {category.mentors.map((mentor, mentorIndex) => (
                      <li key={mentorIndex}>{mentor}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mentorship Benefits */}
        <section className="mentorship-benefits loading">
          <div className="container">
            <h2 className="section-title">What You Get From Our Mentors</h2>
            <div className="benefits-grid">
              {mentorshipBenefits.map((benefit, index) => (
                <div key={index} className="benefit-card">
                  <h3 className="benefit-title">{benefit.title}</h3>
                  <p className="benefit-description">{benefit.description}</p>
                </div>
              ))}
            </div>
            <div className="mentor-quote">
              <blockquote>
                "The difference between a startup and a unicorn<span className="asterisk">*</span> is the quality of advice at critical moments. 
                Our mentors have been there, scaled that, and know exactly what it takes to build a billion-dollar company."
              </blockquote>
              <cite>- Mustafa Sualp, Program Co-Director</cite>
            </div>
          </div>
        </section>

        {/* Mentor Matching Process */}
        <section className="mentor-matching loading">
          <div className="container">
            <h2 className="section-title">Personalized Mentor Matching</h2>
            <div className="matching-process">
              <div className="process-card">
                <div className="process-number">1</div>
                <h3 className="process-title">Deep Dive Assessment</h3>
                <p className="process-description">
                  We analyze your startup's needs, industry, and growth stage to identify ideal mentor matches.
                </p>
              </div>
              <div className="process-card">
                <div className="process-number">2</div>
                <h3 className="process-title">Strategic Pairing</h3>
                <p className="process-description">
                  Match with 3-5 mentors who've solved similar challenges and built companies in your space.
                </p>
              </div>
              <div className="process-card">
                <div className="process-number">3</div>
                <h3 className="process-title">Ongoing Support</h3>
                <p className="process-description">
                  Regular check-ins, office hours, and on-demand guidance throughout your unicorn journey.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mentors-cta loading">
          <div className="container">
            <h2 className="cta-title">Get Mentored by Unicorn Builders<span className="asterisk">*</span></h2>
            <p className="cta-description">
              Join our program and learn directly from those who've created billion-dollar AI companies.
            </p>
            <a href="/apply" className="btn-primary">Submit 2-Min Application</a>
            <p className="cta-subtext">Get invited to apply for Spring 2026 cohort</p>
          </div>
        </section>
      </main>
    </>
  )
}

export default MentorsPage
