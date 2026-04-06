"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { GameShell, useGameRewards } from "@/components/games/GameShell";
import { shuffle } from "@/components/games/ModuleGameCommon";
import { playCorrectChime, playSoftBuzz, resumeAudioContext, speakHebrew, unlockGameAudio } from "@/lib/game-audio";
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
  const [dragX, setDragX] = useState(56);
  const dragXRef = useRef(56);
  const dragStart = useRef<{ x: number; start: number } | null>(null);
  useEffect(() => {
    dragXRef.current = dragX;
  }, [dragX]);

  const round = VISUAL_CLOSURE_ROUNDS[indices[cursor % indices.length]];
  const img = twemojiUrl(round.file);

  const waveProgress = (correctInWave / 5) * 100;
  useEffect(() => {
    onProgress(waveProgress);
  }, [onProgress, waveProgress]);

  useEffect(() => {
    setDragX(56);
  }, [cursor, round.file]);

  function replay() {
    if (busy) return;
    resumeAudioContext();
    void speakHebrew(`השלם את ${round.label}`);
  }

  function completeOk() {
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
    window.setTimeout(() => setBusy(false), 450);
  }

  function onPointerDown(e: React.PointerEvent) {
    if (busy) return;
    unlockGameAudio();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragStart.current = { x: e.clientX, start: dragXRef.current };
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragStart.current || busy) return;
    const dx = e.clientX - dragStart.current.x;
    const next = Math.min(72, Math.max(-8, dragStart.current.start + dx));
    setDragX(next);
  }

  function onPointerUp() {
    if (!dragStart.current || busy) return;
    dragStart.current = null;
    if (dragX <= 12) {
      completeOk();
    } else {
      recordGameAttempt(token, "visual-closure", "wrong", `«${round.label}» — עדיין לא חיברת נכון`);
      playSoftBuzz();
      if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(35);
    }
  }

  return (
    <div className="flex flex-col items-center gap-8 px-2">
      <div className="flex flex-col items-center gap-4">
        <p className="text-center text-2xl font-bold text-slate-800 dark:text-slate-100">הזז את החצי הימני אל השמאלי</p>
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

      <div className="relative flex h-36 w-[17rem] max-w-full items-center justify-center rounded-3xl border-4 border-fuchsia-200 bg-fuchsia-50/80 px-2 py-8 dark:border-fuchsia-700 dark:bg-fuchsia-950/30">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-2xl border-2 border-slate-200 bg-white/80" aria-hidden />
        <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-l-2xl border-2 border-slate-300 bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img} alt="" className="h-32 w-32 object-contain" style={{ clipPath: "inset(0 50% 0 0)" }} />
        </div>
        <div
          role="slider"
          aria-valuenow={dragX}
          className="relative z-10 h-32 w-32 shrink-0 cursor-grab touch-none overflow-hidden rounded-r-2xl border-2 border-dashed border-violet-400 bg-white active:cursor-grabbing"
          style={{ transform: `translateX(${dragX}px)` }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img} alt="" className="h-32 w-32 object-contain" style={{ clipPath: "inset(0 0 0 50%)" }} />
        </div>
      </div>

      <p className="text-center text-lg text-slate-600 dark:text-slate-300">{round.label}</p>
    </div>
  );
}
