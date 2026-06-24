# BenchAI

Site estático para publicar um playbook de roteamento de ferramentas e modelos de IA para engenharia.

O objetivo é manter uma consulta rápida para comparar ferramentas, modelos, agentes, harnesses, scaffolds e níveis de esforço por tipo de tarefa, sensibilidade dos dados, risco operacional, custo e evidências de benchmark. O site também registra critérios de governança, observabilidade e validação para uso de IA em fluxos de engenharia.

## Conteúdo

- Página inicial com mapa do playbook, métricas de adoção, sinais de decisão e changelog curto.
- Bench News com curadoria semanal de notícia, paper e modelo.
- Bench Recomenda com recomendação rápida de rota por tarefa, risco e escopo.
- Bench Data com visualização dinâmica de modelos, harnesses e benchmarks.
- Fontes públicas com status de evidência.
- Interface com sidebar v1, navegação visível, colapso manual, topbar responsiva e alternância de tema claro/escuro.

## Páginas

O site usa navegação real por arquivos HTML estáticos:

- `site/index.html`: início e mapa do playbook.
- `site/bench-news.html`: curadoria semanal Bench News.
- `site/bench-recomenda.html`: recomendação rápida Bench Recomenda.
- `site/bench-data.html`: visualização dinâmica de modelos, harnesses e benchmarks.
- `site/fontes.html`: fontes públicas.
- `site/modelos.html`, `site/ides.html`, `site/benchmarks.html` e `site/recomendador.html`: rotas legadas com redirecionamento para as páginas consolidadas.
- `site/404.html`: página de erro para GitHub Pages.

## Atualizações recentes

- 2026-06-24: a sidebar v1 foi consolidada com navegação visível, alternância de tema e controle de abrir/fechar como base estável da interface.
- 2026-06-24: a home ganhou descrições mais explícitas para os cards percentuais, changelog limitado às quatro últimas atualizações e oito sinais de decisão com fontes públicas.
- 2026-06-22: `site/bench-data.html` consolidou Modelos, Harness e Benchmarks em uma única página com alternância dinâmica por tipo de dado.
- 2026-06-19: `site/ides.html` deixou de ser uma lista curta de IDEs e virou um mapa de harnesses de desenvolvimento com IA, organizado por liberdade de modelo, produtividade diária, enterprise/governança, app builders e ressalvas.

## Cadência de atualização

O conteúdo será atualizado em dois ciclos:

- Semanalmente, com revisão de informações públicas, como disponibilidade de modelos, documentação oficial, políticas, preços e benchmarks publicados.
- Mensalmente, com informações de benchmarks e testes feitos por mim, usando cenários controlados e observações próprias.

## Estrutura

- `site/*.html`: páginas publicadas pelo GitHub Pages.
- `site/assets/css/styles.css`: layout, tema visual claro/escuro e responsividade compartilhada.
- `site/assets/js/data.js`: dados estruturados de navegação, modelos, benchmarks, fontes e recomendações.
- `site/assets/js/shell.js`: controles críticos da casca visual, incluindo tema e colapso da sidebar, carregados antes do comportamento principal.
- `site/assets/js/app.js`: topbar responsiva, integração com a casca, recomendador e renderização de listas/tabelas.
- `site/robots.txt` e `site/sitemap.xml`: descoberta pública das páginas principais.
- `scripts/validate-site.mjs`: validação local de rotas, links internos, sitemap, arquivos publicados sem stage e ordem de scripts `shell.js`, `data.js` e `app.js`.
- `audit/`: trilha de auditoria das mudanças consolidadas.
- `.github/workflows/pages.yml`: publicação do conteúdo de `site/` no GitHub Pages.

## Auditoria

A pasta `audit/` registra decisões e mudanças consolidadas do site. Ela deve ser atualizada quando uma leva de alterações estiver pronta para commit, não a cada comando ou ajuste pequeno durante a edição.

## Visualização local

Para visualizar o site localmente, basta usar o servidor HTTP da biblioteca padrão do Python:

```bash
python3 -m http.server 8000 --directory site
```

Depois acesse `http://localhost:8000/`.

Se a porta `8000` já estiver ocupada, use outra porta:

```bash
python3 -m http.server 8001 --directory site
```

Ou identifique o processo que está usando a porta:

```bash
lsof -nP -iTCP:8000 -sTCP:LISTEN
```

## Validação

Antes de publicar alterações no site, rode:

```bash
node --check site/assets/js/shell.js
node --check site/assets/js/data.js
node --check site/assets/js/app.js
node --check scripts/validate-site.mjs
git diff --check
python3 -m html.parser site/index.html site/bench-news.html site/bench-recomenda.html site/bench-data.html site/fontes.html site/modelos.html site/ides.html site/benchmarks.html site/recomendador.html site/404.html
node scripts/validate-site.mjs
```

Também confira localmente as páginas principais:

- `http://localhost:8000/`
- `http://localhost:8000/bench-news.html`
- `http://localhost:8000/bench-recomenda.html`
- `http://localhost:8000/bench-data.html`
- `http://localhost:8000/fontes.html`

## Política de fontes

A atualização de 18 de junho de 2026 diferencia dados `verificado`, `fornecedor` e `pendente`, para evitar transformar benchmark ou claim secundário em ranking universal. A home também usa sinais de decisão com links para fontes públicas, como Terminal-Bench, Artificial Analysis, Aider, OpenTelemetry, OWASP, GitHub e vLLM. Qualquer nova fonte pública deve manter status, contexto e data de verificação quando aplicável.

## Publicação

O deploy publica a pasta `site/` via GitHub Actions. Não há etapa de build, instalação de dependências, bundling ou geração de arquivos.
