import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import ParticleBackground from '../components/ParticleBackground'
import { LayoutTemplate, Eye, Wand2, Check, Sparkles, X, Loader2, User, Briefcase, Code2, Clock } from 'lucide-react'

const templates = [
  {
    id: 'darkblue',
    name: 'Dark Blue Creative',
    description: 'Dark navy & black gradient with bold blue-purple accents. Massive typography, pill badges, and a slide-style layout — perfect for graphic designers and creative professionals.',
    accent: '#5b4ff5',
    accentRgb: '91,79,245',
    bg: 'linear-gradient(135deg,#080c1a 0%,#0d1127 100%)',
    tag: 'New',
    tagColor: '#5b4ff5',
    preview: [
      { type: 'header', color: '#5b4ff5' },
      { type: 'skills' },
      { type: 'experience' },
    ],
  },
  {
    id: 'browncream',
    name: 'Brown & Cream',
    description: 'Warm cream background with rich brown accents, circular image frames, and elegant typography. A timeless, professional aesthetic perfect for creatives.',
    accent: '#7B5B3A',
    accentRgb: '123,91,58',
    bg: 'linear-gradient(135deg,#FAF7F2 0%,#E8D5C0 100%)',
    tag: 'New',
    tagColor: '#7B5B3A',
    preview: [
      { type: 'header', color: '#7B5B3A' },
      { type: 'skills' },
      { type: 'experience' },
    ],
  },
  {
    id: 'grayscale',
    name: 'B&W Photography',
    description: 'Dark charcoal multi-section layout inspired by professional photography portfolios. Bold typography, full-screen sections, and a timeless black & white aesthetic.',
    accent: '#ffffff',
    accentRgb: '255,255,255',
    bg: 'linear-gradient(135deg,#2d2d2d 0%,#1e1e1e 100%)',
    tag: 'New',
    tagColor: '#ffffff',
    preview: [
      { type: 'header', color: '#ffffff' },
      { type: 'skills' },
      { type: 'experience' },
    ],
  },
  {
    id: 'purple',
    name: 'Purple Beige',
    description: 'Soft beige background with purple organic blob shapes. Playful yet professional — perfect for creatives.',
    accent: '#c4a0d0',
    accentRgb: '196,160,208',
    bg: 'linear-gradient(135deg,#f4ece8 0%,#ede0f0 100%)',
    tag: 'New',
    tagColor: '#c4a0d0',
    preview: [
      { type: 'header', color: '#c4a0d0' },
      { type: 'skills' },
      { type: 'experience' },
    ],
  },
  {
    id: 'futuristic',
    name: 'Neural Circuit',
    description: 'Dark cyberpunk theme with neon blue-purple circuits, holographic robot accent, and sci-fi grid. Built for tech visionaries.',
    accent: '#00d4ff',
    accentRgb: '0,212,255',
    bg: 'linear-gradient(135deg,#03040d 0%,#07021a 100%)',
    tag: 'Exclusive',
    tagColor: '#00d4ff',
    preview: [
      { type: 'header', color: '#00d4ff' },
      { type: 'skills' },
      { type: 'experience' },
    ],
  },
  {
    id: 'minimalist',
    name: 'B&W Minimalist',
    description: 'Dark charcoal background with off-white cream text. Bold slide-style typography inspired by a professional digital marketing portfolio.',
    accent: '#e8e3d5',
    accentRgb: '232,227,213',
    bg: 'linear-gradient(135deg,#252525 0%,#1a1a1a 100%)',
    tag: 'Premium',
    tagColor: '#e8e3d5',
    preview: [
      { type: 'header', color: '#e8e3d5' },
      { type: 'skills' },
      { type: 'experience' },
    ],
  },
  {
    id: 'presentationstyle',
    name: 'Presentation Style',
    description: 'Light warm gray background with golden amber accents. Slide-style layout with italic serif display fonts, golden service cards, and a clean section-by-section flow — inspired by professional PDF portfolios.',
    accent: '#C8860A',
    accentRgb: '200,134,10',
    bg: 'linear-gradient(135deg,#E8E6E0 0%,#d4d2cc 100%)',
    tag: 'New',
    tagColor: '#C8860A',
    preview: [
      { type: 'header', color: '#C8860A' },
      { type: 'skills' },
      { type: 'experience' },
    ],
  },
  {
    id: 'orangewhite',
    name: 'Orange & White',
    description: 'Clean white background with vibrant orange accents, decorative curved arcs, and a numbered left sidebar navigation. A modern presentation-style portfolio inspired by professional creative portfolios — ideal for designers and creatives.',
    accent: '#E85C26',
    accentRgb: '232,92,38',
    bg: 'linear-gradient(135deg,#FAFAF8 0%,#F5EDE8 100%)',
    tag: 'New',
    tagColor: '#E85C26',
    preview: [
      { type: 'header', color: '#E85C26' },
      { type: 'skills' },
      { type: 'experience' },
    ],
  },
  {
    id: 'boldblack',
    name: 'Bold Black',
    description: 'Pure black background with massive ultra-bold white typography. Slide-by-slide layout with top & bottom info bars — a striking, high-impact presentation style inspired by professional digital marketing portfolios.',
    accent: '#F0EEE8',
    accentRgb: '240,238,232',
    bg: 'linear-gradient(135deg,#0a0a0a 0%,#1a1a1a 100%)',
    tag: 'New',
    tagColor: '#F0EEE8',
    preview: [
      { type: 'header', color: '#F0EEE8' },
      { type: 'skills' },
      { type: 'experience' },
    ],
  },
  {
    id: 'bluegradientaesthetic',
    name: 'Blue Gradient Aesthetic',
    description: 'Deep dark navy background with glowing blue-purple bokeh orbs, decorative Cinzel display font, and oval badge accents. A stunning slide-style presentation portfolio inspired by a high-end aesthetic creative template — perfect for designers, models, and visual artists.',
    accent: '#4a90e8',
    accentRgb: '74,144,232',
    bg: 'linear-gradient(135deg,#070b20 0%,#0d1235 100%)',
    tag: 'New',
    tagColor: '#4a90e8',
    preview: [
      { type: 'header', color: '#4a90e8' },
      { type: 'skills' },
      { type: 'experience' },
    ],
  },
]

export default function Templates() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)
  const [hovering, setHovering] = useState(null)

  // Modal state
  const [modal, setModal] = useState(null) // null | { id, accent, accentRgb, name }
  const [form, setForm] = useState({ name: '', role: '', skills: '', experience: '' })
  const [generating, setGenerating] = useState(false)
  const [genError, setGenError] = useState(null)
  const [genStep, setGenStep] = useState('')

  function useTemplate(id) {
    const t = templates.find(x => x.id === id)
    setModal(t)
    setForm({ name: '', role: '', skills: '', experience: '' })
    setGenError(null)
    setGenStep('')
  }

  async function generatePortfolio(id) {
    if (!form.name.trim() || !form.role.trim()) {
      setGenError('Name and Role are required.')
      return
    }
    setGenerating(true)
    setGenError(null)

    try {
      setGenStep('Thinking about your career…')
      const prompt = `You are a professional resume writer. Generate a realistic, detailed portfolio JSON for a person with these details:
- Name: ${form.name}
- Job Title / Role: ${form.role}
- Skills: ${form.skills || 'not specified, infer from role'}
- Years of Experience: ${form.experience || 'not specified, infer from role'}

Return ONLY valid JSON (no markdown, no explanation) with this exact structure:
{
  "details": {
    "name": "${form.name}",
    "title": "<job title>",
    "bio": "<2-3 sentence professional bio, first person>",
    "email": "<realistic professional email>",
    "phone": "<phone placeholder>",
    "location": "<city, country>",
    "website": "",
    "linkedin": ""
  },
  "skills": [
    { "name": "<skill>", "level": "Beginner" | "Intermediate" | "Expert" }
  ],
  "education": [
    { "degree": "<degree>", "field": "<field>", "institution": "<university>", "from": "<year>", "to": "<year>", "grade": "<GPA or grade>" }
  ],
  "experience": [
    { "role": "<role>", "company": "<company>", "location": "<city>", "from": "<year>", "to": "<year or Present>", "current": true|false, "description": "<2 sentence description of responsibilities and achievements>" }
  ],
  "projects": [
    { "name": "<project>", "description": "<1-2 sentences>", "tech": "<comma separated tech stack>", "link": "", "github": "" }
  ]
}

Include 4-6 skills, 1-2 education entries, 2-3 experience entries, 2-3 projects. Make everything realistic and relevant to the role.`

      const res = await fetch('http://localhost:5000/api/ai/generate-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'AI generation failed')

      setGenStep('Parsing your portfolio…')

      // Strip possible markdown code fences
      const raw = data.text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      const portfolio = JSON.parse(raw)

      // Save to localStorage with template id
      sessionStorage.setItem('craft_portfolio', JSON.stringify({ ...portfolio, template: id }))

      setGenStep('Done!')
      setTimeout(() => navigate('/craft/preview'), 400)
    } catch (err) {
      setGenError(err.message.includes('JSON') ? 'AI returned unexpected format. Please try again.' : err.message)
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="flex h-screen bg-[#060d1a] overflow-hidden">
      <Sidebar />
      <ParticleBackground />

      <div className="flex-1 flex flex-col ml-64 relative" style={{ zIndex: 1 }}>
        <Header />
        <main className="flex-1 overflow-y-auto px-8 py-10">

          {/* Page header */}
          <div className="mb-10">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
              style={{ background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.2)' }}
            >
              <LayoutTemplate size={14} className="text-cyan-400" />
              <span className="text-cyan-400 text-sm font-medium">Template Gallery</span>
            </div>
            <h1 className="text-4xl font-extrabold text-white mb-2">
              Choose Your <span style={{ background: 'linear-gradient(135deg,#22d3ee,#6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Template</span>
            </h1>
            <p className="text-gray-400 text-base">
              Pick a design that matches your personal brand. All templates are fully customizable.
            </p>
          </div>

          {/* Template grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 max-w-5xl">
            {templates.map((t) => (
              <div
                key={t.id}
                onMouseEnter={() => setHovering(t.id)}
                onMouseLeave={() => setHovering(null)}
                onClick={() => setSelected(selected === t.id ? null : t.id)}
                className="cursor-pointer rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  border: selected === t.id
                    ? `2px solid ${t.accent}`
                    : hovering === t.id
                    ? `1px solid rgba(${t.accentRgb},0.4)`
                    : '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(13,21,38,0.7)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: selected === t.id ? `0 0 30px rgba(${t.accentRgb},0.25)` : hovering === t.id ? `0 0 20px rgba(${t.accentRgb},0.1)` : 'none',
                  transform: hovering === t.id ? 'translateY(-3px)' : 'none',
                }}
              >
                {/* Mini preview */}
                <div
                  className="relative h-44 overflow-hidden"
                  style={{ background: t.bg }}
                >
                  {/* Brown & Cream template: circular avatar + warm layout */}
                  {t.id === 'browncream' && (
                    <div style={{ position: 'absolute', inset: 0, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {/* hero row */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 38, height: 38, borderRadius: '50%', border: '3px solid #7B5B3A', background: '#E8D5C0', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 900, color: '#3D2B1F' }}>N</div>
                        <div>
                          <div style={{ height: 8, width: 80, background: '#3D2B1F', borderRadius: 3, marginBottom: 4 }} />
                          <div style={{ display: 'inline-block', background: '#7B5B3A', borderRadius: 20, height: 6, width: 50 }} />
                        </div>
                        {/* deco circle top-right */}
                        <div style={{ marginLeft: 'auto', width: 18, height: 18, borderRadius: '50%', background: '#E8D5C0' }} />
                      </div>
                      {/* skill bars */}
                      {[75, 55, 88].map((w, i) => (
                        <div key={i} style={{ height: 5, background: '#E8D5C0', borderRadius: 3 }}>
                          <div style={{ height: '100%', width: `${w}%`, background: 'linear-gradient(90deg,#7B5B3A,#A67C52)', borderRadius: 3 }} />
                        </div>
                      ))}
                      {/* deco circle bottom-right */}
                      <div style={{ position: 'absolute', bottom: -14, right: -14, width: 44, height: 44, borderRadius: '50%', background: '#7B5B3A', opacity: 0.3 }} />
                    </div>
                  )}

                  {/* Grayscale template: split photo + big text */}
                  {t.id === 'grayscale' && (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex' }}>
                      <div style={{ flex: '0 0 42%', background: 'linear-gradient(135deg,#1a1a1a,#444)' }} />
                      <div style={{ flex: 1, background: '#1e1e1e', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '12px 14px' }}>
                        <div style={{ height: 1, background: 'rgba(255,255,255,0.3)', marginBottom: 8, width: '60%' }} />
                        <div style={{ fontSize: 20, fontWeight: 900, color: 'white', lineHeight: 1.1 }}>My<br/>Portfolio</div>
                        <div style={{ height: 4, background: 'rgba(255,255,255,0.15)', borderRadius: 2, marginTop: 8, width: '80%' }} />
                        <div style={{ height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, marginTop: 4, width: '60%' }} />
                      </div>
                    </div>
                  )}

                  {/* Minimalist template: big bold title + card rows */}
                  {t.id === 'minimalist' && (
                    <div style={{ position: 'absolute', top: 14, left: 16, right: 16 }}>
                      <div style={{ fontSize: 22, fontWeight: 900, color: '#e8e3d5', lineHeight: 1, marginBottom: 10, letterSpacing: -0.5 }}>Portfolio.</div>
                      <div style={{ height: 22, background: '#d4cfbf', borderRadius: 5, marginBottom: 6, width: '100%' }} />
                      <div style={{ height: 22, background: 'transparent', border: '1.5px solid rgba(232,227,213,0.35)', borderRadius: 5, marginBottom: 6 }} />
                      <div style={{ height: 22, background: '#d4cfbf', borderRadius: 5, width: '80%' }} />
                    </div>
                  )}

                  {/* Bold Black template: massive B&W typography preview */}
                  {t.id === 'boldblack' && (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' }}>
                      {/* top bar */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 12px', borderBottom: '1px solid #222' }}>
                        <div style={{ width: 50, height: 5, background: '#F0EEE8', borderRadius: 2 }} />
                        <div style={{ width: 40, height: 5, background: '#555', borderRadius: 2 }} />
                        <div style={{ width: 20, height: 5, background: '#555', borderRadius: 2 }} />
                      </div>
                      {/* massive title */}
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                        <div style={{ fontSize: 22, fontWeight: 900, color: '#F0EEE8', letterSpacing: -1, textTransform: 'uppercase', lineHeight: 1 }}>DIGITAL</div>
                        <div style={{ fontSize: 22, fontWeight: 900, color: '#F0EEE8', letterSpacing: -1, textTransform: 'uppercase', lineHeight: 1 }}>MARKETING</div>
                        <div style={{ fontSize: 22, fontWeight: 900, color: '#F0EEE8', letterSpacing: -1, textTransform: 'uppercase', lineHeight: 1 }}>PORTFOLIO</div>
                      </div>
                      {/* bottom bar */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, padding: '7px 12px', borderTop: '1px solid #222' }}>
                        {[60, 50, 55].map((w, i) => (
                          <div key={i} style={{ textAlign: i === 1 ? 'center' : i === 2 ? 'right' : 'left' }}>
                            <div style={{ height: 3, background: '#333', borderRadius: 1, marginBottom: 3, width: '70%', display: 'inline-block' }} />
                            <div style={{ height: 5, background: '#F0EEE8', borderRadius: 1, width: `${w}%`, display: 'block' }} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Simulated header bar — for non-minimalist, non-presentation templates */}
                  {t.id !== 'minimalist' && t.id !== 'presentationstyle' && t.id !== 'boldblack' && (
                  <div className="absolute top-5 left-5 right-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: t.accent, opacity: 0.9 }} />
                      <div>
                        <div style={{ height: 8, width: 100, borderRadius: 4, background: t.id === 'purple' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.85)', marginBottom: 4 }} />
                        <div style={{ height: 5, width: 70, borderRadius: 4, background: `rgba(${t.accentRgb},0.8)` }} />
                      </div>
                    </div>
                    {/* Fake skill bars */}
                    {[80, 60, 90].map((w, i) => (
                      <div key={i} style={{ height: 4, background: t.id === 'purple' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.08)', borderRadius: 2, marginBottom: 5 }}>
                        <div style={{ height: '100%', width: `${w}%`, borderRadius: 2, background: `linear-gradient(90deg,${t.accent},rgba(${t.accentRgb},0.5))` }} />
                      </div>
                    ))}
                  </div>
                  )}

                  {/* Futuristic template: circuit + grid + robot decorations */}
                  {t.id === 'futuristic' && (<>
                    {/* grid overlay */}
                    <div style={{
                      position: 'absolute', inset: 0, opacity: 0.25,
                      backgroundImage: 'linear-gradient(rgba(0,212,255,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,0.3) 1px,transparent 1px)',
                      backgroundSize: '18px 18px',
                    }} />
                    {/* circuit SVG bottom-left */}
                    <svg width={110} height={90} style={{ position:'absolute', bottom:0, left:0, opacity:0.5 }}>
                      <g stroke="#00d4ff" strokeWidth={1} fill="none">
                        <polyline points="5,85 5,55 35,55 35,30 75,30" />
                        <polyline points="20,90 20,65 55,65 55,42 100,42" />
                        <circle cx={35} cy={55} r={3} fill="#00d4ff" />
                        <circle cx={55} cy={65} r={2} fill="#a855f7" />
                      </g>
                    </svg>
                    {/* robot head top-right */}
                    <svg width={48} height={56} viewBox="0 0 120 140" style={{ position:'absolute', top:6, right:6, opacity:0.22 }}>
                      <rect x={20} y={25} width={80} height={70} rx={12} fill="none" stroke="#00d4ff" strokeWidth={3}/>
                      <rect x={32} y={48} width={20} height={10} rx={3} fill="#00d4ff" opacity={0.8}/>
                      <rect x={68} y={48} width={20} height={10} rx={3} fill="#00d4ff" opacity={0.8}/>
                      {[0,1,2,3].map(i=><line key={i} x1={38+i*12} y1={75} x2={38+i*12} y2={85} stroke="#a855f7" strokeWidth={3}/>)}
                      <line x1={60} y1={25} x2={60} y2={8} stroke="#00d4ff" strokeWidth={2}/>
                      <circle cx={60} cy={6} r={4} fill="#00d4ff"/>
                    </svg>
                    {/* purple glow orb */}
                    <div style={{
                      position:'absolute', bottom:-30, right:-30,
                      width:100, height:100, borderRadius:'50%',
                      background:'radial-gradient(circle,rgba(168,85,247,0.35) 0%,transparent 70%)',
                    }}/>
                  </>)}

                  {/* Purple template: bottom blob decoration */}
                  {t.id === 'purple' && (
                    <div style={{
                      position: 'absolute', bottom: -10, left: -10,
                      width: 80, height: 60,
                      background: '#c4a0d0', opacity: 0.7,
                      borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%',
                    }} />
                  )}
                  {t.id === 'purple' && (
                    <div style={{
                      position: 'absolute', bottom: -10, right: -10,
                      width: 65, height: 65,
                      background: '#c4a0d0', opacity: 0.65,
                      borderRadius: '50% 50% 40% 60% / 60% 40% 60% 40%',
                    }} />
                  )}

                  {/* Presentation Style template: slide layout with golden cards */}
                  {t.id === 'presentationstyle' && (
                    <div style={{ position: 'absolute', inset: 0, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {/* cover title */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 4 }}>
                        <div style={{ fontSize: 13, fontStyle: 'italic', fontFamily: 'Georgia, serif', color: '#1a1a1a', fontWeight: 400, lineHeight: 1 }}>Personal</div>
                        <div style={{ fontSize: 16, fontWeight: 900, color: '#1a1a1a', lineHeight: 1 }}>Portfolio</div>
                        <div style={{ width: 20, height: 2, background: '#C8860A', margin: '4px 0 2px', borderRadius: 1 }} />
                        <div style={{ height: 5, width: 60, background: '#1a1a1a', borderRadius: 2 }} />
                      </div>
                      {/* golden cards grid */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 3 }}>
                        {['Strategy','Content','Social','Email','Ads','Analytics'].map((c,i) => (
                          <div key={i} style={{ background: '#C8860A', padding: '5px 4px', borderRadius: 2, textAlign: 'center', fontSize: 7, fontWeight: 700, color: '#fff' }}>{c}</div>
                        ))}
                      </div>
                      {/* bottom accent line */}
                      <div style={{ position: 'absolute', bottom: 12, left: 14, right: 14, height: 2, background: '#C8860A', opacity: 0.4, borderRadius: 1 }} />
                    </div>
                  )}

                  {/* Badge */}
                  <div
                    className="absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded-full"
                    style={{ background: `rgba(${t.accentRgb},0.15)`, color: t.accent, border: `1px solid rgba(${t.accentRgb},0.3)` }}
                  >
                    {t.tag}
                  </div>

                  {/* Selected check */}
                  {selected === t.id && (
                    <div
                      className="absolute bottom-3 right-3 w-7 h-7 rounded-full flex items-center justify-center"
                      style={{ background: t.accent }}
                    >
                      <Check size={14} className="text-white" />
                    </div>
                  )}
                </div>

                {/* Card body */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-white font-bold text-lg">{t.name}</h3>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{t.description}</p>

                  <button
                    onClick={(e) => { e.stopPropagation(); navigate('/craft/preview', { state: { previewTemplate: t.id } }) }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all"
                    style={{
                      background: `linear-gradient(135deg,rgba(${t.accentRgb},0.2),rgba(${t.accentRgb},0.08))`,
                      border: `1px solid rgba(${t.accentRgb},0.3)`,
                      color: t.accent,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = `rgba(${t.accentRgb},0.25)`; e.currentTarget.style.transform = 'scale(1.02)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = `linear-gradient(135deg,rgba(${t.accentRgb},0.2),rgba(${t.accentRgb},0.08))`; e.currentTarget.style.transform = 'scale(1)' }}
                  >
                    <Eye size={14} />
                    Preview Template
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div
            className="mt-10 max-w-5xl p-6 rounded-2xl flex items-center justify-between"
            style={{ background: 'rgba(34,211,238,0.04)', border: '1px solid rgba(34,211,238,0.1)' }}
          >
            <div>
              <p className="text-white font-semibold">Not sure which to pick?</p>
              <p className="text-gray-400 text-sm mt-0.5">You can always switch templates later from the preview page.</p>
            </div>
            <button
              onClick={() => navigate('/craft')}
              className="px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all"
              style={{ background: 'linear-gradient(135deg,#22d3ee,#0ea5e9)', boxShadow: '0 0 20px rgba(34,211,238,0.3)' }}
            >
              Start Building
            </button>
          </div>
        </main>
      </div>

      {/* ── AI Generate Modal ── */}
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
          onClick={e => { if (!generating && e.target === e.currentTarget) setModal(null) }}
        >
          <div
            className="w-full max-w-md rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(180deg,#0d1526,#060e20)',
              border: `1px solid rgba(${modal.accentRgb},0.35)`,
              boxShadow: `0 0 60px rgba(${modal.accentRgb},0.15)`,
            }}
          >
            {/* Modal header */}
            <div className="px-6 pt-6 pb-4 flex items-start justify-between"
              style={{ borderBottom: `1px solid rgba(${modal.accentRgb},0.12)` }}>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles size={15} style={{ color: modal.accent }} />
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: modal.accent }}>
                    AI Portfolio Generator
                  </span>
                </div>
                <h2 className="text-white font-bold text-xl">Generate with {modal.name}</h2>
                <p className="text-gray-400 text-sm mt-0.5">Tell AI about yourself — it builds your portfolio instantly.</p>
              </div>
              {!generating && (
                <button onClick={() => setModal(null)}
                  className="text-gray-500 hover:text-white transition-colors mt-0.5">
                  <X size={20} />
                </button>
              )}
            </div>

            {/* Form */}
            <div className="px-6 py-5 space-y-4">
              {/* Name */}
              <div>
                <label className="text-gray-400 text-xs font-medium flex items-center gap-1.5 mb-1.5">
                  <User size={11} /> Full Name <span style={{ color: modal.accent }}>*</span>
                </label>
                <input
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Sarah Johnson"
                  disabled={generating}
                  className="w-full text-sm rounded-xl px-3.5 py-2.5 outline-none transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: `1px solid rgba(${modal.accentRgb},0.2)`,
                    color: 'white',
                  }}
                  onFocus={e => e.target.style.borderColor = modal.accent}
                  onBlur={e => e.target.style.borderColor = `rgba(${modal.accentRgb},0.2)`}
                />
              </div>

              {/* Role */}
              <div>
                <label className="text-gray-400 text-xs font-medium flex items-center gap-1.5 mb-1.5">
                  <Briefcase size={11} /> Job Title / Role <span style={{ color: modal.accent }}>*</span>
                </label>
                <input
                  value={form.role}
                  onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                  placeholder="e.g. Full Stack Developer"
                  disabled={generating}
                  className="w-full text-sm rounded-xl px-3.5 py-2.5 outline-none transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: `1px solid rgba(${modal.accentRgb},0.2)`,
                    color: 'white',
                  }}
                  onFocus={e => e.target.style.borderColor = modal.accent}
                  onBlur={e => e.target.style.borderColor = `rgba(${modal.accentRgb},0.2)`}
                />
              </div>

              {/* Skills */}
              <div>
                <label className="text-gray-400 text-xs font-medium flex items-center gap-1.5 mb-1.5">
                  <Code2 size={11} /> Skills <span className="text-gray-600">(optional)</span>
                </label>
                <input
                  value={form.skills}
                  onChange={e => setForm(f => ({ ...f, skills: e.target.value }))}
                  placeholder="e.g. React, Node.js, Python, Figma"
                  disabled={generating}
                  className="w-full text-sm rounded-xl px-3.5 py-2.5 outline-none transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: `1px solid rgba(${modal.accentRgb},0.2)`,
                    color: 'white',
                  }}
                  onFocus={e => e.target.style.borderColor = modal.accent}
                  onBlur={e => e.target.style.borderColor = `rgba(${modal.accentRgb},0.2)`}
                />
              </div>

              {/* Experience */}
              <div>
                <label className="text-gray-400 text-xs font-medium flex items-center gap-1.5 mb-1.5">
                  <Clock size={11} /> Years of Experience <span className="text-gray-600">(optional)</span>
                </label>
                <input
                  value={form.experience}
                  onChange={e => setForm(f => ({ ...f, experience: e.target.value }))}
                  placeholder="e.g. 3 years"
                  disabled={generating}
                  className="w-full text-sm rounded-xl px-3.5 py-2.5 outline-none transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: `1px solid rgba(${modal.accentRgb},0.2)`,
                    color: 'white',
                  }}
                  onFocus={e => e.target.style.borderColor = modal.accent}
                  onBlur={e => e.target.style.borderColor = `rgba(${modal.accentRgb},0.2)`}
                />
              </div>

              {/* Error */}
              {genError && (
                <div className="text-red-400 text-xs px-3 py-2 rounded-xl"
                  style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
                  {genError}
                </div>
              )}

              {/* Generating status */}
              {generating && (
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
                  style={{ background: `rgba(${modal.accentRgb},0.07)`, border: `1px solid rgba(${modal.accentRgb},0.18)` }}>
                  <Loader2 size={14} className="animate-spin flex-shrink-0" style={{ color: modal.accent }} />
                  <span className="text-sm" style={{ color: modal.accent }}>{genStep}</span>
                </div>
              )}
            </div>

            {/* Footer buttons */}
            <div className="px-6 pb-6 flex gap-3">
              <button
                onClick={() => setModal(null)}
                disabled={generating}
                className="flex-1 py-3 rounded-xl text-sm font-medium text-gray-400 transition-all hover:bg-white/5 disabled:opacity-40"
                style={{ border: '1px solid rgba(255,255,255,0.08)' }}
              >
                Cancel
              </button>
              <button
                onClick={() => generatePortfolio(modal.id)}
                disabled={generating || !form.name.trim() || !form.role.trim()}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-50"
                style={{
                  background: generating
                    ? `rgba(${modal.accentRgb},0.2)`
                    : `linear-gradient(135deg,${modal.accent},${modal.accent}bb)`,
                  boxShadow: generating ? 'none' : `0 0 20px rgba(${modal.accentRgb},0.35)`,
                }}
              >
                {generating
                  ? <><Loader2 size={14} className="animate-spin"/> Building…</>
                  : <><Sparkles size={14}/> Generate Portfolio</>
                }
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
