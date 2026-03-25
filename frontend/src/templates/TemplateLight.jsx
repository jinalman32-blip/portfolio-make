import React from 'react'

const levelWidth = { Beginner: '35%', Intermediate: '65%', Expert: '90%' }

export default function TemplateLight({ p }) {
  const { details: d, skills = [], education = [], experience = [], projects = [], certifications = [], publications = [], awards = [] } = p
  return (
    <div id="portfolio-render" style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: '#f8fafc', color: '#1e293b', minHeight: '100vh' }}>

      {/* HEADER */}
      <div style={{ background: 'linear-gradient(135deg,#0ea5e9,#0284c7)', padding: '48px 60px', color: 'white' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 28 }}>
          <div style={{ width: 90, height: 90, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34, fontWeight: 800, flexShrink: 0, border: '3px solid rgba(255,255,255,0.5)' }}>
            {d.profileImage ? (
              <img src={d.profileImage} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
            ) : (d.name || 'U')[0].toUpperCase()}
          </div>
          <div>
            <h1 style={{ fontSize: 34, fontWeight: 800, margin: 0, lineHeight: 1.1 }}>{d.name || 'Your Name'}</h1>
            <p style={{ fontSize: 17, opacity: 0.9, marginTop: 5 }}>{d.title}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 18px', marginTop: 10 }}>
              {d.email && <span style={{ fontSize: 13, opacity: 0.85 }}>✉ {d.email}</span>}
              {d.phone && <span style={{ fontSize: 13, opacity: 0.85 }}>📞 {d.phone}</span>}
              {d.location && <span style={{ fontSize: 13, opacity: 0.85 }}>📍 {d.location}</span>}
              {d.website && <a href={d.website} style={{ fontSize: 13, color: '#bfdbfe' }}>🌐 {d.website}</a>}
            </div>
          </div>
        </div>
      </div>

      {/* BIO */}
      {d.bio && (
        <div style={{ background: '#f1f5f9', borderBottom: '1px solid #e2e8f0', padding: '20px 60px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.7, margin: 0 }}>{d.bio}</p>
          </div>
        </div>
      )}

      {/* BODY */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '36px 60px', display: 'grid', gridTemplateColumns: '1fr 1.7fr', gap: 36 }}>

        {/* LEFT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {skills.length > 0 && (
            <LightSection title="Skills">
              {skills.map((s, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      {s.image && <img src={s.image} alt={s.name} style={{ width: 18, height: 18, objectFit: 'cover', borderRadius: 3 }} />}
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#334155' }}>{s.name}</span>
                    </div>
                    <span style={{ fontSize: 11, color: '#0ea5e9' }}>{s.level}</span>
                  </div>
                  <div style={{ height: 5, background: '#e2e8f0', borderRadius: 3 }}>
                    <div style={{ height: '100%', width: levelWidth[s.level], background: 'linear-gradient(90deg,#0ea5e9,#0284c7)', borderRadius: 3 }}/>
                  </div>
                </div>
              ))}
            </LightSection>
          )}
          {education.length > 0 && (
            <LightSection title="Education">
              {education.map((e, i) => (
                <div key={i} style={{ marginBottom: 14, paddingLeft: 10, borderLeft: '3px solid #0ea5e9' }}>
                  <p style={{ fontWeight: 700, fontSize: 14, margin: 0, color: '#1e293b' }}>{e.degree} {e.field && `in ${e.field}`}</p>
                  <p style={{ fontSize: 13, color: '#0ea5e9', marginTop: 2 }}>{e.institution}</p>
                  <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{e.from}{e.to && ` — ${e.to}`} {e.grade && `· ${e.grade}`}</p>
                </div>
              ))}
            </LightSection>
          )}
        </div>

        {/* RIGHT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {experience.length > 0 && (
            <LightSection title="Experience">
              {experience.map((e, i) => (
                <div key={i} style={{ marginBottom: 16, padding: 14, background: 'white', borderRadius: 10, border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: 14, margin: 0, color: '#1e293b' }}>{e.role}</p>
                      <p style={{ fontSize: 13, color: '#0ea5e9', marginTop: 2 }}>{e.company}{e.location && ` · ${e.location}`}</p>
                    </div>
                    <span style={{ fontSize: 12, color: '#94a3b8', whiteSpace: 'nowrap', marginLeft: 10 }}>{e.from}{e.to && ` – ${e.current ? 'Present' : e.to}`}</span>
                  </div>
                  {e.description && <p style={{ fontSize: 13, color: '#64748b', marginTop: 8, lineHeight: 1.6 }}>{e.description}</p>}
                </div>
              ))}
            </LightSection>
          )}
          {projects.length > 0 && (
            <LightSection title="Projects">
              {projects.map((proj, i) => (
                <div key={i} style={{ marginBottom: 14, background: 'white', borderRadius: 10, border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
                  {proj.image && <img src={proj.image} alt={proj.name} style={{ width: '100%', height: 90, objectFit: 'cover', display: 'block' }} />}
                  <div style={{ padding: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p style={{ fontWeight: 700, fontSize: 14, margin: 0, color: '#1e293b' }}>{proj.name}</p>
                      <div style={{ display: 'flex', gap: 8 }}>
                        {proj.link && <a href={proj.link} style={{ fontSize: 12, color: '#0ea5e9' }}>Live ↗</a>}
                        {proj.github && <a href={proj.github} style={{ fontSize: 12, color: '#64748b' }}>GitHub ↗</a>}
                      </div>
                    </div>
                    {proj.description && <p style={{ fontSize: 13, color: '#64748b', marginTop: 6, lineHeight: 1.6 }}>{proj.description}</p>}
                    {proj.tech && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 8 }}>
                        {proj.tech.split(',').map(t => t.trim()).filter(Boolean).map((t, ti) => (
                          <span key={ti} style={{ fontSize: 11, padding: '3px 8px', borderRadius: 6, background: '#f0f9ff', color: '#0284c7', border: '1px solid #bae6fd' }}>{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </LightSection>
          )}
          {certifications.length > 0 && (
            <LightSection title="Certifications">
              {certifications.map((cert, i) => (
                <div key={i} style={{ marginBottom: 12, padding: 12, background: 'white', borderRadius: 10, border: '1px solid #e2e8f0', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  {cert.image && <img src={cert.image} alt={cert.name} style={{ width: 44, height: 44, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }} />}
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 13, margin: 0, color: '#1e293b' }}>{cert.name}</p>
                    <p style={{ fontSize: 12, color: '#0ea5e9', marginTop: 1 }}>{cert.issuer}</p>
                    <div style={{ display: 'flex', gap: 10, marginTop: 3, flexWrap: 'wrap' }}>
                      {cert.date && <span style={{ fontSize: 11, color: '#94a3b8' }}>{cert.date}</span>}
                      {cert.url && <a href={cert.url} style={{ fontSize: 11, color: '#0ea5e9' }}>Verify ↗</a>}
                    </div>
                  </div>
                </div>
              ))}
            </LightSection>
          )}
          {publications.length > 0 && (
            <LightSection title="Publications">
              {publications.map((pub, i) => (
                <div key={i} style={{ marginBottom: 12, padding: 12, background: 'white', borderRadius: 10, border: '1px solid #e2e8f0', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  {pub.image && <img src={pub.image} alt={pub.title} style={{ width: 44, height: 44, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }} />}
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 13, margin: 0, color: '#1e293b' }}>{pub.title}</p>
                    <p style={{ fontSize: 12, color: '#0ea5e9', marginTop: 1 }}>{pub.publisher}</p>
                    <div style={{ display: 'flex', gap: 10, marginTop: 3 }}>
                      {pub.date && <span style={{ fontSize: 11, color: '#94a3b8' }}>{pub.date}</span>}
                      {pub.url && <a href={pub.url} style={{ fontSize: 11, color: '#0ea5e9' }}>Read ↗</a>}
                    </div>
                    {pub.description && <p style={{ fontSize: 12, color: '#64748b', marginTop: 4, lineHeight: 1.5 }}>{pub.description}</p>}
                  </div>
                </div>
              ))}
            </LightSection>
          )}
          {awards.length > 0 && (
            <LightSection title="Awards & Achievements">
              {awards.map((aw, i) => (
                <div key={i} style={{ marginBottom: 12, padding: 12, background: 'white', borderRadius: 10, border: '1px solid #e2e8f0', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  {aw.image && <img src={aw.image} alt={aw.title} style={{ width: 44, height: 44, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }} />}
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 13, margin: 0, color: '#1e293b' }}>{aw.title}</p>
                    <p style={{ fontSize: 12, color: '#0ea5e9', marginTop: 1 }}>{aw.organization}</p>
                    {aw.date && <span style={{ fontSize: 11, color: '#94a3b8' }}>{aw.date}</span>}
                    {aw.description && <p style={{ fontSize: 12, color: '#64748b', marginTop: 4, lineHeight: 1.5 }}>{aw.description}</p>}
                  </div>
                </div>
              ))}
            </LightSection>
          )}
        </div>
      </div>
    </div>
  )
}

function LightSection({ title, children }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <h2 style={{ fontSize: 13, fontWeight: 800, color: '#0ea5e9', margin: 0, textTransform: 'uppercase', letterSpacing: 1.5 }}>{title}</h2>
        <div style={{ flex: 1, height: 1, background: '#e2e8f0' }}/>
      </div>
      {children}
    </div>
  )
}
