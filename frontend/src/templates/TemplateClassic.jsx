import React from 'react'

const levelWidth = { Beginner: '35%', Intermediate: '65%', Expert: '90%' }

export default function TemplateClassic({ p }) {
  const { details: d, skills = [], education = [], experience = [], projects = [], certifications = [], publications = [], awards = [] } = p
  return (
    <div id="portfolio-render" style={{ fontFamily: "'Georgia', serif", background: '#0f172a', color: '#e2e8f0', minHeight: '100vh' }}>

      {/* HEADER */}
      <div style={{ background: 'linear-gradient(135deg,#1a1a2e,#16213e)', padding: '50px 60px', borderBottom: '2px solid #f59e0b', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg,#f59e0b,#fbbf24,#f59e0b)' }}/>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            <div style={{ width: 88, height: 88, borderRadius: '50%', background: 'linear-gradient(135deg,#f59e0b,#b45309)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 900, color: 'white', flexShrink: 0, border: '3px solid rgba(245,158,11,0.3)', boxShadow: '0 0 20px rgba(245,158,11,0.3)' }}>
              {d.profileImage ? (
                <img src={d.profileImage} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
              ) : (d.name || 'U')[0].toUpperCase()}
            </div>
            <div>
              <h1 style={{ fontSize: 38, fontWeight: 900, margin: 0, lineHeight: 1, color: 'white', letterSpacing: -1 }}>{d.name || 'Your Name'}</h1>
              <p style={{ fontSize: 16, color: '#f59e0b', marginTop: 6, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>{d.title}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 18px', marginTop: 10 }}>
                {d.email && <span style={{ fontSize: 13, color: '#94a3b8' }}>✉ {d.email}</span>}
                {d.phone && <span style={{ fontSize: 13, color: '#94a3b8' }}>📞 {d.phone}</span>}
                {d.location && <span style={{ fontSize: 13, color: '#94a3b8' }}>📍 {d.location}</span>}
                {d.website && <a href={d.website} style={{ fontSize: 13, color: '#f59e0b' }}>🌐 Website</a>}
                {d.linkedin && <a href={d.linkedin} style={{ fontSize: 13, color: '#f59e0b' }}>LinkedIn</a>}
              </div>
            </div>
          </div>
          {d.bio && <p style={{ fontSize: 14, color: '#94a3b8', marginTop: 18, lineHeight: 1.8, maxWidth: 700, fontStyle: 'italic', borderLeft: '3px solid rgba(245,158,11,0.4)', paddingLeft: 16 }}>{d.bio}</p>}
        </div>
      </div>

      {/* BODY */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 60px', display: 'grid', gridTemplateColumns: '1fr 1.7fr', gap: 40 }}>

        {/* LEFT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
          {skills.length > 0 && (
            <ClassicSection title="Skills" accent="#f59e0b">
              {skills.map((s, i) => (
                <div key={i} style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      {s.image && <img src={s.image} alt={s.name} style={{ width: 18, height: 18, objectFit: 'cover', borderRadius: 3 }} />}
                    <span style={{ fontSize: 13, color: '#e2e8f0', fontWeight: 600 }}>{s.name}</span>
                    </div>
                    <span style={{ fontSize: 11, color: '#f59e0b' }}>{s.level}</span>
                  </div>
                  <div style={{ height: 4, background: 'rgba(245,158,11,0.1)', borderRadius: 2 }}>
                    <div style={{ height: '100%', width: levelWidth[s.level], background: 'linear-gradient(90deg,#f59e0b,#fbbf24)', borderRadius: 2 }}/>
                  </div>
                </div>
              ))}
            </ClassicSection>
          )}
          {education.length > 0 && (
            <ClassicSection title="Education" accent="#f59e0b">
              {education.map((e, i) => (
                <div key={i} style={{ marginBottom: 16 }}>
                  <p style={{ fontWeight: 700, fontSize: 14, margin: 0, color: 'white' }}>{e.degree} {e.field && `in ${e.field}`}</p>
                  <p style={{ fontSize: 13, color: '#f59e0b', marginTop: 2 }}>{e.institution}</p>
                  <p style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{e.from}{e.to && ` — ${e.to}`} {e.grade && `· ${e.grade}`}</p>
                </div>
              ))}
            </ClassicSection>
          )}
        </div>

        {/* RIGHT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
          {experience.length > 0 && (
            <ClassicSection title="Experience" accent="#f59e0b">
              {experience.map((e, i) => (
                <div key={i} style={{ marginBottom: 18 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: 15, margin: 0, color: 'white' }}>{e.role}</p>
                      <p style={{ fontSize: 13, color: '#f59e0b', marginTop: 2 }}>{e.company}{e.location && ` · ${e.location}`}</p>
                    </div>
                    <span style={{ fontSize: 12, color: '#64748b', whiteSpace: 'nowrap', marginLeft: 10, background: 'rgba(245,158,11,0.1)', padding: '3px 8px', borderRadius: 6, border: '1px solid rgba(245,158,11,0.2)' }}>{e.from}{e.to && ` – ${e.current ? 'Present' : e.to}`}</span>
                  </div>
                  {e.description && <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 6, lineHeight: 1.7 }}>{e.description}</p>}
                  <div style={{ height: 1, background: 'rgba(245,158,11,0.1)', marginTop: 14 }}/>
                </div>
              ))}
            </ClassicSection>
          )}
          {projects.length > 0 && (
            <ClassicSection title="Projects" accent="#f59e0b">
              {projects.map((proj, i) => (
                <div key={i} style={{ marginBottom: 16, background: 'rgba(245,158,11,0.05)', borderRadius: 10, border: '1px solid rgba(245,158,11,0.15)', overflow: 'hidden' }}>
                  {proj.image && <img src={proj.image} alt={proj.name} style={{ width: '100%', height: 90, objectFit: 'cover', display: 'block' }} />}
                  <div style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p style={{ fontWeight: 700, fontSize: 14, margin: 0, color: 'white' }}>{proj.name}</p>
                      <div style={{ display: 'flex', gap: 8 }}>
                        {proj.link && <a href={proj.link} style={{ fontSize: 12, color: '#f59e0b' }}>Live ↗</a>}
                        {proj.github && <a href={proj.github} style={{ fontSize: 12, color: '#94a3b8' }}>GitHub ↗</a>}
                      </div>
                    </div>
                    {proj.description && <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 6, lineHeight: 1.6 }}>{proj.description}</p>}
                    {proj.tech && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 8 }}>
                        {(typeof proj.tech === 'string' ? proj.tech.split(',') : Array.isArray(proj.tech) ? proj.tech : []).map(t => t.trim()).filter(Boolean).map((t, ti) => (
                          <span key={ti} style={{ fontSize: 11, padding: '2px 8px', borderRadius: 5, background: 'rgba(245,158,11,0.1)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.2)' }}>{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </ClassicSection>
          )}
          {certifications.length > 0 && (
            <ClassicSection title="Certifications" accent="#f59e0b">
              {certifications.map((cert, i) => (
                <div key={i} style={{ marginBottom: 14, padding: '12px 14px', background: 'rgba(245,158,11,0.05)', borderRadius: 10, border: '1px solid rgba(245,158,11,0.15)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  {cert.image && <img src={cert.image} alt={cert.name} style={{ width: 44, height: 44, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }} />}
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 13, margin: 0, color: 'white' }}>{cert.name}</p>
                    <p style={{ fontSize: 12, color: '#f59e0b', marginTop: 2 }}>{cert.issuer}</p>
                    <div style={{ display: 'flex', gap: 10, marginTop: 3, flexWrap: 'wrap' }}>
                      {cert.date && <span style={{ fontSize: 11, color: '#64748b' }}>{cert.date}</span>}
                      {cert.url && <a href={cert.url} style={{ fontSize: 11, color: '#f59e0b' }}>Verify ↗</a>}
                    </div>
                  </div>
                </div>
              ))}
            </ClassicSection>
          )}
          {publications.length > 0 && (
            <ClassicSection title="Publications" accent="#f59e0b">
              {publications.map((pub, i) => (
                <div key={i} style={{ marginBottom: 14, padding: '12px 14px', background: 'rgba(245,158,11,0.05)', borderRadius: 10, border: '1px solid rgba(245,158,11,0.15)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  {pub.image && <img src={pub.image} alt={pub.title} style={{ width: 44, height: 44, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }} />}
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 13, margin: 0, color: 'white' }}>{pub.title}</p>
                    <p style={{ fontSize: 12, color: '#f59e0b', marginTop: 2 }}>{pub.publisher}</p>
                    <div style={{ display: 'flex', gap: 10, marginTop: 3 }}>
                      {pub.date && <span style={{ fontSize: 11, color: '#64748b' }}>{pub.date}</span>}
                      {pub.url && <a href={pub.url} style={{ fontSize: 11, color: '#f59e0b' }}>Read ↗</a>}
                    </div>
                    {pub.description && <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 4, lineHeight: 1.5 }}>{pub.description}</p>}
                  </div>
                </div>
              ))}
            </ClassicSection>
          )}
          {awards.length > 0 && (
            <ClassicSection title="Awards & Achievements" accent="#f59e0b">
              {awards.map((aw, i) => (
                <div key={i} style={{ marginBottom: 14, padding: '12px 14px', background: 'rgba(245,158,11,0.05)', borderRadius: 10, border: '1px solid rgba(245,158,11,0.15)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  {aw.image && <img src={aw.image} alt={aw.title} style={{ width: 44, height: 44, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }} />}
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 13, margin: 0, color: 'white' }}>{aw.title}</p>
                    <p style={{ fontSize: 12, color: '#f59e0b', marginTop: 2 }}>{aw.organization}</p>
                    {aw.date && <span style={{ fontSize: 11, color: '#64748b' }}>{aw.date}</span>}
                    {aw.description && <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 4, lineHeight: 1.5 }}>{aw.description}</p>}
                  </div>
                </div>
              ))}
            </ClassicSection>
          )}
        </div>
      </div>
    </div>
  )
}

function ClassicSection({ title, accent, children }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <span style={{ color: accent, fontSize: 14 }}>◆</span>
        <h2 style={{ fontSize: 14, fontWeight: 800, color: 'white', margin: 0, textTransform: 'uppercase', letterSpacing: 2 }}>{title}</h2>
        <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,${accent}30,transparent)` }}/>
      </div>
      {children}
    </div>
  )
}
