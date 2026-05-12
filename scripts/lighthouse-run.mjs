#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

const BASE_URL = process.env.LIGHTHOUSE_BASE_URL || 'http://localhost:3000';
const OUT_DIR = process.env.LIGHTHOUSE_OUT_DIR || 'docs/lighthouse/2026-05-11';

const ROUTES = [
  { path: '/',                           slug: 'home' },
  { path: '/workspaces',                 slug: 'workspaces' },
  { path: '/workspaces/coworking',       slug: 'workspaces-coworking' },
  { path: '/workspaces/meeting-rooms',   slug: 'workspaces-meeting-rooms' },
  { path: '/workspaces/offices',         slug: 'workspaces-offices' },
  { path: '/workspaces/conference-rooms',slug: 'workspaces-conference-rooms' },
  { path: '/food',                       slug: 'food' },
  { path: '/location',                   slug: 'location' },
];

const CATEGORIES = ['performance', 'accessibility', 'best-practices', 'seo'];

const LH_OPTIONS = {
  logLevel: 'error',
  output: ['html', 'json'],
  onlyCategories: CATEGORIES,
  formFactor: 'mobile',
  screenEmulation: {
    mobile: true,
    width: 412,
    height: 823,
    deviceScaleFactor: 1.75,
    disabled: false,
  },
  throttling: {
    rttMs: 150,
    throughputKbps: 1638.4,
    cpuSlowdownMultiplier: 4,
    requestLatencyMs: 0,
    downloadThroughputKbps: 0,
    uploadThroughputKbps: 0,
  },
};

function fmtScore(s) {
  if (s == null) return '  -  ';
  const n = Math.round(s * 100);
  const pad = n.toString().padStart(3, ' ');
  return ` ${pad} `;
}

function fmtMs(ms) {
  if (ms == null) return '   -   ';
  if (ms < 1000) return `${Math.round(ms)}ms`.padStart(7, ' ');
  return `${(ms / 1000).toFixed(2)}s`.padStart(7, ' ');
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function runAudit(chrome, url, slug, outDir) {
  const opts = { ...LH_OPTIONS, port: chrome.port };
  const result = await lighthouse(url, opts);
  const [htmlReport, jsonReport] = result.report;
  await fs.writeFile(path.join(outDir, `${slug}.html`), htmlReport);
  await fs.writeFile(path.join(outDir, `${slug}.json`), jsonReport);
  return result.lhr;
}

function extractMetrics(lhr) {
  const cats = lhr.categories;
  const audits = lhr.audits;
  return {
    performance:  cats.performance?.score,
    accessibility: cats.accessibility?.score,
    bestPractices: cats['best-practices']?.score,
    seo:          cats.seo?.score,
    lcp:          audits['largest-contentful-paint']?.numericValue,
    fcp:          audits['first-contentful-paint']?.numericValue,
    cls:          audits['cumulative-layout-shift']?.numericValue,
    tbt:          audits['total-blocking-time']?.numericValue,
    si:           audits['speed-index']?.numericValue,
  };
}

async function main() {
  console.log(`\nLighthouse audit — ${ROUTES.length} pages\nBase: ${BASE_URL}\nOutput: ${OUT_DIR}\n`);
  await ensureDir(OUT_DIR);

  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu'],
  });

  const results = [];
  try {
    for (const route of ROUTES) {
      const url = `${BASE_URL}${route.path}`;
      process.stdout.write(`[${(results.length + 1).toString().padStart(2, ' ')}/${ROUTES.length}] ${route.path.padEnd(36, ' ')} `);
      const t0 = Date.now();
      try {
        const lhr = await runAudit(chrome, url, route.slug, OUT_DIR);
        const m = extractMetrics(lhr);
        results.push({ route, metrics: m, ok: true });
        const dt = ((Date.now() - t0) / 1000).toFixed(1);
        console.log(`OK (${dt}s)  P:${fmtScore(m.performance)} A:${fmtScore(m.accessibility)} BP:${fmtScore(m.bestPractices)} SEO:${fmtScore(m.seo)}`);
      } catch (err) {
        results.push({ route, error: err.message, ok: false });
        console.log(`FAIL — ${err.message}`);
      }
    }
  } finally {
    await chrome.kill();
  }

  // Summary table
  console.log(`\n${'='.repeat(110)}`);
  console.log('SUMMARY (mobile, Slow 4G, 4x CPU slowdown)');
  console.log('='.repeat(110));
  console.log(
    'Route'.padEnd(36) +
    ' | Perf | A11y |  BP  | SEO  |   LCP   |   FCP   |  CLS  |   TBT   |   SI'
  );
  console.log('-'.repeat(110));
  for (const r of results) {
    if (!r.ok) {
      console.log(`${r.route.path.padEnd(36)} | ${r.error}`);
      continue;
    }
    const m = r.metrics;
    console.log(
      r.route.path.padEnd(36) +
      ` |${fmtScore(m.performance)}|${fmtScore(m.accessibility)}|${fmtScore(m.bestPractices)}|${fmtScore(m.seo)}` +
      ` |${fmtMs(m.lcp)} |${fmtMs(m.fcp)} | ${(m.cls ?? 0).toFixed(3)} |${fmtMs(m.tbt)} |${fmtMs(m.si)}`
    );
  }
  console.log('='.repeat(110));

  // Write summary JSON
  const summary = {
    timestamp: new Date().toISOString(),
    baseUrl: BASE_URL,
    formFactor: 'mobile',
    throttling: 'slow-4g + 4x cpu',
    results: results.map(r => ({
      route: r.route.path,
      slug: r.route.slug,
      ok: r.ok,
      ...(r.ok ? { metrics: r.metrics } : { error: r.error }),
    })),
  };
  await fs.writeFile(path.join(OUT_DIR, 'summary.json'), JSON.stringify(summary, null, 2));
  console.log(`\nReports saved to ${OUT_DIR}/`);
  console.log(`Summary JSON: ${OUT_DIR}/summary.json`);

  const failed = results.filter(r => !r.ok).length;
  if (failed > 0) {
    console.error(`\n${failed} audit(s) failed`);
    process.exit(1);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
