"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { GameProgressSyncMount } from "@/components/games/GameProgressSyncMount";
import type { ChildCategoryId } from "@/lib/child-categories";

type Props = {
  token: string;
  childName: string | null;
  avatarUrl: string | null;
  enabledCategories: ChildCategoryId[];
  children: React.ReactNode;
};

export function JoinSessionLayout({
  token,
  childName,
  avatarUrl,
  enabledCategories,
  children,
}: Props) {
  const pathname = usePathname();
  const base = `/join/${token}`;
  const onGames = pathname.startsWith(`${base}/games`);
  const showSavings = enabledCategories.includes("savings");
  const showGames = enabledCategories.includes("games");
  const showNav = showSavings && showGames;

  const headerTitle =
    showSavings && showGames
      ? "החיסכון שלי"
      : showSavings
        ? "החיסכון שלי"
        : "המשחקים שלי";

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-8">
      <header className="mb-6">
        <div className="flex items-center gap-4">
          {avatarUrl ? (
            <img src={avatarUrl} alt="" className="h-16 w-16 rounded-full object-cover" />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 text-2xl dark:bg-slate-700">
              {(childName || "ילד")[0]}
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold">{headerTitle}</h1>
            <p className="mt-1 text-slate-600 dark:text-slate-400">
              שלום{childName ? `, ${childName}` : ""}
            </p>
          </div>
        </div>

        {showNav ? (
          <nav
            className="mt-6 flex gap-2 rounded-2xl bg-slate-100 p-1 dark:bg-slate-800"
            aria-label="מסכים"
          >
            <Link
              href={base}
              className={`flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-xl py-3 text-center text-base font-semibold transition ${
                !onGames
                  ? "bg-[var(--card)] shadow-sm"
                  : "text-slate-600 hover:bg-white/60 dark:text-slate-400 dark:hover:bg-slate-700/60"
              }`}
            >
              <span className="text-2xl" aria-hidden>
                💰
              </span>
              <span>חיסכון</span>
            </Link>
            <Link
              href={`${base}/games`}
              className={`flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-xl py-3 text-center text-base font-semibold transition ${
                onGames
                  ? "bg-[var(--card)] shadow-sm"
                  : "text-slate-600 hover:bg-white/60 dark:text-slate-400 dark:hover:bg-slate-700/60"
              }`}
            >
              <span className="text-2xl" aria-hidden>
                🎮
              </span>
              <span>משחקים</span>
            </Link>
          </nav>
        ) : null}
      </header>
      {showGames ? <GameProgressSyncMount token={token} /> : null}
      {children}
    </div>
  );
}
