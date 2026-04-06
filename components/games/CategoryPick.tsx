"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { GameShell, useGameRewards } from "@/components/games/GameShell";
import { playCorrectChime, playSoftBuzz, resumeAudioContext, speakHebrew, unlockGameAudio } from "@/lib/game-audio";
import { bumpCategoryPick, recordGameAttempt } from "@/lib/game-progress";
import { CATEGORY_ROUNDS, twemojiUrl } from "@/lib/game-data";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function CategoryPickInner({
  token,
  onProgress,
}: {
  token: string;
  onProgress: (pct: number) => void;
}) {
  const { triggerStars, triggerRoundComplete } = useGameRewards();
  const indices = useMemo(() => shuffle(CATEGORY_ROUNDS.map((_, i) => i)), []);
  const [cursor, setCursor] = useState(0);
  const [busy, setBusy] = useState(false);
  const [correctInWave, setCorrectInWave] = useState(0);

  const round = CATEGORY_ROUNDS[indices[cursor % indices.length]];
  const shuffledOptions = useMemo(
    () => shuffle([...round.options]),
    [round]
  );

  const progress = (correctInWave / 5) * 100;

  const roundKey = `${round.category}-${cursor}`;
  const heardRef = useRef<string | null>(null);
  useEffect(() => {
    heardRef.current = null;
  }, [roundKey]);

  useEffect(() => {
    onProgress(progress);
  }, [onProgress, progress]);

  function maybeSpeakOnFirstTouch(e: React.PointerEvent) {
    if (e.target instanceof Element && e.target.closest("[data-audio-replay]")) return;
    if (heardRef.current === roundKey) return;
    heardRef.current = roundKey;
    unlockGameAudio();
    void speakHebrew(round.category);
  }

  function replay() {
    if (busy) return;
    resumeAudioContext();
    void speakHebrew(round.category);
  }

  function handlePick(file: string) {
    if (busy) return;
    if (file !== round.correct) {
      recordGameAttempt(
        token,
        "category-pick",
        "wrong",
        `נושא «${round.category}» — נבחרה תמונה לא נכונה`
      );
      playSoftBuzz();
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate(35);
      }
      return;
    }
    setBusy(true);
    recordGameAttempt(token, "category-pick", "correct");
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
    <div className="flex flex-col items-center gap-8 px-2" onPointerDownCapture={maybeSpeakOnFirstTouch}>
      <div className="flex flex-col items-center gap-4">
        <div className="text-7xl" aria-hidden>
          🏷️
        </div>
        <button
          type="button"
          data-audio-replay
          onClick={replay}
          disabled={busy}
          className="inline-flex min-h-[56px] min-w-[56px] items-center justify-center rounded-full border-4 border-emerald-400 bg-emerald-100 px-6 text-4xl shadow-md transition active:scale-95 disabled:opacity-60 dark:bg-emerald-950/50"
          aria-label="השמע שוב"
        >
          🔊
        </button>
      </div>

      <div className="grid w-full max-w-lg grid-cols-3 gap-4">
        {shuffledOptions.map((file) => (
          <button
            key={`${cursor}-${file}`}
            type="button"
            disabled={busy}
            onClick={() => handlePick(file)}
            className="flex min-h-[104px] min-w-[104px] items-center justify-center rounded-3xl border-4 border-slate-200 bg-white p-2 shadow-md transition active:scale-95 disabled:opacity-70 dark:border-slate-600 dark:bg-slate-900"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={twemojiUrl(file)}
              alt=""
              width={100}
              height={100}
              className="h-[100px] w-[100px] object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export function CategoryPick({ token }: { token: string }) {
  const [progress, setProgress] = useState(0);

  return (
    <GameShell
      token={token}
      progress={progress}
      onRoundComplete={() => bumpCategoryPick(token)}
    >
      <CategoryPickInner token={token} onProgress={setProgress} />
    </GameShell>
  );
}
