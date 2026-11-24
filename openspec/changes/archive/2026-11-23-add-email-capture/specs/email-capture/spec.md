## ADDED Requirements

### Requirement: Formulário de inscrição
A página SHALL exibir um formulário "Avise-me quando sair cifra nova" com campo de e-mail obrigatório, campo de nome opcional, checkbox de consentimento obrigatório e botão de envio.

#### Scenario: Formulário visível
- **WHEN** o visitante abre a página
- **THEN** o formulário de inscrição aparece, com o texto de consentimento explicando que o e-mail será usado só para avisos de novos materiais e que é possível pedir remoção

#### Scenario: Uso no celular
- **WHEN** a página é aberta numa tela de 360px de largura
- **THEN** o formulário cabe na largura da tela sem rolagem horizontal

### Requirement: Validação no navegador
O sistema SHALL validar o formato do e-mail e o consentimento antes de enviar, sem chamar o endpoint quando a validação falha.

#### Scenario: E-mail inválido
- **WHEN** o visitante envia "joao@" no campo de e-mail
- **THEN** a página mostra "Digite um e-mail válido" e nenhuma requisição é feita

#### Scenario: Sem consentimento
- **WHEN** o visitante envia um e-mail válido sem marcar o consentimento
- **THEN** a página pede que o consentimento seja marcado e nenhuma requisição é feita

### Requirement: Gravação na planilha
O endpoint SHALL gravar cada inscrição válida numa linha da Google Sheets com data/hora, e-mail normalizado (minúsculo, sem espaços), nome e origem (página).

#### Scenario: Nova inscrição
- **WHEN** um e-mail válido e ainda não cadastrado é enviado
- **THEN** uma linha nova é adicionada à planilha e a página mostra mensagem de sucesso

#### Scenario: E-mail duplicado
- **WHEN** um e-mail que já está na planilha é enviado novamente (com qualquer combinação de maiúsculas)
- **THEN** nenhuma linha nova é criada e a página mostra "Você já está inscrito"

### Requirement: Proteção básica contra spam
O formulário SHALL incluir um campo honeypot oculto, e o endpoint SHALL descartar envios com esse campo preenchido sem gravar nada.

#### Scenario: Bot preenche honeypot
- **WHEN** um envio chega com o campo honeypot preenchido
- **THEN** nada é gravado na planilha

### Requirement: Falha de rede
O sistema SHALL informar o visitante quando o envio falhar, mantendo o que foi digitado.

#### Scenario: Endpoint indisponível
- **WHEN** a requisição falha ou demora mais de 10 segundos
- **THEN** a página mostra "Não foi possível enviar, tente de novo" e os campos continuam preenchidos
