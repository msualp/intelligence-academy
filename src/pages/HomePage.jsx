import React, { useEffect } from 'react'
import HeroSection from '../components/HeroSection'
import DifferentiatorsSection from '../components/DifferentiatorsSection'
import StatsSection from '../components/StatsSection'
import ProgramSection from '../components/ProgramSection'
import CTASection from '../components/CTASection'
import ParticleBackground from '../components/ParticleBackground'

function HomePage() {
  useEffect(() => {
    // Initialize animations on mount
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1'
          entry.target.style.transform = 'translateY(0)'
        }
      })
    }, observerOptions)

    // Observe all sections for loading animation
    document.querySelectorAll('.loading').forEach(section => {
      section.style.opacity = '0'
      section.style.transform = 'translateY(30px)'
      section.style.transition = 'opacity 0.8s ease, transform 0.8s ease'
      observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <ParticleBackground />
      <HeroSection />
      <DifferentiatorsSection />
      <StatsSection />
      <ProgramSection />
      <CTASection />
    </>
  )
}

export default HomePage