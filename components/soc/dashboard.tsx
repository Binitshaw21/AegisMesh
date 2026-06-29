"use client"

import { useState } from "react"
import { Ban, Bot, Radar, ShieldCheck } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Sidebar, type TabId } from "@/components/soc/sidebar"
import { ThreatsChart } from "@/components/soc/threats-chart"
import { RequestsTable } from "@/components/soc/requests-table"
import { AgentsView } from "@/components/soc/agents-view"
import { PolicyView } from "@/components/soc/policy-view"
import { BillingView } from "@/components/soc/billing-view"
import { ProfileView } from "@/components/soc/profile-view"
import { SupportView } from "@/components/soc/support-view"
import {
  activeAgents,
  networkRequests,
  threatTimeline,
} from "@/lib/soc-data"

const titles: Record<TabId, { title: string; subtitle: string }> = {
  agents: {
    title: "Active Agents",
    subtitle: "Live AI agents connected to the AegisMesh network.",
  },
  threats: {
    title: "Threat Logs",
    subtitle: "Recent AI agent network requests and enforcement decisions.",
  },
  policy: {
    title: "Policy Rules",
    subtitle: "Enforcement rules governing agent network behavior.",
  },
  billing: {
    title: "Billing & Subscriptions",
    subtitle: "Manage your AegisMesh plan and resource limits.",
  },
  profile: {
    title: "Officer Profile",
    subtitle: "Manage your personal credentials and security settings.",
  },
  support: {
    title: "Help & Support",
    subtitle: "Knowledge base, technical docs, and live support.",
  },
}

function StatCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: LucideIcon
  label: string
  value: string
  accent: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-card px-4 py-3">
      <div
        className={`flex size-9 items-center justify-center rounded-md ${accent}`}
      >
        <Icon className="size-4" />
      </div>
      <div>
        <p className="font-mono text-lg font-semibold leading-none tabular-nums">
          {value}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  )
}

export function Dashboard() {
  const [active, setActive] = useState<TabId>("threats")
  const { title, subtitle } = titles[active]

  const totalBlocked = threatTimeline.reduce((s, p) => s + p.blocked, 0)
  const totalAllowed = threatTimeline.reduce((s, p) => s + p.allowed, 0)
  const quarantined = activeAgents.filter(
    (a) => a.status === "quarantined",
  ).length

  return (
    <div className="flex min-h-svh flex-col lg:flex-row">
      <Sidebar active={active} onChange={setActive} />

      <main className="flex-1 overflow-x-hidden">
        <header className="flex flex-col gap-1 border-b border-border/60 px-6 py-5">
          <h1 className="text-xl font-semibold tracking-tight text-balance">
            {title}
          </h1>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </header>

        <div className="space-y-6 p-6">
          <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <StatCard
              icon={Bot}
              label="Active agents"
              value={String(activeAgents.length)}
              accent="bg-primary/15 text-primary"
            />
            <StatCard
              icon={Ban}
              label="Blocked (24h)"
              value={String(totalBlocked)}
              accent="bg-destructive/15 text-destructive"
            />
            <StatCard
              icon={ShieldCheck}
              label="Allowed (24h)"
              value={totalAllowed.toLocaleString()}
              accent="bg-success/15 text-success"
            />
            <StatCard
              icon={Radar}
              label="Quarantined"
              value={String(quarantined)}
              accent="bg-warning/15 text-warning"
            />
          </section>

          {active === "threats" && (
            <>
              <ThreatsChart />
              <RequestsTable />
            </>
          )}

          {active === "agents" && (
            <>
              <ThreatsChart />
              <AgentsView />
            </>
          )}

          {active === "policy" && <PolicyView />}

          {active === "billing" && <BillingView />}

          {active === "profile" && <ProfileView />}

          {active === "support" && <SupportView />}
        </div>
      </main>
    </div>
  )
}
