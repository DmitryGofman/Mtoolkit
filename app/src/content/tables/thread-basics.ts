import type { ReferenceTable } from '../../game/types.ts'

/**
 * ISO metric coarse thread — basic dimensions (pitch diameter, minor
 * diameter, tensile stress area). Pitch/minor diameter cross-checked between
 * Modulus Metal (raw ISO 724 table) and the formula in MechaniCalc
 * (d2 = d − 0.64951905·P, d3 = d − 1.226869·P) — exact match. Tensile stress
 * area from MechaniCalc, formula A_s = 0.7854·[(d2+d3)/2]².
 */
export const threadBasicsTable: ReferenceTable = {
  id: 'thread-basics-metric',
  codename: 'DATA-05 // THREADS',
  title: 'תבריג מטרי — מידות יסוד',
  category: 'ברגים והברגות',
  standard: 'ISO 261 / ISO 724',
  intro:
    'הגיאומטריה שמאחורי כל שאר טבלאות הברגים: קוטר תבריג אמצעי (d2, איפה שהברגה ואום נוגעים), קוטר ליבה (d3, החלק הכי חלש), ושטח החתך האפקטיבי (A_s) — הערך שבו משתמשים לחישובי עומס ומומנט.',
  columns: [
    { label: 'תבריג', labelEn: 'Thread' },
    { label: 'פסיעה', labelEn: 'Pitch (mm)', numeric: true },
    { label: 'קוטר אמצעי d2', labelEn: 'Pitch Ø d2 (mm)', numeric: true },
    { label: 'קוטר ליבה d3', labelEn: 'Minor Ø d3 (mm)', numeric: true },
    { label: 'שטח מתיחה', labelEn: 'Tensile stress area As (mm²)', numeric: true },
  ],
  rows: [
    ['M2', 0.4, 1.74, 1.51, 2.07],
    ['M2.5', 0.45, 2.208, 1.948, 3.39],
    ['M3', 0.5, 2.675, 2.387, 5.03],
    ['M4', 0.7, 3.545, 3.141, 8.78],
    ['M5', 0.8, 4.48, 4.019, 14.18],
    ['M6', 1.0, 5.35, 4.773, 20.12],
    ['M8', 1.25, 7.188, 6.466, 36.61],
    ['M10', 1.5, 9.026, 8.16, 57.99],
    ['M12', 1.75, 10.863, 9.853, 84.27],
    ['M16', 2.0, 14.701, 13.546, 156.7],
    ['M20', 2.5, 18.376, 16.933, 244.8],
  ],
  caveat:
    'תבריג גס (coarse) בלבד — לתבריג עדין (fine) יש פסיעה קטנה יותר ולכן d2/d3/As שונים לאותו קוטר נומינלי. A_s הוא הערך לשימוש בחישובי חוזק בורג (יחד עם טבלת מחלקות החוזק DATA-04) — לא שטח החתך המלא של קוטר d.',
  sourceId: 'SRC-TBL-104',
  sourceNote:
    'הוצלב במלואו בין Modulus Metal (טבלת ISO 724 ישירה) לבין נוסחת MechaniCalc (d2=d−0.6495P, d3=d−1.2269P) — התאמה מדויקת בכל 11 המידות. ראו sources/verified/reference-tables.md',
  relatedChapter: 'ch01-bolts',
}
