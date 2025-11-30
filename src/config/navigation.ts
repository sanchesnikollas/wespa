// ============================================
// WESPA Website - Navigation Configuration
// ============================================

import { NavItem } from '@/types'

export const mainNavigation: NavItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Hospitality',
    href: '/hospitality',
    children: [
      {
        label: 'Papel Restaurant',
        href: '/hospitality/papel',
      },
      {
        label: 'SPOT Restaurant',
        href: '/hospitality/spot',
      },
    ],
  },
  {
    label: 'Spaces',
    href: '/spaces',
    children: [
      {
        label: 'Co-working',
        href: '/spaces?type=coworking',
      },
      {
        label: 'Meetings',
        href: '/spaces?type=meeting',
      },
      {
        label: 'Offices',
        href: '/spaces?type=office',
      },
      {
        label: 'Working Space',
        href: '/spaces?type=working-space',
      },
      {
        label: 'Urban Hub / Business & Lounge',
        href: '/spaces?type=urban-hub',
      },
    ],
  },
  {
    label: 'Stage',
    href: '/stage',
    children: [
      {
        label: 'Custom Special Events',
        href: '/stage?category=social',
      },
      {
        label: 'Business Events',
        href: '/stage?category=corporate',
      },
      {
        label: 'Workshops & Podcasts',
        href: '/stage?category=workshop',
      },
    ],
  },
  {
    label: 'Book a Visit',
    href: '/book-visit',
  },
  {
    label: 'Franchise',
    href: '/franchise',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
]

export const secondaryNavigation: NavItem[] = [
  {
    label: 'Ideas by WESPA',
    href: '/ideas',
  },
  {
    label: 'Client Stories',
    href: '/client-stories',
  },
]

export const footerNavigation = {
  spaces: [
    { label: 'Co-working', href: '/spaces?type=coworking' },
    { label: 'Private Offices', href: '/spaces?type=office' },
    { label: 'Meeting Rooms', href: '/spaces?type=meeting' },
    { label: 'Urban Hub', href: '/spaces?type=urban-hub' },
    { label: 'Business & Lounge', href: '/spaces?type=business-lounge' },
  ],
  hospitality: [
    { label: 'Papel Restaurant', href: '/hospitality/papel' },
    { label: 'SPOT Restaurant', href: '/hospitality/spot' },
  ],
  stage: [
    { label: 'Corporate Events', href: '/stage?category=corporate' },
    { label: 'Social Events', href: '/stage?category=social' },
    { label: 'Workshops', href: '/stage?category=workshop' },
    { label: 'Podcasts', href: '/stage?category=podcast' },
  ],
  company: [
    { label: 'About WESPA', href: '/about' },
    { label: 'Ideas by WESPA', href: '/ideas' },
    { label: 'Client Stories', href: '/client-stories' },
    { label: 'Franchise', href: '/franchise' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'General Terms', href: '/terms' },
    { label: 'Code of Conduct & House Rules', href: '/house-rules' },
  ],
}
