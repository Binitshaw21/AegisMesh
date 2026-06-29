"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Code, Lock, User, ArrowRight, Shield, Globe, AlertCircle } from "lucide-react";

/* ─── Tab config ─── */
const tabs = ["Login", "Sign Up"] as const;
type Tab = (typeof tabs)[number];

/* ════════════════════════════════════════════════════════════
   Auth Modal (Wired to RBAC Backend)
   ════════════════════════════════════════════════════════════ */
export function AuthModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("Login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // The actual authentication handler
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (data.success) {
        // Direct the user into the secure perimeter
        onClose();
        router.push("/dashboard");
      } else {
        setError(data.error || "Identity validation rejected.");
      }
    } catch {
      setError("Network error connecting to access control layer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        /* ── Overlay ────────────────────────────────────────── */
        <motion.div
          key="auth-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-xl"
          onClick={onClose}
        >
          {/* ── Modal card ──────────────────────────────────── */}
          <motion.div
            key="auth-card"
            initial={{ opacity: 0, scale: 0.92, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 18 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#0f1729]/90 p-8 shadow-2xl backdrop-blur-2xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Logo */}
            <div className="mb-6 flex items-center justify-center gap-2">
              <Shield className="h-6 w-6 text-emerald-400" />
              <span className="font-mono text-lg font-bold text-white">
                AegisMesh
              </span>
            </div>

            {/* ── Tab toggle ──────────────────────────────── */}
            <div className="relative mb-8 flex rounded-lg bg-white/[0.04] p-1">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setError("");
                  }}
                  className={`relative z-10 flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
                    activeTab === tab ? "text-white" : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="auth-tab-indicator"
                      className="absolute inset-0 -z-10 rounded-md bg-white/[0.08] border border-white/[0.06]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* ── Social auth ─────────────────────────────── */}
            <div className="flex gap-3">
              <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/[0.1] bg-white/[0.04] py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-white/[0.08] hover:text-white">
                <Globe className="h-4 w-4" />
                Google
              </button>
              <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/[0.1] bg-white/[0.04] py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-white/[0.08] hover:text-white">
                <Code className="w-5 h-5 mr-2" />
                GitHub
              </button>
            </div>

            {/* ── Divider ─────────────────────────────────── */}
            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/[0.08]" />
              <span className="text-xs font-medium text-slate-600">or</span>
              <div className="h-px flex-1 bg-white/[0.08]" />
            </div>

            {/* Error Message Display */}
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: "auto" }} 
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-center gap-2 text-xs text-red-400"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <p>{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Form ────────────────────────────────────── */}
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {/* Full name — only for sign up */}
              <AnimatePresence mode="popLayout">
                {activeTab === "Sign Up" && (
                  <motion.div
                    key="name-field"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <label className="mb-1.5 block text-xs font-medium text-slate-400">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full rounded-lg border border-white/[0.1] bg-white/[0.05] px-4 py-2.5 text-sm text-white placeholder:text-slate-500 transition-colors focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Username Field */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-400">
                  Security Handle (Username)
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. admin_binit"
                    className="w-full rounded-lg border border-white/[0.1] bg-white/[0.05] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 transition-colors focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-400">
                  Access Key (Password)
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full rounded-lg border border-white/[0.1] bg-white/[0.05] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 transition-colors focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
                  />
                </div>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={!loading ? {
                  scale: 1.02,
                  boxShadow: "0 0 24px rgba(16,185,129,0.35)",
                } : {}}
                whileTap={!loading ? { scale: 0.97 } : {}}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 py-2.5 mt-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-colors hover:bg-emerald-400 disabled:opacity-50"
              >
                {loading ? "Decrypting..." : (activeTab === "Login" ? "Authorize Handshake" : "Initialize Identity")}
                {!loading && <ArrowRight className="h-4 w-4" />}
              </motion.button>
            </form>

            {/* Footer note */}
            <p className="mt-6 text-center text-xs text-slate-600">
              By continuing, you agree to AegisMesh&apos;s{" "}
              <span className="text-slate-400 underline underline-offset-2 cursor-pointer hover:text-white transition-colors">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-slate-400 underline underline-offset-2 cursor-pointer hover:text-white transition-colors">
                Privacy Policy
              </span>
              .
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}