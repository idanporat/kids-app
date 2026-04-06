"use client";

import { useEffect, useMemo, useState } from "react";

import { GameShell, useGameRewards } from "@/components/games/GameShell";
import { shuffle } from "@/components/games/ModuleGameCommon";
import { playCorrectChime, playSoftBuzz, resumeAudioContext, speakHebrew } from "@/lib/game-audio";
import { RHYME_ROUNDS } from "@/lib/game-data";
import { bumpGameModuleRound, recordGameAttempt } from "@/lib/game-progress";

export function RhymesGame({ token }: { token: string }) {
  const [progress, setProgress] = useState(0);
  return (
    <GameShell token={token} progress={progress} onRoundComplete={() => bumpGameModuleRound(token, "rhymes")}>
      <RhymesInner token={token} onProgress={setProgress} />
    </GameShell>
  );
}

function RhymesInner({
  token,
  onProgress,
}: {
  token: string;
  onProgress: (pct: number) => void;
}) {
  const { triggerStars, triggerRoundComplete } = useGameRewards();
  const indices = useMemo(() => shuffle(RHYME_ROUNDS.map((_, i) => i)), []);
  const [cursor, setCursor] = useState(0);
  const [busy, setBusy] = useState(false);
  const [correctInWave, setCorrectInWave] = useState(0);

  const round = RHYME_ROUNDS[indices[cursor % indices.length]];
  const shuffledOptions = useMemo(() => shuffle([...round.options]), [round]);

  const waveProgress = (correctInWave / 5) * 100;
  useEffect(() => {
    onProgress(waveProgress);
  }, [onProgress, waveProgress]);

  function replay() {
    if (busy) return;
    resumeAudioContext();
    void speakHebrew(`איזה מילה חורזת עם ${round.anchor}?`);
  }

  function handlePick(word: string) {
    if (busy) return;
    if (word !== round.correct) {
      recordGameAttempt(token, "rhymes", "wrong", `חרוז ל־«${round.anchor}» — בחירה לא נכונה`);
      playSoftBuzz();
      if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(35);
      return;
    }
    setBusy(true);
    recordGameAttempt(token, "rhymes", "correct");
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
        <p className="text-center text-2xl font-bold text-slate-800 dark:text-slate-100">חרוזים</p>
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

      <div className="rounded-3xl border-4 border-pink-200 bg-pink-50/80 px-10 py-8 dark:border-pink-700 dark:bg-pink-950/30">
        <p className="text-center text-5xl font-bold">{round.anchor}</p>
      </div>

      <div className="grid w-full max-w-lg grid-cols-1 gap-4 sm:grid-cols-3">
        {shuffledOptions.map((word) => (
          <button
            key={`${cursor}-${word}`}
            type="button"
            disabled={busy}
            onClick={() => handlePick(word)}
            className="flex min-h-[72px] items-center justify-center rounded-3xl border-4 border-slate-200 bg-white px-4 py-3 text-2xl font-bold shadow-md transition active:scale-95 disabled:opacity-70 dark:border-slate-600 dark:bg-slate-900"
          >
            {word}
          </button>
        ))}
      </div>
    </div>
  );
}
