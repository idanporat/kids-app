"use client";

/** Hebrew TTS + lightweight encouragement SFX — no extra dependencies. */

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

/**
 * Call synchronously from a user gesture (pointerdown/click). iOS Safari needs resume()
 * plus a one-sample silent buffer in the same activation; GameShell also runs this on
 * pointerdown capture so the context unlocks before click handlers run.
 */
export function unlockGameAudio(): void {
  const ctx = getCtx();
  if (!ctx) return;
  if (ctx.state === "suspended") {
    void ctx.resume();
  }
  const silent = ctx.createBuffer(1, 1, ctx.sampleRate);
  const src = ctx.createBufferSource();
  src.buffer = silent;
  src.connect(ctx.destination);
  src.start(0);
}

/**
 * Mobile browsers start AudioContext in "suspended". Always unlock first, then play
 * after resume() resolves if still needed.
 */
function runWhenAudioReady(play: (ctx: AudioContext) => void) {
  const ctx = getCtx();
  if (!ctx) return;
  unlockGameAudio();
  const go = () => play(ctx);
  if (ctx.state === "running") {
    go();
  } else {
    void ctx.resume().then(go);
  }
}

/** Short pleasant "ding" for correct answers */
export function playCorrectChime() {
  runWhenAudioReady((ctx) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(523.25, ctx.currentTime);
    o.frequency.exponentialRampToValueAtTime(784, ctx.currentTime + 0.12);
    g.gain.setValueAtTime(0.12, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
    o.connect(g);
    g.connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + 0.36);
  });
}

/** Soft buzz for wrong (non-punishing) */
export function playSoftBuzz() {
  runWhenAudioReady((ctx) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "triangle";
    o.frequency.setValueAtTime(180, ctx.currentTime);
    g.gain.setValueAtTime(0.06, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    o.connect(g);
    g.connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + 0.16);
  });
}

/** Fanfare-ish burst at round complete */
export function playRoundComplete() {
  runWhenAudioReady((ctx) => {
    const notes = [392, 523.25, 659.25];
    notes.forEach((freq, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
      g.gain.setValueAtTime(0.1, ctx.currentTime + i * 0.08);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.25);
      o.connect(g);
      g.connect(ctx.destination);
      o.start(ctx.currentTime + i * 0.08);
      o.stop(ctx.currentTime + i * 0.08 + 0.28);
    });
  });
}

export function speakHebrew(text: string): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      resolve();
      return;
    }
    window.speechSynthesis.cancel();

    const trySpeak = () => {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "he-IL";
      u.rate = 0.92;
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

    // Must call speak() in the same synchronous turn as the user gesture (iOS Safari).
    // Do not defer the first speak with setTimeout — that breaks autoplay policy.
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
