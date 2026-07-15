import type { ReferenceTable } from '../../game/types.ts'

/**
 * Clearance (through) hole sizes for UNC/UNF bolts, close and free fit.
 * Same source pair as the imperial tap-drill table: AmesWeb x
 * LittleMachineShop (SRC-TBL-306), matched exactly across all 12 sizes.
 * Clearance depends only on the nominal (major) diameter, not the thread
 * series — one row per size, valid for both UNC and UNF.
 */
export const clearanceHolesImperialTable: ReferenceTable = {
  id: 'clearance-holes-imperial',
  codename: 'DATA-02B // CLEARANCE (IN)',
  title: 'חורי מעבר לברגים אינצ׳יים — UNC/UNF',
  category: 'ברגים והברגות',
  standard: 'מקובל בתעשיית ה-machine shop (ASME)',
  intro:
    'זהה לקוטר הנומינלי, לא תלוי אם הבורג UNC או UNF — שני הסדרות של אותה מידה חולקות אותו חור מעבר.',
  columns: [
    { label: 'תבריג', labelEn: 'Nominal size' },
    { label: 'צמוד (Close)', labelEn: 'Close fit' },
    { label: 'חופשי (Free)', labelEn: 'Free fit' },
  ],
  rows: [
    ['#4', '#32 (.116")', '#30 (.1285")'],
    ['#6', '#27 (.144")', '#25 (.1495")'],
    ['#8', '#18 (.1695")', '#16 (.177")'],
    ['#10', '#9 (.196")', '#7 (.201")'],
    ['#12', '#2 (.221")', '#1 (.228")'],
    ['1/4"', 'F (.257")', 'H (.266")'],
    ['5/16"', 'P (.323")', 'Q (.332")'],
    ['3/8"', 'W (.386")', 'X (.397")'],
    ['7/16"', '29/64" (.4531")', '15/32" (.4688")'],
    ['1/2"', '33/64" (.5156")', '17/32" (.5312")'],
    ['5/8"', '41/64" (.6406")', '21/32" (.6562")'],
    ['3/4"', '49/64" (.7656")', '25/32" (.7812")'],
  ],
  caveat:
    'כמו בטבלה המטרית — "close" לדיוק הרכבה גבוה, "free" לטולרנס הרכבה נדיב. יישום מיוחד (פילוס, ברגי התאמה) נקבע לפי דרישות התכן. סימוני מקדח מספר/אות/שבר — לוודא זמינות המקדח לפני תכנון סדרת ייצור.',
  sourceId: 'SRC-TBL-306',
  sourceNote:
    'הוצלב במלואו מול AmesWeb; שני המקורות תואמים בכל 12 המידות. ראו sources/verified/reference-tables.md',
  relatedChapter: 'ch01-bolts',
}
