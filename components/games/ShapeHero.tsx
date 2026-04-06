"use client";

import { useEffect, useMemo, useState } from "react";

import { GameShell, useGameRewards } from "@/components/games/GameShell";
import { playCorrectChime, playSoftBuzz } from "@/lib/game-audio";
import { bumpShapeHero, recordGameAttempt } from "@/lib/game-progress";
import { SHAPES, type ShapeId } from "@/lib/game-data";

const SHAPE_LABEL: Record<ShapeId, string> = {
  circle: "עיגול",
  square: "ריבוע",
  triangle: "משולש",
  star: "כוכב",
  heart: "לב",
  hexagon: "משושה",
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeRound(): { target: ShapeId; choices: ShapeId[] } {
  const t = SHAPES[Math.floor(Math.random() * SHAPES.length)];
  const others = shuffle(SHAPES.filter((x) => x !== t)).slice(0, 3);
  return { target: t, choices: shuffle([t, ...others]) };
}

function ShapeSvg({ shape, size = 140 }: { shape: ShapeId; size?: number }) {
  const s = size;
  const stroke = "currentColor";
  switch (shape) {
    case "circle":
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className="text-blue-600" aria-hidden>
          <circle cx="50" cy="50" r="38" fill="none" strokeWidth="8" stroke={stroke} />
        </svg>
      );
    case "square":
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className="text-emerald-600" aria-hidden>
          <rect x="18" y="18" width="64" height="64" rx="6" fill="none" strokeWidth="8" stroke={stroke} />
        </svg>
      );
    case "triangle":
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className="text-amber-600" aria-hidden>
          <polygon points="50,14 88,86 12,86" fill="none" strokeWidth="8" stroke={stroke} strokeLinejoin="round" />
        </svg>
      );
    case "star":
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className="text-violet-600" aria-hidden>
          <polygon
            points="50,8 61,38 94,38 68,58 78,90 50,72 22,90 32,58 6,38 39,38"
            fill="none"
            strokeWidth="6"
            stroke={stroke}
            strokeLinejoin="round"
          />
        </svg>
      );
    case "heart":
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className="text-rose-600" aria-hidden>
          <path
            d="M50 88 C20 60 5 40 5 28 C5 14 18 8 32 18 C42 24 48 32 50 36 C52 32 58 24 68 18 C82 8 95 14 95 28 C95 40 80 60 50 88 Z"
            fill="none"
            strokeWidth="7"
            stroke={stroke}
            strokeLinejoin="round"
          />
        </svg>
      );
    case "hexagon":
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className="text-cyan-600" aria-hidden>
          <polygon
            points="50,8 88,28 88,72 50,92 12,72 12,28"
            fill="none"
            strokeWidth="7"
            stroke={stroke}
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return null;
  }
}

function ShapeHeroInner({
  token,
  onProgress,
}: {
  token: string;
  onProgress: (pct: number) => void;
}) {
  const { triggerStars, triggerRoundComplete } = useGameRewards();
  const [round, setRound] = useState(() => makeRound());
  const [correctInWave, setCorrectInWave] = useState(0);
  const [busy, setBusy] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);

  const progress = useMemo(() => (correctInWave / 5) * 100, [correctInWave]);

  useEffect(() => {
    onProgress(progress);
  }, [onProgress, progress]);

  function handlePick(shape: ShapeId) {
    if (busy) return;
    if (shape !== round.target) {
      recordGameAttempt(
        token,
        "shape-hero",
        "wrong",
        `נבחר ${SHAPE_LABEL[shape]} במקום ${SHAPE_LABEL[round.target]}`
      );
      setBusy(true);
      setShakeKey((k) => k + 1);
      playSoftBuzz();
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate(35);
      }
      window.setTimeout(() => setBusy(false), 380);
      return;
    }

    setBusy(true);
    recordGameAttempt(token, "shape-hero", "correct");
    playCorrectChime();
    triggerStars();
    const next = correctInWave + 1;
    if (next >= 5) {
      triggerRoundComplete();
      setCorrectInWave(0);
    } else {
      setCorrectInWave(next);
    }
    setRound(makeRound());
    window.setTimeout(() => setBusy(false), 450);
  }

  return (
    <div className="flex flex-col items-center gap-8 px-2">
      <div className="flex flex-col items-center gap-4">
        <div className="text-6xl" aria-hidden>
          🦸
        </div>
        <div
          className={`rounded-3xl border-4 border-dashed border-blue-400/80 bg-blue-50/80 p-6 dark:bg-blue-950/40 ${shakeKey ? "shake-soft" : ""}`}
          key={shakeKey}
        >
          <ShapeSvg shape={round.target} size={160} />
        </div>
      </div>

      <div className="grid w-full max-w-md grid-cols-2 gap-4 sm:grid-cols-4">
        {round.choices.map((shape) => (
          <button
            key={`${round.target}-${shape}-${round.choices.join()}`}
            type="button"
            disabled={busy}
            onClick={() => handlePick(shape)}
            className="flex min-h-[88px] min-w-[88px] items-center justify-center rounded-3xl border-4 border-slate-200 bg-[var(--card)] p-3 shadow-md transition active:scale-95 disabled:opacity-70 dark:border-slate-600"
            aria-label={SHAPE_LABEL[shape]}
          >
            <ShapeSvg shape={shape} size={80} />
          </button>
        ))}
      </div>
    </div>
  );
}

export function ShapeHero({ token }: { token: string }) {
  const [progress, setProgress] = useState(0);

  return (
    <GameShell
      token={token}
      progress={progress}
      onRoundComplete={() => {
        bumpShapeHero(token);
      }}
    >
      <ShapeHeroInner token={token} onProgress={setProgress} />
    </GameShell>
  );
}
