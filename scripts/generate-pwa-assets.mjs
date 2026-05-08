#!/usr/bin/env node
// Generate missing PWA / social assets from existing source files.
//   - apple-touch-icon.png (180x180)
//   - icon-192.png, icon-512.png (PWA manifest)
//   - og-image.jpg (1200x630, social cards)
//
// Run with: node scripts/generate-pwa-assets.mjs

import sharp from 'sharp'
import path from 'node:path'

const PUBLIC = path.resolve(process.cwd(), 'public')
const LOGO = path.join(PUBLIC, 'images/logo/fav-icon-dark.png')
const HERO = path.join(PUBLIC, 'images/hero/hero-main.jpg')

async function genIcon(size, output) {
  await sharp(LOGO)
    .resize(size, size, { fit: 'contain', background: { r: 23, g: 23, b: 23, alpha: 1 } })
    .png({ compressionLevel: 9 })
    .toFile(output)
  console.log(`✓ ${path.relative(PUBLIC, output)} (${size}x${size})`)
}

async function genOgImage() {
  // Composite hero + dark gradient + brand mark.
  const w = 1200
  const h = 630
  const base = await sharp(HERO)
    .resize(w, h, { fit: 'cover', position: 'center' })
    .composite([
      {
        input: Buffer.from(
          `<svg width="${w}" height="${h}">
             <defs>
               <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
                 <stop offset="0%" stop-color="#171717" stop-opacity="0.95"/>
                 <stop offset="60%" stop-color="#171717" stop-opacity="0.6"/>
                 <stop offset="100%" stop-color="#171717" stop-opacity="0.2"/>
               </linearGradient>
             </defs>
             <rect width="${w}" height="${h}" fill="url(#g)"/>
             <text x="60" y="${h - 220}" fill="#ffffff" font-family="system-ui,-apple-system,Helvetica" font-size="64" font-weight="800" letter-spacing="-1">WESPA</text>
             <text x="60" y="${h - 150}" fill="#fafaf9" font-family="system-ui,-apple-system,Helvetica" font-size="44" font-weight="700">Premium workspaces in Zagreb</text>
             <text x="60" y="${h - 90}" fill="#d4d4d4" font-family="system-ui,-apple-system,Helvetica" font-size="26" font-weight="400">Coworking · Offices · Events · Hospitality</text>
           </svg>`,
        ),
        top: 0,
        left: 0,
      },
    ])
    .jpeg({ quality: 85, mozjpeg: true })
    .toBuffer()
  await sharp(base).toFile(path.join(PUBLIC, 'og-image.jpg'))
  console.log(`✓ og-image.jpg (${w}x${h})`)
}

async function main() {
  await genIcon(180, path.join(PUBLIC, 'apple-touch-icon.png'))
  await genIcon(192, path.join(PUBLIC, 'icon-192.png'))
  await genIcon(512, path.join(PUBLIC, 'icon-512.png'))
  await genOgImage()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
