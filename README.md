# benchai

Site estático para publicar um playbook de roteamento de ferramentas e modelos de IA para engenharia.

O objetivo é manter uma consulta rápida para comparar ferramentas, modelos, scaffolds e níveis de esforço por tipo de tarefa, sensibilidade dos dados, risco operacional e evidências de benchmark. O site também registra critérios de governança e cuidados para uso de IA em fluxos de engenharia.

## Conteúdo

- Página inicial com mapa do playbook.
- Recomendador interativo de modelo por tarefa, incluindo matriz de decisão.
- Perfis de modelos e modos de reasoning/effort.
- Leitura crítica de benchmarks públicos.
- Rotas para IDEs e ambientes de desenvolvimento assistido.
- Fontes públicas com status de evidência.
- Interface com sidebar fixa, topbar responsiva e alternância de tema claro/escuro.

## Páginas

O site usa navegação real por arquivos HTML estáticos:

- `site/index.html`: início e mapa do playbook.
- `site/recomendador.html`: recomendador interativo e matriz de decisão.
- `site/modelos.html`: perfis de modelos.
- `site/benchmarks.html`: leitura crítica de benchmarks.
- `site/ides.html`: IDEs e ambientes assistidos por IA.
- `site/fontes.html`: fontes públicas.
- `site/404.html`: página de erro para GitHub Pages.

## Cadência de atualização

O conteúdo será atualizado em dois ciclos:

- Semanalmente, com revisão de informações públicas, como disponibilidade de modelos, documentação oficial, políticas, preços e benchmarks publicados.
- Mensalmente, com informações de benchmarks e testes feitos por mim, usando cenários controlados e observações próprias.

## Estrutura

- `site/*.html`: páginas publicadas pelo GitHub Pages.
- `site/assets/css/styles.css`: layout, tema visual claro/escuro e responsividade compartilhada.
- `site/assets/js/app.js`: navegação, topbar responsiva, colapso da sidebar, alternância de tema, recomendador e renderização de listas/tabelas.
- `.github/workflows/pages.yml`: publicação do conteúdo de `site/` no GitHub Pages.

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
node --check site/assets/js/app.js
git diff --check
python3 -m html.parser site/index.html site/recomendador.html site/modelos.html site/benchmarks.html site/ides.html site/fontes.html site/404.html
```

Também confira localmente as páginas principais:

- `http://localhost:8000/`
- `http://localhost:8000/recomendador.html`
- `http://localhost:8000/modelos.html`
- `http://localhost:8000/benchmarks.html`
- `http://localhost:8000/ides.html`
- `http://localhost:8000/fontes.html`

## Política de fontes

A atualização de 18 de junho de 2026 diferencia dados `verificado`, `fornecedor` e `pendente`, para evitar transformar benchmark ou claim secundário em ranking universal. Qualquer nova fonte pública deve manter status, contexto e data de verificação quando aplicável.

## Publicação

O deploy publica a pasta `site/` via GitHub Actions. Não há etapa de build, instalação de dependências, bundling ou geração de arquivos.
