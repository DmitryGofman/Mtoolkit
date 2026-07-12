# Practical-Value Review — Chapters 1-4
Reviewer pass: real-world usefulness for a young mechanical engineer.
Scope: gaps / concrete add-value / red-flags. References existing unit codenames to avoid duplication.
Date: 2026-07-12

Note on sourcing: several suggested additions (torque values, bolt-grade proof loads, ISO fit tables,
bearing life) carry numeric data that MUST land in sources/verified/ before being stated. The *concepts*
are teachable now; mark any number [דורש אימות] per CLAUDE.md.

---

## CHAPTER 01 — OPERATION: IRON GRIP (bolts)

### Missing practical material (gaps)
1. **Tightening torque & controlled preload — the biggest hole.** The chapter's whole thesis
   (u1 GRIP-01, spring analogy) is "preload/clamping force holds the joint, not the bolt body,"
   and u4 GRIP-04 + ex2 SHORT FUSE lean hard on "feel deceives." But nowhere does it teach HOW
   you actually achieve controlled preload: torque wrench, a torque spec, and the key insight that
   torque ≠ preload because most of the torque is eaten by friction (scatter, lubed vs dry).
   A young ME's single most common bolt task is "how tight?" — and the chapter never answers it.
2. **Bolt strength grades / property class (8.8 / 10.9 / 12.9, SAE grades).** Head markings that
   every ME must read before buying or substituting a bolt. Entirely absent. Directly relevant to
   ex2 (a stronger bolt won't fix short engagement — but grade is never introduced as a variable).
3. **Galling / seizing of stainless fasteners and galvanic pairing.** A stainless bolt in a
   stainless nut cold-welds and seizes on install; a steel bolt in aluminum corrodes. Very common
   field failure, complements the aluminium-insert story in u4 but is not covered.

### Concrete added-value suggestions
- New unit (or extend u4 GRIP-04): "כמה להדק?" — torque wrench, torque spec from a table [דורש אימות],
  and why the same torque gives different preload dry vs lubricated.
- New exercise: bolt returns sheared in service; options force choosing between "wrong grade / wrong
  torque / wrong length" — tests grade+torque judgment, not just length (currently only length is tested).
- Checklist item to add: "מומנט ההידוק מוגדר בהוראות ההרכבה (ולא 'עד שמרגישים חזק')?"
- Common-mistake to add: substituting a grade-4.8 hardware-store bolt for a 10.9 in a loaded joint
  "because it fit."
- Add galling caveat to u2 THREAD-02 rule of thumb (a stainless thread can seize even when standard/pitch match).

### Red flags
- u4 GRIP-04 ruleOfThumb ("עובי חלקים + שייבות + עומק תבריג") silently assumes the reader can pick
  "עומק תבריג נדרש" — but with no torque/grade content the reader has no basis for it. Not wrong,
  but incomplete without the torque unit above.
- No factual errors found. u6 LOCK-06 NASA RP-1228 citations are specific and appropriately sourced —
  keep this as the model for the rest of the chapter.

---

## CHAPTER 02 — OPERATION: BLUEPRINT (drawings)

### Missing practical material (gaps)
1. **ISO fit callouts (H7/g6 style) at reading level.** u4 TOL-04's visual (Passungsarten) shows
   clearance/transition/interference families, but the chapter never teaches how to READ or write a
   fit code like "Ø20 H7" — hole-basis, what the letter+number mean. A young ME sees this on every
   bearing seat and dowel-pin hole and is lost. Highest-value gap for this chapter.
2. **Cross-link back to dowel pins (ch01).** ch01 introduced dowel pins as locators but nobody said
   the pin holes need a reamed transition/interference fit. That's exactly where fit codes live —
   currently a dangling thread between chapters.
3. **Weld symbols** — a whole drawing sub-language, absent. Lower priority (may belong to an assembly/
   joining chapter) but worth a conscious "deferred to ch__" note.

### Concrete added-value suggestions
- Extend u4 TOL-04 (or add a short unit): "שפת ההתאמות — H7/g6" — reading level only, values [דורש אימות],
  tied concretely to a bearing seat and a dowel-pin hole.
- New exercise: a Ø-with-fit-code on a bearing seat vs the same nominal as a plain ±0.1 dimension —
  reader must recognize which one actually controls the fit and why the plain tolerance would fail.
- Checklist item to add: "מושבי מיסבים וקדחי פינים — מוגדרים בהתאמה (fit), לא רק במידה נומינלית ±?"
- Clarify in u3 SCALE-03: add MBD one line that "מודל מחייב" still needs a released, version-controlled
  source (currently only in the caveat; learners skim caveats).

### Red flags
- No factual errors found; [דורש אימות] markers on tolerance/roughness values are correctly placed.
- ex3 DECODER RING (counterbore vs countersink) is well-built — the "correct" answer is genuinely
  arguable-proof because it hinges on the flat-bottom symbol, not wording. Good model.
- Minor: ex3's correct feedback asserts a counterbore "מתאים לראש בורג שקע" as if exclusive; counterbores
  also seat washers/standoffs. Not wrong for the scenario, but tighten so it doesn't read as a rule.

---

## CHAPTER 03 — OPERATION: DOCKING BAY (assembly)

### Missing practical material (gaps)
1. **Poka-yoke / keying (mistake-proofing orientation) — top DFA gap.** u5 DOCK-05 covers connector
   ACCESS but never the classic assembly failure: a near-symmetric bracket or an un-keyed connector
   that gets assembled/plugged in flipped or 180° out. Designing parts so they physically cannot go
   in the wrong way is a cornerstone of Design-for-Assembly and is completely absent.
2. **Multi-bolt tightening sequence (star/cross pattern, gradual torque).** When closing a flange,
   bearing cap or gasketed cover, bolt ORDER and incremental torque prevent warping and uneven
   clamp/leaks. u2 DOCK-02 handles single-bolt access but not the pattern. Very practical on the floor.
3. **Assembly documentation / work-instruction rigor.** Referenced in passing ("הוראות הרכבה")
   but never taught as a deliverable — what a good assembly instruction contains.

### Concrete added-value suggestions
- New unit or extend u1 DOCK-01: "אי אפשר להרכיב הפוך" — asymmetry, locating features, keyed/polarized
  connectors; a part that assembles two ways WILL be assembled wrong eventually.
- New exercise: two mounting-hole patterns, one symmetric (assembles 180° flipped, breaks nothing at
  assembly, fails in the field), one with a deliberate offset hole — reader picks the poka-yoke design
  and explains the field consequence. Tests judgment, not wording.
- New exercise: gasketed cover with 8 bolts — pick the tightening pattern/sequence and why one-bolt-
  at-a-time-to-full-torque leaks.
- Checklist item to add: "כל חלק/מחבר יכול להיכנס בכיוון אחד בלבד — או שסטייה בכיוון תגלה מיד?"

### Red flags
- No factual errors found. Cable/bend-radius claims correctly deferred to manufacturer datasheet
  [דורש אימות מול דף יצרן].
- ex5 ONE WAY DOOR and final Q3 (slot lock) are strong — decisions are real and feedback names the
  field consequence, not just "correct."

---

## CHAPTER 04 — OPERATION: CLOCKWORK (mechanisms)

### Missing practical material (gaps)
1. **Backlash / lash in gear trains and lead screws — top gap.** A motion-mechanism chapter that
   covers over-constraint, fixed/floating, couplings and friction in depth, but never mentions
   backlash: the play that reverses cost you in any geared or screw-driven mechanism, why it matters
   for positioning/reversing loads, and that anti-backlash nuts / preloaded gears exist. A young ME
   designing their first geartrain or leadscrew stage will be bitten by this.
2. **Bearing has a rated life under load (L10 concept).** u3 CLOCK-03 and u6 CLOCK-06 cover choosing
   and fixing bearings, but not that a bearing is sized to a load-life rating — the reason two "correct"
   bearings behave differently over time. Concept only; numbers [דורש אימות].
3. **Lubrication regime (grease vs oil, why/when).** u8 CLOCK-08 treats friction as a design parameter
   but lubrication as a design choice (sealed grease vs oil bath, relube interval) is only touched.

### Concrete added-value suggestions
- New unit: "מרווח גיר (Backlash)" — where lash comes from, when it's harmless vs fatal (reversing/
  positioning), and preload/anti-backlash as the fix with its cost (friction, wear).
- New exercise: a positioning stage overshoots/repeats poorly on direction reversal — reader
  distinguishes backlash from binding (this chapter teaches binding beautifully; backlash is its
  mirror twin and currently invisible). Strong judgment test because the symptoms overlap.
- Add one line to u3 CLOCK-03 that bearing selection also carries a load-life rating, not just
  install/alignment requirements — otherwise learners think bearing choice = alignment only.

### Red flags
- No factual errors found — impressively clean. Spot-checked the two trickiest claims:
  - u7 CLOCK-07: single Cardan/Hooke joint velocity ripple and the two-joints-in-phase fix — correct.
  - u8 CLOCK-08: static > kinetic friction, stick-slip, μ unreliable [דורש אימות] — correct.
- u3 CLOCK-03 "רכיב אחד מוביל" (three-bearing shaft = over-constraint) is stated strongly; the caveat
  correctly rescues it for heavy/long shafts. Keep the caveat prominent — real long shafts DO use
  intermediate bearings, so the bald rule could mislead without it.

---

## SINGLE HIGHEST-VALUE ADDITION PER CHAPTER (summary)
- **Ch01 (Iron Grip):** A tightening-torque / controlled-preload unit — the chapter argues preload is
  everything but never tells the student how to achieve or verify it (torque wrench, torque≠preload).
- **Ch02 (Blueprint):** Teach ISO fit callouts (H7/g6, clearance/transition/interference) at reading
  level, tied to bearing seats and the ch01 dowel-pin holes.
- **Ch03 (Docking Bay):** A poka-yoke / keying unit — design parts and connectors so they physically
  cannot be assembled in the wrong orientation.
- **Ch04 (Clockwork):** A backlash unit — the mirror-twin of binding, invisible in the current chapter
  and unavoidable in any real geared/screw-driven mechanism.
