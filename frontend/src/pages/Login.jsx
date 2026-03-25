import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff, LogIn, Layers, Loader } from 'lucide-react'
import axios from 'axios'
import ParticleBackground from '../components/ParticleBackground'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { data } = await axios.post('/api/auth/login', form)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data))
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#060d1a]">
      <ParticleBackground />

      <div className="relative z-10 w-full max-w-md px-4">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #22d3ee, #0ea5e9)',
                boxShadow: '0 0 20px rgba(34, 211, 238, 0.5)'
              }}
            >
              <Layers size={20} className="text-white" />
            </div>
            <span className="text-white text-2xl font-bold">
              Portfolio<span className="text-cyan-400">Maker</span>
            </span>
          </div>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8"
          style={{
            background: 'rgba(13, 21, 38, 0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(34, 211, 238, 0.15)',
            boxShadow: '0 25px 50px rgba(0,0,0,0.5), 0 0 60px rgba(34, 211, 238, 0.05)'
          }}
        >
          <h2 className="text-white text-2xl font-bold mb-1">Welcome back</h2>
          <p className="text-gray-400 text-sm mb-8">Sign in to your account to continue</p>

          {error && (
            <div
              className="flex items-center gap-2 p-3 rounded-xl mb-5 text-red-400 text-sm"
              style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)' }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-gray-300 text-sm font-medium block mb-2">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="input-dark"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="text-gray-300 text-sm font-medium block mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  className="input-dark pr-12"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full mt-2"
              style={{ opacity: loading ? 0.7 : 1 }}
            >
              {loading ? <Loader size={18} className="animate-spin" /> : <LogIn size={18} />}
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
