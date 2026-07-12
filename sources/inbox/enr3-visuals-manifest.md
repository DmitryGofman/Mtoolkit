# Enrichment visuals manifest — datums, accuracy/precision, cardan joint, friction

## (enr3- : ch2 drawing datums, ch16 metrology accuracy vs precision, ch4 mechanisms
## cardan/universal joint and friction)

All images sourced from Wikimedia Commons only. License verified via the Commons API
(`action=query&prop=imageinfo&iiprop=extmetadata`) before download; only Public domain,
CC0, CC BY, and CC BY-SA files were accepted, everything else rejected (nothing
non-free was downloaded). Files saved to `app/public/visuals/` with the `enr3-`
prefix. SVG kept at its original vector source; raster images downloaded via
`thumburl` at ≤1280px width (one photo re-fetched at 900px width specifically to
get under the 400KB budget); all files re-verified as valid images with `file` and
are under ~400KB (largest is 314KB).

---

## Topic 1 — Datums / datum reference (ch2 drawing)

### enr3-datum-321-rule.png

**What it shows:** A labeled 3D diagram of the classic "3-2-1 rule" for establishing
a datum reference frame: a rectangular part (shown as a transparent blue block)
resting on six conical/cylindrical locating pins — three pins (labeled 3A, 3B, 3C)
supporting the primary datum plane (the bottom face), two pins (2A, 2B) contacting
a secondary datum plane (a side face), and one pin (1) contacting the tertiary datum
plane (the end face). This is exactly the geometric-constraint concept behind a
datum reference frame (primary/secondary/tertiary datums), used to explain why a
minimum of 6 points of contact fully locate a rigid part.

- Original file: `File:3-2-1 Rule.png`
- Commons page: https://commons.wikimedia.org/wiki/File:3-2-1_Rule.png
- Author: User:LaurensvanLieshout
- License: CC BY-SA 3.0
- Topic: Topic 1 — datum reference frame (3-2-1 rule / primary-secondary-tertiary
  datum concept)
- Type: Diagram (3D rendered plate)

---

### enr3-datum-feature-symbols.png

**What it shows:** A 2D orthographic engineering drawing of a stepped cylindrical
shaft (two Ø30 sections) with four datum feature symbols attached directly to the
drawing: boxed letters A, B, C, D each connected to a filled-triangle datum feature
symbol touching a specific surface of the part (A and C on the two end faces, B on
the bottom surface, D on a shoulder). A feature control frame in the corner reads
"⌀0.1 A" over "—0.02" tied to datum A, and an orientation symbol above the part
reads "0.1 A-C" (referencing datums A and C together). This is a precise, textbook
example of how datum feature symbols (triangle + boxed letter) are actually placed
on a drawing and referenced inside GD&T feature control frames.

- Original file: `File:Geometric Tolerancing Example.PNG`
- Commons page: https://commons.wikimedia.org/wiki/File:Geometric_Tolerancing_Example.PNG
- Author: User:Eggz^2
- License: CC0 (Public Domain Dedication)
- Topic: Topic 1 — GD&T datum feature symbols on a drawing
- Type: Diagram (2D drawing plate)

---

## Topic 2 — Accuracy vs precision (ch16 metrology)

### enr3-accuracy-precision-dartboard.svg

**What it shows:** The well-known 2×2 dartboard/target grid illustrating accuracy
vs precision: column headers "Accuracy" and row header "Precision", with four dart
boards showing dart-cluster patterns for every combination — tight cluster centered
on the bullseye (high accuracy, high precision), tight cluster off-center (high
precision, low accuracy), scattered hits centered on the bullseye on average (high
accuracy, low precision), and scattered hits off-center (low accuracy, low
precision). Also includes a secondary probability-density-curve illustration of
the same concept along a single axis (reference value vs. measured value spread).
This is the canonical illustration used on Wikipedia's "Accuracy and precision"
article.

- Original file: `File:Accuracy and Precision.svg`
- Commons page: https://commons.wikimedia.org/wiki/File:Accuracy_and_Precision.svg
- Author: User:Arbeck (based on an earlier PNG by Tijmen Stam / User:DrBob)
- License: CC BY 4.0
- Topic: Topic 2 — accuracy vs precision (dartboard 2×2 diagram)
- Type: Diagram (SVG plate)

---

## Topic 3 — Cardan / universal joint (ch4 mechanisms)

### enr3-cardan-joint-crane-photo.jpg

**What it shows:** A real-world close-up photo of a yellow-painted Cardan
(universal/Hooke) joint on the drivetrain of a mobile crane (a Contant Quattro
GC-75). The cross-shaped spider at the center of the joint and both connecting
yokes are clearly visible, weathered with grease, dirt and surface rust — an
authentic in-service mechanical joint, not a clean product photo.

- Original file: `File:Mobile crane-Cardan joint.jpg`
- Commons page: https://commons.wikimedia.org/wiki/File:Mobile_crane-Cardan_joint.jpg
- Author: User:Cjp24
- License: CC BY-SA 4.0
- Topic: Topic 3 — Cardan/universal joint (photo of a real joint in a drivetrain)
- Type: Photo

---

### enr3-cardan-joint-render.jpg

**What it shows:** A clean 3D CAD render of a single Cardan/universal (Hooke)
joint in isolation: two dark-grey forked yokes (one with a shaft stub visible)
connected through a central gold-colored cross-spider, shown at roughly a 45°
bend angle so the cross and both yokes are all clearly readable at once. A good
complement to the real-world photo above — this one isolates the mechanism itself
with nothing else in the frame.

- Original file: `File:Kardanův kloub.jpg`
- Commons page: https://commons.wikimedia.org/wiki/File:Kardan%C5%AFv_kloub.jpg
- Author: User:Jjvcela
- License: CC BY-SA 3.0
- Topic: Topic 3 — Cardan/universal joint (isolated 3D-rendered diagram of the
  mechanism)
- Type: Diagram/render (CAD illustration, not a photo of a physical part)

---

## Topic 4 — Friction (ch4 mechanisms)

### enr3-friction-fbd-incline.png

**What it shows:** A minimal, classic free-body diagram of a block resting on an
inclined plane, with three labeled force vectors: **W** (weight, straight down),
**N** (normal reaction, perpendicular to the incline surface, pointing away from
it), and **F** (friction force, acting along the incline surface). This is the
standard "friction + normal force" free-body diagram used in mechanics textbooks
and is the direct visual answer to "what does a friction force diagram look
like."

- Original file: `File:Free body diagram.png`
- Commons page: https://commons.wikimedia.org/wiki/File:Free_body_diagram.png
- Author: User:SlaveOfExam (English Wikipedia)
- License: Public domain
- Topic: Topic 4 — friction force diagram / free body diagram with friction and
  normal force
- Type: Diagram

---

### enr3-friction-incline-equations.png

**What it shows:** A more detailed inclined-plane free-body diagram: a block on
a slope (angle α) being pushed by a driving force **F** (at angle β to the
incline), with its weight **G**, the plane's normal reaction **N**, and the
friction force **T** all drawn as labeled vectors, plus a local rotated x-y axis
frame. Below the diagram, the equilibrium/motion equations are spelled out,
including the explicit friction relation **T = μN** — directly connecting the
diagram to the Coulomb friction formula (force = coefficient × normal force).

- Original file: `File:Inclined plane - a simple problem.PNG`
- Commons page: https://commons.wikimedia.org/wiki/File:Inclined_plane_-_a_simple_problem.PNG
- Author: User:Ilevanat
- License: CC BY-SA 3.0
- Topic: Topic 4 — friction coefficient illustration (T = μN shown explicitly on
  an inclined-plane free-body diagram)
- Type: Diagram

---

## Honest gaps

- **Topic 1 (datums):** No single Commons image shows a full formal "datum
  reference frame" (three mutually perpendicular datum planes A/B/C with a part
  floating above them, coordinate-axis style) the way many modern GD&T textbooks
  draw it — that specific rendering style was not found under an allowed license.
  The 3-2-1-rule diagram used here covers the same underlying concept (established
  by contact points rather than abstract planes) and the drawing-with-datum-symbols
  image covers the symbol/notation side; between the two, the topic is well
  covered but not with one single "ideal" combined image.
- **Topic 2 (accuracy/precision):** Very well covered — the canonical Wikipedia
  dartboard diagram is exactly the requested image and needed no compromise. Did
  not add a second image since one authoritative diagram already fully answers
  the brief; additional Commons options in this category were mostly narrower
  crops of the same idea (e.g. individual "High accuracy, low precision.jpg"
  single-panel photos) that add little beyond the 2×2 grid already chosen.
- **Topic 3 (cardan/universal joint):** Good coverage with one real photo and one
  clean isolated render. Did not find a labeled cross-section/exploded diagram
  (showing the needle bearings and retaining clips inside the cross-spider) under
  an allowed license — only exterior views (photo or render) were available.
- **Topic 4 (friction):** Good coverage — one minimal classic FBD and one detailed
  version with the explicit T = μN relation. Did not find a Commons image
  contrasting static vs. kinetic friction specifically (e.g. a force-vs-time or
  force-vs-applied-force plot showing the static peak before sliding); searches
  for "static kinetic friction diagram" mostly returned unrelated engineering
  reports/theses, not diagrams suitable for direct classroom use.
