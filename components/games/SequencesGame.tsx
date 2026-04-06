"use client";

import { useEffect, useMemo, useState } from "react";

import { GameShell, useGameRewards } from "@/components/games/GameShell";
import { shuffle } from "@/components/games/ModuleGameCommon";
import { playCorrectChime, playSoftBuzz, resumeAudioContext, speakHebrew } from "@/lib/game-audio";
import { SEQUENCE_ROUNDS } from "@/lib/game-data";
import { bumpGameModuleRound, recordGameAttempt } from "@/lib/game-progress";

export function SequencesGame({ token }: { token: string }) {
  const [progress, setProgress] = useState(0);
  return (
    <GameShell token={token} progress={progress} onRoundComplete={() => bumpGameModuleRound(token, "sequences")}>
      <SequencesInner token={token} onProgress={setProgress} />
    </GameShell>
  );
}

function SequencesInner({
  token,
  onProgress,
}: {
  token: string;
  onProgress: (pct: number) => void;
}) {
  const { triggerStars, triggerRoundComplete } = useGameRewards();
  const indices = useMemo(() => shuffle(SEQUENCE_ROUNDS.map((_, i) => i)), []);
  const [cursor, setCursor] = useState(0);
  const [busy, setBusy] = useState(false);
  const [correctInWave, setCorrectInWave] = useState(0);

  const round = SEQUENCE_ROUNDS[indices[cursor % indices.length]];
  const shuffledOptions = useMemo(() => shuffle([...round.options]), [round]);

  const waveProgress = (correctInWave / 5) * 100;
  useEffect(() => {
    onProgress(waveProgress);
  }, [onProgress, waveProgress]);

  function replay() {
    if (busy) return;
    resumeAudioContext();
    void speakHebrew("איזה מספר חסר בסדרה?");
  }

  function handlePick(n: number) {
    if (busy) return;
    if (n !== round.answer) {
      recordGameAttempt(token, "sequences", "wrong", `סדרה — נבחרה תשובה לא נכונה`);
      playSoftBuzz();
      if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(35);
      return;
    }
    setBusy(true);
    recordGameAttempt(token, "sequences", "correct");
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
        <p className="text-center text-2xl font-bold text-slate-800 dark:text-slate-100">מה חסר בסדרה?</p>
        <button
          type="button"
          onClick={replay}
          disabled={busy}
          className="inline-flex min-h-[56px] min-w-[56px] items-center justify-center rounded-full border-4 border-emerald-400 bg-emerald-100 px-6 text-4xl shadow-md transition active:scale-95 disabled:opacity-60 dark:bg-emerald-950/50"
          aria-label="השמע שוב"
        >
          🔊
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 rounded-3xl border-4 border-blue-200 bg-blue-50/80 px-6 py-10 dark:border-blue-700 dark:bg-blue-950/30">
        {round.display.map((cell, i) => (
          <div
            key={i}
            className={`flex h-16 min-w-[3rem] items-center justify-center rounded-2xl border-2 px-3 text-2xl font-bold ${
              cell === "_"
                ? "border-dashed border-violet-400 bg-white text-violet-600 dark:bg-slate-900"
                : "border-slate-200 bg-white dark:border-slate-600 dark:bg-slate-900"
            }`}
          >
            {cell}
          </div>
        ))}
      </div>

      <div className="grid w-full max-w-lg grid-cols-3 gap-4">
        {shuffledOptions.map((n) => (
          <button
            key={`${cursor}-${n}`}
            type="button"
            disabled={busy}
            onClick={() => handlePick(n)}
            className="flex min-h-[88px] items-center justify-center rounded-3xl border-4 border-slate-200 bg-white text-4xl font-bold shadow-md transition active:scale-95 disabled:opacity-70 dark:border-slate-600 dark:bg-slate-900"
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}
