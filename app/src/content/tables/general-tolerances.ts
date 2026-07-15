import type { ReferenceTable } from '../../game/types.ts'

/**
 * ISO 2768-1 general (un-toleranced) tolerances — linear dimensions.
 * Source: RivCut ISO 2768 tolerance chart (SRC-TBL-122), corroborated by
 * ChansMachining (SRC-TBL-119) — two independent B-grade reproductions;
 * values match well-known published ISO 2768-1 figures.
 */
export const generalTolerancesTable: ReferenceTable = {
  id: 'general-tolerances-iso2768',
  codename: 'DATA-08 // GEN TOL',
  title: 'סבילויות כלליות — ISO 2768-1',
  category: 'סבילויות והתאמות',
  standard: 'ISO 2768-1',
  intro:
    'כשאין טולרנס מפורש ליד מידה בשרטוט — זו הסבילות שחלה, לפי הכיתוב הכללי בכותרת (למשל "ISO 2768-mK"). ברירת המחדל בתעשייה היא m (בינוני); f משמש לחלקים מדויקים, c/v לגס.',
  columns: [
    { label: 'טווח מידה (מ״מ)', labelEn: 'Range (mm)' },
    { label: 'f — עדין', labelEn: 'f — fine (±mm)', numeric: true },
    { label: 'm — בינוני', labelEn: 'm — medium (±mm)', numeric: true },
    { label: 'c — גס', labelEn: 'c — coarse (±mm)', numeric: true },
    { label: 'v — גס מאוד', labelEn: 'v — very coarse (±mm)', numeric: true },
  ],
  rows: [
    ['0.5–3', 0.05, 0.1, 0.2, '—'],
    ['3–6', 0.05, 0.1, 0.3, 0.5],
    ['6–30', 0.1, 0.2, 0.5, 1.0],
    ['30–120', 0.15, 0.3, 0.8, 1.5],
    ['120–400', 0.2, 0.5, 1.2, 2.5],
    ['400–1000', 0.3, 0.8, 2.0, 4.0],
    ['1000–2000', 0.5, 1.2, 3.0, 6.0],
    ['2000–4000', '—', 2.0, 4.0, 8.0],
  ],
  caveat:
    'תקף למידות ליניאריות בלבד — לזוויתי יש טבלה נפרדת (ISO 2768-1), ולסבילות גאומטריות (יושר/מישוריות/ניצבות) יש טבלה נפרדת לגמרי (ISO 2768-2, לפי מחלקות H/K/L). "אין ציון טולרנס" לא אומר "לא משנה" — זה אומר "הטולרנס הזה חל". מתחת ל-0.5 מ"מ ומעל 4000 מ"מ אין כיסוי בתקן — נדרש טולרנס מפורש.',
  sourceId: 'SRC-TBL-122',
  sourceNote:
    'RivCut, אומת ב-WebFetch מול ChansMachining (SRC-TBL-119) — שני מקורות B בלתי-תלויים, ערכים תואמים ומוכרים כערכי ISO 2768-1 הסטנדרטיים. ראו sources/verified/reference-tables.md',
  relatedChapter: 'ch02-drawings',
}
