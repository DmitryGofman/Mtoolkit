import type { ReferenceTable, PlannedTable } from '../../game/types.ts'
import { tapDrillTable } from './tap-drill.ts'
import { clearanceHolesTable } from './clearance-holes.ts'

/**
 * The Datapad library — every verified reference table, in display order.
 * Add a table here only after its values are verified per
 * sources/verified/reference-tables.md (cross-checked or read from the standard).
 */
export const referenceTables: ReferenceTable[] = [tapDrillTable, clearanceHolesTable]

export function tableById(id: string): ReferenceTable | undefined {
  return referenceTables.find((t) => t.id === id)
}

/**
 * The rest of the codex — cataloged in docs/practical-reference-tables-he.md,
 * sources scouted in sources/source-index.md, teased locked until verified.
 */
export const plannedTables: PlannedTable[] = [
  { codename: 'DATA-03 // TORQUE', title: 'מומנטי הידוק ו-preload', standard: 'VDI 2230' },
  { codename: 'DATA-04 // GRADES', title: 'מחלקות חוזק לברגים', standard: 'ISO 898-1' },
  { codename: 'DATA-05 // THREADS', title: 'תבריג מטרי — מידות יסוד', standard: 'ISO 261 / 724' },
  { codename: 'DATA-06 // IT GRADES', title: 'דרגות סבילות IT', standard: 'ISO 286-1' },
  { codename: 'DATA-07 // FITS', title: 'התאמות מועדפות חור-ציר', standard: 'ISO 286-2' },
  { codename: 'DATA-08 // GEN TOL', title: 'סבילויות כלליות', standard: 'ISO 2768' },
  { codename: 'DATA-09 // MATERIALS', title: 'חוזק חומרים נפוצים', standard: 'EN 10025 / datasheets' },
  { codename: 'DATA-10 // SURFACE', title: 'גימור פנים — Ra / N-grade', standard: 'ISO 1302' },
  { codename: 'DATA-11 // BEND R', title: 'רדיוס כיפוף מינימלי לפח', standard: 'DFM charts' },
  { codename: 'DATA-12 // WELD', title: 'סמלי ריתוך וגודל תפר', standard: 'ISO 2553 / AWS D1.1' },
  { codename: 'DATA-13 // 3DP WALLS', title: 'עובי דופן מינימלי בהדפסה', standard: 'DFM guides' },
]
