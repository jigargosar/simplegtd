1. Confusion about doing/done/not-doing (opening reason): spec.md read as coherent and mostly `[x]` when checked.

2. Two-click delete, replacing the undo bar: a real design ask, still undesigned.

3. Archive feature: real ask, explicitly deferred by you ("start with 2-click delete first").

4. "UI needs simplification" / "UI/UX": raised three separate times (3rd message, the "more items" list, and again after conceding DnD/hooks) — still zero specifics given across all three.

5. DnD needs implementing:  yes, and bad design of ^ v should be removed.

6. Add task is not implemented: capture and add are different feature with different affordances. Overlaps with 7: same underlying gap, no picker, no context. Not confirmed as a separate thing yet.

7. Capture: should work from anywhere, with a dropdown of section. Default; last section added to via capture.

8. The crash (`Rendered fewer hooks than expected`): confirmed real, root cause is `App.tsx:33`, one-line fix, still sitting unapplied.

9. Hook order change warning: same bug as #8, not a second cause.

10. "Terrible implementation of hooks, hard to comprehend": dropped, conceded. Real but isolated to that one line; grepped, no second instance; no lint tooling in the project either way.
