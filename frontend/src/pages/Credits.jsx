import React from 'react'
import { Coins, Zap, Star, Crown, Check } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import ParticleBackground from '../components/ParticleBackground'

const plans = [
  {
    name: 'Starter',
    credits: 5,
    price: 'Free',
    icon: Star,
    color: '#22d3ee',
    features: ['5 Portfolio Credits', '3 Templates', 'Basic AI Extraction', 'Community Support'],
    popular: false
  },
  {
    name: 'Pro',
    credits: 20,
    price: '$9',
    icon: Zap,
    color: '#6366f1',
    features: ['20 Portfolio Credits', '15+ Premium Templates', 'Advanced AI Extraction', 'Custom Domain', 'Priority Support'],
    popular: true
  },
  {
    name: 'Agency',
    credits: 100,
    price: '$29',
    icon: Crown,
    color: '#f59e0b',
    features: ['100 Portfolio Credits', 'All Templates', 'AI Content Generation', 'Team Access', 'White Label', 'Dedicated Support'],
    popular: false
  }
]

export default function Credits() {
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  return (
    <div className="flex h-screen bg-[#060d1a] overflow-hidden">
      <Sidebar />
      <ParticleBackground />

      <div className="flex-1 flex flex-col ml-64 relative" style={{ zIndex: 1 }}>
        <Header title="Credits" />

        <main className="flex-1 overflow-y-auto p-6">
          {/* Current balance */}
          <div
            className="flex items-center justify-between p-6 rounded-2xl mb-8"
            style={{
              background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.1), rgba(99, 102, 241, 0.1))',
              border: '1px solid rgba(34, 211, 238, 0.2)'
            }}
          >
            <div>
              <p className="text-gray-400 text-sm mb-1">Current Balance</p>
              <div className="flex items-center gap-3">
                <Coins size={28} className="text-cyan-400" style={{ filter: 'drop-shadow(0 0 10px rgba(34, 211, 238, 0.6))' }} />
                <span className="text-4xl font-bold text-white">{user.credits ?? 3}</span>
                <span className="text-gray-400 text-lg">credits</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm">Each credit = 1 portfolio</p>
              <p className="text-cyan-400 text-sm mt-1">Earn more by referring friends!</p>
            </div>
          </div>

          <h2 className="text-white text-xl font-bold mb-6">Buy Credits</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {plans.map((plan) => {
              const Icon = plan.icon
              return (
                <div
                  key={plan.name}
                  className="relative rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: plan.popular
                      ? `linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(34, 211, 238, 0.08))`
                      : 'rgba(13, 21, 38, 0.6)',
                    border: plan.popular
                      ? '1px solid rgba(99, 102, 241, 0.4)'
                      : '1px solid rgba(34, 211, 238, 0.1)',
                    backdropFilter: 'blur(16px)'
                  }}
                >
                  {plan.popular && (
                    <div
                      className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold text-white"
                      style={{ background: 'linear-gradient(135deg, #6366f1, #22d3ee)' }}
                    >
                      Most Popular
                    </div>
                  )}

                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${plan.color}20`, border: `1px solid ${plan.color}30` }}
                  >
                    <Icon size={24} style={{ color: plan.color }} />
                  </div>

                  <h3 className="text-white text-lg font-bold mb-1">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-3xl font-bold text-white">{plan.price}</span>
                    {plan.price !== 'Free' && <span className="text-gray-400 text-sm">/month</span>}
                  </div>

                  <p className="text-sm mb-5" style={{ color: plan.color }}>{plan.credits} Credits Included</p>

                  <ul className="space-y-2.5 mb-6">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                        <Check size={14} style={{ color: plan.color, flexShrink: 0 }} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button
                    className="w-full py-2.5 rounded-xl font-semibold text-sm transition-all hover:scale-105"
                    style={{
                      background: plan.popular
                        ? 'linear-gradient(135deg, #6366f1, #22d3ee)'
                        : `${plan.color}15`,
                      border: plan.popular ? 'none' : `1px solid ${plan.color}40`,
                      color: plan.popular ? 'white' : plan.color,
                      boxShadow: plan.popular ? `0 4px 20px rgba(99, 102, 241, 0.3)` : 'none'
                    }}
                  >
                    {plan.price === 'Free' ? 'Current Plan' : 'Upgrade Now'}
                  </button>
                </div>
              )
            })}
          </div>
        </main>
      </div>
    </div>
  )
}
