# ebook-catalog Specification

## Purpose
Exibir o catálogo de ebooks e tablaturas do Cunha Guitar Play a partir do ebooks.json, com links para os PDFs e para os canais oficiais.

## Requirements

### Requirement: Catálogo a partir do ebooks.json
A página SHALL montar a lista de ebooks lendo o `ebooks.json`, exibindo para cada item o título, a banda e um link para o PDF (`url`) que abre em nova aba.

#### Scenario: Lista renderizada
- **WHEN** a página carrega e o `ebooks.json` tem 7 itens
- **THEN** aparecem 7 cards, cada um com título, banda e link para o PDF

#### Scenario: Ebook novo
- **WHEN** o Fernando adiciona um item ao `ebooks.json` e publica
- **THEN** o novo ebook aparece na página sem nenhuma outra alteração de código

#### Scenario: Falha ao carregar o JSON
- **WHEN** o `ebooks.json` não pode ser carregado
- **THEN** a página mostra uma mensagem com o link da pasta do Google Drive (`fonte`) como alternativa

### Requirement: Conteúdo institucional preservado
A página SHALL manter a identidade atual: nome "Cunha Guitar Play", link para o canal do YouTube `@fernandoC_guitar_play`, contagem de materiais e link "Abrir Drive" para a pasta com todos os ebooks.

#### Scenario: Links oficiais
- **WHEN** o visitante abre a página
- **THEN** os links para o YouTube e para a pasta do Drive estão visíveis e funcionam
