import type { ReferenceTable } from '../../game/types.ts'

/**
 * Surface roughness: Ra ↔ N-grade ↔ µin, with the typical process per grade.
 * Sources: PREMSA Industries chart (SRC-TBL-301, fetched twice — full N1–N10
 * table extracted and re-verified), corroborated by the canonical ISO 1302
 * doubling series (0.025 → 12.5 µm; µin = classic AA values 1→500).
 */
export const surfaceFinishTable: ReferenceTable = {
  id: 'surface-finish-ra',
  codename: 'DATA-10 // SURFACE',
  title: 'גימור פנים — Ra / N-grade',
  category: 'גימור ומדידה',
  standard: 'ISO 1302:2002 / ISO 4287',
  intro:
    'המספר שליד סימן ה-✓ בשרטוט. כל דרגת N מכפילה את החספוס: N8 (Ra 3.2) הוא ברירת המחדל של כרסום; מתחת ל-N6 המחיר מטפס מהר — כל דרגה מוסיפה פעולת גימור.',
  columns: [
    { label: 'דרגה', labelEn: 'N-grade' },
    { label: 'Ra מיקרומטר', labelEn: 'Ra (µm)', numeric: true },
    { label: 'Ra מיקרואינץ׳', labelEn: 'Ra (µin)', numeric: true },
    { label: 'תהליך אופייני', labelEn: 'Typical process' },
    { label: 'שימוש אופייני', labelEn: 'Typical use' },
  ],
  rows: [
    ['N1', 0.025, 1, 'Superfinish', 'אבני מידה, משטחי מטרולוגיה'],
    ['N2', 0.05, 2, 'Lapping', 'אטמים מדויקים, מושבי שסתום'],
    ['N3', 0.1, 4, 'ליטוש עדין', 'בוכנות הידראוליות, מוטות'],
    ['N4', 0.2, 8, 'ליטוש עגול', 'פיני גל ארכובה, פרופילי זיזים'],
    ['N5', 0.4, 16, 'Honing / מעבר גימור', 'קוטרי אטימה, חריצי O-ring'],
    ['N6', 0.8, 32, 'כרסום/חריטה עדינים, ליטוש שטוח', 'משטחי כיוון, צירי מיסבים'],
    ['N7', 1.6, 63, 'כרסום/חריטה CNC סטנדרטיים', 'משטחים מעובדים, צירים'],
    ['N8', 3.2, 125, 'כרסום רגיל (ברירת מחדל)', 'תושבות, בתים, מכסים'],
    ['N9', 6.3, 250, 'כרסום/חריטה גסים', 'יציקות בעיבוד מקדים'],
    ['N10', 12.5, 500, 'הורדת חומר גסה', 'הסרת בולק, roughing'],
  ],
  caveat:
    'סימוני N-grade הם לפי ISO 1302:2002 — התקן הוחלף ב-ISO 21920:2021 (הסימון Ra נשאר, ה-N פחות בשימוש בשרטוטים חדשים; עדיין נפוץ בשרטוטים קיימים). N11 (Ra 25) ו-N12 (Ra 50) קיימים לתהליכים גסים במיוחד (יציקת חול, חיתוך להבה). Ra ממוצע אריתמטי — אינו מספר את כל הסיפור (Rz לעומקי שריטה).',
  sourceId: 'SRC-TBL-301',
  sourceNote:
    'PREMSA Industries (מצטט ISO 1302:2002/ISO 4287) — הטבלה חולצה פעמיים בשליפות נפרדות ואומתה מול סדרת ההכפלה הקנונית של דרגות ה-N. ראו sources/verified/reference-tables.md',
  unlockedBy: 'ch16-metrology',
}
