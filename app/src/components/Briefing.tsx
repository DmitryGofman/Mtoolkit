import type { Chapter } from '../game/types.ts'

export function Briefing({ chapter, onStart }: { chapter: Chapter; onStart: () => void }) {
  return (
    <main className="screen">
      <div className="panel briefing">
        {chapter.banner && (
          <div className="briefing-banner">
            <img src={chapter.banner} alt={`${chapter.codename} — ${chapter.title}`} loading="eager" />
            <div className="briefing-banner-scrim" aria-hidden />
          </div>
        )}
        {/* The banner art already carries the codename + title, so show them as
            text only for chapters without a banner (avoids doubling it up). */}
        {chapter.banner ? (
          <div className="panel-head">
            <span className="mono dim">MISSION BRIEFING // CLEARANCE: RECRUIT+</span>
          </div>
        ) : (
          <>
            <div className="panel-head">
              <span className="mono dim">MISSION BRIEFING // CLEARANCE: RECRUIT+</span>
              <span className="mono accent">{chapter.codename}</span>
            </div>
            <h1 className="briefing-title">{chapter.title}</h1>
          </>
        )}
        <p className="epigraph">{chapter.epigraph}</p>
        <p className="briefing-desc">{chapter.description}</p>

        <div className="objectives">
          <div className="objectives-head mono">▸ MISSION OBJECTIVES — יעדי המבצע</div>
          <ul>
            {chapter.objectives.map((o, i) => (
              <li key={i}>
                <span className="obj-marker mono">[{String(i + 1).padStart(2, '0')}]</span> {o}
              </li>
            ))}
          </ul>
        </div>

        <div className="briefing-route mono">
          INTEL ×{chapter.units.length} ▸ FIELD OPS ×{chapter.exercises.length} ▸ FINAL EXAM ×
          {chapter.finalExam.length}
        </div>

        <button className="btn-primary" onClick={onStart}>
          ▸ התחל מבצע
        </button>
      </div>
    </main>
  )
}
