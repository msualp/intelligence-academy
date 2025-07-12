import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Header from './components/Header'
import DraftBanner from './components/DraftBanner'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <DraftBanner />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Add more routes as needed */}
      </Routes>
      <Footer />
    </>
  )
}

export default App