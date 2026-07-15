import { useEffect, useMemo, useRef, useState } from 'react'
import { chapters, lockedChapters } from './content/index.ts'
import {
  loadState,
  saveState,
  resetState,
  normalizeProgress,
  computeXp,
  rankFor,
  careerStats,
} from './game/progress.ts'
import type { PlayerState, ChapterProgress, ResumePoint, Rank } from './game/types.ts'
import { sound } from './game/sound.ts'
import { Hud } from './components/Hud.tsx'
import { CommandCenter } from './components/CommandCenter.tsx'
import { Briefing } from './components/Briefing.tsx'
import { IntelUnit } from './components/IntelUnit.tsx'
import { ExercisePanel } from './components/ExercisePanel.tsx'
import { Debrief } from './components/Debrief.tsx'
import { Dossier } from './components/Dossier.tsx'
import { Datapad } from './components/Datapad.tsx'
import { RankUp } from './components/RankUp.tsx'
import { referenceTables, plannedTables } from './content/tables/index.ts'

type Screen =
  | { kind: 'command-center' }
  | { kind: 'briefing' }
  | { kind: 'intel'; index: number }
  | { kind: 'practice'; index: number }
  | { kind: 'exam'; index: number }
  | { kind: 'debrief'; score: number }
  | { kind: 'dossier' }
  | { kind: 'datapad'; tableId?: string }

export default function App() {
  const [player, setPlayer] = useState<PlayerState>(loadState)
  const [activeId, setActiveId] = useState(chapters[0].id)
  const [screen, setScreen] = useState<Screen>({ kind: 'command-center' })

  const chapter = chapters.find((c) => c.id === activeId) ?? chapters[0]
  const progress = normalizeProgress(player.chapters[activeId])

  // XP is derived from saved progress — it can never double-count or drift.
  const xp = useMemo(() => computeXp(chapters, player.chapters), [player.chapters])

  // Fire the promotion cinematic when the player crosses a rank threshold.
  const prevRankRef = useRef<Rank>(rankFor(xp))
  const [rankUp, setRankUp] = useState<Rank | null>(null)
  useEffect(() => {
    const r = rankFor(xp)
    if (r.minXp > prevRankRef.current.minXp) setRankUp(r)
    prevRankRef.current = r
  }, [xp])

  // Advancing to any new screen returns the reader to the top of the page.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 })
  }, [screen])

  /** Persist a mutation to the active chapter's progress. */
  function updateProgress(mutate: (p: ChapterProgress) => void) {
    const next: ChapterProgress = {
      ...progress,
      unitsRead: [...progress.unitsRead],
      exercisesDone: { ...progress.exercisesDone },
      answers: { ...progress.answers },
    }
    mutate(next)
    const nextPlayer: PlayerState = {
      ...player,
      chapters: { ...player.chapters, [activeId]: next },
    }
    nextPlayer.xp = computeXp(chapters, nextPlayer.chapters)
    setPlayer(nextPlayer)
    saveState(nextPlayer)
  }

  /** Record where the learner is, so leaving and returning resumes here. */
  function saveResume(point: ResumePoint | null) {
    updateProgress((p) => {
      p.resume = point
    })
  }

  function resumeToScreen(r: ResumePoint): Screen {
    return r.kind === 'briefing' ? { kind: 'briefing' } : { ...r }
  }

  function deploy(chapterId: string) {
    setActiveId(chapterId)
    const p = normalizeProgress(player.chapters[chapterId])
    setScreen(p.resume ? resumeToScreen(p.resume) : { kind: 'briefing' })
  }

  function goHome() {
    // Resume is already saved on each in-chapter step, so we keep it.
    setScreen({ kind: 'command-center' })
  }

  // Remember where the dossier was opened from, so closing it returns there.
  const dossierReturnRef = useRef<Screen>({ kind: 'command-center' })
  function openDossier() {
    if (screen.kind !== 'dossier') dossierReturnRef.current = screen
    setScreen({ kind: 'dossier' })
  }
  function closeDossier() {
    setScreen(dossierReturnRef.current)
  }

  // Same return-to-origin pattern for the Datapad reference library.
  const datapadReturnRef = useRef<Screen>({ kind: 'command-center' })
  function openDatapad(tableId?: string) {
    if (screen.kind !== 'datapad') datapadReturnRef.current = screen
    setScreen({ kind: 'datapad', tableId })
  }
  function closeDatapad() {
    setScreen(datapadReturnRef.current)
  }

  function startChapter() {
    saveResume({ kind: 'intel', index: 0 })
    setScreen({ kind: 'intel', index: 0 })
  }

  function completeIntel(index: number) {
    const unit = chapter.units[index]
    updateProgress((p) => {
      if (!p.unitsRead.includes(unit.id)) p.unitsRead = [...p.unitsRead, unit.id]
      p.resume =
        index + 1 < chapter.units.length
          ? { kind: 'intel', index: index + 1 }
          : { kind: 'practice', index: 0 }
    })
    if (index + 1 < chapter.units.length) setScreen({ kind: 'intel', index: index + 1 })
    else setScreen({ kind: 'practice', index: 0 })
  }

  function answerExercise(exId: string, originalIndex: number, firstTryCorrect: boolean) {
    updateProgress((p) => {
      p.answers[exId] = originalIndex
      // First-try correctness is locked in on the first attempt only.
      if (!(exId in p.exercisesDone)) p.exercisesDone[exId] = firstTryCorrect
    })
  }

  function completePractice(index: number) {
    const next: { kind: 'practice'; index: number } | { kind: 'exam'; index: number } =
      index + 1 < chapter.exercises.length
        ? { kind: 'practice', index: index + 1 }
        : { kind: 'exam', index: 0 }
    saveResume(next)
    setScreen(next)
  }

  function completeExamQuestion(index: number) {
    if (index + 1 < chapter.finalExam.length) {
      const next = { kind: 'exam', index: index + 1 } as const
      saveResume(next)
      setScreen(next)
      return
    }
    // Score the whole exam from the saved answers (consistent under back-nav).
    const correct = chapter.finalExam.filter((q) => {
      const oi = progress.answers[q.id]
      return oi != null && q.options[oi]?.correct
    }).length
    const score = Math.round((correct / chapter.finalExam.length) * 100)
    updateProgress((p) => {
      if (p.examScore == null || score > p.examScore) p.examScore = score
      if (score >= 60) p.completed = true
      p.resume = null // chapter run finished
    })
    sound.complete()
    setScreen({ kind: 'debrief', score })
  }

  /** Step backward through the chapter flow. */
  function back() {
    if (screen.kind === 'intel') {
      if (screen.index > 0) navTo({ kind: 'intel', index: screen.index - 1 })
      else navTo({ kind: 'briefing' })
    } else if (screen.kind === 'practice') {
      if (screen.index > 0) navTo({ kind: 'practice', index: screen.index - 1 })
      else navTo({ kind: 'intel', index: chapter.units.length - 1 })
    } else if (screen.kind === 'exam') {
      if (screen.index > 0) navTo({ kind: 'exam', index: screen.index - 1 })
      else navTo({ kind: 'practice', index: chapter.exercises.length - 1 })
    }
  }

  /** Navigate to a screen and remember it as the resume point. */
  function navTo(next: Screen) {
    if (next.kind !== 'command-center' && next.kind !== 'debrief') {
      saveResume(next.kind === 'briefing' ? { kind: 'briefing' } : (next as ResumePoint))
    }
    setScreen(next)
  }

  function reset() {
    const cleared = resetState()
    setPlayer(cleared)
    setActiveId(chapters[0].id)
    setScreen({ kind: 'command-center' })
  }

  return (
    <div className="app">
      <div className="bg-grid" aria-hidden />
      <div className="bg-scanline" aria-hidden />
      <Hud
        xp={xp}
        onReset={reset}
        onHome={screen.kind === 'command-center' ? undefined : goHome}
        onDossier={screen.kind === 'dossier' ? undefined : openDossier}
        onDatapad={screen.kind === 'datapad' ? undefined : () => openDatapad()}
      />

      {screen.kind === 'command-center' && (
        <CommandCenter
          chapters={chapters}
          locked={lockedChapters}
          progressFor={(id) => normalizeProgress(player.chapters[id])}
          onDeploy={deploy}
        />
      )}

      {screen.kind === 'briefing' && <Briefing chapter={chapter} onStart={startChapter} />}

      {screen.kind === 'intel' && (
        <IntelUnit
          key={chapter.units[screen.index].id}
          unit={chapter.units[screen.index]}
          index={screen.index}
          total={chapter.units.length}
          onBack={back}
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
          savedAnswer={progress.answers[chapter.exercises[screen.index].id] ?? null}
          onAnswer={(oi, first) => answerExercise(chapter.exercises[screen.index].id, oi, first)}
          onBack={back}
          onComplete={() => completePractice(screen.index)}
        />
      )}

      {screen.kind === 'exam' && (
        <ExercisePanel
          key={chapter.finalExam[screen.index].id}
          exercise={chapter.finalExam[screen.index]}
          index={screen.index}
          total={chapter.finalExam.length}
          mode="exam"
          savedAnswer={progress.answers[chapter.finalExam[screen.index].id] ?? null}
          onAnswer={(oi, first) => answerExercise(chapter.finalExam[screen.index].id, oi, first)}
          onBack={back}
          onComplete={() => completeExamQuestion(screen.index)}
        />
      )}

      {screen.kind === 'debrief' && (
        <Debrief
          chapter={chapter}
          examScore={screen.score}
          relatedTables={referenceTables.filter((t) => t.relatedChapter === chapter.id)}
          onOpenTable={openDatapad}
          onReturn={goHome}
          onRetry={() => navTo({ kind: 'exam', index: 0 })}
        />
      )}

      {screen.kind === 'dossier' && (
        <Dossier xp={xp} stats={careerStats(chapters, player.chapters)} onReturn={closeDossier} />
      )}

      {screen.kind === 'datapad' && (
        <Datapad
          key={screen.tableId ?? 'library'}
          tables={referenceTables}
          planned={plannedTables}
          initialTableId={screen.tableId}
          onReturn={closeDatapad}
        />
      )}

      {rankUp && <RankUp rank={rankUp} onClose={() => setRankUp(null)} />}

      <footer className="foot mono">
        MECHALC ACADEMY // MVP v0.3 // תוכן לפי docs/syllabus-he.md — כללי אצבע ללמידה, לא תחליף
        לבדיקה הנדסית
      </footer>
    </div>
  )
}
