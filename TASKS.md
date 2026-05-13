# TASKS — Wespa Website

Pendências consolidadas do projeto. Atualizado: 2026-05-12.

Branch atual: `sanches/stoic-zhukovsky-d11765` (6 commits acima de master). Última auditoria Lighthouse: [docs/lighthouse/2026-05-12-a11y-final/](docs/lighthouse/2026-05-12-a11y-final/README.md) — A11y 100 + SEO 100 em 8/8 páginas.

---

## 🔴 Decisões externas (não acionável neste repo)

### 1. `NEXT_PUBLIC_NOINDEX=1` em produção (Railway)
- **Onde:** Railway env vars do projeto Wespa Website
- **Impacto atual:** `<meta robots="noindex,nofollow">` em prod → SEO Lighthouse cai pra 61
- **Decisão:** Domínio `wespa.gigwand.com` é oficial agora?
  - Sim → remover env var → SEO prod sobe pra 100
  - Não → manter (intencional, soft launch)
- **Quem decide:** Você
- **Setado em:** [src/app/layout.tsx:71-73](src/app/layout.tsx)

### 2. `NEXT_PUBLIC_ENABLE_REVIEW=1` em produção (Railway)
- **Onde:** Railway env vars
- **Impacto atual:** `<script src="https://widget.gigwand.com/widget.js">` injetado em TODAS as páginas pra TODOS os visitantes (68KB, 65% unused)
- **Decisão:** Review widget só em staging?
  - Sim → remover env var em prod → `unused-javascript` 44 KiB resolve
  - Não → manter (sessões de review em prod ativo)
- **Quem decide:** Você
- **Setado em:** [src/app/layout.tsx:164](src/app/layout.tsx)

### 3. CORS bug REAL em produção
- **Onde:** Edge Function `ingest-event` no projeto **`gigwand-portal`** (Supabase: `hayjlojrcmprwmzgqlxz`)
- **Impacto atual:** Tracking beacon Gigwand silenciosamente quebrado em prod. `https://wespa.gigwand.com` é bloqueado por CORS quando faz POST pra `supabase.co/functions/v1/ingest-event`. Best Practices fica em 96.
- **Fix:** Adicionar `wespa.gigwand.com` aos allowed origins na configuração CORS da Edge Function (no repositório `gigwand-portal`, **não** neste repo).
- **Quem fixa:** Time/projeto gigwand-portal

### 4. Deploy desta branch pra prod
- **Onde:** `git push origin sanches/stoic-zhukovsky-d11765` → merge pra master → Railway auto-deploy
- **Impacto:** Propaga 6 commits de fixes pra prod (title duplicado resolve, A11y 100, SEO 100, contrast, etc.)
- **Quem decide:** Você (quando aprovar os fixes)

---

## 🟡 4 TODOs Figma (confirmações pendentes com Gabi)

Links/destinos a confirmar antes de remover os TODOs:

| # | Arquivo | Linha | Descrição |
|---|---|---|---|
| #189 | [src/app/resources/page.tsx](src/app/resources/page.tsx) | 171 | Confirmar destino — pode ser `/community#events` ou `/events` |
| #195 | [src/app/resources/page.tsx](src/app/resources/page.tsx) | 255 | Destino do podcast CTA — Spotify? YouTube? Página interna? |
| #120 | [src/app/food/page.tsx](src/app/food/page.tsx) | 162 | "Make a Reservation" — form? email? Hoje aponta pra `/contact`. |
| #15-17 | [src/components/organisms/Sections.tsx](src/components/organisms/Sections.tsx) | 883 | Confirmar URLs reais com a Gabi (3 links em uma seção). |

---

## 🟢 Acionável neste repo (não bloqueado por terceiros)

### Adicionar `ines@checkgrow.com` ao review widget
- **Status:** Pendente
- **Bloqueio:** `review-mcp` desconectado nesta sessão. 2 caminhos:
  1. Reconectar `review-mcp` (config Claude Code) → eu rodo `mcp__review__review__add_member`
  2. Inserir manualmente no Supabase `site_members` (table editor ou SQL)
- **Schema esperado** (de [docs/superpowers/specs/2026-04-21-review-widget-design.md](docs/superpowers/specs/2026-04-21-review-widget-design.md)):
  ```sql
  INSERT INTO site_members (site_id, email, role)
  VALUES ('<wespa-site-id>', 'ines@checkgrow.com', 'editor');
  ```
- Trigger `notify-comment` deve disparar email convite via Resend após insert.

### LCP <2.5s (único gap Lighthouse acionável)
- **Status:** Pendente — homepage 3.5-4.5s, target Google "Good" <2.5s
- **Hipótese:** Bottleneck é hydration de Client Component (`'use client'` em [src/app/page.tsx](src/app/page.tsx)) + framer-motion no hero, não a imagem em si. Next.js já preload hero corretamente (srcset + fetchPriority).
- **Próximo experimento:** tornar `page.tsx` Server Component, isolar `'use client'` só nas Sections que precisam (HeroSection com `useScroll`/`useTransform`).
- **Esforço:** ~1-2h, ROI incerto.

### Audit final em produção
- **Após** decisões 1-2-3-4 acima ficarem resolvidas
- Rodar: `LIGHTHOUSE_BASE_URL=https://wespa.gigwand.com npm run lighthouse:all`
- Resultado esperado: SEO 100, BP 100, Perf ~88-95 (dependendo de fix CORS + remoção dos env vars)

---

## ✅ Concluído na linha Lighthouse (6 commits acima de master)

Atalho: ver [docs/lighthouse/2026-05-12-a11y-final/README.md](docs/lighthouse/2026-05-12-a11y-final/README.md) pra comparação completa.

- `deb6e68` — baseline audit 8 páginas
- `ecb02f6` — title duplicado em 21 páginas + `text-stone-500 → text-stone-600`
- `ce9a541` — browserslist + link-text + heading-order coworking → **SEO 100 em 8/8**
- `5c1c605` — audit em prod (descobertas: noindex env, review widget env, CORS Supabase bug)
- `9ac44c1` — `sizes="100vw"` em 21 hero images + quality 90→85
- `e5403f0` — `wespa-red` contrast cirúrgico + heading-order meeting-rooms → **A11y 100 em 8/8**

**Métricas finais (local):** A11y 100, SEO 100, BP 96, Perf 84-97 em 8/8 páginas auditadas. LCP 2.63-4.19s.

---

## 📋 Outros assuntos do projeto (legacy, em standby)

- Possível nova rodada de feedback Gabi/Andrea se houver
- Validar widget Gigwand em produção após decisão de `NEXT_PUBLIC_ENABLE_REVIEW`
- Brand voice consistency check (não tinha sido feito)
- Review widget — 3 fases planejadas em [docs/superpowers/plans/](docs/superpowers/plans/) (status real desses planos: provavelmente concluídos já que widget está em prod, mas os checkboxes não foram atualizados)

---

## Como encontrar mais contexto

- **Lighthouse reports**: `docs/lighthouse/<date>/README.md` (7 sessões: baseline → after-p0 → quickwins → prod → hero-sizes → contrast-cta → a11y-final)
- **Review widget design**: [docs/superpowers/specs/2026-04-21-review-widget-design.md](docs/superpowers/specs/2026-04-21-review-widget-design.md)
- **Lighthouse runner**: [scripts/lighthouse-run.mjs](scripts/lighthouse-run.mjs) + `npm run lighthouse:all`
