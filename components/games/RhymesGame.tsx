"use client";

import { useEffect, useMemo, useState } from "react";

import { GameShell, useGameRewards } from "@/components/games/GameShell";
import { shuffle } from "@/components/games/ModuleGameCommon";
import { playCorrectChime, playSoftBuzz, resumeAudioContext, speakHebrew } from "@/lib/game-audio";
import { RHYME_ROUNDS, twemojiUrl } from "@/lib/game-data";
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

  function labelForImageFile(file: string): string {
    if (file === round.correct) return round.correctLabel;
    if (file === round.anchorFile) return round.anchorLabel;
    return round.distractorLabel;
  }

  const waveProgress = (correctInWave / 5) * 100;
  useEffect(() => {
    onProgress(waveProgress);
  }, [onProgress, waveProgress]);

  function replay() {
    if (busy) return;
    resumeAudioContext();
    void speakHebrew("מצאו תמונה שחורזת עם התמונה למעלה");
  }

  function handlePick(file: string) {
    if (busy) return;
    if (file !== round.correct) {
      recordGameAttempt(token, "rhymes", "wrong", "חרוזים — בחירה לא נכונה");
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

      <div className="flex flex-col items-center gap-2 rounded-3xl border-4 border-pink-200 bg-pink-50/80 px-6 py-6 dark:border-pink-700 dark:bg-pink-950/30 sm:px-10 sm:py-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={twemojiUrl(round.anchorFile)}
          alt={round.anchorLabel}
          width={140}
          height={140}
          className="mx-auto h-[140px] w-[140px] object-contain"
        />
        <p className="max-w-[16rem] text-center text-xl font-semibold leading-snug text-pink-950 dark:text-pink-100">
          {round.anchorLabel}
        </p>
        <p className="text-center text-sm text-slate-600 dark:text-slate-400">מצאו תמונה שחורזת עם המילה למעלה</p>
      </div>

      <div className="grid w-full max-w-lg grid-cols-1 gap-4 sm:grid-cols-3">
        {shuffledOptions.map((file) => (
          <button
            key={`${cursor}-${file}`}
            type="button"
            disabled={busy}
            onClick={() => handlePick(file)}
            aria-label={labelForImageFile(file)}
            className="flex min-h-[120px] flex-col items-center justify-center gap-2 rounded-3xl border-4 border-slate-200 bg-white p-3 shadow-md transition active:scale-95 disabled:opacity-70 dark:border-slate-600 dark:bg-slate-900"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={twemojiUrl(file)}
              alt=""
              width={100}
              height={100}
              className="h-[100px] w-[100px] object-contain"
            />
            <span className="max-w-[9rem] text-center text-base font-medium leading-tight text-slate-800 dark:text-slate-100">
              {labelForImageFile(file)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
