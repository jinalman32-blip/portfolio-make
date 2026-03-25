import React from 'react'

/* ─── Palette ─── */
const CYAN    = '#00d4ff'
const PURPLE  = '#a855f7'
const BG      = '#03040d'
const CARD_BG = 'rgba(8,12,32,0.82)'
const BORDER  = 'rgba(0,212,255,0.18)'

const levelWidth = { Beginner: '35%', Intermediate: '65%', Expert: '92%' }

/* ──────────── SVG Decorations ──────────── */

/* Circuit lines — bottom-left corner */
function CircuitLines({ style = {} }) {
  return (
    <svg width={260} height={220} style={{ position: 'absolute', pointerEvents: 'none', ...style }}>
      <g stroke={CYAN} strokeWidth={1} fill="none" opacity={0.35}>
        <polyline points="10,200 10,120 60,120 60,80 140,80 140,40" />
        <polyline points="30,220 30,150 80,150 80,100 180,100" />
        <polyline points="0,170 50,170 50,130 110,130 110,60 200,60" />
        <polyline points="70,220 70,160 120,160 120,110 220,110" />
        <circle cx={60}  cy={120} r={3} fill={CYAN} opacity={0.7} />
        <circle cx={140} cy={80}  r={3} fill={CYAN} opacity={0.7} />
        <circle cx={80}  cy={150} r={2} fill={PURPLE} opacity={0.7} />
        <circle cx={110} cy={130} r={2} fill={PURPLE} opacity={0.7} />
        <circle cx={50}  cy={170} r={3} fill={CYAN} opacity={0.6} />
      </g>
      {/* horizontal etch lines */}
      <g stroke={PURPLE} strokeWidth={0.6} opacity={0.2}>
        {[30, 60, 90, 130, 160, 195].map((y, i) => (
          <line key={i} x1={0} y1={y} x2={260} y2={y} />
        ))}
      </g>
    </svg>
  )
}

/* Circuit lines — top-right corner */
function CircuitLinesRight({ style = {} }) {
  return (
    <svg width={260} height={220} style={{ position: 'absolute', pointerEvents: 'none', ...style }}>
      <g stroke={PURPLE} strokeWidth={1} fill="none" opacity={0.35}>
        <polyline points="250,20 250,80 200,80 200,120 120,120 120,160" />
        <polyline points="230,0 230,70 170,70 170,100 80,100" />
        <polyline points="260,50 210,50 210,90 150,90 150,140 60,140" />
        <circle cx={200} cy={80}  r={3} fill={PURPLE} opacity={0.7} />
        <circle cx={120} cy={120} r={3} fill={PURPLE} opacity={0.7} />
        <circle cx={170} cy={70}  r={2} fill={CYAN}   opacity={0.7} />
      </g>
    </svg>
  )
}

/* Holographic robot head — top-right, subtle */
function RobotHead({ style = {} }) {
  return (
    <svg width={120} height={140} viewBox="0 0 120 140"
      style={{ position: 'absolute', pointerEvents: 'none', opacity: 0.12, ...style }}>
      <defs>
        <linearGradient id="rg1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={CYAN} />
          <stop offset="100%" stopColor={PURPLE} />
        </linearGradient>
      </defs>
      {/* head */}
      <rect x={20} y={25} width={80} height={70} rx={12} fill="none" stroke="url(#rg1)" strokeWidth={2} />
      {/* eyes */}
      <rect x={32} y={48} width={20} height={10} rx={3} fill={CYAN} opacity={0.7} />
      <rect x={68} y={48} width={20} height={10} rx={3} fill={CYAN} opacity={0.7} />
      {/* mouth grill */}
      {[0,1,2,3].map(i => (
        <line key={i} x1={38+i*12} y1={75} x2={38+i*12} y2={85} stroke={PURPLE} strokeWidth={2} opacity={0.8} />
      ))}
      {/* antenna */}
      <line x1={60} y1={25} x2={60} y2={8} stroke={CYAN} strokeWidth={1.5} />
      <circle cx={60} cy={6} r={3} fill={CYAN} opacity={0.9} />
      {/* neck */}
      <rect x={48} y={95} width={24} height={16} rx={4} fill="none" stroke="url(#rg1)" strokeWidth={1.5} />
      {/* scan lines overlay */}
      {[0,1,2,3,4,5,6].map(i => (
        <line key={i} x1={20} y1={30+i*10} x2={100} y2={30+i*10} stroke={CYAN} strokeWidth={0.4} opacity={0.3} />
      ))}
    </svg>
  )
}

/* Neural glow orb */
function GlowOrb({ cx = 50, cy = 50, r = 80, color = CYAN, opacity = 0.06, style = {} }) {
  return (
    <svg width={r*2} height={r*2} style={{ position: 'absolute', pointerEvents: 'none', ...style }}>
      <defs>
        <radialGradient id={`glow-${color.replace('#','')}`}>
          <stop offset="0%"   stopColor={color} stopOpacity={opacity * 4} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </radialGradient>
      </defs>
      <circle cx={r} cy={r} r={r} fill={`url(#glow-${color.replace('#','')})`} />
    </svg>
  )
}

/* Dot grid neural pattern */
function NeuralDots({ style = {} }) {
  const dots = []
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 8; c++) {
      dots.push(
        <circle key={`${r}-${c}`} cx={c * 22 + 6} cy={r * 22 + 6} r={1.4}
          fill={CYAN} opacity={0.15 + Math.random() * 0.12} />
      )
    }
  }
  return (
    <svg width={180} height={140} style={{ position: 'absolute', pointerEvents: 'none', ...style }}>
      {dots}
    </svg>
  )
}

/* ──────────── Reusable card ──────────── */
function Card({ children, style = {}, accent = CYAN }) {
  return (
    <div style={{
      background: CARD_BG,
      border: `1px solid ${accent}30`,
      borderRadius: 16,
      padding: '20px 22px',
      backdropFilter: 'blur(12px)',
      boxShadow: `0 0 24px ${accent}0d, inset 0 0 30px rgba(0,0,0,0.3)`,
      position: 'relative',
      overflow: 'hidden',
      ...style,
    }}>
      {/* top edge glow */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(90deg, transparent, ${accent}55, transparent)`,
      }} />
      {children}
    </div>
  )
}

/* Section heading with neon accent */
function SecHead({ children, color = CYAN }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
      <div style={{ width: 3, height: 18, borderRadius: 2, background: `linear-gradient(180deg,${color},${PURPLE})`, boxShadow: `0 0 8px ${color}` }} />
      <h2 style={{ fontSize: 20, fontWeight: 700, color: 'white', margin: 0, letterSpacing: 0.5 }}>{children}</h2>
    </div>
  )
}

/* ──────────── Main Template ──────────── */
export default function TemplateFuturistic({ p = {} }) {
  const { details: d = {}, skills = [], education = [], experience = [], projects = [], futuristic_bg, certifications = [], publications = [], awards = [] } = p

  return (
    <div style={{
      background: BG,
      minHeight: '100vh',
      color: 'white',
      fontFamily: "'Inter','Segoe UI',sans-serif",
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Inter:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #03040d; }
        ::-webkit-scrollbar-thumb { background: ${PURPLE}55; border-radius: 3px; }
      `}</style>

      {/* AI-generated background image */}
      {futuristic_bg && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
          backgroundImage: `url(${futuristic_bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }} />
      )}
      {/* Dark overlay on top of bg image so content stays readable */}
      {futuristic_bg && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
          background: 'rgba(3,4,13,0.72)',
        }} />
      )}

      {/* Background grid */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: `
          linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
      }} />

      {/* Ambient glow orbs */}
      <GlowOrb color={CYAN}   r={200} style={{ top: -80,  left: -60, zIndex: 0 }} />
      <GlowOrb color={PURPLE} r={220} style={{ top: -60,  right: -80, zIndex: 0 }} />
      <GlowOrb color={PURPLE} r={180} style={{ bottom: -60, left: '30%', zIndex: 0 }} />

      {/* Circuit decorations */}
      <CircuitLines  style={{ bottom: 0, left: 0, zIndex: 1 }} />
      <CircuitLinesRight style={{ top: 80, right: 0, zIndex: 1 }} />

      {/* Neural dots */}
      <NeuralDots style={{ top: 20, left: 20, zIndex: 1 }} />

      {/* Robot head holographic */}
      <RobotHead style={{ top: 24, right: 24, zIndex: 1, opacity: 0.14 }} />

      {/* ─── HERO ─── */}
      <header style={{
        position: 'relative', zIndex: 2,
        padding: '52px 60px 40px',
        borderBottom: '1px solid rgba(0,212,255,0.1)',
        display: 'flex', alignItems: 'center', gap: 32,
      }}>
        {/* Avatar */}
        <div style={{
          width: 86, height: 86, borderRadius: '50%', flexShrink: 0,
          background: `linear-gradient(135deg,${PURPLE},${CYAN})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 34, fontWeight: 900, color: 'white',
          fontFamily: "'Orbitron',sans-serif",
          boxShadow: `0 0 0 3px ${CYAN}33, 0 0 30px ${CYAN}44`,
          border: `2px solid ${CYAN}55`,
        }}>
          {d.profileImage ? (
            <img src={d.profileImage} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
          ) : (d.name || 'U')[0].toUpperCase()}
        </div>

        <div style={{ flex: 1 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '3px 12px', borderRadius: 20, marginBottom: 8,
            background: `${CYAN}12`, border: `1px solid ${CYAN}33`,
            fontSize: 10, color: CYAN, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: CYAN, boxShadow: `0 0 6px ${CYAN}`, display: 'inline-block' }} />
            System Online
          </div>
          <h1 style={{
            fontFamily: "'Orbitron',sans-serif",
            fontSize: 40, fontWeight: 900, margin: '0 0 6px',
            background: `linear-gradient(135deg,${CYAN},${PURPLE})`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            lineHeight: 1.1,
          }}>
            {d.name || 'Your Name'}
          </h1>
          {d.title && (
            <p style={{ fontSize: 16, color: `${CYAN}cc`, fontWeight: 500, margin: '0 0 12px', letterSpacing: 0.5 }}>
              {d.title}
            </p>
          )}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 20px', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
            {d.email    && <span>✉ {d.email}</span>}
            {d.phone    && <span>📞 {d.phone}</span>}
            {d.location && <span>📍 {d.location}</span>}
            {d.website  && <a href={d.website}  style={{ color: CYAN }}>🌐 {d.website}</a>}
            {d.linkedin && <a href={d.linkedin} style={{ color: CYAN }}>LinkedIn</a>}
          </div>
        </div>
      </header>

      {/* Bio strip */}
      {d.bio && (
        <div style={{
          position: 'relative', zIndex: 2,
          background: `linear-gradient(135deg,${PURPLE}18,${CYAN}10)`,
          borderBottom: `1px solid ${PURPLE}25`,
          padding: '24px 60px',
        }}>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, maxWidth: 820, margin: '0 auto' }}>
            {d.bio}
          </p>
        </div>
      )}

      {/* ─── BODY ─── */}
      <div style={{
        position: 'relative', zIndex: 2,
        display: 'grid',
        gridTemplateColumns: '280px 1fr',
        gap: 24,
        padding: '30px 40px 50px',
        maxWidth: 1100,
        margin: '0 auto',
      }}>
        {/* ── LEFT COLUMN ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Skills */}
          {skills.length > 0 && (
            <Card accent={CYAN}>
              <SecHead color={CYAN}>Skills</SecHead>
              {skills.map((s, i) => (
                <div key={i} style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,0.85)', fontWeight: 500, marginBottom: 5 }}>
                    <span style={{ display: 'flex', alignItems: 'center' }}>{s.image && <img src={s.image} alt={s.name} style={{ width:16, height:16, objectFit:'cover', borderRadius:3, marginRight:5, verticalAlign:'middle' }} />}{s.name}</span>
                    <span style={{ color: CYAN, fontSize: 11 }}>{s.level}</span>
                  </div>
                  <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', borderRadius: 2,
                      width: levelWidth[s.level] || '50%',
                      background: `linear-gradient(90deg,${CYAN},${PURPLE})`,
                      boxShadow: `0 0 8px ${CYAN}66`,
                    }} />
                  </div>
                </div>
              ))}
            </Card>
          )}

          {/* Education */}
          {education.length > 0 && (
            <Card accent={PURPLE}>
              <SecHead color={PURPLE}>Education</SecHead>
              {education.map((e, i) => (
                <div key={i} style={{
                  marginBottom: 14, paddingLeft: 12,
                  borderLeft: `2px solid ${PURPLE}55`,
                }}>
                  <div style={{ fontWeight: 700, color: 'white', fontFamily: "'Orbitron',sans-serif", fontSize: 12 }}>
                    {e.degree}{e.field ? ` in ${e.field}` : ''}
                  </div>
                  <div style={{ fontSize: 12, color: PURPLE, margin: '3px 0' }}>{e.institution}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
                    {e.from || ''}{e.to ? ` — ${e.to}` : ''}{e.grade ? ` · ${e.grade}` : ''}
                  </div>
                </div>
              ))}
            </Card>
          )}

        </div>

        {/* ── RIGHT COLUMN ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* Experience */}
          {experience.length > 0 && (
            <div>
              <SecHead color={CYAN}>Experience</SecHead>
              {experience.map((e, i) => (
                <Card key={i} accent={CYAN} style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
                    <div>
                      <div style={{ fontWeight: 700, color: 'white', fontFamily: "'Orbitron',sans-serif", fontSize: 13 }}>{e.role}</div>
                      <div style={{ fontSize: 12, color: CYAN, marginTop: 3, fontWeight: 500 }}>
                        {e.company}{e.location ? ` · ${e.location}` : ''}
                      </div>
                    </div>
                    <div style={{
                      fontSize: 11, color: 'rgba(255,255,255,0.4)',
                      whiteSpace: 'nowrap', padding: '2px 10px',
                      background: `${CYAN}0d`, borderRadius: 20,
                      border: `1px solid ${CYAN}20`,
                    }}>
                      {e.from || ''}{e.to ? ` – ${e.current ? 'Present' : e.to}` : ''}
                    </div>
                  </div>
                  {e.description && (
                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 10, lineHeight: 1.7 }}>{e.description}</p>
                  )}
                </Card>
              ))}
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <SecHead color={PURPLE}>Projects</SecHead>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {projects.map((proj, i) => (
                  <Card key={i} accent={PURPLE} style={{ padding: 0, overflow: 'hidden' }}>
                    {proj.image && <img src={proj.image} alt={proj.name} style={{ width:'100%', height:80, objectFit:'cover', display:'block' }} />}
                    <div style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 700, color: 'white', marginBottom: 4, fontFamily: "'Orbitron',sans-serif", fontSize: 11 }}>{proj.name}</div>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                      {proj.link   && <a href={proj.link}   style={{ fontSize: 11, color: CYAN }}>Live ↗</a>}
                      {proj.github && <a href={proj.github} style={{ fontSize: 11, color: PURPLE }}>GitHub ↗</a>}
                    </div>
                    {proj.description && (
                      <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{proj.description}</p>
                    )}
                    {proj.tech && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 8 }}>
                        {(typeof proj.tech === 'string' ? proj.tech.split(',') : Array.isArray(proj.tech) ? proj.tech : []).map((t, ti) => (
                          <span key={ti} style={{
                            fontSize: 10, padding: '2px 8px', borderRadius: 20,
                            background: `${PURPLE}18`, color: PURPLE,
                            border: `1px solid ${PURPLE}35`, fontWeight: 600,
                          }}>{t.trim()}</span>
                        ))}
                      </div>
                    )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ─── CERTIFICATIONS / PUBLICATIONS / AWARDS ─── */}
      {(certifications.length > 0 || publications.length > 0 || awards.length > 0) && (
        <div style={{ position: 'relative', zIndex: 2, padding: '0 40px 40px', maxWidth: 1100, margin: '0 auto' }}>

          {certifications.length > 0 && (
            <div style={{ marginBottom: 28 }}>
              <SecHead color={CYAN}>Certifications</SecHead>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 14 }}>
                {certifications.map((cert, i) => (
                  <Card key={i} accent={CYAN} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    {cert.image && <img src={cert.image} alt={cert.name} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, color: 'white', fontSize: 13, fontFamily: "'Orbitron',sans-serif" }}>{cert.name}</div>
                      {cert.issuer && <div style={{ fontSize: 12, color: CYAN, marginTop: 3 }}>{cert.issuer}</div>}
                      {cert.date && <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{cert.date}</div>}
                      {cert.url && <a href={cert.url} style={{ fontSize: 11, color: CYAN, marginTop: 4, display: 'block' }}>View ↗</a>}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {publications.length > 0 && (
            <div style={{ marginBottom: 28 }}>
              <SecHead color={CYAN}>Publications</SecHead>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 14 }}>
                {publications.map((pub, i) => (
                  <Card key={i} accent={CYAN} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    {pub.image && <img src={pub.image} alt={pub.title} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, color: 'white', fontSize: 13, fontFamily: "'Orbitron',sans-serif" }}>{pub.title}</div>
                      {pub.publisher && <div style={{ fontSize: 12, color: CYAN, marginTop: 3 }}>{pub.publisher}</div>}
                      {pub.date && <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{pub.date}</div>}
                      {pub.url && <a href={pub.url} style={{ fontSize: 11, color: CYAN, marginTop: 4, display: 'block' }}>Read ↗</a>}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {awards.length > 0 && (
            <div style={{ marginBottom: 28 }}>
              <SecHead color={CYAN}>Awards</SecHead>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 14 }}>
                {awards.map((award, i) => (
                  <Card key={i} accent={CYAN} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    {award.image && <img src={award.image} alt={award.title} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, color: 'white', fontSize: 13, fontFamily: "'Orbitron',sans-serif" }}>{award.title}</div>
                      {award.organization && <div style={{ fontSize: 12, color: CYAN, marginTop: 3 }}>{award.organization}</div>}
                      {award.date && <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{award.date}</div>}
                      {award.description && <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 6, lineHeight: 1.6 }}>{award.description}</p>}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─── FOOTER ─── */}
      <footer style={{
        position: 'relative', zIndex: 2,
        textAlign: 'center', padding: '36px 60px 44px',
        borderTop: '1px solid rgba(0,212,255,0.1)',
        background: 'rgba(0,0,0,0.3)',
      }}>
        <h2 style={{
          fontFamily: "'Orbitron',sans-serif", fontSize: 36, fontWeight: 900,
          background: `linear-gradient(135deg,${CYAN},${PURPLE})`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          margin: '0 0 8px',
        }}>
          Thank You
        </h2>
        <div style={{
          width: 200, height: 1, margin: '0 auto',
          background: `linear-gradient(90deg,transparent,${CYAN},${PURPLE},transparent)`,
          boxShadow: `0 0 12px ${CYAN}66`,
        }} />
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', marginTop: 14, letterSpacing: 1 }}>
          SYSTEM END · {d.name || ''}
        </p>
      </footer>
    </div>
  )
}
