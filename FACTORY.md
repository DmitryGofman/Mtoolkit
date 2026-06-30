# FACTORY.md — Artifact-Driven Agentic Build Loop

**Status:** Canonical. Single source of truth for the build system. Supersedes all prior FACTORY drafts.

**This is the project.** The reference app is its first product. We are building a reusable, auditable team of Claude Code subagents — a factory — that turns a frozen SPEC into a shipped, source-cited app, then iterates feature-by-feature. Point it at a different SPEC and it builds a different app.

**Governing principle:** *Agents execute. Artifacts remember. Gates enforce. Metrics improve.* State lives in artifacts, not in chat context — every agent reads named files and writes named files.

---

## 0. Three constraints that shape everything

1. **Subagents are one level deep.** A subagent cannot spawn another. All orchestration lives in the main session: one **Orchestrator** + a roster of **specialist subagents** it delegates to.
2. **Tokens scale with agents, not tasks.** A 3-agent team can burn a day's budget in an hour. So most roles run as **sequential invocations**, not a live swarm. Parallelism is reserved for genuinely independent work.
3. **The value is in the gates, not the agents.** Any agent produces output; the gates between stages are what make this an auditable factory. The gates are the reusable IP.

**Two layers:** the **knowledge layer** (SPEC, SOURCES) is produced once in chat with the human as SME — it's the *input*. The **build layer** (this doc) runs in Claude Code and consumes it.

**Stage-appropriate scope:** we are building the *first* app. Adopt all artifacts and checklists now; run the **collapsed roster** (§2) by default. Split agents only when the factory runs multiple apps. Rule: split *checklists* now, split *agents* later.

---

## 1. The artifact chain (the durable interface)

```
SPEC.md              (frozen — input)
SOURCES.md           (frozen — input)
PROJECT_MEMORY.md    (decisions/bugs/prefs across iterations)
DESIGN_SYSTEM.md     (mandatory artifact, not just a first pass)
FEATURE_BACKLOG.md   (atomic, ordered features)
FEATURE_PLAN.md      (per-feature: files to touch / NOT touch / rollback commit)
  → IMPLEMENTATION
  → TESTS            (lightweight: calculator purity + provenance rendering)
REVIEW_REPORT.md     (architecture checklist + code checklist)
QA_REPORT.md         (behavior + sampled value correctness)
PROVENANCE_REPORT.md (every shown value cited?)
CONFLICTS.md         (source disagreements + how resolved)
CHANGELOG.md         (why each thing exists)
ITERATION_METRICS.md (3-line cost/rework note per pass)
RELEASE_NOTES.md
```
Every agent reads from named artifacts and writes to named artifacts. No agent depends on chat history. This is what makes the system inspectable months later and resumable after a context clear.

---

## 2. The roster (collapsed-by-default)

Markdown files in `.claude/agents/`. Each: role, model tier, least-privilege tools, input/output contract, the gate it must pass.

| # | Agent | Model | Writes? | Tools | Job |
|---|---|---|---|---|---|
| 0 | **Orchestrator** (main session) | Opus | no | Task, Read, Glob, Grep | Decompose, sequence, enforce gates; never edits code |
| 1 | **Planner** | Sonnet (Opus for big backlog) | docs | Read, Write, Edit | SPEC → FEATURE_BACKLOG → FEATURE_PLAN (files to touch/not-touch) |
| 2 | **Sourcer** | Sonnet | no | Read, Grep, Glob, WebSearch, WebFetch | Map every table → standard + provenance; PARALLELIZABLE (§4) |
| 3 | **Data-Builder** | Sonnet | data | Read, Write, Edit | SOURCES → data layer (source travels with each record) |
| 4 | **App-Developer** | Sonnet | yes | Read, Write, Edit, Bash | Build UI + logic; owns lightweight tests |
| 5 | **UI/UX-Designer** | Opus (system) / Sonnet (apply) | yes | Read, Write, Edit | Owns visual identity, interaction, ergonomics, a11y (§3) |
| 6 | **Reviewer** | Opus | no | Read, Grep, Glob | Two checklists (architecture + code) in one agent |
| 7 | **QA-Breaker** | Sonnet | no | Read, Grep, Glob, Bash | Break it: units, edge cases, mobile, value spot-checks |
| 8 | **Provenance-Auditor** | Haiku | no | Read, Grep, Glob | One job: any value shown without a source? The citation cop. |

The Provenance-Auditor stays separate on purpose — it's the differentiator's enforcement, cheap and narrow, run every iteration forever. Least-privilege is enforced: reviewers/auditors get no Write; the Sourcer gets no Bash. A misbehaving agent's blast radius = its tool list.

**Scaling later:** split Planner→PM+Feature-Planner, Reviewer→Architecture+Code, add a standalone Test-Builder when the factory runs multiple apps. The checklists already exist, so the split is mechanical.

---

## 3. The UI/UX-Designer (first-class, because design is the market gap)

The App-Developer owns logic and data; the Designer owns how it looks, feels, reads, and how it's operated. Opus for the once-per-project design-system pass; Sonnet to apply it per feature.

**Mandate:**
- Derive identity from the subject's world (workshop, calipers, blueprint/tolerance callouts), NOT generic AI defaults and NOT "look like Linear/Arc/Apple" — match that craft level, don't copy the look (SPEC §11).
- Produce `DESIGN_SYSTEM.md` first (palette, type trio incl. tabular figures, layout, signature element = a cited dimension as a tolerance callout); get it approved before applying.
- **Data legibility is functional:** numeric columns use tabular/monospaced alignment.
- **Input ergonomics is functional (SPEC §8):** generous targets, minimal keystrokes, no field hidden behind the keyboard, common lookups in ≤2 actions.
- **Quality floor:** mobile-first, thumb-reachable, visible focus, reduced-motion, large targets.
- **Copy is design material:** label by what the user controls; active voice; errors explain the fix; empty states invite action.

On v0.1 the Designer runs once to establish the system, then applies it per feature. On later iterations the system already exists — additions stay visually coherent. That coherence-over-time is exactly what the ugly competitors lack.

---

## 4. Parallelism map (orchestrator dispatch rule)

**Parallelizable:**
- **Sourcer across independent data domains** — threads, clearance, conversion, beam-refs share no data; run at once. The one true parallel speedup in v0.1.
- **Mature product: independent features** touching disjoint data + disjoint pure functions, in separate git worktrees.

**Strictly serial (dependency chain):** Sourcer → Data-Builder → Planner(plan) → App-Developer → Reviewer → QA → Provenance-Auditor. Each consumes the prior's output.

**Coupled-concurrent:** App-Developer ↔ UI/UX-Designer — same artifact, joined at Gate D. Orchestrator interleaves them in one stage rather than spawning two free agents.

**Rule of thumb:** parallelize across independent data/features; serialize the chain; couple developer+designer. Anything sharing a data record or a gate is serial.

---

## 5. The loop — stage-addressable (this is how it loops)

Iteration does NOT restart at the top. A logged miss re-enters at the stage it touches; unaffected gates only *re-verify*. This is what makes iteration cheap.

```
[ SPEC.md + SOURCES.md frozen ]
   │ Gate A — scope frozen
   ▼ Planner ─────────────► FEATURE_BACKLOG.md
   │ Gate A2 — backlog clear
   ▼ Sourcer  ◄═ PARALLEL across independent domains ═►
   │ Gate B — sourced (incl. edition; conflicts → CONFLICTS.md + human stop)
   ▼ Data-Builder ────────► data layer
   │ Gate C — data/UI separation
   ▼ Planner (plan mode) ─► FEATURE_PLAN.md (files to touch/NOT/rollback commit)
   │ Gate C2 — plan approved
   ▼ App-Developer ◄═ coupled ═► UI/UX-Designer  + lightweight TESTS
   │ Gate D — feature works + matches DESIGN_SYSTEM + a11y
   │ Gate D2 — calc + provenance tests pass
   ▼ Reviewer ────────────► REVIEW_REPORT.md
   │ Gate E1 — architecture   │ Gate E2 — code quality
   ▼ QA-Breaker ──────────► QA_REPORT.md
   │ Gate F  — behavior (units, edge cases, mobile)
   │ Gate F2 — sampled values match cited source (correctness ≠ presence)
   ▼ [interaction stability check]
   │ Gate H  — no core flow changed without an alias (SPEC §7)
   ▼ Provenance-Auditor ──► PROVENANCE_REPORT.md
   │ Gate G  — 100% of shown values carry a visible source
   ▼ Orchestrator updates CHANGELOG + PROJECT_MEMORY + ITERATION_METRICS
   ▼ [ RELEASE CANDIDATE ] → commit (the commit IS the checkpoint)
   ▼ HUMAN BETA → logged misses
       └─► RE-ENTRY (stage-addressable):
             wrong value      → Data-Builder   (C→G re-verify)
             new domain       → Sourcer        (only new records)
             layout/identity  → UI/UX-Designer (Gate D)
             wrong formula    → App-Developer  (Gate D2)
             broken reflex flow → App-Developer (Gate H)
             source conflict  → Sourcer + CONFLICTS.md (human stop)
           Unaffected gates RE-VERIFY (cheap); they do not rebuild.
```

---

## 6. The gates (the IP — checklists with structured output)

Each gate emits a structured report so failures are unambiguous. Honest framing: the JSON makes failures *clear and routable*; it does not make enforcement mechanical — an agent still reads the checklist.

```json
{ "gate": "Gate E1", "status": "fail", "blocking": true,
  "failed_checks": ["calculator returns result without source object"],
  "files_involved": ["app.html#deflection"],
  "return_to": "App-Developer",
  "allowed_files_to_modify": ["app.html (calc section only)"],
  "rollback_commit": "<hash from FEATURE_PLAN>" }
```

- **A — scope frozen:** no open scope questions in SPEC.
- **A2 — backlog clear:** every feature has acceptance criteria, deps, source requirement.
- **B — sourced:** every table → named standard + edition + provenance object. Conflict/paywall → CONFLICTS.md + human stop.
- **C — separation:** data apart from UI; new table addable touching only data; source in data layer.
- **C2 — plan approved:** FEATURE_PLAN names files to touch / NOT touch / rollback commit before code.
- **D — feature + design:** works; matches DESIGN_SYSTEM; clears a11y + ergonomics floor; avoids forbidden defaults.
- **D2 — tests:** calculator pure-function tests + provenance-rendering test pass.
- **E1 — architecture:** data/UI separated; calculators pure → {result, formula, source}; domain registry; single file; no uncited path exists.
- **E2 — code quality:** readable; no dup logic; dead code removed; error handling; no perf traps; meets §10 perf guardrails.
- **F — behavior QA:** wrong units, edge cases (M1.6, 1/2"), mobile layout.
- **F2 — value correctness:** sampled rendered values match their cited source. A value can be cited *and wrong*; this catches it. For a tool someone drills to, this is the whole game.
- **G — provenance presence:** 100% of shown values carry a visible source + tier + unit. Zero exceptions.
- **H — interaction stability:** no established interaction path (unit default, input order, fastest-lookup route) changed without an alias; core reflex flows verified unbroken vs prior release; intentional changes logged in CHANGELOG with the preserving alias. (SPEC §7 — the #1 uninstall trigger.)

A release candidate = passed A–H. Portable definition for any future app.

---

## 7. Mechanics (running it in a window)

- **Orchestrator = main session on Opus**, holding only SPEC + SOURCES + this file + the gate checklist. Delegates; does not edit code.
- **Sequential by default**; only the Sourcer parallelizes across independent domains.
- **Tiered models** (Opus orchestrator / Sonnet workers / Haiku auditor) ≈ 40% cheaper than all-Opus.
- **Clear context between stages** (each gate transition is a `/clear` point).
- **Checkpoints = git commits.** On a gate failure, FEATURE_PLAN's `rollback_commit` is a real hash to reset to — not blind patching.
- **One feature per iteration** after v0.1; Gate E's data-driven additions keep each pass bounded.
- **Human decision points (hard stops):** missing/paywalled source · two authoritative sources conflict (→ CONFLICTS.md) · change alters public behavior · design system changes · an architecture invariant would be relaxed · an engineering value is uncertain. Autonomous where safe, human-controlled where judgment matters.

---

## 8. Why this is a project, not a one-off

Everything except SPEC.md and SOURCES.md is app-agnostic: the 8 agent definitions, the gate checklists, the loop. To build a different app: write a new SPEC + SOURCES, adjust the Sourcer's domains and the Designer's subject-world cues, repoint the Orchestrator. The factory is the asset; the app is the output.

## 9. Build order for the factory itself

1. Write the 8 agent markdown files in `.claude/agents/` (cheap; chat or a light session).
2. Write `CLAUDE.md` encoding the loop + gate enforcement + human-stop rules.
3. Drop in frozen SPEC.md + SOURCES.md.
4. First run: Designer establishes DESIGN_SYSTEM.md → loop runs A–H → v0.1 release candidate.
5. Beta → log misses → iterate one feature per pass.
6. Once stable, the `.claude/` directory is the reusable factory. Clone it for the next app.
