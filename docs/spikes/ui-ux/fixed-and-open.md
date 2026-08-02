# Fixed and open

- What the next spike must build, and what's left for it to design.
- Implementation and UX for everything in Required is open
- The next spike is a static design, not a functional build.
- Use the `frontend-design` and `frontend-baseline` skills.
- The deliverable is single HTML file
- Try to use libraries from cdn. Instead of hardcoded HTML, data+loops can be much cheeper. The objective being less code to author and review, never bundle size.
- `npx -y serve ...` should be used to serve single HTML file for review.

## Required

- The app has a name, shown somewhere persistent.
- Tasks can be filtered by typed text.
- Tasks can be viewed by state: all, active, done.
- A task can be captured quickly from anywhere; it gets assigned to a list, and the last list used is remembered.
- Each list has a name.
- A task can be renamed. A list can be renamed.
- A list can be collapsed shut.
- A task can be marked done, and done tasks are visually distinguished from active ones.
- A task can be removed; removal is not instant or accidental, it carries some resistance.
- A new list can be created.
- Lists render as a single narrow column, stacked, not side by side.
- A task can be added directly into a list while viewing that list.
- A task can be reordered within a list and moved between lists. Lists themselves can be reordered.

## Not doing

- Due dates, tags, notes, subtasks, projects, archiving.
- Multi-select and bulk actions.
- Export.
- Account, sync, sharing.
- Undo.
- Full draft persistence.
- Full keyboard support.
