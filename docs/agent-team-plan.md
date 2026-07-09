# Agent Team Plan — building the remaining 7 chapters on a loop

The MVP proves the loop's unit of work: **one chapter = one data file** conforming to
`Chapter` in `app/src/game/types.ts`, rendered by an engine that never needs to know
which chapter it's showing. That makes chapter production parallelizable and reviewable.

## The team (already defined in `.claude/agents/`)

| Agent | Role | Output |
|---|---|---|
| `source-scout` | Finds & grades real sources (catalogs, datasheets, DFM guides) | entries in `sources/` |
| `lesson-author` | Writes a chapter's units/exercises/exam from the syllabus | `app/src/content/chapter-NN-*.ts` |
| `tech-reviewer` | Adversarial technical + pedagogical review | ranked findings |
| `game-engineer` | Wires chapters in, extends engine, keeps the design system | code in `app/` |

This mirrors `docs/workflows/multi-agent-content-workflow-he.md` (product manager →
source research → lesson writing → exercises → professional review → integration),
with the main session acting as the product manager.

## The loop per chapter

```
pick next module from docs/syllabus-he.md §3
  → source-scout        (only if the chapter needs numeric data)
  → lesson-author       (writes the chapter data file)
  → tech-reviewer       (adversarial pass; ≥1 reviewer, ideally 2 with different lenses)
  → lesson-author       (fixes findings)
  → game-engineer       (wires into campaign map, unlock rules, build + browser verify)
  → human checkpoint    (play the chapter; expert verifies items marked [דורש אימות])
```

## How to actually run it in Claude Code

**Option A — supervised loop (recommended to start).** In a session on this repo:
"Build chapter 2 using the agent team: source-scout → lesson-author → tech-reviewer →
game-engineer." The main session orchestrates the subagents and you review the result.
Do one chapter this way to calibrate quality before automating.

**Option B — orchestrated fan-out.** Once one supervised chapter looks good, ask for a
workflow ("use a workflow") that pipelines several chapters in parallel — each chapter
flows author → review → fix independently, with the engineer wiring and verifying at
the end. Good for chapters 3–8 in one push.

**Option C — background routine.** Schedule a recurring session (Claude Code web:
a Routine/trigger on this repo; CLI: cron) with a standing prompt: "If the previous
chapter PR is merged, build the next unbuilt chapter from docs/syllabus-he.md via the
agent team, push branch, open PR." Each firing produces one reviewable PR. Keep a human
merge gate — that's the quality valve.

## Quality gates (non-negotiable, enforced by CLAUDE.md)

1. `cd app && npm run build` must pass.
2. Playwright drive of the new chapter with screenshots reviewed (RTL bugs are visual).
3. No unsourced numeric engineering data; `[דורש אימות]` items listed in the PR body.
4. A human plays every chapter before merge; a domain expert clears verification items.

## Sequencing note

Chapter 2 (drawing reading) and chapter 3 (assembly) are text/diagram-friendly and can
start immediately. Chapter 5 (CNC) and 6 (motors) lean hardest on sourced data — run
`source-scout` for them early, in parallel with authoring 2–3.
