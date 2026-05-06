---
description: Comandos pra gerenciar review sessions via review-mcp
---

# /review — subcomandos

Use `/review status` pra ver o estado atual, `/review start` pra iniciar
o processamento de uma rodada de comentários.

## Subcomandos

### status
Mostra a session ativa, quantos comentários abertos, e se há session in_progress travada.

Fluxo:
1. Chame `review__get_active_session`
2. Se retornou session, chame `review__list_open_comments(session_id)`
3. Apresente resumo: "Session {name} — {n} abertos em {m} páginas"

### start
Inicia o processamento da session ativa.

Fluxo:
1. Chame `review__get_active_session` — se status já for "in_progress", avise que já tem rodada em andamento
2. Crie branch `review/session-{N}` localmente (`git checkout -b`)
3. Chame `review__start_session(session_id, branch_name)` pra marcar in_progress
4. Para cada comment aberto:
   - Leia page_url, anchor_selector, anchor_text_snippet, body
   - Mapeie page_url → arquivo do repo
   - Grep pelo snippet/body pra localizar exatamente o componente
   - Aplique o fix
   - Commit: `fix(scope): <resumo> — resolves <comment_id>`
   - Chame `review__resolve_thread(comment_id, "Ajustado ✓ commit <sha>", commit_sha)`
5. Ao terminar: `git push`, `gh pr create --title "Review session {N}"`
6. Chame `review__complete_session(session_id, pr_url)`

### resolve <comment_id> <mensagem>
Resolve manualmente uma thread específica sem passar por /review start.

Fluxo:
1. Chame `review__resolve_thread(comment_id, mensagem)`

### onboard <email> [role]
Cadastra um email em `site_members` pra liberar login no widget. `role` é opcional (default `client`; outras opções: `designer`).

Fluxo:
1. Chame `review__add_member(email, role)`
2. Se `already_existed=true`, avise que o email já estava cadastrado (não é erro)
3. Confirme pro usuário com o role efetivo + lembre de pedir pro cliente tentar o login

### members
Lista quem está cadastrado em `site_members`.

Fluxo:
1. Chame `review__list_members`
2. Mostre lista compacta: `email — role — created_at`

## Regras importantes

- Sempre rodar `review__get_active_session` antes — nunca assumir que existe
- Se thread for ambígua (body vago, não dá pra achar o elemento), pare e pergunte
- Sempre incluir `commit_sha` nas tools que aceitam — dá rastreabilidade
- Não mexer em git commands direto do MCP — você (Claude) comanda git via Bash, e só sincroniza estado via MCP
