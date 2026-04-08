// ============================================
// WESPA Website - Navigation Configuration
// ============================================

import { NavItem } from '@/types'

// Primary navigation - shown in main header area
export const mainNavigation: NavItem[] = [
  {
    label: 'Workspaces',
    href: '/workspaces',
    children: [
      { label: 'Coworking', href: '/workspaces/coworking' },
      { label: 'Meeting Rooms', href: '/workspaces/meeting-rooms' },
      { label: 'Offices', href: '/workspaces/offices' },
      { label: 'Custom Office Zones', href: '/workspaces/custom-office-zones' },
      { label: 'Conference Rooms', href: '/workspaces/conference-rooms' },
    ],
  },
  {
    label: 'Events',
    href: '/events',
    children: [
      { label: 'Custom Special Events', href: '/events/custom-special-events' },
      { label: 'Custom Business Events', href: '/events/custom-business-events' },
      { label: 'Event Spaces', href: '/events/event-spaces' },
    ],
  },
  {
    label: 'Food',
    href: '/food',
    children: [
      { label: 'Papel', href: '/food/papel' },
      { label: 'Spot', href: '/food/spot' },
    ],
  },
  {
    label: 'Location',
    href: '/location',
    children: [
      { label: 'Business & Lounge', href: '/location/business-lounge' },
      { label: 'Urban Hub', href: '/location/urban-hub' },
    ],
  },
  {
    label: 'Grow Your Company',
    href: '/grow-your-company',
  },
  {
    label: 'Community',
    href: '/community',
  },
  {
    label: 'Resources',
    href: '/resources',
  },
]

// Secondary links - shown in footer or secondary positions
export const secondaryNavigation: NavItem[] = [
  { label: 'Contact', href: '/contact' },
  { label: 'About', href: '/about' },
]

export const footerNavigation = {
  workspaces: [
    { label: 'Coworking', href: '/workspaces/coworking' },
    { label: 'Meeting Rooms', href: '/workspaces/meeting-rooms' },
    { label: 'Offices', href: '/workspaces/offices' },
    { label: 'Custom Office Zones', href: '/workspaces/custom-office-zones' },
    { label: 'Conference Rooms', href: '/workspaces/conference-rooms' },
  ],
  food: [
    { label: 'Papel', href: '/food/papel' },
    { label: 'Spot', href: '/food/spot' },
  ],
  events: [
    { label: 'Custom Special Events', href: '/events/custom-special-events' },
    { label: 'Custom Business Events', href: '/events/custom-business-events' },
    { label: 'Event Spaces', href: '/events/event-spaces' },
  ],
  company: [
    { label: 'About WESPA', href: '/about' },
    { label: 'Grow Your Company', href: '/grow-your-company' },
    { label: 'Community', href: '/community' },
    { label: 'Resources', href: '/resources' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'General Terms', href: '/terms' },
    { label: 'Code of Conduct & House Rules', href: '/house-rules' },
  ],
}
