const navItems = [
  { id: "home", label: "Início", href: "./", index: "1" },
  { id: "modelos", label: "Modelos", href: "modelos.html", index: "2" },
  { id: "ides", label: "Harness", href: "ides.html", index: "3" },
  { id: "benchmarks", label: "Benchmarks", href: "benchmarks.html", index: "4" },
  { id: "recomendador", label: "Recomendador", href: "recomendador.html", index: "5" },
  { id: "fontes", label: "Fontes", href: "fontes.html", index: "6" }
];

const matrixRows = [
  {
    scenario: "Adoção GitHub-first",
    detail: "Autocomplete, chat no IDE, PR review, issues e agentes dentro do GitHub.",
    model: "GitHub Copilot",
    mode: "IDE + GitHub + agent mode com limites",
    use: "O time já trabalha em GitHub e precisa de adoção ampla com baixa fricção.",
    avoid: "Código sensível sem política de dados, orçamento de agentes ou revisão humana."
  },
  {
    scenario: "Terminal / build / CI / debug",
    detail: "Loop comando, log, patch, teste e repetição com evidência no terminal.",
    model: "Codex CLI + GPT-5.5",
    mode: "Agente em terminal + effort alto quando o risco subir",
    use: "A tarefa depende de shell, testes, build, logs ou reprodução de falha.",
    avoid: "Ambiente sem sandbox, sem limite de comandos ou com logs contendo segredos."
  },
  {
    scenario: "Arquitetura / tarefa longa",
    detail: "Refatoração, investigação, revisão sofisticada e decisão cara.",
    model: "Claude Code / Claude Opus ou Sonnet",
    mode: "Plano primeiro, execução por etapas",
    use: "O custo de errar é alto e a tarefa exige leitura ampla e julgamento.",
    avoid: "Patch mecânico simples, onde custo e latência pesam mais que profundidade."
  },
  {
    scenario: "AI IDE como fluxo diário",
    detail: "Edição diária, navegação de codebase, tarefas multi-arquivo e automações.",
    model: "Cursor / Copilot",
    mode: "IDE + checkpoints + validação local",
    use: "O time quer velocidade no editor com contexto do repositório.",
    avoid: "Alterações em lote sem diff pequeno, teste local e revisão."
  },
  {
    scenario: "Google Cloud / contexto longo",
    detail: "Code Assist, Gemini CLI, agentes, repos grandes e contexto de 1M tokens.",
    model: "Gemini Code Assist / Gemini CLI",
    mode: "IDE + terminal + HiTL",
    use: "A pilha já está em Google Cloud ou o gargalo é contexto amplo.",
    avoid: "Escolher por janela de contexto sem medir latência e qualidade no repo."
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
    scenario: "Privacidade enterprise",
    detail: "Ambientes regulados, políticas rígidas, VPC/on-prem e controle de dados.",
    model: "Tabnine / ferramenta aprovada",
    mode: "Enterprise controls antes de benchmark",
    use: "A regra de dados impede SaaS genérico ou exige implantação isolada.",
    avoid: "Escolher só por benchmark quando compliance é o critério dominante."
  },
  {
    scenario: "Soberania / self-hosting",
    detail: "VPC, on-prem, air gap, custo unitário baixo ou controle local.",
    model: "Qwen / DeepSeek",
    mode: "Open-weight, API compatível ou serving próprio",
    use: "Privacidade, custo e controle de implantação pesam mais que conveniência SaaS.",
    avoid: "Usar sem observabilidade, benchmark interno e engenharia de serving."
  }
];

const modelProfiles = [
  {
    name: "GPT-5.5",
    status: "Frontier coding",
    statusClass: "good",
    role: "Modelo forte para agentes em terminal, debugging e automação com ferramenta.",
    best: ["Codex CLI", "Terminal-Bench", "SWE-Bench Pro", "reasoning effort"],
    caution: "Números de SWE-Bench Pro vêm de tabela do fornecedor; valide no repositório antes de padronizar.",
    tags: ["frontier", "terminal", "effort"]
  },
  {
    name: "GPT-5.4",
    status: "Baseline recente",
    statusClass: "blue",
    role: "Ponto de comparação útil para medir ganho incremental de modelos GPT mais novos.",
    best: ["comparação", "automação", "API", "tarefas com ferramenta"],
    caution: "Não use como ranking isolado: scaffold, effort e agente mudam o resultado.",
    tags: ["baseline", "fornecedor", "comparação"]
  },
  {
    name: "Claude Opus 4.8",
    status: "Refactor e review",
    statusClass: "good",
    role: "Rota forte para tarefas longas, revisão crítica e execução com Claude Code.",
    best: ["arquitetura", "review", "Terminal-Bench", "Claude Code"],
    caution: "Prefira quando profundidade compensa custo/latência; para microtarefas, é excesso.",
    tags: ["julgamento", "review", "agentes"]
  },
  {
    name: "Claude 5 Fable",
    status: "Sinal novo",
    statusClass: "blue",
    role: "Entrada recente no Terminal-Bench 2.1, com desempenho próximo do topo em Claude Code.",
    best: ["Terminal-Bench 2.1", "Claude Code", "execução longa", "comparação"],
    caution: "Adição verificada fora do relatório; confirme disponibilidade e política antes de recomendar como default.",
    tags: ["novo", "verificado", "pendente"]
  },
  {
    name: "Claude Sonnet 4.6",
    status: "Equilíbrio",
    statusClass: "good",
    role: "Boa rota para execução recorrente quando custo, latência e qualidade precisam equilibrar.",
    best: ["implementação", "review", "Claude Code", "tarefas médias"],
    caution: "Não substitui benchmark interno em fluxos críticos ou repositórios sensíveis.",
    tags: ["equilíbrio", "coding", "review"]
  },
  {
    name: "Gemini 3.1 Pro / Gemini 3",
    status: "Google + contexto",
    statusClass: "good",
    role: "Família relevante quando contexto longo, Google Cloud e agentes no terminal importam.",
    best: ["1M tokens", "Gemini CLI", "Code Assist", "Google Cloud"],
    caution: "Contexto longo não corrige instrução ruim; teste latência, grounding e revisão humana.",
    tags: ["contexto", "Google", "terminal"]
  },
  {
    name: "Qwen / Qwen3-Coder",
    status: "Open-weight",
    statusClass: "warn",
    role: "Candidato para self-hosting, soberania e workloads onde controle local pesa.",
    best: ["VPC/on-prem", "serving próprio", "custo", "agentic coding"],
    caution: "Exige avaliação interna, serving, telemetria e política de atualização.",
    tags: ["open-weight", "self-hosting", "soberania"]
  },
  {
    name: "DeepSeek-V3",
    status: "Open-weight / baixo custo",
    statusClass: "warn",
    role: "Opção para custo unitário baixo, API compatível e execução controlada.",
    best: ["alto volume", "pesquisa interna", "prototipagem local", "serving aberto"],
    caution: "Não substitui revisão de segurança, benchmark interno e política de dados.",
    tags: ["baixo custo", "open-weight", "API"]
  }
];

const benchmarkRows = [
  {
    benchmark: "Terminal-Bench",
    version: "2.1",
    tool: "Codex CLI",
    model: "GPT-5.5",
    score: "83,4%",
    value: 83.4,
    uncertainty: "± 2,2",
    scaffold: "agente em terminal",
    effort: "não informado",
    sourceStatus: "verificado",
    sourceDate: "2026-06-18",
    sourceUrl: "https://www.tbench.ai/leaderboard/terminal-bench/2.1",
    note: "Melhor sinal atual para tarefas de terminal/debug dentro das fontes verificadas."
  },
  {
    benchmark: "Terminal-Bench",
    version: "2.1",
    tool: "Claude Code",
    model: "Claude 5 Fable",
    score: "83,1%",
    value: 83.1,
    uncertainty: "± 2,0",
    scaffold: "agente em terminal",
    effort: "não informado",
    sourceStatus: "verificado",
    sourceDate: "2026-06-18",
    sourceUrl: "https://www.tbench.ai/leaderboard/terminal-bench/2.1",
    note: "Adição curada fora do relatório; usar como sinal novo, não como default sem checar disponibilidade."
  },
  {
    benchmark: "Terminal-Bench",
    version: "2.1",
    tool: "Claude Code",
    model: "Claude Opus 4.8",
    score: "78,9%",
    value: 78.9,
    uncertainty: "± 2,5",
    scaffold: "agente em terminal",
    effort: "não informado",
    sourceStatus: "verificado",
    sourceDate: "2026-06-18",
    sourceUrl: "https://www.tbench.ai/leaderboard/terminal-bench/2.1",
    note: "Forte para execução com julgamento e tarefas longas em terminal."
  },
  {
    benchmark: "Terminal-Bench",
    version: "2.1",
    tool: "Gemini CLI",
    model: "Gemini 3.1 Pro",
    score: "70,7%",
    value: 70.7,
    uncertainty: "± 2,9",
    scaffold: "agente em terminal",
    effort: "não informado",
    sourceStatus: "verificado",
    sourceDate: "2026-06-18",
    sourceUrl: "https://www.tbench.ai/leaderboard/terminal-bench/2.1",
    note: "Sinal relevante quando Google Cloud, Gemini CLI ou contexto amplo fazem parte do fluxo."
  },
  {
    benchmark: "Terminal-Bench",
    version: "2.0",
    tool: "Codex",
    model: "GPT-5.5",
    score: "82,7%",
    value: 82.7,
    uncertainty: "",
    scaffold: "divulgado pela OpenAI",
    effort: "não informado",
    sourceStatus: "fornecedor",
    sourceDate: "2026-06-18",
    sourceUrl: "https://openai.com/index/introducing-gpt-5-5/",
    note: "Bom para leitura de tendência, mas não substitui o leaderboard público por versão."
  },
  {
    benchmark: "SWE-Bench Pro",
    version: "publicação OpenAI",
    tool: "Codex",
    model: "GPT-5.5",
    score: "58,6%",
    value: 58.6,
    uncertainty: "",
    scaffold: "comparativo do fornecedor",
    effort: "não informado",
    sourceStatus: "fornecedor",
    sourceDate: "2026-06-18",
    sourceUrl: "https://openai.com/index/introducing-gpt-5-5/",
    note: "Usar como evidência de fornecedor; comparar com cuidado contra dados independentes."
  },
  {
    benchmark: "Aider Polyglot",
    version: "leaderboard",
    tool: "Aider",
    model: "GPT-5",
    score: "88,0%",
    value: 88.0,
    uncertainty: "",
    scaffold: "diff editing",
    effort: "high",
    sourceStatus: "verificado",
    sourceDate: "2026-06-18",
    sourceUrl: "https://aider.chat/docs/leaderboards/",
    note: "Mostra que effort muda resultado; high supera medium e low no mesmo benchmark."
  },
  {
    benchmark: "Aider Polyglot",
    version: "leaderboard",
    tool: "Aider",
    model: "GPT-5",
    score: "86,7%",
    value: 86.7,
    uncertainty: "",
    scaffold: "diff editing",
    effort: "medium",
    sourceStatus: "verificado",
    sourceDate: "2026-06-18",
    sourceUrl: "https://aider.chat/docs/leaderboards/",
    note: "Alternativa quando custo/latência precisam equilibrar desempenho."
  }
];

const benchmarkNotes = [
  {
    title: "SWE-Bench Verified virou histórico",
    status: "histórico",
    desc: "Não usar como ranking principal de frontier coding; priorizar SWE-Bench Pro, Terminal-Bench e validação local.",
    url: "https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/"
  },
  {
    title: "Compare scaffold, não só modelo",
    status: "crítico",
    desc: "Terminal-Bench mede agente + modelo. Aider mede diff editing. O número muda quando a ferramenta muda.",
    url: "https://www.tbench.ai/leaderboard/terminal-bench/2.1"
  },
  {
    title: "Validação local decide",
    status: "prático",
    desc: "Benchmarks orientam a rota inicial; teste do repositório, logs e revisão humana confirmam a escolha.",
    url: "recomendador.html"
  }
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
    type: "Adoção",
    title: "Stack Overflow Developer Survey 2025 - AI",
    desc: "84% usam ou planejam usar AI tools; 50,6% dos profissionais usam diariamente; confiança ainda é baixa.",
    url: "https://survey.stackoverflow.co/2025/ai/",
    status: "verificado",
    verifiedAt: "2026-06-18"
  },
  {
    type: "Adoção",
    title: "JetBrains AI Pulse 2026",
    desc: "Sinal de mercado: 90% usam IA no trabalho e 74% adotaram ferramentas especializadas de desenvolvimento.",
    url: "https://blog.jetbrains.com/research/2026/04/which-ai-coding-tools-do-developers-actually-use-at-work/",
    status: "verificado",
    verifiedAt: "2026-06-18"
  },
  {
    type: "Benchmark",
    title: "Terminal-Bench 2.1",
    desc: "Leaderboard público para agentes em terminal; separa ferramenta, modelo, versão e intervalo de confiança.",
    url: "https://www.tbench.ai/leaderboard/terminal-bench/2.1",
    status: "verificado",
    verifiedAt: "2026-06-18"
  },
  {
    type: "Benchmark",
    title: "Artificial Analysis Intelligence Index v4.1",
    desc: "Índice independente com foco maior em workloads agentic e novas métricas de custo, tempo e tokens por tarefa.",
    url: "https://artificialanalysis.ai/articles/artificial-analysis-intelligence-index-v4-1",
    status: "verificado",
    verifiedAt: "2026-06-18"
  },
  {
    type: "Benchmark",
    title: "Artificial Analysis Coding Agent Index",
    desc: "Compara agentes de coding por DeepSWE, Terminal-Bench v2 e SWE-Atlas-QnA, incluindo custo e tempo por tarefa.",
    url: "https://artificialanalysis.ai/agents/coding-agents",
    status: "verificado",
    verifiedAt: "2026-06-18"
  },
  {
    type: "Open-weight",
    title: "Artificial Analysis - GLM-5.2",
    desc: "Sinal recente para rotas open-weight: GLM-5.2 lidera o índice aberto, mas exige leitura de custo e uso de tokens.",
    url: "https://artificialanalysis.ai/articles/glm-5-2-is-the-new-leading-open-weights-model-on-the-artificial-analysis-intelligence-index",
    status: "verificado",
    verifiedAt: "2026-06-18"
  },
  {
    type: "Benchmark",
    title: "Aider LLM Leaderboards",
    desc: "Benchmark polyglot de edição por diff; útil para comparar impacto de reasoning effort.",
    url: "https://aider.chat/docs/leaderboards/",
    status: "verificado",
    verifiedAt: "2026-06-18"
  },
  {
    type: "Benchmark",
    title: "OpenAI - Introducing GPT-5.5",
    desc: "Publicação com números de Terminal-Bench 2.0, SWE-Bench Pro e comparativos de fornecedor.",
    url: "https://openai.com/index/introducing-gpt-5-5/",
    status: "fornecedor",
    verifiedAt: "2026-06-18"
  },
  {
    type: "Benchmark",
    title: "OpenAI - SWE-Bench Verified no longer measures frontier coding",
    desc: "Justificativa para tratar SWE-Bench Verified como histórico e priorizar SWE-Bench Pro.",
    url: "https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/",
    status: "verificado",
    verifiedAt: "2026-06-18"
  },
  {
    type: "Plataforma",
    title: "GitHub Copilot",
    desc: "Copilot em IDE, GitHub, CLI, modelos selecionáveis, agentes e controles corporativos.",
    url: "https://github.com/features/copilot",
    status: "verificado",
    verifiedAt: "2026-06-18"
  },
  {
    type: "Plataforma",
    title: "Cursor",
    desc: "AI IDE com agente, Composer, CLI, automations, GitHub, SDK e fluxos de revisão.",
    url: "https://cursor.com/",
    status: "verificado",
    verifiedAt: "2026-06-18"
  },
  {
    type: "Modelo",
    title: "Anthropic - Claude Opus 4.8",
    desc: "Referência oficial para Claude Opus 4.8, Claude Code e leitura de benchmark do fornecedor.",
    url: "https://www.anthropic.com/news/claude-opus-4-8",
    status: "fornecedor",
    verifiedAt: "2026-06-18"
  },
  {
    type: "Modelo",
    title: "Anthropic - Claude Sonnet 4.6",
    desc: "Referência oficial para Sonnet 4.6 como modelo de equilíbrio em coding e agentes.",
    url: "https://www.anthropic.com/news/claude-sonnet-4-6",
    status: "fornecedor",
    verifiedAt: "2026-06-18"
  },
  {
    type: "Plataforma",
    title: "Gemini Code Assist",
    desc: "Code Assist Standard/Enterprise com Gemini 3, Gemini CLI, agent mode e contexto de 1M tokens.",
    url: "https://codeassist.google/products/business",
    status: "verificado",
    verifiedAt: "2026-06-18"
  },
  {
    type: "Plataforma",
    title: "Amazon Q Developer",
    desc: "Assistente da AWS para IDE, CLI, revisão, segurança e modernização de código.",
    url: "https://aws.amazon.com/q/developer/",
    status: "verificado",
    verifiedAt: "2026-06-18"
  },
  {
    type: "Open-weight",
    title: "Qwen Coder",
    desc: "Rota open-weight para avaliação interna, self-hosting e controle de implantação.",
    url: "https://qwenlm.github.io/",
    status: "pendente",
    verifiedAt: "2026-06-18"
  },
  {
    type: "Open-weight",
    title: "DeepSeek-V3 Technical Report",
    desc: "Modelo MoE open-weight; usar como rota de custo/controle após avaliação interna.",
    url: "https://arxiv.org/abs/2412.19437",
    status: "pendente",
    verifiedAt: "2026-06-18"
  },
  {
    type: "Privacidade",
    title: "Tabnine",
    desc: "Assistente enterprise com opções voltadas a privacidade, controle de dados, VPC, on-prem e air gap.",
    url: "https://www.tabnine.com/",
    status: "verificado",
    verifiedAt: "2026-06-18"
  },
  {
    type: "Segurança",
    title: "OWASP Top 10 for LLM Applications",
    desc: "Prompt injection, sensitive disclosure, supply chain, excessive agency e demais riscos.",
    url: "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
    status: "verificado",
    verifiedAt: "2026-06-18"
  }
];

const recommendations = {
  simple: {
    model: "GitHub Copilot / Cursor",
    mode: "Autocomplete, chat curto ou edição local",
    effort: "baixo",
    tags: ["microtarefa", "baixo risco", "latência"],
    why: "A tarefa é mecânica. O ganho vem de reduzir atrito, não de maximizar raciocínio.",
    prompt: "Faça apenas a alteração solicitada. Não refatore nada adjacente. Preserve o padrão atual e resuma o diff.",
    caution: "Se surgir ambiguidade ou impacto sistêmico, escale para Claude Code, Codex ou um plano antes de editar."
  },
  daily: {
    model: "Cursor / GitHub Copilot",
    mode: "IDE + validação local",
    effort: "normal",
    tags: ["default", "eficiência", "implementação"],
    why: "Implementação comum se beneficia de ferramenta integrada ao editor e ao fluxo de PR, sem precisar de modelo premium em todo patch.",
    prompt: "Implemente em passos pequenos. Liste arquivos afetados, preserve padrões existentes, rode/verifique testes relevantes e resuma o resultado.",
    caution: "Se a mudança afetar contrato, segurança ou muitos arquivos, peça plano antes de executar."
  },
  architecture: {
    model: "Claude Code / Claude Opus ou Sonnet",
    mode: "Plano + execução por etapas",
    effort: "alto",
    tags: ["arquitetura", "trade-offs", "decisão cara"],
    why: "A tarefa exige julgamento, leitura de contexto e cuidado com efeitos colaterais.",
    prompt: "Antes de editar, proponha 2-3 abordagens com trade-offs, riscos, arquivos afetados e plano incremental. Só implemente após o plano.",
    caution: "Depois do plano, use ferramenta mais rápida para trechos mecânicos se isso reduzir custo e ruído."
  },
  terminal: {
    model: "Codex CLI + GPT-5.5",
    mode: "Loop comando -> log -> patch -> teste",
    effort: "alto se houver falha crítica",
    tags: ["terminal", "debug", "CI"],
    why: "Terminal/debug exige loop de ferramenta. Terminal-Bench 2.1 favorece rotas com agente e modelo forte nesse cenário.",
    prompt: "Reproduza o erro, formule hipótese, aplique a menor correção viável, rode novamente e documente comandos, saída e resultado.",
    caution: "Se o ambiente tiver segredos, faça redaction antes de enviar logs. Se virar desenho de sistema, volte para plano."
  },
  review: {
    model: "GitHub Copilot + Claude Code",
    mode: "PR review + revisão profunda",
    effort: "normal/alto",
    tags: ["review cruzado", "edge cases", "design"],
    why: "Revisão crítica combina integração no GitHub com uma segunda leitura de intenção, segurança e manutenção.",
    prompt: "Revise o diff em duas passagens: primeiro bugs, edge cases e testes; depois arquitetura, legibilidade e efeitos colaterais.",
    caution: "Evite modelo muito autônomo para review simples: ele pode gerar ruído e comentários demais."
  },
  frontend: {
    model: "Cursor + Claude Code / Codex",
    mode: "Julgamento visual + execução local",
    effort: "normal",
    tags: ["UI", "screenshot", "design system"],
    why: "UI exige respeitar intenção visual, padrões existentes e verificação em viewport real.",
    prompt: "Compare esperado vs atual, preserve design system, faça mudanças mínimas e liste diferenças visuais resolvidas.",
    caution: "Para ajuste pequeno de CSS, uma ferramenta rápida no editor pode ser suficiente."
  },
  largeContext: {
    model: "Gemini Code Assist / Gemini CLI",
    mode: "Mapeamento antes de editar",
    effort: "normal/alto",
    tags: ["repo grande", "síntese", "contexto"],
    why: "Quando o gargalo é ler muito contexto, priorize janela ampla, grounding e síntese antes de editar.",
    prompt: "Mapeie módulos, contratos, pontos de entrada, dependências e riscos. Proponha plano incremental antes de alterar arquivos.",
    caution: "Depois que os pontos de alteração estiverem claros, execute em diffs pequenos com validação local."
  },
  migration: {
    model: "Amazon Q Developer / Claude Code / Codex",
    mode: "Plano + checkpoints + validação",
    effort: "alto",
    tags: ["migração", "feature grande", "checkpoints"],
    why: "Migração e modernização precisam de controle por etapas. Amazon Q é especialmente relevante em stacks AWS/Java.",
    prompt: "Analise a área, proponha plano com checkpoints, implemente por etapas, rode testes e pare para revisão antes de mudanças destrutivas.",
    caution: "Não aceite autonomia longa sem rollback, logs de comandos e revisão humana."
  }
};

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
    prático: "prático"
  };
  return labels[status] || status;
}

function renderNav() {
  const nav = document.getElementById("siteNav");
  if (!nav) return;

  const current = document.body.dataset.page || "home";
  nav.innerHTML = navItems.map(({ id, label, href }) => {
    const active = current === id ? ' aria-current="page"' : "";
    return `
      <a href="${href}"${active}>
        <span class="nav-text">${label}</span>
      </a>
    `;
  }).join("");
}

function renderTopbar() {
  if (document.querySelector(".site-topbar")) return;

  const current = document.body.dataset.page || "home";
  const topbar = document.createElement("header");
  topbar.className = "site-topbar";
  topbar.setAttribute("aria-label", "Navegação compacta");
  topbar.innerHTML = `
    <a class="topbar-brand" href="./">
      <span class="topbar-mark" aria-hidden="true">BAI</span>
      <span>BenchAI</span>
    </a>
    <nav class="topbar-nav" aria-label="Navegação principal compacta">
      ${navItems.map(({ id, label, href }) => {
        const active = current === id ? ' aria-current="page"' : "";
        return `
          <a href="${href}"${active}>
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

function renderModels() {
  const grid = document.getElementById("modelGrid");
  if (!grid) return;

  grid.innerHTML = modelProfiles.map(model => `
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

  const storageKey = "benchai-sidebar-collapsed";
  const desktopQuery = window.matchMedia("(min-width: 1121px)");

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
    revealButton.setAttribute("aria-expanded", String(!collapsed));
    revealButton.setAttribute("aria-hidden", String(!collapsed));
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

  const createSwitchButton = () => {
    const switchButton = document.createElement("button");
    switchButton.className = "theme-switch";
    switchButton.type = "button";
    switchButton.setAttribute("role", "switch");
    switchButton.innerHTML = `
      <span class="theme-switch-track" aria-hidden="true">
        <span class="theme-switch-thumb"></span>
      </span>
    `;
    switchButton.addEventListener("click", () => {
      const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
      applyTheme(nextTheme, true);
    });
    switchButtons.push(switchButton);
    return switchButton;
  };

  const initialTheme = readStored() || (systemQuery.matches ? "dark" : "light");
  const sidebarHost = document.getElementById("sidebar") || document.querySelector(".sidebar");
  const topbarHost = document.querySelector('[data-theme-switch-host="topbar"]');

  if (sidebarHost) sidebarHost.appendChild(createSwitchButton());
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
renderMatrix();
renderModels();
renderBenchmarks();
renderSources();
recommend();
setupEvents();
setupSidebarCollapse();
setupThemeSwitch();
