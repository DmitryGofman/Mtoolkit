# אימות ערכי טבלאות עזר — ראיות חילוץ

מסמך זה מתעד את הערכים שחולצו לטבלאות ה-Datapad ב-`app/src/content/tables/`,
מקורותיהם ותהליך ההצלבה. כלל: ערך נכנס לתוכן רק אם נקרא מהתקן עצמו **או** הוצלב
בין שני מקורות בלתי-תלויים לפחות. תאריך אימות: 2026-07-14.

---

## 1. חורי מעבר לברגים (`clearance-holes-metric`) — דירוג A

**מקור ראשי: ISO 273:1979 עצמו.** התקן הוא בן 2 עמודים, והתצוגה המקדימה הרשמית
(iTeh, מפיץ תקנים מורשה) כוללת את טבלת הממדים המלאה. הקובץ שמור:
`sources/verified/docs/iso-273-1979-official-preview.pdf` (עמ׳ 4 — הטבלה).

**ערכים שחולצו (fine / medium / coarse, מ"מ):**

| Thread | fine | medium | coarse |
|--------|------|--------|--------|
| M2 | 2.2 | 2.4 | 2.6 |
| M2.5 | 2.7 | 2.9 | 3.1 |
| M3 | 3.2 | 3.4 | 3.6 |
| M4 | 4.3 | 4.5 | 4.8 |
| M5 | 5.3 | 5.5 | 5.8 |
| M6 | 6.4 | 6.6 | 7 |
| M8 | 8.4 | 9 | 10 |
| M10 | 10.5 | 11 | 12 |
| M12 | 13 | 13.5 | 14.5 |
| M16 | 17 | 17.5 | 18.5 |
| M20 | 21 | 22 | 24 |
| M24 | 25 | 26 | 28 |

שדות טולרנס לפי התקן: fine H12, medium H13, coarse H14. התקן ממליץ קיטום מול
רדיוס מתחת לראש.

**הצלבות:**
- AmesWeb (SRC-TBL-124, מצטט ASME B18.2.8): זהה בכל הערכים שנבדקו M2–M24 ✔
- Zhonghuan (SRC-TBL-108): זהה פרט ל-**M16 coarse: 18.0 אצלם, 18.5 בתקן** — שגיאה
  אצל Zhonghuan; תועד ברשומה.
- Fractory (SRC-TBL-125): **נפסל** — עמודת ה-close שלהם שווה לקוטר הנומינלי
  (למשל M8 → 8.0), כלומר אפס מרווח; סותר את התקן ואת ההיגיון הפיזי.

## 2. קידוח קדם-הברגה (`tap-drill-metric`) — דירוג B מוצלב

**מקורות:** AmesWeb tap-drill chart (מצטט ISO 68-1; כלל d−P) + LittleMachineShop
"Metric Tap & Clearance Drill Sizes" (קובץ שמור:
`sources/verified/docs/littlemachineshop-metric-tap-clearance.pdf`).

**עמודת ~75% (חומרים רכים) — הצלבה מלאה:**

| Thread | Pitch | Drill 75% | AmesWeb | LMS |
|--------|-------|-----------|---------|-----|
| M2 | 0.4 | 1.6 | 1.60 ✔ | 1.60 ✔ (שורת פסיעה 0.40) |
| M2.5 | 0.45 | 2.05 | 2.05 ✔ | 2.05 ✔ |
| M3 | 0.5 | 2.5 | 2.50 ✔ | 2.50 ✔ (שורת 0.50) |
| M4 | 0.7 | 3.3 | 3.30 ✔ | 3.30 ✔ (שורת 0.70) |
| M5 | 0.8 | 4.2 | 4.20 ✔ | 4.20 ✔ (שורת 0.80) |
| M6 | 1.0 | 5.0 | 5.00 ✔ | 5.00 ✔ |
| M8 | 1.25 | 6.8 | 6.80 ✔ | 6.80 ✔ |
| M10 | 1.5 | 8.5 | 8.50 ✔ | 8.50 ✔ |
| M12 | 1.75 | **10.2** | 10.20 | **10.30 (LMS)** — ראו הערה |
| M16 | 2.0 | 14.0 | 14.00 ✔ | 14.00 ✔ |
| M20 | 2.5 | 17.5 | 17.50 ✔ | 17.50 ✔ |

**הערת M12:** סטייה יחידה. d−P = 10.25; AmesWeb ומרבית טבלאות ISO: 10.2;
טבלאות בתי-מלאכה אמריקאיות (LMS): 10.3 (הקירוב ל-13/32″). נבחר 10.2, והגרסה
תועדה ב-caveat של הטבלה. שתיהן בטווח אחיזה תקין.

הערה: טבלת LMS כוללת גם שורות פסיעה לא-ISO (למשל M2×0.45); חולצו רק שורות
הפסיעה הגסה לפי ISO 261 (M2×0.4, M2.5×0.45, M3×0.5, M4×0.7, M5×0.8, M6×1.0,
M8×1.25, M10×1.5, M12×1.75, M16×2.0, M20×2.5).

**עמודת ~50% (חומרים קשים) — LMS + אימות נוסחה:** מקור טבלאי יחיד (LMS), לכן כל
ערך אומת גם מול נוסחת האחיזה (drill ≈ d − 0.6495·P·(engagement/50%)... בצורתה
המקובלת: d − 1.299·P·(%/100)):

| Thread | LMS 50% | נוסחה (d − 0.6495·P) | ✓ |
|--------|---------|----------------------|---|
| M2 | 1.75 | 1.74 | ✔ |
| M2.5 | 2.2 | 2.21 | ✔ |
| M3 | 2.7 | 2.68 | ✔ |
| M4 | 3.5 | 3.55 | ✔ |
| M5 | 4.5 | 4.48 | ✔ |
| M6 | 5.4 | 5.35 | ✔ |
| M8 | 7.2 | 7.19 | ✔ |
| M10 | 9.0 | 9.03 | ✔ |
| M12 | 10.9 | 10.86 | ✔ |
| M16 | 14.75 | 14.70 | ✔ |
| M20 | 18.5 | 18.38 | ✔ (עיגול למקדח סטנדרטי) |

---

## 3. חוזק פלסטיקה הנדסית (`plastics-strength`) — דירוג B, מקור יחיד

**מקור:** Professional Plastics, "Mechanical Properties of Plastic Materials"
(SRC-TBL-302). ה-PDF (4 עמודים) נקרא במלואו בקריאה ישירה; עותק שמור:
`sources/verified/docs/professional-plastics-mechanical-properties.pdf`.

**מה חולץ:** tensile strength (MPa), tensile modulus (GPa), elongation (%),
hardness (Rockwell/Shore), Izod (J/m) עבור ABS, PC, POM-C, POM-H, PA6, PA66,
PEEK, PP, PTFE, UHMW-PE — **כטווחים, verbatim מהמקור** (לא נקבעו ערכי נקודה).

**מגבלות:** מקור יחיד (מפיץ, לא יצרן שרף); אין עמודת HDT — להשלים מ-MatWeb
(SRC-TBL-303). ה-caveat בטבלת ה-Datapad מזהיר: לא ערכי תכן, datasheet לפי grade.

## 4. גימור פנים Ra/N-grade (`surface-finish-ra`) — דירוג B מוצלב

**מקור:** PREMSA Industries surface-finish chart (SRC-TBL-301), מצטט
ISO 1302:2002 + ISO 4287. הטבלה חולצה **פעמיים בשליפות נפרדות** (2026-07-14)
עם תוצאות זהות: N1–N10 עם Ra(µm), Ra(µin), תהליך אופייני ושימוש.

**הצלבה:** הערכים תואמים בדיוק את סדרת ההכפלה הקנונית של דרגות ISO
(Ra 0.025 × 2ⁿ: 0.025/0.05/0.1/0.2/0.4/0.8/1.6/3.2/6.3/12.5) ואת ערכי
ה-µin הקלאסיים (1/2/4/8/16/32/63/125/250/500). N11/N12 (Ra 25/50) לא בטבלת
המקור — צוינו ב-caveat בלבד.

## 5. רגל ריתוך פינתי מינימלית (`weld-fillet-min`) — ⚠ מקור משני, ממתין לאימות מול הקוד

**מקור מחייב:** AWS D1.1 Table 7.7 (SRC-TBL-217) — בתשלום, לא נקרא ישירות.
**מה כן אומת:** הערכים (T≤1/4″→1/8″; ≤1/2″→3/16″; ≤3/4″→1/4″; >3/4″→5/16″)
מצוטטים באופן עקבי על-ידי Welding Answers (SRC-TBL-304, מצטט את הקוד במפורש
כולל מהדורה) וכמה מקורות הנדסיים נוספים שנסרקו בחיפוש. ערכי המ"מ (3/5/6/8)
הם ההמרות המקובלות.

**סטטוס: needs-review** — הטבלה נכנסה ל-Datapad עם caveat מפורש בגוף הטבלה
("טרם אומתו מול נוסח AWS D1.1 עצמו"). לפני שימוש בתוכן בחינה/מחייב — לאמת מול
הקוד או מול AISC Steel Construction Manual Table J2.4.

---

## 6. מומנטי הידוק ו-preload (`torque-vdi2230`) — דירוג B, נקרא מהמקור

**מקור:** Bossard "Preload and tightening torques" (SRC-TBL-112), מבוסס VDI 2230
edition 2015. ה-PDF (74 עמ׳ קטלוג, טבלה בעמ׳ 61-62) נקרא במלואו ישירות
(WebFetch נכשל — FlateDecode — כמו בסבבים קודמים). עותק שמור:
`sources/verified/docs/bossard-preload-tightening-torques.pdf`.

**מה חולץ:** M4/M5/M6/M8/M10/M12/M16/M20/M24, μ=0.10 ו-0.14, preload מרבי (kN)
ומומנט הידוק מרבי (Nm) לכל אחת משלוש מחלקות 8.8/10.9/12.9. הטבלה המקורית כוללת
גם μ=0.08/0.12 ו-M1.6–M39 — לא כל השורות חולצו (ראו caveat בטבלת ה-Datapad).

**מגבלות:** ערכי "קירוב" (90% מגבול הכניעה, ללא מקדם ביטחון) המוצהרים ככאלה
במפורש במקור. לא תחליף לחישוב VDI 2230 המלא.

## 7. מחלקות חוזק לברגים (`property-classes`) — דירוג B, נקרא מהמקור

**מקור:** Fastenal "Mechanical Properties Per ISO 898-1" (SRC-TBL-110), Rev
3-6-09. נקרא ישירות (WebFetch נכשל גם כאן). עותק שמור:
`sources/verified/docs/fastenal-mechanical-properties-iso898-1.pdf`.

**מה חולץ:** 4.6, 8.8 (מפוצל M5-M16 / M18-M39 — ערכי proof/tensile שונים
מעט!), 10.9, 12.9 — proof stress, tensile Rm, yield Rp0.2, טווח קשיות Rockwell,
וסיווג חומר. המסמך מכיל גם שטחי מתיחה מטריים (טבלה 1.1/1.8) וטבלת ISO 3506-1
לפלב"מ — לא חולצו בסבב זה.

## 8. קידוח והברגה אינצ'יים UNC/UNF (`tap-drill-imperial`, `clearance-holes-imperial`) — דירוג B מוצלב במלואו

**מקורות:** AmesWeb Unified Tap Drill Calculator (ASME B1.1) + LittleMachineShop
"Tap & Clearance Drill Sizes" עמ׳ 2 (SRC-TBL-306, אותו PDF כבר משמש למטרי).

**הצלבה:** **כל 12 המידות שנבדקו (#4–3/4") תואמות בדיוק** בין שני המקורות —
TPI, מקדח 75%/50% לשתי הסדרות UNC/UNF, ומקדחי clearance close/free. אין אף
אי-התאמה אחת. זו ההצלבה הנקייה ביותר עד כה בפרויקט.

**נקודה מעניינת:** ל-#8, מקדח ה-75% זהה (#29) לשתי הסדרות UNC-32 ו-UNF-36 —
אומת כצירוף מקרים גיאומטרי אמיתי, לא כשגיאת מקור (כפי שנחשד לגבי AmesWeb
בעבר לפני ההצלבה).

## 9. סבילויות כלליות ISO 2768-1 — טבלה ליניארית (`general-tolerances-iso2768`) — דירוג B מוצלב

**מקורות:** RivCut (SRC-TBL-122) מוצלב מול ChansMachining (SRC-TBL-119).
הטבלה הליניארית (8 טווחי מידה × 4 מחלקות f/m/c/v) חולצה במלואה מ-RivCut;
הערכים תואמים ידע מוכר על ISO 2768-1 (למשל m/6-30mm=±0.2mm, כפי שגם
ChansMachining הראה בבדיקת-סבירות קודמת). הטבלאות הזוויתית (5 טווחים) והגאומטרית
(ISO 2768-2, מחלקות H/K/L) קיימות במקור אך לא חולצו בסבב זה.

---

## 10. תבריג מטרי — מידות יסוד (`thread-basics-metric`) — דירוג B מוצלב

**מקורות:** Modulus Metal (SRC-TBL-104, טבלת ISO 724 גולמית) מוצלב מול נוסחת
MechaniCalc (d2=d−0.6495·P, d3=d−1.2269·P). **התאמה מדויקת בכל 11 המידות**
(M2–M20). שטח מתיחה (A_s) מ-MechaniCalc (SRC-TBL-103).

## 11. דרגות סבילות IT + התאמות מועדפות (`it-grades`, `preferred-fits`) — דירוג B, נקרא במלואו

**מקור:** ChansMachining "General Tolerance Chart" (SRC-TBL-119) — מסמך יחיד
בן 4 עמודים, נקרא במלואו ישירות (Read). עמ׳ 2: מטריצת IT01–IT18 מלאה לפי
טווחי מידה עד 3150mm. עמ׳ 3: מטריצות סטיות-יסוד מלאות לחור (D10...R7) ולציר
(d9...s7). עמ׳ 4: סבילויות כלליות ISO 2768 (לינארי/זוויתי/גאומטרי) — תואם
בדיוק את הערכים שכבר אומתו מול RivCut (`general-tolerances-iso2768`).

**הצלבה:** ערך אחד (IT7/3-6mm=12µm) כבר אומת בעבר מול Machining Doctor.
הפעם המסמך כולו נקרא — כל הערכים בטבלאות ה-Datapad נלקחים ישירות ממנו,
לא משוחזרים מזיכרון.

**caveat:** מקור B בלבד (בית-מלאכה, לא התקן/יצרן) — אך פורמט מקצועי ועקבי,
והערכים תואמים ידע תקני מוכר בכל בדיקת-סבירות שבוצעה.

## 12. חוזק מתכות — 10 חומרים (`metals-strength`) — דירוג A ברובם

**מקורות (10 datasheets נפרדים, רובם נקראו ישירות — Read, לא WebFetch):**
- S235JR — thyssenkrupp Materials Services (SRC-TBL-307) — **A**
- S355JR — Ovako SteelNavigator (SRC-TBL-114, כבר verified) — **A**
- AISI 1045/4140/304/316/5052-H32 — MW Components/Elgin (SRC-TBL-308) — **A**
- 6061-T6 — eco-alum.com (SRC-TBL-309) — **A**
- 7075-T6 — Gabrian International (SRC-TBL-310) — **B**
- 6082-T6 — Aalco Metals (SRC-TBL-311) — **B**

**נקודת בקרה חשובה:** נבדק ונפסל smithmetal.com עבור 6082 — נתן ערך proof
stress 170 MPa, נמוך מדי ל-T6 (הערך התקני ~250-260 MPa) ונראה כמייצג מצב
לא-מסומן/כללי. Aalco (כותרת מפורשת "T6~T651") נבחר כמקור הנכון. באופן דומה,
mwcomponents נתן רק את 7075-**O** (annealed, yield 103 MPa בלבד) — Gabrian
סיפק טבלה משווה עם כל שלושת מצבי החישול וזוהה כמקור ל-T6 (yield 503 MPa).

## 13. רדיוס כיפוף מינימלי (`bend-radius`) — דירוג B, פירוט מלא

**מקור:** RivCut bend-radius chart (SRC-TBL-312/211). אומת ב-WebFetch שמכיל
פירוק מלא לפי חומר (5052-H32, 6061-T6, פלדה 1018, פלב"מ 304), טווח עובי,
וכיוון כיפוף (עם-סיב מול נגד-סיב). בונוס: thyssenkrupp S235JR datasheet
(SRC-TBL-307) מכיל טבלת רדיוס כיפוף רשמית ליצרן לפלדת S235JRC.

## 14. עובי דופן מינימלי בהדפסה (`print-wall-thickness`) — דירוג B

**מקור:** Hubs/Protolabs Network DFM guide (SRC-TBL-313/218). מכסה את כל
5 התהליכים המבוקשים (FDM/SLA/SLS/MJF/DMLS) עם ערכי supported/unsupported.

## 15. Ra לפי תהליך ייצור (`ra-by-process`) — דירוג B, מכני מוצלב + יציקה מוחלש

**מקור:** RivCut surface-finish chart (SRC-TBL-314). מטריצת תהליך↔Ra אמיתית
למכניקה/EDM (17 שורות). שורות היציקה/חישול (sand-cast, die-cast, forging)
לא במקור זה — הוצלבו בנפרד מול חיפוש רב-מקורי (metal-castings.com,
mag-cast.com) עם עקביות סבירה אך לא PDF יחיד שנקרא — **caveat מפורש בטבלה**.

## 16. סמלי ריתוך (`weld-symbols`) — דירוג B, מקור משני בלבד

**מקור:** steelcalculator.app (SRC-TBL-315), מצטט AWS A2.4 / ISO 2553
במפורש. **התקן המחייב לא נקרא** — ניסיונות לגשת ל-app.aws.org (403) ול-
OpenOregon Pressbooks CC-BY (403, SRC-TBL-214) נכשלו שניהם בסבב זה.
חסר פרט קריטי (arrow-side מול other-side) — מתועד כ-caveat בטבלה.

---

## סטטוס

| טבלה ב-Datapad | דירוג אימות | קובץ ראיה |
|----------------|-------------|-----------|
| `clearance-holes-metric` | **A** — נקרא מהתקן | iso-273-1979-official-preview.pdf |
| `tap-drill-metric` | **B מוצלב** — 2 מקורות + נוסחה | littlemachineshop-metric-tap-clearance.pdf |
| `plastics-strength` | **B מקור יחיד** — טווחים verbatim | professional-plastics-mechanical-properties.pdf |
| `surface-finish-ra` | **B מוצלב** — שליפה כפולה + סדרה קנונית | (עמוד אינטרנט — SRC-TBL-301) |
| `weld-fillet-min` | **⚠ needs-review** — מקורות משניים בלבד | (SRC-TBL-304; הקוד בתשלום) |
| `torque-vdi2230` | **B** — נקרא מהמקור (Bossard/VDI 2230) | bossard-preload-tightening-torques.pdf |
| `property-classes` | **B** — נקרא מהמקור (Fastenal/ISO 898-1) | fastenal-mechanical-properties-iso898-1.pdf |
| `tap-drill-imperial` | **B מוצלב במלואו** — 12/12 מידות תואמות | littlemachineshop-metric-tap-clearance.pdf (עמ׳ 2) |
| `thread-basics-metric` | **B מוצלב** — נוסחה מדויקת | (Modulus Metal + MechaniCalc) |
| `it-grades` / `preferred-fits` | **B, נקרא במלואו** | chansmachining-iso-tolerance-chart.pdf |
| `metals-strength` | **A/B מעורב** — 8/10 חומרים A | 10 datasheets, ראו סעיף 12 |
| `bend-radius` | **B, פירוט מלא** | (RivCut + thyssenkrupp bonus) |
| `print-wall-thickness` | **B, כל 5 תהליכים** | (Hubs/Protolabs) |
| `ra-by-process` | **B מכני, מוחלש ליציקה** | (RivCut + הצלבת חיפוש) |
| `weld-symbols` | **B, מקור משני בלבד** | (steelcalculator.app — התקן לא נקרא) |
| `clearance-holes-imperial` | **B מוצלב במלואו** — 12/12 מידות תואמות | littlemachineshop-metric-tap-clearance.pdf (עמ׳ 2) |
| `general-tolerances-iso2768` | **B מוצלב** — RivCut × ChansMachining | (עמוד אינטרנט — SRC-TBL-122) |

מי בדק: הצלבה אוטומטית במסגרת session בניית ה-Datapad (2026-07-14); מומלץ מעבר
עין אנושי לפני שחרור רשמי ללומדים.
