# ITERATION_METRICS.md

Three lines per pass: what was expensive, what was rework, what to do differently.

## v0.1 (rebuild) — from-scratch factory build (full build half A–H)
- **Expensive:** the build half this time — App-Developer (~94k tok for calculators+UI+tests) and the Opus Designer pass (~81k) dominated; the from-scratch build cost more than the prior verify-only run, as expected.
- **Rework:** zero *gate* failures (the badge-primitive + key-normalization lessons from PROJECT_MEMORY meant Gate G and F1 passed first time). One **gate escape** caught in orchestrator release testing: the beam *default* length was 1 mm (→ 0.0000 mm hero) — Gate F2 verified the pure `beam()` in metres but never exercised the UI's mm→m wiring, so it missed the bad default. One-value hotfix (`'1'`→`'1000'`).
- **Do differently:** Gate F2 must spot-check at least one value **end-to-end through the rendered UI**, not only the pure calculator — a correct calculator behind a wrong unit-wiring still ships a wrong number. Add a UI-level assertion (or in-browser #selftest case) for the showcase calculator's default render.

## v0.1 — first factory run (build verified through gates A–H)
- **Expensive:** the verification half — Reviewer (Opus, ~62k tok) and QA-Breaker (~62k tok) dominated; the read-only audits cost more than the build fix. Worth it: they're where the IP is.
- **Rework:** one blocking miss (Gate G: beam tip-deflection rendered through `callout()` with no badge) + one minor QA defect (F1: `#1/4-20` silent-fail) + one E2 nit (temp default). All three fixed in a single routed App-Developer pass; 9 regression tests added; no engineering value touched.
- **Do differently:** the `callout()` helper was the one render path that bypassed the `valRowBadge` provenance contract — next time, route *every* value through a single badge-bearing primitive so a signature element can't be added uncited. Parallelizing the three audits (vs the spec's strict serial chain) saved wall-clock with zero conflict, since they're read-only over the same files.
