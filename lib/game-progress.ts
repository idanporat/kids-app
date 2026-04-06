"use client";

import type { GameId } from "@/lib/game-data";
import { createClient } from "@/utils/supabase/client";

export type ShapeHeroProgress = { roundsCompleted: number };
export type PowerMemoryProgress = { maxPairs: number };
export type HeroWordsProgress = { roundsCompleted: number };
export type CategoryPickProgress = { roundsCompleted: number };
export type SpeakItProgress = { roundsCompleted: number };

export type AllGameProgress = {
  shapeHero: ShapeHeroProgress;
  powerMemory: PowerMemoryProgress;
  heroWords: HeroWordsProgress;
  categoryPick: CategoryPickProgress;
  speakIt: SpeakItProgress;
  updatedAt: string;
};

const defaultProgress = (): AllGameProgress => ({
  shapeHero: { roundsCompleted: 0 },
  powerMemory: { maxPairs: 2 },
  heroWords: { roundsCompleted: 0 },
  categoryPick: { roundsCompleted: 0 },
  speakIt: { roundsCompleted: 0 },
  updatedAt: new Date().toISOString(),
});

function mergeProgressPatch(parsed: Partial<AllGameProgress> | null | undefined): AllGameProgress {
  const base = defaultProgress();
  if (!parsed || typeof parsed !== "object") return base;
  return {
    ...base,
    ...parsed,
    shapeHero: { ...base.shapeHero, ...parsed.shapeHero },
    powerMemory: { ...base.powerMemory, ...parsed.powerMemory },
    heroWords: { ...base.heroWords, ...parsed.heroWords },
    categoryPick: { ...base.categoryPick, ...parsed.categoryPick },
    speakIt: { ...base.speakIt, ...parsed.speakIt },
  };
}

/** Normalize JSON from localStorage or Supabase `child_game_progress.data`. */
export function parseGameProgressFromJson(raw: unknown): AllGameProgress {
  if (raw == null) return defaultProgress();
  if (typeof raw === "string") {
    try {
      return mergeProgressPatch(JSON.parse(raw) as Partial<AllGameProgress>);
    } catch {
      return defaultProgress();
    }
  }
  return mergeProgressPatch(raw as Partial<AllGameProgress>);
}

function key(token: string) {
  return `kids-game-progress:${token}`;
}

async function pushProgressToServer(token: string, merged: AllGameProgress) {
  try {
    const supabase = createClient();
    const { error } = await supabase.rpc("sync_game_progress_by_token", {
      p_token: token,
      p_data: merged,
    });
    if (error) console.warn("[game progress sync]", error.message);
  } catch (e) {
    console.warn("[game progress sync]", e);
  }
}

export function loadProgress(token: string): AllGameProgress {
  if (typeof window === "undefined") return defaultProgress();
  try {
    const raw = localStorage.getItem(key(token));
    if (!raw) return defaultProgress();
    return mergeProgressPatch(JSON.parse(raw) as Partial<AllGameProgress>);
  } catch {
    return defaultProgress();
  }
}

export function saveProgress(token: string, next: Partial<AllGameProgress>) {
  if (typeof window === "undefined") return;
  const prev = loadProgress(token);
  const merged: AllGameProgress = {
    ...prev,
    ...next,
    shapeHero: { ...prev.shapeHero, ...next.shapeHero },
    powerMemory: { ...prev.powerMemory, ...next.powerMemory },
    heroWords: { ...prev.heroWords, ...next.heroWords },
    categoryPick: { ...prev.categoryPick, ...next.categoryPick },
    speakIt: { ...prev.speakIt, ...next.speakIt },
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(key(token), JSON.stringify(merged));
  void pushProgressToServer(token, merged);
}

export function bumpShapeHero(token: string) {
  const p = loadProgress(token);
  saveProgress(token, {
    shapeHero: { roundsCompleted: p.shapeHero.roundsCompleted + 1 },
  });
}

export function updatePowerMemory(token: string, pairs: number) {
  const p = loadProgress(token);
  if (pairs <= p.powerMemory.maxPairs) return;
  saveProgress(token, { powerMemory: { maxPairs: pairs } });
}

export function bumpHeroWords(token: string) {
  const p = loadProgress(token);
  saveProgress(token, {
    heroWords: { roundsCompleted: p.heroWords.roundsCompleted + 1 },
  });
}

export function bumpCategoryPick(token: string) {
  const p = loadProgress(token);
  saveProgress(token, {
    categoryPick: { roundsCompleted: p.categoryPick.roundsCompleted + 1 },
  });
}

export function bumpSpeakIt(token: string) {
  const p = loadProgress(token);
  saveProgress(token, {
    speakIt: { roundsCompleted: p.speakIt.roundsCompleted + 1 },
  });
}

/** One-line summary for compact display (parent dashboard / copy). */
export function formatProgressSummary(p: AllGameProgress): string {
  return [
    `גיבור הצורות: ${p.shapeHero.roundsCompleted} סיבובים`,
    `זיכרון הכוחות: עד ${p.powerMemory.maxPairs} זוגות`,
    `מילים: ${p.heroWords.roundsCompleted} סיבובים`,
    `מה שייך: ${p.categoryPick.roundsCompleted} סיבובים`,
    `אומרים בקול: ${p.speakIt.roundsCompleted} סיבובים`,
  ].join(" · ");
}

export function totalCompletedRounds(p: AllGameProgress): number {
  return (
    p.shapeHero.roundsCompleted +
    p.heroWords.roundsCompleted +
    p.categoryPick.roundsCompleted +
    p.speakIt.roundsCompleted
  );
}

export function formatProgressUpdatedAt(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleString("he-IL", { dateStyle: "short", timeStyle: "short" });
  } catch {
    return "";
  }
}

export function gameLabel(id: GameId): string {
  switch (id) {
    case "shape-hero":
      return "גיבור הצורות";
    case "power-memory":
      return "זיכרון הכוחות";
    case "hero-words":
      return "מילים של גיבורים";
    case "category-pick":
      return "מה שייך?";
    case "speak-it":
      return "אומרים בקול";
    default:
      return id;
  }
}
