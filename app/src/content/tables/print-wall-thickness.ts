import type { ReferenceTable } from '../../game/types.ts'

/**
 * Minimum wall thickness by 3D-printing process — supported vs. unsupported
 * (self-spanning) geometry. Source: Hubs/Protolabs Network DFM guide
 * (SRC-TBL-218), fetched and verified to contain the full comparison table.
 */
export const printWallThicknessTable: ReferenceTable = {
  id: 'print-wall-thickness',
  codename: 'DATA-13 // 3DP WALLS',
  title: 'עובי דופן מינימלי בהדפסת תלת-ממד',
  category: 'ייצור ותהליכים',
  standard: 'DFM — Hubs/Protolabs Network',
  intro:
    'דופן דקה מדי נשברת בהדפסה, בהסרה מהמדפסת, או בשימוש. "נתמך" = יש חומר תמיכה/שכבות מסביב; "לא נתמך" = פורש עצמאי (כמו קיר תלוי) ודורש עוד עובי.',
  columns: [
    { label: 'תהליך', labelEn: 'Process' },
    { label: 'נתמך', labelEn: 'Supported (mm)', numeric: true },
    { label: 'לא נתמך (פורש)', labelEn: 'Unsupported (mm)', numeric: true },
  ],
  rows: [
    ['FDM', 0.8, 0.8],
    ['SLA', 0.5, 1.0],
    ['SLS', 0.8, 1.0],
    ['MJF', 0.7, 1.0],
    ['DMLS (מתכת)', '0.4–0.8', '0.8–1.5'],
  ],
  caveat:
    'אלה הנחיות כלליות — התוצאה בפועל תלויה בגיאומטריית החלק, בחומר, ובעיבוד שלאחר ההדפסה. דופן 0.5 מ"מ יכולה לעבוד מצוין באזור קטן ומוגן ולהישבר בפריסה גדולה לא-נתמכת. ל-DMLS יש טווח משמעותי (תלוי חומר/מכונה) — לאמת מול ספק ספציפי לפני תכן קריטי.',
  sourceId: 'SRC-TBL-218',
  sourceNote:
    'Hubs/Protolabs Network DFM guide — אומת ב-WebFetch שמכיל טבלת השוואה מלאה לכל 5 התהליכים. ראו sources/verified/reference-tables.md',
  relatedChapter: 'ch10-printing',
}
