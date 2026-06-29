"use client"

import { useState, useEffect } from "react"
import { HeroSection } from "@/components/landing/hero-section"
import { AuthModal } from "@/components/landing/auth-modal"
import { FeaturesSection } from "@/components/landing/features-section"
import { PricingSection } from "@/components/landing/pricing-section"
import { FaqSection } from "@/components/landing/faq-section"
import { SupportChat } from "@/components/landing/support-chat"
import { FooterSection } from "@/components/landing/footer-section"

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-x-hidden">
      <HeroSection onLoginClick={() => setAuthOpen(true)} />
      <FeaturesSection />
      <PricingSection />
      <FaqSection />
      <FooterSection />
      <SupportChat />
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  )
}
