"use client";

/** Hebrew TTS + SFX via HTML5 Audio (works on mobile Safari; Web Audio often breaks after async resume). */

const SAMPLE_RATE = 22050;

let audioCtx: AudioContext | null = null;

function createCtx(): AudioContext {
  const w = window as unknown as {
    AudioContext: typeof AudioContext;
    webkitAudioContext?: typeof AudioContext;
  };
  const Ctor = w.AudioContext ?? w.webkitAudioContext;
  return new Ctor();
}

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    audioCtx = createCtx();
  }
  return audioCtx;
}

function writeStr(dv: DataView, offset: number, s: string) {
  for (let i = 0; i < s.length; i++) {
    dv.setUint8(offset + i, s.charCodeAt(i));
  }
}

function pcm16MonoToWavDataUrl(samples: Int16Array, sampleRate: number): string {
  const n = samples.length;
  const buf = new ArrayBuffer(44 + n * 2);
  const dv = new DataView(buf);
  writeStr(dv, 0, "RIFF");
  dv.setUint32(4, 36 + n * 2, true);
  writeStr(dv, 8, "WAVE");
  writeStr(dv, 12, "fmt ");
  dv.setUint32(16, 16, true);
  dv.setUint16(20, 1, true);
  dv.setUint16(22, 1, true);
  dv.setUint32(24, sampleRate, true);
  dv.setUint32(28, sampleRate * 2, true);
  dv.setUint16(32, 2, true);
  dv.setUint16(34, 16, true);
  writeStr(dv, 36, "data");
  dv.setUint32(40, n * 2, true);
  let off = 44;
  for (let i = 0; i < n; i++) {
    dv.setInt16(off, samples[i], true);
    off += 2;
  }
  const bytes = new Uint8Array(buf);
  let bin = "";
  for (let i = 0; i < bytes.length; i++) {
    bin += String.fromCharCode(bytes[i]);
  }
  return "data:audio/wav;base64," + btoa(bin);
}

function sineTone(freq: number, durationSec: number, gain: number): Int16Array {
  const n = Math.floor(SAMPLE_RATE * durationSec);
  const out = new Int16Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / SAMPLE_RATE;
    const attack = Math.min(1, i / (SAMPLE_RATE * 0.004));
    const decay = Math.exp(-t * 5);
    const v = Math.sin(2 * Math.PI * freq * t) * gain * 32767 * attack * decay;
    out[i] = Math.max(-32768, Math.min(32767, Math.round(v)));
  }
  return out;
}

function buzzSamples(): Int16Array {
  const n = Math.floor(SAMPLE_RATE * 0.16);
  const out = new Int16Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / SAMPLE_RATE;
    const decay = Math.exp(-t * 12);
    const v = Math.sin(2 * Math.PI * 180 * t) * 0.05 * 32767 * decay;
    out[i] = Math.max(-32768, Math.min(32767, Math.round(v)));
  }
  return out;
}

function fanfareSamples(): Int16Array {
  const notes = [392, 523.25, 659.25];
  const totalLen = Math.floor(SAMPLE_RATE * 0.45);
  const out = new Int16Array(totalLen);
  notes.forEach((freq, idx) => {
    const start = Math.floor(idx * SAMPLE_RATE * 0.08);
    const noteLen = Math.floor(SAMPLE_RATE * 0.26);
    for (let j = 0; j < noteLen; j++) {
      const t = j / SAMPLE_RATE;
      const decay = Math.exp(-t * 4);
      const v = Math.sin(2 * Math.PI * freq * t) * 0.09 * 32767 * decay;
      const pos = start + j;
      if (pos < totalLen) {
        const s = Math.round(v);
        out[pos] = Math.max(-32768, Math.min(32767, out[pos] + s));
      }
    }
  });
  return out;
}

let cachedChime: string | null = null;
let cachedBuzz: string | null = null;
let cachedFanfare: string | null = null;
let cachedSilent: string | null = null;

function chimeDataUrl(): string {
  if (!cachedChime) cachedChime = pcm16MonoToWavDataUrl(sineTone(620, 0.36, 0.09), SAMPLE_RATE);
  return cachedChime;
}

function buzzDataUrl(): string {
  if (!cachedBuzz) cachedBuzz = pcm16MonoToWavDataUrl(buzzSamples(), SAMPLE_RATE);
  return cachedBuzz;
}

function fanfareDataUrl(): string {
  if (!cachedFanfare) cachedFanfare = pcm16MonoToWavDataUrl(fanfareSamples(), SAMPLE_RATE);
  return cachedFanfare;
}

function silentDataUrl(): string {
  if (!cachedSilent) {
    const s = new Int16Array(Math.max(1, Math.floor(SAMPLE_RATE * 0.02)));
    cachedSilent = pcm16MonoToWavDataUrl(s, SAMPLE_RATE);
  }
  return cachedSilent;
}

function playFromPool(
  getUrl: () => string,
  poolRef: { el: HTMLAudioElement | null }
) {
  try {
    const url = getUrl();
    if (!poolRef.el) {
      poolRef.el = new Audio(url);
      poolRef.el.preload = "auto";
    }
    poolRef.el.currentTime = 0;
    void poolRef.el.play().catch(() => {});
  } catch {
    /* ignore */
  }
}

const chimePool = { el: null as HTMLAudioElement | null };
const buzzPool = { el: null as HTMLAudioElement | null };
const fanfarePool = { el: null as HTMLAudioElement | null };

/** Unlock audio session: silent HTML clip + Web Audio resume (helps iOS). */
export function unlockGameAudio(): void {
  try {
    const silent = silentDataUrl();
    const a = new Audio(silent);
    a.volume = 0.01;
    void a.play().catch(() => {});
  } catch {
    /* ignore */
  }
  const ctx = getCtx();
  if (ctx?.state === "suspended") {
    void ctx.resume();
  }
  try {
    const ctx2 = getCtx();
    if (!ctx2) return;
    const buf = ctx2.createBuffer(1, 1, ctx2.sampleRate);
    const src = ctx2.createBufferSource();
    src.buffer = buf;
    src.connect(ctx2.destination);
    src.start(0);
  } catch {
    /* ignore */
  }
}

export function playCorrectChime() {
  playFromPool(chimeDataUrl, chimePool);
}

export function playSoftBuzz() {
  playFromPool(buzzDataUrl, buzzPool);
}

export function playRoundComplete() {
  playFromPool(fanfareDataUrl, fanfarePool);
}

export function speakHebrew(text: string, opts?: { rate?: number }): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      resolve();
      return;
    }
    window.speechSynthesis.cancel();

    const trySpeak = () => {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "he-IL";
      u.rate = opts?.rate ?? 0.92;
      u.pitch = 1;

      const voices = window.speechSynthesis.getVoices();
      const heVoice = voices.find(
        (v) => v.lang === "he-IL" || v.lang === "he" || v.lang.startsWith("he")
      );
      if (heVoice) u.voice = heVoice;

      const keepAlive = setInterval(() => {
        if (!window.speechSynthesis.speaking) {
          clearInterval(keepAlive);
        } else {
          window.speechSynthesis.pause();
          window.speechSynthesis.resume();
        }
      }, 5000);
      u.onend = () => {
        clearInterval(keepAlive);
        resolve();
      };
      u.onerror = () => {
        clearInterval(keepAlive);
        resolve();
      };
      window.speechSynthesis.speak(u);
    };

    void window.speechSynthesis.getVoices();
    trySpeak();

    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.onvoiceschanged = null;
        window.speechSynthesis.cancel();
        trySpeak();
      };
    }
  });
}

export function resumeAudioContext() {
  unlockGameAudio();
}
