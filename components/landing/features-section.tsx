"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import { Database, Radar, LayoutDashboard } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Feature data                                                       */
/* ------------------------------------------------------------------ */

const features = [
  {
    icon: Database,
    title: "Multi-Region DSQL Logs",
    description:
      "Distributed SQL audit logs replicated across AWS regions. Every agent action recorded with microsecond precision.",
    stats: ["99.999% durability", "<2ms write latency"],
    accent: "emerald" as const,
  },
  {
    icon: Radar,
    title: "Real-Time Interception",
    description:
      "Intercept and analyze every AI agent network request before it reaches the target. Zero-trust verification on every connection.",
    stats: ["<50μs intercept", "10M+ req/day"],
    accent: "indigo" as const,
  },
  {
    icon: LayoutDashboard,
    title: "SOC Dashboard",
    description:
      "Real-time security operations center with threat visualization, agent monitoring, and policy enforcement controls.",
    stats: ["Live monitoring", "Custom alerts"],
    accent: "cyan" as const,
  },
];

const metrics = [
  { value: "99.97%", label: "Uptime" },
  { value: "2M+", label: "Threats Blocked" },
  { value: "500+", label: "Enterprise Clients" },
  { value: "<100ms", label: "Latency" },
];

/* ------------------------------------------------------------------ */
/*  Accent helpers                                                     */
/* ------------------------------------------------------------------ */

const accentClasses: Record<
  "emerald" | "indigo" | "cyan",
  { text: string; bg: string; glow: string }
> = {
  emerald: {
    text: "text-emerald-400",
    bg: "bg-emerald-500/20",
    glow: "from-emerald-500/40 to-emerald-500/0",
  },
  indigo: {
    text: "text-indigo-400",
    bg: "bg-indigo-500/20",
    glow: "from-indigo-500/40 to-indigo-500/0",
  },
  cyan: {
    text: "text-cyan-400",
    bg: "bg-cyan-500/20",
    glow: "from-cyan-500/40 to-cyan-500/0",
  },
};

/* ------------------------------------------------------------------ */
/*  3D Tilt Card                                                       */
/* ------------------------------------------------------------------ */

function TiltCard({
  feature,
  index,
}: {
  feature: (typeof features)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rawRotateX = useTransform(mouseY, [0, 1], [8, -8]);
  const rawRotateY = useTransform(mouseX, [0, 1], [-8, 8]);

  const rotateX = useSpring(rawRotateX, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(rawRotateY, { stiffness: 200, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  const Icon = feature.icon;
  const accent = accentClasses[feature.accent];

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
    >
      <div
        ref={cardRef}
        style={{ perspective: "1000px" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className={`
            relative overflow-hidden rounded-xl border
            bg-white/[0.03] border-white/[0.06]
            p-8 transition-colors duration-300
            ${isHovered ? "border-emerald-500/20" : ""}
          `}
        >
          {/* Gradient glow bar at top */}
          <motion.div
            className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${accent.glow}`}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isHovered ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Icon */}
          <div
            className={`mb-6 flex h-12 w-12 items-center justify-center rounded-lg ${accent.bg}`}
          >
            <Icon className={`h-6 w-6 ${accent.text}`} />
          </div>

          {/* Title */}
          <h3 className="mb-3 text-xl font-semibold text-white">{feature.title}</h3>

          {/* Description */}
          <p className="mb-6 text-sm leading-relaxed text-slate-400">
            {feature.description}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-4">
            {feature.stats.map((stat, i) => (
              <span
                key={i}
                className={`rounded-full border border-white/[0.06] bg-white/[0.04] px-3 py-1 text-xs font-medium ${accent.text}`}
              >
                {stat}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Stats Bar                                                          */
/* ------------------------------------------------------------------ */

function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="mt-20 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-8 py-10 backdrop-blur-sm"
    >
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {metrics.map((m, i) => (
          <div key={i} className="text-center">
            <div className="text-2xl font-bold text-white">{m.value}</div>
            <div className="mt-1 text-sm text-slate-400">{m.label}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Features Section                                                   */
/* ------------------------------------------------------------------ */

export function FeaturesSection() {
  return (
    <section id="features" className="px-6 py-32">
      <div className="mx-auto max-w-7xl">
        {/* ── Header ─────────────────────────────────────────── */}
        <div className="mb-16 text-center">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-400">
            PLATFORM CAPABILITIES
          </span>
          <h2 className="mt-4 text-4xl font-bold text-white">
            Built for Enterprise AI Security
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Every feature designed to give your security team complete visibility
            and control.
          </p>
        </div>

        {/* ── Feature cards ──────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((f, i) => (
            <TiltCard key={f.title} feature={f} index={i} />
          ))}
        </div>

        {/* ── Stats bar ──────────────────────────────────────── */}
        <StatsBar />
      </div>
    </section>
  );
}
