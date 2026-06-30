# RELEASE_NOTES.md

## v0.1.0 — Mechanical Reference (release candidate)

The factory's first product: a search-first, source-cited mechanical engineering reference, shipped as a single self-contained `index.html`. Built from the frozen SPEC + SOURCES and carried through the full gated loop (A–H) by the agent factory.

**What it does**
- Type `M6` (or `1/4-20`, `#10-24`, `0.5 in → mm`, `beam`) and get the answer in one view — thread geometry, tap drill (~75% & ~50%), and clearance together.
- Five modules: threads (ISO metric M1.6–M24 + Unified #4–1/2"), tap drills, clearance holes (ISO 273 / ASME B18.2.8), unit conversion (NIST SP 811, exact), cantilever beam deflection (Roark / Euler–Bernoulli).
- Every value shows its source + confidence tier + unit; tap the badge for the full citation. Nothing is ever estimated — uncitable values show an honest "no verified value".
- Works offline after first load; dark mode; mobile-first; no login, no build step.

**How it was built (the factory ran, not just the author)**
- Planner → FEATURE_PLAN (Gate C2). Sourcer → source map + 5 web-verified values (Gate B).
- Reviewer → architecture + code (E1/E2). QA-Breaker → behavior + 19/19 value spot-checks at 0.0% discrepancy (F/F2) + interaction baseline (H).
- Provenance-Auditor caught a real defect — the beam deflection rendered uncited (Gate G fail) — which was routed back, fixed, and re-audited to PASS.

**Honesty on tiers:** engineering tables ship at tier B / Verified Against Secondary (Machinery's Handbook 30th, citing the standard numbers); conversions are tier A via public NIST SP 811. Acquiring primary ISO/ASME documents only upgrades badges — it blocks nothing.

**Verification:** `npm test` → 49 checks pass. In-browser self-test at `index.html#selftest`.

**Known limitations (v0.2 backlog):** imperial tap drills shown as decimal inch + mm (not drill letter/number names); imperial clearance limited to #10 + fractional sizes; fits/limits, materials DB, and citation-export deferred.
