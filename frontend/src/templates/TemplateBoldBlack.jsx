import React from 'react'

/* ── Palette — pure black & white like PDF ── */
const BG    = '#0a0a0a'   // near-black background
const WHITE = '#F0EEE8'   // off-white text
const GRAY  = '#888888'   // muted gray for secondary text
const LINE  = '#222222'   // subtle divider

const lvl = { Beginner: '35%', Intermediate: '65%', Expert: '92%' }

/* ══════════════════════════════
   TOP NAV BAR (every slide)
══════════════════════════════ */
function TopBar({ left = '', center = 'Personal Presentation', right = '2026' }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '18px 48px',
      borderBottom: `1px solid ${LINE}`,
    }}>
      <span style={{ fontSize: 13, fontWeight: 800, color: WHITE, letterSpacing: 0.3 }}>{left}</span>
      <span style={{ fontSize: 13, fontWeight: 400, color: GRAY }}>{center}</span>
      <span style={{ fontSize: 13, fontWeight: 400, color: GRAY }}>{right}</span>
    </div>
  )
}

/* ══════════════════════════════
   BOTTOM INFO BAR (every slide)
══════════════════════════════ */
function BottomBar({ project = '', name = '', recipient = '' }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
      padding: '18px 48px',
      borderTop: `1px solid ${LINE}`,
      marginTop: 'auto',
    }}>
      <div>
        <div style={{ fontSize: 11, color: GRAY, marginBottom: 2 }}>Name of Project:</div>
        <div style={{ fontSize: 13, fontWeight: 800, color: WHITE }}>{project || 'Portfolio'}</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 11, color: GRAY, marginBottom: 2 }}>Presented By:</div>
        <div style={{ fontSize: 13, fontWeight: 800, color: WHITE }}>{name}</div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: 11, color: GRAY, marginBottom: 2 }}>Presented To:</div>
        <div style={{ fontSize: 13, fontWeight: 800, color: WHITE }}>{recipient || 'Recruiter'}</div>
      </div>
    </div>
  )
}

/* ══════════════════════════════
   MASSIVE DISPLAY TEXT
══════════════════════════════ */
function Massive({ children, size = 96, style = {} }) {
  return (
    <div style={{
      fontSize: size,
      fontWeight: 900,
      color: WHITE,
      lineHeight: 0.92,
      letterSpacing: -2,
      textTransform: 'uppercase',
      fontFamily: "'Arial Black', 'Impact', 'Helvetica Neue', sans-serif",
      ...style,
    }}>
      {children}
    </div>
  )
}

/* ══════════════════════════════
   PHOTO PLACEHOLDER BOX
══════════════════════════════ */
function PhotoBox({ style = {}, label = '' }) {
  return (
    <div style={{
      background: '#1a1a1a',
      border: `1px solid ${LINE}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#333', fontSize: 13, letterSpacing: 1,
      ...style,
    }}>
      {label && <span style={{ color: '#333', fontSize: 12, textTransform: 'uppercase', letterSpacing: 2 }}>{label}</span>}
    </div>
  )
}

/* ══════════════════════════════
   SLIDE WRAPPER
══════════════════════════════ */
function Slide({ children, style = {} }) {
  return (
    <div style={{
      background: BG,
      minHeight: 480,
      display: 'flex',
      flexDirection: 'column',
      borderBottom: `2px solid #111`,
      ...style,
    }}>
      {children}
    </div>
  )
}

/* ══════════════════════════════
   BULLET ITEM
══════════════════════════════ */
function BulletItem({ title, desc }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 15, fontWeight: 800, color: WHITE, marginBottom: 4 }}>{title}</div>
      {desc && <div style={{ fontSize: 13, color: GRAY, lineHeight: 1.7 }}>{desc}</div>}
    </div>
  )
}

/* ════════════════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════════════════ */
export default function TemplateBoldBlack({ p = {} }) {
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

  const name      = d.name     || 'Your Name'
  const title     = d.title    || 'Digital Marketing Portfolio'
  const company   = d.location || 'International Co.'
  const year      = new Date().getFullYear()

  /* skill categories for "experience" slide */
  const expAreas = skills.length >= 4
    ? skills.slice(0, 4).map(s => ({ title: s.name, desc: `${s.level} level expertise` }))
    : [
        { title: 'Social Media Marketing Content', desc: 'Strategy and execution across all major social platforms to grow brand presence and engagement.' },
        { title: 'Search Engine Optimization', desc: 'On-page, off-page and technical SEO to drive organic traffic and improve search rankings.' },
        { title: 'Organize Product Promotions', desc: 'Full-cycle campaign management from planning through post-campaign performance analysis.' },
        { title: 'Email Marketing', desc: 'Segmented email flows and automation sequences that convert leads into loyal customers.' },
      ]

  /* strategy bullet points from experience or defaults */
  const strategyPoints = experience.length
    ? experience.slice(0, 3).map(e => ({ title: e.role, desc: e.description || `${e.company}${e.location ? ` · ${e.location}` : ''}` }))
    : [
        { title: 'Goals & Targets', desc: 'Setting clear KPIs and measurable milestones aligned with business growth objectives.' },
        { title: 'Analytics & Reports', desc: 'Data-driven insights using advanced analytics tools to measure and optimise performance.' },
        { title: 'Adaptation & Evolution', desc: 'Continuously refining strategies based on real-time data and market feedback.' },
      ]

  return (
    <div
      id="portfolio-render"
      style={{
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        background: BG,
        color: WHITE,
        minWidth: 840,
      }}
    >

      {/* ── SLIDE 1: COVER ── */}
      <Slide style={{ minHeight: 520 }}>
        <TopBar left={company} center="Personal Presentation" right={String(year)} />
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '40px 48px',
          textAlign: 'center',
        }}>
          <Massive size={100}>Digital</Massive>
          <Massive size={100}>Marketing</Massive>
          <Massive size={100}>Portfolio</Massive>
        </div>
        <BottomBar project={title} name={name} recipient="Recruiter" />
      </Slide>

      {/* ── SLIDE 2: INTRO / DIGITAL MARKETING ── */}
      <Slide>
        <TopBar left={company} center="Personal Presentation" right={String(year)} />
        <div style={{ flex: 1, display: 'flex', padding: '40px 48px', gap: 48 }}>
          {/* left */}
          <div style={{ flex: '0 0 42%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Massive size={72}>Digital</Massive>
            <Massive size={72}>Marketing</Massive>
            <p style={{ fontSize: 14, color: GRAY, lineHeight: 1.8, marginTop: 24, maxWidth: 440 }}>
              {d.bio || `Results-driven ${title} with expertise across the full digital marketing spectrum. Focused on delivering measurable growth through data-backed strategies.`}
            </p>
          </div>
          {/* right — two photo slots */}
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
            <PhotoBox style={{ minHeight: 300 }} />
            <PhotoBox style={{ minHeight: 300 }} />
          </div>
        </div>
        <BottomBar project={title} name={name} recipient="Recruiter" />
      </Slide>

      {/* ── SLIDE 3: HELLO I'M NAME ── */}
      <Slide>
        <TopBar left={company} center="Personal Presentation" right={String(year)} />
        <div style={{ flex: 1, display: 'flex', padding: '40px 48px', gap: 48, alignItems: 'center' }}>
          {/* left */}
          <div style={{ flex: '0 0 44%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Massive size={64}>Hello,</Massive>
            <Massive size={64}>I'm</Massive>
            <Massive size={64}>{name.split(' ')[0]}</Massive>
            {name.split(' ').length > 1 && (
              <Massive size={64}>{name.split(' ').slice(1).join(' ')}!</Massive>
            )}
            <p style={{ fontSize: 14, color: GRAY, lineHeight: 1.8, marginTop: 24 }}>
              {d.bio || `A passionate ${title} dedicated to creating campaigns that connect, convert, and grow brands in the digital space.`}
            </p>
            {d.email && <p style={{ fontSize: 13, color: GRAY, marginTop: 12 }}>✉ {d.email}</p>}
            {d.location && <p style={{ fontSize: 13, color: GRAY, marginTop: 4 }}>📍 {d.location}</p>}
          </div>
          {/* right — large photo slot */}
          <div style={{ flex: 1 }}>
            {d.profileImage
              ? <img src={d.profileImage} alt={name} style={{ height: 380, width: '100%', objectFit: 'cover', display: 'block' }} />
              : <PhotoBox style={{ height: 380, width: '100%' }} />}
          </div>
        </div>
        <BottomBar project={title} name={name} recipient="Recruiter" />
      </Slide>

      {/* ── SLIDE 4: VISION & MISSION ── */}
      <Slide>
        <TopBar left={company} center="Personal Presentation" right={String(year)} />
        <div style={{ flex: 1, display: 'flex', padding: '40px 48px', gap: 48 }}>
          {/* left: photo + bullets */}
          <div style={{ flex: '0 0 40%', display: 'flex', flexDirection: 'column', gap: 24 }}>
            <PhotoBox style={{ flex: 1, minHeight: 260 }} />
            <BulletItem
              title="Make a target"
              desc="Define clear goals, audience personas, and measurable KPIs before any campaign launches."
            />
            <BulletItem
              title="Achieve a target"
              desc="Execute with precision, track progress continuously, and iterate for maximum impact."
            />
          </div>
          {/* right */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Massive size={72}>Vision &</Massive>
            <Massive size={72}>Mission of</Massive>
            <Massive size={72}>My Life.</Massive>
            <p style={{ fontSize: 14, color: GRAY, lineHeight: 1.8, marginTop: 20 }}>
              {d.bio || 'Committed to building meaningful digital connections that translate into long-term brand loyalty and sustainable revenue growth.'}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 24 }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: WHITE, marginBottom: 6 }}>Vision</div>
                <div style={{ fontSize: 13, color: GRAY, lineHeight: 1.7 }}>
                  To be the catalyst that turns brands into digital leaders through creative, data-driven marketing.
                </div>
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: WHITE, marginBottom: 6 }}>Mission</div>
                <div style={{ fontSize: 13, color: GRAY, lineHeight: 1.7 }}>
                  Deliver measurable impact for every client through strategy, content, and continuous optimisation.
                </div>
              </div>
            </div>
          </div>
        </div>
        <BottomBar project={title} name={name} recipient="Recruiter" />
      </Slide>

      {/* ── SLIDE 5: MARKETING STRATEGY ── */}
      <Slide>
        <TopBar left={company} center="Personal Presentation" right={String(year)} />
        <div style={{ flex: 1, display: 'flex', padding: '40px 48px', gap: 48 }}>
          {/* left: heading + bullets */}
          <div style={{ flex: '0 0 42%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Massive size={72}>Marketing</Massive>
            <Massive size={72}>Strategy</Massive>
            <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 0 }}>
              {strategyPoints.map((pt, i) => (
                <BulletItem key={i} title={pt.title} desc={pt.desc} />
              ))}
            </div>
          </div>
          {/* right: bio + photo */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <p style={{ fontSize: 14, color: GRAY, lineHeight: 1.8 }}>
              {d.bio || 'A structured approach to digital marketing that combines creative thinking with analytical rigour to deliver consistent, scalable results.'}
            </p>
            <PhotoBox style={{ flex: 1, minHeight: 240 }} />
          </div>
        </div>
        <BottomBar project={title} name={name} recipient="Recruiter" />
      </Slide>

      {/* ── SLIDE 6: PORTFOLIO PROJECTS ── */}
      <Slide>
        <TopBar left={company} center="Personal Presentation" right={String(year)} />
        <div style={{ flex: 1, display: 'flex', padding: '40px 48px', gap: 48 }}>
          {/* left */}
          <div style={{ flex: '0 0 42%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Massive size={72}>Portfolio</Massive>
            <Massive size={72}>Projects</Massive>
            {projects.length > 0 ? (
              <>
                {projects.slice(0, 2).map((proj, i) => (
                  <div key={i} style={{ marginTop: i === 0 ? 28 : 0 }}>
                    {proj.image && <img src={proj.image} alt={proj.name} style={{ width:'100%', height:80, objectFit:'cover', borderRadius:8, marginBottom:8, display:'block' }} />}
                    <BulletItem
                      title={proj.name}
                      desc={proj.description || (proj.tech ? `Tech: ${proj.tech}` : '')}
                    />
                  </div>
                ))}
              </>
            ) : (
              <>
                <p style={{ fontSize: 14, color: GRAY, lineHeight: 1.8, marginTop: 24 }}>
                  A curated selection of campaigns, strategies, and digital projects that demonstrate measurable impact across multiple channels.
                </p>
                <div style={{ marginTop: 16 }}>
                  <Massive size={48}>259+ Client</Massive>
                </div>
                <p style={{ fontSize: 13, color: GRAY, lineHeight: 1.7, marginTop: 12 }}>
                  Trusted by businesses across fashion, wellness, lifestyle, and technology sectors.
                </p>
              </>
            )}
            {projects.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <Massive size={48}>{projects.length}+ Projects</Massive>
              </div>
            )}
          </div>
          {/* right — large photo */}
          <div style={{ flex: 1 }}>
            <PhotoBox style={{ height: '100%', minHeight: 320 }} />
          </div>
        </div>
        <BottomBar project={title} name={name} recipient="Recruiter" />
      </Slide>

      {/* ── SLIDE 7: MY EXPERIENCE (with photos) ── */}
      <Slide>
        <TopBar left={company} center="Personal Presentation" right={String(year)} />
        {/* full-width two-photo row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, height: 220 }}>
          <PhotoBox style={{ height: 220 }} />
          <PhotoBox style={{ height: 220 }} />
        </div>
        {/* bottom half */}
        <div style={{ flex: 1, display: 'flex', padding: '32px 48px', gap: 48, alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <Massive size={68}>My Experience</Massive>
            <p style={{ fontSize: 14, color: GRAY, lineHeight: 1.8, marginTop: 16 }}>
              {d.bio || 'Years of hands-on experience delivering high-impact digital marketing campaigns for clients across multiple industries and market segments.'}
            </p>
          </div>
          <div style={{ flex: 1, paddingTop: 8 }}>
            {experience.length > 0
              ? experience.slice(0, 3).map((exp, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: WHITE, marginTop: 7, flexShrink: 0 }} />
                    <div>
                      <span style={{ fontSize: 14, fontWeight: 700, color: WHITE }}>{exp.role}</span>
                      {exp.company && <span style={{ fontSize: 13, color: GRAY }}> — {exp.company}</span>}
                      {exp.description && <div style={{ fontSize: 12, color: GRAY, marginTop: 2, lineHeight: 1.6 }}>{exp.description}</div>}
                    </div>
                  </div>
                ))
              : ['Campaign strategy & multi-channel execution across brand launches.', 'Performance analytics, A/B testing and ROI optimisation.', 'Content production, scheduling and community management.'].map((t, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: WHITE, marginTop: 7, flexShrink: 0 }} />
                    <div style={{ fontSize: 14, color: GRAY, lineHeight: 1.65 }}>{t}</div>
                  </div>
                ))
            }
          </div>
        </div>
        <BottomBar project={title} name={name} recipient="Recruiter" />
      </Slide>

      {/* ── SLIDE 8: MY EXPERIENCE (skills grid) ── */}
      <Slide>
        <TopBar left={company} center="Personal Presentation" right={String(year)} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '48px 48px 32px', alignItems: 'center' }}>
          <Massive size={80} style={{ textAlign: 'center', letterSpacing: -1 }}>My Experience</Massive>
          <p style={{ fontSize: 14, color: GRAY, lineHeight: 1.8, marginTop: 16, textAlign: 'center', maxWidth: 700 }}>
            {d.bio || 'Specialising in the full digital marketing lifecycle — from strategy and content creation to analytics and optimisation — delivering results at every stage.'}
          </p>
          {/* 2x2 skill areas */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginTop: 40, width: '100%' }}>
            {expAreas.map((area, i) => (
              <div key={i}>
                <div style={{ fontSize: 16, fontWeight: 800, color: WHITE, marginBottom: 6 }}>{area.title}</div>
                <div style={{ fontSize: 13, color: GRAY, lineHeight: 1.7 }}>{area.desc}</div>
              </div>
            ))}
          </div>
        </div>
        <BottomBar project={title} name={name} recipient="Recruiter" />
      </Slide>

      {/* ── SLIDE 9: WHY CHOOSE ME? ── */}
      <Slide>
        <TopBar left={company} center="Personal Presentation" right={String(year)} />
        <div style={{ flex: 1, display: 'flex', padding: '40px 48px', gap: 0 }}>
          {/* left: large photo */}
          <div style={{ flex: '0 0 44%' }}>
            <PhotoBox style={{ height: '100%', minHeight: 320 }} />
          </div>
          {/* right: heading + bullets */}
          <div style={{ flex: 1, paddingLeft: 48, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Massive size={64}>Why</Massive>
            <Massive size={64}>Choose</Massive>
            <Massive size={64}>Me?</Massive>
            <p style={{ fontSize: 14, color: GRAY, lineHeight: 1.8, marginTop: 16 }}>
              Bringing a unique blend of creativity and analytics to every project.
            </p>
            {[
              { title: 'Effective', desc: 'Every campaign is built around clear goals and tracked with data to ensure real, measurable outcomes.' },
              { title: 'Affordable', desc: 'High-quality strategy and execution delivered with efficiency — maximising your ROI at every budget level.' },
              { title: 'Professional', desc: 'Consistent, on-brand communication and delivery that reflects your brand\'s voice at every touchpoint.' },
            ].map((pt, i) => (
              <BulletItem key={i} title={pt.title} desc={pt.desc} />
            ))}
          </div>
        </div>
        <BottomBar project={title} name={name} recipient="Recruiter" />
      </Slide>

      {/* ── SLIDE 10: EDUCATION ── */}
      {education.length > 0 && (
        <Slide>
          <TopBar left={company} center="Personal Presentation" right={String(year)} />
          <div style={{ flex: 1, padding: '48px 48px 32px' }}>
            <Massive size={80}>Education</Massive>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginTop: 40 }}>
              {education.map((edu, i) => (
                <div key={i} style={{ borderLeft: `3px solid ${WHITE}`, paddingLeft: 20 }}>
                  <div style={{ fontSize: 18, fontWeight: 900, color: WHITE, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                  </div>
                  <div style={{ fontSize: 14, color: GRAY, fontWeight: 600, marginTop: 4 }}>{edu.institution}</div>
                  <div style={{ fontSize: 12, color: GRAY, marginTop: 4 }}>
                    {edu.from || ''}{edu.to ? ` – ${edu.to}` : ''}{edu.grade ? ` · ${edu.grade}` : ''}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <BottomBar project={title} name={name} recipient="Recruiter" />
        </Slide>
      )}

      {/* ── SLIDE 11: SKILLS ── */}
      {skills.length > 0 && (
        <Slide>
          <TopBar left={company} center="Personal Presentation" right={String(year)} />
          <div style={{ flex: 1, padding: '48px 48px 32px' }}>
            <Massive size={80}>My Skills</Massive>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 40 }}>
              {skills.map((sk, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: 15, fontWeight: 800, color: WHITE, textTransform: 'uppercase', letterSpacing: 0.5, display: 'flex', alignItems: 'center', gap: 8 }}>{sk.image && <img src={sk.image} alt={sk.name} style={{ width:18, height:18, objectFit:'cover', borderRadius:3 }} />}{sk.name}</span>
                    <span style={{ fontSize: 12, color: GRAY }}>{sk.level}</span>
                  </div>
                  <div style={{ height: 3, background: LINE, borderRadius: 2 }}>
                    <div style={{ height: '100%', width: lvl[sk.level] || '60%', background: WHITE, borderRadius: 2 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <BottomBar project={title} name={name} recipient="Recruiter" />
        </Slide>
      )}

      {/* ── CERTIFICATIONS ── */}
      {certifications.length > 0 && (
        <Slide>
          <TopBar left={company} center="Personal Presentation" right={String(year)} />
          <div style={{ flex: 1, padding: '48px 48px 32px' }}>
            <Massive size={80}>Certifications</Massive>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginTop: 40 }}>
              {certifications.map((cert, i) => (
                <div key={i} style={{ borderLeft: `3px solid ${WHITE}`, paddingLeft: 20, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  {cert.image && <img src={cert.image} alt={cert.name} style={{ width:48, height:48, objectFit:'cover', borderRadius:8, flexShrink:0 }} />}
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 900, color: WHITE, textTransform: 'uppercase', letterSpacing: 0.5 }}>{cert.name}</div>
                    {cert.issuer && <div style={{ fontSize: 13, color: GRAY, fontWeight: 600, marginTop: 4 }}>{cert.issuer}</div>}
                    {cert.date && <div style={{ fontSize: 12, color: GRAY, marginTop: 4 }}>{cert.date}</div>}
                    {cert.url && <a href={cert.url} style={{ fontSize: 12, color: WHITE, opacity: 0.7, marginTop: 4, display: 'block' }}>View ↗</a>}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <BottomBar project={title} name={name} recipient="Recruiter" />
        </Slide>
      )}

      {/* ── PUBLICATIONS ── */}
      {publications.length > 0 && (
        <Slide>
          <TopBar left={company} center="Personal Presentation" right={String(year)} />
          <div style={{ flex: 1, padding: '48px 48px 32px' }}>
            <Massive size={80}>Publications</Massive>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginTop: 40 }}>
              {publications.map((pub, i) => (
                <div key={i} style={{ borderLeft: `3px solid ${WHITE}`, paddingLeft: 20, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  {pub.image && <img src={pub.image} alt={pub.title} style={{ width:48, height:48, objectFit:'cover', borderRadius:8, flexShrink:0 }} />}
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 900, color: WHITE, textTransform: 'uppercase', letterSpacing: 0.5 }}>{pub.title}</div>
                    {pub.publisher && <div style={{ fontSize: 13, color: GRAY, fontWeight: 600, marginTop: 4 }}>{pub.publisher}</div>}
                    {pub.date && <div style={{ fontSize: 12, color: GRAY, marginTop: 4 }}>{pub.date}</div>}
                    {pub.url && <a href={pub.url} style={{ fontSize: 12, color: WHITE, opacity: 0.7, marginTop: 4, display: 'block' }}>Read ↗</a>}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <BottomBar project={title} name={name} recipient="Recruiter" />
        </Slide>
      )}

      {/* ── AWARDS ── */}
      {awards.length > 0 && (
        <Slide>
          <TopBar left={company} center="Personal Presentation" right={String(year)} />
          <div style={{ flex: 1, padding: '48px 48px 32px' }}>
            <Massive size={80}>Awards</Massive>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginTop: 40 }}>
              {awards.map((award, i) => (
                <div key={i} style={{ borderLeft: `3px solid ${WHITE}`, paddingLeft: 20, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  {award.image && <img src={award.image} alt={award.title} style={{ width:48, height:48, objectFit:'cover', borderRadius:8, flexShrink:0 }} />}
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 900, color: WHITE, textTransform: 'uppercase', letterSpacing: 0.5 }}>{award.title}</div>
                    {award.organization && <div style={{ fontSize: 13, color: GRAY, fontWeight: 600, marginTop: 4 }}>{award.organization}</div>}
                    {award.date && <div style={{ fontSize: 12, color: GRAY, marginTop: 4 }}>{award.date}</div>}
                    {award.description && <div style={{ fontSize: 13, color: GRAY, lineHeight: 1.7, marginTop: 6 }}>{award.description}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <BottomBar project={title} name={name} recipient="Recruiter" />
        </Slide>
      )}

      {/* ── SLIDE 12: LET'S WORK TOGETHER ── */}
      <Slide style={{ minHeight: 480 }}>
        <TopBar left={company} center="Personal Presentation" right={String(year)} />
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '40px 48px', textAlign: 'center',
        }}>
          {/* massive skewed CTA text */}
          <div style={{
            transform: 'skewY(-4deg)',
            marginBottom: 8,
          }}>
            <Massive size={90} style={{ display: 'block', lineHeight: 0.95 }}>Let's Work</Massive>
            <Massive size={90} style={{ display: 'block', lineHeight: 0.95 }}>Together!</Massive>
          </div>
          {/* contact info */}
          <div style={{ display: 'flex', gap: 40, marginTop: 48, transform: 'none' }}>
            {d.email    && <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: GRAY, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 4 }}>Email</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: WHITE }}>{d.email}</div>
            </div>}
            {d.website  && <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: GRAY, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 4 }}>Website</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: WHITE }}>{d.website}</div>
            </div>}
            {d.linkedin && <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: GRAY, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 4 }}>LinkedIn</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: WHITE }}>{d.linkedin}</div>
            </div>}
            {d.phone    && <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: GRAY, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 4 }}>Phone</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: WHITE }}>{d.phone}</div>
            </div>}
          </div>
        </div>
        <BottomBar project={title} name={name} recipient="Recruiter" />
      </Slide>

    </div>
  )
}
