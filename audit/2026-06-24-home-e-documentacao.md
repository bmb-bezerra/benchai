# 2026-06-24 - Home e documentacao atualizadas

## Objetivo

- Registrar os ajustes feitos na home depois da estabilizacao da sidebar v1.
- Atualizar a documentacao do projeto para acompanhar a estrutura atual do site, incluindo `shell.js`, sidebar v1, changelog curto e trilha de auditoria.

## Arquivos alterados

- `README.md`
- `site/index.html`
- `site/assets/css/styles.css`
- `audit/2026-06-24-home-e-documentacao.md`

## Resumo

- Adicionado comentario no changelog da home para manter somente as quatro ultimas atualizacoes.
- Registrada a atualizacao de 2026-06-24 sobre a sidebar v1 finalizada.
- Reescritas as descricoes dos cards percentuais para deixar explicito o que cada porcentagem mede.
- Reorganizados os oito cards de sinais de decisao com titulos mais diretos, descricao curta, fonte visivel, data de revisao e tags sem repeticao de cor.
- Adicionadas as tags `indigo` e `slate` ao tema claro/escuro para evitar repeticao visual nos sinais.
- Atualizado o README para descrever a sidebar v1, `shell.js`, a regra de auditoria por commit e as validacoes atuais.

## Validacao

- Preview local confirmado em `http://localhost:8000/`.
- `node --check site/assets/js/shell.js`
- `node --check site/assets/js/data.js`
- `node --check site/assets/js/app.js`
- `node --check scripts/validate-site.mjs`
- `python3 -m html.parser` nos 10 HTMLs publicados.
- `node scripts/validate-site.mjs` validou 10 HTMLs e `sitemap.xml`.
- `git diff --check`

## Observacoes

- A validacao visual por navegador automatizado nao foi usada neste ciclo porque a entrega ficou concentrada em HTML/CSS/JS estatico e os checks locais cobriram ordem de scripts, rotas e markup.
