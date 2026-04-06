"use client";

import Link from "next/link";
import { createContext, useCallback, useContext, useMemo, useState } from "react";

import { RewardAnimation } from "@/components/games/RewardAnimation";
import { unlockGameAudio } from "@/lib/game-audio";

type RewardsApi = {
  triggerStars: () => void;
  triggerRoundComplete: () => void;
};

const GameRewardsContext = createContext<RewardsApi | null>(null);

export function useGameRewards(): RewardsApi {
  const ctx = useContext(GameRewardsContext);
  return (
    ctx ?? {
      triggerStars: () => {},
      triggerRoundComplete: () => {},
    }
  );
}

type Props = {
  token: string;
  /** 0–100 */
  progress?: number;
  children: React.ReactNode;
  onRoundComplete?: () => void;
};

export function GameShell({ token, progress = 0, children, onRoundComplete }: Props) {
  const [reward, setReward] = useState<"stars" | "hero-fly" | "none">("none");

  const triggerStars = useCallback(() => {
    unlockGameAudio();
    setReward("stars");
    window.setTimeout(() => setReward("none"), 900);
  }, []);

  const triggerRoundComplete = useCallback(() => {
    unlockGameAudio();
    setReward("hero-fly");
    onRoundComplete?.();
    window.setTimeout(() => setReward("none"), 2200);
  }, [onRoundComplete]);

  const api = useMemo(
    () => ({ triggerStars, triggerRoundComplete }),
    [triggerStars, triggerRoundComplete]
  );

  return (
    <GameRewardsContext.Provider value={api}>
      <div
        className="flex min-h-[70vh] flex-col"
        onPointerDownCapture={() => {
          unlockGameAudio();
        }}
      >
        <div className="mb-4 flex items-center gap-3">
          <Link
            href={`/join/${token}/games`}
            className="inline-flex min-h-[48px] min-w-[48px] items-center justify-center rounded-2xl border-2 border-slate-300 bg-[var(--card)] px-4 text-2xl leading-none shadow-sm transition hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-800"
            aria-label="חזרה"
          >
            ←
          </Link>
          <div className="h-4 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
            <div
              className="h-full rounded-full bg-gradient-to-l from-blue-500 to-violet-500 transition-[width] duration-500 ease-out"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
        </div>

        <div className="relative flex-1">{children}</div>

        <RewardAnimation variant={reward} show={reward !== "none"} />
      </div>
    </GameRewardsContext.Provider>
  );
}
