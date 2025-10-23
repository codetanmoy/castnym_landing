"use client"

import { useEffect, useRef, useState } from "react"

const values = ["Consented", "Compensated", "Traceable", "Ethical by Design"]

export default function MovementSection() {
  const [isVisible, setIsVisible] = useState(false)
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
    <section ref={ref} className="py-20 md:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Headline */}
          <h2
            className={`text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center text-balance transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            The Licensed Identity Movement
          </h2>

          {/* Body Copy */}
          <div
            className={`space-y-6 mb-12 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <p className="text-lg text-gray-600 leading-relaxed text-center">
              AI made creativity limitless — and blurred who's on screen.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed text-center">
              We're restoring consent, compensation, and control to every identity.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed text-center font-medium text-gray-700">
              Because your face is your digital identity — and it should belong to you.
            </p>
          </div>

          {/* Values Chips */}
        <div
          className={`flex flex-wrap justify-center gap-3 md:gap-4 transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {values.map((value, index) => (
            <div
              key={index}
              className="px-6 md:px-8 py-3 md:py-4 rounded-full border border-gray-200 bg-white text-gray-900 font-semibold text-base md:text-lg tracking-tight shadow-sm hover:shadow-md transition-all duration-300"
            >
              {value}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
