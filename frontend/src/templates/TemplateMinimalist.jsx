import React from 'react'

/* ─── Palette — matches PDF exactly ─── */
const BG     = '#252525'   // dark charcoal background
const CREAM  = '#e8e3d5'   // off-white cream text
const CSUB   = '#b0aa9a'   // muted cream for sub-text
const CLITE  = '#d4cfbf'   // light card background
const CDARK  = '#1a1a1a'   // dark card background
const WHITE  = '#f0ece2'   // near white

const levelWidth = { Beginner: '35%', Intermediate: '65%', Expert: '92%' }

/* ─── Top meta bar (appears on every "slide" in PDF) ─── */
function MetaBar({ left = '', center = '', right = '', number = '' }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '14px 48px', borderBottom: `1px solid ${CREAM}20`,
    }}>
      <div style={{ display: 'flex', gap: 36 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: CREAM, letterSpacing: 0.5 }}>{left}</span>
        {center && <span style={{ fontSize: 12, fontWeight: 400, color: CSUB }}>{center}</span>}
      </div>
      <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: CSUB }}>{right}</span>
        {number && <span style={{ fontSize: 12, fontWeight: 700, color: CSUB }}>{number}</span>}
      </div>
    </div>
  )
}

/* ─── Section heading — large bold like PDF ─── */
function BigHeading({ children, style = {} }) {
  return (
    <h2 style={{
      fontSize: 52, fontWeight: 900, color: CREAM,
      letterSpacing: -1, lineHeight: 1.05, margin: 0,
      fontFamily: "'Inter', 'Arial Black', sans-serif",
      ...style,
    }}>
      {children}
    </h2>
  )
}

/* ─── Light card (parchment background) ─── */
function LCard({ children, style = {} }) {
  return (
    <div style={{
      background: CLITE, borderRadius: 12, padding: '22px 26px',
      color: CDARK,
      ...style,
    }}>
      {children}
    </div>
  )
}

/* ─── Dark card (outlined) ─── */
function DCard({ children, style = {} }) {
  return (
    <div style={{
      background: 'transparent', borderRadius: 12, padding: '22px 26px',
      border: `2px solid ${CREAM}55`, color: CREAM,
      ...style,
    }}>
      {children}
    </div>
  )
}

/* ─── Bottom project/meta footer bar ─── */
function FooterBar({ name = '', year = '2025' }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
      padding: '20px 48px', borderTop: `1px solid ${CREAM}20`,
      marginTop: 'auto',
    }}>
      <div>
        <div style={{ fontSize: 11, color: CSUB, marginBottom: 2 }}>Presented By:</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: CREAM }}>{name}</div>
      </div>
      <div style={{ fontSize: 13, fontWeight: 700, color: CSUB }}>{year}</div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════ */
export default function TemplateMinimalist({ p }) {
  const { details: d, skills, education, experience, projects, certifications = [], publications = [], awards = [] } = p
  const year = new Date().getFullYear()

  return (
    <div id="portfolio-render" style={{
      fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      background: BG, color: CREAM, minHeight: '100vh',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
      `}</style>

      {/* ══════════ COVER SLIDE ══════════ */}
      <section style={{ minHeight: '95vh', display: 'flex', flexDirection: 'column', borderBottom: `1px solid ${CREAM}15` }}>
        <MetaBar left={d.name || 'Portfolio'} center="Personal Portfolio" right={String(year)} />

        {/* Big title */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px 48px 40px' }}>
          <h1 style={{
            fontSize: 88, fontWeight: 900, color: CREAM,
            letterSpacing: -3, lineHeight: 1,
            fontFamily: "'Inter', 'Arial Black', sans-serif",
            margin: 0, maxWidth: 700,
          }}>
            {d.title || 'Professional'}<br />Portfolio.
          </h1>

          {d.bio && (
            <p style={{
              maxWidth: 480, fontSize: 15, color: CSUB, lineHeight: 1.8,
              marginTop: 32, fontWeight: 400,
            }}>
              {d.bio.slice(0, 160)}{d.bio.length > 160 ? '…' : ''}
            </p>
          )}
        </div>

        {/* Bottom meta row — like PDF cover slide */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto',
          padding: '20px 48px', gap: 24,
          borderTop: `1px solid ${CREAM}20`,
        }}>
          <div>
            <div style={{ fontSize: 11, color: CSUB, marginBottom: 3 }}>Name</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: CREAM }}>{d.name || '—'}</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: CSUB, marginBottom: 3 }}>Role</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: CREAM }}>{d.title || '—'}</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: CSUB, marginBottom: 3 }}>Contact</div>
            <div style={{ fontSize: 13, color: CREAM }}>{d.email || d.phone || '—'}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: CREAM, opacity: 0.4 }}>#0001</div>
          </div>
        </div>
      </section>

      {/* ══════════ INTRODUCTION SLIDE ══════════ */}
      {d.bio && (
        <section style={{ borderBottom: `1px solid ${CREAM}15` }}>
          <MetaBar left={d.name || 'Portfolio'} center="Personal Portfolio" right={String(year)} number="#0002" />
          <div style={{ padding: '60px 48px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center', minHeight: 400 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: CSUB, letterSpacing: 2, marginBottom: 16, textTransform: 'uppercase' }}>Introduction</div>
              <BigHeading>Hello, I'm<br />{(d.name || 'Your Name').split(' ')[0]}!</BigHeading>
              <div style={{ marginTop: 30 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: CREAM, marginBottom: 8 }}>About Me</div>
                <p style={{ fontSize: 14, color: CSUB, lineHeight: 1.85, margin: 0 }}>{d.bio}</p>
              </div>
              {d.location && (
                <div style={{ marginTop: 16, fontSize: 13, color: CSUB }}>📍 {d.location}</div>
              )}
            </div>

            {/* Right side: contact details in cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { label: 'Email', value: d.email },
                { label: 'Phone', value: d.phone },
                { label: 'Location', value: d.location },
                { label: 'Website', value: d.website },
              ].filter(x => x.value).map((item, i) => (
                i % 2 === 0
                  ? <LCard key={i}>
                      <div style={{ fontSize: 11, color: '#6b6858', marginBottom: 4 }}>{item.label}</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: CDARK }}>{item.value}</div>
                    </LCard>
                  : <DCard key={i}>
                      <div style={{ fontSize: 11, color: CSUB, marginBottom: 4 }}>{item.label}</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: CREAM }}>{item.value}</div>
                    </DCard>
              ))}
            </div>
          </div>
          <FooterBar name={d.name} year={String(year)} />
        </section>
      )}

      {/* ══════════ SKILLS SLIDE ══════════ */}
      {skills.length > 0 && (
        <section style={{ borderBottom: `1px solid ${CREAM}15` }}>
          <MetaBar left={d.name || 'Portfolio'} center="Personal Portfolio" right={String(year)} number="#0003" />
          <div style={{ padding: '60px 48px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'flex-start' }}>
              <div>
                <BigHeading>My<br />Skills.</BigHeading>
                <p style={{ fontSize: 14, color: CSUB, lineHeight: 1.8, marginTop: 20, maxWidth: 320 }}>
                  Technologies and tools I use to bring ideas to life with precision and expertise.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {skills.map((s, i) => (
                  i % 2 === 0
                    ? <LCard key={i} style={{ padding: '18px 22px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                          <span style={{ fontSize: 14, fontWeight: 700, color: CDARK, display: 'flex', alignItems: 'center', gap: 6 }}>{s.image && <img src={s.image} alt={s.name} style={{ width:18, height:18, objectFit:'cover', borderRadius:3 }} />}{s.name}</span>
                          <span style={{ fontSize: 11, color: '#6b6858' }}>{s.level}</span>
                        </div>
                        <div style={{ height: 4, background: 'rgba(0,0,0,0.12)', borderRadius: 2 }}>
                          <div style={{ height: '100%', width: levelWidth[s.level] || '50%', background: CDARK, borderRadius: 2 }} />
                        </div>
                      </LCard>
                    : <DCard key={i} style={{ padding: '18px 22px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                          <span style={{ fontSize: 14, fontWeight: 700, color: CREAM, display: 'flex', alignItems: 'center', gap: 6 }}>{s.image && <img src={s.image} alt={s.name} style={{ width:18, height:18, objectFit:'cover', borderRadius:3 }} />}{s.name}</span>
                          <span style={{ fontSize: 11, color: CSUB }}>{s.level}</span>
                        </div>
                        <div style={{ height: 4, background: `${CREAM}20`, borderRadius: 2 }}>
                          <div style={{ height: '100%', width: levelWidth[s.level] || '50%', background: CREAM, borderRadius: 2 }} />
                        </div>
                      </DCard>
                ))}
              </div>
            </div>
          </div>
          <FooterBar name={d.name} year={String(year)} />
        </section>
      )}

      {/* ══════════ EXPERIENCE SLIDE ══════════ */}
      {experience.length > 0 && (
        <section style={{ borderBottom: `1px solid ${CREAM}15` }}>
          <MetaBar left={d.name || 'Portfolio'} center="Personal Portfolio" right={String(year)} number="#0004" />
          <div style={{ padding: '60px 48px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'flex-start' }}>
              <div>
                <BigHeading>My<br />Experience.</BigHeading>
                <p style={{ fontSize: 14, color: CSUB, lineHeight: 1.8, marginTop: 20 }}>
                  A track record of delivering results across diverse industries and roles.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {experience.map((e, i) => (
                  i % 2 === 0
                    ? <LCard key={i}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
                          <div>
                            <div style={{ fontSize: 15, fontWeight: 800, color: CDARK }}>{e.role}</div>
                            <div style={{ fontSize: 12, color: '#6b6858', marginTop: 3, fontWeight: 600 }}>
                              {e.company}{e.location ? ` · ${e.location}` : ''}
                            </div>
                          </div>
                          <div style={{ fontSize: 11, color: '#6b6858', whiteSpace: 'nowrap' }}>
                            {e.from}{e.to && ` – ${e.current ? 'Present' : e.to}`}
                          </div>
                        </div>
                        {e.description && <p style={{ fontSize: 12, color: '#4a4740', marginTop: 10, lineHeight: 1.7 }}>{e.description}</p>}
                      </LCard>
                    : <DCard key={i}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
                          <div>
                            <div style={{ fontSize: 15, fontWeight: 800, color: CREAM }}>{e.role}</div>
                            <div style={{ fontSize: 12, color: CSUB, marginTop: 3, fontWeight: 600 }}>
                              {e.company}{e.location ? ` · ${e.location}` : ''}
                            </div>
                          </div>
                          <div style={{ fontSize: 11, color: CSUB, whiteSpace: 'nowrap' }}>
                            {e.from}{e.to && ` – ${e.current ? 'Present' : e.to}`}
                          </div>
                        </div>
                        {e.description && <p style={{ fontSize: 12, color: CSUB, marginTop: 10, lineHeight: 1.7 }}>{e.description}</p>}
                      </DCard>
                ))}
              </div>
            </div>
          </div>
          <FooterBar name={d.name} year={String(year)} />
        </section>
      )}

      {/* ══════════ EDUCATION SLIDE ══════════ */}
      {education.length > 0 && (
        <section style={{ borderBottom: `1px solid ${CREAM}15` }}>
          <MetaBar left={d.name || 'Portfolio'} center="Personal Portfolio" right={String(year)} number="#0005" />
          <div style={{ padding: '60px 48px' }}>
            <div style={{ marginBottom: 36 }}>
              <BigHeading>Education &<br />Qualifications.</BigHeading>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
              {education.map((e, i) => (
                i % 2 === 0
                  ? <LCard key={i}>
                      <div style={{ fontSize: 16, fontWeight: 800, color: CDARK, marginBottom: 6 }}>
                        {e.degree}{e.field ? ` in ${e.field}` : ''}
                      </div>
                      <div style={{ fontSize: 13, color: '#6b6858', fontWeight: 600, marginBottom: 4 }}>{e.institution}</div>
                      <div style={{ fontSize: 12, color: '#8a8470' }}>
                        {e.from}{e.to ? ` — ${e.to}` : ''}{e.grade ? ` · ${e.grade}` : ''}
                      </div>
                    </LCard>
                  : <DCard key={i}>
                      <div style={{ fontSize: 16, fontWeight: 800, color: CREAM, marginBottom: 6 }}>
                        {e.degree}{e.field ? ` in ${e.field}` : ''}
                      </div>
                      <div style={{ fontSize: 13, color: CSUB, fontWeight: 600, marginBottom: 4 }}>{e.institution}</div>
                      <div style={{ fontSize: 12, color: CSUB, opacity: 0.7 }}>
                        {e.from}{e.to ? ` — ${e.to}` : ''}{e.grade ? ` · ${e.grade}` : ''}
                      </div>
                    </DCard>
              ))}
            </div>
          </div>
          <FooterBar name={d.name} year={String(year)} />
        </section>
      )}

      {/* ══════════ PROJECTS SLIDE ══════════ */}
      {projects.length > 0 && (
        <section style={{ borderBottom: `1px solid ${CREAM}15` }}>
          <MetaBar left={d.name || 'Portfolio'} center="Personal Portfolio" right={String(year)} number="#0006" />
          <div style={{ padding: '60px 48px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'flex-start' }}>
              <div>
                <BigHeading>Portfolio<br />Projects.</BigHeading>
                <p style={{ fontSize: 14, color: CSUB, lineHeight: 1.8, marginTop: 20 }}>
                  Selected works that demonstrate my capability to build and ship impactful solutions.
                </p>
                <div style={{ marginTop: 28 }}>
                  <div style={{ fontSize: 32, fontWeight: 900, color: CREAM }}>{projects.length}+</div>
                  <div style={{ fontSize: 13, color: CSUB, marginTop: 4 }}>Projects Completed</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {projects.map((proj, i) => (
                  i % 2 === 0
                    ? <LCard key={i} style={{ padding: 0, overflow: 'hidden' }}>
                        {proj.image && <img src={proj.image} alt={proj.name} style={{ width:'100%', height:80, objectFit:'cover', display:'block' }} />}
                        <div style={{ padding: '22px 26px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                            <div style={{ fontSize: 15, fontWeight: 800, color: CDARK }}>{proj.name}</div>
                            <div style={{ display: 'flex', gap: 8 }}>
                              {proj.link   && <a href={proj.link}   style={{ fontSize: 11, color: '#6b6858', textDecoration: 'none', fontWeight: 600 }}>Live ↗</a>}
                              {proj.github && <a href={proj.github} style={{ fontSize: 11, color: '#8a8470', textDecoration: 'none', fontWeight: 600 }}>GitHub ↗</a>}
                            </div>
                          </div>
                          {proj.description && <p style={{ fontSize: 12, color: '#4a4740', marginTop: 8, lineHeight: 1.65 }}>{proj.description}</p>}
                          {proj.tech && (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
                              {proj.tech.split(',').map(t => t.trim()).filter(Boolean).map((t, ti) => (
                                <span key={ti} style={{ fontSize: 10, padding: '3px 8px', borderRadius: 4, background: 'rgba(0,0,0,0.1)', color: CDARK, fontWeight: 600 }}>{t}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      </LCard>
                    : <DCard key={i} style={{ padding: 0, overflow: 'hidden' }}>
                        {proj.image && <img src={proj.image} alt={proj.name} style={{ width:'100%', height:80, objectFit:'cover', display:'block' }} />}
                        <div style={{ padding: '22px 26px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                            <div style={{ fontSize: 15, fontWeight: 800, color: CREAM }}>{proj.name}</div>
                            <div style={{ display: 'flex', gap: 8 }}>
                              {proj.link   && <a href={proj.link}   style={{ fontSize: 11, color: CSUB, textDecoration: 'none', fontWeight: 600 }}>Live ↗</a>}
                              {proj.github && <a href={proj.github} style={{ fontSize: 11, color: CSUB, textDecoration: 'none', fontWeight: 600 }}>GitHub ↗</a>}
                            </div>
                          </div>
                          {proj.description && <p style={{ fontSize: 12, color: CSUB, marginTop: 8, lineHeight: 1.65 }}>{proj.description}</p>}
                          {proj.tech && (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
                              {proj.tech.split(',').map(t => t.trim()).filter(Boolean).map((t, ti) => (
                                <span key={ti} style={{ fontSize: 10, padding: '3px 8px', borderRadius: 4, background: `${CREAM}18`, color: CREAM, border: `1px solid ${CREAM}30`, fontWeight: 600 }}>{t}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      </DCard>
                ))}
              </div>
            </div>
          </div>
          <FooterBar name={d.name} year={String(year)} />
        </section>
      )}

      {/* ══════════ CERTIFICATIONS SLIDE ══════════ */}
      {certifications.length > 0 && (
        <section style={{ borderBottom: `1px solid ${CREAM}15` }}>
          <MetaBar left={d.name || 'Portfolio'} center="Personal Portfolio" right={String(year)} />
          <div style={{ padding: '60px 48px' }}>
            <BigHeading>Certifications.</BigHeading>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16, marginTop: 32 }}>
              {certifications.map((cert, i) => (
                i % 2 === 0
                  ? <LCard key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      {cert.image && <img src={cert.image} alt={cert.name} style={{ width:48, height:48, objectFit:'cover', borderRadius:8, flexShrink:0 }} />}
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 800, color: CDARK }}>{cert.name}</div>
                        {cert.issuer && <div style={{ fontSize: 13, color: '#6b6858', fontWeight: 600, marginTop: 3 }}>{cert.issuer}</div>}
                        {cert.date && <div style={{ fontSize: 12, color: '#8a8470', marginTop: 2 }}>{cert.date}</div>}
                        {cert.url && <a href={cert.url} style={{ fontSize: 12, color: '#6b6858' }}>View ↗</a>}
                      </div>
                    </LCard>
                  : <DCard key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      {cert.image && <img src={cert.image} alt={cert.name} style={{ width:48, height:48, objectFit:'cover', borderRadius:8, flexShrink:0 }} />}
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 800, color: CREAM }}>{cert.name}</div>
                        {cert.issuer && <div style={{ fontSize: 13, color: CSUB, fontWeight: 600, marginTop: 3 }}>{cert.issuer}</div>}
                        {cert.date && <div style={{ fontSize: 12, color: CSUB, opacity: 0.7, marginTop: 2 }}>{cert.date}</div>}
                        {cert.url && <a href={cert.url} style={{ fontSize: 12, color: CSUB }}>View ↗</a>}
                      </div>
                    </DCard>
              ))}
            </div>
          </div>
          <FooterBar name={d.name} year={String(year)} />
        </section>
      )}

      {/* ══════════ PUBLICATIONS SLIDE ══════════ */}
      {publications.length > 0 && (
        <section style={{ borderBottom: `1px solid ${CREAM}15` }}>
          <MetaBar left={d.name || 'Portfolio'} center="Personal Portfolio" right={String(year)} />
          <div style={{ padding: '60px 48px' }}>
            <BigHeading>Publications.</BigHeading>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16, marginTop: 32 }}>
              {publications.map((pub, i) => (
                i % 2 === 0
                  ? <LCard key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      {pub.image && <img src={pub.image} alt={pub.title} style={{ width:48, height:48, objectFit:'cover', borderRadius:8, flexShrink:0 }} />}
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 800, color: CDARK }}>{pub.title}</div>
                        {pub.publisher && <div style={{ fontSize: 13, color: '#6b6858', fontWeight: 600, marginTop: 3 }}>{pub.publisher}</div>}
                        {pub.date && <div style={{ fontSize: 12, color: '#8a8470', marginTop: 2 }}>{pub.date}</div>}
                        {pub.url && <a href={pub.url} style={{ fontSize: 12, color: '#6b6858' }}>Read ↗</a>}
                      </div>
                    </LCard>
                  : <DCard key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      {pub.image && <img src={pub.image} alt={pub.title} style={{ width:48, height:48, objectFit:'cover', borderRadius:8, flexShrink:0 }} />}
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 800, color: CREAM }}>{pub.title}</div>
                        {pub.publisher && <div style={{ fontSize: 13, color: CSUB, fontWeight: 600, marginTop: 3 }}>{pub.publisher}</div>}
                        {pub.date && <div style={{ fontSize: 12, color: CSUB, opacity: 0.7, marginTop: 2 }}>{pub.date}</div>}
                        {pub.url && <a href={pub.url} style={{ fontSize: 12, color: CSUB }}>Read ↗</a>}
                      </div>
                    </DCard>
              ))}
            </div>
          </div>
          <FooterBar name={d.name} year={String(year)} />
        </section>
      )}

      {/* ══════════ AWARDS SLIDE ══════════ */}
      {awards.length > 0 && (
        <section style={{ borderBottom: `1px solid ${CREAM}15` }}>
          <MetaBar left={d.name || 'Portfolio'} center="Personal Portfolio" right={String(year)} />
          <div style={{ padding: '60px 48px' }}>
            <BigHeading>Awards.</BigHeading>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16, marginTop: 32 }}>
              {awards.map((award, i) => (
                i % 2 === 0
                  ? <LCard key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      {award.image && <img src={award.image} alt={award.title} style={{ width:48, height:48, objectFit:'cover', borderRadius:8, flexShrink:0 }} />}
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 800, color: CDARK }}>{award.title}</div>
                        {award.organization && <div style={{ fontSize: 13, color: '#6b6858', fontWeight: 600, marginTop: 3 }}>{award.organization}</div>}
                        {award.date && <div style={{ fontSize: 12, color: '#8a8470', marginTop: 2 }}>{award.date}</div>}
                        {award.description && <p style={{ fontSize: 12, color: '#4a4740', marginTop: 6, lineHeight: 1.65 }}>{award.description}</p>}
                      </div>
                    </LCard>
                  : <DCard key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      {award.image && <img src={award.image} alt={award.title} style={{ width:48, height:48, objectFit:'cover', borderRadius:8, flexShrink:0 }} />}
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 800, color: CREAM }}>{award.title}</div>
                        {award.organization && <div style={{ fontSize: 13, color: CSUB, fontWeight: 600, marginTop: 3 }}>{award.organization}</div>}
                        {award.date && <div style={{ fontSize: 12, color: CSUB, opacity: 0.7, marginTop: 2 }}>{award.date}</div>}
                        {award.description && <p style={{ fontSize: 12, color: CSUB, marginTop: 6, lineHeight: 1.65 }}>{award.description}</p>}
                      </div>
                    </DCard>
              ))}
            </div>
          </div>
          <FooterBar name={d.name} year={String(year)} />
        </section>
      )}

      {/* ══════════ CONTACT / LET'S WORK TOGETHER ══════════ */}
      <section>
        <MetaBar left={d.name || 'Portfolio'} center="Personal Portfolio" right={String(year)} number="#0007" />
        <div style={{ padding: '80px 48px', textAlign: 'center', minHeight: 380, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 36 }}>
          <h2 style={{
            fontSize: 72, fontWeight: 900, color: CREAM,
            letterSpacing: -2, lineHeight: 1, margin: 0,
            fontFamily: "'Inter', 'Arial Black', sans-serif",
          }}>
            Let's Work<br />Together!
          </h2>

          {d.bio && (
            <p style={{ fontSize: 15, color: CSUB, maxWidth: 560, lineHeight: 1.8, margin: 0 }}>
              {d.bio.slice(0, 200)}
            </p>
          )}

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 20, width: '100%', maxWidth: 720, marginTop: 10,
          }}>
            {[
              { label: 'Email Address', value: d.email },
              { label: 'Phone Number', value: d.phone },
              { label: 'Location', value: d.location },
              { label: 'Website', value: d.website },
            ].filter(x => x.value).map((item, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: CSUB, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>{item.label}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: CREAM }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Final footer */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '16px 48px', borderTop: `1px solid ${CREAM}15`,
        }}>
          <span style={{ fontSize: 12, color: CSUB }}>Personal Portfolio · {d.name || 'Your Name'}</span>
          <span style={{ fontSize: 22, fontWeight: 900, color: CREAM, opacity: 0.25 }}>#END</span>
        </div>
      </section>
    </div>
  )
}
