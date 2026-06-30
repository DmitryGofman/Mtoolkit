# Mtoolkit — Mechanical Reference + the factory that builds it

Two things live here, and the distinction matters (see `CLAUDE.md`):

1. **The app** — a search-first, source-cited mechanical engineering reference. Type `M6` and get thread geometry, tap drill, and clearance in one answer, every value showing its source, edition, and confidence tier. Single self-contained `index.html`, no build step, works offline after first load. *This is the factory's first product, and its proof.*
2. **The factory** — a reusable, auditable team of Claude Code agents (`.claude/agents/`) that turns a frozen spec into a shipped, source-cited app and iterates it through gates A–H. *This is the actual venture.*

## The bet

The market is full of machinist calculators that are fast-ish and broad. Almost none show **where each value came from**, and none do it with real craft. The differentiator, in priority order: **speed under interruption** → **provenance** (every value cites its source + confidence tier) → **beauty** (subject-grounded, not generic). One fabricated value would destroy that permanently — so the app never estimates: if a verified value doesn't exist, it says so.

## Run it

```
open index.html          # or just double-click — no server, no build
```

- **Search is the home screen.** Try `M6`, `M8x1`, `1/4-20`, `0.5 in → mm`, `beam`.
- Module chips (Threads · Tap drill · Clearance · Convert · Beam) are the fallback.
- Tap any **tier badge** (A–E) to expand the full citation: standard, authority, verification status.
- `◐` toggles dark mode (a first-class theme; in-memory only — no storage APIs).

## Test it

```
npm test                 # node tests/calculators.test.mjs  → 40 checks
```

The test loads the app's **pure data/logic block** directly from `index.html` (single source of truth — the app and the tests run the same math), then verifies:
- calculator purity (Gate D2) and
- sampled values against their cited sources — thread geometry, tap drills, clearance, conversions, beam (Gate F2: a value can be *cited and wrong*; this catches it), and
- that no value path exists without a registered source (Gate G).

An in-browser mirror runs at `index.html#selftest`.

## The five modules (MVP v0.1)

| Module | What | Source / tier |
|---|---|---|
| **Threads** | ISO metric M1.6–M24 + Unified #4–1/2": major/pitch/minor Ø | derived from ISO 68-1 / ASME B1.1 profile, cross-checked Machinery's Handbook 30th (B) |
| **Tap drill** | ~75% and ~50% engagement + material caveat | engagement rule + MH 30th (B) |
| **Clearance** | close / normal / loose hole Ø | ISO 273, ASME B18.2.8 (B) |
| **Convert** | inch↔mm + force/torque/pressure/mass/temp, live | NIST SP 811 — exact by definition (A) |
| **Beam** | cantilever tip deflection + bending stress, formula shown | Roark + Euler–Bernoulli (B) |

## Repository map

| Path | Role | Status |
|---|---|---|
| `index.html` | **the app** — data layer + calculators + UI in one file | shipped |
| `SPEC.md` | product definition | FROZEN v0.1 |
| `SOURCES.md` | the truth registry (source IDs, tiers, verification) | FROZEN v0.1 |
| `FACTORY.md` | the build system — roster, loop, gates A–H | canonical |
| `DESIGN_SYSTEM.md` | visual/interaction identity (mandatory artifact) | v0.1 |
| `CLAUDE.md` | orchestrator instructions | — |
| `FEATURE_BACKLOG.md` · `CHANGELOG.md` · `PROJECT_MEMORY.md` | build artifacts | — |
| `.claude/agents/*.md` | the 8 specialist agent definitions | — |
| `tests/calculators.test.mjs` | Gate D2 + F2 test | passing |
| `archive/` | drafting history (FACTORY_v2, SOURCES_v2, SPEC addenda) | provenance only |

## Honesty note on tiers

The MVP ships with **zero purchases**. Engineering tables cite the standard *number* at `Verified Against Secondary`, tier **B**, sourced from Machinery's Handbook 30th; unit conversions are tier **A** via the publicly available NIST SP 811. Acquiring the primary ISO/ASME documents only upgrades badges from B → A — it blocks nothing (SOURCES.md §11).
