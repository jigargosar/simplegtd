# Profile

Background that the code and git history don't carry. Written 29 Jul 2026.

Every claim here is tagged:
- **[verified]** — checked against disk or git in the session that wrote it
- **[stated]** — Jigar said it directly
- **[unvetted]** — believed, never checked. Treat as a lead, not a fact.

---

## Jigar

**[stated]** SimpleGTD revives a Rails app he shipped in **2008**. It went live
and made money. The revival is the point — this is not a fresh idea he is
prototyping.

**[stated]** He and his therapist agreed a rule together: **focus on one thing
even if it is painful**, rather than start something new. He asked me to hold
that line for him when he wavers. When he sounds frustrated with simplegtd,
that is the rule working, not a signal to start over.

**[stated]** He is tired of writing specs and reviewing code. He judges the
running app, not documents.

**[stated]** He thinks by talking. Ideas arrive mid-sentence, not from
solitary planning. Draft things for him to react to; never hand him a blank
page.

**[verified]** `C:\Users\jigar\projects` holds **175 folders**, created over 16
months — one every 2.8 days, at a steady rate. Creation and last-modified
graphs are near-identical in shape: folders are worked on around when they are
made, rarely returned to.

**[unvetted]** Two creation spikes line up with Claude Code capability jumps —
Jun–Jul 2025 (GA, Pro-plan inclusion, subagents) and Mar 2026 (Opus 4.6
default, 1M context GA, voice mode). Correlation only; never tested against any
other explanation, and life events were never asked about.

---

## The project

`C:\Users\jigar\projects\simplegtd`

**[stated]** The name is load-bearing and **never takes a suffix**. No
`simple-gtd-4`, no `gtd`, no `simplegtd-v2`. A suffix means it never becomes a
live version.

**[verified as of 29 Jul 2026]** React 19, TypeScript, Vite 8, Tailwind v4,
pnpm. IBM Plex Sans and Mono. `fractional-indexing` for order keys,
`lucide-react` for icons. State is a plain module using `useSyncExternalStore`,
split across `store` / `tasks` / `sections` / `drafts`. No state library, no
tests. Persists to localStorage under `simplegtd/v1`.

**[verified as of 29 Jul 2026]** No git remote. Local only.

---

## The archive

**[verified]** Four earlier attempts sit in
`C:\Users\jigar\projects\gtd-archive\`, all pushed to GitHub under
`jigargosar`. They are reference — read, never copied from.

| folder | ran | commits | code | what it holds |
|---|---|---|---|---|
| `simple-gtd` | 28 Apr – 4 May 2026 | 105 | 767 | vendored Motion library docs |
| `simple-gtd-2` | 4 May – 19 Jul 2026 | 369 | 1,533 | the deepest one — archive feature, `@dnd-kit` drag-and-drop, Playwright tests, `docs/adr.md` |
| `simply-gtd` | 25 Jun – 30 Jun 2026 | 50 | 768 | became a workshop for the output-formatting convention, not GTD |
| `simple-gtd-3` | 25 Jul – 27 Jul 2026 | 6 | **0** | spec v3_003 / v3_004, two HTML spikes, `concerns.md`, `caveats.md` |

**[verified]** Three of the four stalled at almost exactly the same size — 767,
768 and 1,533 lines. `simple-gtd-2` is the only one that passed the first
figure, and it still did not ship.

**How to weigh them:** by what was **shipped and lived with**, not by which
document is newest. That inverts the obvious ranking. `simple-gtd-2` ran 76
days, so its `docs/adr.md` carries the most weight. `simple-gtd-3` wrote zero
lines of code in two days, so `simplegtd_spec_v3_004.md` is the least
battle-tested despite being the most recent.

---

## Completion

**[stated]** He wants a finished product, not another prototype. "Finished"
has never been defined beyond that.

**[unvetted]** No definition of done exists anywhere in the repo or the
archive. Nothing states what would make this shippable — a deploy target, a
domain, a first user, a feature bar. This is the largest open question in the
project and nobody has written a line about it.

---

## Spec status — incomplete

**[verified]** `docs/simplegtd_spec_v3_004.md` is 73 lines and is **not
complete**. Two of its own sections are literal placeholders:

- `## Non-negotiables` — *Placeholder.*
- `## Capture` — *Placeholder.*

It also carries three unresolved "Pending" items, one of which
(`functional-indexing`) is already stale.

**[verified]** `docs/spec.md` in this repo holds a Scope paragraph plus an
unfilled heading: *"Additional scope found in archive simplegtd sibling
project — `<your task is to fill this section>`."*

### Where the missing parts may live — none of this researched

**[unvetted]** These files exist and have not been read for spec content. They
are leads only. Nobody has confirmed any of them holds anything the spec
needs.

```
gtd-archive/simple-gtd-2/docs/adr.md                       45 lines
gtd-archive/simple-gtd-2/docs/design-system.md            125
gtd-archive/simple-gtd-2/docs/board.md                    346
gtd-archive/simple-gtd-2/docs/reference/
    2026-06-13-archive-model-rebuild.md                   664
    task-list-query-model.md                              361
    archive-visibility.md                                  29
    search-notes.md                                        19
    dnd-kit-notes.md                                       70
    2026-07-05-row-section-model.md                        16
    2026-07-06-section-drag-ghost.md                       14
gtd-archive/simple-gtd-2/docs/_archive/
    old-workflow/requirements.md                           92
    uI-report.md                                          111
gtd-archive/simple-gtd-3/docs/simplegtd_spec_v3_003.md     58
gtd-archive/simple-gtd-3/docs/spikes/concerns.md          101
gtd-archive/simple-gtd-3/docs/spikes/caveats.md            96
gtd-archive/simply-gtd/docs/item-state.md                  60
gtd-archive/simply-gtd/docs/visual.md                      57
gtd-archive/simply-gtd/docs/roadmap.md                     48
```

**Caveat on `concerns.md` and `caveats.md`:** they are a self-critique of the
two HTML spikes and of the spec itself. `caveats.md` explicitly retracts three
claims made from screenshots in the same session. Read it before trusting
anything in `concerns.md`.

**The pending task:** read those files, extract what the spec is missing, and
fill `docs/spec.md`. Not started.
