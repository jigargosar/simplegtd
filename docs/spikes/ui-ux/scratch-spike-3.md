# Spike 3 scratch

Temporary. Static design spike: `docs/spikes/ui-ux/spike-3.html`, served with
`npx -y serve docs/spikes/ui-ux -l 4173`.

## Pending (rough priority)

- Focused input outline is louder than any real content.
- Drag is drawn, not live: no pointer handling, no drop targets, no cross-list move.
- Done view still shows "N open" on list headers.
- Narrow layout never seen; the window will not resize below 1536px here.

## Done

Filter, all/active/done, collapse, check off with the stroke draw, add a task, new list,
capture with last-list memory, remove with confirm, rename a task, rename a list, states board
(9 cases, no console errors).

## Things you can't tell just by looking

- CDN libraries (Preact, htm, lucide, Tailwind), chosen to write less code. Not chosen for
  speed or file size.
- Only one task or list can be renamed at a time; starting a new rename cancels the old one.
- Capture remembers the last list you added to and preselects it next time.

## Verified in browser, 2 Aug 2026

Fixed: the stroke drew on every task and ran the full row width; the Capture pill covered a task;
`&ldquo;` printed literally in the confirm strip; the add-task focus ring was clipped and
overlapped the hovered row above it.

Fixed, second pass: the lifted row read as a hover (now tilt plus deep shadow), the remove button
showed on a row being dragged, the header's hover fill stretched full width like an empty input
(now hugs the name).

Not verified: the narrow layout.
