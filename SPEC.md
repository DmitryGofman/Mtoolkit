# SPEC.md — Mechanical Reference (working title)

**Status:** FROZEN for MVP v0.1. Single source of truth for the product definition. Supersedes all prior SPEC drafts and addenda.

**One-line:** The fastest path to a *trustworthy* mechanical engineering value, mid-task — every value traceable to its source. Search-first, reference-first, source-cited.

---

## 1. The differentiator (read first — this is the whole bet)

The market is full of machinist calculators and reference sites. They are calculator-first, visually dated, platform-locked, and — critically — **do not show where each value comes from.** But the research is blunt about what actually drives daily use: it is not breadth, and not beauty alone. It is **the fastest path to a trustworthy value, in context, under interruption.**

So the differentiator is layered, in priority order:
1. **Speed under interruption** — the user arrives mid-task with a formed need ("M6", "tap drill 1/4-20", "H7/g6") and gets the answer in seconds. This is the job.
2. **Provenance** — every value shows its source, edition, and confidence tier. This is what makes the speed *safe to act on*. No competitor does this well.
3. **Beauty** — genuine, subject-grounded design. This *amplifies* the first two; it does not substitute for them.

Lose the speed moment and no amount of provenance or polish creates retention. Win it, and provenance legitimizes it and beauty makes them keep it open.

## 2. Audience

Two users, one product:
- **Degreed mechanical engineer** — wants the right value fast and wants to trust it (tolerance class, standard reference).
- **Maker / hobbyist** — wants "what drill for an M6 tap in aluminum" without a textbook.

Design serves the engineer's rigor without intimidating the maker. The result is a *decision*, not a lesson (see §4).

## 3. The interaction IS the product

The home screen is a **search field, not module tabs.** Search is the spine; tabs are a fallback. The user types a size/callout/material and gets one canonical answer with provenance, with deeper detail one level down (progressive disclosure).

The unified "type M6 → see thread + tap drill + clearance together" view is the core interaction. Competitors make you open three separate tools; doing it in one query is the product.

## 4. "Decide, don't learn" (behavioral core)

Every micro-task is a *decision*, not a study session. A result shows: value + unit + class/fit + source + at most one note ("close fit", "≈75% engagement"). No tutorials, no encyclopedic prose. Results are answer-shaped, not article-shaped.

## 5. MVP scope — EXACTLY these five modules

Mechanical only. Search-first, reference-first. Framed as **daily-open core** (the four high-frequency reference/conversion tasks) + **one architecture showcase** (the calc that proves calculators inherit provenance). The showcase must not dilute the core's focus.

**Daily-open core:**

### 5.1 Thread data
Metric (ISO) first, then a Unified/imperial subset. M1.6–M24 (coarse + common fine); UNC/UNF #4–1/2". Per thread: nominal Ø, pitch, major/minor/pitch Ø. Each row cites its source.

### 5.2 Tap drill sizes
Per thread: recommended tap drill. Show **both** ~75% and ~50% engagement (the distinction makers get wrong and break taps over). Metric rule shown: drill ≈ major − pitch for ~75%. Material caveat surfaced (harder → lower %). Cited.

### 5.3 Clearance holes
Per fastener size: close / normal / loose clearance Ø. Metric per ISO 273; imperial subset. Cite the standard per fit class.

### 5.4 Unit conversion
The highest-frequency micro-task in the research (inch↔mm off a drawing, plus common engineering units). Must be the single fastest path in the app: minimal keystrokes, unit shown inline, no hidden convention. This is the daily-reflex flow that retention depends on most (see §7).

**Architecture showcase:**

### 5.5 Cantilever beam deflection (the one calculator)
Reuse the compliant-mechanism calc math. Inputs: length, section (rect b×h, round d), material (E from a small library), load (tip point load; UDL second mode). Outputs: tip deflection, max bending stress, optional safety factor. Shows the **formula used** and its **source**. Proves calculators carry the same provenance discipline as tables.

**Explicitly OUT of MVP:** electrical anything, speeds/feeds, GD&T, materials DB beyond the beam calc's needs, fits/limits press-shrink tables, accounts/login, persistence beyond local. (These are the v0.2+ backlog, not this build.)

## 6. Provenance requirement (non-negotiable, architectural)

Provenance is **part of the data model, not a footnote.** Every record carries a source reference; the UI surfaces it. Details, tiers, and the registry live in `SOURCES.md` — but the SPEC-level rules are:

- Every shown value carries a visible source + confidence tier.
- Every result shows its **unit inline** and its governing convention; where two conventions exist, **force a visible choice — never guess.**
- **Failure philosophy:** if a verified value does not exist, **never estimate, never invent** — show "no verified value" + available references. Trust outranks completeness. One fabricated value destroys the differentiator permanently.

## 7. Interaction stability = retention infrastructure (frozen principle)

The #1 uninstall trigger in the research is **an update breaking a muscle-memory flow.** In a reflex tool, a small regression feels like sabotage.

- Never silently change unit defaults, input order, or the fastest path to a common lookup.
- If a core flow must change, **preserve the old path as an alias.**
- Enforced by the factory's **Gate H** (see FACTORY.md).

## 8. Input ergonomics (functional constraint, not polish)

Users may wear gloves, stand at a machine, work fast, with the on-screen keyboard hiding content. Therefore: generous touch targets; minimal keystrokes to a result; no input field hidden behind the keyboard; the fastest common lookups reachable in ≤2 actions.

## 9. Architecture (so future iterations are cheap — the real job of v0.1)

v0.1's job is to **establish a pattern that makes every later domain a bounded one-session add.**

1. **Data separated from UI.** Each domain = its own data structure, independent of rendering. Adding a domain = add a data file + register it.
2. **Provenance in the data layer**, traveling with the data, not hardcoded in components.
3. **Calculators = pure functions:** `f(inputs) -> {result, formula, source}`. Testable in isolation.
4. **Single self-contained HTML file.** All CSS/JS inline, no build step. Keeps Claude Code context cost minimal and meets the performance guardrails (§10) trivially.
5. **A registry pattern** mapping `domain -> {label, data, renderer}` so nav and additions are data-driven.

If a reviewer can't add a new table by touching only the data layer, the architecture has failed.

## 10. Performance guardrails (protect the simple architecture)

Startup < 1s; local search result < 300ms (p95); smooth on mobile; offline after first load. **These are met trivially by the single-file approach as long as motion stays restrained.** If hitting them ever seems to need a bundler/framework, that's a signal the design over-animated — not that the architecture is wrong. Offline-after-load directly serves the workshop/air-gapped use case.

## 11. Design direction (avoid the AI-generated defaults)

Derive identity from the subject's world — the workshop, calipers, thread gauges, blueprint and tolerance-callout conventions — NOT from generic defaults (cream-serif-terracotta, black-acid-green, broadsheet hairlines) and NOT from "make it look like Linear/Arc/Apple." Match that *level of craft and restraint*; do not copy that look — the calm-premium default is exactly where every AI UI converges, and copying it surrenders the design differentiator.

- **Palette:** 4–6 named hex values from instrument/blueprint vernacular (measured grays, a single precise accent — machinist/layout-dye blue or blueprint cyan), used with restraint. Decided in DESIGN_SYSTEM.md, justified.
- **Type:** a characterful display face + a clean body face + tabular/monospaced figures for data (column alignment is *functional* for a data product).
- **Signature element:** a cited dimension rendered like a tolerance callout on a drawing — the one memorable thing; everything else quiet.
- **Color = function:** neutral base, restrained accent for interactive states, green/amber/red for valid/caution/error. Sparingly. Dark mode (if shipped) is a first-class system, not an inverted theme — dense data should look quieter and sharper, not cinematic.
- **Delight = microinteractions that confirm understanding** (copy confirmation, source expansion, table↔formula transition), not entertainment.
- **Quality floor:** mobile-first, thumb-reachable, visible keyboard focus, reduced-motion respected, large tap targets.

## 12. Monetization (strategic finding — informs venture, not the v0.1 build)

For a single-user reference tool, **compulsory subscription is a growth blocker, not an engine** (strong, consistent research evidence). Path: **free core (proves speed+trust) → one-time Pro unlock → subscription only later**, once the product adds living-standard updates, citation exports, saved workspaces, cross-standard compare, or team/approval features (i.e. crosses from utility to platform). The subscription's budget owner is a team/org, not an individual — B2B authority buyers already pay for standards; the Pro/Team tier sells *source operations*, not "more calculators."

## 13. Definition of done (v0.1)

- [ ] Search is the home screen; "type M6" returns thread + tap drill + clearance in one view.
- [ ] Five modules work: threads, tap drills, clearance, unit conversion, beam deflection.
- [ ] Every value + the beam result shows source + confidence tier + unit inline; no uncited value shown silently; no estimated value invented.
- [ ] Metric/imperial toggle; conventions never guessed silently.
- [ ] Adding a new domain provably touches only the data layer.
- [ ] Mobile-first, instant, offline-after-load, single HTML file, no login.
- [ ] Core reflex flows (search, conversion, thread lookup) have stable paths (Gate H).
- [ ] Spot-check: 3 thread rows, 3 tap drills, 3 clearance values verified against SOURCES.md.
