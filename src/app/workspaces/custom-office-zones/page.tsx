import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'

export const metadata: Metadata = {
  title: 'Custom Office Zones',
  description: 'Dedicated office spaces up to 150m² with fully customizable layouts at WESPA Zagreb. Includes meeting room hours, 24/7 access, and all utilities.',
}

export default function CustomOfficeZonesPage() {
  return (
    <main>
      <section className="relative text-white py-24 md:py-32 overflow-hidden">
        <Image src="/images/workspaces/offices/office-2.jpg" alt="WESPA custom office zones" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-stone-900/75" />
        <div className="container-wespa relative z-10">
          <p className="text-wespa-red font-semibold mb-4">Workspaces</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Custom Office Zones</h1>
          <p className="text-lg md:text-xl text-stone-300 max-w-2xl">
            Dedicated spaces up to 150m² with fully customizable layouts. Design your ideal work environment within the WESPA ecosystem.
          </p>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-wespa max-w-4xl">
          <div className="grid gap-8 md:grid-cols-3 mb-16">
            {[
              { title: 'Up to 150m²', desc: 'Generous spaces for growing teams' },
              { title: 'Fully Customizable', desc: 'Design the layout that works for you' },
              { title: 'All-Inclusive', desc: 'Utilities, internet, cleaning included' },
            ].map((item) => (
              <div key={item.title} className="text-center p-6">
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-stone-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-stone-50 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Interested in a Custom Zone?</h2>
            <p className="text-stone-600 mb-8 max-w-xl mx-auto">Our team will help you design the perfect space. Pricing is tailored to your specific requirements.</p>
            <Button variant="wespa" size="lg" asChild>
              <Link href="/contact">Request a Quote</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
