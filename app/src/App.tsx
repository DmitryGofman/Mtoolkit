import { useState } from 'react'
import { chapter01, lockedChapters } from './content/chapter-01-bolts.ts'
import { loadState, saveState, resetState, emptyChapterProgress } from './game/progress.ts'
import type { PlayerState } from './game/types.ts'
import { Hud } from './components/Hud.tsx'
import { CommandCenter } from './components/CommandCenter.tsx'
import { Briefing } from './components/Briefing.tsx'
import { IntelUnit } from './components/IntelUnit.tsx'
import { ExercisePanel } from './components/ExercisePanel.tsx'
import { Debrief } from './components/Debrief.tsx'

type Screen =
  | { kind: 'command-center' }
  | { kind: 'briefing' }
  | { kind: 'intel'; index: number }
  | { kind: 'practice'; index: number }
  | { kind: 'exam'; index: number; correct: number }
  | { kind: 'debrief'; score: number }

const chapter = chapter01

export default function App() {
  const [player, setPlayer] = useState<PlayerState>(loadState)
  const [screen, setScreen] = useState<Screen>({ kind: 'command-center' })

  const progress = player.chapters[chapter.id] ?? emptyChapterProgress()

  function update(next: PlayerState) {
    setPlayer(next)
    saveState(next)
  }

  function grantXp(amount: number, mutate?: (p: typeof progress) => void) {
    const chapterProgress = { ...progress, exercisesDone: { ...progress.exercisesDone } }
    mutate?.(chapterProgress)
    update({
      xp: player.xp + amount,
      chapters: { ...player.chapters, [chapter.id]: chapterProgress },
    })
  }

  function completeIntel(index: number) {
    const unit = chapter.units[index]
    const alreadyRead = progress.unitsRead.includes(unit.id)
    grantXp(alreadyRead ? 0 : unit.xp, (p) => {
      if (!alreadyRead) p.unitsRead = [...p.unitsRead, unit.id]
    })
    if (index + 1 < chapter.units.length) setScreen({ kind: 'intel', index: index + 1 })
    else setScreen({ kind: 'practice', index: 0 })
  }

  function completePractice(index: number, firstTry: boolean) {
    const ex = chapter.exercises[index]
    const alreadyDone = ex.id in progress.exercisesDone
    grantXp(firstTry && !alreadyDone ? ex.xp : 0, (p) => {
      if (!alreadyDone) p.exercisesDone[ex.id] = firstTry
    })
    if (index + 1 < chapter.exercises.length) setScreen({ kind: 'practice', index: index + 1 })
    else setScreen({ kind: 'exam', index: 0, correct: 0 })
  }

  function completeExamQuestion(index: number, correct: number, wasCorrect: boolean) {
    const total = chapter.finalExam.length
    const newCorrect = correct + (wasCorrect ? 1 : 0)
    if (index + 1 < total) {
      setScreen({ kind: 'exam', index: index + 1, correct: newCorrect })
      return
    }
    const score = Math.round((newCorrect / total) * 100)
    const passed = score >= 60
    const isBestScore = progress.examScore === null || score > progress.examScore
    const examXp = newCorrect * chapter.finalExam[0].xp
    grantXp(isBestScore ? examXp : 0, (p) => {
      if (isBestScore) p.examScore = score
      if (passed) p.completed = true
    })
    setScreen({ kind: 'debrief', score })
  }

  function reset() {
    update(resetState())
    setScreen({ kind: 'command-center' })
  }

  return (
    <div className="app">
      <div className="bg-grid" aria-hidden />
      <div className="bg-scanline" aria-hidden />
      <Hud xp={player.xp} onReset={reset} />

      {screen.kind === 'command-center' && (
        <CommandCenter
          chapter={chapter}
          locked={lockedChapters}
          progress={progress}
          onDeploy={() => setScreen({ kind: 'briefing' })}
        />
      )}

      {screen.kind === 'briefing' && (
        <Briefing chapter={chapter} onStart={() => setScreen({ kind: 'intel', index: 0 })} />
      )}

      {screen.kind === 'intel' && (
        <IntelUnit
          unit={chapter.units[screen.index]}
          index={screen.index}
          total={chapter.units.length}
          onComplete={() => completeIntel(screen.index)}
        />
      )}

      {screen.kind === 'practice' && (
        <ExercisePanel
          key={chapter.exercises[screen.index].id}
          exercise={chapter.exercises[screen.index]}
          index={screen.index}
          total={chapter.exercises.length}
          mode="practice"
          onComplete={(firstTry) => completePractice(screen.index, firstTry)}
        />
      )}

      {screen.kind === 'exam' && (
        <ExercisePanel
          key={chapter.finalExam[screen.index].id}
          exercise={chapter.finalExam[screen.index]}
          index={screen.index}
          total={chapter.finalExam.length}
          mode="exam"
          onComplete={(wasCorrect) => completeExamQuestion(screen.index, screen.correct, wasCorrect)}
        />
      )}

      {screen.kind === 'debrief' && (
        <Debrief
          chapter={chapter}
          examScore={screen.score}
          onReturn={() => setScreen({ kind: 'command-center' })}
          onRetry={() => setScreen({ kind: 'exam', index: 0, correct: 0 })}
        />
      )}

      <footer className="foot mono">
        MECHALC ACADEMY // MVP v0.1 // תוכן לפי docs/syllabus-he.md — כללי אצבע ללמידה, לא תחליף
        לבדיקה הנדסית
      </footer>
    </div>
  )
}
