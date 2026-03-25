import React from 'react'

const levelWidth = { Beginner: '35%', Intermediate: '65%', Expert: '92%' }

export default function TemplateNeon({ p }) {
  const { details: d, skills, education, experience, projects, certifications = [], publications = [], awards = [] } = p
  return (
    <div id="portfolio-render" style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: '#0c0a1a', color: '#e2e8f0', minHeight: '100vh' }}>

      {/* HERO */}
      <div style={{ background: 'linear-gradient(135deg,#0c0a1a 0%,#130d2e 50%,#0c0a1a 100%)', padding: '60px', position: 'relative', overflow: 'hidden', borderBottom: '1px solid rgba(167,139,250,0.2)' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle,rgba(167,139,250,0.15),transparent 70%)', pointerEvents: 'none' }}/>
        <div style={{ position: 'absolute', bottom: -40, left: 100, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle,rgba(34,211,238,0.1),transparent 70%)', pointerEvents: 'none' }}/>
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, color: '#a78bfa', letterSpacing: 3, textTransform: 'uppercase', padding: '6px 14px', borderRadius: 20, background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.2)', marginBottom: 20 }}>
            Portfolio
          </div>
          <h1 style={{ fontSize: 52, fontWeight: 900, margin: 0, lineHeight: 1, background: 'linear-gradient(135deg,#a78bfa,#22d3ee,#a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            {d.name || 'Your Name'}
          </h1>
          <p style={{ fontSize: 20, color: '#a78bfa', marginTop: 10, fontWeight: 500 }}>{d.title}</p>
          {d.bio && <p style={{ fontSize: 14, color: '#94a3b8', marginTop: 12, lineHeight: 1.7, maxWidth: 600 }}>{d.bio}</p>}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 20px', marginTop: 16 }}>
            {d.email && <span style={{ fontSize: 13, color: '#94a3b8' }}>✉ {d.email}</span>}
            {d.phone && <span style={{ fontSize: 13, color: '#94a3b8' }}>📞 {d.phone}</span>}
            {d.location && <span style={{ fontSize: 13, color: '#94a3b8' }}>📍 {d.location}</span>}
            {d.website && <a href={d.website} style={{ fontSize: 13, color: '#a78bfa' }}>🌐 Website</a>}
            {d.linkedin && <a href={d.linkedin} style={{ fontSize: 13, color: '#22d3ee' }}>LinkedIn</a>}
          </div>
        </div>
      </div>

      {/* BODY */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 60px', display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 40 }}>

        {/* LEFT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {skills.length > 0 && (
            <NeonSection title="Skills" accent="#a78bfa">
              {skills.map((s, i) => (
                <div key={i} style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{ fontSize: 13, color: '#e2e8f0', fontWeight: 500 }}>{s.name}</span>
                    <span style={{ fontSize: 11, color: '#a78bfa' }}>{s.level}</span>
                  </div>
                  <div style={{ height: 4, background: 'rgba(167,139,250,0.1)', borderRadius: 4 }}>
                    <div style={{ height: '100%', width: levelWidth[s.level], background: 'linear-gradient(90deg,#a78bfa,#22d3ee)', borderRadius: 4, boxShadow: '0 0 8px rgba(167,139,250,0.4)' }}/>
                  </div>
                </div>
              ))}
            </NeonSection>
          )}
          {education.length > 0 && (
            <NeonSection title="Education" accent="#a78bfa">
              {education.map((e, i) => (
                <div key={i} style={{ marginBottom: 16, paddingLeft: 12, borderLeft: '2px solid rgba(167,139,250,0.4)' }}>
                  <p style={{ fontWeight: 700, fontSize: 14, margin: 0, color: 'white' }}>{e.degree} {e.field && `in ${e.field}`}</p>
                  <p style={{ fontSize: 13, color: '#a78bfa', marginTop: 3 }}>{e.institution}</p>
                  <p style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{e.from}{e.to && ` — ${e.to}`} {e.grade && `· ${e.grade}`}</p>
                </div>
              ))}
            </NeonSection>
          )}
        </div>

        {/* RIGHT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {experience.length > 0 && (
            <NeonSection title="Experience" accent="#a78bfa">
              {experience.map((e, i) => (
                <div key={i} style={{ marginBottom: 16, padding: 16, background: 'rgba(167,139,250,0.05)', borderRadius: 12, border: '1px solid rgba(167,139,250,0.15)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: 15, margin: 0, color: 'white' }}>{e.role}</p>
                      <p style={{ fontSize: 13, color: '#a78bfa', marginTop: 2 }}>{e.company}{e.location && ` · ${e.location}`}</p>
                    </div>
                    <span style={{ fontSize: 12, color: '#64748b', whiteSpace: 'nowrap', marginLeft: 10 }}>{e.from}{e.to && ` – ${e.current ? 'Present' : e.to}`}</span>
                  </div>
                  {e.description && <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 8, lineHeight: 1.6 }}>{e.description}</p>}
                </div>
              ))}
            </NeonSection>
          )}
          {projects.length > 0 && (
            <NeonSection title="Projects" accent="#a78bfa">
              {projects.map((proj, i) => (
                <div key={i} style={{ marginBottom: 14, padding: 16, background: 'rgba(167,139,250,0.05)', borderRadius: 12, border: '1px solid rgba(167,139,250,0.15)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ fontWeight: 700, fontSize: 15, margin: 0, color: 'white' }}>{proj.name}</p>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {proj.link && <a href={proj.link} style={{ fontSize: 12, color: '#a78bfa' }}>Live ↗</a>}
                      {proj.github && <a href={proj.github} style={{ fontSize: 12, color: '#94a3b8' }}>GitHub ↗</a>}
                    </div>
                  </div>
                  {proj.description && <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 6, lineHeight: 1.6 }}>{proj.description}</p>}
                  {proj.tech && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 8 }}>
                      {proj.tech.split(',').map(t => t.trim()).filter(Boolean).map((t, ti) => (
                        <span key={ti} style={{ fontSize: 11, padding: '3px 8px', borderRadius: 6, background: 'rgba(167,139,250,0.1)', color: '#a78bfa', border: '1px solid rgba(167,139,250,0.2)' }}>{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </NeonSection>
          )}
          {certifications.length > 0 && (
            <NeonSection title="Certifications" accent="#22d3ee">
              {certifications.map((cert, i) => (
                <div key={i} style={{ marginBottom: 12, padding: 14, background: 'rgba(34,211,238,0.05)', borderRadius: 12, border: '1px solid rgba(34,211,238,0.15)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  {cert.image && <img src={cert.image} alt={cert.name} style={{ width:40, height:40, objectFit:'cover', borderRadius:8, flexShrink:0 }} />}
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 13, margin: 0, color: 'white' }}>{cert.name}</p>
                    <p style={{ fontSize: 12, color: '#22d3ee', marginTop: 2 }}>{cert.issuer}</p>
                    <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                      {cert.date && <span style={{ fontSize: 11, color: '#64748b' }}>{cert.date}</span>}
                      {cert.url && <a href={cert.url} style={{ fontSize: 11, color: '#22d3ee' }}>Verify ↗</a>}
                    </div>
                  </div>
                </div>
              ))}
            </NeonSection>
          )}
          {publications.length > 0 && (
            <NeonSection title="Publications" accent="#a78bfa">
              {publications.map((pub, i) => (
                <div key={i} style={{ marginBottom: 12, padding: 14, background: 'rgba(167,139,250,0.05)', borderRadius: 12, border: '1px solid rgba(167,139,250,0.15)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  {pub.image && <img src={pub.image} alt={pub.title} style={{ width:40, height:40, objectFit:'cover', borderRadius:8, flexShrink:0 }} />}
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 13, margin: 0, color: 'white' }}>{pub.title}</p>
                    <p style={{ fontSize: 12, color: '#a78bfa', marginTop: 2 }}>{pub.publisher}</p>
                    <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                      {pub.date && <span style={{ fontSize: 11, color: '#64748b' }}>{pub.date}</span>}
                      {pub.url && <a href={pub.url} style={{ fontSize: 11, color: '#a78bfa' }}>Read ↗</a>}
                    </div>
                  </div>
                </div>
              ))}
            </NeonSection>
          )}
          {awards.length > 0 && (
            <NeonSection title="Awards" accent="#22d3ee">
              {awards.map((aw, i) => (
                <div key={i} style={{ marginBottom: 12, padding: 14, background: 'rgba(34,211,238,0.05)', borderRadius: 12, border: '1px solid rgba(34,211,238,0.15)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  {aw.image && <img src={aw.image} alt={aw.title} style={{ width:40, height:40, objectFit:'cover', borderRadius:8, flexShrink:0 }} />}
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 13, margin: 0, color: 'white' }}>{aw.title}</p>
                    <p style={{ fontSize: 12, color: '#22d3ee', marginTop: 2 }}>{aw.organization}</p>
                    {aw.date && <p style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>{aw.date}</p>}
                    {aw.description && <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 5, lineHeight: 1.5 }}>{aw.description}</p>}
                  </div>
                </div>
              ))}
            </NeonSection>
          )}
        </div>
      </div>
    </div>
  )
}

function NeonSection({ title, accent, children }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <h2 style={{ fontSize: 13, fontWeight: 800, color: accent, margin: 0, textTransform: 'uppercase', letterSpacing: 2 }}>{title}</h2>
        <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,${accent}40,transparent)` }}/>
      </div>
      {children}
    </div>
  )
}
