'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, Shield, MessageSquare, Image as ImageIcon, BarChart3, Lock, Brain, Mail, TrendingUp, CheckCircle2, Palette } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

type ThemeColor = 'purple' | 'blue' | 'emerald' | 'orange' | 'pink'

interface ThemeConfig {
  name: string
  primary: string
  secondary: string
  glow: string
  bgGradient1: string
  bgGradient2: string
}

const themes: Record<ThemeColor, ThemeConfig> = {
  purple: {
    name: 'Purple Aurora',
    primary: 'from-purple-600 to-blue-600',
    secondary: 'text-purple-400',
    glow: 'rgba(139, 92, 246, 0.4)',
    bgGradient1: 'bg-purple-600/20',
    bgGradient2: 'bg-blue-600/15'
  },
  blue: {
    name: 'Cyber Blue',
    primary: 'from-blue-600 to-cyan-500',
    secondary: 'text-cyan-400',
    glow: 'rgba(6, 182, 212, 0.4)',
    bgGradient1: 'bg-blue-600/20',
    bgGradient2: 'bg-cyan-600/15'
  },
  emerald: {
    name: 'Emerald Shield',
    primary: 'from-emerald-600 to-teal-500',
    secondary: 'text-emerald-400',
    glow: 'rgba(16, 185, 129, 0.4)',
    bgGradient1: 'bg-emerald-600/20',
    bgGradient2: 'bg-teal-600/15'
  },
  orange: {
    name: 'Sunset Guard',
    primary: 'from-orange-600 to-red-500',
    secondary: 'text-orange-400',
    glow: 'rgba(249, 115, 22, 0.4)',
    bgGradient1: 'bg-orange-600/20',
    bgGradient2: 'bg-red-600/15'
  },
  pink: {
    name: 'Quantum Pink',
    primary: 'from-pink-600 to-rose-500',
    secondary: 'text-pink-400',
    glow: 'rgba(236, 72, 153, 0.4)',
    bgGradient1: 'bg-pink-600/20',
    bgGradient2: 'bg-rose-600/15'
  }
}

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [theme, setTheme] = useState<ThemeColor>('purple')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme-color') as ThemeColor
    if (savedTheme && themes[savedTheme]) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    localStorage.setItem('theme-color', theme)
  }, [theme, mounted])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const currentTheme = themes[theme]

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-slate-950 overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className={`absolute top-0 right-1/4 w-96 h-96 ${currentTheme.bgGradient1} rounded-full blur-3xl`}></div>
        <div className={`absolute bottom-1/4 left-1/3 w-96 h-96 ${currentTheme.bgGradient2} rounded-full blur-3xl`}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-slate-800/30 backdrop-blur-sm sticky top-0">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${currentTheme.primary} flex items-center justify-center`}>
              <Shield className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-bold text-white">Shield<span className={currentTheme.secondary}>AI</span></h1>
          </div>

          <nav className="hidden md:flex items-center gap-12">
            <a href="#features" className="text-slate-300 hover:text-white transition text-sm font-medium">Features</a>
            <a href="#how-it-works" className="text-slate-300 hover:text-white transition text-sm font-medium">How It Works</a>
            <a href="#what-we-detect" className="text-slate-300 hover:text-white transition text-sm font-medium">What We Detect</a>
            <a href="#about" className="text-slate-300 hover:text-white transition text-sm font-medium">About</a>
            <a href="#theme" className="text-slate-300 hover:text-white transition text-sm font-medium">Theme</a>
          </nav>

          <Link href="/analyzer">
            <Button className={`bg-gradient-to-r ${currentTheme.primary} hover:opacity-90 text-white border-0 px-6 transition-all`} style={{ boxShadow: `0 0 20px ${currentTheme.glow}` }}>
              Get Started
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 py-20 lg:py-28 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
          <div className="space-y-8">
            <div>
              <h2 className="text-6xl lg:text-7xl font-bold leading-tight mb-6">
                <span className="text-white">Protect Yourself</span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">from Scams & Fraud</span>
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed max-w-md">Advanced AI-powered analysis to detect phishing, deepfakes, and fraud indicators in seconds. Stay safe online.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/analyzer">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 text-base px-8 h-12 hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105" style={{ boxShadow: '0 0 30px rgba(139, 92, 246, 0.5)' }}>
                  Start Analyzing <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-base px-8 h-12 border-slate-700 text-slate-300 hover:bg-slate-900/50 hover:border-slate-600 transition-all duration-300 transform hover:scale-105">
                Learn More
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 pt-8">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-purple-400" />
                <div>
                  <p className="text-sm font-semibold text-white">AI Powered</p>
                  <p className="text-xs text-slate-400">Advanced Detection</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Lock className="w-6 h-6 text-blue-400" />
                <div>
                  <p className="text-sm font-semibold text-white">100% Private</p>
                  <p className="text-xs text-slate-400">Your data is secure</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <BarChart3 className="w-6 h-6 text-emerald-400" />
          <div>
            <h2 className="text-5xl font-bold mb-12 text-white text-center">About ShieldAI</h2>
            <p className="text-slate-300 leading-relaxed">
              ShieldAI is built to help individuals and businesses stay protected in an increasingly digital world where fraud is becoming more sophisticated. By combining advanced AI analysis with clear, human-friendly explanations, the platform doesn&apos;t just detect threats — it helps users understand them.
            </p>
          </div>
              </div>
            </div>
          </div>

          <div className="relative h-full min-h-[500px] lg:min-h-[600px] flex items-center justify-center" style={{ transform: `translateY(${scrollY * 0.3}px)` }}>
            <Image src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LAPA-lCqEofsyaO8Dj3SZgoN6XK7R6UdEIo.png" alt="Dashboard" width={800} height={600} className="w-full h-auto drop-shadow-2xl" style={{ filter: 'drop-shadow(0 0 40px rgba(139, 92, 246, 0.4))' }} priority />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 container mx-auto px-4 py-24 border-t border-slate-800/30">
        <div className="mb-16 text-center">
          <h2 className="text-5xl font-bold mb-4 text-white">Powerful Features</h2>
          <p className="text-xl text-slate-400">Everything you need to stay protected</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="rounded-xl bg-gradient-to-br from-slate-900/40 to-slate-950/40 border border-slate-800/50 p-8 hover:border-purple-500/50 transition-all duration-500 group cursor-pointer transform hover:scale-105">
            <MessageSquare className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Text Analysis</h3>
            <p className="text-sm text-slate-400">Detect phishing attempts, urgency tactics, impersonation, and financial scams in emails, SMS, and chat messages. Breaks down suspicious patterns.</p>
          </div>

          <div className="rounded-xl bg-gradient-to-br from-slate-900/40 to-slate-950/40 border border-slate-800/50 p-8 hover:border-blue-500/50 transition-all duration-500 group cursor-pointer transform hover:scale-105">
            <ImageIcon className="w-8 h-8 text-blue-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Image Analysis</h3>
            <p className="text-sm text-slate-400">Identify AI-generated images, deepfakes, and manipulated media. Flags visual inconsistencies and synthetic patterns used in fraud.</p>
          </div>

          <div className="rounded-xl bg-gradient-to-br from-slate-900/40 to-slate-950/40 border border-slate-800/50 p-8 hover:border-emerald-500/50 transition-all duration-500 group cursor-pointer transform hover:scale-105">
            <BarChart3 className="w-8 h-8 text-emerald-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Risk Scoring</h3>
            <p className="text-sm text-slate-400">Every analysis includes a clear risk score from 0-100 with confidence levels. Quickly understand how dangerous content might be.</p>
          </div>

          <div className="rounded-xl bg-gradient-to-br from-slate-900/40 to-slate-950/40 border border-slate-800/50 p-8 hover:border-indigo-500/50 transition-all duration-500 group cursor-pointer transform hover:scale-105">
            <Lock className="w-8 h-8 text-indigo-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Explainable AI</h3>
            <p className="text-sm text-slate-400">Not just detection — explanation. Tells you why something is risky in simple, easy-to-understand language.</p>
          </div>
        </div>

        <div className="relative h-96 rounded-xl overflow-hidden">
          <Image src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IM2A.jfif-AudZzZsivozVw6JYHpZNyuyZLoNGFW.jpeg" alt="Security Features" fill className="object-cover rounded-xl" />
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative z-10 container mx-auto px-4 py-24 border-t border-slate-800/30">
        <div className="mb-16 text-center">
          <h2 className="text-5xl font-bold mb-4 text-white">How It Works</h2>
          <p className="text-xl text-slate-400">Simple 3-step process for your security</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/50">
                <span className="text-xl font-bold text-white">1</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Submit Content</h3>
                <p className="text-slate-400">Paste a suspicious message, email, or link — or upload an image you want to verify.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/50">
                <span className="text-xl font-bold text-white">2</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">AI Analysis</h3>
                <p className="text-slate-400">Our AI scans for known scam patterns including phishing signals, urgency tactics, fake links, impersonation, and manipulation indicators.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/50">
                <span className="text-xl font-bold text-white">3</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Get Results Instantly</h3>
                <p className="text-slate-400">Receive a detailed breakdown including risk score, red flags, explanations, and recommended actions — all within seconds.</p>
              </div>
            </div>
          </div>

          <div className="relative h-96 rounded-xl overflow-hidden">
            <Image src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IM1A.jfif-cDiGPnEcudmoxyNms3bNZp5Nm1rGSZ.jpeg" alt="Email Protection" fill className="object-cover rounded-xl" />
          </div>
        </div>
      </section>

      {/* What We Detect */}
      <section id="what-we-detect" className="relative z-10 container mx-auto px-4 py-24 border-t border-slate-800/30">
        <div className="mb-16 text-center">
          <h2 className="text-5xl font-bold mb-4 text-white">What We Detect</h2>
          <p className="text-xl text-slate-400">Comprehensive fraud and scam detection capabilities</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="rounded-lg bg-gradient-to-br from-slate-900/40 to-slate-950/40 border border-slate-800/50 p-6 hover:border-purple-500/50 transition-all">
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-white">Phishing Attempts</h3>
                <p className="text-sm text-slate-400 mt-1">Emails or messages designed to trick you into revealing passwords, banking details, or personal information.</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-gradient-to-br from-slate-900/40 to-slate-950/40 border border-slate-800/50 p-6 hover:border-blue-500/50 transition-all">
            <div className="flex items-start gap-4">
              <TrendingUp className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-white">Financial Fraud</h3>
                <p className="text-sm text-slate-400 mt-1">Fake investment offers, money requests, giveaway scams, and payment manipulation tactics.</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-gradient-to-br from-slate-900/40 to-slate-950/40 border border-slate-800/50 p-6 hover:border-emerald-500/50 transition-all">
            <div className="flex items-start gap-4">
              <Brain className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-white">Deepfakes & AI Content</h3>
                <p className="text-sm text-slate-400 mt-1">AI-generated faces, fake identities, and manipulated media used to deceive users.</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-gradient-to-br from-slate-900/40 to-slate-950/40 border border-slate-800/50 p-6 hover:border-indigo-500/50 transition-all">
            <div className="flex items-start gap-4">
              <ArrowRight className="w-6 h-6 text-indigo-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-white">Urgency & Pressure Tactics</h3>
                <p className="text-sm text-slate-400 mt-1">Messages that push you to act quickly — "Act now", "Limited time", "Account will be closed".</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative h-96 rounded-xl overflow-hidden">
          <Image src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IM4A.jfif-1Jogl7meuTdXqqIY8ZbsNJ4ky93Mgg.jpeg" alt="Security Shield" fill className="object-cover rounded-xl" />
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative z-10 container mx-auto px-4 py-24 border-t border-slate-800/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl font-bold mb-12 text-white text-center">About Scam Detector AI</h2>
          
          <div className="space-y-8 mb-12">
            <div>
              <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-purple-400" />
                Our Mission
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Scam Detector AI is built to help individuals and businesses stay protected in an increasingly digital world where fraud is becoming more sophisticated. By combining advanced AI analysis with clear, human-friendly explanations, the platform doesn&apos;t just detect threats — it helps users understand them.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                <Brain className="w-6 h-6 text-blue-400" />
                Our Goal
              </h3>
              <p className="text-slate-300 leading-relaxed">
                To make scam detection accessible, fast, and reliable for everyone — regardless of technical knowledge. We prioritize accuracy in detection, clarity in explanation, and privacy in every interaction. Because staying safe online shouldn&apos;t require expertise — just the right tool.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                <Lock className="w-6 h-6 text-emerald-400" />
                What Sets Us Apart
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Advanced AI models trained on millions of real-world fraud cases. Explainable analysis that shows you exactly why content is flagged. Zero data storage ensuring your privacy. Enterprise-grade protection made accessible to everyone.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6 border-t border-slate-800/30 pt-12">
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">10M+</div>
              <p className="text-slate-400">Content Analyzed</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">99.8%</div>
              <p className="text-slate-400">Accuracy Rate</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">50+</div>
              <p className="text-slate-400">Threat Types</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">24/7</div>
              <p className="text-slate-400">Protection</p>
            </div>
          </div>
        </div>
      </section>

      {/* Theme Customization Section */}
      <section id="theme" className="relative z-10 container mx-auto px-4 py-24 border-t border-slate-800/30">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Palette className="w-8 h-8 text-slate-300" />
              <h2 className="text-5xl font-bold text-white">Customize Your Theme</h2>
            </div>
            <p className="text-xl text-slate-400">Choose your preferred color scheme to personalize the interface</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {(Object.entries(themes) as [ThemeColor, ThemeConfig][]).map(([key, themeConfig]) => (
              <button
                key={key}
                onClick={() => setTheme(key)}
                className={`rounded-lg p-6 border-2 transition-all duration-300 transform hover:scale-105 ${
                  theme === key
                    ? `border-white bg-gradient-to-br ${themeConfig.primary}/20`
                    : 'border-slate-700 bg-slate-900/50 hover:border-slate-600'
                }`}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${themeConfig.primary} shadow-lg`}></div>
                  <span className="text-sm font-semibold text-white">{themeConfig.name}</span>
                  {theme === key && <span className="text-xs text-green-400 font-bold">ACTIVE</span>}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-12 p-8 rounded-lg bg-gradient-to-br from-slate-900/40 to-slate-950/40 border border-slate-800/50">
            <h3 className="text-lg font-bold text-white mb-3">How Theme Works</h3>
            <p className="text-slate-400">Your theme preference is saved locally and will persist across visits. The selected theme updates the accent colors throughout the website including buttons, icons, and visual highlights while maintaining the professional dark security aesthetic.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 container mx-auto px-4 py-24 border-t border-slate-800/30">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div>
            <h2 className="text-5xl lg:text-6xl font-bold mb-4 text-white">Ready to Stay Protected?</h2>
            <p className="text-xl text-slate-400">Start analyzing suspicious content now and make smarter decisions online.</p>
          </div>
          <Link href="/analyzer">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 text-lg px-12 transform hover:scale-110 transition-all duration-300" style={{ boxShadow: '0 0 40px rgba(139, 92, 246, 0.6)' }}>
              Start Analyzing Now <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  )
}
