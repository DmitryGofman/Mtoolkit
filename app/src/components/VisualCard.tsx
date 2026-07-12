import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import type { Visual } from '../game/types.ts'

/**
 * A licensed image with its Hebrew caption + attribution.
 * Clicking the image opens a full-screen lightbox (Escape or click to close).
 * Used both in the intel gallery and inside exercises.
 */
export function VisualCard({ visual, className }: { visual: Visual; className?: string }) {
  const [zoomed, setZoomed] = useState(false)

  useEffect(() => {
    if (!zoomed) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoomed(false)
    }
    window.addEventListener('keydown', onKey)
    // lock body scroll while the lightbox is open
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [zoomed])

  return (
    <figure className={`visual-card ${className ?? ''}`}>
      <button
        type="button"
        className={`visual-frame ${visual.plate ? 'visual-plate' : ''}`}
        onClick={() => setZoomed(true)}
        aria-label="הגדלת תמונה"
      >
        <img src={visual.src} alt={visual.caption} loading="lazy" />
        <span className="visual-zoom-hint mono" aria-hidden>
          ⤢ הגדל
        </span>
      </button>
      <figcaption>
        <p className="visual-caption">{visual.caption}</p>
        <a className="visual-credit mono" href={visual.sourceUrl} target="_blank" rel="noreferrer">
          SOURCE: {visual.credit} // {visual.license}
        </a>
      </figcaption>

      {/* Rendered through a portal to document.body so the overlay escapes the
          panel's stacking context and reliably covers the whole viewport. */}
      {zoomed &&
        createPortal(
          <div className="lightbox" onClick={() => setZoomed(false)} role="dialog" aria-modal="true">
            <button className="lightbox-close mono" type="button" aria-label="סגירה">
              ✕ ESC
            </button>
            <img
              className={`lightbox-img ${visual.plate ? 'visual-plate' : ''}`}
              src={visual.src}
              alt={visual.caption}
              onClick={(e) => e.stopPropagation()}
            />
            <p className="lightbox-caption" onClick={(e) => e.stopPropagation()}>
              {visual.caption}
            </p>
          </div>,
          document.body,
        )}
    </figure>
  )
}
