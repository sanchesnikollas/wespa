/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Output standalone for faster builds and smaller deployments
  output: 'standalone',

  // Image optimization configuration
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Use unoptimized since we're serving static images from public folder
    // This ensures images work reliably on all hosting platforms (Railway, Vercel, etc.)
    unoptimized: true,
  },

  // Enable experimental features
  experimental: {
    // Optimize package imports
    optimizePackageImports: ['framer-motion', 'react-hook-form'],
  },

  // Headers for security and SEO
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },

  // Redirect legacy URLs to new structure
  async redirects() {
    return [
      // Legacy internal rebranding
      { source: '/spaces', destination: '/workspaces', permanent: true },
      { source: '/spaces/:path*', destination: '/workspaces/:path*', permanent: true },
      { source: '/hospitality', destination: '/food', permanent: true },
      { source: '/hospitality/papel', destination: '/food/papel', permanent: true },
      { source: '/hospitality/spot', destination: '/food/spot', permanent: true },
      { source: '/stage', destination: '/events', permanent: true },
      { source: '/stage/business-events', destination: '/events/custom-business-events', permanent: true },
      { source: '/stage/special-events', destination: '/events/custom-special-events', permanent: true },
      { source: '/franchise', destination: '/grow-your-company', permanent: true },
      { source: '/ideas', destination: '/resources', permanent: true },
      { source: '/ideas/:slug', destination: '/resources/:slug', permanent: true },

      // wespa.hr legacy — English slugs
      { source: '/en', destination: '/', permanent: true },
      { source: '/en/home', destination: '/', permanent: true },
      { source: '/home', destination: '/', permanent: true },
      { source: '/en/contact', destination: '/contact', permanent: true },
      { source: '/en/coworking-in-zagreb', destination: '/workspaces/coworking', permanent: true },
      { source: '/en/meeting-rooms', destination: '/workspaces/meeting-rooms', permanent: true },
      { source: '/en/office-for-rent-in-zagreb', destination: '/workspaces/offices', permanent: true },
      { source: '/en/virtual-company', destination: '/workspaces/virtual-office', permanent: true },
      { source: '/en/virtual-office', destination: '/workspaces/virtual-office', permanent: true },
      { source: '/en/wespa-locations', destination: '/location', permanent: true },
      { source: '/en/locations', destination: '/location', permanent: true },
      { source: '/en/events', destination: '/events', permanent: true },
      { source: '/en/services', destination: '/workspaces', permanent: true },
      { source: '/en/workspace', destination: '/workspaces', permanent: true },
      { source: '/en/wespa-business-and-lounge', destination: '/location/business-lounge', permanent: true },
      { source: '/en/wespa-business-lounge', destination: '/location/business-lounge', permanent: true },
      { source: '/en/wespa-spaces', destination: '/location/urban-hub', permanent: true },

      // wespa.hr legacy — Croatian slugs
      { source: '/coworking-u-zagrebu', destination: '/workspaces/coworking', permanent: true },
      { source: '/sobe-za-sastanke', destination: '/workspaces/meeting-rooms', permanent: true },
      { source: '/ured-za-najam-u-zagrebu', destination: '/workspaces/offices', permanent: true },
      { source: '/virtualna-adresa', destination: '/workspaces/virtual-office', permanent: true },
      { source: '/wespa-lokacije', destination: '/location', permanent: true },
      { source: '/lokacije', destination: '/location', permanent: true },
      { source: '/locations', destination: '/location', permanent: true },
      { source: '/services', destination: '/workspaces', permanent: true },
      { source: '/workspace', destination: '/workspaces', permanent: true },
      { source: '/wespa-business-lounge', destination: '/location/business-lounge', permanent: true },
      { source: '/wespa-spaces', destination: '/location/urban-hub', permanent: true },

      // Legal page legacy slugs
      { source: '/code-of-conduct-and-house-rules', destination: '/house-rules', permanent: true },
      { source: '/general-terms', destination: '/terms', permanent: true },
      { source: '/privacy-policy', destination: '/privacy', permanent: true },
    ]
  },
}

module.exports = nextConfig
