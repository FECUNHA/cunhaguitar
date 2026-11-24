## Context

- Site estático no GitHub (`FECUNHA/cunhaguitar`), provavelmente servido pelo GitHub Pages. Sem servidor.
- `index.html` é um build React de artefato (`<title>React Artifact</title>`), com CSS Tailwind e os links dos ebooks fixos no bundle; não há código-fonte. `Cunha-Guitar-Play-Ebooks.html` é praticamente o mesmo arquivo.
- `ebooks.json` já existe com `fonte`, `atualizado_em` e `ebooks[] {id, title, band, arquivo, url}`, mas não é usado pela página.
- Os PDFs ficam no Google Drive; o dono já usa o ecossistema Google.

## Goals / Non-Goals

**Goals:**
- Página simples de manter, sem build, que lê o `ebooks.json`.
- Captura de e-mail gratuita, com os dados numa planilha do Fernando.

**Non-Goals:**
- Envio automático de e-mails/newsletter (o Fernando exporta a planilha ou envia manualmente).
- Página por música, busca, filtros, área de membros.
- Captcha completo ou rate limit no servidor.

## Decisions

1. **HTML + CSS + JS puro num único `index.html`** (com CSS e JS inline ou em `assets/`). Sem framework nem CDN obrigatório. Alternativa descartada: injetar script no bundle React — frágil e impossível de editar.
2. **Google Apps Script como endpoint** (`doPost`) publicado como Web App "executar como eu, acesso: qualquer pessoa". Grava em `SpreadsheetApp`. Alternativas: Brevo/Mailchimp (mais recursos, mas depende de conta e de chave) e Formspree (limite do plano grátis).
3. **Envio por `fetch` com `Content-Type: text/plain`** e corpo JSON, para evitar preflight CORS, que o Apps Script não trata. A resposta do Web App vem por redirect para `script.googleusercontent.com` e é legível com `fetch` (`redirect: "follow"`); o JS lê `{status: "ok" | "duplicate" | "invalid"}`.
4. **Deduplicação no script** usando `LockService` + busca do e-mail normalizado na coluna B, para evitar linha dupla em envios simultâneos.
5. **Honeypot** (campo `website` oculto) em vez de captcha: suficiente para o volume esperado e não atrapalha o aluno.
6. **Código do Apps Script versionado** em `apps-script/Code.gs`, com instruções de implantação em `apps-script/README.md`. A URL do Web App fica numa constante `SUBSCRIBE_URL` no topo do JS.
7. **Visual**: tema escuro "rock" inspirado no atual (preto, destaque laranja/vermelho, tipografia forte), responsivo a partir de 360px.

## Risks / Trade-offs

- [URL do Web App é pública e pode receber lixo] → honeypot, validação no script e limite de tamanho dos campos (e-mail ≤ 254, nome ≤ 80).
- [Mudança na resposta do Apps Script/CORS] → se a resposta não puder ser lida, o JS trata qualquer resposta HTTP 2xx como sucesso genérico.
- [Perda de detalhes visuais do layout React] → manter o build antigo em `legacy/index-react.html` para comparação e rollback.
- [LGPD] → texto de consentimento explícito, dados só na planilha privada, remoção mediante pedido.

## Migration Plan

1. Fernando cria a planilha e implanta o Apps Script; copia a URL para `SUBSCRIBE_URL`.
2. Publicar o novo `index.html`; mover o build antigo para `legacy/`.
3. Rollback: restaurar `legacy/index-react.html` como `index.html`.

## Open Questions

- Texto exato do convite e do consentimento (proposta inicial no tasks; Fernando pode ajustar).
- O contador de inscritos do YouTube (290) continua fixo no HTML ou vira campo no `ebooks.json`? Proposta: campo opcional `inscritos` no JSON.
