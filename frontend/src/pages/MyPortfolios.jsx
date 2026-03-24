import React, { useState, useEffect } from 'react'
import { FolderOpen, Plus, Trash2, Eye, Edit3, Calendar, Layers, CheckCircle2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import ParticleBackground from '../components/ParticleBackground'
import FloatingIconsBackground from '../components/FloatingIconsBackground'

const TEMPLATE_COLORS = {
  browncream:         { accent: '#7B5B3A', label: 'Brown & Cream' },
  grayscale:          { accent: '#ffffff', label: 'B&W Photography' },
  purple:             { accent: '#c4a0d0', label: 'Purple Beige' },
  futuristic:         { accent: '#00d4ff', label: 'Neural Circuit' },
  minimalist:         { accent: '#e8e3d5', label: 'B&W Minimalist' },
  darkblue:           { accent: '#5b4ff5', label: 'Dark Blue Creative' },
  presentationstyle:  { accent: '#C8860A', label: 'Presentation Style' },
  boldblack:          { accent: '#F0EEE8', label: 'Bold Black' },
  orangewhite:        { accent: '#E85C26', label: 'Orange & White' },
  bluegradientaesthetic: { accent: '#4a90e8', label: 'Blue Gradient' },
  greenbeige:         { accent: '#6b8c4e', label: 'Green Beige' },
}

export default function MyPortfolios() {
  const navigate = useNavigate()
  const [portfolios, setPortfolios] = useState([])
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  // Load from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('my_portfolios') || '[]')
    setPortfolios(stored)
  }, [])

  const handleDelete = (id) => {
    if (deleteConfirm === id) {
      const updated = portfolios.filter(p => p.id !== id)
      setPortfolios(updated)
      localStorage.setItem('my_portfolios', JSON.stringify(updated))
      setDeleteConfirm(null)
    } else {
      setDeleteConfirm(id)
      setTimeout(() => setDeleteConfirm(null), 3000)
    }
  }

  const handleEdit = (portfolio) => {
    // Load portfolio data back into sessionStorage for the craft wizard
    sessionStorage.setItem('craft_portfolio', JSON.stringify(portfolio))
    navigate('/craft')
  }

  const handlePreview = (portfolio) => {
    sessionStorage.setItem('craft_portfolio', JSON.stringify(portfolio))
    navigate('/preview', { state: { previewTemplate: portfolio.template } })
  }

  const formatDate = (iso) => {
    try {
      return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    } catch { return '—' }
  }

  return (
    <div className="flex h-screen bg-[#060d1a] overflow-hidden">
      <Sidebar />
      <ParticleBackground />
      <FloatingIconsBackground />

      <div className="flex-1 flex flex-col ml-64 relative" style={{ zIndex: 1 }}>
        <Header title="My Portfolios" />

        <main className="flex-1 overflow-y-auto p-6">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-white text-3xl font-black font-['Inter'] uppercase tracking-tight">My Portfolios</h2>
              <p className="text-gray-500 text-sm mt-1">
                {portfolios.length} portfolio{portfolios.length !== 1 ? 's' : ''} saved
              </p>
            </div>
            <button
              onClick={() => navigate('/craft')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm transition-all hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #22d3ee, #0ea5e9)',
                boxShadow: '0 4px 20px rgba(34, 211, 238, 0.4)'
              }}
            >
              <Plus size={18} />
              New Portfolio
            </button>
          </div>

          {/* Empty state */}
          {portfolios.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center min-h-[60vh] rounded-[2rem]"
              style={{
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.04)',
                backdropFilter: 'blur(12px)'
              }}
            >
              <div className="w-24 h-24 rounded-full flex items-center justify-center mb-8"
                style={{ background: 'rgba(34,211,238,0.05)', border: '1px solid rgba(34,211,238,0.1)' }}>
                <FolderOpen size={40} className="text-cyan-800" />
              </div>
              <h3 className="text-white text-4xl font-black mb-4 italic tracking-tighter uppercase text-center">
                Create your<br/><span className="text-cyan-400">First Portfolio</span>
              </h3>
              <p className="text-gray-500 text-base max-w-sm text-center leading-relaxed mb-10">
                You haven't saved any portfolios yet. Build one and click <strong className="text-gray-400">"Save to My Portfolios"</strong> on the preview screen.
              </p>
              <button
                onClick={() => navigate('/craft')}
                className="px-10 py-4 rounded-full font-black text-cyan-400 border-2 border-cyan-400/20 hover:border-cyan-400 hover:bg-cyan-400/5 transition-all uppercase tracking-widest text-sm"
              >
                Start Crafting Now
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolios.map(p => {
                const tmpl = TEMPLATE_COLORS[p.template] || { accent: '#22d3ee', label: p.template || 'Custom' }
                const isDeleting = deleteConfirm === p.id
                return (
                  <div
                    key={p.id}
                    className="group rounded-3xl p-6 transition-all duration-500 hover:translate-y-[-6px] relative"
                    style={{
                      background: 'rgba(13,21,38,0.6)',
                      border: `1px solid rgba(255,255,255,0.06)`,
                      backdropFilter: 'blur(20px)',
                      boxShadow: '0 4px 30px rgba(0,0,0,0.4)'
                    }}
                  >
                    {/* Template Color Banner */}
                    <div
                      className="h-36 rounded-2xl mb-5 flex items-end justify-between overflow-hidden relative p-4"
                      style={{
                        background: `linear-gradient(135deg, ${tmpl.accent}22, ${tmpl.accent}08)`,
                        border: `1px solid ${tmpl.accent}25`
                      }}
                    >
                      {/* Decorative lines */}
                      <div className="absolute inset-0 opacity-20" style={{
                        backgroundImage: `repeating-linear-gradient(45deg, ${tmpl.accent}30 0px, ${tmpl.accent}30 1px, transparent 1px, transparent 12px)`
                      }} />
                      <div className="absolute top-4 left-4">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg flex-shrink-0" style={{ background: `linear-gradient(135deg, ${tmpl.accent}, ${tmpl.accent}88)` }} />
                          <span className="text-xs font-bold" style={{ color: tmpl.accent }}>{tmpl.label}</span>
                        </div>
                      </div>
                      {/* Mini preview bars */}
                      <div className="absolute bottom-4 left-4 right-4 space-y-1.5">
                        {[100, 75, 55].map((w, i) => (
                          <div key={i} className="h-1.5 rounded-full" style={{ width: `${w}%`, background: `${tmpl.accent}${i === 0 ? '60' : i === 1 ? '35' : '20'}` }} />
                        ))}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="mb-1">
                      <h3 className="text-white font-bold text-lg truncate">
                        {p.details?.name || 'Untitled Portfolio'}
                      </h3>
                      {p.details?.title && (
                        <p className="text-gray-500 text-xs mt-0.5 truncate">{p.details.title}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-gray-600 mb-5 mt-2">
                      <span className="flex items-center gap-1">
                        <Calendar size={10} />
                        {formatDate(p.savedAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Layers size={10} />
                        {p.skills?.length || 0} skills · {p.projects?.length || 0} projects
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      {/* Edit */}
                      <button
                        onClick={() => handleEdit(p)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all hover:scale-105"
                        style={{
                          background: `${tmpl.accent}18`,
                          border: `1px solid ${tmpl.accent}35`,
                          color: tmpl.accent,
                        }}
                      >
                        <Edit3 size={13} /> Edit
                      </button>

                      {/* Preview */}
                      <button
                        onClick={() => handlePreview(p)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all hover:scale-105 text-white"
                        style={{
                          background: 'linear-gradient(135deg, rgba(34,211,238,0.2), rgba(99,102,241,0.2))',
                          border: '1px solid rgba(34,211,238,0.3)',
                        }}
                      >
                        <Eye size={13} /> Preview
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-2.5 rounded-xl transition-all hover:scale-105"
                        title={isDeleting ? 'Click again to confirm delete' : 'Delete'}
                        style={{
                          background: isDeleting ? 'rgba(239,68,68,0.2)' : 'rgba(239,68,68,0.06)',
                          border: `1px solid ${isDeleting ? 'rgba(239,68,68,0.5)' : 'rgba(239,68,68,0.15)'}`,
                          color: isDeleting ? '#f87171' : '#6b7280',
                        }}
                      >
                        {isDeleting ? <CheckCircle2 size={15} /> : <Trash2 size={15} />}
                      </button>
                    </div>

                    {isDeleting && (
                      <p className="text-red-400 text-[10px] text-center mt-2 animate-pulse">
                        Click delete again to confirm
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
