/**
 * Single source of truth for the beginner guide.
 *
 * To add a module later:
 * 1. Append an object to GUIDE.modules (status: "available" or "soon").
 * 2. Create guia/<id>/index.html and one folder per page.
 * 3. Set data-guide-page="<id>" on the module index, or "<id>/<page-id>" on lessons.
 *
 * To add a lesson to a module:
 * 1. Push a page object into that module's pages array.
 * 2. Create guia/<module-id>/<page-id>/index.html with data-guide-page="<module-id>/<page-id>".
 *
 * Sidebar, catalog, lesson lists, and prev/next are generated from this file.
 * Titles use { "pt-BR": "...", "en-US": "..." } and follow the site locale.
 */
(() => {
  const GUIDE = {
    title: { "pt-BR": "Guia para Iniciantes", "en-US": "Beginner's Guide" },
    modules: [
      {
        id: "comecando",
        number: "1",
        title: { "pt-BR": "Começando", "en-US": "Getting started" },
        blurb: {
          "pt-BR":
            "Prepare o ambiente, escolha as ferramentas e aprenda o jeito de trabalhar com IA.",
          "en-US":
            "Set up your environment, pick your tools, and learn how to work with AI.",
        },
        status: "available",
        pages: [
          {
            id: "bem-vindo",
            title: {
              "pt-BR": "Bem-vindo ao Guia",
              "en-US": "Welcome to the Guide",
            },
            navTitle: { "pt-BR": "Bem-vindo ao Guia", "en-US": "Welcome" },
            blurb: {
              "pt-BR": "A proposta do guia e a jornada que você vai seguir.",
              "en-US": "What this guide is for and the path it follows.",
            },
          },
          {
            id: "o-que-voce-precisa",
            title: {
              "pt-BR": "O que você precisa para começar",
              "en-US": "What you need to start",
            },
            navTitle: {
              "pt-BR": "O que você precisa",
              "en-US": "What you need",
            },
            blurb: {
              "pt-BR":
                "O mínimo necessário, sem passar semanas configurando tudo.",
              "en-US":
                "The minimum setup, without spending weeks configuring tools.",
            },
          },
          {
            id: "escolhendo-ambiente",
            title: {
              "pt-BR": "Escolhendo seu ambiente de desenvolvimento",
              "en-US": "Choosing your development environment",
            },
            navTitle: {
              "pt-BR": "Escolhendo seu ambiente",
              "en-US": "Choosing your environment",
            },
            blurb: {
              "pt-BR":
                "Linux, macOS ou Windows: escolha rápido e siga em frente.",
              "en-US": "Linux, macOS, or Windows: choose quickly and move on.",
            },
          },
          {
            id: "wsl",
            title: {
              "pt-BR": "Linux no Windows com WSL",
              "en-US": "Linux on Windows with WSL",
            },
            navTitle: {
              "pt-BR": "Linux no Windows com WSL",
              "en-US": "Linux on Windows with WSL",
            },
            blurb: {
              "pt-BR":
                "O que é o WSL e quando ele ajuda quem desenvolve no Windows.",
              "en-US":
                "What WSL is and when it helps if you develop on Windows.",
            },
          },
          {
            id: "preparando-ambiente",
            title: {
              "pt-BR": "Preparando o ambiente",
              "en-US": "Setting up your environment",
            },
            navTitle: {
              "pt-BR": "Preparando o ambiente",
              "en-US": "Setting up your environment",
            },
            blurb: {
              "pt-BR":
                "Terminal, Git, editor e uma pasta para os seus projetos.",
              "en-US": "Terminal, Git, editor, and a folder for your projects.",
            },
          },
          {
            id: "instalando-git",
            title: {
              "pt-BR": "Instalando o Git",
              "en-US": "Installing Git",
            },
            navTitle: {
              "pt-BR": "Instalando o Git",
              "en-US": "Installing Git",
            },
            blurb: {
              "pt-BR":
                "Instalar, configurar e fazer o primeiro commit com o mínimo necessário.",
              "en-US":
                "Install, configure, and make your first commit with the minimum you need.",
            },
          },
          {
            id: "claude",
            title: {
              "pt-BR": "Instalando e utilizando o Claude",
              "en-US": "Installing and using Claude",
            },
            navTitle: {
              "pt-BR": "Instalando o Claude",
              "en-US": "Installing Claude",
            },
            blurb: {
              "pt-BR":
                "Como usar uma IA como parte do ambiente de desenvolvimento.",
              "en-US": "How to use AI as part of your development environment.",
            },
          },
          {
            id: "trabalhar-com-ia",
            title: {
              "pt-BR": "Como trabalhar com IA para desenvolver software",
              "en-US": "How to build software with AI",
            },
            navTitle: {
              "pt-BR": "Como trabalhar com IA",
              "en-US": "How to work with AI",
            },
            blurb: {
              "pt-BR":
                "Um fluxo incremental: entender, planejar, implementar, testar e evoluir.",
              "en-US":
                "An incremental loop: understand, plan, implement, test, and iterate.",
            },
          },
        ],
      },
      {
        id: "primeiro-projeto",
        number: "2",
        title: {
          "pt-BR": "Nosso primeiro software",
          "en-US": "Our first software",
        },
        blurb: {
          "pt-BR":
            "Criar um site HTML com IA, registrar um domínio e publicar. Ainda sem Skills e sem SDD.",
          "en-US":
            "Build an HTML site with AI, register a domain, and publish. Still no Skills and no SDD.",
        },
        status: "available",
        pages: [
          {
            id: "criando-primeiro-site",
            title: {
              "pt-BR": "Criando nosso primeiro site com IA",
              "en-US": "Building our first site with AI",
            },
            navTitle: {
              "pt-BR": "Primeiro site com IA",
              "en-US": "First site with AI",
            },
            blurb: {
              "pt-BR":
                "Pasta vazia, HTML estático e o ciclo: pedir, analisar, melhorar.",
              "en-US":
                "Empty folder, static HTML, and the loop: ask, review, improve.",
            },
          },
          {
            id: "pedindo-alteracoes",
            title: {
              "pt-BR": "Como pedir alterações para a IA",
              "en-US": "How to ask the AI for changes",
            },
            navTitle: {
              "pt-BR": "Pedir alterações",
              "en-US": "Ask for changes",
            },
            blurb: {
              "pt-BR":
                "Layout, textos, seções e responsividade sem recomeçar o projeto.",
              "en-US":
                "Layout, copy, sections, and responsiveness without restarting.",
            },
          },
          {
            id: "dominios",
            title: {
              "pt-BR": "Registro de domínio",
              "en-US": "Domain registration",
            },
            navTitle: {
              "pt-BR": "Domínios",
              "en-US": "Domains",
            },
            blurb: {
              "pt-BR":
                "Antes de hospedar: .com, .com.br e outras extensões úteis.",
              "en-US":
                "Before hosting: .com, .com.br, and other useful extensions.",
            },
          },
          {
            id: "publicando",
            title: {
              "pt-BR": "Publicando nosso primeiro projeto",
              "en-US": "Publishing our first project",
            },
            navTitle: {
              "pt-BR": "Publicar",
              "en-US": "Publish",
            },
            blurb: {
              "pt-BR":
                "Duas formas de ir ao ar: hospedagem compartilhada ou servidor VPS.",
              "en-US":
                "Two ways to go live: shared hosting or a VPS server.",
            },
          },
          {
            id: "hospedagem-compartilhada",
            title: {
              "pt-BR": "Hospedagem compartilhada",
              "en-US": "Shared hosting",
            },
            navTitle: {
              "pt-BR": "Hospedagem compartilhada",
              "en-US": "Shared hosting",
            },
            blurb: {
              "pt-BR":
                "Painel, gerenciador de arquivos e o HTML no ar. O caminho certo para este módulo.",
              "en-US":
                "Panel, file manager, and HTML online. The right path for this module.",
            },
          },
          {
            id: "servidor-vps",
            title: {
              "pt-BR": "Servidor VPS",
              "en-US": "VPS server",
            },
            navTitle: {
              "pt-BR": "Servidor VPS",
              "en-US": "VPS server",
            },
            blurb: {
              "pt-BR":
                "VPS com Beway pela facilidade: até 3 sites grátis e certificado automático.",
              "en-US":
                "A VPS with Beway for ease: up to 3 free sites and an automatic certificate.",
            },
          },
        ],
      },
      {
        id: "sistema-real",
        number: "3",
        title: {
          "pt-BR": "Criando um sistema real",
          "en-US": "Building a real system",
        },
        blurb: {
          "pt-BR":
            "O site da Marina Alves deixa de ser folheto: catálogo, contato e dados que ela consegue atualizar.",
          "en-US":
            "Marina Alves’ site stops being a brochure: a catalog, contact, and data she can update.",
        },
        status: "available",
        pages: [
          {
            id: "do-folheto-ao-produto",
            title: {
              "pt-BR": "Do folheto ao produto",
              "en-US": "From brochure to product",
            },
            navTitle: {
              "pt-BR": "Do folheto ao produto",
              "en-US": "Brochure to product",
            },
            blurb: {
              "pt-BR":
                "O que falta para o site da corretora ser útil de verdade, não só bonito.",
              "en-US":
                "What the realtor site still needs to be useful, not only pretty.",
            },
          },
          {
            id: "catalogo-imoveis",
            title: {
              "pt-BR": "Catálogo e páginas de imóvel",
              "en-US": "Catalog and listing pages",
            },
            navTitle: {
              "pt-BR": "Catálogo de imóveis",
              "en-US": "Listing catalog",
            },
            blurb: {
              "pt-BR":
                "Sair da home com 3 cards e ter uma lista + uma página por imóvel.",
              "en-US":
                "Leave the 3-card homepage and get a list plus one page per listing.",
            },
          },
          {
            id: "formulario-contato",
            title: {
              "pt-BR": "Contato que chega na Marina",
              "en-US": "Contact that reaches Marina",
            },
            navTitle: {
              "pt-BR": "Formulário de contato",
              "en-US": "Contact form",
            },
            blurb: {
              "pt-BR":
                "Lead no WhatsApp (e e-mail de reserva) sem inventar um backend agora.",
              "en-US":
                "A WhatsApp lead (and an email fallback) without inventing a backend yet.",
            },
          },
          {
            id: "dados-separados",
            title: {
              "pt-BR": "Dados separados do HTML",
              "en-US": "Data apart from the HTML",
            },
            navTitle: {
              "pt-BR": "Dados em JSON",
              "en-US": "JSON data",
            },
            blurb: {
              "pt-BR":
                "Um JSON de imóveis para incluir um apto novo sem reescrever a home.",
              "en-US":
                "A listings JSON so a new apt does not mean rewriting the homepage.",
            },
          },
          {
            id: "republicar",
            title: {
              "pt-BR": "Republicar o sistema",
              "en-US": "Publish the system again",
            },
            navTitle: {
              "pt-BR": "Republicar",
              "en-US": "Publish again",
            },
            blurb: {
              "pt-BR":
                "O mesmo domínio, o site maior: compartilhada ou VPS com Beway.",
              "en-US":
                "Same domain, bigger site: shared hosting or a VPS with Beway.",
            },
          },
        ],
      },
      {
        id: "crescer",
        number: "4",
        title: {
          "pt-BR": "Quando o projeto começa a crescer",
          "en-US": "When the project starts to grow",
        },
        blurb: {
          "pt-BR":
            "Mais imóveis, mais arquivos: organizar o repo, registrar decisões e filtrar a lista.",
          "en-US":
            "More listings, more files: organize the repo, record decisions, and filter the list.",
        },
        status: "available",
        pages: [
          {
            id: "quando-html-aperta",
            title: {
              "pt-BR": "Quando o HTML estático aperta",
              "en-US": "When static HTML gets tight",
            },
            navTitle: {
              "pt-BR": "Quando o HTML aperta",
              "en-US": "When HTML gets tight",
            },
            blurb: {
              "pt-BR":
                "Sintomas de que a pasta da Marina cresceu: 12 imóveis, filtros, ela quer editar sozinha.",
              "en-US":
                "Signs Marina’s folder grew: 12 listings, filters, she wants to edit alone.",
            },
          },
          {
            id: "organizar-repositorio",
            title: {
              "pt-BR": "Organizar o repositório",
              "en-US": "Organize the repository",
            },
            navTitle: {
              "pt-BR": "Organizar o repo",
              "en-US": "Organize the repo",
            },
            blurb: {
              "pt-BR":
                "Pastas, README, .gitignore e commits que contam a história do site.",
              "en-US":
                "Folders, README, .gitignore, and commits that tell the site’s story.",
            },
          },
          {
            id: "registrar-decisoes",
            title: {
              "pt-BR": "Registrar decisões",
              "en-US": "Record decisions",
            },
            navTitle: {
              "pt-BR": "Registrar decisões",
              "en-US": "Record decisions",
            },
            blurb: {
              "pt-BR":
                "Anotar o porquê (JSON, sem framework, WhatsApp) antes de esquecer.",
              "en-US":
                "Write down the why (JSON, no framework, WhatsApp) before you forget.",
            },
          },
          {
            id: "filtros-proximo-degrau",
            title: {
              "pt-BR": "Filtros e o próximo degrau",
              "en-US": "Filters and the next step",
            },
            navTitle: {
              "pt-BR": "Filtros",
              "en-US": "Filters",
            },
            blurb: {
              "pt-BR":
                "Filtrar por bairro e preço no catálogo. Saber quando um painel entra.",
              "en-US":
                "Filter the catalog by neighborhood and price. Know when a panel is next.",
            },
          },
        ],
      },
      {
        id: "skills",
        number: "5",
        title: {
          "pt-BR": "Trabalhando com Skills",
          "en-US": "Working with Skills",
        },
        blurb: {
          "pt-BR":
            "Ensinar a IA o visual e as regras do site da Marina. Cadastrar estoque fica para o SDD.",
          "en-US":
            "Teach the AI Marina’s look and rules. Adding inventory waits for SDD.",
        },
        status: "available",
        pages: [
          {
            id: "o-que-e-skill",
            title: {
              "pt-BR": "O que é uma Skill",
              "en-US": "What a Skill is",
            },
            navTitle: {
              "pt-BR": "O que é uma Skill",
              "en-US": "What a Skill is",
            },
            blurb: {
              "pt-BR":
                "Instrução reutilizável, não um prompt gigante colado de novo.",
              "en-US":
                "A reusable instruction, not a giant prompt pasted again.",
            },
          },
          {
            id: "instalando-skills",
            title: {
              "pt-BR": "Instalando Skills no ambiente",
              "en-US": "Installing Skills in your environment",
            },
            navTitle: {
              "pt-BR": "Instalar Skills",
              "en-US": "Install Skills",
            },
            blurb: {
              "pt-BR":
                "Marketplace FreeSkills e onde a Skill do projeto da Marina vive.",
              "en-US":
                "The FreeSkills marketplace and where Marina’s project Skill lives.",
            },
          },
          {
            id: "usando-skill",
            title: {
              "pt-BR": "Usar uma Skill no site da Marina",
              "en-US": "Use a Skill on Marina’s site",
            },
            navTitle: {
              "pt-BR": "Usar uma Skill",
              "en-US": "Use a Skill",
            },
            blurb: {
              "pt-BR":
                "Pedir um ajuste visual com a Skill ligada. Sem cadastrar imóvel no JSON.",
              "en-US":
                "Ask for a visual tweak with the Skill on. No new listing in the JSON.",
            },
          },
          {
            id: "escrevendo-skill",
            title: {
              "pt-BR": "Escrever uma Skill pequena",
              "en-US": "Write a small Skill",
            },
            navTitle: {
              "pt-BR": "Escrever uma Skill",
              "en-US": "Write a Skill",
            },
            blurb: {
              "pt-BR":
                "Um SKILL.md com cores e proibições. Cadastro de imóvel não entra aqui.",
              "en-US":
                "A SKILL.md with colors and bans. Listing signup does not belong here.",
            },
          },
        ],
      },
      {
        id: "sdd",
        number: "6",
        title: {
          "pt-BR": "Specification Driven Development",
          "en-US": "Specification Driven Development",
        },
        blurb: {
          "pt-BR":
            "Especificar a área administrativa da Marina antes de a IA sair implementando.",
          "en-US":
            "Specify Marina’s admin area before the AI starts implementing.",
        },
        status: "available",
        pages: [
          {
            id: "o-que-e-sdd",
            title: {
              "pt-BR": "O que é SDD",
              "en-US": "What SDD is",
            },
            navTitle: { "pt-BR": "O que é SDD", "en-US": "What SDD is" },
            blurb: {
              "pt-BR":
                "Especificação viva primeiro. Código depois. O hábito que segura o produto.",
              "en-US":
                "Living spec first. Code second. The habit that holds the product.",
            },
          },
          {
            id: "instalando-sdd",
            title: {
              "pt-BR": "Instalando o plugin SDD",
              "en-US": "Installing the SDD plugin",
            },
            navTitle: {
              "pt-BR": "Instalar o SDD",
              "en-US": "Install SDD",
            },
            blurb: {
              "pt-BR":
                "Marketplace FreeSkills e /plugin install sdd@freeskills.",
              "en-US":
                "The FreeSkills marketplace and /plugin install sdd@freeskills.",
            },
          },
          {
            id: "dna-projeto",
            title: {
              "pt-BR": "DNA do projeto da corretora",
              "en-US": "Project DNA for the realtor",
            },
            navTitle: {
              "pt-BR": "DNA do projeto",
              "en-US": "Project DNA",
            },
            blurb: {
              "pt-BR":
                "Quem usa, o que o produto é (e o que não é) no site da Marina.",
              "en-US":
                "Who uses it, what the product is (and is not) on Marina’s site.",
            },
          },
          {
            id: "especificar-feature",
            title: {
              "pt-BR": "Especificar a área administrativa",
              "en-US": "Specify the admin area",
            },
            navTitle: {
              "pt-BR": "Especificar o admin",
              "en-US": "Specify the admin",
            },
            blurb: {
              "pt-BR":
                "Pronto para implementar: a Marina lista, cadastra, edita e remove imóveis.",
              "en-US":
                "Ready to implement: Marina lists, adds, edits, and removes listings.",
            },
          },
          {
            id: "implementar-da-spec",
            title: {
              "pt-BR": "Implementar a partir da spec",
              "en-US": "Implement from the spec",
            },
            navTitle: {
              "pt-BR": "Implementar da spec",
              "en-US": "Implement from spec",
            },
            blurb: {
              "pt-BR":
                "Uma fatia, revisão no navegador, Definition of Done. O guia fecha aqui.",
              "en-US":
                "One slice, browser review, Definition of Done. The guide ends here.",
            },
          },
        ],
      },
    ],
  };

  const script = document.querySelector('script[src*="guia.js"]');
  const guideRoot = script
    ? new URL(".", script.src)
    : new URL("./", window.location.href);
  const currentId = document.body.dataset.guidePage || "index";

  function locale() {
    return (
      window.FreeSkillsI18n?.current?.() ||
      document.documentElement.getAttribute("data-locale") ||
      "en-US"
    );
  }

  function t(key) {
    return window.FreeSkillsI18n?.t?.(key) || key;
  }

  function pick(value) {
    if (value && typeof value === "object") {
      return value[locale()] || value["en-US"] || value["pt-BR"] || "";
    }
    return value;
  }

  function url(path) {
    return new URL(path, guideRoot).href;
  }

  function moduleHref(mod) {
    return url(`${mod.id}/`);
  }

  function pageHref(mod, page) {
    return url(`${mod.id}/${page.id}/`);
  }

  function flatten() {
    const items = [{ id: "index", title: pick(GUIDE.title), href: url("./") }];
    for (const mod of GUIDE.modules) {
      if (mod.status !== "available") continue;
      items.push({
        id: mod.id,
        title: `${mod.number}. ${pick(mod.title)}`,
        href: moduleHref(mod),
      });
      for (const page of mod.pages) {
        items.push({
          id: `${mod.id}/${page.id}`,
          title: pick(page.title),
          href: pageHref(mod, page),
        });
      }
    }
    return items;
  }

  function renderNav(container) {
    const title = pick(GUIDE.title);
    const parts = [];
    parts.push(`<p class="guide-aside__label">${title}</p>`);
    parts.push(`<nav class="guide-toc" aria-label="${t("guide.toc")}">`);
    parts.push(
      `<a href="${url("./")}" class="${currentId === "index" ? "is-current" : ""}">${title}</a>`,
    );

    for (const mod of GUIDE.modules) {
      const moduleCurrent = currentId === mod.id;
      const moduleLabel = `${mod.number}. ${pick(mod.title)}`;

      if (mod.status !== "available") {
        parts.push(
          `<span class="guide-toc__soon guide-toc__module">${moduleLabel}</span>`,
        );
        continue;
      }

      parts.push(
        `<a class="guide-toc__module${moduleCurrent ? " is-current" : ""}" href="${moduleHref(mod)}">${moduleLabel}</a>`,
      );

      if (mod.pages.length) {
        parts.push(`<ol class="guide-toc__pages">`);
        for (const page of mod.pages) {
          const id = `${mod.id}/${page.id}`;
          const current = currentId === id ? " is-current" : "";
          parts.push(
            `<li><a class="${current.trim()}" href="${pageHref(mod, page)}">${pick(page.navTitle || page.title)}</a></li>`,
          );
        }
        parts.push(`</ol>`);
      }
    }

    parts.push(`</nav>`);
    container.innerHTML = parts.join("");
  }

  function renderPager(container) {
    const items = flatten();
    const index = items.findIndex((item) => item.id === currentId);
    if (index === -1) return;

    const prev = items[index - 1];
    const next = items[index + 1];
    const bits = [];

    if (prev) {
      bits.push(
        `<a class="guide-pager__link guide-pager__link--prev" href="${prev.href}"><span class="guide-pager__dir">${t("guide.prev")}</span><strong>${prev.title}</strong></a>`,
      );
    }
    if (next) {
      bits.push(
        `<a class="guide-pager__link guide-pager__link--next" href="${next.href}"><span class="guide-pager__dir">${t("guide.next")}</span><strong>${next.title}</strong></a>`,
      );
    }

    const currentModule = GUIDE.modules.find(
      (mod) => currentId === mod.id || currentId.startsWith(`${mod.id}/`),
    );
    if (
      currentModule &&
      currentId !== currentModule.id &&
      currentModule.status === "available"
    ) {
      bits.push(
        `<a class="guide-pager__index text-link" href="${moduleHref(currentModule)}">${t("guide.moduleIndex")} ${currentModule.number}. ${pick(currentModule.title)}</a>`,
      );
    }

    container.innerHTML = bits.join("");
  }

  function renderCatalog(container) {
    container.innerHTML = GUIDE.modules
      .map((mod) => {
        const label = `${mod.number}. ${pick(mod.title)}`;
        const status =
          mod.status === "available"
            ? `<span class="status status--live">${t("guide.available")}</span>`
            : `<span class="status status--soon">${t("guide.soon")}</span>`;
        const inner = `
 <div class="guide-module__top">
 <p class="plugin__id">${t("guide.module")} ${mod.number}</p>
 ${status}
 </div>
 <h2>${label}</h2>
 <p>${pick(mod.blurb)}</p>
 `;
        if (mod.status === "available") {
          return `<a class="guide-module" href="${moduleHref(mod)}">${inner}</a>`;
        }
        return `<article class="guide-module is-soon">${inner}</article>`;
      })
      .join("");
  }

  function renderLessons(container) {
    const mod = GUIDE.modules.find(
      (item) => item.id === currentId || currentId.startsWith(`${item.id}/`),
    );
    if (!mod || !mod.pages.length) return;
    container.innerHTML = mod.pages
      .map((page, i) => {
        const n = String(i + 1).padStart(2, "0");
        return `<li><a href="${pageHref(mod, page)}"><strong>${n}. ${pick(page.title)}</strong><span>${pick(page.blurb)}</span></a></li>`;
      })
      .join("");
  }

  function renderAll() {
    document.querySelectorAll("[data-guide-nav]").forEach(renderNav);
    document.querySelectorAll("[data-guide-pager]").forEach(renderPager);
    document.querySelectorAll("[data-guide-catalog]").forEach(renderCatalog);
    document.querySelectorAll("[data-guide-lessons]").forEach(renderLessons);
  }

  renderAll();
  document.documentElement.addEventListener("freeskills:locale", renderAll);
})();
