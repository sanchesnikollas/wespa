import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'

export const metadata: Metadata = {
  title: 'Coworking',
  description: 'Flexible coworking spaces in Zagreb. FlyDesk from €30/day, OwnDesk from €219/month. All-inclusive with WiFi, meeting rooms, and community access.',
}

const plans = [
  { name: 'FlyDesk', price: '€30', period: '/day', description: 'Flexible daily access to any available desk with full amenities.', features: ['Access to any available desk', 'High-speed WiFi', 'Meeting room access', 'Print & scan services', 'Community events', 'Lounge access'] },
  { name: 'FlyDesk + Lunch', price: '€35', period: '/day', description: 'Everything in FlyDesk plus daily lunch at our on-site restaurants.', features: ['All FlyDesk benefits', 'Daily lunch included', 'Choice of Papel or SPOT', 'Healthy, fresh options'] },
  { name: 'OwnDesk', price: '€219', period: '/month', description: 'Your personal dedicated desk in our coworking space.', features: ['Personal dedicated desk', 'Lockable storage', '24/7 access', 'Meeting room credits', 'Mail handling', 'High-speed WiFi'], popular: true },
  { name: 'OfficeDesk', price: '€226', period: '/month', description: 'Private office space for small teams with all community benefits.', features: ['Private office (2-6 people)', 'Dedicated phone line', 'Meeting room credits', '24/7 access', 'Custom branding options', 'Priority support'] },
]

export default function CoworkingPage() {
  return (
    <main>
      <section className="relative text-white py-24 md:py-32 overflow-hidden">
        <Image src="/images/workspaces/coworking/coworking-2.jpg" alt="WESPA coworking space" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-stone-900/75" />
        <div className="container-wespa relative z-10">
          <p className="text-wespa-red font-semibold mb-4">Workspaces</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Coworking</h1>
          <p className="text-lg md:text-xl text-stone-300 max-w-2xl">
            Choose the plan that fits your work style. All plans include access to our community, amenities, and networking events.
          </p>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-wespa">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan) => (
              <div key={plan.name} className={`relative p-8 bg-white border rounded-2xl ${plan.popular ? 'border-wespa-red shadow-lg' : 'border-stone-200'}`}>
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-wespa-red text-white text-xs font-semibold px-4 py-1 rounded-full">Most Popular</span>
                )}
                <h3 className="text-xl font-bold text-stone-900 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-stone-900">{plan.price}</span>
                  <span className="text-stone-500">{plan.period}</span>
                </div>
                <p className="text-stone-600 text-sm mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-stone-700">
                      <span className="text-wespa-red mt-0.5">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Button variant={plan.popular ? 'wespa' : 'secondary'} fullWidth asChild>
                  <Link href="/book-visit">Get Started</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
