# Practical-value review — chapters 05-08
Reviewer pass: "what would a young mech engineer actually need that's missing / could be sharper."
Scope: added usefulness, not style. No files were modified.

---

## Chapter 05 — CNC (OPERATION: COLD STEEL)

**1. [HIGH — missing material] Threaded / tapped holes are never taught.**
Syllabus module 5 unit 7 is "הברזות, inserts וגישה לכלי" — it has no home in the chapter.
Threads are the single most common feature a junior specifies wrong, and the u5 opening
scenario even punishes a missing thread ("בלי ההברגות") but the lesson never teaches it.
- Add unit/section: through vs blind tapped holes, thread depth ≈ 1-1.5×D of engagement,
  tap-breakage in blind holes / need for relief at bottom, threaded inserts (helicoil /
  keensert) for aluminium and soft/repeated-assembly holes, and always calling out thread
  spec + depth in the package.
- New exercise (1 line): "בחלק אלומיניום עם 40 הרכבות-פירוק צפויות — הברגה ישירה או תותב
  הברגה, ולמה?"

**2. [MEDIUM — missing material] Material machinability is absent as a cost driver.**
The chapter frames cost almost entirely as geometry/setups/tolerance; material is only a
line-item in u5's package. In reality choosing 6061 vs 304 stainless can swing machine time
and tool cost as much as any pocket. A junior "upgrades" to stainless for confidence and
triples the bill — exactly the chapter's own theme, but material isn't on the list of
suspects. Add a short block/mistake: "material as a cost lever," with the caveat that
machinability never overrides a real functional/strength requirement (tie to [דורש אימות]
for any numeric machinability ratings).

**3. [MEDIUM — thin] Deep *holes* collapsed into deep *pockets*.**
Syllabus unit 4 is "כיסים עמוקים וחורים עמוקים" but u3 only really covers pockets. Deep
drilling has its own failure story (depth-to-diameter, peck drilling, drift/wander, why a
deep small hole from one side is cheaper than a cross-drilled one). Worth a paragraph in u3
and one distractor in an exercise.

**4. [LOW — missing checklist item] Minimum wall thickness has no rule.**
Chatter and thin walls are named in u1 but the checklist never asks "are any walls too thin
to hold without deflecting?" Add a checklist line: "אין דפנות דקות מדי שירטטו תחת הכלי?"
(numeric limits → [דורש אימות]).

No factual red flags found in ch05. Climb-vs-conventional caption correctly hedges
("ברוב המכונות המודרניות"). Exercises test real judgment; ex4's correct answer is properly
caveated with "ודא שהעברת הקדח לא שוברת את הפונקציה."

**Highest-value add for ch05: the missing tapped-hole / thread-insert unit.**

---

## Chapter 06 — Motors (OPERATION: PRIME MOVER)

**1. [HIGH — missing material] The opening scenario's failure (stall → burned driver) is
never resolved into a design practice.** u1 tells the gate-into-wall story, but no unit
teaches the electrical/protection side: stall current vs running current, current limiting
in the driver, fusing, thermal cutoff, and end-of-travel protection (limit switches /
homing / soft limits). A junior who finishes this chapter still doesn't know how to stop
their own opening scenario from happening. Add a unit or strong section:
"מה שורף דרייברים — זרם עצירה, הגבלת זרם, מפסקי קצה ובלם."
- New exercise (1 line): "מנגנון נוסע לקצה מסילה קשיח. אילו שלושה אמצעים מונעים מהמנוע
  להישרף בעצירה — ומה קורה אם מסתמכים רק על התוכנה?"

**2. [MEDIUM — missing material] AC motor promised, then dropped.** Syllabus unit 7 is a
full AC-motor unit; here it's a one-line deferral ("סיפור ליחידת המשך"). For anyone
designing a continuous industrial load off mains, this is the *default* answer and its
absence is a real gap. At minimum give it a short section (induction motor: mains-fed,
rugged, needs VFD for speed control) so the "from the load backward" flow in u5 has the
option on the table.

**3. [MEDIUM — thin] Inertia matching is named but not taught.** u5 mentions "אינרציה
בזמן תאוצה" but never the load-to-motor inertia-ratio gotcha that wrecks servo tuning — the
exact case where "the numbers looked fine" fails on hardware. One paragraph in u3/u5 + a
distractor would add real depth for the servo exercises.

**4. [LOW — clarification] Duty cycle is conceptual only.** u5 defines מחזור עבודה well but
never connects it to the fact that motors carry duty ratings (continuous vs intermittent)
and heat up on a thermal time constant. Add a sentence + [דורש אימות] pointer so a junior
knows the rating exists and where to read it.

Red flags: none factual. Worm-gear self-locking is correctly caveated ("אסור להסתמך על כך
כבלם בטיחות בלי אישור יצרן"). u6 (shaft-hub) is an excellent, high-value practical addition.

**Highest-value add for ch06: an electrical-protection / end-of-travel section that actually
closes the loop on the burned-driver opening scenario.**

---

## Chapter 07 — Suppliers (OPERATION: EMISSARY)

**1. [HIGH — missing material] Quantity economics: MOQ, tooling/NRE, setup amortization.**
u2 says "כמות משנה מחיר" but never explains *why* the first-part sticker shock happens:
minimum order quantities, one-time tooling/fixture (NRE) charges, setup cost spread over the
batch, and price breaks. This is the #1 real-world surprise for a junior sending first parts
("למה חלק אחד עולה כמו עשרה?"). Add a section + concept.
- New exercise (1 line): "ספק מציע 1 יח' ב-X ו-25 יח' ב-1.4X סה"כ. מה זה מלמד על עלות
  ההקמה — וכמה באמת עולה לך חלק הפרוטוטייפ?"

**2. [MEDIUM — missing material] Choosing/qualifying a supplier is skipped.** Suppliers are
treated as already-given. Nothing on matching the part to shop capability (a 5-axis part to
a 3-axis shop), asking about equipment, certifications (e.g. ISO 9001), or capacity. The RFQ
unit would benefit from "who do you even send this to, and how do you know they can do it."

**3. [MEDIUM — missing material] Unit 7 of the syllabus ("איך לא לבקש דברים שאין להם
הצדקה") has no home here.** The over-tolerancing theme lives in ch05; in the supplier
context the parallel is over-specifying finish/material/inspection that inflates quotes.
Worth a short callback so the module stands on its own.

**4. [LOW — clarification] "Cheap quote = red flag" rule needs its symmetric limit stated
more strongly in the checklist.** The rule and caveat are good in u2, but a junior can
over-apply it and distrust every low bid. Add a checklist line: "אם הצעה חריגה — נשאלה
שאלת אימות אחת ממוקדת (ולא נפסלה אוטומטית)?"

Red flags: none factual. Exercises are strong and test judgment; ex3 (three quotes) is
particularly good because the "right" supplier is the mid-price one who asked a question,
which resists wording-guessing.

**Highest-value add for ch07: a quantity-economics section (MOQ + tooling/NRE + price
breaks) so first-order sticker shock is understood, not just experienced.**

---

## Chapter 08 — Testing (OPERATION: PROVING GROUND)

**1. [HIGH — red flag / missing material] Destructive testing is encouraged with zero
safety content.** ex1 and ex2 explicitly involve "העמסה עד שבר" and the u1 visual shows a
UTM loading to failure — but nothing anywhere warns about stored energy, flying fragments,
guarding, pressure/spring release, or PPE. A junior told to "load to failure" needs the
safety brief *before* the pedagogy. This is both a missing-material gap and a
responsible-content red flag. Add a short unit/section: "בטיחות בניסוי הרסני — אנרגיה
אצורה, מיגון, והרחקת אנשים." (Reference an appropriate standard/lab-safety source →
[דורש אימות].)

**2. [MEDIUM — missing material] Measurement resolution / instrument-vs-tolerance is only
hinted.** Calibration is flagged [דורש אימות] but the everyday rule a junior needs — the
gauge must resolve much finer than the tolerance it judges (the ~10:1 gauge rule of thumb)
— is absent. Add it to u4 with its caveat (ratio is a guideline, tighten via a metrology
source → [דורש אימות]). Currently a learner could "measure" a tight tolerance with a
too-coarse instrument and never know.

**3. [MEDIUM — thin] Sample size / part-to-part variation is asserted but never actioned.**
The chapter correctly and repeatedly says "one part proves only that part" (u5, ex4, FAI
caveat) — but never gives any handle on *how many* to test or that spread between nominally
identical parts is itself a thing to measure. A junior is left knowing 1 is too few and
with no idea what's enough. Add a short block: variation exists; sample size scales with
criticality; even a few parts beats one. (Numeric sampling plans → [דורש אימות].)

**4. [LOW — clarification] Strain gauge and load cell appear only as captions.** Both
visuals (u4) show real force/strain sensors but the "how you actually measure a force or a
strain" idea isn't taught. One or two sentences would let a junior connect "I need a number"
to "here's the class of sensor that gives it."

Red flags beyond #1: none factual. The V&V distinction, pre-registered pass/fail criterion,
one-variable-at-a-time, and scope-of-validity content are excellent and the exercises
genuinely test judgment (ex3 "smoke screen" and ex4 "measured words" are standouts).

**Highest-value add for ch08: a destructive-test safety section — it's both the most
dangerous omission and a prerequisite for the load-to-failure exercises the chapter already
uses.**
