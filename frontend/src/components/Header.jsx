import React, { useState, useEffect } from 'react'
import { Menu } from 'lucide-react'

export default function Header({ title = '', setMobileOpen }) {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1000)

  useEffect(() => {
    const handle = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handle)
    return () => window.removeEventListener('resize', handle)
  }, [])
  return (
    <header
      className="sticky top-0 z-10 flex items-center justify-between px-3 sm:px-6 py-4"
      style={{
        background: 'rgba(10, 15, 30, 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(34, 211, 238, 0.08)'
      }}
    >
      <div className="flex items-center gap-2 sm:gap-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 -ml-1 rounded-xl text-gray-400 hover:text-white transition-all"
        >
          <Menu size={24} />
        </button>
        {title && (
          <h1 className="text-white font-semibold text-base sm:text-lg truncate max-w-[120px]">{title}</h1>
        )}
      </div>

        {/* Avatar */}
        {(() => {
          const user = JSON.parse(localStorage.getItem('user') || '{}');
          const initial = (user.name || 'U')[0].toUpperCase();
          const credits = user.credits ?? 0;
          return (
            <div className="flex items-center gap-2 sm:gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white cursor-pointer hover:ring-2 hover:ring-cyan-500/50 transition-all shadow-lg"
                style={{ background: 'linear-gradient(135deg, #22d3ee, #6366f1)', border: '1px solid rgba(255,255,255,0.1)' }}
                title={user.name}
              >
                {initial}
              </div>
            </div>
          );
        })()}
    </header>
  )
}
