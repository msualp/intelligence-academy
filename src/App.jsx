import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import PartnersPage from './pages/PartnersPage'
import MentorsPage from './pages/MentorsPage'
import ApplyPage from './pages/ApplyPage'
import ContactPage from './pages/ContactPage'
import Header from './components/Header'
import DraftBanner from './components/DraftBanner'
import Footer from './components/Footer'
import ParticleBackground from './components/ParticleBackground'

function App() {
  return (
    <>
      <ParticleBackground />
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/*" element={
        <>
          <DraftBanner />
          <Header />
          <Routes>
            <Route path="/about" element={<AboutPage />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/mentors" element={<MentorsPage />} />
            <Route path="/apply" element={<ApplyPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
          <Footer />
        </>
      } />
    </Routes>
    </>
  )
}

export default App