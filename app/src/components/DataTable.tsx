import type { ReferenceTable } from '../game/types.ts'

/**
 * Renders a verified reference table. The grid itself runs LTR (engineering
 * designations and numbers), while headers carry both Hebrew and English.
 */
export function DataTable({ table }: { table: ReferenceTable }) {
  return (
    <div className="data-table-wrap">
      <table className="data-table" dir="ltr">
        <thead>
          <tr>
            {table.columns.map((c) => (
              <th key={c.labelEn}>
                <span className="dt-col-en mono">{c.labelEn}</span>
                <span className="dt-col-he">{c.label}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} className={table.columns[j]?.numeric ? 'dt-num mono' : 'dt-name mono'}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
