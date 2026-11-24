## Why

Hoje o site é uma vitrine estática de ebooks/tablaturas: quem visita baixa o PDF no Google Drive e vai embora, sem nenhum canal direto com o Fernando além do algoritmo do YouTube/Instagram. Capturar o e-mail de quem se interessa cria uma lista própria para avisar quando sai cifra nova.

Ao mesmo tempo, o `index.html` atual é um build React compilado (~190KB) sem código-fonte no repositório e com os links dos ebooks fixos no bundle (ele não lê o `ebooks.json`). Para acrescentar o formulário de forma sustentável, a página será reescrita em HTML + JS simples.

## What Changes

- Reescrever `index.html` em HTML/CSS/JS puro (sem build), mantendo o conteúdo e a identidade atuais: cabeçalho "Cunha Guitar Play", link do canal do YouTube, contador de inscritos, lista de ebooks e link para a pasta do Drive.
- A lista de ebooks passa a ser renderizada a partir do `ebooks.json` (fonte única de dados).
- Novo bloco "Avise-me quando sair cifra nova" com campo de e-mail (e nome opcional) e um checkbox de consentimento.
- Novo endpoint gratuito em Google Apps Script que recebe a inscrição e grava numa Google Sheets do Fernando (data, e-mail, nome, origem), ignorando e-mails duplicados.
- Feedback ao usuário: sucesso, e-mail inválido, já inscrito e erro de rede.
- O build antigo é preservado como `legacy/index-react.html` para rollback (o `Cunha-Guitar-Play-Ebooks.html` existente já é uma cópia dele e pode ser removido).

## Capabilities

### New Capabilities
- `ebook-catalog`: exibição do catálogo de ebooks a partir do `ebooks.json`, com links para os PDFs.
- `email-capture`: inscrição de visitantes por e-mail para receber avisos de novas cifras, com armazenamento numa Google Sheets.

### Modified Capabilities
<!-- nenhuma: não há specs existentes -->

## Impact

- `index.html`: reescrito por completo.
- `ebooks.json`: passa a ser consumido pela página (formato atual mantido).
- Novo arquivo `apps-script/Code.gs` (código do Apps Script versionado no repo; implantado manualmente pelo Fernando na conta Google dele).
- Nova Google Sheets na conta do Fernando; a URL de implantação do script fica configurada no `index.html`.
- Dados pessoais (e-mail): exige texto de consentimento e forma de descadastro (pedido por e-mail/resposta).
- Fora do escopo: envio automático de newsletter, página por música, busca/filtros.
