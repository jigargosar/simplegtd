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
- Newsreader for display type, IBM Plex Sans for body, IBM Plex Mono for meta. All via `@fontsource`.
- Store is a plain module with `useSyncExternalStore`
- Reordering is native HTML5 drag and drop in `src/Dnd.ts`. No library. Desktop pointers only.

## Spike rules

- Inside `docs/`, you may open only two files: `docs/spikes/ui-ux/fixed-and-open.md`, which is
  the brief, and the spike file you are currently building. Anything else under `docs/` needs
  asking first, granted per file.
- A file being named in this file, in another doc, or in conversation is not permission to open
  it. A mention is not access.
- Each spike is a fresh look. Do not read earlier spikes, do not carry their decisions across.
- Cheaper and smaller mean fewer lines to author and review. Never bundle size, never runtime.
- Serve the spike, open it in a browser, screenshot it, and critique it yourself before showing Jigar.
- Working notes for the spike in progress live in `docs/spikes/ui-ux/scratch-spike-3.md`.
- Semantic HTML and aria are postponed for the current spike, not dropped entirely.
- Concluded 2026-08-10. Spike 3 was ported into `src/` and is live. Nothing above describes work
  in progress. It is kept as a record of how the spike was run.
- The `docs/` fence is not lifted. It still binds. Opening anything under `docs/` beyond the two
  named files needs asking first, granted per file, spike or no spike.

## Known gaps

- Drag uses the native HTML5 API, which is mouse-only in practice, so touch is likely dead.
  Untested on a touch device. Supporting it means switching to pointer events.
- Pointer drag works but is rough. Jigar tested it on 2026-08-10. What feels off is not yet
  pinned down.


## Next Steps

- Critical that we finish and deploy product before 11:45am
- Met 2026-08-10 at 08:57. Kept as a record. No successor set.