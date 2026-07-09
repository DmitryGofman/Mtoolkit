import { rankFor, nextRank } from '../game/progress.ts'

export function Hud({ xp, onReset }: { xp: number; onReset: () => void }) {
  const rank = rankFor(xp)
  const next = nextRank(xp)
  const pct = next
    ? Math.min(100, Math.round(((xp - rank.minXp) / (next.minXp - rank.minXp)) * 100))
    : 100

  return (
    <header className="hud">
      <div className="hud-brand">
        <span className="hud-logo">◈</span>
        <span className="hud-title">
          MECHALC <b>ACADEMY</b>
        </span>
        <span className="hud-sub">COMBAT ENGINEERING DIVISION</span>
      </div>
      <div className="hud-rank">
        <div className="hud-rank-names">
          <span className="hud-rank-he">{rank.name}</span>
          <span className="hud-rank-en">{rank.nameEn}</span>
        </div>
        <div className="xp-track" title={next ? `${xp} / ${next.minXp} XP` : `${xp} XP`}>
          <div className="xp-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="hud-xp-label">
          <span className="mono">{xp} XP</span>
          {next && <span className="mono dim"> ▸ {next.nameEn}: {next.minXp}</span>}
        </div>
      </div>
      <button className="btn-ghost" onClick={onReset} title="איפוס התקדמות">
        RESET
      </button>
    </header>
  )
}
