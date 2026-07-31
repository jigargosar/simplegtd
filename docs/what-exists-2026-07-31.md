# What exists — 31 Jul 2026

Facts read from source only.

Files read so far: `types.ts`, `store.ts`, `tasks.ts`, `sections.ts`.
Not yet read: `App.tsx`, `AddSection.tsx`, `Capture.tsx`, `drafts.ts`, `Filters.tsx`,
`global.css`, `keys.ts`, `main.tsx`, `MoveTask.tsx`, `Reorder.tsx`, `SectionHeader.tsx`,
`SectionView.tsx`, `seed.ts`, `TaskRow.tsx`, `TaskTitle.tsx`, `Undo.tsx`.

## Data shape

- A section holds: id, title, order, collapsed. `types.ts:5`
- A task holds: id, sectionId, title, done, order. `types.ts:12`
- Tasks are one flat array. Each task carries its own sectionId. `types.ts:23`
- Filter is one of: all, active, done. `types.ts:20`
- State also holds the search query and per-field drafts. `types.ts:22`

## Storage

- Everything lives in localStorage under the key `simplegtd/v1`. `store.ts:5`
- Every change writes the whole state out immediately. `store.ts:26`
- First run, or unreadable data, falls back to seed data. `store.ts:10`
- No server and no sync. One browser, one device.

## Sections

- Add a section. Title is trimmed, empty is ignored. `sections.ts:13`
- New sections go last. `sections.ts:17`
- Rename a section. Empty is ignored. `sections.ts:33`
- Move a section up or down, one place at a time. `sections.ts:40`
- Collapse or expand a section. `sections.ts:73`
- Delete a section. Its tasks go with it. `sections.ts:55`
- Deleting hands back an undo that restores the section and its tasks. `sections.ts:65`

## Tasks

- Add a task to a section. It goes last. `tasks.ts:35`
- Tick a task done, or untick it. `tasks.ts:50`
- Rename a task. Empty is ignored. `tasks.ts:55`
- Move a task up or down within its section, one place at a time. `tasks.ts:62`
- Move a task to another section. It lands last there. `tasks.ts:79`
- Delete a task. Deleting hands back an undo that puts it back. `tasks.ts:88`

## Ordering

- Order is a fractional-index string, not a number. `tasks.ts:45`
- Moving one item rewrites only that item's key. `tasks.ts:75`

## Filter and search

- Filter and search apply together, inside each section. `tasks.ts:5`
- Search matches anywhere in the task title, ignoring case. `tasks.ts:12`
- A total match count across all sections is available. `tasks.ts:18`

## Absent from these four files

- No due dates, tags, notes, subtasks, projects, or archive.
- No drag and drop. Reordering is one step at a time.
- No multi-select.
