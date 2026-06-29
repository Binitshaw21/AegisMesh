import { Bot, ShieldX } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { activeAgents, type Agent } from "@/lib/soc-data"

const statusStyles: Record<Agent["status"], string> = {
  active: "border-success/40 bg-success/15 text-success",
  quarantined: "border-destructive/40 bg-destructive/15 text-destructive",
  idle: "border-warning/40 bg-warning/15 text-warning",
}

export function AgentsView() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {activeAgents.map((agent) => {
        const quarantined = agent.status === "quarantined"
        return (
          <Card
            key={agent.name}
            className={cn(
              "border-border/60 bg-card",
              quarantined && "border-destructive/40",
            )}
          >
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex size-9 items-center justify-center rounded-md border",
                    quarantined
                      ? "border-destructive/40 bg-destructive/15 text-destructive"
                      : "border-border bg-secondary text-primary",
                  )}
                >
                  {quarantined ? (
                    <ShieldX className="size-4" />
                  ) : (
                    <Bot className="size-4" />
                  )}
                </div>
                <div>
                  <CardTitle className="font-mono text-sm font-semibold">
                    {agent.name}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">{agent.role}</p>
                </div>
              </div>
              <span
                className={cn(
                  "rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                  statusStyles[agent.status],
                )}
              >
                {agent.status}
              </span>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-2 border-t border-border/60 pt-4">
              <div>
                <p className="font-mono text-lg font-semibold tabular-nums">
                  {agent.requests24h.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">Requests 24h</p>
              </div>
              <div>
                <p className="font-mono text-lg font-semibold tabular-nums text-destructive">
                  {agent.blocked24h}
                </p>
                <p className="text-xs text-muted-foreground">Blocked</p>
              </div>
              <div>
                <p className="font-mono text-lg font-semibold tabular-nums">
                  {agent.lastSeen}
                </p>
                <p className="text-xs text-muted-foreground">Last seen</p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
