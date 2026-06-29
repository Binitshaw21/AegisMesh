"use client"

import { useState, useEffect } from "react"
import { Dashboard } from "@/components/soc/dashboard"
import { networkRequests, type NetworkRequest } from "@/lib/soc-data"

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const [isSimulating, setIsSimulating] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const simulateThreat = async () => {
    setIsSimulating(true)
    try {
      const payload = {
        agentId: "rogue-agent-007",
        attemptedAction: "nmap port scan",
        targetIp: "10.0.5.50"
      }

      const response = await fetch('/api/gateway', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      const data = await response.json()
      
      // Handle both status and action_status depending on exact backend property
      const finalStatus = data.status || data.action_status || "BLOCKED"

      // Create new alert log
      const newAlert: NetworkRequest = {
        id: `req-${Math.random().toString(16).slice(2, 8)}`,
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
        agent: payload.agentId,
        action: payload.attemptedAction,
        targetIp: payload.targetIp,
        status: finalStatus as "BLOCKED" | "ALLOWED",
        severity: "critical"
      }

      // Prepend to the immutable data table
      networkRequests.unshift(newAlert)
      
      // Force re-render of the dashboard to show the new row instantly
      setRefreshKey(prev => prev + 1)
    } catch (error) {
      console.error("Simulation failed:", error)
    } finally {
      setIsSimulating(false)
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="relative min-h-svh">
      <div className="absolute right-6 top-5 z-50">
        <button
          onClick={simulateThreat}
          disabled={isSimulating}
          className="rounded-md bg-destructive/15 px-4 py-2 font-mono text-sm font-semibold tracking-wide text-destructive border border-destructive/40 hover:bg-destructive/25 transition-colors disabled:opacity-50"
        >
          {isSimulating ? "SIMULATING..." : "Simulate AI Threat"}
        </button>
      </div>
      <Dashboard key={refreshKey} />
    </div>
  )
}
