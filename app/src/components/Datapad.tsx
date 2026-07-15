import { useState } from 'react'
import type { ReferenceTable, PlannedTable } from '../game/types.ts'
import { tableCategories } from '../content/tables/index.ts'
import { DataTable } from './DataTable.tsx'

interface Props {
  tables: ReferenceTable[]
  planned: PlannedTable[]
  /** Open directly on a specific table (deep-link from a chapter debrief). */
  initialTableId?: string
  onReturn: () => void
}

/**
 * ENGINEER'S DATAPAD — the dedicated reference-table library, grouped by
 * category. Every verified table is available from day one (real engineers
 * don't have locked handbooks); chapters point here from their debrief.
 * Values are verified only — see sources/verified/reference-tables.md.
 */
export function Datapad({ tables, planned, initialTableId, onReturn }: Props) {
  const [openId, setOpenId] = useState<string | null>(initialTableId ?? null)
  const open = openId ? tables.find((t) => t.id === openId) : undefined

  if (open) {
    return (
      <main className="screen">
        <div className="panel datapad">
          <div className="panel-head">
            <span className="mono accent">{open.codename}</span>
            <span className="mono dim">// ENGINEER'S DATAPAD</span>
          </div>

          <h1 className="dp-title">{open.title}</h1>
          <div className="dp-standard mono">◈ {open.standard}</div>
          <p className="dp-intro">{open.intro}</p>

          <DataTable table={open} />

          <div className="dp-caveat">
            <div className="block-label mono">▸ CAVEAT — גבולות התוקף</div>
            <p>{open.caveat}</p>
          </div>

          <div className="dp-source mono dim">
            SOURCE: {open.sourceId} — {open.sourceNote}
          </div>

          <div className="dp-actions">
            <button className="btn-ghost" onClick={() => setOpenId(null)}>
              ◂ לכל הטבלאות
            </button>
            <button className="btn-primary" onClick={onReturn}>
              ▸ חזרה
            </button>
          </div>
        </div>
      </main>
    )
  }

  const cats = [...tableCategories]
  for (const t of [...tables, ...planned]) if (!cats.includes(t.category)) cats.push(t.category)
  const sections = cats
    .map((cat) => ({
      cat,
      live: tables.filter((t) => t.category === cat),
      soon: planned.filter((p) => p.category === cat),
    }))
    .filter((s) => s.live.length + s.soon.length > 0)

  return (
    <main className="screen">
      <div className="panel datapad">
        <div className="panel-head">
          <span className="mono dim">// ENGINEER'S DATAPAD — ספריית העזר של המהנדס</span>
          <span className="mono accent">
            {tables.length}/{tables.length + planned.length} ONLINE
          </span>
        </div>

        <h1 className="dp-title">טבלאות שכל מהנדס פותח כל יום</h1>
        <p className="dp-intro">
          לא משננים — יודעים איפה לפתוח ואיך לקרוא. כל הטבלאות זמינות תמיד; כל מבצע מלמד
          איך לקרוא את הרלוונטיות לו, וכל ערך כאן עבר אימות מול מקור מתועד.
        </p>

        {sections.map((s) => (
          <section key={s.cat} className="dp-section">
            <div className="block-label mono">
              ▸ {s.cat} — {s.live.length}/{s.live.length + s.soon.length}
            </div>
            <div className="dp-grid">
              {s.live.map((t) => (
                <button key={t.id} className="dp-card" onClick={() => setOpenId(t.id)}>
                  <div className="dp-card-code mono">{t.codename}</div>
                  <div className="dp-card-name">{t.title}</div>
                  <div className="dp-card-std mono dim">{t.standard}</div>
                  <div className="tag tag-live mono">ONLINE</div>
                </button>
              ))}
              {s.soon.map((p) => (
                <div key={p.codename} className="dp-card dp-locked">
                  <div className="dp-card-code mono">{p.codename}</div>
                  <div className="dp-card-name">{p.title}</div>
                  <div className="dp-card-std mono dim">{p.standard}</div>
                  <div className="tag tag-locked mono">⟳ באיסוף מקורות</div>
                </div>
              ))}
            </div>
          </section>
        ))}

        <div className="dp-actions">
          <button className="btn-primary" onClick={onReturn}>
            ▸ חזרה
          </button>
        </div>
      </div>
    </main>
  )
}
