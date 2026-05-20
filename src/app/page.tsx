// ============================================
// WESPA Website - Homepage
// Server Component — Sections internas sao Client onde precisam
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
  MediaSection,
} from '@/components/organisms/Sections'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ClientLogosSection />
      <LocationsSection />
      <PlansSection />
      <FeaturesSection />
      <PainPointsSection />
      <TestimonialsSection stories={[]} />
      <LeadFormSection />
      <MediaSection />
    </>
  )
}
