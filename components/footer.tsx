"use client"

import posthog from "posthog-js"

export default function Footer() {
  const handleLinkClick = (linkName: string) => {
    posthog.capture("footer_link_clicked", { link_name: linkName })
  }

  return (
    <footer className="bg-gray-900 text-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-2">CastNym</h3>
            <p className="text-gray-400 text-sm max-w-sm">Own your digital identity, starting with your face.</p>
          </div>

          {/* Links */}
          <div className="flex gap-8 text-sm">
            <a
              href="/privacy-policy"
              onClick={() => handleLinkClick("privacy")}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Privacy
            </a>
            <a
              href="/terms"
              onClick={() => handleLinkClick("terms")}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Terms
            </a>
            <a
              href="mailto:support@castnym.com"
              onClick={() => handleLinkClick("contact")}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <p className="text-gray-500 text-sm text-center">© 2025 CastNym. All rights reserved.</p>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "CastNym",
              description: "Digital Identity Licensing for Ethical AI Video Creation",
              url: "https://castnym.com",
              logo: "https://castnym.com/logo.png",
            }),
          }}
        />
      </div>
    </footer>
  )
}
