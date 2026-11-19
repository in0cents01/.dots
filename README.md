# Portfolio

Personal portfolio of alexmorgan, a software engineer working on distributed systems, developer tooling, and clean UI.

## Tech Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4
- oxfmt

## Getting Started

Requires Node 22 and pnpm 10 (see `.mise.toml`).

```sh
pnpm install
pnpm dev
```

The dev server runs on port `8443` by default.

## Scripts

| Command         | Description        |
| --------------- | ------------------ |
| `pnpm dev`      | Start dev server   |
| `pnpm build`    | Build for production |
| `pnpm preview`  | Preview production build |
| `pnpm format`   | Format with oxfmt  |

## Structure

```
src/
  main.tsx    # React entrypoint
  App.tsx     # Application shell
  index.css   # Global styles / Tailwind import
  vite-env.d.ts
index.html    # Vite HTML shell
vite.config.ts
```
