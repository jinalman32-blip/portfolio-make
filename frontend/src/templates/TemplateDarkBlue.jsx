import React from 'react'

const BG   = '#080c1a'
const BG2  = '#0d1127'
const BG3  = '#111827'
const ACC  = '#5b4ff5'
const ACC2 = '#7b6ff8'
const W    = '#ffffff'
const GR   = '#9ca3af'

/* ── helpers ── */
function Pill({ children, style = {} }) {
  return (
    <span style={{
      display: 'inline-block',
      background: ACC,
      color: W,
      fontWeight: 700,
      fontSize: 14,
      padding: '6px 20px',
      borderRadius: 999,
      ...style,
    }}>
      {children}
    </span>
  )
}

function PillTag({ children }) {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <span style={{
        display: 'inline-block',
        background: ACC,
        color: W,
        fontWeight: 700,
        fontSize: 13,
        padding: '8px 22px',
        borderRadius: 999,
      }}>{children}</span>
      {/* small triangle pointer */}
      <span style={{
        position: 'absolute',
        bottom: -7,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 0,
        height: 0,
        borderLeft: '6px solid transparent',
        borderRight: '6px solid transparent',
        borderTop: `7px solid ${ACC}`,
      }} />
    </div>
  )
}

function PhotoBlock({ style = {}, idx = 0 }) {
  const gradients = [
    'linear-gradient(135deg,#1a2040 0%,#2a3060 100%)',
    'linear-gradient(135deg,#1e1e3a 0%,#2d2d5a 100%)',
    'linear-gradient(135deg,#0f1530 0%,#1a2550 100%)',
    'linear-gradient(135deg,#141830 0%,#202850 100%)',
  ]
  return (
    <div style={{
      background: gradients[idx % gradients.length],
      borderRadius: 12,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...style,
    }}>
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={ACC2} strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
    </div>
  )
}

function Divider() {
  return <div style={{ height: 1, background: '#1e2a4a', margin: '0' }} />
}

export default function TemplateDarkBlue({ p = {} }) {
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

  const name    = d.name     || 'Harumi Kobayashi'
  const title   = d.title    || 'Graphic Designer'
  const bio     = d.bio      || 'I am a creative professional passionate about design, branding, and visual storytelling. I bring ideas to life through thoughtful and impactful design solutions.'
  const email   = d.email    || 'hello@portfolio.com'
  const phone   = d.phone    || '+123-456-7890'
  const loc     = d.location || 'New York, USA'
  const website = d.website  || 'www.portfolio.com'

  const skillCount  = skills.length    || 12
  const projCount   = projects.length  || 8
  const expCount    = experience.length || 5

  const edList = education.length ? education : [
    { degree: 'Junior High School', institution: 'City Junior High School', from: '2015', to: '2018', field: 'General Studies' },
    { degree: 'High School Diploma', institution: 'Metropolitan High School', from: '2018', to: '2021', field: 'Arts & Design' },
    { degree: "Bachelor's Degree", institution: 'State University of Design', from: '2021', to: '2025', field: 'Graphic Design' },
  ]

  const projList = projects.length ? projects : [
    { name: 'Brand Identity Design', description: 'Comprehensive brand identity system including logo, color palette, and typography guidelines for a modern tech startup.', tech: ['Illustrator', 'Figma', 'Photoshop'] },
    { name: 'Poster Design Collection', description: 'Series of creative poster designs for cultural events, combining bold typography with striking visual compositions.', tech: ['Photoshop', 'InDesign'] },
    { name: 'Illustration Portfolio', description: 'Original digital illustrations spanning character design, editorial art, and conceptual storytelling across various media.', tech: ['Procreate', 'Illustrator'] },
    { name: 'Logo Design Projects', description: 'Collection of minimal and expressive logos crafted for diverse clients across fashion, tech, and hospitality sectors.', tech: ['Illustrator', 'Sketch'] },
  ]

  const font = "'Segoe UI','Helvetica Neue',Arial,sans-serif"

  /* ══════════════════════════════════════════════════════════ */
  return (
    <div style={{ background: BG, color: W, fontFamily: font, lineHeight: 1.6, overflowX: 'hidden' }}>

      {/* ── PAGE 1: COVER ── */}
      <section style={{ minHeight: '100vh', background: `radial-gradient(ellipse at 60% 40%, #111830 0%, ${BG} 70%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 40px' }}>
        <div style={{ border: '1.5px solid #2a3460', borderRadius: 24, padding: '60px 80px', width: '100%', maxWidth: 900, textAlign: 'center', position: 'relative' }}>
          {/* top label */}
          <div style={{ position: 'absolute', top: -18, right: 40 }}>
            <PillTag>Graphic Designer</PillTag>
          </div>
          {/* creative label */}
          <div style={{ textAlign: 'left', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Creative</div>
          {/* PORTFOLIO giant */}
          <div style={{ fontSize: 'clamp(72px,12vw,140px)', fontWeight: 900, letterSpacing: '-3px', lineHeight: 0.9, textTransform: 'uppercase', marginBottom: 40 }}>
            PORTFOLIO
          </div>
          {/* bottom row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, borderTop: '1px solid #2a3460', paddingTop: 24, marginTop: 8 }}>
            <span style={{ fontWeight: 600, fontSize: 16 }}>{name}</span>
            <div style={{ flex: 1, height: 1, background: '#2a3460', margin: '0 16px', minWidth: 40 }} />
            <span style={{ color: GR, fontSize: 15 }}>I'm a {title}</span>
          </div>
          <div style={{ marginTop: 16, color: ACC2, fontSize: 14 }}>{website}</div>
        </div>
      </section>

      {/* ── PAGE 2: TABLE OF CONTENT ── */}
      <section style={{ minHeight: '80vh', background: `radial-gradient(ellipse at 30% 60%, #0e1530 0%, ${BG} 70%)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 60px' }}>
        <h2 style={{ fontSize: 'clamp(48px,8vw,96px)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-2px', textAlign: 'center', marginBottom: 16 }}>
          TABLE OF CONTENT
        </h2>
        <div style={{ marginBottom: 48 }}>
          <PillTag>Creative Portfolio</PillTag>
        </div>
        <div style={{ width: '100%', maxWidth: 760 }}>
          {[
            { label: 'Background of Education', num: 3 },
            { label: 'Projects Overview',        num: 4 },
            { label: 'Project Design Logo',      num: 5 },
            { label: 'Project Design Poster',    num: 6 },
            { label: 'Project Illustration Work',num: 7 },
            { label: 'Project Brand Identity',   num: 8 },
          ].map((item, i) => (
            <div key={i}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0' }}>
                <span style={{ fontWeight: 700, fontSize: 18 }}>{item.label}</span>
                <span style={{ fontWeight: 900, fontSize: 22, color: ACC2 }}>{item.num}</span>
              </div>
              <Divider />
            </div>
          ))}
        </div>
      </section>

      {/* ── PAGE 3: ABOUT ── */}
      <section style={{ minHeight: '80vh', background: `radial-gradient(ellipse at 70% 30%, #131a38 0%, ${BG} 65%)`, display: 'flex', alignItems: 'center', padding: '80px 60px', gap: 60, flexWrap: 'wrap' }}>
        {/* photo left */}
        <div style={{ flexShrink: 0 }}>
          <div style={{ width: 260, height: 340, borderRadius: 20, border: '2px solid #2a3460', overflow: 'hidden', position: 'relative' }}>
            {d.profileImage ? (
              <img src={d.profileImage} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <>
                <PhotoBlock style={{ width: '100%', height: '100%', borderRadius: 0 }} idx={0} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 80, height: 80, borderRadius: '50%', background: ACC, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 900 }}>
                    {name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        {/* right content */}
        <div style={{ flex: 1, minWidth: 280 }}>
          <div style={{ marginBottom: 8 }}>
            <span style={{ fontSize: 15, color: GR }}>Hi! I'm</span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, marginBottom: 4 }}>{name}</h2>
          <h3 style={{ fontSize: 'clamp(22px,3vw,36px)', fontWeight: 900, color: ACC2, marginBottom: 24 }}>I'm a {title}</h3>
          <p style={{ color: GR, fontSize: 15, marginBottom: 36, maxWidth: 480, lineHeight: 1.8 }}>{bio}</p>
          {/* stats */}
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 32 }}>
            {[
              { num: `${projCount * 25}+`, label: 'Designs Created' },
              { num: `${projCount * 6}+`,  label: 'Projects Done' },
              { num: `${expCount}+`,        label: 'Rewards' },
            ].map((s, i) => (
              <div key={i} style={{ background: BG3, borderRadius: 12, padding: '16px 24px', textAlign: 'center', minWidth: 100 }}>
                <div style={{ fontWeight: 900, fontSize: 28, letterSpacing: '-1px' }}>{s.num}</div>
                <div style={{ color: GR, fontSize: 12, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
          {/* CTA */}
          <a href={`mailto:${email}`} style={{ display: 'inline-block', border: `1.5px solid ${W}`, color: W, padding: '12px 36px', borderRadius: 999, fontWeight: 600, fontSize: 15, textDecoration: 'none', cursor: 'pointer' }}>
            Get in Touch
          </a>
        </div>
      </section>

      {/* ── PAGE 4: EDUCATION ── */}
      <section style={{ minHeight: '80vh', background: `radial-gradient(ellipse at 20% 70%, #0e1530 0%, ${BG} 65%)`, display: 'flex', alignItems: 'center', padding: '80px 60px', gap: 60, flexWrap: 'wrap' }}>
        {/* left */}
        <div style={{ flex: 1, minWidth: 280 }}>
          <h2 style={{ fontSize: 'clamp(32px,5vw,60px)', fontWeight: 900, marginBottom: 40 }}>
            Background <span style={{ color: ACC2 }}>of Education</span>{' '}
            <span style={{ fontSize: '0.7em' }}>🎓</span>
          </h2>
          {edList.map((ed, i) => (
            <div key={i}>
              <div style={{ display: 'flex', gap: 32, padding: '20px 0', alignItems: 'flex-start' }}>
                <div style={{ minWidth: 140 }}>
                  <div style={{ fontWeight: 900, fontSize: 22, color: ACC2 }}>{ed.from || '2020'}</div>
                  <div style={{ fontWeight: 700, fontSize: 15, marginTop: 4 }}>{ed.institution || ed.degree}</div>
                </div>
                <div style={{ color: GR, fontSize: 14, lineHeight: 1.7 }}>
                  {ed.field ? `${ed.degree} in ${ed.field}` : ed.degree}
                  {ed.grade ? ` · GPA ${ed.grade}` : ''}
                  <br />
                  <span style={{ fontSize: 13 }}>{ed.from} – {ed.to}</span>
                </div>
              </div>
              <Divider />
            </div>
          ))}
        </div>
        {/* right photo */}
        <div style={{ flexShrink: 0 }}>
          <PhotoBlock style={{ width: 300, height: 380, borderRadius: 16 }} idx={1} />
        </div>
      </section>

      {/* ── PAGE 5: PROJECT HEADER ── */}
      <section style={{ minHeight: '60vh', background: `radial-gradient(ellipse at 50% 50%, #101530 0%, #000 80%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 60px', position: 'relative' }}>
        {/* corner pill tags */}
        <div style={{ position: 'absolute', top: '28%', left: '10%' }}><PillTag>Design Poster</PillTag></div>
        <div style={{ position: 'absolute', top: '28%', right: '10%' }}><PillTag>Design Logo</PillTag></div>
        <div style={{ position: 'absolute', bottom: '28%', left: '10%' }}><PillTag>Brand Identity</PillTag></div>
        <div style={{ position: 'absolute', bottom: '28%', right: '10%' }}><PillTag>Illustration Work</PillTag></div>
        <h2 style={{ fontSize: 'clamp(80px,14vw,160px)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-4px', textAlign: 'center' }}>
          PROJECT
        </h2>
      </section>

      {/* ── PROJECT SECTIONS (one per project) ── */}
      {projList.map((rawProj, idx) => {
        const proj = { ...rawProj, tech: typeof rawProj.tech === 'string' ? rawProj.tech.split(',').map(x=>x.trim()).filter(Boolean) : rawProj.tech };
        const sectionLabels = ['Project Design Logo', 'Project Design Poster', 'Project Illustration Work', 'Project Brand Identity']
        const label = sectionLabels[idx] || `Project ${idx + 1}`
        const labelParts = label.split(' ')
        const firstWord = labelParts[0] + ' '
        const rest = labelParts.slice(1).join(' ')

        return (
          <section key={idx} style={{ minHeight: '75vh', background: `radial-gradient(ellipse at ${idx % 2 === 0 ? '70%' : '30%'} 40%, #0e1530 0%, #000 70%)`, padding: '80px 60px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {proj.image && <img src={proj.image} alt={proj.name} style={{ width: '100%', maxWidth: 700, height: 200, objectFit: 'cover', borderRadius: 16, marginBottom: 32, display: 'block' }} />}
            <h3 style={{ fontSize: 'clamp(28px,5vw,52px)', fontWeight: 900, textAlign: 'center', marginBottom: 24 }}>
              <span style={{ color: W }}>{firstWord}</span>
              <span style={{ color: ACC2 }}>{rest}</span>
            </h3>

            {idx === 0 && (
              /* Logo style: description + icon circles */
              <>
                <p style={{ color: GR, fontSize: 15, maxWidth: 700, textAlign: 'center', lineHeight: 1.8, marginBottom: 48 }}>{proj.description}</p>
                <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
                  {(Array.isArray(proj.tech) ? proj.tech : ['Figma','Illustrator','Photoshop','Sketch']).map((t, i) => (
                    <div key={i} style={{ width: 100, height: 100, borderRadius: '50%', background: ACC, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 11, textAlign: 'center', padding: 8 }}>
                      {t}
                    </div>
                  ))}
                </div>
              </>
            )}

            {idx === 1 && (
              /* Poster style: wide image + description below */
              <>
                <p style={{ color: GR, fontSize: 14, maxWidth: 760, textAlign: 'center', lineHeight: 1.7, marginBottom: 32 }}>{proj.description}</p>
                <PhotoBlock style={{ width: '100%', maxWidth: 800, height: 300, marginBottom: 32 }} idx={2} />
                <p style={{ color: GR, fontSize: 14, maxWidth: 760, textAlign: 'center', lineHeight: 1.7 }}>
                  Skilled in creating visually compelling posters that communicate brand messages effectively, using bold typography, strong color contrast, and dynamic layout composition.
                </p>
              </>
            )}

            {idx === 2 && (
              /* Illustration: 3 side-by-side images + description */
              <>
                <p style={{ color: GR, fontSize: 14, maxWidth: 760, textAlign: 'center', lineHeight: 1.7, marginBottom: 36 }}>{proj.description}</p>
                <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 32 }}>
                  <PhotoBlock style={{ width: 220, height: 260, flexShrink: 0 }} idx={0} />
                  <PhotoBlock style={{ width: 220, height: 260, flexShrink: 0 }} idx={2} />
                  <PhotoBlock style={{ width: 220, height: 260, flexShrink: 0 }} idx={1} />
                </div>
                <p style={{ color: GR, fontSize: 14, maxWidth: 700, textAlign: 'center', lineHeight: 1.7 }}>
                  Each illustration reflects a unique narrative — from editorial conceptual art to vibrant character design — showcasing versatility and a distinctive visual voice.
                </p>
              </>
            )}

            {idx >= 3 && (
              /* Brand Identity: 2 images with pill labels */
              <>
                <h4 style={{ color: ACC2, fontSize: 16, marginBottom: 32 }}>{proj.tech ? proj.tech.join(' · ') : 'Branding · Identity'}</h4>
                <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
                  {['Client A', 'Client B'].map((client, ci) => (
                    <div key={ci} style={{ position: 'relative', borderRadius: 16, overflow: 'hidden' }}>
                      <PhotoBlock style={{ width: 300, height: 320 }} idx={ci + 2} />
                      <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}>
                        <Pill style={{ fontSize: 13, padding: '8px 24px' }}>{ci === 0 ? (proj.name || client) : (proj.tech?.[0] || client)}</Pill>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </section>
        )
      })}

      {/* ── SKILLS SECTION (extra if skills exist) ── */}
      {skills.length > 0 && (
        <section style={{ background: `radial-gradient(ellipse at 40% 60%, #101530 0%, ${BG} 70%)`, padding: '80px 60px' }}>
          <h2 style={{ fontSize: 'clamp(32px,5vw,56px)', fontWeight: 900, textAlign: 'center', marginBottom: 12 }}>
            My <span style={{ color: ACC2 }}>Skills</span>
          </h2>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <Pill>Creative Portfolio</Pill>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center', maxWidth: 800, margin: '0 auto' }}>
            {skills.map((sk, i) => (
              <div key={i} style={{ background: BG3, borderRadius: 12, padding: '12px 24px', border: `1px solid #1e2a4a` }}>
                <div style={{ fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>{sk.image && <img src={sk.image} alt={sk.name} style={{ width:18, height:18, objectFit:'cover', borderRadius:3 }} />}{sk.name}</div>
                <div style={{ color: ACC2, fontSize: 12, marginTop: 4 }}>{sk.level}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── EXPERIENCE SECTION (if exists) ── */}
      {experience.length > 0 && (
        <section style={{ background: `radial-gradient(ellipse at 70% 40%, #0e1535 0%, ${BG} 65%)`, padding: '80px 60px' }}>
          <h2 style={{ fontSize: 'clamp(32px,5vw,56px)', fontWeight: 900, textAlign: 'center', marginBottom: 12 }}>
            Work <span style={{ color: ACC2 }}>Experience</span>
          </h2>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <Pill>Professional Journey</Pill>
          </div>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            {experience.map((ex, i) => (
              <div key={i}>
                <div style={{ display: 'flex', gap: 32, padding: '20px 0', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  <div style={{ minWidth: 120 }}>
                    <div style={{ fontWeight: 900, fontSize: 18, color: ACC2 }}>{ex.from || '2020'}</div>
                    <div style={{ color: GR, fontSize: 13 }}>{ex.from} – {ex.to || 'Present'}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>{ex.role}</div>
                    <div style={{ color: ACC2, fontSize: 14, marginBottom: 8 }}>{ex.company}</div>
                    <div style={{ color: GR, fontSize: 14, lineHeight: 1.7 }}>{ex.description}</div>
                  </div>
                </div>
                <Divider />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── CERTIFICATIONS ── */}
      {certifications.length > 0 && (
        <section style={{ background: `radial-gradient(ellipse at 50% 50%, #101530 0%, ${BG} 70%)`, padding: '80px 60px' }}>
          <h2 style={{ fontSize: 'clamp(32px,5vw,56px)', fontWeight: 900, textAlign: 'center', marginBottom: 12 }}>
            My <span style={{ color: ACC2 }}>Certifications</span>
          </h2>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <Pill>Professional Growth</Pill>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 24, maxWidth: 1000, margin: '0 auto' }}>
            {certifications.map((cert, i) => (
              <div key={i} style={{ background: BG3, borderRadius: 12, padding: '16px 20px', border: `1px solid #1e2a4a`, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                {cert.image && <img src={cert.image} alt={cert.name} style={{ width:48, height:48, objectFit:'cover', borderRadius:8, flexShrink:0 }} />}
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{cert.name}</div>
                  {cert.issuer && <div style={{ color: ACC2, fontSize: 12, marginTop: 4 }}>{cert.issuer}</div>}
                  {cert.date && <div style={{ color: GR, fontSize: 11, marginTop: 2 }}>{cert.date}</div>}
                  {cert.url && <a href={cert.url} style={{ fontSize: 11, color: ACC2, marginTop: 4, display: 'block' }}>View ↗</a>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── PUBLICATIONS ── */}
      {publications.length > 0 && (
        <section style={{ background: `radial-gradient(ellipse at 40% 60%, #0e1530 0%, ${BG} 70%)`, padding: '80px 60px' }}>
          <h2 style={{ fontSize: 'clamp(32px,5vw,56px)', fontWeight: 900, textAlign: 'center', marginBottom: 12 }}>
            My <span style={{ color: ACC2 }}>Publications</span>
          </h2>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <Pill>Research & Writing</Pill>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 24, maxWidth: 1000, margin: '0 auto' }}>
            {publications.map((pub, i) => (
              <div key={i} style={{ background: BG3, borderRadius: 12, padding: '16px 20px', border: `1px solid #1e2a4a`, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                {pub.image && <img src={pub.image} alt={pub.title} style={{ width:48, height:48, objectFit:'cover', borderRadius:8, flexShrink:0 }} />}
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{pub.title}</div>
                  {pub.publisher && <div style={{ color: ACC2, fontSize: 12, marginTop: 4 }}>{pub.publisher}</div>}
                  {pub.date && <div style={{ color: GR, fontSize: 11, marginTop: 2 }}>{pub.date}</div>}
                  {pub.url && <a href={pub.url} style={{ fontSize: 11, color: ACC2, marginTop: 4, display: 'block' }}>Read ↗</a>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── AWARDS ── */}
      {awards.length > 0 && (
        <section style={{ background: `radial-gradient(ellipse at 60% 40%, #0e1535 0%, ${BG} 70%)`, padding: '80px 60px' }}>
          <h2 style={{ fontSize: 'clamp(32px,5vw,56px)', fontWeight: 900, textAlign: 'center', marginBottom: 12 }}>
            My <span style={{ color: ACC2 }}>Awards</span>
          </h2>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <Pill>Recognition</Pill>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 24, maxWidth: 1000, margin: '0 auto' }}>
            {awards.map((award, i) => (
              <div key={i} style={{ background: BG3, borderRadius: 12, padding: '16px 20px', border: `1px solid #1e2a4a`, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                {award.image && <img src={award.image} alt={award.title} style={{ width:48, height:48, objectFit:'cover', borderRadius:8, flexShrink:0 }} />}
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{award.title}</div>
                  {award.organization && <div style={{ color: ACC2, fontSize: 12, marginTop: 4 }}>{award.organization}</div>}
                  {award.date && <div style={{ color: GR, fontSize: 11, marginTop: 2 }}>{award.date}</div>}
                  {award.description && <div style={{ color: GR, fontSize: 13, marginTop: 6, lineHeight: 1.7 }}>{award.description}</div>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── PAGE 10: THANK YOU ── */}
      <section style={{ minHeight: '80vh', background: `radial-gradient(ellipse at 50% 50%, #111830 0%, #000 80%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 40px' }}>
        <div style={{ border: '1.5px solid #2a3460', borderRadius: 24, padding: '60px 80px', width: '100%', maxWidth: 900, textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(72px,12vw,140px)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-4px', lineHeight: 0.9, marginBottom: 60 }}>
            THANK YOU
          </h2>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { icon: '🌐', text: website },
              { icon: '✉️', text: email },
              { icon: '📍', text: loc },
              { icon: '📞', text: phone },
            ].map((c, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: ACC, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                  {c.icon}
                </div>
                <span style={{ fontSize: 15, color: GR }}>{c.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
