# benchai

Site estático para publicar um playbook de roteamento de modelos de IA no Cursor.

O objetivo é manter uma consulta rápida para comparar modelos, orientar escolhas por tipo de tarefa, sensibilidade dos dados, risco operacional e evidências de benchmark. O site também registra critérios de governança e cuidados para uso de modelos em fluxos de engenharia.

## Conteúdo

- Página inicial com mapa do playbook.
- Recomendador interativo de modelo por tarefa.
- Matriz de decisão para uso no Cursor.
- Perfis de modelos e cuidados por sensibilidade de dados.
- Leitura crítica de benchmarks públicos.
- Fontes públicas e rastreabilidade.
- Notas de publicação no GitHub Pages.

## Páginas

O site usa navegação real por arquivos HTML estáticos:

- `site/index.html`: início e mapa do playbook.
- `site/recomendador.html`: recomendador interativo.
- `site/matriz.html`: matriz de decisão.
- `site/modelos.html`: perfis de modelos.
- `site/governanca.html`: governança por sensibilidade de dados.
- `site/benchmarks.html`: leitura crítica de benchmarks.
- `site/fontes.html`: fontes públicas.
- `site/publicacao.html`: fluxo de publicação.
- `site/404.html`: página de erro para GitHub Pages.

## Cadência de atualização

O conteúdo será atualizado em dois ciclos:

- Semanalmente, com revisão de informações públicas, como disponibilidade de modelos, documentação oficial, políticas, preços e benchmarks publicados.
- Mensalmente, com informações de benchmarks e testes feitos por mim, usando cenários controlados e observações próprias.

## Estrutura

- `site/*.html`: páginas publicadas pelo GitHub Pages.
- `site/assets/css/styles.css`: tema visual compartilhado.
- `site/assets/js/app.js`: navegação, busca, recomendador e renderização de listas/tabelas.
- `.github/workflows/pages.yml`: publicação do conteúdo de `site/` no GitHub Pages.

## Visualização local

O projeto não depende de bibliotecas Python externas. Para visualizar o site localmente, basta usar o servidor HTTP da biblioteca padrão:

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
```

Também confira localmente as páginas principais:

- `http://localhost:8000/`
- `http://localhost:8000/recomendador.html`
- `http://localhost:8000/matriz.html`
- `http://localhost:8000/modelos.html`
- `http://localhost:8000/governanca.html`
- `http://localhost:8000/benchmarks.html`
- `http://localhost:8000/fontes.html`
- `http://localhost:8000/publicacao.html`

## Publicação

O deploy publica a pasta `site/` via GitHub Actions. Não há etapa de build, instalação de dependências, bundling ou geração de arquivos.
