# PROVENANCE_REPORT.md — Provenance-Auditor (Gate G)

Iteration: **from-scratch v0.1 build** · 10 render paths checked.

## Gate G — provenance presence
```json
{"gate":"G","status":"pass","paths_checked":10,"violations":[]}
```

**100% of displayed values carry source + tier + unit. Zero exceptions.** All values route through two badge-bearing primitives — `callout()` (heroes) and `valRow()` (table rows) — both of which call `renderBadge()`.

| Path | Source | Result |
|---|---|---|
| Fastener hero (tap drill ~75%) | SRC004 B | PASS |
| Geometry rows (major/pitch/pitchØ/minorØ) | SRC004 B | PASS |
| Tap drill ~50% row | SRC004 B | PASS |
| Clearance close/normal/loose | SRC006/007 B | PASS |
| Clearance absent (#4-40, #6-32) | null → "No verified value" + refs | PASS |
| Thread-search pitchØ column | SRC004 B | PASS |
| Converter hero output | SRC009 A | PASS |
| Converter error state | null → message | PASS |
| Beam deflection hero | SRC008 B | PASS |
| Beam σ/M/I rows | SRC008 B | PASS |

**Tier honesty:** only SRC009 (NIST SP 811 conversions) claims tier A / Verified Against Primary; threads/tap/clearance/beam all tier B / Verified Against Secondary — correct. **Failure philosophy:** absent values render "No verified value" + references, never a guess.

**Note:** unlike the v0.1 prototype (which failed Gate G on an uncited beam-deflection callout), this from-scratch build passed Gate G on the first audit — the App-Developer applied the badge-bearing-primitive rule recorded in PROJECT_MEMORY, and the design pass's value-demotion preserved every badge. The factory's memory closed the loop.
