# Review Widget — Design Document

**Autor:** Nikollas Sanches (Sanches Creative)
**Data:** 2026-04-21
**Status:** Draft pra revisão
**Projeto piloto:** WESPA (wespa.hr)

---

## 1. Objetivo

Construir um widget de comentários embedável em qualquer site (Next.js, WordPress, Webflow, HTML puro) que permita ao cliente autenticado criar pins + threads estilo Figma diretamente nas páginas, centralizado num Supabase controlado pela agência. No fim de cada rodada de review, Claude Code consome os comentários abertos, aplica os fixes no repositório, commita, abre PR, e marca as threads como resolvidas.

Meta: reduzir o ciclo "cliente manda lista de ajustes por email → designer transcreve → implementa → manda preview → cliente manda mais ajustes" para "cliente comenta no próprio site → Claude Code processa em lote → PR na mão".

## 2. Decisões chave (resumo executivo)

| Decisão | Escolha | Porquê |
|---|---|---|
| Arquitetura Supabase | 1 projeto central (multi-tenant) | Replicável. Migra pra Supabase do cliente no go-live. |
| Ancoragem do pin | Elemento DOM + offset relativo | Sobrevive a breakpoints responsive. |
| Autenticação | Magic link (Supabase Auth) | Sem senha, sem cadastro, identidade por email. |
| Features v1 | Threads + resolve (B) | Cobre 95% de review sem explodir escopo. |
| Distribuição | Drop-in `<script>` via CDN | Funciona em qualquer stack. |
| UX ativação | Botão flutuante + sidebar + tecla C | Padrão Figma/Framer; discreto pra visitante. |
| Notificações | Email bidirecional (Supabase + Resend) | Assíncrono, sem necessidade de push. |
| Stack do widget | Preact + Shadow DOM + Vite lib mode | Bundle ~35-45kb, isolamento total de CSS. |
| Plataforma | Desktop only na v1 | Review detalhada se faz no PC. |
| Agrupamento | Review Sessions (rodadas) | Evita retrabalho, 1 rodada = 1 PR. |
| Automação | MCP server `review-mcp` | Claude Code processa o backlog em lote. |

## 3. Arquitetura (3 camadas)

```
┌─────────────────────────────────────────────────────────┐
│  SITE DO CLIENTE (wespa.hr, próximos sites, etc)        │
│                                                         │
│  <script src="https://review.sanchescreative.com/       │
│    widget.v1.js" data-site-id="wespa" defer>            │
│                                                         │
│  → injeta <div id="scw-root"> com Shadow DOM            │
│  → Preact app roda dentro do shadow root                │
│  → se não logado: botão "entrar pra review"             │
│  → se logado: botão flutuante + sidebar + tecla C       │
└─────────────────────────────────────────────────────────┘
                         │
                         │  HTTPS (fetch / WebSocket realtime)
                         ▼
┌─────────────────────────────────────────────────────────┐
│  SUPABASE (projeto central: review-sanchescreative)     │
│                                                         │
│  Auth    → magic link por email                         │
│  Postgres                                               │
│    ├─ sites              (wespa, cliente2, ...)         │
│    ├─ site_members       (whitelist email ↔ site)       │
│    ├─ review_sessions    (rodadas de review)            │
│    ├─ comments           (thread principal + pin)       │
│    └─ replies            (respostas da thread)          │
│  RLS    → usuário só vê sites em que é member           │
│  Realtime → sidebar atualiza sem reload                 │
│  Edge Fn notify-comment → Resend email                  │
└─────────────────────────────────────────────────────────┘
                         │
                         │  Resend API                     
                         ▼
┌─────────────────────────────────────────────────────────┐
│  EMAIL (Resend) — lógica da Edge Function:              │
│  → INSERT comment       → email p/ todos role=designer  │
│  → INSERT reply         → email p/ membros ≠ autor      │
│  → session completed    → email p/ todos role=client    │
└─────────────────────────────────────────────────────────┘

                         +

┌─────────────────────────────────────────────────────────┐
│  CLAUDE CODE (no repo do site)                          │
│                                                         │
│  review-mcp (MCP server local, npx)                     │
│    ├─ list_sessions, list_open_comments                 │
│    ├─ get_thread, reply_to_thread                       │
│    ├─ resolve_thread, batch_resolve                     │
│    └─ start_session (cria branch, processa, abre PR)    │
│                                                         │
│  /review slash commands                                 │
│    /review sessions, /review status, /review start      │
└─────────────────────────────────────────────────────────┘
```

### 3.1 Hospedagem do bundle

**Recomendado:** Supabase Storage público com domínio custom `review.sanchescreative.com`. Grátis até 1GB de bandwidth. Upload automatizado por GitHub Action ao criar tag `v*.*.*`.

**Alternativa:** Cloudflare Pages (também grátis, edge global mais rápido).

### 3.2 Repositórios

| Repo | Conteúdo |
|---|---|
| `sanchescreative/review-widget` | Código Preact + Vite lib build + tests + CI publicando pro CDN |
| `sanchescreative/review-supabase` | Migrations SQL versionadas + RLS policies + Edge Function `notify-comment` + script de migração tenant único → Supabase do cliente |
| `sanchescreative/review-mcp` | MCP server (Node/TS) que expõe as tools pro Claude Code |

## 4. Estrutura do widget

```
src/
├── index.ts                    # entrypoint — registra <div>, monta Preact
├── app.tsx                     # App raiz (state global, roteamento de view)
├── lib/
│   ├── supabase.ts             # client Supabase (url/key injetados no build)
│   ├── auth.ts                 # magic link, sessão, listener
│   ├── anchor.ts               # serializa/deserializa pin → DOM element
│   └── realtime.ts             # subscription de comments
├── components/
│   ├── FloatingButton.tsx      # botão bottom-right (contador de abertos)
│   ├── Sidebar.tsx             # painel direito com lista de threads
│   ├── ThreadItem.tsx          # card de uma thread na sidebar
│   ├── ThreadDetail.tsx        # thread aberta (comentário + replies + input)
│   ├── PinOverlay.tsx          # renderiza todos os pins sobre o conteúdo
│   ├── Pin.tsx                 # pin individual (número + estado)
│   ├── CreatePinMode.tsx       # modo "clique pra criar"
│   ├── LoginForm.tsx           # input de email → magic link
│   └── ui/                     # Button, Input, Avatar
└── styles/
    └── global.css              # injetado no shadow root (Tailwind compilado)
```

### 4.1 Ancoragem do pin (detalhe técnico crítico)

Ao criar um pin, gravamos:

```ts
{
  selector: "main > section:nth-of-type(2) > h1",
  offsetX: 0.45,
  offsetY: 0.30,
  pageUrl: "/workspaces/coworking",
  anchorTextSnippet: "Boost Your Productivity"  // primeiras 100 chars do innerText
}
```

Ao renderizar, busca o elemento pelo selector, posiciona pin em `elementRect.width * offsetX, elementRect.height * offsetY`. Como o offset é relativo ao elemento (não à tela), o pin acompanha mudanças de breakpoint.

Fallback quando seletor não encontra: pin aparece como **órfão** na sidebar com badge "Elemento removido" + snippet do texto original preservado. Nunca some silenciosamente.

## 5. Schema do banco (Postgres)

```sql
-- Sites (1 linha por projeto)
create table sites (
  id text primary key,                  -- "wespa", "cliente2"
  name text not null,
  created_at timestamptz default now()
);

-- Whitelist de membros por site
create table site_members (
  site_id text references sites(id) on delete cascade,
  email text not null,
  role text not null check (role in ('designer','client')),
  created_at timestamptz default now(),
  primary key (site_id, email)
);

-- Rodadas de review
create table review_sessions (
  id uuid primary key default gen_random_uuid(),
  site_id text references sites(id) on delete cascade,
  name text not null,                   -- "Review #4 — abr/26"
  status text not null default 'active'
    check (status in ('active','in_progress','completed','archived')),
  opened_at timestamptz default now(),
  closed_at timestamptz,
  branch_name text,                     -- "review/session-4"
  pr_url text,
  claude_run_at timestamptz
);

-- Threads (1 por pin)
create table comments (
  id uuid primary key default gen_random_uuid(),
  site_id text references sites(id) on delete cascade,
  session_id uuid references review_sessions(id),
  author_email text not null,
  body text not null,
  page_url text not null,
  anchor_selector text not null,
  anchor_offset_x real not null,
  anchor_offset_y real not null,
  anchor_text_snippet text,             -- pista semântica pro Claude Code
  viewport_width int not null,
  status text not null default 'open'
    check (status in ('open','resolved','reopened')),
  created_at timestamptz default now(),
  resolved_at timestamptz
);

-- Respostas dentro da thread
create table replies (
  id uuid primary key default gen_random_uuid(),
  comment_id uuid references comments(id) on delete cascade,
  author_email text not null,
  body text not null,
  source text not null default 'human'
    check (source in ('human','claude-code')),
  commit_sha text,                      -- preenchido quando source=claude-code
  created_at timestamptz default now()
);

create index on comments (site_id, page_url);
create index on comments (site_id, session_id, status);
create index on comments (session_id);
create index on replies (comment_id);
create index on review_sessions (site_id, status);

-- Invariante: máximo 1 session ativa por site
create unique index one_active_session_per_site
  on review_sessions (site_id) where status = 'active';
```

### 5.1 RLS policies

```sql
alter table sites enable row level security;
alter table site_members enable row level security;
alter table review_sessions enable row level security;
alter table comments enable row level security;
alter table replies enable row level security;

-- Usuário só vê sites onde tem email na whitelist
create policy "read own sites" on sites for select
  using (id in (
    select site_id from site_members where email = auth.jwt()->>'email'
  ));

create policy "read own sessions" on review_sessions for select
  using (site_id in (
    select site_id from site_members where email = auth.jwt()->>'email'
  ));

create policy "read own comments" on comments for select
  using (site_id in (
    select site_id from site_members where email = auth.jwt()->>'email'
  ));

create policy "insert own comments" on comments for insert
  with check (
    author_email = auth.jwt()->>'email'
    and site_id in (select site_id from site_members where email = auth.jwt()->>'email')
  );

create policy "read own replies" on replies for select
  using (comment_id in (
    select id from comments where site_id in (
      select site_id from site_members where email = auth.jwt()->>'email'
    )
  ));

create policy "insert own replies" on replies for insert
  with check (
    author_email = auth.jwt()->>'email'
    and comment_id in (
      select id from comments where site_id in (
        select site_id from site_members where email = auth.jwt()->>'email'
      )
    )
  );

-- Update restrito ao próprio autor, exceto resolve (qualquer membro)
create policy "update own replies" on replies for update
  using (author_email = auth.jwt()->>'email');

create policy "resolve comments as member" on comments for update
  using (site_id in (
    select site_id from site_members where email = auth.jwt()->>'email'
  ));
```

Garantia: mesmo com bug no front-end, o banco não vaza dado entre clientes.

## 6. Fluxos principais

### 6.1 Primeira visita do cliente (login)

1. Cliente abre `https://wespa.hr/workspaces/coworking`
2. Widget carrega, monta shadow DOM, lê localStorage → sem sessão
3. Widget fica invisível (zero UI pra visitante anônimo)
4. Cliente adiciona `?review=1` na URL (combinado com designer) OU acessa link direto
5. Widget detecta flag → mostra botão discreto "Review mode"
6. Clica → LoginForm pede email
7. Supabase envia magic link
8. Cliente clica link no email → volta com `#access_token=...`
9. Widget persiste sessão em localStorage do shadow root
10. Se email está em `site_members` → ativa UI completa; senão → mostra "acesso negado"
11. Próximas visitas: sessão válida por 7 dias, entra direto

O `?review=1` não é segurança — só esconde o botão pra visitantes normais. Segurança de verdade é RLS.

### 6.2 Criar pin + comentário

1. Cliente logado aperta tecla `C` ou clica "+" no botão flutuante
2. Widget entra em modo "create pin": cursor crosshair, overlay sutil, `ESC` cancela
3. Cliente clica num ponto da tela
4. Widget computa anchor: `document.elementFromPoint(x,y)`, gera selector estável, calcula offsets
5. Popover aparece: textarea + "Enviar"
6. Cliente escreve, envia
7. INSERT em `comments` com `session_id` = session ativa do site (auto-cria se não existir)
8. Realtime dispara → sidebar de todos online atualiza
9. Trigger Postgres → Edge Function `notify-comment` → Resend email pro designer

### 6.3 Responder + resolver

1. Designer recebe email "Nova review em wespa — hero coworking"
2. Clica no link → abre site + abre thread (hash `#thread=uuid`)
3. Sidebar mostra thread, designer digita reply, envia
4. INSERT em `replies` → Realtime + email pro cliente
5. Designer ou cliente clica "Resolver"
6. UPDATE `comments` SET status='resolved', resolved_at=now()
7. Pin fica cinza, thread vai pra aba "Resolved"

### 6.4 Review session — lifecycle

```
┌─────────┐   designer roda           ┌──────────────┐
│ ACTIVE  │   /review start session-4 │ IN_PROGRESS  │
│         │ ─────────────────────────>│              │
│ cliente │                           │ branch criado│
│ comenta │                           │ fixes saindo │
└─────────┘                           └──────┬───────┘
     ▲                                       │
     │                                       │ PR merged
     │                                       ▼
     │    auto-cria nova              ┌──────────────┐
     └──── session ───────────────────┤  COMPLETED   │
                                      │              │
                                      │ threads      │
                                      │ resolved em  │
                                      │ lote         │
                                      └──────────────┘
```

**Regras que previnem retrabalho:**

1. Claude SÓ lê threads com `status='open'` AND `session.status IN ('active','in_progress')`.
2. Session `in_progress` trava entrada de novos comments (widget mostra "Revisão em andamento, aguarde ou abra nova sessão").
3. Threads resolved nunca são re-processadas — idempotente.
4. Thread re-aberta (`status='reopened'`) é tratada como open na próxima rodada, com marca no commit.

### 6.5 Claude Code aplicando fixes (comando `/review start`)

1. Designer roda `/review start` no repo do site
2. Claude chama `review__get_active_session(site)` via MCP
3. Marca session como `in_progress`, cria branch `review/session-N`
4. Itera as threads abertas:
   - Lê `page_url`, `anchor_selector`, `anchor_text_snippet`, `body`, `replies`
   - Mapeia `page_url` → arquivo do repo (`/workspaces/coworking` → `src/app/workspaces/coworking/page.tsx`)
   - Grep pelo `anchor_text_snippet` pra localizar o componente
   - Aplica o fix
   - Commit: `fix(scope): ajuste conforme review\n\nResolve comment: <uuid>`
   - Chama `review__resolve_thread(id, "Ajustado ✓ commit <sha>")`
   - Email dispara pro cliente
5. `git push` + `gh pr create` → salva `pr_url` na session
6. Ao merge do PR: webhook ou comando manual marca session como `completed`, gera relatório em `docs/review-sessions/session-N.md`

## 7. Integração Claude Code (MCP server)

### 7.1 Tools expostas

```
review__list_sites()                     → sites que você é membro
review__list_sessions(site_id)           → todas as sessions do site
review__get_active_session(site_id)      → session ativa ou cria nova
review__list_open_comments(session_id)   → threads com status=open/reopened
review__get_thread(comment_id)           → thread + replies + anchor
review__reply_to_thread(id, text, sha?)  → adiciona reply (source=claude-code)
review__resolve_thread(id, text, sha?)   → resolve + reply final
review__batch_resolve(ids, text)         → resolve vários em lote
review__start_session(session_id)        → marca in_progress + cria branch
review__complete_session(id, pr_url)     → marca completed + gera relatório
```

### 7.2 Configuração do MCP no projeto do cliente

`.mcp.json`:

```json
{
  "mcpServers": {
    "review": {
      "command": "npx",
      "args": ["-y", "@sanchescreative/review-mcp"],
      "env": {
        "REVIEW_SITE_ID": "wespa",
        "REVIEW_SUPABASE_URL": "https://xxx.supabase.co",
        "REVIEW_SUPABASE_ANON_KEY": "..."
      }
    }
  }
}
```

### 7.3 Slash commands entregues

Em `.claude/commands/review.md` (template replicável por site):

```
/review sessions      lista sessions (todos estados)
/review status        session ativa + contagem de abertas
/review start         aplica fixes + commits + PR
/review close         fecha session sem aplicar
/review reopen <id>   re-abre thread específica
```

### 7.4 Dedup semântica (v1.1, não v1)

Antes de aplicar, Claude agrupa threads similares ("3 comments pedindo spacing em seções parecidas") e pergunta se aplica como fix único. Agrupamento via prompt interno do Claude, sem embeddings externos.

## 8. Edge cases e segurança

### 8.1 Ancoragem

| Cenário | Tratamento |
|---|---|
| Seletor não encontra elemento | Pin órfão na sidebar com badge "Elemento removido" + snippet preservado |
| Elemento invisível (display:none) | Pin escondido na página, visível na sidebar |
| Scroll lateral / zoom | Listeners de resize/scroll reposicionam com `requestAnimationFrame` |
| `overflow:hidden` cortando pin | `IntersectionObserver` esconde se fora de viewport |
| Comentário em modal/drawer | v1: avisa "comente só em conteúdo da página principal". v2: captura estado do modal |

### 8.2 Auth

| Cenário | Tratamento |
|---|---|
| Sessão expira durante review | Magic link silencioso; draft salvo em localStorage |
| Cliente esqueceu email whitelisted | Designer adiciona novo email em `site_members` |
| Email fora da whitelist tenta logar | Supabase cria user mas RLS bloqueia. UI mostra "sem acesso a este site" |
| Múltiplas abas | Realtime em cada, sessão compartilhada via localStorage |

### 8.3 Conexão

| Cenário | Tratamento |
|---|---|
| Supabase offline | Banner "conexão perdida", draft local |
| Offline no momento do envio | INSERT pendente no localStorage, dispara ao reconectar |
| Conflito de resolve | Idempotente: UPDATE status='resolved' não erra se já resolvido |

### 8.4 Segurança

1. **XSS via body** — Preact escapa por padrão. Zero `dangerouslySetInnerHTML`. Body sempre renderizado como texto.
2. **Selector malicioso** — usado só em `querySelector`, nunca em SQL. Selector inválido = pin órfão.
3. **Site clonado tentando logar como wespa** — RLS usa email do JWT. Clone não forja JWT sem secret.
4. **Vazamento entre sites** — RLS é a última linha. Bug no front que pede "outro site" retorna vazio.
5. **Anon key exposta no bundle** — OK, foi feita pra isso. Segurança depende de RLS, não de esconder key.

## 9. Versionamento e rollback

```
CDN: review.sanchescreative.com/
  ├── widget.v1.0.0.js    (versão antiga)
  ├── widget.v1.0.1.js    (bugfix)
  ├── widget.v1.js        (alias → última 1.x)
  └── widget.latest.js    (alias → última qualquer)
```

Sites embedam `widget.v1.js`. Se 1.1.0 quebrar, alias volta pra 1.0.1 = rollback em 30s. Breaking change → `widget.v2.js`, sites antigos seguem com v1.

## 10. Limitações deliberadas da v1

Cada item abaixo foi cortado pra manter v1 entregável e robusta:

- Sem upload de imagem/anexo
- Sem screenshot automático
- Sem menções / assignees
- Sem reações emoji
- Sem mobile
- Sem multi-idioma do widget (escolha pt-BR ou en na v1)
- Sem timestamps relativos ("há 3 min") — só data absoluta
- Sem dedup semântica (fica pra v1.1)
- Sem dashboard central (fica pra v2)

## 11. Testes

### 11.1 Unit (Vitest)

- `anchor.ts` → serialize/deserialize selector + offset
- `auth.ts` → parse de magic link token
- RLS policies → pgTAP ou scripts SQL

### 11.2 Integration (Playwright em site fake)

- Login flow completo (email → link → autenticado)
- Criar pin → comentar → aparece na sidebar
- Reply → sincroniza em tempo real
- Resolve → some da aba open
- Pin órfão (selector falha) → aparece como órfão
- Multi-site RLS → user de A não vê B

### 11.3 Smoke manual (pré-publicação)

- Widget carrega em staging WESPA?
- Email chega em ~5s?
- Duas abas → realtime sincroniza?
- Breakpoints 1440/1024/768 → pin no lugar certo?

### 11.4 Testes do MCP (Claude Code)

- `review__list_open_comments` retorna só session ativa/in_progress
- `review__resolve_thread` grava `source=claude-code` e `commit_sha`
- `review__start_session` é idempotente (rodar 2x não cria 2 branches)

## 12. Rollout em 3 fases

**Fase 1 — Site interno de teste** (1-2 dias)
`test.sanchescreative.com`, você comenta consigo mesmo. Itera bugs sem afetar cliente.

**Fase 2 — Staging WESPA** (1 semana)
Script carrega só no Railway preview URL. Zero impacto em `wespa.hr` (ainda WordPress). Gabriela comenta de verdade, feedback de UX real.

**Fase 3 — Replicável em clientes novos**
Documentação interna "como plugar em site novo em 5min". Próximo cliente ganha num comando.

### 12.1 Checklist pra site novo (o replicável em ação)

```bash
# 1. Backend (Supabase dashboard, 2 min)
INSERT INTO sites VALUES ('cliente-x', 'Nome do Cliente');
INSERT INTO site_members VALUES ('cliente-x', 'voce@...', 'designer');
INSERT INTO site_members VALUES ('cliente-x', 'cliente@...', 'client');

# 2. Site do cliente (1 linha)
<Script
  src="https://review.sanchescreative.com/widget.v1.js"
  data-site-id="cliente-x"
  defer
/>

# 3. Repo do site (opcional, pra Claude Code processar)
Copiar .mcp.json + .claude/commands/review.md do template

# 4. Avisa cliente
"Abra ?review=1 no site, digite seu email, clique no link que chegar"
```

## 13. Custos (all free tier no começo)

- **Supabase**: free — 500MB DB, 1GB storage, 50k MAU
- **Resend**: free — 3k emails/mês, domínio custom incluso
- **Cloudflare Pages / Supabase Storage**: free — bandwidth generoso
- **Domínio `review.sanchescreative.com`**: custo zero extra (subdomínio do seu domínio)

Estimativa de upgrade: só necessário com 10+ clientes ativos simultâneos ou 30k+ emails/mês.

## 14. Próximos passos

1. **User review** deste documento — eventuais ajustes antes de sair pra planning
2. **Writing plans** (skill `superpowers:writing-plans`) — quebrar em plano de implementação com milestones e checkpoints
3. **Implementação Fase 1** — widget rodando em site interno de teste

---

**Status final do design:** completo, validado decisão a decisão com o designer. Pronto pra revisão e transição ao plano de implementação.
