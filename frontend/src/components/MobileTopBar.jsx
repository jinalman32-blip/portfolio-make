import React from 'react'
import { Menu, Sparkles } from 'lucide-react'

export default function MobileTopBar({ setMobileOpen }) {
  return (
    <div className="lg:hidden sticky top-0 z-[100] flex items-center justify-between px-4 py-3 bg-[#060d1a]/90 backdrop-blur-lg border-b border-white/10">
      <div className="flex items-center gap-2 min-w-0">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-indigo-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 flex-shrink-0">
          <Sparkles size={14} className="text-white" />
        </div>
        <span className="text-white font-black text-sm tracking-tight uppercase truncate">PortfolioMaker</span>
      </div>

      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-all flex-shrink-0"
        aria-label="Open navigation menu"
      >
        <Menu size={18} />
      </button>
    </div>
  )
}
