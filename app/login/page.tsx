'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, ShieldAlert, Key, User, ArrowRight, Lock, Fingerprint, Eye, EyeOff, Loader2 } from 'lucide-react'
import { login } from '@/app/actions/auth'

type Role = 'admin' | 'officer'

export default function LoginPage() {
  const [role, setRole] = useState<Role>('officer')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoggingIn(true)
    
    // Simulate network delay for effect
    await new Promise(resolve => setTimeout(resolve, 800))
    
    await login(role)
  }

  return (
    <div className="relative min-h-screen bg-[#0b1220] flex items-center justify-center overflow-hidden font-sans text-slate-200">
      
      {/* Background Animated Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
        
        {/* Futuristic grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`, 
            backgroundSize: '40px 40px' 
          }} 
        />
      </div>

      <div className="relative z-10 w-full max-w-md p-6">
        
        {/* Header section */}
        <div className="mb-10 text-center">
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 1 }}
            className="w-20 h-20 mx-auto mb-6 relative flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-blue-500/20 rounded-xl blur-xl" />
            <div className="relative w-full h-full bg-slate-900/50 border border-white/10 rounded-xl flex items-center justify-center backdrop-blur-md shadow-2xl">
              <Shield className="w-10 h-10 text-blue-400" />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2">AegisMesh SOC</h1>
            <p className="text-sm text-slate-400">Restricted Access System</p>
          </motion.div>
        </div>

        {/* Login Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="backdrop-blur-xl bg-slate-900/60 border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative"
        >
          {/* Top glow border */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
          
          <div className="p-8">
            {/* Role Selection */}
            <div className="flex p-1 bg-slate-950/50 rounded-lg mb-8 relative border border-white/5">
              <button
                type="button"
                onClick={() => setRole('officer')}
                className={`relative z-10 flex-1 py-2.5 text-sm font-medium transition-colors ${role === 'officer' ? 'text-white' : 'text-slate-400 hover:text-slate-300'}`}
              >
                <div className="flex items-center justify-center gap-2">
                  <User className="w-4 h-4" />
                  Officer
                </div>
              </button>
              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`relative z-10 flex-1 py-2.5 text-sm font-medium transition-colors ${role === 'admin' ? 'text-white' : 'text-slate-400 hover:text-slate-300'}`}
              >
                <div className="flex items-center justify-center gap-2">
                  <ShieldAlert className="w-4 h-4" />
                  Admin
                </div>
              </button>
              
              {/* Sliding background for toggle */}
              <div 
                className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-slate-800 rounded-md shadow-sm transition-transform duration-300 ease-in-out border border-white/10"
                style={{ transform: `translateX(${role === 'admin' ? '100%' : '0%'})`, left: '4px' }}
              />
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Conditional ID Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {role === 'admin' ? 'Admin ID' : 'Officer ID'}
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400 transition-colors">
                    <Fingerprint className="h-5 w-5" />
                  </div>
                  <input 
                    type="text" 
                    defaultValue={role === 'admin' ? 'ADM-001' : 'OFC-924'}
                    readOnly
                    className="block w-full pl-10 pr-3 py-2.5 bg-slate-950/50 border border-white/10 rounded-lg text-slate-200 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all cursor-not-allowed opacity-80"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Passcode
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400 transition-colors">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter clearance code..."
                    required
                    className="block w-full pl-10 pr-10 py-2.5 bg-slate-950/50 border border-white/10 rounded-lg text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <div className="pt-2">
                <button 
                  type="submit" 
                  disabled={isLoggingIn}
                  className={`relative group w-full flex items-center justify-center gap-2 py-3 px-4 text-white font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed ${
                    role === 'admin' 
                      ? 'bg-amber-600 hover:bg-amber-500 focus:ring-amber-500' 
                      : 'bg-blue-600 hover:bg-blue-500 focus:ring-blue-500'
                  }`}
                >
                  <div className={`absolute inset-0 w-full h-full group-hover:scale-105 transition-transform duration-300 bg-gradient-to-r ${
                    role === 'admin' ? 'from-amber-600 to-orange-500' : 'from-blue-600 to-blue-400'
                  }`} />
                  <span className="relative z-10 flex items-center gap-2">
                    {isLoggingIn ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Authenticating...
                      </>
                    ) : (
                      <>
                        Initialize Session
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                </button>
              </div>
            </form>
          </div>
          
          {/* Decorative bottom bar based on role */}
          <div className="h-1 w-full flex">
            <AnimatePresence mode="wait">
              <motion.div 
                key={role}
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.5 }}
                className={`h-full ${role === 'admin' ? 'bg-amber-500' : 'bg-blue-500'}`}
              />
            </AnimatePresence>
          </div>
        </motion.div>
        
        {/* Footer info */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center text-xs text-slate-500"
        >
          <p>UNAUTHORIZED ACCESS IS STRICTLY PROHIBITED.</p>
          <p className="mt-1 flex items-center justify-center gap-1">
            <Key className="w-3 h-3" /> Secure connection established
          </p>
        </motion.div>
      </div>
    </div>
  )
}
