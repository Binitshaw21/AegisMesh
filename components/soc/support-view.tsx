"use client"

import { BookOpen, FileText, LifeBuoy, MessageSquare, PhoneCall } from "lucide-react"

export function SupportView() {
  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="rounded-lg border border-border/60 bg-card p-8 text-center">
        <h2 className="text-2xl font-semibold mb-2">How can we help you?</h2>
        <p className="text-muted-foreground mb-6">Search our knowledge base or contact SOC engineering support.</p>
        <div className="max-w-xl mx-auto relative">
          <input 
            type="text" 
            placeholder="Search for articles, guides, or troubleshooting..." 
            className="w-full bg-secondary/30 border border-border/60 rounded-full pl-4 pr-12 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
          />
          <button className="absolute right-2 top-1.5 p-2 text-primary hover:bg-primary/10 rounded-full transition-colors">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4"><path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Contact Options */}
        <div className="rounded-lg border border-border/60 bg-card p-6 flex flex-col items-center text-center hover:border-primary/50 cursor-pointer transition-colors">
          <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center mb-4">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h3 className="font-medium text-lg mb-2">Live Chat</h3>
          <p className="text-sm text-muted-foreground mb-4 flex-1">Chat instantly with our SOC engineering tier 2 support team.</p>
          <button className="text-primary text-sm font-medium">Start Chat &rarr;</button>
        </div>

        <div className="rounded-lg border border-border/60 bg-card p-6 flex flex-col items-center text-center hover:border-primary/50 cursor-pointer transition-colors">
          <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mb-4">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="font-medium text-lg mb-2">Support Tickets</h3>
          <p className="text-sm text-muted-foreground mb-4 flex-1">Submit a detailed technical issue for deep investigation.</p>
          <button className="text-primary text-sm font-medium">Open Ticket &rarr;</button>
        </div>

        <div className="rounded-lg border border-border/60 bg-card p-6 flex flex-col items-center text-center hover:border-primary/50 cursor-pointer transition-colors">
          <div className="w-12 h-12 bg-purple-500/10 text-purple-500 rounded-full flex items-center justify-center mb-4">
            <PhoneCall className="w-6 h-6" />
          </div>
          <h3 className="font-medium text-lg mb-2">Emergency Hotline</h3>
          <p className="text-sm text-muted-foreground mb-4 flex-1">For critical mesh failures or active breaches only.</p>
          <button className="text-primary text-sm font-medium">View Numbers &rarr;</button>
        </div>
      </div>

      {/* FAQ / Docs */}
      <div className="rounded-lg border border-border/60 bg-card p-6">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="w-5 h-5 text-primary" />
          <h3 className="font-medium text-lg">Popular Documentation</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {[
            "How to configure custom Agent Policies",
            "Understanding the Threat Rating system",
            "Integrating SIEM via Webhooks",
            "Troubleshooting disconnected agents",
            "API Authentication and JWT refresh tokens",
            "Upgrading from AegisMesh v1 to v2"
          ].map((title, i) => (
            <a key={i} href="#" className="flex items-center gap-3 p-3 rounded-md hover:bg-secondary/50 transition-colors group">
              <LifeBuoy className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{title}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
