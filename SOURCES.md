# SOURCES.md — the project's truth registry

**Status:** FROZEN for MVP v0.1. Single source of truth for provenance. Supersedes all prior SOURCES drafts.

Core idea: **SOURCES is not a reference list, it is the app's truth registry.** No engineering value ships without a source ID, a confidence tier, and a verification status. This is what separates the product from a calculator app.

Right-sizing rule: adopt every field that's nearly free to carry; keep process-flavored ideas (annual review, per-dataset versioning) as lightweight stubs until scale earns them. The registry must never grow heavier than the data it describes.

---

## 1. Source philosophy

- Every value traces to a source by **ID**, never inline prose.
- Every value carries a **confidence tier** (how authoritative) and a **verification status** (whether we actually checked it).
- Prefer the primary standard as the cited authority; a consolidated handbook is an honest secondary.
- **Never store copyrighted standard tables verbatim** — store derived values + citation (see §7).
- A value with no citable source is **not shown** (SPEC §6 failure philosophy).
- Provenance includes **unit system and convention**, not just the standard (SPEC §6).

## 2. Confidence tiers (the single scale across all docs)

| Tier | Class | Examples |
|---|---|---|
| **A** | Primary Standard | ISO, ASME, DIN, ANSI, ASTM |
| **B** | Official Handbook | Machinery's Handbook, Roark, Shigley |
| **C** | Manufacturer Documentation | datasheets, catalogs, technical manuals |
| **D** | Trusted Engineering Reference | university refs, calculators with shown derivations |
| **E** | Community / Unverified | forums, blogs, informal charts |

UI surfaces the tier on the source badge. A value populated from a consolidated source citing a standard *number* reads its true tier (usually B), never A, until verified against the primary document.

## 3. Verification status (the honesty enum)

Separates *what the source is* from *whether we checked the value against it*:
`Verified Against Primary` · `Verified Against Secondary` · `Imported` · `Pending Review` · `Rejected` · `Deprecated`.

This is what Gate F2 (value correctness) and the Provenance-Auditor check against.

## 4. Source registry (the at-a-glance truth map)

Stable IDs; records reference `sourceId`, never full names.

```yaml
sourceRegistry:
  SRC001: { title: ISO 261,       authority: ISO,   type: Standard,  tier: A, status: Pending Access, usedBy: [Threads, TapDrill] }
  SRC002: { title: ISO 965-1,     authority: ISO,   type: Standard,  tier: A, status: Pending Access, usedBy: [Threads] }
  SRC003: { title: ISO 68-1,      authority: ISO,   type: Standard,  tier: A, status: Pending Access, usedBy: [Threads] }
  SRC004: { title: Machinery's Handbook 30th, authority: Industrial Press, type: Handbook, tier: B, status: Available, usedBy: [Threads, TapDrill, Clearance, Conversion] }
  SRC005: { title: ASME B1.1,     authority: ASME,  type: Standard,  tier: A, status: Pending Access, usedBy: [Threads] }
  SRC006: { title: ISO 273,       authority: ISO,   type: Standard,  tier: A, status: Pending Access, usedBy: [Clearance] }
  SRC007: { title: ASME B18.2.8,  authority: ASME,  type: Standard,  tier: A, status: Pending Access, usedBy: [Clearance] }
  SRC008: { title: Roark's Formulas for Stress and Strain, authority: McGraw-Hill, type: Reference, tier: B, status: Available, usedBy: [BeamCalc] }
  SRC009: { title: NIST SP 811 (SI units & conversion factors), authority: NIST, type: Standard, tier: A, status: Publicly Available, usedBy: [Conversion] }
```

`status` (acquisition): `Available | Purchased | Pending Access | Pending Purchase | Publicly Available | Not Required For MVP | Blocked`.

## 5. Provenance object (attached to every value)

```typescript
interface Provenance {
  sourceId: string;            // → registry
  confidenceTier: "A"|"B"|"C"|"D"|"E";
  verificationStatus: "Verified Against Primary"|"Verified Against Secondary"|"Imported"|"Pending Review";
  unitSystem?: "metric"|"imperial"|"both";
  convention?: string;         // e.g. tolerance class, engagement %, fit series
  table?: string; section?: string; page?: string; equation?: string;
  dateVerified?: string; verifiedBy?: string; notes?: string;
}
```

## 6. MVP module → source map

- **Thread data** → SRC001/002/003 (metric), SRC005 (Unified); SRC004 cross-check.
- **Tap drills** → SRC004 + metric rule `drill ≈ D_major − pitch` (~75%); two-engagement caveat in `notes`.
- **Clearance holes** → SRC006 (metric ISO 273), SRC007 (imperial ASME B18.2.8); SRC004 consolidated.
- **Unit conversion** → SRC009 (NIST SP 811, the authoritative, publicly available conversion-factor source) + SRC004 cross-check. Conversion factors are exact where defined (e.g. 1 in = 25.4 mm exactly); mark those `Verified Against Primary`, tier A.
- **Beam calc** → SRC008 (Roark) + Euler–Bernoulli; provenance on the *result*, formula shown.

## 7. Licensing rules (matters now, critical if commercial)

- Do **not** reproduce full standard tables verbatim. Store only the derived values used + the citation.
- Keep purchased/licensed PDFs **outside the public repo.**
- Cite clearly; derived-value use + citation is the defensible posture and the fair-use boundary.

## 8. Rejection criteria

Reject a source if: no authority named · no revision/date · conflicts with a higher tier (→ CONFLICTS.md) · no derivation shown for a formula · cannot be cited · user-generated and unverified.

## 9. Dependency graph (powers cheap, bounded re-runs)

Data-layer twin of FACTORY's stage-addressable re-entry. A source change re-runs only its downstream subtree.

```
SRC003 (ISO 68-1, profile)
   └─► metric thread profile
         └─► SRC001/002 (series + tolerances)
               └─► Thread table ──► Tap drill table
                                └─► Clearance table (+ SRC006/007)
                                       └─► unified "type M6" view ──► Search
SRC009 (NIST SP 811) ─► Conversion factors ─► Unit converter
SRC008 (Roark) ─────► Beam formulas ───────► Beam calculator
```
Orchestrator rule: a source edition change re-runs only its downstream subtree; untouched gates re-verify rather than rebuild.

## 10. Lightweight stubs (principle now, formalize at scale)

- **Data versioning:** one `dataVersion` field, separate from app version. Not per-module strings yet.
- **Review cadence:** carry `lastReviewed` / `nextReview` metadata; no formal annual workflow yet.
- **Source-type split:** a `type` tag per source; not five separate registries yet.

## 11. Open decisions for Dima (durable metadata, not inline flags)

```yaml
openDecisions:
  - item: Access to primary ISO/ASME standards (SRC001,002,003,005,006,007)
    owner: Dima
    priority: High
    effect: "Have them → verificationStatus can reach 'Verified Against Primary' (tier A, strongest badge).
             Don't → ship honestly at 'Verified Against Secondary' citing SRC004 (tier B)."
    blocksMVP: false
```
Plain-language: **the MVP ships honestly with zero purchases.** Values cite the standard number at `Verified Against Secondary`, tier B, sourced from Machinery's Handbook; unit conversions are tier A via NIST SP 811 (public). Primary ISO/ASME access only upgrades badges — it blocks nothing.
