import React, { useState, useEffect } from 'react'
import { 
  Code2, Laptop, Cpu, Database, 
  Coffee, Monitor, Smartphone, Wind, 
  Zap, Sparkles, Globe, Terminal, 
  Binary, Command, Box, Cpu as Chip
} from 'lucide-react'

const ICON_LIST = [
  Code2, Laptop, Chip, Database, Coffee, 
  Monitor, Smartphone, Wind, Zap, Sparkles,
  Globe, Terminal, Binary, Command, Box
]

const COLORS = ['#22d3ee', '#6366f1', '#8b5cf6', '#14b8a6', '#0ea5e9']

const FloatingIcon = ({ index, mousePos }) => {
  const Icon = ICON_LIST[index % ICON_LIST.length]
  const color = COLORS[index % COLORS.length]
  const size = Math.random() * 25 + 15
  const top = Math.random() * 100
  const left = Math.random() * 100
  const duration = Math.random() * 10 + 20
  const delay = Math.random() * 5
  
  // Parallax effect
  const parallaxX = (mousePos.x - window.innerWidth / 2) * (0.01 + Math.random() * 0.02)
  const parallaxY = (mousePos.y - window.innerHeight / 2) * (0.01 + Math.random() * 0.02)
  
  return (
    <div
      style={{
        position: 'absolute',
        top: `${top}%`,
        left: `${left}%`,
        opacity: 0.08,
        color: color,
        fontSize: size,
        animation: `floatingIconsAnimation ${duration}s ease-in-out ${delay}s infinite`,
        transform: `translate(${parallaxX}px, ${parallaxY}px)`,
        transition: 'transform 0.4s ease-out',
        pointerEvents: 'none',
        zIndex: 0
      }}
    >
      <Icon size={size} strokeWidth={1} style={{ filter: `drop-shadow(0 0 10px ${color})` }} />
    </div>
  )
}

export default function FloatingIconsBackground() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const totalIcons = 35 // More icons for better coverage

  useEffect(() => {
    const handleMove = (e) => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" 
      style={{ 
        zIndex: 0,
        background: 'transparent'
      }}
    >
      <style>{`
        @keyframes floatingIconsAnimation {
          0%, 100% {
            translate: 0 0;
            rotate: 0deg;
          }
          25% {
            translate: 25px -40px;
            rotate: 15deg;
          }
          50% {
            translate: -20px 30px;
            rotate: -10deg;
          }
          75% {
            translate: 20px 20px;
            rotate: 5deg;
          }
        }
      `}</style>
      {[...Array(totalIcons)].map((_, i) => (
        <FloatingIcon key={i} index={i} mousePos={mousePos} />
      ))}
    </div>
  )
}
