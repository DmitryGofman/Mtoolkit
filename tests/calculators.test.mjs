/* tests/calculators.test.mjs — Gate D2 (calculator purity) + Gate F2 (value correctness)
 *
 * Loads the PURE block of index.html (delimited by @pure-start / @pure-end) and runs it
 * in isolation — no DOM. This keeps a single source of truth: the app and the tests run
 * the exact same data + math. Run:  node tests/calculators.test.mjs
 *
 * Expected values are checked against the cited sources (Machinery's Handbook 30th,
 * ISO 273, NIST SP 811, Roark) — a value can be cited and still wrong; this catches it.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(here, '..', 'index.html'), 'utf8');

const start = html.indexOf('/* @pure-start');
const end = html.indexOf('/* @pure-end */');
if (start < 0 || end < 0) { console.error('FAIL: could not locate pure block markers'); process.exit(1); }
const block = html.slice(html.indexOf('*/', start) + 2, end);

// eval the block (it ends with `const MTK = (function(){...})();`) and return MTK.
const MTK = new Function(block + '\n;return MTK;')();

let pass = 0, fail = 0;
const approx = (a, b, eps = 1e-9) => Math.abs(a - b) <= eps;
function check(name, cond, got) {
  if (cond) { pass++; console.log('  ✓ ' + name); }
  else { fail++; console.log('  ✗ ' + name + (got !== undefined ? '  (got ' + got + ')' : '')); }
}

console.log('\nThread geometry (Machinery’s Handbook 30th / ISO 68-1 profile)');
const M6 = MTK.threadsFor('M6', 'metric', 1)[0];
check('M6 major Ø = 6', M6.dia === 6, M6.dia);
check('M6 pitch Ø = 5.350', M6.pitchDia === 5.350, M6.pitchDia);
check('M6 minor Ø = 4.917', M6.minorDia === 4.917, M6.minorDia);
const M8 = MTK.threadsFor('M8', 'metric', 1.25)[0];
check('M8×1.25 pitch Ø = 7.188', M8.pitchDia === 7.188, M8.pitchDia);
check('M8×1.25 minor Ø = 6.647', M8.minorDia === 6.647, M8.minorDia);
const M24 = MTK.threadsFor('M24', 'metric', 3)[0];
check('M24 pitch Ø = 22.051', M24.pitchDia === 22.051, M24.pitchDia);
const q14 = MTK.threadsFor('1/4-20', 'unified')[0];
check('1/4-20 exists', !!q14, q14 && q14.label);

console.log('\nTap drill (rule: ~75% D−P, ~50% D−0.6495P)');
check('M6 ~75% = 5.0', MTK.tapDrill(M6).result.pct75 === 5.0, MTK.tapDrill(M6).result.pct75);
check('M6 ~50% = 5.35', MTK.tapDrill(M6).result.pct50 === 5.35, MTK.tapDrill(M6).result.pct50);
check('M8×1.25 ~75% = 6.75', MTK.tapDrill(M8).result.pct75 === 6.75, MTK.tapDrill(M8).result.pct75);
const M10 = MTK.threadsFor('M10', 'metric', 1.5)[0];
check('M10 ~75% = 8.5', MTK.tapDrill(M10).result.pct75 === 8.5, MTK.tapDrill(M10).result.pct75);

console.log('\nClearance holes (ISO 273 / ASME B18.2.8)');
check('M6 close = 6.4', MTK.clearanceFor('M6', 'metric').close === 6.4);
check('M6 normal = 6.6', MTK.clearanceFor('M6', 'metric').normal === 6.6);
check('M6 loose = 7.0', MTK.clearanceFor('M6', 'metric').loose === 7.0);
check('M12 normal = 13.5', MTK.clearanceFor('M12', 'metric').normal === 13.5);
check('M20 loose = 24.0', MTK.clearanceFor('M20', 'metric').loose === 24.0);
check('1/4 normal = 0.281', MTK.clearanceFor('1/4-20', 'unified').normal === 0.281);

console.log('\nUnit conversion (NIST SP 811, exact by definition)');
check('1 in → 25.4 mm', MTK.convert(1, 'in', 'mm', 'Length').result === 25.4);
check('25.4 mm → 1 in', approx(MTK.convert(25.4, 'mm', 'in', 'Length').result, 1, 1e-12));
check('1 ft → 0.3048 m', MTK.convert(1, 'ft', 'm', 'Length').result === 0.3048);
check('1 lb → 0.45359237 kg', MTK.convert(1, 'lb', 'kg', 'Mass').result === 0.45359237);
check('1 ksi → 1000 psi', approx(MTK.convert(1, 'ksi', 'psi', 'Pressure / Stress').result, 1000, 1e-6));
check('0 °C → 32 °F', MTK.convertTemp(0, '°C', '°F').result === 32);
check('100 °C → 373.15 K', approx(MTK.convertTemp(100, '°C', 'K').result, 373.15, 1e-9));

console.log('\nCantilever beam (Euler–Bernoulli / Roark)');
const bm = MTK.beam({ length: 1, E: 200e9, section: { type: 'rect', b: 0.05, h: 0.1 }, load: 'point', magnitude: 1000 });
check('I = 4.1667e-6 m⁴', approx(bm.result.I, 0.05 * 0.1 ** 3 / 12, 1e-15), bm.result.I);
check('δ ≈ 0.4 mm', approx(bm.result.deflection * 1000, 0.4, 1e-6), bm.result.deflection * 1000);
check('σ ≈ 12 MPa', approx(bm.result.stress / 1e6, 12, 1e-6), bm.result.stress / 1e6);
const bmRound = MTK.beam({ length: 1, E: 200e9, section: { type: 'round', d: 0.05 }, load: 'point', magnitude: 1000 });
check('round I = πd⁴/64', approx(bmRound.result.I, Math.PI * 0.05 ** 4 / 64, 1e-18));
check('beam rejects L≤0', MTK.beam({ length: 0, E: 200e9, section: { type: 'round', d: 0.05 }, load: 'point', magnitude: 100 }).error != null);

console.log('\nProvenance presence (Gate G — no uncited value path)');
check('every thread carries a registered source', MTK.threads.every(t => t.prov && t.prov.sourceId && MTK.sourceRegistry[t.prov.sourceId]));
check('tap drill result carries a source', !!MTK.tapDrill(M6).source.sourceId);
check('clearance carries a source', !!MTK.clearanceFor('M6', 'metric').source.sourceId);
check('conversion carries tier-A source', MTK.convert(1, 'in', 'mm', 'Length').source.confidenceTier === 'A');
check('beam result carries a source', !!bm.source.sourceId);
check('no thread claims false primary verification',
  MTK.threads.every(t => !(t.prov.confidenceTier === 'A' && t.prov.verificationStatus === 'Verified Against Primary')
    || MTK.sourceRegistry[t.prov.sourceId].tier === 'A'));

console.log('\nQuery parser (search-as-spine)');
check('parses "M6" → fastener', MTK.parseQuery('M6').kind === 'fastener');
check('parses "1/4-20" → fastener', MTK.parseQuery('1/4-20').kind === 'fastener');
check('parses "10 mm to in" → convert', MTK.parseQuery('10 mm to in').kind === 'convert');
check('parses "beam" → module', MTK.parseQuery('beam').module === 'beam');
check('empty → empty', MTK.parseQuery('').kind === 'empty');

console.log('\nQuery parser — defect F1 regression (#1/4-20 must not silently fail)');
const pHash14 = MTK.parseQuery('#1/4-20');
check('"#1/4-20" parses as fastener', pHash14.kind === 'fastener', pHash14.kind);
check('"#1/4-20" sizeKey normalizes to "1/4-20"', pHash14.sizeKey === '1/4-20', pHash14.sizeKey);
check('"#1/4-20" resolves to the 1/4-20 record',
  MTK.threadsFor(pHash14.sizeKey, pHash14.system).length > 0 &&
  MTK.threadsFor(pHash14.sizeKey, pHash14.system)[0].label.startsWith('1/4-20'));

const pPlain14 = MTK.parseQuery('1/4-20');
check('"1/4-20" still resolves', pPlain14.kind === 'fastener' && pPlain14.sizeKey === '1/4-20', pPlain14.sizeKey);
check('"1/4-20" resolves to the 1/4-20 record',
  MTK.threadsFor(pPlain14.sizeKey, pPlain14.system).length > 0);

const pHash1024 = MTK.parseQuery('#10-24');
const pPlain1024 = MTK.parseQuery('10-24');
check('"#10-24" sizeKey = "#10-24"', pHash1024.sizeKey === '#10-24', pHash1024.sizeKey);
check('"10-24" sizeKey normalizes to "#10-24"', pPlain1024.sizeKey === '#10-24', pPlain1024.sizeKey);
check('"#10-24" resolves to the #10-24 record',
  MTK.threadsFor(pHash1024.sizeKey, pHash1024.system).length > 0 &&
  MTK.threadsFor(pHash1024.sizeKey, pHash1024.system)[0].label.startsWith('#10-24'));
check('"10-24" resolves to the same #10-24 record',
  MTK.threadsFor(pPlain1024.sizeKey, pPlain1024.system).length > 0 &&
  MTK.threadsFor(pPlain1024.sizeKey, pPlain1024.system)[0].label.startsWith('#10-24'));

console.log('\n' + (fail === 0 ? '✓ ALL ' + pass + ' CHECKS PASS' : '✗ ' + fail + ' FAILED, ' + pass + ' passed'));
process.exit(fail === 0 ? 0 : 1);
