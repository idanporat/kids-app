"use client";

import { isGameId, type GameId } from "@/lib/game-data";
import { createClient } from "@/utils/supabase/client";

const MISTAKES_CAP = 40;
const DETAIL_MAX = 220;

export type ProgressMistake = {
  game: GameId;
  at: string;
  detail: string;
};

export type ShapeHeroProgress = {
  roundsCompleted: number;
  correctCount: number;
  wrongCount: number;
};
export type PowerMemoryProgress = {
  maxPairs: number;
  correctCount: number;
  wrongCount: number;
};
export type HeroWordsProgress = {
  roundsCompleted: number;
  correctCount: number;
  wrongCount: number;
};
export type CategoryPickProgress = {
  roundsCompleted: number;
  correctCount: number;
  wrongCount: number;
};
export type SpeakItProgress = {
  roundsCompleted: number;
  correctCount: number;
  wrongCount: number;
};

export type AllGameProgress = {
  shapeHero: ShapeHeroProgress;
  powerMemory: PowerMemoryProgress;
  heroWords: HeroWordsProgress;
  categoryPick: CategoryPickProgress;
  speakIt: SpeakItProgress;
  recentMistakes: ProgressMistake[];
  updatedAt: string;
};

const defaultProgress = (): AllGameProgress => ({
  shapeHero: { roundsCompleted: 0, correctCount: 0, wrongCount: 0 },
  powerMemory: { maxPairs: 2, correctCount: 0, wrongCount: 0 },
  heroWords: { roundsCompleted: 0, correctCount: 0, wrongCount: 0 },
  categoryPick: { roundsCompleted: 0, correctCount: 0, wrongCount: 0 },
  speakIt: { roundsCompleted: 0, correctCount: 0, wrongCount: 0 },
  recentMistakes: [],
  updatedAt: new Date().toISOString(),
});

function normMistakes(raw: unknown): ProgressMistake[] {
  if (!Array.isArray(raw)) return [];
  const out: ProgressMistake[] = [];
  for (const m of raw) {
    if (!m || typeof m !== "object") continue;
    const o = m as Record<string, unknown>;
    const game = o.game;
    const at = o.at;
    const detail = o.detail;
    if (
      typeof game === "string" &&
      isGameId(game) &&
      typeof at === "string" &&
      typeof detail === "string" &&
      detail.length > 0
    ) {
      out.push({
        game,
        at,
        detail: detail.slice(0, DETAIL_MAX),
      });
    }
  }
  return out.slice(-MISTAKES_CAP);
}

function mergeProgressPatch(parsed: Partial<AllGameProgress> | null | undefined): AllGameProgress {
  const base = defaultProgress();
  if (!parsed || typeof parsed !== "object") return base;
  return {
    ...base,
    ...parsed,
    shapeHero: {
      roundsCompleted: parsed.shapeHero?.roundsCompleted ?? base.shapeHero.roundsCompleted,
      correctCount: parsed.shapeHero?.correctCount ?? base.shapeHero.correctCount,
      wrongCount: parsed.shapeHero?.wrongCount ?? base.shapeHero.wrongCount,
    },
    powerMemory: {
      maxPairs: parsed.powerMemory?.maxPairs ?? base.powerMemory.maxPairs,
      correctCount: parsed.powerMemory?.correctCount ?? base.powerMemory.correctCount,
      wrongCount: parsed.powerMemory?.wrongCount ?? base.powerMemory.wrongCount,
    },
    heroWords: {
      roundsCompleted: parsed.heroWords?.roundsCompleted ?? base.heroWords.roundsCompleted,
      correctCount: parsed.heroWords?.correctCount ?? base.heroWords.correctCount,
      wrongCount: parsed.heroWords?.wrongCount ?? base.heroWords.wrongCount,
    },
    categoryPick: {
      roundsCompleted: parsed.categoryPick?.roundsCompleted ?? base.categoryPick.roundsCompleted,
      correctCount: parsed.categoryPick?.correctCount ?? base.categoryPick.correctCount,
      wrongCount: parsed.categoryPick?.wrongCount ?? base.categoryPick.wrongCount,
    },
    speakIt: {
      roundsCompleted: parsed.speakIt?.roundsCompleted ?? base.speakIt.roundsCompleted,
      correctCount: parsed.speakIt?.correctCount ?? base.speakIt.correctCount,
      wrongCount: parsed.speakIt?.wrongCount ?? base.speakIt.wrongCount,
    },
    recentMistakes: normMistakes(parsed.recentMistakes),
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

async function pushViaSupabaseRpc(token: string, merged: AllGameProgress) {
  const supabase = createClient();
  const { error } = await supabase.rpc("sync_game_progress_by_token", {
    p_token: token,
    p_data: merged,
  });
  if (error) console.warn("[game progress sync rpc]", error.message);
}

async function pushProgressToServer(token: string, merged: AllGameProgress) {
  try {
    const res = await fetch("/api/game-progress/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, data: merged }),
    });
    if (res.ok) return;
    const errBody = await res.json().catch(() => ({}));
    console.warn("[game progress sync api]", res.status, errBody);
    await pushViaSupabaseRpc(token, merged);
  } catch (e) {
    console.warn("[game progress sync api]", e);
    await pushViaSupabaseRpc(token, merged);
  }
}

/** Push current localStorage snapshot (e.g. on entering /join/:token/games). */
export async function flushProgressToServer(token: string) {
  const merged = loadProgress(token);
  await pushProgressToServer(token, merged);
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
    recentMistakes: next.recentMistakes ?? prev.recentMistakes,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(key(token), JSON.stringify(merged));
  void pushProgressToServer(token, merged);
}

function clampDetail(d: string): string {
  const t = d.trim();
  if (!t) return "";
  return t.length > DETAIL_MAX ? `${t.slice(0, DETAIL_MAX)}…` : t;
}

/**
 * Records a single attempt (correct tap / wrong tap, match / mismatch, etc.).
 * On wrong + detail, appends to `recentMistakes` (capped) for parent view.
 */
export function recordGameAttempt(
  token: string,
  game: GameId,
  outcome: "correct" | "wrong",
  mistakeDetail?: string
) {
  const prev = loadProgress(token);
  const d = mistakeDetail ? clampDetail(mistakeDetail) : "";

  const bump = (correct: number, wrong: number) =>
    outcome === "correct" ? { correct: correct + 1, wrong } : { correct, wrong: wrong + 1 };

  let shapeHero = prev.shapeHero;
  let powerMemory = prev.powerMemory;
  let heroWords = prev.heroWords;
  let categoryPick = prev.categoryPick;
  let speakIt = prev.speakIt;

  switch (game) {
    case "shape-hero": {
      const { correct, wrong } = bump(prev.shapeHero.correctCount, prev.shapeHero.wrongCount);
      shapeHero = { ...prev.shapeHero, correctCount: correct, wrongCount: wrong };
      break;
    }
    case "power-memory": {
      const { correct, wrong } = bump(prev.powerMemory.correctCount, prev.powerMemory.wrongCount);
      powerMemory = { ...prev.powerMemory, correctCount: correct, wrongCount: wrong };
      break;
    }
    case "hero-words": {
      const { correct, wrong } = bump(prev.heroWords.correctCount, prev.heroWords.wrongCount);
      heroWords = { ...prev.heroWords, correctCount: correct, wrongCount: wrong };
      break;
    }
    case "category-pick": {
      const { correct, wrong } = bump(prev.categoryPick.correctCount, prev.categoryPick.wrongCount);
      categoryPick = { ...prev.categoryPick, correctCount: correct, wrongCount: wrong };
      break;
    }
    case "speak-it": {
      const { correct, wrong } = bump(prev.speakIt.correctCount, prev.speakIt.wrongCount);
      speakIt = { ...prev.speakIt, correctCount: correct, wrongCount: wrong };
      break;
    }
    default:
      return;
  }

  let recentMistakes = prev.recentMistakes;
  if (outcome === "wrong" && d) {
    recentMistakes = [...prev.recentMistakes, { game, at: new Date().toISOString(), detail: d }].slice(
      -MISTAKES_CAP
    );
  }

  saveProgress(token, {
    shapeHero,
    powerMemory,
    heroWords,
    categoryPick,
    speakIt,
    recentMistakes,
  });
}

export function bumpShapeHero(token: string) {
  const p = loadProgress(token);
  saveProgress(token, {
    shapeHero: { ...p.shapeHero, roundsCompleted: p.shapeHero.roundsCompleted + 1 },
  });
}

export function updatePowerMemory(token: string, pairs: number) {
  const p = loadProgress(token);
  if (pairs <= p.powerMemory.maxPairs) return;
  saveProgress(token, { powerMemory: { ...p.powerMemory, maxPairs: pairs } });
}

export function bumpHeroWords(token: string) {
  const p = loadProgress(token);
  saveProgress(token, {
    heroWords: { ...p.heroWords, roundsCompleted: p.heroWords.roundsCompleted + 1 },
  });
}

export function bumpCategoryPick(token: string) {
  const p = loadProgress(token);
  saveProgress(token, {
    categoryPick: { ...p.categoryPick, roundsCompleted: p.categoryPick.roundsCompleted + 1 },
  });
}

export function bumpSpeakIt(token: string) {
  const p = loadProgress(token);
  saveProgress(token, {
    speakIt: { ...p.speakIt, roundsCompleted: p.speakIt.roundsCompleted + 1 },
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

/** "3 נכון · 1 לא נכון" or hint when no attempts */
export function formatAttemptsLine(correct: number, wrong: number): string {
  const n = correct + wrong;
  if (n === 0) return "אין עדיין ניסיונות שנספרו";
  return `${correct} נכון · ${wrong} לא נכון`;
}
