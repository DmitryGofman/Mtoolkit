# SPEC_ADDENDUM.md — adopted refinements (v0.1)

Extends SPEC.md without expanding MVP scope. Pulls in only the high-value ideas from SPEC_REVIEW_IMPROVEMENTS.md; declines the rest with reasons so the decisions are auditable. SPEC.md's four-module MVP (threads, tap drills, clearance holes, beam calc) is UNCHANGED.

---

## 1. Failure philosophy (NEW hard rule — highest-value addition)

For an engineering tool, a missing value must never be filled by a guess. Hard rules, non-negotiable, enforced by the Provenance-Auditor:

- **Never estimate. Never invent.** If a verified value does not exist, the app does not show a number.
- **Show the gap honestly.** Display "no verified value" + whatever references *are* available, never a silent placeholder or interpolation.
- **Trust outranks completeness.** A smaller app where every shown value is real beats a fuller app with one fabricated number. One invented dimension destroys the differentiator permanently.

This is the failure-state counterpart to Gate G: Gate G says every shown value is cited; this rule says an *uncitable* value is not shown at all.

## 2. Confidence levels (NEW — strengthens provenance)

Every value carries an evidence-strength tier, displayed, not just stored. Slots into the existing provenance object's `confidence` field (FACTORY_v2 §11), replacing the free-text high/medium/low with a defined ladder:

| Tier | Meaning | Example |
|---|---|---|
| **Standard** | Primary authoritative standard | ISO 273, ASME B1.1, verified against the document |
| **Handbook** | Official consolidated handbook | Machinery's Handbook 30th ed. |
| **Reference** | Recognized engineering reference | Roark's, established eng. text |
| **Community** | Community/aggregator, use with care | forum charts, unverified web tables |

The UI surfaces the tier on the source badge (e.g. a small "Standard" / "Handbook" marker). This turns "cited" into "cited, and here's how strong the citation is" — a real upgrade to the differentiator. A value populated from a consolidated source but citing the standard *number* honestly reads `Handbook` (or `Reference`), never `Standard`, until verified against the primary document.

## 3. Record schema (confirms + makes explicit)

Each data record carries, at minimum:
```
{ id, displayName, <engineering values>, source, revision, confidence, notes }
```
Most of this is already in SOURCES.md's provenance object. The additions made explicit: `revision` (standard edition / handbook edition at record level) and `confidence` (the tier above). `notes` carries caveats (e.g. material-dependent tap %).

## 4. Offline-after-load (NEW — cheap, on-brand)

The app must work fully offline once loaded. This is nearly free given the single-file architecture and directly serves the workshop / air-gapped use case that runs through the whole product line. No service-worker complexity required for v0.1 beyond what a single self-contained file already gives; just ensure no runtime dependency on a live network call. Confirmed at Gate F.

## 5. Performance guardrails (adopted as architecture protection, not goals)

Targets — but framed as *guardrails that keep the architecture simple*, NOT as goals that justify a build pipeline:
- Startup < 1s, search < 100ms, smooth on mobile.
- **These are trivially met by the single-file approach as long as motion stays restrained.** If hitting them ever seems to require a bundler/framework, that's a signal the design over-animated, not that the architecture is wrong. The single self-contained HTML file is the bet; these numbers protect it.
- Bundle-size / render-perf checks fold into Gate E2 (code quality) — not a separate checklist.

## 6. Design north-star — clarified (deliberate divergence from the review file)

The review file proposes Linear / Arc / Apple as the reference. **We adopt their *level of craft*, not their *look*.** Reason: "calm palette + subtle motion + whitespace" is the generic premium-app default that every AI-generated UI now converges on; copying it surrenders the one differentiator design can give us. SPEC §7's subject-grounded direction stays primary:
- Identity from the workshop's own world (calipers, blueprint conventions, tolerance callouts), not from other software.
- Signature element remains: a cited dimension rendered like a tolerance callout on a drawing.
- "Match Linear's craft and restraint" is the *quality bar*; "look like Linear" is explicitly not the goal.

---

## Declined from the review file (with reasons)

- **Eight one-word principles (Trust/Instant/Beautiful/…).** Declined as spec content: virtue lists don't constrain build decisions, and the two that carry weight (Trust, Failure Philosophy) are captured above as hard rules. Aspirational prose dilutes a frozen spec.
- **Roadmap (v0.2 Fits → v1.0 platform) inside the SPEC.** Declined here, moved to FEATURE_BACKLOG.md (FACTORY_v2). A roadmap in the frozen MVP spec invites building toward v1.0 instead of shipping v0.1. Also flagged: the file silently redefined v0.1 as "Threads only" — rejected; the four-module MVP stands.
- **Parallel review checklist.** Declined as a standalone list; its one new item (bundle/render perf) merged into Gate E2 to avoid two drifting sources of truth.
```
