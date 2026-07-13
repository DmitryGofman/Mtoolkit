import type { PlayerState, ChapterProgress, Rank, Chapter } from './types.ts'

const STORAGE_KEY = 'mechalc-academy-save-v1'

// Rank thresholds are scaled to the real XP economy (~6800 XP available across
// all 16 chapters), so the bar progresses steadily instead of maxing out early.
export const RANKS: Rank[] = [
  { minXp: 0, name: 'טירון', nameEn: 'RECRUIT', badge: 'badges/rank-01.jpg' },
  { minXp: 450, name: 'חניך שדה', nameEn: 'CADET', badge: 'badges/rank-02.jpg' },
  { minXp: 1100, name: 'מפעיל', nameEn: 'OPERATOR', badge: 'badges/rank-03.jpg' },
  { minXp: 1900, name: 'מהנדס קרבי', nameEn: 'FIELD ENGINEER', badge: 'badges/rank-04.jpg' },
  { minXp: 2800, name: 'מפקד מכלול', nameEn: 'ASSEMBLY COMMANDER', badge: 'badges/rank-05.jpg' },
  { minXp: 3900, name: 'מהנדס מערכות', nameEn: 'SYSTEMS ENGINEER', badge: 'badges/rank-06.jpg' },
  { minXp: 5100, name: 'מהנדס ראשי', nameEn: 'CHIEF ENGINEER', badge: 'badges/rank-07.jpg' },
  { minXp: 6200, name: 'קוורטרמאסטר', nameEn: 'QUARTERMASTER "Q"', badge: 'badges/rank-08.jpg' },
]

/**
 * Single source of truth for XP: derive it from saved progress instead of
 * incrementing a counter. This makes XP immune to double-counting on exam
 * retakes or back-navigation — the same progress always yields the same XP.
 */
export function computeXp(defs: Chapter[], chapters: Record<string, ChapterProgress>): number {
  let xp = 0
  for (const c of defs) {
    const p = chapters[c.id]
    if (!p) continue
    for (const u of c.units) if (p.unitsRead.includes(u.id)) xp += u.xp
    for (const e of c.exercises) if (p.exercisesDone[e.id]) xp += e.xp
    if (p.examScore != null && c.finalExam.length) {
      const correct = Math.round((p.examScore / 100) * c.finalExam.length)
      xp += correct * c.finalExam[0].xp
    }
  }
  return xp
}

export function rankFor(xp: number): Rank {
  let current = RANKS[0]
  for (const r of RANKS) if (xp >= r.minXp) current = r
  return current
}

export function nextRank(xp: number): Rank | null {
  for (const r of RANKS) if (xp < r.minXp) return r
  return null
}

/** Zero-based ladder position of a rank (0 = RECRUIT). */
export function rankIndex(rank: Rank): number {
  return RANKS.findIndex((r) => r.minXp === rank.minXp)
}

export interface CareerStats {
  chaptersCompleted: number
  chaptersTotal: number
  unitsRead: number
  exercisesSolved: number
  examsPassed: number
  avgExamScore: number | null // percent across attempted exams
  bestExamScore: number | null
}

/** Aggregate progress across the whole campaign, for the dossier screen. */
export function careerStats(
  defs: Chapter[],
  chapters: Record<string, ChapterProgress>,
): CareerStats {
  let chaptersCompleted = 0
  let unitsRead = 0
  let exercisesSolved = 0
  let examsPassed = 0
  const scores: number[] = []
  for (const c of defs) {
    const p = chapters[c.id]
    if (!p) continue
    if (p.completed) chaptersCompleted++
    unitsRead += p.unitsRead.length
    exercisesSolved += Object.values(p.exercisesDone).filter(Boolean).length
    if (p.examScore != null) {
      scores.push(p.examScore)
      if (p.examScore >= 60) examsPassed++
    }
  }
  return {
    chaptersCompleted,
    chaptersTotal: defs.length,
    unitsRead,
    exercisesSolved,
    examsPassed,
    avgExamScore: scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null,
    bestExamScore: scores.length ? Math.max(...scores) : null,
  }
}

export function emptyChapterProgress(): ChapterProgress {
  return { unitsRead: [], exercisesDone: {}, answers: {}, examScore: null, completed: false, resume: null }
}

/** Fill in fields missing from older saves so navigation/XP stay consistent. */
export function normalizeProgress(p: Partial<ChapterProgress> | undefined): ChapterProgress {
  return {
    unitsRead: p?.unitsRead ?? [],
    exercisesDone: p?.exercisesDone ?? {},
    answers: p?.answers ?? {},
    examScore: p?.examScore ?? null,
    completed: p?.completed ?? false,
    resume: p?.resume ?? null,
  }
}

export function loadState(): PlayerState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as PlayerState
  } catch {
    // corrupted save — start fresh
  }
  return { xp: 0, chapters: {} }
}

export function saveState(state: PlayerState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // storage unavailable (private mode etc.) — play without persistence
  }
}

export function resetState(): PlayerState {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
  return { xp: 0, chapters: {} }
}
