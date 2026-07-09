# MECHALC ACADEMY — אקדמיית ההנדסה הקרבית

An interactive, game-styled training platform for young mechanical engineers (Hebrew, RTL).
Learners progress through "operations" — each one a real engineering competency: bolts &
threads, drawing reading, assembly, CNC/DFM, motors, suppliers, testing.

Visual language: a blend of Call of Duty mission HUDs, StarCraft terran consoles,
Dune's spice-gold austerity, and Q-branch gadget dossiers. Dark void-navy base,
cyan interface glow, gold XP/rank progression, red incident reports.

## MVP status

**Chapter 1 — OPERATION: IRON GRIP (ברגים, הברגות ולוקטייט)** is playable end-to-end:

- Campaign map with 8 operations (1 unlocked, 7 teased)
- Mission briefing with objectives
- 5 INTEL files (lesson units: incident report → briefing → tech specs → rule of thumb → known trap)
- 5 FIELD OPS (decision scenarios with per-answer explanatory feedback)
- 5-question FINAL EXAM with medals, pass gate at 60%
- Debrief that unlocks a practical field checklist
- XP + rank progression (RECRUIT → QUARTERMASTER "Q"), saved in localStorage

## Run it

```bash
cd app
npm install
npm run dev      # dev server
npm run build    # type-check + production build
```

## Repository layout

```
app/                  the game (Vite + React + TypeScript, no UI libs)
  src/game/           engine: content schema (types.ts), progression (progress.ts)
  src/content/        chapter data files — pure data, one file per chapter
  src/components/     screens: Hud, CommandCenter, Briefing, IntelUnit, ExercisePanel, Debrief
docs/                 the Mechalc codex: architecture, syllabus, lesson template, research (Hebrew)
docs/workflows/       multi-agent content production workflow
docs/agent-team-plan.md  how to run a team of agents that builds the remaining chapters
sources/              source-verification pipeline (inbox → verified/rejected)
```

## Adding a chapter

Content is decoupled from the engine. A new chapter is a single data file in
`app/src/content/` conforming to the `Chapter` type in `app/src/game/types.ts`,
authored from `docs/syllabus-he.md` per `docs/lesson-template-he.md`.

Content rules (from `docs/source-strategy-he.md`): no numeric manufacturing data
without a verified source; rules of thumb are labeled as such, with their limits.
