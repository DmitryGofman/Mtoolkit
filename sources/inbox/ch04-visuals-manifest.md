# Chapter 4 visuals manifest — mechanical binding & basic mechanisms (קליבה מכנית ומנגנונים)

All images sourced from Wikimedia Commons only. License verified via the Commons API
(`action=query&prop=imageinfo&iiprop=extmetadata`) at download time. All licenses below
are within the allowed set (Public domain, CC0, CC BY, CC BY-SA).

Reused from existing assets (not re-downloaded): `steel-dowel-pins.jpg` already covers
dowel pins for the "locating with controlled freedom" topic — pair it with the kinematic
coupling diagram below (item 4) for the DOF/over-constraint angle.

---

## 1. ch04-linear-guide-rail.png

**Shows**: A technical/CAD-style diagram of a linear table rail guide — a profiled rail
with a recirculating-ball carriage block riding on it, viewed so the ball raceways and
the sliding block relative to the fixed rail are visible. It's a line-art/render style
diagram, not a photo, and appears grayscale. I did not personally examine the ball
raceway geometry closely — captioner should confirm the rail/carriage layout against the
image before writing precise Hebrew callouts (e.g. "how many rows of balls" is not fully
clear to me from the description alone).

**Source**: https://commons.wikimedia.org/wiki/File:Linear_table_rail_guide.png
**Author**: User:Silberwolf
**License**: CC BY-SA 2.5

**Suggested unit topic**: Linear guide rail / linear ball-bearing carriage — the
"1 translational DOF, 5 constrained" example for the DOF unit.

**Type**: Line-art diagram, needs a light plate/background cleanup treatment for the game UI (it's likely on a plain/white background already, but check contrast against the dark game panels).

---

## 2. ch04-ball-bearing-cross-section.png

**Shows**: An exploded/numbered technical diagram of a rolling-element (ball) bearing,
with callout numbers identifying: (1) outer ring, (2) ball, (3) cage, (4) ball race,
(5) inner ring. This is the classic labeled ball-bearing anatomy diagram from the
English Wikipedia "Ball bearing" article. Clean, precise, ideal for a captioned
teaching image — the five labeled parts map directly to Hebrew captions.

**Source**: https://commons.wikimedia.org/wiki/File:Rolling-element_bearing_(numbered).png
**Author**: User:Niabot
**License**: CC BY-SA 3.0

**Suggested unit topic**: Ball bearing cross-section / deep-groove bearing anatomy.

**Type**: Line-art/exploded diagram, needs a light plate.

---

## 3. ch04-plain-bearing-bushing.png

**Shows**: A technical cross-section/orthographic diagram of a plain (sliding) bearing
per DIN ISO 4379, "Type F" — a flanged plain bearing bushing. Shows the bushing
geometry (flange + bore) in section view, the kind of drawing used in a bearing
catalog/standard. It is a schematic/standard drawing, not a photographed part — I did
not verify every dimension line is legible at reduced size, so the captioner should zoom
in before placing exact labels.

**Source**: https://commons.wikimedia.org/wiki/File:Plain-bearing_DIN-ISO4379_Type-F.png
**Author**: User:Silberwolf
**License**: CC BY-SA 2.5

**Suggested unit topic**: Bushing / plain (sleeve) bearing.

**Type**: Line-art/technical diagram, needs a light plate.

---

## 4. ch04-kinematic-coupling.png

**Shows**: A CAD drawing of a Kelvin kinematic coupling — the classic three-groove,
three-ball exact-constraint mounting (one tetrahedral socket/cone, one V-groove, one
flat) that locates a rigid body in exactly 6 DOF with zero over-constraint. This is not
literally "a dowel pin in a slot," but it is the single clearest Commons image of the
underlying principle Chapter 4 is teaching — controlled/exact location vs. over-constraint
— and is a strong complement to the existing `steel-dowel-pins.jpg` asset (which shows
the hardware but not the constraint-counting principle). NOTE: I could not find a good
Commons photo/diagram of a literal "dowel pin + slot" or "slotted mounting hole on a
bracket" arrangement (see honesty note at the end) — this substitutes for that topic.

**Source**: https://commons.wikimedia.org/wiki/File:Kelvin_Kinematic_Coupling.png
**Author**: User:Imminent77
**License**: CC BY-SA 4.0

**Suggested unit topic**: Locating with controlled freedom / degrees-of-freedom /
avoiding over-constraint (pairs well with the dowel-pin photo already in the repo).

**Type**: Line-art/CAD diagram, needs a light plate.

---

## 5. ch04-six-dof.svg

**Shows**: The canonical "6 degrees of freedom of a rigid body" diagram — a 3D axis
frame (X, Y, Z) with arrows for the three translations and three rotations, each
direction labeled per the right-hand rule. This is the diagram used on Wikipedia's
"Six degrees of freedom" article. Vector/SVG, so it will scale cleanly to any size in
the game UI.

**Source**: https://commons.wikimedia.org/wiki/File:6DOF.svg
**Author**: User:GregorDS
**License**: CC BY-SA 4.0

**Suggested unit topic**: Degrees of freedom of a rigid body (core concept for the
over-constraint unit).

**Type**: Line-art/vector diagram, may need a light plate depending on its background (check transparency/white background against the dark game panel).

---

## 6. ch04-four-bar-linkage.svg

**Shows**: A labeled four-bar linkage diagram — four rigid links connected by four
revolute (pin) joints, one link fixed as the "ground" link, illustrating the basic
planar linkage/mechanism. This is a static schematic (not the animated version), which
is easier to caption and use as a still teaching image. Vector/SVG.

**Source**: https://commons.wikimedia.org/wiki/File:Linkage_four_bar.svg
**Author**: User:Salix alba
**License**: CC BY-SA 3.0

**Suggested unit topic**: Mechanism/linkage basics (four-bar linkage).

**Type**: Line-art/vector diagram, needs a light plate.

---

## 7. ch04-hinge-butt-annotated.jpg

**Shows**: A photo of a real butt hinge (the kind used on doors/cabinets), annotated by
the uploader specifically to illustrate that it is a revolute (pin/pivot) joint — i.e.
this photo was deliberately captured/annotated as a teaching image for the
hinge-as-a-kinematic-pair concept, which is exactly Chapter 4's angle. I have not
inspected what text/arrows the original annotation contains (may be in English — the
captioner should decide whether to keep, remove, or replace the annotation overlay
before use, or crop to the un-annotated hinge if a cleaner base photo is wanted).

**Source**: https://commons.wikimedia.org/wiki/File:Butt_Hinge_annotated.jpg
**Author**: User:JonRichfield
**License**: CC BY-SA 4.0

**Suggested unit topic**: Hinge/pivot joint (photo) — real-world example of a revolute
kinematic pair.

**Type**: Photo (already annotated by original author — review before using as-is).

---

## Topics I could NOT find good images for (being honest)

- **A literal "dowel pin + slot" or "slotted mounting hole on a bracket" diagram/photo**:
  searched many English and German terms (Langloch, locating pin slot fixture, diamond
  pin location system, elongated hole mounting, slotted hole bracket adjustment, etc.)
  and found nothing on Commons that clearly shows this specific arrangement — most
  results were unrelated scanned books/patents/genealogical records. Recommend either
  reusing the existing `steel-dowel-pins.jpg` alongside the new kinematic-coupling
  diagram (item 4) to teach the concept conceptually, or accept this as a gap and
  illustrate it with a simple in-house line-art diagram instead of a sourced photo.
- I did not find a Commons image of a **linear guide rail as a real photograph** (only
  the CAD/diagram version, item 1) — real photos of THK/Hiwin-style linear guide blocks
  either weren't on Commons under the terms I tried, or were buried under unrelated rail
  (railway) results, which dominate any search containing the word "rail."

## Notes on process

- Wikimedia Commons API rate-limited (HTTP 429) a couple of times during search; all
  requests were re-tried after backing off per the `Retry-After` header, so no auth
  bypass or rate-limit workaround was used.
- All files verified with `file` after download to confirm they are genuine PNG/JPEG/SVG
  data (not error pages), and license/artist fields were checked via
  `extmetadata.LicenseShortName` before download in every case.
