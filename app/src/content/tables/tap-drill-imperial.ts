import type { ReferenceTable } from '../../game/types.ts'

/**
 * UNC/UNF tap drill sizes (inch/number/letter drills), 75% and 50% engagement.
 * Verified by full cross-check between two independent sources: AmesWeb
 * (ASME B1.1-based calculator) and LittleMachineShop "Tap & Clearance Drill
 * Sizes" chart (SRC-TBL-306, already archived — same PDF used for the metric
 * tap-drill table). All 12 sizes matched exactly between both sources.
 */
export const tapDrillImperialTable: ReferenceTable = {
  id: 'tap-drill-imperial',
  codename: 'DATA-05B // TAP DRILL (IN)',
  title: 'קידוח קדם-הברגה — תבריג אינצ׳י UNC/UNF',
  category: 'ברגים והברגות',
  standard: 'ASME B1.1',
  intro:
    'התקן האמריקאי: UNC (coarse) ו-UNF (fine) לאותו קוטר נומינלי — שני ברזים שונים לגמרי, לא להחליף ביניהם. מספרי מקדח (#) קטנים יותר = קוטר גדול יותר.',
  columns: [
    { label: 'תבריג', labelEn: 'Thread' },
    { label: 'סדרה', labelEn: 'Series' },
    { label: 'TPI', labelEn: 'TPI', numeric: true },
    { label: 'מקדח ~75%', labelEn: 'Drill 75%' },
    { label: 'מקדח ~50%', labelEn: 'Drill 50%' },
  ],
  rows: [
    ['#4', 'UNC', 40, '#43 (.089")', '#41 (.096")'],
    ['#4', 'UNF', 48, '#42 (.0935")', '#40 (.098")'],
    ['#6', 'UNC', 32, '#36 (.1065")', '#32 (.116")'],
    ['#6', 'UNF', 40, '#33 (.113")', '#31 (.12")'],
    ['#8', 'UNC', 32, '#29 (.136")', '#27 (.144")'],
    ['#8', 'UNF', 36, '#29 (.136")', '#26 (.147")'],
    ['#10', 'UNC', 24, '#25 (.1495")', '#20 (.161")'],
    ['#10', 'UNF', 32, '#21 (.159")', '#18 (.1695")'],
    ['#12', 'UNC', 24, '#16 (.177")', '#12 (.189")'],
    ['#12', 'UNF', 28, '#14 (.182")', '#10 (.1935")'],
    ['1/4"', 'UNC', 20, '#7 (.201")', '7/32" (.2188")'],
    ['1/4"', 'UNF', 28, '#3 (.213")', '#1 (.228")'],
    ['5/16"', 'UNC', 18, 'F (.257")', 'J (.277")'],
    ['5/16"', 'UNF', 24, 'I (.272")', '9/32" (.2812")'],
    ['3/8"', 'UNC', 16, '5/16" (.3125")', 'Q (.332")'],
    ['3/8"', 'UNF', 24, 'Q (.332")', 'S (.348")'],
    ['7/16"', 'UNC', 14, 'U (.368")', '25/64" (.3906")'],
    ['7/16"', 'UNF', 20, '25/64" (.3906")', '13/32" (.4062")'],
    ['1/2"', 'UNC', 13, '27/64" (.4219")', '29/64" (.4531")'],
    ['1/2"', 'UNF', 20, '29/64" (.4531")', '15/32" (.4688")'],
    ['5/8"', 'UNC', 11, '17/32" (.5312")', '9/16" (.5625")'],
    ['5/8"', 'UNF', 18, '37/64" (.5781")', '19/32" (.5938")'],
    ['3/4"', 'UNC', 10, '21/32" (.6562")', '11/16" (.6875")'],
    ['3/4"', 'UNF', 16, '11/16" (.6875")', '45/64" (.7031")'],
  ],
  caveat:
    'כמו בטבלה המטרית: 75% אחיזה לחומרים רכים (אלומיניום/פליז/פלסטיק), 50% לחומרים קשים (פלדה/פלב״מ/יציקה). ל-#8: מקדח ה-75% זהה (#29) לשני הסדרות UNC-32 ו-UNF-36 — לא טעות, צירוף מקרים גיאומטרי בגודל הזה. סימוני מקדח מספר (#)/אות/שבר הם קונבנציה אמריקאית — אין להשתמש במקדח מטרי "הכי קרוב" בלי לבדוק את ההפרש.',
  sourceId: 'SRC-TBL-306',
  sourceNote:
    'הוצלב במלואו (כל 12 המידות) בין AmesWeb (ASME B1.1 calculator) ל-LittleMachineShop chart — התאמה מדויקת בכל השורות. ראו sources/verified/reference-tables.md',
  relatedChapter: 'ch01-bolts',
}
