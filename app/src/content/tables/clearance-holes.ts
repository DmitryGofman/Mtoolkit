import type { ReferenceTable } from '../../game/types.ts'

/**
 * Clearance (through) hole diameters, ISO 273:1979 — read directly from the
 * standard's official 2-page preview (archived: sources/verified/docs/
 * iso-273-1979-official-preview.pdf). Grade A verification; AmesWeb (SRC-TBL-124)
 * and Zhonghuan (SRC-TBL-108) corroborate, except Zhonghuan's M16 coarse (18.0)
 * which the standard contradicts (18.5). Evidence: sources/verified/reference-tables.md
 */
export const clearanceHolesTable: ReferenceTable = {
  id: 'clearance-holes-metric',
  codename: 'DATA-02 // CLEARANCE',
  title: 'חורי מעבר לברגים — ISO 273',
  standard: 'ISO 273:1979',
  intro:
    'הבורג לא מתברג לתוך חור מעבר — הוא עובר דרכו. שלוש סדרות: עדינה (מיקום מדויק), בינונית (ברירת המחדל), גסה (טולרנס הרכבה נדיב).',
  columns: [
    { label: 'תבריג', labelEn: 'Thread' },
    { label: 'עדין (H12)', labelEn: 'Fine (mm)', numeric: true },
    { label: 'בינוני (H13) — ברירת מחדל', labelEn: 'Medium (mm)', numeric: true },
    { label: 'גס (H14)', labelEn: 'Coarse (mm)', numeric: true },
  ],
  rows: [
    ['M2', 2.2, 2.4, 2.6],
    ['M2.5', 2.7, 2.9, 3.1],
    ['M3', 3.2, 3.4, 3.6],
    ['M4', 4.3, 4.5, 4.8],
    ['M5', 5.3, 5.5, 5.8],
    ['M6', 6.4, 6.6, 7.0],
    ['M8', 8.4, 9.0, 10.0],
    ['M10', 10.5, 11.0, 12.0],
    ['M12', 13.0, 13.5, 14.5],
    ['M16', 17.0, 17.5, 18.5],
    ['M20', 21.0, 22.0, 24.0],
    ['M24', 25.0, 26.0, 28.0],
  ],
  caveat:
    'ערכים לשימוש כללי (ISO 273) — יישום מיוחד (פילוס, מיקום מדויק, ברגי התאמה) נקבע לפי דרישות התכן, לא לפי הטבלה. שדות הטולרנס: עדין H12, בינוני H13, גס H14. מומלץ קיטום (chamfer) כשקצה החור עלול לפגוש את רדיוס מתחת לראש הבורג.',
  sourceId: 'SRC-TBL-107',
  sourceNote:
    'נקרא ישירות מהתקן ISO 273:1979 (תצוגה רשמית מלאה, הקובץ שמור ב-sources/verified/docs). דירוג A. ראו sources/verified/reference-tables.md',
  unlockedBy: 'ch01-bolts',
}
