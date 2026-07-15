import type { ReferenceTable } from '../../game/types.ts'

/**
 * Minimum sheet-metal bend radius, as a multiple of thickness (T), by
 * material/temper and grain direction. Source: RivCut bend-radius chart
 * (SRC-TBL-211), fetched and verified to contain the full with-grain /
 * across-grain breakdown per material and thickness band.
 */
export const bendRadiusTable: ReferenceTable = {
  id: 'bend-radius',
  codename: 'DATA-11 // BEND R',
  title: 'רדיוס כיפוף מינימלי לפח',
  category: 'ייצור ותהליכים',
  standard: 'DFM — נתוני יצרן (RivCut)',
  intro:
    'כיפוף חד מדי סודק את הפח בצד החיצוני. הרדיוס המינימלי נמדד כמכפלה של עובי (T) ותלוי בחומר, במצב-עיבוד, ובכיוון הכיפוף ביחס לכיוון הגלגול (grain) — כיפוף "עם הסיב" תמיד דורש רדיוס גדול יותר.',
  columns: [
    { label: 'חומר', labelEn: 'Material' },
    { label: 'טווח עובי', labelEn: 'Thickness' },
    { label: 'עם הסיב (גרוע)', labelEn: 'With grain (worst)', numeric: true },
    { label: 'נגד הסיב (טוב)', labelEn: 'Across grain (best)', numeric: true },
  ],
  rows: [
    ['אלומיניום 5052-H32', '0.02–0.063″', '1×T', '0.5–1×T'],
    ['אלומיניום 5052-H32', '0.09–0.125″', '1.5×T', '1×T'],
    ['אלומיניום 6061-T6', '0.032–0.063″', '3–4×T', '2–3×T'],
    ['אלומיניום 6061-T6', '0.09–0.19″', '5–6×T', '3–5×T'],
    ['פלדה רכה 1018 CR', '0.03–0.075″', '0.5–1×T', '0.5×T'],
    ['פלדה רכה 1018 CR', '0.105–0.135″', '1–1.5×T', '1×T'],
    ['פלב"מ 304 (מוחשל)', '0.03–0.075″', '1–1.5×T', '0.5–1×T'],
    ['פלב"מ 304 (מוחשל)', '0.105–0.135″', '1.5–2×T', '1–1.5×T'],
  ],
  caveat:
    'רדיוס קטן מהמינימלי לא בהכרח שובר מיד — אבל מגדיל משמעותית סיכון לסדק, במיוחד ב-6061-T6 שרגיש הרבה יותר מ-5052 (אלומיניום מחוסם חוזק = פחות גמיש). כשכיוון הגלגול לא ידוע בשלב התכן — מתכננים לפי "עם הסיב" (הערך הגרוע, הבטוח). לעובי שאינו בטבלה — אינטרפולציה זהירה, לא אקסטרפולציה.',
  sourceId: 'SRC-TBL-211',
  sourceNote:
    'RivCut bend-radius chart — אומת שמכיל את הפירוט המלא (עם-סיב/נגד-סיב) לכל חומר וטווח עובי. ראו sources/verified/reference-tables.md',
  relatedChapter: 'ch09-laser',
}
