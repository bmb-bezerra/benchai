# 2026-06-25 - Navegacao responsiva

## Objetivo

- Registrar o ajuste de navegacao que adiciona topbar compacta nas paginas principais.
- Consolidar o indicador liquido de item ativo na sidebar e elevar o breakpoint em que a sidebar fica visivel.

## Arquivos alterados

- `site/index.html`
- `site/bench-news.html`
- `site/bench-recomenda.html`
- `site/bench-data.html`
- `site/fontes.html`
- `site/404.html`
- `site/modelos.html`
- `site/ides.html`
- `site/benchmarks.html`
- `site/recomendador.html`
- `site/assets/css/styles.css`
- `site/assets/js/app.js`
- `site/assets/js/shell.js`
- `scripts/validate-site.mjs`
- `audit/2026-06-25-navegacao-responsiva.md`

## Resumo

- Adicionada a topbar compacta nas paginas principais para substituir a sidebar em larguras ate `1120px`.
- Marcado o item ativo da navegacao diretamente no HTML para melhorar estado inicial e fallback sem JavaScript.
- Criado indicador liquido animado para acompanhar a navegacao ativa da sidebar.
- Ajustado o cache-buster dos assets para `20260625-sidebar-drop`.
- Atualizado o validador local para exigir o novo token de assets.

## Validacao

- Preview local iniciado em `http://localhost:8001/` porque a porta `8000` aparecia ocupada, mas nao respondia ao `curl` deste ambiente.
- `curl -I http://localhost:8001/` confirmou `200 OK` fora do sandbox.
- `node --check site/assets/js/shell.js`
- `node --check site/assets/js/data.js`
- `node --check site/assets/js/app.js`
- `node --check scripts/validate-site.mjs`
- `python3 -m html.parser` nos 10 HTMLs publicados.
- `node scripts/validate-site.mjs` validou 10 HTMLs e `sitemap.xml`.
- `git diff --check`

## Observacoes

- A ferramenta de navegador in-app nao estava exposta nesta sessao e nao havia Playwright/Chromium local; por isso a verificacao visual automatizada desktop/mobile nao foi concluida.
