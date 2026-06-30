# SOURCES_v2.md — the project's truth registry

Supersedes SOURCES.md. Restructured per SOURCES_SUGGESTED_IMPROVEMENTS.md, right-sized for the v0.1 MVP. Core idea adopted in full: **SOURCES is not a reference list, it is the app's truth registry.** No engineering value ships without a source ID, a confidence tier, and a verification status.

Right-sizing rule applied throughout: adopt every field that's nearly free to carry; adopt *as a lightweight stub* anything that's a process (annual review, per-dataset versioning) until scale demands the full form. Don't let the registry grow heavier than the data it describes.

---

## 1. Source philosophy

- Every value traces to a source by **ID**, never by inline prose.
- Every value carries a **confidence tier** (how authoritative) and a **verification status** (whether we actually checked it).
- Prefer the primary standard as the cited authority; a consolidated handbook is an honest secondary.
- **Never store copyrighted standard tables verbatim** — store the derived values + the citation. (See §7.)
- A value with no citable source is **not shown** (SPEC_ADDENDUM failure philosophy).

## 2. Confidence tiers (RECONCILED to 5 — updates SPEC_ADDENDUM's 4-tier scale)

The SPEC addendum introduced a 4-tier scale; this 5-tier scale supersedes it (adds Manufacturer as a distinct class — datasheets are their own authority). **This is now the single confidence scale across all docs.**

| Tier | Class | Examples |
|---|---|---|
| **A** | Primary Standard | ISO, ASME, DIN, ANSI, ASTM |
| **B** | Official Handbook | Machinery's Handbook, Roark, Shigley |
| **C** | Manufacturer Documentation | datasheets, catalogs, technical manuals |
| **D** | Trusted Engineering Reference | university references, calculators with shown derivations |
| **E** | Community / Unverified | forums, blogs, informal charts |

UI surfaces the tier on the source badge. A value populated from a consolidated source citing a standard *number* reads its true tier (B), never A, until verified against the primary document.

## 3. Verification status (the honesty enum)

Separates *what the source is* from *whether we checked the value against it*:

- `Verified Against Primary` — checked against the actual standard document.
- `Verified Against Secondary` — checked against a consolidated handbook.
- `Imported` — taken from a source, not yet independently checked.
- `Pending Review` — in the registry, value not yet confirmed.
- `Rejected` / `Deprecated` — failed criteria (§8) or superseded.

This is what Gate F2 (value correctness) and the Provenance-Auditor check against.

## 4. Source registry (the at-a-glance truth map)

Stable IDs; records reference `sourceId`, never full names.

```yaml
sourceRegistry:
  SRC001: { title: ISO 261,       authority: ISO,   type: Standard,  tier: A, status: Pending Access,    usedBy: [Threads, TapDrill] }
  SRC002: { title: ISO 965-1,     authority: ISO,   type: Standard,  tier: A, status: Pending Access,    usedBy: [Threads] }
  SRC003: { title: ISO 68-1,      authority: ISO,   type: Standard,  tier: A, status: Pending Access,    usedBy: [Threads] }
  SRC004: { title: Machinery's Handbook 30th, authority: Industrial Press, type: Handbook, tier: B, status: Available, usedBy: [Threads, TapDrill, Clearance] }
  SRC005: { title: ASME B1.1,     authority: ASME,  type: Standard,  tier: A, status: Pending Access,    usedBy: [Threads] }
  SRC006: { title: ISO 273,       authority: ISO,   type: Standard,  tier: A, status: Pending Access,    usedBy: [Clearance] }
  SRC007: { title: ASME B18.2.8,  authority: ASME,  type: Standard,  tier: A, status: Pending Access,    usedBy: [Clearance] }
  SRC008: { title: Roark's Formulas for Stress and Strain, authority: McGraw-Hill, type: Reference, tier: B, status: Available, usedBy: [BeamCalc] }
```

`status` (acquisition): `Available | Purchased | Pending Access | Pending Purchase | Publicly Available | Not Required For MVP | Blocked`.

## 5. Provenance object (attached to every value)

```typescript
interface Provenance {
  sourceId: string;          // → registry
  confidenceTier: "A"|"B"|"C"|"D"|"E";
  verificationStatus: "Verified Against Primary"|"Verified Against Secondary"|"Imported"|"Pending Review";
  table?: string; section?: string; page?: string; equation?: string;
  dateVerified?: string; verifiedBy?: string; notes?: string;
}
```
Example:
```json
{ "thread": "M6 x 1", "majorDiameter_mm": 6.0, "pitch_mm": 1.0,
  "provenance": { "sourceId": "SRC001", "confidenceTier": "A",
    "verificationStatus": "Pending Review",
    "notes": "Confirm against primary ISO 261 before production use." } }
```

## 6. MVP module → source map

- **Thread data** → SRC001/002/003 (metric), SRC005 (Unified); SRC004 cross-check. Tier A primary, B consolidated.
- **Tap drills** → SRC004 + metric rule `drill ≈ D_major − pitch` (~75%); two-engagement caveat in `notes`.
- **Clearance holes** → SRC006 (metric ISO 273), SRC007 (imperial ASME B18.2.8); SRC004 consolidated.
- **Beam calc** → SRC008 (Roark) + Euler–Bernoulli; provenance on the *result*, formula shown.

## 7. Licensing rules (prominent — matters now, critical if commercial)

- Do **not** reproduce full standard tables verbatim. Store only the derived values actually used + the citation.
- Keep any purchased/licensed PDFs **outside the public repo**.
- Cite clearly; derived-value use + citation is the defensible posture.
- This protects fair-use standing and is non-negotiable if the product is ever sold.

## 8. Rejection criteria

Reject a source if: no authority named · no revision/date · conflicts with a higher tier (→ CONFLICTS.md) · no derivation shown for a formula · cannot be cited · user-generated and unverified.

## 9. Dependency graph (powers cheap, bounded re-runs)

This is the data-layer twin of FACTORY_v2's stage-addressable re-entry. If a source changes, the graph says exactly what regenerates.

```
SRC003 (ISO 68-1, profile)
   └─► Basic metric thread profile
         └─► SRC001/002 (preferred series + tolerances)
               └─► Thread table ──► Tap drill table
                                └─► Clearance table (+ SRC006/007)
                                       └─► Search / unified "type M6" view
SRC008 (Roark) ─► Beam formulas ─► Beam calculator
```
Rule for the orchestrator: a source edition change re-runs only its downstream subtree, re-verifying untouched gates rather than rebuilding.

## 10. Lightweight stubs (adopt principle now, formalize at scale)

- **Data versioning:** one `dataVersion` field separate from app version. Not per-module version strings yet.
- **Review cadence:** carry `lastReviewed` / `nextReview` metadata; don't formalize the 7-step annual workflow until the app exists.
- **Source-type split:** a `type` tag per source (Standard/Handbook/Reference/Manufacturer/Community); not five separate registries yet.

## 11. Decisions for Dima (replaces "FLAG FOR DIMA" with durable metadata)

```yaml
openDecisions:
  - item: Access to primary ISO/ASME standards (SRC001,002,003,005,006,007)
    owner: Dima
    priority: High
    effect: "Have them → verificationStatus can reach 'Verified Against Primary' (Tier A, strongest badge).
             Don't → ship honestly at 'Verified Against Secondary' citing SRC004, tier shown as B."
    blocksMVP: false
```
Plain-language summary kept on purpose: **the MVP ships honestly with zero purchases** — values cite the standard number at verificationStatus `Verified Against Secondary`, tier B, sourced from Machinery's Handbook. Primary access only upgrades badges from B/secondary to A/primary. Nothing here blocks the build.

---

## What changed from the suggestions file
**Adopted full:** source IDs + registry, structured schema, verification-status enum, dependency graph, license rules, rejection criteria, structured open-decisions (no inline flags), 5-tier confidence (and reconciled SPEC_ADDENDUM to match).
**Adopted simplified:** data versioning (one field, not per-module), review cadence (metadata, not a workflow), source-type split (a tag, not five registries).
**Right-sizing caution applied:** kept the registry from growing heavier than the ~few-dozen-row dataset it describes — every process-flavored idea is a stub until scale earns it.
