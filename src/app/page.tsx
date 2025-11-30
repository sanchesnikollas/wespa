'use client'

// ============================================
// WESPA Website - Homepage
// Frame: 01_Home_Desktop / 01_Home_Mobile
// ============================================

import {
  HeroSection,
  PlansSection,
  FeaturesSection,
  TestimonialsSection,
  PainPointsSection,
  LocationsSection,
  LeadFormSection,
  IdeasSection,
  WorkplaceTeaserSection,
} from '@/components/organisms/Sections'

/**
 * Homepage Flow Structure (inspired by WeWork reference):
 *
 * 1. Hero "The workspace, redefined" → Entry point with filter form
 * 2. Private Offices & Coworking Plans → Cards showing plans + metrics
 * 3. Features Grid (6 icons) → "Why choose WESPA?"
 * 4. Testimonials & Logos → Social proof
 * 5. Pain Points → "Is the traditional office holding you back?"
 * 6. Our Locations → Business & Lounge + Spaces cards
 * 7. Main Lead Form → "Ready to elevate your work environment?"
 * 8. Ideas by WESPA → Blog/research articles
 * 9. WESPA Workplace Teaser → Future digital product
 * 10. Footer → Contact, navigation, newsletter
 */

export default function HomePage() {
  return (
    <>
      {/* Hero Section - Entry point of conversion funnel */}
      <HeroSection />

      {/* Plans & Metrics - Understanding phase */}
      <PlansSection />

      {/* Features Grid - Value proposition */}
      <FeaturesSection />

      {/* Testimonials - Social proof phase */}
      <TestimonialsSection stories={[]} />

      {/* Pain Points - Empathy & solution framing */}
      <PainPointsSection />

      {/* Locations - Exploration phase */}
      <LocationsSection />

      {/* Main Lead Form - Primary conversion point */}
      <LeadFormSection />

      {/* Ideas/Blog - Content & SEO */}
      <IdeasSection />

      {/* WESPA Workplace - Future vision */}
      <WorkplaceTeaserSection />
    </>
  )
}
