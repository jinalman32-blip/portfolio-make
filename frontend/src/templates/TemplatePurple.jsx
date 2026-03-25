import React from 'react'

/* ─── palette (matches the PDF exactly) ─── */
const P = '#c4a0d0'   // medium soft purple
const PD = '#a07ab5'  // darker purple for outlines
const BG = '#f4ece8'  // warm cream / beige
const TXT = '#1a1a1a'
const TSUB = '#555555'

const levelWidth = { Beginner: '35%', Intermediate: '65%', Expert: '92%' }

/* ──────────────────── SVG Decorations ──────────────────── */

/* Dot-grid (top-right, exactly like PDF) */
function DotGrid({ style = {} }) {
  const dots = []
  // Triangular grid, denser on left, sparser toward right — like PDF page 1
  const cols = [10, 9, 8, 7, 6, 5, 4]
  cols.forEach((n, r) =>
    Array.from({ length: n }).forEach((_, c) =>
      dots.push(<circle key={`${r}-${c}`} cx={c * 15 + 8} cy={r * 15 + 8} r={4.5} fill={P} opacity={0.55 + r * 0.03} />)
    )
  )
  return (
    <svg width={155} height={110} style={{ position: 'absolute', ...style }}>
      {dots}
    </svg>
  )
}

/* Fan-of-petals sparkle (appears next to every heading in PDF) */
function Sparkle({ color = 'white', size = 0.75, style = {} }) {
  return (
    <svg viewBox="0 0 80 70" width={80 * size} height={70 * size}
      style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 5, ...style }}>
      <g transform="translate(18,58)">
        <ellipse rx={6} ry={20} fill={color} transform="rotate(-55)" />
        <ellipse rx={6} ry={23} fill={color} transform="rotate(-30)" />
        <ellipse rx={6} ry={23} fill={color} transform="rotate(-5)" />
        <ellipse rx={5} ry={20} fill={color} transform="rotate(22)" />
      </g>
    </svg>
  )
}

/* Top-left circle-in-circle (PDF page 1 / 10) */
function CircleBlob({ style = {} }) {
  return (
    <svg width={175} height={175} style={{ position: 'absolute', pointerEvents: 'none', ...style }}>
      <circle cx={70} cy={105} r={90} fill={P} opacity={0.85} />
      <circle cx={70} cy={105} r={108} fill="none" stroke={P} strokeWidth={12} opacity={0.45} />
    </svg>
  )
}

/* Bottom-left wavy blob (PDF page 1 / 10) */
function WaveBlob({ style = {} }) {
  return (
    <svg width={220} height={130} style={{ position: 'absolute', pointerEvents: 'none', ...style }}>
      <path fill={P} opacity={0.88}
        d="M0,60 C30,10 90,-5 130,30 C175,70 185,115 145,125 C100,138 30,145 0,120 Z" />
      <path fill="none" stroke={P} strokeWidth={14} opacity={0.45}
        d="M15,75 C50,20 110,8 148,42 C185,76 188,118 148,130" />
    </svg>
  )
}

/* Bottom-right solid blob */
function SolidBlob({ style = {} }) {
  return (
    <svg width={140} height={140} style={{ position: 'absolute', pointerEvents: 'none', ...style }}>
      <path fill={P} opacity={0.88}
        d="M70,0 C120,8 145,45 140,95 C135,145 95,135 55,115 C15,95 0,55 25,22 C45,0 55,0 70,0 Z" />
    </svg>
  )
}

/* Top-right squiggle */
function Squiggle({ style = {} }) {
  return (
    <svg width={90} height={70} style={{ position: 'absolute', pointerEvents: 'none', ...style }}>
      <path fill={P} opacity={0.7}
        d="M90,0 C65,12 40,8 22,22 C4,36 12,62 42,57 C72,52 88,40 90,0 Z" />
    </svg>
  )
}

/* Organic center-blob used for each content section */
function Blob({ children, style = {} }) {
  return (
    <div style={{
      position: 'relative',
      background: P,
      borderRadius: '60% 40% 65% 35% / 52% 48% 52% 48%',
      padding: '48px 72px',
      textAlign: 'center',
      ...style,
    }}>
      {children}
    </div>
  )
}

/* Section heading (Fredoka + sparkle) */
function H2({ children, dark = false }) {
  const c = dark ? PD : 'white'
  return (
    <h2 style={{
      fontFamily: "'Fredoka One', cursive",
      fontSize: 34,
      fontWeight: 700,
      color: c,
      margin: '0 0 18px 0',
      display: 'inline-flex',
      alignItems: 'center',
    }}>
      {children}
      <Sparkle color={c} />
    </h2>
  )
}

/* ──────────────────── Main Template ──────────────────── */
export default function TemplatePurple({ p }) {
  const { details: d, skills = [], education = [], experience = [], projects = [], certifications = [], publications = [], awards = [] } = p

  return (
    <div id="portfolio-render" style={{ fontFamily: "'Nunito', 'Fredoka One', sans-serif", background: BG, color: TXT, minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800&display=swap');
      `}</style>

      {/* ══════════ HERO (like PDF page 1) ══════════ */}
      <div style={{ position: 'relative', overflow: 'hidden', minHeight: 310, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 80px 50px', background: BG }}>
        <CircleBlob style={{ top: -30, left: -35 }} />
        <DotGrid style={{ top: 0, right: 0 }} />
        <WaveBlob style={{ bottom: -20, left: -20 }} />
        <SolidBlob style={{ bottom: -10, right: -10 }} />

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          {/* Avatar */}
          <div style={{
            width: 88, height: 88, borderRadius: '50%',
            background: `linear-gradient(135deg,${P},${PD})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 34, fontWeight: 900, color: 'white',
            margin: '0 auto 16px auto',
            border: `4px solid ${P}55`,
            boxShadow: `0 4px 20px ${P}55`,
            fontFamily: "'Fredoka One', cursive",
          }}>
            {d.profileImage ? (
              <img src={d.profileImage} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
            ) : (d.name || 'U')[0].toUpperCase()}
          </div>

          <h1 style={{
            fontFamily: "'Fredoka One', cursive",
            fontSize: 52, margin: 0, color: TXT, lineHeight: 1.1,
            display: 'inline-flex', alignItems: 'center',
          }}>
            {d.name || 'Your Name'}
            <Sparkle color={P} size={0.85} />
          </h1>

          {d.title && (
            <p style={{ fontSize: 18, color: PD, fontWeight: 700, marginTop: 6, fontFamily: "'Nunito', sans-serif", letterSpacing: 0.3 }}>
              {d.title}
            </p>
          )}

          {/* Contact bar */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '4px 18px', marginTop: 14, fontFamily: "'Nunito', sans-serif" }}>
            {d.email    && <span style={{ fontSize: 13, color: TSUB }}>✉ {d.email}</span>}
            {d.phone    && <span style={{ fontSize: 13, color: TSUB }}>📞 {d.phone}</span>}
            {d.location && <span style={{ fontSize: 13, color: TSUB }}>📍 {d.location}</span>}
            {d.website  && <a href={d.website}  style={{ fontSize: 13, color: PD, textDecoration: 'none' }}>🌐 Website</a>}
            {d.linkedin && <a href={d.linkedin} style={{ fontSize: 13, color: PD, textDecoration: 'none' }}>LinkedIn</a>}
          </div>
        </div>
      </div>

      {/* ══════════ BIO (like PDF Introduction slide) ══════════ */}
      {d.bio && (
        <div style={{ position: 'relative', padding: '16px 50px 30px', overflow: 'hidden' }}>
          {/* Corner decor */}
          <svg width="80" height="80" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
            <path fill={P} opacity={0.75} d="M0,0 C25,0 80,15 80,55 C80,80 40,82 0,65 Z" />
          </svg>
          <Squiggle style={{ top: 0, right: 0 }} />
          <svg width="60" height="70" style={{ position: 'absolute', bottom: 0, right: 30, pointerEvents: 'none' }}>
            <ellipse cx={30} cy={55} rx={28} ry={28} fill={P} opacity={0.5} />
          </svg>
          <svg width="50" height="55" style={{ position: 'absolute', bottom: 0, left: 60, pointerEvents: 'none' }}>
            <path fill="none" stroke={P} strokeWidth={8} opacity={0.45} d="M5,50 C10,20 40,5 48,25 C56,45 30,55 5,50 Z" />
          </svg>

          <Blob style={{ margin: '0 auto', maxWidth: 820 }}>
            <H2>Introduction</H2>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 15, color: 'rgba(255,255,255,0.93)', lineHeight: 1.85, maxWidth: 600, margin: '0 auto' }}>
              {d.bio}
            </p>
          </Blob>
        </div>
      )}

      {/* ══════════ BODY (2-column: left skills+edu / right exp+proj) ══════════ */}
      <div style={{ padding: '10px 50px 50px', display: 'grid', gridTemplateColumns: '1fr 1.55fr', gap: 32, maxWidth: 1040, margin: '0 auto' }}>

        {/* ─── LEFT COLUMN ─── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

          {/* Skills */}
          {skills.length > 0 && (
            <div style={{ position: 'relative', paddingTop: 6 }}>
              {/* Top-left tiny blob */}
              <svg width="55" height="55" style={{ position: 'absolute', top: -10, left: -18, pointerEvents: 'none' }}>
                <path fill={P} opacity={0.65} d="M0,10 C10,0 50,0 52,28 C54,55 15,55 0,40 Z" />
              </svg>
              <Squiggle style={{ top: -8, right: -10 }} />

              <Blob style={{ textAlign: 'left', padding: '36px 36px 30px' }}>
                <H2>Skills</H2>
                {skills.map((s, i) => (
                  <div key={i} style={{ marginBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, fontFamily: "'Nunito', sans-serif" }}>
                      <span style={{ fontSize: 13, color: 'white', fontWeight: 600, display: 'flex', alignItems: 'center' }}>{s.image && <img src={s.image} alt={s.name} style={{ width:18, height:18, objectFit:'cover', borderRadius:3, marginRight:6 }} />}{s.name}</span>
                      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>{s.level}</span>
                    </div>
                    <div style={{ height: 6, background: 'rgba(255,255,255,0.18)', borderRadius: 4 }}>
                      <div style={{ height: '100%', width: levelWidth[s.level] || '50%', background: 'white', borderRadius: 4, opacity: 0.85 }} />
                    </div>
                  </div>
                ))}
              </Blob>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div style={{ position: 'relative', paddingTop: 6 }}>
              <svg width="55" height="55" style={{ position: 'absolute', top: -10, left: -18, pointerEvents: 'none' }}>
                <path fill={P} opacity={0.55} d="M0,10 C12,0 50,0 52,30 C54,55 15,55 0,38 Z" />
              </svg>

              <Blob style={{ textAlign: 'left', padding: '36px 36px 30px' }}>
                <H2>Education</H2>
                {education.map((e, i) => (
                  <div key={i} style={{ marginBottom: 18, paddingLeft: 12, borderLeft: '3px solid rgba(255,255,255,0.5)' }}>
                    <p style={{ fontFamily: "'Fredoka One', cursive", fontSize: 15, margin: 0, color: 'white' }}>{e.degree}{e.field && ` in ${e.field}`}</p>
                    <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 3 }}>{e.institution}</p>
                    <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 2 }}>
                      {e.from}{e.to && ` — ${e.to}`}{e.grade && ` · ${e.grade}`}
                    </p>
                  </div>
                ))}
              </Blob>
            </div>
          )}
        </div>

        {/* ─── RIGHT COLUMN ─── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

          {/* Experience */}
          {experience.length > 0 && (
            <div style={{ position: 'relative', paddingTop: 6 }}>
              <Squiggle style={{ top: -8, right: -10 }} />
              <SolidBlob style={{ bottom: -30, right: -30, opacity: 0.6 }} />

              <div style={{ position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <h2 style={{ fontFamily: "'Fredoka One', cursive", fontSize: 30, color: TXT, margin: 0, display: 'inline-flex', alignItems: 'center' }}>
                    Experience <Sparkle color={P} size={0.65} />
                  </h2>
                </div>
                {experience.map((e, i) => (
                  <div key={i} style={{
                    marginBottom: 14,
                    padding: '16px 20px',
                    background: `${P}22`,
                    borderRadius: 18,
                    border: `1.5px solid ${P}55`,
                    fontFamily: "'Nunito', sans-serif",
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
                      <div>
                        <p style={{ fontFamily: "'Fredoka One', cursive", fontSize: 16, margin: 0, color: TXT }}>{e.role}</p>
                        <p style={{ fontSize: 13, color: PD, marginTop: 2, fontWeight: 600 }}>{e.company}{e.location && ` · ${e.location}`}</p>
                      </div>
                      <span style={{ fontSize: 12, color: TSUB, whiteSpace: 'nowrap', marginTop: 2 }}>
                        {e.from}{e.to && ` – ${e.current ? 'Present' : e.to}`}
                      </span>
                    </div>
                    {e.description && <p style={{ fontSize: 13, color: TSUB, marginTop: 8, lineHeight: 1.65 }}>{e.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div style={{ position: 'relative', paddingTop: 6 }}>
              <svg width="55" height="55" style={{ position: 'absolute', top: -12, left: -20, pointerEvents: 'none' }}>
                <path fill={P} opacity={0.55} d="M0,10 C12,0 50,0 52,30 C54,55 15,55 0,38 Z" />
              </svg>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <h2 style={{ fontFamily: "'Fredoka One', cursive", fontSize: 30, color: TXT, margin: 0, display: 'inline-flex', alignItems: 'center' }}>
                    Projects <Sparkle color={P} size={0.65} />
                  </h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  {projects.map((proj, i) => (
                    <div key={i} style={{
                      padding: '16px 18px',
                      background: `${P}18`,
                      borderRadius: 18,
                      border: `1.5px solid ${P}50`,
                      fontFamily: "'Nunito', sans-serif",
                      overflow: 'hidden',
                    }}>
                      {proj.image && <img src={proj.image} alt={proj.name} style={{ width:'calc(100% + 36px)', height:80, objectFit:'cover', display:'block', margin:'-16px -18px 10px' }} />}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 4 }}>
                        <p style={{ fontFamily: "'Fredoka One', cursive", fontSize: 15, margin: 0, color: TXT }}>{proj.name}</p>
                        <div style={{ display: 'flex', gap: 6 }}>
                          {proj.link   && <a href={proj.link}   style={{ fontSize: 11, color: PD, textDecoration: 'none' }}>Live ↗</a>}
                          {proj.github && <a href={proj.github} style={{ fontSize: 11, color: TSUB, textDecoration: 'none' }}>GitHub ↗</a>}
                        </div>
                      </div>
                      {proj.description && (
                        <p style={{ fontSize: 12, color: TSUB, marginTop: 6, lineHeight: 1.55 }}>{proj.description}</p>
                      )}
                      {proj.tech && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 8 }}>
                          {proj.tech.split(',').map(t => t.trim()).filter(Boolean).map((t, ti) => (
                            <span key={ti} style={{
                              fontSize: 10, padding: '2px 8px', borderRadius: 20,
                              background: `${P}30`, color: PD,
                              border: `1px solid ${P}55`, fontWeight: 600,
                            }}>{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div style={{ position: 'relative', paddingTop: 6 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <h2 style={{ fontFamily: "'Fredoka One', cursive", fontSize: 30, color: TXT, margin: 0, display: 'inline-flex', alignItems: 'center' }}>
                    Certifications <Sparkle color={P} size={0.65} />
                  </h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {certifications.map((cert, i) => (
                    <div key={i} style={{ padding: '14px 16px', background: `${P}18`, borderRadius: 16, border: `1.5px solid ${P}50`, fontFamily: "'Nunito', sans-serif", display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      {cert.image && <img src={cert.image} alt={cert.name} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />}
                      <div style={{ flex: 1 }}>
                        <p style={{ fontFamily: "'Fredoka One', cursive", fontSize: 14, margin: 0, color: TXT }}>{cert.name}</p>
                        {cert.issuer && <p style={{ fontSize: 12, color: PD, marginTop: 2, fontWeight: 600 }}>{cert.issuer}</p>}
                        {cert.date && <p style={{ fontSize: 11, color: TSUB, marginTop: 2 }}>{cert.date}</p>}
                        {cert.url && <a href={cert.url} style={{ fontSize: 11, color: PD }}>View ↗</a>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Publications */}
          {publications.length > 0 && (
            <div style={{ position: 'relative', paddingTop: 6 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <h2 style={{ fontFamily: "'Fredoka One', cursive", fontSize: 30, color: TXT, margin: 0, display: 'inline-flex', alignItems: 'center' }}>
                    Publications <Sparkle color={P} size={0.65} />
                  </h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {publications.map((pub, i) => (
                    <div key={i} style={{ padding: '14px 16px', background: `${P}18`, borderRadius: 16, border: `1.5px solid ${P}50`, fontFamily: "'Nunito', sans-serif", display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      {pub.image && <img src={pub.image} alt={pub.title} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />}
                      <div style={{ flex: 1 }}>
                        <p style={{ fontFamily: "'Fredoka One', cursive", fontSize: 14, margin: 0, color: TXT }}>{pub.title}</p>
                        {pub.publisher && <p style={{ fontSize: 12, color: PD, marginTop: 2, fontWeight: 600 }}>{pub.publisher}</p>}
                        {pub.date && <p style={{ fontSize: 11, color: TSUB, marginTop: 2 }}>{pub.date}</p>}
                        {pub.url && <a href={pub.url} style={{ fontSize: 11, color: PD }}>Read ↗</a>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Awards */}
          {awards.length > 0 && (
            <div style={{ position: 'relative', paddingTop: 6 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <h2 style={{ fontFamily: "'Fredoka One', cursive", fontSize: 30, color: TXT, margin: 0, display: 'inline-flex', alignItems: 'center' }}>
                    Awards <Sparkle color={P} size={0.65} />
                  </h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {awards.map((award, i) => (
                    <div key={i} style={{ padding: '14px 16px', background: `${P}18`, borderRadius: 16, border: `1.5px solid ${P}50`, fontFamily: "'Nunito', sans-serif", display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      {award.image && <img src={award.image} alt={award.title} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />}
                      <div style={{ flex: 1 }}>
                        <p style={{ fontFamily: "'Fredoka One', cursive", fontSize: 14, margin: 0, color: TXT }}>{award.title}</p>
                        {award.organization && <p style={{ fontSize: 12, color: PD, marginTop: 2, fontWeight: 600 }}>{award.organization}</p>}
                        {award.date && <p style={{ fontSize: 11, color: TSUB, marginTop: 2 }}>{award.date}</p>}
                        {award.description && <p style={{ fontSize: 12, color: TSUB, marginTop: 4, lineHeight: 1.55 }}>{award.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ══════════ THANK YOU footer ══════════ */}
      <div style={{ position: 'relative', overflow: 'hidden', textAlign: 'center', padding: '40px 60px 50px', background: BG }}>
        <CircleBlob style={{ top: -30, left: -35 }} />
        <DotGrid style={{ top: 0, right: 0 }} />
        <WaveBlob style={{ bottom: -20, left: -20 }} />
        <SolidBlob style={{ bottom: -10, right: -10 }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontFamily: "'Fredoka One', cursive", fontSize: 46, color: TXT, margin: 0, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            Thank You
            <Sparkle color={P} size={0.9} />
          </h2>
          {/* Dashed underline (like PDF page 10) */}
          <div style={{ margin: '10px auto 0', width: 220, borderBottom: `3px dashed ${P}`, opacity: 0.7 }} />
        </div>
      </div>
    </div>
  )
}
