const navItems = [
  ["home", "Início", "./"],
  ["recomendador", "Recomendador", "recomendador.html"],
  ["matriz", "Matriz", "matriz.html"],
  ["modelos", "Modelos", "modelos.html"],
  ["governanca", "Governança", "governanca.html"],
  ["benchmarks", "Benchmarks", "benchmarks.html"],
  ["fontes", "Fontes", "fontes.html"],
  ["publicacao", "Publicação", "publicacao.html"]
];

const matrixRows = [
  {
    scenario: "Implementação comum",
    detail: "Endpoints, componentes, refactors localizados, testes simples.",
    model: "Composer 2.5 Standard",
    mode: "Normal / Fast quando a mudança for clara",
    use: "Plano já está definido e o risco de errar é baixo a médio.",
    avoid: "Arquitetura indefinida, mudança de contrato ou segurança."
  },
  {
    scenario: "Arquitetura / decisão cara",
    detail: "Trade-offs, desenho de solução, migração com risco.",
    model: "Claude Opus 4.8",
    mode: "High / adaptive thinking / Max",
    use: "Uma decisão ruim vira retrabalho caro.",
    avoid: "Patch mecânico ou alteração óbvia."
  },
  {
    scenario: "Terminal / build / CI / debug",
    detail: "Logs, stack traces, scripts, ambiente, testes quebrando.",
    model: "GPT-5.5",
    mode: "High / XHigh",
    use: "Precisa rodar, observar, corrigir e repetir.",
    avoid: "Problema puramente conceitual sem necessidade de ferramenta."
  },
  {
    scenario: "Code review crítico",
    detail: "PR importante, regressão, segurança, efeitos colaterais.",
    model: "GPT-5.5 + Claude Opus 4.8",
    mode: "Duas passagens",
    use: "GPT para edge cases/execução; Opus para intenção/design/manutenção.",
    avoid: "Review casual de diff pequeno."
  },
  {
    scenario: "Front-end / UI",
    detail: "Polish visual, screenshots, design system, HTML/CSS.",
    model: "Opus 4.8 para julgamento; GPT-5.5 ou Composer para execução",
    mode: "Normal / High",
    use: "Quando o desafio é intenção visual + implementação segura.",
    avoid: "Pequeno ajuste CSS sem ambiguidade."
  },
  {
    scenario: "Contexto massivo",
    detail: "Repo grande, documentação longa, mapeamento antes de editar.",
    model: "Claude Opus 4.8 / Gemini 3.1 Pro",
    mode: "1M context quando disponível",
    use: "O gargalo é ler e sintetizar muito contexto.",
    avoid: "Patch localizado em poucos arquivos."
  },
  {
    scenario: "Migração / feature grande",
    detail: "Muitos arquivos, etapas encadeadas, autonomia longa.",
    model: "Opus 4.8 + execução fatiada; Fable 5 somente watchlist/aprovação",
    mode: "Plano + checkpoints",
    use: "Delegar por etapas com validação explícita.",
    avoid: "Fable 5 enquanto suspenso, sem política de retenção aprovada."
  },
  {
    scenario: "Microtarefa mecânica",
    detail: "Renomear, trocar texto, boilerplate, formatação.",
    model: "Composer Fast / GPT-5.4 Mini",
    mode: "Fast / Low",
    use: "Pensar demais atrapalha mais do que ajuda.",
    avoid: "Mudança sistêmica, segurança, domínio complexo."
  }
];

const modelProfiles = [
  {
    name: "Composer 2.5",
    status: "Rota ativa",
    statusClass: "good",
    role: "Default eficiente para execução diária no Cursor.",
    best: ["Implementação comum", "Refactor localizado", "Testes simples", "Boilerplate controlado"],
    caution: "Não use como arquiteto único quando a solução ainda está ambígua.",
    tags: ["default", "eficiência", "Cursor"]
  },
  {
    name: "Composer 2.5 Fast",
    status: "Rota ativa com custo maior",
    statusClass: "blue",
    role: "Mesma linha de inteligência com menor latência.",
    best: ["Microtarefas", "Alterações mecânicas", "Iteração rápida", "Baixo risco"],
    caution: "Fast não deve virar default automático se custo for preocupação operacional.",
    tags: ["rápido", "baixo atrito", "microtarefas"]
  },
  {
    name: "GPT-5.5",
    status: "Rota ativa",
    statusClass: "good",
    role: "Terminal, debugging, validação e execução técnica difícil.",
    best: ["CI quebrando", "Build/test logs", "Scripts", "Correção iterativa"],
    caution: "Se o problema for arquitetura e não execução, planeje com Opus 4.8 antes.",
    tags: ["terminal", "debug", "tool use"]
  },
  {
    name: "Claude Opus 4.8",
    status: "Rota ativa premium",
    statusClass: "good",
    role: "Julgamento, arquitetura, revisão qualitativa e autonomia complexa.",
    best: ["Trade-offs", "Refatoração grande", "Review crítico", "Contexto longo"],
    caution: "Evite em tarefas mecânicas: pode aumentar custo de atenção e ruído.",
    tags: ["arquitetura", "review", "1M context"]
  },
  {
    name: "Gemini 3.1 Pro",
    status: "Rota auxiliar",
    statusClass: "blue",
    role: "Leitura e síntese de contexto massivo quando disponível no fluxo.",
    best: ["Repo grande", "Documentação extensa", "Mapeamento", "Multimodal"],
    caution: "Depois do mapa, execute com modelo mais integrado ao fluxo de edição.",
    tags: ["contexto", "multimodal", "síntese"]
  },
  {
    name: "Claude Fable 5",
    status: "Watchlist / não usar agora",
    statusClass: "bad",
    role: "Histórico de long-horizon coding; não deve ser recomendação ativa enquanto suspenso.",
    best: ["Somente avaliação futura", "Somente com aprovação", "Somente sem dados sensíveis"],
    caution: "Suspensão de acesso e requisitos de retenção tornam inadequado como rota padrão da empresa.",
    tags: ["suspenso", "retenção", "governança"]
  },
  {
    name: "Auto no Cursor",
    status: "Uso limitado",
    statusClass: "warn",
    role: "Conveniente para triagem, fraco para auditoria de decisões importantes.",
    best: ["Perguntas rápidas", "Baixo risco", "Exploração inicial"],
    caution: "Não use em arquitetura, review crítico, código sensível ou quando precisa saber qual modelo viu o contexto.",
    tags: ["triagem", "conveniência", "baixo controle"]
  }
];

const benchmarkRows = [
  ["Codex CLI · GPT-5.5", 83.4],
  ["Claude Code · Opus 4.8", 78.9],
  ["Terminus 2 · GPT-5.5", 78.2],
  ["Terminus 2 · Opus 4.8", 74.6],
  ["Gemini CLI · Gemini 3.1 Pro", 70.7],
  ["Claude Code · Opus 4.7", 69.7]
];

const sources = [
  {
    type: "Referência visual",
    title: "CodeSOTA",
    desc: "Registry denso com navegação por benchmarks, modelos, capacidade e proveniência.",
    url: "https://www.codesota.com/"
  },
  {
    type: "Referência visual",
    title: "Terminal-Bench",
    desc: "Identidade objetiva para tarefas, leaderboard e avaliação de agentes em terminal.",
    url: "https://www.tbench.ai/"
  },
  {
    type: "Modelo",
    title: "Cursor - Introducing Composer 2.5",
    desc: "Disponibilidade, melhorias de sustained work/instruções complexas e preço/fast mode.",
    url: "https://cursor.com/blog/composer-2-5"
  },
  {
    type: "Benchmark",
    title: "Artificial Analysis - Composer 2.5 Coding Agent Index",
    desc: "Score 62, comparação de custo por tarefa e ganho vs Composer 2.",
    url: "https://artificialanalysis.ai/articles/cursor-composer-2-5-coding-agent-index"
  },
  {
    type: "Modelo",
    title: "OpenAI - Introducing GPT-5.5",
    desc: "Agentic coding, Terminal-Bench 2.0, SWE-Bench Pro e comportamento com ferramentas.",
    url: "https://openai.com/index/introducing-gpt-5-5/"
  },
  {
    type: "Modelo",
    title: "Anthropic - What's new in Claude Opus 4.8",
    desc: "Opus-tier, 1M context em superfícies suportadas, adaptive thinking e agentic coding.",
    url: "https://platform.claude.com/docs/en/about-claude/models/whats-new-claude-4-8"
  },
  {
    type: "Governança",
    title: "Anthropic - suspensão de Fable 5 e Mythos 5",
    desc: "Diretiva de 12 jun. 2026 e suspensão global para cumprimento.",
    url: "https://www.anthropic.com/news/fable-mythos-access"
  },
  {
    type: "Governança",
    title: "Claude docs - API and data retention",
    desc: "Fable 5/Mythos 5 como Covered Models e exigência de retenção de 30 dias.",
    url: "https://platform.claude.com/docs/en/manage-claude/api-and-data-retention"
  },
  {
    type: "Modelo",
    title: "Google Cloud - Gemini 3.1 Pro",
    desc: "Modelo de raciocínio com 1M token context para datasets, multimodal e code repositories.",
    url: "https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-pro"
  },
  {
    type: "Benchmark",
    title: "Terminal-Bench 2.1 leaderboard",
    desc: "Ranking agent + model para tarefas em terminal; Codex CLI/GPT-5.5 e Claude Code/Opus 4.8.",
    url: "https://www.tbench.ai/leaderboard/terminal-bench/2.1"
  },
  {
    type: "Segurança",
    title: "OWASP Top 10 for LLM Applications",
    desc: "Prompt injection, sensitive disclosure, supply chain, excessive agency e demais riscos.",
    url: "https://owasp.org/www-project-top-10-for-large-language-model-applications/"
  }
];

const recommendations = {
  simple: {
    model: "Composer Fast / GPT-5.4 Mini",
    mode: "Fast / Low",
    tags: ["microtarefa", "baixo risco", "latência"],
    why: "A tarefa é mecânica. O ganho vem de reduzir atrito, não de maximizar raciocínio.",
    prompt: "Faça apenas a alteração solicitada. Não refatore nada adjacente. Preserve o padrão atual e resuma o diff.",
    caution: "Se surgir ambiguidade ou impacto sistêmico, escale para Composer 2.5 Standard ou Opus 4.8."
  },
  daily: {
    model: "Composer 2.5",
    mode: "Standard / Normal",
    tags: ["default", "eficiência", "implementação"],
    why: "Implementação comum é o melhor caso para Composer 2.5: bom equilíbrio entre qualidade, custo e velocidade dentro do Cursor.",
    prompt: "Implemente em passos pequenos. Liste arquivos afetados, preserve padrões existentes, rode/verifique testes relevantes e resuma o resultado.",
    caution: "Se a mudança afetar contrato, segurança ou muitos arquivos, peça plano ao Opus 4.8 antes de executar."
  },
  architecture: {
    model: "Claude Opus 4.8",
    mode: "High / adaptive thinking / Max",
    tags: ["arquitetura", "trade-offs", "decisão cara"],
    why: "A tarefa exige julgamento. Opus 4.8 é melhor posicionado para intenção, riscos, ordem de execução e manutenção.",
    prompt: "Antes de editar, proponha 2-3 abordagens com trade-offs, riscos, arquivos afetados e plano incremental. Só implemente após o plano.",
    caution: "Depois do plano, delegue trechos mecânicos para Composer 2.5 para evitar excesso de deliberação."
  },
  terminal: {
    model: "GPT-5.5",
    mode: "High / XHigh",
    tags: ["terminal", "debug", "CI"],
    why: "Terminal/debug exige loop de execução: rodar comando, observar logs, corrigir e repetir. GPT-5.5 tem sinal forte nesse tipo de benchmark.",
    prompt: "Reproduza o erro, formule hipótese, aplique a menor correção viável, rode novamente e documente comandos, saída e resultado.",
    caution: "Se a causa for desenho do sistema, volte para Opus 4.8 para planejar a correção."
  },
  review: {
    model: "GPT-5.5 + Claude Opus 4.8",
    mode: "Duas passagens",
    tags: ["review cruzado", "edge cases", "design"],
    why: "Revisão crítica se beneficia de duas lentes: execução/casos de borda e intenção/design/manutenção.",
    prompt: "Revise o diff em duas passagens: primeiro bugs, edge cases e testes; depois arquitetura, legibilidade e efeitos colaterais.",
    caution: "Evite modelo muito autônomo para review simples: ele pode gerar ruído e comentários demais."
  },
  frontend: {
    model: "Opus 4.8 + Composer/GPT-5.5",
    mode: "Julgamento visual + execução",
    tags: ["UI", "screenshot", "design system"],
    why: "UI exige respeitar intenção visual e padrões existentes. Opus ajuda no julgamento; Composer/GPT executam a alteração.",
    prompt: "Compare esperado vs atual, preserve design system, faça mudanças mínimas e liste diferenças visuais resolvidas.",
    caution: "Para ajuste pequeno de CSS, Composer 2.5 pode ser suficiente."
  },
  largeContext: {
    model: "Claude Opus 4.8 / Gemini 3.1 Pro",
    mode: "1M context quando disponível",
    tags: ["repo grande", "síntese", "contexto"],
    why: "Quando o gargalo é ler muito contexto, priorize janela ampla e síntese antes de editar.",
    prompt: "Mapeie módulos, contratos, pontos de entrada, dependências e riscos. Proponha plano incremental antes de alterar arquivos.",
    caution: "Depois que os pontos de alteração estiverem claros, execute com Composer 2.5 ou GPT-5.5 conforme a natureza da tarefa."
  },
  migration: {
    model: "Claude Opus 4.8 + execução fatiada",
    mode: "Plano + checkpoints",
    tags: ["migração", "feature grande", "checkpoints"],
    why: "O trabalho é grande e encadeado, mas precisa de controle humano. Use Opus para planejar e fatias menores para executar.",
    prompt: "Analise a área, proponha plano com checkpoints, implemente por etapas, rode testes e pare para revisão antes de mudanças destrutivas.",
    caution: "Não roteie para Fable 5 enquanto houver suspensão/acesso incerto ou sem aprovação de retenção."
  }
};

function tagClass(tag) {
  const t = tag.toLowerCase();
  if (t.includes("suspenso") || t.includes("retenção") || t.includes("confidencial")) return "bad";
  if (t.includes("governança") || t.includes("watchlist") || t.includes("custo")) return "warn";
  if (t.includes("contexto") || t.includes("terminal") || t.includes("debug") || t.includes("1m")) return "blue";
  if (t.includes("arquitetura") || t.includes("review")) return "purple";
  return "brand";
}

function sourceClass(type) {
  const t = type.toLowerCase();
  if (t.includes("governança") || t.includes("privacidade")) return "warn";
  if (t.includes("segurança")) return "bad";
  if (t.includes("benchmark")) return "brand";
  if (t.includes("referência")) return "purple";
  return "good";
}

function renderNav() {
  const nav = document.getElementById("siteNav");
  if (!nav) return;

  const current = document.body.dataset.page || "home";
  nav.innerHTML = navItems.map(([id, label, href], index) => {
    const active = current === id ? ' aria-current="page"' : "";
    return `
      <a href="${href}"${active}>
        <span class="nav-index">${String(index + 1).padStart(2, "0")}</span>
        <span>${label}</span>
      </a>
    `;
  }).join("");
}

function renderMatrix() {
  const body = document.getElementById("matrixBody");
  if (!body) return;

  body.innerHTML = matrixRows.map(row => `
    <tr class="searchable" data-search="${[row.scenario, row.detail, row.model, row.mode, row.use, row.avoid].join(" ").toLowerCase()}">
      <td><strong>${row.scenario}</strong><div class="table-note">${row.detail}</div></td>
      <td><span class="tag brand">${row.model}</span></td>
      <td>${row.mode}</td>
      <td>${row.use}</td>
      <td>${row.avoid}</td>
    </tr>
  `).join("");
}

function renderModels() {
  const grid = document.getElementById("modelGrid");
  if (!grid) return;

  grid.innerHTML = modelProfiles.map(model => `
    <article class="model-card searchable" data-search="${[model.name, model.status, model.role, model.best.join(" "), model.caution, model.tags.join(" ")].join(" ").toLowerCase()}">
      <div class="tag-row">
        <span class="tag ${model.statusClass}">${model.status}</span>
        ${model.tags.map(t => `<span class="tag ${tagClass(t)}">${t}</span>`).join("")}
      </div>
      <h3>${model.name}</h3>
      <p>${model.role}</p>
      <ul>${model.best.map(item => `<li>${item}</li>`).join("")}</ul>
      <p class="meta"><strong>Atenção:</strong> ${model.caution}</p>
    </article>
  `).join("");
}

function renderBenchmarks() {
  const list = document.getElementById("barList");
  if (!list) return;

  const max = Math.max(...benchmarkRows.map(([, value]) => value));
  list.innerHTML = benchmarkRows.map(([label, value]) => `
    <div class="bar-row searchable" data-search="${label.toLowerCase()} ${value}">
      <div class="bar-label" title="${label}">${label}</div>
      <div class="bar-track"><div class="bar-fill" style="width:${(value / max) * 100}%"></div></div>
      <div class="bar-value">${value.toFixed(1)}</div>
    </div>
  `).join("");
}

function renderSources() {
  const grid = document.getElementById("sourceGrid");
  if (!grid) return;

  grid.innerHTML = sources.map(source => `
    <a class="source-card searchable" href="${source.url}" target="_blank" rel="noopener noreferrer" data-search="${[source.type, source.title, source.desc, source.url].join(" ").toLowerCase()}">
      <span class="tag ${sourceClass(source.type)}" style="justify-self:start">${source.type}</span>
      <strong>${source.title}</strong>
      <span class="desc">${source.desc}</span>
    </a>
  `).join("");
}

function recommend() {
  const taskEl = document.getElementById("taskSelect");
  if (!taskEl) return;

  const task = taskEl.value;
  const complexity = document.getElementById("complexitySelect").value;
  const sensitivity = document.getElementById("sensitivitySelect").value;
  const scope = document.getElementById("scopeSelect").value;
  let rec = { ...recommendations[task] };

  if (complexity === "high" && task === "daily") {
    rec = {
      model: "Composer 2.5 + revisão Opus 4.8",
      mode: "Execução + revisão",
      tags: ["implementação", "review", "risco médio"],
      why: "A tarefa ainda é implementação, mas a complexidade alta pede uma revisão de intenção e efeitos colaterais.",
      prompt: "Implemente com diffs pequenos e peça ao Opus uma revisão focada em contratos, efeitos colaterais e testes faltantes.",
      caution: "Se o plano mudar durante a execução, interrompa e repleneje."
    };
  }

  if ((scope === "many" || scope === "unknown") && ["daily", "frontend", "simple"].includes(task)) {
    rec = {
      ...rec,
      model: rec.model.includes("Opus") ? rec.model : `${rec.model} + plano Opus 4.8`,
      mode: `${rec.mode} + checkpoint`,
      tags: [...new Set([...rec.tags, "checkpoints", "escopo"])],
      caution: `${rec.caution} Como o escopo é grande/desconhecido, peça lista de arquivos e checkpoints antes de aceitar edição em lote.`
    };
  }

  if (sensitivity === "confidential" || sensitivity === "regulated") {
    rec = {
      model: task === "terminal" ? "GPT-5.5 com contexto mínimo" : "Claude Opus 4.8 / Composer 2.5 com contexto mínimo",
      mode: task === "terminal" ? "High, sem logs crus" : "Plano curto + diffs pequenos",
      tags: ["privacidade", "governança", "contexto mínimo"],
      why: "A sensibilidade dos dados tem prioridade sobre benchmark. A rota evita modelos em watchlist e reduz o contexto compartilhado.",
      prompt: "Use exemplos sintéticos ou trechos redigidos. Liste suposições, plano, arquivos afetados e validação. Não solicite nem exponha segredos.",
      caution: "Confirme Privacy Mode/ZDR, política do provedor e aprovação interna antes de enviar código de cliente, PII, credenciais ou segredo comercial."
    };
  }

  document.getElementById("recModel").textContent = rec.model;
  document.getElementById("recMode").textContent = rec.mode;
  document.getElementById("recTags").innerHTML = rec.tags.map(t => `<span class="tag ${tagClass(t)}">${t}</span>`).join("");
  document.getElementById("recWhy").textContent = rec.why;
  document.getElementById("recPrompt").textContent = rec.prompt;
  document.getElementById("recCaution").textContent = rec.caution;
}

function filterPage() {
  const input = document.getElementById("searchInput");
  const count = document.getElementById("searchCount");
  if (!input || !count) return;

  const query = input.value.trim().toLowerCase();
  const items = Array.from(document.querySelectorAll(".searchable"));
  let visible = 0;

  items.forEach(item => {
    const haystack = (item.getAttribute("data-search") || item.textContent || "").toLowerCase();
    const show = !query || haystack.includes(query);
    item.classList.toggle("is-hidden", !show);
    if (show) visible += 1;
  });

  count.textContent = query ? `${visible}/${items.length}` : "todos";
}

function setupMobileNav() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const menuBtn = document.getElementById("menuBtn");
  if (!sidebar || !overlay || !menuBtn) return;

  const open = () => {
    sidebar.classList.add("open");
    overlay.classList.add("open");
    document.body.classList.add("nav-open");
    menuBtn.setAttribute("aria-expanded", "true");
  };

  const close = () => {
    sidebar.classList.remove("open");
    overlay.classList.remove("open");
    document.body.classList.remove("nav-open");
    menuBtn.setAttribute("aria-expanded", "false");
  };

  menuBtn.addEventListener("click", () => sidebar.classList.contains("open") ? close() : open());
  overlay.addEventListener("click", close);
  document.querySelectorAll(".nav-list a").forEach(link => link.addEventListener("click", close));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") close();
  });
}

function setupEvents() {
  ["taskSelect", "complexitySelect", "sensitivitySelect", "scopeSelect"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("change", recommend);
  });

  const searchInput = document.getElementById("searchInput");
  if (searchInput) searchInput.addEventListener("input", filterPage);

  const clearSearch = document.getElementById("clearSearch");
  if (clearSearch) {
    clearSearch.addEventListener("click", () => {
      searchInput.value = "";
      filterPage();
      searchInput.focus();
    });
  }

  document.querySelectorAll("[data-print]").forEach(button => {
    button.addEventListener("click", () => window.print());
  });
}

renderNav();
renderMatrix();
renderModels();
renderBenchmarks();
renderSources();
recommend();
setupEvents();
setupMobileNav();
filterPage();
