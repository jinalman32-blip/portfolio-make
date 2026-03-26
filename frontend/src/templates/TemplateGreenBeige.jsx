import React from 'react'

const BG    = '#ddd9ce'
const GREEN = '#6b8c4e'
const BLACK = '#111111'

/* ── Pixel logo (center header icon) ── */
const PixelLogo = ({ size = 42 }) => (
  <svg width={size} height={size} viewBox="0 0 42 42">
    <rect x="4"  y="3"  width="8" height="8" fill={GREEN}/>
    <rect x="16" y="3"  width="8" height="8" fill={GREEN}/>
    <rect x="28" y="3"  width="8" height="8" fill={GREEN}/>
    <rect x="4"  y="15" width="8" height="8" fill={GREEN}/>
    <rect x="28" y="15" width="8" height="8" fill={GREEN}/>
    <rect x="4"  y="27" width="32" height="6" fill={GREEN}/>
  </svg>
)

/* ── Decorative dashed SVG curve ── */
const Curve = ({ style }) => (
  <svg style={{ position:'absolute', pointerEvents:'none', overflow:'visible', ...style }}
       viewBox="0 0 520 130" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 95 Q110 15 250 70 Q380 125 520 35"
          stroke={GREEN} strokeWidth="2.5" strokeDasharray="9 7" fill="none"/>
  </svg>
)

/* ── Green dot ── */
const Dot = ({ style }) => (
  <div style={{ position:'absolute', width:15, height:15, borderRadius:'50%', background:GREEN, ...style }}/>
)

/* ── Arrow circle (↗) ── */
const ArrowCircle = ({ size = 38 }) => (
  <div style={{
    width:size, height:size, borderRadius:'50%', background:GREEN, flexShrink:0,
    display:'flex', alignItems:'center', justifyContent:'center'
  }}>
    <svg width={size*0.44} height={size*0.44} viewBox="0 0 16 16" fill="none">
      <path d="M3 13L13 3M13 3H6M13 3V10" stroke="white" strokeWidth="2.2"
            strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
)

/* ── Filled green pill badge ── */
const Badge = ({ children, filled = true, style = {} }) => (
  <span style={{
    display:'inline-flex', alignItems:'center',
    background: filled ? GREEN : 'transparent',
    color: filled ? 'white' : GREEN,
    border: `2px solid ${GREEN}`,
    borderRadius:50, padding:'7px 22px',
    fontWeight:700, fontSize:14, whiteSpace:'nowrap', ...style
  }}>{children}</span>
)

/* ── 2025 toggle badge ── */
const Toggle = () => (
  <div style={{
    display:'inline-flex', alignItems:'center', gap:8,
    background:GREEN, borderRadius:30, padding:'6px 14px'
  }}>
    <span style={{ color:'white', fontWeight:800, fontSize:13 }}>2025</span>
    <div style={{ width:26, height:16, borderRadius:10, background:'rgba(255,255,255,0.35)', position:'relative' }}>
      <div style={{ position:'absolute', right:3, top:3, width:10, height:10, borderRadius:'50%', background:'white' }}/>
    </div>
  </div>
)

/* ── Giant section title ── */
const BigHead = ({ children, style = {} }) => (
  <h2 style={{
    fontSize:'clamp(52px,9vw,96px)', fontWeight:900, lineHeight:0.86,
    letterSpacing:'-2px', color:BLACK, textTransform:'uppercase', margin:0,
    fontFamily:"'Arial Black','Arial',sans-serif", ...style
  }}>{children}</h2>
)

/* ── 3-column header with vertical dividers ── */
const Header = ({ name, handle }) => (
  <div style={{
    display:'grid', gridTemplateColumns:'1fr 90px 1fr',
    borderBottom:`1.5px solid rgba(0,0,0,0.14)`, background:BG,
    alignItems:'center'
  }}>
    <div style={{ padding:'16px 32px' }}>
      <span style={{ fontSize:14, fontWeight:600, color:BLACK }}>{name}</span>
    </div>
    <div style={{
      padding:'12px 0', display:'flex', alignItems:'center', justifyContent:'center',
      borderLeft:`1.5px solid rgba(0,0,0,0.14)`, borderRight:`1.5px solid rgba(0,0,0,0.14)`
    }}>
      <PixelLogo/>
    </div>
    <div style={{ padding:'16px 32px', textAlign:'right' }}>
      <span style={{ fontSize:14, fontWeight:600, color:BLACK }}>{handle}</span>
    </div>
  </div>
)

/* ══════════════════════════════════════ MAIN COMPONENT ══════════════════════════════════════ */
export default function TemplateGreenBeige(p) {
  const {
    details: d     = {},
    skills         = [],
    education      = [],
    experience     = [],
    projects       = [],
    certifications = [],
    publications   = [],
    awards         = []
  } = p

  const handle = d.linkedin
    ? '@' + d.linkedin.replace(/\/$/, '').split('/').pop()
    : '@portfolio'

  const displayName = d.name || 'Your Name'

  return (
    <div id="portfolio-render" style={{ background:BG, minHeight:'100vh', fontFamily:"'Arial','Helvetica',sans-serif", color:BLACK }}>
      <style>{`
        @media (max-width: 640px) {
          #portfolio-render { font-size: 15px; }
          #portfolio-render [style*="padding:'60px"], #portfolio-render [style*="padding:'72px"], #portfolio-render [style*="padding:'80px"], #portfolio-render [style*="padding: 72px"] { padding: 16px !important; }
          #portfolio-render [style*="display: grid"][style*="gridTemplateColumns"], #portfolio-render [style*="grid-template-columns"] { grid-template-columns: 1fr !important; }
          #portfolio-render img { max-width: 100% !important; height: auto !important; display: block; }
          #portfolio-render h1, #portfolio-render h2, #portfolio-render h4 { font-size: 1.4rem !important; }
          #portfolio-render [style*="position: absolute"][style*="left:"] { display: none !important; }
          #portfolio-render [style*="width: 300"], #portfolio-render [style*="width: 260"], #portfolio-render [style*="width: 220"] { width: 100% !important; max-width: 100% !important; }
        }
      `}</style>

      {/* ══════════ PAGE 1 – HERO ══════════ */}
      <Header name={displayName} handle={handle}/>

      <section style={{ position:'relative', padding:'60px 48px 72px', overflow:'hidden', minHeight:320 }}>
        {/* dashed curves */}
        <Curve style={{ width:560, left:'4%', top:30 }}/>
        <Curve style={{ width:440, right:-20, bottom:0, transform:'scaleX(-1) scaleY(-1)' }}/>

        {/* green dots on curves */}
        <Dot style={{ left:'32%', top:'42%' }}/>
        <Dot style={{ left:'18%', bottom:'26%' }}/>

        {/* circular profile photo — top right, overlapping PORTFOLIO text */}
        {d.profileImage && (
          <div style={{
            position:'absolute', top:36, right:52,
            width:140, height:140, borderRadius:'50%',
            overflow:'hidden', border:`4px solid ${GREEN}`,
            boxShadow:`0 0 0 8px ${BG}`, zIndex:2
          }}>
            <img src={d.profileImage} alt={displayName}
                 style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
          </div>
        )}

        {/* "Creative" badge + arrow */}
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:22, flexWrap:'wrap' }}>
          <Badge>{d.title || 'Creative'}</Badge>
          <ArrowCircle/>
        </div>

        {/* BIG PORTFOLIO */}
        <h1 style={{
          fontSize:'clamp(70px,12vw,120px)', fontWeight:900, lineHeight:0.83,
          letterSpacing:'-3px', color:BLACK, textTransform:'uppercase',
          margin:'0 0 22px', fontFamily:"'Arial Black','Arial',sans-serif",
          position:'relative', zIndex:1
        }}>PORTFOLIO</h1>

        {/* 2025 toggle */}
        <div style={{ marginBottom:32 }}><Toggle/></div>

        {/* contact info — bottom left */}
        <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
          {d.phone   && <span style={{ fontSize:13, color:'#444' }}>{d.phone}</span>}
          {d.email   && <span style={{ fontSize:13, color:'#444' }}>{d.email}</span>}
          {d.website && <span style={{ fontSize:13, color:'#444' }}>{d.website}</span>}
        </div>
      </section>

      <div style={{ height:1.5, background:'rgba(0,0,0,0.12)', margin:'0 48px' }}/>

      {/* ══════════ PAGE 3 – ABOUT ME ══════════ */}
      <section style={{
        position:'relative', padding:'72px 48px',
        display:'grid', gridTemplateColumns:'1fr 1fr', gap:64,
        alignItems:'center', overflow:'hidden'
      }}>
        <Curve style={{ width:340, left:-20, bottom:10 }}/>
        <Dot style={{ right:'52%', bottom:'22%' }}/>

        {/* LEFT */}
        <div style={{ position:'relative', zIndex:1 }}>
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16, flexWrap:'wrap' }}>
            <Toggle/>
            <ArrowCircle/>
          </div>
          <BigHead>ABOUT ME</BigHead>

          <p style={{ fontSize:16, fontWeight:700, color:BLACK, marginTop:20, marginBottom:14, lineHeight:1.4 }}>
            Design With Purpose, Creativity With Passion.
          </p>

          <p style={{ fontSize:14, lineHeight:1.8, color:'#444', maxWidth:400, margin:0 }}>
            {d.bio || `I'm ${displayName}, ${d.title ? `a ${d.title}` : 'a professional'} who strives to create work that not only looks stunning but also communicates effectively.`}
          </p>
          {d.location && (
            <p style={{ fontSize:13, color:GREEN, marginTop:12, fontWeight:700 }}>{d.location}</p>
          )}
        </div>

        {/* RIGHT — photo */}
        <div style={{ position:'relative' }}>
          {d.profileImage ? (
            <div style={{ borderRadius:16, overflow:'hidden', height:310 }}>
              <img src={d.profileImage} alt={displayName}
                   style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
            </div>
          ) : (
            <div style={{
              borderRadius:16, background:`${GREEN}20`, height:310,
              display:'flex', alignItems:'center', justifyContent:'center'
            }}>
              <span style={{ fontSize:56, opacity:0.25 }}>👤</span>
            </div>
          )}
          <Dot style={{ bottom:-10, right:-10 }}/>
          <Curve style={{ width:280, right:-30, bottom:-40, transform:'scaleX(-1)' }}/>
        </div>
      </section>

      {/* ══════════ PAGE 4 – PORTFOLIO / EXPERIENCE ══════════ */}
      {(projects.length > 0 || experience.length > 0) && (
        <section style={{ position:'relative', padding:'72px 48px', overflow:'hidden' }}>
          <Curve style={{ width:440, left:-10, top:70 }}/>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'start' }}>
            {/* LEFT — big heading */}
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:18, flexWrap:'wrap' }}>
                <Badge>Experience</Badge>
                <ArrowCircle/>
              </div>
              <BigHead>PORTFOLIO</BigHead>
              <div style={{ marginTop:20 }}><Toggle/></div>
            </div>

            {/* RIGHT — timeline */}
            <div style={{ paddingTop:8 }}>
              <div style={{ position:'relative', paddingLeft:28, borderLeft:`2.5px solid ${GREEN}` }}>
                {(projects.length > 0 ? projects : experience).slice(0, 5).map((item, i) => (
                  <div key={i} style={{ marginBottom:32, position:'relative' }}>
                    <div style={{
                      position:'absolute', left:-35, top:4,
                      width:14, height:14, borderRadius:'50%', background:GREEN
                    }}/>
                    <h4 style={{ fontWeight:800, fontSize:15, margin:'0 0 6px', color:BLACK }}>
                      {item.name || item.role || item.company}
                    </h4>
                    {(item.tech || item.company || item.from) && (
                      <p style={{ fontSize:12, color:GREEN, margin:'0 0 6px', fontWeight:700 }}>
                        {item.tech || `${item.company || ''}${item.from ? ' · ' + item.from + '–' + (item.to || 'Present') : ''}`}
                      </p>
                    )}
                    {item.description && (
                      <ul style={{ margin:0, paddingLeft:16 }}>
                        {item.description.split('\n').filter(Boolean).slice(0,3).map((line, j) => (
                          <li key={j} style={{ fontSize:13, color:'#555', lineHeight:1.6, marginBottom:4 }}>{line}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══════════ PAGE 5 – PROJECT IMAGES ══════════ */}
      {projects.filter(pr => pr.image).length > 0 && (() => {
        const imgs = projects.filter(pr => pr.image).slice(0, 3)
        return (
          <section style={{ padding:'8px 48px 64px', position:'relative', overflow:'hidden' }}>
            <Dot style={{ left:120, top:30 }}/>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:22 }}>
              {imgs.map((proj, i) => (
                <div key={i} style={{
                  borderRadius:18, overflow:'hidden', position:'relative',
                  boxShadow:'0 6px 24px rgba(0,0,0,0.12)'
                }}>
                  <img src={proj.image} alt={proj.name}
                       style={{ width:'100%', height:220, objectFit:'cover', display:'block' }}/>
                  <div style={{
                    background:GREEN, padding:'11px 18px',
                    display:'flex', alignItems:'center', justifyContent:'space-between'
                  }}>
                    <span style={{ color:'white', fontWeight:700, fontSize:13 }}>
                      {proj.name || `Project ${i+1}`}
                    </span>
                    <ArrowCircle size={30}/>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )
      })()}

      {/* ══════════ PAGE 6 – EXPERTISE / SKILLS ══════════ */}
      {skills.length > 0 && (
        <section style={{
          position:'relative', padding:'72px 48px',
          display:'grid', gridTemplateColumns:'1fr 1fr', gap:64,
          alignItems:'start', overflow:'hidden'
        }}>
          <Curve style={{ width:320, right:30, bottom:30, transform:'scaleX(-1)' }}/>
          <Dot style={{ right:'48%', bottom:'18%' }}/>

          {/* LEFT */}
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:18, flexWrap:'wrap' }}>
              <ArrowCircle/>
              <Badge>As a {d.title || 'Professional'}</Badge>
            </div>
            <BigHead>EXPERTISE</BigHead>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:32, marginTop:30 }}>
              {/* Design Skills list */}
              <div>
                <p style={{ fontWeight:800, fontSize:14, margin:'0 0 14px', color:BLACK }}>Design Skills:</p>
                <ul style={{ listStyle:'disc', paddingLeft:20, margin:0 }}>
                  {skills.slice(0, 6).map((s, i) => (
                    <li key={i} style={{ fontSize:13, color:'#444', marginBottom:10, lineHeight:1.45 }}>
                      {s.image && (
                        <img src={s.image} alt={s.name}
                             style={{ width:14, height:14, objectFit:'contain', marginRight:6, verticalAlign:'middle' }}/>
                      )}
                      {s.name}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Core Values pills */}
              <div>
                <p style={{ fontWeight:800, fontSize:14, margin:'0 0 14px', color:BLACK }}>Core Values:</p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                  {skills.slice(0, 5).map((s, i) => (
                    <span key={i} style={{
                      padding:'7px 16px', borderRadius:30, fontSize:12, fontWeight:600,
                      background: i === 1 ? GREEN : 'transparent',
                      color: i === 1 ? 'white' : BLACK,
                      border:`1.5px solid ${GREEN}`
                    }}>{s.level || s.name}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — profile photo */}
          <div>
            {d.profileImage ? (
              <div style={{ borderRadius:16, overflow:'hidden', height:280 }}>
                <img src={d.profileImage} alt={displayName}
                     style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
              </div>
            ) : (
              <div style={{
                borderRadius:16, background:`${GREEN}20`, height:280,
                display:'flex', alignItems:'center', justifyContent:'center',
                flexWrap:'wrap', gap:10, padding:20
              }}>
                {skills.slice(0, 8).map((s, i) => (
                  <div key={i} style={{
                    padding:'7px 15px', borderRadius:30,
                    background:`${GREEN}18`, border:`1px solid ${GREEN}55`,
                    fontSize:12, color:BLACK
                  }}>
                    {s.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ══════════ CLIENT FEEDBACK / TESTIMONIALS ══════════ */}
      {(experience.length > 0 || projects.length > 0) && (
        <section style={{ position:'relative', padding:'72px 48px', overflow:'hidden' }}>
          <Curve style={{ width:400, left:-10, top:70 }}/>
          <Dot style={{ left:'38%', top:'35%' }}/>

          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:18, flexWrap:'wrap', justifyContent:'flex-end' }}>
            <ArrowCircle/>
            <Badge>Clients Say About Me</Badge>
          </div>

          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:18 }}>
            <Toggle/>
          </div>

          <BigHead>CLIENT FEEDBACK</BigHead>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:22, marginTop:36 }}>
            {(experience.slice(0, 2).length > 0 ? experience.slice(0, 2) : projects.slice(0, 2)).map((item, i) => (
              <div key={i} style={{
                background:GREEN, borderRadius:18, padding:'28px 30px',
                position:'relative', clipPath:'polygon(0 0,100% 0,100% 82%,60% 82%,55% 100%,50% 82%,0 82%)'
              }}>
                <p style={{ fontSize:14, color:'white', lineHeight:1.75, margin:'0 0 18px' }}>
                  {item.description
                    ? item.description.substring(0, 120) + (item.description.length > 120 ? '…' : '')
                    : `Excellent work delivered on ${item.name || item.role || item.company}. Highly recommended.`}
                </p>
                <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <span style={{ fontWeight:800, fontSize:13, color:'white' }}>
                    {item.company || item.name || `Client ${i+1}`}
                  </span>
                  <span style={{ width:32, height:2, background:'rgba(255,255,255,0.5)', display:'inline-block' }}/>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══════════ PAGE 8 – OUR PROCESS / EDUCATION ══════════ */}
      {education.length > 0 && (
        <section style={{ position:'relative', padding:'72px 48px', overflow:'hidden' }}>
          <Curve style={{ width:470, left:-10, top:60 }}/>

          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:18, flexWrap:'wrap', justifyContent:'flex-end' }}>
            <ArrowCircle/>
            <Badge>Collaborating for Success.</Badge>
          </div>

          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:18 }}>
            <Toggle/>
          </div>

          <BigHead>OUR PROCESS</BigHead>

          {/* horizontal timeline */}
          <div style={{ position:'relative', marginTop:52 }}>
            {/* line */}
            <div style={{
              position:'absolute', top:16, left:0, right:40,
              height:2.5, background:GREEN
            }}/>
            {/* arrow head */}
            <div style={{
              position:'absolute', top:9, right:30,
              width:0, height:0,
              borderTop:'9px solid transparent',
              borderBottom:'9px solid transparent',
              borderLeft:`14px solid ${GREEN}`
            }}/>

            <div style={{ display:'grid', gridTemplateColumns:`repeat(${Math.min(education.length,4)},1fr)`, gap:20 }}>
              {education.slice(0, 4).map((edu, i) => (
                <div key={i} style={{ paddingTop:46, paddingRight:16, position:'relative' }}>
                  {/* circle on line */}
                  <div style={{
                    position:'absolute', top:8, left:0,
                    width:16, height:16, borderRadius:'50%',
                    background:GREEN, border:`3px solid ${BG}`, boxSizing:'border-box'
                  }}/>
                  {/* numbered badge */}
                  <div style={{
                    display:'inline-flex', alignItems:'center', justifyContent:'center',
                    width:34, height:34, borderRadius:'50%', background:GREEN,
                    color:'white', fontWeight:800, fontSize:12, marginBottom:12
                  }}>0{i+1}</div>
                  <h4 style={{ fontWeight:800, fontSize:14, margin:'0 0 6px', color:BLACK }}>
                    {edu.degree}{edu.field ? ` — ${edu.field}` : ''}
                  </h4>
                  <p style={{ fontSize:12, color:'#555', margin:0, lineHeight:1.55 }}>
                    {edu.institution}<br/>
                    {edu.from && `${edu.from}–${edu.to || 'Present'}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════ CERTIFICATIONS ══════════ */}
      {certifications.length > 0 && (
        <section style={{ padding:'64px 48px', position:'relative', overflow:'hidden' }}>
          <Curve style={{ width:380, right:-10, top:30, transform:'scaleX(-1)' }}/>
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
            <ArrowCircle/>
            <Badge>Certifications</Badge>
            <Toggle/>
          </div>
          <BigHead>CREDENTIALS</BigHead>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:22, marginTop:36 }}>
            {certifications.slice(0, 4).map((cert, i) => (
              <div key={i} style={{ background:GREEN, borderRadius:18, padding:'26px 30px' }}>
                {cert.image && (
                  <img src={cert.image} alt={cert.name}
                       style={{ width:48, height:48, objectFit:'contain', marginBottom:12, filter:'brightness(0) invert(1)' }}/>
                )}
                <h4 style={{ fontWeight:800, fontSize:15, color:'white', margin:'0 0 7px' }}>{cert.name}</h4>
                {cert.issuer && <p style={{ fontSize:12, color:'rgba(255,255,255,0.85)', margin:0 }}>{cert.issuer}</p>}
                {cert.date   && <p style={{ fontSize:11, color:'rgba(255,255,255,0.65)', margin:'6px 0 0', fontWeight:700 }}>{cert.date}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══════════ AWARDS ══════════ */}
      {awards.length > 0 && (
        <section style={{ padding:'40px 48px 64px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
            <ArrowCircle/>
            <Badge>Awards</Badge>
          </div>
          <BigHead>RECOGNITION</BigHead>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:18, marginTop:32 }}>
            {awards.slice(0, 3).map((aw, i) => (
              <div key={i} style={{
                border:`2px solid ${GREEN}`, borderRadius:16, padding:'22px 24px'
              }}>
                {aw.image && (
                  <img src={aw.image} alt={aw.title}
                       style={{ width:44, height:44, objectFit:'contain', marginBottom:10 }}/>
                )}
                <h4 style={{ fontWeight:800, fontSize:14, margin:'0 0 6px', color:BLACK }}>{aw.title}</h4>
                {aw.org  && <p style={{ fontSize:12, color:'#555', margin:0 }}>{aw.org}</p>}
                {aw.date && <p style={{ fontSize:11, color:GREEN, margin:'6px 0 0', fontWeight:700 }}>{aw.date}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══════════ PUBLICATIONS ══════════ */}
      {publications.length > 0 && (
        <section style={{ padding:'40px 48px 64px', position:'relative', overflow:'hidden' }}>
          <Curve style={{ width:400, right:-10, top:20, transform:'scaleX(-1)' }}/>
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
            <ArrowCircle/>
            <Badge>Publications</Badge>
          </div>
          <BigHead>PUBLISHED</BigHead>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginTop:32 }}>
            {publications.slice(0, 4).map((pub, i) => (
              <div key={i} style={{
                border:`1.5px solid ${GREEN}44`, borderRadius:14, padding:'22px 26px',
                background:`${GREEN}08`
              }}>
                {pub.image && (
                  <img src={pub.image} alt={pub.title}
                       style={{ width:'100%', height:90, objectFit:'cover', borderRadius:8, marginBottom:12 }}/>
                )}
                <h4 style={{ fontWeight:800, fontSize:14, margin:'0 0 6px', color:BLACK }}>{pub.title}</h4>
                {pub.publisher && <p style={{ fontSize:12, color:GREEN, margin:'0 0 4px', fontWeight:600 }}>{pub.publisher}</p>}
                {pub.date      && <p style={{ fontSize:11, color:'#666', margin:0 }}>{pub.date}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══════════ PAGE 9 – LET'S COLLABORATE ══════════ */}
      <section style={{
        position:'relative', padding:'80px 48px',
        display:'grid', gridTemplateColumns:'1fr 1fr', gap:64,
        alignItems:'center', overflow:'hidden'
      }}>
        <Curve style={{ width:440, left:-10, bottom:40 }}/>
        <Dot style={{ left:'46%', top:'28%' }}/>

        {/* LEFT */}
        <div style={{ position:'relative', zIndex:1 }}>
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:18 }}>
            <ArrowCircle/>
            <Badge>Your Design Begins Here.</Badge>
          </div>
          <BigHead>LET'S<br/>COLLABORATE</BigHead>
          <div style={{ marginTop:20, marginBottom:24 }}><Toggle/></div>
          <p style={{ fontSize:14, color:'#555', lineHeight:1.8, maxWidth:400 }}>
            Let's transform your creative challenges into stunning solutions that set you apart. Whether you're a startup, an established business, or an individual with a passion project.
          </p>
          {d.email && (
            <a href={`mailto:${d.email}`} style={{
              display:'inline-block', marginTop:24, padding:'13px 32px',
              background:GREEN, color:'white', borderRadius:50,
              fontWeight:800, fontSize:13, textDecoration:'none'
            }}>Contact Us Today!</a>
          )}
          {d.website && (
            <p style={{ fontSize:13, color:'#666', marginTop:14 }}>{d.website}</p>
          )}
        </div>

        {/* RIGHT — 2 photos + contact grid */}
        <div>
          {d.profileImage && (
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:26 }}>
              <div style={{ borderRadius:16, overflow:'hidden', height:185 }}>
                <img src={d.profileImage} alt=""
                     style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
              </div>
              <div style={{ borderRadius:16, overflow:'hidden', height:185 }}>
                <img src={d.profileImage} alt=""
                     style={{ width:'100%', height:'100%', objectFit:'cover', filter:'grayscale(45%) brightness(0.9)' }}/>
              </div>
            </div>
          )}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:14 }}>
            {[['Phone', d.phone], ['Mail', d.email], ['Website', d.website]].filter(x => x[1]).map(([label, val], i) => (
              <div key={i}>
                <p style={{ fontWeight:800, fontSize:12, margin:'0 0 5px', color:BLACK }}>{label}</p>
                <p style={{ fontSize:11, color:'#555', margin:0, wordBreak:'break-all', lineHeight:1.45 }}>{val}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ PAGE 10 – THANK YOU ══════════ */}
      <div style={{ height:1.5, background:'rgba(0,0,0,0.12)', margin:'0 48px' }}/>

      <section style={{ position:'relative', padding:'72px 48px 56px', overflow:'hidden' }}>
        <Curve style={{ width:500, left:'5%', top:30 }}/>
        <Curve style={{ width:400, right:-20, bottom:10, transform:'scaleX(-1) scaleY(-1)' }}/>
        <Dot style={{ left:'28%', top:'40%' }}/>
        <Dot style={{ left:'18%', bottom:'32%' }}/>

        {/* 2025 toggle + THANK YOU */}
        <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:10, flexWrap:'wrap' }}>
          <Toggle/>
        </div>

        <div style={{ display:'flex', alignItems:'center', gap:14, flexWrap:'wrap', marginBottom:8 }}>
          <BigHead>THANK YOU</BigHead>
        </div>

        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:48, flexWrap:'wrap' }}>
          <ArrowCircle/>
          <Badge>For Your Attention</Badge>
        </div>

        {/* footer contact row */}
        <div style={{ display:'grid', gridTemplateColumns:'1.5fr 1fr 1fr 1fr', gap:20, alignItems:'start' }}>
          <div>
            <p style={{ fontWeight:800, fontSize:13, margin:'0 0 5px', color:BLACK }}>For More<br/>Information :</p>
            <div style={{ width:60, height:2, background:BLACK, marginTop:6 }}/>
          </div>
          {[['Phone', d.phone], ['Mail', d.email], ['Website', d.website]].filter(x => x[1]).map(([label, val], i) => (
            <div key={i}>
              <p style={{ fontWeight:800, fontSize:13, margin:'0 0 6px', color:BLACK }}>{label}</p>
              <p style={{ fontSize:12, color:'#555', margin:0, lineHeight:1.5, wordBreak:'break-all' }}>{val}</p>
            </div>
          ))}
        </div>
      </section>

      {/* footer bar */}
      <Header name={displayName} handle={handle}/>
    </div>
  )
}
