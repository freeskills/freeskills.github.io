/**
 * Site language: pt-BR | en-US
 *
 * Default = browser language (until the visitor uses the toggle).
 * Toggle writes localStorage key "freeskills-lang".
 *
 * Visible copy uses [data-lang="pt-BR"|"en-US"] + CSS (no flash).
 * This file: detect, persist, toggle, document title, copy strings, locale events.
 */
(() => {
  const KEY = "freeskills-lang";
  const LOCALES = ["pt-BR", "en-US"];
  const EVENT = "freeskills:locale";

  const UI = {
    "en-US": {
      skip: "Skip to content",
      navPrimary: "Primary",
      systemPicker: "Choose your operating system",
      lang: "Language",
      copy: "Copy",
      copied: "Copied",
      copiedToast: "Copied to clipboard",
      copyFail: "Copy failed. Select the command manually",
      "guide.toc": "Guide index",
      "guide.prev": "Previous",
      "guide.next": "Next",
      "guide.moduleIndex": "Module index",
      "guide.module": "Module",
      "guide.available": "Available",
      "guide.soon": "Coming soon",
    },
    "pt-BR": {
      skip: "Ir para o conteúdo",
      navPrimary: "Principal",
      systemPicker: "Escolha seu sistema operacional",
      lang: "Idioma",
      copy: "Copiar",
      copied: "Copiado",
      copiedToast: "Copiado para a área de transferência",
      copyFail: "Falha ao copiar. Selecione o comando manualmente",
      "guide.toc": "Índice do guia",
      "guide.prev": "Anterior",
      "guide.next": "Próximo",
      "guide.moduleIndex": "Índice do módulo",
      "guide.module": "Módulo",
      "guide.available": "Disponível",
      "guide.soon": "Em breve",
    },
  };

  const PAGES = {
    home: {
      "en-US": {
        title: "FreeSkills · Install AI skills for Cursor, Claude & Codex",
        description:
          "FreeSkills is a marketplace of agent skills and plugins. Add it once, install plugins, and keep them updated across Cursor, Claude Code, and Codex.",
      },
      "pt-BR": {
        title: "FreeSkills · Instale skills de IA para Cursor, Claude e Codex",
        description:
          "FreeSkills é um marketplace de skills e plugins para agentes. Adicione uma vez, instale plugins e mantenha-os atualizados no Cursor, Claude Code e Codex.",
      },
    },
    cortex: {
      "en-US": {
        title: "Cortex · A focused desktop workbench",
        description:
          "Editor, terminal, Git, Claude chat, MySQL, and usage insights in one local desktop workspace.",
      },
      "pt-BR": {
        title: "Cortex · Ambiente de desenvolvimento",
        description:
          "Editor, terminal, Git, chat com Claude, MySQL e painel de uso em um ambiente de desenvolvimento local.",
      },
    },
    plugins: {
      "en-US": {
        title: "Plugins · FreeSkills",
        description:
          "Browse FreeSkills plugins for Cursor, Claude Code, and Codex. Currently available: SDD (Spec-Driven Development).",
      },
      "pt-BR": {
        title: "Plugins · FreeSkills",
        description:
          "Explore os plugins FreeSkills para Cursor, Claude Code e Codex. Disponível agora: SDD (Spec-Driven Development).",
      },
    },
    "plugins-sdd": {
      "en-US": {
        title: "SDD · Spec-Driven Development · FreeSkills",
        description:
          "Install SDD from FreeSkills: Spec-Driven Development for Cursor, Claude Code, and Codex, with living .specs/, ADRs, and protocol commands.",
      },
      "pt-BR": {
        title: "SDD · Spec-Driven Development · FreeSkills",
        description:
          "Instale o SDD pelo FreeSkills: Spec-Driven Development para Cursor, Claude Code e Codex, com .specs/ vivos, ADRs e comandos de protocolo.",
      },
    },
    "guide-index": {
      "en-US": {
        title: "Beginner's Guide · FreeSkills",
        description:
          "A guide for people starting to build software with AI: understand the problem, plan, implement, test, and iterate.",
      },
      "pt-BR": {
        title: "Guia para Iniciantes · FreeSkills",
        description:
          "Guia para quem está começando a desenvolver software com inteligência artificial: entender o problema, planejar, implementar, testar e evoluir.",
      },
    },
    "guide-comecando": {
      "en-US": {
        title: "1. Getting started · Beginner's Guide · FreeSkills",
        description:
          "Module 1 of the Beginner's Guide: what to understand before you build software with AI.",
      },
      "pt-BR": {
        title: "1. Começando · Guia para Iniciantes · FreeSkills",
        description:
          "Módulo 1 do Guia para Iniciantes: o que entender antes de criar software com inteligência artificial.",
      },
    },
    "guide-bem-vindo": {
      "en-US": {
        title: "Welcome to the Guide · Beginner's Guide · FreeSkills",
        description:
          "What this guide is for: you don't need to know everything to start, but you do need to learn while you build.",
      },
      "pt-BR": {
        title: "Bem-vindo ao Guia · Guia para Iniciantes · FreeSkills",
        description:
          "Apresentação do Guia para Iniciantes: você não precisa saber tudo para começar, mas precisa aprender enquanto constrói software com IA.",
      },
    },
    "guide-preciso": {
      "en-US": {
        title: "What you need to start · Beginner's Guide · FreeSkills",
        description:
          "The minimum setup to start building software with AI, without spending weeks on tools.",
      },
      "pt-BR": {
        title:
          "O que você precisa para começar · Guia para Iniciantes · FreeSkills",
        description:
          "Os requisitos mínimos para começar a desenvolver software com IA: computador, internet, terminal, editor e disposição para experimentar.",
      },
    },
    "guide-ambiente": {
      "en-US": {
        title:
          "Choosing your development environment · Beginner's Guide · FreeSkills",
        description:
          "Linux, macOS, or Windows: pick quickly and keep moving, including WSL on Windows.",
      },
      "pt-BR": {
        title:
          "Escolhendo seu ambiente de desenvolvimento · Guia para Iniciantes · FreeSkills",
        description:
          "Como escolher entre Linux, macOS e Windows para desenvolver software com IA, sem transformar a decisão numa guerra de sistemas.",
      },
    },
    "guide-wsl": {
      "en-US": {
        title: "Linux on Windows with WSL · Beginner's Guide · FreeSkills",
        description:
          "What WSL is, why it helps Windows developers, and when to use it.",
      },
      "pt-BR": {
        title: "Linux no Windows com WSL · Guia para Iniciantes · FreeSkills",
        description:
          "O que é o WSL, por que ele é útil para quem desenvolve no Windows e quando vale utilizá-lo.",
      },
    },
    "guide-preparando": {
      "en-US": {
        title: "Setting up your environment · Beginner's Guide · FreeSkills",
        description:
          "A simple base: terminal, Git, editor, a projects folder, and few extra tools.",
      },
      "pt-BR": {
        title: "Preparando o ambiente · Guia para Iniciantes · FreeSkills",
        description:
          "Monte uma base simples de desenvolvimento: terminal, Git, editor, pasta de projetos e poucas ferramentas essenciais.",
      },
    },
    "guide-git": {
      "en-US": {
        title: "Installing Git · Beginner's Guide · FreeSkills",
        description:
          "Install Git on Linux, macOS, or WSL, set your name and email, and make your first commit.",
      },
      "pt-BR": {
        title: "Instalando o Git · Guia para Iniciantes · FreeSkills",
        description:
          "Instale o Git no Linux, macOS ou WSL, configure nome e e-mail e faça o primeiro commit.",
      },
    },
    "guide-claude": {
      "en-US": {
        title: "Installing and using Claude · Beginner's Guide · FreeSkills",
        description:
          "Use Claude as part of your development environment: work in the project, give context, review diffs, and move in small steps.",
      },
      "pt-BR": {
        title:
          "Instalando e utilizando o Claude · Guia para Iniciantes · FreeSkills",
        description:
          "Como usar o Claude como parte do ambiente de desenvolvimento: trabalhar dentro do projeto, dar contexto, analisar mudanças e avançar em passos pequenos.",
      },
    },
    "guide-trabalhar": {
      "en-US": {
        title: "How to build software with AI · Beginner's Guide · FreeSkills",
        description:
          "An incremental loop: understand the problem, set a goal, plan, implement a slice, test, and keep going.",
      },
      "pt-BR": {
        title:
          "Como trabalhar com IA para desenvolver software · Guia para Iniciantes · FreeSkills",
        description:
          "O fluxo incremental para desenvolver software com IA: entender o problema, definir o objetivo, planejar, implementar uma parte, testar e evoluir.",
      },
    },
    "guide-primeiro-projeto": {
      "en-US": {
        title: "2. Our first software · Beginner's Guide · FreeSkills",
        description:
          "Module 2: build a static HTML site with AI, register a domain, and publish. No Skills and no SDD yet.",
      },
      "pt-BR": {
        title: "2. Nosso primeiro software · Guia para Iniciantes · FreeSkills",
        description:
          "Módulo 2: criar um site HTML com IA, registrar um domínio e publicar. Sem Skills e sem SDD ainda.",
      },
    },
    "guide-criando-site": {
      "en-US": {
        title: "Building our first site with AI · Beginner's Guide · FreeSkills",
        description:
          "Hands-on: empty folder, static HTML with AI, review, and progressive improvements.",
      },
      "pt-BR": {
        title:
          "Criando nosso primeiro site com IA · Guia para Iniciantes · FreeSkills",
        description:
          "Roteiro mão na massa: pasta vazia, site HTML estático com IA, análise e melhorias progressivas.",
      },
    },
    "guide-pedindo-alteracoes": {
      "en-US": {
        title: "How to ask the AI for changes · Beginner's Guide · FreeSkills",
        description:
          "Request changes on an existing HTML site: context, small slices, and browser review.",
      },
      "pt-BR": {
        title:
          "Como pedir alterações para a IA · Guia para Iniciantes · FreeSkills",
        description:
          "Como solicitar mudanças em um site HTML existente: contexto, fatias pequenas e revisão no navegador.",
      },
    },
    "guide-dominios": {
      "en-US": {
        title: "Domain registration · Beginner's Guide · FreeSkills",
        description:
          "Register a name before you host: .com, .com.br, and other useful extensions.",
      },
      "pt-BR": {
        title: "Registro de domínio · Guia para Iniciantes · FreeSkills",
        description:
          "Registre um nome antes de hospedar: .com, .com.br e outras extensões úteis.",
      },
    },
    "guide-publicando": {
      "en-US": {
        title: "Publishing our first project · Beginner's Guide · FreeSkills",
        description:
          "Two deploy paths: shared hosting with a file manager, or a VPS with Beway.",
      },
      "pt-BR": {
        title:
          "Publicando nosso primeiro projeto · Guia para Iniciantes · FreeSkills",
        description:
          "Duas formas de deploy: hospedagem compartilhada com gerenciador de arquivos, ou VPS com Beway.",
      },
    },
    "guide-hospedagem-compartilhada": {
      "en-US": {
        title: "Shared hosting · Beginner's Guide · FreeSkills",
        description:
          "Put static HTML online with shared hosting and a file manager. No VPS required.",
      },
      "pt-BR": {
        title: "Hospedagem compartilhada · Guia para Iniciantes · FreeSkills",
        description:
          "Coloque o HTML estático no ar com hospedagem compartilhada e gerenciador de arquivos. Sem VPS.",
      },
    },
    "guide-servidor-vps": {
      "en-US": {
        title: "VPS server · Beginner's Guide · FreeSkills",
        description:
          "Your own Linux VPS with Beway. Providers: Linode, DigitalOcean, AWS, and Google Cloud.",
      },
      "pt-BR": {
        title: "Servidor VPS · Guia para Iniciantes · FreeSkills",
        description:
          "Uma VPS Linux só sua com Beway. Provedores: Linode, DigitalOcean, AWS e Google Cloud.",
      },
    },
    "guide-sistema-real": {
      "en-US": {
        title: "3. Building a real system · Beginner's Guide · FreeSkills",
        description:
          'Marina Alves’ site stops being a brochure: a catalog, contact, and data she can update.',
      },
      "pt-BR": {
        title: '3. Criando um sistema real · Guia para Iniciantes · FreeSkills',
        description:
          'O site da Marina Alves deixa de ser folheto: catálogo, contato e dados que ela consegue atualizar.',
      },
    },
    "guide-crescer": {
      "en-US": {
        title: "4. When the project starts to grow · Beginner's Guide · FreeSkills",
        description:
          'More listings, more files: organize the repo, record decisions, and filter the list.',
      },
      "pt-BR": {
        title: '4. Quando o projeto começa a crescer · Guia para Iniciantes · FreeSkills',
        description:
          'Mais imóveis, mais arquivos: organizar o repo, registrar decisões e filtrar a lista.',
      },
    },
    "guide-skills": {
      "en-US": {
        title: "5. Working with Skills · Beginner's Guide · FreeSkills",
        description:
          'Teach the AI Marina’s look and rules. Adding inventory waits for SDD.',
      },
      "pt-BR": {
        title: '5. Trabalhando com Skills · Guia para Iniciantes · FreeSkills',
        description:
          'Ensinar a IA o visual e as regras do site da Marina. Cadastrar estoque fica para o SDD.',
      },
    },
    "guide-sdd-modulo": {
      "en-US": {
        title: "6. Specification Driven Development · Beginner's Guide · FreeSkills",
        description:
          'Specify Marina’s admin area before the AI starts implementing.',
      },
      "pt-BR": {
        title: '6. Specification Driven Development · Guia para Iniciantes · FreeSkills',
        description:
          'Especificar a área administrativa da Marina antes de a IA sair implementando.',
      },
    },
    "guide-do-folheto": {
      "en-US": {
        title: "From brochure to product · Beginner's Guide · FreeSkills",
        description:
          'What the realtor site still needs to be useful, not only pretty.',
      },
      "pt-BR": {
        title: 'Do folheto ao produto · Guia para Iniciantes · FreeSkills',
        description:
          'O que falta para o site da corretora ser útil de verdade, não só bonito.',
      },
    },
    "guide-catalogo": {
      "en-US": {
        title: "Catalog and listing pages · Beginner's Guide · FreeSkills",
        description:
          'Leave the 3-card homepage and get a list plus one page per listing.',
      },
      "pt-BR": {
        title: 'Catálogo e páginas de imóvel · Guia para Iniciantes · FreeSkills',
        description:
          'Sair da home com 3 cards e ter uma lista + uma página por imóvel.',
      },
    },
    "guide-formulario": {
      "en-US": {
        title: "Contact that reaches Marina · Beginner's Guide · FreeSkills",
        description:
          'A WhatsApp lead (and an email fallback) without inventing a backend yet.',
      },
      "pt-BR": {
        title: 'Contato que chega na Marina · Guia para Iniciantes · FreeSkills',
        description:
          'Lead no WhatsApp (e e-mail de reserva) sem inventar um backend agora.',
      },
    },
    "guide-dados": {
      "en-US": {
        title: "Data apart from the HTML · Beginner's Guide · FreeSkills",
        description:
          'A listings JSON so a new apt does not mean rewriting the homepage.',
      },
      "pt-BR": {
        title: 'Dados separados do HTML · Guia para Iniciantes · FreeSkills',
        description:
          'Um JSON de imóveis para incluir um apto novo sem reescrever a home.',
      },
    },
    "guide-republicar": {
      "en-US": {
        title: "Publish the system again · Beginner's Guide · FreeSkills",
        description:
          'Same domain, bigger site: shared hosting or a VPS with Beway.',
      },
      "pt-BR": {
        title: 'Republicar o sistema · Guia para Iniciantes · FreeSkills',
        description:
          'O mesmo domínio, o site maior: compartilhada ou VPS com Beway.',
      },
    },
    "guide-quando-html": {
      "en-US": {
        title: "When static HTML gets tight · Beginner's Guide · FreeSkills",
        description:
          'Signs Marina’s folder grew: 12 listings, filters, she wants to edit alone.',
      },
      "pt-BR": {
        title: 'Quando o HTML estático aperta · Guia para Iniciantes · FreeSkills',
        description:
          'Sintomas de que a pasta da Marina cresceu: 12 imóveis, filtros, ela quer editar sozinha.',
      },
    },
    "guide-organizar-repo": {
      "en-US": {
        title: "Organize the repository · Beginner's Guide · FreeSkills",
        description:
          'Folders, README, .gitignore, and commits that tell the site’s story.',
      },
      "pt-BR": {
        title: 'Organizar o repositório · Guia para Iniciantes · FreeSkills',
        description:
          'Pastas, README, .gitignore e commits que contam a história do site.',
      },
    },
    "guide-decisoes": {
      "en-US": {
        title: "Record decisions · Beginner's Guide · FreeSkills",
        description:
          'Write down the why (JSON, no framework, WhatsApp) before you forget.',
      },
      "pt-BR": {
        title: 'Registrar decisões · Guia para Iniciantes · FreeSkills',
        description:
          'Anotar o porquê (JSON, sem framework, WhatsApp) antes de esquecer.',
      },
    },
    "guide-filtros": {
      "en-US": {
        title: "Filters and the next step · Beginner's Guide · FreeSkills",
        description:
          'Filter the catalog by neighborhood and price. Know when a panel is next.',
      },
      "pt-BR": {
        title: 'Filtros e o próximo degrau · Guia para Iniciantes · FreeSkills',
        description:
          'Filtrar por bairro e preço no catálogo. Saber quando um painel entra.',
      },
    },
    "guide-o-que-e-skill": {
      "en-US": {
        title: "What a Skill is · Beginner's Guide · FreeSkills",
        description:
          'A reusable instruction, not a giant prompt pasted again.',
      },
      "pt-BR": {
        title: 'O que é uma Skill · Guia para Iniciantes · FreeSkills',
        description:
          'Instrução reutilizável, não um prompt gigante colado de novo.',
      },
    },
    "guide-instalando-skills": {
      "en-US": {
        title: "Installing Skills in your environment · Beginner's Guide · FreeSkills",
        description:
          'The FreeSkills marketplace and where Marina’s project Skill lives.',
      },
      "pt-BR": {
        title: 'Instalando Skills no ambiente · Guia para Iniciantes · FreeSkills',
        description:
          'Marketplace FreeSkills e onde a Skill do projeto da Marina vive.',
      },
    },
    "guide-usando-skill": {
      "en-US": {
        title: "Use a Skill on Marina’s site · Beginner's Guide · FreeSkills",
        description:
          'Ask for a visual tweak with the Skill on. No new listing in the JSON.',
      },
      "pt-BR": {
        title: 'Usar uma Skill no site da Marina · Guia para Iniciantes · FreeSkills',
        description:
          'Pedir um ajuste visual com a Skill ligada. Sem cadastrar imóvel no JSON.',
      },
    },
    "guide-escrevendo-skill": {
      "en-US": {
        title: "Write a small Skill · Beginner's Guide · FreeSkills",
        description:
          'A SKILL.md with colors and bans. Listing signup does not belong here.',
      },
      "pt-BR": {
        title: 'Escrever uma Skill pequena · Guia para Iniciantes · FreeSkills',
        description:
          'Um SKILL.md com cores e proibições. Cadastro de imóvel não entra aqui.',
      },
    },
    "guide-o-que-e-sdd": {
      "en-US": {
        title: "What SDD is · Beginner's Guide · FreeSkills",
        description:
          'Living spec first. Code second. The habit that holds the product.',
      },
      "pt-BR": {
        title: 'O que é SDD · Guia para Iniciantes · FreeSkills',
        description:
          'Especificação viva primeiro. Código depois. O hábito que segura o produto.',
      },
    },
    "guide-instalando-sdd": {
      "en-US": {
        title: "Installing the SDD plugin · Beginner's Guide · FreeSkills",
        description:
          'The FreeSkills marketplace and /plugin install sdd@freeskills.',
      },
      "pt-BR": {
        title: 'Instalando o plugin SDD · Guia para Iniciantes · FreeSkills',
        description:
          'Marketplace FreeSkills e /plugin install sdd@freeskills.',
      },
    },
    "guide-dna": {
      "en-US": {
        title: "Project DNA for the realtor · Beginner's Guide · FreeSkills",
        description:
          'Who uses it, what the product is (and is not) on Marina’s site.',
      },
      "pt-BR": {
        title: 'DNA do projeto da corretora · Guia para Iniciantes · FreeSkills',
        description:
          'Quem usa, o que o produto é (e o que não é) no site da Marina.',
      },
    },
    "guide-especificar": {
      "en-US": {
        title: "Specify the admin area · Beginner's Guide · FreeSkills",
        description:
          'Ready to implement: Marina lists, adds, edits, and removes listings.',
      },
      "pt-BR": {
        title: 'Especificar a área administrativa · Guia para Iniciantes · FreeSkills',
        description:
          'Pronto para implementar: a Marina lista, cadastra, edita e remove imóveis.',
      },
    },
    "guide-implementar-spec": {
      "en-US": {
        title: "Implement from the spec · Beginner's Guide · FreeSkills",
        description:
          'One slice, browser review, Definition of Done. The guide ends here.',
      },
      "pt-BR": {
        title: 'Implementar a partir da spec · Guia para Iniciantes · FreeSkills',
        description:
          'Uma fatia, revisão no navegador, Definition of Done. O guia fecha aqui.',
      },
    },
  };

  function isLocale(value) {
    return LOCALES.includes(value);
  }

  function detect() {
    try {
      const saved = localStorage.getItem(KEY);
      if (isLocale(saved)) return saved;
    } catch (_) {
      /* private mode */
    }
    const list = [
      ...(navigator.languages || []),
      navigator.language,
      navigator.userLanguage,
    ].filter(Boolean);
    for (const item of list) {
      if (/^pt\b/i.test(item)) return "pt-BR";
      if (/^en\b/i.test(item)) return "en-US";
    }
    return "en-US";
  }

  function current() {
    const fromDom = document.documentElement.getAttribute("data-locale");
    return isLocale(fromDom) ? fromDom : detect();
  }

  function t(key) {
    const locale = current();
    return UI[locale][key] || UI["en-US"][key] || key;
  }

  function applyMeta(locale) {
    document.documentElement.lang = locale;
    document.documentElement.setAttribute("data-locale", locale);
    const page = document.body?.dataset.i18nPage;
    const meta = page && PAGES[page] && PAGES[page][locale];
    if (meta) {
      document.title = meta.title;
      const description = document.querySelector('meta[name="description"]');
      if (description) description.setAttribute("content", meta.description);
    }
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (key && UI[locale][key] != null) el.textContent = UI[locale][key];
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria");
      if (key && UI[locale][key] != null)
        el.setAttribute("aria-label", UI[locale][key]);
    });
    document.querySelectorAll(".copy-btn").forEach((btn) => {
      if (!btn.classList.contains("is-copied")) btn.textContent = t("copy");
    });
  }

  function paintToggle(locale) {
    document.querySelectorAll("[data-lang-switch]").forEach((root) => {
      root.innerHTML = "";
      root.classList.add("lang-switch");
      root.setAttribute("role", "group");
      root.setAttribute("aria-label", t("lang"));
      LOCALES.forEach((code) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.setAttribute("data-set-lang", code);
        btn.setAttribute("aria-pressed", code === locale ? "true" : "false");
        btn.title = code === "pt-BR" ? "Português (Brasil)" : "English (US)";
        btn.textContent = code === "pt-BR" ? "PT" : "EN";
        btn.addEventListener("click", () => setLocale(code, true));
        root.appendChild(btn);
      });
    });
  }

  function setLocale(locale, persist) {
    if (!isLocale(locale)) return;
    if (persist) {
      try {
        localStorage.setItem(KEY, locale);
      } catch (_) {
        /* ignore */
      }
    }
    applyMeta(locale);
    paintToggle(locale);
    document.documentElement.setAttribute("data-i18n-ready", "true");
    document.documentElement.dispatchEvent(
      new CustomEvent(EVENT, { detail: locale }),
    );
  }

  function init() {
    const locale = detect();
    setLocale(locale, false);
  }

  window.FreeSkillsI18n = {
    KEY,
    EVENT,
    detect,
    current,
    t,
    setLocale,
    init,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
