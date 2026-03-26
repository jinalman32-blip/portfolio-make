import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Layers, FolderOpen, Settings,
  Menu, X, Sparkles, ChevronRight, Home, LayoutTemplate, Wand2, LogOut
} from 'lucide-react'

const menuItems = [
  { icon: Home, label: 'Home', path: '/home' },
  { icon: Sparkles, label: 'Portfolio Generator', path: '/dashboard' },
  { icon: FolderOpen, label: 'My Portfolios', path: '/portfolios' },
  { icon: LayoutTemplate, label: 'Templates', path: '/templates' },
  { icon: Settings, label: 'Profile Settings', path: '/profile' },
]

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const [hoveredPath, setHoveredPath] = useState(null)

  return (
    <aside
      className={`fixed left-0 top-0 h-full z-40 flex flex-col transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      } ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
      style={{
        background: 'linear-gradient(180deg, #0d1526 0%, #060e20 50%, #040b18 100%)',
        borderRight: '1px solid rgba(34, 211, 238, 0.1)'
      }}
    >
      <style>{`
        @keyframes sidebarIconFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-5px); }
        }
        @keyframes sidebarIconPop {
          0%   { transform: translateY(0px) scale(1) rotate(0deg); }
          20%  { transform: translateY(-10px) scale(1.25) rotate(-12deg); }
          45%  { transform: translateY(-14px) scale(1.15) rotate(8deg); }
          70%  { transform: translateY(-8px) scale(1.1) rotate(-4deg); }
          100% { transform: translateY(0px) scale(1) rotate(0deg); }
        }
        .sidebar-icon-wrap {
          display: inline-flex;
          animation: sidebarIconFloat 3s ease-in-out infinite;
        }
        .sidebar-icon-wrap.hovered {
          animation: sidebarIconPop 0.55s ease forwards;
        }
      `}</style>
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-cyan-500/10">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #22d3ee, #0ea5e9)',
                boxShadow: '0 0 15px rgba(34, 211, 238, 0.5)'
              }}
            >
              <Layers size={16} className="text-white" />
            </div>
            <span className="font-bold text-white text-lg tracking-tight">
              Portfolio<span className="text-cyan-400">Maker</span>
            </span>
          </div>
        )}
        <button
          onClick={() => {
            if (window.innerWidth < 1024) {
              setMobileOpen(false)
            } else {
              setCollapsed(!collapsed)
            }
          }}
          className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all"
        >
          {collapsed || (window.innerWidth < 1024 && !mobileOpen) ? <Menu size={18} /> : <X size={18} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[-1] lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          return (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path)
                if (window.innerWidth < 1024) setMobileOpen(false)
              }}
              onMouseEnter={() => setHoveredPath(item.path)}
              onMouseLeave={() => setHoveredPath(null)}
              className={`sidebar-item w-full ${isActive ? 'active' : ''} ${collapsed ? 'justify-center px-3' : ''}`}
              title={collapsed ? item.label : ''}
            >
              <span
                className={`sidebar-icon-wrap${hoveredPath === item.path ? ' hovered' : ''}`}
                style={{ animationDelay: `${menuItems.indexOf(item) * 0.4}s` }}
              >
                <Icon
                  size={20}
                  className={`flex-shrink-0 transition-colors ${isActive ? 'text-cyan-400' : ''}`}
                  style={isActive ? { filter: 'drop-shadow(0 0 6px rgba(34, 211, 238, 0.6))' } : {}}
                />
              </span>
              {!collapsed && (
                <>
                  <span className="flex-1 text-sm font-medium">{item.label}</span>
                  {isActive && <ChevronRight size={14} className="text-cyan-400/60" />}
                </>
              )}
            </button>
          )
        })}
      </nav>

      {/* User Profile / Auth Actions */}
      <div className="mt-auto">
        {(() => {
          const token = localStorage.getItem('token');
          const userStr = localStorage.getItem('user');
          let user = {};
          try { user = JSON.parse(userStr || '{}'); } catch (e) {}
          
          if (token && userStr) {
            const initial = (user.name || 'U')[0].toUpperCase();
            return (
              <>
                <div className="px-3 py-4 border-t border-cyan-500/10">
                  <div className="flex items-center gap-3 px-2">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #22d3ee, #6366f1)', boxShadow: '0 0 10px rgba(34,211,238,0.2)' }}
                    >
                      {initial}
                    </div>
                    {!collapsed && (
                      <div className="min-w-0">
                        <p className="text-white text-sm font-medium truncate">{user.name || 'User'}</p>
                        <p className="text-gray-500 text-xs truncate">{user.email}</p>
                      </div>
                    )}
                  </div>
                </div>
                {/* Logout Button */}
                <div className="px-3 py-4 border-t border-cyan-500/10">
                  <button
                    onClick={() => {
                      if (window.confirm("Are you sure you want to log out?")) {
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        navigate('/login');
                      }
                    }}
                    className={`flex items-center gap-3 w-full p-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors ${collapsed ? 'justify-center' : ''}`}
                    title={collapsed ? 'Logout' : ''}
                  >
                    <LogOut size={18} className="flex-shrink-0" />
                    {!collapsed && <span className="text-sm font-medium">Log Out</span>}
                  </button>
                </div>
              </>
            );
          }

          // Not Logged In
          return (
            <div className="px-3 py-4 border-t border-cyan-500/10 flex flex-col gap-2">
              <button
                onClick={() => navigate('/login')}
                className={`flex items-center gap-3 w-full p-2 rounded-lg text-white hover:bg-white/5 transition-colors ${collapsed ? 'justify-center' : ''}`}
                title={collapsed ? 'Log In' : ''}
              >
                <LogOut size={18} className="flex-shrink-0" style={{ transform: 'rotate(180deg)' }} />
                {!collapsed && <span className="text-sm font-medium">Log In</span>}
              </button>
              {!collapsed && (
                <button
                  onClick={() => navigate('/register')}
                  className="w-full p-2 rounded-lg text-sm font-bold text-white transition-all hover:opacity-90 mt-1"
                  style={{ background: 'linear-gradient(135deg, #0ea5e9, #22d3ee)' }}
                >
                  Create Account
                </button>
              )}
            </div>
          );
        })()}
      </div>
    </aside>
  )
}
