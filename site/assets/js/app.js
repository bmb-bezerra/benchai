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
    "name": "GPT-5.5",
    "status": "Frontier coding",
    "statusClass": "good",
    "role": "Modelo OpenAI mais forte para agentic coding; priorizar em tarefas difíceis com Codex, terminal, testes e refactors complexos.",
    "best": [
      "Codex CLI",
      "debug em terminal",
      "SWE-Bench Pro",
      "refactor multi-arquivo"
    ],
    "caution": "Disponibilidade e preço podem variar por plano/API. Números de benchmark do fornecedor devem ser tratados como sinal, não ranking universal.",
    "tags": [
      "frontier",
      "agentic",
      "terminal",
      "OpenAI"
    ]
  },
  {
    "name": "GPT-5.4",
    "status": "Frontier geral",
    "statusClass": "good",
    "role": "Modelo GPT recente para raciocínio, coding geral e automações em agentes; boa base quando GPT-5.5 não estiver disponível ou quando latência/custo pesarem.",
    "best": [
      "API",
      "Codex",
      "Copilot",
      "tarefas médias/altas"
    ],
    "caution": "Medir contra GPT-5.5 e GPT-5.3-Codex no repositório real; scaffold e effort mudam bastante o resultado.",
    "tags": [
      "frontier",
      "API",
      "Copilot",
      "OpenAI"
    ]
  },
  {
    "name": "GPT-5.3-Codex",
    "status": "Coding agent",
    "statusClass": "good",
    "role": "Especializado para fluxos de coding agent em Codex/Copilot; indicado para edição de código, PRs, correções e automações com ferramentas.",
    "best": [
      "Codex",
      "Copilot",
      "patches",
      "testes"
    ],
    "caution": "Comparar com GPT-5.5 para tarefas novas; evitar usar modelo antigo só por hábito se houver substituto no plano.",
    "tags": [
      "coding",
      "agentic",
      "Copilot",
      "OpenAI"
    ]
  },
  {
    "name": "GPT-5.2-Codex",
    "status": "Legado recente",
    "statusClass": "warn",
    "role": "Ainda relevante como referência histórica de agentic coding, mas deve ser substituído por GPT-5.3-Codex/GPT-5.5 quando disponível.",
    "best": [
      "comparação",
      "legado",
      "Codex",
      "migração"
    ],
    "caution": "No Copilot consta como aposentado/substituído; não recomendar como default novo.",
    "tags": [
      "legado",
      "Codex",
      "OpenAI"
    ]
  },
  {
    "name": "GPT-5 mini",
    "status": "Econômico",
    "statusClass": "blue",
    "role": "Modelo menor para tarefas rápidas, triagem, explicações simples e automações de alto volume no ecossistema GitHub/OpenAI.",
    "best": [
      "baixo custo",
      "chat rápido",
      "classificação",
      "boilerplate"
    ],
    "caution": "Evitar em refactors críticos, debugging complexo e arquitetura sem escalonamento para modelo mais forte.",
    "tags": [
      "rápido",
      "baixo custo",
      "Copilot",
      "OpenAI"
    ]
  },
  {
    "name": "GPT-5.4 mini",
    "status": "Econômico recente",
    "statusClass": "blue",
    "role": "Opção menor da família GPT-5.4 para volume alto, respostas rápidas e tarefas de baixa/ média complexidade.",
    "best": [
      "autocomplete assistido",
      "triagem",
      "resumo",
      "boilerplate"
    ],
    "caution": "Usar roteamento para subir a GPT-5.4/GPT-5.5 quando houver risco alto ou testes falhando.",
    "tags": [
      "rápido",
      "baixo custo",
      "Copilot",
      "OpenAI"
    ]
  },
  {
    "name": "GPT-5.4 nano",
    "status": "Utilitário",
    "statusClass": "blue",
    "role": "Modelo muito pequeno para utilidades, transformação simples de texto/código e workloads com custo mínimo.",
    "best": [
      "classificação",
      "lint textual",
      "templates",
      "tarefas mecânicas"
    ],
    "caution": "Não usar como agente de engenharia autônomo; aplicar apenas em etapas controladas.",
    "tags": [
      "utilitário",
      "baixo custo",
      "Copilot",
      "OpenAI"
    ]
  },
  {
    "name": "Claude Opus 4.8",
    "status": "Refactor e julgamento",
    "statusClass": "good",
    "role": "Modelo Anthropic Opus-tier forte para raciocínio complexo, agentic coding e tarefas longas com Claude Code.",
    "best": [
      "arquitetura",
      "review profundo",
      "refactor grande",
      "Claude Code"
    ],
    "caution": "Custo/latência podem ser excesso para microtarefas; definir effort explicitamente quando a superfície permitir.",
    "tags": [
      "frontier",
      "review",
      "agentic",
      "Anthropic"
    ]
  },
  {
    "name": "Claude Opus 4.7",
    "status": "Frontier anterior",
    "statusClass": "blue",
    "role": "Boa referência se o ambiente ainda não disponibilizou Opus 4.8; útil em revisão crítica e tarefas longas.",
    "best": [
      "comparação",
      "Claude Code",
      "arquitetura",
      "review"
    ],
    "caution": "Migrar/testar Opus 4.8 quando disponível; não manter como padrão sem motivo operacional.",
    "tags": [
      "frontier",
      "legado recente",
      "Anthropic"
    ]
  },
  {
    "name": "Claude Sonnet 4.6",
    "status": "Equilíbrio forte",
    "statusClass": "good",
    "role": "Um dos melhores daily drivers para engenharia: boa combinação de velocidade, inteligência, contexto e custo relativo.",
    "best": [
      "implementação",
      "review",
      "agentes",
      "tarefas médias"
    ],
    "caution": "Para decisões caras ou refactor muito grande, comparar com Opus 4.8; para microtarefas, comparar com Haiku 4.5.",
    "tags": [
      "equilíbrio",
      "coding",
      "Claude Code",
      "Anthropic"
    ]
  },
  {
    "name": "Claude Sonnet 4.5",
    "status": "Daily driver legado",
    "statusClass": "blue",
    "role": "Ainda aparece em muitos ambientes e é uma boa linha de base para medir avanço de Sonnet 4.6.",
    "best": [
      "baseline",
      "IDE",
      "review",
      "implementação"
    ],
    "caution": "Preferir Sonnet 4.6 se ambos estiverem disponíveis e o custo for aceitável.",
    "tags": [
      "baseline",
      "coding",
      "Anthropic"
    ]
  },
  {
    "name": "Claude Haiku 4.5",
    "status": "Rápido/barato",
    "statusClass": "blue",
    "role": "Modelo rápido para subagentes, pair programming leve, explicações, testes simples e alto volume.",
    "best": [
      "latência baixa",
      "subagentes",
      "tarefas simples",
      "custo"
    ],
    "caution": "Não usar sozinho em mudanças arriscadas; bom como primeiro passe com escalonamento para Sonnet/Opus.",
    "tags": [
      "rápido",
      "baixo custo",
      "Anthropic"
    ]
  },
  {
    "name": "Claude Fable 5",
    "status": "Restrito / watchlist",
    "statusClass": "warn",
    "role": "Modelo relevante em listas de plataformas, mas deve ficar em observação por disponibilidade, política e retenção de dados.",
    "best": [
      "watchlist",
      "comparação",
      "Claude Code",
      "benchmarks"
    ],
    "caution": "Não recomendar como default empresarial sem validar acesso, termos e política de dados no cliente/plano.",
    "tags": [
      "pendente",
      "política",
      "Anthropic"
    ]
  },
  {
    "name": "Gemini 3.5 Flash",
    "status": "Produção + contexto",
    "statusClass": "good",
    "role": "Modelo Google forte para agentic workflows, coding, long context e execução paralela com bom equilíbrio de custo/latência.",
    "best": [
      "1M contexto",
      "Google Cloud",
      "Gemini CLI",
      "agentes"
    ],
    "caution": "Mesmo com contexto longo, testar grounding, latência e qualidade de patch no repositório real.",
    "tags": [
      "contexto",
      "agentic",
      "Google",
      "produção"
    ]
  },
  {
    "name": "Gemini 3.1 Pro",
    "status": "Preview forte",
    "statusClass": "warn",
    "role": "Modelo Gemini Pro para raciocínio/coding complexo e workflows agentic quando a pilha Google é dominante.",
    "best": [
      "raciocínio",
      "1M contexto",
      "Gemini CLI",
      "Google Cloud"
    ],
    "caution": "Preview não deve ser tratado como estável; manter plano de migração para GA quando necessário.",
    "tags": [
      "preview",
      "contexto",
      "Google"
    ]
  },
  {
    "name": "Gemini 3 Flash",
    "status": "Preview",
    "statusClass": "warn",
    "role": "Opção Flash em preview para testes de multimodalidade, coding e agente antes de padronizar 3.5 Flash.",
    "best": [
      "experimentos",
      "latência",
      "Google Cloud",
      "agentes"
    ],
    "caution": "Para produção, preferir modelo GA/estável quando houver alternativa equivalente.",
    "tags": [
      "preview",
      "rápido",
      "Google"
    ]
  },
  {
    "name": "Gemini 3.1 Flash-Lite",
    "status": "Baixo custo",
    "statusClass": "blue",
    "role": "Modelo econômico para alto volume, classificação, resumos, roteamento e etapas auxiliares de dev workflow.",
    "best": [
      "alto volume",
      "baixo custo",
      "classificação",
      "latência"
    ],
    "caution": "Evitar em mudanças de código críticas sem escalonamento.",
    "tags": [
      "baixo custo",
      "Google",
      "utilitário"
    ]
  },
  {
    "name": "Gemini 2.5 Pro",
    "status": "Ainda relevante",
    "statusClass": "blue",
    "role": "Modelo Google anterior ainda usado em ambientes que não migraram para Gemini 3.x/3.5; bom baseline para tarefas complexas.",
    "best": [
      "baseline",
      "raciocínio",
      "coding",
      "Google Cloud"
    ],
    "caution": "Comparar com 3.5 Flash e 3.1 Pro antes de novas padronizações.",
    "tags": [
      "baseline",
      "Google",
      "coding"
    ]
  },
  {
    "name": "Gemini 2.5 Flash",
    "status": "Rápido legado",
    "statusClass": "blue",
    "role": "Opção rápida amplamente disponível; útil como baseline de custo/latência em pipelines existentes.",
    "best": [
      "latência",
      "alto volume",
      "baseline",
      "Google Cloud"
    ],
    "caution": "Não confundir disponibilidade com melhor qualidade; medir contra 3.5 Flash.",
    "tags": [
      "rápido",
      "Google",
      "baseline"
    ]
  },
  {
    "name": "DeepSeek V4-Pro",
    "status": "Open-weight forte",
    "statusClass": "good",
    "role": "Modelo DeepSeek V4 de maior capacidade, com foco em agentic coding, 1M de contexto e boa relação capacidade/custo para self-host/API.",
    "best": [
      "agentic coding",
      "1M contexto",
      "self-host",
      "baixo custo relativo"
    ],
    "caution": "Exige avaliação de licença, segurança, serving e política de dados; claims de performance são principalmente do fornecedor.",
    "tags": [
      "open-weight",
      "self-host",
      "DeepSeek",
      "contexto"
    ]
  },
  {
    "name": "DeepSeek V4-Flash",
    "status": "Rápido/econômico",
    "statusClass": "good",
    "role": "Variante mais rápida e barata do V4 para agentes simples, alto volume e tarefas controladas.",
    "best": [
      "baixo custo",
      "alto volume",
      "1M contexto",
      "agentes simples"
    ],
    "caution": "Escalonar para V4-Pro/frontier proprietário quando a tarefa envolver risco alto ou debugging complexo.",
    "tags": [
      "baixo custo",
      "open-weight",
      "DeepSeek"
    ]
  },
  {
    "name": "DeepSeek V3.2",
    "status": "Reasoning + ferramentas",
    "statusClass": "blue",
    "role": "Modelo reasoning-first com suporte a tool-use em modos thinking e non-thinking; útil para agentes e experimentos self-host.",
    "best": [
      "tool-use",
      "thinking",
      "agentes",
      "open-source"
    ],
    "caution": "Comparar com V4 antes de novas adoções; manter benchmark interno.",
    "tags": [
      "reasoning",
      "open-source",
      "DeepSeek"
    ]
  },
  {
    "name": "DeepSeek V3.2-Speciale",
    "status": "Raciocínio máximo",
    "statusClass": "warn",
    "role": "Variante voltada a raciocínio mais pesado, útil como referência de pesquisa e tarefas não interativas.",
    "best": [
      "raciocínio",
      "pesquisa",
      "comparação",
      "tarefas difíceis"
    ],
    "caution": "Pode não ter tool-use/API equivalente ao V3.2 normal; validar limitações antes de usar em agentes.",
    "tags": [
      "reasoning",
      "pesquisa",
      "DeepSeek"
    ]
  },
  {
    "name": "Qwen3-Coder-Next",
    "status": "Coding agent",
    "statusClass": "good",
    "role": "Modelo Qwen dedicado a coding agents e desenvolvimento local/API, com foco em execução de tarefas e interação com ambientes.",
    "best": [
      "Qwen Code",
      "local dev",
      "agentes",
      "baixo custo relativo"
    ],
    "caution": "Confirmar versão exata, contexto e licença no provedor usado; família Qwen muda rápido.",
    "tags": [
      "coding",
      "open-weight",
      "Qwen",
      "agentic"
    ]
  },
  {
    "name": "Qwen3-Coder-480B-A35B",
    "status": "Grande/open-weight",
    "statusClass": "good",
    "role": "Modelo grande da família Qwen3-Coder para tarefas de código mais exigentes, tool use e agentes em ambientes com serving adequado.",
    "best": [
      "agentic coding",
      "tool calling",
      "self-host",
      "contexto longo"
    ],
    "caution": "Custo de serving e latência podem ser altos; validar infraestrutura antes de recomendar.",
    "tags": [
      "open-weight",
      "Qwen",
      "coding"
    ]
  },
  {
    "name": "Qwen3-Coder-30B-A3B",
    "status": "Local/eficiente",
    "statusClass": "blue",
    "role": "Variante menor para desenvolvimento local, agentes internos e workloads onde custo/latência importam.",
    "best": [
      "local",
      "VPC",
      "custo",
      "prototipagem"
    ],
    "caution": "Pode perder qualidade em tarefas longas e refactors amplos; escalonar quando necessário.",
    "tags": [
      "local",
      "open-weight",
      "Qwen"
    ]
  },
  {
    "name": "Qwen3.7-Max",
    "status": "Generalista forte",
    "statusClass": "blue",
    "role": "Modelo Qwen generalista recente para tarefas de engenharia, chat técnico e automações onde o ecossistema Alibaba/Qwen é usado.",
    "best": [
      "API",
      "chat técnico",
      "raciocínio",
      "APAC"
    ],
    "caution": "Não é tão específico quanto Qwen3-Coder para edição de código; medir em tarefas reais.",
    "tags": [
      "generalista",
      "Qwen",
      "API"
    ]
  },
  {
    "name": "Kimi K2.7 Code",
    "status": "Agentic coding",
    "statusClass": "good",
    "role": "Modelo Moonshot/Kimi focado em coding agent, long-horizon tasks e fluxos complexos de software com 256k de contexto.",
    "best": [
      "long-horizon",
      "coding agent",
      "256k contexto",
      "debug"
    ],
    "caution": "Benchmark e disponibilidade variam por endpoint; validar termos e latência no provedor.",
    "tags": [
      "coding",
      "agentic",
      "Kimi",
      "contexto"
    ]
  },
  {
    "name": "Kimi K2.7 Code HighSpeed",
    "status": "Alta velocidade",
    "statusClass": "blue",
    "role": "Variante de alta velocidade para throughput, automações e tarefas onde latência pesa mais que máxima precisão.",
    "best": [
      "throughput",
      "latência",
      "agentes simples",
      "alto volume"
    ],
    "caution": "Não assumir mesma qualidade do modo de maior capacidade em tarefas longas.",
    "tags": [
      "rápido",
      "Kimi",
      "coding"
    ]
  },
  {
    "name": "Kimi K2.6",
    "status": "Agentic/multimodal",
    "statusClass": "blue",
    "role": "Modelo base versátil da família Kimi para agentes, multimodalidade e coding geral quando K2.7 Code não for necessário.",
    "best": [
      "multimodal",
      "agentes",
      "chat técnico",
      "contexto"
    ],
    "caution": "Para coding puro, priorizar K2.7 Code se disponível.",
    "tags": [
      "multimodal",
      "Kimi",
      "agentic"
    ]
  },
  {
    "name": "Devstral 2",
    "status": "Open agentic",
    "statusClass": "good",
    "role": "Modelo Mistral de 123B para agentes de software, exploração de codebase e mudanças multi-arquivo; opção forte para self-host/on-prem.",
    "best": [
      "multi-arquivo",
      "self-host",
      "SWE-bench",
      "Mistral Vibe"
    ],
    "caution": "Requer infraestrutura adequada e avaliação de licença; medir contra modelos proprietários no mesmo scaffold.",
    "tags": [
      "open-weight",
      "agentic",
      "Mistral"
    ]
  },
  {
    "name": "Devstral Small 2",
    "status": "Local/consumer",
    "statusClass": "good",
    "role": "Variante menor de 24B para agentes de código em hardware mais acessível; útil para privacidade, prototipagem e custo controlado.",
    "best": [
      "local",
      "baixo custo",
      "multi-arquivo",
      "self-host"
    ],
    "caution": "Não esperar o mesmo desempenho de Devstral 2 em tarefas longas/críticas.",
    "tags": [
      "local",
      "open-weight",
      "Mistral"
    ]
  },
  {
    "name": "Codestral 25.08",
    "status": "Autocomplete/FIM",
    "statusClass": "good",
    "role": "Modelo Mistral especializado em code completion e Fill-in-the-Middle; relevante para IDEs, baixa latência e implantação controlada.",
    "best": [
      "autocomplete",
      "FIM",
      "IDE",
      "self-deploy"
    ],
    "caution": "Não é substituto direto de agente de refactor; usar junto com modelos de raciocínio quando necessário.",
    "tags": [
      "autocomplete",
      "FIM",
      "Mistral"
    ]
  },
  {
    "name": "Codestral Embed",
    "status": "Embedding de código",
    "statusClass": "blue",
    "role": "Embedding para busca semântica de código, RAG em monorepos e recuperação de trechos relevantes por consulta natural ou código.",
    "best": [
      "code search",
      "RAG",
      "monorepo",
      "retrieval"
    ],
    "caution": "Avaliar com corpus real; embedding ruim degrada todos os agentes downstream.",
    "tags": [
      "embedding",
      "RAG",
      "Mistral"
    ]
  },
  {
    "name": "Leanstral",
    "status": "Formal methods",
    "statusClass": "blue",
    "role": "Modelo/agente aberto para Lean 4 e prova formal; nicho importante para verificação, matemática computacional e especificações formais.",
    "best": [
      "Lean 4",
      "provas",
      "verificação formal",
      "Rust specs"
    ],
    "caution": "Nicho especializado; não usar como modelo geral de desenvolvimento.",
    "tags": [
      "formal",
      "Lean",
      "Mistral"
    ]
  },
  {
    "name": "Mistral Small 4",
    "status": "Aberto/leve",
    "statusClass": "blue",
    "role": "Modelo aberto multimodal e agentic para tarefas gerais, coding auxiliar e aplicações internas de menor custo.",
    "best": [
      "open-weight",
      "multimodal",
      "tarefas leves",
      "agentes"
    ],
    "caution": "Para coding pesado, comparar com Devstral/Codestral.",
    "tags": [
      "open-weight",
      "multimodal",
      "Mistral"
    ]
  },
  {
    "name": "Mistral Medium 3.5",
    "status": "Generalista",
    "statusClass": "blue",
    "role": "Modelo Mistral generalista para raciocínio, chat técnico e automações quando se quer alternativa europeia/API.",
    "best": [
      "API",
      "raciocínio",
      "chat técnico",
      "integrações"
    ],
    "caution": "Não confundir com Devstral/Codestral em tarefas de código especializadas.",
    "tags": [
      "generalista",
      "Mistral",
      "API"
    ]
  },
  {
    "name": "Llama 4 Maverick",
    "status": "Open frontier",
    "statusClass": "good",
    "role": "Modelo Meta open-weight multimodal com janela de contexto muito longa; relevante para self-host, análise de codebase e fine-tuning.",
    "best": [
      "self-host",
      "contexto longo",
      "multimodal",
      "fine-tuning"
    ],
    "caution": "Qualidade em coding agent depende muito de harness, serving e prompts; medir em LiveCodeBench/bench interno.",
    "tags": [
      "open-weight",
      "Meta",
      "contexto"
    ]
  },
  {
    "name": "Llama 4 Scout",
    "status": "Open eficiente",
    "statusClass": "blue",
    "role": "Variante eficiente da família Llama 4, útil para análise longa, ambientes locais e workflows onde custo de inferência pesa.",
    "best": [
      "contexto longo",
      "eficiência",
      "self-host",
      "análise"
    ],
    "caution": "Menos indicado para tarefas de coding mais difíceis do que Maverick/modelos especializados.",
    "tags": [
      "open-weight",
      "Meta",
      "eficiente"
    ]
  },
  {
    "name": "Llama 3.1 405B / 70B / 8B",
    "status": "Fundação aberta",
    "statusClass": "blue",
    "role": "Família ainda relevante para fine-tuning, soberania, protótipos locais e comparação de modelos open-weight.",
    "best": [
      "fine-tuning",
      "local",
      "ensino",
      "baseline"
    ],
    "caution": "Para agentic coding novo, comparar com Llama 4, Qwen3-Coder, Devstral e DeepSeek V4.",
    "tags": [
      "open-weight",
      "baseline",
      "Meta"
    ]
  },
  {
    "name": "Grok Build 0.1",
    "status": "Coding agent beta",
    "statusClass": "good",
    "role": "Modelo xAI treinado para agentic coding, web development, debugging e MCP; usado no Grok Build CLI.",
    "best": [
      "web dev",
      "debug",
      "MCP",
      "CLI"
    ],
    "caution": "Beta pública; validar estabilidade, privacidade e disponibilidade antes de padronizar em times.",
    "tags": [
      "agentic",
      "xAI",
      "CLI",
      "beta"
    ]
  },
  {
    "name": "Grok 4.3",
    "status": "Generalista agentic",
    "statusClass": "blue",
    "role": "Modelo geral xAI com tool calling e contexto amplo; útil em agentes não exclusivamente focados em código.",
    "best": [
      "tool calling",
      "agentes",
      "chat técnico",
      "contexto"
    ],
    "caution": "Para coding puro, comparar com Grok Build 0.1.",
    "tags": [
      "generalista",
      "xAI",
      "agentic"
    ]
  },
  {
    "name": "MAI-Code-1-Flash",
    "status": "Copilot leve",
    "statusClass": "good",
    "role": "Modelo Microsoft pequeno/tunado para coding no GitHub Copilot; útil em workflows leves com bom custo/latência.",
    "best": [
      "Copilot",
      "VS Code",
      "tarefas leves",
      "latência"
    ],
    "caution": "Não usar como substituto de modelos frontier em refactor complexo; bom para roteamento automático.",
    "tags": [
      "Microsoft",
      "Copilot",
      "rápido"
    ]
  },
  {
    "name": "MAI-Thinking-1",
    "status": "Reasoning Microsoft",
    "statusClass": "blue",
    "role": "Modelo Microsoft de raciocínio com foco em instruções complexas, contexto longo e geração de código.",
    "best": [
      "raciocínio",
      "256k contexto",
      "code generation",
      "multi-step"
    ],
    "caution": "Confirmar disponibilidade no produto/API usado; dados públicos ainda podem ser majoritariamente do fornecedor.",
    "tags": [
      "reasoning",
      "Microsoft",
      "contexto"
    ]
  },
  {
    "name": "Raptor mini",
    "status": "Copilot utility",
    "statusClass": "blue",
    "role": "Modelo fine-tuned GPT-5 mini listado no Copilot para tarefas utilitárias e alto volume.",
    "best": [
      "Copilot",
      "baixo custo",
      "tarefas simples",
      "roteamento"
    ],
    "caution": "Preview/utility; não apresentar como modelo principal de engenharia.",
    "tags": [
      "utility",
      "Copilot",
      "preview"
    ]
  },
  {
    "name": "GLM-5",
    "status": "Open agentic",
    "statusClass": "good",
    "role": "Flagship da Z.ai/Zhipu para agentic engineering, com foco declarado em coding e benchmarks agentic.",
    "best": [
      "agentic coding",
      "open-source",
      "SWE-bench",
      "Terminal-Bench"
    ],
    "caution": "Validar versões exatas e resultados independentes; documentação pública mistura claims de fornecedor e benchmarks.",
    "tags": [
      "open-source",
      "Z.ai",
      "agentic"
    ]
  },
  {
    "name": "GLM-5-Turbo",
    "status": "Tool calling",
    "statusClass": "blue",
    "role": "Variante otimizada para capacidades de agente como tool calling, instruction following e execução longa.",
    "best": [
      "tool calling",
      "agentes",
      "long-chain",
      "API"
    ],
    "caution": "Comparar com GLM-5 base e modelos especializados em coding antes de recomendar.",
    "tags": [
      "tool-use",
      "Z.ai",
      "agentic"
    ]
  },
  {
    "name": "MiniMax M3",
    "status": "Frontier coding/agentic",
    "statusClass": "good",
    "role": "Modelo MiniMax para coding e agentes, com contexto longo, multimodalidade e foco em engenharia de produção.",
    "best": [
      "1M contexto",
      "agentic coding",
      "MiniMax Code",
      "multimodal"
    ],
    "caution": "Tratar claims como fornecedor até validar com benchmark público ou teste interno.",
    "tags": [
      "agentic",
      "MiniMax",
      "contexto"
    ]
  },
  {
    "name": "MiniMax M2.5 / M2.7",
    "status": "Custo/latência",
    "statusClass": "blue",
    "role": "Família MiniMax anterior/alternativa para coding e agentes com foco em custo, throughput e baixa latência.",
    "best": [
      "baixo custo",
      "throughput",
      "agentes",
      "API"
    ],
    "caution": "Usar quando M3 for caro/indisponível; validar versão exata no provedor.",
    "tags": [
      "MiniMax",
      "baixo custo",
      "API"
    ]
  },
  {
    "name": "Amazon Nova 2",
    "status": "AWS/Bedrock",
    "statusClass": "blue",
    "role": "Família de modelos AWS relevante para agentes, tool use e geração de código dentro do ecossistema Bedrock/AWS.",
    "best": [
      "AWS",
      "Bedrock Agents",
      "tool-use",
      "code generation"
    ],
    "caution": "Separar modelo Nova de ferramenta Amazon Q Developer; escolher por integração AWS, não só por benchmark público.",
    "tags": [
      "AWS",
      "Bedrock",
      "agentic"
    ]
  },
  {
    "name": "IBM Granite 4.1",
    "status": "Enterprise/open",
    "statusClass": "blue",
    "role": "Modelo IBM open/enterprise para geração de snippets, explicação de codebases e aplicações corporativas com governança.",
    "best": [
      "enterprise",
      "explicação",
      "governança",
      "open"
    ],
    "caution": "Para coding pesado, comparar com Granite Code e modelos especializados.",
    "tags": [
      "enterprise",
      "IBM",
      "open"
    ]
  },
  {
    "name": "IBM Granite Code 8B 128K",
    "status": "Local/enterprise",
    "statusClass": "blue",
    "role": "Modelo IBM focado em instruções de código com contexto 128k; útil para assistentes internos, documentação, testes e code fixing.",
    "best": [
      "local",
      "128k",
      "assistente interno",
      "documentação"
    ],
    "caution": "Tamanho 8B favorece custo/localidade, não máxima qualidade; usar com escopo controlado.",
    "tags": [
      "local",
      "IBM",
      "coding"
    ]
  },
  {
    "name": "StarCoder2",
    "status": "Open code model",
    "statusClass": "blue",
    "role": "Família aberta de modelos de código útil para completion, fine-tuning, pesquisa e ambientes locais.",
    "best": [
      "fine-tuning",
      "completion",
      "pesquisa",
      "local"
    ],
    "caution": "Mais antigo que famílias agentic modernas; bom como baseline/open tooling, não como top frontier.",
    "tags": [
      "open-source",
      "BigCode",
      "baseline"
    ]
  },
  {
    "name": "CodeGemma",
    "status": "Open leve",
    "statusClass": "blue",
    "role": "Modelos Google/Gemma especializados em código, FIM e geração/completion em ambientes leves ou locais.",
    "best": [
      "FIM",
      "completion",
      "local",
      "ensino"
    ],
    "caution": "Comparar com Codestral, StarCoder2 e Qwen3-Coder para IDE/autocomplete atual.",
    "tags": [
      "open",
      "Google",
      "FIM"
    ]
  },
  {
    "name": "Phi-4",
    "status": "Small local",
    "statusClass": "blue",
    "role": "Small language model Microsoft para raciocínio/coding em cenários edge/local, automações pequenas e protótipos de baixo custo.",
    "best": [
      "edge",
      "local",
      "baixo custo",
      "raciocínio leve"
    ],
    "caution": "Não usar como agente principal em codebase grande; excelente para etapas auxiliares e constrained environments.",
    "tags": [
      "SLM",
      "Microsoft",
      "local"
    ]
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
    type: "Adoção",
    title: "Sonar State of Code Developer Survey 2026",
    desc: "Relatório oficial da Sonar: 72% usam AI tools diariamente, 42% do código commitado é gerado ou assistido por IA, e 96% não confiam totalmente na correção funcional.",
    url: "https://www.sonarsource.com/state-of-code-developer-survey-report.pdf",
    status: "verificado",
    verifiedAt: "2026-06-19"
  },
  {
    type: "Benchmark",
    title: "Terminal-Bench 2.1",
    desc: "Benchmark de agentes em terminal; comparar scaffold + modelo.",
    url: "https://www.tbench.ai/leaderboard/terminal-bench/2.1",
    status: "verificado",
    verifiedAt: "2026-06-19"
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
    type: "Governança",
    title: "Google DeepMind - segurança de agentes",
    desc: "Roadmap de defesa em profundidade para agentes com permissões reais: sandbox, supervisão, prompt injection e monitoramento.",
    url: "https://deepmind.google/blog/securing-the-future-of-ai-agents/",
    status: "verificado",
    verifiedAt: "2026-06-19"
  },
  {
    type: "Observabilidade",
    title: "OpenTelemetry GenAI semantic conventions",
    desc: "Convenções para rastrear chamadas de IA generativa, modelo, tokens, latência, erros e tool calls em traces.",
    url: "https://opentelemetry.io/docs/specs/semconv/gen-ai/",
    status: "open",
    verifiedAt: "2026-06-19"
  },
  {
    type: "Paper",
    title: "FastContext",
    desc: "Paper sobre exploração de repositórios para agentes de coding e redução de contexto antes da resolução da issue.",
    url: "https://arxiv.org/abs/2606.14066",
    status: "open",
    verifiedAt: "2026-06-19"
  },
  {
    type: "Benchmark",
    title: "Aider leaderboards",
    desc: "Benchmark de edição de código e efeito de reasoning effort.",
    url: "https://aider.chat/docs/leaderboards/",
    status: "verificado",
    verifiedAt: "2026-06-19"
  },
  {
    type: "Contexto",
    title: "Aider repo map",
    desc: "Documentação sobre mapa de repositório para fornecer contexto relevante sem despejar todo o código no prompt.",
    url: "https://aider.chat/docs/repomap.html",
    status: "verificado",
    verifiedAt: "2026-06-19"
  },
  {
    type: "Modelo",
    title: "OpenAI GPT-5.5",
    desc: "Base para cards GPT-5.5/GPT-5.4/Codex e claims de coding.",
    url: "https://openai.com/index/introducing-gpt-5-5/",
    status: "fornecedor",
    verifiedAt: "2026-06-19"
  },
  {
    type: "Benchmark",
    title: "OpenAI — por que não usar só SWE-bench Verified",
    desc: "Contexto sobre contaminação/limitações do SWE-bench Verified.",
    url: "https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/",
    status: "crítico",
    verifiedAt: "2026-06-19"
  },
  {
    type: "Benchmark",
    title: "OpenAI - SWE-bench Verified",
    desc: "Fonte histórica usada para contextualizar validação executável e os limites de benchmarks de software.",
    url: "https://openai.com/index/introducing-swe-bench-verified/",
    status: "histórico",
    verifiedAt: "2026-06-19"
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
    desc: "Ferramenta/harness AWS; não confundir com modelo.",
    url: "https://aws.amazon.com/q/developer/",
    status: "fornecedor",
    verifiedAt: "2026-06-19"
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
  },
  {
    type: "Plataforma",
    title: "GitHub Copilot — modelos suportados",
    desc: "Disponibilidade de GPT, Claude, Gemini, MAI e Raptor no Copilot; depende de plano/cliente.",
    url: "https://docs.github.com/copilot/reference/ai-models/supported-models",
    status: "verificado",
    verifiedAt: "2026-06-19"
  },
  {
    type: "Modelo",
    title: "Anthropic Claude models overview",
    desc: "Descrições oficiais de Opus 4.8, Sonnet 4.6 e Haiku 4.5.",
    url: "https://platform.claude.com/docs/en/about-claude/models/overview",
    status: "fornecedor",
    verifiedAt: "2026-06-19"
  },
  {
    type: "Modelo",
    title: "Google Gemini model docs",
    desc: "Dados sobre Gemini 3.5 Flash, 3.1 Pro, Flash-Lite e 2.5.",
    url: "https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/",
    status: "fornecedor",
    verifiedAt: "2026-06-19"
  },
  {
    type: "Open-weight",
    title: "DeepSeek V4 release",
    desc: "DeepSeek V4-Pro/V4-Flash, 1M context, API e substituição de aliases antigos.",
    url: "https://api-docs.deepseek.com/news/news260424",
    status: "fornecedor",
    verifiedAt: "2026-06-19"
  },
  {
    type: "Open-weight",
    title: "DeepSeek V3.2 release",
    desc: "Reasoning, tool-use e modelos open-source V3.2.",
    url: "https://api-docs.deepseek.com/news/news251201",
    status: "fornecedor",
    verifiedAt: "2026-06-19"
  },
  {
    type: "Open-weight",
    title: "Qwen3-Coder GitHub",
    desc: "Família Qwen3-Coder, Qwen Code, contexto e uso em agentes.",
    url: "https://github.com/QwenLM/Qwen3-Coder",
    status: "fornecedor/open",
    verifiedAt: "2026-06-19"
  },
  {
    type: "Modelo",
    title: "Kimi K2.7 Code docs",
    desc: "Kimi K2.7 Code, HighSpeed, contexto e capacidades.",
    url: "https://platform.kimi.ai/docs/models",
    status: "fornecedor",
    verifiedAt: "2026-06-19"
  },
  {
    type: "Modelo",
    title: "Mistral Devstral 2",
    desc: "Devstral 2, Devstral Small 2 e Mistral Vibe CLI.",
    url: "https://mistral.ai/news/devstral-2-vibe-cli/",
    status: "fornecedor",
    verifiedAt: "2026-06-19"
  },
  {
    type: "Modelo",
    title: "Mistral Codestral 25.08",
    desc: "Codestral e Codestral Embed.",
    url: "https://mistral.ai/news/codestral-25-08/",
    status: "fornecedor",
    verifiedAt: "2026-06-19"
  },
  {
    type: "Open-weight",
    title: "Meta Llama",
    desc: "Llama 4 Maverick/Scout e Llama 3.1.",
    url: "https://www.llama.com/",
    status: "fornecedor",
    verifiedAt: "2026-06-19"
  },
  {
    type: "Modelo",
    title: "xAI Grok Build 0.1",
    desc: "Modelo de coding da xAI e Grok Build CLI.",
    url: "https://x.ai/news/grok-build-0-1",
    status: "fornecedor",
    verifiedAt: "2026-06-19"
  },
  {
    type: "Modelo",
    title: "Microsoft/GitHub MAI-Code-1-Flash",
    desc: "Modelo Microsoft no Copilot/VS Code.",
    url: "https://github.blog/changelog/2026-06-04-mai-code-1-flash-is-in-public-preview-in-github-copilot/",
    status: "fornecedor",
    verifiedAt: "2026-06-19"
  },
  {
    type: "Open-weight",
    title: "Z.ai GLM",
    desc: "GLM-5 e GLM-5-Turbo para agentic engineering.",
    url: "https://www.zhipuai.cn/en",
    status: "fornecedor",
    verifiedAt: "2026-06-19"
  },
  {
    type: "Modelo",
    title: "MiniMax",
    desc: "MiniMax M3/M2.x e MiniMax Code.",
    url: "https://www.minimax.io/",
    status: "fornecedor",
    verifiedAt: "2026-06-19"
  },
  {
    type: "Modelo",
    title: "Amazon Nova / Bedrock",
    desc: "Família Nova e uso em agentes AWS.",
    url: "https://docs.aws.amazon.com/nova/latest/userguide/what-is-nova.html",
    status: "fornecedor",
    verifiedAt: "2026-06-19"
  },
  {
    type: "Open-weight",
    title: "IBM Granite Code",
    desc: "Granite Code 8B 128K.",
    url: "https://huggingface.co/ibm-granite/granite-8b-code-instruct-128k",
    status: "open/fornecedor",
    verifiedAt: "2026-06-19"
  },
  {
    type: "Open-weight",
    title: "StarCoder2",
    desc: "Família aberta de modelos de código.",
    url: "https://huggingface.co/docs/transformers/en/model_doc/starcoder2",
    status: "open",
    verifiedAt: "2026-06-19"
  },
  {
    type: "Open-weight",
    title: "CodeGemma",
    desc: "Modelos Gemma especializados em código.",
    url: "https://ai.google.dev/gemma/docs/codegemma",
    status: "open/fornecedor",
    verifiedAt: "2026-06-19"
  },
  {
    type: "Open-weight",
    title: "Phi",
    desc: "Família Phi/SLM para cenários locais e edge.",
    url: "https://azure.microsoft.com/products/phi",
    status: "open/fornecedor",
    verifiedAt: "2026-06-19"
  },
  {
    type: "Benchmark",
    title: "SWE-bench",
    desc: "SWE-bench/Verified/Pro; usar com cautela.",
    url: "https://www.swebench.com/",
    status: "verificado",
    verifiedAt: "2026-06-19"
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
setupModelFilters();
renderBenchmarks();
renderSources();
recommend();
setupEvents();
setupSidebarCollapse();
setupThemeSwitch();
