# FreeSkills

Public website for the [FreeSkills marketplace](https://github.com/freeskills/marketplace) — install the marketplace, install plugins, and keep them updated on **Cursor**, **Claude Code**, and **Codex**.

**Site:** [https://freeskills.github.io](https://freeskills.github.io)  
**Repo:** [freeskills/freeskills.github.io](https://github.com/freeskills/freeskills.github.io)  
**Marketplace:** [freeskills/marketplace](https://github.com/freeskills/marketplace)

## Local preview

Open `index.html` in a browser, or serve the folder:

```bash
npx --yes serve .
```

## GitHub Pages (org root)

GitHub only serves `https://freeskills.github.io` from a repository named **`freeskills.github.io`**.

1. If this code still lives in `freeskills/freeskills`, rename the repo to `freeskills.github.io` (GitHub → Settings → General → Repository name).
2. Settings → **Pages** → Deploy from branch → `main` / `/ (root)`.
3. The site will be at **https://freeskills.github.io** (not `/freeskills/`).

Asset paths are relative, so they work at the domain root.

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
