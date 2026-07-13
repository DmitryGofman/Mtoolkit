import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import type { Rank } from '../game/types.ts'
import { sound } from '../game/sound.ts'

/** Full-screen "promotion" cinematic shown when the player crosses a rank. */
export function RankUp({ rank, onClose }: { rank: Rank; onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    sound.rankUp()
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timer = window.setTimeout(onClose, reduce ? 2400 : 4200)
    let raf = 0

    const cv = canvasRef.current
    if (!reduce && cv) {
      const ctx = cv.getContext('2d')
      if (ctx) {
        cv.width = window.innerWidth
        cv.height = window.innerHeight
        const cx = cv.width / 2
        const cy = cv.height / 2.6
        const colors = ['#35e0ff', '#f2a93b', '#ffd489', '#3dff9c']
        const parts = Array.from({ length: 140 }, () => {
          const a = Math.random() * Math.PI * 2
          const s = 2 + Math.random() * 8
          return {
            x: cx,
            y: cy,
            vx: Math.cos(a) * s,
            vy: Math.sin(a) * s - 2.5,
            life: 1,
            c: colors[(Math.random() * colors.length) | 0],
            r: 2 + Math.random() * 3.5,
          }
        })
        const tick = () => {
          ctx.clearRect(0, 0, cv.width, cv.height)
          let alive = false
          for (const p of parts) {
            p.x += p.vx
            p.y += p.vy
            p.vy += 0.13
            p.vx *= 0.99
            p.life -= 0.011
            if (p.life > 0) {
              alive = true
              ctx.globalAlpha = Math.max(0, p.life)
              ctx.fillStyle = p.c
              ctx.beginPath()
              ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
              ctx.fill()
            }
          }
          ctx.globalAlpha = 1
          if (alive) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      }
    }

    return () => {
      window.clearTimeout(timer)
      cancelAnimationFrame(raf)
    }
  }, [rank, onClose])

  return createPortal(
    <div className="rankup" onClick={onClose} role="dialog" aria-modal="true">
      <canvas ref={canvasRef} className="rankup-canvas" aria-hidden />
      <div className="rankup-card" onClick={(e) => e.stopPropagation()}>
        <div className="rankup-kicker mono">// PROMOTION AUTHORIZED — עלית דרגה</div>
        <div className="rankup-badge">
          <img src={rank.badge} alt={`${rank.nameEn} badge`} />
        </div>
        <div className="rankup-rank-he">{rank.name}</div>
        <div className="rankup-rank-en mono">{rank.nameEn}</div>
        <button className="btn-primary" onClick={onClose}>
          המשך ▸
        </button>
      </div>
    </div>,
    document.body,
  )
}
