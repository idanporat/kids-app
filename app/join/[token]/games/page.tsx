import Link from "next/link";

import { GAME_LIST, type GameMeta } from "@/lib/game-data";

type Props = {
  params: Promise<{ token: string }>;
};

function cardAccent(g: GameMeta): string {
  switch (g.id) {
    case "shape-hero":
      return "border-amber-300 bg-gradient-to-l from-amber-100 to-orange-100 dark:from-amber-950/40 dark:to-orange-950/40 dark:border-amber-800";
    case "power-memory":
      return "border-violet-300 bg-gradient-to-l from-violet-100 to-indigo-100 dark:from-violet-950/40 dark:to-indigo-950/40 dark:border-violet-800";
    case "hero-words":
      return "border-sky-300 bg-gradient-to-l from-sky-100 to-blue-100 dark:from-sky-950/40 dark:to-blue-950/40 dark:border-sky-800";
    case "category-pick":
      return "border-emerald-300 bg-gradient-to-l from-emerald-100 to-teal-100 dark:from-emerald-950/40 dark:to-teal-950/40 dark:border-emerald-800";
    case "speak-it":
      return "border-rose-300 bg-gradient-to-l from-rose-100 to-pink-100 dark:from-rose-950/40 dark:to-pink-950/40 dark:border-rose-800";
    default:
      return "border-slate-200 bg-[var(--card)] dark:border-slate-600";
  }
}

export default async function GamesIndexPage({ params }: Props) {
  const { token } = await params;

  return (
    <div className="space-y-6">
      <p className="text-center text-lg text-slate-600 dark:text-slate-400">בחר משחק</p>
      <ul className="grid gap-4 sm:grid-cols-1">
        {GAME_LIST.map((g) => (
          <li key={g.id}>
            <Link
              href={`/join/${token}/games/${g.id}`}
              className={`flex min-h-[120px] items-center gap-4 rounded-3xl border-4 p-6 shadow-md transition active:scale-[0.99] ${cardAccent(g)}`}
            >
              <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-white/90 text-5xl shadow-inner dark:bg-slate-900/80">
                {g.emoji}
              </span>
              <span className="text-2xl font-bold text-slate-900 dark:text-slate-50">{g.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
