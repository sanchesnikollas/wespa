import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'

export const metadata: Metadata = {
  title: 'Community | WESPA',
  description: 'Join the WESPA community — newsletter, events, WESPA Talks podcast, blog highlights, and membership perks including 24/7 access, meeting rooms, and food discounts.',
}

const eventCategories = [
  {
    title: 'Education',
    description: 'Workshops, masterclasses, and skill-building sessions led by industry experts and community members.',
  },
  {
    title: 'Networking',
    description: 'Structured and informal gatherings designed to connect professionals, founders, and creatives across industries.',
  },
  {
    title: 'Fun',
    description: 'After-work socials, game nights, fitness sessions, and seasonal celebrations that make work-life balance real.',
  },
]

const membershipPerks = [
  {
    title: '24/7 Access',
    description: 'Round-the-clock access to WESPA spaces. Work on your schedule, not ours.',
  },
  {
    title: 'Podcast Promotion',
    description: 'Get featured on WESPA Talks and amplify your story to our growing audience.',
  },
  {
    title: 'Exclusive Events',
    description: 'Members-only workshops, dinners, and networking sessions you will not find anywhere else.',
  },
  {
    title: 'WhatsApp Group',
    description: 'Direct access to the WESPA community channel — share opportunities, ask questions, and stay connected.',
  },
  {
    title: '2 Hours Meeting Room / Month',
    description: 'Complimentary meeting room access every month, included with your membership.',
  },
  {
    title: 'Food Discounts',
    description: 'Exclusive discounts at Papel and SPOT restaurants for all community members.',
  },
]

export default function CommunityPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative text-white py-24 md:py-32 overflow-hidden">
        <Image src="/images/events/spaces/venue-3.jpg" alt="WESPA community" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-stone-900/75" />
        <div className="container-wespa relative z-10">
          <p className="text-wespa-red font-medium mb-4">Home / Community</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">WESPA Community</h1>
          <p className="text-lg md:text-xl text-stone-300 max-w-2xl">
            More than a workspace — a community of professionals, creators, and entrepreneurs building something meaningful together.
          </p>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-spacing">
        <div className="container-wespa">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              Stay in the Loop
            </h2>
            <p className="text-lg text-stone-600 mb-8">
              Sign up for the WESPA newsletter and get community updates, event invitations, and exclusive content delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 border border-stone-300 rounded-xl text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-wespa-red focus:border-transparent"
              />
              <Button variant="wespa">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Community Events */}
      <section className="section-spacing bg-stone-50">
        <div className="container-wespa">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">Community Events</h2>
          <p className="text-lg text-stone-600 mb-10 max-w-2xl">
            Regular events that educate, connect, and energize the WESPA community.
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            {eventCategories.map((cat) => (
              <div key={cat.title} className="p-8 bg-white border border-stone-200 rounded-2xl">
                <h3 className="text-2xl font-bold text-stone-900 mb-3">{cat.title}</h3>
                <p className="text-stone-600">{cat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Highlights */}
      <section className="section-spacing">
        <div className="container-wespa">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              From the Blog
            </h2>
            <p className="text-lg text-stone-600 mb-8">
              Insights, stories, and ideas from the WESPA community. From founder spotlights to industry trends — our blog is where the community shares its voice.
            </p>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/resources">Read the Blog</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* WESPA Talks Podcast */}
      <section className="section-spacing bg-stone-900 text-white">
        <div className="container-wespa">
          <div className="max-w-3xl">
            <p className="text-wespa-red font-medium mb-4">Podcast</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">WESPA Talks</h2>
            <p className="text-lg text-stone-300 mb-4">
              Conversations with founders, creators, and business leaders from the WESPA community and beyond. Real stories, real insights, no fluff.
            </p>
            <p className="text-lg text-stone-300 mb-8">
              Community members get the opportunity to be featured as guests and share their journey with our growing audience.
            </p>
            <Button variant="wespa" size="lg">
              Listen to WESPA Talks
            </Button>
          </div>
        </div>
      </section>

      {/* Community Membership */}
      <section className="section-spacing">
        <div className="container-wespa">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              Community Membership
            </h2>
            <p className="text-lg text-stone-600">
              Join the WESPA community and unlock perks designed to support your work and growth.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {membershipPerks.map((perk) => (
              <div key={perk.title} className="p-6 bg-white border border-stone-200 rounded-2xl">
                <h3 className="text-xl font-bold text-stone-900 mb-3">{perk.title}</h3>
                <p className="text-stone-600">{perk.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-stone-50">
        <div className="container-wespa text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
            Become a Member
          </h2>
          <p className="text-lg text-stone-600 mb-8 max-w-xl mx-auto">
            Join the WESPA community and get access to spaces, events, perks, and a network of professionals who are building the future.
          </p>
          <Button variant="wespa" size="lg" asChild>
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
