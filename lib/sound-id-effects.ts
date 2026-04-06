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

/** נביחה — סינוס יורד רך, בלי רעש לבן */
function dogBarks(ctx: AudioContext, t0: number): void {
  const bark = (start: number, f: number) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(f * 1.06, start);
    o.frequency.exponentialRampToValueAtTime(f * 0.78, start + 0.09);
    g.gain.setValueAtTime(0, start);
    g.gain.linearRampToValueAtTime(0.085, start + 0.012);
    g.gain.exponentialRampToValueAtTime(0.001, start + 0.13);
    o.connect(g).connect(ctx.destination);
    o.start(start);
    o.stop(start + 0.15);
  };
  bark(t0, 440);
  bark(t0 + 0.19, 400);
  bark(t0 + 0.41, 420);
}

/** מיאו — משולש, גלידה רכה */
function catMeow(ctx: AudioContext, t0: number): void {
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = "triangle";
  o.frequency.setValueAtTime(480, t0);
  o.frequency.exponentialRampToValueAtTime(720, t0 + 0.1);
  o.frequency.exponentialRampToValueAtTime(560, t0 + 0.28);
  o.frequency.exponentialRampToValueAtTime(340, t0 + 0.52);
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(0.075, t0 + 0.04);
  g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.58);
  o.connect(g).connect(ctx.destination);
  o.start(t0);
  o.stop(t0 + 0.62);
}

/** נהמה נמוכה (אריה/דוב) — סינוס + מעט רעש מסונן */
function lowGrowl(ctx: AudioContext, t0: number, baseHz: number): void {
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = "sine";
  o.frequency.setValueAtTime(baseHz, t0);
  o.frequency.linearRampToValueAtTime(baseHz * 0.92, t0 + 0.35);
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(0.1, t0 + 0.04);
  g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.42);
  o.connect(g).connect(ctx.destination);
  o.start(t0);
  o.stop(t0 + 0.45);
  noiseBurst(ctx, t0 + 0.05, 0.1, 0.05);
}

/** סירנה — סינוס בלבד, מעברים חלקים (לא ריבוע) */
function ambulanceSiren(ctx: AudioContext, t0: number): void {
  for (let c = 0; c < 3; c++) {
    const base = t0 + c * 0.52;
    const sweep = (start: number, from: number, to: number) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(from, start);
      o.frequency.linearRampToValueAtTime(to, start + 0.2);
      g.gain.setValueAtTime(0, start);
      g.gain.linearRampToValueAtTime(0.055, start + 0.03);
      g.gain.exponentialRampToValueAtTime(0.001, start + 0.24);
      o.connect(g).connect(ctx.destination);
      o.start(start);
      o.stop(start + 0.26);
    };
    sweep(base, 580, 820);
    sweep(base + 0.22, 820, 580);
  }
}

/** רכבת — פעימות מנוע נמוכות + צפירת קיטור רכה */
function trainSteam(ctx: AudioContext, t0: number): void {
  for (let i = 0; i < 9; i++) {
    const t = t0 + i * 0.13;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(88 + (i % 2) * 6, t);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.045, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    o.connect(g).connect(ctx.destination);
    o.start(t);
    o.stop(t + 0.11);
  }
  const w = ctx.createOscillator();
  const wg = ctx.createGain();
  w.type = "sine";
  w.frequency.setValueAtTime(480, t0 + 0.04);
  w.frequency.exponentialRampToValueAtTime(310, t0 + 0.58);
  wg.gain.setValueAtTime(0, t0 + 0.04);
  wg.gain.linearRampToValueAtTime(0.05, t0 + 0.08);
  wg.gain.exponentialRampToValueAtTime(0.001, t0 + 0.68);
  w.connect(wg).connect(ctx.destination);
  w.start(t0 + 0.04);
  w.stop(t0 + 0.72);
}

/** מנוע מכונית — שני סינוסים נמוכים */
function carEngine(ctx: AudioContext, t0: number): void {
  const o1 = ctx.createOscillator();
  const o2 = ctx.createOscillator();
  const g = ctx.createGain();
  o1.type = "sine";
  o2.type = "sine";
  o1.frequency.setValueAtTime(148, t0);
  o2.frequency.setValueAtTime(296, t0);
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(0.065, t0 + 0.04);
  g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.42);
  o1.connect(g);
  o2.connect(g);
  g.connect(ctx.destination);
  o1.start(t0);
  o2.start(t0);
  o1.stop(t0 + 0.46);
  o2.stop(t0 + 0.46);
}

/** מנוע אוטובוס — בס נמוך */
function busEngine(ctx: AudioContext, t0: number): void {
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = "triangle";
  o.frequency.setValueAtTime(112, t0);
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(0.058, t0 + 0.05);
  g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.36);
  o.connect(g).connect(ctx.destination);
  o.start(t0);
  o.stop(t0 + 0.4);
  const o2 = ctx.createOscillator();
  const g2 = ctx.createGain();
  o2.type = "sine";
  o2.frequency.setValueAtTime(118, t0 + 0.1);
  g2.gain.setValueAtTime(0, t0 + 0.1);
  g2.gain.linearRampToValueAtTime(0.04, t0 + 0.12);
  g2.gain.exponentialRampToValueAtTime(0.001, t0 + 0.28);
  o2.connect(g2).connect(ctx.destination);
  o2.start(t0 + 0.1);
  o2.stop(t0 + 0.3);
}

/** מטוס — משולש מסונן, בלי צפירה גבוהה */
function planeEngine(ctx: AudioContext, t0: number): void {
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 2200;
  lp.Q.value = 0.7;
  o.type = "triangle";
  o.frequency.setValueAtTime(125, t0);
  o.frequency.exponentialRampToValueAtTime(265, t0 + 0.82);
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(0.04, t0 + 0.05);
  g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.92);
  o.connect(lp).connect(g).connect(ctx.destination);
  o.start(t0);
  o.stop(t0 + 0.98);
}

/** צופר סירה */
function boatHorn(ctx: AudioContext, t0: number): void {
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = "sine";
  o.frequency.setValueAtTime(168, t0);
  o.frequency.linearRampToValueAtTime(158, t0 + 0.55);
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(0.065, t0 + 0.06);
  g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.72);
  o.connect(g).connect(ctx.destination);
  o.start(t0);
  o.stop(t0 + 0.78);
}

/** פעמון אופניים — שני צלילים */
function bicycleBell(ctx: AudioContext, t0: number): void {
  const ding = (start: number, f: number) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(f, start);
    g.gain.setValueAtTime(0, start);
    g.gain.linearRampToValueAtTime(0.075, start + 0.006);
    g.gain.exponentialRampToValueAtTime(0.001, start + 0.38);
    o.connect(g).connect(ctx.destination);
    o.start(start);
    o.stop(start + 0.42);
  };
  ding(t0, 790);
  ding(t0 + 0.1, 1180);
}

/** מסוק — רוטור עם עוצמה מתנודת (לא צורם) */
function helicopterRotor(ctx: AudioContext, t0: number): void {
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = "sine";
  o.frequency.setValueAtTime(228, t0);
  o.frequency.linearRampToValueAtTime(252, t0 + 0.88);
  for (let i = 0; i < 15; i++) {
    const s = t0 + i * 0.062;
    g.gain.setValueAtTime(i % 2 === 0 ? 0.055 : 0.028, s);
  }
  g.gain.setValueAtTime(0.001, t0 + 0.98);
  o.connect(g).connect(ctx.destination);
  o.start(t0);
  o.stop(t0 + 1.02);
}

/** משאית — רumble נמוך */
function truckRumble(ctx: AudioContext, t0: number): void {
  const o1 = ctx.createOscillator();
  const o2 = ctx.createOscillator();
  const g = ctx.createGain();
  o1.type = "sine";
  o2.type = "sine";
  o1.frequency.setValueAtTime(84, t0);
  o2.frequency.setValueAtTime(126, t0);
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(0.062, t0 + 0.05);
  g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.4);
  o1.connect(g);
  o2.connect(g);
  g.connect(ctx.destination);
  o1.start(t0);
  o2.start(t0);
  o1.stop(t0 + 0.44);
  o2.stop(t0 + 0.44);
}

export function playTwemojiSound(ctx: AudioContext, file: string): boolean {
  const t0 = now(ctx);

  switch (file) {
    case "1f691.png": {
      ambulanceSiren(ctx, t0);
      return true;
    }
    case "1f682.png": {
      trainSteam(ctx, t0);
      return true;
    }
    case "1f697.png": {
      carEngine(ctx, t0);
      return true;
    }
    case "1f68c.png": {
      busEngine(ctx, t0);
      return true;
    }
    case "2708.png": {
      planeEngine(ctx, t0);
      return true;
    }
    case "26f5.png": {
      boatHorn(ctx, t0);
      return true;
    }
    case "1f6b2.png": {
      bicycleBell(ctx, t0);
      return true;
    }
    case "1f681.png": {
      helicopterRotor(ctx, t0);
      return true;
    }
    case "1f69a.png": {
      truckRumble(ctx, t0);
      return true;
    }
    case "1f436.png": {
      dogBarks(ctx, t0);
      return true;
    }
    case "1f431.png": {
      catMeow(ctx, t0);
      return true;
    }
    case "1f981.png": {
      lowGrowl(ctx, t0, 108);
      return true;
    }
    case "1f418.png": {
      // חצוצרת פיל — שני טונים יורדים רכים
      const trump = (start: number, f: number) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "sine";
        o.frequency.setValueAtTime(f, start);
        o.frequency.exponentialRampToValueAtTime(f * 0.55, start + 0.28);
        g.gain.setValueAtTime(0, start);
        g.gain.linearRampToValueAtTime(0.09, start + 0.03);
        g.gain.exponentialRampToValueAtTime(0.001, start + 0.32);
        o.connect(g).connect(ctx.destination);
        o.start(start);
        o.stop(start + 0.35);
      };
      trump(t0, 480);
      trump(t0 + 0.36, 420);
      return true;
    }
    case "1f404.png": {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(220, t0);
      o.frequency.linearRampToValueAtTime(180, t0 + 0.5);
      g.gain.setValueAtTime(0, t0);
      g.gain.linearRampToValueAtTime(0.1, t0 + 0.06);
      g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.58);
      o.connect(g).connect(ctx.destination);
      o.start(t0);
      o.stop(t0 + 0.62);
      return true;
    }
    case "1f434.png": {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(520, t0);
      o.frequency.exponentialRampToValueAtTime(1180, t0 + 0.22);
      o.frequency.exponentialRampToValueAtTime(640, t0 + 0.48);
      g.gain.setValueAtTime(0, t0);
      g.gain.linearRampToValueAtTime(0.08, t0 + 0.04);
      g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.55);
      o.connect(g).connect(ctx.destination);
      o.start(t0);
      o.stop(t0 + 0.58);
      return true;
    }
    case "1f411.png": {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "triangle";
      o.frequency.setValueAtTime(520, t0);
      o.frequency.linearRampToValueAtTime(580, t0 + 0.08);
      o.frequency.linearRampToValueAtTime(500, t0 + 0.2);
      g.gain.setValueAtTime(0, t0);
      g.gain.linearRampToValueAtTime(0.075, t0 + 0.04);
      g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.26);
      o.connect(g).connect(ctx.destination);
      o.start(t0);
      o.stop(t0 + 0.3);
      return true;
    }
    case "1f410.png": {
      beep(ctx, t0, 480, 0.12, "triangle", 0.065);
      beep(ctx, t0 + 0.14, 440, 0.11, "triangle", 0.055);
      return true;
    }
    case "1f41f.png": {
      for (let i = 0; i < 3; i++) {
        beep(ctx, t0 + i * 0.11, 650 + i * 90, 0.06, "sine", 0.045);
      }
      return true;
    }
    case "1f426.png": {
      // ציוץ — לא צפירה גבוהה מדי
      beep(ctx, t0, 2100, 0.05, "sine", 0.055);
      beep(ctx, t0 + 0.06, 2400, 0.045, "sine", 0.05);
      beep(ctx, t0 + 0.14, 1900, 0.04, "sine", 0.045);
      return true;
    }
    case "1f986.png": {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(520, t0);
      o.frequency.exponentialRampToValueAtTime(240, t0 + 0.16);
      g.gain.setValueAtTime(0, t0);
      g.gain.linearRampToValueAtTime(0.09, t0 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.2);
      o.connect(g).connect(ctx.destination);
      o.start(t0);
      o.stop(t0 + 0.22);
      return true;
    }
    case "1f985.png": {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(1400, t0);
      o.frequency.exponentialRampToValueAtTime(900, t0 + 0.32);
      g.gain.setValueAtTime(0, t0);
      g.gain.linearRampToValueAtTime(0.065, t0 + 0.03);
      g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.38);
      o.connect(g).connect(ctx.destination);
      o.start(t0);
      o.stop(t0 + 0.42);
      return true;
    }
    case "1f989.png": {
      const hoot = (start: number, f: number) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "sine";
        o.frequency.setValueAtTime(f, start);
        g.gain.setValueAtTime(0, start);
        g.gain.linearRampToValueAtTime(0.08, start + 0.04);
        g.gain.exponentialRampToValueAtTime(0.001, start + 0.28);
        o.connect(g).connect(ctx.destination);
        o.start(start);
        o.stop(start + 0.32);
      };
      hoot(t0, 360);
      hoot(t0 + 0.38, 320);
      return true;
    }
    case "1f43b.png": {
      lowGrowl(ctx, t0, 72);
      return true;
    }
    case "1f43c.png": {
      beep(ctx, t0, 480, 0.14, "sine", 0.055);
      beep(ctx, t0 + 0.16, 520, 0.12, "sine", 0.05);
      return true;
    }
    case "1f435.png": {
      for (let i = 0; i < 4; i++) {
        beep(ctx, t0 + i * 0.07, 620 + i * 35, 0.055, "triangle", 0.05);
      }
      return true;
    }
    case "1f430.png": {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(1800, t0);
      o.frequency.exponentialRampToValueAtTime(2400, t0 + 0.06);
      g.gain.setValueAtTime(0, t0);
      g.gain.linearRampToValueAtTime(0.055, t0 + 0.01);
      g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.12);
      o.connect(g).connect(ctx.destination);
      o.start(t0);
      o.stop(t0 + 0.14);
      return true;
    }
    case "1f984.png": {
      [523.25, 659.25, 783.99, 988].forEach((f, i) => {
        beep(ctx, t0 + i * 0.1, f, 0.12, "sine", 0.055);
      });
      return true;
    }
    case "1f993.png": {
      beep(ctx, t0, 720, 0.14, "sine", 0.06);
      beep(ctx, t0 + 0.17, 800, 0.16, "sine", 0.055);
      return true;
    }
    case "1f992.png": {
      beep(ctx, t0, 380, 0.22, "sine", 0.055);
      return true;
    }
    case "1f413.png": {
      beep(ctx, t0, 480, 0.08, "sine", 0.065);
      beep(ctx, t0 + 0.09, 580, 0.08, "sine", 0.06);
      beep(ctx, t0 + 0.2, 720, 0.1, "sine", 0.065);
      beep(ctx, t0 + 0.34, 620, 0.16, "sine", 0.055);
      return true;
    }
    case "1f438.png": {
      const croak = (start: number) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "sine";
        o.frequency.setValueAtTime(360, start);
        o.frequency.exponentialRampToValueAtTime(160, start + 0.12);
        g.gain.setValueAtTime(0, start);
        g.gain.linearRampToValueAtTime(0.09, start + 0.02);
        g.gain.exponentialRampToValueAtTime(0.001, start + 0.16);
        o.connect(g).connect(ctx.destination);
        o.start(start);
        o.stop(start + 0.18);
      };
      croak(t0);
      croak(t0 + 0.26);
      return true;
    }
    default:
      return false;
  }
}
