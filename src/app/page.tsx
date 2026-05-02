'use client'

// ============================================
// WESPA Website - Homepage
// ============================================

import {
  HeroSection,
  ClientLogosSection,
  PlansSection,
  FeaturesSection,
  TestimonialsSection,
  PainPointsSection,
  LocationsSection,
  LeadFormSection,
  IdeasSection,
  MediaSection,
  WorkplaceTeaserSection,
} from '@/components/organisms/Sections'

/**
 * Homepage Flow Structure (aligned with briefing):
 *
 * 1. Hero — "The workspace, redefined" with stats + dual CTAs
 * 2. Client Logos — Social proof bar with real client logos
 * 3. Plans — Coworking plans (FlyDesk, FlyDesk+Lunch, OwnDesk, OfficeDesk) + metrics
 * 4. Features Grid — 8 amenities (events, lounge, gastro, podcast, focus, relax, pet, parking)
 * 5. Pain Points — 3 personas (freelancers, growing teams, corporations)
 * 6. Testimonials — SaltPay, Felloz, Navigo Sport Travel + client logos
 * 7. Locations — Business & Lounge + Urban Hub
 * 8. Lead Form — Main conversion point
 * 9. Ideas/Resources — Blog articles
 * 10. WESPA Workplace — Future digital product teaser
 */

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ClientLogosSection />
      <PlansSection />
      <FeaturesSection />
      <PainPointsSection />
      <TestimonialsSection stories={[]} />
      <LocationsSection />
      <LeadFormSection />
      <IdeasSection />
      <MediaSection />
      <WorkplaceTeaserSection />
    </>
  )
}
