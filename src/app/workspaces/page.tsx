import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'

export const metadata: Metadata = {
  title: 'Workspaces',
  description: 'Discover flexible workspace solutions at WESPA — coworking, private offices, meeting rooms, conference rooms and custom office zones in Zagreb.',
}

const workspaceTypes = [
  { title: 'Coworking', description: 'Flexible desks for freelancers and remote workers. Daily and monthly plans available.', href: '/workspaces/coworking', price: 'From €30/day' },
  { title: 'Meeting Rooms', description: 'Professional meeting rooms for 4-10 people with AV equipment and catering options.', href: '/workspaces/meeting-rooms', price: 'From €22/hour' },
  { title: 'Offices', description: 'Private offices for teams of 2-12 people with all-inclusive amenities.', href: '/workspaces/offices', price: 'On request' },
  { title: 'Custom Office Zones', description: 'Dedicated spaces up to 150m² with fully customizable layouts.', href: '/workspaces/custom-office-zones', price: 'On request' },
  { title: 'Conference Rooms', description: '8 premium conference rooms across 2 locations for up to 500+ attendees.', href: '/workspaces/conference-rooms', price: 'From €47/hour' },
]

export default function WorkspacesPage() {
  return (
    <main>
      <section className="relative text-white py-24 md:py-32 overflow-hidden">
        <Image src="/images/workspaces/coworking/coworking-1.jpg" alt="WESPA workspaces" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-stone-900/75" />
        <div className="container-wespa relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Find Your Perfect Workspace</h1>
          <p className="text-lg md:text-xl text-stone-300 max-w-2xl">
            From flexible hot desks to fully customizable office zones — WESPA offers workspace solutions that grow with your business.
          </p>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-wespa">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {workspaceTypes.map((ws) => (
              <Link key={ws.href} href={ws.href} className="group block p-8 bg-white border border-stone-200 rounded-2xl hover:shadow-card-hover hover:border-stone-300 transition-all">
                <h2 className="text-2xl font-bold text-stone-900 mb-3 group-hover:text-wespa-red transition-colors">{ws.title}</h2>
                <p className="text-stone-600 mb-4">{ws.description}</p>
                <p className="text-lg font-semibold text-wespa-red">{ws.price}</p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-lg text-stone-600 mb-6">Not sure which workspace is right for you?</p>
            <Button variant="wespa" size="lg" asChild>
              <Link href="/book-visit">Book a Tour</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
