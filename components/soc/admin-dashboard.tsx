"use client"

import { useState } from "react"
import { Users, UserCheck, Activity, ShieldAlert, LogOut, Shield, FileText, Database } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { logout } from "@/app/actions/auth"

type TabId = "overview" | "interactions" | "analytics"

const tabs: { id: TabId; label: string; icon: LucideIcon }[] = [
  { id: "overview", label: "User Overview", icon: Users },
  { id: "interactions", label: "User Interactions", icon: Activity },
  { id: "analytics", label: "Data Analytics", icon: Database },
]

function StatCard({ icon: Icon, label, value, accent }: { icon: LucideIcon; label: string; value: string; accent: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-card px-4 py-3">
      <div className={`flex size-9 items-center justify-center rounded-md ${accent}`}>
        <Icon className="size-4" />
      </div>
      <div>
        <p className="font-mono text-lg font-semibold leading-none tabular-nums">{value}</p>
        <p className="mt-1 text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  )
}

// Mock User Data
const mockUsers = [
  { id: "ADM-001", name: "Alice Security", role: "Admin", lastLogin: "2 mins ago", status: "Online" },
  { id: "OFC-924", name: "Bob Officer", role: "Officer", lastLogin: "1 hr ago", status: "Online" },
  { id: "OFC-112", name: "Charlie Watch", role: "Officer", lastLogin: "5 hrs ago", status: "Offline" },
  { id: "ADM-002", name: "Diana Core", role: "Admin", lastLogin: "1 day ago", status: "Offline" },
]

const mockInteractions = [
  { time: "10:42 AM", user: "Alice Security", action: "Updated Firewall Policy POL-007", severity: "high" },
  { time: "09:15 AM", user: "Bob Officer", action: "Viewed Threat Logs for 'shadow-agent-x'", severity: "low" },
  { time: "08:30 AM", user: "Bob Officer", action: "Generated SOC Incident Report", severity: "medium" },
  { time: "Yesterday", user: "Charlie Watch", action: "Quarantined 'vision-pipeline-3'", severity: "high" },
]

export function AdminDashboard() {
  const [active, setActive] = useState<TabId>("overview")

  return (
    <div className="flex min-h-svh flex-col lg:flex-row bg-[#0b1220] text-slate-200">
      {/* Inline Sidebar for Admin */}
      <aside className="flex h-full w-full flex-col gap-6 border-r border-border/60 bg-sidebar p-4 lg:w-64">
        <div className="flex items-center gap-2.5 px-2">
          <div className="flex size-9 items-center justify-center rounded-md bg-amber-500 text-slate-900">
            <ShieldAlert className="size-5" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold tracking-tight text-white">AegisMesh</p>
            <p className="text-xs text-amber-500 font-medium">Admin Console</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1">
          <p className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Administration
          </p>
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = active === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={cn(
                  "flex items-center justify-between rounded-md px-2.5 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-amber-500/10 text-amber-500"
                    : "text-muted-foreground hover:bg-slate-800 hover:text-slate-200"
                )}
              >
                <span className="flex items-center gap-2.5">
                  <Icon className={cn("size-4", isActive ? "text-amber-500" : "text-muted-foreground")} />
                  {tab.label}
                </span>
              </button>
            )
          })}
        </nav>

        <div className="mt-auto flex flex-col gap-3">
          <div className="rounded-md border border-amber-500/20 bg-amber-500/5 p-3">
            <div className="flex items-center gap-2">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-amber-500 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-amber-500" />
              </span>
              <p className="text-xs font-medium text-amber-500">Admin Mode Active</p>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Full system access granted.</p>
          </div>
          
          <button
            onClick={() => logout()}
            className="flex w-full items-center justify-center gap-2 rounded-md border border-destructive/20 bg-destructive/10 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/20"
          >
            <LogOut className="size-4" />
            Disconnect Session
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden">
        <header className="flex flex-col gap-1 border-b border-border/60 px-6 py-5">
          <h1 className="text-xl font-semibold tracking-tight text-white capitalize">
            {active.replace('-', ' ')}
          </h1>
          <p className="text-sm text-muted-foreground">
            {active === 'overview' && 'Overview of all personnel and roles.'}
            {active === 'interactions' && 'Audit log of user actions and commands.'}
            {active === 'analytics' && 'System usage and engagement analytics.'}
          </p>
        </header>

        <div className="space-y-6 p-6">
          <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <StatCard icon={Users} label="Total Users" value="24" accent="bg-blue-500/15 text-blue-500" />
            <StatCard icon={UserCheck} label="Active Now" value="2" accent="bg-success/15 text-success" />
            <StatCard icon={Activity} label="Actions (24h)" value="1,492" accent="bg-purple-500/15 text-purple-500" />
            <StatCard icon={Database} label="Data Queries" value="8,102" accent="bg-amber-500/15 text-amber-500" />
          </section>

          {active === "overview" && (
            <div className="rounded-lg border border-border/60 bg-card">
              <div className="p-4 border-b border-border/60">
                <h2 className="font-medium text-white">Personnel Directory</h2>
              </div>
              <div className="p-0">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-slate-900/50 text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3">User ID</th>
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Role</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Last Login</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockUsers.map((u, i) => (
                      <tr key={i} className="border-b border-border/60 hover:bg-slate-900/50">
                        <td className="px-4 py-3 font-mono text-muted-foreground">{u.id}</td>
                        <td className="px-4 py-3 font-medium text-white">{u.name}</td>
                        <td className="px-4 py-3">
                          <span className={cn("px-2 py-1 rounded text-xs", u.role === 'Admin' ? 'bg-amber-500/10 text-amber-500' : 'bg-blue-500/10 text-blue-400')}>
                            {u.role}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={cn("flex items-center gap-1.5", u.status === 'Online' ? 'text-success' : 'text-muted-foreground')}>
                            <span className={cn("size-1.5 rounded-full", u.status === 'Online' ? 'bg-success' : 'bg-muted-foreground')} />
                            {u.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">{u.lastLogin}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {active === "interactions" && (
            <div className="rounded-lg border border-border/60 bg-card">
              <div className="p-4 border-b border-border/60">
                <h2 className="font-medium text-white">Audit Log: User Actions</h2>
              </div>
              <div className="p-4 space-y-4">
                {mockInteractions.map((interaction, i) => (
                  <div key={i} className="flex items-start gap-4 p-3 rounded-md bg-slate-900/50 border border-white/5">
                    <div className="mt-0.5">
                      {interaction.severity === 'high' ? <ShieldAlert className="size-4 text-amber-500" /> : <FileText className="size-4 text-blue-400" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{interaction.user}</p>
                      <p className="text-sm text-slate-400">{interaction.action}</p>
                    </div>
                    <div className="text-xs text-muted-foreground">{interaction.time}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {active === "analytics" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="rounded-lg border border-border/60 bg-card p-6 flex flex-col items-center justify-center min-h-[300px]">
                <Database className="size-10 text-slate-600 mb-4" />
                <h3 className="text-lg font-medium text-white">System Usage Analytics</h3>
                <p className="text-sm text-slate-400 text-center mt-2 max-w-sm">
                  Detailed analytics charts would render here, showing queries per second, user retention, and feature engagement metrics over time.
                </p>
              </div>
              <div className="rounded-lg border border-border/60 bg-card p-6 flex flex-col items-center justify-center min-h-[300px]">
                <Activity className="size-10 text-slate-600 mb-4" />
                <h3 className="text-lg font-medium text-white">Access Patterns</h3>
                <p className="text-sm text-slate-400 text-center mt-2 max-w-sm">
                  Geolocation mapping and IP access tracking visualization to ensure no unauthorized offshore access.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
