# CHANGELOG.md

Why each thing exists + the gates it passed. Newest first.

## v0.1.0 — first build (RELEASE CANDIDATE)

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
