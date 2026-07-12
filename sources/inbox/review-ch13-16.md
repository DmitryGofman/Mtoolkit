# Practical-Value Review — Chapters 13–16
Reviewer pass: added-value & red flags for a young mechanical engineer.
Scope: real-world gaps, concrete lesson-author actions, factually shaky claims.
No files were modified. Numeric data suggestions are flagged for [דורש אימות].

---

## Chapter 13 — נגרוּת (carpentry) — file: app/src/content/chapter-13-carpentry.ts

Units present: TIMBER-01 (עץ לא מתכת), TIMBER-02 (לחות), TIMBER-03 (חיבורים),
TIMBER-04 (כלים/דיוק), TIMBER-05 (מול הנגר).

### HIGH — Missing: the actual panel-assembly fasteners (confirmat / euro screws, pocket holes)
TIMBER-03 jumps straight from "wood screw splits end grain" to "threaded inserts for
repeat disassembly." It skips the fastener a young engineer will actually see holding
together every plywood/MDF jig and cabinet in a real shop: the **confirmat / euro screw**
(coarse, blunt, made for panel edges) and **pocket-hole (Kreg) joinery**. Right now the
chapter implies your only options for panels are glue, classic joinery, or inserts —
which is not how modern shops assemble sheet goods.
- Concrete add (TIMBER-03): one paragraph — "בורג עץ רגיל נכשל בשפת לוח; לחיבור פאנלים
  מהיר וחזק משתמשים בבורג קונפירמט (euro screw) עם קדח מדורג, או בחיבור כיס (pocket hole)."
- Concrete exercise (1 line): give the student a plywood box jig and ask them to choose
  between wood screws into the edge, confirmat screws, or a dado+glue joint — testing that
  they know edge-screwing plywood with normal wood screws splits/strips.

### HIGH — Missing: shop safety & MDF dust health hazard
No unit mentions the two things that actually hurt a young engineer visiting a woodshop:
**table-saw kickback** (don't stand in line with the blade / rip cut) and **MDF/composite
dust** (fine dust + formaldehyde binder — a respiratory hazard requiring extraction/mask).
TIMBER-04 lovingly describes the table saw and MDF but never says either can hurt you.
- Concrete add (TIMBER-04 commonMistake or a short caveat): "אבק MDF דק ומכיל דבק —
  עובדים עם שאיבה/מסכה; במסור שולחן לא עומדים בקו הלהב (ריתוע/kickback)."

### MEDIUM — Missing: plywood grade matters for jigs (void-free / Baltic-birch)
The chapter treats "lavid" as one material and defers grade to the carpenter. But for a
precision jig, interior voids in cheap plywood ruin flatness and screw-hold. A one-line
note that multi-ply void-free board (e.g. Baltic birch) is the jig-grade default would let
the engineer ask for the right thing instead of getting construction-grade ply.
- Concrete add (TIMBER-02 or 04): "ללביד יש דרגות — ללוח שצריך יציבות ואחיזת ברגים
  בוחרים לוח רב-שכבתי צפוף ללא חללים פנימיים; ספציפי מול הנגר [דורש אימות]."

### MEDIUM — Missing: which glue for which job (moisture/heat)
TIMBER-03 caveat correctly defers glue *type* to the carpenter [דורש אימות], but the
student never learns the one distinction that bites them: ordinary PVA (white/yellow) wood
glue is not waterproof and creeps under sustained load/heat. Conceptual, no numbers needed.
- Concrete add: name the axis (interior PVA vs waterproof/PU vs epoxy) without values.

### Red flags — none material.
Rules of thumb all carry caveats; exercises test real judgment (ex1/ex5 especially good).
ex2-split-end option "build the legs from aluminium" is correctly marked wrong — fine.

---

## Chapter 14 — תפירה וטקסטיל (textiles) — file: app/src/content/chapter-14-textiles.ts

Units: FIBER-01 (בד כחומר), FIBER-02 (תפרים/webbing), FIBER-03 (חומרה רכה),
FIBER-04 (תבנית), FIBER-05 (מול מתפרה).

### HIGH — Missing: stitch holes are leak paths (seam sealing / welded seams)
FIBER-01 teaches waterproof coatings (PU/DWR) and FIBER-02 teaches "every stitch is a hole
in the fabric" — but the chapter never connects them: **a waterproofed cover leaks through
every needle hole along a seam.** A young engineer will spec a "waterproof" cover, get it
sewn, and watch it drip along the seams. The solutions (seam tape, sealant, welded/RF seams,
or designing seams off the water path) are standard and completely absent.
- Concrete add (FIBER-01 or FIBER-04): "בד אטים-מים לא הופך מוצר לאטים-מים — כל תפר הוא
  שורת נקבים שדולפת. תפרים במוצר אטום מקבלים איטום/הדבקת סרט (seam tape) או ריתוך, או
  מתוכננים מחוץ למסלול המים."
- Concrete exercise (1 line): "waterproof" equipment cover drips in rain though the fabric
  is coated — student must identify the seams (not the fabric) as the leak path.

### MEDIUM — Missing: thread should be the sacrificial element / thread material choice
FIBER-02 lists "thread frays in UV" as a failure mode but never states the design principle
that thread is chosen weaker than the fabric (so a seam fails at the thread, which is
repairable, not by tearing the fabric), nor the practical UV split: **polyester thread for
outdoor/UV, bonded nylon for max strength.** Concrete and actionable, no numbers.
- Concrete add (FIBER-02 concept or caveat).

### MEDIUM — Missing: abrasion at edges / chafe protection is only implied
ex2-skin-deep correctly raises abrasion at metal corners, but no unit teaches the standard
fix: **chafe/wear patches and edge reinforcement at contact points.** Given the whole
"skeleton and skin" theme this is a natural, missing checklist item.
- Concrete add (checklist line): "בנקודות שפשוף/מגע — תוכננה שכבת חיזוק/מגן (chafe patch)?"

### LOW — thread/needle sizing deferred well; buckle/webbing widths deferred well.
The [דורש אימות] discipline around load ratings (FIBER-03/05) is correct and consistent.

### Red flags — none material.
The lifting-vs-carrying safety line (final4, FIBER-05) is well drawn and correctly hard.
ex4-paper-pattern deliberately has two near-correct options (one marked wrong for missing
the golden sample) — that is good judgment-testing, not a bug.

---

## Chapter 15 — הלחמות/קונקטורים/זיווד (zivud) — file: app/src/content/chapter-15-zivud.ts

Units: WIRE-01 (הלחמה חשמלית), WIRE-02 (קונקטור=נקודת כשל), WIRE-03 (strain relief),
WIRE-04 (זיווד), WIRE-05 (הגנות סביבה).

### HIGH — Missing: electrical rating of connectors AND wire (current/voltage) — a fire risk
WIRE-02 selects connectors purely on *mechanical* axes (locking, keying, mating cycles) and
never says a connector — and the wire — must be **rated for the current and voltage**, or it
overheats and melts. A mech engineer wiring a battery/motor will happily reuse a signal
connector on a motor-power line because "it fits and locks." This is the most dangerous gap
in the chapter (field fire), and it sits right next to a keying discussion about polarity.
- Concrete add (WIRE-02): a fourth question to the "three questions" rule — "כמה זרם/מתח
  עובר דרכו?" — connector and wire gauge sized to current; ampacity/derating values
  [דורש אימות מול דף היצרן/תקן].
- Concrete exercise (1 line): student reuses a small signal connector for a motor supply
  because it locks and keys — correct answer flags current rating / melted contacts.

### HIGH — Missing: circuit protection (fuse) sizing/placement
"נתיך" appears once as a serviceable consumable in WIRE-04, but there is no treatment of
**fusing a power feed close to the source** — the first line of defense a mech engineer
packaging a battery pack must get right. Purely conceptual (fuse protects the wire, sits at
the source), values [דורש אימות].
- Concrete add (WIRE-05 or WIRE-02): one paragraph on protecting the feed near the battery.

### MEDIUM — Missing: enclosure grounding / bonding of metal chassis
WIRE-04 covers standoffs and shorting to a conductive wall, but never mentions **bonding the
metal enclosure to protective earth / a defined ground.** For any mains or higher-voltage
unit this is a safety item, and it's the kind of thing that gets skipped by a mechanical
packager. Can be scoped as "confirm grounding scheme with the electronics owner."

### LOW — wire routing bend radius, service loop, gland all excellent.
WIRE-03 is the strongest unit; strain-relief coverage is thorough.

### Red flags — none material.
WIRE-01 "crimp is more vibration-resistant than solder" is correct and properly caveated
("only with the right tool and size" + [דורש אימות]). final2 "crimp then flood with solder"
correctly flagged as a known failure — good.

---

## Chapter 16 — מדידה ומטרולוגיה (metrology) — file: app/src/content/chapter-16-metrology.ts

Units: GAUGE-01 (למה מיומנות), VERNIER-02 (קליבר), MICRO-03 (מיקרומטר),
DIAL-04 (מד שעון/פילר/אבני בוחן), TRUST-05 (בחירת כלי לטולרנס), TARGET-06 (דיוק vs עקביות).

### HIGH — Missing: Go/No-Go gauges (plug / ring / thread gauges) — the production-floor reality
The chapter teaches caliper → micrometer → indicator → lab, but never mentions the single
most common tolerance-verification tool on a real production floor: the **Go/No-Go gauge**
(plug gauge for bores, ring/snap for shafts, thread gauge for threads). It answers exactly
the question the chapter keeps raising — "is this within tolerance?" — faster and more
reliably than reading a number, and a young engineer will meet them constantly. Their
absence is the biggest practical hole in an otherwise excellent chapter.
- Concrete add (DIAL-04 or TRUST-05): a paragraph — "לא תמיד מודדים מספר; בייצור סדרתי
  בודקים התאמה עם מדי Go/No-Go — פין נכנס/לא נכנס, טבעת עוברת/לא עוברת. מהיר, חסין-מודד,
  ומכריע ישירות אם בתחום."
- Concrete exercise (1 line): batch of holes must be checked fast on the floor — student
  chooses between reading each with a caliper (wrong: too slow / not capable) and a Go/No-Go
  plug gauge (right).

### HIGH — Missing: caliper inside-jaws are poor for bores → telescoping / bore / pin gauges
final2 and TRUST-05 reference "מדיד פנים מדויק" but the chapter never teaches it. The caliper
unit (VERNIER-02) even coaches finding max on a bore, without warning that **inside jaws are
inherently inaccurate for internal diameters** and that the real tools are telescoping
(snap) gauges, bore gauges, or pin gauges. This is a daily source of bad bore readings.
- Concrete add (VERNIER-02 caveat + DIAL-04): name telescoping/bore/pin gauges as the
  internal-diameter tools; caliper inside jaws = rough only.

### MEDIUM — Missing: measuring a bore/shaft in two axes for out-of-round (ovality)
DIAL-04 introduces runout beautifully, but static ovality/taper (a bore that is round on one
axis and oval on another, or a tapered shaft) is not covered. Practical rule: measure a
diameter in at least two rotational positions and along the length.
- Concrete add (VERNIER-02 or MICRO-03 checklist): "מדדת קוטר בשני צירים ולאורך החלק
  (עגלגלות/חרוט)?"

### LOW — accuracy vs precision (TARGET-06) is genuinely strong; keep as-is.

### Red flags — none material.
The [דורש אימות] on the tool-accuracy-to-tolerance ratio (e.g. the 10:1 / gauge-maker's
rule) in TRUST-05/TARGET-06 is the correct call — do not invent the ratio.
