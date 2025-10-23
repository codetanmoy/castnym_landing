import type { Metadata } from "next"
import HeroSection from "@/components/hero-section"
import MovementSection from "@/components/movement-section"
import CtaSection from "@/components/cta-section"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Castnym — Digital Identity Licensing for Ethical AI Video Creation",
  description:
    "Create with consent. License real faces for AI video — ethically, legally, and securely. Your face is your digital identity. Own it.",
  openGraph: {
    title: "Castnym — Digital Identity Licensing for Ethical AI Video Creation",
    description:
      "Create with consent. License real faces for AI video — ethically, legally, and securely. Your face is your digital identity. Own it.",
    type: "website",
  },
  keywords:
    "digital identity licensing, AI face licensing, ethical AI content, AI video licensing, consent-based AI, AI identity marketplace, digital likeness rights, AI brand safety, creator royalties for AI content, Castnym digital identity, AI video creation, AI content creation",
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <MovementSection />
      <CtaSection />
      <Footer />

      <div className="sr-only">
        <p>
          Castnym is the world's first digital identity licensing platform for ethical AI video creation. We enable
          brands, creators, and agencies to collaborate safely by using licensed human faces in AI content creation.
          Every identity is verified, consented, and compensated. Castnym leads the movement toward consent-based AI,
          combining brand safety, digital likeness rights, and AI video licensing in one trusted marketplace.
        </p>
      </div>
    </main>
  )
}
