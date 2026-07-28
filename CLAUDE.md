# CLAUDE.md

SimpleGTD is a calm task board that holds everything you mean to do, so your mind
doesn't have to. It stays quiet and out of the way — the doing happens out in the
world, not here. A centered, narrow column with wide gutters: a single document,
not a multi-column board.

This is a revival of Jigar's 2008 Rails app that went live. The name never takes
a suffix.

## The deal

Jigar reads and writes no project documents. No spec, no ADR, no board, no diffs
to review. He looks at the running app or a screenshot and points at what's
wrong. Do not ask him to review anything written.

This file and `docs/spec.md` are the only prose in the repo, and both are for
you, not him.

## Hard constraints

1. **No source file over ~200 lines.** The previous attempt died carrying a
   983-line `App.tsx`. Split before you exceed it, not after.
2. **Normal-sized controls.** A prior prototype had oversized buttons; he hated it.
3. **Keyboard shortcuts stay out of the way.** Another prototype was blanketed in
   them. Casual use must be clean; power users get them without being shown them.

## Commands

```sh
pnpm dev          # dev server
pnpm build        # production build
pnpm typecheck    # tsc --noEmit
```

## Stack

React 19, TypeScript, Vite, Tailwind v4, pnpm. `fractional-indexing` for order
keys, `lucide-react` for icons. Store is a plain module with
`useSyncExternalStore` — no state library until one is actually needed.
