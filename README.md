# FreeSkills

Public website for the [FreeSkills marketplace](https://github.com/freeskills/marketplace) — install the marketplace, install plugins, and keep them updated on **Cursor**, **Claude Code**, and **Codex**.

**Repo:** [freeskills/freeskills](https://github.com/freeskills/freeskills)  
**Marketplace:** [freeskills/marketplace](https://github.com/freeskills/marketplace)

## Local preview

Open `index.html` in a browser, or serve the folder:

```bash
npx --yes serve .
```

## GitHub Pages

1. Push this repository to `freeskills/freeskills`.
2. GitHub → **Settings** → **Pages**.
3. Source: **Deploy from a branch**.
4. Branch: `main` / folder: `/ (root)`.
5. Site URL will be `https://freeskills.github.io/freeskills/` (or your custom domain).

If the site is published under a project path (`/freeskills/`), asset paths in this repo already use relative URLs (`styles.css`, `app.js`) so they work without a base-href change.

## Contents

| Path | Purpose |
|------|---------|
| `index.html` | Landing page — install / update |
| `plugins/index.html` | Plugin catalog |
| `plugins/sdd/index.html` | SDD plugin details |
| `styles.css` | Design system & layout |
| `app.js` | Copy buttons, tool tabs, sticky header |

## Related

Plugin catalog and install manifests live in [`freeskills/marketplace`](https://github.com/freeskills/marketplace).
