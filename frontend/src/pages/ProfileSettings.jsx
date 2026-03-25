import React, { useState } from 'react'
import axios from 'axios'
import { User, Mail, Lock, Save, Loader, AlertCircle } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
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
      const token = localStorage.getItem('token')
      const { data } = await axios.put('/api/auth/profile', form, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      const updatedUser = { ...user, ...data }
      localStorage.setItem('user', JSON.stringify(updatedUser))
      localStorage.setItem('token', data.token) // Update token if rotated
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
        <Header setMobileOpen={setMobileOpen} title="Profile Settings" />

        <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 sm:py-8">
          <div className="max-w-lg">
            <h2 className="text-white text-2xl sm:text-3xl font-bold mb-1">Profile Settings</h2>
            <p className="text-gray-400 text-xs sm:text-sm mb-8">Update your account information</p>

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
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  className="input-dark"
                  placeholder="Leave blank to keep current"
                />
              </div>

              {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400 text-sm animate-shake">
                  <AlertCircle size={18} />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={saving}
                className="btn-primary w-full sm:w-auto"
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
