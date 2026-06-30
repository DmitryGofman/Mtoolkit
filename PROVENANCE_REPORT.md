# PROVENANCE_REPORT.md — Provenance-Auditor (Gate G)

Iteration: v0.1 release candidate · 8 render paths checked.

## Gate G — provenance presence
```json
{"gate":"G","status":"fail","paths_checked":8,"violations":[{"id":"V-G-001","severity":"blocking","description":"Beam tip-deflection value rendered without a provenance badge","location":"index.html renderBeam()/recalc() → callout(sig(r.deflection*1000),'mm','tip deflection δ')","source_available":"yes — beamSource (SRC008) exists but is not rendered on the callout","return_to":"app-developer"}]}
```

**7 / 8 paths pass.** Thread geometry, tap drill, clearance, conversion, beam secondary results (σ, M, I), and both table views all carry visible badges with valid registry `sourceId`s, correct tiers (A only for NIST conversions; B for MH/ISO/ASME/Roark secondary), and inline units. Failure states (out-of-range size, missing clearance) correctly show "No verified value" + references — no silent guess.

**The one violation:** the `callout()` helper renders value + unit + label but no badge. For tap drill that's harmless (the same value is re-cited in the grid directly below), but the **beam tip deflection appears only in the callout** — so the module's signature output reaches the user uncited. Blocking under Gate G (zero exceptions). Routed to app-developer.

## Resolution + re-audit (this iteration)
Fix: `callout()` now accepts an optional provenance argument and renders `badge(prov)`; the beam deflection callout passes `out.source` (SRC008) and the tap-drill signature callout passes `td.source` (SRC004). The provenance-auditor re-ran Gate G against the fixed file:

```json
{"gate":"G","status":"pass","paths_checked":10,"violations":[],"v_g_001":"resolved","summary":"callout() renders badge(prov) when given; beam deflection passes out.source, tap-drill signature passes td.source; all 10 render paths carry source+tier+unit; no regression."}
```

**Gate G now PASSES.** V-G-001 resolved; 10/10 render paths carry source + tier + unit; failure states remain honest "No verified value" with references. Independently confirmed by the orchestrator in headless Chromium (deflection callout badge present, no JS errors).
