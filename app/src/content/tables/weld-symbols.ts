import type { ReferenceTable } from '../../game/types.ts'

/**
 * Basic weld symbol reference — shape and typical joint application.
 * Governing standard (AWS A2.4) is paywalled; values here are as described
 * by an attributed secondary source (SRC-TBL-214-equiv, steelcalculator.app)
 * that explicitly cites AWS A2.4 / ISO 2553 throughout.
 */
export const weldSymbolsTable: ReferenceTable = {
  id: 'weld-symbols',
  codename: 'DATA-16 // WELD SYM',
  title: 'סמלי ריתוך בשרטוט',
  category: 'ריתוך',
  standard: 'AWS A2.4 / ISO 2553',
  intro:
    'הסמל היושב על קו הייחוס אומר איזה סוג ריתוך, ומאיזה צד. משולש = פינתי (הכי נפוץ במבנים), V/בליטה/U/J = תפרי חריץ לחיבורי חבור מלא.',
  columns: [
    { label: 'סמל', labelEn: 'Symbol' },
    { label: 'צורה', labelEn: 'Shape' },
    { label: 'שימוש אופייני', labelEn: 'Typical use' },
  ],
  rows: [
    ['פינתי (Fillet)', 'משולש ישר-זווית', 'ריתוך המבנה הנפוץ ביותר — חיבורי T, הלחמה, זוויתן לקורה'],
    ['חריץ מרובע', 'שני קווים מקבילים', 'חיבורי חבור בפח דק, עם פס גיבוי'],
    ['חריץ V בודד', 'צורת V', 'חיבורי חבור בלוחות, ריתוך חבור מלא (CJP)'],
    ['חריץ בליטה (bevel)', 'קו נטוי (חצי-V)', 'חיבורי פינה וחיבורי T עם קצה משופע'],
    ['חריץ U בודד', 'צורת U', 'חיבורי חבור בלוחות עבים — חוסך חומר ריתוך'],
    ['חריץ J בודד', 'צורת J', 'חיבורי T בחתכים עבים'],
    ['Flare V', 'V מעוגל (שני משטחים מעוגלים)', 'חיבורי T בפינות מעוגלות של פרופיל חלול (HSS)'],
    ['Flare bevel', 'בליטה מעוגלת', 'חיבור דופן HSS ללוח'],
    ['Plug', 'חריץ מלבני', 'מילוי חור גישה בלוחות חופפים'],
    ['Spot (נקודה)', 'עיגול מלא', 'ריתוך התנגדות בפח דק, חיבור סיפון-לקורה'],
    ['Seam (תפר רציף)', 'עיגול עם קווי משיק', 'ריתוך התנגדות רציף בפח דק'],
    ['Surfacing (ציפוי)', 'קווים מעוגלים מקבילים', 'בניית שכבת ריתוך לשחיקה או שחזור'],
  ],
  caveat:
    'התקן המחייב (AWS A2.4) בתשלום — הטבלה כאן מבוססת על מקור משני מיוחס שמצטט AWS A2.4/ISO 2553 במפורש, לא נקראה מהתקן עצמו. צד הסמל ביחס לקו הייחוס (מעל/מתחת) קובע צד-חץ מול צד-אחר — פרט קריטי שאינו מתועד בטבלה זו. גודל התפר נכתב משמאל לסמל, האורך מימין.',
  sourceId: 'SRC-TBL-214',
  sourceNote:
    'steelcalculator.app — מצטט AWS A2.4 / ISO 2553 במפורש; מקור משני (דירוג B), התקן המחייב לא נקרא ישירות. ראו sources/verified/reference-tables.md',
  relatedChapter: 'ch11-welding',
}
