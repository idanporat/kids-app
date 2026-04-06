"use client";

import { useEffect, useMemo, useState } from "react";

import { GameShell, useGameRewards } from "@/components/games/GameShell";
import { shuffle } from "@/components/games/ModuleGameCommon";
import { playCorrectChime, playSoftBuzz, resumeAudioContext, speakHebrew } from "@/lib/game-audio";
import { COUNTING_ROUNDS, twemojiUrl } from "@/lib/game-data";
import { bumpGameModuleRound, recordGameAttempt } from "@/lib/game-progress";

export function CountingGame({ token }: { token: string }) {
  const [progress, setProgress] = useState(0);
  return (
    <GameShell token={token} progress={progress} onRoundComplete={() => bumpGameModuleRound(token, "counting")}>
      <CountingInner token={token} onProgress={setProgress} />
    </GameShell>
  );
}

function CountIcon({ n, icon }: { n: number; icon: string }) {
  return (
    <div className="flex min-h-[100px] w-full flex-wrap content-center justify-center gap-1 p-2">
      {Array.from({ length: n }, (_, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          src={twemojiUrl(icon)}
          alt=""
          width={36}
          height={36}
          className="h-9 w-9 object-contain"
        />
      ))}
    </div>
  );
}

function CountingInner({
  token,
  onProgress,
}: {
  token: string;
  onProgress: (pct: number) => void;
}) {
  const { triggerStars, triggerRoundComplete } = useGameRewards();
  const indices = useMemo(() => shuffle(COUNTING_ROUNDS.map((_, i) => i)), []);
  const [cursor, setCursor] = useState(0);
  const [busy, setBusy] = useState(false);
  const [correctInWave, setCorrectInWave] = useState(0);

  const round = COUNTING_ROUNDS[indices[cursor % indices.length]];
  const shuffledOptions = useMemo(() => shuffle([...round.options]), [round]);

  const waveProgress = (correctInWave / 5) * 100;
  useEffect(() => {
    onProgress(waveProgress);
  }, [onProgress, waveProgress]);

  function replay() {
    if (busy) return;
    resumeAudioContext();
    void speakHebrew(`מצאו את התמונה עם ${round.n} פריטים`);
  }

  function handlePick(choice: string) {
    if (busy) return;
    if (choice !== round.correct) {
      recordGameAttempt(token, "counting", "wrong", `ספירה — בחירה לא נכונה`);
      playSoftBuzz();
      if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(35);
      return;
    }
    setBusy(true);
    recordGameAttempt(token, "counting", "correct");
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
        <p className="text-center text-2xl font-bold text-slate-800 dark:text-slate-100">כמה יש בתמונה?</p>
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

      <div className="rounded-3xl border-4 border-lime-200 bg-lime-50/80 px-6 py-8 dark:border-lime-700 dark:bg-lime-950/30">
        <p className="text-center text-4xl font-bold tabular-nums">מספר {round.n}</p>
      </div>

      <div className="grid w-full max-w-lg grid-cols-3 gap-4">
        {shuffledOptions.map((opt) => {
          const n = Number.parseInt(opt, 10);
          return (
            <button
              key={`${cursor}-${opt}`}
              type="button"
              disabled={busy}
              onClick={() => handlePick(opt)}
              className="flex min-h-[120px] flex-col items-center justify-center rounded-3xl border-4 border-slate-200 bg-white shadow-md transition active:scale-95 disabled:opacity-70 dark:border-slate-600 dark:bg-slate-900"
            >
              <CountIcon n={n} icon={round.icon} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
