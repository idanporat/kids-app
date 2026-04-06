"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { GameShell, useGameRewards } from "@/components/games/GameShell";
import { shuffle } from "@/components/games/ModuleGameCommon";
import { playCorrectChime, playSoftBuzz, resumeAudioContext, speakHebrew, unlockGameAudio } from "@/lib/game-audio";
import { SOUND_ID_ROUNDS, twemojiUrl } from "@/lib/game-data";
import { bumpGameModuleRound, recordGameAttempt } from "@/lib/game-progress";

export function SoundIdGame({ token }: { token: string }) {
  const [progress, setProgress] = useState(0);
  return (
    <GameShell token={token} progress={progress} onRoundComplete={() => bumpGameModuleRound(token, "sound-id")}>
      <SoundIdInner token={token} onProgress={setProgress} />
    </GameShell>
  );
}

function SoundIdInner({
  token,
  onProgress,
}: {
  token: string;
  onProgress: (pct: number) => void;
}) {
  const { triggerStars, triggerRoundComplete } = useGameRewards();
  const indices = useMemo(() => shuffle(SOUND_ID_ROUNDS.map((_, i) => i)), []);
  const [cursor, setCursor] = useState(0);
  const [busy, setBusy] = useState(false);
  const [correctInWave, setCorrectInWave] = useState(0);
  const heardRef = useRef<string | null>(null);

  const round = SOUND_ID_ROUNDS[indices[cursor % indices.length]];
  const shuffledOptions = useMemo(() => shuffle([...round.options]), [round]);

  const roundKey = `${round.speak}-${cursor}`;
  useEffect(() => {
    heardRef.current = null;
  }, [roundKey]);

  const waveProgress = (correctInWave / 5) * 100;
  useEffect(() => {
    onProgress(waveProgress);
  }, [onProgress, waveProgress]);

  function maybeSpeakOnFirstTouch(e: React.PointerEvent) {
    if (e.target instanceof Element && e.target.closest("[data-audio-replay]")) return;
    if (heardRef.current === roundKey) return;
    heardRef.current = roundKey;
    unlockGameAudio();
    void speakHebrew(round.speak);
  }

  function replay() {
    if (busy) return;
    resumeAudioContext();
    void speakHebrew(round.speak);
  }

  function handlePick(file: string) {
    if (busy) return;
    if (file !== round.correct) {
      recordGameAttempt(token, "sound-id", "wrong", `צליל «${round.speak}» — בחירה לא נכונה`);
      playSoftBuzz();
      if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(35);
      return;
    }
    setBusy(true);
    recordGameAttempt(token, "sound-id", "correct");
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
        <p className="text-center text-2xl font-bold text-slate-800 dark:text-slate-100">מי משמיע?</p>
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
