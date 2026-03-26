import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Shield, Info, FileText, HelpCircle, BookOpen, Users, Briefcase } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import ParticleBackground from '../components/ParticleBackground'
import FloatingIconsBackground from '../components/FloatingIconsBackground'

const CONTENT_DATA = {
  about: {
    title: 'About PortfolioMaker',
    icon: Info,
    content: `
      At PortfolioMaker, we believe every professional deserves a stunning online presence. 
      Our mission is to simplify the way talent showcases their work using the power of Artificial Intelligence.
      
      Founded in 2026, we've helped over 50,000 developers, designers, and creatives land their dream jobs by 
      turning their resumes into interactive experiences.
    `,
    subtitle: 'Bringing AI to your professional journey.'
  },
  privacy: {
    title: 'Privacy Policy',
    icon: Shield,
    content: `
      Your privacy is our top priority. We only collect data that is essential for building your portfolio.
      
      - We never sell your personal information to third parties.
      - Your data is encrypted and stored securely on our cloud servers.
      - You have full control over what information is public or private.
    `,
    subtitle: 'Secure. Transparent. Private.'
  },
  terms: {
    title: 'Terms of Service',
    icon: FileText,
    content: `
      By using PortfolioMaker, you agree to build awesome things and showcase your talent fairly.
      
      - You own all the content you create.
      - We provide the platform and templates "as is".
      - Please do not use the platform for any illegal or harmful content.
    `,
    subtitle: 'The legal bit, made simple.'
  },
  help: {
    title: 'Help Center',
    icon: HelpCircle,
    content: `
      Need help with your portfolio? We've got you covered.
      
      - Check out our video tutorials in the Documentation.
      - Reach out to our 24/7 support team via the chat bubble.
      - Join our Discord community for instant peer-to-peer help.
    `,
    subtitle: 'We are here to help you succeed.'
  },
  docs: {
    title: 'Documentation',
    icon: BookOpen,
    content: `
      Learn how to master every feature of PortfolioMaker.
      
      - Getting Started: 3 Simple Steps to your first portfolio.
      - Customizing Templates: How to use our advanced CSS editor.
      - AI Generation: Mastering prompts for better bios.
    `,
    subtitle: 'Your guide to building like a pro.'
  },
  careers: {
    title: 'Join the Team',
    icon: Briefcase,
    content: `
      We are always looking for visionary developers and designers.
      
      - Remote-First: Work from anywhere in the world.
      - Innovation: Shape the future of AI-driven career tools.
      - Ownership: Every team member has a voice in our roadmap.
    `,
    subtitle: 'Help us redefine the professional web.'
  },
  community: {
    title: 'Community',
    icon: Users,
    content: `
      Join a global network of top-tier professionals.
      
      - Monthly Challenges: Compete for premium template unlocks.
      - Peer Reviews: Get feedback on your portfolio from experts.
      - Networking: Connect with recruiters directly in our hubs.
    `,
    subtitle: 'Grow together with the best.'
  }
}

export default function StaticContent() {
  const { type } = useParams()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const data = CONTENT_DATA[type] || CONTENT_DATA.about

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [type])

  return (
    <div className="flex min-h-screen bg-[#060d1a]" style={{ 
      backgroundImage: 'url("/images/bg_main.png")',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center'
    }}>
      <div className="fixed inset-0 bg-[#060d1a]/85 backdrop-blur-[2px] pointer-events-none" />
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <ParticleBackground />
      <FloatingIconsBackground />

      <div className="flex-1 flex flex-col lg:ml-64 relative" style={{ zIndex: 1 }}>
        <main className="flex-1 overflow-y-auto px-4 sm:px-12 py-10 sm:py-16">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-all mb-10 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Go Back</span>
          </button>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl mb-6" 
              style={{ background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.2)' }}>
              <data.icon size={18} className="text-cyan-400" />
              <span className="text-cyan-400 text-sm font-bold uppercase tracking-widest">{type.replace('-', ' ')}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white mb-4 leading-tight">
              {data.title}
            </h1>
            <p className="text-xl text-gray-400 font-medium mb-12">
              {data.subtitle}
            </p>

            <div className="p-8 sm:p-12 rounded-[2rem] sm:rounded-[2.5rem] relative overflow-hidden" 
              style={{ 
                background: 'rgba(13,21,38,0.7)', 
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(30px)'
              }}>
              <div 
                className="absolute inset-0 z-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage: 'url("/images/bg_card.png")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="relative z-10 prose prose-invert max-w-none">
                <div className="whitespace-pre-line text-gray-300 text-lg leading-relaxed">
                  {data.content}
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  )
}
