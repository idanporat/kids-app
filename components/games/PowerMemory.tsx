"use client";

import { useCallback, useEffect, useState } from "react";

import { GameShell, useGameRewards } from "@/components/games/GameShell";
import { playCorrectChime, playRoundComplete, playSoftBuzz } from "@/lib/game-audio";
import { recordGameAttempt, updatePowerMemory } from "@/lib/game-progress";
import { MEMORY_SYMBOLS } from "@/lib/game-data";

type Card = {
  id: number;
  symbol: string;
  flipped: boolean;
  matched: boolean;
};

const PAIR_LEVELS = [2, 3, 4] as const;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildDeck(pairs: number): Card[] {
  const sym = shuffle([...MEMORY_SYMBOLS]).slice(0, pairs);
  const deck: Card[] = [];
  let id = 0;
  for (const s of sym) {
    deck.push({ id: id++, symbol: s, flipped: false, matched: false });
    deck.push({ id: id++, symbol: s, flipped: false, matched: false });
  }
  return shuffle(deck);
}

function PowerMemoryInner({
  token,
  onProgress,
  pairs,
  onLevelComplete,
}: {
  token: string;
  onProgress: (pct: number) => void;
  pairs: number;
  onLevelComplete: () => void;
}) {
  const { triggerStars, triggerRoundComplete } = useGameRewards();
  const [cards, setCards] = useState<Card[]>(() => buildDeck(pairs));
  const [lock, setLock] = useState(false);

  const matchedPairs = cards.filter((c) => c.matched).length / 2;
  const progress = (matchedPairs / pairs) * 100;

  useEffect(() => {
    onProgress(progress);
  }, [onProgress, progress]);

  const finishLevel = useCallback(() => {
    updatePowerMemory(token, pairs);
    playRoundComplete();
    triggerRoundComplete();
    onLevelComplete();
  }, [onLevelComplete, pairs, token, triggerRoundComplete]);

  function handleClick(id: number) {
    if (lock) return;
    const card = cards.find((c) => c.id === id);
    if (!card || card.matched || card.flipped) return;

    const flipped = cards.filter((c) => c.flipped && !c.matched);
    if (flipped.length >= 2) return;
    if (flipped.length >= 1) {
      const first = flipped[0];
      if (first.id === id) return;

      setCards((prev) => prev.map((c) => (c.id === id ? { ...c, flipped: true } : c)));
      setLock(true);

      const second = cards.find((c) => c.id === id)!;

      if (first.symbol === second.symbol) {
        recordGameAttempt(token, "power-memory", "correct");
        playCorrectChime();
        triggerStars();
        setCards((prev) => {
          const next = prev.map((c) =>
            c.symbol === first.symbol ? { ...c, matched: true, flipped: true } : c
          );
          const allDone = next.every((c) => c.matched);
          if (allDone) {
            window.setTimeout(() => finishLevel(), 400);
          }
          return next;
        });
        setLock(false);
        return;
      }

      recordGameAttempt(
        token,
        "power-memory",
        "wrong",
        `לא התאים: ${first.symbol} ו-${second.symbol}`
      );
      playSoftBuzz();
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate(30);
      }
      window.setTimeout(() => {
        setCards((prev) =>
          prev.map((c) =>
            c.id === first.id || c.id === id ? { ...c, flipped: false } : c
          )
        );
        setLock(false);
      }, 2000);
      return;
    }

    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, flipped: true } : c)));
  }

  const cols = pairs <= 2 ? 2 : pairs <= 3 ? 3 : 4;

  return (
    <div className="flex flex-col items-center gap-6 px-2">
      <div
        className="grid w-full max-w-xl gap-3 justify-items-center"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {cards.map((card) => (
          <button
            key={card.id}
            type="button"
            disabled={lock || card.matched}
            onClick={() => handleClick(card.id)}
            className={`relative flex min-h-[92px] min-w-[92px] max-w-[120px] items-center justify-center rounded-2xl border-4 text-5xl transition-transform active:scale-95 disabled:cursor-default ${
              card.matched
                ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40"
                : card.flipped
                  ? "border-blue-500 bg-white dark:bg-slate-900"
                  : "border-slate-300 bg-slate-100 dark:border-slate-600 dark:bg-slate-800"
            }`}
            aria-pressed={card.flipped || card.matched}
          >
            {card.flipped || card.matched ? (
              <span>{card.symbol}</span>
            ) : (
              <span className="text-4xl opacity-70" aria-hidden>
                ?
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export function PowerMemory({ token }: { token: string }) {
  const [progress, setProgress] = useState(0);
  const [levelIdx, setLevelIdx] = useState(0);
  const pairs = PAIR_LEVELS[Math.min(levelIdx, PAIR_LEVELS.length - 1)];

  return (
    <GameShell token={token} progress={progress}>
      <PowerMemoryInner
        key={pairs}
        token={token}
        onProgress={setProgress}
        pairs={pairs}
        onLevelComplete={() => {
          setLevelIdx((i) => (i < PAIR_LEVELS.length - 1 ? i + 1 : 0));
        }}
      />
    </GameShell>
  );
}
