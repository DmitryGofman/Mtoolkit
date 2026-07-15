import type { ReferenceTable } from '../../game/types.ts'

/**
 * Preferred hole-basis fits (ISO 286-2) — type, use, and a worked numeric
 * example at the 10-18mm range. Source: ChansMachining chart (SRC-TBL-119),
 * read directly in full — same document as the IT-grade table, contains the
 * complete shaft/hole fundamental-deviation matrices.
 */
export const preferredFitsTable: ReferenceTable = {
  id: 'preferred-fits',
  codename: 'DATA-07 // FITS',
  title: 'התאמות מועדפות חור-ציר (H7/xx)',
  category: 'סבילויות והתאמות',
  standard: 'ISO 286-2',
  intro:
    'שיטת "חור-בסיס": החור תמיד H (סטייה תחתונה 0), והציר קובע את סוג ההתאמה. ערכי הדוגמה כאן לטווח 10–18 מ״מ — לכל טווח מידה אחר יש לחשב מחדש מטבלת ה-IT (DATA-06) ומטבלת סטיות היסוד.',
  columns: [
    { label: 'התאמה', labelEn: 'Fit' },
    { label: 'סוג', labelEn: 'Type' },
    { label: 'שימוש', labelEn: 'Typical use' },
    { label: 'חור H7 (µm)', labelEn: 'Hole H7 (µm)' },
    { label: 'ציר (µm) — ל-10–18mm', labelEn: 'Shaft (µm) @10–18mm' },
  ],
  rows: [
    ['H7/g6', 'מדזק (clearance)', 'הזזה/סיבוב עם מיקום מדויק', '0 / +18', '−6 / −17'],
    ['H7/h6', 'מדזק', 'הרכבה ביד, מיקום ללא הידוק', '0 / +18', '0 / −11'],
    ['H7/k6', 'מעברי (transition)', 'מיקום מדויק, פירוק אפשרי', '0 / +18', '+12 / +1'],
    ['H7/n6', 'מעברי — צמוד', 'מיקום קשיח, כמעט ללא משחק', '0 / +18', '+23 / +12'],
    ['H7/p6', 'הדוק (interference)', 'צמידות קבועה, ללא כלים מיוחדים', '0 / +18', '+29 / +18'],
    ['H7/s6', 'הדוק בינוני', 'הרכבת-כיווץ לחתכים קלים', '0 / +18', '+39 / +28'],
  ],
  caveat:
    'ערכי הציר בעמודה האחרונה תקפים רק לטווח 10–18 מ״מ — בכל טווח מידה אחר הערכים משתנים (ראו סטיות היסוד המלאות לפי אות ב-ISO 286-2). H11/c11 (התאמה רופפת ליציקה/פח) אינה מופיעה כמטריצה מספרית בטבלה זו — משתמשת בסדרת התאמה שונה (c לעומת ה-d9/e8 שכן מופיעים).',
  sourceId: 'SRC-TBL-119',
  sourceNote:
    'ChansMachining — נקרא במלואו ישירות (Read), אותו מסמך כמו טבלת ה-IT; מכיל מטריצות סטיות-יסוד מלאות לחור ולציר. ראו sources/verified/reference-tables.md',
  relatedChapter: 'ch02-drawings',
}
