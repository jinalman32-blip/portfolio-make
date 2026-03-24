import React, { useState, useRef } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import ParticleBackground from '../components/ParticleBackground'
import { Wand2, Image, Volume2, Send, Loader2, AlertCircle, Copy, Check, RefreshCw } from 'lucide-react'

const API = 'http://localhost:5000/api/ai'

/* ─── Reusable card shell ─── */
function ToolCard({ icon: Icon, title, description, accentColor, accentRgb, children }) {
  return (
    <div
      className="rounded-2xl p-6 flex flex-col gap-5"
      style={{
        background: 'rgba(13,21,38,0.75)',
        border: `1px solid rgba(${accentRgb},0.2)`,
        backdropFilter: 'blur(12px)',
        boxShadow: `0 0 30px rgba(${accentRgb},0.06)`,
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `rgba(${accentRgb},0.15)`, border: `1px solid rgba(${accentRgb},0.3)` }}
        >
          <Icon size={18} style={{ color: accentColor }} />
        </div>
        <div>
          <h3 className="text-white font-bold text-base">{title}</h3>
          <p className="text-gray-500 text-xs">{description}</p>
        </div>
      </div>
      {children}
    </div>
  )
}

/* ─── Text Generator (Gemini) ─── */
function TextGenerator() {
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  async function generate() {
    if (!prompt.trim()) return
    setLoading(true); setError(''); setResult('')
    try {
      const res = await fetch(`${API}/generate-text`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Generation failed')
      setResult(data.text)
    } catch (e) { setError(e.message) }
    finally { setLoading(false) }
  }

  function copy() {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <ToolCard
      icon={Wand2}
      title="Text Generator"
      description="Powered by Google Gemini — generate bios, summaries & descriptions"
      accentColor="#22d3ee"
      accentRgb="34,211,238"
    >
      <div className="flex flex-col gap-3">
        <textarea
          rows={3}
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="e.g. Write a professional bio for a full-stack developer with 3 years of experience..."
          className="w-full rounded-xl px-4 py-3 text-sm text-white resize-none outline-none transition-all"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(34,211,238,0.2)',
            caretColor: '#22d3ee',
          }}
          onFocus={e => e.target.style.border = '1px solid rgba(34,211,238,0.5)'}
          onBlur={e => e.target.style.border = '1px solid rgba(34,211,238,0.2)'}
          onKeyDown={e => e.key === 'Enter' && e.ctrlKey && generate()}
        />
        <button
          onClick={generate}
          disabled={loading || !prompt.trim()}
          className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: 'linear-gradient(135deg,#22d3ee,#0ea5e9)', boxShadow: '0 0 15px rgba(34,211,238,0.3)' }}
        >
          {loading ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
          {loading ? 'Generating...' : 'Generate Text'}
        </button>
      </div>

      {error && (
        <div className="flex items-start gap-2 p-3 rounded-xl text-sm text-red-400" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
          <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      {result && (
        <div className="relative">
          <div
            className="p-4 rounded-xl text-sm text-gray-300 leading-relaxed whitespace-pre-wrap"
            style={{ background: 'rgba(34,211,238,0.04)', border: '1px solid rgba(34,211,238,0.12)' }}
          >
            {result}
          </div>
          <button
            onClick={copy}
            className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs transition-all"
            style={{ background: 'rgba(34,211,238,0.12)', color: '#22d3ee', border: '1px solid rgba(34,211,238,0.2)' }}
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      )}
    </ToolCard>
  )
}

/* ─── Image Generator (Replicate / Flux) ─── */
function ImageGenerator() {
  const [prompt, setPrompt] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function generate() {
    if (!prompt.trim()) return
    setLoading(true); setError(''); setImageUrl('')
    try {
      const res = await fetch(`${API}/generate-image`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Generation failed')
      setImageUrl(data.imageUrl)
    } catch (e) { setError(e.message) }
    finally { setLoading(false) }
  }

  return (
    <ToolCard
      icon={Image}
      title="Image Generator"
      description="Powered by Replicate (Flux Schnell) — create AI artwork & visuals"
      accentColor="#a78bfa"
      accentRgb="167,139,250"
    >
      <div className="flex flex-col gap-3">
        <textarea
          rows={3}
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="e.g. A professional portrait of a software engineer, cinematic lighting, 4K..."
          className="w-full rounded-xl px-4 py-3 text-sm text-white resize-none outline-none transition-all"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(167,139,250,0.2)',
            caretColor: '#a78bfa',
          }}
          onFocus={e => e.target.style.border = '1px solid rgba(167,139,250,0.5)'}
          onBlur={e => e.target.style.border = '1px solid rgba(167,139,250,0.2)'}
        />
        <button
          onClick={generate}
          disabled={loading || !prompt.trim()}
          className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: 'linear-gradient(135deg,#a78bfa,#6366f1)', boxShadow: '0 0 15px rgba(167,139,250,0.3)' }}
        >
          {loading ? <Loader2 size={15} className="animate-spin" /> : <Image size={15} />}
          {loading ? 'Generating image… (~20s)' : 'Generate Image'}
        </button>
      </div>

      {error && (
        <div className="flex items-start gap-2 p-3 rounded-xl text-sm text-red-400" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
          <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center py-10 rounded-xl" style={{ background: 'rgba(167,139,250,0.04)', border: '1px solid rgba(167,139,250,0.12)' }}>
          <Loader2 size={32} className="animate-spin mb-3" style={{ color: '#a78bfa' }} />
          <p className="text-gray-400 text-sm">AI is painting your image…</p>
          <p className="text-gray-600 text-xs mt-1">This may take up to 30 seconds</p>
        </div>
      )}

      {imageUrl && !loading && (
        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(167,139,250,0.2)' }}>
          <img src={imageUrl} alt="AI generated" className="w-full object-cover" />
          <div className="flex gap-2 p-3" style={{ background: 'rgba(167,139,250,0.05)' }}>
            <a
              href={imageUrl}
              download="ai-image.webp"
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all"
              style={{ background: 'rgba(167,139,250,0.15)', color: '#a78bfa', border: '1px solid rgba(167,139,250,0.25)' }}
            >
              Download Image
            </a>
            <button
              onClick={() => { setImageUrl(''); setPrompt('') }}
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs text-gray-500 transition-all"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <RefreshCw size={12} /> New
            </button>
          </div>
        </div>
      )}
    </ToolCard>
  )
}

/* ─── Voice Generator (ElevenLabs) ─── */
function VoiceGenerator() {
  const [text, setText] = useState('')
  const [audioUrl, setAudioUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const audioRef = useRef(null)

  async function generate() {
    if (!text.trim()) return
    setLoading(true); setError('')
    if (audioUrl) URL.revokeObjectURL(audioUrl)
    setAudioUrl('')
    try {
      const res = await fetch(`${API}/generate-audio`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Audio generation failed')
      }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      setAudioUrl(url)
      setTimeout(() => audioRef.current?.play(), 200)
    } catch (e) { setError(e.message) }
    finally { setLoading(false) }
  }

  return (
    <ToolCard
      icon={Volume2}
      title="Voice Generator"
      description="Powered by ElevenLabs — convert text to natural human speech"
      accentColor="#f59e0b"
      accentRgb="245,158,11"
    >
      <div className="flex flex-col gap-3">
        <textarea
          rows={4}
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="e.g. Hi, I'm Alex — a passionate full-stack developer with expertise in React and Node.js. Welcome to my portfolio!"
          className="w-full rounded-xl px-4 py-3 text-sm text-white resize-none outline-none transition-all"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(245,158,11,0.2)',
            caretColor: '#f59e0b',
          }}
          onFocus={e => e.target.style.border = '1px solid rgba(245,158,11,0.5)'}
          onBlur={e => e.target.style.border = '1px solid rgba(245,158,11,0.2)'}
        />
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span>Voice: Rachel (ElevenLabs)</span>
          <span>{text.length} chars</span>
        </div>
        <button
          onClick={generate}
          disabled={loading || !text.trim()}
          className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: 'linear-gradient(135deg,#f59e0b,#d97706)', boxShadow: '0 0 15px rgba(245,158,11,0.3)' }}
        >
          {loading ? <Loader2 size={15} className="animate-spin" /> : <Volume2 size={15} />}
          {loading ? 'Synthesizing…' : 'Generate Voice'}
        </button>
      </div>

      {error && (
        <div className="flex items-start gap-2 p-3 rounded-xl text-sm text-red-400" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
          <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      {audioUrl && (
        <div className="rounded-xl p-4 flex flex-col gap-3" style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.15)' }}>
          <div className="flex items-center gap-2">
            <Volume2 size={14} style={{ color: '#f59e0b' }} />
            <span className="text-xs text-gray-400 font-medium">Audio ready — Rachel voice</span>
          </div>
          <audio ref={audioRef} controls src={audioUrl} className="w-full" style={{ accentColor: '#f59e0b' }} />
          <a
            href={audioUrl}
            download="voice-output.mp3"
            className="flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all"
            style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.2)' }}
          >
            Download MP3
          </a>
        </div>
      )}
    </ToolCard>
  )
}

/* ─── Main Page ─── */
export default function AITools() {
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
              style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)' }}
            >
              <Wand2 size={14} className="text-indigo-400" />
              <span className="text-indigo-400 text-sm font-medium">AI-Powered Tools</span>
            </div>
            <h1 className="text-4xl font-extrabold text-white mb-2">
              AI <span style={{ background: 'linear-gradient(135deg,#a78bfa,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Tools</span>
            </h1>
            <p className="text-gray-400 text-base">
              Supercharge your portfolio with generative AI. Create text, images, and voice in seconds.
            </p>
          </div>

          {/* API badges */}
          <div className="flex flex-wrap gap-3 mb-8">
            {[
              { label: 'Gemini 1.5 Flash', color: '#22d3ee', rgb: '34,211,238' },
              { label: 'Replicate Flux', color: '#a78bfa', rgb: '167,139,250' },
              { label: 'ElevenLabs TTS', color: '#f59e0b', rgb: '245,158,11' },
            ].map(b => (
              <span
                key={b.label}
                className="px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{ background: `rgba(${b.rgb},0.1)`, color: b.color, border: `1px solid rgba(${b.rgb},0.25)` }}
              >
                {b.label}
              </span>
            ))}
          </div>

          {/* 3 tool cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl">
            <TextGenerator />
            <ImageGenerator />
            <VoiceGenerator />
          </div>

          {/* Usage tip */}
          <div
            className="mt-8 max-w-6xl p-5 rounded-2xl flex items-center gap-4"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(34,211,238,0.1)' }}>
              <Wand2 size={15} className="text-cyan-400" />
            </div>
            <p className="text-gray-500 text-sm">
              <span className="text-gray-300 font-medium">Pro tip:</span> Use the Text Generator to write your professional bio, then paste it into the Craft Wizard's Details step.
              Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-xs text-gray-300 font-mono">Ctrl+Enter</kbd> to quickly submit text prompts.
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}
