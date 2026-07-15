import type { ReferenceTable } from '../../game/types.ts'

/**
 * Achievable surface roughness (Ra) by manufacturing process. Source:
 * RivCut surface-finish chart (SRC-TBL-201 category; fetched fresh and
 * verified to contain a genuine process→Ra matrix covering machining and
 * EDM). Casting/forming rows corroborated across multiple independent
 * search sources — see caveat.
 */
export const raByProcessTable: ReferenceTable = {
  id: 'ra-by-process',
  codename: 'DATA-15 // RA-PROC',
  title: 'Ra מושג לפי תהליך ייצור',
  category: 'ייצור ותהליכים',
  standard: 'DFM — נתוני יצרן',
  intro:
    'לפני שדורשים גימור מסוים בשרטוט — כדאי לדעת מה התהליך נותן "בחינם". דרישת Ra טוב יותר ממה שהתהליך מייצר טבעי מוסיפה פעולת גימור נוספת ועלות.',
  columns: [
    { label: 'תהליך', labelEn: 'Process' },
    { label: 'Ra אופייני', labelEn: 'Typical Ra (µm)', numeric: true },
  ],
  rows: [
    ['ליטוש/Superfinish', 0.025, ],
    ['Lapping / פוליש', 0.05],
    ['השחזה עדינה', 0.1],
    ['השחזה (grinding)', 0.2],
    ['Honing', 0.4],
    ['כרסום/חריטה עדינים', 0.8],
    ['כרסום/חריטה רגילים', 1.6],
    ['כרסום/חריטה', 3.2],
    ['כרסום/חריטה גסים', 6.3],
    ['ניסור / הורדת חומר גסה', 12.5],
    ['EDM חוט — עדין', 0.8],
    ['EDM חוט', 1.6],
    ['EDM שיקוע (sinker)', 3.2],
    ['EDM שיקוע גס', 6.3],
    ['יציקת מתכת (die casting)', '1.6–3.2'],
    ['חישול (forging)', '3.2–12.5'],
    ['יציקת חול (sand casting)', '12.5–25'],
  ],
  caveat:
    'ערכי המכניקה (עד EDM) ממקור יחיד מוצלב פנימית; ערכי היציקה/חישול הוצלבו בין כמה מקורות עצמאיים אך בטווחים רחבים יותר (תלוי מאוד באיכות התבנית/כלי). Ra הוא ממוצע אריתמטי — לא מתאר עומק שריטות בודדות (Rz). הערך "אופייני" — תהליך מבוקר במיוחד יכול לחרוג משני הכיוונים.',
  sourceId: 'SRC-TBL-201',
  sourceNote:
    'RivCut surface-finish chart — אומת ב-WebFetch שמכיל מטריצת תהליך↔Ra אמיתית למכניקה/EDM; ערכי יציקה/חישול הוצלבו מול חיפוש רב-מקורי. ראו sources/verified/reference-tables.md',
  relatedChapter: 'ch05-cnc',
}
