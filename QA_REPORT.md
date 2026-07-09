# QA_REPORT.md — QA-Breaker (Gate F / F2 / H)

Iteration: **from-scratch v0.1 build** · `node tests/calculators.test.mjs` → **67/67 PASS**.

## Gate F — behavior
```json
{"gate":"F","status":"pass","failed_checks":[],"minor":["beam input labels lack for= (a11y)"],"return_to":"app-developer (cleanup)"}
```
Beam rejects zero/negative L/E/load/section (no NaN/Inf leak); converter handles empty/NaN/unknown units; gibberish search → `kind:'none'`. Edge threads (M1.6, M24, 1/2-20, #4-40) + all fine pitches present. Temperature affine (0°C=32°F, 100°C=212°F, 0°C=273.15K). Mobile-safe: 44px targets, 64px search, focus-visible, reduced-motion, inputmode=decimal, results bottom-padding clears the keyboard, tables overflow-x.

## Gate F2 — value correctness (the whole game)
```json
{"gate":"F2","status":"pass","samples_checked":"75+","discrepancies":[],"overall_discrepancy_rate":"0.0%"}
```
- Thread geometry: M6 5.350/4.917, M8×1.25 7.188, M24 22.051 — match MH/ISO 68-1.
- Tap drill: M6 5.0, M8×1.25 6.75, M10 8.5 — match rule.
- **Clearance: ALL 14 ISO 273 metric rows verified (M1.6–M24, close/normal/loose) — 100% match.** The fresh transcription was correct (top risk for a from-scratch build, cleared).
- Conversions: 1 in=25.4, 1 ft=0.3048, 1 lb=0.45359237, 1 psi=6894.757293168 — exact (NIST SP 811, tier A).
- Beam: I=4.1667e-6, δ=0.4 mm, σ=12 MPa — match Euler–Bernoulli/Roark.

## Gate H — interaction stability (v0.1 baseline)
```json
{"gate":"H","status":"baseline"}
```
Baseline reflex flows recorded: metric uppercase + coarse default; unified key normalization (`1/4-20` no `#`, `10-24` → `#10-24`); converter default metric↔imperial; module order Threads·Tap drill·Clearance·Convert·Beam; no silent convention guessing. Future changes require a preserving alias (SPEC §7).
