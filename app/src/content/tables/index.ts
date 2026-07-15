import type { ReferenceTable, PlannedTable } from '../../game/types.ts'
import { tapDrillTable } from './tap-drill.ts'
import { clearanceHolesTable } from './clearance-holes.ts'
import { plasticsStrengthTable } from './plastics-strength.ts'
import { surfaceFinishTable } from './surface-finish.ts'
import { weldFilletMinTable } from './weld-fillet-min.ts'
import { torqueVdi2230Table } from './torque-vdi2230.ts'
import { propertyClassesTable } from './property-classes.ts'
import { tapDrillImperialTable } from './tap-drill-imperial.ts'
import { clearanceHolesImperialTable } from './clearance-holes-imperial.ts'
import { generalTolerancesTable } from './general-tolerances.ts'
import { threadBasicsTable } from './thread-basics.ts'
import { itGradesTable } from './it-grades.ts'
import { preferredFitsTable } from './preferred-fits.ts'
import { metalsStrengthTable } from './metals-strength.ts'
import { bendRadiusTable } from './bend-radius.ts'
import { printWallThicknessTable } from './print-wall-thickness.ts'
import { raByProcessTable } from './ra-by-process.ts'
import { weldSymbolsTable } from './weld-symbols.ts'

/**
 * The Datapad library — every verified reference table, in display order.
 * Add a table here only after its values are verified per
 * sources/verified/reference-tables.md (cross-checked or read from the standard).
 * Category/related-chapter assignments are provisional until the curriculum
 * mapping pass.
 */
export const referenceTables: ReferenceTable[] = [
  tapDrillTable,
  clearanceHolesTable,
  tapDrillImperialTable,
  clearanceHolesImperialTable,
  threadBasicsTable,
  propertyClassesTable,
  torqueVdi2230Table,
  itGradesTable,
  preferredFitsTable,
  generalTolerancesTable,
  metalsStrengthTable,
  plasticsStrengthTable,
  surfaceFinishTable,
  raByProcessTable,
  weldSymbolsTable,
  weldFilletMinTable,
  bendRadiusTable,
  printWallThicknessTable,
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
 * sources scouted in sources/source-index.md. Empty for now: every table
 * from the original worklist is live. New categories/tables get added here
 * as the codex expands.
 */
export const plannedTables: PlannedTable[] = []
