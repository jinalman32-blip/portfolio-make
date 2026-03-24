import React, { useState } from 'react'

const BG  = '#282828'   // main dark charcoal
const BG2 = '#2d2d2d'   // slightly lighter panels
const BG3 = '#1e1e1e'   // darkest — nav + alternate sections

/* ── B&W photo placeholders ── */
function PhotoBlock({ style = {}, pattern = 0 }) {
  const gradients = [
    'linear-gradient(135deg,#1a1a1a 0%,#3a3a3a 45%,#555 70%,#2a2a2a 100%)',
    'linear-gradient(160deg,#444 0%,#222 35%,#555 65%,#333 100%)',
    'linear-gradient(110deg,#333 0%,#666 50%,#222 100%)',
    'radial-gradient(ellipse at 30% 40%,#555 0%,#222 60%,#111 100%)',
    'linear-gradient(180deg,#444 0%,#2a2a2a 50%,#555 100%)',
    'radial-gradient(ellipse at 70% 30%,#666 0%,#333 50%,#1a1a1a 100%)',
  ]
  return (
    <div style={{
      background: gradients[pattern % gradients.length],
      position: 'relative', overflow: 'hidden', ...style,
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E")`,
        opacity: 0.35,
      }} />
    </div>
  )
}

/* ── thin white underline under headings ── */
function Underline({ width = 80, center = false }) {
  return (
    <div style={{
      width, height: 2, background: 'white',
      marginTop: 12, ...(center ? { margin: '12px auto 0' } : {}),
    }} />
  )
}

/* ── numbered item (01. style) ── */
function NumItem({ num, title, body }) {
  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
      <span style={{ fontSize: 38, fontWeight: 900, color: 'rgba(255,255,255,0.35)', minWidth: 60, lineHeight: 1 }}>
        {String(num).padStart(2, '0')}.
      </span>
      <div>
        {title && <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{title}</div>}
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75 }}>{body}</div>
      </div>
    </div>
  )
}

export default function TemplateGrayscale({ p = {} }) {
  const {
    details: d = {},
    skills = [],
    education = [],
    experience = [],
    projects = [],
    certifications = [],
    publications = [],
    awards = [],
  } = p

  const [menuOpen, setMenuOpen] = useState(false)

  const name = d.name || 'Your Name'
  const bio  = d.bio  || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

  return (
    <div id="portfolio-render" style={{
      fontFamily: "'Helvetica Neue', Arial, sans-serif",
      background: BG, color: 'white', minHeight: '100vh',
    }}>

      {/* ══════════════════════════════════
          NAV BAR
      ══════════════════════════════════ */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: BG3,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 52px', height: 62,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <span style={{ fontWeight: 700, fontSize: 17, letterSpacing: 0.5 }}>{name}</span>
        <div style={{ display: 'flex', gap: 44, fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>
          {['Home', 'Photo', 'About Me', 'Contact'].map(l => (
            <span key={l} style={{ cursor: 'pointer' }}
              onMouseEnter={e => e.target.style.color = 'white'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.8)'}
            >{l}</span>
          ))}
        </div>
        {/* hamburger */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5, cursor: 'pointer' }}
          onClick={() => setMenuOpen(!menuOpen)}>
          <div style={{ width: 26, height: 2, background: 'white' }} />
          <div style={{ width: 26, height: 2, background: 'white' }} />
        </div>
      </nav>

      {/* ══════════════════════════════════
          PAGE 1 — HERO
          Left: B&W photo | Right: dark + "My Portfolio" huge
      ══════════════════════════════════ */}
      <section style={{ display: 'flex', minHeight: '92vh' }}>
        {/* left photo */}
        <PhotoBlock pattern={0} style={{ flex: '0 0 45%' }} />
        {/* right dark panel */}
        <div style={{
          flex: 1, background: BG3,
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '64px 68px',
        }}>
          {/* thin top rule */}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.25)', marginBottom: 28, width: '55%' }} />
          <h1 style={{ fontSize: 90, fontWeight: 900, lineHeight: 0.95, margin: 0, letterSpacing: -2 }}>
            My<br />Portfolio
          </h1>
          {d.title && (
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.55)', marginTop: 18, fontWeight: 400, letterSpacing: 0.5 }}>
              {d.title}
            </p>
          )}
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', marginTop: 28, lineHeight: 1.85, maxWidth: 420 }}>
            {bio}
          </p>
          {/* CTA buttons */}
          <div style={{ display: 'flex', gap: 24, marginTop: 44, alignItems: 'center' }}>
            <button style={{
              padding: '14px 34px', background: 'white', color: '#1a1a1a',
              border: 'none', fontWeight: 700, fontSize: 14, cursor: 'pointer', letterSpacing: 0.5,
            }}>Explore Now</button>
            <button style={{
              display: 'flex', alignItems: 'center', gap: 12,
              background: 'transparent', border: 'none', color: 'white',
              fontSize: 14, cursor: 'pointer',
            }}>
              <span style={{
                width: 38, height: 38, borderRadius: '50%', background: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
                  <path d="M1 1L11 7L1 13V1Z" fill="#1a1a1a" />
                </svg>
              </span>
              Play Video
            </button>
          </div>
          {/* contact chips row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 20px', marginTop: 40 }}>
            {d.email    && <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>✉ {d.email}</span>}
            {d.phone    && <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>📞 {d.phone}</span>}
            {d.location && <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>📍 {d.location}</span>}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          PAGE 2 — INTRODUCTION
          Left: text | Right: large photo
      ══════════════════════════════════ */}
      <section style={{ display: 'flex', minHeight: '85vh', background: BG }}>
        <div style={{ flex: '0 0 52%', padding: '84px 68px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontSize: 54, fontWeight: 800, margin: 0 }}>Introduction</h2>
          <Underline />
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 38, lineHeight: 1.9, maxWidth: 500 }}>{bio}</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 44, marginTop: 50 }}>
            <div>
              <h4 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 12px' }}>About Me</h4>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8 }}>
                {[d.title, d.location ? `Based in ${d.location}.` : null, d.email].filter(Boolean).join(' ') || bio.slice(0, 110)}
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 12px' }}>About Portfolio</h4>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8 }}>
                {projects.length > 0
                  ? `${projects.length} featured ${projects.length === 1 ? 'project' : 'projects'} showcasing expertise in ${projects.slice(0, 2).map(p => p.name).join(' and ')}.`
                  : bio.slice(0, 110)}
              </p>
            </div>
          </div>
        </div>
        <PhotoBlock pattern={1} style={{ flex: 1 }} />
      </section>

      {/* ══════════════════════════════════
          PAGE 3 — ABOUT ME
          Three photo strip + 3-col text grid
      ══════════════════════════════════ */}
      <section style={{ background: BG2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', height: 310 }}>
          <PhotoBlock pattern={2} />
          <PhotoBlock pattern={3} />
          <PhotoBlock pattern={4} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 60, padding: '68px 68px' }}>
          <div>
            <h2 style={{ fontSize: 50, fontWeight: 900, margin: 0 }}>About Me</h2>
            <Underline />
          </div>
          <div>
            <h4 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 14px' }}>My Vision</h4>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8 }}>
              {skills.length > 0
                ? `Expertise in ${skills.slice(0, 3).map(s => s.name).join(', ')} with a passion for creating impactful, meaningful work.`
                : bio.slice(0, 130)}
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 14px' }}>My Mission</h4>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8 }}>
              {experience.length > 0
                ? (experience[0].description || `${experience[0].role} at ${experience[0].company}.`)
                : bio.slice(0, 130)}
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          PAGE 4 — MY VISION (Skills)
          Left: two stacked photos | Right: numbered skill list
      ══════════════════════════════════ */}
      {skills.length > 0 && (
        <section style={{ display: 'flex', minHeight: '80vh', background: BG3 }}>
          {/* left: two photos side by side (stacked columns) */}
          <div style={{ flex: '0 0 46%', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <PhotoBlock pattern={5} />
            <PhotoBlock pattern={2} />
          </div>
          {/* right */}
          <div style={{ flex: 1, padding: '72px 68px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 style={{ fontSize: 52, fontWeight: 900, margin: 0 }}>My Vision</h2>
            <Underline />
            <div style={{ marginTop: 52, display: 'flex', flexDirection: 'column', gap: 38 }}>
              {skills.slice(0, 4).map((s, i) => (
                <NumItem
                  key={i} num={i + 1}
                  title={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>{s.image && <img src={s.image} alt={s.name} style={{ width:18, height:18, objectFit:'cover', borderRadius:3, flexShrink:0 }} />}{s.name}</span>}
                  body={
                    s.level === 'Expert'        ? 'Deep expertise and professional mastery in this area.' :
                    s.level === 'Intermediate'  ? 'Solid working knowledge with practical hands-on experience.' :
                                                  'Growing foundation with active development and learning.'
                  }
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════
          PAGE 5 — MY MISSION (Experience)
          Left: numbered list | Right: 2×2 photo grid
      ══════════════════════════════════ */}
      {experience.length > 0 && (
        <section style={{ display: 'flex', minHeight: '80vh', background: BG }}>
          <div style={{ flex: '0 0 52%', padding: '72px 68px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 style={{ fontSize: 52, fontWeight: 900, margin: 0 }}>My Mission</h2>
            <Underline />
            <div style={{ marginTop: 52, display: 'flex', flexDirection: 'column', gap: 34 }}>
              {experience.slice(0, 4).map((e, i) => (
                <NumItem
                  key={i} num={i + 1}
                  title={`${e.role} — ${e.company}`}
                  body={e.description || `${e.from || ''}${e.to ? ` – ${e.current ? 'Present' : e.to}` : ''}${e.location ? ` · ${e.location}` : ''}`}
                />
              ))}
            </div>
          </div>
          {/* right: 2×2 photo grid */}
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr' }}>
            <PhotoBlock pattern={0} />
            <PhotoBlock pattern={3} />
            <PhotoBlock pattern={1} />
            <PhotoBlock pattern={4} />
          </div>
        </section>
      )}

      {/* ══════════════════════════════════
          PAGE 6 — MY FAVORITE PORTFOLIO (Projects)
          Centered heading + two-col project cards
      ══════════════════════════════════ */}
      {projects.length > 0 && (
        <section style={{ background: BG2, padding: '84px 68px' }}>
          <h2 style={{ fontSize: 54, fontWeight: 900, textAlign: 'center', margin: 0 }}>My Favorite Portfolio</h2>
          <Underline center />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(340px,1fr))', gap: 44, marginTop: 64 }}>
            {projects.map((proj, i) => (
              <div key={i}>
                {proj.image ? <img src={proj.image} alt={proj.name} style={{ height: 230, width: '100%', objectFit: 'cover', display: 'block' }} /> : <PhotoBlock pattern={i % 6} style={{ height: 230 }} />}
                <div style={{ padding: '28px 6px' }}>
                  <h3 style={{ fontSize: 17, fontWeight: 700, textAlign: 'center', margin: '0 0 12px' }}>{proj.name}</h3>
                  {(proj.link || proj.github) && (
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 10 }}>
                      {proj.link   && <a href={proj.link}   target="_blank" rel="noreferrer" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'underline' }}>Live ↗</a>}
                      {proj.github && <a href={proj.github} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'underline' }}>GitHub ↗</a>}
                    </div>
                  )}
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', textAlign: 'center', lineHeight: 1.75 }}>
                    {proj.description}
                  </p>
                  {proj.tech && (
                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', textAlign: 'center', marginTop: 10 }}>{proj.tech}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════
          PAGE 7 — MEET MY TEAM (Education)
          Centered heading + 4 cards with photo circles
      ══════════════════════════════════ */}
      {education.length > 0 && (
        <section style={{ background: BG3, padding: '84px 68px' }}>
          <h2 style={{ fontSize: 54, fontWeight: 900, textAlign: 'center', margin: 0 }}>My Background</h2>
          <Underline center />
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.min(education.length, 4)}, 1fr)`,
            gap: 40,
            marginTop: 64,
            maxWidth: 1100, margin: '64px auto 0',
          }}>
            {education.map((e, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                {/* photo placeholder at alternating height to mimic staggered row */}
                <PhotoBlock
                  pattern={i % 6}
                  style={{
                    height: i % 2 === 0 ? 210 : 190,
                    marginBottom: i % 2 === 0 ? 0 : 20,
                  }}
                />
                <h4 style={{ fontSize: 15, fontWeight: 700, margin: '22px 0 8px' }}>
                  {e.degree}{e.field ? ` in ${e.field}` : ''}
                </h4>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75 }}>
                  {e.institution}<br />
                  <small style={{ color: 'rgba(255,255,255,0.35)' }}>
                    {e.from}{e.to ? ` — ${e.to}` : ''}{e.grade ? ` · ${e.grade}` : ''}
                  </small>
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════
          CERTIFICATIONS
      ══════════════════════════════════ */}
      {certifications.length > 0 && (
        <section style={{ background: BG2, padding: '84px 68px' }}>
          <h2 style={{ fontSize: 54, fontWeight: 900, textAlign: 'center', margin: 0 }}>Certifications</h2>
          <Underline center />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 32, marginTop: 48 }}>
            {certifications.map((cert, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                {cert.image && <img src={cert.image} alt={cert.name} style={{ width:48, height:48, objectFit:'cover', borderRadius:8, flexShrink:0 }} />}
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{cert.name}</div>
                  {cert.issuer && <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', marginTop: 3 }}>{cert.issuer}</div>}
                  {cert.date && <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{cert.date}</div>}
                  {cert.url && <a href={cert.url} style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'underline' }}>View ↗</a>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════
          PUBLICATIONS
      ══════════════════════════════════ */}
      {publications.length > 0 && (
        <section style={{ background: BG3, padding: '84px 68px' }}>
          <h2 style={{ fontSize: 54, fontWeight: 900, textAlign: 'center', margin: 0 }}>Publications</h2>
          <Underline center />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 32, marginTop: 48 }}>
            {publications.map((pub, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                {pub.image && <img src={pub.image} alt={pub.title} style={{ width:48, height:48, objectFit:'cover', borderRadius:8, flexShrink:0 }} />}
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{pub.title}</div>
                  {pub.publisher && <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', marginTop: 3 }}>{pub.publisher}</div>}
                  {pub.date && <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{pub.date}</div>}
                  {pub.url && <a href={pub.url} style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'underline' }}>Read ↗</a>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════
          AWARDS
      ══════════════════════════════════ */}
      {awards.length > 0 && (
        <section style={{ background: BG2, padding: '84px 68px' }}>
          <h2 style={{ fontSize: 54, fontWeight: 900, textAlign: 'center', margin: 0 }}>Awards</h2>
          <Underline center />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 32, marginTop: 48 }}>
            {awards.map((award, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                {award.image && <img src={award.image} alt={award.title} style={{ width:48, height:48, objectFit:'cover', borderRadius:8, flexShrink:0 }} />}
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{award.title}</div>
                  {award.organization && <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', marginTop: 3 }}>{award.organization}</div>}
                  {award.date && <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{award.date}</div>}
                  {award.description && <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', marginTop: 6, lineHeight: 1.75 }}>{award.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════
          PAGE 8 — MY PORTFOLIO (Split)
          Left: large photo | Right: smaller photo + dark text block
      ══════════════════════════════════ */}
      <section style={{ display: 'flex', minHeight: '72vh', background: BG }}>
        <PhotoBlock pattern={1} style={{ flex: '0 0 48%' }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <PhotoBlock pattern={3} style={{ flex: '0 0 46%' }} />
          <div style={{ flex: 1, padding: '44px 52px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: BG2 }}>
            <h2 style={{ fontSize: 50, fontWeight: 900, margin: 0 }}>My Portfolio</h2>
            <Underline />
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', marginTop: 22, lineHeight: 1.85 }}>
              {skills.length > 0 ? `Skilled in ${skills.map(s => s.name).join(', ')}.` : bio.slice(0, 200)}
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          PAGE 9 — MY CONTACT
          Left: photo | Right: contact details
      ══════════════════════════════════ */}
      <section style={{ display: 'flex', minHeight: '80vh', background: BG3 }}>
        <PhotoBlock pattern={5} style={{ flex: '0 0 48%' }} />
        <div style={{ flex: 1, padding: '84px 68px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontSize: 52, fontWeight: 900, margin: 0 }}>My Contact</h2>
          <Underline />
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', marginTop: 30, lineHeight: 1.9, maxWidth: 440 }}>{bio}</p>
          <div style={{ marginTop: 44, display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              { val: d.phone,    icon: '📞' },
              { val: d.website,  icon: '🌐' },
              { val: d.email,    icon: '✉' },
              { val: d.location, icon: '📍' },
            ].filter(x => x.val).map(({ val, icon }) => (
              <div key={val} style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                <div style={{
                  width: 38, height: 38, borderRadius: '50%',
                  border: '1.5px solid rgba(255,255,255,0.28)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 15, flexShrink: 0,
                }}>{icon}</div>
                <span style={{ fontSize: 15 }}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          PAGE 10 — THANK YOU
          Left: text | Right: photo
      ══════════════════════════════════ */}
      <section style={{ display: 'flex', minHeight: '70vh', background: BG }}>
        <div style={{ flex: '0 0 48%', padding: '84px 68px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontSize: 64, fontWeight: 900, margin: 0 }}>Thank You</h2>
          <Underline />
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', marginTop: 38, lineHeight: 1.9 }}>{bio}</p>
          {d.website && (
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginTop: 28, lineHeight: 1.9 }}>
              {d.website}
            </p>
          )}
        </div>
        <PhotoBlock pattern={2} style={{ flex: 1 }} />
      </section>

    </div>
  )
}
