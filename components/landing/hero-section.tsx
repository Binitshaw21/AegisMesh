"use client";

import { motion } from "framer-motion";
import { Shield, ArrowRight, Star, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

/* ─── particle config ─── */
function generateParticles(count: number) {
  const particles: {
    id: number;
    size: number;
    x: number;
    y: number;
    color: string;
    opacity: number;
    duration: number;
    delay: number;
    driftX: number;
    driftY: number;
  }[] = [];

  for (let i = 0; i < count; i++) {
    const isEmerald = i % 3 !== 0;
    particles.push({
      id: i,
      size: 2 + Math.random() * 2, // 2‑4 px
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: isEmerald ? "#10b981" : "#6366f1",
      opacity: 0.3 + Math.random() * 0.3,
      duration: 15 + Math.random() * 25, // 15‑40 s
      delay: Math.random() * 10,
      driftX: -30 + Math.random() * 60,
      driftY: -40 + Math.random() * 80,
    });
  }
  return particles;
}

/* ─── inline keyframes injected once ─── */
const particleKeyframes = `
@keyframes aegis-float {
  0%   { transform: translate(0, 0) scale(1);   opacity: var(--p-opacity); }
  25%  { transform: translate(calc(var(--drift-x) * 0.4), calc(var(--drift-y) * -0.5)) scale(1.2); opacity: calc(var(--p-opacity) * 1.3); }
  50%  { transform: translate(var(--drift-x), var(--drift-y)) scale(0.8); opacity: var(--p-opacity); }
  75%  { transform: translate(calc(var(--drift-x) * 0.6), calc(var(--drift-y) * -0.3)) scale(1.1); opacity: calc(var(--p-opacity) * 0.7); }
  100% { transform: translate(0, 0) scale(1);   opacity: var(--p-opacity); }
}
`;

/* ─── nav items ─── */
const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "API Docs", href: "#api-docs" },
  { label: "SOC Dashboard", href: "/dashboard" },
];

/* ─── animation helpers ─── */
const fadeSlideUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
});

const fadeIn = (delay: number) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8, delay },
});

/* ════════════════════════════════════════════════════════════
   Hero Section
   ════════════════════════════════════════════════════════════ */
export function HeroSection({ onLoginClick }: { onLoginClick: () => void }) {
  const particles = useMemo(() => generateParticles(26), []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#030712]">
      {/* inject keyframes */}
      <style dangerouslySetInnerHTML={{ __html: particleKeyframes }} />

      {/* ── Background layer ────────────────────────────────── */}
      {/* Radial gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 45%, rgba(16,185,129,0.06) 0%, rgba(99,102,241,0.04) 40%, transparent 80%)",
        }}
      />

      {/* Emerald orb — top‑right */}
      <motion.div
        className="pointer-events-none absolute -right-20 -top-20 z-0 rounded-full"
        style={{
          width: 380,
          height: 380,
          background: "radial-gradient(circle, #10b981 0%, transparent 70%)",
          filter: "blur(120px)",
          opacity: 0.18,
        }}
        animate={{ opacity: [0.15, 0.22, 0.15], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Indigo orb — bottom‑left */}
      <motion.div
        className="pointer-events-none absolute -bottom-24 -left-24 z-0 rounded-full"
        style={{
          width: 360,
          height: 360,
          background: "radial-gradient(circle, #6366f1 0%, transparent 70%)",
          filter: "blur(120px)",
          opacity: 0.17,
        }}
        animate={{ opacity: [0.14, 0.2, 0.14], scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* CSS particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="pointer-events-none absolute z-0 rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            backgroundColor: p.color,
            "--p-opacity": p.opacity,
            "--drift-x": `${p.driftX}px`,
            "--drift-y": `${p.driftY}px`,
            animation: `aegis-float ${p.duration}s ${p.delay}s ease-in-out infinite`,
            opacity: p.opacity,
          } as React.CSSProperties}
        />
      ))}

      {/* ── Navigation header ──────────────────────────────── */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-white/[0.03] backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-emerald-400" />
            <span className="font-mono text-lg font-bold tracking-tight text-white">
              AegisMesh
            </span>
          </Link>

          {/* Links */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <motion.div key={link.label} whileHover={{ scale: 1.06 }}>
                <Link
                  href={link.href}
                  className="rounded-md px-3.5 py-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Login CTA */}
          <motion.button
            whileHover={{ scale: 1.05, borderColor: "rgba(16,185,129,0.5)" }}
            whileTap={{ scale: 0.97 }}
            onClick={onLoginClick}
            className="rounded-lg border border-white/[0.12] bg-white/[0.04] px-5 py-2 text-sm font-medium text-slate-300 backdrop-blur-sm transition-colors hover:text-white"
          >
            Login
          </motion.button>
        </nav>
      </header>

      {/* ── Hero content ───────────────────────────────────── */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-16 text-center">
        <div className="mx-auto max-w-5xl">
          {/* Badge */}
          <motion.div {...fadeSlideUp(0.1)}>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400">
              🛡️ Zero-Trust AI Security Gateway
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            {...fadeSlideUp(0.2)}
            className="mt-8 text-5xl font-bold leading-[1.08] tracking-tight text-white md:text-7xl"
          >
            Secure Every{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-indigo-400 bg-clip-text text-transparent">
              AI Agent
            </span>
            .
            <br />
            Control Every Connection.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            {...fadeSlideUp(0.4)}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400"
          >
            AegisMesh intercepts, analyzes, and enforces zero-trust policies on
            every AI agent network request in real-time. Enterprise-grade security
            for autonomous AI systems.
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fadeSlideUp(0.6)}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            {/* Primary CTA */}
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(16,185,129,0.4)",
              }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-500/20 transition-colors hover:bg-emerald-400"
            >
              Start Securing AI
              <ArrowRight className="h-4 w-4" />
            </motion.button>

            {/* Secondary CTA */}
            <Link href="/dashboard">
              <motion.span
                whileHover={{
                  scale: 1.05,
                  borderColor: "rgba(16,185,129,0.5)",
                }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-8 py-3.5 text-base font-semibold text-slate-300 transition-colors hover:text-white"
              >
                View Live Demo
                <ExternalLink className="h-4 w-4" />
              </motion.span>
            </Link>
          </motion.div>

          {/* Trust bar */}
          <motion.div
            {...fadeIn(0.8)}
            className="mt-14 flex flex-col items-center gap-4"
          >
            {/* Avatar cluster */}
            <div className="flex -space-x-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#030712] bg-gradient-to-br from-slate-700 to-slate-800 text-[10px] font-bold text-slate-400"
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#030712] bg-emerald-500/20 text-[10px] font-semibold text-emerald-400">
                +2k
              </div>
            </div>

            {/* Stars */}
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-amber-400 text-amber-400"
                />
              ))}
            </div>

            <p className="text-sm text-slate-500">
              Trusted by{" "}
              <span className="font-semibold text-slate-300">2,000+</span>{" "}
              enterprise teams
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
