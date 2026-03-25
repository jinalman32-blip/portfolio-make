import React from 'react'

const levelWidth = { Beginner: '35%', Intermediate: '65%', Expert: '90%' }
const levelColor = { Beginner: '#22d3ee', Intermediate: '#a78bfa', Expert: '#22d3ee' }

export default function TemplateDark({ p }) {
  const { details: d, skills = [], education = [], experience = [], projects = [], certifications = [], publications = [], awards = [] } = p

  return (
    <div id="portfolio-render" style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: '#060d1a', color: '#e2e8f0', minHeight: '100vh' }}>

      {/* HEADER */}
      <div style={{ background: 'linear-gradient(135deg,#0d1526,#060e20)', borderBottom: '1px solid rgba(34,211,238,0.15)', padding: '48px 60px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32, maxWidth: 960, margin: '0 auto' }}>
          {/* Avatar */}
          <div style={{ width: 96, height: 96, borderRadius: '50%', background: 'linear-gradient(135deg,#22d3ee,#6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, fontWeight: 800, color: 'white', flexShrink: 0, boxShadow: '0 0 30px rgba(34,211,238,0.4)' }}>
            {d.profileImage ? (
              <img src={d.profileImage} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
            ) : (d.name || 'U')[0].toUpperCase()}
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: 36, fontWeight: 800, color: 'white', margin: 0, lineHeight: 1.1 }}>{d.name || 'Your Name'}</h1>
            <p style={{ fontSize: 18, color: '#22d3ee', marginTop: 6, fontWeight: 500 }}>{d.title || 'Your Title'}</p>
            <p style={{ fontSize: 14, color: '#94a3b8', marginTop: 8, lineHeight: 1.6, maxWidth: 600 }}>{d.bio}</p>
            {/* Contact row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 20px', marginTop: 14 }}>
              {d.email && <span style={{ fontSize: 13, color: '#94a3b8' }}>✉ {d.email}</span>}
              {d.phone && <span style={{ fontSize: 13, color: '#94a3b8' }}>📞 {d.phone}</span>}
              {d.location && <span style={{ fontSize: 13, color: '#94a3b8' }}>📍 {d.location}</span>}
              {d.website && <a href={d.website} style={{ fontSize: 13, color: '#22d3ee' }}>🌐 {d.website}</a>}
              {d.linkedin && <a href={d.linkedin} style={{ fontSize: 13, color: '#22d3ee' }}>in LinkedIn</a>}
            </div>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '40px 60px', display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 40 }}>

        {/* LEFT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

          {/* Skills */}
          {skills.length > 0 && (
            <Section title="Skills" accent="#22d3ee">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {skills.map((s, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {s.image && <img src={s.image} alt={s.name} style={{ width: 18, height: 18, objectFit: 'cover', borderRadius: 3 }} />}
                        <span style={{ fontSize: 13, color: '#e2e8f0', fontWeight: 500 }}>{s.name}</span>
                      </div>
                      <span style={{ fontSize: 11, color: levelColor[s.level] }}>{s.level}</span>
                    </div>
                    <div style={{ height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 3 }}>
                      <div style={{ height: '100%', width: levelWidth[s.level], background: `linear-gradient(90deg,#22d3ee,#0ea5e9)`, borderRadius: 3 }}/>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <Section title="Education" accent="#22d3ee">
              {education.map((e, i) => (
                <div key={i} style={{ marginBottom: 16, paddingLeft: 12, borderLeft: '2px solid rgba(34,211,238,0.3)' }}>
                  <p style={{ fontWeight: 700, color: 'white', fontSize: 14, margin: 0 }}>{e.degree} {e.field && `in ${e.field}`}</p>
                  <p style={{ color: '#22d3ee', fontSize: 13, marginTop: 2 }}>{e.institution}</p>
                  <p style={{ color: '#64748b', fontSize: 12, marginTop: 2 }}>{e.from} {e.to && `— ${e.to}`} {e.grade && `· ${e.grade}`}</p>
                </div>
              ))}
            </Section>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

          {/* Experience */}
          {experience.length > 0 && (
            <Section title="Experience" accent="#22d3ee">
              {experience.map((e, i) => (
                <div key={i} style={{ marginBottom: 20, padding: '16px', background: 'rgba(13,21,38,0.6)', borderRadius: 12, border: '1px solid rgba(34,211,238,0.1)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <p style={{ fontWeight: 700, color: 'white', fontSize: 15, margin: 0 }}>{e.role}</p>
                      <p style={{ color: '#22d3ee', fontSize: 13, marginTop: 2 }}>{e.company} {e.location && `· ${e.location}`}</p>
                    </div>
                    <span style={{ fontSize: 12, color: '#64748b', whiteSpace: 'nowrap', marginLeft: 12 }}>{e.from} {e.to && `– ${e.current ? 'Present' : e.to}`}</span>
                  </div>
                  {e.description && <p style={{ color: '#94a3b8', fontSize: 13, marginTop: 8, lineHeight: 1.6 }}>{e.description}</p>}
                </div>
              ))}
            </Section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <Section title="Projects" accent="#22d3ee">
              {projects.map((proj, i) => (
                <div key={i} style={{ marginBottom: 16, background: 'rgba(13,21,38,0.6)', borderRadius: 12, border: '1px solid rgba(34,211,238,0.1)', overflow: 'hidden' }}>
                  {proj.image && <img src={proj.image} alt={proj.name} style={{ width: '100%', height: 100, objectFit: 'cover', display: 'block' }} />}
                  <div style={{ padding: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p style={{ fontWeight: 700, color: 'white', fontSize: 15, margin: 0 }}>{proj.name}</p>
                      <div style={{ display: 'flex', gap: 8 }}>
                        {proj.link && <a href={proj.link} style={{ fontSize: 12, color: '#22d3ee' }}>Live ↗</a>}
                        {proj.github && <a href={proj.github} style={{ fontSize: 12, color: '#94a3b8' }}>GitHub ↗</a>}
                      </div>
                    </div>
                    {proj.description && <p style={{ color: '#94a3b8', fontSize: 13, marginTop: 6, lineHeight: 1.6 }}>{proj.description}</p>}
                    {proj.tech && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                        {proj.tech.split(',').map(t => t.trim()).filter(Boolean).map((t, ti) => (
                          <span key={ti} style={{ fontSize: 11, padding: '3px 8px', borderRadius: 6, background: 'rgba(34,211,238,0.1)', color: '#22d3ee', border: '1px solid rgba(34,211,238,0.2)' }}>{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </Section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <Section title="Certifications" accent="#22d3ee">
              {certifications.map((cert, i) => (
                <div key={i} style={{ marginBottom: 14, padding: 14, background: 'rgba(13,21,38,0.6)', borderRadius: 12, border: '1px solid rgba(34,211,238,0.1)', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  {cert.image && <img src={cert.image} alt={cert.name} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />}
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 700, color: 'white', fontSize: 14, margin: 0 }}>{cert.name}</p>
                    <p style={{ color: '#22d3ee', fontSize: 12, marginTop: 2 }}>{cert.issuer}</p>
                    <div style={{ display: 'flex', gap: 12, marginTop: 4, flexWrap: 'wrap' }}>
                      {cert.date && <span style={{ fontSize: 11, color: '#64748b' }}>{cert.date}</span>}
                      {cert.credentialId && <span style={{ fontSize: 11, color: '#64748b' }}>ID: {cert.credentialId}</span>}
                      {cert.url && <a href={cert.url} style={{ fontSize: 11, color: '#22d3ee' }}>Verify ↗</a>}
                    </div>
                  </div>
                </div>
              ))}
            </Section>
          )}

          {/* Publications */}
          {publications.length > 0 && (
            <Section title="Publications" accent="#22d3ee">
              {publications.map((pub, i) => (
                <div key={i} style={{ marginBottom: 14, padding: 14, background: 'rgba(13,21,38,0.6)', borderRadius: 12, border: '1px solid rgba(34,211,238,0.1)', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  {pub.image && <img src={pub.image} alt={pub.title} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />}
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 700, color: 'white', fontSize: 14, margin: 0 }}>{pub.title}</p>
                    <p style={{ color: '#22d3ee', fontSize: 12, marginTop: 2 }}>{pub.publisher}</p>
                    <div style={{ display: 'flex', gap: 12, marginTop: 3 }}>
                      {pub.date && <span style={{ fontSize: 11, color: '#64748b' }}>{pub.date}</span>}
                      {pub.url && <a href={pub.url} style={{ fontSize: 11, color: '#22d3ee' }}>Read ↗</a>}
                    </div>
                    {pub.description && <p style={{ color: '#94a3b8', fontSize: 12, marginTop: 5, lineHeight: 1.5 }}>{pub.description}</p>}
                  </div>
                </div>
              ))}
            </Section>
          )}

          {/* Awards */}
          {awards.length > 0 && (
            <Section title="Awards & Achievements" accent="#22d3ee">
              {awards.map((aw, i) => (
                <div key={i} style={{ marginBottom: 14, padding: 14, background: 'rgba(13,21,38,0.6)', borderRadius: 12, border: '1px solid rgba(34,211,238,0.1)', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  {aw.image && <img src={aw.image} alt={aw.title} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />}
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 700, color: 'white', fontSize: 14, margin: 0 }}>{aw.title}</p>
                    <p style={{ color: '#22d3ee', fontSize: 12, marginTop: 2 }}>{aw.organization}</p>
                    {aw.date && <span style={{ fontSize: 11, color: '#64748b' }}>{aw.date}</span>}
                    {aw.description && <p style={{ color: '#94a3b8', fontSize: 12, marginTop: 5, lineHeight: 1.5 }}>{aw.description}</p>}
                  </div>
                </div>
              ))}
            </Section>
          )}
        </div>
      </div>
    </div>
  )
}

function Section({ title, accent, children }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <h2 style={{ fontSize: 16, fontWeight: 800, color: 'white', margin: 0, textTransform: 'uppercase', letterSpacing: 1 }}>{title}</h2>
        <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,${accent}40,transparent)` }}/>
      </div>
      {children}
    </div>
  )
}
