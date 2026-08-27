# COT AI 產品專員 Agent — 總結報告

Interactive summary report for the **COT AI Product Specialist Agent** (MVP, PRD v3.2):
architecture, engineering guardrails, the learning loop, and the PRD mapping — told as a
scroll story around one real ticket.

**Live site:** https://ryvn-dev.github.io/cot-pm-agent-report/

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

## Deploy

Pushing to `main` triggers the GitHub Actions workflow in
`.github/workflows/deploy.yml`, which builds the export and publishes it to GitHub
Pages. In a fork, enable it once under **Settings → Pages → Source: GitHub Actions**.

## Stack

Next.js (static export) · React · [motion](https://motion.dev) for the scroll
choreography · [Recharts](https://recharts.org) · [Lenis](https://lenis.darkroom.engineering)
smooth scroll · Noto Serif/Sans TC + Jost via `next/font`, LXGW WenKai TC as the
accent voice.
