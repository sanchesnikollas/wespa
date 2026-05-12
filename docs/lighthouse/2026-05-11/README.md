# Lighthouse Audit — Baseline 2026-05-11

Auditoria mobile rodada localmente após o sprint pre-Lighthouse (commit `641bae8`, 2026-05-08).

**Setup:** `npm run build && PORT=3001 npm run start` + `npm run lighthouse:all`
**Form factor:** mobile (412×823, DPR 1.75)
**Throttling:** Slow 4G (RTT 150ms, 1.6 Mbps), 4× CPU slowdown
**Lighthouse:** v13.3.0, headless Chrome
**Reproduzir:** `LIGHTHOUSE_BASE_URL=http://localhost:3001 npm run lighthouse:all`

---

## Scores

| Rota | Perf | A11y | BP | SEO | LCP | FCP | CLS | TBT | SI |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| `/` | **79** | 97 | 96 | 92 | **5.03s** | 1.36s | 0.000 | 13ms | **4.10s** |
| `/workspaces` | 94 | 93 | 96 | 92 | 3.01s | 0.75s | 0.054 | 0ms | 1.46s |
| `/workspaces/coworking` | 92 | 92 | 96 | 92 | 3.31s | 0.75s | 0.053 | 0ms | 1.24s |
| `/workspaces/meeting-rooms` | 93 | 92 | 96 | 92 | 3.16s | 0.75s | 0.050 | 0ms | 1.47s |
| `/workspaces/offices` | 92 | 93 | 96 | 92 | 3.31s | 0.75s | 0.050 | 0ms | 1.40s |
| `/workspaces/conference-rooms` | 95 | 93 | 96 | 92 | 2.87s | 0.76s | 0.053 | 0ms | 1.63s |
| `/food` | 94 | 93 | 96 | 92 | 3.02s | 0.76s | 0.053 | 0ms | 1.30s |
| `/location` | 93 | 93 | 96 | 92 | 3.16s | 0.75s | 0.050 | 0ms | 1.45s |

**Verde** (Google "Good" thresholds): CLS, TBT, FCP em todas as páginas. **Amarelo**: LCP em todas (>2.5s). **Outlier**: homepage (Perf 79, LCP 5.03s).

---

## Gaps repetidos em múltiplas páginas

| Audit | Páginas | Avg score | Notas |
|---|---|---:|---|
| `errors-in-console` | 8/8 | 0 | **Falso positivo local** — CORS bloqueando `supabase.co/functions/v1/ingest-event` (gigwand beacon). Em produção a CORS está configurada. Validar em prod. |
| `document-title` | **7/8** | 0 | **BUG REAL** — páginas internas renderizam 2 `<title>` (um vazio + o correto). Causa: `<title>` JSX inline em páginas que dependem do template do root metadata. |
| `color-contrast` | 8/8 | 0 | A11y — pares fg/bg sem contraste WCAG AA suficiente. Ver detalhes em cada relatório HTML. |
| `largest-contentful-paint` | 8/8 | 68 | LCP médio 3.3s. Target: <2.5s. Homepage é o pior caso (5.03s). |
| `render-blocking-insight` | 8/8 | 0 | 140–150ms savings — CSS/JS bloqueando first paint. |
| `legacy-javascript-insight` | 8/8 | ~19 | 11 KiB de JS legado servido pro browser moderno (polyfills antigos). |
| `network-dependency-tree-insight` | 8/8 | 0 | Cadeia de requests crítica longa. Detalhe em cada relatório. |
| `image-delivery-insight` | 6/8 | 25 | 83–180 KiB savings — imagens servidas maiores que o necessário pro viewport mobile. |
| `cumulative-layout-shift` | 7/8 | 98 | CLS 0.050–0.054 — ainda "Good" (<0.1) mas próximo do limite. |
| `heading-order` | 2/8 | 0 | Hierarquia de headings quebrada em 2 páginas (não-sequencial). |
| `link-text` | 1/8 (home) | 0 | 4 links sem texto descritivo na homepage. |

---

## Triagem priorizada

### P0 — Críticos (atacar primeiro)

1. **`document-title` em 7/8 páginas** — SEO crítico. Causa raiz identificada:
   - `src/app/layout.tsx` define `metadata.title.template: '%s | WESPA'` (root)
   - Várias páginas (`src/app/location/page.tsx:71`, `src/app/grow-your-company/page.tsx:185`, `src/app/resources/page.tsx:159`, `src/app/location/business-lounge/page.tsx:67`, `src/app/location/urban-hub/page.tsx:63`) usam `<title>{...}</title>` JSX **no return do componente** em vez de exportar `metadata.title` corretamente
   - Resultado: Next.js renderiza `<title></title>` vazio do template (sem `%s` resolvido) + o `<title>` JSX
   - **Fix:** mover todos os `<title>` inline pra `export const metadata = { title: '...' }` em cada `page.tsx`. Auditar `src/app/workspaces/page.tsx`, `src/app/food/page.tsx`, `src/app/workspaces/coworking/page.tsx` que também caem no audit.

2. **LCP médio 3.3s (homepage 5.03s)** — Core Web Vital "Needs Improvement". Investigar:
   - Qual elemento é o LCP em cada página (abrir HTML report → seção "Largest Contentful Paint element")
   - Homepage: provavelmente hero image. Verificar se está com `priority` + `sizes` adequado + AVIF servido
   - Demais: hero images dos templates de página

3. **`color-contrast` em 8/8 páginas** — A11y crítico. Cada HTML report lista os pares específicos (texto + cor de fundo). Provavelmente cinza-claro sobre branco em metadados ou CTAs secundárias.

### P1 — Importantes

4. **`render-blocking` 140–150ms** — investigar quais recursos. Provavelmente CSS Tailwind grande ou font CSS. Considerar:
   - Critical CSS inline
   - `<link rel="preload" as="style">` pros CSSs críticos

5. **`legacy-javascript` 11 KiB** — Next.js está shipping polyfills antigos. Verificar `browserslist` em `package.json` (ausente — herda default Next.js). Considerar adicionar:
   ```json
   "browserslist": ["chrome >= 100", "safari >= 15", "firefox >= 100", "edge >= 100"]
   ```

6. **`image-delivery` 80–180 KiB savings** — imagens ainda maiores que viewport. Verificar `sizes` prop nas imagens hero e revisar breakpoints em `next.config.js` `imageSizes`/`deviceSizes`.

7. **CLS 0.050 próximo do limite** — embora "Good", investigar reflows. Provavelmente imagens sem `width`/`height` explícitos ou fonts swap.

### P2 — Nice-to-have

8. **Homepage outlier (Perf 79)** — depois de atacar LCP global, refazer homepage. Possíveis causas extras:
   - 4 `link-text` sem texto descritivo (`src/app/page.tsx` — provavelmente social icons)
   - Hero possivelmente carregando mais assets que outras páginas

9. **`heading-order` em 2 páginas** — identificar quais (abrir `home.json`/`food.json` HTML, seção A11y). Reordenar `<h1>`/`<h2>`/`<h3>` pra ser sequencial.

10. **`errors-in-console` (false positive local)** — não é fix. Apenas re-rodar contra `https://wespa.gigwand.com` quando for fazer o audit final pra confirmar BP=100.

---

## Próximos passos

1. **Sessão própria de fixes**: atacar P0 → re-run lighthouse local → atacar P1 → re-run → atacar P2
2. **Audit final em produção** (`wespa.gigwand.com`) pra confirmar:
   - `errors-in-console` resolve (CORS produção)
   - `image-delivery` melhora (CDN do Railway serve melhor que `next start`)
   - Best Practices sobe pra 100

## Arquivos

- `summary.json` — dados estruturados de todas as 8 audits
- `*.html` (×8) — relatórios visuais (abrir em browser)
- `*.json` (×8) — full Lighthouse Result Object (LHR) por página

## Reproduzir esta audit

```bash
# 1. Build + start
npm run build
PORT=3001 npm run start &

# 2. Run audit (gera 8 HTML + 8 JSON + summary.json)
LIGHTHOUSE_BASE_URL=http://localhost:3001 npm run lighthouse:all

# 3. Stop server
kill %1
```
