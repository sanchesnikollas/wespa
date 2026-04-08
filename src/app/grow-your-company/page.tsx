import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'

export const metadata: Metadata = {
  title: 'Grow Your Company',
  description: 'WESPA Forge Growth Platform — post-seed startup acceleration program. Diagnosis, growth engine building, and expansion support for scaling companies.',
}

const phases = [
  {
    step: '01',
    title: 'Diagnosis',
    duration: '4-6 weeks',
    description: 'Deep-dive analysis of your business model, market position, team structure, and growth blockers. We identify what is working, what is not, and where the highest-leverage opportunities lie.',
  },
  {
    step: '02',
    title: 'Growth Engine Build',
    duration: '3-4 months',
    description: 'Hands-on collaboration to build and activate your core growth systems — from go-to-market strategy and sales infrastructure to hiring playbooks and operational processes.',
  },
  {
    step: '03',
    title: 'Expansion & Capital Bridge',
    duration: 'Ongoing',
    description: 'Support for scaling into new markets, fundraising preparation, investor introductions, and strategic partnerships to accelerate your trajectory.',
  },
]

const tracks = [
  {
    title: 'Client Track',
    subtitle: 'Fee-based engagement',
    description: 'Fixed monthly fee for structured advisory, workshops, and hands-on support. Ideal for companies that prefer a clear cost structure.',
    cta: 'Learn More',
  },
  {
    title: 'Partner Track',
    subtitle: 'Equity-based engagement',
    description: 'We invest our time and expertise in exchange for equity. Reserved for high-potential companies where we see strong alignment and upside.',
    cta: 'Apply Now',
  },
]

export default function GrowYourCompanyPage() {
  return (
    <main>
      <section className="relative text-white py-24 md:py-32 overflow-hidden">
        <Image src="/images/locations/business-lounge/lounge-3.jpg" alt="Grow your company at WESPA" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-stone-900/75" />
        <div className="container-wespa relative z-10">
          <p className="text-wespa-red font-semibold mb-4">Forge Growth Platform</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Grow Your Company</h1>
          <p className="text-lg md:text-xl text-stone-300 max-w-2xl">
            Not an accelerator. A growth partner for post-seed companies with proven traction, paying customers, and scalable teams. Powered by experienced operators and former founders.
          </p>
        </div>
      </section>

      {/* 3-Phase Process */}
      <section className="section-spacing">
        <div className="container-wespa">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Our Process</h2>
          <p className="text-stone-600 text-center max-w-2xl mx-auto mb-16">
            A structured, hands-on approach to unlocking your next stage of growth.
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            {phases.map((phase) => (
              <div key={phase.step} className="relative p-8 bg-white border border-stone-200 rounded-2xl">
                <span className="text-5xl font-bold text-stone-100">{phase.step}</span>
                <h3 className="text-xl font-bold mt-2 mb-1">{phase.title}</h3>
                <p className="text-sm text-wespa-red font-semibold mb-4">{phase.duration}</p>
                <p className="text-stone-600">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Models */}
      <section className="section-spacing bg-stone-50">
        <div className="container-wespa">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Two Ways to Work Together</h2>
          <p className="text-stone-600 text-center max-w-2xl mx-auto mb-16">
            Choose the engagement model that fits your company and ambitions.
          </p>

          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {tracks.map((track) => (
              <div key={track.title} className="p-8 bg-white border border-stone-200 rounded-2xl">
                <h3 className="text-2xl font-bold mb-1">{track.title}</h3>
                <p className="text-wespa-red font-semibold text-sm mb-4">{track.subtitle}</p>
                <p className="text-stone-600 mb-6">{track.description}</p>
                <Button variant="secondary" asChild>
                  <Link href="/contact">{track.cta}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing">
        <div className="container-wespa text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Scale?</h2>
          <p className="text-stone-600 max-w-xl mx-auto mb-8">
            If you have a proven product, paying customers, and a team ready to grow — let&apos;s talk.
          </p>
          <Button variant="wespa" size="lg" asChild>
            <Link href="/contact">Apply Your Startup</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
