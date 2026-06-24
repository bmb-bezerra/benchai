# Auditoria de mudancas do site

Esta pasta registra, na preparacao de commits, as mudancas feitas no site publicado em `site/` e nos arquivos operacionais que afetam o fluxo de publicacao.

## Como registrar

- Use um arquivo datado para cada commit ou conjunto de commits relacionados, no formato `YYYY-MM-DD-descricao-curta.md`.
- Atualize o registro durante a preparacao do commit, consolidando o que realmente entrara no diff.
- Liste arquivos alterados, resumo da mudanca, validacoes executadas e observacoes pendentes.
- Nao e necessario atualizar `audit/` a cada comando ou microalteracao durante a edicao.
- Quando a mudanca tocar HTML, CSS ou JavaScript publicado, inclua a validacao local e a verificacao visual quando disponivel.

## Modelo

```md
# YYYY-MM-DD - Titulo da mudanca

## Objetivo

- Descrever o motivo da mudanca.

## Arquivos alterados

- `site/...`

## Resumo

- Descrever o que mudou.

## Validacao

- Comando ou verificacao executada.

## Observacoes

- Pendencias, riscos ou decisoes relevantes.
```
