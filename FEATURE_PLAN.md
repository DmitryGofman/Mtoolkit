# FEATURE_PLAN.md — v0.1 MVP (from-scratch build)

Produced by the Planner (FACTORY §2, Mode 2) before any code is written. Covers all five SPEC §5 modules as one buildable unit, since the architecture (SPEC §9) is a single self-contained `index.html` and the modules share one pure block and one registry. Gate C2: the App-Developer may not write code until this plan is explicit.

**Build context:** this is a from-scratch build. There is no prior `index.html` and no `tests/` directory in the working tree. Do not look for, reference, or copy any earlier implementation — build directly from `SPEC.md`, `SOURCES.md`, and `DESIGN_SYSTEM.md`. `PROJECT_MEMORY.md`'s "Recurring bugs" and prior-iteration notes are carried forward below as constraints, not as code to find.

---

## feature

**v0.1 MVP — five modules, one architecture.**

| ref | name | priority |
|---|---|---|
| F-001 | Search-as-spine + unified fastener view | P0 |
| F-002 | Thread data (ISO metric + Unified subset) | P0 |
| F-003 | Tap drill sizes (both engagements) | P0 |
| F-004 | Clearance holes | P0 |
| F-005 | Unit conversion | P0 |
| F-006 | Cantilever beam deflection | P1 (architecture showcase) |

All six ship together in this single iteration: F-001 is the integration surface that consumes F-002/003/004's data, and F-005/F-006 share the same pure-function + provenance pattern. Splitting them across separate plans would fragment a single-file architecture for no benefit — they land as one `index.html` build, sequenced internally per `buildSequence` below.

---

## buildSequence

Three agents own disjoint regions of the same artifact. Each owns a clearly bounded section; no agent edits another's section directly — handoffs happen by the orchestrator re-invoking the next agent once a section is complete, not by agents reaching into each other's code.

### 1. Data-Builder — owns the data portion of the pure block
**Scope:** inside `/* @pure-start ... @pure-end */` in `index.html`, the *data* half only:
- The source registry (verbatim structure from SOURCES.md §4: `SRC001`–`SRC009`, fields `title/authority/type/tier/status/usedBy`).
- Per-record provenance objects matching the SOURCES.md §5 `Provenance` interface, attached to every thread row, tap-drill row, clearance value, conversion factor, and material modulus — never inline prose, always `sourceId` → registry.
- Domain data:
  - Thread table: M1.6–M24 (coarse + common fine) + UNC/UNF #4–1/2", with nominal Ø, pitch, major/minor/pitch Ø, each row provenance-tagged per SOURCES.md §6 (SRC001/002/003 metric, SRC005 Unified, SRC004 cross-check) — derived from the ISO 68-1 / ASME B1.1 profile formulas, not a verbatim copied table (SOURCES §7 licensing rule).
  - Thread-geometry constants: pitch-diameter offset `0.649519`, basic-minor-diameter offset `1.082532` (these must reproduce M6 = 5.350 / 4.917 mm exactly against Machinery's Handbook — see `risks`).
  - Tap drill table: ~75% and ~50% engagement values per thread, metric rule `drill ≈ D_major − pitch` documented alongside the stored value, material-caveat text in `notes`.
  - Clearance table: close/normal/loose Ø per fastener size, metric per ISO 273 (SRC006), imperial subset per ASME B18.2.8 (SRC007), SRC004 cross-check; honest gaps (e.g. imperial number sizes #4–#8 outside the confident range) must use the "no verified value" path, never a guessed number.
  - Conversion factor table: inch↔mm + common engineering units, exact factors (e.g. 1 in = 25.4 mm) marked `Verified Against Primary` / tier A via SRC009 (NIST SP 811); non-exact factors tiered honestly.
  - Beam-calc material library: E (Young's modulus) per material, cited to SRC008 (Roark) / standard handbook values.
- A `dataVersion` field (SOURCES §10 stub) at the top of the data block.

**Out of scope for Data-Builder:** no calculator functions, no query parser, no DOM, no rendering. Pure data + provenance objects only, shaped for the App-Developer's registry to consume.

### 2. App-Developer — owns logic, registry, rendering, tests
**Scope, after Data-Builder's section exists:**
- The *logic* half of the pure block: pure calculators `f(inputs) -> {result, formula, source}` for tap drill, unit conversion, and beam deflection (rect b×h and round d sections, tip point load + UDL mode, deflection + max bending stress + optional safety factor, Euler–Bernoulli, source = SRC008).
- The query parser: normalizes typed input (`M6`, `M8x1`, `1/4-20`, `#10-24`, `0.5 in`) into a lookup key. Must normalize the historical fragility class around mixed `#`-prefix conventions for number sizes vs. unprefixed fractional sizes consistently — define one canonical key shape and parse all input variants into it; a valid fastener callout must never silently fail to resolve.
- The domain registry pattern: `domain -> {label, data, renderer}` so F-001's search-as-spine and the module fallback tabs are data-driven, per SPEC §9.5.
- The UI layer (IIFE, DOM-only, no business logic): search-as-spine home screen, combined fastener view (thread + tap drill + clearance in one card for F-001), converter UI, beam-calc form, and the **single badge-bearing rendering primitive** every displayed value must route through (e.g. one `valRow`/`callout` component that always renders number + inline unit + tier badge). No second render path may print a bare number — see `risks`.
- `tests/calculators.test.mjs`: loads the pure block as the single source of truth (no re-implementation of calculator logic in the test file) and checks purity, sampled value correctness, and provenance presence (see `testPlan`).

**Sequencing dependency:** App-Developer's registry and renderer consume the data shapes Data-Builder defines, so App-Developer's section is written/finalized after Data-Builder's data structures exist (or in lockstep, with the data shape agreed first). The orchestrator should not hand App-Developer the rendering pass until thread/tap/clearance/conversion/material data is in place.

### 3. UI/UX-Designer — applies DESIGN_SYSTEM.md across the built UI
**Scope:** styling pass over the App-Developer's markup/CSS, not new structure or logic:
- Palette: the 6 named tokens (`--ink`, `--surface`, `--panel`, `--rule`, `--layout-blue`, `--graphite`) + semantic (`--valid`/`--caution`/`--error`), dark mode as a first-class quieter/sharper variant (toggle remembered in-memory only — no storage APIs).
- Type: tabular-figure monospace for every numeral/column, system humanist sans for UI chrome, no runtime web-font fetch.
- The tolerance-callout signature element wrapping the primary value of every result (dimension-line framing in `--layout-blue`, tier badge riding it like a balloon callout) — applied via the one badge-bearing primitive App-Developer built, not a one-off per screen.
- Layout: search as the hero (centered, large, autofocused), progressive disclosure (answer first, source/notes one tap down), mobile-first single column / desktop max ~720px measure.
- Ergonomics + a11y: touch targets ≥44px (primary actions ≥48px), visible `:focus-visible` ring (2px layout-blue, never removed), `prefers-reduced-motion` respected, all motion ≤160ms ease-out, empty/error states per DESIGN_SYSTEM §7 copy rules.

**Out of scope for UI/UX-Designer:** no changes to the pure block, no new calculator behavior, no new data fields — visual/interaction layer only, applied on top of what Data-Builder + App-Developer produced.

---

## filesToChange

- **`index.html`** (new file — does not yet exist). Two named regions, in this order:
  1. `/* @pure-start ... @pure-end */` — the pure data+logic block (Data-Builder's data section, then App-Developer's calculators/parser/registry section). No DOM access anywhere inside this delimiter.
  2. UI layer (IIFE, below/after the pure block) — DOM-only, consumes the pure block exclusively through the registry pattern. App-Developer builds structure/behavior; UI/UX-Designer applies DESIGN_SYSTEM.md styling within this same region.
- **`tests/calculators.test.mjs`** (new file — `tests/` does not yet exist). Loads `index.html`'s pure block as the single source of truth; no calculator logic duplicated in the test.

## filesNotToTouch

- `SPEC.md`
- `SOURCES.md`
- `FACTORY.md`
- `DESIGN_SYSTEM.md`
- `.claude/agents/*`
- `archive/*`

(`FEATURE_BACKLOG.md` and `PROJECT_MEMORY.md` are Planner/Orchestrator artifacts, updated by those roles only, not by build agents executing this plan.)

---

## dataModelChanges

**Provenance object** (attached to every value, no exceptions — matches SOURCES.md §5 verbatim, this plan does not modify the schema):

```typescript
interface Provenance {
  sourceId: string;            // → registry, e.g. "SRC004"
  confidenceTier: "A"|"B"|"C"|"D"|"E";
  verificationStatus: "Verified Against Primary"|"Verified Against Secondary"|"Imported"|"Pending Review";
  unitSystem?: "metric"|"imperial"|"both";
  convention?: string;         // tolerance class, engagement %, fit series
  table?: string; section?: string; page?: string; equation?: string;
  dateVerified?: string; verifiedBy?: string; notes?: string;
}
```

**Source registry** (SOURCES.md §4, reproduced inside the pure block as data, not re-derived): `SRC001`–`SRC009`, each `{title, authority, type, tier, status, usedBy}`. Stable IDs only; records reference `sourceId`, never full titles inline.

**Domain registry pattern** (SPEC §9.5): `domain -> {label, data, renderer}` covering `threads`, `tapDrill`, `clearance`, `conversion`, `beam`. This is the seam that proves "adding a domain touches only the data layer" (SPEC §9 definition of done) — the UI never special-cases a domain by name outside this map.

No deviation from the SOURCES.md-defined schema is authorized by this plan. If a build agent finds the schema insufficient mid-build, that is a blocker to raise to the Orchestrator/human, not a silent field addition.

---

## uiChanges

(New build — this section describes what is being created, not a diff.)

- Home screen: single autofocused search field, centered, large type (scale step 28/40). Module chips/tabs as a quiet fallback below, not the primary nav (SPEC §3).
- Unified fastener view (F-001): one query (`M6`) renders thread + tap drill + clearance together in one card, each value through the badge-bearing primitive.
- Converter (F-005): type a number, converted value updates live, unit always inline, no submit button.
- Beam calc (F-006): inputs for length/section/material/load; outputs (deflection, max bending stress, optional safety factor) rendered through the same provenance primitive, formula shown alongside the result.
- Tier badge: `A`–`E` letter always visible; badge color encodes verification status (`--valid` for Verified-Against-Primary, `--graphite` for Secondary/Imported), expands on tap to `sourceId · standard · verification status`.
- Failure state: "No verified value" + available references, styled with `--error`, never a blank or guessed cell.
- Dark mode toggle, in-memory only.

---

## testPlan

`tests/calculators.test.mjs`, loading the pure block as the single source of truth:

1. **Purity check** — the pure block contains no DOM references (no `document`, `window`, `querySelector`, etc.) when loaded standalone in Node; calculators are deterministic (same input → same output, no hidden state/time dependency).
2. **Provenance-presence check** — every record returned by every domain in the registry (threads, tap drill, clearance, conversion, beam material library) carries a non-empty `sourceId` that resolves to an entry in the source registry, plus `confidenceTier` and `verificationStatus`. Fails the build if any value path can return a number without a provenance object — this is the machine-checkable form of the DESIGN_SYSTEM §8 badge contract.
3. **Sampled value correctness vs. cited sources** — spot-check at least 3 thread rows, 3 tap drills, 3 clearance values (SPEC §13 definition-of-done requirement), plus conversion factors and one beam-calc case, against the values implied by SOURCES.md and Machinery's Handbook 30th:
   - M6 coarse: pitch Ø = 5.350 mm, minor Ø = 4.917 mm (using the 0.649519 / 1.082532 constants — exact match required, not rounded-close).
   - At least one ISO 273 clearance value checked against the standard's actual close/normal/loose figures (transcription risk — see `risks`).
   - 1 in = 25.4 mm exactly, tier A, Verified Against Primary.
   - One beam deflection case hand-computed against Euler–Bernoulli and compared to the calculator's output within floating-point tolerance.
4. **Query parser correctness** — `M6`, `M8x1`, `1/4-20`, `#10-24` all resolve to a registry entry; verify the number-size vs. fractional-size key convention is applied consistently (no silent failure to resolve a valid callout).
5. **Beam calculator input validation** — rejects ≤0 length/section/load inputs with an explicit error, not a NaN or silent fallback.

---

## risks

- **Thread-geometry constants** — pitch-diameter offset `0.649519` and basic-minor-diameter offset `1.082532` must be used exactly. A looser/rounded constant drifts the last digit of derived values (e.g. M6 must read 5.350 / 4.917 mm, not 5.349 or 5.351). Mitigation: hard-code these as named constants in Data-Builder's section with a comment citing the derivation, and assert the M6 sample in the test plan.
- **Clearance values are transcription-risk** — ISO 273 (and ASME B18.2.8 for imperial) values must match the standard exactly; this is hand-transcribed data with no automated cross-check against the primary document (SRC006/007 are `Pending Access` per SOURCES.md openDecisions). Mitigation: cite SRC004 (Machinery's Handbook, tier B) honestly at `Verified Against Secondary` rather than overclaiming tier A; flag any clearance value the agent is not confident in as "no verified value" rather than guessing (SPEC §6 failure philosophy).
- **Never guess a convention** — where metric vs. imperial, or engagement %, or fit class is ambiguous, the UI must force a visible choice, never silently default. A query parser or renderer that picks a convention without surfacing it violates SPEC §6.
- **Badge-contract bypass (recurring risk class)** — any render path that prints a number without routing through the single badge-bearing primitive ships an uncited value, which SPEC §6 calls out as catastrophic to the differentiator ("one fabricated value destroys the differentiator permanently"). Mitigation: App-Developer implements exactly one primitive for displaying a sourced value; UI/UX-Designer must style that primitive rather than introducing a second display path; this is the single highest-value check for the Reviewer/Provenance-Auditor stage to re-run before Gate G.
- **Mixed key-prefix convention for fastener sizes** — number sizes (`#10-24`) and fractional sizes (`1/4-20`) have structurally different string shapes; a parser that handles one path and not the other will silently fail to resolve a valid query. Mitigation: define and document one canonical internal key shape in the query parser before wiring the registry lookups, and cover both shapes explicitly in the test plan.
- **Imperial clearance/tap-drill gaps** — number sizes #4–#8 may fall outside confidently-sourced clearance data. Mitigation: ship the honest "no verified value" path for those cells rather than inventing or extrapolating a number.
- **Single-file scale risk** — five modules' data + logic + UI inline in one HTML file raises the chance of accidental coupling between Data-Builder's and App-Developer's sections. Mitigation: enforce the `@pure-start`/`@pure-end` delimiter strictly and keep the data sub-section and logic sub-section visually separated within it so the boundary survives sequential edits.

---

## rollbackCommit

`c940bd7` — "factory: reset app to zero for a from-scratch build." This is the clean starting point (no `index.html`, no `tests/`) to reset to if any gate fails during this build cycle.

---

**Gate C2 status:** plan is explicit — features, file scope, data model, test plan, risks, and rollback are all named. App-Developer (and the other two build agents per `buildSequence`) may proceed.
