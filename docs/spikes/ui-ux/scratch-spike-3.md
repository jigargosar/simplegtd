# Spike 3 scratch

Temporary. Static design spike: `docs/spikes/ui-ux/spike-3.html`, served with
`npx -y serve docs/spikes/ui-ux -l 4173`.

## Pending (rough priority)

From a design critique pass, 9 Aug 2026:

- Grip (drag handle) sits trailing, between the task text and the X remove button. Move it to
  the leading edge — trailing puts it right next to a destructive action, a mis-hit risk once
  drag is wired up.
- Check `--color-soft` contrast on `paper`. It's used for placeholder text and icon-only
  affordances; most likely token to fail AA once the accessibility pass happens.
- No defined type scale. Colors and fonts are tokenized in `@theme`, but font sizes are seven
  one-off arbitrary values (`text-[11px/13px/14px/15px/19px/21px/23px]`) scattered across the
  file instead of a reusable set.

## Open

- Drag-and-drop is mocked (grip icon, grab cursor, drop-line/lifted/ghost states in the Board
  gallery) but not wired up. Intentional for this spike; real dnd, and a keyboard path for it,
  come later.
- Two different hover-reveal idioms for drag handles: the list header replaces the "N open"
  count with the grip in the same slot; a task row appends the grip beside the X instead.
  Possibly fine (different available space) but worth a deliberate check, not decided yet.
- Voice mismatch between the two "add a task" entry points: Capture's placeholder is
  "What do you mean to do?" (matches the app's own mission language); the inline ghost row says
  the generic "Add a task". Undecided whether the ghost row should match Capture's voice, or
  stay quieter since it's the secondary entry point.
- Done view shows "N open" on list headers. The count is accurate, not wrong, but is it the
  right label for that view? Decision postponed.
- Pre-existing bug, not caused by this pass: pressing Enter to submit a rename throws
  `Cannot read properties of null (reading 'value')` in the console (Edit's `onBlur` fires a
  second time against the now-unmounted input). Harmless — the rename still commits — but the
  console isn't clean. Not fixed yet.

## Done

Filter, all/active/done, collapse, check off with the stroke draw, add a task, new list,
capture with last-list memory, remove with confirm, rename a task, rename a list, states board
(9 cases, no console errors).

Focused input outline gap (`outline-offset` 2→4, row gap 0.5→1.5); list header hover now fills
the full row (chevron to grip) instead of just the name; filter input got a clear (x) button;
task text and the remove-confirm question now truncate with an ellipsis instead of wrapping;
remove-confirm strip height now matches a normal row; filter placeholder/label changed from
"Filter tasks" to "Filter"; "New list" input now matches a real list header's shape (rounded-lg,
same padding) instead of a task-row shape; checkbox and chevron (and the right-side items) now
align between rows and headers.

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

## Verified in browser, 8 Aug 2026

Checked all 10 items from the "Pending" list above via Playwright screenshots: focus-ring gap,
header full-row hover, filter clear button, truncation (typed a long task name, confirmed
single-line ellipsis, no wrap), remove-confirm strip height against a normal row, "Filter"
label, "New list" input shape against a real header, checkbox/chevron alignment. All look right.

Found in passing, not fixed (see "Open"): a console error on rename-via-Enter, pre-existing.
