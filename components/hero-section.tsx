"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Play } from "lucide-react"
import posthog from "posthog-js"

import JoinMovementModal from "./join-movement-modal"

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-0 md:pt-24">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div
            className={`mb-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
          >
            <Image
              src="/Trans_Logo_rect.png"
              alt="CastNym logo"
              width={180}
              height={60}
              priority
            />
          </div>

          {/* Main Headline */}
          <h1
            className={`text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight text-balance transition-all duration-1000 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            AI shouldn't steal faces. It should respect them.
          </h1>

          {/* Subheadline */}
          <p
            className={`text-lg md:text-xl text-gray-600 mb-12 leading-relaxed max-w-2xl transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            Create with consent. License real faces for AI video, ethically and legally.
            <br />
            Your face is your digital identity. Own it.
          </p>
        </div>

        <div
          className={`relative w-full transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        >
          {/* Main showcase container */}
          <div className="relative mx-auto w-full max-w-4xl aspect-square rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/header.png"
              alt="CastNym creators collaborating with consent"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/60 to-black/80"></div>

            <div className="relative h-full px-8 md:px-16 pt-16 pb-24 flex flex-col items-center justify-end">
              {/* CTA block */}
              <button
                type="button"
                onClick={() => {
                  posthog.capture("join_movement_modal_opened", {
                    source: "hero_section",
                  })
                  setIsModalOpen(true)
                }}
                className="flex items-center gap-2 px-8 py-4 bg-white/90 hover:bg-white text-gray-900 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:-translate-y-0.5"
              >
                <span>Join the Movement →</span>

              </button>
            </div>

            {/* Bottom audience silhouettes */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/50 via-black/25 to-transparent flex items-end justify-center gap-2 px-8">
              <div className="w-8 h-12 bg-white/30 rounded-t-full"></div>
              <div className="w-6 h-14 bg-white/30 rounded-t-full"></div>
              <div className="w-8 h-10 bg-white/30 rounded-t-full"></div>
              <div className="w-7 h-13 bg-white/30 rounded-t-full"></div>
            </div>
          </div>
        </div>

        <p
          className={`mt-6 text-sm text-gray-500 text-center leading-relaxed transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          Early access. Limited waves. We verify every identity.
          <br />
          CastNym will never use your face for AI model training without your explicit permission.
        </p>
      </div>

      <JoinMovementModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}
