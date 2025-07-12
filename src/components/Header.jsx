import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

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
            <a href="#apply" className={`cta-button ${isScrolled ? 'shrink' : ''}`}>Apply Now</a>
            <div className={`cohort-pill ${isScrolled ? 'shrink' : ''}`}>Spring 2026 Cohort</div>
          </div>
          <button 
            className={`hamburger-menu ${isScrolled ? 'shrink' : ''}`} 
            onClick={toggleDropdown}
          >
            ☰
          </button>
          <div className={`nav-dropdown ${isDropdownOpen ? 'show' : ''}`}>
            <a href="#home" onClick={() => setIsDropdownOpen(false)}>Home</a>
            <a href="#program" onClick={() => setIsDropdownOpen(false)}>Program</a>
            <a href="#vision" onClick={() => setIsDropdownOpen(false)}>Our Vision</a>
            <a href="#partners" onClick={() => setIsDropdownOpen(false)}>Partners</a>
            <a href="#about" onClick={() => setIsDropdownOpen(false)}>About</a>
            <a href="#contact" onClick={() => setIsDropdownOpen(false)}>Contact</a>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header