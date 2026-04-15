import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Food & Restaurants',
  description:
    'Two restaurants inside WESPA Zagreb: Papel and SPOT. Daily fresh menus, specialty coffee, and premium cocktails. Open to members and the public.',
  keywords: [
    'restaurant Zagreb',
    'coffee Zagreb',
    'WESPA food',
    'Papel restaurant',
    'SPOT restaurant',
    'business lunch Zagreb',
  ],
  openGraph: {
    title: 'Food & Restaurants | WESPA',
    description:
      'Papel and SPOT: two restaurants inside WESPA Zagreb with daily fresh menus and specialty coffee.',
    url: 'https://wespa.hr/food',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'WESPA Food Zagreb' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Food & Restaurants | WESPA',
    description:
      'Papel and SPOT: two restaurants inside WESPA Zagreb with daily fresh menus and specialty coffee.',
    images: ['/og-image.jpg'],
  },
  alternates: { canonical: '/food' },
}

export default function FoodLayout({ children }: { children: React.ReactNode }) {
  return children
}
