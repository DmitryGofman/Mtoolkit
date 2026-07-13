import { useEffect, useRef, useState } from 'react'
import { rankFor, nextRank } from '../game/progress.ts'
import { sound } from '../game/sound.ts'

interface HudProps {
  xp: number
  onReset: () => void
  /** Return to the command center; progress is kept. Hidden when already there. */
  onHome?: () => void
}

/** Animate a number toward `target` (respecting reduced-motion). */
function useCountUp(target: number): number {
  const [value, setValue] = useState(target)
  const fromRef = useRef(target)
  const rafRef = useRef(0)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const from = fromRef.current
    if (reduce || from === target) {
      fromRef.current = target
      setValue(target)
      return
    }
    const start = performance.now()
    const dur = 600
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(from + (target - from) * eased))
      if (p < 1) rafRef.current = requestAnimationFrame(tick)
      else fromRef.current = target
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target])

  return value
}

export function Hud({ xp, onReset, onHome }: HudProps) {
  const rank = rankFor(xp)
  const next = nextRank(xp)
  const pct = next
    ? Math.min(100, Math.round(((xp - rank.minXp) / (next.minXp - rank.minXp)) * 100))
    : 100
  const shownXp = useCountUp(xp)
  const [soundOn, setSoundOn] = useState(sound.isEnabled())

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
          <span className="mono">{shownXp} XP</span>
          {next && (
            <span className="mono dim">
              {' '}
              ▸ {next.nameEn}: {next.minXp}
            </span>
          )}
        </div>
      </div>
      <div className="hud-actions">
        <button
          className="btn-ghost btn-icon"
          onClick={() => setSoundOn(sound.toggle())}
          title={soundOn ? 'השתקת צליל' : 'הפעלת צליל'}
          aria-label={soundOn ? 'השתקת צליל' : 'הפעלת צליל'}
        >
          {soundOn ? '🔊' : '🔇'}
        </button>
        {onHome && (
          <button
            className="btn-ghost btn-home"
            onClick={onHome}
            title="חזרה לחדר המבצעים — ההתקדמות נשמרת"
          >
            ⌂ בסיס
          </button>
        )}
        <button className="btn-ghost" onClick={onReset} title="איפוס התקדמות">
          RESET
        </button>
      </div>
    </header>
  )
}
