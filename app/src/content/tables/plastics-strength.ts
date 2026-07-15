import type { ReferenceTable } from '../../game/types.ts'

/**
 * Mechanical properties of common engineering plastics.
 * Source: Professional Plastics "Mechanical Properties of Plastic Materials"
 * (SRC-TBL-302; PDF read in full and archived:
 * sources/verified/docs/professional-plastics-mechanical-properties.pdf).
 * Values are ranges — grade-dependent; single source, so the table keeps the
 * publisher's ranges verbatim rather than committing to point values.
 */
export const plasticsStrengthTable: ReferenceTable = {
  id: 'plastics-strength',
  codename: 'DATA-14 // PLASTICS',
  title: 'חוזק פלסטיקה הנדסית',
  category: 'חומרים',
  standard: 'datasheet יצרן (ASTM)',
  intro:
    'פלסטיקה נבחרת לפי שילוב: חוזק, קשיחות (מודול), עמידות הולם ומחיר. הטווחים רחבים כי כל grade שונה — לתכן מחייב פותחים datasheet של החומר הספציפי.',
  columns: [
    { label: 'פולימר', labelEn: 'Polymer' },
    { label: 'חוזק מתיחה', labelEn: 'Tensile (MPa)', numeric: true },
    { label: 'מודול מתיחה', labelEn: 'Modulus (GPa)', numeric: true },
    { label: 'התארכות בשבר', labelEn: 'Elong. (%)', numeric: true },
    { label: 'קשיות', labelEn: 'Hardness', numeric: true },
    { label: 'הולם Izod', labelEn: 'Izod (J/m)', numeric: true },
  ],
  rows: [
    ['ABS', '41–45', '2.1–2.4', '45', 'R100–110', '200–400'],
    ['PC', '55–75', '2.3–2.4', '100–150', 'M70', '600–850'],
    ['POM-C (Acetal)', '60–70', '2.3–2.8', '15–40', 'M80', '70–80'],
    ['POM-H (Delrin)', '70', '2.9–3.1', '40–75', 'M94', '75–130'],
    ['PA6 (Nylon)', '78', '2.6–3.0', '—', 'M82', '30–250'],
    ['PA66 (Nylon)', '82', '3.3', '—', 'M89', '40–110'],
    ['PEEK', '70–100', '3.7–4.0', '50', 'M99', '85'],
    ['PP', '25–40', '0.9–1.5', '150–300', 'R80–100', '20–100'],
    ['PTFE (Teflon)', '10–40', '0.3–0.8', '400', 'Shore D50–55', '160'],
    ['UHMW-PE', '20–40', '0.2–1.2', '500', 'R50–70', 'ללא שבר'],
  ],
  caveat:
    'טווחים כלליים ממקור יחיד (מפיץ) — לא ערכי תכן! ניילון (PA) סופג מים ומאבד חוזק וקשיחות; פלסטיקה זוחלת תחת עומס קבוע (creep) ורגישה לטמפרטורה הרבה לפני ההיתוך (HDT חסר כאן — להשלים מ-datasheet). לתכן מחייב: datasheet של ה-grade הספציפי בלבד.',
  sourceId: 'SRC-TBL-302',
  sourceNote:
    'Professional Plastics — הטבלה נקראה במלואה והקובץ שמור ב-sources/verified/docs. מקור יחיד (דירוג B) — טווחים בלבד, ראו caveat. השלמת HDT: MatWeb (SRC-TBL-303)',
  relatedChapter: 'ch10-printing',
}
