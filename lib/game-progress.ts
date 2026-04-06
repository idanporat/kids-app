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
export type CategoryPickProgress = {
  roundsCompleted: number;
  correctCount: number;
  wrongCount: number;
};

/** סטטיסטיקה אחידה למשחקי המודולים החדשים */
export type ModuleProgress = {
  roundsCompleted: number;
  correctCount: number;
  wrongCount: number;
};

export type AllGameProgress = {
  shapeHero: ShapeHeroProgress;
  powerMemory: PowerMemoryProgress;
  categoryPick: CategoryPickProgress;
  associations: ModuleProgress;
  environments: ModuleProgress;
  shapeMatch: ModuleProgress;
  contextMatch: ModuleProgress;
  actionMatch: ModuleProgress;
  visualClosure: ModuleProgress;
  opposites: ModuleProgress;
  rhymes: ModuleProgress;
  sequences: ModuleProgress;
  counting: ModuleProgress;
  phonetics: ModuleProgress;
  recentMistakes: ProgressMistake[];
  updatedAt: string;
};

/** מיפוי מזהה משחק לשדה ב־AllGameProgress (למודולים החדשים) */
export const MODULE_GAME_PROGRESS_KEYS: Partial<Record<GameId, keyof AllGameProgress>> = {
  associations: "associations",
  environments: "environments",
  "shape-match": "shapeMatch",
  "context-match": "contextMatch",
  "action-match": "actionMatch",
  "visual-closure": "visualClosure",
  opposites: "opposites",
  rhymes: "rhymes",
  sequences: "sequences",
  counting: "counting",
  phonetics: "phonetics",
};

const moduleDefault = (): ModuleProgress => ({
  roundsCompleted: 0,
  correctCount: 0,
  wrongCount: 0,
});

const defaultProgress = (): AllGameProgress => ({
  shapeHero: { roundsCompleted: 0, correctCount: 0, wrongCount: 0 },
  powerMemory: { maxPairs: 2, correctCount: 0, wrongCount: 0 },
  categoryPick: { roundsCompleted: 0, correctCount: 0, wrongCount: 0 },
  associations: moduleDefault(),
  environments: moduleDefault(),
  shapeMatch: moduleDefault(),
  contextMatch: moduleDefault(),
  actionMatch: moduleDefault(),
  visualClosure: moduleDefault(),
  opposites: moduleDefault(),
  rhymes: moduleDefault(),
  sequences: moduleDefault(),
  counting: moduleDefault(),
  phonetics: moduleDefault(),
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
  const {
    heroWords: _omitHeroWords,
    speakIt: _omitSpeakIt,
    soundId: _omitSoundId,
    ...parsedRest
  } = parsed as Partial<AllGameProgress> & {
    heroWords?: unknown;
    speakIt?: unknown;
    soundId?: unknown;
  };
  return {
    ...base,
    ...parsedRest,
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
    categoryPick: {
      roundsCompleted: parsed.categoryPick?.roundsCompleted ?? base.categoryPick.roundsCompleted,
      correctCount: parsed.categoryPick?.correctCount ?? base.categoryPick.correctCount,
      wrongCount: parsed.categoryPick?.wrongCount ?? base.categoryPick.wrongCount,
    },
    associations: {
      roundsCompleted: parsed.associations?.roundsCompleted ?? base.associations.roundsCompleted,
      correctCount: parsed.associations?.correctCount ?? base.associations.correctCount,
      wrongCount: parsed.associations?.wrongCount ?? base.associations.wrongCount,
    },
    environments: {
      roundsCompleted: parsed.environments?.roundsCompleted ?? base.environments.roundsCompleted,
      correctCount: parsed.environments?.correctCount ?? base.environments.correctCount,
      wrongCount: parsed.environments?.wrongCount ?? base.environments.wrongCount,
    },
    shapeMatch: {
      roundsCompleted: parsed.shapeMatch?.roundsCompleted ?? base.shapeMatch.roundsCompleted,
      correctCount: parsed.shapeMatch?.correctCount ?? base.shapeMatch.correctCount,
      wrongCount: parsed.shapeMatch?.wrongCount ?? base.shapeMatch.wrongCount,
    },
    contextMatch: {
      roundsCompleted: parsed.contextMatch?.roundsCompleted ?? base.contextMatch.roundsCompleted,
      correctCount: parsed.contextMatch?.correctCount ?? base.contextMatch.correctCount,
      wrongCount: parsed.contextMatch?.wrongCount ?? base.contextMatch.wrongCount,
    },
    actionMatch: {
      roundsCompleted: parsed.actionMatch?.roundsCompleted ?? base.actionMatch.roundsCompleted,
      correctCount: parsed.actionMatch?.correctCount ?? base.actionMatch.correctCount,
      wrongCount: parsed.actionMatch?.wrongCount ?? base.actionMatch.wrongCount,
    },
    visualClosure: {
      roundsCompleted: parsed.visualClosure?.roundsCompleted ?? base.visualClosure.roundsCompleted,
      correctCount: parsed.visualClosure?.correctCount ?? base.visualClosure.correctCount,
      wrongCount: parsed.visualClosure?.wrongCount ?? base.visualClosure.wrongCount,
    },
    opposites: {
      roundsCompleted: parsed.opposites?.roundsCompleted ?? base.opposites.roundsCompleted,
      correctCount: parsed.opposites?.correctCount ?? base.opposites.correctCount,
      wrongCount: parsed.opposites?.wrongCount ?? base.opposites.wrongCount,
    },
    rhymes: {
      roundsCompleted: parsed.rhymes?.roundsCompleted ?? base.rhymes.roundsCompleted,
      correctCount: parsed.rhymes?.correctCount ?? base.rhymes.correctCount,
      wrongCount: parsed.rhymes?.wrongCount ?? base.rhymes.wrongCount,
    },
    sequences: {
      roundsCompleted: parsed.sequences?.roundsCompleted ?? base.sequences.roundsCompleted,
      correctCount: parsed.sequences?.correctCount ?? base.sequences.correctCount,
      wrongCount: parsed.sequences?.wrongCount ?? base.sequences.wrongCount,
    },
    counting: {
      roundsCompleted: parsed.counting?.roundsCompleted ?? base.counting.roundsCompleted,
      correctCount: parsed.counting?.correctCount ?? base.counting.correctCount,
      wrongCount: parsed.counting?.wrongCount ?? base.counting.wrongCount,
    },
    phonetics: {
      roundsCompleted: parsed.phonetics?.roundsCompleted ?? base.phonetics.roundsCompleted,
      correctCount: parsed.phonetics?.correctCount ?? base.phonetics.correctCount,
      wrongCount: parsed.phonetics?.wrongCount ?? base.phonetics.wrongCount,
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
    categoryPick: { ...prev.categoryPick, ...next.categoryPick },
    associations: { ...prev.associations, ...next.associations },
    environments: { ...prev.environments, ...next.environments },
    shapeMatch: { ...prev.shapeMatch, ...next.shapeMatch },
    contextMatch: { ...prev.contextMatch, ...next.contextMatch },
    actionMatch: { ...prev.actionMatch, ...next.actionMatch },
    visualClosure: { ...prev.visualClosure, ...next.visualClosure },
    opposites: { ...prev.opposites, ...next.opposites },
    rhymes: { ...prev.rhymes, ...next.rhymes },
    sequences: { ...prev.sequences, ...next.sequences },
    counting: { ...prev.counting, ...next.counting },
    phonetics: { ...prev.phonetics, ...next.phonetics },
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
  let categoryPick = prev.categoryPick;

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
    case "category-pick": {
      const { correct, wrong } = bump(prev.categoryPick.correctCount, prev.categoryPick.wrongCount);
      categoryPick = { ...prev.categoryPick, correctCount: correct, wrongCount: wrong };
      break;
    }
    default: {
      const mk = MODULE_GAME_PROGRESS_KEYS[game];
      if (!mk) return;
      const cur = prev[mk] as ModuleProgress;
      const { correct, wrong } = bump(cur.correctCount, cur.wrongCount);
      let recentMistakes = prev.recentMistakes;
      if (outcome === "wrong" && d) {
        recentMistakes = [...prev.recentMistakes, { game, at: new Date().toISOString(), detail: d }].slice(
          -MISTAKES_CAP
        );
      }
      saveProgress(token, {
        [mk]: { ...cur, correctCount: correct, wrongCount: wrong },
        recentMistakes,
      });
      return;
    }
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
    categoryPick,
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

export function bumpCategoryPick(token: string) {
  const p = loadProgress(token);
  saveProgress(token, {
    categoryPick: { ...p.categoryPick, roundsCompleted: p.categoryPick.roundsCompleted + 1 },
  });
}

export function bumpGameModuleRound(token: string, gameId: GameId) {
  const mk = MODULE_GAME_PROGRESS_KEYS[gameId];
  if (!mk) return;
  const p = loadProgress(token);
  const cur = p[mk] as ModuleProgress;
  saveProgress(token, {
    [mk]: { ...cur, roundsCompleted: cur.roundsCompleted + 1 },
  });
}

/** One-line summary for compact display (parent dashboard / copy). */
export function formatProgressSummary(p: AllGameProgress): string {
  const moduleRounds =
    p.associations.roundsCompleted +
    p.environments.roundsCompleted +
    p.shapeMatch.roundsCompleted +
    p.contextMatch.roundsCompleted +
    p.actionMatch.roundsCompleted +
    p.visualClosure.roundsCompleted +
    p.opposites.roundsCompleted +
    p.rhymes.roundsCompleted +
    p.sequences.roundsCompleted +
    p.counting.roundsCompleted +
    p.phonetics.roundsCompleted;
  return [
    `גיבור הצורות: ${p.shapeHero.roundsCompleted} סיבובים`,
    `זיכרון הכוחות: עד ${p.powerMemory.maxPairs} זוגות`,
    `מה שייך: ${p.categoryPick.roundsCompleted} סיבובים`,
    `משחקי מודולים: ${moduleRounds} סיבובים`,
  ].join(" · ");
}

export function totalCompletedRounds(p: AllGameProgress): number {
  return (
    p.shapeHero.roundsCompleted +
    p.categoryPick.roundsCompleted +
    p.associations.roundsCompleted +
    p.environments.roundsCompleted +
    p.shapeMatch.roundsCompleted +
    p.contextMatch.roundsCompleted +
    p.actionMatch.roundsCompleted +
    p.visualClosure.roundsCompleted +
    p.opposites.roundsCompleted +
    p.rhymes.roundsCompleted +
    p.sequences.roundsCompleted +
    p.counting.roundsCompleted +
    p.phonetics.roundsCompleted
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
    case "category-pick":
      return "מה שייך?";
    case "associations":
      return "התאמות";
    case "environments":
      return "איפה הוא גר?";
    case "shape-match":
      return "צורה וחפץ";
    case "context-match":
      return "מתאים למקום";
    case "action-match":
      return "מה עושים שם?";
    case "visual-closure":
      return "השלם את התמונה";
    case "opposites":
      return "הפכים";
    case "rhymes":
      return "חרוזים";
    case "sequences":
      return "מה חסר בסדרה?";
    case "counting":
      return "ספירה";
    case "phonetics":
      return "אות ראשונה";
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
