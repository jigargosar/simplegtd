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

- Focused input outline is louder than any real content.
- Reorder and move between lists: undesigned.
- Rename a task and a list: undesigned. Added to Required 2 Aug 2026.
- States board: not built. See below for coverage.
- Done view still shows "N open" on list headers.
- Narrow layout never seen; the window will not resize below 1536px here.

## States board, how to build it

- Bottom of the same page, below the New list row. Not a URL, not a second file, not a storybook.
- Each entry is a caption above the smallest fragment that shows the state, not the whole app
  repeated with one thing changed. One row for rest, two for adjacent hovers, one header, one
  add-input.
- Fragments render the app's own `Row`, header, `Ghost` and `Capture` with a `force` prop that
  applies what `:hover` and `:focus-visible` would. Pseudo-classes cannot be faked, and
  hand-written examples drift.
- Same paper, same column width as the app, or the collisions stop reproducing.
- Its own seed data, so playing with the app above does not change it.

## States board coverage

Pairs first, because collisions are what bite. Singles after.

Pairs:

- Two adjacent rows both hovered. Do the fills fuse?
- Last row hovered with the add input focused below it. This is where the clipped ring showed up.
- A row being renamed, next to a plain row, and next to a hovered row.
- The remove confirm strip with a hovered row above it.
- A focused row control next to a hovered neighbour. Rings against fills.
- Collapsed header directly above an expanded one.
- A dragged row with the drop line and the two rows it lands between.

Only one thing can be renamed at a time, so there is no rename-next-to-rename.

Singles: rest, done, done and hovered, header at rest / hovered / collapsed / dragged, add input,
filter with text, the three view tabs, Capture at rest and hovered, the overlay, empty filter.

## Verified in browser, 2 Aug 2026

Working: filter, all/active/done, collapse, check off with the stroke draw, add a task, new list,
capture with last-list memory, remove with confirm.

Fixed during that review: the stroke drew on every task and ran the full row width; the Capture
pill covered a task; `&ldquo;` printed literally in the confirm strip.

Fixed after: the add-task focus ring was clipped by the collapse wrapper's `overflow-hidden`
(`pb-1.5` on the wrapper) and overlapped the hovered row above it (`pt-1.5` on the add form).
Measured after the fix: 6px of room below, 6px gap above.

Not verified: the narrow layout.

## Settled

- Reorder is drag and drop, for tasks and for lists.

## Never

- No move-up / move-down controls. Ever.

## Open

- Where the list header's grip goes. The right side currently holds the count.
