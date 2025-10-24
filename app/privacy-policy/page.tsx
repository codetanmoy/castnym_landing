import type { Metadata } from "next"

import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "CastNym Privacy Policy",
  description: "Review CastNym's privacy practices inside the site without leaving the main experience.",
}

export default function PrivacyPolicyPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <section className="mx-auto w-full max-w-5xl flex-1 px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
       
        <div className="mt-8 h-[75vh] w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-sm">
          <iframe
            src="/file/CastNymPrivacyPolicy.pdf#view=FitH"
            title="CastNym Privacy Policy"
            className="h-full w-full"
          />
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Prefer the original format?{" "}
          <a
            href="/file/CastNymPrivacyPolicy.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-700"
          >
            Download the PDF
          </a>
          .
        </p>
      </section>
      <Footer />
    </main>
  )
}

