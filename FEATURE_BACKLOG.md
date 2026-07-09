# FEATURE_BACKLOG.md — atomic, ordered features (Planner artifact)

Derived from SPEC §5 by the Planner (FACTORY §2, Mode 1). Gate A2 requires every feature to carry acceptance criteria, dependencies, and a source requirement before it enters planning. P0 = daily-open core; P1 = architecture showcase.

---

## v0.1 — shipped (RELEASE CANDIDATE)

### F-001 — Search-as-spine + unified fastener view · P0
- **userValue:** Type `M6` and see thread + tap drill + clearance in one answer.
- **inputs:** a typed size/callout (`M6`, `M8x1`, `1/4-20`, `#10-24`).
- **outputs:** combined fastener card; every value cited + unit inline.
- **dependencies:** F-002, F-003, F-004 data; query parser.
- **acceptance:** home is a search field, not tabs; one query returns all three domains; each value carries source + tier + unit; mobile-readable.
- **source:** SRC004 (threads/tap/clearance), SRC006/007 (clearance).
- **status:** ✅ done — `parseQuery`/`renderFastener`.

### F-002 — Thread data (ISO metric + Unified subset) · P0
- **userValue:** nominal Ø, pitch, pitch Ø, minor Ø per thread.
- **band:** M1.6–M24 (coarse + common fine); UNC/UNF #4–1/2".
- **acceptance:** geometry derived from the ISO 68-1 / ASME B1.1 profile (not a verbatim table — SOURCES §7); each row cited; values match Machinery's Handbook 30th.
- **source:** SRC004 (cites ISO 261/965-1, ASME B1.1), tier B / Verified Against Secondary.
- **status:** ✅ done.

### F-003 — Tap drill (both engagements) · P0
- **userValue:** recommended drill at ~75% and ~50% engagement, with the material caveat.
- **acceptance:** rule shown (`drill ≈ D − P`); both columns; harder-material note surfaced; cited.
- **source:** SRC004 + engagement rule. status: ✅ done.

### F-004 — Clearance holes · P0
- **userValue:** close / normal / loose hole Ø per fastener.
- **acceptance:** metric per ISO 273; imperial subset per ASME B18.2.8; cited per fit class.
- **source:** SRC006 (metric), SRC007 (imperial), SRC004 cross-check. status: ✅ done.

### F-005 — Unit conversion · P0
- **userValue:** fastest path — inch↔mm + common engineering units, live, unit shown inline.
- **acceptance:** ≤2 actions to a result; exact factors marked tier A; convention never guessed.
- **source:** SRC009 (NIST SP 811), tier A / Verified Against Primary. status: ✅ done.

### F-006 — Cantilever beam deflection · P1
- **userValue:** tip deflection + max bending stress; formula and source shown.
- **acceptance:** pure `f(inputs)→{result,formula,source}`; rect + round sections; E library cited; rejects ≤0 inputs.
- **source:** SRC008 (Roark) + Euler–Bernoulli. status: ✅ done.

---

## v0.2+ — deferred (NOT this build; flagged, never silently added)
- Fits & limits (H7/g6 press/shrink tables) — high-frequency, deferred per SPEC OUT-list.
- Number/letter/fraction drill name mapping for imperial tap drills (currently decimal + mm).
- Imperial clearance for number sizes #4–#8 (currently #10 and fractional only).
- Materials DB beyond the beam calc's E library.
- Living-standard edition diffs, citation export, saved workspaces (the Pro/Team surface — SPEC §12).
- Speeds/feeds, GD&T, electrical — explicitly out of the product's mechanical scope.
