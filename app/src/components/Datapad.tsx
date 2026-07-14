import { useState } from 'react'
import type { ReferenceTable, PlannedTable } from '../game/types.ts'
import { DataTable } from './DataTable.tsx'

interface Props {
  tables: ReferenceTable[]
  planned: PlannedTable[]
  /** Chapter-completion predicate — a table unlocks when its chapter is done. */
  isChapterDone: (chapterId: string) => boolean
  /** Chapter title lookup for the locked-card hint. */
  chapterName: (chapterId: string) => string
  onReturn: () => void
}

/**
 * ENGINEER'S DATAPAD — the dedicated reference-table library.
 * Every table an engineer keeps within reach, unlocked by completing the
 * operation that teaches how to read it. Values are verified only —
 * see sources/verified/reference-tables.md.
 */
export function Datapad({ tables, planned, isChapterDone, chapterName, onReturn }: Props) {
  const [openId, setOpenId] = useState<string | null>(null)
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

  return (
    <main className="screen">
      <div className="panel datapad">
        <div className="panel-head">
          <span className="mono dim">// ENGINEER'S DATAPAD — ספריית העזר של המהנדס</span>
          <span className="mono accent">
            {tables.filter((t) => isChapterDone(t.unlockedBy)).length}/{tables.length + planned.length} ONLINE
          </span>
        </div>

        <h1 className="dp-title">טבלאות שכל מהנדס פותח כל יום</h1>
        <p className="dp-intro">
          לא משננים — יודעים איפה לפתוח ואיך לקרוא. כל טבלה נפתחת עם השלמת המבצע שמלמד אותה,
          וכל ערך בה עבר אימות מול מקור מתועד.
        </p>

        <div className="dp-grid">
          {tables.map((t) => {
            const unlocked = isChapterDone(t.unlockedBy)
            return unlocked ? (
              <button key={t.id} className="dp-card" onClick={() => setOpenId(t.id)}>
                <div className="dp-card-code mono">{t.codename}</div>
                <div className="dp-card-name">{t.title}</div>
                <div className="dp-card-std mono dim">{t.standard}</div>
                <div className="tag tag-live mono">ONLINE</div>
              </button>
            ) : (
              <div key={t.id} className="dp-card dp-locked">
                <div className="dp-card-code mono">{t.codename}</div>
                <div className="dp-card-name">{t.title}</div>
                <div className="dp-card-std mono dim">{t.standard}</div>
                <div className="tag tag-locked mono">🔒 השלם את {chapterName(t.unlockedBy)}</div>
              </div>
            )
          })}
          {planned.map((p) => (
            <div key={p.codename} className="dp-card dp-locked">
              <div className="dp-card-code mono">{p.codename}</div>
              <div className="dp-card-name">{p.title}</div>
              <div className="dp-card-std mono dim">{p.standard}</div>
              <div className="tag tag-locked mono">⟳ באיסוף מקורות</div>
            </div>
          ))}
        </div>

        <div className="dp-actions">
          <button className="btn-primary" onClick={onReturn}>
            ▸ חזרה
          </button>
        </div>
      </div>
    </main>
  )
}
