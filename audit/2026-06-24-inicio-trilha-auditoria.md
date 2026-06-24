# 2026-06-24 - Inicio da trilha de auditoria

## Objetivo

- Criar a pasta `audit/` para registrar, na preparacao de commits, as mudancas feitas no site.
- Tornar a regra explicita em `AGENTS.md` para manter o registro nos proximos ciclos de edicao.

## Arquivos alterados

- `AGENTS.md`
- `audit/README.md`
- `audit/2026-06-24-inicio-trilha-auditoria.md`

## Resumo

- Adicionado um contrato simples para registrar mudancas do site por arquivo datado antes de criar commits.
- Documentado o formato minimo esperado: objetivo, arquivos alterados, resumo, validacao e observacoes.
- Nenhum arquivo publicado em `site/` foi alterado neste passo.

## Validacao

- Preview local confirmado em `http://localhost:8000/` antes da edicao.

## Observacoes

- Nas proximas mudancas em `site/`, atualizar ou criar um registro em `audit/` durante a preparacao do commit, consolidando as alteracoes daquele diff.
