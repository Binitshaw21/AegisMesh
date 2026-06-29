"use client"

import { CreditCard, Download, ExternalLink, TrendingUp } from "lucide-react"

export function BillingView() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg border border-border/60 bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Current Plan</h3>
            <span className="px-2.5 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-semibold">Enterprise</span>
          </div>
          <div className="text-3xl font-bold tracking-tight mb-1">$499<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
          <p className="text-sm text-muted-foreground mb-6">Billed annually next on Oct 1, 2026</p>
          <button className="w-full py-2 bg-secondary text-secondary-foreground rounded-md text-sm font-medium hover:bg-secondary/80 transition-colors">
            Manage Plan
          </button>
        </div>

        <div className="rounded-lg border border-border/60 bg-card p-6 md:col-span-2 flex flex-col justify-center">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-blue-500/10 text-blue-500 rounded-lg">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-medium text-lg">Usage This Month</h3>
              <p className="text-sm text-muted-foreground">You are currently within your plan limits.</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-muted-foreground">Active Agents</span>
                <span className="font-medium">24 / 50</span>
              </div>
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[48%] rounded-full"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-muted-foreground">Threat Logs (Monthly)</span>
                <span className="font-medium">1.2M / 5M</span>
              </div>
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[24%] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border/60 bg-card overflow-hidden">
        <div className="px-6 py-4 border-b border-border/60 flex items-center justify-between">
          <h3 className="font-medium">Billing History</h3>
          <button className="text-sm text-primary hover:underline flex items-center gap-1">
            <Download className="w-3 h-3" /> Download All
          </button>
        </div>
        <table className="w-full text-sm text-left">
          <thead className="bg-secondary/50 text-muted-foreground border-b border-border/60">
            <tr>
              <th className="px-6 py-3 font-medium">Invoice ID</th>
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium">Amount</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium text-right">Receipt</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: "INV-2026-009", date: "Sep 01, 2026", amount: "$499.00", status: "Paid" },
              { id: "INV-2026-008", date: "Aug 01, 2026", amount: "$499.00", status: "Paid" },
              { id: "INV-2026-007", date: "Jul 01, 2026", amount: "$499.00", status: "Paid" },
            ].map((inv) => (
              <tr key={inv.id} className="border-b border-border/60 last:border-0 hover:bg-secondary/20 transition-colors">
                <td className="px-6 py-4 font-mono text-muted-foreground">{inv.id}</td>
                <td className="px-6 py-4">{inv.date}</td>
                <td className="px-6 py-4">{inv.amount}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded text-xs bg-emerald-500/10 text-emerald-500 font-medium">
                    {inv.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-muted-foreground hover:text-foreground">
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
