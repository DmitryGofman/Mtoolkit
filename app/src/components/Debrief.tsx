import type { Chapter, ReferenceTable } from '../game/types.ts'

interface Props {
  chapter: Chapter
  examScore: number // percent
  /** Datapad tables this chapter teaches how to read — referenced on completion. */
  relatedTables: ReferenceTable[]
  onOpenTable: (tableId: string) => void
  onReturn: () => void
  onRetry: () => void
}

function medalFor(score: number): { icon: string; label: string; cls: string } {
  if (score >= 100) return { icon: '◆', label: 'FLAWLESS — ביצוע מושלם', cls: 'medal-gold' }
  if (score >= 80) return { icon: '◈', label: 'MISSION ACCOMPLISHED — המשימה הושלמה', cls: 'medal-silver' }
  if (score >= 60) return { icon: '◇', label: 'PASSED — עברת, יש מה לחזק', cls: 'medal-bronze' }
  return { icon: '✘', label: 'MISSION FAILED — נדרש ריענון אינטל', cls: 'medal-fail' }
}

export function Debrief({ chapter, examScore, relatedTables, onOpenTable, onReturn, onRetry }: Props) {
  const medal = medalFor(examScore)
  const passed = examScore >= 60

  return (
    <main className="screen">
      <div className="panel debrief">
        <div className="panel-head">
          <span className="mono accent">{chapter.codename}</span>
          <span className="mono dim">DEBRIEF</span>
        </div>

        <div className={`medal ${medal.cls}`}>
          <div className="medal-icon">{medal.icon}</div>
          <div className="medal-label">{medal.label}</div>
          <div className="medal-score mono">EXAM SCORE: {examScore}%</div>
        </div>

        {passed ? (
          <>
            <p className="debrief-text">
              ציוד הוקצה: צ׳קליסט שדה. זה הכלי שלוקחים מהמבצע הזה לעבודה האמיתית — לעבור עליו
              לפני כל שליחת חלק עם הברגות לייצור.
            </p>
            <div className="block block-checklist">
              <div className="block-label mono">✔ FIELD CHECKLIST — צ׳קליסט שדה</div>
              <ul className="checklist">
                {chapter.checklist.map((c, i) => (
                  <li key={i}>
                    <span className="check-box mono">☐</span> {c}
                  </li>
                ))}
              </ul>
            </div>
            {relatedTables.length > 0 && (
              <div className="block dp-refs">
                <div className="block-label mono">▦ DATAPAD — הטבלאות של המבצע הזה</div>
                <p className="dp-refs-hint">
                  עכשיו אתה יודע לקרוא אותן. הן תמיד זמינות ב-DATAPAD — אלה הכתובות:
                </p>
                <div className="dp-refs-row">
                  {relatedTables.map((t) => (
                    <button key={t.id} className="dp-ref-btn" onClick={() => onOpenTable(t.id)}>
                      <span className="mono accent">{t.codename}</span>
                      <span>{t.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <p className="debrief-text">
            פחות מ-60% — האינטל עוד לא ישב. חזור לקבצי ה-INTEL, במיוחד לטעויות הנפוצות, ונסה
            שוב את המבחן. בשטח אין ניסיון שני; כאן יש.
          </p>
        )}

        <div className="debrief-actions">
          {!passed && (
            <button className="btn-primary" onClick={onRetry}>
              ▸ נסה שוב את המבחן
            </button>
          )}
          <button className={passed ? 'btn-primary' : 'btn-ghost'} onClick={onReturn}>
            ▸ חזרה לחדר המבצעים
          </button>
        </div>
      </div>
    </main>
  )
}
