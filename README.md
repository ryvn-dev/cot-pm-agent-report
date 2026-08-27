# COT AI 產品專員 Agent — 總結報告

Interactive summary report for the **COT AI Product Specialist Agent** (MVP, PRD v3.2):
architecture, engineering guardrails, the learning loop, and the PRD mapping — told as a
scroll story around one real ticket.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build

```bash
npm run build      # static export → out/
```

The export is fully static with relative asset paths — serve `out/` with any static
server (`python3 -m http.server`, `npx serve`, GitHub Pages, …). Opening `index.html`
directly via `file://` will not work: browsers block ES-module scripts from a null
origin, so the page renders but never hydrates.

## Deploy your fork

This repo hosts the source only — it does not deploy itself. To publish your fork on
GitHub Pages:

1. Fork, then enable workflows under the **Actions** tab.
2. **Settings → Pages → Source: GitHub Actions.**
3. Run the **Deploy to GitHub Pages** workflow from the Actions tab (it is
   manual-trigger; add a `push: branches: [main]` trigger in
   `.github/workflows/deploy.yml` if you want it on every push).

Vercel is even simpler: import the forked repo and deploy — it detects Next.js and
needs no configuration. Any other static host works too: `npm run build`, publish
`out/`.

## Stack

Next.js (static export) · React · [motion](https://motion.dev) for the scroll
choreography · [Recharts](https://recharts.org) · [Lenis](https://lenis.darkroom.engineering)
smooth scroll · Noto Serif/Sans TC + Jost via `next/font`, LXGW WenKai TC as the
accent voice.
