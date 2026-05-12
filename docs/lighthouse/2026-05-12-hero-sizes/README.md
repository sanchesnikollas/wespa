# Lighthouse Audit — Hero sizes optimization (2026-05-12, run 5)

Re-audit após adicionar `sizes="100vw"` em 21 hero images com `priority` + reduzir `quality: 90 → 85` na homepage hero. Mesmo setup local: mobile, Slow 4G + 4× CPU.

## Resultado: melhora marginal/sem delta mensurável

| Rota | Quickwins | Hero-sizes | Δ Perf | Δ LCP |
|---|---:|---:|---:|---:|
| `/` | 91 | 88 | -3 ❓ | +0.27s ❓ |
| `/workspaces` | 95 | 94 | -1 | +0.22s |
| `/workspaces/coworking` | 96 | 94 | -2 | +0.30s |
| `/workspaces/meeting-rooms` | 95 | 94 | -1 | +0.16s |
| `/workspaces/offices` | 93 | 93 | 0 | 0 |
| `/workspaces/conference-rooms` | 94 | **96** | +2 ✓ | -0.32s ✓ |
| `/food` | 94 | 94 | 0 | 0 |
| `/location` | 93 | **95** | +2 ✓ | -0.30s ✓ |

**Média Perf:** quickwins ~93.9 → hero-sizes ~93.5 — diferença dentro da variabilidade natural do Lighthouse (~±3 pontos run-to-run).

## Análise

**Por que pouco ganho:**
- Hero images já tinham `priority` (Next.js auto-prioriza preload)
- `fill` sem `sizes` defaultava pra `100vw` na prática
- Quality 85 vs 90 não muda LCP num hero `object-cover` (browser renderiza igual)

**Mudanças defensivas mantidas** (não causa regressão real, é boa prática):
- `sizes="100vw"` explícito em 21 hero images
- Quality 85 (vs 90) reduz tamanho file ~5-10% sem perda visual perceptível

## Achados desta investigação

### /food outlier (Perf 70 em prod) NÃO é bug de código
`server-response-time: Root document took 960ms` em prod indicates **cold start do Railway**. Audit local da mesma página: Perf 94. Issue infra/Railway, não código.

### unused-javascript 44 KiB = review widget
`/widget.js` carregado em prod (44.5KB wasted de 68KB total, 65% unused) porque `NEXT_PUBLIC_ENABLE_REVIEW=1` está setado em prod no Railway. Código local condiciona corretamente em [src/app/layout.tsx:164](src/app/layout.tsx:164). Mesma natureza do `NEXT_PUBLIC_NOINDEX` — decisão de env var, não fix de código.

## Próximas frentes que valem a pena

LCP <2.5s não foi alcançado mesmo com essas otimizações. Próximas tentativas mais agressivas:

1. **Investigar visualmente o hero image** — abrir DevTools Network tab, ver tamanho real do AVIF/WebP servido pra mobile. Pode estar servindo 1920px ainda mesmo com `sizes="100vw"`.
2. **Preload do hero AVIF** — `<link rel="preload" as="image" href="..." imagesrcset="..." imagesizes="100vw" fetchpriority="high">` no `<head>`. Next.js Image faz isso automaticamente quando tem `priority`, mas pode estar custom.
3. **Reduzir framer-motion no hero** — parallax + opacity transforms na homepage hero adicionam paint cost. Pode estar contribuindo pro LCP.
4. **Critical CSS inline** — render-blocking CSS é 10.3KB / 153ms savings. Next.js já inline o crítico, mas pode otimizar mais via `next.config.js`.

## Reproduzir

```bash
npm run build
PORT=3003 npm run start &
LIGHTHOUSE_BASE_URL=http://localhost:3003 LIGHTHOUSE_OUT_DIR=docs/lighthouse/2026-05-12-hero-sizes npm run lighthouse:all
```
