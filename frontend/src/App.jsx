import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'

function RefreshGuard() {
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    const nav = performance.getEntriesByType?.('navigation')?.[0]
    if (nav?.type === 'reload') {
      const safe = ['/home', '/login', '/register']
      if (!safe.some(p => location.pathname === p || location.pathname.startsWith(p + '/'))) {
        navigate('/home', { replace: true })
      }
    }
  }, [])
  return null
}
import HomePage from './pages/HomePage'
import Dashboard from './pages/Dashboard'
import MyPortfolios from './pages/MyPortfolios'
import ProfileSettings from './pages/ProfileSettings'
import CraftWizard from './pages/CraftWizard'
import CraftPreview from './pages/CraftPreview'
import Templates from './pages/Templates'
import AITools from './pages/AITools'
import Login from './pages/Login'
import Register from './pages/Register'
import Credits from './pages/Credits'
import ReferEarn from './pages/ReferEarn'
import UploadResume from './pages/UploadResume'
import PublishedPortfolio from './pages/PublishedPortfolio'
import StaticContent from './pages/StaticContent'

export default function App() {
  return (
    <Router>
      <RefreshGuard />
      <Routes>
        <Route path="/home"           element={<HomePage />} />
        <Route path="/"               element={<Navigate to="/home" replace />} />
        <Route path="/dashboard"      element={<Dashboard />} />
        <Route path="/portfolios"     element={<MyPortfolios />} />
        <Route path="/profile"        element={<ProfileSettings />} />
        <Route path="/craft"          element={<CraftWizard />} />
        <Route path="/craft/preview"  element={<CraftPreview />} />
        <Route path="/templates"      element={<Templates />} />
        <Route path="/ai-tools"       element={<AITools />} />
        <Route path="/login"          element={<Navigate to="/home" replace />} />
        <Route path="/register"       element={<Navigate to="/home" replace />} />
        <Route path="/credits"        element={<Credits />} />
        <Route path="/upload-resume"  element={<UploadResume />} />
        <Route path="/content/:type"  element={<StaticContent />} />
        <Route path="/p/:slug"        element={<PublishedPortfolio />} />
        <Route path="*"               element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  )
}
