"use client";

import { useEffect, useMemo, useState } from "react";

import { GameShell, useGameRewards } from "@/components/games/GameShell";
import { ShapeSvg } from "@/components/games/ShapeSvg";
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
