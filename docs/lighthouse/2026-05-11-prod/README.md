# Lighthouse Audit — Produção (2026-05-11, run 4)

Audit contra **`https://wespa.gigwand.com`** (não localhost). Mesmo setup: mobile, Slow 4G + 4× CPU.

**Importante:** Produção está com o último deploy (commit `0f07c87`, 2026-05-08). Os fixes locais (P0 + quickwins, commits `ecb02f6`+`ce9a541`) **NÃO** estão deployed ainda. Este audit reflete o estado prod **antes** dos fixes.

## Scores

| Rota | Perf | A11y | BP | SEO | LCP | SI |
|---|---:|---:|---:|---:|---:|---:|
| `/` | 85 | 97 | 96 | 61 | 3.45s | 5.27s |
| `/workspaces` | 79 | 93 | 96 | 61 | 5.16s | 3.44s |
| `/workspaces/coworking` | 79 | 92 | 96 | 61 | 4.89s | 3.88s |
| `/workspaces/meeting-rooms` | 86 | 92 | 96 | 61 | 3.84s | 3.27s |
| `/workspaces/offices` | 82 | 93 | 96 | 61 | 4.53s | 2.42s |
| `/workspaces/conference-rooms` | 79 | 93 | 96 | 61 | 4.91s | 3.54s |
| `/food` | **70** | 93 | 96 | 61 | **5.48s** | **8.39s** |
| `/location` | 88 | 93 | 96 | 61 | 3.62s | 2.89s |

## Achados críticos

### 1. `NEXT_PUBLIC_NOINDEX=1` em produção (SEO 61)

[src/app/layout.tsx:71-73](src/app/layout.tsx:71) renderiza `<meta name="robots" content="noindex, nofollow">` quando `NEXT_PUBLIC_NOINDEX === '1'`. Em prod isso está ativo — causa `is-crawlable` audit falhar e arrasta SEO de 100 → 61.

**Provavelmente intencional** (domínio novo `wespa.gigwand.com` ainda não é o oficial ou está em soft-launch). **A validar com você:** quando o domínio for oficial, remover `NEXT_PUBLIC_NOINDEX` do Railway env vars resolve.

### 2. CORS bug REAL em produção (não é falso positivo)

`errors-in-console` falha em 8/8 páginas em prod com erro CORS:
```
Access to resource at 'https://hayjlojrcmprwmzgqlxz.supabase.co/functions/v1/ingest-event'
from origin 'https://wespa.gigwand.com' has been blocked by CORS policy
```

A gigwand beacon (Supabase Edge Function) **não tem CORS configurada** para o origin `wespa.gigwand.com`. Eventos não estão chegando no portal Gigwand. **Bug crítico de tracking** — fix necessário no projeto `gigwand-portal` (Edge Function), não no Wespa website. Best Practices fica em 96 até resolver.

### 3. Performance em prod pior que local

Local (quickwins, com fixes): Perf média ~94. Prod (sem fixes): Perf média ~81.

Mesmo descontando os fixes pendentes (LCP, link-text), prod ainda está pior. Causas prováveis:
- **Cold start Railway** — TTFB inconsistente, `/food` server-response-time 960ms
- **CDN não tão eficiente quanto deveria** — image-delivery savings de 81-248 KiB ainda existem em prod
- **/food outlier**: Perf 70, LCP 5.48s, SI 8.39s — investigar especificamente

### 4. Novo gap descoberto: `unused-javascript` 44-45 KiB

Não aparecia local (provavelmente Tree-shaking diferente em produção?). Mostra JS shipped mas não usado. Investigar:
- Quais chunks têm unused?
- Dynamic imports podem ajudar?
- Algum lib (lucide-react?) trazendo bundle inteiro?

## Comparação Local-quickwins × Prod-atual

| Métrica | Local (com fixes) | Prod (sem fixes) | Δ esperado pós-deploy |
|---|---|---|---|
| SEO média | **100** | 61 | 100 (se noindex removido) ou continua 61 |
| Best Practices | 96 (CORS local) | 96 (CORS prod) | 100 só após fix CORS Supabase |
| A11y média | ~97 | ~93 | ~97 (fixes propagam) |
| Perf homepage | **91** | 85 | Provavelmente 88-92 |
| Perf /food | 94 | **70** | Subir, mas /food precisa investigação |

## Próximos passos sugeridos

**Prioritário (decisões rápidas):**
1. **Decidir noindex**: domínio `wespa.gigwand.com` é oficial agora? Remover `NEXT_PUBLIC_NOINDEX` do Railway?
2. **Fix CORS Supabase**: adicionar `wespa.gigwand.com` aos allowed origins na Edge Function `ingest-event` (projeto gigwand-portal). Sem isso, tracking beacon está silenciosamente quebrado em produção.
3. **Deploy dos fixes locais**: push da branch + deploy resolve title duplicado, link-text e heading-order em prod.

**Performance**:
4. **Investigar /food outlier** (Perf 70) — pior LCP e SI de todas. Hero image grande? Asset não otimizado?
5. **unused-javascript 44 KiB** — novo gap. Quais chunks?
6. **LCP 3.5-5.5s** ainda acima do "Good" — atacar pós-deploy.

## Reproduzir

```bash
LIGHTHOUSE_BASE_URL=https://wespa.gigwand.com LIGHTHOUSE_OUT_DIR=docs/lighthouse/2026-05-11-prod npm run lighthouse:all
```
