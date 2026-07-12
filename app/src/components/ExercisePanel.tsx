import { useMemo, useState } from 'react'
import type { Exercise } from '../game/types.ts'
import { VisualCard } from './VisualCard.tsx'

interface Props {
  exercise: Exercise
  index: number
  total: number
  mode: 'practice' | 'exam'
  /** Previously picked ORIGINAL option index, if the learner answered this before. */
  savedAnswer: number | null
  /** Called on each pick: the ORIGINAL option index + whether it's a first-try correct. */
  onAnswer: (originalIndex: number, firstTryCorrect: boolean) => void
  onBack?: () => void
  onComplete: () => void
}

/** Deterministic shuffle of option indices so the correct answer isn't always first. */
function shuffledOrder(count: number, seed: string): number[] {
  let h = 0
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) | 0
  return Array.from({ length: count }, (_, i) => i)
    .map((i) => ({ i, key: ((h ^ (i * 2654435761)) >>> 0) % 1000 }))
    .sort((a, b) => a.key - b.key)
    .map((o) => o.i)
}

export function ExercisePanel({
  exercise,
  index,
  total,
  mode,
  savedAnswer,
  onAnswer,
  onBack,
  onComplete,
}: Props) {
  const order = useMemo(() => shuffledOrder(exercise.options.length, exercise.id), [exercise])
  // Restore a previous answer: map the saved ORIGINAL index back to its display position.
  const savedPos = savedAnswer == null ? null : order.indexOf(savedAnswer)
  const [picked, setPicked] = useState<number | null>(savedPos)
  const [attempts, setAttempts] = useState(savedPos == null ? 0 : 1)

  const chosenOriginal = picked == null ? null : order[picked]
  const chosen = chosenOriginal == null ? null : exercise.options[chosenOriginal]
  const solved = chosen?.correct ?? false

  function pick(pos: number) {
    if (mode === 'practice' && solved) return // practice locks once correct
    const originalIndex = order[pos]
    const correct = exercise.options[originalIndex].correct
    const firstTryCorrect = correct && attempts === 0
    setPicked(pos)
    setAttempts((a) => a + 1)
    onAnswer(originalIndex, firstTryCorrect)
  }

  // Practice must be solved to advance; exam only needs an answer.
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

        {exercise.visual && <VisualCard visual={exercise.visual} className="exercise-visual" />}

        <h2 className="exercise-q">{exercise.question}</h2>

        <div className="options">
          {order.map((originalIndex, pos) => {
            const o = exercise.options[originalIndex]
            const isPicked = picked === pos
            const cls = [
              'option',
              isPicked ? 'option-picked' : '',
              isPicked && o.correct ? 'option-correct' : '',
              isPicked && !o.correct ? 'option-wrong' : '',
              solved && !isPicked ? 'option-disabled' : '',
            ].join(' ')
            return (
              <div key={pos} className="option-wrap">
                <button className={cls} onClick={() => pick(pos)}>
                  <span className="option-key mono">{String.fromCharCode(65 + pos)}</span>
                  <span>{o.text}</span>
                </button>
                {isPicked && (
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
          <div className="foot-nav">
            {onBack && (
              <button className="btn-ghost" onClick={onBack}>
                ◂ אחורה
              </button>
            )}
            <span className="mono dim">SKILL: {exercise.skill}</span>
          </div>
          {canAdvance && (
            <button className="btn-primary" onClick={onComplete}>
              {mode === 'exam'
                ? 'נעל תשובה והמשך ▸'
                : `המשך ▸ ${attempts === 1 && solved ? `(+${exercise.xp} XP)` : ''}`}
            </button>
          )}
        </div>
      </div>
    </main>
  )
}
