"use client"

import { useMemo, useState } from "react"
import { Ban, CheckCircle2, Search } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { networkRequests, type NetworkRequest } from "@/lib/soc-data"

type Filter = "all" | "BLOCKED" | "ALLOWED"

const dangerousActions = new Set([
  "Port Scan",
  "Privilege Escalation",
  "Data Exfiltration",
  "Credential Read",
  "Lateral Movement",
  "DNS Tunneling",
])

function StatusBadge({ status }: { status: NetworkRequest["status"] }) {
  if (status === "BLOCKED") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-md border border-destructive/40 bg-destructive/15 px-2 py-0.5 font-mono text-xs font-semibold tracking-wide text-destructive">
        <Ban className="size-3" />
        BLOCKED
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-success/40 bg-success/15 px-2 py-0.5 font-mono text-xs font-semibold tracking-wide text-success">
      <CheckCircle2 className="size-3" />
      ALLOWED
    </span>
  )
}

export function RequestsTable() {
  const [filter, setFilter] = useState<Filter>("all")
  const [query, setQuery] = useState("")

  const rows = useMemo(() => {
    return networkRequests.filter((r) => {
      const matchesFilter = filter === "all" || r.status === filter
      const q = query.trim().toLowerCase()
      const matchesQuery =
        q === "" ||
        r.agent.toLowerCase().includes(q) ||
        r.action.toLowerCase().includes(q) ||
        r.targetIp.toLowerCase().includes(q)
      return matchesFilter && matchesQuery
    })
  }, [filter, query])

  const filters: { label: string; value: Filter }[] = [
    { label: "All", value: "all" },
    { label: "Blocked", value: "BLOCKED" },
    { label: "Allowed", value: "ALLOWED" },
  ]

  return (
    <Card className="border-border/60 bg-card">
      <CardHeader className="gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-base font-semibold tracking-tight">
            Recent Agent Network Requests
          </CardTitle>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search agent, action, IP…"
                className="h-9 w-full rounded-md border border-border bg-secondary/60 pl-8 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring sm:w-64"
              />
            </div>
            <div className="flex rounded-md border border-border bg-secondary/40 p-0.5">
              {filters.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setFilter(f.value)}
                  className={cn(
                    "rounded px-3 py-1.5 text-xs font-medium transition-colors",
                    filter === f.value
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/60 hover:bg-transparent">
                <TableHead className="pl-6 text-xs uppercase tracking-wider text-muted-foreground">
                  Timestamp
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">
                  Agent Name
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">
                  Attempted Action
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">
                  Target IP
                </TableHead>
                <TableHead className="pr-6 text-right text-xs uppercase tracking-wider text-muted-foreground">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow
                  key={r.id}
                  className={cn(
                    "border-border/40 font-mono text-sm transition-colors",
                    r.status === "BLOCKED"
                      ? "bg-destructive/[0.04] hover:bg-destructive/10"
                      : "hover:bg-accent/40",
                  )}
                >
                  <TableCell className="pl-6 whitespace-nowrap text-muted-foreground tabular-nums">
                    {r.timestamp}
                  </TableCell>
                  <TableCell className="whitespace-nowrap font-medium text-foreground">
                    {r.agent}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <span
                      className={cn(
                        dangerousActions.has(r.action)
                          ? "text-warning"
                          : "text-foreground/80",
                      )}
                    >
                      {r.action}
                    </span>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-foreground/80 tabular-nums">
                    {r.targetIp}
                  </TableCell>
                  <TableCell className="pr-6 text-right">
                    <StatusBadge status={r.status} />
                  </TableCell>
                </TableRow>
              ))}
              {rows.length === 0 && (
                <TableRow className="hover:bg-transparent">
                  <TableCell
                    colSpan={5}
                    className="py-12 text-center text-sm text-muted-foreground"
                  >
                    No requests match your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
