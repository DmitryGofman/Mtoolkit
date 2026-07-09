import { useMemo, useState } from 'react'
import type { Exercise } from '../game/types.ts'

interface Props {
  exercise: Exercise
  index: number
  total: number
  mode: 'practice' | 'exam'
  /** firstTryCorrect reported once the learner confirms and moves on */
  onComplete: (firstTryCorrect: boolean) => void
}

/** Deterministic option shuffle so the correct answer isn't always first. */
function shuffled<T>(items: T[], seed: string): T[] {
  let h = 0
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) | 0
  const arr = items.map((item, i) => ({ item, key: ((h ^ (i * 2654435761)) >>> 0) % 1000 }))
  arr.sort((a, b) => a.key - b.key)
  return arr.map((a) => a.item)
}

export function ExercisePanel({ exercise, index, total, mode, onComplete }: Props) {
  const [picked, setPicked] = useState<number | null>(null)
  const [attempts, setAttempts] = useState(0)
  const options = useMemo(() => shuffled(exercise.options, exercise.id), [exercise])

  const chosen = picked !== null ? options[picked] : null
  const solved = chosen?.correct ?? false

  function pick(i: number) {
    if (solved || (mode === 'exam' && picked !== null)) return
    setPicked(i)
    setAttempts((a) => a + 1)
  }

  function next() {
    const firstTry = solved && attempts === 1
    setPicked(null)
    setAttempts(0)
    onComplete(mode === 'exam' ? (chosen?.correct ?? false) : firstTry)
  }

  const canAdvance = mode === 'exam' ? picked !== null : solved

  return (
    <main className="screen">
      <div className={`panel exercise ${mode === 'exam' ? 'exercise-exam' : ''}`}>
        <div className="panel-head">
          <span className="mono accent">{exercise.codename}</span>
          <span className="mono dim">
            {mode === 'exam' ? 'FINAL EXAM' : 'FIELD OP'} {index + 1}/{total}
          </span>
        </div>

        <section className="block block-scenario">
          <div className="block-label mono">▸ SITUATION — התרחיש</div>
          <p>{exercise.scenario}</p>
        </section>

        <h2 className="exercise-q">{exercise.question}</h2>

        <div className="options">
          {options.map((o, i) => {
            const isPicked = picked === i
            const revealed = isPicked
            const cls = [
              'option',
              isPicked ? 'option-picked' : '',
              revealed && o.correct ? 'option-correct' : '',
              revealed && !o.correct ? 'option-wrong' : '',
              solved && !isPicked ? 'option-disabled' : '',
            ].join(' ')
            return (
              <div key={i} className="option-wrap">
                <button className={cls} onClick={() => pick(i)}>
                  <span className="option-key mono">{String.fromCharCode(65 + i)}</span>
                  <span>{o.text}</span>
                </button>
                {revealed && (
                  <div className={`feedback ${o.correct ? 'feedback-good' : 'feedback-bad'}`}>
                    <span className="mono">{o.correct ? '✔ CONFIRMED' : '✘ NEGATIVE'}</span>
                    <p>{o.feedback}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="exercise-foot">
          <span className="mono dim">SKILL: {exercise.skill}</span>
          {canAdvance && (
            <button className="btn-primary" onClick={next}>
              {mode === 'exam' ? 'נעל תשובה והמשך ▸' : `המשך ▸ ${attempts === 1 ? `(+${exercise.xp} XP)` : ''}`}
            </button>
          )}
        </div>
      </div>
    </main>
  )
}
