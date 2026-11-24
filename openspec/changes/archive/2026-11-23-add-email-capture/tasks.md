## 1. Preparação

- [x] 1.1 Mover o build atual para `legacy/index-react.html` e remover a cópia duplicada `Cunha-Guitar-Play-Ebooks.html`
- [x] 1.2 Adicionar campo opcional `inscritos` ao `ebooks.json`

## 2. Nova página (catálogo)

- [x] 2.1 Criar o novo `index.html` com estrutura semântica: cabeçalho, links oficiais (YouTube, Drive), seção de ebooks, seção de inscrição, rodapé
- [x] 2.2 CSS do tema escuro, responsivo a partir de 360px, sem rolagem horizontal
- [x] 2.3 JS que carrega o `ebooks.json` e renderiza os cards (título, banda, link em nova aba) e a contagem de materiais
- [x] 2.4 Mensagem de fallback com o link da pasta do Drive quando o JSON não carrega

## 3. Endpoint de inscrição (Apps Script)

- [x] 3.1 Criar `apps-script/Code.gs` com `doPost`: parse do JSON, honeypot, validação e normalização do e-mail, limites de tamanho
- [x] 3.2 Deduplicação com `LockService` e gravação de linha (data/hora, e-mail, nome, origem); respostas `ok` / `duplicate` / `invalid`
- [x] 3.3 Escrever `apps-script/README.md` com o passo a passo: criar planilha, colar o script, implantar como Web App, copiar a URL

## 4. Formulário na página

- [x] 4.1 Formulário com e-mail, nome opcional, checkbox de consentimento, honeypot oculto e texto de privacidade
- [x] 4.2 Validação no navegador (e-mail e consentimento) sem chamar o endpoint quando inválido
- [x] 4.3 Envio por `fetch` (`text/plain`, timeout de 10s) para `SUBSCRIBE_URL` e mensagens de sucesso, já inscrito, inválido e erro, mantendo os campos em caso de falha

## 5. Verificação

- [x] 5.1 Testar no navegador (desktop e 360px): cards a partir do JSON, fallback, todos os estados do formulário
- [x] 5.2 Testar o Web App de ponta a ponta: nova inscrição, duplicada com maiúsculas, honeypot preenchido
