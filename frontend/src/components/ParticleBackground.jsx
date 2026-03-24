import React, { useMemo, useRef, useEffect } from 'react'

/* ── Office / Creative icon paths (24x24 viewBox) ── */
const ICONS = [
  /* Briefcase */   'M20 7H4v13h16V7zM4 7V5a2 2 0 012-2h4l2 2h6a2 2 0 012 2v2M9 13h6',
  /* Pencil */      'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z',
  /* Document */    'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  /* Laptop */      'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  /* Star */        'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
  /* Magnifier */   'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
  /* Lightbulb */   'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  /* Folder */      'M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z',
  /* Code */        'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
  /* Chart Bar */   'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  /* Bookmark */    'M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z',
  /* Ruler */       'M9 7H7a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-2M9 7l7-7 5 5-7 7H9V7zM7.5 12.5l2 2',
  /* Zap */         'M13 10V3L4 14h7v7l9-11h-7z',
  /* Layers */      'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  /* Calendar */    'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  /* Clock */       'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  /* Mail */        'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  /* Book */        'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  /* Bag */         'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
  /* Tag */         'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z',
  /* Paper Plane */ 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8',
  /* Pin */         'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z',
  /* Grid */        'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z',
  /* Palette */     'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01',
  /* Trophy */      'M8 21l4-4 4 4M12 17V3M7 7H5a2 2 0 00-2 2v2a5 5 0 005 5h8a5 5 0 005-5V9a2 2 0 00-2-2h-2',
]

const COLORS = [
  'rgba(34,211,238,IDX)',
  'rgba(99,102,241,IDX)',
  'rgba(139,92,246,IDX)',
  'rgba(20,184,166,IDX)',
  'rgba(59,130,246,IDX)',
  'rgba(236,72,153,IDX)',
  'rgba(251,191,36,IDX)',
]

export default function ParticleBackground() {
  const icons = useMemo(() => {
    return Array.from({ length: 70 }, (_, i) => {
      const colorTemplate = COLORS[i % COLORS.length]
      const opacity = (Math.random() * 0.24 + 0.08).toFixed(2)
      const color = colorTemplate.replace('IDX', opacity)
      const strokeOpacity = Math.min(parseFloat(opacity) * 2.8, 0.85).toFixed(2)
      const strokeColor = colorTemplate.replace('IDX', strokeOpacity)
      const animVariant = ['iconFloat', 'iconFloat2', 'iconFloat3'][i % 3]
      return {
        id: i,
        iconPath: ICONS[i % ICONS.length],
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.floor(Math.random() * 24 + 11),
        duration: (Math.random() * 13 + 7).toFixed(1),
        delay: (Math.random() * 10).toFixed(1),
        drift: (Math.random() * 34 - 17).toFixed(1),
        driftY: (Math.random() * 34 - 17).toFixed(1),
        rotate: Math.floor(Math.random() * 60 - 30),
        color,
        strokeColor,
        animVariant,
      }
    })
  }, [])

  /* ── Mouse repel refs ── */
  const wrapperRefs = useRef([])
  const mouseRef   = useRef({ x: -9999, y: -9999 })
  const posRef     = useRef(icons.map(() => ({ x: 0, y: 0 })))
  const rafRef     = useRef()

  useEffect(() => {
    const RADIUS   = 160   // px radius of repel field
    const STRENGTH = 100   // max repel distance in px
    const LF_IN    = 0.13  // lerp factor when repelling (fast)
    const LF_OUT   = 0.07  // lerp factor when returning (slow, smooth)

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMouseMove)

    const tick = () => {
      const { x: mx, y: my } = mouseRef.current
      const W = window.innerWidth
      const H = window.innerHeight

      wrapperRefs.current.forEach((el, i) => {
        if (!el || !icons[i]) return
        const ic = icons[i]

        /* Approximate icon centre using its % position (background is fixed) */
        const icX = (ic.x / 100) * W
        const icY = (ic.y / 100) * H
        const dx  = icX - mx
        const dy  = icY - my
        const dist = Math.sqrt(dx * dx + dy * dy)

        let targetX = 0, targetY = 0
        if (dist < RADIUS && dist > 1) {
          const force = Math.pow((RADIUS - dist) / RADIUS, 1.3)
          targetX = (dx / dist) * force * STRENGTH
          targetY = (dy / dist) * force * STRENGTH
        }

        const pos = posRef.current[i]
        const lf  = (targetX !== 0 || targetY !== 0) ? LF_IN : LF_OUT
        pos.x += (targetX - pos.x) * lf
        pos.y += (targetY - pos.y) * lf

        if (Math.abs(pos.x) > 0.05 || Math.abs(pos.y) > 0.05) {
          el.style.transform = `translate(${pos.x.toFixed(1)}px,${pos.y.toFixed(1)}px)`
        } else if (pos.x !== 0 || pos.y !== 0) {
          el.style.transform = ''
          pos.x = 0
          pos.y = 0
        }
      })

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [icons])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      <style>{`
        @keyframes iconFloat {
          0%   { transform: translate(0,0) rotate(var(--r0)); opacity: var(--op0); }
          25%  { transform: translate(var(--dx), calc(var(--dy)*-0.8)) rotate(calc(var(--r0) + 10deg)); opacity: var(--op1); }
          50%  { transform: translate(calc(var(--dx)*1.4), calc(var(--dy)*-1.2)) rotate(calc(var(--r0) + 5deg)); opacity: var(--op0); }
          75%  { transform: translate(calc(var(--dx)*-0.5), var(--dy)) rotate(calc(var(--r0) - 8deg)); opacity: var(--op1); }
          100% { transform: translate(0,0) rotate(var(--r0)); opacity: var(--op0); }
        }
        @keyframes iconFloat2 {
          0%   { transform: translate(0,0) rotate(var(--r0)) scale(1); opacity: var(--op0); }
          33%  { transform: translate(calc(var(--dx)*-1.1), var(--dy)) rotate(calc(var(--r0) - 14deg)) scale(1.1); opacity: var(--op1); }
          66%  { transform: translate(var(--dx), calc(var(--dy)*-0.9)) rotate(calc(var(--r0) + 7deg)) scale(0.92); opacity: var(--op0); }
          100% { transform: translate(0,0) rotate(var(--r0)) scale(1); opacity: var(--op0); }
        }
        @keyframes iconFloat3 {
          0%   { transform: translate(0,0) rotate(var(--r0)); opacity: var(--op0); }
          20%  { transform: translate(calc(var(--dx)*0.6), calc(var(--dy)*-1.5)) rotate(calc(var(--r0) + 18deg)); opacity: var(--op1); }
          50%  { transform: translate(var(--dx), 0) rotate(calc(var(--r0) - 4deg)); opacity: var(--op0); }
          75%  { transform: translate(calc(var(--dx)*-0.8), var(--dy)) rotate(calc(var(--r0) + 9deg)); opacity: var(--op1); }
          100% { transform: translate(0,0) rotate(var(--r0)); opacity: var(--op0); }
        }
        @keyframes orbPulse {
          0%,100% { opacity: 0.09; transform: scale(1); }
          50%      { opacity: 0.19; transform: scale(1.12); }
        }
        @keyframes orbDrift {
          0%,100% { transform: translate(0,0) scale(1); opacity: 0.11; }
          50%      { transform: translate(24px,-18px) scale(1.1); opacity: 0.19; }
        }
      `}</style>

      {/* Deep gradient background */}
      <div className="absolute inset-0" style={{
        background: [
          'radial-gradient(ellipse at 15% 50%, rgba(6,182,212,0.1) 0%, transparent 50%)',
          'radial-gradient(ellipse at 85% 20%, rgba(99,102,241,0.1) 0%, transparent 50%)',
          'radial-gradient(ellipse at 50% 100%, rgba(20,184,166,0.07) 0%, transparent 50%)',
          'radial-gradient(ellipse at 70% 80%, rgba(236,72,153,0.05) 0%, transparent 40%)',
          'linear-gradient(135deg,#060d1a 0%,#0a0f1e 50%,#050810 100%)',
        ].join(', ')
      }} />

      {/* Subtle grid */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'linear-gradient(rgba(34,211,238,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,0.025) 1px,transparent 1px)',
        backgroundSize: '80px 80px',
        opacity: 0.7,
      }} />

      {/* ── Floating Icons (two-layer: wrapper=repel, child=float anim) ── */}
      {icons.map((ic, i) => (
        <div
          key={ic.id}
          ref={el => { wrapperRefs.current[i] = el }}
          style={{ position: 'absolute', left: `${ic.x}%`, top: `${ic.y}%` }}
        >
          <div style={{
            width: ic.size,
            height: ic.size,
            '--r0': `${ic.rotate}deg`,
            '--dx': `${ic.drift}px`,
            '--dy': `${ic.driftY}px`,
            '--op0': 1,
            '--op1': 0.42,
            animation: `${ic.animVariant} ${ic.duration}s ease-in-out ${ic.delay}s infinite`,
            filter: `drop-shadow(0 0 5px ${ic.strokeColor})`,
          }}>
            <svg
              width={ic.size} height={ic.size}
              viewBox="0 0 24 24" fill="none"
              stroke={ic.strokeColor}
              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d={ic.iconPath} />
            </svg>
          </div>
        </div>
      ))}

      {/* Glowing orbs */}
      <div style={{ position:'absolute', top:'12%', left:'22%', width:520, height:520, borderRadius:'50%', background:'radial-gradient(circle,rgba(6,182,212,0.55) 0%,transparent 70%)', filter:'blur(65px)', animation:'orbPulse 7s ease-in-out infinite' }} />
      <div style={{ position:'absolute', bottom:'12%', right:'12%', width:420, height:420, borderRadius:'50%', background:'radial-gradient(circle,rgba(99,102,241,0.5) 0%,transparent 70%)', filter:'blur(70px)', animation:'orbPulse 9s ease-in-out 2s infinite' }} />
      <div style={{ position:'absolute', top:'52%', left:'6%', width:340, height:340, borderRadius:'50%', background:'radial-gradient(circle,rgba(139,92,246,0.4) 0%,transparent 70%)', filter:'blur(58px)', animation:'orbDrift 11s ease-in-out 4s infinite' }} />
      <div style={{ position:'absolute', top:'65%', right:'32%', width:280, height:280, borderRadius:'50%', background:'radial-gradient(circle,rgba(236,72,153,0.3) 0%,transparent 70%)', filter:'blur(52px)', animation:'orbPulse 13s ease-in-out 1s infinite' }} />
      <div style={{ position:'absolute', top:'30%', right:'5%', width:240, height:240, borderRadius:'50%', background:'radial-gradient(circle,rgba(20,184,166,0.3) 0%,transparent 70%)', filter:'blur(48px)', animation:'orbDrift 10s ease-in-out 3s infinite' }} />
    </div>
  )
}
