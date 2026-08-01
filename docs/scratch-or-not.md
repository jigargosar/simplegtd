1. Confusion about doing/done/not-doing (opening reason): spec.md read as coherent and mostly `[x]` when checked.
2. Two-click delete, replacing the undo bar: a real design ask, still undesigned.
3. Archive feature: real ask, explicitly deferred by you ("start with 2-click delete first").
4. "UI needs simplification" / "UI/UX": raised three separate times (3rd message, the "more items" list, and again after conceding DnD/hooks) — still zero specifics given across all three.
5. DnD needs implementing: dropped, conceded. Already an explicit "Not doing" decision, not a gap.
6. "Add is not implemented" (the literal claim): false as stated; `addTask()` works.
7. Capture only ever targets the first list; anywhere else needs a separate Move step: confirmed real. Today's correction: this was never "Add" being broken — Capture and Move are two distinct features, and treating them as one completed "Add" (which is how `docs/spec.md`'s checklist reads them) is the actual error.
8. Affordance: no visual signal on Capture that it's fixed to one target, no way to see or pick the destination before submitting. Its own objection, separate from #7's missing-feature framing.
9. The crash (`Rendered fewer hooks than expected`): confirmed real, root cause is `App.tsx:33`, one-line fix, still sitting unapplied.
10. Hook order change warning: same bug as #9, not a second cause.
11. "Terrible implementation of hooks, hard to comprehend": dropped, conceded. Real but isolated to that one line; grepped, no second instance; no lint tooling in the project either way.
12. "...etc" (3rd message): never expanded. Open.
13. "Do you want more?" (after the crash items): same kind of open signal, never followed up with anything beyond what's already here.
