# FEATURE_PLAN.md — v0.1 MVP (consolidated)

**Mode:** Planner Mode 2 (Feature plan). **Gate:** C2 — plan approved before any code.
**Scope guard:** SPEC §5 only — exactly the five modules. No feature beyond §5 is planned here; anything larger is v0.2+ backlog (FEATURE_BACKLOG.md, "deferred"), flagged, never silently added.

This is a *consolidated* plan for the whole v0.1 build (all five modules ship in one single-file app), written so a reviewer can check the implementation against it. The single-file architecture (SPEC §9.4) means `filesToChange` is one HTML file plus its test; per Gate C2 the *sections* of that file are named explicitly, both the ones to change and the ones to leave alone.

---

## feature

**v0.1 MVP — the five modules** (FEATURE_BACKLOG F-001..F-006):

- **F-001** — Search-as-spine + unified fastener view (P0). Home is a search field; one query (`M6`, `M8x1`, `1/4-20`, `#10-24`) returns thread + tap drill + clearance together (SPEC §3).
- **F-002** — Thread data, ISO metric M1.6–M24 + Unified #4–1/2" (P0). Nominal Ø, pitch, pitch Ø, minor Ø; geometry derived from the ISO 68-1 / ASME B1.1 profile, not a transcribed table (SPEC §5.1, SOURCES §7).
- **F-003** — Tap drill, both engagements (P0). ~75% (`D−P`) and ~50% (`D−0.6495·P`), with the harder-material caveat (SPEC §5.2).
- **F-004** — Clearance holes (P0). Close / normal / loose; metric per ISO 273, imperial subset per ASME B18.2.8 (SPEC §5.3).
- **F-005** — Unit conversion (P0). Inch↔mm + common engineering units (length, force, torque, pressure/stress, mass, temperature); the single fastest path, unit inline, convention never guessed (SPEC §5.4).
- **F-006** — Cantilever beam deflection (P1, architecture showcase). Tip deflection + max bending stress + section properties; formula and source shown; pure `f(inputs)→{result,formula,source}` (SPEC §5.5).

The four P0 modules are the daily-open core; F-006 is the one calculator that proves calculators inherit the same provenance discipline as the tables. The showcase must not dilute the core.

---

## filesToChange

1. **`index.html`** — the single self-contained file (SPEC §9.4). Two named regions inside it:
   - **The pure data + logic block** delimited by `/* @pure-start */` … `/* @pure-end */` (the `MTK` IIFE). This is the "data layer" (SPEC §9.1–9.3): source registry, `prov()` helper, ISO 68-1 constants, thread spec arrays + `buildMetric`/`buildUnified`, `tapDrill`, clearance tables + `clearanceFor`, conversion `categories`/`convert`/`convertTemp`, `beam`, the query parser (`parseQuery`/`findUnitCategory`), `threadsFor`. It must not touch the DOM and is loaded verbatim by the Node test — it is the single source of truth for app and tests.
   - **The UI layer IIFE** (everything after `/* @pure-end */`): the DOM-only block guarded by `if(typeof document==='undefined') return;`. Holds the registry-pattern renderers (`renderFastener`, `renderThreadList`, `renderConverter`, `renderBeam`, `renderTapDrillTable`, `renderClearanceTable`), the badge/provenance UI (`badge`, `tierName`, `callout`, `valRow`/`valRowBadge`), the search router (`render`, `openModule`, chips), theme toggle, and the `#selftest` mirror. Consumes `MTK`; never redefines data.
   - The inline `<style>` block (DESIGN_SYSTEM v0.1) and the static `<header>/<search-wrap>/<main>/<footer>` markup are part of this file and may be touched for the UI features (tier badges, callout, converter/beam inputs).

2. **`tests/calculators.test.mjs`** — the Node test (Gate D2 calculator purity + Gate F2 value correctness + Gate G provenance presence). It slices the `@pure-start`/`@pure-end` block out of `index.html`, evals it, and asserts against cited sources. Changes to the pure block's signatures or sampled values are mirrored here.

---

## filesNotToTouch

- **Frozen docs:** `SPEC.md`, `SOURCES.md`, `FACTORY.md` — frozen for v0.1; the plan conforms to them, it does not edit them.
- **`.claude/agents/*`** — agent charters (including this Planner's own).
- **`archive/*`** — superseded drafts; never re-edited.
- Out of this plan's write-scope but owned by other stages (do not edit as part of code work here): `DESIGN_SYSTEM.md`, `PROJECT_MEMORY.md`, `CHANGELOG.md`, `FEATURE_BACKLOG.md`, `README.md`, `CLAUDE.md`, `package.json`.
- Within `index.html`: the App-Developer must not move data/logic into the UI IIFE or DOM access into the pure block — the `@pure-start/@pure-end` boundary is a hard contract (the test depends on it; SPEC §9.1–9.3).

---

## dataModelChanges

The architectural core (SPEC §6, SOURCES §5): **provenance is part of the data model, not a footnote.** Three structures live in the pure block:

1. **Source registry** (`sourceRegistry`, SOURCES §4). Stable IDs `SRC001..SRC009`, each `{title, authority, type, tier, status}`. Records reference `sourceId`, never inline names. This is the at-a-glance truth map the UI badge reads from.

2. **Per-record provenance object** (`prov(sourceId, tier, verificationStatus, extra)`, SOURCES §5) that **travels with every value**:
   - `sourceId` → registry key.
   - `confidenceTier` — `A|B|C|D|E` (SOURCES §2 single scale).
   - `verificationStatus` — `Verified Against Primary | Verified Against Secondary | Imported | Pending Review` (the honesty enum, SOURCES §3).
   - `convention` — the governing convention, surfaced visibly (engagement %, ISO 273 fit series, ASME close/normal/loose, Euler–Bernoulli assumption). SPEC §6: where two conventions exist, force a visible choice — never guess.
   - `notes` — the at-most-one caveat (material caveat, "primary doc pending", "exact by definition").
   - plus optional `unitSystem`, `equation`, `table`, `section`, `page`. The object attaches to: every thread record (`prov`), the `tapDrill` result (`source`), each `clearanceFor` result (`source`), every `convert`/`convertTemp` result (`source`), the `beam` result (`source`).

3. **Domain registry pattern** (SPEC §9.5). Each domain = its own data structure independent of rendering: `threads` (built from `metricSpec`/`unifiedSpec` via pure builders), `clearanceMetric`/`clearanceImperial`, `categories`, `materials`. Adding a domain = add a data structure + a renderer entry; nav/search route into it data-driven. The reviewer test of the architecture (SPEC §9): a new table must be addable touching only the data layer.

**Honesty constraints baked into the data:** MVP ships at tier B / `Verified Against Secondary` citing SRC004 (Machinery's Handbook 30th) for threads/tap/clearance; conversions at tier A / `Verified Against Primary` via SRC009 (NIST SP 811, public); beam at tier B via SRC008 (Roark). No record claims tier-A primary verification it hasn't earned (enforced by test). No uncited value path exists; absent values use the "no verified value" path, never an estimate (SPEC §6 failure philosophy).

---

## uiChanges

All in the UI IIFE + static markup of `index.html`, per DESIGN_SYSTEM v0.1 (workshop/blueprint identity):

- **Search-as-spine router** (SPEC §3). `#q` is the hero, sticky, mono, autofocus — the home screen *is* the search field. Live input (60 ms debounce, no submit) → `MTK.parseQuery` → `render` routes to fastener / convert / module / list / none. Module chips are a fallback, not the spine. Reflex paths (search, conversion, thread lookup) stay stable (SPEC §7 / Gate H).
- **Fastener combined card** (`renderFastener`). One card shows thread geometry (major/pitch/pitch Ø/minor Ø), tap drill (both engagements + rule), and clearance (close/normal/loose) together — the "type M6 → see everything" view. Other pitches offered as variant links (alias paths, not silent default changes).
- **Converter** (`renderConverter`). Quantity + value + from/to selects; live output; copy button with confirmation microinteraction; convention shown; `≤2 actions` to a result (SPEC §8). Category change re-renders unit lists; convention never guessed.
- **Beam calc** (`renderBeam`). Length / material (E library) / load type (point | UDL) / section (rect b×h | round Ø) inputs; live `recalc`; outputs δ, σ, M, I with the formula shown; `≤0` inputs render the rejection message, not a number.
- **Tier badges with expandable provenance** (`badge`/`.prov`). Every value renders a tier badge; tapping expands source title, authority, tier name, verification status, source ID, convention, reference, and notes — the Gate G contract made visible. `Verified Against Primary` badges read `.primary` (green). The signature element is the cited dimension rendered as a **tolerance callout** (`callout`) for the headline value (tap drill 75%, beam δ).
- **Quality floor:** mobile-first, large tap targets, visible focus, tabular figures for data columns, reduced-motion respected, dark mode as a first-class system (in-memory toggle, no storage). Unit shown inline everywhere.

---

## testPlan

`tests/calculators.test.mjs`, run with `node tests/calculators.test.mjs` (Gate D2 + F2 + G), mirrored by the in-browser `#selftest`:

1. **Calculator purity** — the pure block is sliced out and run with no DOM; calculators are `f(inputs)→{result,formula,source}` (SPEC §9.3). Beam rejects `L≤0` and missing section dims with `{error}`, returns `{result,formula,source}` otherwise. App and tests share one source of truth (same block).
2. **Provenance rendering / presence (no value without a source)** — every thread carries a registered `sourceId`; tap drill, clearance, conversion, and beam results each carry a `source`; conversion is tier A; **no record claims false primary verification** (`A` + `Verified Against Primary` only if the registry source is tier A). This is the data-side guarantee that the UI cannot render an uncited value.
3. **Sampled value correctness vs cited sources** (a value can be cited and still wrong; this catches it):
   - Threads: M6 pitch Ø 5.350 / minor Ø 4.917; M8×1.25 7.188 / 6.647; M24 22.051 — must match Machinery's Handbook 30th.
   - Tap drill: M6 75% = 5.0 / 50% = 5.35; M8×1.25 = 6.75; M10 = 8.5.
   - Clearance: M6 6.4/6.6/7.0; M12 normal 13.5; M20 loose 24.0; 1/4-20 normal 0.281.
   - Conversion (exact by definition): 1 in→25.4 mm; 25.4 mm→1 in; 1 ft→0.3048 m; 1 lb→0.45359237 kg; 1 ksi→1000 psi; 0 °C→32 °F; 100 °C→373.15 K.
   - Beam: I = bh³/12; δ ≈ 0.4 mm and σ ≈ 12 MPa for the reference case; round I = πd⁴/64.
   - Parser: `M6`/`1/4-20`→fastener, `10 mm to in`→convert, `beam`→module, empty→empty.

Definition of done spot-check (SPEC §13): ≥3 thread rows, ≥3 tap drills, ≥3 clearance values verified against SOURCES.md — satisfied by the sampled checks above.

---

## risks

- **Thread-geometry constants drift the last digit.** Use exactly `K_PITCH = 0.649519` and `K_MINOR = 1.082532` (ISO 68-1) so M6 reads 5.350 / 4.917; a looser constant drifts the final digit and fails the sampled test (PROJECT_MEMORY "Recurring bugs"). Pinned by the value tests.
- **Imperial tap-drill *name* mapping deferred.** Imperial tap drills are shown as decimal inch + mm, not number/letter/fraction drill names, to avoid transcription risk; the name map is v0.2 backlog. Risk = a maker expecting a drill letter; mitigated by showing the decimal both ways. Must not be silently "filled in" with guessed names.
- **Convention guessed silently** (the cardinal sin, SPEC §6/§7). Two conventions (engagement %, fit class, unit system, load type) must force a visible choice; a default that silently picks one violates the differentiator. Risk if a future edit changes a default path — Gate H protects the reflex flows.
- **Imperial clearance gaps.** Only #10 + fractional sizes carry confident ASME B18.2.8 values; number sizes #4–#8 must use the "no verified value" path, not guessed values — `clearanceFor` returns `null` and the UI shows the failure message.
- **Source-edition / secondary-citation honesty.** Values cite the standard number at `Verified Against Secondary`, tier B, sourced from Machinery's Handbook; if primary ISO/ASME access is later obtained, badges *upgrade* but values must not silently change (could break a muscle-memory read). Edition differences are a known table risk.
- **Hash-only navigation does not re-run scripts.** `#selftest` must be verified with a full reload, not a hash change (PROJECT_MEMORY).
- **Mobile readability** of the combined fastener card / data grids — must stay thumb-reachable with the keyboard up (SPEC §8).

---

## rollbackCommit

`ca08f46` — "Build the Mechanical Reference app + factory scaffolding (v0.1)". Reset here if a gate fails.

---

**Gate C2 status:** all required sections present and explicit (feature, filesToChange with named sections, filesNotToTouch, dataModelChanges incl. the per-record provenance object, uiChanges, testPlan, risks, rollbackCommit). Scope stays within SPEC §5. No code edited.
