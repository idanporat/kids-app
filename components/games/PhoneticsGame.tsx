"use client";

import { useEffect, useMemo, useState } from "react";

import { GameShell, useGameRewards } from "@/components/games/GameShell";
import { shuffle } from "@/components/games/ModuleGameCommon";
import { playCorrectChime, playSoftBuzz, resumeAudioContext, speakHebrew, unlockGameAudio } from "@/lib/game-audio";
import { PHONETICS_ROUNDS, twemojiUrl } from "@/lib/game-data";
import { bumpGameModuleRound, recordGameAttempt } from "@/lib/game-progress";

export function PhoneticsGame({ token }: { token: string }) {
  const [progress, setProgress] = useState(0);
  return (
    <GameShell token={token} progress={progress} onRoundComplete={() => bumpGameModuleRound(token, "phonetics")}>
      <PhoneticsInner token={token} onProgress={setProgress} />
    </GameShell>
  );
}

function PhoneticsInner({
  token,
  onProgress,
}: {
  token: string;
  onProgress: (pct: number) => void;
}) {
  const { triggerStars, triggerRoundComplete } = useGameRewards();
  const indices = useMemo(() => shuffle(PHONETICS_ROUNDS.map((_, i) => i)), []);
  const [cursor, setCursor] = useState(0);
  const [busy, setBusy] = useState(false);
  const [correctInWave, setCorrectInWave] = useState(0);

  const round = PHONETICS_ROUNDS[indices[cursor % indices.length]];
  const shuffledOptions = useMemo(
    () => shuffle([round.options[0], round.options[1], round.options[2]]),
    [round],
  );

  const waveProgress = (correctInWave / 5) * 100;
  useEffect(() => {
    onProgress(waveProgress);
  }, [onProgress, waveProgress]);

  function replay() {
    if (busy) return;
    resumeAudioContext();
    void speakHebrew(`איזה מילה מתחילה ב־${round.letter}?`);
  }

  function handlePick(file: string) {
    if (busy) return;
    unlockGameAudio();
    if (file !== round.correct) {
      recordGameAttempt(token, "phonetics", "wrong", `אות ${round.letter} — בחירה לא נכונה`);
      playSoftBuzz();
      if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(35);
      return;
    }
    setBusy(true);
    recordGameAttempt(token, "phonetics", "correct");
    playCorrectChime();
    triggerStars();
    void speakHebrew(round.word);
    const next = correctInWave + 1;
    if (next >= 5) {
      triggerRoundComplete();
      setCorrectInWave(0);
    } else {
      setCorrectInWave(next);
    }
    setCursor((c) => c + 1);
    window.setTimeout(() => setBusy(false), 500);
  }

  return (
    <div className="flex flex-col items-center gap-8 px-2">
      <div className="flex flex-col items-center gap-4">
        <p className="text-center text-2xl font-bold text-slate-800 dark:text-slate-100">אות ראשונה</p>
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

      <div className="flex flex-col items-center gap-2 rounded-3xl border-4 border-amber-200 bg-amber-50/80 px-10 py-8 dark:border-amber-700 dark:bg-amber-950/30">
        <p className="text-3xl font-bold text-slate-700 dark:text-slate-200">האות</p>
        <p className="text-6xl font-bold">{round.letter}</p>
        <p className="text-lg text-slate-600 dark:text-slate-300">בחרו את התמונה שמתחילה באות הזו</p>
      </div>

      <div className="grid w-full max-w-lg grid-cols-1 gap-4 sm:grid-cols-3">
        {shuffledOptions.map((opt) => (
          <button
            key={`${cursor}-${opt.file}`}
            type="button"
            disabled={busy}
            onClick={() => handlePick(opt.file)}
            className="flex min-h-[120px] flex-col items-center justify-center gap-2 rounded-3xl border-4 border-slate-200 bg-white px-2 py-3 shadow-md transition active:scale-95 disabled:opacity-70 dark:border-slate-600 dark:bg-slate-900"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={twemojiUrl(opt.file)}
              alt=""
              width={100}
              height={100}
              className="h-[100px] w-[100px] object-contain"
            />
            <span className="text-center text-2xl font-bold leading-tight text-slate-800 dark:text-slate-100">
              {opt.word}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
