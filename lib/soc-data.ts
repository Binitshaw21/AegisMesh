export type RequestStatus = "BLOCKED" | "ALLOWED"

export type NetworkRequest = {
  id: string
  timestamp: string
  agent: string
  action: string
  targetIp: string
  status: RequestStatus
  severity: "critical" | "high" | "medium" | "low"
}

export type ThreatPoint = {
  hour: string
  blocked: number
  allowed: number
}

// Recent AI agent network requests (most recent first)
export const networkRequests: NetworkRequest[] = [
  {
    id: "req-9f3a21",
    timestamp: "2026-06-29 14:42:08",
    agent: "orchestrator-prime",
    action: "Port Scan",
    targetIp: "10.4.18.221",
    status: "BLOCKED",
    severity: "critical",
  },
  {
    id: "req-9f3a18",
    timestamp: "2026-06-29 14:41:55",
    agent: "ingest-worker-07",
    action: "Internal DB Query",
    targetIp: "10.2.0.14",
    status: "ALLOWED",
    severity: "low",
  },
  {
    id: "req-9f3a12",
    timestamp: "2026-06-29 14:41:30",
    agent: "research-bot-alpha",
    action: "External API Call",
    targetIp: "203.0.113.45",
    status: "ALLOWED",
    severity: "low",
  },
  {
    id: "req-9f3a05",
    timestamp: "2026-06-29 14:40:11",
    agent: "shadow-agent-x",
    action: "Credential Read",
    targetIp: "10.0.7.9",
    status: "BLOCKED",
    severity: "critical",
  },
  {
    id: "req-9f39f8",
    timestamp: "2026-06-29 14:39:47",
    agent: "summarizer-12",
    action: "Internal DB Query",
    targetIp: "10.2.0.31",
    status: "ALLOWED",
    severity: "low",
  },
  {
    id: "req-9f39e2",
    timestamp: "2026-06-29 14:38:22",
    agent: "orchestrator-prime",
    action: "Privilege Escalation",
    targetIp: "10.0.0.1",
    status: "BLOCKED",
    severity: "critical",
  },
  {
    id: "req-9f39d1",
    timestamp: "2026-06-29 14:37:09",
    agent: "vision-pipeline-3",
    action: "File System Access",
    targetIp: "10.6.12.88",
    status: "ALLOWED",
    severity: "medium",
  },
  {
    id: "req-9f39c4",
    timestamp: "2026-06-29 14:36:51",
    agent: "shadow-agent-x",
    action: "Port Scan",
    targetIp: "10.4.18.0/24",
    status: "BLOCKED",
    severity: "high",
  },
  {
    id: "req-9f39b0",
    timestamp: "2026-06-29 14:35:33",
    agent: "ingest-worker-07",
    action: "External API Call",
    targetIp: "198.51.100.23",
    status: "ALLOWED",
    severity: "low",
  },
  {
    id: "req-9f39a3",
    timestamp: "2026-06-29 14:34:18",
    agent: "research-bot-alpha",
    action: "Data Exfiltration",
    targetIp: "185.220.101.4",
    status: "BLOCKED",
    severity: "critical",
  },
  {
    id: "req-9f3992",
    timestamp: "2026-06-29 14:33:02",
    agent: "summarizer-12",
    action: "Internal DB Query",
    targetIp: "10.2.0.14",
    status: "ALLOWED",
    severity: "low",
  },
  {
    id: "req-9f3981",
    timestamp: "2026-06-29 14:31:44",
    agent: "vision-pipeline-3",
    action: "Lateral Movement",
    targetIp: "10.6.13.2",
    status: "BLOCKED",
    severity: "high",
  },
  {
    id: "req-9f3975",
    timestamp: "2026-06-29 14:30:21",
    agent: "orchestrator-prime",
    action: "Internal DB Query",
    targetIp: "10.2.0.9",
    status: "ALLOWED",
    severity: "low",
  },
  {
    id: "req-9f3968",
    timestamp: "2026-06-29 14:29:05",
    agent: "shadow-agent-x",
    action: "DNS Tunneling",
    targetIp: "8.8.8.8",
    status: "BLOCKED",
    severity: "high",
  },
  {
    id: "req-9f3950",
    timestamp: "2026-06-29 14:27:38",
    agent: "ingest-worker-07",
    action: "External API Call",
    targetIp: "203.0.113.91",
    status: "ALLOWED",
    severity: "low",
  },
  {
    id: "req-9f3944",
    timestamp: "2026-06-29 14:26:12",
    agent: "research-bot-alpha",
    action: "Port Scan",
    targetIp: "10.8.4.0/24",
    status: "BLOCKED",
    severity: "medium",
  },
]

// Blocked vs allowed threats over the last 24 hours (2-hour buckets)
export const threatTimeline: ThreatPoint[] = [
  { hour: "15:00", blocked: 12, allowed: 142 },
  { hour: "17:00", blocked: 18, allowed: 156 },
  { hour: "19:00", blocked: 9, allowed: 121 },
  { hour: "21:00", blocked: 24, allowed: 98 },
  { hour: "23:00", blocked: 31, allowed: 76 },
  { hour: "01:00", blocked: 41, allowed: 64 },
  { hour: "03:00", blocked: 38, allowed: 52 },
  { hour: "05:00", blocked: 22, allowed: 71 },
  { hour: "07:00", blocked: 15, allowed: 119 },
  { hour: "09:00", blocked: 27, allowed: 184 },
  { hour: "11:00", blocked: 44, allowed: 201 },
  { hour: "13:00", blocked: 52, allowed: 176 },
]

export type Agent = {
  name: string
  role: string
  status: "active" | "quarantined" | "idle"
  requests24h: number
  blocked24h: number
  lastSeen: string
}

export const activeAgents: Agent[] = [
  { name: "orchestrator-prime", role: "Task Orchestrator", status: "active", requests24h: 4821, blocked24h: 37, lastSeen: "2s ago" },
  { name: "ingest-worker-07", role: "Data Ingestion", status: "active", requests24h: 9120, blocked24h: 4, lastSeen: "5s ago" },
  { name: "research-bot-alpha", role: "Web Research", status: "active", requests24h: 2310, blocked24h: 58, lastSeen: "1s ago" },
  { name: "shadow-agent-x", role: "Unregistered", status: "quarantined", requests24h: 412, blocked24h: 311, lastSeen: "12s ago" },
  { name: "summarizer-12", role: "Summarization", status: "active", requests24h: 1740, blocked24h: 2, lastSeen: "8s ago" },
  { name: "vision-pipeline-3", role: "Image Analysis", status: "idle", requests24h: 880, blocked24h: 19, lastSeen: "3m ago" },
]

export type PolicyRule = {
  id: string
  name: string
  scope: string
  action: "Block" | "Allow" | "Alert"
  enabled: boolean
  hits24h: number
}

export const policyRules: PolicyRule[] = [
  { id: "POL-001", name: "Deny outbound to TOR exit nodes", scope: "All agents", action: "Block", enabled: true, hits24h: 211 },
  { id: "POL-002", name: "Block port scanning behavior", scope: "All agents", action: "Block", enabled: true, hits24h: 96 },
  { id: "POL-003", name: "Allow internal DB read (10.2.0.0/16)", scope: "Trusted agents", action: "Allow", enabled: true, hits24h: 5240 },
  { id: "POL-004", name: "Alert on privilege escalation", scope: "All agents", action: "Alert", enabled: true, hits24h: 14 },
  { id: "POL-005", name: "Quarantine unregistered agents", scope: "Unknown identity", action: "Block", enabled: true, hits24h: 311 },
  { id: "POL-006", name: "Allow approved external APIs", scope: "All agents", action: "Allow", enabled: true, hits24h: 3180 },
  { id: "POL-007", name: "Block credential store access", scope: "Non-privileged", action: "Block", enabled: false, hits24h: 0 },
]
