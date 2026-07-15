import type { ReferenceTable } from '../../game/types.ts'

/**
 * Preload & tightening torque, metric coarse threads, VDI 2230 (2015 ed.).
 * Source: Bossard "Preload and tightening torques" guide (SRC-TBL-112),
 * PDF read directly in full (WebFetch fails on this FlateDecode PDF).
 * Values are "approximate values" per VDI 2230 — 90% yield utilization,
 * ISO 273-medium clearance holes, NOT a substitute for the full calculation.
 */
export const torqueVdi2230Table: ReferenceTable = {
  id: 'torque-vdi2230',
  codename: 'DATA-03 // TORQUE',
  title: 'מומנטי הידוק ו-preload — VDI 2230',
  category: 'ברגים והברגות',
  standard: 'VDI 2230 (2015) — ערכי קירוב',
  intro:
    'כמה למתוח ובאיזה מומנט. תלוי בשלושה דברים: מידת הבורג, מחלקת החוזק, ומקדם החיכוך (μ — תלוי סיכה/ציפוי). ערכים אלה הם קירוב ל-90% מגבול הכניעה — לא תחליף לחישוב VDI 2230 המלא ואינם כוללים מקדם ביטחון.',
  columns: [
    { label: 'תבריג', labelEn: 'Thread' },
    { label: 'μ', labelEn: 'μ (friction)', numeric: true },
    { label: 'F max — 8.8', labelEn: 'FM max 8.8 (kN)', numeric: true },
    { label: 'M max — 8.8', labelEn: 'MA max 8.8 (Nm)', numeric: true },
    { label: 'F max — 10.9', labelEn: 'FM max 10.9 (kN)', numeric: true },
    { label: 'M max — 10.9', labelEn: 'MA max 10.9 (Nm)', numeric: true },
    { label: 'F max — 12.9', labelEn: 'FM max 12.9 (kN)', numeric: true },
    { label: 'M max — 12.9', labelEn: 'MA max 12.9 (Nm)', numeric: true },
  ],
  rows: [
    ['M4', 0.1, 4.5, 2.6, 6.7, 3.9, 7.8, 4.5],
    ['M4', 0.14, 4.3, 3.3, 6.3, 4.8, 7.4, 5.6],
    ['M5', 0.1, 7.4, 5.2, 10.8, 7.6, 12.7, 8.9],
    ['M5', 0.14, 7.0, 6.5, 10.3, 9.5, 12.0, 11.2],
    ['M6', 0.1, 10.4, 9.0, 15.3, 13.2, 17.9, 15.4],
    ['M6', 0.14, 9.9, 11.3, 14.5, 16.5, 17.0, 19.3],
    ['M8', 0.1, 19.1, 21.6, 28.0, 31.8, 32.8, 37.2],
    ['M8', 0.14, 18.1, 27.3, 26.6, 40.1, 31.1, 46.9],
    ['M10', 0.1, 30.3, 43, 44.5, 63, 52.1, 73],
    ['M10', 0.14, 28.8, 54, 42.2, 79, 49.4, 93],
    ['M12', 0.1, 44.1, 73, 64.8, 108, 75.9, 126],
    ['M12', 0.14, 41.9, 93, 61.5, 137, 72.0, 160],
    ['M16', 0.1, 82.9, 180, 121.7, 264, 142.4, 309],
    ['M16', 0.14, 78.8, 230, 115.7, 338, 135.4, 395],
    ['M20', 0.1, 134, 363, 190, 517, 223, 605],
    ['M20', 0.14, 127, 464, 181, 661, 212, 773],
    ['M24', 0.1, 192, 625, 274, 890, 320, 1041],
    ['M24', 0.14, 183, 798, 260, 1136, 305, 1329],
  ],
  caveat:
    'ערכים "מקורבים" (approximate) לפי Bossard/VDI 2230 — ל-90% מגבול הכניעה, ללא מקדם ביטחון. תלוי קריטית במקדם החיכוך בפועל (μ) — כאן מוצגים μ=0.10 (טיפוסי לברגים מצופים אבץ/שמנים) ו-μ=0.14 (טווח עליון); הטבלה המקורית כוללת גם μ=0.08/0.12. חיבור דינמי/רוטט, חומרי דופן שונים, וסיכה שונה משנים את הערך בפועל — לחישוב מחייב יש לבצע את חישוב VDI 2230 המלא. חורי מעבר לפי ISO 273 סדרה בינונית.',
  sourceId: 'SRC-TBL-112',
  sourceNote:
    'Bossard "Preload and tightening torques" (מבוסס VDI 2230:2015) — הקובץ נקרא במלואו ישירות (PDF), טבלה עמ׳ 61-62 של המקור. ראו sources/verified/reference-tables.md',
  relatedChapter: 'ch01-bolts',
}
