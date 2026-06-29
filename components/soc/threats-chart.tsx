"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { ShieldAlert } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { threatTimeline } from "@/lib/soc-data"

const chartConfig = {
  blocked: {
    label: "Blocked",
    color: "var(--chart-2)",
  },
  allowed: {
    label: "Allowed",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function ThreatsChart() {
  const totalBlocked = threatTimeline.reduce((sum, p) => sum + p.blocked, 0)
  const peak = threatTimeline.reduce(
    (max, p) => (p.blocked > max.blocked ? p : max),
    threatTimeline[0],
  )

  return (
    <Card className="border-border/60 bg-card">
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
        <div className="space-y-1.5">
          <CardTitle className="flex items-center gap-2 text-base font-semibold tracking-tight">
            <ShieldAlert className="size-4 text-destructive" />
            Blocked Threats — Last 24 Hours
          </CardTitle>
          <CardDescription>
            Blocked vs. allowed agent network requests, sampled in 2-hour
            windows.
          </CardDescription>
        </div>
        <div className="flex items-center gap-6 text-right">
          <div>
            <p className="font-mono text-2xl font-semibold text-destructive tabular-nums">
              {totalBlocked}
            </p>
            <p className="text-xs text-muted-foreground">Total blocked</p>
          </div>
          <div className="hidden sm:block">
            <p className="font-mono text-2xl font-semibold tabular-nums">
              {peak.hour}
            </p>
            <p className="text-xs text-muted-foreground">Peak window</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[260px] w-full">
          <LineChart
            data={threatTimeline}
            margin={{ left: 4, right: 12, top: 8, bottom: 4 }}
          >
            <CartesianGrid
              vertical={false}
              stroke="var(--border)"
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="hour"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={32}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="allowed"
              type="monotone"
              stroke="var(--color-allowed)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
            <Line
              dataKey="blocked"
              type="monotone"
              stroke="var(--color-blocked)"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
