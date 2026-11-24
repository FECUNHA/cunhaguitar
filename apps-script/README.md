# Inscrição por e-mail (Google Apps Script)

Os e-mails do formulário "Avise-me" são gravados numa planilha Google sua.

## Configuração (uma vez)

1. Crie uma planilha nova no Google Sheets (ex.: "Cunha Guitar Play – Inscritos").
2. Na planilha: **Extensões → Apps Script**.
3. Apague o conteúdo do `Code.gs` do editor e cole o conteúdo de [`Code.gs`](Code.gs) desta pasta. Salve.
4. Clique em **Implantar → Nova implantação**.
   - Tipo: **App da Web**
   - Executar como: **Eu**
   - Quem pode acessar: **Qualquer pessoa**
5. Autorize o acesso quando o Google pedir.
6. Copie a **URL do app da Web** (termina em `/exec`).
7. No `index.html`, cole a URL na constante:
   ```js
   const SUBSCRIBE_URL = "https://script.google.com/macros/s/XXXX/exec";
   ```
8. Publique o site.

A aba `Inscritos` é criada sozinha na primeira inscrição, com as colunas `data | email | nome | origem`.

## Atualizar o script

Depois de alterar o código: **Implantar → Gerenciar implantações → editar (lápis) → Versão: Nova versão → Implantar**. Assim a URL continua a mesma.

## Testes rápidos

- Inscreva um e-mail novo → aparece uma linha na planilha.
- Inscreva o mesmo e-mail com letras maiúsculas → mensagem "Você já está inscrito", sem linha nova.

## Remoção (LGPD)

Se alguém pedir para sair da lista, apague a linha correspondente na planilha.
