import type { Chapter, LockedChapter, ChapterProgress } from '../game/types.ts'

interface Props {
  chapter: Chapter
  locked: LockedChapter[]
  progress: ChapterProgress
  onDeploy: () => void
}

export function CommandCenter({ chapter, locked, progress, onDeploy }: Props) {
  const total = chapter.units.length + chapter.exercises.length
  const done =
    progress.unitsRead.length +
    Object.keys(progress.exercisesDone).length
  const pct = Math.round((done / total) * 100)

  return (
    <main className="screen">
      <div className="cc-hero">
        <div className="cc-kicker mono">// CAMPAIGN MAP — בחר מבצע</div>
        <h1 className="cc-title">חדר המבצעים</h1>
        <p className="cc-sub">
          שמונה מבצעים בין הטירון לבין מהנדס שדה. כל מבצע מקנה מיומנות הנדסית אמיתית —
          לא נקודות בלבד. המבצע הראשון פתוח. השאר ייפתחו בהמשך הקמפיין.
        </p>
      </div>

      <div className="op-grid">
        <button className="op-card op-active" onClick={onDeploy}>
          <div className="op-num mono">01</div>
          <div className="op-code mono">{chapter.codename}</div>
          <div className="op-name">{chapter.title}</div>
          <div className="op-meta">
            <span className="tag tag-live">{progress.completed ? '✔ הושלם' : 'זמין לפריסה'}</span>
            <span className="mono dim">{pct}% הושלם</span>
          </div>
          <div className="op-bar">
            <div className="op-bar-fill" style={{ width: `${pct}%` }} />
          </div>
          <div className="op-deploy mono">
            {progress.completed ? 'REDEPLOY ▸' : 'DEPLOY ▸'}
          </div>
        </button>

        {locked.map((op) => (
          <div key={op.number} className="op-card op-locked" aria-disabled>
            <div className="op-num mono">{String(op.number).padStart(2, '0')}</div>
            <div className="op-code mono">{op.codename}</div>
            <div className="op-name">{op.title}</div>
            <div className="op-meta">
              <span className="tag tag-locked">🔒 נעול</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
