# Spike 3 scratch

Temporary. Static design spike: `docs/spikes/ui-ux/spike-3.html`, served with
`npx -y serve docs/spikes/ui-ux -l 4173`.

## Decisions

- Preact + htm + lucide + Tailwind, all CDN via import map. Picked for fewest lines to author, never bundle size.
- Paper column on an olive desk. Newsreader for names, IBM Plex Sans for tasks, Plex Mono for counts. Pine accent, brick only for remove.
- Signature: checking a task draws a wavy pen stroke across it.
- Capture is a floating button plus the `c` key, last list preselected.
- Removal asks in place with a confirm strip. No modal.
- The states board lives at the bottom of the same page, not behind a URL, and is built from the app's own components with a `force` prop so it cannot drift.

## Working

Filter, all/active/done, collapse, check off, add a task, new list, capture, remove with confirm.

## Faked

Drag grip, move between lists, list reorder.

## Pending

- Add-task focus ring clipped by the collapse wrapper's `overflow-hidden`.
- No gap between last row and add form, so the ring overlaps the row above.
- Focused input outline is louder than any real content.
- Reorder and move between lists: undesigned.
- Rename a task and a list: undesigned. Added to Required 2 Aug 2026.
- States board: not built. Pairs first, singles after.
- Done view still shows "N open" on list headers.
- Narrow layout never seen; the window will not resize below 1536px here.

## Settled

- Reorder is drag and drop, for tasks and for lists.

## Never

- No move-up / move-down controls. Ever.

## Open

- Where the list header's grip goes. The right side currently holds the count.
