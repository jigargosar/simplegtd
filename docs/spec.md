# Spec

What SimpleGTD should do. Not a record of what is built — `what-exists-2026-07-31.md`
and `ux-2026-07-31.md` hold that.

Lines marked **(not built)** are intent, not the current app.

## Shape

- Tasks live in named lists.
- Lists are ordered. Tasks are ordered within their list.
- A list can be collapsed out of the way.

## Capture

- One box takes anything, without asking which list it belongs to.
- Captured tasks land in the first list.
- With no lists at all, capture makes one.

## Lists

- Add, rename, reorder, collapse, delete.
- New lists go to the bottom.
- A blank name is refused.
- Deleting a list takes its tasks with it.

## Tasks

- Add, tick done, rename, reorder, move to another list, delete.
- New tasks go to the bottom of their list.
- A blank name is refused.
- Done tasks stay where they are, marked.

## Finding things

- Search matches any part of a task's title.
- Show all, only unfinished, or only done.
- Search and filter apply together.

## Undo

- Deleting anything can be undone.
- Only the last delete is recoverable.
- How the undo is offered is a UX question, not a spec one.

## Keeping your work

- Everything saves itself. It is there when you come back.
- Text you have typed is preserved across a refresh, in every field.
  **(not built — only the capture box and a new list's name do this today)**
- Nothing leaves the browser. No account, no sync, no sharing.
- First run comes with example lists to show the idea.

## Keyboard

- The whole app can be driven from the keyboard.

## Deliberately absent

- No due dates, tags, notes, subtasks, projects, or archive.
- No drag and drop.
- No multi-select or bulk actions.
- No export.
