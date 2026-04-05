"use client";

import { useEffect, useMemo, useState } from "react";

import { GameShell, useGameRewards } from "@/components/games/GameShell";
import { playCorrectChime, playSoftBuzz, resumeAudioContext, speakHebrew } from "@/lib/game-audio";
import { SPEAK_ROUNDS, twemojiUrl } from "@/lib/game-data";
import { transcriptMatchesExpected } from "@/lib/hebrew-match";
import { bumpSpeakIt } from "@/lib/game-progress";
import { isSpeechRecognitionAvailable, listenHebrewOnce } from "@/lib/speech-recognition";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function SpeakItInner({ onProgress }: { onProgress: (pct: number) => void }) {
  const { triggerStars, triggerRoundComplete } = useGameRewards();
  const indices = useMemo(() => shuffle(SPEAK_ROUNDS.map((_, i) => i)), []);
  const [cursor, setCursor] = useState(0);
  const [busy, setBusy] = useState(false);
  const [listening, setListening] = useState(false);
  const [correctInWave, setCorrectInWave] = useState(0);
  const [lastHeard, setLastHeard] = useState<string | null>(null);
  const [micError, setMicError] = useState<string | null>(null);

  const srOk = useMemo(() => isSpeechRecognitionAvailable(), []);
  const round = SPEAK_ROUNDS[indices[cursor % indices.length]];

  const progress = (correctInWave / 5) * 100;

  useEffect(() => {
    onProgress(progress);
  }, [onProgress, progress]);

  function hintWord() {
    if (busy || listening) return;
    resumeAudioContext();
    void speakHebrew(round.word);
  }

  async function handleMic() {
    if (!srOk || busy || listening) return;
    setBusy(true);
    setMicError(null);
    setLastHeard(null);
    resumeAudioContext();
    setListening(true);
    const result = await listenHebrewOnce({ timeoutMs: 14000 });
    setListening(false);

    if (!result.ok) {
      setBusy(false);
      if (result.reason === "not_allowed") {
        setMicError("צריך לאשר מיקרופון בדפדפן");
      } else if (result.reason === "unavailable") {
        setMicError("אין זיהוי דיבור בדפדפן — נסה כרום");
      } else if (result.reason === "no_speech") {
        setMicError("לא נשמע — נסה שוב");
      } else {
        setMicError("נסה שוב");
      }
      return;
    }

    setLastHeard(result.transcript);
    const ok = transcriptMatchesExpected(result.transcript, round.word, round.alternates);

    if (!ok) {
      playSoftBuzz();
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate(35);
      }
      setBusy(false);
      return;
    }

    playCorrectChime();
    triggerStars();
    const next = correctInWave + 1;
    if (next >= 5) {
      triggerRoundComplete();
      setCorrectInWave(0);
    } else {
      setCorrectInWave(next);
    }
    setLastHeard(null);
    setCursor((c) => c + 1);
    window.setTimeout(() => setBusy(false), 400);
  }

  return (
    <div className="flex flex-col items-center gap-6 px-2">
      <div className="text-6xl" aria-hidden>
        🎤
      </div>

      {!srOk && (
        <p className="max-w-md rounded-2xl bg-amber-100 px-4 py-3 text-center text-sm text-amber-900 dark:bg-amber-950/50 dark:text-amber-100">
          זיהוי דיבור לא זמין בדפדפן הזה. פתח בכרום או אדג׳ במחשב, או השתמש בכפתור הרמז כדי לשמוע את המילה.
        </p>
      )}

      <div className="flex min-h-[200px] min-w-[200px] items-center justify-center rounded-3xl border-4 border-slate-200 bg-white p-6 shadow-inner dark:border-slate-600 dark:bg-slate-900">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={twemojiUrl(round.image)}
          alt=""
          width={180}
          height={180}
          className="h-[180px] w-[180px] object-contain"
        />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={hintWord}
          disabled={busy || listening}
          className="inline-flex min-h-[56px] min-w-[56px] items-center justify-center rounded-full border-4 border-violet-400 bg-violet-100 px-5 text-3xl shadow-md transition active:scale-95 disabled:opacity-60 dark:bg-violet-950/40"
          aria-label="רמז — השמע מילה"
          title="רמז"
        >
          🔊
        </button>

        <button
          type="button"
          onClick={() => void handleMic()}
          disabled={!srOk || busy || listening}
          className={`inline-flex min-h-[88px] min-w-[88px] items-center justify-center rounded-full border-4 px-8 text-5xl shadow-lg transition active:scale-95 disabled:opacity-50 ${
            listening
              ? "animate-pulse border-rose-500 bg-rose-200 dark:bg-rose-950/60"
              : "border-rose-400 bg-rose-100 hover:bg-rose-50 dark:bg-rose-950/40"
          }`}
          aria-label="דבר למיקרופון"
        >
          {listening ? "🎙️" : "🎤"}
        </button>
      </div>

      {listening && (
        <p className="text-center text-lg font-medium text-rose-600 dark:text-rose-400">מקשיבים…</p>
      )}

      {lastHeard && (
        <p className="text-center text-sm text-slate-600 dark:text-slate-400" dir="rtl">
          נשמע: {lastHeard}
        </p>
      )}

      {micError && (
        <p className="text-center text-sm text-amber-700 dark:text-amber-300" role="status">
          {micError}
        </p>
      )}
    </div>
  );
}

export function SpeakIt({ token }: { token: string }) {
  const [progress, setProgress] = useState(0);

  return (
    <GameShell
      token={token}
      progress={progress}
      onRoundComplete={() => bumpSpeakIt(token)}
    >
      <SpeakItInner onProgress={setProgress} />
    </GameShell>
  );
}
