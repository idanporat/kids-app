"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";

import { GameShell, useGameRewards } from "@/components/games/GameShell";
import { shuffle } from "@/components/games/ModuleGameCommon";
import { playCorrectChime, playSoftBuzz, resumeAudioContext, speakHebrew } from "@/lib/game-audio";
import { VISUAL_CLOSURE_ROUNDS, twemojiUrl } from "@/lib/game-data";
import { bumpGameModuleRound, recordGameAttempt } from "@/lib/game-progress";

export function VisualClosureGame({ token }: { token: string }) {
  const [progress, setProgress] = useState(0);
  return (
    <GameShell token={token} progress={progress} onRoundComplete={() => bumpGameModuleRound(token, "visual-closure")}>
      <VisualClosureInner token={token} onProgress={setProgress} />
    </GameShell>
  );
}

function rightHalfStyle(): CSSProperties {
  return { clipPath: "inset(0 0 0 50%)" };
}

function VisualClosureInner({
  token,
  onProgress,
}: {
  token: string;
  onProgress: (pct: number) => void;
}) {
  const { triggerStars, triggerRoundComplete } = useGameRewards();
  const indices = useMemo(() => shuffle(VISUAL_CLOSURE_ROUNDS.map((_, i) => i)), []);
  const [cursor, setCursor] = useState(0);
  const [busy, setBusy] = useState(false);
  const [correctInWave, setCorrectInWave] = useState(0);

  const round = VISUAL_CLOSURE_ROUNDS[indices[cursor % indices.length]];
  const shuffledOptions = useMemo(
    () => shuffle([round.file, round.wrong[0], round.wrong[1]]),
    [round],
  );

  const img = twemojiUrl(round.file);

  const waveProgress = (correctInWave / 5) * 100;
  useEffect(() => {
    onProgress(waveProgress);
  }, [onProgress, waveProgress]);

  function replay() {
    if (busy) return;
    resumeAudioContext();
    void speakHebrew("בחרו את חצי התמונה שמשלים את התמונה למעלה");
  }

  function handlePick(file: string) {
    if (busy) return;
    if (file !== round.file) {
      recordGameAttempt(token, "visual-closure", "wrong", "השלמת תמונה — בחירה לא נכונה");
      playSoftBuzz();
      if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(35);
      return;
    }
    setBusy(true);
    recordGameAttempt(token, "visual-closure", "correct");
    playCorrectChime();
    triggerStars();
    const next = correctInWave + 1;
    if (next >= 5) {
      triggerRoundComplete();
      setCorrectInWave(0);
    } else {
      setCorrectInWave(next);
    }
    setCursor((c) => c + 1);
    window.setTimeout(() => setBusy(false), 400);
  }

  return (
    <div className="flex flex-col items-center gap-8 px-2">
      <div className="flex flex-col items-center gap-4">
        <button
          type="button"
          onClick={replay}
          disabled={busy}
          className="inline-flex min-h-[56px] min-w-[56px] items-center justify-center rounded-full border-4 border-emerald-400 bg-emerald-100 px-6 text-4xl shadow-md transition active:scale-95 disabled:opacity-60 dark:bg-emerald-950/50"
          aria-label="השמע הוראות"
        >
          🔊
        </button>
      </div>

      <div className="relative flex h-36 w-[17rem] max-w-full items-center justify-center rounded-3xl border-4 border-fuchsia-200 bg-fuchsia-50/80 px-2 py-8 dark:border-fuchsia-700 dark:bg-fuchsia-950/30">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-2xl border-2 border-slate-200 bg-white/80" aria-hidden />
        <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl border-2 border-slate-300 bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img} alt="" className="h-32 w-32 object-contain" style={{ clipPath: "inset(0 50% 0 0)" }} />
        </div>
      </div>

      <div className="grid w-full max-w-lg grid-cols-3 gap-4">
        {shuffledOptions.map((file) => (
          <button
            key={`${cursor}-${file}`}
            type="button"
            disabled={busy}
            onClick={() => handlePick(file)}
            className="flex min-h-[104px] min-w-[104px] items-center justify-center rounded-3xl border-4 border-violet-200 bg-white p-1 shadow-md transition active:scale-95 disabled:opacity-70 dark:border-violet-700 dark:bg-slate-900"
          >
            <div className="relative h-24 w-24 overflow-hidden rounded-xl border border-dashed border-violet-400 bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={twemojiUrl(file)}
                alt=""
                className="h-24 w-24 object-contain"
                style={rightHalfStyle()}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
