// ===== Content schema =====
// Content lives in src/content/* as data conforming to these types.
// The game engine renders any chapter that satisfies this schema —
// future chapters are added by dropping in a new content file.

/**
 * A real image/diagram asset. NEVER invented: every visual is downloaded from a
 * verified public source (e.g. Wikimedia Commons) into app/public/visuals/ and
 * must carry author + license attribution. Catalog: sources/verified/visual-assets.md
 */
export interface Visual {
  src: string // path under public/, e.g. 'visuals/spring-analogy.jpg'
  caption: string // Hebrew caption tying the visual to the lesson
  credit: string // author / origin, shown small
  license: string // e.g. 'Public domain', 'CC BY-SA 4.0'
  sourceUrl: string // the Commons (or other) page the asset came from
  plate?: boolean // true for line-art diagrams that need a light backing plate
}

export interface Concept {
  term: string
  termEn: string
  definition: string
}

export interface RuleOfThumb {
  rule: string
  caveat: string // when the rule is NOT enough — keeps rules-of-thumb honest
}

export interface CommonMistake {
  mistake: string
  why: string
  damage: string
  prevention: string
}

/** A lesson unit — rendered as an "INTEL FILE" in the game. */
export interface IntelUnit {
  id: string
  codename: string // English HUD codename, e.g. "GRIP-01"
  title: string
  openingScenario: string // real-world failure story that motivates the unit
  openingQuestion: string
  briefing: string[] // short explanation, paragraph per entry
  visuals?: Visual[] // real diagrams/photos rendered as a "VISUAL INTEL" block
  concepts: Concept[]
  ruleOfThumb: RuleOfThumb
  commonMistake: CommonMistake
  xp: number
}

// ===== Reference tables (the Datapad codex) =====

export interface TableColumn {
  label: string // Hebrew column header
  labelEn: string // engineering designation, e.g. "Tap drill Ø (mm)"
  numeric?: boolean // numeric columns render LTR inside the RTL layout
}

/**
 * A verified engineering reference table — a page in the "ENGINEER'S DATAPAD".
 * NEVER invented: values are extracted only from a verified source in
 * sources/verified/ and cross-checked against an independent source (or read
 * from the governing standard itself). Evidence: sources/verified/reference-tables.md
 */
export interface ReferenceTable {
  id: string
  codename: string // English HUD codename, e.g. "DATA-01 // TAP DRILL"
  title: string // Hebrew title
  standard: string // governing standard, e.g. "ISO 273:1979"
  intro: string // one Hebrew sentence: what you use this table for
  columns: TableColumn[]
  rows: (string | number)[][] // row-major, aligned to columns
  caveat: string // limits of validity — mandatory, like RuleOfThumb
  sourceId: string // SRC-TBL-xxx record in sources/source-index.md
  sourceNote: string // Hebrew one-liner: how the values were verified
  unlockedBy: string // chapter id whose completion unlocks it in the Datapad
}

/** A table that is planned but not yet sourced/verified — teased locked in the Datapad. */
export interface PlannedTable {
  codename: string
  title: string
  standard: string
}

export interface ExerciseOption {
  text: string
  correct: boolean
  feedback: string // explains WHY, and what would happen in the field
}

/** A decision scenario — rendered as a "FIELD OP" in the game. */
export interface Exercise {
  id: string
  codename: string
  scenario: string
  visual?: Visual // optional scene-setting image; must never reveal the answer
  tableRefs?: string[] // ReferenceTable ids opened inline — for table-lookup exercises
  question: string
  options: ExerciseOption[]
  skill: string // the measured skill, e.g. "בחירת אורך בורג"
  xp: number
}

export interface Chapter {
  id: string
  number: number
  codename: string // e.g. "OPERATION: IRON GRIP"
  title: string
  banner?: string // cinematic hero banner (16:9) shown on briefing + campaign card
  epigraph: string // Dune-style aphorism shown on the briefing screen
  description: string
  objectives: string[]
  units: IntelUnit[]
  exercises: Exercise[] // practice ops, immediate feedback
  finalExam: Exercise[] // "BOSS FIGHT" — scored, gates chapter completion
  checklist: string[] // practical field checklist unlocked on completion
}

/** Chapters not yet built — shown locked on the campaign map. */
export interface LockedChapter {
  number: number
  codename: string
  title: string
}

// ===== Progression =====

export interface Rank {
  minXp: number
  name: string
  nameEn: string
  badge: string // emblem art (public/badges/*), shown in HUD, dossier and promotions
}

/** Where the learner is inside a chapter — used to resume after leaving. */
export type ResumePoint =
  | { kind: 'briefing' }
  | { kind: 'intel'; index: number }
  | { kind: 'practice'; index: number }
  | { kind: 'exam'; index: number }

export interface ChapterProgress {
  unitsRead: string[]
  exercisesDone: Record<string, boolean> // id -> answered correctly on first try
  answers: Record<string, number> // exerciseId -> picked ORIGINAL option index (persists answers)
  examScore: number | null // percent, null until attempted
  completed: boolean
  resume: ResumePoint | null // last position in this chapter, for resume-where-you-left-off
}

export interface PlayerState {
  /** Cached total; the source of truth is computeXp() over `chapters`. */
  xp: number
  chapters: Record<string, ChapterProgress>
}
