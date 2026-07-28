# CLAUDE.md

SimpleGTD is a calm task board that holds everything you mean to do, so your mind
doesn't have to. It stays quiet and out of the way — the doing happens out in the
world, not here. A centered, narrow column with wide gutters: a single document,
not a multi-column board.

## Spec

What exists today was built from `docs/simplegtd_spec_v3_004.md`, copied here
from `../gtd-archive/simple-gtd-3`. It is not the whole picture — three sibling
projects in that archive hold decisions it never captured, and two of its own
sections are still placeholders. `docs/spec.md` is where the rest gets gathered.

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
