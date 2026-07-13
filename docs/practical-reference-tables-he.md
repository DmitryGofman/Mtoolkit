# טבלאות עזר למהנדס מכונות מעשי — רשימת מקורות לאיסוף

> **מטרת המסמך:** רשימת ה"טבלאות שכל מהנדס חייב להציץ בהן" — הנתונים המספריים שאנחנו
> צריכים לאסוף מהאינטרנט ומקטלוגים כדי לבנות את ה-codex ואת תוכן הלומדה.
> זהו **worklist לאיסוף מקורות**, לא מקור בפני עצמו.
>
> **כלל ברזל (מתוך `CLAUDE.md`):** אין להכניס נתון מספרי לתוכן לימודי בלי מקור מאומת
> ב-`sources/verified/`. כל טבלה שנאסוף → נרשמת ב-`sources/source-index.md`, הקובץ
> יורד ל-`sources/verified/`, ורק אז מותר לצטט. עד אז — `[דורש אימות]`.
> **כללי אצבע חייבים `caveat`** (מגבלות תוקף).
>
> **דירוג עדיפות:** ⭐⭐⭐ קריטי (פרקי ליבה) · ⭐⭐ חשוב · ⭐ להעשרה.
> **סטטוס:** `☐` לא נאסף · `☑` נאסף ואומת.

---

## 1. ברגים והברגות (Fasteners & Threads)

| # | טבלה (EN) | מה זה נותן | מקור/תקן מומלץ | עדיפות | סטטוס |
|---|-----------|-----------|----------------|:------:|:-----:|
| 1.1 | **Metric thread sizes & pitch (coarse/fine)** | קוטר נומינלי, פסיעה גסה/דקה (M3…M24), קוטר גב/ליבה | ISO 261 / ISO 262 | ⭐⭐⭐ | ☐ |
| 1.2 | **Unified thread (UNC/UNF) sizes & TPI** | מקבילה אימפריאלית — # ו-fractional, חוטים לאינץ׳ | ASME B1.1 | ⭐⭐ | ☐ |
| 1.3 | **Tap drill (tapping) diameters** | קוטר מקדח לכל הברגה (75% engagement), מטרי + UNC/UNF | ISO 2306 / קטלוג יצרן מקדחים | ⭐⭐⭐ | ☐ |
| 1.4 | **Clearance (through) hole sizes for bolts** | קוטר חור מעבר: fine / medium / coarse (close/normal/loose) | ISO 273 | ⭐⭐⭐ | ☐ |
| 1.5 | **Counterbore & countersink dimensions** | קדח שקע לראש גלילי/שקוע לכל מידת בורג | ISO 4762 / ISO 10642 (מידות ראש) | ⭐⭐ | ☐ |
| 1.6 | **Bolt property classes & proof/yield/tensile** | 4.8 / 8.8 / 10.9 / 12.9 — חוזק כניעה ומתיחה | ISO 898-1 | ⭐⭐⭐ | ☐ |
| 1.7 | **Tightening torque tables** | מומנט הידוק מומלץ לכל מידה × class × מקדם חיכוך | VDI 2230 / קטלוג יצרן (מאומת) | ⭐⭐⭐ | ☐ |
| 1.8 | **Tensile stress area (A_s)** | שטח חתך אפקטיבי לחישוב עומס בורג | ISO 898-1 נספח | ⭐⭐ | ☐ |
| 1.9 | **Thread engagement / min. length of engagement** | אורך הברגה מינימלי לפי חומר האם (רך/קשה) | NASA RP-1228 (כבר `verified`) / Machinery's Handbook | ⭐⭐ | ☑? |
| 1.10 | **Washer & spring-washer dimensions** | קוטר פנים/חוץ/עובי שייבות שטוחות וקפיציות | ISO 7089 / ISO 7090 | ⭐ | ☐ |
| 1.11 | **Nut dimensions & wrench (AF) sizes** | גובה אום, מפתח בין-שטחים לכל מידה | ISO 4032 | ⭐⭐ | ☐ |

## 2. תותבות הברגה (Threaded Inserts)

| # | טבלה (EN) | מה זה נותן | מקור/תקן מומלץ | עדיפות | סטטוס |
|---|-----------|-----------|----------------|:------:|:-----:|
| 2.1 | **Helical (wire) inserts — drill & tap chart** | קוטר קדח, מכה מיוחדת ואורכי תותב (1D/1.5D/2D) | קטלוג Helicoil / Recoil | ⭐⭐ | ☐ |
| 2.2 | **Solid (Keensert / self-tapping) inserts** | קדח, מומנט התקנה, עומס עקירה | קטלוג יצרן | ⭐ | ☐ |
| 2.3 | **Threaded inserts for plastics** | heat-set / press-fit / mold-in — קוטר boss וקדח | קטלוג tappex / Spirol + מדריכי DFM | ⭐⭐ | ☐ |
| 2.4 | **Threaded inserts for 3D-printed parts** | heat-set inserts ל-FDM — קוטר חור, עומק | מדריכי יצרנים (Voxelab/McMaster) | ⭐ | ☐ |

## 3. חוזק חומרים (Material Properties)

| # | טבלה (EN) | מה זה נותן | מקור/תקן מומלץ | עדיפות | סטטוס |
|---|-----------|-----------|----------------|:------:|:-----:|
| 3.1 | **Steels — yield / UTS / E / density** | פלדות נפוצות (S235, S355, 4140, 304/316 SS) | MatWeb / EN 10025 / datasheet יצרן | ⭐⭐⭐ | ☐ |
| 3.2 | **Aluminium alloys — temper properties** | 6061-T6, 7075-T6, 5052 — כניעה/מתיחה/E | Aluminum Assoc. / MatWeb | ⭐⭐⭐ | ☐ |
| 3.3 | **Engineering plastics** | ABS, PC, POM, Nylon, PEEK — חוזק, HDT, E | datasheet יצרן שרף | ⭐⭐ | ☐ |
| 3.4 | **3D-printing material properties** | PLA/PETG/ASA (FDM), resin (SLA), PA12 (SLS/MJF) — anisotropy! | datasheet יצרן חוט/שרף | ⭐⭐ | ☐ |
| 3.5 | **Allowable / safety factors by application** | מקדמי ביטחון מקובלים לפי סוג עומס | ספרות תכן (Shigley) | ⭐⭐ | ☐ |
| 3.6 | **Hardness conversion (HB↔HRC↔HV↔UTS)** | המרת קשיות ואומדן UTS | ASTM E140 | ⭐ | ☐ |

## 4. סבילויות והתאמות (Tolerances & Fits)

| # | טבלה (EN) | מה זה נותן | מקור/תקן מומלץ | עדיפות | סטטוס |
|---|-----------|-----------|----------------|:------:|:-----:|
| 4.1 | **IT grades — tolerance values by dimension** | ערכי סבילות (µm) לכל IT01…IT18 × טווח מידה | ISO 286-1 | ⭐⭐⭐ | ☐ |
| 4.2 | **Hole/shaft limit deviations (fundamental deviations)** | ערכי H7, g6, h6, p6 וכו׳ בפועל | ISO 286-2 | ⭐⭐⭐ | ☐ |
| 4.3 | **Preferred fits (clearance/transition/interference)** | H7/g6, H7/p6… + תיאור השימוש | ISO 286 / Machinery's Handbook | ⭐⭐⭐ | ☐ |
| 4.4 | **General (un-toleranced) tolerances** | סבילות ברירת מחדל fine/medium/coarse | ISO 2768-1 (ליניארי) + ISO 2768-2 (גאומטרי) | ⭐⭐⭐ | ☐ |
| 4.5 | **GD&T symbols & modifiers reference** | סמלי צורה/מיקום/MMC | ASME Y14.5 (כבר REF-DRW-02) | ⭐⭐ | ☑? |

## 5. יכולת תהליכי ייצור — סבילות מושגת (Process Capability)

> הטבלה ה"IT8/IT10" שהמשתמש ביקש: איזו רמת סבילות **מעשית** לצפות מכל תהליך.

| # | טבלה (EN) | מה זה נותן | מקור/תקן מומלץ | עדיפות | סטטוס |
|---|-----------|-----------|----------------|:------:|:-----:|
| 5.1 | **Achievable IT tolerance grade by process** | ליטוש/כרסום/חריטה/יציקה/ריתוך → טווח IT ריאלי | ISO 286 charts / Machinery's Handbook / DFMPro | ⭐⭐⭐ | ☐ |
| 5.2 | **Surface roughness (Ra) achievable by process** | Ra טיפוסי לכל תהליך (turning, grinding, EDM…) | ISO 4287 + טבלאות DFM | ⭐⭐⭐ | ☐ |
| 5.3 | **Economical vs. achievable tolerance band** | ההבדל בין "אפשרי" ל"זול" — עלות מול דיוק | ספרות ייצור / DFM | ⭐⭐ | ☐ |

## 6. הנחיות תכן-לייצור לכל תהליך (DFM Guidelines)

| # | טבלה/מדריך (EN) | מה זה נותן | מקור מומלץ | עדיפות | סטטוס |
|---|-----------------|-----------|-----------|:------:|:-----:|
| 6.1 | **CNC machining DFM** | קטרי כלי, יחס עומק/קוטר, פינות פנימיות מינימליות | מדריכי Protolabs / Xometry / Fictiv | ⭐⭐⭐ | ☐ |
| 6.2 | **Sheet-metal DFM** | יחס חור-לעובי, מרחק חור-לקצה, פרוסת כיפוף | Protolabs / SendCutSend | ⭐⭐⭐ | ☐ |
| 6.3 | **Injection-molding DFM** | עובי דופן אחיד, זוויות שחרור (draft), צלעות | מדריך יצרן / Protolabs | ⭐⭐ | ☐ |
| 6.4 | **Casting (sand / die) DFM** | עובי דופן מינ׳, draft, רדיוסים, קווי פרידה | ספרות ייצור | ⭐ | ☐ |
| 6.5 | **Turning / milling design rules** | undercut, קדחים עמוקים, chamfer מול פינה חדה | מדריכי DFM | ⭐⭐ | ☐ |

## 7. רדיוסים ופינות מינימליות (Radii & Fillets)

| # | טבלה (EN) | מה זה נותן | מקור/תקן מומלץ | עדיפות | סטטוס |
|---|-----------|-----------|----------------|:------:|:-----:|
| 7.1 | **Sheet-metal minimum bend radius by material/thickness** | רדיוס כיפוף מינ׳ (בד״כ ≥ עובי) לפי סגסוגת | קטלוג יצרן / DFM sheet-metal | ⭐⭐⭐ | ☐ |
| 7.2 | **Bend allowance / K-factor** | פיתוח שטוח לכיפופים — פרוסה שטוחה | טבלאות K-factor | ⭐⭐ | ☐ |
| 7.3 | **Minimum internal corner radius — machining** | רדיוס פינה פנימית = רדיוס כלי (אין פינה חדה 90°) | DFM CNC | ⭐⭐ | ☐ |
| 7.4 | **Fillet radius vs. stress concentration (K_t)** | מקדם ריכוז מאמצים לפי r/d | Peterson's / Roark's | ⭐⭐ | ☐ |
| 7.5 | **Minimum radius — casting / molding** | רדיוס פנימי/חיצוני מינ׳ למניעת סדק/כיווץ | DFM casting | ⭐ | ☐ |

## 8. ריתוך (Welding)

| # | טבלה (EN) | מה זה נותן | מקור/תקן מומלץ | עדיפות | סטטוס |
|---|-----------|-----------|----------------|:------:|:-----:|
| 8.1 | **Weld symbols reference** | סמלי ריתוך (fillet, groove, all-around…) | AWS A2.4 / ISO 2553 | ⭐⭐⭐ | ☐ |
| 8.2 | **Fillet weld size vs. plate thickness (min/max leg)** | רגל ריתוך מינ׳/מקס׳ לפי עובי לוח | AWS D1.1 / Eurocode EN 1993-1-8 | ⭐⭐⭐ | ☐ |
| 8.3 | **Weld strength / throat calculation** | חוזק תפר (throat, allowable stress) | AWS D1.1 / Eurocode | ⭐⭐ | ☐ |
| 8.4 | **Prep / groove geometry by thickness** | הכנת קצה (V/U/bevel) לפי עובי | ISO 9692 | ⭐ | ☐ |
| 8.5 | **Preheat & interpass temperature** | חימום מקדים לפי CE (carbon equivalent) | AWS D1.1 | ⭐ | ☐ |

## 9. הדפסת תלת-ממד — מגבלות תכן (3D-Printing Design Limits)

> המשתמש ביקש במפורש: **עובי דופן מינימלי לתהליכי הדפסה שונים**.

| # | טבלה (EN) | מה זה נותן | מקור מומלץ | עדיפות | סטטוס |
|---|-----------|-----------|-----------|:------:|:-----:|
| 9.1 | **Minimum wall thickness by process** | FDM / SLA / SLS / MJF / DMLS — דופן מינ׳ נתמכת ולא-נתמכת | Protolabs / Xometry / Shapeways DFM | ⭐⭐⭐ | ☐ |
| 9.2 | **Minimum feature size / pin / hole / clearance** | פרט קטן ביותר, מרווח בין חלקים נעים | מדריכי יצרן | ⭐⭐ | ☐ |
| 9.3 | **Overhang angle & support rules** | זווית תלייה מקס׳ ללא תמיכה (~45° FDM) | מדריכי DFM | ⭐⭐ | ☐ |
| 9.4 | **Achievable tolerance by AM process** | סבילות מושגת (± mm או %) לכל תהליך | datasheet יצרן | ⭐⭐ | ☐ |
| 9.5 | **Printed thread / boss guidelines** | הברגה מודפסת מול heat-set, קוטר boss | מדריכי DFM | ⭐ | ☐ |

## 10. אלמנטים סטנדרטיים נוספים (Standard Machine Elements)

| # | טבלה (EN) | מה זה נותן | מקור/תקן מומלץ | עדיפות | סטטוס |
|---|-----------|-----------|----------------|:------:|:-----:|
| 10.1 | **Bearing bore / OD standard series** | סדרות מיסבים (6000/6200/6300), התאמות ציר/בית | קטלוג SKF / ISO 15 | ⭐⭐ | ☐ |
| 10.2 | **Keys & keyways** | חתך מפתח לפי קוטר ציר + עומק חריץ | ISO/R 773 / DIN 6885 | ⭐⭐ | ☐ |
| 10.3 | **Retaining rings (circlips) grooves** | מידות חריץ לטבעות קפיץ | DIN 471 / 472 | ⭐ | ☐ |
| 10.4 | **O-ring groove design** | רוחב/עומק חריץ, squeeze | Parker O-Ring Handbook | ⭐ | ☐ |
| 10.5 | **Dowel / roll pin sizes & press fit** | קטרים ומידות התאמת פינים | ISO 2338 | ⭐ | ☐ |
| 10.6 | **Standard drill bit sizes** | מקדחים מטרי / number / letter / fractional | ISO 235 | ⭐⭐ | ☐ |
| 10.7 | **Standard sheet / plate / stock gauges** | עוביי חומר גלם סטנדרטיים (gauge → mm) | ISO / קטלוג ספק | ⭐ | ☐ |

---

## סדר איסוף מומלץ (רבעון ראשון)

1. **גל ⭐⭐⭐ מס׳ 1** — ברגים (1.1–1.9), חורים (1.3, 1.4), IT/fits (4.1–4.4), חוזק (3.1, 3.2).
   מזין את פרק הברגים ופרק הסבילויות (ליבת הסילבוס).
2. **גל ⭐⭐⭐ מס׳ 2** — יכולת תהליכים (5.1, 5.2), DFM ליבה (6.1, 6.2), רדיוס כיפוף (7.1),
   ריתוך (8.1, 8.2), דופן הדפסה מינ׳ (9.1).
3. **גל ⭐⭐** — התותבות (2.x), מרכיבים סטנדרטיים (10.x), והשלמות.

## תזכורת תהליך
- כל טבלה שנאספת → רשומת מקור ב-`sources/source-index.md` (דירוג A/B) → קובץ ב-`sources/verified/`.
- מקורות מומלצים כ"one-stop": **Machinery's Handbook** (מקיף אך לא חינמי) ותקני **ISO/ASME/DIN**
  (מחייבים אך בתשלום). מדריכי DFM של **Protolabs / Xometry / Fictiv** חינמיים ומצוינים
  לגלי DFM/AM — דירוג B, לאמת נתון מספרי מול תקן לפני הוראה.
- אין להעתיק טבלאות המוגנות בזכויות יוצרים לתוך הרפו — לחלץ ערכים, לצטט מקור, לבנות טבלה משלנו.
