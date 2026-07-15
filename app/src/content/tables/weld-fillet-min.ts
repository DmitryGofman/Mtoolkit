import type { ReferenceTable } from '../../game/types.ts'

/**
 * Minimum fillet-weld leg size vs. base-metal thickness, per AWS D1.1 Table 7.7
 * (also AISC 360 Table J2.4). The AWS code itself is paywalled (SRC-TBL-217);
 * values here are as quoted by attributable secondary sources (SRC-TBL-304,
 * cross-consistent across several engineering references). Marked for human
 * verification against the code before high-stakes use — see caveat.
 */
export const weldFilletMinTable: ReferenceTable = {
  id: 'weld-fillet-min',
  codename: 'DATA-12 // WELD MIN',
  title: 'רגל ריתוך פינתי מינימלית',
  category: 'ריתוך',
  standard: 'AWS D1.1 Table 7.7 / AISC J2.4',
  intro:
    'תפר קטן מדי על לוח עבה מתקרר מהר מדי — סדקים. לכן הקוד כופה רגל מינימלית לפי עובי החלק העבה מבין השניים. המקסימום הפוך: לא יותר מעובי החלק הדק.',
  columns: [
    { label: 'עובי החלק העבה', labelEn: 'Thicker part T (mm)', numeric: true },
    { label: 'עובי (אינץ׳)', labelEn: 'T (inch)', numeric: true },
    { label: 'רגל מינימלית', labelEn: 'Min leg (mm)', numeric: true },
    { label: 'רגל (אינץ׳)', labelEn: 'Min leg (inch)', numeric: true },
  ],
  rows: [
    ['T ≤ 6', 'T ≤ 1/4', 3, '1/8'],
    ['6 < T ≤ 12', '1/4 < T ≤ 1/2', 5, '3/16'],
    ['12 < T ≤ 20', '1/2 < T ≤ 3/4', 6, '1/4'],
    ['T > 20', 'T > 3/4', 8, '5/16'],
  ],
  caveat:
    'ערכים כפי שמצוטטים ממקורות משניים מיוחסים — טרם אומתו מול נוסח AWS D1.1 עצמו (בתשלום); לשימוש מחייב יש לאמת מול הקוד. כללים נלווים מהקוד: הרגל אינה חייבת לעלות על עובי החלק הדק; בעומס מחזורי המינימום 5 מ"מ (3/16″); הגדרת T תלויה בתהליך (low-hydrogen או לא). הקוד אימפריאלי — ערכי המ"מ הם ההמרות המקובלות.',
  sourceId: 'SRC-TBL-304',
  sourceNote:
    'מצוטט לפי Welding Answers (מצטט AWS D1.1:2020 Table 7.7 + AISC 360 J2.4) ועקבי בין כמה מקורות הנדסיים; המקור המחייב עצמו בתשלום — דורש אימות אנושי מול הקוד. ראו sources/verified/reference-tables.md',
  unlockedBy: 'ch11-welding',
}
