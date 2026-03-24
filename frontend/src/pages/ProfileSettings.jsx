import React, { useState } from 'react'
import { User, Mail, Lock, Save, Loader } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import ParticleBackground from '../components/ParticleBackground'

export default function ProfileSettings() {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const [form, setForm] = useState({ name: user.name || '', email: user.email || '' })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    await new Promise(r => setTimeout(r, 1200))
    localStorage.setItem('user', JSON.stringify({ ...user, ...form }))
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="flex h-screen bg-[#060d1a] overflow-hidden">
      <Sidebar />
      <ParticleBackground />

      <div className="flex-1 flex flex-col ml-64 relative" style={{ zIndex: 1 }}>
        <Header title="Profile Settings" />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-lg">
            <h2 className="text-white text-2xl font-bold mb-1">Profile Settings</h2>
            <p className="text-gray-400 text-sm mb-8">Update your account information</p>

            {/* Avatar */}
            <div className="flex items-center gap-5 mb-8">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #22d3ee, #6366f1)' }}
              >
                {(user.name || 'U')[0].toUpperCase()}
              </div>
              <div>
                <p className="text-white font-semibold text-lg">{user.name}</p>
                <p className="text-gray-400 text-sm">{user.email}</p>
                <button className="text-cyan-400 text-sm mt-1 hover:text-cyan-300 transition-colors">Change photo</button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSave} className="space-y-5">
              <div>
                <label className="text-gray-300 text-sm font-medium flex items-center gap-2 mb-2">
                  <User size={14} className="text-cyan-400" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="input-dark"
                />
              </div>

              <div>
                <label className="text-gray-300 text-sm font-medium flex items-center gap-2 mb-2">
                  <Mail size={14} className="text-cyan-400" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="input-dark"
                />
              </div>

              <div>
                <label className="text-gray-300 text-sm font-medium flex items-center gap-2 mb-2">
                  <Lock size={14} className="text-cyan-400" />
                  New Password
                </label>
                <input
                  type="password"
                  className="input-dark"
                  placeholder="Leave blank to keep current"
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:scale-105"
                style={{
                  background: saved
                    ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                    : 'linear-gradient(135deg, #22d3ee, #0ea5e9)',
                  boxShadow: '0 4px 15px rgba(34, 211, 238, 0.3)'
                }}
              >
                {saving ? <Loader size={18} className="animate-spin" /> : <Save size={18} />}
                {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
              </button>
            </form>

            {/* Danger zone */}
            <div
              className="mt-10 p-5 rounded-2xl"
              style={{
                background: 'rgba(239, 68, 68, 0.05)',
                border: '1px solid rgba(239, 68, 68, 0.15)'
              }}
            >
              <h3 className="text-red-400 font-semibold mb-1">Danger Zone</h3>
              <p className="text-gray-400 text-sm mb-4">Permanently delete your account and all data</p>
              <button className="text-red-400 text-sm font-medium hover:text-red-300 transition-colors">
                Delete Account
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
