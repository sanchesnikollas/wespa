#!/usr/bin/env node
// One-time image optimization pipeline.
//
// Walks public/images, finds JPG/PNG > MAX_BYTES, replaces them in place with
// re-encoded JPEG (quality QUALITY) capped at MAX_DIM on the longest edge.
// Originals are moved to public/_originals (gitignored) before overwrite.
//
// Run with: node scripts/optimize-images.mjs
// Skip dry-run with APPLY=1.

import { readdir, stat, mkdir, rename, copyFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = path.resolve(process.cwd(), 'public/images')
const ORIGINALS = path.resolve(process.cwd(), 'public/_originals/images')
const APPLY = process.env.APPLY === '1'

const MAX_BYTES = 400 * 1024 // touch anything > 400KB
const MAX_DIM = 1920 // cap longest edge
const QUALITY = 78 // JPEG/WebP quality

const exts = new Set(['.jpg', '.jpeg', '.png'])

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(full)
    else yield full
  }
}

function fmt(bytes) {
  if (bytes < 1024) return `${bytes}B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)}KB`
  return `${(bytes / 1024 / 1024).toFixed(1)}MB`
}

async function main() {
  let totalBefore = 0
  let totalAfter = 0
  let touched = 0
  let skipped = 0

  for await (const file of walk(ROOT)) {
    const ext = path.extname(file).toLowerCase()
    if (!exts.has(ext)) continue
    const st = await stat(file)
    if (st.size <= MAX_BYTES) {
      skipped++
      continue
    }
    totalBefore += st.size

    const rel = path.relative(ROOT, file)
    if (!APPLY) {
      console.log(`would touch  ${fmt(st.size).padStart(8)}  ${rel}`)
      touched++
      continue
    }

    const backup = path.join(ORIGINALS, rel)
    await mkdir(path.dirname(backup), { recursive: true })
    if (!existsSync(backup)) await copyFile(file, backup)

    const tmp = `${file}.tmp`
    await sharp(file)
      .rotate()
      .resize({ width: MAX_DIM, height: MAX_DIM, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: QUALITY, mozjpeg: true, progressive: true })
      .toFile(tmp)

    const newSize = (await stat(tmp)).size
    // overwrite original
    await rename(tmp, file)
    totalAfter += newSize
    touched++
    const saved = ((1 - newSize / st.size) * 100).toFixed(0)
    console.log(`optimized -${saved}%  ${fmt(st.size)} -> ${fmt(newSize)}  ${rel}`)
  }

  console.log('---')
  console.log(`touched: ${touched}, skipped: ${skipped}`)
  if (APPLY) {
    const saved = totalBefore - totalAfter
    const pct = totalBefore ? ((saved / totalBefore) * 100).toFixed(0) : 0
    console.log(`before: ${fmt(totalBefore)} -> after: ${fmt(totalAfter)} (saved ${fmt(saved)}, ${pct}%)`)
    console.log(`originals backed up to ${path.relative(process.cwd(), ORIGINALS)}/`)
  } else {
    console.log(`dry run only — re-run with APPLY=1 to write changes`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
