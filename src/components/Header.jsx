import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DarkModeToggle from './DarkModeToggle'
import './Header.css'

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showDarkModeToggle, setShowDarkModeToggle] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    const handleClickOutside = (e) => {
      if (!e.target.closest('.header-actions')) {
        setIsDropdownOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    document.addEventListener('click', handleClickOutside)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const toggleDropdown = (e) => {
    e.stopPropagation()
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className={`nav ${isScrolled ? 'shrink' : ''}`}>
        <Link to="/" className={`logo ${isScrolled ? 'shrink' : ''}`}>
          <div>Intelligence Academy <span className="rowan">@ Rowan</span></div>
          <div className={`logo-subtitle ${isScrolled ? 'shrink' : ''}`}>
            AI Startup Accelerator & <span className="unicorn-factory">Unicorn Factory</span><span className="asterisk">*</span>
          </div>
        </Link>
        
        <div className="header-actions">
          <div className="cta-container">
            <Link to="/apply" className={`cta-button ${isScrolled ? 'shrink' : ''}`}>Apply Now</Link>
            <div className={`cohort-pill ${isScrolled ? 'shrink' : ''}`}>Spring 2026 Cohort</div>
          </div>
          <div className="menu-container">
            <DarkModeToggle 
              show={showDarkModeToggle} 
              className={`dark-mode-toggle ${isScrolled ? 'shrink' : ''}`}
            />
            <button 
              className={`hamburger-menu ${isScrolled ? 'shrink' : ''}`} 
              onClick={toggleDropdown}
              onMouseEnter={() => setShowDarkModeToggle(true)}
              onMouseLeave={() => setShowDarkModeToggle(false)}
            >
              <div className="hamburger-lines">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          </div>
          <div className={`nav-dropdown ${isDropdownOpen ? 'show' : ''}`}>
            <Link to="/" onClick={() => setIsDropdownOpen(false)}>Home</Link>
            <Link to="/about" onClick={() => setIsDropdownOpen(false)}>About</Link>
            <Link to="/partners" onClick={() => setIsDropdownOpen(false)}>Partners</Link>
            <Link to="/mentors" onClick={() => setIsDropdownOpen(false)}>Mentors</Link>
            <Link to="/apply" onClick={() => setIsDropdownOpen(false)}>Apply</Link>
            <Link to="/contact" onClick={() => setIsDropdownOpen(false)}>Contact</Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header