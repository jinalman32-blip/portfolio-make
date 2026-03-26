import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Sparkles, Upload, PenLine, Zap, Star, Shield,
  ArrowRight, Code2, Palette, Globe, ChevronRight, Play,
  Twitter, Linkedin, Github, ExternalLink, Menu
} from 'lucide-react'
import Sidebar from '../components/Sidebar'
import ParticleBackground from '../components/ParticleBackground'
import FloatingIconsBackground from '../components/FloatingIconsBackground'

/* ── 3D Tilt Card ── */
function TiltCard({ children, className = '', style = {}, onClick }) {
  const ref = useRef()
  const handleMove = (e) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rotX = ((y - cy) / cy) * -12
    const rotY = ((x - cx) / cx) * 12
    ref.current.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`
  }
  const handleLeave = () => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    ref.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)'
  }
  return (
    <div
      ref={ref}
      className={className}
      style={{ transition: 'transform 0.15s ease', transformStyle: 'preserve-3d', ...style }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

/* ── Feature Card ── */
function FeatureCard({ icon: Icon, title, desc, gradient, glow, bgImage }) {
  const finalBg = bgImage || '/images/bg_card.png';
  return (
    <TiltCard
      className="rounded-2xl p-6 cursor-default relative overflow-hidden group transition-all duration-300"
      style={{
        background: 'rgba(13,21,38,0.7)',
        border: '1px solid rgba(34,211,238,0.15)',
        backdropFilter: 'blur(20px)'
      }}
    >
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 z-0 opacity-40 group-hover:opacity-100 transition-all duration-1000 ease-out group-hover:scale-110"
        style={{
          backgroundImage: `url(${finalBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.6) contrast(1.2) blur(0px)'
        }}
      />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#0d1526] via-[#0d1526]/40 to-transparent" />
      
      <div className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-1"
        style={{ background: gradient, boxShadow: `0 0 20px ${glow}` }}>
        <Icon size={22} className="text-white transition-transform duration-500 group-hover:rotate-6" />
      </div>
      <h3 className="relative z-10 text-white font-bold text-lg mb-2 transition-transform duration-500 ease-out group-hover:translate-x-1" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.95), 0 0 5px rgba(0,0,0,0.9)' }}>{title}</h3>
      <p className="relative z-10 text-gray-200 text-sm leading-relaxed transition-transform duration-500 ease-out group-hover:translate-x-1" style={{ textShadow: '0 2px 10px rgba(0,0,0,1), 0 0 5px rgba(0,0,0,0.9)' }}>{desc}</p>
    </TiltCard>
  )
}

/* ── Step Card ── */
function StepCard({ num, title, desc, active }) {
  return (
    <div className="flex gap-4 group">
      <div className="flex flex-col items-center">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all duration-300"
          style={{
            background: active ? 'linear-gradient(135deg,#22d3ee,#0ea5e9)' : 'rgba(34,211,238,0.1)',
            border: active ? 'none' : '1px solid rgba(34,211,238,0.25)',
            color: active ? 'white' : '#22d3ee',
            boxShadow: active ? '0 0 20px rgba(34,211,238,0.4)' : 'none'
          }}
        >
          {num}
        </div>
        {num < 3 && <div className="w-px flex-1 mt-2" style={{ background: 'linear-gradient(to bottom, rgba(34,211,238,0.3), transparent)' }} />}
      </div>
      <div className="pb-8">
        <h4 className="text-white font-semibold mb-1">{title}</h4>
        <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}

/* ── Template Card ── */
function TemplateCard({ name, tag, image, accent = '#22d3ee', onClick }) {
  return (
    <TiltCard onClick={onClick} className="rounded-2xl overflow-hidden cursor-pointer group relative shadow-2xl transition-all duration-300 hover:scale-[1.02]" style={{ border: `1px solid ${accent}20` }}>
      <div className="h-56 relative overflow-hidden bg-[#0a0f1d]">
        {/* Mockup Figure */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-[1s] group-hover:scale-110 group-hover:rotate-1"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#0a0f1d] via-transparent to-transparent opacity-60" />
        
        {/* Accent bar at bottom */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg,${accent},${accent}44)`, zIndex: 10 }} />
        
        {/* Hover overlay */}
        <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
          <span className="text-white font-black text-[10px] uppercase tracking-[0.2em] px-5 py-2.5 rounded-xl border border-white/20" 
            style={{ background: `${accent}CC`, boxShadow: `0 8px 24px ${accent}40` }}>
            Live Preview
          </span>
        </div>
      </div>
      <div className="p-4 relative z-30" style={{ background: 'rgba(13,21,38,0.98)', borderTop:'1px solid rgba(255,255,255,0.05)' }}>
        <div className="flex items-center justify-between mb-1">
          <span className="text-white font-bold text-sm tracking-tight">{name}</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-tighter" 
            style={{ background: `${accent}15`, color: accent, border: `1px solid ${accent}30` }}>
            {tag}
          </span>
        </div>
        {/* Color swatches */}
        <div className="flex gap-1.5 mt-2">
          <div style={{ width: 10, height: 10, borderRadius: '2px', background: accent, transform: 'rotate(45deg)' }} />
          <div style={{ width: 10, height: 10, borderRadius: '2px', background: 'rgba(255,255,255,0.2)', transform: 'rotate(45deg)' }} />
        </div>
      </div>
    </TiltCard>
  )
}

/* ══════════════════════════════════════════
   HERO COMPONENTS
   ══════════════════════════════════════════ */

/* ── Mouse-Reactive Left-Side Orbs ── */
function MouseOrbs({ isMobile }) {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })
 
  useEffect(() => {
    const handleMove = (e) => setMouse({
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    })
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  const glows = [
    { bx: 22, by: 32, sz: 130, color: '#22d3ee', op: 0.10, fx: 28, fy: 22 },
    { bx: 58, by: 60, sz: 100, color: '#6366f1', op: 0.11, fx: -20, fy: 25 },
    { bx: 12, by: 68, sz: 110, color: '#8b5cf6', op: 0.09, fx: 24, fy: -18 },
    { bx: 72, by: 22, sz: 80,  color: '#14b8a6', op: 0.10, fx: -18, fy: 20 },
    { bx: 42, by: 82, sz: 90,  color: '#ec4899', op: 0.07, fx: 30, fy: -14 },
  ]

  const shapes = [
    { bx: 18, by: 22, sz: 24, color: '#22d3ee', fx: 20, fy: 16, delay: '0s',   dur: '3.6s', round: '50%' },
    { bx: 68, by: 52, sz: 16, color: '#6366f1', fx: -16, fy: 20, delay: '0.9s', dur: '4.3s', round: 4 },
    { bx: 28, by: 73, sz: 20, color: '#8b5cf6', fx: 22, fy: -14, delay: '1.7s', dur: '3.9s', round: 0 },
    { bx: 76, by: 18, sz: 13, color: '#14b8a6', fx: -18, fy: 18, delay: '2.5s', dur: '4.6s', round: '50%' },
    { bx: 52, by: 42, sz: 11, color: '#ec4899', fx: 24, fy: 12, delay: '0.5s',  dur: '3.3s', round: 3 },
    { bx: 14, by: 50, sz: 15, color: '#22d3ee', fx: -12, fy: -20, delay: '1.3s', dur: '4.1s', round: 0 },
    { bx: 85, by: 65, sz: 18, color: '#f59e0b', fx: 14, fy: -16, delay: '2.0s', dur: '3.7s', round: '50%' },
  ]

  const nodes = [
    { bx: 18, by: 22, fx: 20, fy: 16 },
    { bx: 68, by: 52, fx: -16, fy: 20 },
    { bx: 28, by: 73, fx: 22, fy: -14 },
  ]

  return (
    <div style={{
      position: 'absolute', left: 0, top: 0, bottom: 0,
      width: isMobile ? '100%' : '32%', 
      pointerEvents: 'none', overflow: 'hidden', zIndex: 2,
      opacity: isMobile ? 0.4 : 1
    }}>
      {/* Glow blobs */}
      {glows.map((g, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${g.bx + (mouse.x - 0.5) * g.fx}%`,
          top: `${g.by + (mouse.y - 0.5) * g.fy}%`,
          width: g.sz, height: g.sz, borderRadius: '50%',
          background: g.color, opacity: g.op, filter: 'blur(45px)',
          transition: 'left 0.6s ease, top 0.6s ease',
          transform: 'translate(-50%,-50%)',
        }} />
      ))}

      {/* Geometric shapes */}
      {shapes.map((s, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${s.bx + (mouse.x - 0.5) * s.fx}%`,
          top: `${s.by + (mouse.y - 0.5) * s.fy}%`,
          width: s.sz, height: s.sz,
          border: `1.5px solid ${s.color}`,
          borderRadius: s.round, opacity: 0.5,
          transition: 'left 0.45s ease, top 0.45s ease',
          animation: `orbsShapeFloat ${s.dur} ease-in-out ${s.delay} infinite`,
          transform: `translate(-50%,-50%) rotate(${i * 28}deg)`,
        }} />
      ))}

      {/* Connecting lines SVG */}
      <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%' }}>
        <defs>
          <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.35"/>
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.35"/>
          </linearGradient>
        </defs>
        {nodes.map((n, i) => {
          const next = nodes[(i + 1) % nodes.length]
          return (
            <line key={i}
              x1={`${n.bx + (mouse.x - 0.5) * n.fx}%`}
              y1={`${n.by + (mouse.y - 0.5) * n.fy}%`}
              x2={`${next.bx + (mouse.x - 0.5) * next.fx}%`}
              y2={`${next.by + (mouse.y - 0.5) * next.fy}%`}
              stroke="url(#lg1)" strokeWidth="1"
            />
          )
        })}
      </svg>

      {/* Small sparkling dots */}
      {[
        { bx: 35, by: 15, fx: 10, fy: 8, color: '#22d3ee', delay: '0s' },
        { bx: 80, by: 38, fx: -8, fy: 12, color: '#6366f1', delay: '1s' },
        { bx: 20, by: 58, fx: 14, fy: -10, color: '#8b5cf6', delay: '0.6s' },
        { bx: 60, by: 80, fx: -12, fy: 8, color: '#14b8a6', delay: '1.4s' },
        { bx: 48, by: 30, fx: 8, fy: 14, color: '#ec4899', delay: '0.3s' },
      ].map((d, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${d.bx + (mouse.x - 0.5) * d.fx}%`,
          top: `${d.by + (mouse.y - 0.5) * d.fy}%`,
          width: 5, height: 5, borderRadius: '50%',
          background: d.color,
          boxShadow: `0 0 8px ${d.color}`,
          opacity: 0.7,
          transition: 'left 0.35s ease, top 0.35s ease',
          animation: `orbsShapeFloat 2.5s ease-in-out ${d.delay} infinite`,
          transform: 'translate(-50%,-50%)',
        }} />
      ))}
    </div>
  )
}

/* ── Hero Phone Showcase (right side) ── */
function HeroPhoneShowcase() {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5, lx: 0, ly: 0 })
  const [entered, setEntered] = useState(false)
  const [screenGlow, setScreenGlow] = useState(false)
  const [hoveringPhone, setHoveringPhone] = useState(false)
  const [hoveredCardIdx, setHoveredCardIdx] = useState(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const handle = (e) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      setMouse({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
        lx: e.clientX - (rect.left + rect.width / 2),
        ly: e.clientY - (rect.top + rect.height / 2)
      })
    }
    window.addEventListener('mousemove', handle)
    return () => window.removeEventListener('mousemove', handle)
  }, [])

  useEffect(() => {
    const t1 = setTimeout(() => setScreenGlow(true), 200)
    const t2 = setTimeout(() => setEntered(true), 400)
    const t3 = setTimeout(() => setScreenGlow(false), 950)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  const cards = [
    { name: 'Easy Create',  accent: '#22d3ee', bg: 'linear-gradient(145deg,#050e1f,#0a1930)', glow: 'radial-gradient(circle at 70% 30%,rgba(34,211,238,0.4),transparent 60%)',  bx: -162, by: -80,  rot: -22, fx: -30, fy: -18, swayDur: '5.5s', swayDelay: '0s'   },
    { name: 'Modern Dark',  accent: '#6366f1', bg: 'linear-gradient(145deg,#0c0f20,#111827)', glow: 'radial-gradient(circle at 30% 70%,rgba(99,102,241,0.4),transparent 60%)',   bx: -95,  by: -172, rot: -11, fx: -18, fy: 20,  swayDur: '6.2s', swayDelay: '0.7s' },
    { name: 'Creative Pro', accent: '#8b5cf6', bg: 'linear-gradient(145deg,#0c0a1a,#14102a)', glow: 'radial-gradient(circle at 60% 40%,rgba(139,92,246,0.4),transparent 60%)',   bx: 6,    by: -202, rot: 0,   fx: 10,  fy: -22, swayDur: '4.8s', swayDelay: '1.3s' },
    { name: 'Minimal Pro',  accent: '#14b8a6', bg: 'linear-gradient(145deg,#061414,#0a1818)', glow: 'radial-gradient(circle at 55% 55%,rgba(20,184,166,0.4),transparent 60%)',   bx: 108,  by: -166, rot: 11,  fx: 22,  fy: 18,  swayDur: '7.1s', swayDelay: '0.4s' },
    { name: 'Bold Black',   accent: '#f59e0b', bg: 'linear-gradient(145deg,#1a0d00,#140a00)', glow: 'radial-gradient(circle at 40% 60%,rgba(245,158,11,0.34),transparent 60%)',   bx: 168,  by: -74,  rot: 22,  fx: 28,  fy: -16, swayDur: '5.8s', swayDelay: '1.0s' },
  ]

  return (
    <div ref={containerRef} style={{ position: 'relative', width: 460, height: 560, flexShrink: 0 }}>

      {/* Ambient glow */}
      <div style={{
        position: 'absolute', bottom: 60, left: '50%', transform: 'translateX(-50%)',
        width: 260, height: 260, borderRadius: '50%',
        background: 'radial-gradient(circle,rgba(34,211,238,0.12),transparent)',
        filter: 'blur(55px)', pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Cards render BEFORE phone so phone stays on top */}
      {cards.map((card, i) => {
        const enterDelay = `${i * 0.13}s`
        
        let tx = card.bx
        let ty = card.by
        let rot = card.rot
        let scale = 1
        let zIndex = i === 2 ? 8 : (i === 1 || i === 3) ? 6 : 4

        // If hovering phone, cards stack nicely on top of the phone screen
        let opacity = entered ? 1 : 0
        if (hoveringPhone) {
          tx = 0
          ty = (i - 2) * 15 + 20 // Stacked vertically in the screen area
          rot = 0
          scale = 0.45
          opacity = 1
          zIndex = 40 // High z-index to stay on top of phone (which is 10)
        } 
        // If hovering this specific card, push it away
        else if (hoveredCardIdx === i) {
          tx += tx > 0 ? 40 : -40
          ty -= 40
          scale = 1.15
          rot *= 1.5
          zIndex = 50
        }

        const mx = (hoveringPhone || hoveredCardIdx === i) ? 0 : (mouse.x - 0.5) * card.fx
        const my = (hoveringPhone || hoveredCardIdx === i) ? 0 : (mouse.y - 0.5) * card.fy

        return (
          <div 
            key={i} 
            onMouseEnter={() => setHoveredCardIdx(i)}
            onMouseLeave={() => setHoveredCardIdx(null)}
            style={{
              position: 'absolute', bottom: 160, left: '50%',
              transform: entered
                ? `translateX(calc(-50% + ${tx}px)) translateY(${ty}px) rotate(${rot}deg) scale(${scale})`
                : `translateX(-50%) translateY(0px) rotate(0deg) scale(0.05)`,
              opacity: opacity,
              transition: entered
                ? `transform ${hoveringPhone ? '0.6s' : '0.8s'} cubic-bezier(0.34, 1.56, 0.64, 1), opacity ${hoveringPhone ? '0.4s' : '0.25s'} ease`
                : 'none',
              zIndex: zIndex,
              cursor: 'pointer'
            }}
          >
            <div style={{ transform: `translate(${mx}px,${my}px)`, transition: 'transform 0.5s ease' }}>
              <div style={{
                width: 128, borderRadius: 12, overflow: 'hidden',
                border: `1.5px solid ${card.accent}${hoveredCardIdx === i ? '' : '44'}`,
                boxShadow: hoveredCardIdx === i 
                  ? `0 25px 60px rgba(0,0,0,0.8), 0 0 30px ${card.accent}44`
                  : `0 14px 38px rgba(0,0,0,0.65), 0 0 20px ${card.accent}1e`,
                animation: `sway${i} ${card.swayDur} ease-in-out ${card.swayDelay} infinite`,
                transition: 'border 0.3s, box-shadow 0.3s'
              }}>
                <div style={{ height:80, position:'relative', overflow:'hidden', background:card.bg }}>
                  <div style={{ position:'absolute', inset:0, background:card.glow }} />
                  <div style={{ padding:'7px 9px' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:4, marginBottom:5 }}>
                      <div style={{ width:13, height:13, borderRadius:'50%', background:`linear-gradient(135deg,${card.accent},${card.accent}88)`, flexShrink:0 }} />
                      <div style={{ height:2.5, width:28, borderRadius:2, background:'rgba(255,255,255,0.45)' }} />
                    </div>
                    <div style={{ height:2.5, borderRadius:2, background:'rgba(255,255,255,0.18)', marginBottom:2.5 }} />
                    <div style={{ height:2.5, width:'65%', borderRadius:2, background:'rgba(255,255,255,0.1)', marginBottom:5 }} />
                    <div style={{ display:'flex', gap:2.5 }}>
                      {[1,2,3].map(j => (
                        <div key={j} style={{ height:15, flex:1, borderRadius:4, background:`${card.accent}${j===1?'25':'12'}`, border:`1px solid ${card.accent}2a` }} />
                      ))}
                    </div>
                  </div>
                  <div style={{ position:'absolute', bottom:0, left:0, right:0, height:2.5, background:`linear-gradient(90deg,${card.accent},${card.accent}44)` }} />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.05) 50%,transparent 60%)', animation:'shimmer 4s ease-in-out infinite' }} />
                </div>
                <div style={{
                  padding:'5px 9px', background:'rgba(4,8,18,0.97)',
                  borderTop:`1px solid ${card.accent}20`,
                  display:'flex', alignItems:'center', justifyContent:'space-between',
                }}>
                  <span style={{ color:'rgba(255,255,255,0.92)', fontSize:9, fontWeight:700, letterSpacing:'0.02em' }}>{card.name}</span>
                  <div style={{ width:7, height:7, borderRadius:'50%', background:card.accent, boxShadow:`0 0 5px ${card.accent}` }} />
                </div>
              </div>
            </div>
          </div>
        )
      })}

      {/* Decorative dots */}
      {[
        { bx: -190, by: -30,  color: '#22d3ee', s: 5, delay: '0s',   enterDelay: '0.85s' },
        { bx: -60,  by: -220, color: '#6366f1', s: 4, delay: '0.8s', enterDelay: '1.05s' },
        { bx: 190,  by: -20,  color: '#f59e0b', s: 5, delay: '1.4s', enterDelay: '1.25s' },
        { bx: 60,   by: -230, color: '#8b5cf6', s: 3, delay: '0.4s', enterDelay: '1.15s' },
      ].map((d, i) => (
        <div key={i} style={{
          position: 'absolute', bottom: 160, left: '50%',
          transform: `translate(calc(-50% + ${entered ? d.bx + (mouse.x - 0.5) * 14 : 0}px), ${entered ? d.by + (mouse.y - 0.5) * 10 : 0}px)`,
          opacity: entered ? 0.8 : 0,
          transition: `transform 0.5s ease ${d.enterDelay}, opacity 0.4s ease ${d.enterDelay}`,
          width: d.s, height: d.s, borderRadius: '50%',
          background: d.color, boxShadow: `0 0 8px ${d.color}`,
          animation: `orbPulse 3s ease-in-out ${d.delay} infinite`,
          zIndex: 3,
        }} />
      ))}

      {/* Phone body sits on top */}
      <div 
        onMouseEnter={() => setHoveringPhone(true)}
        onMouseLeave={() => setHoveringPhone(false)}
        style={{
          position: 'absolute', bottom: 28, left: '50%',
          transform: `translateX(-50%) translateY(${(mouse.y - 0.5) * -10}px)`,
          transition: 'transform 0.7s ease',
          zIndex: 10, width: 150,
        }}
      >
        <div style={{
          width: 150, height: 295,
          borderRadius: 28,
          background: 'linear-gradient(155deg,#1b2840,#0d1526)',
          border: '2px solid rgba(34,211,238,0.38)',
          boxShadow: '0 0 55px rgba(34,211,238,0.22),0 30px 80px rgba(0,0,0,0.85),inset 0 1px 0 rgba(255,255,255,0.1)',
          position: 'relative', overflow: 'hidden',
          cursor: 'pointer'
        }}>
          <div style={{
            position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
            width: 46, height: 12, borderRadius: 6,
            background: '#030810', zIndex: 3,
          }} />
          <div style={{ padding: '32px 10px 10px', height: '100%' }}>
            <div style={{
              background: 'linear-gradient(145deg,#060d1c,#030910)',
              borderRadius: 16, height: '100%', padding: 8, overflow: 'hidden',
              border: '1px solid rgba(34,211,238,0.08)',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute', inset: 0, borderRadius: 16, zIndex: 20, pointerEvents: 'none',
                background: 'radial-gradient(circle, rgba(34,211,238,0.95), rgba(200,240,255,0.8))',
                opacity: (screenGlow || hoveringPhone) ? 1 : 0,
                transition: (screenGlow || hoveringPhone) ? 'opacity 0.25s ease' : 'opacity 0.55s ease',
              }} />
              <div style={{ display:'flex', alignItems:'center', gap:5, marginBottom:6 }}>
                <div style={{ width:17, height:17, borderRadius:'50%', background:'linear-gradient(135deg,#22d3ee,#6366f1)', flexShrink:0 }} />
                <div>
                  <div style={{ height:3, width:36, borderRadius:2, background:'rgba(255,255,255,0.5)', marginBottom:2 }} />
                  <div style={{ height:2.5, width:24, borderRadius:2, background:'rgba(34,211,238,0.6)' }} />
                </div>
              </div>
              {[100,78,58].map((w,j) => (
                <div key={j} style={{ height:2.5, width:`${w}%`, borderRadius:2, background:'rgba(255,255,255,0.1)', marginBottom:3 }} />
              ))}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:3, marginTop:4 }}>
                {[0,1,2,3].map(j => (
                  <div key={j} style={{
                    height:26, borderRadius:5,
                    background:`rgba(${j<2?'34,211,238':'99,102,241'},0.1)`,
                    border:`1px solid rgba(${j<2?'34,211,238':'99,102,241'},0.17)`,
                  }} />
                ))}
              </div>
              <div style={{ marginTop:5, height:15, borderRadius:5, background:'linear-gradient(90deg,rgba(34,211,238,0.25),rgba(14,165,233,0.14))' }} />
            </div>
          </div>
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(255,255,255,0.06) 0%,transparent 50%)', pointerEvents:'none' }} />
        </div>
        <div style={{ width:46, height:4, borderRadius:2, background:'rgba(255,255,255,0.2)', margin:'7px auto 0' }} />
      </div>

    </div>
  )
}


/* ══════════════════════════════════════════
   DATA
   ══════════════════════════════════════════ */
const features = [
  { icon: Zap,    title: 'AI Content Generation', desc: 'Our AI suggests professional bio and project descriptions based on your skills and experience.', gradient: 'linear-gradient(135deg,#22d3ee,#0ea5e9)', glow: 'rgba(34,211,238,0.3)', bgImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800' },
  { icon: Palette, title: 'Stunning Templates',  desc: 'Choose from 15+ professionally designed templates that make you stand out.', gradient: 'linear-gradient(135deg,#6366f1,#8b5cf6)', glow: 'rgba(99,102,241,0.3)', bgImage: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800' },
  { icon: Globe,  title: 'Instant Deployment',   desc: 'Publish your portfolio with one click and share it anywhere with a custom link.', gradient: 'linear-gradient(135deg,#14b8a6,#22d3ee)', glow: 'rgba(20,184,166,0.3)', bgImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800' },
  { icon: Shield, title: 'Always Up-to-Date',    desc: 'Edit your portfolio anytime. Changes go live instantly without any re-deployment.', gradient: 'linear-gradient(135deg,#f59e0b,#ef4444)', glow: 'rgba(245,158,11,0.3)', bgImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800' },
  { icon: Code2,  title: 'No Coding Needed',     desc: 'Built for everyone. Zero technical skills required to create a pro portfolio.', gradient: 'linear-gradient(135deg,#ec4899,#8b5cf6)', glow: 'rgba(236,72,153,0.3)', bgImage: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&q=80&w=800' },
  { icon: Star,   title: 'SEO Optimized',        desc: 'Your portfolio ranks on Google. Built-in SEO so recruiters can find you easily.', gradient: 'linear-gradient(135deg,#22d3ee,#6366f1)', glow: 'rgba(34,211,238,0.3)', bgImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800' },
]

const templates = [
  { name: 'Brown & Cream',     tag: 'Classic',  accent: '#7B5B3A', image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=800' },
  { name: 'Neural Circuit',    tag: 'Exclusive',accent: '#00d4ff', image: 'https://images.unsplash.com/photo-1614850553906-8d14a51f4968?auto=format&fit=crop&q=80&w=800' },
  { name: 'Creative Gradient', tag: 'Popular',  accent: '#c4a0d0', image: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=800' },
  { name: 'Dark Minimal',      tag: 'Impact',   accent: '#F0EEE8', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800' },
]

const TEMPLATE_DURATIONS = ['4.2s', '5.1s', '3.8s', '4.7s']
const TEMPLATE_DELAYS    = ['0s', '0.7s', '1.3s', '0.4s']

/* ══════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════ */
export default function HomePage() {
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(1)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = windowWidth < 1024
  const isXS = windowWidth < 400

  useEffect(() => {
    const interval = setInterval(() => setActiveStep(s => s === 3 ? 1 : s + 1), 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex min-h-screen bg-[#060d1a]" style={{ 
      backgroundImage: 'url("/images/bg_main.png")',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center'
    }}>
      <div className="fixed inset-0 bg-[#060d1a]/85 backdrop-blur-[2px] pointer-events-none" />
      <ParticleBackground />
      <FloatingIconsBackground />
      <style>{`
        @keyframes float3d {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-18px); }
        }
        @keyframes spin        { from { transform: translate(-50%,-50%) rotate(0deg); }   to { transform: translate(-50%,-50%) rotate(360deg); } }
        @keyframes spinReverse { from { transform: translate(-50%,-50%) rotate(0deg); }   to { transform: translate(-50%,-50%) rotate(-360deg); } }
        @keyframes counterUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes gradientShift {
          0%,100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }
        @keyframes orbPulse {
          0%,100% { opacity: 0.4; }
          50%      { opacity: 1; }
        }
        @keyframes templateFloat {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-10px); }
        }
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          60%  { transform: translateX(200%); }
          100% { transform: translateX(200%); }
        }
        @keyframes orbsShapeFloat {
          0%,100% { opacity: 0.5; transform: translate(-50%,-50%) scale(1) rotate(0deg); }
          33%     { opacity: 0.75; transform: translate(-50%,-50%) scale(1.18) rotate(8deg); }
          66%     { opacity: 0.4; transform: translate(-50%,-50%) scale(0.88) rotate(-5deg); }
        }
        @keyframes sway0 { 0%,100%{transform:translate(0px,0px) rotate(-0.8deg)} 30%{transform:translate(5px,-18px) rotate(1.2deg)} 65%{transform:translate(-3px,-8px) rotate(-0.3deg)} }
        @keyframes sway1 { 0%,100%{transform:translate(0px,0px) rotate(0.6deg)} 35%{transform:translate(-6px,-14px) rotate(-1deg)} 70%{transform:translate(3px,-6px) rotate(0.4deg)} }
        @keyframes sway2 { 0%,100%{transform:translate(0px,0px) rotate(-0.4deg)} 40%{transform:translate(3px,-20px) rotate(0.8deg)} 75%{transform:translate(-4px,-9px) rotate(-0.5deg)} }
        @keyframes sway3 { 0%,100%{transform:translate(0px,0px) rotate(0.9deg)} 25%{transform:translate(-4px,-13px) rotate(-1.1deg)} 60%{transform:translate(5px,-7px) rotate(0.2deg)} }
        @keyframes sway4 { 0%,100%{transform:translate(0px,0px) rotate(-0.7deg)} 45%{transform:translate(-5px,-16px) rotate(1deg)} 80%{transform:translate(3px,-5px) rotate(-0.3deg)} }
      `}</style>

      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <div className="flex-1 lg:ml-64 overflow-y-auto relative custom-scrollbar" style={{ zIndex: 1 }}>

        {/* Mobile menu toggle */}
        <div className="lg:hidden sticky top-0 z-[100] flex items-center justify-between p-4 bg-[#060d1a]/80 backdrop-blur-lg border-b border-white/5">
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

        {/* ══════════════ HERO SECTION ══════════════ */}
        <section className="relative min-h-[75vh] flex flex-col lg:flex-row items-center justify-center lg:justify-start px-4 sm:px-12 lg:px-20 py-10 sm:py-16 lg:py-14 overflow-hidden gap-10 lg:gap-20">
          <div style={{ position:'absolute', inset:0, pointerEvents:'none', overflow:'hidden' }}>
            <div style={{ position:'absolute', right:'35%', top:'35%', width:280, height:280, background:'radial-gradient(circle, rgba(99,102,241,0.07), transparent)', filter:'blur(80px)' }} />
            <div style={{ position:'absolute', left:'260px', top:'40%', width:200, height:200, background:'radial-gradient(circle, rgba(34,211,238,0.05), transparent)', filter:'blur(60px)' }} />
          </div>

          <MouseOrbs isMobile={isMobile} />

          <div style={{ flex:1, position:'relative', zIndex:10, maxWidth:520 }} className="text-center lg:text-left">
            <div style={{
              display:'inline-flex', alignItems:'center', gap:8,
              padding:'6px 16px', borderRadius:9999, marginBottom:20,
              background:'rgba(34,211,238,0.08)',
              border:'1px solid rgba(34,211,238,0.28)',
            }}>
              <div style={{ width:8, height:8, borderRadius:'50%', background:'#22d3ee', animation:'pulse 2s ease-in-out infinite' }} />
              <span className="text-cyan-400 text-xs sm:text-sm font-medium">AI-Powered · Free to Start</span>
            </div>

            <h1 className="text-2xl xs:text-3xl sm:text-5xl lg:text-7xl font-black leading-[1.1] mb-6 tracking-tight">
              <span className="block text-white">Build Your</span>
              <span style={{
                display:'block',
                background:'linear-gradient(135deg,#22d3ee,#0ea5e9,#6366f1)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
                backgroundClip:'text', backgroundSize:'200% 200%',
                animation:'gradientShift 4s ease infinite',
                filter:'drop-shadow(0 0 15px rgba(34,211,238,0.25))',
              }}>Dream Portfolio.</span>
              <span className="block text-white">Get Hired Fast.</span>
            </h1>

            <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8">
              Craft your professional journey and watch as we create a{' '}
              <span style={{ color:'#22d3ee', fontWeight:500 }}>stunning portfolio website</span>{' '}
              that gets you hired faster.
            </p>

            <div className="flex items-center justify-center lg:justify-start gap-4 mb-9">
              <button
                onClick={() => navigate('/dashboard')}
                className="btn-primary w-full sm:w-auto"
              >
                <Sparkles size={18} />
                Get Started Free
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-4 mt-8">
              {[['50K+','Portfolios'], ['4.9★','Rating'], ['2 min','Setup']].map(([v, l]) => (
                <div key={l} className="text-center lg:text-left">
                  <div className="text-white font-black text-2xl sm:text-3xl tracking-tight">{v}</div>
                  <div className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <HeroPhoneShowcase />
          </div>
        </section>

        {/* ══════════════ FEATURES SECTION ══════════════ */}
        <section className="px-3 sm:px-12 py-10 sm:py-12">
          <div className="text-center mb-10 sm:mb-14 px-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
              style={{ background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.2)' }}>
              <Zap size={13} className="text-cyan-400" />
              <span className="text-cyan-400 text-xs font-semibold uppercase tracking-wider">Powerful Features</span>
            </div>
            <h2 className="text-white text-2xl sm:text-4xl font-black mb-3">Everything You Need</h2>
            <p className="text-gray-400 max-w-lg mx-auto">Tools designed to make your portfolio stand out</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {features.map((f, i) => <FeatureCard key={i} {...f} />)}
          </div>
        </section>

        {/* ══════════════ HOW IT WORKS ══════════════ */}
        <section className="px-3 sm:px-12 py-10 sm:py-12">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
                style={{ background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.2)' }}>
                <span className="text-cyan-400 text-xs font-semibold uppercase tracking-wider">How It Works</span>
              </div>
              <h2 className="text-white text-2xl sm:text-4xl font-black mb-10">3 Simple Steps<br/>to Your Portfolio</h2>
              <StepCard num={1} title="Craft Your Details" desc="Enter your skills, experience, and projects in our intuitive editor. Get real-time AI suggestions." active={activeStep === 1} />
              <StepCard num={2} title="Choose a Template" desc="Browse our collection of stunning templates and pick the one that matches your style." active={activeStep === 2} />
              <StepCard num={3} title="Publish & Share" desc="Go live with one click. Share your portfolio URL with recruiters and land your dream job." active={activeStep === 3} />
            </div>

            <div className="relative flex justify-center items-center lg:h-auto min-h-[300px]">
              {/* Glow effects behind the image */}
              <div className="absolute inset-x-0 bottom-0 h-40 bg-cyan-500/10 blur-[60px] rounded-full" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-30"
                style={{ background: 'radial-gradient(circle, #6366f1, transparent)', filter: 'blur(40px)' }} />

              <div className="relative z-10 animate-float w-full max-w-sm lg:max-w-md">
                {/* Premium Image Container */}
                <div 
                  className="rounded-3xl overflow-hidden p-2 shadow-2xl shadow-cyan-500/10 group"
                  style={{
                    background: 'rgba(13,21,38,0.7)',
                    border: '1px solid rgba(34,211,238,0.2)',
                    backdropFilter: 'blur(20px)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <img 
                    src="/images/portfolio_mockup.png" 
                    alt="Portfolio Preview"
                    className="w-full h-auto rounded-2xl border border-white/5 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Floating Badges */}
                <div className="absolute -top-6 -right-4 lg:-right-10 px-4 py-2 rounded-xl text-xs font-bold text-white shadow-xl shadow-cyan-500/20"
                  style={{ 
                    background: 'linear-gradient(135deg,#22d3ee,#0ea5e9)', 
                    animation: 'float3d 3.5s ease-in-out infinite', 
                    animationDelay: '0.2s',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}>
                  <div className="flex items-center gap-1.5"><Sparkles size={14}/> AI Generated</div>
                </div>

                <div className="absolute -bottom-4 -left-4 lg:-left-8 px-4 py-2 rounded-xl text-xs font-bold shadow-xl shadow-indigo-500/20"
                  style={{ 
                    background: 'rgba(13,21,38,0.9)', 
                    border: '1px solid rgba(99,102,241,0.5)', 
                    color: '#a78bfa', 
                    backdropFilter: 'blur(10px)',
                    animation: 'float3d 4.2s ease-in-out infinite', 
                    animationDelay: '1.5s' 
                  }}>
                  🚀 Live in 2 mins
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════ TEMPLATES SECTION ══════════════ */}
        <section className="px-3 sm:px-12 py-10 sm:py-12">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10 sm:mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
                style={{ background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.2)' }}>
                <Palette size={13} className="text-cyan-400" />
                <span className="text-cyan-400 text-xs font-semibold uppercase tracking-wider">Templates</span>
              </div>
              <h2 className="text-white text-2xl sm:text-4xl font-black mb-3">Pick Your Style</h2>
              <p className="text-gray-400">15+ handcrafted templates. All fully customizable.</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {templates.map((t, i) => (
                <div
                  key={i}
                  style={{
                    animation: `templateFloat ${TEMPLATE_DURATIONS[i]} ease-in-out ${TEMPLATE_DELAYS[i]} infinite`,
                  }}
                >
                  <TemplateCard {...t} onClick={() => navigate('/templates')} />
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <button onClick={() => navigate('/templates')} className="group inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-all">
                View all templates
                <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </section>

        {/* ══════════════ CTA SECTION ══════════════ */}
        <section className="px-3 py-10 sm:py-12 overflow-hidden relative">
          <div className="max-w-4xl mx-auto">
            <TiltCard
              className="relative overflow-hidden rounded-[1.5rem] sm:rounded-[3rem] px-3 sm:px-12 py-10 sm:py-20 text-center w-full group"
              style={{
                background: 'rgba(13,21,38,0.7)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(30px)'
              }}
            >
              <div 
                className="absolute inset-0 z-0 opacity-40 transition-transform duration-[2s] ease-out group-hover:scale-110"
                style={{
                  backgroundImage: 'url("/images/cta_bg.png")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#060d1a] via-transparent to-[#060d1a]/60" />

              <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full opacity-20"
                style={{ background: 'radial-gradient(circle,#22d3ee,transparent)', filter: 'blur(30px)' }} />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full opacity-20"
                style={{ background: 'radial-gradient(circle,#6366f1,transparent)', filter: 'blur(30px)' }} />
              
              <div className="relative z-10">
                <div className="w-12 h-12 xs:w-16 xs:h-16 sm:w-20 sm:h-20 rounded-[1.1rem] sm:rounded-[1.5rem] mx-auto mb-6 sm:mb-8 flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg,#22d3ee,#0ea5e9)', boxShadow: '0 0 30px rgba(34,211,238,0.3)' }}>
                  <Sparkles size={isXS ? 24 : 28} className="text-white" />
                </div>
                <h2 className="text-white text-xl xs:text-2xl sm:text-4xl lg:text-6xl font-black mb-4 sm:mb-6 italic tracking-tight uppercase leading-tight break-words">Ready to Shine?</h2>
                <p className="text-gray-200 text-[13px] xs:text-sm sm:text-base mb-8 sm:mb-10 w-full max-w-[240px] xs:max-w-sm mx-auto leading-relaxed px-2">
                  Join 50,000+ top professionals who already built their dream portfolio with <span className="text-cyan-400 font-bold">PortfolioMaker</span>
                </p>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="group flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-black text-white transition-all duration-300 hover:scale-105 active:scale-95"
                  style={{ 
                    margin: '0 auto',
                    background: 'linear-gradient(135deg,#22d3ee,#6366f1)',
                    boxShadow: '0 10px 30px rgba(34,211,238,0.3)'
                  }}
                >
                  <Sparkles size={18} />
                  Start Your Journey
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </TiltCard>
          </div>
        </section>

        <footer className="px-6 py-10 sm:px-20 border-t border-white/5 bg-[#0d1526]/30 backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
          
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-20">
            {/* Logo and About */}
            <div className="col-span-1 lg:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                  <Sparkles size={20} className="text-white" />
                </div>
                <span className="text-white text-xl font-black tracking-tighter">PortfolioMaker<span className="text-cyan-400">.</span></span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                The AI-powered portfolio builder designed for the next generation of top talent. Create and publish in minutes.
              </p>
              <div className="flex gap-4">
                {[
                  { Icon: Twitter,  url: 'https://twitter.com' },
                  { Icon: Linkedin, url: 'https://linkedin.com' },
                  { Icon: Github,   url: 'https://github.com' },
                  { Icon: Globe,    url: 'https://portfoliomaker.com' }
                ].map((social, idx) => (
                  <a key={idx} href={social.url} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-400/30 hover:bg-cyan-400/5 transition-all">
                    <social.Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Product</h4>
              <ul className="space-y-4">
                {[
                  { label: 'Templates', path: '/templates' },
                  { label: 'AI Tools', path: '/ai-tools' },
                  { label: 'Live Preview', path: '/craft/preview' }
                ].map(link => (
                  <li key={link.label}>
                    <button onClick={() => navigate(link.path)} className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2">
                       {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Company</h4>
              <ul className="space-y-4 text-sm">
                <li><button onClick={() => navigate('/content/about')} className="text-gray-400 hover:text-white transition-colors">About Us</button></li>
                <li><button onClick={() => navigate('/content/careers')} className="text-gray-400 hover:text-white transition-colors">Careers</button></li>
                <li><button onClick={() => navigate('/content/privacy')} className="text-gray-400 hover:text-white transition-colors">Privacy Policy</button></li>
                <li><button onClick={() => navigate('/content/terms')} className="text-gray-400 hover:text-white transition-colors">Terms of Service</button></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Support</h4>
              <ul className="space-y-4 text-sm">
                <li><button onClick={() => navigate('/content/help')} className="text-gray-400 hover:text-white transition-colors">Help Center</button></li>
                <li><button onClick={() => navigate('/content/docs')} className="text-gray-400 hover:text-white transition-colors">Documentation</button></li>
                <li><button onClick={() => navigate('/content/community')} className="text-gray-400 hover:text-white transition-colors">Community</button></li>
                <li><button onClick={() => navigate('/refer-earn')} className="text-cyan-400 hover:underline font-medium">Refer & Earn</button></li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-xs">© 2026 PortfolioMaker. Built with precision and AI magic.</p>
            <div className="flex items-center gap-2 text-gray-700 text-xs">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              All Systems Operational
            </div>
          </div>
        </footer>

      </div>
    </div>
  )
}
