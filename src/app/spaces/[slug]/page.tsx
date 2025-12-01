'use client'

// ============================================
// WESPA Website - Space Detail Page
// Individual space view with booking options
// ============================================

import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/atoms/Button'
import { Icon, IconName } from '@/components/atoms/Icon'
import { Tag } from '@/components/atoms/Tag'
import { LeadForm } from '@/components/molecules/Form'

// ============================================
// Space Data (would come from API/CMS)
// ============================================
const spacesData: Record<string, {
  name: string
  type: string
  description: string
  longDescription: string
  capacity: { min: number; max: number }
  price: { amount: number; period: string }
  amenities: { icon: IconName; label: string }[]
  images: string[]
  location: string
}> = {
  'flydesk-access': {
    name: 'FlyDesk Access',
    type: 'Coworking',
    description: 'Flexible hot desk access in our premium coworking space.',
    longDescription: 'FlyDesk Access gives you the freedom to work from any available desk in our vibrant coworking spaces. Perfect for freelancers, remote workers, and entrepreneurs who value flexibility. Enjoy full access to common areas, high-speed WiFi, complimentary coffee, and the opportunity to connect with like-minded professionals.',
    capacity: { min: 1, max: 1 },
    price: { amount: 150, period: 'month' },
    amenities: [
      { icon: 'wifi', label: 'High-Speed WiFi' },
      { icon: 'coffee', label: 'Complimentary Coffee' },
      { icon: 'printer', label: 'Print & Scan' },
      { icon: 'users', label: 'Lounge Access' },
      { icon: 'calendar', label: 'Meeting Room Credits' },
      { icon: 'mail', label: 'Mail Handling' },
    ],
    images: ['/images/spaces/coworking-1.jpg', '/images/spaces/coworking-2.jpg', '/images/spaces/lounge-1.jpg'],
    location: 'WESPA Business & WESPA Lounge',
  },
  'dedicated-desk': {
    name: 'Dedicated Desk',
    type: 'Dedicated Desk',
    description: 'Your personal dedicated workspace with storage.',
    longDescription: 'Dedicated Desk provides you with a permanent desk in our coworking space that\'s exclusively yours. Keep your setup ready, store your belongings securely, and enjoy the consistency of your own space while still being part of our dynamic community. Includes 24/7 access and lockable storage.',
    capacity: { min: 1, max: 1 },
    price: { amount: 300, period: 'month' },
    amenities: [
      { icon: 'wifi', label: 'High-Speed WiFi' },
      { icon: 'lock', label: 'Lockable Storage' },
      { icon: 'clock', label: '24/7 Access' },
      { icon: 'mail', label: 'Mail Handling' },
      { icon: 'calendar', label: 'Meeting Room Credits' },
      { icon: 'coffee', label: 'Complimentary Coffee' },
    ],
    images: ['/images/spaces/coworking-2.jpg', '/images/spaces/coworking-1.jpg', '/images/spaces/lounge-2.jpg'],
    location: 'WESPA Business',
  },
  'private-office-small': {
    name: 'Private Office (2-4)',
    type: 'Private Office',
    description: 'Private office for small teams.',
    longDescription: 'Our small private offices are perfect for teams of 2-4 people who need a dedicated, enclosed workspace. Enjoy complete privacy, custom branding options, and all the benefits of being part of the WESPA community. Includes 24/7 access, lockable doors, and access to all shared amenities.',
    capacity: { min: 2, max: 4 },
    price: { amount: 800, period: 'month' },
    amenities: [
      { icon: 'lock', label: 'Private & Secure' },
      { icon: 'clock', label: '24/7 Access' },
      { icon: 'wifi', label: 'Dedicated WiFi' },
      { icon: 'building', label: 'Custom Branding' },
      { icon: 'calendar', label: 'Meeting Room Credits' },
      { icon: 'coffee', label: 'Complimentary Coffee' },
    ],
    images: ['/images/spaces/office-Copy-of-DSC_4745.jpg', '/images/spaces/office-Copy-of-DSC_4752.jpg', '/images/spaces/office-Copy-of-Copy-of-DSC_4715.jpg'],
    location: 'WESPA Business',
  },
  'private-office-medium': {
    name: 'Private Office (5-10)',
    type: 'Private Office',
    description: 'Medium-sized private office for growing teams.',
    longDescription: 'Our medium private offices provide room to grow for teams of 5-10 people. Designed for scaling businesses, these offices offer flexibility, privacy, and all the amenities needed for productive teamwork. Includes meeting room credits, reception services, and enterprise-grade infrastructure.',
    capacity: { min: 5, max: 10 },
    price: { amount: 1500, period: 'month' },
    amenities: [
      { icon: 'lock', label: 'Private & Secure' },
      { icon: 'clock', label: '24/7 Access' },
      { icon: 'wifi', label: 'Dedicated WiFi' },
      { icon: 'building', label: 'Custom Branding' },
      { icon: 'calendar', label: 'Meeting Rooms Included' },
      { icon: 'users', label: 'Reception Services' },
    ],
    images: ['/images/spaces/office-Copy-of-DSC_4752.jpg', '/images/spaces/office-Copy-of-DSC_4745.jpg', '/images/spaces/office-Copy-of-Copy-of-DSC_4715.jpg'],
    location: 'WESPA Business',
  },
  'meeting-room-small': {
    name: 'Meeting Room S',
    type: 'Meeting Space',
    description: 'Intimate meeting room for focused discussions.',
    longDescription: 'Our small meeting rooms are perfect for quick syncs, one-on-ones, or focused discussions with up to 6 people. Equipped with a display screen, whiteboard, and video conferencing capabilities to ensure productive meetings every time.',
    capacity: { min: 2, max: 6 },
    price: { amount: 25, period: 'hour' },
    amenities: [
      { icon: 'monitor', label: 'Display Screen' },
      { icon: 'wifi', label: 'High-Speed WiFi' },
      { icon: 'phone', label: 'Video Conferencing' },
      { icon: 'users', label: 'Whiteboard' },
      { icon: 'coffee', label: 'Refreshments' },
    ],
    images: ['/images/spaces/meeting-KGD_8894-Edit.jpg', '/images/spaces/meeting-KGZ_1671-HDR.jpg', '/images/spaces/meeting-Copy-of-Conference-4.jpg'],
    location: 'WESPA Business',
  },
  'meeting-room-large': {
    name: 'Meeting Room L',
    type: 'Meeting Space',
    description: 'Spacious meeting room for larger team gatherings.',
    longDescription: 'Our large meeting rooms accommodate teams of up to 14 people, perfect for workshops, client presentations, or team meetings. Fully equipped with presentation technology, video conferencing, whiteboards, and optional catering services to make every meeting a success.',
    capacity: { min: 6, max: 14 },
    price: { amount: 45, period: 'hour' },
    amenities: [
      { icon: 'monitor', label: 'Presentation Display' },
      { icon: 'wifi', label: 'High-Speed WiFi' },
      { icon: 'phone', label: 'Video Conferencing' },
      { icon: 'users', label: 'Whiteboard' },
      { icon: 'coffee', label: 'Refreshments' },
      { icon: 'utensils', label: 'Catering Available' },
    ],
    images: ['/images/spaces/meeting-KGZ_1671-HDR.jpg', '/images/spaces/meeting-KGD_8894-Edit.jpg', '/images/spaces/meeting-Copy-of-Conference-4.jpg'],
    location: 'WESPA Business & WESPA Lounge',
  },
  'urban-hub-day-pass': {
    name: 'Urban Hub Day Pass',
    type: 'Day Pass',
    description: 'Full-day access to our premium urban hub.',
    longDescription: 'Urban Hub Day Pass offers the ultimate flexible workspace experience. Purchase a day pass and enjoy full access to our coworking areas, lounges, cafés, and amenities. Perfect for visitors, occasional workers, or those wanting to try WESPA before committing to a membership.',
    capacity: { min: 1, max: 1 },
    price: { amount: 35, period: 'day' },
    amenities: [
      { icon: 'wifi', label: 'High-Speed WiFi' },
      { icon: 'coffee', label: 'Coffee & Refreshments' },
      { icon: 'users', label: 'Lounge Access' },
      { icon: 'calendar', label: 'Networking Events' },
      { icon: 'printer', label: 'Print & Scan' },
      { icon: 'utensils', label: 'Restaurant Discounts' },
    ],
    images: ['/images/spaces/urban-hub-1.jpg', '/images/spaces/lounge-1.jpg', '/images/spaces/coworking-1.jpg'],
    location: 'WESPA Business',
  },
  'business-lounge': {
    name: 'Business Lounge Membership',
    type: 'Premium Membership',
    description: 'Exclusive access to our sophisticated business lounge.',
    longDescription: 'The Business Lounge is our most exclusive membership tier. Enjoy access to our premium lounge with leather seating, private meeting pods, cigar room, and cocktail bar. Perfect for executives and professionals who demand the finest work environment and networking opportunities.',
    capacity: { min: 1, max: 1 },
    price: { amount: 500, period: 'month' },
    amenities: [
      { icon: 'star', label: 'Premium Lounge' },
      { icon: 'coffee', label: 'Cigar Room' },
      { icon: 'utensils', label: 'Cocktail Bar' },
      { icon: 'users', label: 'Concierge Service' },
      { icon: 'calendar', label: 'Priority Booking' },
      { icon: 'briefcase', label: 'Executive Events' },
    ],
    images: ['/images/spaces/lounge-1.jpg', '/images/spaces/lounge-2.jpg', '/images/spaces/urban-hub-1.jpg'],
    location: 'WESPA Business',
  },
}

// ============================================
// Space Detail Page
// ============================================
export default function SpaceDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const space = spacesData[slug]

  // 404 if space not found
  if (!space) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-stone-900 mb-4">Space Not Found</h1>
          <p className="text-stone-600 mb-8">The space you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/spaces">View All Spaces</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Hero with Image Gallery */}
      <section className="relative bg-stone-900">
        <div className="container-wespa py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-stone-400 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <Icon name="chevron-right" size="xs" />
            <Link href="/spaces" className="hover:text-white">Spaces</Link>
            <Icon name="chevron-right" size="xs" />
            <span className="text-white">{space.name}</span>
          </nav>

          {/* Image Grid */}
          <div className="grid md:grid-cols-3 gap-4 h-[400px] md:h-[500px]">
            <motion.div
              className="md:col-span-2 relative rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Image
                src={space.images[0]}
                alt={space.name}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
            <div className="hidden md:grid grid-rows-2 gap-4">
              {space.images.slice(1, 3).map((img, i) => (
                <motion.div
                  key={i}
                  className="relative rounded-2xl overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (i + 1) * 0.1 }}
                >
                  <Image src={img} alt={`${space.name} ${i + 2}`} fill className="object-cover" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-20">
        <div className="container-wespa">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Header */}
              <div>
                <Tag className="mb-4">{space.type}</Tag>
                <h1 className="text-4xl lg:text-5xl font-bold text-stone-900 mb-4">
                  {space.name}
                </h1>
                <p className="text-xl text-stone-600">{space.description}</p>
              </div>

              {/* Details */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-stone-600">
                  <Icon name="users" size="md" />
                  <span>
                    {space.capacity.min === space.capacity.max
                      ? `${space.capacity.max} person`
                      : `${space.capacity.min}-${space.capacity.max} people`}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-stone-600">
                  <Icon name="map-pin" size="md" />
                  <span>{space.location}</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-2xl font-semibold text-stone-900 mb-4">About this space</h2>
                <p className="text-stone-600 leading-relaxed">{space.longDescription}</p>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="text-2xl font-semibold text-stone-900 mb-6">What's included</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {space.amenities.map((amenity, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-4 p-4 bg-stone-50 rounded-xl"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                        <Icon name={amenity.icon} size="md" className="text-stone-700" />
                      </div>
                      <span className="text-stone-700 font-medium">{amenity.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar - Booking Card */}
            <div className="lg:col-span-1">
              <motion.div
                className="sticky top-24 bg-white border border-stone-200 rounded-2xl p-6 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-stone-900">€{space.price.amount}</span>
                    <span className="text-stone-500">/ {space.price.period}</span>
                  </div>
                  <p className="text-sm text-stone-500 mt-1">Starting price, varies by configuration</p>
                </div>

                {/* Quick Actions */}
                <div className="space-y-3 mb-6">
                  <Button variant="wespa" fullWidth size="lg" asChild>
                    <Link href="/book-visit">Book a Tour</Link>
                  </Button>
                  <Button variant="secondary" fullWidth asChild>
                    <Link href="/contact">Contact Sales</Link>
                  </Button>
                </div>

                {/* Info */}
                <div className="border-t border-stone-100 pt-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <Icon name="check" size="sm" className="text-green-600 mt-0.5" />
                    <span className="text-sm text-stone-600">Flexible terms available</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="check" size="sm" className="text-green-600 mt-0.5" />
                    <span className="text-sm text-stone-600">Move in within 24 hours</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="check" size="sm" className="text-green-600 mt-0.5" />
                    <span className="text-sm text-stone-600">All-inclusive pricing</span>
                  </div>
                </div>

                {/* Help */}
                <div className="mt-6 p-4 bg-stone-50 rounded-xl">
                  <p className="text-sm text-stone-600">
                    Need help choosing? Our team can recommend the best space for your needs.
                  </p>
                  <a href="tel:+38512345678" className="inline-flex items-center gap-2 mt-2 text-sm font-medium text-stone-900 hover:text-wespa-red">
                    <Icon name="phone" size="sm" />
                    +385 1 234 5678
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Spaces */}
      <section className="py-12 bg-stone-50">
        <div className="container-wespa">
          <h2 className="text-2xl font-semibold text-stone-900 mb-8">Explore other spaces</h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {Object.entries(spacesData)
              .filter(([key]) => key !== slug)
              .slice(0, 4)
              .map(([key, s]) => (
                <Link
                  key={key}
                  href={`/spaces/${key}`}
                  className="flex-shrink-0 w-72 bg-white rounded-xl overflow-hidden border border-stone-200 hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-video relative">
                    <Image src={s.images[0]} alt={s.name} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-stone-500">{s.type}</p>
                    <h3 className="font-semibold text-stone-900">{s.name}</h3>
                    <p className="text-sm text-stone-600 mt-1">From €{s.price.amount}/{s.price.period}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  )
}
