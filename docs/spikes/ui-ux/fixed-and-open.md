# Fixed and open

What in `manuscript.html` has to stay, and what is free to change.
Walked item by item, 2 Aug 2026.

## Key

- **A** keep it as is
- **B** keep the job, the look is open
- **C** do whatever you like

## The 21 items in the spike

1. **Wordmark**. Names the app. Lowercase italic serif, top left. **B**
2. **Find field**. Filters tasks by typing. Borderless input with a thin underline. **B**
3. **Preset filters**. Switch between all / active / done. Three words split by a middot. **B**
   Note: `all / active / done` is TodoMVC's exact triple.
4. **Write-line dot**. A small middot at the left of the capture row. **C**
5. **Quick capture**. The "Write here…" input. **B**
   Job is bigger than the spike shows: it files into any list through a picker, and remembers the last list used.
6. **Enter hint**. `↵ files it` at the right of the capture row. **C**
7. **Rule under the header**. Hairline between capture and the lists. Purely visual. **C**
8. **List names and order**. Inbox, Next, Waiting, Someday. **C**
   No cap on how many lists or items exist. Seed data is still undecided.
9. **List heading**. Names a list. Italic serif, larger, semibold. **B**
10. **Collapse chevron**. Folds a list shut. **B**
11. **Rules between lists**. Hairlines above each list after the first. Purely visual. **C**
12. **Round checkbox**. Marks a task done. Ring that fills green. **B**
13. **Task title**. The task's own words on the row. **B**
14. **Done styling**. Dim plus strikethrough. **B**
    Note: near-universal todo convention.
15. **Delete ×**. Removes a task. Hidden until the row is hovered. **B**
    Hidden-until-hover means it does not exist for touch.
    Deleting must carry some resistance. Not one careless click. Locked job, shape open.
    Undo is out, so resistance is the only guard against a mistake.
16. **Row hover**. Shows which row a click will land on. **B**
17. **New list button**. `+ begin a new list` at the bottom. **B**
18. **Palette**. Cream paper, brown ink, brown-gold rules, green accent. **C**
19. **Typeface**. Georgia serif throughout, italics on headings and inputs. **C**
20. **Column**. One narrow centred column with the lists stacked. **B**
    The narrow stacked column is the job. The 640px figure is not.
21. **Sample task text**. The eight sentences currently in the lists. **C**

## Jobs the spike does not show

22. **Add inside a list**. Adding an item straight into a list while looking at that list. Feature locked, implementation open. **B**
23. **Drag and drop**. Moving a task within a list and between lists by dragging. Lists themselves can be dragged into a new order too. Feature locked, implementation open. **B**

## Standing rules for anyone working from this

- Do not treat the current hierarchy or theme as a constraint.
- Purely visual elements default to **C**.
- Nothing is marked **A**, and nothing is marked **D**. The D pass has not been done yet.

## Not doing

- Due dates, tags, notes, subtasks, projects, archiving.
- Multi-select and bulk actions.
- Export.
- Account, sync, sharing.
- Undo.
- Full draft persistence.
- Full keyboard support.
