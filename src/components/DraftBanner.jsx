import React, { useState } from 'react'
import './DraftBanner.css'

function DraftBanner() {
  const [isHidden, setIsHidden] = useState(false)

  const handleClose = () => {
    setIsHidden(true)
    document.querySelector('.header')?.classList.add('banner-hidden')
    document.querySelector('.hero')?.classList.add('banner-hidden')
  }

  return (
    <div className={`draft-banner ${isHidden ? 'hidden' : ''}`} id="draftBanner">
      <span className="warning-icon">⚠️</span>
      CONCEPT DEMO - Not an official Rowan University program
      <button className="banner-close" onClick={handleClose}>×</button>
    </div>
  )
}

export default DraftBanner