// Procedural UI sound via the Web Audio API — no audio files, no external assets,
// works offline, and nothing plays until the first user gesture (browser policy).
// Toggleable; the preference is persisted.

const KEY = 'mechalc-academy-sound-v1'

let ctx: AudioContext | null = null
let enabled = true
try {
  enabled = localStorage.getItem(KEY) !== 'off'
} catch {
  // storage unavailable — default on
}

function audio(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!ctx) {
    const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!Ctor) return null
    try {
      ctx = new Ctor()
    } catch {
      return null
    }
  }
  if (ctx.state === 'suspended') ctx.resume().catch(() => {})
  return ctx
}

/** One short enveloped tone. `when` offsets it for building small arpeggios. */
function tone(freq: number, dur: number, type: OscillatorType = 'triangle', gain = 0.12, when = 0) {
  const c = audio()
  if (!c || !enabled) return
  const t = c.currentTime + when
  const osc = c.createOscillator()
  const g = c.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, t)
  g.gain.setValueAtTime(0.0001, t)
  g.gain.exponentialRampToValueAtTime(gain, t + 0.008)
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  osc.connect(g).connect(c.destination)
  osc.start(t)
  osc.stop(t + dur + 0.02)
}

export const sound = {
  isEnabled: () => enabled,
  toggle(): boolean {
    enabled = !enabled
    try {
      localStorage.setItem(KEY, enabled ? 'on' : 'off')
    } catch {
      // ignore
    }
    if (enabled) tone(660, 0.09, 'triangle', 0.12)
    return enabled
  },
  click() {
    tone(320, 0.05, 'square', 0.05)
  },
  advance() {
    tone(440, 0.06, 'triangle', 0.07)
  },
  correct() {
    tone(523, 0.09, 'triangle', 0.12)
    tone(784, 0.13, 'triangle', 0.12, 0.09)
  },
  wrong() {
    tone(196, 0.2, 'sawtooth', 0.09)
  },
  complete() {
    ;[659, 784, 988].forEach((f, i) => tone(f, 0.18, 'triangle', 0.12, i * 0.1))
  },
  rankUp() {
    ;[523, 659, 784, 1047].forEach((f, i) => tone(f, 0.24, 'triangle', 0.13, i * 0.12))
  },
}
