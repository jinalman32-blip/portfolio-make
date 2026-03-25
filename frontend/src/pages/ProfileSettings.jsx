import React, { useState } from 'react'
import api from '../api/api'
import { User, Mail, Lock, Save, Loader, AlertCircle, LogOut } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import ParticleBackground from '../components/ParticleBackground'

export default function ProfileSettings() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'))
  const [mobileOpen, setMobileOpen] = useState(false)
  const [form, setForm] = useState({ name: user.name || '', email: user.email || '', password: '' })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const { data } = await api.put('/api/auth/profile', form)
      const { token: newToken, ...userInfo } = data
      const updatedUser = { ...user, ...userInfo }
      localStorage.setItem('user', JSON.stringify(updatedUser))
      if (newToken) localStorage.setItem('token', newToken)
      setUser(updatedUser)
      setSaved(true)
      setTimeout(() => {
        setSaved(false)
        window.location.reload()
      }, 1500)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex h-screen bg-[#060d1a] overflow-hidden">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <ParticleBackground />

      <div className="flex-1 flex flex-col lg:ml-64 relative" style={{ zIndex: 1 }}>

        <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 sm:py-8">
          <div className="max-w-lg mx-auto lg:mx-0">
            <h2 className="text-white text-2xl sm:text-3xl font-bold mb-1">Profile Settings</h2>
            <p className="text-gray-400 text-xs sm:text-sm mb-8">Update your account information</p>

            {/* Avatar */}
            <div className="flex items-center gap-5 mb-8">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-xl"
                style={{ background: 'linear-gradient(135deg, #22d3ee, #6366f1)', border: '1px solid rgba(255,255,255,0.1)' }}
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
            <form onSubmit={handleSave} className="space-y-6">
              <div className="space-y-2">
                <label className="text-gray-300 text-sm font-medium flex items-center gap-2">
                  <User size={14} className="text-cyan-400" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Enter your name"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-300 text-sm font-medium flex items-center gap-2">
                  <Mail size={14} className="text-cyan-400" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="Enter your email"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-300 text-sm font-medium flex items-center gap-2">
                  <Lock size={14} className="text-cyan-400" />
                  New Password
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                  placeholder="Leave blank to keep current"
                />
              </div>

              {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400 text-sm animate-shake">
                  <AlertCircle size={18} />
                  {error}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all transform active:scale-95 disabled:opacity-50"
                  style={{
                    background: saved
                      ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                      : 'linear-gradient(135deg, #22d3ee, #0ea5e9)',
                    boxShadow: saved ? '0 4px 15px rgba(34, 197, 94, 0.3)' : '0 4px 15px rgba(34, 211, 238, 0.3)'
                  }}
                >
                  {saving ? <Loader size={18} className="animate-spin" /> : <Save size={18} />}
                  {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
                </button>
              </div>

              {/* Sign Out Action */}
              <div className="mt-8 pt-8 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm("Are you sure you want to sign out?")) {
                      localStorage.removeItem('token');
                      localStorage.removeItem('user');
                      window.location.href = '/';
                    }
                  }}
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all font-semibold"
                >
                  <LogOut size={18} />
                  Sign Out of Account
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}
