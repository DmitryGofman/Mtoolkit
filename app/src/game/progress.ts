import type { PlayerState, ChapterProgress, Rank } from './types.ts'

const STORAGE_KEY = 'mechalc-academy-save-v1'

export const RANKS: Rank[] = [
  { minXp: 0, name: 'טירון', nameEn: 'RECRUIT' },
  { minXp: 120, name: 'חניך שדה', nameEn: 'CADET' },
  { minXp: 300, name: 'מפעיל', nameEn: 'OPERATOR' },
  { minXp: 550, name: 'מהנדס קרבי', nameEn: 'FIELD ENGINEER' },
  { minXp: 900, name: 'מפקד מכלול', nameEn: 'ASSEMBLY COMMANDER' },
  { minXp: 1400, name: 'קוונטרמאסטר', nameEn: 'QUARTERMASTER "Q"' },
]

export function rankFor(xp: number): Rank {
  let current = RANKS[0]
  for (const r of RANKS) if (xp >= r.minXp) current = r
  return current
}

export function nextRank(xp: number): Rank | null {
  for (const r of RANKS) if (xp < r.minXp) return r
  return null
}

export function emptyChapterProgress(): ChapterProgress {
  return { unitsRead: [], exercisesDone: {}, examScore: null, completed: false }
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
