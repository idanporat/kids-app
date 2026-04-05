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

/** Short pleasant "ding" for correct answers */
export function playCorrectChime() {
  const ctx = getCtx();
  if (!ctx) return;
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
}

/** Soft buzz for wrong (non-punishing) */
export function playSoftBuzz() {
  const ctx = getCtx();
  if (!ctx) return;
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
}

/** Fanfare-ish burst at round complete */
export function playRoundComplete() {
  const ctx = getCtx();
  if (!ctx) return;
  const notes = [392, 523.25, 659.25];
  notes.forEach((freq, i) => {
    const o = ctx!.createOscillator();
    const g = ctx!.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(freq, ctx!.currentTime + i * 0.08);
    g.gain.setValueAtTime(0.1, ctx!.currentTime + i * 0.08);
    g.gain.exponentialRampToValueAtTime(0.001, ctx!.currentTime + i * 0.08 + 0.25);
    o.connect(g);
    g.connect(ctx!.destination);
    o.start(ctx!.currentTime + i * 0.08);
    o.stop(ctx!.currentTime + i * 0.08 + 0.28);
  });
}

export function speakHebrew(text: string): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      resolve();
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "he-IL";
    u.rate = 0.92;
    u.pitch = 1;
    u.onend = () => resolve();
    u.onerror = () => resolve();
    window.speechSynthesis.speak(u);
  });
}

export function resumeAudioContext() {
  const ctx = getCtx();
  if (ctx?.state === "suspended") {
    void ctx.resume();
  }
}
