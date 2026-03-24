import React from 'react'

/* ── Palette ── */
const BG      = '#FAFAF8'
const ORANGE  = '#E85C26'
const SALMON  = '#F5D5C8'
const BLACK   = '#1a1a1a'
const GRAY    = '#6b7280'

/* ── Left Sidebar Navigation ── */
function SideNav({ total = 9, active = 1 }) {
  return (
    <div style={{
      position: 'absolute', left: 0, top: 0, bottom: 0,
      width: 80, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: 12, zIndex: 10,
    }}>
      {/* Curved orange line behind nav */}
      <svg
        style={{ position: 'absolute', left: 0, top: 0, width: 80, height: '100%' }}
        viewBox="0 0 80 600" preserveAspectRatio="none"
      >
        <path
          d="M 55 30 Q 20 150 55 300 Q 85 450 55 570"
          fill="none" stroke={ORANGE} strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      {Array.from({ length: total }, (_, i) => {
        const n = i + 1
        const isActive = n === active
        return (
          <div key={n} style={{
            width: 32, height: 32, borderRadius: '50%',
            background: isActive ? ORANGE : 'transparent',
            border: `1.5px solid ${isActive ? ORANGE : BLACK}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 600,
            color: isActive ? '#fff' : BLACK,
            position: 'relative', zIndex: 2,
            flexShrink: 0,
          }}>
            {n}
          </div>
        )
      })}
    </div>
  )
}

/* ── Three dots decoration ── */
function ThreeDots({ style = {} }) {
  return (
    <div style={{ display: 'flex', gap: 6, ...style }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: 10, height: 10, borderRadius: '50%', background: ORANGE,
        }} />
      ))}
    </div>
  )
}

/* ── Decorative blob circle (filled) ── */
function BlobCircle({ size = 180, color = ORANGE, style = {} }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: color, position: 'absolute', ...style,
    }} />
  )
}

/* ── Orange arc stroke ── */
function ArcCurve({ style = {}, d, width = 300, height = 300, stroke = ORANGE, strokeWidth = 2.5 }) {
  return (
    <svg
      style={{ position: 'absolute', overflow: 'visible', ...style }}
      width={width} height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      <path d={d} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  )
}

/* ── Section wrapper ── */
function Section({ children, minHeight = 480, style = {}, active = 1, total = 9 }) {
  return (
    <div style={{
      position: 'relative',
      background: BG,
      minHeight,
      overflow: 'hidden',
      borderBottom: `1px solid #ebebeb`,
      ...style,
    }}>
      <SideNav total={total} active={active} />
      <div style={{ marginLeft: 88, padding: '44px 48px 44px 12px', height: '100%' }}>
        {children}
      </div>
    </div>
  )
}

/* ── Section heading ── */
function Heading({ children }) {
  return (
    <h2 style={{
      fontSize: 48, fontWeight: 900, color: BLACK,
      margin: '0 0 28px', lineHeight: 1,
      fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
    }}>
      {children}
    </h2>
  )
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════ */
export default function TemplateOrangeWhite({ p = {} }) {
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
  const title = d.title || 'Interior Designer'
  const bio   = d.bio   || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vitae tellus risus. Sed fringilla commodo tellus, rutrum lacinia dui scelerisque in. Vestibulum velit velit, condimentum quis ante pretium, bibendum fermentum neque.'

  const totalSections = 9

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

      {/* ══ 1. COVER ══ */}
      <div style={{
        position: 'relative',
        background: BG,
        minHeight: 520,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: '1px solid #ebebeb',
      }}>
        {/* Top-left salmon half-circle */}
        <BlobCircle size={260} color={SALMON} style={{ top: -120, left: -100, opacity: 0.85 }} />
        {/* Top-center orange arc coming down */}
        <ArcCurve
          d="M 150 -60 Q 180 100 140 260 Q 100 380 140 500"
          width={300} height={520}
          style={{ top: 0, left: '35%' }}
        />
        {/* Bottom-right large orange circle */}
        <BlobCircle size={220} color={ORANGE} style={{ bottom: -80, right: -60 }} />
        {/* Bottom-right white cut-out to make it look like the right arc */}
        <ArcCurve
          d="M 60 0 Q -20 120 60 240"
          width={140} height={260}
          style={{ bottom: 60, right: 80 }}
          stroke="#fff"
          strokeWidth={3}
        />

        {/* Center content */}
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <h1 style={{
            fontSize: 100, fontWeight: 900, color: BLACK,
            letterSpacing: 8, margin: 0, lineHeight: 1,
            fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
          }}>
            PORTFOLIO
          </h1>
          <div style={{
            fontSize: 36, fontWeight: 400, color: BLACK,
            letterSpacing: 4, marginTop: 8,
          }}>
            {name}
          </div>
          <div style={{
            fontSize: 14, letterSpacing: 12, color: BLACK, opacity: 0.6,
            marginTop: 40,
          }}>
            2 0 2 5
          </div>
        </div>

        {/* Three dots bottom-left */}
        <ThreeDots style={{ position: 'absolute', bottom: 28, left: 28 }} />
      </div>

      {/* ══ 2. HELLO / ABOUT ══ */}
      <Section active={1} total={totalSections}>
        {/* Decorative arc top-right */}
        <ArcCurve
          d="M 0 30 Q 80 -30 160 30"
          width={180} height={80}
          style={{ top: 0, right: 60, zIndex: 1 }}
          stroke={SALMON}
          strokeWidth={40}
        />
        {/* Orange arc bottom-left area */}
        <ArcCurve
          d="M 80 0 Q -40 160 80 320"
          width={160} height={340}
          style={{ bottom: -60, left: 88 }}
        />
        {/* Orange blob bottom-right */}
        <BlobCircle size={200} color={ORANGE} style={{ bottom: -70, right: -50 }} />

        <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start', position: 'relative', zIndex: 2 }}>
          {/* Left: text */}
          <div style={{ flex: 1, maxWidth: 520 }}>
            <h1 style={{
              fontSize: 88, fontWeight: 900, color: BLACK,
              margin: '0 0 8px', lineHeight: 1,
              fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
            }}>
              Hello,
            </h1>
            <div style={{ fontSize: 28, fontWeight: 800, color: BLACK, marginBottom: 4 }}>
              I'm {name}
            </div>
            <div style={{ fontSize: 16, fontStyle: 'italic', color: GRAY, marginBottom: 24 }}>
              {title}
            </div>
            <p style={{ fontSize: 15, color: BLACK, opacity: 0.75, lineHeight: 1.8, maxWidth: 460 }}>
              {bio}
            </p>
            {(d.email || d.phone || d.location) && (
              <div style={{ display: 'flex', gap: 20, marginTop: 20, flexWrap: 'wrap' }}>
                {d.email    && <span style={{ fontSize: 13, color: GRAY }}>✉ {d.email}</span>}
                {d.phone    && <span style={{ fontSize: 13, color: GRAY }}>📞 {d.phone}</span>}
                {d.location && <span style={{ fontSize: 13, color: GRAY }}>📍 {d.location}</span>}
              </div>
            )}
          </div>

          {/* Right: photo placeholder */}
          <div style={{
            width: 220, height: 260, borderRadius: '50%',
            background: `linear-gradient(135deg, ${SALMON}, ${ORANGE}55)`,
            flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 72, fontWeight: 900, color: ORANGE, userSelect: 'none',
            fontFamily: 'Georgia, serif',
            overflow: 'hidden',
          }}>
            {d.profileImage ? <img src={d.profileImage} alt={name} style={{ width:'100%', height:'100%', objectFit:'cover' }} /> : name[0]}
          </div>
        </div>
      </Section>

      {/* ══ 3. EDUCATION ══ */}
      <Section active={2} total={totalSections}>
        {/* Three dots top-right */}
        <ThreeDots style={{ position: 'absolute', top: 28, right: 36, zIndex: 2 }} />
        {/* Salmon arc top-right */}
        <ArcCurve
          d="M 0 80 Q 100 -20 200 80"
          width={220} height={110}
          style={{ top: -10, right: 140, zIndex: 1 }}
          stroke={SALMON}
          strokeWidth={50}
        />
        {/* Pink arc bottom-right */}
        <ArcCurve
          d="M 0 0 Q 140 80 0 180"
          width={160} height={200}
          style={{ bottom: 20, right: 0, zIndex: 1 }}
          stroke={SALMON}
          strokeWidth={50}
        />

        <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start', position: 'relative', zIndex: 2 }}>
          {/* Left: Education entries */}
          <div style={{ flex: 1, maxWidth: 480 }}>
            <Heading>Education</Heading>
            {education.length > 0 ? education.map((edu, i) => (
              <div key={i} style={{ marginBottom: 32 }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: BLACK, marginBottom: 2 }}>
                  {edu.from && edu.to ? `${edu.from}–${edu.to}` : ''}
                </div>
                <div style={{ fontSize: 18, fontWeight: 700, color: BLACK, marginBottom: 6 }}>
                  {edu.institution}
                </div>
                <p style={{ fontSize: 14, color: GRAY, lineHeight: 1.7 }}>
                  {edu.degree}{edu.field ? ` in ${edu.field}` : ''}{edu.grade ? ` — ${edu.grade}` : ''}
                </p>
              </div>
            )) : (
              <>
                <div style={{ marginBottom: 32 }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: BLACK, marginBottom: 2 }}>2010–2014</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: BLACK, marginBottom: 6 }}>Rimberio University</div>
                  <p style={{ fontSize: 14, color: GRAY, lineHeight: 1.7 }}>Bachelor of Arts in Interior Design. Graduated with distinction.</p>
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: BLACK, marginBottom: 2 }}>2014–2018</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: BLACK, marginBottom: 6 }}>Borcelle University</div>
                  <p style={{ fontSize: 14, color: GRAY, lineHeight: 1.7 }}>Master's in Space & Interior Architecture. Thesis on biophilic design principles.</p>
                </div>
              </>
            )}
          </div>

          {/* Right: decorative image boxes */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{
              width: '100%', height: 160,
              background: `linear-gradient(135deg, ${SALMON}, #e8c4b2)`,
              borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, color: GRAY, fontStyle: 'italic',
            }}>
              Education Image
            </div>
            <div style={{
              width: '100%', height: 200,
              background: `linear-gradient(135deg, #e0d4c8, ${SALMON})`,
              borderRadius: 8, transform: 'rotate(-2deg)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, color: GRAY, fontStyle: 'italic',
            }}>
              University Photo
            </div>
          </div>
        </div>
      </Section>

      {/* ══ 4. EXPERIENCE ══ */}
      <Section active={3} total={totalSections}>
        <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start', position: 'relative', zIndex: 2 }}>
          {/* Left: Experience */}
          <div style={{ flex: 1, maxWidth: 480 }}>
            <Heading>Experience</Heading>
            {experience.length > 0 ? experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: 32 }}>
                <div style={{ fontSize: 20, fontWeight: 600, color: BLACK, marginBottom: 4 }}>
                  {exp.company}
                </div>
                <p style={{ fontSize: 14, color: GRAY, lineHeight: 1.8, fontStyle: 'italic' }}>
                  {exp.description}
                </p>
              </div>
            )) : (
              <>
                <div style={{ marginBottom: 32 }}>
                  <div style={{ fontSize: 20, fontWeight: 600, color: BLACK, marginBottom: 4 }}>Ginyard International Co.</div>
                  <p style={{ fontSize: 14, color: GRAY, lineHeight: 1.8, fontStyle: 'italic' }}>
                    Led end-to-end interior design projects for commercial and residential clients. Managed teams and ensured design quality from concept to completion.
                  </p>
                </div>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 600, color: BLACK, marginBottom: 4 }}>Giggling Platypus Co.</div>
                  <p style={{ fontSize: 14, color: GRAY, lineHeight: 1.8, fontStyle: 'italic' }}>
                    Developed and presented interior design proposals, coordinated with contractors, and ensured brand alignment across all spaces.
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Right: photo grid */}
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <div style={{
              gridColumn: '1 / -1', height: 160,
              background: `linear-gradient(135deg, #d4c5b8, ${SALMON})`,
              borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, color: GRAY, fontStyle: 'italic',
            }}>Work Photo 1</div>
            <div style={{
              height: 120, background: `linear-gradient(135deg, ${SALMON}, #c8b5a5)`,
              borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, color: GRAY, fontStyle: 'italic',
            }}>Photo 2</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{
                flex: 1, minHeight: 55, background: `linear-gradient(135deg, #e8d5c8, ${ORANGE}30)`,
                borderRadius: 8,
              }} />
              <div style={{
                flex: 1, minHeight: 55, background: `linear-gradient(135deg, ${ORANGE}20, ${SALMON})`,
                borderRadius: 8,
              }} />
            </div>
          </div>
        </div>

        {/* Orange arc bottom-right */}
        <ArcCurve
          d="M 0 80 Q 120 0 180 80"
          width={200} height={100}
          style={{ bottom: 0, right: 0 }}
        />
      </Section>

      {/* ══ 5. PROJECT 1 ══ */}
      <Section active={4} total={totalSections}>
        {/* Salmon arc top-right */}
        <ArcCurve
          d="M 0 60 Q 100 -20 200 60"
          width={220} height={100}
          style={{ top: -10, right: 40 }}
          stroke={SALMON} strokeWidth={50}
        />

        <div style={{ position: 'relative', zIndex: 2 }}>
          <h2 style={{
            fontSize: 56, fontWeight: 900, color: BLACK,
            margin: '0 0 28px', lineHeight: 1,
          }}>
            {projects[0]?.name || 'Project 1'}
          </h2>
          <div style={{ display: 'flex', gap: 16 }}>
            {/* Two tall image boxes */}
            <div style={{
              flex: 1.2, height: 280,
              background: `linear-gradient(160deg, #d4c5b8, ${SALMON})`,
              borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, color: GRAY, fontStyle: 'italic', overflow: 'hidden',
            }}>
              {projects[0]?.image ? <img src={projects[0].image} alt={projects[0]?.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} /> : 'Project Image 1'}
            </div>
            <div style={{
              flex: 1, height: 280,
              background: `linear-gradient(160deg, ${SALMON}, #c4b5a8)`,
              borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, color: GRAY, fontStyle: 'italic',
            }}>
              Project Image 2
            </div>
            {/* Right: one image + description */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{
                flex: 1, background: `linear-gradient(160deg, #e0d0c4, ${SALMON}80)`,
                borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, color: GRAY, fontStyle: 'italic',
              }}>
                Project Image 3
              </div>
              <p style={{ fontSize: 13, color: GRAY, lineHeight: 1.7 }}>
                {projects[0]?.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eleifend tellus et iaculis iaculis.'}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ══ 6. PROJECT 2 ══ */}
      <Section active={5} total={totalSections}>
        {/* Salmon blob top-right */}
        <ArcCurve
          d="M 0 50 Q 100 -10 200 50"
          width={220} height={90}
          style={{ top: -10, right: 60 }}
          stroke={SALMON} strokeWidth={50}
        />

        <div style={{ display: 'flex', gap: 32, alignItems: 'center', position: 'relative', zIndex: 2 }}>
          <div style={{ flex: 0.8 }}>
            <h2 style={{
              fontSize: 56, fontWeight: 900, color: BLACK,
              margin: '0 0 20px', lineHeight: 1,
            }}>
              {projects[1]?.name || 'Project 2'}
            </h2>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{
              height: 180,
              background: `linear-gradient(135deg, #f0e8e0, ${SALMON})`,
              borderRadius: 24, marginBottom: 16,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, color: GRAY, fontStyle: 'italic',
            }}>
              Project Image 1 (rounded)
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', position: 'relative', zIndex: 2, marginTop: 8 }}>
          <div style={{ flex: 1 }}>
            <div style={{
              height: 180,
              background: `linear-gradient(135deg, ${SALMON}, #d8c8bc)`,
              borderRadius: 24,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, color: GRAY, fontStyle: 'italic',
            }}>
              Project Image 2 (rounded)
            </div>
          </div>
          <div style={{ flex: 0.8, display: 'flex', alignItems: 'center' }}>
            <p style={{ fontSize: 14, color: GRAY, lineHeight: 1.8, textAlign: 'right' }}>
              {projects[1]?.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eleifend tellus et iaculis iaculis. Cras ac nisl id est scelerisque pretium vel et dui.'}
            </p>
          </div>
        </div>
      </Section>

      {/* ══ 7. PROJECT 3 ══ */}
      <Section active={6} total={totalSections}>
        {/* Salmon arc top-right */}
        <ArcCurve
          d="M 0 50 Q 100 -10 200 50"
          width={220} height={90}
          style={{ top: -10, right: 60 }}
          stroke={SALMON} strokeWidth={50}
        />

        <div style={{ position: 'relative', zIndex: 2 }}>
          <h2 style={{
            fontSize: 56, fontWeight: 900, color: BLACK,
            margin: '0 0 16px', lineHeight: 1,
          }}>
            {projects[2]?.name || 'Project 3'}
          </h2>
          <p style={{ fontSize: 15, color: GRAY, lineHeight: 1.8, maxWidth: 700, marginBottom: 24 }}>
            {projects[2]?.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eleifend tellus et iaculis iaculis. Cras ac nisl id est scelerisque pretium vel et dui.'}
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            {[1, 2, 3].map(n => (
              <div key={n} style={{
                flex: 1, height: 220,
                background: `linear-gradient(160deg, ${n % 2 === 0 ? SALMON : '#d4c0b0'}, #c8b4a4)`,
                borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, color: GRAY, fontStyle: 'italic',
              }}>
                Image {n}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ══ 8. PROJECT GALLERY ══ */}
      <Section active={7} total={totalSections} minHeight={520}>
        <div style={{ display: 'flex', gap: 12, height: 440, position: 'relative', zIndex: 2 }}>
          {/* Left 2x2 grid */}
          <div style={{ flex: 1.3, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 12 }}>
            {['#d8c8b8', '#e0d0c0', SALMON, '#ccc0b0'].map((c, i) => (
              <div key={i} style={{
                background: `linear-gradient(135deg, ${c}, ${SALMON}80)`,
                borderRadius: 16,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, color: GRAY, fontStyle: 'italic', border: `2px solid ${ORANGE}30`,
              }}>
                Gallery {i + 1}
              </div>
            ))}
          </div>
          {/* Right tall image */}
          <div style={{
            flex: 0.6,
            background: `linear-gradient(160deg, ${SALMON}, #b8a898)`,
            borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, color: GRAY, fontStyle: 'italic',
          }}>
            Featured Gallery Image
          </div>
        </div>
      </Section>

      {/* ══ 9. PROJECT 4 ══ */}
      <Section active={8} total={totalSections}>
        {/* Three dots top-right */}
        <ThreeDots style={{ position: 'absolute', top: 28, right: 36, zIndex: 2 }} />
        {/* Salmon arc top-right */}
        <ArcCurve
          d="M 0 50 Q 90 -5 180 50"
          width={200} height={90}
          style={{ top: 40, right: 140 }}
          stroke={SALMON} strokeWidth={40}
        />
        {/* Salmon arc bottom-right */}
        <ArcCurve
          d="M 0 0 Q 120 80 0 180"
          width={140} height={200}
          style={{ bottom: 30, right: 0 }}
          stroke={SALMON} strokeWidth={40}
        />

        <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', position: 'relative', zIndex: 2 }}>
          {/* Left: large project image */}
          <div style={{ flex: 1 }}>
            <h2 style={{
              fontSize: 56, fontWeight: 900, color: BLACK,
              margin: '0 0 20px', lineHeight: 1,
            }}>
              {projects[3]?.name || 'Project 4'}
            </h2>
            <div style={{
              height: 320,
              background: `linear-gradient(160deg, #d4c0b0, ${SALMON})`,
              borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, color: GRAY, fontStyle: 'italic',
            }}>
              Project 4 Image
            </div>
          </div>
          {/* Right: description blocks */}
          <div style={{ flex: 0.7, paddingTop: 72 }}>
            <p style={{ fontSize: 14, color: GRAY, lineHeight: 1.8, marginBottom: 24 }}>
              {projects[3]?.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eleifend tellus et iaculis iaculis. Cras ac nisl id est scelerisque pretium vel et dui.'}
            </p>
            {projects[3]?.tech && (
              <p style={{ fontSize: 14, color: GRAY, lineHeight: 1.8 }}>
                Tech: {projects[3].tech}
              </p>
            )}
          </div>
        </div>
      </Section>

      {/* ══ 10. SKILLS (if any) ══ */}
      {skills.length > 0 && (
        <Section active={9} total={totalSections}>
          <Heading>Skills</Heading>
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.min(skills.length, 4)}, 1fr)`,
            gap: 24, marginTop: 8,
          }}>
            {skills.map((sk, i) => (
              <div key={i}>
                <div style={{ fontSize: 15, fontWeight: 700, color: BLACK, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>{sk.image && <img src={sk.image} alt={sk.name} style={{ width:18, height:18, objectFit:'cover', borderRadius:3 }} />}{sk.name}</div>
                <div style={{ fontSize: 12, color: GRAY, marginBottom: 8 }}>{sk.level}</div>
                <div style={{ height: 4, background: '#e5e5e5', borderRadius: 2 }}>
                  <div style={{
                    height: '100%',
                    width: { Beginner: '35%', Intermediate: '65%', Expert: '92%' }[sk.level] || '60%',
                    background: ORANGE, borderRadius: 2,
                  }} />
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ══ CERTIFICATIONS ══ */}
      {certifications.length > 0 && (
        <Section active={9} total={totalSections}>
          <Heading>Certifications</Heading>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 20 }}>
            {certifications.map((cert, i) => (
              <div key={i} style={{ padding: '16px 18px', border: `1.5px solid #ebebeb`, borderRadius: 8, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                {cert.image && <img src={cert.image} alt={cert.name} style={{ width:48, height:48, objectFit:'cover', borderRadius:8, flexShrink:0 }} />}
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: BLACK }}>{cert.name}</div>
                  {cert.issuer && <div style={{ fontSize: 13, color: ORANGE, fontWeight: 600, marginTop: 3 }}>{cert.issuer}</div>}
                  {cert.date && <div style={{ fontSize: 12, color: GRAY, marginTop: 2 }}>{cert.date}</div>}
                  {cert.url && <a href={cert.url} style={{ fontSize: 12, color: ORANGE, marginTop: 4, display: 'block' }}>View ↗</a>}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ══ PUBLICATIONS ══ */}
      {publications.length > 0 && (
        <Section active={9} total={totalSections}>
          <Heading>Publications</Heading>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 20 }}>
            {publications.map((pub, i) => (
              <div key={i} style={{ padding: '16px 18px', border: `1.5px solid #ebebeb`, borderRadius: 8, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                {pub.image && <img src={pub.image} alt={pub.title} style={{ width:48, height:48, objectFit:'cover', borderRadius:8, flexShrink:0 }} />}
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: BLACK }}>{pub.title}</div>
                  {pub.publisher && <div style={{ fontSize: 13, color: ORANGE, fontWeight: 600, marginTop: 3 }}>{pub.publisher}</div>}
                  {pub.date && <div style={{ fontSize: 12, color: GRAY, marginTop: 2 }}>{pub.date}</div>}
                  {pub.url && <a href={pub.url} style={{ fontSize: 12, color: ORANGE, marginTop: 4, display: 'block' }}>Read ↗</a>}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ══ AWARDS ══ */}
      {awards.length > 0 && (
        <Section active={9} total={totalSections}>
          <Heading>Awards</Heading>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 20 }}>
            {awards.map((award, i) => (
              <div key={i} style={{ padding: '16px 18px', border: `1.5px solid #ebebeb`, borderRadius: 8, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                {award.image && <img src={award.image} alt={award.title} style={{ width:48, height:48, objectFit:'cover', borderRadius:8, flexShrink:0 }} />}
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: BLACK }}>{award.title}</div>
                  {award.organization && <div style={{ fontSize: 13, color: ORANGE, fontWeight: 600, marginTop: 3 }}>{award.organization}</div>}
                  {award.date && <div style={{ fontSize: 12, color: GRAY, marginTop: 2 }}>{award.date}</div>}
                  {award.description && <p style={{ fontSize: 14, color: GRAY, lineHeight: 1.8, marginTop: 6 }}>{award.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ══ CONTACT / THANK YOU ══ */}
      <div style={{
        position: 'relative',
        background: BG,
        minHeight: 480,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* Three dots top-right */}
        <ThreeDots style={{ position: 'absolute', top: 28, right: 36 }} />
        {/* Salmon arc bottom-right */}
        <ArcCurve
          d="M 0 0 Q 160 100 0 220"
          width={180} height={240}
          style={{ bottom: 20, right: 0 }}
          stroke={SALMON} strokeWidth={60}
        />

        {/* Oval image frame (left) */}
        <div style={{
          width: 240, height: 320, borderRadius: '50%',
          border: `3px solid ${ORANGE}`,
          background: `linear-gradient(135deg, ${SALMON}, #d4b8a8)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 64, fontWeight: 900, color: ORANGE,
          fontFamily: 'Georgia, serif', userSelect: 'none',
          flexShrink: 0, marginRight: 80,
          position: 'relative', zIndex: 2,
        }}>
          {name[0]}
        </div>

        {/* Right: Thank you + Contact */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{
            fontSize: 80, fontWeight: 900, fontStyle: 'italic',
            color: BLACK, margin: '0 0 16px', lineHeight: 1.1,
            fontFamily: 'Georgia, "Times New Roman", serif',
          }}>
            Thank<br />you
          </h1>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: BLACK, marginBottom: 20 }}>
            Contact Details
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {d.phone && (
              <div style={{ display: 'flex', gap: 16 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: BLACK, minWidth: 90 }}>Phone :</span>
                <span style={{ fontSize: 15, fontStyle: 'italic', color: GRAY }}>{d.phone}</span>
              </div>
            )}
            {d.location && (
              <div style={{ display: 'flex', gap: 16 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: BLACK, minWidth: 90 }}>Address :</span>
                <span style={{ fontSize: 15, fontStyle: 'italic', color: GRAY }}>{d.location}</span>
              </div>
            )}
            {(d.email || d.website) && (
              <div style={{ display: 'flex', gap: 16 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: BLACK, minWidth: 90 }}>Email :</span>
                <span style={{ fontSize: 15, fontStyle: 'italic', color: GRAY }}>{d.email || d.website}</span>
              </div>
            )}
            {d.linkedin && (
              <div style={{ display: 'flex', gap: 16 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: BLACK, minWidth: 90 }}>LinkedIn :</span>
                <span style={{ fontSize: 15, fontStyle: 'italic', color: GRAY }}>{d.linkedin}</span>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}
