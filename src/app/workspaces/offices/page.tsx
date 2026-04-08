import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'

export const metadata: Metadata = {
  title: 'Private Offices',
  description: 'Private offices for teams of 2-12 people at WESPA Zagreb. All-inclusive with utilities, internet, cleaning, reception, and meeting rooms.',
}

export default function OfficesPage() {
  return (
    <main>
      <section className="relative text-white py-24 md:py-32 overflow-hidden">
        <Image src="/images/workspaces/offices/office-1.jpg" alt="WESPA private offices" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-stone-900/75" />
        <div className="container-wespa relative z-10">
          <p className="text-wespa-red font-semibold mb-4">Workspaces</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Private Offices</h1>
          <p className="text-lg md:text-xl text-stone-300 max-w-2xl">
            Private offices for teams of 2-12 people. All-inclusive amenities with the benefits of a thriving community.
          </p>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-wespa max-w-4xl">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold mb-6">Everything Included</h2>
              <ul className="space-y-4">
                {['Utilities & high-speed internet', 'Professional cleaning', 'Reception services', 'Meeting room hours included', '24/7 secure access', 'Mail & package handling', 'Community events access', 'On-site restaurants'].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-stone-700">
                    <span className="text-wespa-red font-bold">✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-stone-50 rounded-2xl p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4">Get a Custom Quote</h3>
              <p className="text-stone-600 mb-6">Pricing depends on team size, location preference, and lease duration. Contact us for a personalized offer.</p>
              <Button variant="wespa" size="lg" asChild>
                <Link href="/contact">Request a Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
