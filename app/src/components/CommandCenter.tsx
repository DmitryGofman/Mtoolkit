import type { Chapter, LockedChapter, ChapterProgress } from '../game/types.ts'

interface Props {
  chapters: Chapter[]
  locked: LockedChapter[]
  progressFor: (chapterId: string) => ChapterProgress
  onDeploy: (chapterId: string) => void
}

export function CommandCenter({ chapters, locked, progressFor, onDeploy }: Props) {
  return (
    <main className="screen">
      <div className="cc-hero">
        <div className="cc-kicker mono">// CAMPAIGN MAP — בחר מבצע</div>
        <h1 className="cc-title">חדר המבצעים</h1>
        <p className="cc-sub">
          מהטירון ועד מהנדס שדה: מבצעי הליבה, מבצעי העשרה, ומבצעי תהליכי ייצור בהמשך.
          כל מבצע מקנה מיומנות הנדסית אמיתית — לא נקודות בלבד. {chapters.length} מבצעים
          פתוחים כעת.
        </p>
      </div>

      <div className="op-grid">
        {chapters.map((chapter) => {
          const progress = progressFor(chapter.id)
          const total = chapter.units.length + chapter.exercises.length
          const done = progress.unitsRead.length + Object.keys(progress.exercisesDone).length
          const pct = Math.round((done / total) * 100)

          // Banner chapters: the art already carries number, codename, title and
          // "DEPLOY", so the card is just the banner plus the real progress state.
          if (chapter.banner) {
            return (
              <button
                key={chapter.id}
                className="op-card op-active op-banner-card"
                onClick={() => onDeploy(chapter.id)}
                title={`${chapter.codename} — ${chapter.title}`}
              >
                <img
                  className="op-banner-img"
                  src={chapter.banner}
                  alt={`${chapter.codename} — ${chapter.title}`}
                  loading="lazy"
                />
                {progress.completed ? (
                  <span className="op-status op-status-done mono">✔ הושלם</span>
                ) : (
                  pct > 0 && <span className="op-status mono">{pct}%</span>
                )}
                <div className="op-progress" aria-hidden>
                  <div className="op-progress-fill" style={{ width: `${pct}%` }} />
                </div>
              </button>
            )
          }

          return (
            <button key={chapter.id} className="op-card op-active" onClick={() => onDeploy(chapter.id)}>
              <div className="op-num mono">{String(chapter.number).padStart(2, '0')}</div>
              <div className="op-code mono">{chapter.codename}</div>
              <div className="op-name">{chapter.title}</div>
              <div className="op-meta">
                <span className="tag tag-live">{progress.completed ? '✔ הושלם' : 'זמין לפריסה'}</span>
                <span className="mono dim">{pct}% הושלם</span>
              </div>
              <div className="op-bar">
                <div className="op-bar-fill" style={{ width: `${pct}%` }} />
              </div>
              <div className="op-deploy mono">{progress.completed ? 'REDEPLOY ▸' : 'DEPLOY ▸'}</div>
            </button>
          )
        })}

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
