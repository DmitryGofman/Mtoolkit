# טבלאות עזר למהנדס מכונות מעשי — מפרט איסוף מקורות

> **מטרת המסמך:** מפרט מדויק של ה"טבלאות שכל מהנדס חייב להציץ בהן" — לא רק *אילו* קטגוריות,
> אלא *בדיוק* אילו טבלאות, אילו עמודות בכל אחת, ואיזה טווח לכסות. זהו **worklist מפורט**
> ל-source-scout: כל שורה = טבלה קונקרטית אחת לאסוף.
>
> **כלל ברזל (`CLAUDE.md`):** אין נתון מספרי בתוכן לימודי בלי מקור מאומת ב-`sources/verified/`.
> כל טבלה → רשומה ב-`sources/source-index.md` → קובץ ב-`sources/verified/` → רק אז מצטטים.
> עד אז `[דורש אימות]`. כללי אצבע חייבים `caveat`.
>
> **מקרא:** ⭐⭐⭐ קריטי · ⭐⭐ חשוב · ⭐ העשרה · `☐` לא נאסף · `☑` נאסף ואומת.
> **פורמט כל טבלה:** `כותרת` — *עמודות שנרצה* — *טווח/כיסוי* — `מקור/תקן` — עדיפות — סטטוס.

---

## 1. ברגים והברגות (Fasteners & Threads)

- **1.1 Metric coarse thread — master table** ⭐⭐⭐ ☐
  *עמודות:* nominal Ø · pitch (mm) · pitch-Ø (d2) · minor-Ø (d3) · tensile stress area A_s.
  *כיסוי:* M2–M36. *מקור:* ISO 261 + ISO 724.
- **1.2 Metric fine thread — pitch options** ⭐⭐ ☐
  *עמודות:* nominal Ø · fine pitch(es) available · A_s. *כיסוי:* M8×1, M10×1/1.25, M12×1.25/1.5…
  *מקור:* ISO 261.
- **1.3 Unified UNC / UNF — sizes & TPI** ⭐⭐ ☐
  *עמודות:* size (#0–#12, ¼″–1″) · TPI coarse · TPI fine · tensile stress area.
  *מקור:* ASME B1.1.
- **1.4 Tapping-drill diameters (metric)** ⭐⭐⭐ ☐
  *עמודות:* thread · drill Ø for 75% engagement · drill Ø for 60%. *כיסוי:* M2–M20 coarse+fine.
  *מקור:* ISO 2306 / קטלוג יצרן מקדחים.
- **1.5 Tapping-drill diameters (UNC/UNF)** ⭐⭐ ☐
  *עמודות:* thread · tap drill (fractional/number/letter). *מקור:* ASME B1.1 / Machinery's Handbook.
- **1.6 Clearance (through) hole diameters** ⭐⭐⭐ ☐
  *עמודות:* bolt size · **close** fit Ø · **normal** fit Ø · **coarse/loose** fit Ø.
  *כיסוי:* M2–M30. *מקור:* ISO 273.
- **1.7 Counterbore + head-clearance (socket-head cap screw)** ⭐⭐ ☐
  *עמודות:* bolt size · head Ø · head height · counterbore Ø · counterbore depth. *מקור:* ISO 4762.
- **1.8 Countersink dimensions (flat-head)** ⭐⭐ ☐
  *עמודות:* bolt size · head Ø · 90° csk Ø. *מקור:* ISO 10642.
- **1.9 Property classes — mechanical values** ⭐⭐⭐ ☐
  *עמודות:* class (4.8/5.8/8.8/10.9/12.9) · proof stress · yield R_p0.2 · UTS R_m · hardness · min elong %.
  *מקור:* ISO 898-1.
- **1.10 Preload & tightening-torque table** ⭐⭐⭐ ☐
  *עמודות:* size × class · target preload F · torque at μ=0.08 / 0.10 / 0.12 / 0.14. *כיסוי:* M4–M24, 8.8/10.9/12.9.
  *מקור:* VDI 2230 / קטלוג יצרן (Bossard `SRC-TBL-112`). **caveat:** תלוי חיכוך וסיכה — לצטט הנחות.
  **הערה:** טבלת ה-VDI 2230 הסטנדרטית ל-8.8/10.9/12.9 עוצרת ב-μ=0.14; μ=0.20 מופיע רק לפלב"מ/ציפויים
  מיוחדים (טבלה נפרדת) — לא להניח μ=0.20 לברגי פחמן רגילים.
- **1.11 Minimum thread engagement length** ⭐⭐ ☐
  *עמודות:* fastener material · mating material (steel/Al/cast) · engagement in ×D.
  *מקור:* NASA RP-1228 (כבר `verified`) — לאמת שהטבלה שם. **caveat:** תלוי יחס חוזק חומרים.
- **1.12 Washer dimensions (flat + spring)** ⭐ ☐
  *עמודות:* bolt size · ID · OD · thickness. *מקור:* ISO 7089 / ISO 7090.
- **1.13 Nut dimensions + wrench (AF)** ⭐⭐ ☐
  *עמודות:* size · width-across-flats · nut height (ISO 4032 style 1). *מקור:* ISO 4032 / ISO 4035 (thin).

## 2. תותבות הברגה (Threaded Inserts)

- **2.1 Helical (wire) insert — drill & STI tap chart** ⭐⭐ ☐
  *עמודות:* thread · STI tap drill Ø · insert lengths (1D/1.5D/2D/3D). *מקור:* קטלוג Helicoil/Recoil.
- **2.2 Solid self-locking insert (Keensert)** ⭐ ☐
  *עמודות:* thread · install drill Ø · install torque · min boss Ø. *מקור:* קטלוג יצרן.
- **2.3 Heat-set / press-fit inserts for plastics** ⭐⭐ ☐
  *עמודות:* thread · insert OD · recommended hole Ø · min boss Ø · pull-out/torque. *מקור:* Spirol/Tappex DFM.
- **2.4 Heat-set inserts for FDM parts** ⭐ ☐
  *עמודות:* thread · insert OD · hole Ø · hole depth. *מקור:* מדריך יצרן (Voxel/McMaster). **caveat:** תלוי מילוי (infill).

## 3. חוזק חומרים (Material Properties)

- **3.1 Structural & alloy steels** ⭐⭐⭐ ☐
  *עמודות:* grade · yield · UTS · E · density · elong %. *כיסוי:* S235/S355, 1045, 4140, 304/316 SS.
  *מקור:* EN 10025 / MatWeb / datasheet.
- **3.2 Aluminium alloys by temper** ⭐⭐⭐ ☐
  *עמודות:* alloy-temper · yield · UTS · E · density. *כיסוי:* 6061-T6, 6082-T6, 7075-T6, 5052-H32.
  *מקור:* Aluminum Association / MatWeb.
- **3.3 Engineering plastics** ⭐⭐ ☐
  *עמודות:* polymer · tensile strength · flexural mod · HDT · density. *כיסוי:* ABS, PC, POM, PA6/66, PEEK, PP.
  *מקור:* datasheet יצרן שרף.
- **3.4 AM material properties (with anisotropy)** ⭐⭐ ☐
  *עמודות:* material · XY strength · Z strength · E · density. *כיסוי:* PLA/PETG/ASA (FDM), resin (SLA), PA12 (SLS/MJF).
  *מקור:* datasheet יצרן. **caveat:** Z נמוך משמעותית מ-XY.
- **3.5 Recommended safety factors** ⭐⭐ ☐
  *עמודות:* load type (static/impact/fatigue) · known-vs-uncertain material · SF range. *מקור:* Shigley.
  **caveat:** מנחה בלבד — תלוי קוד/תקן.
- **3.6 Hardness conversion & UTS estimate** ⭐ ☐
  *עמודות:* HB · HRC · HV · approx UTS. *מקור:* ASTM E140. **caveat:** תקף לפלדות בעיקר.

## 4. סבילויות והתאמות (Tolerances & Fits)

- **4.1 IT grade values (µm) matrix** ⭐⭐⭐ ☐
  *עמודות:* dimension range (mm) × IT grade. *כיסוי:* טווחים ≤3…500 mm × IT5–IT16.
  *מקור:* ISO 286-1.
- **4.2 Shaft fundamental deviations** ⭐⭐⭐ ☐
  *עמודות:* dimension range × letter (f, g, h, k, n, p, s…) → upper/lower dev. *מקור:* ISO 286-2.
- **4.3 Hole fundamental deviations** ⭐⭐⭐ ☐
  *עמודות:* dimension range × letter (F, G, H, K, N, P…) → dev. *מקור:* ISO 286-2.
- **4.4 Preferred fits — hole-basis** ⭐⭐⭐ ☐
  *עמודות:* fit (H7/g6, H7/h6, H7/k6, H7/p6, H7/s6, H8/f7, H11/c11…) · type (clearance/transition/interference) · תיאור שימוש.
  *מקור:* ISO 286 / Machinery's Handbook.
- **4.5 General tolerances ISO 2768** ⭐⭐⭐ ☐
  *עמודות:* linear range × class f/m/c/v (±mm) + angular + geometric (ISO 2768-2 H/K/L).
  *מקור:* ISO 2768-1/-2.
- **4.6 GD&T symbols & modifiers chart** ⭐⭐ ☐
  *עמודות:* symbol · characteristic · datum-ref rules · MMC/LMF use. *מקור:* ASME Y14.5 (כבר REF-DRW-02).

## 5. יכולת תהליכי ייצור — סבילות ופני-שטח מושגים (Process Capability)

- **5.1 Achievable IT grade by process** ⭐⭐⭐ ☐
  *עמודות:* process (drilling, turning, milling, reaming, grinding, honing, lapping, EDM, sand-cast, die-cast, forging, sheet-stamp) · IT range typical · IT best.
  *מקור:* ISO 286 process charts / Machinery's Handbook.
- **5.2 Achievable surface roughness Ra by process** ⭐⭐⭐ ☐
  *עמודות:* process · Ra typical (µm) · Ra best. *כיסוי:* אותם תהליכים כמו 5.1. *מקור:* ISO 4287 + DFM charts.
- **5.3 Economical vs. tight tolerance — cost curve** ⭐⭐ ☐
  *עמודות:* tolerance band · relative cost multiplier. *מקור:* ספרות ייצור/DFM. **caveat:** אינדיקטיבי.

## 6. הנחיות תכן-לייצור (DFM Guidelines)

- **6.1 CNC machining rules** ⭐⭐⭐ ☐
  *עמודות:* feature · rule. *פריטים:* min internal corner radius = tool R · max cavity depth (×tool Ø) ·
  min wall · deep-hole depth-to-Ø · thread depth · text engrave depth. *מקור:* Protolabs/Xometry DFM.
- **6.2 Sheet-metal rules** ⭐⭐⭐ ☐
  *עמודות:* feature · rule vs. thickness t. *פריטים:* min hole Ø (≈t) · hole-to-edge (≥2t) ·
  hole-to-bend (≥2.5t+R) · min flange · slot/tab. *מקור:* Protolabs/SendCutSend.
- **6.3 Injection-molding rules** ⭐⭐ ☐
  *פריטים:* nominal wall by resin · draft angle (≥1°/0.5° textured) · rib thickness (≤0.6× wall) ·
  boss Ø · gate/knit-line notes. *מקור:* Protolabs molding DFM.
- **6.4 Casting rules (sand / die)** ⭐ ☐
  *פריטים:* min wall by process · draft · fillet R · section-transition ratio. *מקור:* ספרות ייצור.

## 7. רדיוסים ופינות מינימליות (Radii & Fillets)

- **7.1 Sheet-metal minimum bend radius** ⭐⭐⭐ ☐
  *עמודות:* material/temper · thickness · min inside bend R (×t). *כיסוי:* mild steel, SS, 5052/6061 Al.
  *מקור:* קטלוג יצרן. **caveat:** תלוי כיוון גרעין (grain).
- **7.2 Bend allowance / K-factor** ⭐⭐ ☐
  *עמודות:* process (air/bottom) · material · K-factor. *מקור:* טבלאות K-factor. **caveat:** לאמת אמפירית.
- **7.3 Min internal machining corner radius** ⭐⭐ ☐
  *עמודות:* pocket depth · min corner R (by tool Ø). *מקור:* CNC DFM.
- **7.4 Fillet stress-concentration factor K_t** ⭐⭐ ☐
  *עמודות:* geometry (shoulder/groove/hole) · r/d ratio · K_t. *מקור:* Peterson's / Roark's.
- **7.5 Casting / molding min radius** ⭐ ☐
  *עמודות:* junction type · min inner/outer R. *מקור:* casting DFM.

## 8. ריתוך (Welding)

- **8.1 Weld symbols chart** ⭐⭐⭐ ☐
  *עמודות:* symbol · joint/weld type · side/all-around/field flags. *כיסוי:* fillet, groove (V/U/bevel/J), plug, spot.
  *מקור:* AWS A2.4 / ISO 2553.
- **8.2 Fillet weld min/max leg vs. plate thickness** ⭐⭐⭐ ☐
  *עמודות:* thicker part t · min leg size · max leg (edge). *מקור:* AWS D1.1 Table / EN 1993-1-8.
- **8.3 Fillet weld strength (throat / allowable)** ⭐⭐ ☐
  *עמודות:* leg → throat a · allowable stress by electrode (E70…) · capacity per length. *מקור:* AWS D1.1 / Eurocode.
- **8.4 Groove prep geometry by thickness** ⭐ ☐
  *עמודות:* thickness range · prep type · included angle · root gap/face. *מקור:* ISO 9692-1.
- **8.5 Preheat by carbon-equivalent** ⭐ ☐
  *עמודות:* CE range · thickness · preheat temp. *מקור:* AWS D1.1. **caveat:** תלוי מתכת בסיס.

## 9. הדפסת תלת-ממד — מגבלות תכן (3D-Printing Design Limits)

- **9.1 Minimum wall thickness by process** ⭐⭐⭐ ☐
  *עמודות:* process (FDM, SLA, SLS, MJF, DMLS/DMLS-metal, PolyJet) · supported wall min · unsupported wall min.
  *מקור:* Protolabs/Xometry/Shapeways DFM.
- **9.2 Min feature / hole / pin / clearance by process** ⭐⭐ ☐
  *עמודות:* process · min positive feature · min hole Ø · min gap between moving parts. *מקור:* מדריך יצרן.
- **9.3 Overhang angle & bridging** ⭐⭐ ☐
  *עמודות:* process · max self-supporting angle (from vertical) · max bridge length. *מקור:* DFM. **caveat:** FDM ≈45°.
- **9.4 Achievable tolerance by AM process** ⭐⭐ ☐
  *עמודות:* process · tolerance (±mm or ±%) · min layer height. *מקור:* datasheet יצרן.
- **9.5 Printed thread / boss guidance** ⭐ ☐
  *עמודות:* option (modeled thread / tapped / heat-set) · min Ø · recommended use. *מקור:* DFM.

## 10. אלמנטים סטנדרטיים (Standard Machine Elements)

- **10.1 Rolling-bearing series** ⭐⭐ ☐
  *עמודות:* designation (608, 6000/6200/6300, 6800/6900) · bore · OD · width · dynamic C. *מקור:* SKF / ISO 15.
- **10.2 Shaft/housing fits for bearings** ⭐⭐ ☐
  *עמודות:* load case · shaft tolerance (k5/m6…) · housing tolerance (H7/J7…). *מקור:* SKF handbook.
- **10.3 Keys & keyways (parallel)** ⭐⭐ ☐
  *עמודות:* shaft Ø range · key width×height · keyway depth (shaft/hub). *מקור:* DIN 6885 / ISO/R 773.
- **10.4 Retaining-ring grooves** ⭐ ☐
  *עמודות:* shaft/bore Ø · groove Ø · groove width. *מקור:* DIN 471 (external) / DIN 472 (internal).
- **10.5 O-ring groove design** ⭐ ☐
  *עמודות:* application (static radial/axial, dynamic) · groove width · depth · squeeze %. *מקור:* Parker O-Ring Handbook.
- **10.6 Dowel / roll pin press fits** ⭐ ☐
  *עמודות:* pin Ø · hole Ø (H7/interference) · engagement. *מקור:* ISO 2338 / ISO 8752.
- **10.7 Standard drill sizes** ⭐⭐ ☐
  *עמודות:* metric series · number/letter/fractional equivalents (mm). *מקור:* ISO 235.
- **10.8 Sheet / plate / stock gauges** ⭐ ☐
  *עמודות:* gauge # · thickness (mm) by material. *מקור:* ISO / ספק.

---

## סדר איסוף מומלץ

| גל | טבלאות | מזין |
|----|--------|------|
| **1 (⭐⭐⭐ ליבה)** | 1.1, 1.4, 1.6, 1.9, 1.10 · 3.1, 3.2 · 4.1, 4.4, 4.5 | פרק ברגים + פרק סבילויות |
| **2 (⭐⭐⭐ ייצור)** | 5.1, 5.2 · 6.1, 6.2 · 7.1 · 8.1, 8.2 · 9.1 | פרקי DFM / ריתוך / הדפסה |
| **3 (⭐⭐ השלמה)** | 2.x · 4.2/4.3 · 10.1–10.3 · יתר ה-⭐⭐ | מרכיבים סטנדרטיים + העמקה |
| **4 (⭐ העשרה)** | כל שאר ה-⭐ | חומר נלווה |

## תזכורת תהליך
- כל טבלה → רשומת מקור ב-`sources/source-index.md` (דירוג A/B) → קובץ ב-`sources/verified/` → ציטוט.
- **מקורות one-stop:** *Machinery's Handbook* (מקיף, בתשלום), תקני **ISO/ASME/DIN** (מחייבים, בתשלום),
  מדריכי DFM חינמיים של **Protolabs / Xometry / Fictiv / SendCutSend** (דירוג B — לאמת מספר מול תקן לפני הוראה).
- אין להעתיק טבלה מוגנת-זכויות לרפו: לחלץ ערכים, לצטט מקור, לבנות טבלה משלנו.
- כל *כלל אצבע* (עמודת "rule" ב-DFM, מקדמי ביטחון, K-factor) חייב `caveat` עם גבולות התוקף.
