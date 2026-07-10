# Chapter 2 visuals manifest — קריאת שרטוט (reading mechanical drawings)

All images sourced from Wikimedia Commons on 2026-07-10. Downloaded files live in
`app/public/visuals/`, prefixed `ch02-`. License verified via the Commons API
(`imageinfo` / `extmetadata.LicenseShortName`) at download time — see the exact
license string quoted per image below.

---

## ch02-first-angle-projection.svg

**Shows**: A "glass box" diagram of first-angle orthographic projection: a 3D
L-shaped object suspended between three projection planes (top, front-left,
front-right), with red arrows showing the direction of projection onto each
plane, and dotted construction lines linking the 3D corners to their projected
outlines. This is the classic diagram used to explain *why* a front/top/side
view lines up the way it does — good as the lead image for "what is
orthographic projection."

**Commons page**: https://commons.wikimedia.org/wiki/File:First_angle_projection.svg
**Author**: Emok
**License**: CC BY-SA 3.0
**Suggested topic**: 1 — Orthographic projection / multiview drawing
**Type**: Line-art SVG (vector, no background — will need a light background plate; line color is black/gray/red, should sit fine on a white or very light panel, may need a filled rect background if the app's panel is dark since the SVG itself has a transparent background).

---

## ch02-section-view-line-types.svg

**Shows**: A small multiview drawing of a plate-like part (top view, front
view, left-side view) plus a separate "SECTION AA" view at the bottom. Line
types are color-coded for teaching: black = object outline + section hatching,
red dashed = hidden line, blue dash-dot = center line, magenta = the cutting-plane
line with arrows and "A" labels showing the direction of sight for the section.
The bottom strip shows the same part's cross-section with 45° hatching in two
separate solid regions. This is a strong single image for teaching both "what a
cutting-plane line means" and "what section hatching looks like," and
incidentally reinforces line-type conventions (hidden/center/cutting-plane).

**Commons page**: https://commons.wikimedia.org/wiki/File:Mech_draw_1.svg
**Author**: HereToHelp, based on earlier work by BAxelrod
**License**: CC BY-SA 3.0
**Suggested topic**: 2 — Section view (cut/hatching) example diagram
**Type**: Line-art SVG, transparent background, will need a light background plate.

---

## ch02-din-hsk-tool-holder.png

**Shows**: A real, standards-based mechanical drawing of an HSK-63A hollow
shaft taper tool holder (per DIN 69893) — the kind of tool-holder cone used in
CNC machine spindles. Left: a front section view (labeled implicitly, hatched)
with full dimensioning — diameters (⌀40, ⌀34, ⌀55, ⌀63), lengths (32, 18, 26,
46), a 60° chamfer angle, and a 1:9.98 taper callout with a 2.87° half-angle
note. Right: an end view (section B-B) showing the drive-slot/flange pattern
as concentric circles. This is a genuine dimensioned part drawing with a
section view baked in — it can anchor either the "dimensioned drawing" topic
or the "section view" topic; I used it for the dimensioned-drawing slot since
the other file already covers section-view teaching.

**Commons page**: https://commons.wikimedia.org/wiki/File:DIN_69893_hsk_63a_drawing.png
**Author**: Sven Gleich
**License**: CC BY-SA 2.5
**Suggested topic**: 3 — A real dimensioned engineering drawing of a simple part (also usable for topic 2, section view)
**Type**: Line-art PNG (grayscale, white background already — no background plate needed).

---

## ch02-dimensioning-example.svg

**Shows**: A flat, irregular bracket/plate part (outline with two mounting
tabs, several fillets marked R5, two small bolt holes, and one large central
bore ⌀44.38 with a R32.6 note) fully dimensioned in the metric/decimal style —
overall width/height (75.45 × 94.07), offset dimensions to hole centers, and a
tilted dimension chain (41.37, 12.24, 16.9, 10) on the angled tab. This is a
clean second example of a fully dimensioned 2D part outline, without any
section/hatching, useful if the unit wants a "pure dimensioning" example
separate from the HSK drawing above.

**Commons page**: https://commons.wikimedia.org/wiki/File:AcotacionTecnico.svg
**Author**: Wedrey
**License**: CC BY-SA 3.0
**Suggested topic**: 3 — A real dimensioned engineering drawing of a simple part (supplementary/second example)
**Type**: Line-art SVG, white background already baked into the graphic (double-check on render — if transparent, will need a light plate).

---

## ch02-roughness-symbols.svg

**Shows**: A set of surface-roughness ("finish") symbols side by side — the
basic checkmark/tick symbol in its variants: plain surface symbol, symbol with
material-removal-required bar, symbol with material-removal-prohibited circle,
and symbol with the extended horizontal line for adding notes (machining
method, roughness value, etc.). It's a reference sheet rather than a single
symbol in context, which makes it good for teaching "here are the symbol
variants and what each modification means."

**Commons page**: https://commons.wikimedia.org/wiki/File:Roughness_symbols.svg
**Author**: Zielu20 (Adam Zieliński)
**License**: Public domain
**Suggested topic**: 4 — Surface roughness symbol / surface finish notation
**Type**: Line-art SVG, transparent background, will need a light background plate.

---

## ch02-fits-passungsarten.jpg

**Shows**: A German-labeled diagram titled "Verschiedene Passungsarten"
(different types of fits), with three stacked panels: (1) **Spielpassung**
(clearance fit) — hole tolerance zone (green hatching) drawn entirely above
the shaft tolerance zone (red hatching), with S₀/Sᵤ (upper/lower clearance)
labeled; (2) **Übergangspassung** (transition fit) — the two tolerance zones
overlap, with two example cases shown, S₀ and Ü₀ labeled; (3) **Presspassung /
Übermaßpassung** (interference/press fit) — the shaft zone sits entirely
above (larger than) the hole zone, with Üᵤ/Ü₀ (lower/upper interference)
labeled. "Toleranzfeld Bohrung" = hole tolerance zone, "Toleranzfeld Welle" =
shaft tolerance zone. This is a textbook-quality diagram of the three fit
categories — the German labels will need to be re-lettered/replaced with
Hebrew captions, but the geometry (stacked tolerance-zone bars) is exactly the
standard way this is taught.

**Commons page**: https://commons.wikimedia.org/wiki/File:Passungsarten.jpg
**Author**: Badsaiyaman (de.wikipedia)
**License**: CC BY-SA 3.0
**Suggested topic**: 5 — Engineering fits/tolerance diagram (hole/shaft, clearance vs interference)
**Type**: Diagram/line-art JPG (flat color fills, white background) — treat like a photo for licensing/crediting purposes but it renders fine on any background since it already has a white background.

---

## ch02-micrometer-measuring.jpg

**Shows**: A real photo (not staged) of a US Navy sailor (Machinery Repairman
3rd Class Floyd Francis) using an outside micrometer to measure a small dark
metal part in a machine shop aboard USS George Washington. His hands hold both
the part and the micrometer frame, thimble is visible mid-scale — a genuine
"measuring a workpiece" moment rather than a tool lying on a bench. Original
caption: "uses a micrometer to measure metal stock in the Machine Shop."

**Commons page**: https://commons.wikimedia.org/wiki/File:US_Navy_040703-N-9954W-031_Machinery_Repairman_3rd_Class_Floyd_Francis,_of_Ocala,_Fla.,_uses_a_micrometer_to_measure_metal_stock_in_the_Machine_Shop_aboard_the_Nimitz-class_aircraft_carrier_USS_George_Washington_CVN_73.jpg
**Author**: U.S. Navy photo by Photographer's Mate Airman Andrew Wallace
**License**: Public domain (US government work)
**Suggested topic**: 6 — Caliper or micrometer measuring a part (photo)
**Type**: Photo.

---

## ch02-title-block-iso7200.svg

**Shows**: A clean, standalone example of a drawing title block laid out per
EN ISO 7200, in English, with example values filled in: "Responsible dep.",
"Technical reference", "Creator", "Approval person" in a top row; then
"Document type" = "P&I Diagram", "Document status" = "First issue", company
name "Wikimedia Commons", "Title" = "Feed unit with tank", "Identification
number", and "Rev." / "Date of issue" / "Sheet" fields at bottom right. Even
though the example content is about a P&I diagram (not a mechanical part),
the *layout and field structure* is exactly the ISO title-block convention —
good for teaching "these are the boxes every drawing's title block has and
what goes in each."

**Commons page**: https://commons.wikimedia.org/wiki/File:Title_block_EN_ISO_7200.svg
**Author**: Con-struct
**License**: CC BY-SA 3.0
**Suggested topic**: 7 — Drawing title block / BOM
**Type**: Line-art SVG with a white background already included (renders fine standalone; the example text ("Wikimedia Commons", "Feed unit with tank") will need to be pointed out/covered or captioned around, since it's not the eventual field labels students should copy verbatim).

---

## ch02-worm-gear-assembly-bom.png

**Shows**: A complete real engineering assembly drawing (worm gear reducer /
"Schneckengetriebe", made in Solid Edge) with: two section views (A-A, top
left; B-B, top right) with hatching showing the internal gears, bearings,
seals and shaft; a plan/front view (bottom left) with the two section
cutting-plane lines (A-A, B-B) marked; balloon-style leader lines numbering
21 distinct components; a full **bill of materials table** (Stückliste) on
the right listing item number, quantity, unit, description (Benennung),
material/standard number, and remarks for every part (e.g. "1 — Gehäuse —
G-AlSi10Mg" = housing, cast aluminum alloy; "9 — 2 — Rillenkugellager — DIN
625-6009" = deep-groove ball bearing to DIN 625); and a small **title block**
at the bottom right with date/name/checked-by fields and the drawing title
"Schneckengetriebe", sheet number. This single image is the best real-world
example of a title block AND a BOM AND section views appearing together on
one production drawing — genuinely representative of what a real mechanical
assembly drawing looks like. All labels are German; will need Hebrew
captioning/callout translation, but the visual structure (sectioned views +
numbered leaders + BOM table + title block) is universal and worth teaching
from directly.

**Commons page**: https://commons.wikimedia.org/wiki/File:Schneckengetriebe.png
**Author**: Thorsten Hartmann (Thgoiter)
**License**: CC BY-SA 3.0
**Suggested topic**: 7 — Drawing title block / BOM (also strong for topic 2, section views, and as a "real full drawing" reference)
**Type**: Line-art PNG, white background already included, no plate needed.

---

## Topics not covered by a dedicated fresh image

- None of the 7 requested topics are completely uncovered — every topic has at
  least one image above. Topics 3 and 7 each got two images because strong
  candidates kept turning up and each one taught a genuinely different aspect
  (a single real part vs. a full assembly with BOM; a schematic title block vs.
  one embedded in a real drawing).
- I could **not** find a good third-angle-vs-first-angle *side-by-side*
  comparison image with a permissive license — Commons has separate small ISO
  projection-symbol SVGs (`First_angle_projection_symbol.svg`,
  `Third_angle_projection_symbol.svg`, both public domain) that show the two
  ISO symbols (truncated-cone glyphs) individually, but I did not download
  them since `ch02-first-angle-projection.svg` already covers the core
  "glass box" teaching concept and adding two more small symbol files felt
  like it diluted the set rather than strengthening it. If the lesson author
  wants the explicit ISO symbol glyphs (the two truncated-cone icons placed
  in a drawing's title block to indicate projection convention), those two
  files are easy follow-up downloads:
  - https://commons.wikimedia.org/wiki/File:First_angle_projection_symbol.svg (Public domain)
  - https://commons.wikimedia.org/wiki/File:Third_angle_projection_symbol.svg (Public domain)

## Notes on backgrounds

Several SVGs (`ch02-first-angle-projection.svg`, `ch02-section-view-line-types.svg`,
`ch02-roughness-symbols.svg`) have transparent backgrounds and will need a
light background plate/panel when placed in the game UI, consistent with how
`machined-holes.svg` etc. are already handled elsewhere in the app. The two
PNG line-art drawings and the two remaining SVGs already have opaque white
backgrounds baked in.
