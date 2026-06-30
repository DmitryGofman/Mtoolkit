# PROJECT_MEMORY.md

Read by every agent before it starts. Updated by the Orchestrator after every iteration. Seeded with decisions already made during planning.

## Product decisions
- Decision: Differentiator is layered — speed under interruption > provenance > beauty (in priority).
  Reason: Research across 3 independent passes; speed is the job, provenance makes it safe, beauty amplifies.
- Decision: Home screen is a search field, not module tabs.
  Reason: Every micro-task is interrupt-driven; "type M6 → see everything" is the spine.
- Decision: MVP is 5 modules — threads, tap drills, clearance, unit conversion (daily-open core) + beam calc (architecture showcase).
  Reason: "Both" decision by Dima; conversion is highest-frequency task, beam calc proves calcs inherit provenance.

## Rejected alternatives
- Alternative: Train a domain LLM. Rejected: frontier models already know ME; the moat is retrieval + provenance, not weights.
- Alternative: Subscription-first monetization. Rejected: research shows it's a growth blocker for single-user reference tools.
- Alternative: "Look like Linear/Arc/Apple." Rejected: that's the generic premium default; surrenders the design differentiator.
- Alternative: 12-agent roster. Rejected for v0.1: token cost; collapsed 8-agent roster is the default until multi-app scale.

## Known architecture rules
- Rule: Data separated from UI; new domain addable touching only the data layer. Why: makes every iteration a bounded one-session add.
- Rule: Calculators are pure functions returning {result, formula, source}. Why: testable, and provenance applies to calcs too.
- Rule: Single self-contained HTML file, no browser storage. Why: minimal context cost; meets perf guardrails trivially.
- Rule: No uncited value path; never estimate/invent. Why: one fabricated value destroys the differentiator permanently.

## Recurring bugs
- Watch: hash-only navigation (`#selftest`) does not re-run scripts — verify with a full reload, not a hash change.
- Watch: thread geometry constants. Use 0.649519 (pitch-Ø) and 1.082532 (basic minor) so M6 reads 5.350 / 4.917 exactly, matching Machinery's Handbook. A looser constant drifts the last digit.

## v0.1 build outcome (first iteration)
- Built `index.html` (5 modules), `DESIGN_SYSTEM.md`, `tests/calculators.test.mjs` (now 49 checks, all pass), `FEATURE_BACKLOG.md`, `CHANGELOG.md`.
- Architecture held: data + calculators in one delimited pure block, separated from DOM; the Node test loads that same block so app and tests share one source of truth.
- Decision: imperial tap drills shown as decimal inch + mm (not number/letter/fraction drill names) to avoid transcription risk; drill-name mapping deferred to v0.2 (in backlog).
- Decision: imperial clearance limited to #10 + fractional sizes (confident ASME B18.2.8 values); number sizes #4–#8 use the honest "no verified value" path rather than guessed values.

## Factory run (v0.1 verified through gates A–H)
- The factory was run as an agent team: Planner (C2), Sourcer (B), Reviewer (E1/E2), QA-Breaker (F/F2/H), Provenance-Auditor (G), then App-Developer for the routed fix. Reports persisted as REVIEW_REPORT / QA_REPORT / PROVENANCE_REPORT / ITERATION_METRICS / RELEASE_NOTES.
- Recurring bug (caught by Gate G): a value rendered through the `callout()` signature helper bypassed the badge contract → uncited. FIX/RULE: every displayed value must route through a single badge-bearing primitive (valRow/valRowBadge/callout-with-prov). Don't add a render path that prints a number without provenance.
- Recurring bug (Gate F / F1): unified thread size keys had inconsistent `#` prefixes (`#1/4-20` vs `1/4-20`); normalize in `parseQuery` — fractional sizes have no `#`, number sizes do. A valid fastener must never silently fail.
- Orchestration note: the three read-only audits (Reviewer/QA/Provenance) parallelize safely over the same files — cheaper wall-clock than the spec's strict serial chain, no conflict. Gate ordering still enforced on the results.

## User preferences
- Preference: Concise, spoken-style prompts; bias toward building working things fast over over-planning. Evidence: prior sessions.
- Preference: Hebrew/English bilingual context acceptable. Evidence: provided Hebrew research report.

## Technical debt
(none yet — populate as stubs are deferred: per-module data versioning, annual review workflow, source-type split)
