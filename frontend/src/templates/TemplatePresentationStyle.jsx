import React from 'react'

/* ── Palette — matches PDF exactly ── */
const BG     = '#E8E6E0'   // light warm gray background
const BLACK  = '#1a1a1a'   // near-black text
const GOLD   = '#C8860A'   // golden amber accent
const WHITE  = '#FFFFFF'
const LGRAY  = '#d4d2cc'   // subtle divider

const lvl = { Beginner: '35%', Intermediate: '65%', Expert: '92%' }

/* ── Small top-right badge shown on every section ── */
function TopBadge({ name = '', title = '' }) {
  return (
    <div style={{
      position: 'absolute', top: 28, right: 36,
      textAlign: 'right', lineHeight: 1.4,
    }}>
      <div style={{ fontSize: 11, fontWeight: 800, color: GOLD, letterSpacing: 1.5, textTransform: 'uppercase' }}>
        {name}
      </div>
      <div style={{ fontSize: 10, fontWeight: 600, color: BLACK, letterSpacing: 1.2, textTransform: 'uppercase', opacity: 0.7 }}>
        {title}
      </div>
    </div>
  )
}

/* ── Section heading with orange underline ── */
function SectionHead({ children, style = {} }) {
  return (
    <div style={{ marginBottom: 24, ...style }}>
      <h2 style={{
        fontSize: 40, fontWeight: 900, color: BLACK,
        margin: 0, lineHeight: 1.1,
        fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
      }}>
        {children}
      </h2>
      <div style={{ width: 40, height: 3, background: GOLD, marginTop: 10, borderRadius: 2 }} />
    </div>
  )
}

/* ── Italic serif display font for cover ── */
function DisplayItalic({ children, size = 80 }) {
  return (
    <span style={{
      fontFamily: "'Georgia', 'Times New Roman', serif",
      fontStyle: 'italic',
      fontWeight: 400,
      fontSize: size,
      color: BLACK,
      lineHeight: 1,
    }}>
      {children}
    </span>
  )
}

/* ── Golden service card (What I Do grid) ── */
function GoldenCard({ label }) {
  return (
    <div style={{
      background: GOLD,
      color: WHITE,
      padding: '28px 20px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      textAlign: 'center',
      fontSize: 15, fontWeight: 700, lineHeight: 1.4,
      minHeight: 100,
    }}>
      {label}
    </div>
  )
}

/* ── Timeline step ── */
function TimelineStep({ number, title, desc }) {
  return (
    <div style={{ textAlign: 'center', flex: 1 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: BLACK, marginBottom: 8 }}>{title}</div>
      <div style={{
        width: 44, height: 44, borderRadius: '50%',
        background: GOLD, color: WHITE,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 18, fontWeight: 800, margin: '0 auto 8px',
      }}>
        {number}
      </div>
      <div style={{ fontSize: 12, color: BLACK, opacity: 0.7, lineHeight: 1.5 }}>{desc}</div>
    </div>
  )
}

/* ── Page number badge ── */
function PageNum({ n }) {
  return (
    <div style={{
      position: 'absolute', bottom: 20, right: 36,
      fontSize: 13, fontWeight: 600, color: BLACK, opacity: 0.4,
    }}>
      {n}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════ */
export default function TemplatePresentationStyle({ p = {} }) {
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

  const name  = d.name  || 'Your Name'
  const title = d.title || 'Professional | Strategy, Content, Growth'

  /* Build "What I Do" cards from skills or fall back to generic */
  const serviceCards = skills.length >= 3
    ? skills.slice(0, 6).map(s => s.name)
    : ['Digital Marketing Strategy', 'Content & Campaign Planning', 'Social Media Planning', 'Email Marketing', 'Paid Ad Strategy', 'Analytics & Reporting']

  /* Build process steps */
  const processSteps = [
    { title: 'Discovery',    desc: 'Goals, audience, voice' },
    { title: 'Research',     desc: 'Competitor & keyword insights' },
    { title: 'Planning',     desc: 'Editorial calendar & campaign' },
    { title: 'Execution',    desc: 'Content production & launch' },
    { title: 'Optimization', desc: 'Report, review, refine' },
  ]

  const sectionStyle = {
    position: 'relative',
    background: BG,
    padding: '52px 56px 60px',
    borderBottom: `1px solid ${LGRAY}`,
    minHeight: 420,
    overflow: 'hidden',
  }

  return (
    <div
      id="portfolio-render"
      style={{
        fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
        background: BG,
        color: BLACK,
        minWidth: 820,
      }}
    >
      {/* ── 1. COVER ── */}
      <div style={{
        ...sectionStyle,
        minHeight: 500,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
        borderBottom: `1px solid ${LGRAY}`,
      }}>
        <div style={{ lineHeight: 1 }}>
          <DisplayItalic size={88}>Personal</DisplayItalic>
          <br />
          <span style={{ fontSize: 88, fontWeight: 900, color: BLACK, fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif" }}>
            Portfolio
          </span>
        </div>
        <div style={{ width: 40, height: 3, background: GOLD, margin: '28px auto 20px', borderRadius: 2 }} />
        <div style={{ fontSize: 26, fontWeight: 600, color: BLACK, marginBottom: 8 }}>{name}</div>
        <div style={{ fontSize: 14, color: BLACK, opacity: 0.6, letterSpacing: 0.5 }}>{title}</div>
      </div>

      {/* ── 2. WHO I AM ── */}
      <div style={{ ...sectionStyle, display: 'flex', gap: 56, alignItems: 'center' }}>
        <TopBadge name={name} title={title} />
        <div style={{ flex: 1 }}>
          <SectionHead>Who I Am</SectionHead>
          <p style={{ fontSize: 22, fontWeight: 700, color: BLACK, lineHeight: 1.45, marginBottom: 20 }}>
            {d.bio
              ? d.bio.split('.').slice(0, 2).join('.') + '.'
              : `I'm a results-driven ${d.title || 'professional'} with a passion for creating work that connects and converts.`
            }
          </p>
          {d.bio && (
            <p style={{ fontSize: 14, color: BLACK, opacity: 0.7, lineHeight: 1.8 }}>
              {d.bio}
            </p>
          )}
          {(d.email || d.location || d.phone) && (
            <div style={{ display: 'flex', gap: 20, marginTop: 20, flexWrap: 'wrap' }}>
              {d.email    && <span style={{ fontSize: 13, color: BLACK, opacity: 0.6 }}>✉ {d.email}</span>}
              {d.phone    && <span style={{ fontSize: 13, color: BLACK, opacity: 0.6 }}>📞 {d.phone}</span>}
              {d.location && <span style={{ fontSize: 13, color: BLACK, opacity: 0.6 }}>📍 {d.location}</span>}
            </div>
          )}
        </div>
        {/* decorative right panel */}
        <div style={{
          width: 240, flexShrink: 0,
          background: `${LGRAY}55`,
          borderRadius: 8,
          minHeight: 260,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 64, color: GOLD, fontWeight: 900,
          fontFamily: 'Georgia, serif', fontStyle: 'italic',
          userSelect: 'none',
        }}>
          {name[0]}
        </div>
        <PageNum n={3} />
      </div>

      {/* ── 3. WHAT I DO ── */}
      <div style={{ ...sectionStyle }}>
        <TopBadge name={name} title={title} />
        <SectionHead>What I Do</SectionHead>
        <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
          <div style={{ flex: 1, maxWidth: 300 }}>
            <p style={{ fontSize: 14, color: BLACK, opacity: 0.72, lineHeight: 1.8 }}>
              {d.bio
                ? `I've built strategies across a range of industries. Each experience has sharpened my ability to adapt to diverse audiences while maintaining strategic consistency.`
                : `I've built strategies across diverse industries. Each experience sharpens my ability to adapt messaging while maintaining strategic consistency.`
              }
            </p>
          </div>
          <div style={{
            flex: 2,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 2,
          }}>
            {serviceCards.map((card, i) => (
              <GoldenCard key={i} label={card} />
            ))}
          </div>
        </div>
        <PageNum n={4} />
      </div>

      {/* ── 4. SKILLS SNAPSHOT ── */}
      {skills.length > 0 && (
        <div style={{ ...sectionStyle }}>
          <TopBadge name={name} title={title} />
          <SectionHead>Skills Snapshot</SectionHead>
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.min(skills.length, 4)}, 1fr)`,
            gap: 32,
            marginTop: 20,
          }}>
            {skills.map((sk, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                {/* icon circle - use image if available */}
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  border: `2px solid ${BLACK}22`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 14px',
                  fontSize: 22,
                  overflow: 'hidden',
                }}>
                  {sk.image ? <img src={sk.image} alt={sk.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} /> : ['📋','📈','✍️','📊','🛠️','🎯','💡','🔍'][i % 8]}
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: GOLD, marginBottom: 6 }}>{sk.name}</div>
                <div style={{ fontSize: 12, color: BLACK, opacity: 0.65, marginBottom: 10 }}>{sk.level}</div>
                <div style={{ height: 4, background: `${BLACK}15`, borderRadius: 2 }}>
                  <div style={{ height: '100%', width: lvl[sk.level] || '60%', background: GOLD, borderRadius: 2 }} />
                </div>
              </div>
            ))}
          </div>
          <PageNum n={5} />
        </div>
      )}

      {/* ── 5. MY PROCESS ── */}
      <div style={{ ...sectionStyle }}>
        <TopBadge name={name} title={title} />
        <SectionHead>My Process</SectionHead>
        <div style={{ position: 'relative', marginTop: 20 }}>
          {/* connector line */}
          <div style={{
            position: 'absolute', top: 70, left: '10%', right: '10%',
            height: 2, background: GOLD, zIndex: 0,
          }} />
          <div style={{ display: 'flex', gap: 8, position: 'relative', zIndex: 1 }}>
            {processSteps.map((step, i) => (
              <TimelineStep key={i} number={i + 1} title={step.title} desc={step.desc} />
            ))}
          </div>
        </div>
        <PageNum n={6} />
      </div>

      {/* ── 6. EXPERIENCE ── */}
      {experience.length > 0 && (
        <div style={{ ...sectionStyle }}>
          <TopBadge name={name} title={title} />
          <SectionHead>Experience</SectionHead>
          {experience.map((exp, i) => (
            <div key={i} style={{
              marginBottom: 24,
              paddingBottom: 24,
              borderBottom: i < experience.length - 1 ? `1px solid ${LGRAY}` : 'none',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: BLACK }}>{exp.role}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: GOLD, marginTop: 2 }}>
                    {exp.company}{exp.location ? ` · ${exp.location}` : ''}
                  </div>
                </div>
                <div style={{
                  fontSize: 12, color: BLACK, opacity: 0.55,
                  background: `${GOLD}15`, borderRadius: 20,
                  padding: '4px 14px', border: `1px solid ${GOLD}30`,
                }}>
                  {exp.from || ''}{exp.to ? ` – ${exp.current ? 'Present' : exp.to}` : ''}
                </div>
              </div>
              {exp.description && (
                <p style={{ fontSize: 14, color: BLACK, opacity: 0.7, lineHeight: 1.75 }}>{exp.description}</p>
              )}
            </div>
          ))}
          <PageNum n={7} />
        </div>
      )}

      {/* ── 7. EDUCATION ── */}
      {education.length > 0 && (
        <div style={{ ...sectionStyle }}>
          <TopBadge name={name} title={title} />
          <SectionHead>Education</SectionHead>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {education.map((edu, i) => (
              <div key={i} style={{
                padding: '20px 24px',
                border: `1px solid ${LGRAY}`,
                borderLeft: `4px solid ${GOLD}`,
                borderRadius: 4,
              }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: BLACK }}>
                  {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                </div>
                <div style={{ fontSize: 14, color: GOLD, fontWeight: 600, margin: '4px 0' }}>{edu.institution}</div>
                <div style={{ fontSize: 12, color: BLACK, opacity: 0.55 }}>
                  {edu.from || ''}{edu.to ? ` – ${edu.to}` : ''}{edu.grade ? ` · ${edu.grade}` : ''}
                </div>
              </div>
            ))}
          </div>
          <PageNum n={8} />
        </div>
      )}

      {/* ── 8. PROJECTS ── */}
      {projects.length > 0 && (
        <div style={{ ...sectionStyle }}>
          <TopBadge name={name} title={title} />
          <SectionHead>Projects</SectionHead>
          {projects.map((proj, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: 32, marginBottom: 32,
              paddingBottom: 32,
              borderBottom: i < projects.length - 1 ? `1px solid ${LGRAY}` : 'none',
            }}>
              {/* left */}
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: GOLD, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.8 }}>
                  Project
                </div>
                <div style={{ fontSize: 22, fontWeight: 900, color: BLACK, marginBottom: 10 }}>{proj.name}</div>
                {proj.tech && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                    {proj.tech.split(',').map((t, ti) => (
                      <span key={ti} style={{
                        fontSize: 11, padding: '3px 10px', borderRadius: 20,
                        background: `${GOLD}18`, color: GOLD,
                        border: `1px solid ${GOLD}35`, fontWeight: 600,
                      }}>
                        {t.trim()}
                      </span>
                    ))}
                  </div>
                )}
                {(proj.link || proj.github) && (
                  <div style={{ display: 'flex', gap: 12 }}>
                    {proj.link   && <a href={proj.link}   style={{ fontSize: 12, color: GOLD, fontWeight: 600 }}>Live ↗</a>}
                    {proj.github && <a href={proj.github} style={{ fontSize: 12, color: BLACK, opacity: 0.6, fontWeight: 600 }}>GitHub ↗</a>}
                  </div>
                )}
              </div>
              {/* right */}
              <div>
                {proj.image && <img src={proj.image} alt={proj.name} style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 8, marginBottom: 12, display: 'block' }} />}
                <div style={{ fontSize: 14, fontWeight: 700, color: BLACK, marginBottom: 8 }}>Description</div>
                <p style={{ fontSize: 14, color: BLACK, opacity: 0.7, lineHeight: 1.8 }}>{proj.description}</p>
              </div>
            </div>
          ))}
          <PageNum n={9} />
        </div>
      )}

      {/* ── CERTIFICATIONS ── */}
      {certifications.length > 0 && (
        <div style={{ ...sectionStyle }}>
          <TopBadge name={name} title={title} />
          <SectionHead>Certifications</SectionHead>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 20 }}>
            {certifications.map((cert, i) => (
              <div key={i} style={{ padding: '16px 20px', border: `1px solid ${LGRAY}`, borderLeft: `4px solid ${GOLD}`, borderRadius: 4, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                {cert.image && <img src={cert.image} alt={cert.name} style={{ width:48, height:48, objectFit:'cover', borderRadius:8, flexShrink:0 }} />}
                <div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: BLACK }}>{cert.name}</div>
                  {cert.issuer && <div style={{ fontSize: 13, color: GOLD, fontWeight: 600, marginTop: 3 }}>{cert.issuer}</div>}
                  {cert.date && <div style={{ fontSize: 12, color: BLACK, opacity: 0.55, marginTop: 2 }}>{cert.date}</div>}
                  {cert.url && <a href={cert.url} style={{ fontSize: 12, color: GOLD, fontWeight: 600, marginTop: 4, display: 'block' }}>View ↗</a>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── PUBLICATIONS ── */}
      {publications.length > 0 && (
        <div style={{ ...sectionStyle }}>
          <TopBadge name={name} title={title} />
          <SectionHead>Publications</SectionHead>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 20 }}>
            {publications.map((pub, i) => (
              <div key={i} style={{ padding: '16px 20px', border: `1px solid ${LGRAY}`, borderLeft: `4px solid ${GOLD}`, borderRadius: 4, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                {pub.image && <img src={pub.image} alt={pub.title} style={{ width:48, height:48, objectFit:'cover', borderRadius:8, flexShrink:0 }} />}
                <div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: BLACK }}>{pub.title}</div>
                  {pub.publisher && <div style={{ fontSize: 13, color: GOLD, fontWeight: 600, marginTop: 3 }}>{pub.publisher}</div>}
                  {pub.date && <div style={{ fontSize: 12, color: BLACK, opacity: 0.55, marginTop: 2 }}>{pub.date}</div>}
                  {pub.url && <a href={pub.url} style={{ fontSize: 12, color: GOLD, fontWeight: 600, marginTop: 4, display: 'block' }}>Read ↗</a>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── AWARDS ── */}
      {awards.length > 0 && (
        <div style={{ ...sectionStyle }}>
          <TopBadge name={name} title={title} />
          <SectionHead>Awards</SectionHead>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 20 }}>
            {awards.map((award, i) => (
              <div key={i} style={{ padding: '16px 20px', border: `1px solid ${LGRAY}`, borderLeft: `4px solid ${GOLD}`, borderRadius: 4, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                {award.image && <img src={award.image} alt={award.title} style={{ width:48, height:48, objectFit:'cover', borderRadius:8, flexShrink:0 }} />}
                <div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: BLACK }}>{award.title}</div>
                  {award.organization && <div style={{ fontSize: 13, color: GOLD, fontWeight: 600, marginTop: 3 }}>{award.organization}</div>}
                  {award.date && <div style={{ fontSize: 12, color: BLACK, opacity: 0.55, marginTop: 2 }}>{award.date}</div>}
                  {award.description && <p style={{ fontSize: 13, color: BLACK, opacity: 0.7, lineHeight: 1.75, marginTop: 6 }}>{award.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 9. LET'S CONNECT ── */}
      <div style={{ ...sectionStyle, display: 'flex', alignItems: 'center', gap: 60 }}>
        <TopBadge name={name} title={title} />
        <div style={{ flex: 1 }}>
          <SectionHead>Let's Connect</SectionHead>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 8 }}>
            {d.email && (
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: BLACK, marginBottom: 2 }}>Email</div>
                <div style={{ fontSize: 14, color: BLACK, opacity: 0.65 }}>{d.email}</div>
              </div>
            )}
            {d.website && (
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: BLACK, marginBottom: 2 }}>Website</div>
                <div style={{ fontSize: 14, color: BLACK, opacity: 0.65 }}>{d.website}</div>
              </div>
            )}
            {d.linkedin && (
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: BLACK, marginBottom: 2 }}>LinkedIn</div>
                <div style={{ fontSize: 14, color: BLACK, opacity: 0.65 }}>{d.linkedin}</div>
              </div>
            )}
            {d.location && (
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: BLACK, marginBottom: 2 }}>Location</div>
                <div style={{ fontSize: 14, color: BLACK, opacity: 0.65 }}>{d.location}</div>
              </div>
            )}
          </div>
        </div>
        {/* Decorative right column */}
        <div style={{
          width: 260, flexShrink: 0,
          minHeight: 280,
          background: `linear-gradient(135deg, ${LGRAY}88, ${LGRAY}44)`,
          borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column', gap: 12,
        }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: GOLD, opacity: 0.2 }} />
          <div style={{ fontSize: 13, color: BLACK, opacity: 0.45, fontWeight: 600 }}>Reach out anytime</div>
        </div>
        <PageNum n={10} />
      </div>

      {/* ── 10. THE END ── */}
      <div style={{
        ...sectionStyle,
        minHeight: 400,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
        borderBottom: 'none',
      }}>
        <div style={{ lineHeight: 1 }}>
          <DisplayItalic size={88}>The</DisplayItalic>
          <br />
          <span style={{ fontSize: 88, fontWeight: 900, color: BLACK, fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif" }}>
            End
          </span>
        </div>
        <div style={{ width: 40, height: 3, background: GOLD, margin: '28px auto 20px', borderRadius: 2 }} />
        <div style={{ fontSize: 26, fontWeight: 600, color: BLACK, marginBottom: 8 }}>{name}</div>
        <div style={{ fontSize: 14, color: BLACK, opacity: 0.6 }}>{title}</div>
      </div>
    </div>
  )
}
