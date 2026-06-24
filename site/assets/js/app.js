const {
  navItems,
  legacyBenchDataPages,
  matrixRows,
  modelProfiles,
  benchmarkRows,
  benchmarkNotes,
  harnessRows,
  sources,
  recommendations
} = window.BenchAIData || {};

const fallbackNavItems = [
  { id: "home", label: "Início", href: "./" },
  { id: "bench-news", label: "Bench News", href: "bench-news.html" },
  { id: "bench-recomenda", label: "Bench Recomenda", href: "bench-recomenda.html" },
  { id: "bench-data", label: "Bench Data", href: "bench-data.html" },
  { id: "fontes", label: "Fontes", href: "fontes.html" }
];

const safeNavItems = Array.isArray(navItems) && navItems.length ? navItems : fallbackNavItems;
const safeLegacyBenchDataPages = legacyBenchDataPages instanceof Set
  ? legacyBenchDataPages
  : new Set(["modelos", "ides", "benchmarks"]);

function tagClass(tag) {
  const t = tag.toLowerCase();
  if (t.includes("suspenso") || t.includes("retenção") || t.includes("confidencial")) return "bad";
  if (t.includes("governança") || t.includes("watchlist") || t.includes("custo") || t.includes("pendente")) return "warn";
  if (t.includes("contexto") || t.includes("terminal") || t.includes("debug") || t.includes("1m") || t.includes("google")) return "blue";
  if (t.includes("arquitetura") || t.includes("review") || t.includes("julgamento")) return "purple";
  return "brand";
}

function sourceClass(type) {
  const t = type.toLowerCase();
  if (t.includes("governança") || t.includes("privacidade")) return "warn";
  if (t.includes("segurança")) return "bad";
  if (t.includes("benchmark")) return "brand";
  if (t.includes("adoção")) return "good";
  if (t.includes("referência")) return "purple";
  return "good";
}

function sourceStatusClass(status = "verificado") {
  if (status.includes("fornecedor")) return "blue";
  if (status.includes("open")) return "good";
  if (status === "fornecedor") return "blue";
  if (status === "pendente") return "warn";
  if (status === "histórico") return "purple";
  if (status === "crítico") return "bad";
  return "good";
}

function sourceStatusLabel(status = "verificado") {
  const labels = {
    verificado: "verificado",
    fornecedor: "fornecedor",
    pendente: "pendente",
    histórico: "histórico",
    crítico: "crítico",
    prático: "prático",
    open: "open",
    "fornecedor/open": "fornecedor/open",
    "open/fornecedor": "open/fornecedor"
  };
  return labels[status] || status;
}

function renderNav() {
  const nav = document.getElementById("siteNav");
  if (!nav) return;

  const activeId = currentNavId();
  nav.innerHTML = safeNavItems.map(({ id, label, href }) => {
    const active = activeId === id ? ' aria-current="page"' : "";
    return `
      <a href="${href}" data-nav-id="${id}"${active}>
        <span class="nav-text">${label}</span>
      </a>
    `;
  }).join("");
}

function currentNavId() {
  const current = document.body.dataset.page || "home";
  if (safeLegacyBenchDataPages.has(current)) return "bench-data";
  if (current === "home" && window.location.hash) {
    const hashId = window.location.hash.slice(1);
    if (safeNavItems.some(({ id }) => id === hashId)) return hashId;
  }
  return current;
}

function syncNavCurrent() {
  const activeId = currentNavId();
  document.querySelectorAll("[data-nav-id]").forEach(link => {
    if (link.dataset.navId === activeId) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function renderTopbar() {
  if (document.querySelector(".site-topbar")) return;

  const activeId = currentNavId();
  const topbar = document.createElement("header");
  topbar.className = "site-topbar";
  topbar.setAttribute("aria-label", "Navegação compacta");
  topbar.innerHTML = `
    <a class="topbar-brand" href="./">
      <span class="topbar-mark" aria-hidden="true">BAI</span>
      <span>BenchAI</span>
    </a>
    <nav class="topbar-nav" aria-label="Navegação principal compacta">
      ${safeNavItems.map(({ id, label, href }) => {
        const active = activeId === id ? ' aria-current="page"' : "";
        return `
          <a href="${href}" data-nav-id="${id}"${active}>
            <span>${label}</span>
          </a>
        `;
      }).join("")}
    </nav>
    <div class="topbar-theme" data-theme-switch-host="topbar"></div>
  `;

  const shell = document.querySelector(".app-shell");
  document.body.insertBefore(topbar, shell);
}

function renderMatrix() {
  const body = document.getElementById("matrixBody");
  if (!body) return;

  body.innerHTML = matrixRows.map(row => `
    <tr>
      <td><strong>${row.scenario}</strong><div class="table-note">${row.detail}</div></td>
      <td><span class="tag brand">${row.model}</span></td>
      <td>${row.mode}</td>
      <td>${row.use}</td>
      <td>${row.avoid}</td>
    </tr>
  `).join("");
}

const modelOwnerMatchers = [
  ["Microsoft", /\b(Microsoft|MAI|Phi|Raptor)\b/i],
  ["OpenAI", /\b(OpenAI|GPT)\b/i],
  ["Anthropic", /\b(Anthropic|Claude)\b/i],
  ["Google", /\b(Google|Gemini|Gemma|CodeGemma)\b/i],
  ["DeepSeek", /\bDeepSeek\b/i],
  ["Qwen", /\bQwen\b/i],
  ["Kimi", /\b(Kimi|Moonshot)\b/i],
  ["Mistral", /\b(Mistral|Devstral|Codestral|Leanstral)\b/i],
  ["Meta", /\b(Meta|Llama)\b/i],
  ["xAI", /\b(xAI|Grok)\b/i],
  ["Z.ai", /\b(Z\.ai|Zhipu|GLM)\b/i],
  ["MiniMax", /\bMiniMax\b/i],
  ["AWS", /\b(AWS|Amazon|Nova|Bedrock)\b/i],
  ["IBM", /\b(IBM|Granite)\b/i],
  ["BigCode", /\b(BigCode|StarCoder)\b/i]
];

function normalizeSearchText(value = "") {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function modelOwner(model) {
  const content = [model.name, model.role, ...model.best, ...model.tags].join(" ");
  const match = modelOwnerMatchers.find(([, pattern]) => pattern.test(content));
  return match ? match[0] : "Outra";
}

function modelOwnerOptions() {
  const owners = [...new Set(modelProfiles.map(modelOwner))];
  const knownOrder = modelOwnerMatchers.map(([owner]) => owner);
  return owners.sort((a, b) => {
    const ai = knownOrder.indexOf(a);
    const bi = knownOrder.indexOf(b);
    if (ai === -1 && bi === -1) return a.localeCompare(b, "pt-BR");
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });
}

function setupModelFilters() {
  const grid = document.getElementById("modelGrid");
  if (!grid) return;

  const ownerFilter = document.getElementById("modelOwnerFilter");
  const searchInput = document.getElementById("modelSearch");

  if (ownerFilter && !ownerFilter.dataset.ready) {
    ownerFilter.innerHTML = `
      <option value="">Todas as empresas</option>
      ${modelOwnerOptions().map(owner => `<option value="${owner}">${owner}</option>`).join("")}
    `;
    ownerFilter.dataset.ready = "true";
  }

  searchInput?.addEventListener("input", renderModels);
  ownerFilter?.addEventListener("change", renderModels);
  renderModels();
}

function renderModels() {
  const grid = document.getElementById("modelGrid");
  if (!grid) return;

  const searchInput = document.getElementById("modelSearch");
  const ownerFilter = document.getElementById("modelOwnerFilter");
  const resultCount = document.getElementById("modelResultCount");
  const empty = document.getElementById("modelEmpty");
  const query = normalizeSearchText(searchInput?.value || "");
  const selectedOwner = ownerFilter?.value || "";
  const filteredModels = modelProfiles.filter(model => {
    const matchesName = !query || normalizeSearchText(model.name).includes(query);
    const matchesOwner = !selectedOwner || modelOwner(model) === selectedOwner;
    return matchesName && matchesOwner;
  });

  if (resultCount) resultCount.textContent = `${filteredModels.length} de ${modelProfiles.length} modelos`;
  if (empty) empty.hidden = filteredModels.length > 0;

  grid.innerHTML = filteredModels.map(model => `
    <article class="model-card">
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
  const list = document.getElementById("benchmarkList");
  if (!list) return;

  list.innerHTML = benchmarkRows.map(row => `
    <article class="benchmark-card">
      <div class="tag-row">
        <span class="tag brand">${row.benchmark} ${row.version}</span>
        <span class="tag ${sourceStatusClass(row.sourceStatus)}">${sourceStatusLabel(row.sourceStatus)}</span>
      </div>
      <h3>${row.tool}</h3>
      <p>${row.model}</p>
      <div class="benchmark-score">
        <strong>${row.score}</strong>
        ${row.uncertainty ? `<span>${row.uncertainty}</span>` : ""}
      </div>
      <dl class="benchmark-meta">
        <div><dt>Scaffold</dt><dd>${row.scaffold}</dd></div>
        <div><dt>Effort</dt><dd>${row.effort}</dd></div>
        <div><dt>Verificação</dt><dd>${row.sourceDate}</dd></div>
      </dl>
      <p class="meta">${row.note}</p>
      <a class="source-link" href="${row.sourceUrl}" target="_blank" rel="noopener noreferrer">Abrir fonte</a>
    </article>
  `).join("");

  const notes = document.getElementById("benchmarkNotes");
  if (!notes) return;

  notes.innerHTML = benchmarkNotes.map(note => `
    <a class="source-card" href="${note.url}" ${note.url.startsWith("http") ? 'target="_blank" rel="noopener noreferrer"' : ""}>
      <span class="tag ${sourceStatusClass(note.status)}" style="justify-self:start">${sourceStatusLabel(note.status)}</span>
      <strong>${note.title}</strong>
      <span class="desc">${note.desc}</span>
    </a>
  `).join("");
}

function benchDataViewCopy(view) {
  const copy = {
    modelos: {
      title: "Modelos",
      desc: "Famílias, status, melhor encaixe e cautelas por tipo de tarefa.",
      status: "Visualizando perfis de modelos e famílias."
    },
    harness: {
      title: "Harness",
      desc: "Superfícies operacionais: IDE, CLI, agente cloud, SDLC e app builder.",
      status: "Visualizando ferramentas e superfícies de execução."
    },
    benchmarks: {
      title: "Benchmarks",
      desc: "Evidência pública, scaffold, effort, data de verificação e leitura crítica.",
      status: "Visualizando benchmarks e notas de evidência."
    }
  };
  return copy[view] || copy.modelos;
}

function setupBenchDataSwitcher() {
  const root = document.querySelector("[data-bench-data]");
  if (!root) return;

  const buttons = [...document.querySelectorAll("[data-bench-view]")];
  const panels = [...document.querySelectorAll("[data-bench-panel]")];
  const modeTitle = document.getElementById("benchDataModeTitle");
  const modeDesc = document.getElementById("benchDataModeDesc");
  const modeStatus = document.getElementById("benchDataModeStatus");
  const validViews = new Set(panels.map(panel => panel.dataset.benchPanel));

  function activate(view, updateHash = true) {
    const nextView = validViews.has(view) ? view : "modelos";
    const copy = benchDataViewCopy(nextView);

    buttons.forEach(button => {
      const active = button.dataset.benchView === nextView;
      button.setAttribute("aria-selected", String(active));
      button.setAttribute("tabindex", active ? "0" : "-1");
    });

    panels.forEach(panel => {
      panel.hidden = panel.dataset.benchPanel !== nextView;
    });

    if (modeTitle) modeTitle.textContent = copy.title;
    if (modeDesc) modeDesc.textContent = copy.desc;
    if (modeStatus) modeStatus.textContent = copy.status;

    if (updateHash) {
      history.replaceState(null, "", `${window.location.pathname}#${nextView}`);
    }
  }

  buttons.forEach(button => {
    button.addEventListener("click", () => activate(button.dataset.benchView));
    button.addEventListener("keydown", event => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const currentIndex = buttons.indexOf(button);
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const nextIndex = (currentIndex + direction + buttons.length) % buttons.length;
      buttons[nextIndex].focus();
      activate(buttons[nextIndex].dataset.benchView);
    });
  });

  const initialView = window.location.hash ? window.location.hash.slice(1) : root.dataset.initialView || "modelos";
  activate(initialView, false);

  window.addEventListener("hashchange", () => {
    const view = window.location.hash ? window.location.hash.slice(1) : "modelos";
    activate(view, false);
  });
}

function harnessCategories() {
  return [...new Set(harnessRows.map(row => row.category))];
}

function setupHarnessFilters() {
  const grid = document.getElementById("harnessGrid");
  if (!grid) return;

  const categoryFilter = document.getElementById("harnessCategoryFilter");
  const searchInput = document.getElementById("harnessSearch");

  if (categoryFilter && !categoryFilter.dataset.ready) {
    categoryFilter.innerHTML = `
      <option value="">Todos os grupos</option>
      ${harnessCategories().map(category => `<option value="${category}">${category}</option>`).join("")}
    `;
    categoryFilter.dataset.ready = "true";
  }

  searchInput?.addEventListener("input", renderHarness);
  categoryFilter?.addEventListener("change", renderHarness);
  renderHarness();
}

function renderHarness() {
  const grid = document.getElementById("harnessGrid");
  if (!grid) return;

  const searchInput = document.getElementById("harnessSearch");
  const categoryFilter = document.getElementById("harnessCategoryFilter");
  const resultCount = document.getElementById("harnessResultCount");
  const empty = document.getElementById("harnessEmpty");
  const query = normalizeSearchText(searchInput?.value || "");
  const selectedCategory = categoryFilter?.value || "";

  const filteredHarnesses = harnessRows.filter(row => {
    const haystack = normalizeSearchText(`${row.category} ${row.title} ${row.tags.join(" ")} ${row.desc} ${row.use} ${row.caution}`);
    const matchesQuery = !query || haystack.includes(query);
    const matchesCategory = !selectedCategory || row.category === selectedCategory;
    return matchesQuery && matchesCategory;
  });

  if (resultCount) resultCount.textContent = `${filteredHarnesses.length} de ${harnessRows.length} opções`;
  if (empty) empty.hidden = filteredHarnesses.length > 0;

  grid.innerHTML = filteredHarnesses.map(row => `
    <article class="model-card">
      <div class="tag-row">
        <span class="tag ${tagClass(row.category)}">${row.category}</span>
        ${row.tags.map(tag => `<span class="tag ${tagClass(tag)}">${tag}</span>`).join("")}
      </div>
      <h3>${row.title}</h3>
      <p>${row.desc}</p>
      <p class="meta"><strong>Use quando:</strong> ${row.use}</p>
      <p class="meta"><strong>Atenção:</strong> ${row.caution}</p>
    </article>
  `).join("");
}

function renderSources() {
  const grid = document.getElementById("sourceGrid");
  if (!grid) return;

  grid.innerHTML = sources.map(source => `
    <a class="source-card" href="${source.url}" target="_blank" rel="noopener noreferrer">
      <span class="tag-row">
        <span class="tag ${sourceClass(source.type)}">${source.type}</span>
        <span class="tag ${sourceStatusClass(source.status)}">${sourceStatusLabel(source.status)}</span>
      </span>
      <strong>${source.title}</strong>
      <span class="desc">${source.desc}</span>
      ${source.verifiedAt ? `<span class="source-meta">Verificado em ${source.verifiedAt}</span>` : ""}
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
      effort: "normal/alto",
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
      effort: rec.effort ? `${rec.effort} + planejamento` : "planejamento",
      tags: [...new Set([...rec.tags, "checkpoints", "escopo"])],
      caution: `${rec.caution} Como o escopo é grande/desconhecido, peça lista de arquivos e checkpoints antes de aceitar edição em lote.`
    };
  }

  if (sensitivity === "confidential" || sensitivity === "regulated") {
    rec = {
      model: sensitivity === "regulated" ? "Tabnine / self-hosting aprovado" : "Ferramenta aprovada com contexto mínimo",
      mode: task === "terminal" ? "Sem logs crus, com redaction" : "Plano curto + diffs pequenos",
      effort: "governança primeiro",
      tags: ["privacidade", "governança", "contexto mínimo"],
      why: "A sensibilidade dos dados tem prioridade sobre benchmark. A rota evita modelos em watchlist e reduz o contexto compartilhado.",
      prompt: "Use exemplos sintéticos ou trechos redigidos. Liste suposições, plano, arquivos afetados e validação. Não solicite nem exponha segredos.",
      caution: "Confirme Privacy Mode/ZDR, política do provedor e aprovação interna antes de enviar código de cliente, PII, credenciais ou segredo comercial."
    };
  }

  document.getElementById("recModel").textContent = rec.model;
  document.getElementById("recMode").textContent = `${rec.mode} · effort: ${rec.effort || "normal"}`;
  document.getElementById("recTags").innerHTML = rec.tags.map(t => `<span class="tag ${tagClass(t)}">${t}</span>`).join("");
  document.getElementById("recWhy").textContent = rec.why;
  document.getElementById("recPrompt").textContent = rec.prompt;
  document.getElementById("recCaution").textContent = rec.caution;
}

function setupSidebarCollapse() {
  const collapseButton = document.getElementById("sidebarCollapse");
  const revealButton = document.getElementById("sidebarReveal");
  const sidebar = document.getElementById("sidebar");
  if (!collapseButton || !revealButton || !sidebar) return;

  const storageKey = "benchai-sidebar-v1-collapsed";
  const desktopQuery = window.matchMedia("(min-width: 721px)");

  const readStored = () => {
    try {
      return localStorage.getItem(storageKey) === "true";
    } catch {
      return false;
    }
  };

  const writeStored = value => {
    try {
      localStorage.setItem(storageKey, String(value));
    } catch {
      // Ignore storage failures; the control still works for the current page.
    }
  };

  const render = () => {
    const collapsed = desktopQuery.matches && readStored();
    document.body.classList.toggle("sidebar-collapsed", collapsed);
    sidebar.setAttribute("aria-hidden", String(collapsed));
    if ("inert" in sidebar) sidebar.inert = collapsed;
    collapseButton.setAttribute("aria-expanded", String(!collapsed));
    collapseButton.setAttribute("aria-hidden", String(collapsed));
    collapseButton.tabIndex = collapsed ? -1 : 0;
    collapseButton.title = collapsed ? "Mostrar sidebar" : "Ocultar sidebar";
    collapseButton.setAttribute("aria-label", collapsed ? "Mostrar sidebar" : "Ocultar sidebar");
    revealButton.setAttribute("aria-expanded", String(!collapsed));
    revealButton.setAttribute("aria-hidden", String(!collapsed));
    revealButton.title = collapsed ? "Mostrar sidebar" : "Ocultar sidebar";
    revealButton.setAttribute("aria-label", collapsed ? "Mostrar sidebar" : "Ocultar sidebar");
    revealButton.tabIndex = collapsed ? 0 : -1;
  };

  collapseButton.addEventListener("click", () => {
    writeStored(true);
    render();
  });

  revealButton.addEventListener("click", () => {
    writeStored(false);
    render();
  });

  if (desktopQuery.addEventListener) {
    desktopQuery.addEventListener("change", render);
  } else {
    desktopQuery.addListener(render);
  }

  render();
}

function setupThemeSwitch() {
  const storageKey = "benchai-theme";
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const systemQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const switchButtons = [];

  const readStored = () => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored === "dark" || stored === "light" ? stored : null;
    } catch {
      return null;
    }
  };

  const writeStored = theme => {
    try {
      localStorage.setItem(storageKey, theme);
    } catch {
      // Ignore storage failures; the selected theme still applies to the current page.
    }
  };

  const applyTheme = (theme, persist = false) => {
    document.body.dataset.theme = theme;
    switchButtons.forEach(switchButton => {
      switchButton.setAttribute("aria-checked", String(theme === "dark"));
      switchButton.setAttribute("aria-label", theme === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro");
      switchButton.title = theme === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro";
    });
    if (themeMeta) themeMeta.setAttribute("content", theme === "dark" ? "#111113" : "#f5f5f7");
    if (persist) writeStored(theme);
  };

  const prepareSwitchButton = switchButton => {
    switchButton.className = "theme-switch";
    switchButton.type = "button";
    switchButton.setAttribute("role", "switch");
    switchButton.setAttribute("data-theme-switch", "");
    if (!switchButton.querySelector(".theme-switch-track")) {
      switchButton.innerHTML = `
        <span class="theme-switch-track" aria-hidden="true">
          <span class="theme-switch-thumb"></span>
        </span>
      `;
    }
    switchButton.addEventListener("click", () => {
      const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
      applyTheme(nextTheme, true);
    });
    switchButtons.push(switchButton);
    return switchButton;
  };

  const createSwitchButton = () => prepareSwitchButton(document.createElement("button"));
  document.querySelectorAll("[data-theme-switch]").forEach(prepareSwitchButton);

  const initialTheme = readStored() || (systemQuery.matches ? "dark" : "light");
  const sidebarHost = document.querySelector('[data-theme-switch-host="sidebar"]')
    || document.getElementById("sidebar")
    || document.querySelector(".sidebar");
  const topbarHost = document.querySelector('[data-theme-switch-host="topbar"]');

  if (sidebarHost && !sidebarHost.querySelector("[data-theme-switch]")) sidebarHost.appendChild(createSwitchButton());
  if (topbarHost) topbarHost.appendChild(createSwitchButton());
  if (!switchButtons.length) document.body.appendChild(createSwitchButton());
  applyTheme(initialTheme);

  const syncSystemTheme = event => {
    if (!readStored()) applyTheme(event.matches ? "dark" : "light");
  };

  if (systemQuery.addEventListener) {
    systemQuery.addEventListener("change", syncSystemTheme);
  } else {
    systemQuery.addListener(syncSystemTheme);
  }
}

function setupEvents() {
  ["taskSelect", "complexitySelect", "sensitivitySelect", "scopeSelect"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("change", recommend);
  });
}

renderNav();
renderTopbar();
syncNavCurrent();
window.addEventListener("hashchange", syncNavCurrent);
if (window.BenchAIShell) {
  window.BenchAIShell.initSidebarCollapse();
  window.BenchAIShell.initThemeSwitches();
} else {
  setupSidebarCollapse();
  setupThemeSwitch();
}
setupBenchDataSwitcher();
renderMatrix();
setupModelFilters();
setupHarnessFilters();
renderBenchmarks();
renderSources();
recommend();
setupEvents();
