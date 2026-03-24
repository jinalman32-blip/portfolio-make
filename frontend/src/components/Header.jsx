import React from 'react'
import { Bell, Coins } from 'lucide-react'

export default function Header({ title = '' }) {
  return (
    <header
      className="sticky top-0 z-10 flex items-center justify-between px-6 py-4"
      style={{
        background: 'rgba(10, 15, 30, 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(34, 211, 238, 0.08)'
      }}
    >
      <div>
        {title && (
          <h1 className="text-white font-semibold text-lg">{title}</h1>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Credits */}
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
          style={{
            background: 'rgba(34, 211, 238, 0.08)',
            border: '1px solid rgba(34, 211, 238, 0.2)'
          }}
        >
          <Coins size={15} className="text-cyan-400" />
          <span className="text-cyan-400 text-sm font-semibold">3 credits</span>
        </div>

        {/* Notification bell */}
        <button className="relative p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all">
          <Bell size={20} />
          <span
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
            style={{ background: '#22d3ee', boxShadow: '0 0 6px rgba(34, 211, 238, 0.8)' }}
          />
        </button>

        {/* Avatar */}
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white cursor-pointer hover:ring-2 hover:ring-cyan-500/50 transition-all"
          style={{ background: 'linear-gradient(135deg, #22d3ee, #6366f1)' }}
        >
          U
        </div>
      </div>
    </header>
  )
}
