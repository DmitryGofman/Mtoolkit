# QA_REPORT.md — QA-Breaker (Gate F / F2 / H)

Iteration: v0.1 release candidate · `node tests/calculators.test.mjs` → **40/40 PASS**

## Gate F — behavior
```json
{"gate":"F","status":"pass","failed_checks":["unified fractional lookup with leading # prefix"],"offending":{"defect_id":"F1","description":"'#1/4-20' parses to sizeKey '#1/4-20' but data key is '1/4-20'; valid fastener silently shows 'no match'","trigger":"parseQuery('#1/4-20') → threadsFor → []","severity":"minor — canonical '1/4-20' works"},"return_to":"app-developer"}
```
Beam rejects zero/negative L,E,load,section; converter handles empty/NaN; gibberish search falls to honest "no match". Edge threads (M1.6, M24, 1/2-20, #4-40), fine pitches, temperature affine, torque/pressure categories all behave. Defect F1 is the one real papercut → fixed this iteration.

## Gate F2 — value correctness (the whole game)
```json
{"gate":"F2","status":"pass","samples_checked":19,"discrepancies":[],"overall_discrepancy_rate":"0.0%"}
```
- Threads (4): M6 pitchØ 5.350 / minorØ 4.917 · M8×1.25 pitchØ 7.188 · M24 pitchØ 22.051 — match MH/ISO 68-1.
- Tap drill (4): M6 75%=5.0 / 50%=5.35 · M8×1.25 75%=6.75 · M10 75%=8.5 — match rule.
- Clearance (5): M6 6.4/6.6/7.0 · M12 normal 13.5 · M20 loose 24.0 — match ISO 273.
- Conversion (4): 1 in=25.4 mm · 1 ft=0.3048 m · 1 lb=0.45359237 kg · 0°C=32°F — match NIST SP 811.
- Beam (2): δ≈0.4 mm, σ≈12 MPa for L=1,E=200e9,rect 0.05×0.1,P=1000 — match Roark/Euler–Bernoulli.

## Gate H — interaction stability (v0.1 baseline)
```json
{"gate":"H","status":"baseline"}
```
No prior release to regress against. Frozen reflex-flow baseline for future iterations: metric sizes uppercase + coarse default; unified fractional canonical form `1/4-20`; converter default metric↔imperial (in↔mm); empty input shows hints (no default module — search-as-spine preserved); module order Threads·Tap drill·Clearance·Convert·Beam; beam defaults Structural steel + rect + tip point load. Any change to these must ship with a preserving alias (SPEC §7).
