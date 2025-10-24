"use client"

import { FormEvent, useEffect, useState, useTransition } from "react"
import { X } from "lucide-react"

import { supabaseBrowserClient } from "@/lib/supabase-browser"
import { sendJoinMovementEmail } from "@/app/actions/send-join-movement-email"

type JoinMovementModalProps = {
  isOpen: boolean
  onClose: () => void
}

export default function JoinMovementModal({ isOpen, onClose }: JoinMovementModalProps) {
  const [selectedIntent, setSelectedIntent] = useState<"license" | "make" | "both" | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null)
  const [, startEmailSend] = useTransition()

  useEffect(() => {
    if (!isOpen) {
      setSelectedIntent(null)
      setIsSubmitting(false)
      setFormError(null)
      setIsSuccess(false)
      setCopyFeedback(null)
    }
  }, [isOpen])

  const shareText = [
    "I just joined the Licensed Identity Movement by @Castnym — the world’s first platform for digital identity licensing and ethical AI video creation.",
    "Consent · Compensation · Control — that’s how AI should work.",
    "👉 castnym.com",
    "#Castnym #DigitalIdentity #EthicalAI #AIVideo #CreatorEconomy",
  ].join("\n")

  if (!isOpen) {
    return null
  }

  const handleCopyShareText = async () => {
    try {
      await navigator.clipboard.writeText(shareText)
      setCopyFeedback("Copied!")
      setTimeout(() => setCopyFeedback(null), 2000)
    } catch {
      setCopyFeedback("Copy failed. Try copying the text manually.")
      setTimeout(() => setCopyFeedback(null), 3000)
    }
  }

  const openShareWindow = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

  const handleShareLinkedIn = () => {
    const linkedInUrl = new URL("https://www.linkedin.com/shareArticle")
    linkedInUrl.searchParams.set("mini", "true")
    linkedInUrl.searchParams.set("url", "https://castnym.com")
    linkedInUrl.searchParams.set("title", "Licensed Identity Movement by CastNym")
    linkedInUrl.searchParams.set("summary", shareText)
    openShareWindow(linkedInUrl.toString())
  }

  const handleShareX = () => {
    const tweetUrl = new URL("https://twitter.com/intent/tweet")
    tweetUrl.searchParams.set("text", shareText)
    openShareWindow(tweetUrl.toString())
  }

  const handleShareInstagram = () => {
    openShareWindow("https://www.instagram.com/")
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const consent = formData.get("consent") === "on"
    const intentValue = selectedIntent

    if (!intentValue) {
      setFormError("Select how you want to participate.")
      return
    }

    if (!consent) {
      setFormError("You must agree to the policies to continue.")
      return
    }

    setIsSubmitting(true)
    setFormError(null)

    const name = (formData.get("name") as string | null)?.trim() ?? ""
    const email = (formData.get("email") as string | null)?.trim() ?? ""
    const phoneRaw = (formData.get("phone") as string | null)?.trim()
    const commentRaw = (formData.get("comment") as string | null)?.trim()

    try {
      const { error } = await supabaseBrowserClient.from("join_requests").insert({
        intent: intentValue,
        name,
        email,
        phone: phoneRaw && phoneRaw.length > 0 ? phoneRaw : null,
        comment: commentRaw && commentRaw.length > 0 ? commentRaw : null,
        consent: true,
      })

      if (error) {
        throw new Error(error.message)
      }

      setIsSuccess(true)
      setSelectedIntent(null)

      startEmailSend(() => {
        sendJoinMovementEmail({ email, name }).catch((emailError) => {
          console.error("Failed to send confirmation email:", emailError)
        })
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong."
      setFormError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-6 border-b border-gray-100 px-6 py-5 md:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-500">
              {isSuccess ? "Thank you" : "Join the Movement"}
            </p>
            <h3 className="mt-3 text-2xl md:text-3xl font-bold text-gray-900">
              {isSuccess ? "Spread the word. Help build ethical AI." : "Tell us how you want to participate."}
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              {isSuccess
                ? "Share the Licensed Identity Movement so more creators can build ethical AI."
                : "We review every submission to keep identity licensing transparent and consent-driven."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full border border-gray-200 p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 md:px-8 md:py-8">
          {isSuccess ? (
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">Social-share snippet</p>
                <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Auto-copy text</p>
                  <pre className="mt-3 whitespace-pre-wrap text-sm text-gray-800">{shareText}</pre>
                </div>
                {copyFeedback ? (
                  <p className="text-sm font-medium text-blue-600">{copyFeedback}</p>
                ) : (
                  <p className="text-xs text-gray-500">
                    Copy the message above or share directly using the buttons below.
                  </p>
                )}
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <button
                  type="button"
                  onClick={handleCopyShareText}
                  className="rounded-xl border border-gray-900 px-5 py-3 text-sm font-semibold text-gray-900 transition-all hover:bg-gray-900 hover:text-white"
                >
                  Copy Share Text
                </button>
                <button
                  type="button"
                  onClick={handleShareLinkedIn}
                  className="rounded-xl border border-[#0A66C2] px-5 py-3 text-sm font-semibold text-[#0A66C2] transition-all hover:bg-[#0A66C2] hover:text-white"
                >
                  Share on LinkedIn
                </button>
                <button
                  type="button"
                  onClick={handleShareInstagram}
                  className="rounded-xl border border-pink-500 px-5 py-3 text-sm font-semibold text-pink-500 transition-all hover:bg-pink-500 hover:text-white"
                >
                  Share on Instagram Stories
                </button>
                <button
                  type="button"
                  onClick={handleShareX}
                  className="rounded-xl border border-black px-5 py-3 text-sm font-semibold text-black transition-all hover:bg-black hover:text-white"
                >
                  Tweet on X
                </button>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <fieldset className="rounded-2xl border border-gray-200 p-4 md:p-6">
                <legend className="px-2 text-sm font-semibold uppercase tracking-wide text-gray-500">Intent</legend>
                <div className="mt-4 grid gap-3">
                  <label
                    className={`flex items-start gap-3 rounded-xl border px-3 py-2 transition-all ${
                      selectedIntent === "license"
                        ? "border-blue-500 bg-blue-50"
                        : "border-transparent hover:border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="intent"
                      value="license"
                      checked={selectedIntent === "license"}
                      onChange={() => setSelectedIntent("license")}
                      className="mt-1 h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>
                      <span className="block text-base font-medium text-gray-900">License my face</span>
                      <span className="block text-sm text-gray-600">
                        Add your likeness to CastNym and get compensated when creators use it.
                      </span>
                    </span>
                  </label>

                  <label
                    className={`flex items-start gap-3 rounded-xl border px-3 py-2 transition-all ${
                      selectedIntent === "make" ? "border-blue-500 bg-blue-50" : "border-transparent hover:border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="intent"
                      value="make"
                      checked={selectedIntent === "make"}
                      onChange={() => setSelectedIntent("make")}
                      className="mt-1 h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>
                      <span className="block text-base font-medium text-gray-900">Make video from licensed face</span>
                      <span className="block text-sm text-gray-600">
                        Work with verified talent to produce AI video that honors their rights.
                      </span>
                    </span>
                  </label>

                  <label
                    className={`flex items-start gap-3 rounded-xl border px-3 py-2 transition-all ${
                      selectedIntent === "both" ? "border-blue-500 bg-blue-50" : "border-transparent hover:border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="intent"
                      value="both"
                      checked={selectedIntent === "both"}
                      onChange={() => setSelectedIntent("both")}
                      className="mt-1 h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>
                      <span className="block text-base font-medium text-gray-900">Both</span>
                      <span className="block text-sm text-gray-600">
                        We&apos;ll reach out with opportunities to license your identity and create with licensed talent.
                      </span>
                    </span>
                  </label>
                </div>
              </fieldset>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-gray-700">Name *</span>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Jordan Smith"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-gray-700">Email *</span>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </label>

                <label className="flex flex-col gap-2 md:col-span-2">
                  <span className="text-sm font-semibold text-gray-700">Phone (optional)</span>
                  <input
                    name="phone"
                    type="tel"
                    pattern="^\\+?[1-9]\\d{1,14}$"
                    placeholder="+1 310 555 0110"
                    title="Enter a phone number in international format, e.g., +13105550110"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-gray-700">Comment (optional)</span>
                <textarea
                  name="comment"
                  rows={3}
                  placeholder="Anything else we should know?"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </label>

              <label className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
                <input
                  type="checkbox"
                  name="consent"
                  required
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600">
                  I agree to the CastNym{" "}
                  <a href="/terms" className="text-blue-600 underline hover:text-blue-700">
                    Terms
                  </a>
                  , Identity Licensing Policy, and{" "}
                  <a href="/privacy-policy" className="text-blue-600 underline hover:text-blue-700">
                    Privacy Policy
                  </a>
                  .
                </span>
              </label>

              {formError ? <p className="text-sm font-medium text-red-500">{formError}</p> : null}

              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <p className="text-sm text-gray-500">
                  We never train AI models on your likeness without explicit permission.
                </p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white disabled:cursor-not-allowed disabled:bg-gray-700"
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
