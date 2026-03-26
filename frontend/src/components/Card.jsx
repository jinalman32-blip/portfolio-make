import React from 'react'
import { ArrowRight } from 'lucide-react'

export default function Card({
  icon: Icon,
  title,
  description,
  badge,
  badgeColor = 'cyan',
  onClick,
  gradient,
  glowColor = 'rgba(34, 211, 238, 0.3)'
}) {
  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer rounded-[2rem] p-8 transition-all duration-500 hover:-translate-y-2 active:scale-95 overflow-hidden"
      style={{
        background: 'rgba(13, 21, 38, 0.7)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
        border: '1px solid rgba(34, 211, 238, 0.15)',
        boxShadow: '0 10px 40px rgba(0,0,0,0.4)'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(34, 211, 238, 0.5)'
        e.currentTarget.style.boxShadow = `0 15px 50px ${glowColor}, 0 10px 40px rgba(0,0,0,0.5)`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(34, 211, 238, 0.15)'
        e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.4)'
      }}
    >
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none transition-transform duration-[1.5s] ease-out group-hover:scale-110"
        style={{
          backgroundImage: 'url("/images/bg_card.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <div className="relative z-10">
        {/* Top glow line */}
        <div
          className="absolute top-0 left-0 right-0 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.6), transparent)' }}
        />

        {/* Icon */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
          style={{
            background: gradient || 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(99, 102, 241, 0.2))',
            border: '1px solid rgba(34, 211, 238, 0.2)'
          }}
        >
          <Icon size={26} className="text-cyan-400" style={{ filter: 'drop-shadow(0 0 8px rgba(34,211,238,0.6))' }} />
        </div>

        {/* Badge */}
        {badge && (
          <span
            className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3"
            style={{
              background: 'rgba(34, 211, 238, 0.1)',
              border: '1px solid rgba(34, 211, 238, 0.3)',
              color: '#22d3ee'
            }}
          >
            {badge}
          </span>
        )}

        {/* Content */}
        <h3 className="text-white font-bold text-xl mb-2 group-hover:text-cyan-50 transition-colors">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-5">{description}</p>

        {/* CTA */}
        <div className="flex items-center gap-2 text-cyan-400 text-sm font-medium group-hover:gap-3 transition-all duration-200">
          <span>Get started</span>
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  )
}
