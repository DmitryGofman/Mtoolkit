# CHANGELOG.md

Why each thing exists + the gates it passed. Newest first.

## v0.1.1 — interactive visuals + delight (subject-grounded)

Made the UI livelier without betraying the "trustworthy engineering tool" identity — delight that *confirms understanding*, on the workshop/blueprint theme.

- **Animated cantilever beam diagram** — the beam module draws an SVG that bends to the real cantilever curve shape (point: x²(3−x); UDL: x²(6−4x+x²)), normalized so the deflection is always visibly ~12% of span; hatched fixed support, load arrow (point/UDL), `L`/`δ`/`P` symbol labels; tweens smoothly (~250ms) when inputs change. Shape math is a pure `beamShape()` helper in the `@pure-start` block (tested).
- **Thread cross-section schematic** — a 60°-V profile with `d`/`d₂`/`d₁`/`P` dimension leaders in the fastener card, reinforcing the tolerance-callout identity.
- **Result-reveal motion** — dimension lines draw in (stroke), the hero value counts up (~250ms), and the empty/home state gained a blueprint grid + caliper motif with dashed quick-start chips ("What size are you working with?").
- **Provenance-safe:** the SVGs carry symbols only, no uncited numbers — every real value still routes through the badged chip primitive (Gate G intact). All new motion is disabled under `prefers-reduced-motion` (JS rAF loops gated on `matchMedia`; CSS covered by the global reduce rule).
- Tests: added `beamShape` pure-function checks → **78 passing**. Headless verified (beam reshapes on input, thread schematic present, no JS errors, `#selftest` green).

## v0.1.0 — rebuilt from scratch by the factory (RELEASE CANDIDATE)

The app was rebuilt from zero to exercise the factory's **build half** end-to-end (the prior RC was preserved in history at 3da0791). The build agents constructed everything from the frozen SPEC + SOURCES + DESIGN_SYSTEM; the gate agents verified it.

**Built by**
- Data-Builder → pure data layer (40 thread records w/ derived geometry, all 14 ISO 273 clearance rows + ASME subset, NIST conversions, beam materials), every value cited, DOM-free (Gate C).
- App-Developer → `beam()/parseQuery()/threadsFor()/findUnitCategory()` + full search-as-spine UI through a single badge-bearing render primitive + `tests/calculators.test.mjs` (Gate D2 — 67 tests).
- UI/UX-Designer (Opus) → restored the signature: one 40px tolerance-callout hero per result, geometry/clearance/σ-M-I demoted to quiet tabular rows; inline copy; a11y/ergonomics (Gate D).

**Gate outcomes (all pass, zero gate failures)**
- E1/E2 ✅ (badge primitive survived the design restructure) · F ✅ · **F2 ✅ 0.0% discrepancy across 75+ values incl. all 14 fresh-transcribed ISO 273 rows** · G ✅ (10/10 paths cited on the first audit — the v0.1 uncited-callout defect did not recur) · H ✅ baseline.

**Fixed**
- Cleanup pass (Reviewer/QA nits): removed dead `state.expandedBadges` + unused `renderBadge` param, corrected a stale comment, added `label[for=]` to beam/convert inputs (a11y), moved chip-seed strings into `registry[key].seed`.
- **Beam default hotfix (gate escape):** the showcase opened at `0.0000 mm` because the default length shipped as 1 mm; the UI converts mm→m correctly, but Gate F2 had verified the pure `beam()` (metres) without exercising the UI wiring, so it missed the bad default. Default length → 1000 mm; hero now reads `0.4000 mm` (matches the Node oracle). Lesson recorded in PROJECT_MEMORY + ITERATION_METRICS.

**All gates A–H pass → release candidate.**

## v0.1.0 — verified through the factory

The factory was run end-to-end as an agent team (orchestrator + specialists), not authored solo. This pass produced the full artifact chain and caught + fixed a real provenance defect through the gates.

**Factory run**
- `FEATURE_PLAN.md` (Planner, Gate C2); source map verified + 5 values web-checked (Sourcer, Gate B).
- `REVIEW_REPORT.md` (Reviewer, E1/E2 pass), `QA_REPORT.md` (QA-Breaker, F pass / F2 19-of-19 at 0.0% discrepancy / H baseline), `PROVENANCE_REPORT.md` (Provenance-Auditor, G).
- `ITERATION_METRICS.md`, `RELEASE_NOTES.md` added.

**Fixed (gate-routed re-entry)**
- **Gate G (blocking):** the beam tip-deflection rendered through `callout()` with no source badge — an uncited value path. `callout()` now carries provenance; beam deflection and the tap-drill signature callout self-cite. Re-audited → Gate G PASS.
- **Defect F1 (QA Gate F):** `#1/4-20` (and `10-24`) parsed to a key the data didn't have, so a valid fastener silently showed "no match". `parseQuery` now normalizes unified size keys. 9 regression tests added.
- **E2 nit:** the temperature converter defaulted to °C→°C identity; `defaultTarget` now gives a real default (°C→°F, K→°C).
- Tests: 40 → **49 checks, all pass.** No engineering value or provenance datum changed.

**All gates A–H pass → release candidate.**

## v0.1.0 — first build

The factory's first product: a search-first, source-cited mechanical reference, shipped as a single self-contained `index.html`. Built against the frozen SPEC.md + SOURCES.md through the FACTORY loop (A–H).

**Added**
- **`index.html`** — the app. Search-as-spine home; `type M6 → thread + tap drill + clearance in one view`. Five modules: threads, tap drill, clearance, unit conversion, cantilever beam.
- **Provenance in the data layer** — every record carries a `provenance` object (sourceId, tier, verification status, convention, notes); the UI surfaces a tier badge that expands to the full citation. No value renders without a source (Gate G contract).
- **Registry-driven architecture** — data lives in one delimited pure block (`@pure-start`/`@pure-end`), separated from all DOM; calculators are pure `f(inputs)→{result,formula,source}`. A new domain is a data object + a renderer; no rendering code is touched to add a table (SPEC §9).
- **Failure philosophy, visible** — out-of-band sizes and missing imperial clearance render an honest "No verified value" + available references; nothing is estimated (SPEC §6).
- **`DESIGN_SYSTEM.md`** — workshop/blueprint identity; the signature tolerance-callout dimension; tabular figures for all data; dark mode as a first-class system; reduced-motion respected.
- **`tests/calculators.test.mjs`** — loads the app's pure block (single source of truth) and verifies calculator purity (Gate D2) + sampled value correctness against cited sources (Gate F2). An in-browser `#selftest` mirrors it.
- Factory scaffolding placed in-repo: `.claude/agents/` (8 roles), `CLAUDE.md` (orchestrator), `PROJECT_MEMORY.md`; drafting history moved to `archive/`.

**Data + sources**
- Thread geometry derived from the ISO 68-1 / ASME B1.1 60° profile (`d2 = d − 0.6495·P`, `d1 = d − 1.0825·P`), cross-checked against Machinery's Handbook 30th — stored as derived values, never verbatim tables (SOURCES §7). Tier B / Verified Against Secondary (primary ISO/ASME pending — upgrades badges only, blocks nothing).
- Tap drill rule-derived (~75% `D−P`, ~50% `D−0.6495·P`), material caveat surfaced.
- Clearance: ISO 273 (metric, 3 fits), ASME B18.2.8 subset (imperial).
- Conversions: NIST SP 811, exact-by-definition → tier A / Verified Against Primary.
- Beam: Roark + Euler–Bernoulli; provenance on the result, formula shown.

**Gates passed**
- A/A2 scope + backlog · B sourced · C data/UI separation · C2 plan · D/D2 feature + 40 passing tests · E1/E2 architecture + code · F/F2 behavior + sampled value correctness · G 100% provenance presence · H interaction paths established (baseline for v0.1).

**Interaction-stability baseline (Gate H):** the established reflex paths frozen as of v0.1 — `search→result`, the metric/imperial fastener lookup, live conversion (type→read), the metric-default converter. Future changes to any must preserve an alias (SPEC §7).
