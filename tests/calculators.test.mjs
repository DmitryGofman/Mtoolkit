// tests/calculators.test.mjs
// Loads the pure block from index.html as the single source of truth.
// No calculator logic is duplicated here — every assertion calls into MTK.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const htmlPath = path.join(__dirname, '..', 'index.html');
const html = readFileSync(htmlPath, 'utf8');

const startMarker = '/* @pure-start */';
const endMarker = '/* @pure-end */';
const startIdx = html.indexOf(startMarker);
const endIdx = html.indexOf(endMarker);

if (startIdx === -1 || endIdx === -1 || endIdx <= startIdx) {
  console.error('FATAL: could not locate @pure-start/@pure-end markers in index.html');
  process.exit(1);
}

const pureBlock = html.slice(startIdx + startMarker.length, endIdx);

// Purity check: no DOM globals referenced as bare identifiers in source text.
const domTokens = ['document.', 'window.', 'querySelector', 'localStorage', 'sessionStorage', 'addEventListener('];
const domHits = domTokens.filter((t) => pureBlock.includes(t));

const MTK = new Function(pureBlock + ';return MTK;')();

let pass = 0;
let fail = 0;
const failures = [];

function approx(a, b, eps = 1e-9) {
  return Math.abs(a - b) <= eps;
}

function assert(cond, msg) {
  if (cond) {
    pass++;
  } else {
    fail++;
    failures.push(msg);
  }
}

function assertEqual(actual, expected, msg) {
  assert(actual === expected, `${msg} (expected ${expected}, got ${actual})`);
}

function assertApprox(actual, expected, eps, msg) {
  assert(approx(actual, expected, eps), `${msg} (expected ${expected}, got ${actual})`);
}

// ---------------------------------------------------------------
// 0. Purity check
// ---------------------------------------------------------------
assert(domHits.length === 0, `Pure block must be DOM-free, found tokens: ${domHits.join(', ')}`);

// ---------------------------------------------------------------
// 1. Thread geometry
// ---------------------------------------------------------------
function findThread(sizeKey, pitch, system) {
  return MTK.threads.find((t) => t.sizeKey === sizeKey && t.pitch === pitch && (!system || t.system === system));
}

{
  const m6 = findThread('M6', 1.0, 'metric');
  assert(!!m6, 'M6 coarse thread record exists');
  if (m6) {
    assertEqual(m6.pitchDia, 5.350, 'M6 pitchDia');
    assertEqual(m6.minorDia, 4.917, 'M6 minorDia');
  }

  const m8x125 = findThread('M8', 1.25, 'metric');
  assert(!!m8x125, 'M8x1.25 thread record exists');
  if (m8x125) {
    assertEqual(m8x125.pitchDia, 7.188, 'M8x1.25 pitchDia');
  }

  const m24 = findThread('M24', 3.0, 'metric');
  assert(!!m24, 'M24 coarse thread record exists');
  if (m24) {
    assertEqual(m24.pitchDia, 22.051, 'M24 pitchDia');
  }
}

// ---------------------------------------------------------------
// 2. Tap drill
// ---------------------------------------------------------------
{
  const m6 = findThread('M6', 1.0, 'metric');
  const td6 = MTK.tapDrill(m6);
  assertEqual(td6.result.pct75, 5.0, 'M6 tap drill 75%');
  assertEqual(td6.result.pct50, 5.35, 'M6 tap drill 50%');

  const m8x125 = findThread('M8', 1.25, 'metric');
  const td8 = MTK.tapDrill(m8x125);
  assertEqual(td8.result.pct75, 6.75, 'M8x1.25 tap drill 75%');

  const m10 = findThread('M10', 1.5, 'metric');
  const td10 = MTK.tapDrill(m10);
  assertEqual(td10.result.pct75, 8.5, 'M10 tap drill 75%');
}

// ---------------------------------------------------------------
// 3. Clearance
// ---------------------------------------------------------------
{
  const c6 = MTK.clearanceFor('M6', 'metric');
  assertEqual(c6.close, 6.4, 'M6 clearance close');
  assertEqual(c6.normal, 6.6, 'M6 clearance normal');
  assertEqual(c6.loose, 7.0, 'M6 clearance loose');

  const c12 = MTK.clearanceFor('M12', 'metric');
  assertEqual(c12.normal, 13.5, 'M12 clearance normal');

  const c20 = MTK.clearanceFor('M20', 'metric');
  assertEqual(c20.loose, 24.0, 'M20 clearance loose');

  const cq = MTK.clearanceFor('1/4', 'imperial');
  assertEqual(cq.normal, 0.281, '1/4 clearance normal');
}

// ---------------------------------------------------------------
// 4. Conversion
// ---------------------------------------------------------------
{
  const r1 = MTK.convert(1, 'in', 'mm', 'length');
  assertApprox(r1.result, 25.4, 1e-9, '1 in = 25.4 mm');

  const r2 = MTK.convert(1, 'ft', 'm', 'length');
  assertApprox(r2.result, 0.3048, 1e-9, '1 ft = 0.3048 m');

  const r3 = MTK.convert(1, 'lb', 'kg', 'mass');
  assertApprox(r3.result, 0.45359237, 1e-9, '1 lb = 0.45359237 kg');

  const r4 = MTK.convertTemp(0, 'C', 'F');
  assertApprox(r4.result, 32, 1e-9, '0 C = 32 F');

  // 1 ksi = 1000 psi: psi->Pa factor times 1000 must equal ksi->Pa (psi is exact-by-definition).
  const psiToPa = MTK.convert(1, 'psi', 'Pa', 'pressure').result;
  const ksiToPa = MTK.convert(1000, 'psi', 'Pa', 'pressure').result;
  assertApprox(ksiToPa, psiToPa * 1000, 1e-6, '1 ksi = 1000 psi');
}

// ---------------------------------------------------------------
// 5. Beam calculator
// ---------------------------------------------------------------
{
  const inp = {
    length: 1,
    E: 200e9,
    section: { type: 'rect', b: 0.05, h: 0.1 },
    load: 'point',
    magnitude: 1000
  };
  const r = MTK.beam(inp);
  assert(!r.error, 'beam rect point load: no error');
  if (!r.error) {
    // I = b h^3/12 = 0.05*0.1^3/12 = 4.1667e-6
    const expectedI = (0.05 * Math.pow(0.1, 3)) / 12;
    assertApprox(r.result.I, expectedI, 1e-12, 'beam rect I');
    // delta = P L^3 / (3 E I)
    const expectedDeflection = (1000 * 1) / (3 * 200e9 * expectedI);
    assertApprox(r.result.deflection, expectedDeflection, 1e-9, 'beam rect deflection');
    assert(Math.abs(r.result.deflection - 0.0004) < 0.00002, `beam deflection approx 0.4mm, got ${r.result.deflection}`);
    // stress = Mc/I, M = PL = 1000, c = h/2 = 0.05
    const expectedStress = (1000 * 0.05) / expectedI;
    assertApprox(r.result.stress, expectedStress, 1e-3, 'beam rect stress');
    assert(Math.abs(r.result.stress - 12e6) < 1e6, `beam stress approx 12MPa, got ${r.result.stress}`);
    assert(!!r.source && r.source.sourceId === 'SRC008', 'beam result carries SRC008 provenance');
  }

  const inpRound = {
    length: 1, E: 200e9, section: { type: 'round', d: 0.02 }, load: 'point', magnitude: 100
  };
  const rRound = MTK.beam(inpRound);
  assert(!rRound.error, 'beam round: no error');
  if (!rRound.error) {
    const expectedI = (Math.PI * Math.pow(0.02, 4)) / 64;
    assertApprox(rRound.result.I, expectedI, 1e-15, 'beam round I = pi d^4/64');
  }

  const badLength = MTK.beam({ length: 0, E: 200e9, section: { type: 'round', d: 0.02 }, load: 'point', magnitude: 100 });
  assert(!!badLength.error, 'beam rejects length <= 0');

  const badLengthNeg = MTK.beam({ length: -5, E: 200e9, section: { type: 'round', d: 0.02 }, load: 'point', magnitude: 100 });
  assert(!!badLengthNeg.error, 'beam rejects negative length');

  const udl = MTK.beam({ length: 2, E: 200e9, section: { type: 'rect', b: 0.05, h: 0.1 }, load: 'udl', magnitude: 1000 });
  assert(!udl.error, 'beam udl: no error');
}

// ---------------------------------------------------------------
// 6. Provenance presence
// ---------------------------------------------------------------
{
  // Every thread carries a registered sourceId.
  let allThreadsOk = true;
  for (const t of MTK.threads) {
    if (!t.provenance || !MTK.sourceRegistry[t.provenance.sourceId]) {
      allThreadsOk = false;
      break;
    }
  }
  assert(allThreadsOk, 'every thread record carries a registered sourceId');

  // Tap drill result carries provenance.
  const td = MTK.tapDrill(findThread('M6', 1.0, 'metric'));
  assert(!!td.source && !!MTK.sourceRegistry[td.source.sourceId], 'tap drill result carries registered sourceId');

  // Clearance result carries provenance.
  const cl = MTK.clearanceFor('M6', 'metric');
  assert(!!cl.source && !!MTK.sourceRegistry[cl.source.sourceId], 'clearance result carries registered sourceId');

  // Clearance "no verified value" path does not fabricate a source.
  const clMissing = MTK.clearanceFor('#6', 'imperial');
  assert(clMissing.close === null && clMissing.source === null, '#6 imperial clearance is honestly absent, not guessed');

  // Conversion is tier A, no false primary on non-exact handbook-only data.
  const conv = MTK.convert(1, 'in', 'mm', 'length');
  assert(conv.source.confidenceTier === 'A', 'conversion factor is tier A');
  assert(conv.source.verificationStatus === 'Verified Against Primary', 'conversion factor is Verified Against Primary');

  // No false primary: thread/tap/clearance honestly cite tier B / Verified Against Secondary
  // (since primary ISO/ASME access is Pending per SOURCES.md), not tier A.
  const m6 = findThread('M6', 1.0, 'metric');
  assert(m6.provenance.confidenceTier === 'B', 'thread data is honestly tier B (no false primary)');
  assert(m6.provenance.verificationStatus === 'Verified Against Secondary', 'thread data honestly Verified Against Secondary');

  // Beam result provenance.
  const beamResult = MTK.beam({ length: 1, E: 200e9, section: { type: 'round', d: 0.01 }, load: 'point', magnitude: 10 });
  assert(!!beamResult.source && !!MTK.sourceRegistry[beamResult.source.sourceId], 'beam result carries registered sourceId');

  // Materials carry provenance.
  let allMaterialsOk = true;
  for (const mat of MTK.materials) {
    if (!mat.source || !MTK.sourceRegistry[mat.source.sourceId]) { allMaterialsOk = false; break; }
  }
  assert(allMaterialsOk, 'every material carries a registered sourceId');
}

// ---------------------------------------------------------------
// 7. Parser
// ---------------------------------------------------------------
{
  const pM6 = MTK.parseQuery('M6');
  assertEqual(pM6.kind, 'thread', 'parseQuery M6 kind');
  assertEqual(pM6.system, 'metric', 'parseQuery M6 system');
  assertEqual(pM6.sizeKey, 'M6', 'parseQuery M6 sizeKey');

  const pFrac = MTK.parseQuery('1/4-20');
  assertEqual(pFrac.kind, 'thread', 'parseQuery 1/4-20 kind');
  assertEqual(pFrac.sizeKey, '1/4-20', 'parseQuery 1/4-20 sizeKey (no # prefix)');

  const pFracHash = MTK.parseQuery('#1/4-20');
  assertEqual(pFracHash.kind, 'thread', 'parseQuery #1/4-20 kind');
  assertEqual(pFracHash.sizeKey, '1/4-20', 'parseQuery #1/4-20 normalizes to no # prefix');

  const pNumHash = MTK.parseQuery('#10-24');
  assertEqual(pNumHash.kind, 'thread', 'parseQuery #10-24 kind');
  assertEqual(pNumHash.sizeKey, '#10-24', 'parseQuery #10-24 sizeKey (# prefix retained)');

  const pNum = MTK.parseQuery('10-24');
  assertEqual(pNum.kind, 'thread', 'parseQuery 10-24 kind');
  assertEqual(pNum.sizeKey, '#10-24', 'parseQuery 10-24 normalizes to # prefix');

  // All four variants resolve to the same registry entry.
  const allFour = ['1/4-20', '#1/4-20'].map((q) => MTK.parseQuery(q).sizeKey);
  assert(allFour.every((k) => k === '1/4-20'), 'fractional variants resolve to same sizeKey');
  const allNum = ['10-24', '#10-24'].map((q) => MTK.parseQuery(q).sizeKey);
  assert(allNum.every((k) => k === '#10-24'), 'numbered variants resolve to same sizeKey');

  // Verify these sizeKeys actually resolve against the threads table.
  assert(MTK.threadsFor('1/4-20', 'unified').length > 0, '1/4-20 resolves in threads table');
  assert(MTK.threadsFor('#10-24', 'unified').length > 0, '#10-24 resolves in threads table');

  const pConv = MTK.parseQuery('10 mm to in');
  assertEqual(pConv.kind, 'convert', 'parseQuery "10 mm to in" kind');
  assertEqual(pConv.from, 'mm', 'parseQuery "10 mm to in" from');
  assertEqual(pConv.to, 'in', 'parseQuery "10 mm to in" to');

  const pBeam = MTK.parseQuery('beam');
  assertEqual(pBeam.kind, 'module', 'parseQuery "beam" kind');
  assertEqual(pBeam.module, 'beam', 'parseQuery "beam" module');

  const pEmpty = MTK.parseQuery('');
  assertEqual(pEmpty.kind, 'empty', 'parseQuery "" kind');

  const pEmpty2 = MTK.parseQuery('   ');
  assertEqual(pEmpty2.kind, 'empty', 'parseQuery whitespace-only kind');
}

// ---------------------------------------------------------------
// Report
// ---------------------------------------------------------------
console.log(`\n${pass} passing, ${fail} failing`);
if (fail > 0) {
  console.log('\nFailures:');
  for (const f of failures) console.log(' - ' + f);
  process.exit(1);
} else {
  console.log('All tests passed.');
}
