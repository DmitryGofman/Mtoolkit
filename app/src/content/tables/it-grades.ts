import type { ReferenceTable } from '../../game/types.ts'

/**
 * IT (International Tolerance) grade values — ISO 286-1 fundamental
 * tolerances matrix. Source: ChansMachining chart (SRC-TBL-119), read
 * directly in full; spot-checked against Machining Doctor (SRC-TBL-127,
 * IT7/3-6mm=12µm matched exactly).
 */
export const itGradesTable: ReferenceTable = {
  id: 'it-grades',
  codename: 'DATA-06 // IT GRADES',
  title: 'דרגות סבילות IT',
  category: 'סבילויות והתאמות',
  standard: 'ISO 286-1',
  intro:
    'המספר שאחרי אות ההתאמה (H7, g6...) הוא דרגת IT — כמות הטולרנס במיקרון, קבועה לכל טווח מידה ללא קשר לאות. IT5-IT7 לדיוק גבוה (מיסבים, התאמות), IT9-IT11 לסבילות ייצור רגילה.',
  columns: [
    { label: 'טווח מידה (מ״מ)', labelEn: 'Range (mm)' },
    { label: 'IT5', labelEn: 'IT5 (µm)', numeric: true },
    { label: 'IT6', labelEn: 'IT6 (µm)', numeric: true },
    { label: 'IT7', labelEn: 'IT7 (µm)', numeric: true },
    { label: 'IT8', labelEn: 'IT8 (µm)', numeric: true },
    { label: 'IT9', labelEn: 'IT9 (µm)', numeric: true },
    { label: 'IT10', labelEn: 'IT10 (µm)', numeric: true },
    { label: 'IT11', labelEn: 'IT11 (µm)', numeric: true },
  ],
  rows: [
    ['0–3', 4, 6, 10, 14, 25, 40, 60],
    ['3–6', 5, 8, 12, 18, 30, 48, 75],
    ['6–10', 6, 9, 15, 22, 36, 58, 90],
    ['10–18', 8, 11, 18, 27, 43, 70, 110],
    ['18–30', 9, 13, 21, 33, 52, 84, 130],
    ['30–50', 11, 16, 25, 39, 62, 100, 160],
    ['50–80', 13, 19, 30, 46, 74, 120, 190],
    ['80–120', 15, 22, 35, 54, 87, 140, 220],
  ],
  caveat:
    'הערך הוא רוחב הסבילות בלבד (µm) — לא הסטייה מהמידה הנומינלית. למיקום הסבילות (מעל/מתחת/סביב המידה) יש טבלה נפרדת של סטיות יסוד לפי אות (h,g,k,p,s...) — ראו DATA-07. IT01–IT4 (דיוק קיצוני, מטרולוגיה) ו-IT12 ומעלה (יציקה/חיתוך גס) לא מוצגים כאן.',
  sourceId: 'SRC-TBL-119',
  sourceNote:
    'ChansMachining — נקרא במלואו ישירות (Read); אומת מול Machining Doctor (SRC-TBL-127) בנקודה אחת (IT7/3-6mm=12µm, התאמה מדויקת). ראו sources/verified/reference-tables.md',
  relatedChapter: 'ch02-drawings',
}
