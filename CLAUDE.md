# MECHALC ACADEMY — agent conventions

## What this is
A Hebrew (RTL) game-styled learning platform for young mechanical engineers.
The game engine lives in `app/`, learning content is pure data in `app/src/content/`,
and the knowledge base ("codex") lives in `docs/` and `sources/`.

## Ground rules
- **Source of truth**: `docs/syllabus-he.md` (what to teach), `docs/lesson-template-he.md`
  (unit structure), `docs/learning-platform-architecture-he.md` (product intent).
- **No invented engineering data.** Never state numeric manufacturing data (tap drill
  diameters, torques, tolerances, material strengths) without a verified source in
  `sources/verified/`. Conceptual teaching is fine; mark anything unverified with
  `[דורש אימות]`.
- **Rules of thumb** must include their limits (`caveat` field is mandatory).
- **Content ≠ engine.** New chapters are data files conforming to `Chapter` in
  `app/src/game/types.ts`. Do not fork the engine per chapter; extend the schema
  only when a new exercise type genuinely requires it.
- Content language is Hebrew; HUD/codename strings are English (that's the design).
- Design system: all styling in `app/src/styles.css` using the existing CSS variables
  (`--cyan`, `--gold`, `--red`, `--green`, clipped panels). No UI libraries.

## Verify before pushing
```bash
cd app && npm run build   # tsc + vite build must pass
```
For UI changes, drive the real flow in a browser (vite preview + Playwright with
executablePath `/opt/pw-browsers/chromium`) and look at screenshots.
