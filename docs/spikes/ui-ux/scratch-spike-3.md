# Spike 3 scratch

Temporary. Static design spike: `docs/spikes/ui-ux/spike-3.html`, served with
`npx -y serve docs/spikes/ui-ux -l 4173`.

## Pending (rough priority)

- Focused input outline: almost no gap between the ring and the content, even between two rows.
- List header hover: only the name gets the fill; doesn't cover the full row the way a task row
  does. Hovering either the name or the count/grip area should trigger the same full-row fill.
- Filter input has no clear (x) button.
- Every text node should truncate with an ellipsis instead of wrapping/overflowing.
- All hover states should be consistent.
- Layout shifts when clicking delete: the confirm strip has a different height than the row.
- "Filter tasks" is a misnomer: it searches everything, not just tasks.
- Hovering on different items shows inconsistent hover widths.
- All inputs (edit mode) must match the size of their non-input (display) view, so entering/
  leaving edit doesn't shift the layout.
- Checkbox and chevron (and the right-side items) don't align between rows and headers.

## Open

- Done view shows "N open" on list headers. The count is accurate, not wrong, but is it the
  right label for that view? Decision postponed.

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
