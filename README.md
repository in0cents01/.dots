# .dots — portfolio

> `~/portfolio` — the personal site of **alexmorgan**, a software engineer working on
> distributed systems, developer tooling, and clean UI.

A single-page portfolio with a terminal aesthetic: hero prompt, about, selected
projects, and contact — built with React, Vite, and Tailwind CSS v4.

---

## Features

- Terminal-inspired hero with animated prompt and window chrome
- Scroll-spy navigation (`about` / `projects` / `contact`) via `IntersectionObserver`
- Project cards with status badges (`live`, `wip`, `archived`) and featured highlighting
- Copy-to-clipboard email button
- Responsive layout, monospace-driven typography, grid backdrop
- Zero backend — static build, deploys anywhere

## Tech Stack

| Layer      | Choice                          |
| ---------- | ------------------------------- |
| UI         | React 19 + TypeScript 5.7       |
| Build      | Vite 8                          |
| Styling    | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Formatting | oxfmt                           |
| Toolchain  | Node 22, pnpm 10 (via `mise`)   |

## Getting Started

Requires Node 22 and pnpm 10. If you use [mise](https://mise.jdx.dev), run:

```sh
mise install
```

Then:

```sh
pnpm install
pnpm dev
```

The dev server runs on port `8443` by default (override with `PORT`). When the
project is opened in Figma Make, the preview server is already running — no manual
start needed.

## Scripts

| Command          | Description                          |
| ---------------- | ------------------------------------ |
| `pnpm dev`       | Start the dev server                 |
| `pnpm build`     | Build for production (`./dist`)      |
| `pnpm preview`   | Preview the production build         |
| `pnpm format`    | Format the codebase with oxfmt       |

## Project Structure

```
src/
  main.tsx      # React entrypoint (mounts App into #root)
  App.tsx       # All sections + content data (projects, nav)
  index.css     # Tailwind import, fonts, global theme
  vite-env.d.ts # Vite client types
index.html      # Vite HTML shell
vite.config.ts  # Vite + React + Tailwind + Figma Make plugins
```

## Customizing

- **Projects** — edit the `projects` array in `src/App.tsx` (`name`, `type`,
  `description`, `tags`, `status`, optional `featured`).
- **Contact / socials** — update the email and links in the contact section of
  `src/App.tsx`.
- **Theme** — colors, fonts, and spacing live in `src/index.css` (Tailwind v4
  `@theme`).

## Deployment

- **Figma Make** — the app is served from Make's own origin; `vite.config.ts`
  reads `FIGMA_PUBLIC_URL` to set the asset base.
- **GitHub Pages** — project sites are served from a repo subpath, so the build
  falls back to relative asset paths (`base: "./"`).

---

© 2026 alexmorgan — built with care, not frameworks-of-the-week.
