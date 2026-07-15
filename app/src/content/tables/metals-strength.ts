import type { ReferenceTable } from '../../game/types.ts'

/**
 * Mechanical properties of common structural metals — steels and aluminium
 * alloys. Every row read directly from a named manufacturer/distributor
 * datasheet (WebFetch fails on most of these FlateDecode PDFs; Read succeeds).
 * Sources: Ovako (S355), ThyssenKrupp (S235JR), MW Components/Elgin (1045,
 * 4140, 304, 316, 5052-H32), eco-alum (6061-T6), Gabrian (7075-T6),
 * Aalco (6082-T6).
 */
export const metalsStrengthTable: ReferenceTable = {
  id: 'metals-strength',
  codename: 'DATA-09 // METALS',
  title: 'חוזק מתכות נפוצות',
  category: 'חומרים',
  standard: 'datasheets יצרן (EN 10025 / SAE / AA)',
  intro:
    'לפני שבוחרים חומר — יודעים מה הוא נותן. פלדות מבניות זולות וקלות לריתוך; פלדות סגסוגת (4140) חזקות משמעותית; אלומיניום קליל אך חלש יותר; פלב"מ לעמידות קורוזיה. הערכים כאן טיפוסיים למצב עיבוד ספציפי — יש לציין אותו.',
  columns: [
    { label: 'חומר', labelEn: 'Material' },
    { label: 'מצב עיבוד', labelEn: 'Condition' },
    { label: 'כניעה', labelEn: 'Yield (MPa)', numeric: true },
    { label: 'קריעה (UTS)', labelEn: 'Tensile (MPa)', numeric: true },
    { label: 'מודול E', labelEn: 'E (GPa)', numeric: true },
    { label: 'צפיפות', labelEn: 'Density (kg/m³)', numeric: true },
    { label: 'התארכות', labelEn: 'Elong. (%)', numeric: true },
  ],
  rows: [
    ['S235JR', 'חם-מגולגל, ≤16mm', 235, 360, 210, 7850, 26],
    ['S355JR', 'חם-מגולגל, <16mm', 355, 470, 210, 7800, 22],
    ['AISI 1045', 'משוך-קר', 530, 625, 206, 7850, 12],
    ['AISI 4140', 'מנורמל', 655, 1020, 205, 7850, 17.7],
    ['AISI 304', 'מוחשל (annealed)', 215, 505, 193, 8000, 70],
    ['AISI 316', 'מוחשל (annealed)', 240, 550, 193, 8000, 60],
    ['6061-T6', 'T6', 276, 310, 68.9, 2700, 12],
    ['7075-T6', 'T6', 503, 572, 71.7, 2810, 11],
    ['5052-H32', 'H32', 193, 228, 70.3, 2680, 12],
    ['6082-T6', 'T6, לוח 6-12.5mm', 255, 300, 70, 2700, 9],
  ],
  caveat:
    'ערכים תלויי-מצב-עיבוד באופן קריטי — אותו חומר במצב אחר (חם-מגולגל מול מנורמל, O מול T6) נותן ערכים שונים לגמרי. 6082-T6 תלוי גם בעובי (כאן לוח 6-12.5 מ"מ; לוחות עבים יותר חלשים מעט). לתכן מחייב — datasheet ספציפי לגריד/מצב/גודל, לא הטבלה הזו. אלומיניום נטול גבול כניעה חד — Rp0.2 הוא הערך המקובל.',
  sourceId: 'SRC-TBL-113',
  sourceNote:
    'עשרה datasheets נפרדים נקראו במלואם ישירות (Read, MatWeb חוסם WebFetch/bot לגמרי): Ovako, ThyssenKrupp, MW Components/Elgin (×5), eco-alum, Gabrian, Aalco. ראו sources/verified/reference-tables.md',
  relatedChapter: 'ch05-cnc',
}
