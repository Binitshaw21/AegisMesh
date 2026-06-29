"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Tier data                                                          */
/* ------------------------------------------------------------------ */

interface Tier {
  name: string;
  monthly: number | null;
  yearly: number | null;
  label: string | null;
  featured: boolean;
  badge: string | null;
  features: string[];
  cta: string;
  ctaStyle: "outline" | "filled";
}

const tiers: Tier[] = [
  {
    name: "Developer",
    monthly: 29,
    yearly: 279,
    label: null,
    featured: false,
    badge: null,
    features: [
      "Up to 5 AI Agents",
      "Basic threat logs",
      "Community support",
      "1 Region",
      "API access",
    ],
    cta: "Get Started",
    ctaStyle: "outline",
  },
  {
    name: "Enterprise",
    monthly: 199,
    yearly: 1909,
    label: null,
    featured: true,
    badge: "Most Popular",
    features: [
      "Unlimited AI Agents",
      "Real-time DSQL logs",
      "24/7 Priority support",
      "Multi-region",
      "SOC Dashboard",
      "Custom policies",
    ],
    cta: "Start Free Trial",
    ctaStyle: "filled",
  },
  {
    name: "Custom",
    monthly: null,
    yearly: null,
    label: "Let's Talk",
    featured: false,
    badge: null,
    features: [
      "Everything in Enterprise",
      "Dedicated infrastructure",
      "Custom SLAs",
      "On-premise option",
      "Dedicated CSM",
      "SOC 2 compliance",
    ],
    cta: "Contact Sales",
    ctaStyle: "outline",
  },
];

/* ------------------------------------------------------------------ */
/*  Rotating gradient border keyframes (injected once)                 */
/* ------------------------------------------------------------------ */

const borderCSS = `
@property --gradient-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

@keyframes rotateBorder {
  0%   { --gradient-angle: 0deg; }
  100% { --gradient-angle: 360deg; }
}
`;

/* ------------------------------------------------------------------ */
/*  Pricing Card                                                       */
/* ------------------------------------------------------------------ */

function PricingCard({
  tier,
  isYearly,
  index,
}: {
  tier: Tier;
  isYearly: boolean;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const price = isYearly ? tier.yearly : tier.monthly;

  const inner = (
    <div
      className={`
        relative flex h-full flex-col rounded-2xl border p-8
        ${
          tier.featured
            ? "border-transparent bg-slate-950 py-12"
            : "border-white/[0.06] bg-white/[0.03]"
        }
      `}
    >
      {/* Badge */}
      {tier.badge && (
        <span className="mb-4 inline-flex w-fit rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
          {tier.badge}
        </span>
      )}

      {/* Name */}
      <h3 className="text-lg font-semibold text-white">{tier.name}</h3>

      {/* Price */}
      <div className="mt-4 flex items-baseline gap-1">
        {price !== null ? (
          <>
            <span className="text-4xl font-bold text-white">${price}</span>
            <span className="text-sm text-slate-400">
              /{isYearly ? "yr" : "mo"}
            </span>
          </>
        ) : (
          <span className="text-4xl font-bold text-white">{tier.label}</span>
        )}
      </div>

      {/* Divider */}
      <div className="my-6 h-px w-full bg-white/[0.06]" />

      {/* Features */}
      <ul className="mb-8 flex-1 space-y-3">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        className={`
          w-full rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-200
          ${
            tier.ctaStyle === "filled"
              ? "bg-emerald-500 text-white hover:bg-emerald-400 shadow-lg shadow-emerald-500/20"
              : "border border-white/[0.1] bg-white/[0.04] text-white hover:bg-white/[0.08]"
          }
        `}
      >
        {tier.cta}
      </button>
    </div>
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      className={tier.featured ? "md:-my-4" : ""}
    >
      {tier.featured ? (
        /* ── Rotating gradient border wrapper ───────────────── */
        <div
          className="rounded-2xl p-[2px]"
          style={{
            background:
              "conic-gradient(from var(--gradient-angle, 0deg), #10b981, #6366f1, #10b981)",
            animation: "rotateBorder 4s linear infinite",
          }}
        >
          {inner}
        </div>
      ) : (
        inner
      )}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Billing Toggle                                                     */
/* ------------------------------------------------------------------ */

function BillingToggle({
  isYearly,
  onChange,
}: {
  isYearly: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="mt-8 flex items-center justify-center gap-4">
      <span
        className={`text-sm font-medium transition-colors ${
          !isYearly ? "text-white" : "text-slate-400"
        }`}
      >
        Monthly
      </span>

      {/* Toggle pill */}
      <button
        onClick={() => onChange(!isYearly)}
        className="relative flex h-8 w-14 items-center rounded-full border border-white/[0.1] bg-white/[0.05] px-1 transition-colors focus:outline-none"
        aria-label="Toggle billing period"
      >
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={`h-6 w-6 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/30 ${
            isYearly ? "ml-auto" : ""
          }`}
        />
      </button>

      <span
        className={`text-sm font-medium transition-colors ${
          isYearly ? "text-white" : "text-slate-400"
        }`}
      >
        Yearly
      </span>

      <AnimatePresence>
        {isYearly && (
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400"
          >
            Save 20%
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Pricing Section                                                    */
/* ------------------------------------------------------------------ */

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <>
      {/* Inject keyframes for the rotating border */}
      <style>{borderCSS}</style>

      <section id="pricing" className="px-6 py-32">
        <div className="mx-auto max-w-6xl">
          {/* ── Header ────────────────────────────────────────── */}
          <div className="mb-4 text-center">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-indigo-400">
              PRICING
            </span>
            <h2 className="mt-4 text-4xl font-bold text-white">
              Simple, Transparent Pricing
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              Start free, scale effortlessly. Every plan includes core platform
              security — upgrade when you need deeper visibility.
            </p>
          </div>

          {/* ── Toggle ────────────────────────────────────────── */}
          <BillingToggle isYearly={isYearly} onChange={setIsYearly} />

          {/* ── Tier cards ────────────────────────────────────── */}
          <div className="mt-14 grid grid-cols-1 items-center gap-6 md:grid-cols-3">
            {tiers.map((t, i) => (
              <PricingCard key={t.name} tier={t} isYearly={isYearly} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
