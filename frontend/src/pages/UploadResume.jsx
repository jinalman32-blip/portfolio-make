import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import ParticleBackground from '../components/ParticleBackground'
import {
  Upload, FileText, Loader2, AlertCircle, Check, ChevronRight,
  User, Mail, Phone, MapPin, Globe, Linkedin, Briefcase, GraduationCap,
  Code2, FolderGit2, Plus, X, Sparkles
} from 'lucide-react'

const API = 'http://localhost:5000/api/ai'
const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Expert']

const fieldStyle = {
  background: 'rgba(13,21,38,0.8)',
  border: '1px solid rgba(75,85,99,0.4)',
  borderRadius: 10,
  padding: '8px 12px',
  color: 'white',
  fontSize: 13,
  width: '100%',
  outline: 'none',
}

function Field({ label, value, onChange, placeholder, required, textarea }) {
  return (
    <div>
      <label style={{ color: '#9ca3af', fontSize: 12, display: 'block', marginBottom: 4 }}>
        {label}{required && <span style={{ color: '#f87171' }}> *</span>}
      </label>
      {textarea ? (
        <textarea
          value={value} onChange={e => onChange(e.target.value)}
          placeholder={placeholder} rows={3}
          style={{ ...fieldStyle, resize: 'none', padding: '10px 12px' }}
          onFocus={e => e.target.style.borderColor = 'rgba(34,211,238,0.5)'}
          onBlur={e => e.target.style.borderColor = 'rgba(75,85,99,0.4)'}
        />
      ) : (
        <input
          value={value} onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          style={fieldStyle}
          onFocus={e => e.target.style.borderColor = 'rgba(34,211,238,0.5)'}
          onBlur={e => e.target.style.borderColor = 'rgba(75,85,99,0.4)'}
        />
      )}
    </div>
  )
}

const TEMPLATES = [
  { id: 'browncream', name: 'Brown & Cream', bg: 'linear-gradient(135deg,#FAF7F2,#E8D5C0)', accent: '#7B5B3A' },
  { id: 'purple',     name: 'Purple Beige',  bg: 'linear-gradient(135deg,#f4ece8,#ede0f0)', accent: '#c4a0d0' },
  { id: 'grayscale',  name: 'B&W Photo',     bg: 'linear-gradient(135deg,#2d2d2d,#1e1e1e)', accent: '#ffffff' },
  { id: 'futuristic', name: 'Neural Circuit',bg: 'linear-gradient(135deg,#03040d,#07021a)', accent: '#00d4ff' },
  { id: 'minimalist', name: 'B&W Minimal',   bg: 'linear-gradient(135deg,#252525,#1a1a1a)', accent: '#e8e3d5' },
]

export default function UploadResume() {
  const navigate = useNavigate()
  const fileRef = useRef()

  const [phase, setPhase] = useState('upload') // upload | parsing | fill | done
  const [file, setFile] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const [parseError, setParseError] = useState('')
  const [portfolio, setPortfolio] = useState(null)
  const [selectedTemplate, setSelectedTemplate] = useState('browncream')

  /* ── Upload & Parse ── */
  async function handleParse() {
    if (!file) return
    setPhase('parsing')
    setParseError('')
    try {
      const form = new FormData()
      form.append('resume', file)
      const res = await fetch(`${API}/parse-resume`, { method: 'POST', body: form })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Parsing failed')
      setPortfolio({ ...data.portfolio, template: selectedTemplate })
      setPhase('fill')
    } catch (err) {
      setParseError(err.message)
      setPhase('upload')
    }
  }

  /* ── Update helpers ── */
  const setD = (field, val) => setPortfolio(p => ({ ...p, details: { ...p.details, [field]: val } }))
  const setSkill = (i, field, val) => setPortfolio(p => ({ ...p, skills: p.skills.map((s, idx) => idx === i ? { ...s, [field]: val } : s) }))
  const addSkill = () => setPortfolio(p => ({ ...p, skills: [...p.skills, { name: '', level: 'Intermediate' }] }))
  const removeSkill = (i) => setPortfolio(p => ({ ...p, skills: p.skills.filter((_, idx) => idx !== i) }))

  const setEdu = (i, field, val) => setPortfolio(p => ({ ...p, education: p.education.map((e, idx) => idx === i ? { ...e, [field]: val } : e) }))
  const addEdu = () => setPortfolio(p => ({ ...p, education: [...p.education, { degree: '', field: '', institution: '', from: '', to: '', grade: '' }] }))
  const removeEdu = (i) => setPortfolio(p => ({ ...p, education: p.education.filter((_, idx) => idx !== i) }))

  const setExp = (i, field, val) => setPortfolio(p => ({ ...p, experience: p.experience.map((e, idx) => idx === i ? { ...e, [field]: val } : e) }))
  const addExp = () => setPortfolio(p => ({ ...p, experience: [...p.experience, { role: '', company: '', location: '', from: '', to: '', current: false, description: '' }] }))
  const removeExp = (i) => setPortfolio(p => ({ ...p, experience: p.experience.filter((_, idx) => idx !== i) }))

  const setProj = (i, field, val) => setPortfolio(p => ({ ...p, projects: p.projects.map((e, idx) => idx === i ? { ...e, [field]: val } : e) }))
  const addProj = () => setPortfolio(p => ({ ...p, projects: [...p.projects, { name: '', description: '', tech: '', link: '', github: '' }] }))
  const removeProj = (i) => setPortfolio(p => ({ ...p, projects: p.projects.filter((_, idx) => idx !== i) }))

  function handleGeneratePortfolio() {
    const final = { ...portfolio, template: selectedTemplate }
    localStorage.setItem('craft_portfolio', JSON.stringify(final))
    navigate('/craft/preview', { state: { previewTemplate: selectedTemplate } })
  }

  /* ── DRAG DROP ── */
  function handleDrop(e) {
    e.preventDefault()
    setDragOver(false)
    const f = e.dataTransfer.files[0]
    if (f) setFile(f)
  }

  const cardStyle = {
    background: 'rgba(13,21,38,0.75)',
    border: '1px solid rgba(34,211,238,0.1)',
    borderRadius: 16,
    padding: '20px',
    marginBottom: 16,
  }

  const sectionTitle = (icon, label) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
      {React.createElement(icon, { size: 15, color: '#22d3ee' })}
      <span style={{ color: '#22d3ee', fontWeight: 700, fontSize: 14 }}>{label}</span>
    </div>
  )

  return (
    <div className="flex h-screen bg-[#060d1a] overflow-hidden">
      <Sidebar />
      <ParticleBackground />

      <div className="flex-1 flex flex-col ml-64 relative" style={{ zIndex: 1 }}>
        <Header />

        <main className="flex-1 overflow-y-auto px-8 py-8">

          {/* ─── PHASE: UPLOAD ─── */}
          {(phase === 'upload' || phase === 'parsing') && (
            <div style={{ maxWidth: 680, margin: '0 auto' }}>
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
                  style={{ background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.2)' }}>
                  <FileText size={14} className="text-cyan-400" />
                  <span className="text-cyan-400 text-sm font-medium">Resume Upload</span>
                </div>
                <h1 className="text-3xl font-extrabold text-white mb-2">Upload Your Resume</h1>
                <p className="text-gray-400">AI will extract your details automatically. You can edit anything before generating your portfolio.</p>
              </div>

              {/* Drop zone */}
              <div
                onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileRef.current.click()}
                style={{
                  border: `2px dashed ${dragOver || file ? 'rgba(34,211,238,0.6)' : 'rgba(75,85,99,0.4)'}`,
                  borderRadius: 20,
                  padding: '48px 32px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  background: dragOver ? 'rgba(34,211,238,0.04)' : 'rgba(13,21,38,0.5)',
                  transition: 'all 0.2s',
                  marginBottom: 20,
                }}
              >
                <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }}
                  onChange={e => setFile(e.target.files[0])} />
                {file ? (
                  <div>
                    <div className="w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center"
                      style={{ background: 'rgba(34,211,238,0.15)', border: '1px solid rgba(34,211,238,0.3)' }}>
                      <FileText size={26} color="#22d3ee" />
                    </div>
                    <p className="text-white font-semibold text-lg">{file.name}</p>
                    <p className="text-gray-400 text-sm mt-1">{(file.size / 1024).toFixed(1)} KB · Click to change</p>
                  </div>
                ) : (
                  <div>
                    <div className="w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center"
                      style={{ background: 'rgba(75,85,99,0.15)', border: '1px solid rgba(75,85,99,0.3)' }}>
                      <Upload size={26} color="#6b7280" />
                    </div>
                    <p className="text-white font-semibold text-lg">Drop your resume here</p>
                    <p className="text-gray-400 text-sm mt-1">PDF or DOCX · Max 5MB</p>
                  </div>
                )}
              </div>

              {parseError && (
                <div className="flex items-center gap-2 p-3 rounded-xl mb-4 text-sm text-red-400"
                  style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
                  <AlertCircle size={15} className="flex-shrink-0" /> {parseError}
                </div>
              )}

              <button
                onClick={handleParse}
                disabled={!file || phase === 'parsing'}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-base font-bold text-white transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{
                  background: 'linear-gradient(135deg,#22d3ee,#0ea5e9)',
                  boxShadow: file ? '0 4px 20px rgba(34,211,238,0.35)' : 'none',
                }}
              >
                {phase === 'parsing'
                  ? <><Loader2 size={18} className="animate-spin" /> Parsing Resume with AI…</>
                  : <><Sparkles size={18} /> Parse Resume with AI</>
                }
              </button>
            </div>
          )}

          {/* ─── PHASE: FILL MISSING FIELDS ─── */}
          {phase === 'fill' && portfolio && (
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Check size={16} color="#22d3ee" />
                    <span className="text-cyan-400 text-sm font-semibold">Resume Parsed Successfully</span>
                  </div>
                  <h2 className="text-white text-2xl font-extrabold">Review & Complete Your Details</h2>
                  <p className="text-gray-400 text-sm mt-1">AI has extracted what it could. Fill in any missing fields below.</p>
                </div>
                <button
                  onClick={handleGeneratePortfolio}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white"
                  style={{ background: 'linear-gradient(135deg,#22d3ee,#0ea5e9)', boxShadow: '0 4px 15px rgba(34,211,238,0.3)' }}
                >
                  <ChevronRight size={16} /> Generate Portfolio
                </button>
              </div>

              {/* Personal Details */}
              <div style={cardStyle}>
                {sectionTitle(User, 'Personal Details')}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <Field label="Full Name" value={portfolio.details?.name||''} onChange={v => setD('name',v)} placeholder="Jane Smith" required />
                  <Field label="Job Title" value={portfolio.details?.title||''} onChange={v => setD('title',v)} placeholder="Full Stack Developer" required />
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <Field label="Email" value={portfolio.details?.email||''} onChange={v => setD('email',v)} placeholder="jane@example.com" />
                  <Field label="Phone" value={portfolio.details?.phone||''} onChange={v => setD('phone',v)} placeholder="+1 234 567 890" />
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <Field label="Location" value={portfolio.details?.location||''} onChange={v => setD('location',v)} placeholder="San Francisco, CA" />
                  <Field label="Website" value={portfolio.details?.website||''} onChange={v => setD('website',v)} placeholder="https://yoursite.com" />
                </div>
                <Field label="Professional Bio" value={portfolio.details?.bio||''} onChange={v => setD('bio',v)} placeholder="Write a short professional summary…" textarea />
              </div>

              {/* Skills */}
              <div style={cardStyle}>
                {sectionTitle(Code2, 'Skills')}
                {portfolio.skills?.map((s, i) => (
                  <div key={i} className="flex gap-2 mb-2 items-center">
                    <input value={s.name} onChange={e => setSkill(i,'name',e.target.value)} placeholder="Skill name" style={{ ...fieldStyle, flex: 2 }}
                      onFocus={e => e.target.style.borderColor='rgba(34,211,238,0.5)'} onBlur={e => e.target.style.borderColor='rgba(75,85,99,0.4)'} />
                    <select value={s.level} onChange={e => setSkill(i,'level',e.target.value)}
                      style={{ ...fieldStyle, flex: 1, cursor: 'pointer' }}>
                      {SKILL_LEVELS.map(l => <option key={l} value={l} style={{ background: '#0d1526' }}>{l}</option>)}
                    </select>
                    <button onClick={() => removeSkill(i)} className="text-gray-500 hover:text-red-400 transition-colors flex-shrink-0"><X size={16} /></button>
                  </div>
                ))}
                <button onClick={addSkill} className="flex items-center gap-1.5 text-cyan-400 text-sm mt-1 hover:underline">
                  <Plus size={14} /> Add Skill
                </button>
              </div>

              {/* Education */}
              <div style={cardStyle}>
                {sectionTitle(GraduationCap, 'Education')}
                {portfolio.education?.map((e, i) => (
                  <div key={i} style={{ borderLeft: '3px solid rgba(34,211,238,0.3)', paddingLeft: 12, marginBottom: 16 }}>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-gray-400 text-xs">Entry {i+1}</span>
                      <button onClick={() => removeEdu(i)} className="text-gray-500 hover:text-red-400"><X size={14}/></button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <input value={e.degree} onChange={ev => setEdu(i,'degree',ev.target.value)} placeholder="Degree (e.g. B.Sc.)" style={fieldStyle}
                        onFocus={ev => ev.target.style.borderColor='rgba(34,211,238,0.5)'} onBlur={ev => ev.target.style.borderColor='rgba(75,85,99,0.4)'} />
                      <input value={e.field} onChange={ev => setEdu(i,'field',ev.target.value)} placeholder="Field (e.g. Computer Science)" style={fieldStyle}
                        onFocus={ev => ev.target.style.borderColor='rgba(34,211,238,0.5)'} onBlur={ev => ev.target.style.borderColor='rgba(75,85,99,0.4)'} />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <input value={e.institution} onChange={ev => setEdu(i,'institution',ev.target.value)} placeholder="University" style={fieldStyle}
                        onFocus={ev => ev.target.style.borderColor='rgba(34,211,238,0.5)'} onBlur={ev => ev.target.style.borderColor='rgba(75,85,99,0.4)'} />
                      <input value={e.from} onChange={ev => setEdu(i,'from',ev.target.value)} placeholder="From Year" style={fieldStyle}
                        onFocus={ev => ev.target.style.borderColor='rgba(34,211,238,0.5)'} onBlur={ev => ev.target.style.borderColor='rgba(75,85,99,0.4)'} />
                      <input value={e.to} onChange={ev => setEdu(i,'to',ev.target.value)} placeholder="To Year" style={fieldStyle}
                        onFocus={ev => ev.target.style.borderColor='rgba(34,211,238,0.5)'} onBlur={ev => ev.target.style.borderColor='rgba(75,85,99,0.4)'} />
                    </div>
                  </div>
                ))}
                <button onClick={addEdu} className="flex items-center gap-1.5 text-cyan-400 text-sm mt-1 hover:underline">
                  <Plus size={14} /> Add Education
                </button>
              </div>

              {/* Experience */}
              <div style={cardStyle}>
                {sectionTitle(Briefcase, 'Experience')}
                {portfolio.experience?.map((e, i) => (
                  <div key={i} style={{ borderLeft: '3px solid rgba(34,211,238,0.3)', paddingLeft: 12, marginBottom: 16 }}>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-gray-400 text-xs">Entry {i+1}</span>
                      <button onClick={() => removeExp(i)} className="text-gray-500 hover:text-red-400"><X size={14}/></button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <input value={e.role} onChange={ev => setExp(i,'role',ev.target.value)} placeholder="Job Title" style={fieldStyle}
                        onFocus={ev => ev.target.style.borderColor='rgba(34,211,238,0.5)'} onBlur={ev => ev.target.style.borderColor='rgba(75,85,99,0.4)'} />
                      <input value={e.company} onChange={ev => setExp(i,'company',ev.target.value)} placeholder="Company" style={fieldStyle}
                        onFocus={ev => ev.target.style.borderColor='rgba(34,211,238,0.5)'} onBlur={ev => ev.target.style.borderColor='rgba(75,85,99,0.4)'} />
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      <input value={e.location} onChange={ev => setExp(i,'location',ev.target.value)} placeholder="Location" style={fieldStyle}
                        onFocus={ev => ev.target.style.borderColor='rgba(34,211,238,0.5)'} onBlur={ev => ev.target.style.borderColor='rgba(75,85,99,0.4)'} />
                      <input value={e.from} onChange={ev => setExp(i,'from',ev.target.value)} placeholder="From (e.g. Jan 2022)" style={fieldStyle}
                        onFocus={ev => ev.target.style.borderColor='rgba(34,211,238,0.5)'} onBlur={ev => ev.target.style.borderColor='rgba(75,85,99,0.4)'} />
                      <input value={e.to} onChange={ev => setExp(i,'to',ev.target.value)} placeholder="To / Present" style={fieldStyle} disabled={e.current}
                        onFocus={ev => ev.target.style.borderColor='rgba(34,211,238,0.5)'} onBlur={ev => ev.target.style.borderColor='rgba(75,85,99,0.4)'} />
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer mb-2" onClick={() => setExp(i,'current',!e.current)}>
                      <div style={{ width: 16, height: 16, borderRadius: 4, background: e.current ? '#22d3ee' : 'rgba(75,85,99,0.3)', border: '1px solid rgba(75,85,99,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {e.current && <Check size={10} color="white" />}
                      </div>
                      <span style={{ color: '#9ca3af', fontSize: 12 }}>Currently working here</span>
                    </label>
                    <textarea value={e.description} onChange={ev => setExp(i,'description',ev.target.value)} placeholder="Describe your role and achievements…"
                      rows={2} style={{ ...fieldStyle, resize: 'none', padding: '10px 12px' }}
                      onFocus={ev => ev.target.style.borderColor='rgba(34,211,238,0.5)'} onBlur={ev => ev.target.style.borderColor='rgba(75,85,99,0.4)'} />
                  </div>
                ))}
                <button onClick={addExp} className="flex items-center gap-1.5 text-cyan-400 text-sm mt-1 hover:underline">
                  <Plus size={14} /> Add Experience
                </button>
              </div>

              {/* Projects */}
              <div style={cardStyle}>
                {sectionTitle(FolderGit2, 'Projects')}
                {portfolio.projects?.map((proj, i) => (
                  <div key={i} style={{ borderLeft: '3px solid rgba(34,211,238,0.3)', paddingLeft: 12, marginBottom: 16 }}>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-gray-400 text-xs">Project {i+1}</span>
                      <button onClick={() => removeProj(i)} className="text-gray-500 hover:text-red-400"><X size={14}/></button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <input value={proj.name} onChange={ev => setProj(i,'name',ev.target.value)} placeholder="Project Name" style={fieldStyle}
                        onFocus={ev => ev.target.style.borderColor='rgba(34,211,238,0.5)'} onBlur={ev => ev.target.style.borderColor='rgba(75,85,99,0.4)'} />
                      <input value={proj.tech} onChange={ev => setProj(i,'tech',ev.target.value)} placeholder="Tech (React, Node.js, …)" style={fieldStyle}
                        onFocus={ev => ev.target.style.borderColor='rgba(34,211,238,0.5)'} onBlur={ev => ev.target.style.borderColor='rgba(75,85,99,0.4)'} />
                    </div>
                    <textarea value={proj.description} onChange={ev => setProj(i,'description',ev.target.value)} placeholder="Describe this project…"
                      rows={2} style={{ ...fieldStyle, resize: 'none', padding: '10px 12px', marginBottom: 8 }}
                      onFocus={ev => ev.target.style.borderColor='rgba(34,211,238,0.5)'} onBlur={ev => ev.target.style.borderColor='rgba(75,85,99,0.4)'} />
                    <div className="grid grid-cols-2 gap-2">
                      <input value={proj.link} onChange={ev => setProj(i,'link',ev.target.value)} placeholder="Live Link (optional)" style={fieldStyle}
                        onFocus={ev => ev.target.style.borderColor='rgba(34,211,238,0.5)'} onBlur={ev => ev.target.style.borderColor='rgba(75,85,99,0.4)'} />
                      <input value={proj.github} onChange={ev => setProj(i,'github',ev.target.value)} placeholder="GitHub URL (optional)" style={fieldStyle}
                        onFocus={ev => ev.target.style.borderColor='rgba(34,211,238,0.5)'} onBlur={ev => ev.target.style.borderColor='rgba(75,85,99,0.4)'} />
                    </div>
                  </div>
                ))}
                <button onClick={addProj} className="flex items-center gap-1.5 text-cyan-400 text-sm mt-1 hover:underline">
                  <Plus size={14} /> Add Project
                </button>
              </div>

              {/* Template picker */}
              <div style={cardStyle}>
                {sectionTitle(Sparkles, 'Choose Template')}
                <div className="grid grid-cols-5 gap-3">
                  {TEMPLATES.map(t => (
                    <div key={t.id} onClick={() => setSelectedTemplate(t.id)}
                      style={{
                        borderRadius: 12, overflow: 'hidden', cursor: 'pointer',
                        border: selectedTemplate === t.id ? `2px solid ${t.accent}` : '2px solid rgba(75,85,99,0.2)',
                        boxShadow: selectedTemplate === t.id ? `0 0 20px ${t.accent}40` : 'none',
                        transition: 'all 0.2s',
                      }}>
                      <div style={{ height: 60, background: t.bg, position: 'relative' }}>
                        {selectedTemplate === t.id && (
                          <div style={{ position: 'absolute', top: 4, right: 4, width: 18, height: 18, borderRadius: '50%', background: t.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Check size={10} color="white" />
                          </div>
                        )}
                      </div>
                      <div style={{ background: 'rgba(13,21,38,0.95)', padding: '6px 8px' }}>
                        <p style={{ color: selectedTemplate === t.id ? t.accent : '#9ca3af', fontSize: 10, fontWeight: 600, textAlign: 'center' }}>{t.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Generate button bottom */}
              <button
                onClick={handleGeneratePortfolio}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-base font-bold text-white hover:scale-105 transition-all"
                style={{ background: 'linear-gradient(135deg,#22d3ee,#0ea5e9)', boxShadow: '0 4px 20px rgba(34,211,238,0.35)', marginBottom: 40 }}
              >
                <ChevronRight size={18} /> Generate & Preview Portfolio
              </button>
            </div>
          )}

        </main>
      </div>
    </div>
  )
}
