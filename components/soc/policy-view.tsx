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
import { policyRules, type PolicyRule } from "@/lib/soc-data"

const actionStyles: Record<PolicyRule["action"], string> = {
  Block: "border-destructive/40 bg-destructive/15 text-destructive",
  Allow: "border-success/40 bg-success/15 text-success",
  Alert: "border-warning/40 bg-warning/15 text-warning",
}

export function PolicyView() {
  return (
    <Card className="border-border/60 bg-card">
      <CardHeader>
        <CardTitle className="text-base font-semibold tracking-tight">
          Policy Rules
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/60 hover:bg-transparent">
                <TableHead className="pl-6 text-xs uppercase tracking-wider text-muted-foreground">
                  Rule ID
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">
                  Policy
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">
                  Scope
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">
                  Action
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">
                  Hits 24h
                </TableHead>
                <TableHead className="pr-6 text-right text-xs uppercase tracking-wider text-muted-foreground">
                  State
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {policyRules.map((rule) => (
                <TableRow
                  key={rule.id}
                  className="border-border/40 text-sm hover:bg-accent/40"
                >
                  <TableCell className="pl-6 font-mono text-muted-foreground">
                    {rule.id}
                  </TableCell>
                  <TableCell className="font-medium text-foreground">
                    {rule.name}
                  </TableCell>
                  <TableCell className="text-foreground/80">
                    {rule.scope}
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "rounded-md border px-2 py-0.5 text-xs font-semibold",
                        actionStyles[rule.action],
                      )}
                    >
                      {rule.action}
                    </span>
                  </TableCell>
                  <TableCell className="font-mono tabular-nums text-foreground/80">
                    {rule.hits24h.toLocaleString()}
                  </TableCell>
                  <TableCell className="pr-6 text-right">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 text-xs font-medium",
                        rule.enabled
                          ? "text-success"
                          : "text-muted-foreground",
                      )}
                    >
                      <span
                        className={cn(
                          "size-1.5 rounded-full",
                          rule.enabled ? "bg-success" : "bg-muted-foreground",
                        )}
                      />
                      {rule.enabled ? "Enabled" : "Disabled"}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
