# Frontend

## Home

- A home (`index.html`) é focada no Cortex: o hero reutiliza o mesmo bloco visual (`cortex-hero` / `cortex-window`) da página dedicada, com CTA primário para `cortex/#install`.
- Abaixo do hero, uma seção condensada de recursos do Cortex (3 destaques) linka para `cortex/#features`.
- O marketplace aparece só como **chamada** (uma seção curta com CTA "Abrir o marketplace" → `plugins/`); nenhum passo de instalação/atualização do marketplace vive na home — todo esse conteúdo mora em `plugins/index.html`.
- A navegação do topo é: Cortex → Marketplace (`plugins/`) → Guia para Iniciantes.

## Navegação do header

- O header é **idêntico em todas as páginas do site** (home, Cortex, marketplace, guia): mesmos 3 itens — Cortex, Marketplace, Guia para Iniciantes — cada um um dropdown (`.navgroup`), nunca links soltos que aparecem/desaparecem por página.
- Cada dropdown tem "Overview" como primeiro item, apontando para a raiz daquela seção, e depois os destinos internos (ex.: Cortex → Features, Install; Marketplace → Install, Catalog, Update; Guia → os 6 módulos).
- A seção/item atual é marcado com `aria-current="page"` no botão do dropdown (e, no caso do Guia, no módulo específico).
- No mobile (≤900px) o header mostra um botão hambúrguer (`.menu-toggle`) que abre o `.topnav` como painel vertical; os dropdowns viram acordeões dentro dele.
- Para adicionar uma página nova a uma dessas seções, só editar o gerador de nav — não copiar/colar o header manualmente em cada arquivo.

## Marketplace

- `plugins/index.html` é a página dedicada do marketplace: banner, passo 1 (instalar marketplace, com `tool-switch`/`panels` por ferramenta), passo 2 (catálogo de plugins), passo 3 (atualizar), tudo em uma página só, com âncoras `#install` e `#update`.
- Qualquer link para "instalar o marketplace" ou "atualizar" em outras páginas do site (guia, páginas de plugin) deve apontar para `plugins/#install` / `plugins/#update`, nunca para a home.

## Cortex

- A página pública fica em `cortex/` e mantém o seletor de idioma pt-BR / en-US do site.
- A prévia do ambiente de trabalho é uma ilustração HTML/CSS, identificada como ilustrativa; não representa uma captura real do aplicativo.
- A apresentação usa o sistema tipográfico existente (Bricolage Grotesque, Source Sans 3 e IBM Plex Mono), com verde floresta, lima e coral como acentos.
- Recursos ficam em uma grade editorial sem cartões aninhados. O hero e a prévia se empilham em telas menores.
- O instalador oferece Linux x86_64, macOS e Windows PowerShell; no Windows, mantém instalação, PATH e registro no escopo do usuário, sem exigir administrador.
- O seletor de instalação detecta a plataforma pelo User-Agent Client Hints ou pelas propriedades tradicionais do navegador; a seleção continua manualmente alternável.
- O botão flutuante de doação usa texto localizado e aciona diretamente o checkout/overlay oficial do SDK PayPal; o CTA permanece desabilitado até o SDK ficar pronto.