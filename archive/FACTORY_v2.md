# FACTORY_v2.md — Artifact-Driven Agentic Build Loop

Supersedes FACTORY.md. Integrates the strong ideas from FACTORY_UPGRADES.md, simplified for the current stage (one app, first build), plus four additions the upgrade file missed. 

**Governing principle (adopted from the upgrade file, it's the right framing):**
> Agents execute. Artifacts remember. Gates enforce. Metrics improve.

The single most important change from v1: **state lives in artifacts, not in the orchestrator's chat context.** Every agent reads named files and writes named files. No agent depends on conversation history.

---

## 0. Stage-appropriate scope (read first — this is the cost discipline)

The upgrade file designs the *mature, multi-app* factory. We are building the *first* app. So we adopt all of its **artifacts and checklists** and almost none of its **extra agents** yet. Reason: every agent is a separate context window; a 3-agent session can burn a day's tokens in an hour. Splitting agents is a scaling move for later, not a v0.1 move.

**Rule:** split *checklists* now, split *agents* only when the factory runs multiple apps.

---

## 1. The artifact chain (the durable interface)

```
SPEC.md            (frozen, human-validated — input)
SOURCES.md         (frozen, human-validated — input)
PROJECT_MEMORY.md  (persists decisions/bugs/prefs across iterations)
DESIGN_SYSTEM.md   (mandatory artifact, not just a first pass)
FEATURE_BACKLOG.md (atomic, ordered features)
FEATURE_PLAN.md    (per-feature: files to touch / NOT touch / rollback commit)
  → IMPLEMENTATION
  → TESTS (lightweight: calculator purity + provenance rendering)
REVIEW_REPORT.md   (architecture checklist + code checklist, JSON + prose)
QA_REPORT.md       (behavior + sampled value correctness)
PROVENANCE_REPORT.md (every shown value cited?)
CONFLICTS.md       (source disagreements + how resolved — NEW)
CHANGELOG.md       (why each thing exists)
ITERATION_METRICS.md (3-line cost/rework note per pass — kept deliberately tiny)
RELEASE_NOTES.md
```

Every agent's contract: **reads from named artifacts, writes to named artifacts.** That's what makes the system inspectable months later and resumable after a context clear.

---

## 2. The roster (collapsed-by-default — the cost-correct version)

The upgrade file's 12-agent roster is the *scaled* form. For v0.1 we run the **collapsed roster** as the default, not the fallback. Each "collapse" keeps the rigorous *checklist* while saving a context window.

| # | Agent | Model | Collapses (from upgrade file) | Tools |
|---|---|---|---|---|
| 0 | **Orchestrator** (main session) | Opus | — | Task, Read, Glob, Grep |
| 1 | **Planner** | Sonnet (Opus for backlog on big SPECs) | Product-Manager + Feature-Planner | Read, Write, Edit |
| 2 | **Sourcer** | Sonnet | — (PARALLELIZABLE, see §4) | Read, Grep, Glob, WebSearch, WebFetch |
| 3 | **Data-Builder** | Sonnet | — | Read, Write, Edit |
| 4 | **App-Developer** | Sonnet | — | Read, Write, Edit, Bash |
| 5 | **UI/UX-Designer** | Opus (system pass) / Sonnet (apply) | — | Read, Write, Edit |
| 6 | **Reviewer** | Opus | Architecture-Reviewer + Code-Reviewer (two checklists, one agent) | Read, Grep, Glob |
| 7 | **QA-Breaker** | Sonnet | — | Read, Grep, Glob, Bash |
| 8 | **Provenance-Auditor** | Haiku | kept SEPARATE on purpose (it's the differentiator's enforcement) | Read, Grep, Glob |

A lightweight **Test** step is owned by the App-Developer (calculator pure-function tests + a provenance-rendering test) rather than a standalone Test-Builder agent — full test harness deferred until the app outgrows a single file.

**When to expand to the full 12-agent roster:** when the factory builds its second and third app and you want maximal separation/auditability. Then split Planner→PM+Feature-Planner, Reviewer→Arch+Code, add Test-Builder. The checklists are already written, so the split is mechanical.

---

## 3. The loop — drawn as STAGE-ADDRESSABLE, not top-to-bottom (NEW framing)

The critical correction to the upgrade file's §15: **iteration does not restart at the top.** A logged miss re-enters at the stage it touches; unaffected gates only *re-verify*. This is the actual looping mechanism and what makes iteration cheap.

```
[ SPEC.md + SOURCES.md frozen ]
      │ Gate A — scope frozen
      ▼
  Planner ──────────────────────► FEATURE_BACKLOG.md
      │ Gate A2 — backlog clear (acceptance criteria + deps + source req per feature)
      ▼
  Sourcer  ◄═══ PARALLEL across independent domains (§4) ═══►
      │ Gate B — sources verified (incl. edition; conflicts → CONFLICTS.md + human stop)
      ▼
  Data-Builder ─────────────────► data layer (source travels with each record)
      │ Gate C — data/UI separation
      ▼
  Planner (feature-plan mode) ──► FEATURE_PLAN.md (files to touch / NOT touch / rollback commit)
      │ Gate C2 — plan approved
      ▼
  App-Developer ◄══ coupled, concurrent ══► UI/UX-Designer
      │ + lightweight TESTS (calc purity, provenance render)
      │ Gate D — feature works + matches DESIGN_SYSTEM.md + a11y floor
      │ Gate D2 — calculator + provenance tests pass
      ▼
  Reviewer ─────────────────────► REVIEW_REPORT.md
      │ Gate E1 — architecture invariants   │ Gate E2 — code quality
      ▼
  QA-Breaker ───────────────────► QA_REPORT.md
      │ Gate F  — behavior (units, edge threads, mobile)
      │ Gate F2 — SAMPLED VALUES MATCH THEIR CITED SOURCE (correctness, not just presence) (NEW)
      ▼
  Provenance-Auditor ───────────► PROVENANCE_REPORT.md
      │ Gate G — 100% of shown values carry a visible source
      ▼
  Orchestrator updates: CHANGELOG.md + PROJECT_MEMORY.md + ITERATION_METRICS.md
      ▼
  [ RELEASE CANDIDATE ]  → commit (this commit IS the checkpoint, §6)
      ▼
  HUMAN BETA → logged misses
      │
      └──► RE-ENTRY (stage-addressable):
             wrong value          → re-enter at Data-Builder (Gate C→G re-verify)
             new domain           → re-enter at Sourcer (full chain, but only new records)
             layout/identity bug  → re-enter at UI/UX-Designer (Gate D)
             wrong formula        → re-enter at App-Developer (Gate D2)
             source conflict found→ re-enter at Sourcer + CONFLICTS.md (human stop)
           Unaffected gates RE-VERIFY (cheap); they do not rebuild.
```

---

## 4. Parallelism map (NEW — this was missing from both prior docs)

You asked twice which agents run in series vs parallel. Encoded here as an orchestrator dispatch rule.

**Parallelizable:**
- **Sourcer across independent data domains.** Threads, clearance holes, and beam-references share no data — three Sourcer invocations can run at once. This is the one true parallel speedup in v0.1.
- **On a mature product: independent features.** Two features touching disjoint data records and disjoint pure functions (e.g. "add electrical table" vs "fix beam UDL mode") can run as parallel loops in separate git worktrees.

**Strictly serial (real dependency chain — parallelizing wastes work):**
- Sourcer → Data-Builder → Planner(plan) → App-Developer → Reviewer → QA → Provenance-Auditor. Each consumes the prior's output; an upstream gate failure invalidates downstream work.

**Coupled-concurrent (parallel in wall-clock, joined at a gate):**
- App-Developer ↔ UI/UX-Designer. Same artifact, different concerns, merge at Gate D. In single-level-subagent reality the orchestrator interleaves these in one stage rather than spawning two free-running agents.

**Rule of thumb:** parallelize across independent data/features; serialize across the dependency chain; couple developer+designer. Anything sharing a data record or a gate is serial.

---

## 5. The gates (the IP — checklists, with JSON output)

Each gate emits a structured report so failures are unambiguous. Honest framing: the JSON makes failures *clear and routable*, it does not make enforcement *mechanical* — an agent still reads the checklist. The value is the clean `return_to` + `allowed_files`, not CI-grade automation.

```json
{ "gate": "Gate E1", "status": "fail", "blocking": true,
  "failed_checks": ["calculator returns result without source object"],
  "files_involved": ["app.html#deflection"],
  "return_to": "App-Developer",
  "allowed_files_to_modify": ["app.html (calc section only)"],
  "rollback_commit": "<hash from FEATURE_PLAN>" }
```

- **Gate A — scope frozen.** No open scope questions in SPEC.
- **Gate A2 — backlog clear.** Every feature has acceptance criteria, dependencies, source requirement.
- **Gate B — sourced.** Every table → named standard **+ edition** + provenance object. Conflict or paywall → CONFLICTS.md + human stop.
- **Gate C — separation.** Data apart from UI; new table addable touching only data; source in data layer.
- **Gate C2 — plan approved.** FEATURE_PLAN names files to touch / NOT touch / rollback commit before any code.
- **Gate D — feature + design.** Works; matches DESIGN_SYSTEM.md; clears a11y floor; avoids forbidden defaults.
- **Gate D2 — tests.** Calculator pure-function tests + provenance-rendering test pass.
- **Gate E1 — architecture.** Data/UI separated; calculators pure → {result, formula, source}; domain registry; single file; no uncited path exists.
- **Gate E2 — code quality.** Readable; no dup logic; dead code removed; error handling; no perf traps.
- **Gate F — behavior QA.** Wrong units, edge threads (M1.6, 1/2"), mobile layout.
- **Gate F2 — value correctness (NEW).** Sampled rendered values *match their cited source*. A value can be cited and wrong; this gate catches that. For a tool outputting dimensions someone drills to, this is the whole game.
- **Gate G — provenance presence.** 100% of shown values carry a visible source. Zero exceptions.

A release candidate = passed A–G (incl. A2/C2/D2/E1/E2/F2). Portable definition for any future app.

---

## 6. Checkpoints = git commits (reframed from upgrade file §7)

Don't create named marker files. **Commit on every passed gate.** The commit hash is the checkpoint. On a gate failure, the FEATURE_PLAN's `rollback_commit` is a real hash to reset to — not blind patching. Free, native, and actually a clean state.

---

## 7. Human decision points (elevated from upgrade file §13 — this is a safety control, not priority-3)

The factory STOPS and asks the human when:
- a source is missing or paywalled,
- two authoritative sources conflict (→ log in CONFLICTS.md with the resolution),
- a change alters public/engineering behavior,
- the design system would change,
- an architecture invariant would be relaxed,
- a production safety/engineering value is uncertain.

For a tool engineers trust dimensions from, these stops are not optional polish — they are the boundary between autonomous-where-safe and human-controlled-where-judgment-matters.

---

## 8. CONFLICTS.md (NEW artifact)

When sources disagree, the *resolution itself becomes provenance.* An engineer auditing your tool will want to know not just "what's the value" but "you had two sources, which did you pick and why."

```markdown
## thread.M6.pitchDiameter
- Source A: ISO 965-1 (ed. X) → value V1
- Source B: Machinery's Handbook 30th → value V2
- Conflict: V1 ≠ V2 by Δ
- Resolution: chose V1 (primary standard outranks aggregator)
- Decided by: Dima, 2026-06-30
- Surfaced in UI: yes (source badge shows ISO 965-1)
```

---

## 9. PROJECT_MEMORY.md (adopted from upgrade file §2 — highest-value addition)

Read by every agent before it starts; updated by the orchestrator after every iteration. Holds: product decisions + reasons, rejected alternatives, architecture rules + why, recurring bugs + how to avoid, user preferences + evidence, technical debt + planned cleanup. This is what stops the stateless loop from repeating mistakes.

---

## 10. ITERATION_METRICS.md (adopted but deliberately tiny)

Three lines per iteration, no more, or it rots:
```
F-001: expensive = Designer system pass (Opus). rework = beam UDL re-done once. next = freeze calc formulas before UI.
```

---

## 11. Source-version discipline (adopted from upgrade file §12)

Provenance object carries edition + access method + confidence:
```json
{ "standard": "ISO 965-1", "edition": "<used by project>", "publisher": "ISO",
  "table": "<ref>", "value_path": "thread.pitchDiameter",
  "access_method": "manual|public|purchased|user-provided",
  "confidence": "high|medium|low",
  "notes": "Verify against licensed standard before production use" }
```
Caveat kept honest: where you don't have the primary PDF, `access_method: public` + `confidence: medium` is the correct, non-deceptive label.

---

## 12. What changed from the upgrade file, and why (summary)

**Adopted as-is:** artifact-driven thesis, PROJECT_MEMORY, FEATURE_PLAN (files-not-to-touch), human decision points, source-version object, machine-readable JSON reports, DESIGN_SYSTEM as mandatory artifact, CHANGELOG.

**Adopted but simplified:** roster runs collapsed-by-default (not as fallback); Reviewer = one agent / two checklists; Test = lightweight dev-owned step, not a full Test-Builder; ITERATION_METRICS = 3 lines; checkpoints = git commits, not marker files; JSON gates = clear routing, not "mechanical enforcement."

**Added (missing from both docs):** §4 parallelism map; §3 stage-addressable re-entry (the real looping mechanism); §8 CONFLICTS.md; Gate F2 value-correctness (cited ≠ correct).

**One-line verdict on the upgrade file:** ~70% adopt, 25% adopt-simplified, 5% reframe. Its thesis improves the original; its only flaw is solving for the multi-app factory while we build the first app — so we keep its artifacts and checklists and defer its extra agents.
