import React from 'react'

const BR = '#3D2B1F'      // dark brown text/headings
const BM = '#7B5B3A'      // medium brown accents / borders
const BL = '#A67C52'      // light brown for labels
const CREAM = '#FAF7F2'   // page background
const BEIGE = '#E8D5C0'   // decorative circle fill
const lvl = { Beginner: '35%', Intermediate: '65%', Expert: '90%' }

/* ── decorative circle ── */
function Circle({ size = 60, color = BEIGE, style = {} }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: color, flexShrink: 0, ...style,
    }} />
  )
}

/* ── avatar with thick brown ring ── */
function Avatar({ initial, profileImage }) {
  return (
    <div style={{
      width: 96, height: 96, borderRadius: '50%',
      border: `5px solid ${BM}`,
      background: BEIGE,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 38, fontWeight: 900, color: BR,
      flexShrink: 0, overflow: 'hidden',
    }}>
      {profileImage ? (
        <img src={profileImage} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : initial}
    </div>
  )
}

/* ── section card ── */
function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{
        display: 'inline-block',
        background: BM, color: '#fff',
        borderRadius: 30, padding: '6px 22px',
        fontSize: 15, fontWeight: 700,
        marginBottom: 16, letterSpacing: 0.3,
      }}>
        {title}
      </div>
      {children}
    </div>
  )
}

export default function TemplateBrownCream({ p = {} }) {
  const { details: d = {}, skills = [], education = [], experience = [], projects = [], certifications = [], publications = [], awards = [] } = p

  return (
    <div id="portfolio-render" style={{
      fontFamily: "'Segoe UI', Georgia, system-ui, sans-serif",
      background: CREAM, color: BR, minHeight: '100vh',
    }}>

      {/* ─── HERO ─── */}
      <div style={{ position: 'relative', padding: '52px 64px 44px', overflow: 'hidden' }}>

        {/* decorative circles */}
        <Circle size={52} color={BEIGE} style={{ position: 'absolute', top: 18, right: 200 }} />
        <Circle size={72} color={BEIGE} style={{ position: 'absolute', bottom: -20, left: 340 }} />
        <Circle size={110} color={BM} style={{ position: 'absolute', bottom: -55, right: -30, opacity: 0.7 }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 32, maxWidth: 960, margin: '0 auto' }}>
          {/* big decorative ring around avatar */}
          <div style={{
            width: 170, height: 170, borderRadius: '50%',
            border: `8px solid ${BM}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, background: BEIGE,
            boxShadow: `0 6px 30px rgba(123,91,58,0.2)`,
          }}>
            <Avatar initial={(d.name || 'U')[0].toUpperCase()} profileImage={d.profileImage} />
          </div>

          <div>
            <h1 style={{ fontSize: 46, fontWeight: 900, color: BR, margin: 0, lineHeight: 1.05 }}>
              {d.name || 'Your Name'}
            </h1>
            {d.title && (
              <div style={{
                display: 'inline-block', marginTop: 10,
                background: BM, color: '#fff',
                borderRadius: 30, padding: '6px 22px',
                fontSize: 15, fontWeight: 600,
              }}>
                {d.title}
              </div>
            )}
            {d.bio && (
              <p style={{ marginTop: 14, fontSize: 14, color: '#5a4030', lineHeight: 1.75, maxWidth: 480 }}>
                {d.bio}
              </p>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 20px', marginTop: 12 }}>
              {d.email    && <span style={{ fontSize: 13, color: BL }}>✉ {d.email}</span>}
              {d.phone    && <span style={{ fontSize: 13, color: BL }}>📞 {d.phone}</span>}
              {d.location && <span style={{ fontSize: 13, color: BL }}>📍 {d.location}</span>}
              {d.website  && <a href={d.website} style={{ fontSize: 13, color: BM }}>🌐 {d.website}</a>}
            </div>
          </div>
        </div>
      </div>

      {/* ─── DIVIDER LINE ─── */}
      <div style={{ height: 3, background: `linear-gradient(90deg,${BM},${BEIGE},${BM})`, opacity: 0.4 }} />

      {/* ─── BODY ─── */}
      <div style={{
        maxWidth: 960, margin: '0 auto',
        padding: '40px 64px',
        display: 'grid',
        gridTemplateColumns: '1fr 1.6fr',
        gap: 40,
      }}>

        {/* ── LEFT COLUMN ── */}
        <div>

          {/* Skills */}
          {skills.length > 0 && (
            <Section title="Skills &amp; Expertise">
              {skills.map((s, i) => (
                <div key={i} style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {s.image && <img src={s.image} alt={s.name} style={{ width: 20, height: 20, objectFit: 'cover', borderRadius: 4 }} />}
                      <span style={{ fontSize: 13, fontWeight: 700, color: BR }}>{s.name}</span>
                    </div>
                    <span style={{ fontSize: 11, color: BL, fontStyle: 'italic' }}>{s.level}</span>
                  </div>
                  <div style={{ height: 7, background: BEIGE, borderRadius: 4, border: `1px solid ${BEIGE}` }}>
                    <div style={{
                      height: '100%', width: lvl[s.level] || '50%',
                      background: `linear-gradient(90deg,${BM},${BL})`,
                      borderRadius: 4,
                    }} />
                  </div>
                </div>
              ))}
            </Section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <Section title="Education">
              {education.map((e, i) => (
                <div key={i} style={{
                  marginBottom: 16, paddingLeft: 14,
                  borderLeft: `4px solid ${BM}`,
                }}>
                  <p style={{ fontWeight: 800, fontSize: 14, margin: 0, color: BR }}>
                    {e.degree}{e.field ? ` in ${e.field}` : ''}
                  </p>
                  <p style={{ fontSize: 13, color: BM, marginTop: 3, fontWeight: 600 }}>{e.institution}</p>
                  <p style={{ fontSize: 12, color: BL, marginTop: 2 }}>
                    {e.from}{e.to ? ` — ${e.to}` : ''}{e.grade ? ` · ${e.grade}` : ''}
                  </p>
                </div>
              ))}
            </Section>
          )}
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div>

          {/* Experience */}
          {experience.length > 0 && (
            <Section title="Experience">
              {experience.map((e, i) => (
                <div key={i} style={{
                  marginBottom: 16, padding: '16px 18px',
                  background: '#fff', borderRadius: 14,
                  border: `1.5px solid ${BEIGE}`,
                  boxShadow: `0 2px 10px rgba(123,91,58,0.08)`,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 }}>
                    <div>
                      <p style={{ fontWeight: 800, fontSize: 15, margin: 0, color: BR }}>{e.role}</p>
                      <p style={{ fontSize: 13, color: BM, marginTop: 2, fontWeight: 600 }}>
                        {e.company}{e.location ? ` · ${e.location}` : ''}
                      </p>
                    </div>
                    <span style={{ fontSize: 12, color: BL, whiteSpace: 'nowrap' }}>
                      {e.from}{e.to ? ` – ${e.current ? 'Present' : e.to}` : ''}
                    </span>
                  </div>
                  {e.description && (
                    <p style={{ fontSize: 13, color: '#5a4030', marginTop: 8, lineHeight: 1.65 }}>
                      {e.description}
                    </p>
                  )}
                </div>
              ))}
            </Section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <Section title="Projects">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {projects.map((proj, i) => (
                  <div key={i} style={{
                    background: '#fff', borderRadius: 14,
                    border: `1.5px solid ${BEIGE}`,
                    boxShadow: `0 2px 10px rgba(123,91,58,0.08)`,
                    overflow: 'hidden',
                  }}>
                    {proj.image && (
                      <img src={proj.image} alt={proj.name} style={{ width: '100%', height: 90, objectFit: 'cover', display: 'block' }} />
                    )}
                    <div style={{ padding: '12px 14px' }}>
                      <p style={{ fontWeight: 800, fontSize: 14, margin: 0, color: BR }}>{proj.name}</p>
                      <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                        {proj.link   && <a href={proj.link}   style={{ fontSize: 11, color: BM }}>Live ↗</a>}
                        {proj.github && <a href={proj.github} style={{ fontSize: 11, color: BM }}>GitHub ↗</a>}
                      </div>
                      {proj.description && (
                        <p style={{ fontSize: 12, color: '#5a4030', marginTop: 6, lineHeight: 1.55 }}>
                          {proj.description}
                        </p>
                      )}
                      {proj.tech && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 8 }}>
                          {proj.tech.split(',').map((t, j) => (
                            <span key={j} style={{
                              fontSize: 10, padding: '2px 8px', borderRadius: 20,
                              background: `${BEIGE}`, color: BM,
                              border: `1px solid ${BL}55`, fontWeight: 600,
                            }}>
                              {t.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <Section title="Certifications">
              {certifications.map((cert, i) => (
                <div key={i} style={{
                  marginBottom: 12, padding: '12px 14px',
                  background: '#fff', borderRadius: 14,
                  border: `1.5px solid ${BEIGE}`,
                  boxShadow: `0 2px 10px rgba(123,91,58,0.08)`,
                  display: 'flex', gap: 12, alignItems: 'flex-start',
                }}>
                  {cert.image && (
                    <img src={cert.image} alt={cert.name} style={{ width: 52, height: 52, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />
                  )}
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 800, fontSize: 14, margin: 0, color: BR }}>{cert.name}</p>
                    <p style={{ fontSize: 12, color: BM, marginTop: 2, fontWeight: 600 }}>{cert.issuer}</p>
                    <div style={{ display: 'flex', gap: 12, marginTop: 4, flexWrap: 'wrap' }}>
                      {cert.date && <span style={{ fontSize: 11, color: BL }}>{cert.date}</span>}
                      {cert.credentialId && <span style={{ fontSize: 11, color: BL }}>ID: {cert.credentialId}</span>}
                      {cert.url && <a href={cert.url} style={{ fontSize: 11, color: BM }}>Verify ↗</a>}
                    </div>
                  </div>
                </div>
              ))}
            </Section>
          )}

          {/* Publications */}
          {publications.length > 0 && (
            <Section title="Publications">
              {publications.map((pub, i) => (
                <div key={i} style={{
                  marginBottom: 12, padding: '12px 14px',
                  background: '#fff', borderRadius: 14,
                  border: `1.5px solid ${BEIGE}`,
                  boxShadow: `0 2px 10px rgba(123,91,58,0.08)`,
                  display: 'flex', gap: 12, alignItems: 'flex-start',
                }}>
                  {pub.image && (
                    <img src={pub.image} alt={pub.title} style={{ width: 52, height: 52, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />
                  )}
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 800, fontSize: 14, margin: 0, color: BR }}>{pub.title}</p>
                    <p style={{ fontSize: 12, color: BM, marginTop: 2, fontWeight: 600 }}>{pub.publisher}</p>
                    <div style={{ display: 'flex', gap: 12, marginTop: 3, flexWrap: 'wrap' }}>
                      {pub.date && <span style={{ fontSize: 11, color: BL }}>{pub.date}</span>}
                      {pub.url && <a href={pub.url} style={{ fontSize: 11, color: BM }}>Read ↗</a>}
                    </div>
                    {pub.description && <p style={{ fontSize: 12, color: '#5a4030', marginTop: 5, lineHeight: 1.5 }}>{pub.description}</p>}
                  </div>
                </div>
              ))}
            </Section>
          )}

          {/* Awards */}
          {awards.length > 0 && (
            <Section title="Awards &amp; Achievements">
              {awards.map((aw, i) => (
                <div key={i} style={{
                  marginBottom: 12, padding: '12px 14px',
                  background: '#fff', borderRadius: 14,
                  border: `1.5px solid ${BEIGE}`,
                  boxShadow: `0 2px 10px rgba(123,91,58,0.08)`,
                  display: 'flex', gap: 12, alignItems: 'flex-start',
                }}>
                  {aw.image && (
                    <img src={aw.image} alt={aw.title} style={{ width: 52, height: 52, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />
                  )}
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 800, fontSize: 14, margin: 0, color: BR }}>{aw.title}</p>
                    <p style={{ fontSize: 12, color: BM, marginTop: 2, fontWeight: 600 }}>{aw.organization}</p>
                    {aw.date && <span style={{ fontSize: 11, color: BL }}>{aw.date}</span>}
                    {aw.description && <p style={{ fontSize: 12, color: '#5a4030', marginTop: 5, lineHeight: 1.5 }}>{aw.description}</p>}
                  </div>
                </div>
              ))}
            </Section>
          )}
        </div>
      </div>

      {/* ─── FOOTER ─── */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        textAlign: 'center', padding: '44px 60px 52px',
        background: CREAM,
        borderTop: `2px solid ${BEIGE}`,
      }}>
        <Circle size={80} color={BEIGE} style={{ position: 'absolute', top: -20, left: -20, opacity: 0.6 }} />
        <Circle size={110} color={BM}   style={{ position: 'absolute', bottom: -40, right: -30, opacity: 0.25 }} />
        <h2 style={{ fontSize: 40, fontWeight: 900, color: BR, margin: 0 }}>
          Thank you for visiting,
        </h2>
        <p style={{ fontSize: 18, color: BM, marginTop: 8, fontStyle: 'italic' }}>
          and I hope you find inspiration in my work!
        </p>
        {(d.email || d.phone) && (
          <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '6px 24px' }}>
            {d.email    && <span style={{ fontSize: 14, color: BL }}>✉ {d.email}</span>}
            {d.phone    && <span style={{ fontSize: 14, color: BL }}>📞 {d.phone}</span>}
            {d.location && <span style={{ fontSize: 14, color: BL }}>📍 {d.location}</span>}
          </div>
        )}
      </div>

    </div>
  )
}
