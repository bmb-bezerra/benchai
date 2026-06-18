const navItems = [
  ["home", "Início", "./"],
  ["recomendador", "Recomendador", "recomendador.html"],
  ["matriz", "Matriz", "matriz.html"],
  ["modelos", "Modelos", "modelos.html"],
  ["governanca", "Governança", "governanca.html"],
  ["benchmarks", "Benchmarks", "benchmarks.html"],
  ["fontes", "Fontes", "fontes.html"]
];

const matrixRows = [
  {
    scenario: "Adoção GitHub-first",
    detail: "Autocomplete, chat no IDE, PR review, issues, CLI e agentes no GitHub.",
    model: "GitHub Copilot",
    mode: "IDE + GitHub + agent mode quando necessário",
    use: "A organização já trabalha em GitHub e quer rollout amplo com baixa fricção.",
    avoid: "Repositório sensível sem política de dados aprovada ou custo de uso sem controle."
  },
  {
    scenario: "AI IDE como fluxo principal",
    detail: "Edição diária, navegação de codebase, tarefas multi-arquivo e automações.",
    model: "Cursor / Windsurf",
    mode: "IDE local + agentes/cloud quando o escopo justificar",
    use: "O time quer trabalhar dentro de um editor agentic, com contexto do repositório e automações.",
    avoid: "Uso sem checkpoints, sem limite de contexto ou sem validação local."
  },
  {
    scenario: "Tarefa longa / decisão cara",
    detail: "Refatoração, arquitetura, investigação, revisão sofisticada e execução com ferramentas.",
    model: "Claude Code / Claude 4",
    mode: "Plano primeiro, execução por etapas",
    use: "O custo de errar é alto e a tarefa exige julgamento ou foco sustentado.",
    avoid: "Microtarefa mecânica ou alteração óbvia que só precisa de latência baixa."
  },
  {
    scenario: "Automação via API / pipeline",
    detail: "Geração programática, diffs, revisão automatizada, bots e integrações próprias.",
    model: "OpenAI Codex / GPT-4.1",
    mode: "API, CLI ou agente isolado por tarefa",
    use: "O objetivo é integrar IA em produto, pipeline ou rotina de engenharia.",
    avoid: "Enviar código sensível sem ZDR/retention aprovado ou sem sandbox de execução."
  },
  {
    scenario: "Google Cloud / contexto longo",
    detail: "Code Assist, Vertex/AI Studio, repositórios grandes e contexto multimodal.",
    model: "Gemini Code Assist / Gemini Pro",
    mode: "IDE + Vertex/AI Studio quando a pilha for Google",
    use: "O time já está no ecossistema Google Cloud ou precisa de janela de contexto ampla.",
    avoid: "Loops muito interativos quando latência observada atrapalhar a cadência."
  },
  {
    scenario: "AWS / modernização Java",
    detail: "Transformação de código, revisão, segurança e automação em ambientes AWS.",
    model: "Amazon Q Developer",
    mode: "IDE + CLI + GitHub/AWS",
    use: "A restrição principal é modernizar ou operar sistemas dentro da AWS.",
    avoid: "Comparar com modelos frontier como ranking universal de inteligência."
  },
  {
    scenario: "Soberania / self-hosting",
    detail: "VPC, on-prem, air gap, custo unitário baixo ou necessidade de controle local.",
    model: "Qwen3-Coder-Next / DeepSeek-V3",
    mode: "Open-weight, API compatível ou serving próprio",
    use: "Privacidade, custo e controle de implantação pesam mais que conveniência SaaS.",
    avoid: "Usar sem observabilidade, avaliação interna e engenharia de serving."
  },
  {
    scenario: "Privacidade enterprise",
    detail: "Ambientes regulados, políticas rígidas, VPC/on-prem e controle de dados.",
    model: "Tabnine / implantação privada",
    mode: "Enterprise controls antes de benchmark",
    use: "A regra de dados impede SaaS genérico ou exige implantação isolada.",
    avoid: "Escolher só por benchmark quando compliance é o critério dominante."
  }
];

const modelProfiles = [
  {
    name: "GitHub Copilot",
    status: "Rota ativa",
    statusClass: "good",
    role: "Melhor encaixe para adoção organizacional GitHub-first.",
    best: ["Autocomplete e chat", "PR review", "Agent mode", "Governança em GitHub"],
    caution: "Controle uso de agentes, custo e política de dados antes de escalar.",
    tags: ["adoção", "GitHub", "PR"]
  },
  {
    name: "Cursor",
    status: "Rota ativa",
    statusClass: "blue",
    role: "AI IDE para execução diária com contexto de codebase.",
    best: ["Implementação", "Navegação de repo", "Automations", "Agentes no editor"],
    caution: "Use checkpoints e validação local em alterações multi-arquivo.",
    tags: ["AI IDE", "Cursor", "agentes"]
  },
  {
    name: "Windsurf / Devin Desktop",
    status: "Rota alternativa",
    statusClass: "blue",
    role: "AI IDE com agente cloud para automação, PR review e handoff mais autônomo.",
    best: ["Editor agentic", "PR reviews", "MCP", "Devin cloud"],
    caution: "Use com checkpoints explícitos: autonomia longa aumenta risco, custo e dependência do harness.",
    tags: ["AI IDE", "cloud agent", "review"]
  },
  {
    name: "Claude Code / Claude 4",
    status: "Rota ativa",
    statusClass: "good",
    role: "Tarefas longas, refatoração e revisão com julgamento.",
    best: ["Arquitetura", "Refactor multiarquivo", "Review crítico", "Claude Code"],
    caution: "Evite em patch mecânico simples se custo/latência forem relevantes.",
    tags: ["arquitetura", "review", "agentes"]
  },
  {
    name: "OpenAI Codex / GPT-4.1",
    status: "Rota ativa",
    statusClass: "good",
    role: "Integração via API, automação programática e diffs auditáveis.",
    best: ["API-first", "Codex CLI", "Bots internos", "Aider/diff editing"],
    caution: "Isole execução e retenção antes de automatizar repositórios sensíveis.",
    tags: ["API", "Codex", "automação"]
  },
  {
    name: "Gemini Code Assist",
    status: "Rota auxiliar",
    statusClass: "blue",
    role: "Boa opção quando Google Cloud, Vertex e contexto longo são centrais.",
    best: ["Google Cloud", "Repo grande", "Code Assist", "GitHub reviews"],
    caution: "Meça latência real no fluxo do time antes de tornar default.",
    tags: ["Google Cloud", "contexto", "IDE"]
  },
  {
    name: "Amazon Q Developer",
    status: "Rota ativa AWS",
    statusClass: "blue",
    role: "Modernização, revisão e automação para times AWS-first.",
    best: ["Java modernization", "AWS", "CLI", "Security review"],
    caution: "Use quando a pilha AWS for parte do problema, não como benchmark universal.",
    tags: ["AWS", "modernização", "segurança"]
  },
  {
    name: "Qwen3-Coder-Next",
    status: "Open-weight",
    statusClass: "warn",
    role: "Candidato forte para self-hosting e agentes com controle local.",
    best: ["VPC/on-prem", "Soberania", "Serving próprio", "Agentic coding"],
    caution: "Exige avaliação interna, serving, telemetria e política de atualização.",
    tags: ["open-weight", "self-hosting", "soberania"]
  },
  {
    name: "DeepSeek-V3",
    status: "Open-weight / baixo custo",
    statusClass: "warn",
    role: "Opção para custo unitário baixo, API compatível e execução controlada.",
    best: ["Alto volume", "Pesquisa interna", "Prototipagem local", "Serving aberto"],
    caution: "Não substitui revisão de segurança, benchmark interno e política de dados.",
    tags: ["baixo custo", "open-weight", "API"]
  },
  {
    name: "Tabnine",
    status: "Enterprise privado",
    statusClass: "good",
    role: "Rota para compliance, VPC, on-prem e ambientes regulados.",
    best: ["Privacidade", "VPC", "On-prem", "Air gap"],
    caution: "Escolha por restrição de dados, não por ranking frontier isolado.",
    tags: ["privacidade", "enterprise", "air gap"]
  }
];

const benchmarkRows = [
  ["Gemini 3.1 Pro · SWE-Bench Verified", 80.6],
  ["Claude Sonnet 4 · SWE-Bench Verified", 72.7],
  ["Claude Opus 4 · SWE-Bench Verified", 72.5],
  ["GPT-4.1 · SWE-Bench Verified", 54.6],
  ["DeepSeek-V3 · SWE Verified", 42.0]
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
    type: "Survey",
    title: "Stack Overflow Developer Survey 2025 - AI",
    desc: "Uso de AI tools, confiança, agentes, produtividade e preocupações com precisão, segurança e privacidade.",
    url: "https://survey.stackoverflow.co/2025/ai/"
  },
  {
    type: "Plataforma",
    title: "GitHub Copilot",
    desc: "Copilot em IDE, GitHub, CLI, modelos selecionáveis, agentes e controles corporativos.",
    url: "https://github.com/features/copilot"
  },
  {
    type: "Plataforma",
    title: "Cursor",
    desc: "AI IDE com agente, Composer, CLI, automations, GitHub, SDK e fluxos de revisão.",
    url: "https://cursor.com/"
  },
  {
    type: "Modelo",
    title: "OpenAI - Introducing GPT-4.1 in the API",
    desc: "Coding, instruction following, long context, SWE-Bench Verified, Aider polyglot e preços por token.",
    url: "https://openai.com/index/gpt-4-1/"
  },
  {
    type: "Modelo",
    title: "Anthropic - Introducing Claude 4",
    desc: "Claude Opus 4, Sonnet 4, Claude Code GA, SWE-Bench, Terminal-Bench e pricing oficial.",
    url: "https://www.anthropic.com/news/claude-4"
  },
  {
    type: "Modelo",
    title: "Google DeepMind - Gemini Pro",
    desc: "Model card e visão de capacidades do Gemini Pro usados como referência para contexto longo e coding.",
    url: "https://deepmind.google/models/gemini/pro/"
  },
  {
    type: "Plataforma",
    title: "Gemini Code Assist",
    desc: "Code Assist para times, IDEs, Google Cloud e fluxos de desenvolvimento assistido.",
    url: "https://codeassist.google/products/business"
  },
  {
    type: "Plataforma",
    title: "Windsurf",
    desc: "Editor agentic, agentes cloud e revisão de PR como alternativa ao fluxo AI IDE principal.",
    url: "https://windsurf.com/"
  },
  {
    type: "Plataforma",
    title: "Amazon Q Developer",
    desc: "Assistente da AWS para IDE, CLI, revisão, segurança e modernização de código.",
    url: "https://aws.amazon.com/q/developer/"
  },
  {
    type: "Open-weight",
    title: "Qwen3-Coder-Next Technical Report",
    desc: "Modelo open-weight especializado em coding agents, SWE-Bench, Terminal-Bench e inferência eficiente.",
    url: "https://arxiv.org/abs/2603.00729"
  },
  {
    type: "Open-weight",
    title: "DeepSeek-V3 Technical Report",
    desc: "Modelo MoE open-weight, avaliações de código e foco em custo/eficiência de inferência.",
    url: "https://arxiv.org/abs/2412.19437"
  },
  {
    type: "Privacidade",
    title: "Tabnine",
    desc: "Assistente enterprise com opções voltadas a privacidade, controle de dados, VPC, on-prem e air gap.",
    url: "https://www.tabnine.com/"
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
    model: "GitHub Copilot / Cursor",
    mode: "Autocomplete, chat curto ou edição local",
    tags: ["microtarefa", "baixo risco", "latência"],
    why: "A tarefa é mecânica. O ganho vem de reduzir atrito, não de maximizar raciocínio.",
    prompt: "Faça apenas a alteração solicitada. Não refatore nada adjacente. Preserve o padrão atual e resuma o diff.",
    caution: "Se surgir ambiguidade ou impacto sistêmico, escale para Claude Code, Codex ou um plano antes de editar."
  },
  daily: {
    model: "Cursor / GitHub Copilot",
    mode: "IDE + validação local",
    tags: ["default", "eficiência", "implementação"],
    why: "Implementação comum se beneficia de ferramenta integrada ao editor e ao fluxo de PR, sem precisar de modelo premium em todo patch.",
    prompt: "Implemente em passos pequenos. Liste arquivos afetados, preserve padrões existentes, rode/verifique testes relevantes e resuma o resultado.",
    caution: "Se a mudança afetar contrato, segurança ou muitos arquivos, peça plano antes de executar."
  },
  architecture: {
    model: "Claude Code / Claude 4",
    mode: "Plano + execução por etapas",
    tags: ["arquitetura", "trade-offs", "decisão cara"],
    why: "A tarefa exige julgamento, leitura de contexto e cuidado com efeitos colaterais.",
    prompt: "Antes de editar, proponha 2-3 abordagens com trade-offs, riscos, arquivos afetados e plano incremental. Só implemente após o plano.",
    caution: "Depois do plano, use ferramenta mais rápida para trechos mecânicos se isso reduzir custo e ruído."
  },
  terminal: {
    model: "Claude Code / OpenAI Codex",
    mode: "Loop comando -> log -> patch -> teste",
    tags: ["terminal", "debug", "CI"],
    why: "Terminal/debug exige loop de ferramenta: rodar comando, observar logs, corrigir e repetir.",
    prompt: "Reproduza o erro, formule hipótese, aplique a menor correção viável, rode novamente e documente comandos, saída e resultado.",
    caution: "Se a causa for desenho do sistema, volte para planejamento antes de insistir no loop de terminal."
  },
  review: {
    model: "GitHub Copilot + Claude Code",
    mode: "PR review + revisão profunda",
    tags: ["review cruzado", "edge cases", "design"],
    why: "Revisão crítica combina integração no GitHub com uma segunda leitura de intenção, segurança e manutenção.",
    prompt: "Revise o diff em duas passagens: primeiro bugs, edge cases e testes; depois arquitetura, legibilidade e efeitos colaterais.",
    caution: "Evite modelo muito autônomo para review simples: ele pode gerar ruído e comentários demais."
  },
  frontend: {
    model: "Cursor + Claude Code / Codex",
    mode: "Julgamento visual + execução local",
    tags: ["UI", "screenshot", "design system"],
    why: "UI exige respeitar intenção visual, padrões existentes e verificação em viewport real.",
    prompt: "Compare esperado vs atual, preserve design system, faça mudanças mínimas e liste diferenças visuais resolvidas.",
    caution: "Para ajuste pequeno de CSS, uma ferramenta rápida no editor pode ser suficiente."
  },
  largeContext: {
    model: "Gemini Code Assist / Claude Code / Cursor",
    mode: "Mapeamento antes de editar",
    tags: ["repo grande", "síntese", "contexto"],
    why: "Quando o gargalo é ler muito contexto, priorize janela ampla e síntese antes de editar.",
    prompt: "Mapeie módulos, contratos, pontos de entrada, dependências e riscos. Proponha plano incremental antes de alterar arquivos.",
    caution: "Depois que os pontos de alteração estiverem claros, execute em diffs pequenos com validação local."
  },
  migration: {
    model: "Amazon Q Developer / Claude Code / Codex",
    mode: "Plano + checkpoints + validação",
    tags: ["migração", "feature grande", "checkpoints"],
    why: "Migração e modernização precisam de controle por etapas. Amazon Q é especialmente relevante em stacks AWS/Java.",
    prompt: "Analise a área, proponha plano com checkpoints, implemente por etapas, rode testes e pare para revisão antes de mudanças destrutivas.",
    caution: "Não aceite autonomia longa sem rollback, logs de comandos e revisão humana."
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
      model: "Cursor/Copilot + revisão Claude Code",
      mode: "Execução + revisão",
      tags: ["implementação", "review", "risco médio"],
      why: "A tarefa ainda é implementação, mas a complexidade alta pede uma revisão de intenção e efeitos colaterais.",
      prompt: "Implemente com diffs pequenos e peça revisão focada em contratos, efeitos colaterais e testes faltantes.",
      caution: "Se o plano mudar durante a execução, interrompa e replaneje."
    };
  }

  if ((scope === "many" || scope === "unknown") && ["daily", "frontend", "simple"].includes(task)) {
    rec = {
      ...rec,
      model: rec.model.includes("Claude") ? rec.model : `${rec.model} + plano Claude Code`,
      mode: `${rec.mode} + checkpoint`,
      tags: [...new Set([...rec.tags, "checkpoints", "escopo"])],
      caution: `${rec.caution} Como o escopo é grande/desconhecido, peça lista de arquivos e checkpoints antes de aceitar edição em lote.`
    };
  }

  if (sensitivity === "confidential" || sensitivity === "regulated") {
    rec = {
      model: sensitivity === "regulated" ? "Tabnine / Qwen / DeepSeek self-hosted" : "Ferramenta aprovada com contexto mínimo",
      mode: task === "terminal" ? "Sem logs crus, com redaction" : "Plano curto + diffs pequenos",
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
