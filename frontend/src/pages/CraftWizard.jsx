import React, { useState, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  User, Briefcase, GraduationCap, Code2, FolderGit2,
  Palette, Plus, X, ChevronRight, ChevronLeft,
  ArrowRight, Check, Trash2, Globe, Phone, Mail,
  MapPin, Linkedin, Sparkles, Loader2,
  Award, BookOpen, Trophy, Camera, Link2, Menu
} from 'lucide-react'
import Sidebar from '../components/Sidebar'
import ParticleBackground from '../components/ParticleBackground'
import api from '../api/api'

const STEPS = [
  { id: 0, icon: User,          label: 'Details'    },
  { id: 1, icon: Code2,         label: 'Skills'     },
  { id: 2, icon: GraduationCap, label: 'Education'  },
  { id: 3, icon: Briefcase,     label: 'Experience' },
  { id: 4, icon: FolderGit2,    label: 'Projects'   },
  { id: 5, icon: Award,         label: 'Certs'      },
  { id: 6, icon: BookOpen,      label: 'Pubs'       },
  { id: 7, icon: Trophy,        label: 'Awards'     },
  { id: 8, icon: Palette,       label: 'Template'   },
]

const TEMPLATES = [
  { id: 'browncream',  name: 'Brown & Cream',   tag: 'New',       bg: 'linear-gradient(135deg,#FAF7F2,#E8D5C0)', accent: '#7B5B3A', desc: 'Warm cream & brown — elegant and timeless' },
  { id: 'purple',      name: 'Purple Beige',    tag: 'Popular',   bg: 'linear-gradient(135deg,#f4ece8,#ede0f0)', accent: '#c4a0d0', desc: 'Soft beige with purple blobs — creative & playful' },
  { id: 'grayscale',   name: 'B&W Photography', tag: 'New',       bg: 'linear-gradient(135deg,#2d2d2d,#1e1e1e)', accent: '#ffffff', desc: 'Dark charcoal with bold B&W typography' },
  { id: 'futuristic',  name: 'Neural Circuit',  tag: 'Exclusive', bg: 'linear-gradient(135deg,#03040d,#07021a)',  accent: '#00d4ff', desc: 'Cyberpunk neon blue — built for tech visionaries' },
  { id: 'minimalist',  name: 'B&W Minimalist',  tag: 'Premium',   bg: 'linear-gradient(135deg,#252525,#1a1a1a)', accent: '#e8e3d5', desc: 'Dark charcoal with off-white cream — bold & minimal' },
  { id: 'greenbeige',  name: 'Green Beige',     tag: 'New',       bg: 'linear-gradient(135deg,#ddd9ce,#c8c4b4)', accent: '#6b8c4e', desc: 'Olive green & warm beige — editorial presentation style' },
  { id: 'classic',     name: 'Classic Professional', tag: 'Elite',  bg: 'linear-gradient(135deg,#0f172a,#1e293b)', accent: '#f59e0b', desc: 'The gold standard — serif fonts and amber accents' },
  { id: 'darkblue',    name: 'Dark Blue Creative', tag: 'Creative', bg: 'linear-gradient(135deg,#0f172a,#1e1b4b)', accent: '#818cf8', desc: 'Deep indigo and slate — modern and sleek' },
  { id: 'presentationstyle', name: 'Presentation Style', tag: 'Bold', bg: 'linear-gradient(135deg,#f8f9fa,#e9ecef)', accent: '#C8860A', desc: 'Portfolio as a slide deck — unique and impactful' },
  { id: 'boldblack',   name: 'Bold Black',      tag: 'Impact',    bg: 'linear-gradient(135deg,#000000,#171717)', accent: '#C4FF00', desc: 'High contrast black and electric lime' },
  { id: 'orangewhite', name: 'Orange & White',   tag: 'Fresh',     bg: 'linear-gradient(135deg,#ffffff,#fef3c7)', accent: '#ea580c', desc: 'Bright white with vibrant orange highlights' },
  { id: 'bluegradientaesthetic', name: 'Blue Gradient', tag: 'Artistic', bg: 'linear-gradient(135deg,#eff6ff,#dbeafe)', accent: '#3b82f6', desc: 'Soft blue gradients — clean and airy' },
  { id: 'neon',        name: 'Neon Cyber',      tag: 'Gamer',     bg: 'linear-gradient(135deg,#020617,#1e1b4b)', accent: '#d946ef', desc: 'Vibrant magenta neon glow on dark slate' },
  { id: 'light',       name: 'Clean Light',      tag: 'Standard',  bg: 'linear-gradient(135deg,#f8fafc,#f1f5f9)', accent: '#0ea5e9', desc: 'Pure white and light gray — professionally safe' },
  { id: 'dark',        name: 'Simple Dark',      tag: 'Standard',  bg: 'linear-gradient(135deg,#0f172a,#020617)', accent: '#38bdf8', desc: 'Deep dark theme — easy on the eyes' },
]

const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Expert']

const initPortfolio = () => {
  try {
    const saved = sessionStorage.getItem('craft_portfolio')
    if (saved && saved !== 'undefined') {
      const parsed = JSON.parse(saved)
      if (parsed && typeof parsed === 'object') return parsed
    }
  } catch(e) {
    console.error('Persistence load error:', e)
  }
  return {
    details: { name:'', title:'', email:'', phone:'', location:'', website:'', linkedin:'', bio:'', profileImage:'' },
    skills: [],
    education: [],
    experience: [],
    projects: [],
    certifications: [],
    publications: [],
    awards: [],
    template: 'browncream'
  }
}

const save = (data) => { try { sessionStorage.setItem('craft_portfolio', JSON.stringify(data)) } catch {} }

/* ─── Image compress helper ─── */
const compressImage = (file, maxSize = 700, quality = 0.72) =>
  new Promise(resolve => {
    const reader = new FileReader()
    reader.onload = e => {
      const img = new Image()
      img.onload = () => {
        const ratio = Math.min(maxSize / Math.max(img.width, img.height), 1)
        const canvas = document.createElement('canvas')
        canvas.width = img.width * ratio
        canvas.height = img.height * ratio
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/jpeg', quality))
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  })

/* ─── ImageUpload ─── */
function ImageUpload({ value, onChange, label = 'Upload', size = 90, circle = false }) {
  const ref = useRef(null)
  const handle = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const compressed = await compressImage(file)
    onChange(compressed)
    e.target.value = ''
  }
  const shape = circle ? '50%' : '12px'
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        onClick={() => ref.current?.click()}
        className="cursor-pointer overflow-hidden transition-all hover:opacity-80 flex items-center justify-center"
        style={{ width: size, height: size, borderRadius: shape, background: 'rgba(13,21,38,0.9)', border: '2px dashed rgba(34,211,238,0.35)', flexShrink: 0 }}
      >
        {value
          ? <img src={value} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
          : <div className="flex flex-col items-center gap-1 text-gray-500">
              <Camera size={circle ? 18 : 16} />
              <span className="text-[10px] text-center px-1">{label}</span>
            </div>
        }
      </div>
      <input ref={ref} type="file" accept="image/*" onChange={handle} className="hidden" />
      {value && (
        <button onClick={() => onChange('')} className="text-[10px] text-red-400 hover:text-red-300 transition-colors">Remove</button>
      )}
    </div>
  )
}

/* ─── Input ─── */
const Input = ({ label, icon: Icon, value, onChange, placeholder, type='text', required }) => (
  <div>
    <label className="text-gray-300 text-sm font-medium flex items-center gap-1.5 mb-2">
      {Icon && <Icon size={13} className="text-cyan-400" />}
      {label}{required && <span className="text-red-400">*</span>}
    </label>
    <input
      type={type} value={value} onChange={onChange} placeholder={placeholder}
      className="w-full px-4 py-3 rounded-xl text-white text-sm focus:outline-none transition-all"
      style={{ background:'rgba(13,21,38,0.8)', border:'1px solid rgba(75,85,99,0.4)' }}
      onFocus={e => e.target.style.borderColor='rgba(34,211,238,0.5)'}
      onBlur={e => e.target.style.borderColor='rgba(75,85,99,0.4)'}
    />
  </div>
)

/* ─── Textarea ─── */
const Textarea = ({ label, value, onChange, placeholder, rows=3 }) => (
  <div>
    <label className="text-gray-300 text-sm font-medium block mb-2">{label}</label>
    <textarea
      value={value} onChange={onChange} placeholder={placeholder} rows={rows}
      className="w-full px-4 py-3 rounded-xl text-white text-sm focus:outline-none transition-all resize-none"
      style={{ background:'rgba(13,21,38,0.8)', border:'1px solid rgba(75,85,99,0.4)' }}
      onFocus={e => e.target.style.borderColor='rgba(34,211,238,0.5)'}
      onBlur={e => e.target.style.borderColor='rgba(75,85,99,0.4)'}
    />
  </div>
)

/* ─── Card wrapper ─── */
const ItemCard = ({ children, onDelete }) => (
  <div className="relative p-5 rounded-2xl mb-4 overflow-hidden group"
    style={{ 
      background:'rgba(13,21,38,0.7)', 
      border:'1px solid rgba(34,211,238,0.15)',
      backdropFilter: 'blur(20px)'
    }}>
    <div 
      className="absolute inset-0 z-0 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-700"
      style={{
        backgroundImage: 'url("/images/bg_card.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
    <div className="relative z-10">
      <button onClick={onDelete}
        className="absolute top-0 right-[-8px] p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all">
        <Trash2 size={14}/>
      </button>
      {children}
    </div>
  </div>
)

/* ════════════════════════════════════════
   STEP 0 — Personal Details
════════════════════════════════════════ */
function StepDetails({ data, onChange }) {
  const [bioLoading, setBioLoading] = useState(false)
  const [bioError, setBioError] = useState('')
  const set = (field) => (e) => onChange({ ...data, [field]: e.target.value })
  const setVal = (field) => (val) => onChange({ ...data, [field]: val })

  const generateBio = async () => {
    if (!data.title.trim()) return
    setBioLoading(true)
    setBioError('')
    try {
      const skillsList = typeof data.skills === 'string' 
        ? data.skills 
        : '' // skills passed separately via parent; just use title+name
      const contextParts = [
        data.name     && `Name: ${data.name}`,
        data.title    && `Job Title: ${data.title}`,
        data.location && `Location: ${data.location}`,
      ].filter(Boolean).join(', ')

      const prompt = `Write a compelling, professional 3-4 sentence bio for a portfolio website.
Context: ${contextParts}
Instructions:
- Write in first person (I am...)
- Make it engaging, confident and human-sounding
- Mention their role and passion for their work  
- End with what they bring to the table or their goal
- Do NOT include any placeholder text or brackets
- Return ONLY the bio text, nothing else`

      const res = await api.post('/api/ai/generate-text', { prompt })
      
      if (res.data && res.data.text) {
        onChange({ ...data, bio: res.data.text.trim() })
      } else {
        throw new Error('No bio text received from AI.')
      }
    } catch (err) {
      setBioError(err.response?.data?.error || err.message)
    } finally {
      setBioLoading(false)
    }
  }

  return (
    <div className="space-y-5">

      {/* Profile Photo */}
      <div className="flex items-center gap-5 p-4 rounded-2xl relative overflow-hidden group" 
        style={{ 
          background:'rgba(13,21,38,0.6)', 
          border:'1px solid rgba(34,211,238,0.15)',
          backdropFilter: 'blur(10px)'
        }}>
        <div 
          className="absolute inset-0 z-0 opacity-20 pointer-events-none group-hover:scale-110 transition-transform duration-700"
          style={{
            backgroundImage: 'url("/images/bg_card.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative z-10 flex items-center gap-5">
          <ImageUpload value={data.profileImage || ''} onChange={setVal('profileImage')} label="Profile Photo" size={88} circle />
          <div>
            <p className="text-white font-semibold text-sm">Profile Photo</p>
            <p className="text-gray-400 text-xs mt-1">Gallery se apni photo upload karo<br/>ya AI se auto-generate karo (Preview page pe)</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Full Name"     icon={User}    value={data.name}     onChange={set('name')}     placeholder="John Doe"           required />
        <Input label="Job Title"     icon={Briefcase} value={data.title}  onChange={set('title')}    placeholder="Full Stack Developer" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Email"         icon={Mail}    value={data.email}    onChange={set('email')}    placeholder="john@example.com"   type="email" required />
        <Input label="Phone"         icon={Phone}   value={data.phone}    onChange={set('phone')}    placeholder="+91 9876543210" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Location"      icon={MapPin}  value={data.location} onChange={set('location')} placeholder="Mumbai, India" />
        <Input label="Website / Portfolio URL" icon={Globe} value={data.website} onChange={set('website')} placeholder="https://yoursite.com" />
      </div>
      <Input label="LinkedIn URL"    icon={Linkedin} value={data.linkedin} onChange={set('linkedin')} placeholder="https://linkedin.com/in/username" />

      {/* Bio with AI generate button */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-gray-300 text-sm font-medium">About / Bio</label>
          <button
            onClick={generateBio}
            disabled={!data.title.trim() || bioLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{
              background: 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(34,211,238,0.2))',
              border: '1px solid rgba(168,85,247,0.4)',
              color: '#c084fc'
            }}
          >
            {bioLoading
              ? <><Loader2 size={12} className="animate-spin" /> Generating...</>
              : <><Sparkles size={12} /> AI Generate</>
            }
          </button>
        </div>
        <textarea
          value={data.bio}
          onChange={set('bio')}
          placeholder={data.title.trim() ? `Click "AI Generate" to auto-fill based on your role, or write manually...` : 'Fill in Job Title first, then use AI Generate...'}
          rows={4}
          className="w-full px-4 py-3 rounded-xl text-white text-sm focus:outline-none transition-all resize-none"
          style={{ background:'rgba(13,21,38,0.8)', border:'1px solid rgba(75,85,99,0.4)' }}
          onFocus={e => e.target.style.borderColor='rgba(34,211,238,0.5)'}
          onBlur={e => e.target.style.borderColor='rgba(75,85,99,0.4)'}
        />
        {bioError && <p className="text-red-400 text-xs mt-1">{bioError}</p>}
        {!data.title.trim() && <p className="text-gray-500 text-xs mt-1">💡 Job Title bharo phir AI Generate button se bio auto-fill ho jayega</p>}
      </div>
    </div>
  )
}

/* ════════════════════════════════════════
   STEP 1 — Skills
════════════════════════════════════════ */
function StepSkills({ data, onChange }) {
  const [input, setInput] = useState('')
  const [level, setLevel] = useState('Expert')

  const add = () => {
    const name = input.trim()
    if (!name) return
    if (data.find(s => s.name.toLowerCase() === name.toLowerCase())) { setInput(''); return }
    onChange([...data, { name, level, image: '' }])
    setInput('')
  }

  const remove = (i) => onChange(data.filter((_, idx) => idx !== i))
  const setSkillImg = (i, val) => onChange(data.map((s, idx) => idx === i ? { ...s, image: val } : s))

  const levelColor = { Beginner:'#22d3ee', Intermediate:'#a78bfa', Expert:'#f59e0b' }

  return (
    <div className="space-y-5">
      <div className="flex gap-3">
        <input
          value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && add()}
          placeholder="Type a skill & press Enter…"
          className="flex-1 px-4 py-3 rounded-xl text-white text-sm focus:outline-none"
          style={{ background:'rgba(13,21,38,0.8)', border:'1px solid rgba(75,85,99,0.4)' }}
          onFocus={e => e.target.style.borderColor='rgba(34,211,238,0.5)'}
          onBlur={e => e.target.style.borderColor='rgba(75,85,99,0.4)'}
        />
        <div className="flex rounded-xl overflow-hidden" style={{ border:'1px solid rgba(75,85,99,0.4)' }}>
          {SKILL_LEVELS.map(l => (
            <button key={l} onClick={() => setLevel(l)}
              className="px-3 py-2 text-xs font-medium transition-all"
              style={{
                background: level === l ? `${levelColor[l]}20` : 'rgba(13,21,38,0.8)',
                color: level === l ? levelColor[l] : '#9ca3af',
                borderRight: l !== 'Expert' ? '1px solid rgba(75,85,99,0.4)' : 'none'
              }}>
              {l}
            </button>
          ))}
        </div>
        <button onClick={add}
          className="px-4 py-3 rounded-xl font-semibold text-white transition-all hover:scale-105"
          style={{ background:'linear-gradient(135deg,#22d3ee,#0ea5e9)', boxShadow:'0 4px 15px rgba(34,211,238,0.3)' }}>
          <Plus size={18}/>
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-10 text-gray-500 text-sm">
          No skills added yet. Type a skill above and press Enter or click +
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {data.map((s, i) => (
            <div key={i} className="group flex items-center gap-3 p-3 rounded-xl transition-all"
              style={{ background:`${levelColor[s.level]}0d`, border:`1px solid ${levelColor[s.level]}30` }}>
              <ImageUpload value={s.image || ''} onChange={v => setSkillImg(i, v)} label="Icon" size={44} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm truncate" style={{ color: levelColor[s.level] }}>{s.name}</span>
                  <button onClick={() => remove(i)} className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-400 ml-1 flex-shrink-0">
                    <X size={12} className="text-gray-500"/>
                  </button>
                </div>
                <span className="text-xs opacity-60" style={{ color: levelColor[s.level] }}>{s.level}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="pt-2 text-xs text-gray-500">
        💡 Tip: Select level before adding. Press <kbd className="px-1.5 py-0.5 rounded" style={{ background:'rgba(255,255,255,0.08)' }}>Enter</kbd> to add quickly.
      </div>
    </div>
  )
}

/* ════════════════════════════════════════
   STEP 2 — Education
════════════════════════════════════════ */
function StepEducation({ data, onChange }) {
  const blank = { institution:'', degree:'', field:'', from:'', to:'', grade:'', description:'' }
  const add = () => onChange([...data, { ...blank }])
  const update = (i, field, val) => onChange(data.map((e, idx) => idx === i ? { ...e, [field]: val } : e))
  const remove = (i) => onChange(data.filter((_, idx) => idx !== i))

  return (
    <div>
      {data.length === 0 ? (
        <div className="text-center py-10 text-gray-500 text-sm mb-4">No education added yet.</div>
      ) : data.map((edu, i) => (
        <ItemCard key={i} onDelete={() => remove(i)}>
          <div className="space-y-3 pr-8">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Institution *</label>
                <input value={edu.institution} onChange={e => update(i,'institution',e.target.value)} placeholder="IIT Bombay"
                  className="input-sm" style={{ background:'rgba(6,13,26,0.8)', border:'1px solid rgba(75,85,99,0.3)', borderRadius:'12px', padding:'12px 16px', color:'white', fontSize:'14px', width:'100%', outline:'none' }}/>
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Degree *</label>
                <input value={edu.degree} onChange={e => update(i,'degree',e.target.value)} placeholder="B.Tech / B.Sc / MBA"
                  className="input-sm" style={{ background:'rgba(6,13,26,0.8)', border:'1px solid rgba(75,85,99,0.3)', borderRadius:'12px', padding:'12px 16px', color:'white', fontSize:'14px', width:'100%', outline:'none' }}/>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Field of Study</label>
                <input value={edu.field} onChange={e => update(i,'field',e.target.value)} placeholder="Computer Science"
                  style={{ background:'rgba(6,13,26,0.8)', border:'1px solid rgba(75,85,99,0.3)', borderRadius:'12px', padding:'12px 16px', color:'white', fontSize:'14px', width:'100%', outline:'none' }}/>
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1 block">From Year</label>
                <input value={edu.from} onChange={e => update(i,'from',e.target.value)} placeholder="2020"
                  style={{ background:'rgba(6,13,26,0.8)', border:'1px solid rgba(75,85,99,0.3)', borderRadius:'12px', padding:'12px 16px', color:'white', fontSize:'14px', width:'100%', outline:'none' }}/>
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1 block">To Year</label>
                <input value={edu.to} onChange={e => update(i,'to',e.target.value)} placeholder="2024 / Present"
                  style={{ background:'rgba(6,13,26,0.8)', border:'1px solid rgba(75,85,99,0.3)', borderRadius:'12px', padding:'12px 16px', color:'white', fontSize:'14px', width:'100%', outline:'none' }}/>
              </div>
            </div>
            <div>
              <label className="text-gray-400 text-xs mb-1 block">Grade / CGPA</label>
              <input value={edu.grade} onChange={e => update(i,'grade',e.target.value)} placeholder="9.2 CGPA / 85%"
                style={{ background:'rgba(6,13,26,0.8)', border:'1px solid rgba(75,85,99,0.3)', borderRadius:'10px', padding:'8px 12px', color:'white', fontSize:'13px', width:'100%', outline:'none' }}/>
            </div>
          </div>
        </ItemCard>
      ))}
      <button onClick={add}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-cyan-400 text-sm font-medium transition-all hover:bg-cyan-500/10 active:scale-95"
        style={{ border:'1px dashed rgba(34,211,238,0.3)', minHeight:'48px' }}>
        <Plus size={16}/> Add Education
      </button>
    </div>
  )
}

/* ════════════════════════════════════════
   STEP 3 — Experience
════════════════════════════════════════ */
function StepExperience({ data, onChange }) {
  const blank = { company:'', role:'', location:'', from:'', to:'', current:false, description:'' }
  const add = () => onChange([...data, { ...blank }])
  const update = (i, field, val) => onChange(data.map((e, idx) => idx === i ? { ...e, [field]: val } : e))
  const remove = (i) => onChange(data.filter((_, idx) => idx !== i))

  const fieldStyle = { background:'rgba(6,13,26,0.8)', border:'1px solid rgba(75,85,99,0.3)', borderRadius:'12px', padding:'12px 16px', color:'white', fontSize:'14px', width:'100%', outline:'none' }

  return (
    <div>
      {data.length === 0 ? (
        <div className="text-center py-10 text-gray-500 text-sm mb-4">No experience added yet.</div>
      ) : data.map((exp, i) => (
        <ItemCard key={i} onDelete={() => remove(i)}>
          <div className="space-y-3 pr-8">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Company *</label>
                <input value={exp.company} onChange={e => update(i,'company',e.target.value)} placeholder="Google" style={fieldStyle}/>
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Role *</label>
                <input value={exp.role} onChange={e => update(i,'role',e.target.value)} placeholder="Software Engineer" style={fieldStyle}/>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Location</label>
                <input value={exp.location} onChange={e => update(i,'location',e.target.value)} placeholder="Remote / Bangalore" style={fieldStyle}/>
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1 block">From</label>
                <input value={exp.from} onChange={e => update(i,'from',e.target.value)} placeholder="Jan 2022" style={fieldStyle}/>
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1 block">To</label>
                <input value={exp.to} onChange={e => update(i,'to',e.target.value)} placeholder="Dec 2023" disabled={exp.current} style={{ ...fieldStyle, opacity: exp.current ? 0.4 : 1 }}/>
              </div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <div
                onClick={() => update(i,'current',!exp.current)}
                className="w-4 h-4 rounded flex items-center justify-center transition-all"
                style={{ background: exp.current ? '#22d3ee' : 'rgba(75,85,99,0.3)', border:'1px solid rgba(75,85,99,0.5)' }}>
                {exp.current && <Check size={10} className="text-white"/>}
              </div>
              <span className="text-gray-400 text-xs">Currently working here</span>
            </label>
            <div>
              <label className="text-gray-400 text-xs mb-1 block">Description</label>
              <textarea value={exp.description} onChange={e => update(i,'description',e.target.value)}
                placeholder="Describe your responsibilities, achievements..."
                rows={3} style={{ ...fieldStyle, resize:'none', padding:'10px 12px' }}/>
            </div>
          </div>
        </ItemCard>
      ))}
      <button onClick={add}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-cyan-400 text-sm font-medium transition-all hover:bg-cyan-500/10 active:scale-95"
        style={{ border:'1px dashed rgba(34,211,238,0.3)', minHeight:'48px' }}>
        <Plus size={16}/> Add Experience
      </button>
    </div>
  )
}

/* ════════════════════════════════════════
   STEP 4 — Projects
════════════════════════════════════════ */
function StepProjects({ data, onChange }) {
  const blank = { name:'', description:'', tech:'', link:'', github:'', image:'' }
  const add = () => onChange([...data, { ...blank }])
  const update = (i, field, val) => onChange(data.map((e, idx) => idx === i ? { ...e, [field]: val } : e))
  const remove = (i) => onChange(data.filter((_, idx) => idx !== i))

  const fieldStyle = { background:'rgba(6,13,26,0.8)', border:'1px solid rgba(75,85,99,0.3)', borderRadius:'10px', padding:'8px 12px', color:'white', fontSize:'13px', width:'100%', outline:'none' }

  return (
    <div>
      {data.length === 0 ? (
        <div className="text-center py-10 text-gray-500 text-sm mb-4">No projects added yet.</div>
      ) : data.map((proj, i) => (
        <ItemCard key={i} onDelete={() => remove(i)}>
          <div className="space-y-3 pr-8">
            {/* Project Image */}
            <div className="flex items-start gap-4">
              <div>
                <label className="text-gray-400 text-xs mb-1.5 block">Project Image</label>
                <ImageUpload value={proj.image || ''} onChange={v => update(i,'image',v)} label="Screenshot" size={72} />
              </div>
              <div className="flex-1">
                <label className="text-gray-400 text-xs mb-1 block">Project Name *</label>
                <input value={proj.name} onChange={e => update(i,'name',e.target.value)} placeholder="AI Portfolio Generator" style={fieldStyle}/>
              </div>
            </div>
            <div>
              <label className="text-gray-400 text-xs mb-1 block">Description *</label>
              <textarea value={proj.description} onChange={e => update(i,'description',e.target.value)}
                placeholder="What does this project do? What problem does it solve?"
                rows={2} style={{ ...fieldStyle, resize:'none', padding:'10px 12px' }}/>
            </div>
            <div>
              <label className="text-gray-400 text-xs mb-1 block">Tech Stack (comma separated)</label>
              <input value={proj.tech} onChange={e => update(i,'tech',e.target.value)} placeholder="React, Node.js, MongoDB, Tailwind" style={fieldStyle}/>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Live Link</label>
                <input value={proj.link} onChange={e => update(i,'link',e.target.value)} placeholder="https://myproject.com" style={fieldStyle}/>
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1 block">GitHub Link</label>
                <input value={proj.github} onChange={e => update(i,'github',e.target.value)} placeholder="https://github.com/user/repo" style={fieldStyle}/>
              </div>
            </div>
          </div>
        </ItemCard>
      ))}
      <button onClick={add}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-cyan-400 text-sm font-medium transition-all hover:bg-cyan-500/10 active:scale-95"
        style={{ border:'1px dashed rgba(34,211,238,0.3)', minHeight:'48px' }}>
        <Plus size={16}/> Add Project
      </button>
    </div>
  )
}

/* ════════════════════════════════════════
   STEP 5 — Certifications
════════════════════════════════════════ */
function StepCertifications({ data, onChange }) {
  const blank = { name:'', issuer:'', date:'', credentialId:'', url:'', image:'' }
  const add = () => onChange([...data, { ...blank }])
  const upd = (i, f, v) => onChange(data.map((e, idx) => idx === i ? { ...e, [f]: v } : e))
  const remove = (i) => onChange(data.filter((_, idx) => idx !== i))
  const fs = { background:'rgba(6,13,26,0.8)', border:'1px solid rgba(75,85,99,0.3)', borderRadius:'10px', padding:'8px 12px', color:'white', fontSize:'13px', width:'100%', outline:'none' }

  return (
    <div>
      {data.length === 0
        ? <div className="text-center py-10 text-gray-500 text-sm mb-4">No certifications added yet.</div>
        : data.map((cert, i) => (
          <ItemCard key={i} onDelete={() => remove(i)}>
            <div className="space-y-3 pr-8">
              <div className="flex items-start gap-4">
                <div>
                  <label className="text-gray-400 text-xs mb-1.5 block">Certificate Image</label>
                  <ImageUpload value={cert.image || ''} onChange={v => upd(i,'image',v)} label="Upload" size={72} />
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <label className="text-gray-400 text-xs mb-1 block">Certificate Name *</label>
                    <input value={cert.name} onChange={e => upd(i,'name',e.target.value)} placeholder="AWS Solutions Architect" style={fs}/>
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs mb-1 block">Issuing Organization *</label>
                    <input value={cert.issuer} onChange={e => upd(i,'issuer',e.target.value)} placeholder="Amazon Web Services" style={fs}/>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-400 text-xs mb-1 block">Issue Date</label>
                  <input value={cert.date} onChange={e => upd(i,'date',e.target.value)} placeholder="Jan 2024" style={fs}/>
                </div>
                <div>
                  <label className="text-gray-400 text-xs mb-1 block">Credential ID</label>
                  <input value={cert.credentialId} onChange={e => upd(i,'credentialId',e.target.value)} placeholder="ABC-12345" style={fs}/>
                </div>
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Credential URL</label>
                <input value={cert.url} onChange={e => upd(i,'url',e.target.value)} placeholder="https://verify.aws.com/cert" style={fs}/>
              </div>
            </div>
          </ItemCard>
        ))
      }
      <button onClick={add}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-cyan-400 text-sm font-medium transition-all hover:bg-cyan-500/10"
        style={{ border:'1px dashed rgba(34,211,238,0.3)' }}>
        <Plus size={16}/> Add Certification
      </button>
    </div>
  )
}

/* ════════════════════════════════════════
   STEP 6 — Publications
════════════════════════════════════════ */
function StepPublications({ data, onChange }) {
  const blank = { title:'', publisher:'', date:'', url:'', description:'', image:'' }
  const add = () => onChange([...data, { ...blank }])
  const upd = (i, f, v) => onChange(data.map((e, idx) => idx === i ? { ...e, [f]: v } : e))
  const remove = (i) => onChange(data.filter((_, idx) => idx !== i))
  const fs = { background:'rgba(6,13,26,0.8)', border:'1px solid rgba(75,85,99,0.3)', borderRadius:'10px', padding:'8px 12px', color:'white', fontSize:'13px', width:'100%', outline:'none' }

  return (
    <div>
      {data.length === 0
        ? <div className="text-center py-10 text-gray-500 text-sm mb-4">No publications added yet.</div>
        : data.map((pub, i) => (
          <ItemCard key={i} onDelete={() => remove(i)}>
            <div className="space-y-3 pr-8">
              <div className="flex items-start gap-4">
                <div>
                  <label className="text-gray-400 text-xs mb-1.5 block">Cover Image</label>
                  <ImageUpload value={pub.image || ''} onChange={v => upd(i,'image',v)} label="Upload" size={72} />
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <label className="text-gray-400 text-xs mb-1 block">Title *</label>
                    <input value={pub.title} onChange={e => upd(i,'title',e.target.value)} placeholder="Deep Learning for NLP" style={fs}/>
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs mb-1 block">Publisher / Journal *</label>
                    <input value={pub.publisher} onChange={e => upd(i,'publisher',e.target.value)} placeholder="IEEE, Medium, Arxiv…" style={fs}/>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-400 text-xs mb-1 block">Published Date</label>
                  <input value={pub.date} onChange={e => upd(i,'date',e.target.value)} placeholder="Mar 2024" style={fs}/>
                </div>
                <div>
                  <label className="text-gray-400 text-xs mb-1 block">URL / DOI</label>
                  <input value={pub.url} onChange={e => upd(i,'url',e.target.value)} placeholder="https://doi.org/…" style={fs}/>
                </div>
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Abstract / Description</label>
                <textarea value={pub.description} onChange={e => upd(i,'description',e.target.value)}
                  placeholder="Brief summary of the publication…"
                  rows={2} style={{ ...fs, resize:'none', padding:'10px 12px' }}/>
              </div>
            </div>
          </ItemCard>
        ))
      }
      <button onClick={add}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-cyan-400 text-sm font-medium transition-all hover:bg-cyan-500/10"
        style={{ border:'1px dashed rgba(34,211,238,0.3)' }}>
        <Plus size={16}/> Add Publication
      </button>
    </div>
  )
}

/* ════════════════════════════════════════
   STEP 7 — Awards & Achievements
════════════════════════════════════════ */
function StepAwards({ data, onChange }) {
  const blank = { title:'', organization:'', date:'', description:'', image:'' }
  const add = () => onChange([...data, { ...blank }])
  const upd = (i, f, v) => onChange(data.map((e, idx) => idx === i ? { ...e, [f]: v } : e))
  const remove = (i) => onChange(data.filter((_, idx) => idx !== i))
  const fs = { background:'rgba(6,13,26,0.8)', border:'1px solid rgba(75,85,99,0.3)', borderRadius:'10px', padding:'8px 12px', color:'white', fontSize:'13px', width:'100%', outline:'none' }

  return (
    <div>
      {data.length === 0
        ? <div className="text-center py-10 text-gray-500 text-sm mb-4">No awards or achievements added yet.</div>
        : data.map((aw, i) => (
          <ItemCard key={i} onDelete={() => remove(i)}>
            <div className="space-y-3 pr-8">
              <div className="flex items-start gap-4">
                <div>
                  <label className="text-gray-400 text-xs mb-1.5 block">Award Image</label>
                  <ImageUpload value={aw.image || ''} onChange={v => upd(i,'image',v)} label="Upload" size={72} />
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <label className="text-gray-400 text-xs mb-1 block">Award / Achievement *</label>
                    <input value={aw.title} onChange={e => upd(i,'title',e.target.value)} placeholder="Best Innovation Award" style={fs}/>
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs mb-1 block">Awarding Organization *</label>
                    <input value={aw.organization} onChange={e => upd(i,'organization',e.target.value)} placeholder="Google, Hackathon, University…" style={fs}/>
                  </div>
                </div>
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Date</label>
                <input value={aw.date} onChange={e => upd(i,'date',e.target.value)} placeholder="Dec 2023" style={fs}/>
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Description</label>
                <textarea value={aw.description} onChange={e => upd(i,'description',e.target.value)}
                  placeholder="Describe this achievement…"
                  rows={2} style={{ ...fs, resize:'none', padding:'10px 12px' }}/>
              </div>
            </div>
          </ItemCard>
        ))
      }
      <button onClick={add}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-cyan-400 text-sm font-medium transition-all hover:bg-cyan-500/10"
        style={{ border:'1px dashed rgba(34,211,238,0.3)' }}>
        <Plus size={16}/> Add Award / Achievement
      </button>
    </div>
  )
}

/* ════════════════════════════════════════
   STEP 8 — Template Chooser
════════════════════════════════════════ */
function StepTemplate({ selected, onChange }) {
  return (
    <div className="space-y-5">

      <div className="grid grid-cols-2 gap-4">
        {TEMPLATES.map(t => (
          <div key={t.id} onClick={() => onChange(t.id)}
            className="cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.03]"
            style={{
              border: selected === t.id ? `2px solid ${t.accent}` : '2px solid rgba(75,85,99,0.2)',
              boxShadow: selected === t.id ? `0 0 25px ${t.accent}40` : 'none'
            }}>
            {/* Thumbnail */}
            <div className="h-36 relative" style={{ background: t.bg }}>
              {/* Mini portfolio mockup inside */}
              <div className="absolute inset-3 rounded-lg overflow-hidden" style={{ background: 'rgba(0,0,0,0.3)', border:`1px solid ${t.accent}25` }}>
                <div className="p-2.5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full" style={{ background: t.accent }}/>
                    <div>
                      <div className="h-1.5 w-14 rounded mb-1" style={{ background:`${t.accent}80` }}/>
                      <div className="h-1 w-10 rounded" style={{ background:'rgba(255,255,255,0.2)' }}/>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-2">
                    {['JS','React','CSS'].map(s => (
                      <span key={s} className="text-[7px] px-1.5 py-0.5 rounded-full" style={{ background:`${t.accent}20`, color:t.accent, border:`1px solid ${t.accent}30` }}>{s}</span>
                    ))}
                  </div>
                  <div className="space-y-1">
                    <div className="h-1 rounded" style={{ background:'rgba(255,255,255,0.1)' }}/>
                    <div className="h-1 w-3/4 rounded" style={{ background:'rgba(255,255,255,0.07)' }}/>
                  </div>
                </div>
              </div>
              {/* Selected check */}
              {selected === t.id && (
                <div className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: t.accent }}>
                  <Check size={12} className="text-white"/>
                </div>
              )}
            </div>
            {/* Info */}
            <div className="p-3" style={{ background:'rgba(13,21,38,0.95)' }}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-white text-sm font-semibold">{t.name}</span>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background:`${t.accent}15`, color:t.accent, border:`1px solid ${t.accent}25` }}>{t.tag}</span>
              </div>
              <p className="text-gray-500 text-xs">{t.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ════════════════════════════════════════
   MAIN WIZARD
════════════════════════════════════════ */
export default function CraftWizard() {
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [step, setStep] = useState(location.state?.step ?? 0)
  const [portfolio, setPortfolio] = useState(initPortfolio)
  const update = (key) => (val) => {
    const next = { ...portfolio, [key]: val }
    setPortfolio(next)
    save(next)
  }

  const next = () => {
    if (step === 8) {
      save(portfolio)
      navigate('/craft/preview')
    } else setStep(s => s + 1)
  }
  const prev = () => setStep(s => s - 1)

  const canNext = () => {
    if (step === 0) return portfolio.details.name.trim() && portfolio.details.email.trim()
    return true
  }

  const stepTitles = [
    'Personal Details',
    'Skills & Technologies',
    'Education',
    'Work Experience',
    'Projects',
    'Certifications',
    'Publications',
    'Awards & Achievements',
    'Choose Template'
  ]
  const stepSubtitles = [
    'Tell us about yourself',
    'What technologies do you know?',
    'Your academic background',
    'Your professional journey',
    'Showcase your best work',
    'Courses, certificates & credentials',
    'Papers, blogs & published work',
    'Awards, prizes & recognitions',
    'Pick a design for your portfolio'
  ]

  return (
    <div className="flex h-screen bg-[#060d1a] overflow-hidden">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <ParticleBackground />

      <div className="flex-1 lg:ml-64 flex flex-col overflow-hidden relative" style={{ zIndex:1 }}>
        {/* Mobile Header Toggle */}
        <div className="lg:hidden flex items-center justify-between px-6 pt-4 pb-0 flex-shrink-0">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 -ml-2 rounded-xl text-gray-400 hover:text-white transition-all bg-white/5"
          >
            <Menu size={24} />
          </button>
          <span className="text-white font-bold text-sm">Step {step + 1} of {STEPS.length}</span>
        </div>
        {/* Top progress bar */}
        <div className="px-4 sm:px-8 pt-4 sm:pt-6 pb-2 flex-shrink-0 overflow-x-auto no-scrollbar">
          <div className="flex items-center min-w-max sm:min-w-0 sm:justify-between px-2">
            {STEPS.map((s, i) => {
              const Icon = s.icon
              const done = i < step
              const active = i === step
              return (
                <React.Fragment key={s.id}>
                  <button
                    onClick={() => i < step && setStep(i)}
                    className="flex flex-col items-center gap-1.5 transition-all"
                    style={{ cursor: i < step ? 'pointer' : 'default' }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                      style={{
                        background: done ? 'linear-gradient(135deg,#22d3ee,#0ea5e9)' : active ? 'rgba(34,211,238,0.15)' : 'rgba(75,85,99,0.15)',
                        border: active ? '2px solid rgba(34,211,238,0.6)' : done ? 'none' : '1px solid rgba(75,85,99,0.3)',
                        boxShadow: active ? '0 0 20px rgba(34,211,238,0.3)' : 'none'
                      }}
                    >
                      {done ? <Check size={16} className="text-white"/> : <Icon size={16} className={active ? 'text-cyan-400' : 'text-gray-500'}/>}
                    </div>
                    <span className="text-xs font-medium hidden sm:block" style={{ color: done ? '#22d3ee' : active ? 'white' : '#6b7280' }}>
                      {s.label}
                    </span>
                  </button>
                  {i < STEPS.length - 1 && (
                    <div className="flex-1 h-px mx-2 rounded-full" style={{
                      background: i < step ? 'linear-gradient(90deg,#22d3ee,#0ea5e9)' : 'rgba(75,85,99,0.3)'
                    }}/>
                  )}
                </React.Fragment>
              )
            })}
          </div>
        </div>

        {/* Form content */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6">
          <div className="max-w-2xl mx-auto">
            {/* Step header */}
            <div className="mb-7">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-cyan-400 font-semibold uppercase tracking-wider">Step {step + 1} of {STEPS.length}</span>
              </div>
              <h2 className="text-white text-2xl font-black">{stepTitles[step]}</h2>
              <p className="text-gray-400 text-sm mt-1">{stepSubtitles[step]}</p>
            </div>

            {/* Step content */}
            <div className="animate-fade-in">
              {step === 0 && <StepDetails        data={portfolio.details}          onChange={update('details')}         />}
              {step === 1 && <StepSkills         data={portfolio.skills}           onChange={update('skills')}          />}
              {step === 2 && <StepEducation      data={portfolio.education}        onChange={update('education')}       />}
              {step === 3 && <StepExperience     data={portfolio.experience}       onChange={update('experience')}      />}
              {step === 4 && <StepProjects       data={portfolio.projects}         onChange={update('projects')}        />}
              {step === 5 && <StepCertifications data={portfolio.certifications || []} onChange={update('certifications')} />}
              {step === 6 && <StepPublications   data={portfolio.publications || []}   onChange={update('publications')}   />}
              {step === 7 && <StepAwards         data={portfolio.awards || []}         onChange={update('awards')}         />}
              {step === 8 && <StepTemplate       selected={portfolio.template}     onChange={update('template')} />}
            </div>
          </div>
        </div>

        {/* Bottom nav */}
        <div className="flex-shrink-0 px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between"
          style={{ background:'rgba(10,15,30,0.9)', borderTop:'1px solid rgba(34,211,238,0.08)', backdropFilter:'blur(12px)' }}>
          <button
            onClick={prev} disabled={step === 0}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all active:scale-95"
            style={{
              background: step === 0 ? 'rgba(75,85,99,0.1)' : 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(75,85,99,0.3)',
              color: step === 0 ? '#4b5563' : '#d1d5db',
              cursor: step === 0 ? 'not-allowed' : 'pointer',
              minHeight:'44px'
            }}
          >
            <ChevronLeft size={16}/> Back
          </button>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {STEPS.map((_, i) => (
              <div key={i} className="rounded-full transition-all duration-300"
                style={{ width: i === step ? (window.innerWidth < 640 ? 12 : 20) : 6, height:6, background: i <= step ? '#22d3ee' : 'rgba(75,85,99,0.4)' }}/>
            ))}
          </div>

          <button
            onClick={next} disabled={!canNext()}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm text-white transition-all hover:scale-105 active:scale-95"
            style={{
              background: canNext() ? 'linear-gradient(135deg,#22d3ee,#0ea5e9)' : 'rgba(75,85,99,0.3)',
              boxShadow: canNext() ? '0 4px 15px rgba(34,211,238,0.3)' : 'none',
              cursor: canNext() ? 'pointer' : 'not-allowed',
              minHeight:'44px'
            }}
          >
            {step === 8 ? (
              <><Check size={16}/> Finish & Preview <ArrowRight size={14}/></>
            ) : (
              <>Next <ChevronRight size={16}/></>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
