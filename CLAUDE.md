# CLAUDE.md

- NEVER EVER USE ANY TOOLS, WITHOUT A EXPLICIT PERMISSION FROM ME. 
- THIS RULE LASTS FOR ENTIRE CONVERSATION AND ACROSS EVERY REQUEST RESPONSE CYCLE.
- WHEN YOUR THINKING IS IN DOUBT, IMMEDIATELY DEFAULT TO TAKING EXPLICIT PERMISSION.

## SimpleGTD

- SimpleGTD is a calm task board that holds everything you mean to do, so your mind
  doesn't have to.
- It stays quiet and out of the way — the doing happens out in the
  world, not here.
- A centered, narrow column with wide gutters: a single document, not a multi-column board.

## Source of truth

- Only the code is the source of truth. No spec doc, no docs/ file describes
  intended behavior.
- Done is decided by reading the code, never from memory, a report, or a doc.

## Commands

```sh
pnpm dev          # dev server
pnpm build        # production build
pnpm typecheck    # tsc --noEmit
```

## Deployment

- Live at https://jigargosar.github.io/simplegtd/
- Every push to `main` builds and deploys through `.github/workflows/deploy.yml`.

## Current Stack

- React 19, TypeScript, Vite, Tailwind v4, pnpm.
- `fractional-indexing` for effective ordering
- `lucide-react` for icons.
- Store is a plain module with `useSyncExternalStore`

## Next Steps

- See `docs/scratch-or-not.md` for active decisions.
- See `docs/spikes/ui-ux/fixed-and-open.md` for what the next UI spike must build and what's open.
