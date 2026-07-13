import type { Chapter, LockedChapter } from '../game/types.ts'
import { chapter01 } from './chapter-01-bolts.ts'
import { chapter02 } from './chapter-02-drawings.ts'
import { chapter03 } from './chapter-03-assembly.ts'
import { chapter04 } from './chapter-04-mechanisms.ts'
import { chapter05 } from './chapter-05-cnc.ts'
import { chapter06 } from './chapter-06-motors.ts'
import { chapter07 } from './chapter-07-suppliers.ts'
import { chapter08 } from './chapter-08-testing.ts'
import { chapter09 } from './chapter-09-laser-sheetmetal.ts'
import { chapter10 } from './chapter-10-printing.ts'
import { chapter11 } from './chapter-11-welding.ts'
import { chapter12 } from './chapter-12-fabrication.ts'
import { chapter13 } from './chapter-13-carpentry.ts'
import { chapter14 } from './chapter-14-textiles.ts'
import { chapter15 } from './chapter-15-zivud.ts'
import { chapter16 } from './chapter-16-metrology.ts'
import { chapter17 } from './chapter-17-drawings-deep.ts'

/** Playable campaign, in operation order. Add new chapters here once reviewed. */
export const chapters: Chapter[] = [
  chapter01,
  chapter02,
  chapter17, // in-depth annex to OPERATION: BLUEPRINT — advanced drawing literacy
  chapter03,
  chapter04,
  chapter05,
  chapter06,
  chapter07,
  chapter08,
  chapter09,
  chapter10,
  chapter11,
  chapter12,
  chapter13,
  chapter14,
  chapter15,
  chapter16, // enrichment op — practical metrology
]

/**
 * Not-yet-built operations, teased on the campaign map.
 * Manufacturing-process expansion per docs/syllabus-he.md §14 — each of these
 * follows the CNC-chapter pattern (process capabilities, DFM rules of thumb,
 * talking to the craftsman, pre-release checklist). To be produced by the
 * agent team; keep numbering stable when promoting to a playable chapter.
 */
export const lockedChapters: LockedChapter[] = []
