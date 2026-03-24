import React from 'react'

/* ── Palette — matches PDF exactly ── */
const NAVY  = '#070b20'
const NAVY2 = '#0d1235'
const WHITE = '#ffffff'
const BORDER_COLOR = 'rgba(255,255,255,0.65)'

/* ── Glowing orb ── */
function Orb({ style = {} }) {
  return (
    <div style={{
      position: 'absolute',
      borderRadius: '50%',
      filter: 'blur(55px)',
      pointerEvents: 'none',
      zIndex: 0,
      ...style,
    }} />
  )
}

/* ── Oval pill badge (thin white border) ── */
function OvalBadge({ children, style = {} }) {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: `1.5px solid ${BORDER_COLOR}`,
      borderRadius: 999,
      padding: '9px 38px',
      color: WHITE,
      fontSize: 14,
      fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
      letterSpacing: 0.5,
      ...style,
    }}>
      {children}
    </div>
  )
}

/* ── Decorative heading font injector ── */
function FontStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&display=swap');
      .bga-heading {
        font-family: 'Cinzel Decorative', 'Georgia', serif !important;
        letter-spacing: 2px;
      }
    `}</style>
  )
}

/* ── Photo placeholder (circle / oval / arch) ── */
function Photo({ shape = 'circle', style = {}, idx = 0 }) {
  const gradients = [
    'linear-gradient(160deg,#1a2a50 0%,#2a3a70 100%)',
    'linear-gradient(160deg,#1e2a48 0%,#2e3a60 100%)',
    'linear-gradient(160deg,#101a38 0%,#1e2a50 100%)',
    'linear-gradient(160deg,#141e3c 0%,#222e58 100%)',
  ]
  const shapeRadius = shape === 'circle'
    ? { borderRadius: '50%' }
    : shape === 'oval'
    ? { borderRadius: '50% / 40%' }
    : shape === 'arch'
    ? { borderRadius: '200px 200px 16px 16px' }
    : { borderRadius: 16 }

  return (
    <div style={{
      background: gradients[idx % gradients.length],
      border: `1.5px solid rgba(255,255,255,0.25)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      position: 'relative',
      flexShrink: 0,
      ...shapeRadius,
      ...style,
    }}>
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 16-4 16 0" />
      </svg>
    </div>
  )
}

/* ── Section wrapper ── */
function Section({ children, style = {} }) {
  return (
    <div style={{
      position: 'relative',
      background: NAVY,
      overflow: 'hidden',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      ...style,
    }}>
      {children}
    </div>
  )
}

/* ── Top-left name badge present on interior pages ── */
function PageBadge({ name }) {
  return (
    <div style={{ position: 'absolute', top: 28, left: 36, zIndex: 2 }}>
      <OvalBadge style={{ fontSize: 13, padding: '7px 28px' }}>{name}</OvalBadge>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════ */
export default function TemplateBlueGradientAesthetic({ p = {} }) {
  const {
    details: d = {},
    skills    = [],
    education = [],
    experience = [],
    projects  = [],
    certifications = [],
    publications = [],
    awards = [],
  } = p

  const name    = d.name     || 'Your Name'
  const title   = d.title    || 'Creative Designer'
  const bio     = d.bio      || 'I am a passionate creative professional dedicated to delivering exceptional work and bringing meaningful ideas to life through thoughtful design and strategy.'
  const email   = d.email    || 'hello@portfolio.com'
  const phone   = d.phone    || '+123-456-7890'
  const loc     = d.location || '123 Anywhere St., Any City'
  const website = d.website  || 'www.portfolio.com'

  /* Build service list from skills or experience */
  const serviceList = skills.length
    ? skills.slice(0, 3).map(s => s.name)
    : experience.length
    ? experience.slice(0, 3).map(e => e.role)
    : ['Creative Design', 'Brand Strategy', 'Visual Storytelling']

  /* Build portfolio list from projects */
  const portList = projects.length ? projects.slice(0, 4) : [
    { name: 'Portfolio 01' },
    { name: 'Portfolio 02' },
    { name: 'Portfolio 03' },
    { name: 'Portfolio 04' },
  ]

  /* Build vision points */
  const visionPoints = skills.length >= 4
    ? skills.slice(0, 4).map(s => s.name + (s.level ? ` — ${s.level}` : ''))
    : [
        'To create meaningful design experiences that connect brands with their audiences.',
        'To push creative boundaries while maintaining clarity and purpose in every project.',
        'To deliver work that stands the test of time and resonates across cultures.',
        'To continuously evolve and adapt to the ever-changing creative landscape.',
      ]

  /* Build mission points */
  const missionPoints = experience.length >= 2
    ? experience.slice(0, 2).map(e => `${e.role} at ${e.company}${e.description ? ': ' + e.description.slice(0, 80) + '…' : ''}`)
    : [
        'To deliver work that exceeds expectations and creates lasting impact for every client and project undertaken.',
        'To foster creativity, collaboration, and innovation in everything I do, building solutions that matter.',
      ]

  /* Build team list */
  const teamList = experience.length >= 3
    ? experience.slice(0, 3).map(e => ({ name: e.role, desc: e.company }))
    : [
        { name: 'Team Member 01', desc: 'Creative Director & Lead Designer' },
        { name: 'Team Member 02', desc: 'Brand Strategist & Visual Artist' },
        { name: 'Team Member 03', desc: 'Motion Designer & Illustrator' },
      ]

  /* Bio split into 2 paragraphs */
  const sentences = bio.split(/(?<=[.!?])\s+/)
  const half = Math.ceil(sentences.length / 2)
  const bio1 = sentences.slice(0, half).join(' ')
  const bio2 = sentences.slice(half).join(' ') || bio

  const headingStyle = {
    fontFamily: "'Cinzel Decorative', 'Georgia', serif",
    color: WHITE,
    lineHeight: 1.1,
    letterSpacing: 2,
    textTransform: 'uppercase',
  }

  const bodyFont = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif"

  return (
    <div style={{ fontFamily: bodyFont, color: WHITE, background: NAVY, overflowX: 'hidden' }}>
      <FontStyle />

      {/* ══════════════════════════════
          PAGE 1 — COVER
      ══════════════════════════════ */}
      <Section style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '60px 40px' }}>
        {/* Orbs */}
        <Orb style={{ top: -40, left: -40, width: 260, height: 260, background: 'radial-gradient(circle,rgba(30,100,255,0.55) 0%,transparent 70%)' }} />
        <Orb style={{ bottom: -40, right: -40, width: 240, height: 240, background: 'radial-gradient(circle,rgba(0,180,200,0.45) 0%,transparent 70%)' }} />
        <Orb style={{ top: '30%', left: '15%', width: 300, height: 300, background: 'radial-gradient(circle,rgba(40,60,220,0.35) 0%,rgba(120,40,200,0.25) 50%,transparent 70%)' }} />
        <Orb style={{ top: '20%', right: '10%', width: 180, height: 180, background: 'radial-gradient(circle,rgba(0,180,220,0.3) 0%,transparent 70%)' }} />

        {/* Vertical side labels */}
        <div style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%) rotate(-90deg)', fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: 2, textTransform: 'uppercase', fontFamily: bodyFont }}>
          @{name.toLowerCase().replace(/\s/g, '')}
        </div>
        <div style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%) rotate(90deg)', fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: 2, textTransform: 'uppercase', fontFamily: bodyFont }}>
          @{name.toLowerCase().replace(/\s/g, '')}
        </div>

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
          {/* Name badge */}
          <OvalBadge>{name}</OvalBadge>

          {/* Big PORTFOLIO text */}
          <div className="bga-heading" style={{ ...headingStyle, fontSize: 'clamp(48px,10vw,110px)', fontWeight: 900, lineHeight: 1 }}>
            PORTFOLIO
          </div>

          {/* Watch Now badge */}
          <OvalBadge>{title}</OvalBadge>
        </div>
      </Section>

      {/* ══════════════════════════════
          PAGE 2 — ABOUT ME
      ══════════════════════════════ */}
      <Section style={{ flexDirection: 'row', alignItems: 'center', padding: '80px 60px', gap: 60 }}>
        <Orb style={{ top: -60, right: -60, width: 280, height: 280, background: 'radial-gradient(circle,rgba(0,180,220,0.4) 0%,transparent 70%)' }} />
        <Orb style={{ bottom: -40, left: -40, width: 220, height: 220, background: 'radial-gradient(circle,rgba(30,80,220,0.4) 0%,transparent 70%)' }} />

        <PageBadge name={name} />

        {/* Left — circular photo */}
        <div style={{ zIndex: 1, flexShrink: 0, width: 300, height: 300, borderRadius: '50%', overflow: 'hidden', border: `1.5px solid rgba(255,255,255,0.25)` }}>
          {d.profileImage
            ? <img src={d.profileImage} alt={name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
            : <Photo shape="circle" style={{ width: 300, height: 300 }} idx={0} />}
        </div>

        {/* Right — text */}
        <div style={{ flex: 1, zIndex: 1, minWidth: 260 }}>
          <div className="bga-heading" style={{ ...headingStyle, fontSize: 'clamp(36px,6vw,72px)', fontWeight: 900, marginBottom: 36 }}>
            ABOUT ME
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.85, color: 'rgba(255,255,255,0.8)', marginBottom: 28, maxWidth: 520 }}>{bio1}</p>
          <p style={{ fontSize: 14, lineHeight: 1.85, color: 'rgba(255,255,255,0.8)', maxWidth: 520 }}>{bio2 !== bio1 ? bio2 : bio}</p>
        </div>
      </Section>

      {/* ══════════════════════════════
          PAGE 3 — MY SERVICE
      ══════════════════════════════ */}
      <Section style={{ flexDirection: 'row', alignItems: 'center', padding: '80px 60px', gap: 60 }}>
        <Orb style={{ bottom: -60, left: '30%', width: 300, height: 300, background: 'radial-gradient(circle,rgba(30,80,220,0.4) 0%,transparent 70%)' }} />
        <Orb style={{ top: -40, right: -40, width: 220, height: 220, background: 'radial-gradient(circle,rgba(0,160,200,0.35) 0%,transparent 70%)' }} />

        <PageBadge name={name} />

        {/* Left — text */}
        <div style={{ flex: 1, zIndex: 1, minWidth: 260, maxWidth: 360 }}>
          <div className="bga-heading" style={{ ...headingStyle, fontSize: 'clamp(36px,6vw,68px)', fontWeight: 900, lineHeight: 1.15, marginBottom: 32 }}>
            MY<br />SERVICE
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.85, color: 'rgba(255,255,255,0.75)' }}>
            {bio.slice(0, 220)}{bio.length > 220 ? '…' : ''}
          </p>
          {skills.length > 0 && (
            <ul style={{ marginTop: 24, paddingLeft: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {skills.slice(0, 4).map((sk, i) => (
                <li key={i} style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  {sk.image && <img src={sk.image} alt={sk.name} style={{ width:18, height:18, objectFit:'cover', borderRadius:3, flexShrink:0 }} />}
                  <span style={{ color: 'rgba(100,160,255,0.9)', fontWeight: 700 }}>{sk.name}</span>
                  {sk.level ? ` — ${sk.level}` : ''}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right — 3 oval portrait images */}
        <div style={{ display: 'flex', gap: 20, zIndex: 1, alignItems: 'center' }}>
          {[0, 1, 2].map(i => (
            <Photo key={i} shape="oval" style={{ width: 170, height: 280 }} idx={i} />
          ))}
        </div>
      </Section>

      {/* ══════════════════════════════
          PAGE 4 — MY PROJECT
      ══════════════════════════════ */}
      <Section style={{ alignItems: 'center', justifyContent: 'center', padding: '80px 60px', textAlign: 'center', gap: 48 }}>
        <Orb style={{ top: -40, left: -40, width: 240, height: 240, background: 'radial-gradient(circle,rgba(30,80,220,0.4) 0%,transparent 70%)' }} />
        <Orb style={{ bottom: -40, right: -40, width: 220, height: 220, background: 'radial-gradient(circle,rgba(0,180,220,0.35) 0%,transparent 70%)' }} />

        <PageBadge name={name} />

        <div className="bga-heading" style={{ ...headingStyle, fontSize: 'clamp(36px,7vw,80px)', fontWeight: 900, zIndex: 1 }}>
          MY PROJECT
        </div>

        {/* 4 oval images in a row */}
        <div style={{ display: 'flex', gap: 24, zIndex: 1, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[0, 1, 2, 3].map(i => (
            <Photo key={i} shape="oval" style={{ width: 160, height: 210 }} idx={i} />
          ))}
        </div>

        <div style={{ zIndex: 1, maxWidth: 800 }}>
          <p style={{ fontSize: 14, lineHeight: 1.85, color: 'rgba(255,255,255,0.75)', textAlign: 'center' }}>
            {projects.length
              ? projects.slice(0, 2).map(pr => pr.name + (pr.description ? ' — ' + pr.description.slice(0, 60) + '…' : '')).join('  ·  ')
              : bio}
          </p>
        </div>
      </Section>

      {/* ══════════════════════════════
          PAGE 5 — MY VISION
      ══════════════════════════════ */}
      <Section style={{ flexDirection: 'row', alignItems: 'center', padding: '80px 60px', gap: 60 }}>
        <Orb style={{ top: -40, left: -40, width: 250, height: 250, background: 'radial-gradient(circle,rgba(30,80,220,0.4) 0%,transparent 70%)' }} />
        <Orb style={{ bottom: -40, right: '20%', width: 200, height: 200, background: 'radial-gradient(circle,rgba(0,180,220,0.35) 0%,transparent 70%)' }} />

        <PageBadge name={name} />

        {/* Left — geometric photo (half-moon style) */}
        <div style={{ flexShrink: 0, zIndex: 1, position: 'relative', width: 360, height: 480 }}>
          {/* top semi-circle */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            height: '58%',
            background: WHITE,
            borderRadius: '50% 50% 0 0 / 60% 60% 0 0',
            overflow: 'hidden',
            border: `1.5px solid rgba(255,255,255,0.4)`,
          }}>
            <Photo shape="rect" style={{ width: '100%', height: '100%', borderRadius: 0 }} idx={0} />
          </div>
          {/* bottom rect */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: '44%',
            background: WHITE,
            borderRadius: '0 0 20px 20px',
            overflow: 'hidden',
            border: `1.5px solid rgba(255,255,255,0.4)`,
          }}>
            <Photo shape="rect" style={{ width: '100%', height: '100%', borderRadius: 0 }} idx={1} />
          </div>
        </div>

        {/* Right — text */}
        <div style={{ flex: 1, zIndex: 1, minWidth: 260 }}>
          <div className="bga-heading" style={{ ...headingStyle, fontSize: 'clamp(36px,6vw,72px)', fontWeight: 900, marginBottom: 40 }}>
            MY VISION
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {visionPoints.map((pt, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ color: 'rgba(100,160,255,0.8)', marginTop: 3, flexShrink: 0 }}>•</span>
                <p style={{ fontSize: 13, lineHeight: 1.8, color: 'rgba(255,255,255,0.78)', margin: 0 }}>{pt}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════
          PAGE 6 — MY MISSION
      ══════════════════════════════ */}
      <Section style={{ flexDirection: 'row', alignItems: 'center', padding: '80px 60px', gap: 60 }}>
        <Orb style={{ top: -60, right: '30%', width: 260, height: 260, background: 'radial-gradient(circle,rgba(30,80,220,0.38) 0%,transparent 70%)' }} />
        <Orb style={{ bottom: -40, right: -40, width: 240, height: 240, background: 'radial-gradient(circle,rgba(0,180,220,0.35) 0%,transparent 70%)' }} />

        <PageBadge name={name} />

        {/* Left — text */}
        <div style={{ flex: 1, zIndex: 1, minWidth: 260, maxWidth: 400 }}>
          <div className="bga-heading" style={{ ...headingStyle, fontSize: 'clamp(36px,6vw,68px)', fontWeight: 900, lineHeight: 1.15, marginBottom: 40 }}>
            MY<br />MISSION
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {missionPoints.map((pt, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ color: 'rgba(100,160,255,0.8)', flexShrink: 0, fontSize: 16, marginTop: 2 }}>•</span>
                <p style={{ fontSize: 14, lineHeight: 1.85, color: 'rgba(255,255,255,0.78)', margin: 0 }}>{pt}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — 2 images */}
        <div style={{ display: 'flex', gap: 20, zIndex: 1, alignItems: 'flex-start' }}>
          <Photo shape="arch" style={{ width: 230, height: 400 }} idx={2} />
          <Photo shape="arch" style={{ width: 230, height: 340, marginTop: 60 }} idx={3} />
        </div>
      </Section>

      {/* ══════════════════════════════
          PAGE 7 — MY PORTFOLIO
      ══════════════════════════════ */}
      <Section style={{ alignItems: 'center', padding: '80px 60px', gap: 48, textAlign: 'center' }}>
        <Orb style={{ top: -40, left: -40, width: 240, height: 240, background: 'radial-gradient(circle,rgba(30,80,220,0.4) 0%,transparent 70%)' }} />
        <Orb style={{ bottom: -40, right: -40, width: 220, height: 220, background: 'radial-gradient(circle,rgba(0,180,220,0.35) 0%,transparent 70%)' }} />

        <PageBadge name={name} />

        <div className="bga-heading" style={{ ...headingStyle, fontSize: 'clamp(36px,7vw,76px)', fontWeight: 900, zIndex: 1 }}>
          MY PORTFOLIO
        </div>

        {/* 4 arch images in a row */}
        <div style={{ display: 'flex', gap: 24, zIndex: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
          {portList.map((proj, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              {proj.image
                ? <div style={{ width: 200, height: 300, borderRadius: '200px 200px 16px 16px', overflow: 'hidden', border: `1.5px solid rgba(255,255,255,0.25)` }}><img src={proj.image} alt={proj.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} /></div>
                : <Photo shape="arch" style={{ width: 200, height: 300 }} idx={i} />}
              <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.8)', letterSpacing: 1, textTransform: 'uppercase', fontFamily: bodyFont }}>
                {proj.name || `Portfolio 0${i + 1}`}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* ══════════════════════════════
          PAGE 8 — MEET MY TEAM
      ══════════════════════════════ */}
      <Section style={{ alignItems: 'center', padding: '80px 60px', gap: 52, textAlign: 'center' }}>
        <Orb style={{ top: -40, right: -40, width: 250, height: 250, background: 'radial-gradient(circle,rgba(0,180,220,0.4) 0%,transparent 70%)' }} />
        <Orb style={{ bottom: -40, left: -40, width: 220, height: 220, background: 'radial-gradient(circle,rgba(30,80,220,0.38) 0%,transparent 70%)' }} />

        <PageBadge name={name} />

        <div className="bga-heading" style={{ ...headingStyle, fontSize: 'clamp(32px,6vw,72px)', fontWeight: 900, zIndex: 1 }}>
          MEET MY TEAM
        </div>

        {/* 3 team arch images */}
        <div style={{ display: 'flex', gap: 40, zIndex: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
          {teamList.slice(0, 3).map((member, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, maxWidth: 280 }}>
              <Photo shape="arch" style={{ width: 260, height: 320 }} idx={i} />
              <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: 1.5, textTransform: 'uppercase', color: WHITE, fontFamily: bodyFont }}>
                {member.name}
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.75, color: 'rgba(255,255,255,0.7)', textAlign: 'center', fontFamily: bodyFont }}>
                {member.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ══════════════════════════════
          PAGE 9 — MY CONTACT
      ══════════════════════════════ */}
      <Section style={{ flexDirection: 'row', alignItems: 'center', padding: '80px 60px', gap: 48 }}>
        <Orb style={{ top: -40, left: -40, width: 240, height: 240, background: 'radial-gradient(circle,rgba(30,80,220,0.4) 0%,transparent 70%)' }} />
        <Orb style={{ bottom: -40, right: -40, width: 220, height: 220, background: 'radial-gradient(circle,rgba(0,180,220,0.35) 0%,transparent 70%)' }} />

        <PageBadge name={name} />

        {/* Left — 2 photos (different sizes) */}
        <div style={{ display: 'flex', gap: 20, zIndex: 1, alignItems: 'center' }}>
          <Photo shape="oval" style={{ width: 180, height: 320 }} idx={0} />
          <Photo shape="circle" style={{ width: 260, height: 380 }} idx={1} />
        </div>

        {/* Right — contact info */}
        <div style={{ flex: 1, zIndex: 1, minWidth: 260 }}>
          <div className="bga-heading" style={{ ...headingStyle, fontSize: 'clamp(36px,6vw,72px)', fontWeight: 900, lineHeight: 1.15, marginBottom: 48 }}>
            MY<br />CONTACT
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {[
              { icon: '📞', value: phone },
              { icon: '🌐', value: website },
              { icon: '✉️', value: email },
              { icon: '📍', value: loc },
            ].map((c, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: '50%',
                  border: `1.5px solid rgba(255,255,255,0.5)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, flexShrink: 0,
                }}>
                  {c.icon}
                </div>
                <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.82)', fontFamily: bodyFont }}>{c.value}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════
          CERTIFICATIONS
      ══════════════════════════════ */}
      {certifications.length > 0 && (
        <Section style={{ alignItems: 'center', padding: '80px 60px', gap: 48 }}>
          <Orb style={{ top: -40, left: -40, width: 240, height: 240, background: 'radial-gradient(circle,rgba(30,80,220,0.4) 0%,transparent 70%)' }} />
          <PageBadge name={name} />
          <div className="bga-heading" style={{ ...headingStyle, fontSize: 'clamp(32px,6vw,68px)', fontWeight: 900, zIndex: 1 }}>
            CERTIFICATIONS
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 20, zIndex: 1, width: '100%', maxWidth: 900 }}>
            {certifications.map((cert, i) => (
              <div key={i} style={{ background: 'rgba(8,12,40,0.7)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 16, padding: '16px 20px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                {cert.image && <img src={cert.image} alt={cert.name} style={{ width:48, height:48, objectFit:'cover', borderRadius:8, flexShrink:0 }} />}
                <div>
                  <div style={{ fontWeight: 700, color: WHITE, fontSize: 14 }}>{cert.name}</div>
                  {cert.issuer && <div style={{ fontSize: 12, color: 'rgba(100,160,255,0.9)', marginTop: 3 }}>{cert.issuer}</div>}
                  {cert.date && <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{cert.date}</div>}
                  {cert.url && <a href={cert.url} style={{ fontSize: 11, color: 'rgba(100,160,255,0.9)', marginTop: 4, display: 'block' }}>View ↗</a>}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ══════════════════════════════
          PUBLICATIONS
      ══════════════════════════════ */}
      {publications.length > 0 && (
        <Section style={{ alignItems: 'center', padding: '80px 60px', gap: 48 }}>
          <Orb style={{ bottom: -40, right: -40, width: 220, height: 220, background: 'radial-gradient(circle,rgba(0,180,200,0.4) 0%,transparent 70%)' }} />
          <PageBadge name={name} />
          <div className="bga-heading" style={{ ...headingStyle, fontSize: 'clamp(32px,6vw,68px)', fontWeight: 900, zIndex: 1 }}>
            PUBLICATIONS
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 20, zIndex: 1, width: '100%', maxWidth: 900 }}>
            {publications.map((pub, i) => (
              <div key={i} style={{ background: 'rgba(8,12,40,0.7)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 16, padding: '16px 20px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                {pub.image && <img src={pub.image} alt={pub.title} style={{ width:48, height:48, objectFit:'cover', borderRadius:8, flexShrink:0 }} />}
                <div>
                  <div style={{ fontWeight: 700, color: WHITE, fontSize: 14 }}>{pub.title}</div>
                  {pub.publisher && <div style={{ fontSize: 12, color: 'rgba(100,160,255,0.9)', marginTop: 3 }}>{pub.publisher}</div>}
                  {pub.date && <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{pub.date}</div>}
                  {pub.url && <a href={pub.url} style={{ fontSize: 11, color: 'rgba(100,160,255,0.9)', marginTop: 4, display: 'block' }}>Read ↗</a>}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ══════════════════════════════
          AWARDS
      ══════════════════════════════ */}
      {awards.length > 0 && (
        <Section style={{ alignItems: 'center', padding: '80px 60px', gap: 48 }}>
          <Orb style={{ top: -40, right: -40, width: 240, height: 240, background: 'radial-gradient(circle,rgba(30,100,255,0.5) 0%,transparent 70%)' }} />
          <PageBadge name={name} />
          <div className="bga-heading" style={{ ...headingStyle, fontSize: 'clamp(32px,6vw,68px)', fontWeight: 900, zIndex: 1 }}>
            AWARDS
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 20, zIndex: 1, width: '100%', maxWidth: 900 }}>
            {awards.map((award, i) => (
              <div key={i} style={{ background: 'rgba(8,12,40,0.7)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 16, padding: '16px 20px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                {award.image && <img src={award.image} alt={award.title} style={{ width:48, height:48, objectFit:'cover', borderRadius:8, flexShrink:0 }} />}
                <div>
                  <div style={{ fontWeight: 700, color: WHITE, fontSize: 14 }}>{award.title}</div>
                  {award.organization && <div style={{ fontSize: 12, color: 'rgba(100,160,255,0.9)', marginTop: 3 }}>{award.organization}</div>}
                  {award.date && <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{award.date}</div>}
                  {award.description && <p style={{ fontSize: 13, lineHeight: 1.75, color: 'rgba(255,255,255,0.7)', marginTop: 6 }}>{award.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ══════════════════════════════
          PAGE 10 — THANK YOU
      ══════════════════════════════ */}
      <Section style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '60px 40px' }}>
        <Orb style={{ top: -40, left: -40, width: 260, height: 260, background: 'radial-gradient(circle,rgba(30,100,255,0.55) 0%,transparent 70%)' }} />
        <Orb style={{ bottom: -40, right: -40, width: 240, height: 240, background: 'radial-gradient(circle,rgba(0,180,200,0.45) 0%,transparent 70%)' }} />
        <Orb style={{ top: '25%', left: '15%', width: 320, height: 320, background: 'radial-gradient(circle,rgba(40,60,220,0.35) 0%,rgba(120,40,200,0.25) 50%,transparent 70%)' }} />
        <Orb style={{ top: '20%', right: '10%', width: 180, height: 180, background: 'radial-gradient(circle,rgba(0,180,220,0.3) 0%,transparent 70%)' }} />

        {/* Vertical side labels */}
        <div style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%) rotate(-90deg)', fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: 2, textTransform: 'uppercase', fontFamily: bodyFont }}>
          @{name.toLowerCase().replace(/\s/g, '')}
        </div>
        <div style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%) rotate(90deg)', fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: 2, textTransform: 'uppercase', fontFamily: bodyFont }}>
          @{name.toLowerCase().replace(/\s/g, '')}
        </div>

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
          {/* Name badge */}
          <OvalBadge>{name}</OvalBadge>

          {/* Big THANK YOU text */}
          <div className="bga-heading" style={{ ...headingStyle, fontSize: 'clamp(48px,10vw,110px)', fontWeight: 900, lineHeight: 1 }}>
            THANK YOU
          </div>

          {/* tagline */}
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', maxWidth: 600, lineHeight: 1.8, fontFamily: bodyFont }}>
            {bio.slice(0, 160)}{bio.length > 160 ? '…' : ''}
          </p>
        </div>
      </Section>

    </div>
  )
}
