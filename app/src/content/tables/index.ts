import type { ReferenceTable, PlannedTable } from '../../game/types.ts'
import { tapDrillTable } from './tap-drill.ts'
import { clearanceHolesTable } from './clearance-holes.ts'
import { plasticsStrengthTable } from './plastics-strength.ts'
import { surfaceFinishTable } from './surface-finish.ts'
import { weldFilletMinTable } from './weld-fillet-min.ts'

/**
 * The Datapad library — every verified reference table, in display order.
 * Add a table here only after its values are verified per
 * sources/verified/reference-tables.md (cross-checked or read from the standard).
 * Category/unlock assignments are provisional until the curriculum mapping pass.
 */
export const referenceTables: ReferenceTable[] = [
  tapDrillTable,
  clearanceHolesTable,
  plasticsStrengthTable,
  surfaceFinishTable,
  weldFilletMinTable,
]

export function tableById(id: string): ReferenceTable | undefined {
  return referenceTables.find((t) => t.id === id)
}

/** Datapad section order — categories not listed here sort last. */
export const tableCategories: string[] = [
  'ברגים והברגות',
  'סבילויות והתאמות',
  'חומרים',
  'גימור ומדידה',
  'ריתוך',
  'ייצור ותהליכים',
]

/**
 * The rest of the codex — cataloged in docs/practical-reference-tables-he.md,
 * sources scouted in sources/source-index.md, teased locked until verified.
 */
export const plannedTables: PlannedTable[] = [
  { codename: 'DATA-03 // TORQUE', title: 'מומנטי הידוק ו-preload', category: 'ברגים והברגות', standard: 'VDI 2230' },
  { codename: 'DATA-04 // GRADES', title: 'מחלקות חוזק לברגים', category: 'ברגים והברגות', standard: 'ISO 898-1' },
  { codename: 'DATA-05 // THREADS', title: 'תבריג מטרי — מידות יסוד', category: 'ברגים והברגות', standard: 'ISO 261 / 724' },
  { codename: 'DATA-06 // IT GRADES', title: 'דרגות סבילות IT', category: 'סבילויות והתאמות', standard: 'ISO 286-1' },
  { codename: 'DATA-07 // FITS', title: 'התאמות מועדפות חור-ציר', category: 'סבילויות והתאמות', standard: 'ISO 286-2' },
  { codename: 'DATA-08 // GEN TOL', title: 'סבילויות כלליות', category: 'סבילויות והתאמות', standard: 'ISO 2768' },
  { codename: 'DATA-09 // METALS', title: 'חוזק מתכות נפוצות', category: 'חומרים', standard: 'EN 10025 / datasheets' },
  { codename: 'DATA-11 // BEND R', title: 'רדיוס כיפוף מינימלי לפח', category: 'ייצור ותהליכים', standard: 'DFM charts' },
  { codename: 'DATA-13 // 3DP WALLS', title: 'עובי דופן מינימלי בהדפסה', category: 'ייצור ותהליכים', standard: 'DFM guides' },
  { codename: 'DATA-15 // RA-PROC', title: 'Ra מושג לפי תהליך ייצור', category: 'ייצור ותהליכים', standard: 'DFM charts' },
  { codename: 'DATA-16 // WELD SYM', title: 'סמלי ריתוך בשרטוט', category: 'ריתוך', standard: 'ISO 2553 / AWS A2.4' },
]
