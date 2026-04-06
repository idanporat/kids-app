/**
 * Procedural Web Audio “object sounds” for מי משמיע (sound-id game).
 * Maps Twemoji asset filenames (correct answer) → short recognizable SFX.
 */

function now(ctx: AudioContext): number {
  return ctx.currentTime;
}

function beep(
  ctx: AudioContext,
  t: number,
  freq: number,
  dur: number,
  type: OscillatorType,
  vol: number,
): void {
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(vol, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  o.connect(g).connect(ctx.destination);
  o.start(t);
  o.stop(t + dur + 0.02);
}

function noiseBurst(ctx: AudioContext, t: number, dur: number, vol: number): void {
  const n = Math.floor(ctx.sampleRate * dur);
  const buf = ctx.createBuffer(1, n, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * 0.8;
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const g = ctx.createGain();
  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 1200;
  bp.Q.value = 1;
  g.gain.setValueAtTime(vol, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  src.connect(bp).connect(g).connect(ctx.destination);
  src.start(t);
  src.stop(t + dur);
}

export function playTwemojiSound(ctx: AudioContext, file: string): boolean {
  const t0 = now(ctx);

  switch (file) {
    case "1f691.png": {
      // אמבולנס — סירנה מתחלפת
      const cycles = 4;
      for (let i = 0; i < cycles; i++) {
        const t = t0 + i * 0.38;
        beep(ctx, t, 720, 0.32, "square", 0.11);
        beep(ctx, t + 0.19, 980, 0.32, "square", 0.1);
      }
      return true;
    }
    case "1f682.png": {
      // רכבת — מקצב גלגלי קטר + צפירה
      for (let i = 0; i < 12; i++) {
        beep(ctx, t0 + i * 0.11, 110 + (i % 2) * 15, 0.06, "square", 0.07);
      }
      beep(ctx, t0 + 0.05, 1900, 0.25, "sine", 0.09);
      return true;
    }
    case "1f697.png": {
      beep(ctx, t0, 420, 0.12, "sine", 0.14);
      return true;
    }
    case "1f68c.png": {
      beep(ctx, t0, 330, 0.1, "sine", 0.13);
      beep(ctx, t0 + 0.18, 330, 0.1, "sine", 0.13);
      return true;
    }
    case "2708.png": {
      // מטוס — מנוע + גובה
      const o1 = ctx.createOscillator();
      const o2 = ctx.createOscillator();
      const g = ctx.createGain();
      o1.type = "sawtooth";
      o2.type = "sine";
      o1.frequency.setValueAtTime(180, t0);
      o1.frequency.exponentialRampToValueAtTime(320, t0 + 1.2);
      o2.frequency.setValueAtTime(1200, t0);
      g.gain.setValueAtTime(0.06, t0);
      g.gain.exponentialRampToValueAtTime(0.001, t0 + 1.35);
      o1.connect(g);
      o2.connect(g);
      g.connect(ctx.destination);
      o1.start(t0);
      o2.start(t0);
      o1.stop(t0 + 1.4);
      o2.stop(t0 + 1.4);
      return true;
    }
    case "26f5.png": {
      beep(ctx, t0, 200, 0.85, "sine", 0.12);
      return true;
    }
    case "1f6b2.png": {
      beep(ctx, t0, 2100, 0.09, "sine", 0.12);
      beep(ctx, t0 + 0.14, 2100, 0.09, "sine", 0.1);
      return true;
    }
    case "1f681.png": {
      // מסוק — מחבטים (מעמעום מהיר)
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(280, t0);
      o.connect(g).connect(ctx.destination);
      for (let i = 0; i < 24; i++) {
        const s = t0 + i * 0.05;
        g.gain.setValueAtTime(i % 2 === 0 ? 0.11 : 0.02, s);
      }
      g.gain.setValueAtTime(0.001, t0 + 1.25);
      o.start(t0);
      o.stop(t0 + 1.3);
      return true;
    }
    case "1f69a.png": {
      beep(ctx, t0, 210, 0.35, "sawtooth", 0.11);
      beep(ctx, t0 + 0.12, 235, 0.35, "sawtooth", 0.1);
      return true;
    }
    case "1f436.png": {
      noiseBurst(ctx, t0, 0.06, 0.12);
      noiseBurst(ctx, t0 + 0.1, 0.05, 0.1);
      noiseBurst(ctx, t0 + 0.22, 0.06, 0.11);
      return true;
    }
    case "1f431.png": {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "triangle";
      o.frequency.setValueAtTime(380, t0);
      o.frequency.exponentialRampToValueAtTime(720, t0 + 0.35);
      g.gain.setValueAtTime(0.12, t0);
      g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.45);
      o.connect(g).connect(ctx.destination);
      o.start(t0);
      o.stop(t0 + 0.5);
      return true;
    }
    case "1f981.png": {
      noiseBurst(ctx, t0, 0.35, 0.14);
      beep(ctx, t0 + 0.05, 95, 0.25, "sawtooth", 0.08);
      return true;
    }
    case "1f418.png": {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(520, t0);
      o.frequency.exponentialRampToValueAtTime(780, t0 + 0.25);
      o.frequency.exponentialRampToValueAtTime(420, t0 + 0.55);
      g.gain.setValueAtTime(0.14, t0);
      g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.65);
      o.connect(g).connect(ctx.destination);
      o.start(t0);
      o.stop(t0 + 0.7);
      return true;
    }
    case "1f404.png": {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(280, t0);
      o.frequency.linearRampToValueAtTime(260, t0 + 0.45);
      g.gain.setValueAtTime(0.15, t0);
      g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.55);
      o.connect(g).connect(ctx.destination);
      o.start(t0);
      o.stop(t0 + 0.6);
      return true;
    }
    case "1f434.png": {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(880, t0);
      o.frequency.exponentialRampToValueAtTime(1320, t0 + 0.18);
      o.frequency.exponentialRampToValueAtTime(700, t0 + 0.42);
      g.gain.setValueAtTime(0.12, t0);
      g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.5);
      o.connect(g).connect(ctx.destination);
      o.start(t0);
      o.stop(t0 + 0.55);
      return true;
    }
    case "1f411.png": {
      beep(ctx, t0, 410, 0.22, "sine", 0.13);
      return true;
    }
    case "1f410.png": {
      beep(ctx, t0, 520, 0.14, "triangle", 0.11);
      beep(ctx, t0 + 0.16, 480, 0.12, "triangle", 0.09);
      return true;
    }
    case "1f41f.png": {
      for (let i = 0; i < 4; i++) {
        beep(ctx, t0 + i * 0.09, 900 + i * 120, 0.04, "sine", 0.06);
      }
      return true;
    }
    case "1f426.png": {
      beep(ctx, t0, 3200, 0.04, "sine", 0.08);
      beep(ctx, t0 + 0.07, 3600, 0.035, "sine", 0.07);
      return true;
    }
    case "1f986.png": {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(720, t0);
      o.frequency.exponentialRampToValueAtTime(320, t0 + 0.18);
      g.gain.setValueAtTime(0.13, t0);
      g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.22);
      o.connect(g).connect(ctx.destination);
      o.start(t0);
      o.stop(t0 + 0.25);
      return true;
    }
    case "1f985.png": {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sawtooth";
      o.frequency.setValueAtTime(1800, t0);
      o.frequency.exponentialRampToValueAtTime(1100, t0 + 0.35);
      g.gain.setValueAtTime(0.09, t0);
      g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.45);
      o.connect(g).connect(ctx.destination);
      o.start(t0);
      o.stop(t0 + 0.5);
      return true;
    }
    case "1f989.png": {
      beep(ctx, t0, 380, 0.2, "sine", 0.1);
      beep(ctx, t0 + 0.35, 360, 0.22, "sine", 0.09);
      return true;
    }
    case "1f43b.png": {
      noiseBurst(ctx, t0, 0.4, 0.13);
      return true;
    }
    case "1f43c.png": {
      beep(ctx, t0, 620, 0.12, "sine", 0.08);
      return true;
    }
    case "1f435.png": {
      for (let i = 0; i < 5; i++) {
        beep(ctx, t0 + i * 0.06, 780 + i * 40, 0.05, "square", 0.07);
      }
      return true;
    }
    case "1f430.png": {
      beep(ctx, t0, 2200, 0.05, "sine", 0.09);
      return true;
    }
    case "1f984.png": {
      [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
        beep(ctx, t0 + i * 0.1, f, 0.14, "sine", 0.07);
      });
      return true;
    }
    case "1f993.png": {
      beep(ctx, t0, 840, 0.15, "sine", 0.1);
      beep(ctx, t0 + 0.18, 920, 0.18, "sine", 0.09);
      return true;
    }
    case "1f992.png": {
      beep(ctx, t0, 340, 0.28, "sine", 0.09);
      return true;
    }
    case "1f413.png": {
      beep(ctx, t0, 520, 0.08, "sine", 0.1);
      beep(ctx, t0 + 0.1, 620, 0.08, "sine", 0.1);
      beep(ctx, t0 + 0.22, 780, 0.12, "sine", 0.11);
      beep(ctx, t0 + 0.38, 680, 0.2, "sine", 0.09);
      return true;
    }
    case "1f438.png": {
      // צפרדע — קוואק קוואק
      const croak = (start: number) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "sine";
        o.frequency.setValueAtTime(400, start);
        o.frequency.exponentialRampToValueAtTime(180, start + 0.14);
        g.gain.setValueAtTime(0.14, start);
        g.gain.exponentialRampToValueAtTime(0.001, start + 0.18);
        o.connect(g).connect(ctx.destination);
        o.start(start);
        o.stop(start + 0.2);
      };
      croak(t0);
      croak(t0 + 0.28);
      return true;
    }
    default:
      return false;
  }
}
