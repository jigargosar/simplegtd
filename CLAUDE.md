# CLAUDE.md

- SimpleGTD is a calm task board that holds everything you mean to do, so your mind
  doesn't have to.
- It stays quiet and out of the way — the doing happens out in the
  world, not here.
- A centered, narrow column with wide gutters: a single document, not a multi-column board.

## Spec

- `docs/spec.md` — what SimpleGTD should do. Put `[x]` on a line when it is done.
- `docs/what-exists-2026-07-31.md` — facts read from the source on that date.

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

## History

- Countless hours have been spent on this project (Beyond current repo)

## How to Finish this project

- Finish needs to be defined
- Features + deployment

## Next Steps

- Check the spec against the running app.
- Tick what is already true.
