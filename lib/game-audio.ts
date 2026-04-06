"use client";

/** Hebrew TTS + lightweight encouragement SFX — no extra dependencies. */

let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

/**
 * Mobile browsers (Safari iOS, Chrome Android) start AudioContext in "suspended" and only
 * unlock it after a user gesture. Playback must run after resume() settles — not in the
 * same synchronous tick as createOscillator on a still-suspended context.
 */
function runWhenAudioReady(play: (ctx: AudioContext) => void) {
  const ctx = getCtx();
  if (!ctx) return;
  const go = () => play(ctx);
  if (ctx.state === "suspended") {
    void ctx.resume().then(go);
  } else {
    go();
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

      // Try to find a Hebrew voice explicitly (Chrome mobile needs this)
      const voices = window.speechSynthesis.getVoices();
      const heVoice = voices.find(
        (v) => v.lang === "he-IL" || v.lang === "he" || v.lang.startsWith("he")
      );
      if (heVoice) u.voice = heVoice;

      u.onend = () => resolve();
      u.onerror = () => resolve();
      window.speechSynthesis.speak(u);

      // Chrome mobile sometimes stops mid-speech; keep it alive
      const keepAlive = setInterval(() => {
        if (!window.speechSynthesis.speaking) {
          clearInterval(keepAlive);
        } else {
          window.speechSynthesis.pause();
          window.speechSynthesis.resume();
        }
      }, 5000);
      u.onend = () => { clearInterval(keepAlive); resolve(); };
      u.onerror = () => { clearInterval(keepAlive); resolve(); };
    };

    // Chrome loads voices asynchronously — wait for them if empty
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.onvoiceschanged = null;
        trySpeak();
      };
      // Fallback if onvoiceschanged never fires
      setTimeout(() => {
        window.speechSynthesis.onvoiceschanged = null;
        trySpeak();
      }, 300);
    } else {
      trySpeak();
    }
  });
}

export function resumeAudioContext() {
  const ctx = getCtx();
  if (ctx?.state === "suspended") {
    void ctx.resume();
  }
}
