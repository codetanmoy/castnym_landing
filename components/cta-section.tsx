"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"
import posthog from "posthog-js"

import JoinMovementModal from "./join-movement-modal"

export default function CtaSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="py-20 md:py-32 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <h2
          className={`text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center text-balance transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          Be first to license — or be licensed.
        </h2>

        {/* CTA Button */}
        <div
          className={`flex justify-center mb-8 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <button
            type="button"
            onClick={() => {
              posthog.capture("join_movement_modal_opened", {
                source: "cta_section",
              })
              setIsModalOpen(true)
            }}
            className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/50 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #6F00FF 0%, #00B8FF 100%)",
            }}
          >
            Join the Movement
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Subtext */}
        <div
          className={`text-center transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="text-gray-600 mb-4">
            <span className="font-medium">Early access · Privacy-first · No spam.</span>
            <br />
            CastNym will never use your face for AI model training without your explicit permission.
          </p>
          <p className="text-sm text-gray-500">Creator onboarding opens late Nov · Buyer access mid–late Dec</p>
        </div>
      </div>
      <JoinMovementModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}
