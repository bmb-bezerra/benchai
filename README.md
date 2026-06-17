# benchai

Site estático para publicar um playbook de roteamento de modelos de IA no Cursor.

O objetivo é manter uma página de consulta rápida para comparar modelos, orientar escolhas por tipo de tarefa, sensibilidade dos dados, risco operacional e evidências de benchmark. O site também registra critérios de governança e cuidados para uso de modelos em fluxos de engenharia.

## Conteúdo

- Recomendações práticas de modelo por tarefa.
- Matriz de decisão para uso no Cursor.
- Perfis de modelos e cuidados por sensibilidade de dados.
- Leitura crítica de benchmarks públicos.
- Notas de publicação no GitHub Pages.

## Cadência de atualização

O conteúdo será atualizado em dois ciclos:

- Semanalmente, com revisão de informações públicas, como disponibilidade de modelos, documentação oficial, políticas, preços e benchmarks publicados.
- Mensalmente, com informações de benchmarks e testes feitos por mim, usando cenários controlados e observações próprias.

## Estrutura

- `site/index.html`: página principal.
- `site/404.html`: página de erro para GitHub Pages.
- `site/assets/css/styles.css`: estilos do 404 e layout estático legado.
- `.github/workflows/pages.yml`: publicação do conteúdo de `site/` no GitHub Pages.

## Visualização local

O projeto não depende de bibliotecas Python externas. Para visualizar o site localmente, basta usar o servidor HTTP da biblioteca padrão:

```bash
python3 -m http.server 8000 --directory site
```

Depois acesse `http://localhost:8000/`.
