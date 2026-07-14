import type { ReferenceTable } from '../../game/types.ts'

/**
 * Tap-drill diameters, ISO metric coarse threads M2–M20.
 * Verification (sources/verified/reference-tables.md):
 *  - 75% column cross-checked: AmesWeb ISO chart (SRC-TBL-106 chain) ≡ LittleMachineShop
 *    chart (SRC-TBL-306, PDF archived in sources/verified/docs/). Single disagreement —
 *    M12: 10.2 (AmesWeb, ISO practice, d−P formula) vs 10.3 (LMS shop chart); 10.2 chosen,
 *    variant documented.
 *  - 50% column from LittleMachineShop, corroborated by the standard engagement formula
 *    (drill ≈ d − 0.6495·P at 50%).
 */
export const tapDrillTable: ReferenceTable = {
  id: 'tap-drill-metric',
  codename: 'DATA-01 // TAP DRILL',
  title: 'קידוח קדם-הברגה — תבריג מטרי גס',
  standard: 'ISO 261 / ISO 2306',
  intro:
    'לפני שמבריגים — קודחים. הטבלה נותנת את קוטר המקדח לכל תבריג: אחיזה של ~75% לחומרים רכים, ~50% לחומרים קשים. כלל מהיר: קוטר ≈ קוטר נומינלי פחות פסיעה.',
  columns: [
    { label: 'תבריג', labelEn: 'Thread' },
    { label: 'פסיעה', labelEn: 'Pitch (mm)', numeric: true },
    { label: 'מקדח ~75% — אלומיניום/פליז/פלסטיק', labelEn: 'Drill Ø 75% (mm)', numeric: true },
    { label: 'מקדח ~50% — פלדה/פלב״מ', labelEn: 'Drill Ø 50% (mm)', numeric: true },
  ],
  rows: [
    ['M2', 0.4, 1.6, 1.75],
    ['M2.5', 0.45, 2.05, 2.2],
    ['M3', 0.5, 2.5, 2.7],
    ['M4', 0.7, 3.3, 3.5],
    ['M5', 0.8, 4.2, 4.5],
    ['M6', 1.0, 5.0, 5.4],
    ['M8', 1.25, 6.8, 7.2],
    ['M10', 1.5, 8.5, 9.0],
    ['M12', 1.75, 10.2, 10.9],
    ['M16', 2.0, 14.0, 14.75],
    ['M20', 2.5, 17.5, 18.5],
  ],
  caveat:
    'אחוז האחיזה נבחר לפי חוזק החומר: 75% לרכים, 50% לקשים — אחיזה גבוהה מדי בפלדה שוברת ברזים. ל-M12 יש גם גרסת 10.25/10.3 בטבלאות בתי-מלאכה — שתיהן בטווח תקין. תבריג עדין (fine) דורש טבלה נפרדת.',
  sourceId: 'SRC-TBL-306',
  sourceNote:
    'הוצלב בין שני מקורות בלתי-תלויים (AmesWeb ISO 68-1 + LittleMachineShop) ואומת מול נוסחת האחיזה. ראו sources/verified/reference-tables.md',
  unlockedBy: 'ch01-bolts',
}
