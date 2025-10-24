import type { Metadata } from "next"

import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "CastNym Terms of Service",
  description: "Read CastNym's terms of service within the site experience.",
}

export default function TermsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <section className="mx-auto w-full max-w-5xl flex-1 px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900">Terms of Service</h1>
        <p className="mt-4 text-base text-gray-600">
          Read the CastNym terms in full right here. The policy is embedded for quick reference, and a downloadable
          version is available below.
        </p>
        <div className="mt-8 h-[75vh] w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-sm">
          <iframe src="/file/CastNymTerm.pdf#view=FitH" title="CastNym Terms of Service" className="h-full w-full" />
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Need an offline copy?{" "}
          <a
            href="/file/CastNymTerm.pdf"
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

