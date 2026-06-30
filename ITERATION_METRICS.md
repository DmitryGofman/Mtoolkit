# ITERATION_METRICS.md

Three lines per pass: what was expensive, what was rework, what to do differently.

## v0.1 — first factory run (build verified through gates A–H)
- **Expensive:** the verification half — Reviewer (Opus, ~62k tok) and QA-Breaker (~62k tok) dominated; the read-only audits cost more than the build fix. Worth it: they're where the IP is.
- **Rework:** one blocking miss (Gate G: beam tip-deflection rendered through `callout()` with no badge) + one minor QA defect (F1: `#1/4-20` silent-fail) + one E2 nit (temp default). All three fixed in a single routed App-Developer pass; 9 regression tests added; no engineering value touched.
- **Do differently:** the `callout()` helper was the one render path that bypassed the `valRowBadge` provenance contract — next time, route *every* value through a single badge-bearing primitive so a signature element can't be added uncited. Parallelizing the three audits (vs the spec's strict serial chain) saved wall-clock with zero conflict, since they're read-only over the same files.
