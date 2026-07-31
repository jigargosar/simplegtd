# What exists — 31 Jul 2026

Facts read from source only. All 20 files in `src/` were read.

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

## Absent

- No due dates, tags, notes, subtasks, projects, or archive.
- No drag and drop. Reordering is one step at a time.
- No multi-select.

---

## Everything else

Read from the other sixteen files. This part runs past interaction into
appearance and internals — more than the word "UX" suggests.

### Seed

- Four lists on first run: Inbox, Next, Waiting, Someday, two tasks each. `seed.ts:4`

### Capture

- One input at the top files a task without picking a list. `Capture.tsx:11`
- It lands in whichever list sorts first. `Capture.tsx:8`
- With no lists at all, capture creates one named Inbox and files there. `Capture.tsx:15`
- Half-typed capture text survives a reload. `drafts.ts:4`

### Lists in use

- Adding a list: Enter or clicking away commits, Escape abandons. `AddSection.tsx:41`
- A half-typed list name survives a reload. `AddSection.tsx:8`
- Clicking a list name collapses or expands it. `SectionHeader.tsx:33`
- Double-click, F2, or Shift+Enter renames it. `SectionHeader.tsx:34`
- Enter commits a rename, Escape abandons it. `SectionHeader.tsx:21`
- Deleting a list offers an undo restoring it and its tasks. `SectionHeader.tsx:70`

### Tasks in use

- Double-click a task to rename it. `TaskRow.tsx:79`
- Enter commits, Escape abandons, clicking away commits. `TaskTitle.tsx:29`
- Renaming to nothing reverts to the old title. `TaskTitle.tsx:18`
- Renaming holds its text in component state, so a refresh mid-rename loses it. `TaskTitle.tsx:15`
- Moving a task offers a dropdown of every list. `MoveTask.tsx:16`
- Deleting a task offers an undo. `TaskRow.tsx:14`

### Undo

- One undo is held at a time; a new one replaces it. `Undo.tsx:7`
- It expires after 8 seconds. `Undo.tsx:35`
- Ctrl+Z or Cmd+Z fires it. `keys.ts:18`
- Delete is the only action with undo.

### Keyboard

- None of it is advertised anywhere in the app. `keys.ts:13`
- `/` focuses search, `c` focuses capture, only when not already typing. `keys.ts:28`
- Escape leaves any field. `keys.ts:25`
- Up and Down move between task rows, across lists. `TaskRow.tsx:41`
- On a focused row: Enter or F2 edits, Space ticks done, Delete or Backspace removes. `TaskRow.tsx:28`
- `m` opens the move-to-list dropdown. `TaskRow.tsx:38`
- Alt+Up and Alt+Down reorder instead of moving focus. `TaskRow.tsx:43`
- When a row vanishes under you, focus lands on its neighbour. `keys.ts:50`

### Search

- Enter or Down from the search box jumps to the first match. `Filters.tsx:9`

### Empty states

- No lists at all: one message. `App.tsx:50`
- Nothing matches anywhere: the message names whether it's the search or the filter. `App.tsx:19`
- Per list, four messages: nothing filed, no search match, nothing done, all done. `SectionView.tsx:14`

### Layout

- One centred column, 48rem maximum, wide gutters. `App.tsx:37`
- Header is "simplegtd" in small mono caps with a hairline running to the edge. `App.tsx:38`
- Each list is a two-column grid: a 10rem label gutter, then the tasks. `SectionView.tsx:29`
- List names sit right-aligned in that gutter; tasks sit behind a 2px left rule. `SectionView.tsx:30`
- Below 640px it becomes one column, names above their tasks. `SectionView.tsx:29`
- The filter bar sticks to the top of the window while scrolling. `Filters.tsx:23`
- The undo bar is fixed at the bottom centre. `Undo.tsx:45`
- "Add a list" sits indented to line up with the task column. `App.tsx:57`

### Type and colour

- Body is IBM Plex Sans; labels and buttons are IBM Plex Mono, uppercase, letterspaced. `global.css:8`
- Seven colour tokens: paper, raised, ink, muted, rule, accent, on-accent. `global.css:11`
- Light theme is warm off-white; a dark theme swaps in by system setting. `global.css:21`
- Icons come from lucide-react. `TaskRow.tsx:2`

### Reveal and focus

- Row controls stay invisible until the row is hovered or holds keyboard focus. `TaskRow.tsx:100`
- List controls behave the same way in the header. `SectionHeader.tsx:51`
- Those fades run 300ms. `Reorder.tsx:9`
- Every control shows a focus ring in the accent colour. `Reorder.tsx:5`
- Tab skips the controls inside a row; the row itself is the tab stop. `TaskRow.tsx:61`
- The move dropdown is a native select stretched invisibly over its icon. `MoveTask.tsx:16`

### App shell

- Mounts in React StrictMode at `#app`. `main.tsx:5`

### Store internals

- One module holds state, listeners, and localStorage. No state library. `store.ts:7`
- `useStore` takes a selector plus an equality test, and caches per hook. `store.ts:37`
- `byOrder` sorts by the fractional key; `sameItems` compares arrays by identity. `store.ts:50`
- Every write replaces the whole state object. `store.ts:26`
- A total match count across all lists is available but unused in the UI. `tasks.ts:18`
