"use client"

import { Activity, FileWarning, ScrollText, Shield, LogOut } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { logout } from "@/app/actions/auth"

export type TabId = "agents" | "threats" | "policy"

const tabs: { id: TabId; label: string; icon: LucideIcon; badge?: string }[] = [
  { id: "agents", label: "Active Agents", icon: Activity, badge: "6" },
  { id: "threats", label: "Threat Logs", icon: FileWarning, badge: "7" },
  { id: "policy", label: "Policy Rules", icon: ScrollText },
]

export function Sidebar({
  active,
  onChange,
}: {
  active: TabId
  onChange: (id: TabId) => void
}) {
  return (
    <aside className="flex h-full w-full flex-col gap-6 border-r border-border/60 bg-sidebar p-4 lg:w-64">
      <div className="flex items-center gap-2.5 px-2">
        <div className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Shield className="size-5" />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold tracking-tight">AegisMesh</p>
          <p className="text-xs text-muted-foreground">SOC Console</p>
        </div>
      </div>

      <nav className="flex flex-col gap-1" aria-label="Primary">
        <p className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Monitoring
        </p>
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = active === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex items-center justify-between rounded-md px-2.5 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
              )}
            >
              <span className="flex items-center gap-2.5">
                <Icon
                  className={cn(
                    "size-4",
                    isActive ? "text-primary" : "text-muted-foreground",
                  )}
                />
                {tab.label}
              </span>
              {tab.badge && (
                <span className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                  {tab.badge}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-3">
        <div className="rounded-md border border-border/60 bg-card/60 p-3">
          <div className="flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-success" />
            </span>
            <p className="text-xs font-medium">Mesh online</p>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            All sensors reporting. Last sync 2s ago.
          </p>
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
  )
}
