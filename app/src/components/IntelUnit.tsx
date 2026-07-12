import type { IntelUnit as Unit } from '../game/types.ts'
import { VisualCard } from './VisualCard.tsx'

interface Props {
  unit: Unit
  index: number
  total: number
  onComplete: () => void
}

export function IntelUnit({ unit, index, total, onComplete }: Props) {
  return (
    <main className="screen">
      <div className="panel intel">
        <div className="panel-head">
          <span className="mono accent">{unit.codename}</span>
          <span className="mono dim">
            FILE {index + 1}/{total}
          </span>
        </div>
        <h1 className="intel-title">{unit.title}</h1>

        <section className="block block-scenario">
          <div className="block-label mono">⚠ INCIDENT REPORT — תקרית מהשטח</div>
          <p>{unit.openingScenario}</p>
          <p className="opening-q">❯ {unit.openingQuestion}</p>
        </section>

        <section className="block">
          <div className="block-label mono">▸ BRIEFING — ההסבר</div>
          {unit.briefing.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </section>

        {unit.visuals && unit.visuals.length > 0 && (
          <section className="block">
            <div className="block-label mono">◉ VISUAL INTEL — תצלומי מודיעין</div>
            <div className="visuals">
              {unit.visuals.map((v) => (
                <VisualCard key={v.src} visual={v} />
              ))}
            </div>
          </section>
        )}

        <section className="block">
          <div className="block-label mono">◈ TECH SPECS — מושגים</div>
          <div className="concepts">
            {unit.concepts.map((c) => (
              <div key={c.term} className="concept-card">
                <div className="concept-term">
                  {c.term} <span className="mono concept-en">{c.termEn}</span>
                </div>
                <div className="concept-def">{c.definition}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="block block-rule">
          <div className="block-label mono">★ RULE OF THUMB — כלל אצבע</div>
          <p className="rule-text">{unit.ruleOfThumb.rule}</p>
          <p className="rule-caveat">גבולות הכלל: {unit.ruleOfThumb.caveat}</p>
        </section>

        <section className="block block-mistake">
          <div className="block-label mono">☠ KNOWN TRAP — הטעות הנפוצה</div>
          <p>
            <b>הטעות:</b> {unit.commonMistake.mistake}
          </p>
          <p>
            <b>למה היא קורית:</b> {unit.commonMistake.why}
          </p>
          <p>
            <b>הנזק:</b> {unit.commonMistake.damage}
          </p>
          <p>
            <b>איך מונעים:</b> {unit.commonMistake.prevention}
          </p>
        </section>

        <button className="btn-primary" onClick={onComplete}>
          INTEL ACQUIRED ✔ (+{unit.xp} XP)
        </button>
      </div>
    </main>
  )
}
