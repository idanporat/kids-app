"use client";

import { useEffect, useMemo, useState } from "react";

import { GameShell, useGameRewards } from "@/components/games/GameShell";
import { shuffle } from "@/components/games/ModuleGameCommon";
import { playCorrectChime, playSoftBuzz, resumeAudioContext, speakHebrew, unlockGameAudio } from "@/lib/game-audio";
import { ENVIRONMENT_ROUNDS, environmentMeta, twemojiUrl } from "@/lib/game-data";
import { bumpGameModuleRound, recordGameAttempt } from "@/lib/game-progress";

export function EnvironmentsGame({ token }: { token: string }) {
  const [progress, setProgress] = useState(0);
  return (
    <GameShell token={token} progress={progress} onRoundComplete={() => bumpGameModuleRound(token, "environments")}>
      <EnvironmentsInner token={token} onProgress={setProgress} />
    </GameShell>
  );
}

function EnvironmentsInner({
  token,
  onProgress,
}: {
  token: string;
  onProgress: (pct: number) => void;
}) {
  const { triggerStars, triggerRoundComplete } = useGameRewards();
  const indices = useMemo(() => shuffle(ENVIRONMENT_ROUNDS.map((_, i) => i)), []);
  const [cursor, setCursor] = useState(0);
  const [busy, setBusy] = useState(false);
  const [correctInWave, setCorrectInWave] = useState(0);

  const round = ENVIRONMENT_ROUNDS[indices[cursor % indices.length]];
  const zones = useMemo(() => shuffle([...round.envs]), [round]);

  const waveProgress = (correctInWave / 5) * 100;
  useEffect(() => {
    onProgress(waveProgress);
  }, [onProgress, waveProgress]);

  function replay() {
    if (busy) return;
    resumeAudioContext();
    void speakHebrew(`איפה שייך ${round.itemLabel}?`);
  }

  function pickEnv(env: (typeof round)["correctEnv"]) {
    if (busy) return;
    unlockGameAudio();
    if (env !== round.correctEnv) {
      recordGameAttempt(token, "environments", "wrong", `«${round.itemLabel}» — סביבה לא נכונה`);
      playSoftBuzz();
      if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(35);
      return;
    }
    setBusy(true);
    recordGameAttempt(token, "environments", "correct");
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
        <p className="text-center text-2xl font-bold text-slate-800 dark:text-slate-100">גרור במחשבה: איפה זה?</p>
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

      <div className="flex flex-col items-center gap-3 rounded-3xl border-4 border-cyan-200 bg-cyan-50/80 px-8 py-6 dark:border-cyan-700 dark:bg-cyan-950/30">
        <p className="text-3xl font-bold">{round.itemLabel}</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={twemojiUrl(round.itemFile)}
          alt=""
          width={120}
          height={120}
          className="h-[120px] w-[120px] object-contain"
        />
      </div>

      <div className="grid w-full max-w-2xl grid-cols-3 gap-3">
        {zones.map((env) => {
          const m = environmentMeta(env);
          return (
            <button
              key={`${cursor}-${env}`}
              type="button"
              disabled={busy}
              onClick={() => pickEnv(env)}
              className={`flex min-h-[140px] flex-col items-center justify-center gap-2 rounded-3xl border-4 border-slate-200 bg-gradient-to-b p-3 shadow-md transition active:scale-95 disabled:opacity-70 dark:border-slate-600 ${m.bg}`}
            >
              <span className="text-lg font-bold text-slate-900 dark:text-slate-100">{m.label}</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={twemojiUrl(m.file)} alt="" width={72} height={72} className="h-[72px] w-[72px] object-contain" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
