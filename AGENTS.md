# AGENTS.md

## Project Context

- This repository publishes a static GitHub Pages site from `site/`.
- The GitHub Actions workflow in `.github/workflows/pages.yml` uploads `./site` directly. There is no install, build, or bundling step.
- Published pages are plain HTML files in `site/`.
- Shared styling lives in `site/assets/css/styles.css`, including layout, responsive rules, and light/dark theme tokens.
- Shared browser behavior lives in `site/assets/js/app.js`, including navigation, compact topbar rendering, sidebar collapse, theme switching, recommender logic, and rendered lists/tables.

## Working Guidelines

- At the start of any task that changes or audits this project, start or verify a local preview server for `site/` so the current site can be inspected while working. Prefer `python3 -m http.server 8000 --directory site`, then open `http://localhost:8000/`. If port `8000` is busy, reuse a healthy server or choose another port and report the URL.
- Keep public-facing copy in Brazilian Portuguese unless the task asks otherwise.
- Keep changes scoped to the static site or Pages workflow affected by the request.
- Avoid adding frameworks, package managers, generated assets, or build tooling unless explicitly requested and justified.
- Preserve accessibility basics: semantic headings, keyboard focus states, descriptive links, labels, and useful `alt` text if images are added.
- Do not commit local server logs, temporary files, dependency folders, caches, or editor metadata.

## Validation

- No install step is required for the current site.
- Preview locally with `python3 -m http.server 8000 --directory site`, then open `http://localhost:8000/`.
- If port `8000` is busy, use another port or inspect it with `lsof -nP -iTCP:8000 -sTCP:LISTEN`.
- Validate JavaScript with `node --check site/assets/js/app.js`.
- Run `git diff --check` before handing off changes.
- Validate edited HTML with `python3 -m html.parser` against the affected files.
- For HTML or CSS changes, inspect the rendered page on desktop and mobile widths when a browser is available.
- For navigation changes, verify that all local links point to existing files under `site/`.

## GitHub Pages

- Deployment runs on pushes to `main` and on manual workflow dispatch.
- Keep the published entry point at `site/index.html`.
- Keep the not-found page at `site/404.html`.
- Keep the site static; do not introduce a build pipeline without explicit approval.
