import React from 'react'

const levelWidth = { Beginner: '35%', Intermediate: '65%', Expert: '90%' }

export default function TemplateClassic({ p }) {
  const { details: d, skills = [], education = [], experience = [], projects = [], certifications = [], publications = [], awards = [] } = p
  return (
    <div id="portfolio-render" className="w-full min-h-screen bg-[#0f172a] text-[#e2e8f0]" style={{ fontFamily: "'Georgia', serif" }}>

      {/* HEADER */}
      <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#16213e] px-6 py-10 sm:px-12 sm:py-16 border-b-2 border-[#f59e0b]">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#f59e0b] via-[#fbbf24] to-[#f59e0b]"/>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#f59e0b] to-[#b45309] flex items-center justify-center text-3xl sm:text-4xl font-black text-white shrink-0 border-4 border-[#f59e0b]/30 shadow-[0_0_20px_rgba(245,158,11,0.3)] overflow-hidden">
              {d.profileImage ? (
                <img src={d.profileImage} alt={d.name} className="w-full h-full object-cover" />
              ) : (d.name || 'U')[0].toUpperCase()}
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tighter leading-none">{d.name || 'Your Name'}</h1>
              <p className="text-sm sm:text-base text-[#f59e0b] mt-2 font-semibold tracking-[0.2em] uppercase">{d.title}</p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-x-5 gap-y-2 mt-4">
                {d.email && <span className="text-xs sm:text-sm text-[#94a3b8]">✉ {d.email}</span>}
                {d.phone && <span className="text-xs sm:text-sm text-[#94a3b8]">📞 {d.phone}</span>}
                {d.location && <span className="text-xs sm:text-sm text-[#94a3b8]">📍 {d.location}</span>}
                {d.website && <a href={d.website} className="text-xs sm:text-sm text-[#f59e0b] hover:underline">🌐 Website</a>}
                {d.linkedin && <a href={d.linkedin} className="text-xs sm:text-sm text-[#f59e0b] hover:underline">LinkedIn</a>}
              </div>
            </div>
          </div>
          {d.bio && (
            <p className="text-sm sm:text-base text-[#94a3b8] mt-6 sm:mt-8 leading-relaxed max-w-2xl italic border-l-4 border-[#f59e0b]/40 pl-4 mx-auto sm:mx-0">
              {d.bio}
            </p>
          )}
        </div>
      </div>

      {/* BODY */}
      <div className="max-w-4xl mx-auto px-6 py-10 sm:px-12 sm:py-16 grid grid-cols-1 md:grid-cols-[1fr_1.8fr] gap-12">

        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-10">
          {skills.length > 0 && (
            <ClassicSection title="Skills" accent="#f59e0b">
              {skills.map((s, i) => (
                <div key={i} className="mb-4">
                  <div className="flex justify-between items-center mb-1.5">
                    <div className="flex items-center gap-2">
                      {s.image && <img src={s.image} alt={s.name} className="w-4 h-4 object-contain rounded" />}
                      <span className="text-sm font-semibold text-[#e2e8f0]">{s.name}</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-[#f59e0b]">{s.level}</span>
                  </div>
                  <div className="h-1 bg-[#f59e0b]/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] transition-all duration-500" 
                      style={{ width: levelWidth[s.level] }}
                    />
                  </div>
                </div>
              ))}
            </ClassicSection>
          )}
          
          {education.length > 0 && (
            <ClassicSection title="Education" accent="#f59e0b">
              {education.map((e, i) => (
                <div key={i} className="mb-6 last:mb-0">
                  <p className="font-bold text-sm sm:text-base text-white">{e.degree} {e.field && `in ${e.field}`}</p>
                  <p className="text-xs sm:text-sm text-[#f59e0b] mt-1">{e.institution}</p>
                  <p className="text-[11px] sm:text-xs text-[#64748b] mt-1 font-medium">{e.from}{e.to && ` — ${e.to}`} {e.grade && `· ${e.grade}`}</p>
                </div>
              ))}
            </ClassicSection>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-10">
          {experience.length > 0 && (
            <ClassicSection title="Experience" accent="#f59e0b">
              {experience.map((e, i) => (
                <div key={i} className="mb-8 last:mb-0 border-b border-[#f59e0b]/10 pb-6 last:border-0 last:pb-0">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-3">
                    <div>
                      <p className="font-bold text-base sm:text-lg text-white leading-tight">{e.role}</p>
                      <p className="text-sm text-[#f59e0b] mt-1 font-medium">{e.company}{e.location && ` · ${e.location}`}</p>
                    </div>
                    <span className="text-[10px] sm:text-xs text-[#64748b] whitespace-nowrap bg-[#f59e0b]/10 px-2.5 py-1 rounded-md border border-[#f59e0b]/20 italic">
                      {e.from}{e.to && ` – ${e.current ? 'Present' : e.to}`}
                    </span>
                  </div>
                  {e.description && <p className="text-sm text-[#94a3b8] leading-relaxed mt-2">{e.description}</p>}
                </div>
              ))}
            </ClassicSection>
          )}

          {projects.length > 0 && (
            <ClassicSection title="Projects" accent="#f59e0b">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projects.map((proj, i) => (
                  <div key={i} className="bg-[#f59e0b]/5 rounded-xl border border-[#f59e0b]/20 overflow-hidden group hover:border-[#f59e0b]/40 transition-all">
                    {proj.image && (
                      <div className="h-24 overflow-hidden">
                        <img src={proj.image} alt={proj.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                    )}
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-bold text-sm text-white">{proj.name}</p>
                        <div className="flex gap-3">
                          {proj.link && <a href={proj.link} className="text-[10px] text-[#f59e0b] hover:underline font-bold">LIVE ↗</a>}
                          {proj.github && <a href={proj.github} className="text-[10px] text-[#94a3b8] hover:underline">CODE ↗</a>}
                        </div>
                      </div>
                      {proj.description && <p className="text-xs text-[#94a3b8] line-clamp-2 leading-relaxed">{proj.description}</p>}
                      {proj.tech && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {(typeof proj.tech === 'string' ? proj.tech.split(',') : Array.isArray(proj.tech) ? proj.tech : []).map(t => t.trim()).filter(Boolean).map((t, ti) => (
                            <span key={ti} className="text-[9px] px-2 py-0.5 rounded-md bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/20 font-medium">{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ClassicSection>
          )}

          {/* ... Other sections (Certifications, Publications, Awards) - Following same pattern ... */}
          {certifications.length > 0 && (
            <ClassicSection title="Certifications" accent="#f59e0b">
              {certifications.map((cert, i) => (
                <div key={i} className="mb-4 bg-[#f59e0b]/5 p-3 rounded-lg border border-[#f59e0b]/10 flex gap-4 items-center">
                  {cert.image && <img src={cert.image} alt={cert.name} className="w-12 h-12 object-cover rounded-md border border-[#f59e0b]/20" />}
                  <div>
                    <p className="font-bold text-sm text-white">{cert.name}</p>
                    <p className="text-xs text-[#f59e0b] mt-0.5">{cert.issuer}</p>
                    {cert.url && <a href={cert.url} className="text-[10px] text-[#f59e0b] hover:underline mt-1 inline-block">Verify Certificate ↗</a>}
                  </div>
                </div>
              ))}
            </ClassicSection>
          )}
          {publications.length > 0 && (
            <ClassicSection title="Publications" accent="#f59e0b">
              {publications.map((pub, i) => (
                <div key={i} className="mb-4 bg-[#f59e0b]/5 p-3 rounded-lg border border-[#f59e0b]/10 flex gap-4 items-start">
                  {pub.image && <img src={pub.image} alt={pub.title} className="w-12 h-12 object-cover rounded-md border border-[#f59e0b]/20 shrink-0" />}
                  <div>
                    <p className="font-bold text-sm text-white">{pub.title}</p>
                    <p className="text-xs text-[#f59e0b] mt-0.5">{pub.publisher}</p>
                    <div className="flex gap-3 items-center mt-1">
                      {pub.date && <span className="text-[10px] text-[#64748b]">{pub.date}</span>}
                      {pub.url && <a href={pub.url} className="text-[10px] text-[#f59e0b] hover:underline font-medium">Read ↗</a>}
                    </div>
                  </div>
                </div>
              ))}
            </ClassicSection>
          )}

          {awards.length > 0 && (
            <ClassicSection title="Awards & Achievements" accent="#f59e0b">
              {awards.map((aw, i) => (
                <div key={i} className="mb-4 bg-[#f59e0b]/5 p-3 rounded-lg border border-[#f59e0b]/10 flex gap-4 items-start">
                  {aw.image && <img src={aw.image} alt={aw.title} className="w-12 h-12 object-cover rounded-md border border-[#f59e0b]/20 shrink-0" />}
                  <div>
                    <p className="font-bold text-sm text-white">{aw.title}</p>
                    <p className="text-xs text-[#f59e0b] mt-0.5">{aw.organization}</p>
                    {aw.date && <p className="text-[10px] text-[#64748b] mt-0.5">{aw.date}</p>}
                    {aw.description && <p className="text-xs text-[#94a3b8] mt-2 leading-relaxed">{aw.description}</p>}
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
