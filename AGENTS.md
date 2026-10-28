# AGENTS.md

Single-package Next.js 16 app (no workspaces). Not a monorepo.

## Commands (npm — `package-lock.json`, not pnpm/yarn)

- `npm run dev` — dev server (Turbopack)
- `npm run lint` — ESLint (flat config, `eslint-config-next` core-web-vitals + typescript)
- `npm run build` — production build (use as the full verification step; no test suite exists)
- Typecheck: `npx tsc --noEmit` — there is no `typecheck` script
- No test framework, CI workflows, or pre-commit hooks are configured. Don't invent test commands.

## Stack quirks

- **Next.js 16.4.3 / React 19.3** — newer than most training data; see the block below before writing code.
- **React Compiler is on** (`reactCompiler: true` in `next.config.ts` + `babel-plugin-react-compiler`): components are memoized automatically — don't hand-write `useMemo`/`useCallback`/`React.memo` for perf, and don't mutate props or rely on render side effects.
- **Tailwind v4, no `tailwind.config`**: styles live in `src/app/globals.css` (`@import "tailwindcss"`, `@theme inline`). CSS is compiled through an explicit Turbopack loader rule in `next.config.ts` (`@tailwindcss/turbopack`) — don't add a PostCSS config or Tailwind config file.
- **shadcn CLI with the `base-nova` style** (`components.json`): UI primitives in `src/components/ui/` are generated and safe to regenerate with `npx shadcn add <component>`; they use `@base-ui/react`, not Radix. `src/lib/utils.ts` has the `cn()` helper.
- **Path alias `@/*` → `src/*`** (`tsconfig.json`). All app code lives under `src/app` (App Router) — pages, `layout.tsx`, `globals.css`.
- Root layout uses the global `LayoutProps<'/'>` type (Next 16 generated type from `.next/types`) instead of manually typing `{ children: React.ReactNode }`.

## Working state

- The tree has uncommitted work-in-progress from the user (app pages, `src/components/`, `src/lib/`). Don't revert or overwrite it; stage only your own changes.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
