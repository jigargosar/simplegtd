# CLAUDE.md

SimpleGTD is a calm task board that holds everything you mean to do, so your mind
doesn't have to. It stays quiet and out of the way — the doing happens out in the
world, not here. A centered, narrow column with wide gutters: a single document,
not a multi-column board.

This is a revival of Jigar's 2008 Rails app that went live. The name never takes
a suffix.

## The deal

Jigar reads and writes no project documents. No spec, no ADR, no board, no diffs
to review. He looks at the running app or a screenshot and points at what's
wrong. Do not create `docs/`. Do not ask him to review anything written.

This file is the only prose in the repo, and it is for you, not him.

## Hard constraints

1. **No source file over ~200 lines.** The previous attempt died carrying a
   983-line `App.tsx`. Split before you exceed it, not after.
2. **Normal-sized controls.** A prior prototype had oversized buttons; he hated it.
3. **Keyboard shortcuts stay out of the way.** Another prototype was blanketed in
   them. Casual use must be clean; power users get them without being shown them.

## Commands

```sh
pnpm dev          # dev server
pnpm build        # production build
pnpm typecheck    # tsc --noEmit
```

## Stack

React 19, TypeScript, Vite, Tailwind v4, pnpm. `fractional-indexing` for order
keys, `lucide-react` for icons. Store is a plain module with
`useSyncExternalStore` — no state library until one is actually needed.

## Scope

Sections hold ordered tasks, one flat array each, task holds its `sectionId`.
Full CRUD on both. Tasks toggle done, move between sections, reorder. Filter
all/active/done. Search across sections. localStorage persistence, seeded on
first run. No due dates, tags, notes, subtasks, projects, or archiving.

## Interaction decisions carried from the archived attempt

Earned over 76 days in `../gtd-archive/simple-gtd-2`. Applied here; do not
re-litigate without a reason.

1. Double-click edits a title. Plain click does nothing — single-click edit
   caused accidental opens and selection flashes.
2. An edit input closed while empty (trimmed) always reverts to the prior value —
   for Enter, Escape, and blur alike.
3. Focus rings are keyboard-only (`focus-visible`), everywhere.
4. Row-level icons hide by default and fade in on hover, slowly. Instant toggles
   read as abrupt.
5. Appearance, disappearance, and value changes should not be jarring.
6. Ordering is a fractional-indexing string, never an array index.
7. If drag-and-drop returns, `@dnd-kit/react` — and note upstream bug
   clauderic/dnd-kit#1747 on cross-section drags.
