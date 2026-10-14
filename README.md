# FreeSkills

Public website for the [FreeSkills marketplace](https://github.com/freeskills/marketplace). Install the marketplace, install plugins, and keep them updated on **Cursor**, **Claude Code**, and **Codex**.

**Site:** [https://freeskills.github.io](https://freeskills.github.io)
**Repo:** [freeskills/freeskills.github.io](https://github.com/freeskills/freeskills.github.io)
**Marketplace:** [freeskills/marketplace](https://github.com/freeskills/marketplace)

## Local preview

Open `index.html` in a browser, or serve the folder:

```bash
npx --yes serve .
```

## Language

The site is bilingual (**pt-BR** / **en-US**). A PT | EN control sits in the header on every page.

- Until you click the toggle, the default follows the browser language (`navigator.languages`: Portuguese → pt-BR, otherwise English → en-US).
- After you click, the choice is stored in `localStorage` under `freeskills-lang` and reused on the next visit.

## GitHub Pages (org root)

GitHub only serves `https://freeskills.github.io` from a repository named **`freeskills.github.io`**.

1. If this code still lives in `freeskills/freeskills`, rename the repo to `freeskills.github.io` (GitHub → Settings → General → Repository name).
2. Settings → **Pages** → Deploy from branch → `main` / `/ (root)`.
3. The site will be at **https://freeskills.github.io** (not `/freeskills/`).

Asset paths are relative, so they work at the domain root.

## Contents

| Path                     | Purpose                                                        |
| ------------------------ | -------------------------------------------------------------- |
| `index.html`             | Landing page: install / update                                 |
| `cortex/index.html`      | Cortex desktop app features and installation                   |
| `cortex.sh`              | Cortex Linux/macOS installer                                    |
| `cortex.ps1`             | Cortex Windows installer                                        |
| `plugins/index.html`     | Plugin catalog                                                 |
| `plugins/sdd/index.html` | SDD plugin details                                             |
| `i18n.js`                | Language toggle (pt-BR / en-US), localStorage, browser default |
| `guia/`                  | Beginner guide: modules and lessons                            |
| `guia/guia.js`           | Guide structure, sidebar, prev/next                            |
| `styles.css`             | Design system & layout                                         |
| `app.js`                 | Copy buttons, tool tabs, sticky header                         |

## Beginner guide

The **Guia para Iniciantes** / **Beginner's Guide** lives under `guia/`. The site language toggle (PT / EN) applies here too. Module structure, sidebar, lesson lists, and previous/next links are generated from `guia/guia.js`.

- Add a **module**: append an object to `GUIDE.modules`, then create `guia/<id>/index.html` and one folder per lesson. Set `data-guide-page="<id>"` on the module index.
- Add a **lesson**: push a page into that module’s `pages` array and create `guia/<module-id>/<page-id>/index.html` with `data-guide-page="<module-id>/<page-id>"`.

All six modules are published (`comecando` through `sdd`). The through-line is a realtor site (Marina Alves Corretora). Add a module or lesson in `guia/guia.js`, then create the matching `index.html`.

## Related

Plugin catalog and install manifests live in [`freeskills/marketplace`](https://github.com/freeskills/marketplace).
