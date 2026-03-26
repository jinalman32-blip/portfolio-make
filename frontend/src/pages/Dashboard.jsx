import React, { useState } from 'react'
import { PenLine, Zap, Star, ArrowRight, Sparkles, Menu } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Card from '../components/Card'
import ParticleBackground from '../components/ParticleBackground'
import FloatingIconsBackground from '../components/FloatingIconsBackground'

const features = [
  { icon: Zap, text: 'AI-powered content extraction' },
  { icon: Star, text: 'Professional templates' },
  { icon: Sparkles, text: 'Custom domain support' },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  return (
    <div className="flex min-h-screen bg-[#060d1a] overflow-x-hidden" style={{ 
      backgroundImage: 'url("/images/bg_main.png")',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center'
    }}>
      <div className="fixed inset-0 bg-[#060d1a]/85 backdrop-blur-[2px] pointer-events-none" />
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <ParticleBackground />
      <FloatingIconsBackground />

      {/* Mobile menu toggle */}
      <div className="lg:hidden sticky top-0 z-[100] flex items-center justify-between p-4 bg-[#060d1a]/80 backdrop-blur-lg border-b border-white/5 w-full">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-indigo-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Sparkles size={16} className="text-white" />
          </div>
          <span className="text-white font-bold text-sm tracking-tight text-lg">PortfolioMaker</span>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-all"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-64 relative" style={{ zIndex: 1 }}>

        <main className="flex-1 overflow-y-auto">
          <div className="flex flex-col items-center justify-center min-h-full px-4 sm:px-6 py-8 sm:py-12">

            {/* Welcome badge */}
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full mb-8 animate-fade-in"
              style={{
                background: 'rgba(34, 211, 238, 0.08)',
                border: '1px solid rgba(34, 211, 238, 0.2)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <Sparkles size={14} className="text-cyan-400" />
              <span className="text-cyan-400 text-sm font-medium">AI-Powered Portfolio Generator</span>
            </div>

            {/* Hero heading */}
            <div className="text-center max-w-3xl mb-6 animate-slide-up px-4">
              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4 tracking-tight text-white">
                Transform Your{' '}
                <span
                  className="relative inline-block"
                  style={{
                    background: 'linear-gradient(135deg, #22d3ee, #0ea5e9)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 0 20px rgba(34, 211, 238, 0.4))'
                  }}
                >
                  Resume
                </span>
                {' '}Into a{' '}
                <span
                  className="block md:inline"
                  style={{
                    background: 'linear-gradient(135deg, #14b8a6, #22d3ee, #6366f1)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 0 20px rgba(20, 184, 166, 0.4))'
                  }}
                >
                  Stunning Portfolio
                </span>
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed max-w-xl mx-auto">
                Craft your professional journey, choose from premium templates, and get a professional portfolio website in{' '}
                <span className="text-cyan-400 font-medium">minutes.</span>
              </p>
            </div>

            {/* Feature pills */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-12 animate-fade-in">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm text-gray-300"
                  style={{
                    background: 'rgba(13, 21, 38, 0.7)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(8px)'
                  }}
                >
                  <f.icon size={14} className="text-cyan-400" />
                  {f.text}
                </div>
              ))}
            </div>

            {/* Cards */}
            <div className="w-full max-w-xl animate-slide-up">
              <Card
                icon={PenLine}
                title="Resume & Portfolio Builder"
                description="Create a professional resume and transform it into a stunning live portfolio. Use our direct-edit form to update your details in real-time."
                badge="Main Form"
                onClick={() => navigate('/craft')}
                gradient="linear-gradient(135deg, rgba(34, 211, 238, 0.2), rgba(99, 102, 241, 0.15))"
                glowColor="rgba(34, 211, 238, 0.4)"
              />
            </div>

            {/* Stats */}
            <div
              className="flex flex-col md:flex-row items-center gap-6 md:gap-8 mt-14 px-8 py-5 rounded-2xl w-full max-w-lg md:max-w-none mb-10 relative overflow-hidden group"
              style={{
                background: 'rgba(13, 21, 38, 0.7)',
                border: '1px solid rgba(34, 211, 238, 0.15)',
                backdropFilter: 'blur(20px)'
              }}
            >
              <div 
                className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: 'url("/images/bg_card.png")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              {[
                { value: '50K+', label: 'Portfolios Created' },
                { value: '98%', label: 'Satisfaction Rate' },
                { value: '2 min', label: 'Average Setup Time' },
              ].map((stat, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <div className="hidden md:block w-px h-10 bg-gray-700/50 relative z-10" />}
                  <div className="text-center flex-1 relative z-10">
                    <p
                      className="text-2xl font-bold"
                      style={{
                        background: 'linear-gradient(135deg, #22d3ee, #0ea5e9)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}
                    >
                      {stat.value}
                    </p>
                    <p className="text-gray-500 text-xs mt-0.5">{stat.label}</p>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
