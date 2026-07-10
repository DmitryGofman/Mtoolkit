import type { Chapter, LockedChapter } from '../game/types.ts'
import { chapter01 } from './chapter-01-bolts.ts'
import { chapter02 } from './chapter-02-drawings.ts'
import { chapter03 } from './chapter-03-assembly.ts'

/** Playable campaign, in operation order. Add new chapters here once reviewed. */
export const chapters: Chapter[] = [chapter01, chapter02, chapter03]

/** Not-yet-built operations, teased on the campaign map (docs/syllabus-he.md §3). */
export const lockedChapters: LockedChapter[] = [
  { number: 4, codename: 'OPERATION: CLOCKWORK', title: 'קליבה מכנית ומנגנונים' },
  { number: 5, codename: 'OPERATION: COLD STEEL', title: 'CNC ותכן לייצור' },
  { number: 6, codename: 'OPERATION: PRIME MOVER', title: 'בחירת מנועים ותנועה' },
  { number: 7, codename: 'OPERATION: EMISSARY', title: 'עבודה מול ספקים' },
  { number: 8, codename: 'OPERATION: PROVING GROUND', title: 'ניסויים, בדיקות ותיעוד' },
]
