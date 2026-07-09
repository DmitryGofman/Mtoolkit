# DESIGN_SYSTEM.md — Mechanical Reference

**Status:** v0.1 — established on the first build, mandatory thereafter. Produced by the UI/UX-Designer (FACTORY §3). Every later feature applies this system; it does not get re-invented per screen.

**North star:** identity from the subject's own world — the workshop bench, the caliper, the blueprint, the tolerance callout — at the *craft level* of the best tools, never copying the calm-premium look every AI UI converges on (SPEC §11, SPEC_ADDENDUM §6). The one bold thing is the **tolerance-callout dimension**; everything else stays quiet so the number is the hero.

---

## 1. Palette (6 named values — instrument / blueprint vernacular)

Neutral measured grays of a machined surface, one precise accent of layout-dye / blueprint blue. Color is function, not decoration.

| Token | Hex | Role |
|---|---|---|
| `--ink` | `#13181D` | Primary text — near-black with a cool cast, like stamped steel |
| `--surface` | `#F4F2ED` | Page base — warm paper-gray of a shop drawing, not pure white |
| `--panel` | `#FBFAF7` | Raised cards / result panels |
| `--rule` | `#CBC9C1` | Hairlines, table rules, dimension lines |
| `--layout-blue` | `#1C5D99` | The single precise accent — machinist layout-dye / blueprint blue. Interactive states, the signature callout. |
| `--graphite` | `#6B7077` | Secondary text, units, metadata |

**Semantic (status only, used sparingly):**

| Token | Hex | Meaning |
|---|---|---|
| `--valid` | `#3F7D58` | verified / valid / copied |
| `--caution` | `#B07A2B` | caveat (material-dependent, secondary verification) |
| `--error` | `#A23B3B` | invalid input / no verified value |

**Dark mode** is a first-class system, not an inverted theme: dense data goes *quieter and sharper*, not cinematic. `--ink #E8E9EC` on `--surface #15191E`, `--panel #1B2026`, the blue lifts to `#5BA3D9` for contrast on dark. Toggled, remembered only in-memory (no storage APIs — SPEC §9).

## 2. Type

- **Display / numerals:** a tabular-figure monospace (`'Space Mono'` fallback → `ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace`). Every engineering value, every column, renders in tabular figures — column alignment is **functional**, not decorative (FACTORY §3).
- **Body / UI:** the system humanist sans (`-apple-system, 'Segoe UI', Roboto, system-ui, sans-serif`) — clean, legible, no character competing with the data.
- No web-font fetch at runtime (offline-after-load, SPEC §10). System + monospace stacks only.

Scale (mobile-first): `12 / 14 / 16 / 20 / 28 / 40`. The result value is the largest thing on the screen.

## 3. Layout

- **Search is the hero**, not a dashboard. A single field, centered, large, autofocused. Tabs/module chips are a quiet fallback below it (SPEC §3).
- **Progressive disclosure:** answer first (value + unit + fit + tier badge), source/notes/limits one tap down. "Decide, don't learn" — answer-shaped, never article-shaped (SPEC §4).
- **Mobile-first, thumb-reachable.** The search field sits where the thumb lands; results scroll under it; no input field is ever hidden behind the on-screen keyboard (SPEC §8).
- One column on phone, a comfortable single measure on desktop (max ~720px). This is a reference, not a spreadsheet.

## 4. Signature element — the tolerance callout

The one memorable thing. A cited dimension is rendered like a **dimension callout on a drawing**: the value framed by thin extension/dimension lines in `--layout-blue`, the source tier riding it like a balloon callout. Used for the primary value of every result. It is the whole brand in one component — so everything around it stays plain.

```
        ┌──────────────┐
   ─────┤  5.000 mm    ├─────   ◄ dimension line, layout-blue
        └──────────────┘
            ⌀ tap drill · ~75% · [B ▸]
```

## 5. Input ergonomics (functional — Gate D)

- Touch targets ≥ 44px; primary actions ≥ 48px.
- Minimal keystrokes: typing `m6` or `1/4-20` or `0.5 in` resolves immediately; no submit button required.
- Common lookups in ≤ 2 actions (type → read). Converter: type a number, the converted value updates live.
- Visible keyboard focus ring (2px `--layout-blue`), always. `:focus-visible`, never removed.

## 6. Motion (restrained — protects the perf guardrails)

- Microinteractions that **confirm understanding**, never entertain: copy → a brief `--valid` flash + "copied"; source expand → a 120ms height ease; table ↔ formula → cross-fade.
- All motion ≤ 160ms, ease-out. `@media (prefers-reduced-motion: reduce)` removes every transition. Over-animating is the signal the architecture is being abused (SPEC §10), so motion stays a budget, not a feature.

## 7. Copy

- Label by what the user controls ("Engagement", "Fit", "Material"), not by jargon.
- Active voice. Errors explain the fix ("Enter a length greater than 0").
- Empty state invites action ("Type a size — try `M6`, `1/4-20`, or `0.5 in → mm`").
- The failure state is honest and on-brand: **"No verified value"** + the references that *do* exist — never a silent placeholder (SPEC §6).

## 8. Provenance rendering contract (every value obeys this)

A value is never shown without: **(1) the number, (2) its unit inline, (3) a tier badge** `A–E` that expands to `sourceId · standard · verification status`. The badge color encodes verification, not tier: `--valid` for Verified-Against-Primary, `--graphite` for Secondary/Imported, with the letter tier always shown. This is the machine-checkable contract the Provenance-Auditor enforces at Gate G.
