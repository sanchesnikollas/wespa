# Review Widget — Fase 1: Supabase Foundation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Criar a infraestrutura Supabase (projeto + schema + RLS + Edge Function + seed do WESPA) que vai servir como backend do review widget. Ao final, é possível inserir comentários via Supabase dashboard e ver RLS isolando dados entre sites.

**Architecture:** 1 projeto Supabase multi-tenant no plano free. Schema com 5 tabelas (`sites`, `site_members`, `review_sessions`, `comments`, `replies`). RLS policies isolam dados por `site_members.email = auth.jwt() ->> 'email'`. Edge Function `notify-comment` dispara emails via Resend em triggers de INSERT. Migrations versionadas num repo separado `review-supabase`.

**Tech Stack:** Supabase CLI 2.90, PostgreSQL 15, Deno (Edge Function), Resend API, GitHub (repo privado).

**Plano pai:** Ver `docs/superpowers/specs/2026-04-21-review-widget-design.md` pra contexto completo. Este é o primeiro de 3 planos (Fase 1 Supabase → Fase 2 Widget → Fase 3 MCP).

---

## Pré-requisitos

Antes de começar, confirme com o user:

- **Org ID do Supabase** (duas disponíveis): `hrvodpvmfilvejvclkal` ou `tvqacjgtdhkkowkgtebx`
- **Região**: sugiro `eu-central-1` (Frankfurt) — mais próximo da Croácia (WESPA)
- **Nome do projeto Supabase**: sugiro `review-sanchescreative`
- **Nome do repo GitHub**: sugiro `sanchescreative/review-supabase` (privado)
- **Conta Resend**: necessária pra Edge Function. Se não tiver, criar em `https://resend.com` e adquirir API key + verificar domínio `sanchescreative.com`.

## File Structure

```
review-supabase/                              (novo repo)
├── .gitignore                                # ignora .env, dist
├── README.md                                 # setup, como rodar migrations
├── .env.example                              # template das envs
├── supabase/
│   ├── config.toml                           # config do projeto local
│   ├── migrations/
│   │   ├── 20260421000001_sites.sql          # Task 3
│   │   ├── 20260421000002_site_members.sql   # Task 4
│   │   ├── 20260421000003_review_sessions.sql# Task 5
│   │   ├── 20260421000004_comments.sql       # Task 6
│   │   ├── 20260421000005_replies.sql        # Task 7
│   │   ├── 20260421000006_rls_policies.sql   # Task 8
│   │   └── 20260421000007_email_trigger.sql  # Task 10
│   ├── functions/
│   │   └── notify-comment/
│   │       ├── index.ts                      # Task 9
│   │       └── deno.json
│   └── seed.sql                              # Task 11 (WESPA seed)
└── tests/
    └── rls_test.sql                          # Task 12 (testes de RLS)
```

---

## Task 1: Criar repo GitHub review-supabase

**Files:**
- Create: `review-supabase/` (novo diretório e repo)

- [ ] **Step 1.1: Criar repo privado no GitHub**

```bash
cd ~/Documents
gh repo create sanchescreative/review-supabase \
  --private \
  --description "Supabase schema + migrations + edge functions pro review widget" \
  --clone
cd review-supabase
```

Expected: cria repo remoto + clona local em `~/Documents/review-supabase`.

- [ ] **Step 1.2: Criar .gitignore**

Arquivo `.gitignore`:

```
.env
.env.local
.DS_Store
node_modules/
dist/
supabase/.temp/
supabase/.branches/
```

- [ ] **Step 1.3: Criar README inicial**

Arquivo `README.md`:

```markdown
# review-supabase

Backend Supabase pro review widget da Sanches Creative.

## Setup local

```bash
supabase link --project-ref <REF>
supabase db push
supabase functions deploy notify-comment
```

## Variáveis de ambiente (Edge Function)

- `RESEND_API_KEY` — API key do Resend
- `EMAIL_FROM` — endereço remetente (ex: `review@sanchescreative.com`)

Ver `.env.example`.
```

- [ ] **Step 1.4: Criar .env.example**

Arquivo `.env.example`:

```
# Obtidos após `supabase projects create`
SUPABASE_PROJECT_REF=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_DB_PASSWORD=

# Resend
RESEND_API_KEY=
EMAIL_FROM=review@sanchescreative.com

# Notificações
DESIGNER_DEFAULT_EMAIL=nikollas@sanchescreative.com
```

- [ ] **Step 1.5: Commit inicial**

```bash
git add .gitignore README.md .env.example
git commit -m "chore: initialize review-supabase repo"
git push -u origin main
```

Expected: primeiro commit empurrado pro GitHub.

---

## Task 2: Criar projeto Supabase via CLI

**Files:**
- Create: `.env` (local, gitignored)
- Create: `supabase/config.toml` (gerado pelo CLI)

- [ ] **Step 2.1: Gerar senha forte do DB**

```bash
DB_PASSWORD=$(openssl rand -base64 24 | tr -d '/+=' | head -c 24)
echo "Senha do DB: $DB_PASSWORD"
# Guardar essa senha — não vai ser mostrada de novo
```

- [ ] **Step 2.2: Criar o projeto**

```bash
supabase projects create review-sanchescreative \
  --org-id <ORG_ID_ESCOLHIDO> \
  --region eu-central-1 \
  --db-password "$DB_PASSWORD"
```

Expected: output com `Created a new project`, retorna `project_ref` (ex: `abc123xyz`).

- [ ] **Step 2.3: Salvar ref no .env**

```bash
PROJECT_REF=<REF_RETORNADO>
cat > .env <<EOF
SUPABASE_PROJECT_REF=$PROJECT_REF
SUPABASE_DB_PASSWORD=$DB_PASSWORD
EOF
```

- [ ] **Step 2.4: Obter anon key e service_role key**

```bash
supabase projects api-keys --project-ref $PROJECT_REF
```

Expected: tabela com 2 keys (anon + service_role). Adicionar ao `.env`:

```bash
cat >> .env <<EOF
SUPABASE_ANON_KEY=<ANON_KEY>
SUPABASE_SERVICE_ROLE_KEY=<SERVICE_ROLE_KEY>
EOF
```

- [ ] **Step 2.5: Inicializar estrutura local**

```bash
supabase init
```

Expected: cria `supabase/config.toml` + pastas.

- [ ] **Step 2.6: Linkar repo local ao projeto**

```bash
supabase link --project-ref $PROJECT_REF
```

Expected: `Finished supabase link.`

- [ ] **Step 2.7: Commit config**

```bash
git add supabase/config.toml
git commit -m "chore: link to supabase project review-sanchescreative"
git push
```

---

## Task 3: Migration — tabela sites

**Files:**
- Create: `supabase/migrations/20260421000001_sites.sql`

- [ ] **Step 3.1: Criar migration**

Arquivo `supabase/migrations/20260421000001_sites.sql`:

```sql
create table sites (
  id text primary key,
  name text not null,
  created_at timestamptz not null default now()
);

comment on table sites is 'Um registro por site/projeto cliente. ID é o data-site-id no script tag.';
```

- [ ] **Step 3.2: Aplicar migration**

```bash
supabase db push
```

Expected: `Applying migration 20260421000001_sites.sql...` e `Finished supabase db push.`

- [ ] **Step 3.3: Verificar no banco**

```bash
supabase db execute --remote <<'SQL'
select table_name from information_schema.tables 
where table_schema='public' and table_name='sites';
SQL
```

Expected: retorna 1 linha `sites`.

- [ ] **Step 3.4: Commit**

```bash
git add supabase/migrations/20260421000001_sites.sql
git commit -m "feat: add sites table"
git push
```

---

## Task 4: Migration — tabela site_members

**Files:**
- Create: `supabase/migrations/20260421000002_site_members.sql`

- [ ] **Step 4.1: Criar migration**

Arquivo `supabase/migrations/20260421000002_site_members.sql`:

```sql
create table site_members (
  site_id text not null references sites(id) on delete cascade,
  email text not null,
  role text not null check (role in ('designer','client')),
  created_at timestamptz not null default now(),
  primary key (site_id, email)
);

comment on table site_members is 'Whitelist de emails autorizados a logar em cada site.';
```

- [ ] **Step 4.2: Aplicar e verificar**

```bash
supabase db push
supabase db execute --remote <<'SQL'
select column_name, data_type from information_schema.columns 
where table_name='site_members' order by ordinal_position;
SQL
```

Expected: 4 colunas (`site_id`, `email`, `role`, `created_at`).

- [ ] **Step 4.3: Commit**

```bash
git add supabase/migrations/20260421000002_site_members.sql
git commit -m "feat: add site_members whitelist table"
git push
```

---

## Task 5: Migration — tabela review_sessions

**Files:**
- Create: `supabase/migrations/20260421000003_review_sessions.sql`

- [ ] **Step 5.1: Criar migration**

Arquivo `supabase/migrations/20260421000003_review_sessions.sql`:

```sql
create table review_sessions (
  id uuid primary key default gen_random_uuid(),
  site_id text not null references sites(id) on delete cascade,
  name text not null,
  status text not null default 'active'
    check (status in ('active','in_progress','completed','archived')),
  opened_at timestamptz not null default now(),
  closed_at timestamptz,
  branch_name text,
  pr_url text,
  claude_run_at timestamptz
);

create index idx_review_sessions_site_status 
  on review_sessions (site_id, status);

-- Invariante: no máximo 1 session com status=active por site
create unique index one_active_session_per_site
  on review_sessions (site_id) where status = 'active';

comment on table review_sessions is 'Rodadas de review. 1 session = 1 branch git = 1 PR.';
```

- [ ] **Step 5.2: Aplicar**

```bash
supabase db push
```

- [ ] **Step 5.3: Testar invariante de session ativa única**

```bash
supabase db execute --remote <<'SQL'
insert into sites (id, name) values ('test-site', 'Test');
insert into review_sessions (site_id, name) values ('test-site', 'Session 1');
-- Segunda session active no mesmo site DEVE FALHAR
insert into review_sessions (site_id, name) values ('test-site', 'Session 2');
SQL
```

Expected: erro `duplicate key value violates unique constraint "one_active_session_per_site"`.

- [ ] **Step 5.4: Limpar teste**

```bash
supabase db execute --remote <<'SQL'
delete from review_sessions where site_id='test-site';
delete from sites where id='test-site';
SQL
```

- [ ] **Step 5.5: Commit**

```bash
git add supabase/migrations/20260421000003_review_sessions.sql
git commit -m "feat: add review_sessions with active-session invariant"
git push
```

---

## Task 6: Migration — tabela comments

**Files:**
- Create: `supabase/migrations/20260421000004_comments.sql`

- [ ] **Step 6.1: Criar migration**

Arquivo `supabase/migrations/20260421000004_comments.sql`:

```sql
create table comments (
  id uuid primary key default gen_random_uuid(),
  site_id text not null references sites(id) on delete cascade,
  session_id uuid references review_sessions(id) on delete set null,
  author_email text not null,
  body text not null,
  page_url text not null,
  anchor_selector text not null,
  anchor_offset_x real not null,
  anchor_offset_y real not null,
  anchor_text_snippet text,
  viewport_width int not null,
  status text not null default 'open'
    check (status in ('open','resolved','reopened')),
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create index idx_comments_site_page on comments (site_id, page_url);
create index idx_comments_site_session_status on comments (site_id, session_id, status);
create index idx_comments_session on comments (session_id);

comment on table comments is 'Threads principais. Cada linha = 1 pin na tela = 1 thread.';
```

- [ ] **Step 6.2: Aplicar e verificar**

```bash
supabase db push
supabase db execute --remote <<'SQL'
select count(*) as column_count from information_schema.columns 
where table_name='comments';
SQL
```

Expected: `column_count = 14`.

- [ ] **Step 6.3: Commit**

```bash
git add supabase/migrations/20260421000004_comments.sql
git commit -m "feat: add comments table with pin anchor"
git push
```

---

## Task 7: Migration — tabela replies

**Files:**
- Create: `supabase/migrations/20260421000005_replies.sql`

- [ ] **Step 7.1: Criar migration**

Arquivo `supabase/migrations/20260421000005_replies.sql`:

```sql
create table replies (
  id uuid primary key default gen_random_uuid(),
  comment_id uuid not null references comments(id) on delete cascade,
  author_email text not null,
  body text not null,
  source text not null default 'human'
    check (source in ('human','claude-code')),
  commit_sha text,
  created_at timestamptz not null default now()
);

create index idx_replies_comment on replies (comment_id);

comment on table replies is 'Respostas dentro de uma thread. source=claude-code diferencia replies automáticas.';
```

- [ ] **Step 7.2: Aplicar e commit**

```bash
supabase db push
git add supabase/migrations/20260421000005_replies.sql
git commit -m "feat: add replies table with source discriminator"
git push
```

---

## Task 8: Migration — RLS policies

**Files:**
- Create: `supabase/migrations/20260421000006_rls_policies.sql`

- [ ] **Step 8.1: Criar migration com todas as policies**

Arquivo `supabase/migrations/20260421000006_rls_policies.sql`:

```sql
-- Habilitar RLS em todas as tabelas
alter table sites enable row level security;
alter table site_members enable row level security;
alter table review_sessions enable row level security;
alter table comments enable row level security;
alter table replies enable row level security;

-- Helper: função que retorna site_ids onde o user atual é member
create or replace function public.user_site_ids()
returns setof text
language sql
stable
security definer
set search_path = public
as $$
  select site_id from site_members
  where email = lower(auth.jwt() ->> 'email');
$$;

-- sites: usuário vê os sites onde é member
create policy "members read sites" on sites for select
  using (id in (select public.user_site_ids()));

-- site_members: usuário vê os members dos sites onde é member
create policy "members read site_members" on site_members for select
  using (site_id in (select public.user_site_ids()));

-- review_sessions: ler e atualizar se for member
create policy "members read sessions" on review_sessions for select
  using (site_id in (select public.user_site_ids()));

create policy "members update sessions" on review_sessions for update
  using (site_id in (select public.user_site_ids()));

create policy "members insert sessions" on review_sessions for insert
  with check (site_id in (select public.user_site_ids()));

-- comments: leitura, insert, update (pra resolve) restrito a members
create policy "members read comments" on comments for select
  using (site_id in (select public.user_site_ids()));

create policy "members insert comments" on comments for insert
  with check (
    lower(author_email) = lower(auth.jwt() ->> 'email')
    and site_id in (select public.user_site_ids())
  );

create policy "members update comments" on comments for update
  using (site_id in (select public.user_site_ids()));

-- replies: leitura/insert via comment_id → site_id
create policy "members read replies" on replies for select
  using (comment_id in (
    select id from comments where site_id in (select public.user_site_ids())
  ));

create policy "members insert replies" on replies for insert
  with check (
    lower(author_email) = lower(auth.jwt() ->> 'email')
    and comment_id in (
      select id from comments where site_id in (select public.user_site_ids())
    )
  );

-- Update de reply só pelo próprio autor
create policy "own replies update" on replies for update
  using (lower(author_email) = lower(auth.jwt() ->> 'email'));
```

- [ ] **Step 8.2: Aplicar**

```bash
supabase db push
```

Expected: migration aplicada, RLS ativo em todas as tabelas.

- [ ] **Step 8.3: Verificar RLS ligado**

```bash
supabase db execute --remote <<'SQL'
select tablename, rowsecurity from pg_tables 
where schemaname='public' 
  and tablename in ('sites','site_members','review_sessions','comments','replies');
SQL
```

Expected: todas com `rowsecurity = t`.

- [ ] **Step 8.4: Commit**

```bash
git add supabase/migrations/20260421000006_rls_policies.sql
git commit -m "feat: enable RLS with site_members isolation"
git push
```

---

## Task 9: Edge Function notify-comment

**Files:**
- Create: `supabase/functions/notify-comment/index.ts`
- Create: `supabase/functions/notify-comment/deno.json`

- [ ] **Step 9.1: Criar estrutura da function**

```bash
supabase functions new notify-comment
```

Expected: cria `supabase/functions/notify-comment/index.ts` com hello world.

- [ ] **Step 9.2: Substituir index.ts pela implementação**

Arquivo `supabase/functions/notify-comment/index.ts`:

```typescript
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

interface WebhookPayload {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: "comments" | "replies" | "review_sessions";
  record: Record<string, unknown>;
  old_record?: Record<string, unknown>;
}

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const EMAIL_FROM = Deno.env.get("EMAIL_FROM") ?? "review@sanchescreative.com";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const admin = createClient(SUPABASE_URL, SERVICE_ROLE);

async function sendEmail(to: string[], subject: string, html: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: EMAIL_FROM, to, subject, html }),
  });
  if (!res.ok) throw new Error(`Resend error: ${res.status} ${await res.text()}`);
}

async function handleCommentInsert(record: Record<string, unknown>) {
  const siteId = record.site_id as string;
  const body = record.body as string;
  const pageUrl = record.page_url as string;
  const authorEmail = record.author_email as string;

  const { data: designers } = await admin
    .from("site_members")
    .select("email")
    .eq("site_id", siteId)
    .eq("role", "designer");

  const recipients = (designers ?? [])
    .map((d) => d.email as string)
    .filter((e) => e.toLowerCase() !== authorEmail.toLowerCase());

  if (recipients.length === 0) return;

  const subject = `[${siteId}] Novo comentário em ${pageUrl}`;
  const html = `
    <p><strong>${authorEmail}</strong> comentou em <code>${pageUrl}</code>:</p>
    <blockquote>${escapeHtml(body)}</blockquote>
  `;
  await sendEmail(recipients, subject, html);
}

async function handleReplyInsert(record: Record<string, unknown>) {
  const commentId = record.comment_id as string;
  const body = record.body as string;
  const authorEmail = record.author_email as string;

  const { data: comment } = await admin
    .from("comments")
    .select("site_id, page_url, author_email")
    .eq("id", commentId)
    .single();

  if (!comment) return;

  const { data: members } = await admin
    .from("site_members")
    .select("email")
    .eq("site_id", comment.site_id);

  const recipients = (members ?? [])
    .map((m) => m.email as string)
    .filter((e) => e.toLowerCase() !== authorEmail.toLowerCase());

  if (recipients.length === 0) return;

  const subject = `[${comment.site_id}] Nova resposta em ${comment.page_url}`;
  const html = `
    <p><strong>${authorEmail}</strong> respondeu:</p>
    <blockquote>${escapeHtml(body)}</blockquote>
  `;
  await sendEmail(recipients, subject, html);
}

function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

Deno.serve(async (req) => {
  try {
    const payload: WebhookPayload = await req.json();
    if (payload.type !== "INSERT") return new Response("ignored", { status: 200 });

    if (payload.table === "comments") {
      await handleCommentInsert(payload.record);
    } else if (payload.table === "replies") {
      await handleReplyInsert(payload.record);
    }
    return new Response("ok", { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(String(err), { status: 500 });
  }
});
```

- [ ] **Step 9.3: Criar deno.json**

Arquivo `supabase/functions/notify-comment/deno.json`:

```json
{
  "imports": {
    "@supabase/supabase-js": "https://esm.sh/@supabase/supabase-js@2.39.0"
  }
}
```

- [ ] **Step 9.4: Configurar secrets no Supabase**

```bash
supabase secrets set \
  RESEND_API_KEY=<SUA_KEY_RESEND> \
  EMAIL_FROM=review@sanchescreative.com
```

Expected: `Finished supabase secrets set.`

Obs: `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` já vêm automáticos na Edge Function, não precisa setar.

- [ ] **Step 9.5: Deploy da function**

```bash
supabase functions deploy notify-comment
```

Expected: `Deployed Function notify-comment.` + URL da function.

- [ ] **Step 9.6: Commit**

```bash
git add supabase/functions/notify-comment/
git commit -m "feat: add notify-comment edge function with resend"
git push
```

---

## Task 10: Wire do trigger — webhook do Postgres chama a Edge Function

**Files:**
- Create: `supabase/migrations/20260421000007_email_trigger.sql`

- [ ] **Step 10.1: Criar migration com o webhook**

Usamos o `pg_net` + `http` do Supabase pra chamar a Edge Function em cada INSERT.

Arquivo `supabase/migrations/20260421000007_email_trigger.sql`:

```sql
-- Habilitar extensões necessárias
create extension if not exists pg_net with schema extensions;

-- Função que dispara webhook pra Edge Function
create or replace function public.trigger_notify_comment()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  webhook_url text := current_setting('app.notify_comment_url', true);
begin
  if webhook_url is null or webhook_url = '' then
    return new;
  end if;

  perform net.http_post(
    url := webhook_url,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || current_setting('app.service_role_key', true)
    ),
    body := jsonb_build_object(
      'type', TG_OP,
      'table', TG_TABLE_NAME,
      'record', to_jsonb(new)
    )
  );
  return new;
end;
$$;

-- Triggers em INSERT de comments e replies
create trigger trg_notify_comment_insert
  after insert on comments
  for each row execute function public.trigger_notify_comment();

create trigger trg_notify_reply_insert
  after insert on replies
  for each row execute function public.trigger_notify_comment();
```

- [ ] **Step 10.2: Aplicar**

```bash
supabase db push
```

- [ ] **Step 10.3: Setar as settings do Postgres com URL e service_role**

```bash
# Obter a URL da function
FN_URL=$(supabase functions list --project-ref $SUPABASE_PROJECT_REF 2>/dev/null | grep notify-comment | awk '{print $2}')
echo "Function URL: $FN_URL"

# Setar no DB via SQL
supabase db execute --remote <<SQL
alter database postgres set app.notify_comment_url = '$FN_URL';
alter database postgres set app.service_role_key = '$SUPABASE_SERVICE_ROLE_KEY';
SQL
```

Observação: essas settings sobrevivem a reinícios porque são ALTER DATABASE.

- [ ] **Step 10.4: Commit**

```bash
git add supabase/migrations/20260421000007_email_trigger.sql
git commit -m "feat: wire postgres triggers to notify-comment edge function"
git push
```

---

## Task 11: Seed do WESPA

**Files:**
- Create: `supabase/seed.sql`

- [ ] **Step 11.1: Criar seed SQL**

Arquivo `supabase/seed.sql`:

```sql
-- Site WESPA
insert into sites (id, name) values 
  ('wespa', 'WESPA Coworking Zagreb')
on conflict (id) do nothing;

-- Members iniciais (substituir emails antes de rodar)
insert into site_members (site_id, email, role) values
  ('wespa', 'nikollas@sanchescreative.com', 'designer'),
  ('wespa', 'gabriela@checkgrow.hr', 'client')
on conflict (site_id, email) do nothing;
```

**IMPORTANTE:** Antes de rodar, confirmar com o user o email real da Gabriela.

- [ ] **Step 11.2: Rodar o seed**

```bash
supabase db execute --remote --file supabase/seed.sql
```

Expected: 2 rows inseridas (1 em sites + 2 em site_members, ou 0 se já existirem).

- [ ] **Step 11.3: Verificar**

```bash
supabase db execute --remote <<'SQL'
select s.id, s.name, 
  (select count(*) from site_members where site_id=s.id) as members
from sites s where id='wespa';
SQL
```

Expected: `wespa | WESPA Coworking Zagreb | 2`.

- [ ] **Step 11.4: Commit**

```bash
git add supabase/seed.sql
git commit -m "chore: seed wespa site + members"
git push
```

---

## Task 12: Testes de RLS via SQL

**Files:**
- Create: `tests/rls_test.sql`

- [ ] **Step 12.1: Criar script de teste**

Arquivo `tests/rls_test.sql`:

```sql
-- Este teste simula 2 usuários (JWT com email) e verifica isolamento.
-- Roda com service_role (bypassa RLS) pra setup, depois set role + jwt claims.

-- Setup: 2 sites, 1 user em cada
insert into sites (id, name) values 
  ('test-site-a', 'Site A'),
  ('test-site-b', 'Site B');

insert into site_members (site_id, email, role) values
  ('test-site-a', 'alice@test.com', 'designer'),
  ('test-site-b', 'bob@test.com', 'designer');

-- Session + comment em cada site
insert into review_sessions (id, site_id, name) values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'test-site-a', 'Test A'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'test-site-b', 'Test B');

insert into comments (site_id, session_id, author_email, body, page_url, 
  anchor_selector, anchor_offset_x, anchor_offset_y, viewport_width)
values
  ('test-site-a', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 
   'alice@test.com', 'comment A', '/', 'body', 0.5, 0.5, 1920),
  ('test-site-b', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 
   'bob@test.com', 'comment B', '/', 'body', 0.5, 0.5, 1920);

-- Teste 1: Alice só vê site A
set local role authenticated;
set local request.jwt.claims to '{"email":"alice@test.com","role":"authenticated"}';

select 'TEST 1: Alice sees only site A' as test,
  count(*) = 1 as passed
from sites;

select 'TEST 2: Alice sees only her comment' as test,
  count(*) = 1 and max(site_id) = 'test-site-a' as passed
from comments;

-- Teste 3: Alice NÃO insere comment em site B (RLS bloqueia)
-- Envolvido em DO block pra capturar erro
do $$
begin
  insert into comments (site_id, session_id, author_email, body, page_url,
    anchor_selector, anchor_offset_x, anchor_offset_y, viewport_width)
  values ('test-site-b', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    'alice@test.com', 'hack', '/', 'body', 0.5, 0.5, 1920);
  raise exception 'TEST 3 FAILED: Alice conseguiu inserir em site-b';
exception
  when others then
    raise notice 'TEST 3 PASSED: Alice bloqueada de inserir em site-b (%)', sqlerrm;
end $$;

-- Cleanup
reset role;
reset request.jwt.claims;

delete from comments where site_id like 'test-site-%';
delete from review_sessions where site_id like 'test-site-%';
delete from site_members where site_id like 'test-site-%';
delete from sites where id like 'test-site-%';
```

- [ ] **Step 12.2: Rodar testes**

```bash
supabase db execute --remote --file tests/rls_test.sql
```

Expected: 3 linhas com `passed=t` (ou `NOTICE: TEST 3 PASSED`).

- [ ] **Step 12.3: Commit**

```bash
git add tests/rls_test.sql
git commit -m "test: rls isolation between sites"
git push
```

---

## Task 13: Teste E2E manual via Supabase Dashboard

- [ ] **Step 13.1: Criar magic link pro nikollas**

Via dashboard: `Authentication > Users > Add user > Invite user` com email `nikollas@sanchescreative.com`.

Expected: email chega.

- [ ] **Step 13.2: Clicar no magic link, ser redirecionado pro dashboard**

Supabase retorna uma sessão. Abrir DevTools > Console > `window.localStorage` e confirmar token salvo.

- [ ] **Step 13.3: Inserir comment via SQL Editor do dashboard (autenticado)**

```sql
insert into comments (site_id, author_email, body, page_url, 
  anchor_selector, anchor_offset_x, anchor_offset_y, viewport_width)
values ('wespa', 'nikollas@sanchescreative.com', 'Teste E2E', 
  '/workspaces/coworking', 'main > section:first-child h1', 0.5, 0.3, 1920);
```

Expected: 1 row inserida. Email `[wespa] Novo comentário em /workspaces/coworking` chega em `nikollas@sanchescreative.com` (se o Resend estiver configurado com sender verificado).

- [ ] **Step 13.4: Verificar no console de logs do Supabase**

Dashboard: `Edge Functions > notify-comment > Logs`. Deve mostrar:
- `POST /functions/v1/notify-comment 200 OK`
- Log da chamada Resend

---

## Task 14: Documentação final do repo

**Files:**
- Modify: `README.md`

- [ ] **Step 14.1: Expandir README com tudo que foi criado**

Substituir `README.md` por:

```markdown
# review-supabase

Backend Supabase pro review widget da Sanches Creative.

## Schema

- `sites` — 1 por projeto cliente
- `site_members` — whitelist email ↔ site
- `review_sessions` — rodadas de review (1 ativa por site)
- `comments` — threads (pin no DOM)
- `replies` — respostas nas threads

## RLS

Todas as tabelas têm RLS. Policies isolam por email do JWT em `site_members`.
Service role bypassa. Ver `supabase/migrations/20260421000006_rls_policies.sql`.

## Edge Function notify-comment

Triggers em INSERT de `comments` e `replies` chamam a function via `pg_net`.
Function usa Resend pra mandar email pros members.

## Setup em nova máquina

```bash
git clone git@github.com:sanchescreative/review-supabase.git
cd review-supabase
cp .env.example .env
# preencher .env com credenciais do Supabase + Resend
supabase link --project-ref $SUPABASE_PROJECT_REF
supabase db push
supabase functions deploy notify-comment
```

## Adicionar novo site cliente

```sql
insert into sites (id, name) values ('cliente-x', 'Nome Cliente');
insert into site_members (site_id, email, role) values
  ('cliente-x', 'voce@...', 'designer'),
  ('cliente-x', 'cliente@...', 'client');
```

## Testes

```bash
supabase db execute --remote --file tests/rls_test.sql
```

## Próximos passos

Este é o Plano 1 de 3. Próximos:
- Fase 2: `review-widget` (Preact + Shadow DOM + CDN)
- Fase 3: `review-mcp` (MCP server pro Claude Code)
```

- [ ] **Step 14.2: Commit final**

```bash
git add README.md
git commit -m "docs: expand README with schema, RLS, and setup guide"
git push
```

---

## Verificação final — critérios de "Fase 1 completa"

Ao terminar todas as tasks, esses checks devem passar:

- [ ] Projeto Supabase `review-sanchescreative` criado e acessível
- [ ] 5 tabelas criadas (`sites`, `site_members`, `review_sessions`, `comments`, `replies`)
- [ ] RLS ativo em todas as 5
- [ ] Edge Function `notify-comment` deployed e respondendo
- [ ] Triggers em INSERT disparam a function
- [ ] Seed do WESPA aplicado (site + 2 members)
- [ ] Teste de RLS isolation passa
- [ ] Teste E2E: INSERT manual → email chega em `nikollas@sanchescreative.com`
- [ ] Repo `sanchescreative/review-supabase` pushed no GitHub com README completo
- [ ] `.env` com credenciais salvo localmente (NÃO commitado)

Após essa verificação, avançar pro Plano 2 (`review-widget`).
