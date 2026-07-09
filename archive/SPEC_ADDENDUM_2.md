# SPEC_ADDENDUM_2.md — research-driven refinements (v0.1)

Source: three deep-research reports (two English, one Hebrew) grounded in real App Store/Play reviews, practitioner forums, vendor pricing, and UX research. Unusually high-confidence because the three passes converge independently. This addendum captures only findings that change a build decision. SPEC.md's four-module scope is revisited in §7 (one open decision for Dima).

---

## 1. The reframe: speed-under-interruption is the product (provenance makes it trustable)

The frozen differentiator was "beautiful + citation-first." The research corrects this: the load-bearing differentiator is **the fastest path to a *trustworthy* value, mid-task, under interruption.** Provenance is what makes the speed safe to act on; beauty amplifies. Lose the speed moment and no breadth or polish creates daily use.

**Decision:** the "type M6 → see everything" interaction is not one feature among four modules — it IS the product. The home screen is a **search field**, not module tabs. Tabs are the fallback; search is the spine. Modules are content poured into that interaction.

## 2. "Decide, don't learn" (behavioral core)

Every micro-task is a *decision*, not a study session. The user wants: value + unit + class/fit + source + at most one note ("close fit"). Not an explanation. 

**Decision:** MVP results are answer-shaped, not article-shaped. No tutorial/encyclopedic content. This is positive evidence for the reference-first choice already made — now backed by data, not just intuition.

## 3. Interaction stability = retention infrastructure (NEW — strongest new principle)

The #1 uninstall trigger across all three reports: **an update breaking a muscle-memory flow.** A conversion used "hundreds of times a day," changed by an update → trust gone, uninstalled. In a reflex tool, a small interaction regression feels like sabotage.

**Decisions (frozen principles):**
- Never silently change unit defaults, input order, or the fastest path to a common lookup.
- If a core flow must change, **preserve the old path as an alias.**
- This becomes a **new factory gate** (see §8): no change ships if it alters an established interaction path without an alias.

## 4. Units and assumptions, painfully explicit (trust)

Recurring trust-failure: user can't tell if a result is mm or inch ("may as well be in Chinese"). 

**Decisions:**
- Every result shows its **unit inline** and its governing convention.
- Where two conventions exist, **force a visible choice — never guess.**
- Provenance expands: not just "which standard," but "which unit system / which convention," shown. Folds into the provenance object and Gate G.

## 5. Confidence tiers — independently validated

All three reports arrive at displayed confidence levels independently (Hebrew: High/Medium/Derived/Vendor/Community). This confirms the 5-tier scale already frozen in SOURCES_v2 (A–E). Three independent passes converging = high confidence this was right. No change needed; noted as validation.

## 6. Input ergonomics as a first-class design constraint (NEW)

Concrete and physical: users wear gloves, stand at a machine, the on-screen keyboard hides the drawing, noise/speed pressure. "Multiple presses to enter a value" is a job-breaker.

**Decision — added to the UI/UX-Designer charter (SPEC §7 / FACTORY DESIGN_SYSTEM):**
- Generous touch targets; minimal keystrokes to a result.
- No input fields hidden behind the keyboard.
- The fastest common lookups reachable in ≤2 actions.
- This is a *functional* constraint, not aesthetic polish.

## 7. MVP module reshuffle — ONE OPEN DECISION for Dima

Research strongly validates threads + tap drills + clearance as top-frequency "daily-open" tasks. Two flags:
- **Unit conversion (inch↔mm)** appears as possibly the *single highest-frequency* micro-task across all three reports — and it is NOT in the frozen MVP.
- **Cantilever beam calc** is architecturally valuable (proves calculators inherit provenance) but is a *lower-frequency* task than conversion or fits on pure daily-use evidence.

**The tension:** "showcase the architecture" (beam calc) vs "win the daily-open moment" (conversion). Both can't be the 4th slot without scope creep.

```yaml
openDecision:
  id: MVP-4th-module
  options:
    A: "Keep beam calc as 4th module (showcases provenance-on-calculations; lower daily frequency)"
    B: "Swap in high-frequency unit conversion as 4th module; defer beam calc to v0.2"
    C: "Both, accept slightly wider MVP (risks scope creep — research warns against breadth)"
  research_lean: "B on pure daily-use evidence; A if architectural proof matters more for v0.1"
  owner: Dima
  blocksBuild: false
```
My read: if v0.1's job is to *prove the factory and the provenance architecture*, keep the beam calc (A). If v0.1's job is to *win a real user's daily habit immediately*, swap in conversion (B). Given the factory is the actual venture and v0.1 is its proof, A is defensible — but B is what the daily-use data points to. Your call.

## 8. NEW factory gate — Gate H: interaction stability / regression

Add to FACTORY_v2's gate set. Enforces §3.

```
Gate H — Interaction stability
- No established interaction path (unit default, input order, fastest-lookup route) changed without an alias preserving the old path.
- Core reflex flows (search → result, unit conversion, thread lookup) verified unbroken against the prior release.
- Any intentional change to a core flow is logged in CHANGELOG with the alias that preserves muscle memory.
Placement: runs at iteration time (re-entry), between Gate F2 and Gate G.
Rationale: in a reflex tool, a silent regression is the top uninstall trigger. The factory's gate structure is uniquely able to enforce this mechanically across iterations.
```

## 9. Monetization reality (informs venture, not v0.1 build)

Not a build decision, but a frozen strategic finding so it isn't relitigated:
- **Single-user reference tool → compulsory subscription is a growth blocker, not an engine.** Strong, consistent evidence (machinists actively prefer one-time; one would "never" buy a subscription version).
- Supported path: **free core (proves speed+trust) → one-time Pro unlock → subscription only later** when the product adds living-standard updates, citation exports, saved workspaces, cross-standard compare, or team/approval features (i.e. crosses from "utility" to "platform").
- This mirrors the hardware-curriculum lesson: the subscription's budget owner is a *team/org*, not an individual. B2B authority buyers already pay for standards (Machinery's Handbook Digital ~$175, ASME B1.1 ~$215) — the Pro/Team tier sells *source operations* (citation workflow, edition diffs, audit), not "more calculators."

---

## Adoption summary
**Adopted (changes a decision):** search-as-spine reframe (§1); answer-not-article (§2); interaction-stability principle + Gate H (§3, §8); explicit units/convention (§4); input-ergonomics constraint (§6); monetization guardrail (§9).
**Validated (already frozen, now confirmed):** confidence tiers (§5), reference-first identity, offline-after-load.
**Open for Dima:** the 4th-module decision (§7) — beam calc vs unit conversion.
**Confidence note:** higher adopt rate (~80%) than the earlier upgrade files because this is grounded in real reviews and converges across three independent research passes — not aspirational prose.
