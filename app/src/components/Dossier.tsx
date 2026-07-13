import { RANKS, rankFor, nextRank, rankIndex } from '../game/progress.ts'
import type { CareerStats } from '../game/progress.ts'

interface Props {
  xp: number
  stats: CareerStats
  onReturn: () => void
}

/** Personal space — the operator's dossier: rank, career stats, promotion ladder. */
export function Dossier({ xp, stats, onReturn }: Props) {
  const rank = rankFor(xp)
  const next = nextRank(xp)
  const idx = rankIndex(rank)
  const pctToNext = next
    ? Math.min(100, Math.round(((xp - rank.minXp) / (next.minXp - rank.minXp)) * 100))
    : 100
  const xpToNext = next ? next.minXp - xp : 0

  const tiles: { label: string; value: string; sub?: string }[] = [
    { label: 'CHAPTERS', value: `${stats.chaptersCompleted}/${stats.chaptersTotal}`, sub: 'מבצעים הושלמו' },
    { label: 'XP', value: `${xp}`, sub: 'ניקוד ניסיון' },
    { label: 'INTEL READ', value: `${stats.unitsRead}`, sub: 'יחידות מודיעין' },
    { label: 'FIELD OPS', value: `${stats.exercisesSolved}`, sub: 'תרגילים נפתרו' },
    { label: 'EXAMS', value: `${stats.examsPassed}`, sub: 'מבחנים עברת' },
    {
      label: 'AVG SCORE',
      value: stats.avgExamScore == null ? '—' : `${stats.avgExamScore}%`,
      sub: stats.bestExamScore == null ? 'טרם נבחנת' : `שיא ${stats.bestExamScore}%`,
    },
  ]

  return (
    <main className="screen">
      <div className="panel dossier">
        <div className="panel-head">
          <span className="mono dim">// PERSONNEL DOSSIER — תיק אישי</span>
          <span className="mono accent">CLEARANCE {String(idx + 1).padStart(2, '0')}</span>
        </div>

        <div className="dossier-hero">
          <div className="dossier-badge-wrap">
            <img className="dossier-badge" src={rank.badge} alt={`${rank.nameEn} badge`} />
          </div>
          <div className="dossier-id">
            <div className="dossier-rank-he">{rank.name}</div>
            <div className="dossier-rank-en mono">{rank.nameEn}</div>
            <div className="xp-track dossier-xp" title={next ? `${xp} / ${next.minXp} XP` : `${xp} XP`}>
              <div className="xp-fill" style={{ width: `${pctToNext}%` }} />
            </div>
            <div className="dossier-xp-label mono">
              {next ? (
                <>
                  {xp} XP <span className="dim">▸ עוד {xpToNext} XP ל־{next.nameEn}</span>
                </>
              ) : (
                <>{xp} XP · הדרגה הגבוהה ביותר הושגה ◆</>
              )}
            </div>
          </div>
        </div>

        <div className="dossier-stats">
          {tiles.map((t) => (
            <div key={t.label} className="stat-tile">
              <div className="stat-value mono">{t.value}</div>
              <div className="stat-label mono">{t.label}</div>
              {t.sub && <div className="stat-sub">{t.sub}</div>}
            </div>
          ))}
        </div>

        <div className="block">
          <div className="block-label mono">▸ PROMOTION LADDER — סולם הדרגות</div>
          <div className="rank-ladder">
            {RANKS.map((r, i) => {
              const earned = xp >= r.minXp
              const isCurrent = i === idx
              return (
                <div
                  key={r.nameEn}
                  className={`ladder-rank ${earned ? 'ladder-earned' : 'ladder-locked'} ${
                    isCurrent ? 'ladder-current' : ''
                  }`}
                >
                  <div className="ladder-badge-wrap">
                    <img className="ladder-badge" src={r.badge} alt={`${r.nameEn} badge`} loading="lazy" />
                    {isCurrent && <span className="ladder-you mono">אתה כאן</span>}
                    {!earned && <span className="ladder-lock" aria-hidden>🔒</span>}
                  </div>
                  <div className="ladder-name">{r.name}</div>
                  <div className="ladder-en mono">{r.nameEn}</div>
                  <div className="ladder-xp mono">{earned ? '✔ הושג' : `${r.minXp} XP`}</div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="dossier-actions">
          <button className="btn-primary" onClick={onReturn}>
            ▸ חזרה לחדר המבצעים
          </button>
        </div>
      </div>
    </main>
  )
}
