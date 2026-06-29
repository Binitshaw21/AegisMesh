"use client"

import { Key, Mail, ShieldAlert, Smartphone, User } from "lucide-react"

export function ProfileView() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Profile Card */}
        <div className="w-full md:w-1/3 space-y-4">
          <div className="rounded-lg border border-border/60 bg-card p-6 flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-primary/50 flex items-center justify-center mb-4">
              <User className="w-12 h-12 text-slate-400" />
            </div>
            <h2 className="text-xl font-semibold mb-1">Officer Default</h2>
            <p className="text-sm text-primary mb-4 font-medium">SOC Analyst Level II</p>
            <div className="w-full bg-secondary/50 rounded-md p-3 text-xs text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">ID:</span>
                <span className="font-mono text-foreground">OFC-924</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Clearance:</span>
                <span className="text-amber-500 font-semibold">Tier 2 Restricted</span>
              </div>
            </div>
          </div>
        </div>

        {/* Details & Security */}
        <div className="w-full md:w-2/3 space-y-6">
          <div className="rounded-lg border border-border/60 bg-card p-6">
            <h3 className="font-medium text-lg mb-4">Personal Information</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm text-muted-foreground">First Name</label>
                  <input type="text" defaultValue="John" className="w-full bg-secondary/50 border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm text-muted-foreground">Last Name</label>
                  <input type="text" defaultValue="Doe" className="w-full bg-secondary/50 border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm text-muted-foreground">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                  <input type="email" defaultValue="officer@aegismesh.local" className="w-full bg-secondary/50 border border-border rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
              </div>
              <button type="button" className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
                Save Changes
              </button>
            </form>
          </div>

          <div className="rounded-lg border border-border/60 bg-card p-6">
            <h3 className="font-medium text-lg mb-4">Security Settings</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-border/40 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-secondary rounded-md">
                    <Key className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Update Passcode</p>
                    <p className="text-xs text-muted-foreground">Last changed 45 days ago</p>
                  </div>
                </div>
                <button className="text-sm font-medium text-primary hover:underline">Change</button>
              </div>

              <div className="flex items-center justify-between p-4 border border-border/40 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-secondary rounded-md">
                    <Smartphone className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Two-Factor Authentication (2FA)</p>
                    <p className="text-xs text-muted-foreground">Secure your account with TOTP</p>
                  </div>
                </div>
                <button className="px-3 py-1.5 bg-secondary hover:bg-secondary/80 text-xs font-medium rounded-md transition-colors">
                  Enable
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
