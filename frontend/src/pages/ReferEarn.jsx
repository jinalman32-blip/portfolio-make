import React, { useState } from 'react'
import { Gift, Copy, Check, Users, Coins, Share2 } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import ParticleBackground from '../components/ParticleBackground'

export default function ReferEarn() {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const [copied, setCopied] = useState(false)

  const referralLink = `${window.location.origin}/register?ref=${user.referralCode || 'DEMO123'}`

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const stats = [
    { icon: Users, label: 'Friends Referred', value: '0', color: '#22d3ee' },
    { icon: Coins, label: 'Credits Earned', value: '0', color: '#6366f1' },
    { icon: Gift, label: 'Bonus Unlocked', value: '0', color: '#f59e0b' },
  ]

  return (
    <div className="flex h-screen bg-[#060d1a] overflow-hidden">
      <Sidebar />
      <ParticleBackground />

      <div className="flex-1 flex flex-col ml-64 relative" style={{ zIndex: 1 }}>
        <Header title="Refer & Earn" />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-2xl">
            {/* Hero */}
            <div
              className="relative overflow-hidden rounded-2xl p-8 mb-8"
              style={{
                background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.12), rgba(99, 102, 241, 0.12))',
                border: '1px solid rgba(34, 211, 238, 0.2)'
              }}
            >
              <div className="absolute top-0 right-0 w-48 h-48 opacity-10"
                style={{ background: 'radial-gradient(circle, #22d3ee, transparent)', borderRadius: '50%', transform: 'translate(30%, -30%)' }}
              />
              <Gift size={36} className="text-cyan-400 mb-4" style={{ filter: 'drop-shadow(0 0 15px rgba(34, 211, 238, 0.6))' }} />
              <h2 className="text-white text-2xl font-bold mb-2">Refer Friends & Earn Credits</h2>
              <p className="text-gray-300 leading-relaxed">
                Share your referral link. When a friend signs up, <span className="text-cyan-400 font-semibold">you get 2 credits</span> and they get{' '}
                <span className="text-cyan-400 font-semibold">5 bonus credits</span> to start!
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl text-center"
                  style={{
                    background: 'rgba(13, 21, 38, 0.6)',
                    border: '1px solid rgba(34, 211, 238, 0.1)'
                  }}
                >
                  <s.icon size={22} className="mx-auto mb-3" style={{ color: s.color }} />
                  <p className="text-2xl font-bold text-white mb-1">{s.value}</p>
                  <p className="text-gray-400 text-xs">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Referral Code */}
            <div
              className="p-6 rounded-2xl mb-5"
              style={{
                background: 'rgba(13, 21, 38, 0.6)',
                border: '1px solid rgba(34, 211, 238, 0.15)'
              }}
            >
              <label className="text-gray-300 text-sm font-medium block mb-3">Your Referral Code</label>
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="flex-1 px-4 py-3 rounded-xl text-center text-2xl font-bold tracking-widest"
                  style={{
                    background: 'rgba(34, 211, 238, 0.08)',
                    border: '1px solid rgba(34, 211, 238, 0.2)',
                    color: '#22d3ee'
                  }}
                >
                  {user.referralCode || 'DEMO123'}
                </div>
              </div>

              <label className="text-gray-300 text-sm font-medium block mb-2">Referral Link</label>
              <div
                className="flex items-center gap-3 p-3 rounded-xl"
                style={{
                  background: 'rgba(13, 21, 38, 0.8)',
                  border: '1px solid rgba(75, 85, 99, 0.4)'
                }}
              >
                <span className="flex-1 text-gray-300 text-sm truncate">{referralLink}</span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
                  style={{
                    background: copied ? 'rgba(34, 197, 94, 0.15)' : 'rgba(34, 211, 238, 0.15)',
                    border: copied ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(34, 211, 238, 0.3)',
                    color: copied ? '#22c55e' : '#22d3ee'
                  }}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Share buttons */}
            <div className="flex gap-3">
              {['Twitter', 'LinkedIn', 'WhatsApp'].map((platform, i) => (
                <button
                  key={platform}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-gray-300 transition-all hover:text-white hover:bg-white/5"
                  style={{
                    background: 'rgba(13, 21, 38, 0.6)',
                    border: '1px solid rgba(75, 85, 99, 0.3)'
                  }}
                >
                  <Share2 size={14} />
                  {platform}
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
