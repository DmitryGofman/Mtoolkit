import type { Chapter, LockedChapter } from '../game/types.ts'
import { chapter01 } from './chapter-01-bolts.ts'
import { chapter02 } from './chapter-02-drawings.ts'
import { chapter03 } from './chapter-03-assembly.ts'
import { chapter04 } from './chapter-04-mechanisms.ts'
import { chapter05 } from './chapter-05-cnc.ts'

/** Playable campaign, in operation order. Add new chapters here once reviewed. */
export const chapters: Chapter[] = [chapter01, chapter02, chapter03, chapter04, chapter05]

/** Not-yet-built operations, teased on the campaign map (docs/syllabus-he.md §3). */
export const lockedChapters: LockedChapter[] = [
  { number: 6, codename: 'OPERATION: PRIME MOVER', title: 'בחירת מנועים ותנועה' },
  { number: 7, codename: 'OPERATION: EMISSARY', title: 'עבודה מול ספקים' },
  { number: 8, codename: 'OPERATION: PROVING GROUND', title: 'ניסויים, בדיקות ותיעוד' },
]
