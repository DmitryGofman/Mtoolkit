import type { ReferenceTable } from '../../game/types.ts'

/**
 * Bolt mechanical property classes per ISO 898-1.
 * Source: Fastenal "Mechanical Properties Per ISO 898-1" (SRC-TBL-110),
 * PDF read directly in full (WebFetch fails on this FlateDecode PDF).
 */
export const propertyClassesTable: ReferenceTable = {
  id: 'property-classes',
  codename: 'DATA-04 // GRADES',
  title: 'מחלקות חוזק לברגים — ISO 898-1',
  category: 'ברגים והברגות',
  standard: 'ISO 898-1',
  intro:
    'המספר החרוט על ראש הבורג (למשל 8.8) הוא לא שרירותי: הראשון = 1/100 מחוזק הקריעה (MPa), השני = פי 10 מיחס הכניעה/קריעה. ככל שהמספרים גבוהים יותר — חוזק גבוה יותר אך גם שביר יותר.',
  columns: [
    { label: 'מחלקה', labelEn: 'Class' },
    { label: 'טווח מידה', labelEn: 'Size range' },
    { label: 'חוזק הוכחה מינ׳', labelEn: 'Proof strength (MPa)', numeric: true },
    { label: 'חוזק קריעה מינ׳', labelEn: 'Tensile Rm (MPa)', numeric: true },
    { label: 'כניעה מינ׳', labelEn: 'Yield Rp0.2 (MPa)', numeric: true },
    { label: 'קשיות ליבה', labelEn: 'Core hardness (HRC)' },
    { label: 'חומר', labelEn: 'Material' },
  ],
  rows: [
    ['4.6', 'M5–M39', 225, 400, 240, 'B67–B99.5', 'פחמן רך/בינוני'],
    ['8.8', 'M5–M16', 580, 800, 640, 'C22–C32', 'פחמן בינוני, מחוסם ומותפל'],
    ['8.8', 'M18–M39', 600, 830, 660, 'C23–C34', 'פחמן בינוני, מחוסם ומותפל'],
    ['10.9', 'M5–M39', 830, 1040, 940, 'C32–C39', 'סגסוגת, מחוסמת ומותפלת'],
    ['12.9', 'M1.6–M39', 970, 1220, 1100, 'C39–C44', 'סגסוגת, מחוסמת ומותפלת'],
  ],
  caveat:
    'הטבלה מכסה 4.6/8.8/10.9/12.9 (מחלקות ה-"עבודה" הנפוצות) — לא כוללת 5.8/9.8 הפחות שכיחות. מחלקה 12.9 שבירה יחסית — לא מתאימה תמיד לעומס הלם/רעידה גבוהה; מחלקה 8.8 גמישה יותר. חוזק הוכחה (proof) הוא הערך הרלוונטי לחישובי preload/מומנט, לא חוזק הקריעה. אינה חלה על ברגי-מכוונות (set screws).',
  sourceId: 'SRC-TBL-110',
  sourceNote:
    'Fastenal "Mechanical Properties Per ISO 898-1" (Rev 3-6-09) — הקובץ נקרא במלואו ישירות (PDF). מקור B (ספק ברגים תעשייתי גדול, המסמך מוצג כטבלת ISO 898-1 רשמית). ראו sources/verified/reference-tables.md',
  relatedChapter: 'ch01-bolts',
}
