'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Lock, Fingerprint, Activity, Network, ArrowRight, ShieldCheck, User } from 'lucide-react'
import { login } from '@/app/actions/auth'

type Role = 'admin' | 'officer'

export default function LoginPageAlt() {
  const [role, setRole] = useState<Role>('officer')
  const [password, setPassword] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoggingIn(true)
    await new Promise(resolve => setTimeout(resolve, 800))
    await login(role)
  }

  return (
    <div className="flex min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-blue-500/30">
      
      {/* Left Panel - Branding & Visuals */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-950 border-r border-white/5 flex-col justify-between p-12">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-900/20 via-[#050505] to-[#050505]" />
          {/* Animated network lines simulation */}
          <motion.div 
            animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
            transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
            }}
          />
        </div>

        {/* Top Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">AegisMesh</span>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl font-semibold text-white tracking-tight leading-tight mb-6">
              Next-generation threat detection & mitigation.
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              Monitor, analyze, and neutralize network anomalies in real-time. Secure your distributed infrastructure with enterprise-grade SOC tools.
            </p>
            
            <div className="flex items-center gap-6 text-sm text-slate-500 font-mono">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-500" />
                System Active
              </div>
              <div className="flex items-center gap-2">
                <Network className="w-4 h-4 text-blue-500" />
                99.9% Uptime
              </div>
            </div>
          </motion.div>
        </div>

        <div className="relative z-10 text-xs text-slate-600 font-mono">
          &copy; {new Date().getFullYear()} AegisMesh Systems. All rights reserved.
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
        
        {/* Subtle glow behind form */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[150px] opacity-20 pointer-events-none transition-colors duration-1000 ${role === 'admin' ? 'bg-amber-500' : 'bg-blue-500'}`} />

        <div className="w-full max-w-sm relative z-10">
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">AegisMesh</span>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-2">Welcome back</h2>
            <p className="text-slate-400 mb-8">Enter your credentials to access the SOC terminal.</p>

            {/* Clean Segmented Control for Roles */}
            <div className="flex p-1 bg-slate-900 rounded-lg mb-8 border border-white/5">
              <button
                type="button"
                onClick={() => setRole('officer')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-md transition-all ${
                  role === 'officer' 
                    ? 'bg-slate-800 text-white shadow-sm border border-white/10' 
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <User className="w-4 h-4" />
                Officer
              </button>
              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-md transition-all ${
                  role === 'admin' 
                    ? 'bg-slate-800 text-white shadow-sm border border-white/10' 
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                Admin
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">
                  {role === 'admin' ? 'Administrator ID' : 'Officer ID'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Fingerprint className="h-4 w-4 text-slate-500" />
                  </div>
                  <input 
                    type="text" 
                    defaultValue={role === 'admin' ? 'ADM-001' : 'OFC-924'}
                    readOnly
                    className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-white/10 rounded-lg text-slate-300 focus:outline-none focus:border-slate-500 transition-colors cursor-not-allowed opacity-70"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-300">Authorization Code</label>
                  <a href="#" className="text-xs text-blue-500 hover:text-blue-400 transition-colors">Forgot code?</a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-slate-500" />
                  </div>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-white/10 rounded-lg text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoggingIn}
                className={`w-full flex items-center justify-center gap-2 py-3 px-4 mt-6 text-white font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:opacity-70 disabled:cursor-not-allowed
                  ${role === 'admin' 
                    ? 'bg-amber-600 hover:bg-amber-500 focus:ring-amber-500' 
                    : 'bg-blue-600 hover:bg-blue-500 focus:ring-blue-500'
                  }`}
              >
                {isLoggingIn ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  >
                    <Activity className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <>
                    Connect to Terminal
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
