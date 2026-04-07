"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { updateChildAvatar } from "@/app/actions/avatar";
import { updateChildName } from "@/app/actions/child-profile";
import { deleteChildAccount } from "@/app/actions/delete-child";
import { createDeposit } from "@/app/actions/deposits";
import { updateAnnualInterest } from "@/app/actions/interest";
import { formatIls } from "@/lib/format";
import { GAME_LIST } from "@/lib/game-data";
import {
  formatAttemptsLine,
  formatProgressUpdatedAt,
  gameLabel,
  MODULE_GAME_PROGRESS_KEYS,
  type ModuleProgress,
  parseGameProgressFromJson,
  totalCompletedRounds,
} from "@/lib/game-progress";
import { createClient } from "@/utils/supabase/client";

type GameProgressSnapshot = {
  data: unknown;
  updatedAt: string;
};

type Props = {
  accountId: string;
  childName: string | null;
  balance: number;
  annualInterestPercent: number;
  inviteToken: string | null;
  avatarUrl: string | null;
  /** Synced when the child plays with the invite link (Supabase). */
  gameProgressSnapshot: GameProgressSnapshot | null;
  /** לפי הגדרות ההורה — האם להציג משחקים וקישור למשחקים */
  showChildGames?: boolean;
};

export function ParentChildCard({
  accountId,
  childName,
  balance,
  annualInterestPercent,
  inviteToken,
  avatarUrl,
  gameProgressSnapshot,
  showChildGames = true,
}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [depositMsg, setDepositMsg] = useState<string | null>(null);
  const [rateMsg, setRateMsg] = useState<string | null>(null);
  const [nameMsg, setNameMsg] = useState<string | null>(null);
  const [editingName, setEditingName] = useState(false);
  const [nameValue, setNameValue] = useState(childName ?? "");
  const [copied, setCopied] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [open, setOpen] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState(avatarUrl);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("הקובץ גדול מדי (מקסימום 2MB)");
      return;
    }
    setUploadingAvatar(true);
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop();
      const path = `${accountId}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(path, file, { upsert: true });
      if (uploadError) {
        alert(uploadError.message);
        return;
      }
      const { data: urlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(path);
      const publicUrl = `${urlData.publicUrl}?t=${Date.now()}`;
      const res = await updateChildAvatar(accountId, publicUrl);
      if (res.ok) {
        setAvatarSrc(publicUrl);
        router.refresh();
      }
    } finally {
      setUploadingAvatar(false);
    }
  }

  function handleDelete() {
    startTransition(async () => {
      const res = await deleteChildAccount(accountId);
      if (res.ok) {
        router.refresh();
      }
    });
  }

  function submitName(e: React.FormEvent) {
    e.preventDefault();
    setNameMsg(null);
    startTransition(async () => {
      const res = await updateChildName(accountId, nameValue);
      setNameMsg(res.ok ? "השם עודכן" : res.message);
      if (res.ok) {
        setEditingName(false);
        router.refresh();
      }
    });
  }

  function submitDeposit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = String(fd.get("amount") ?? "").replace(",", ".");
    const amount = parseFloat(raw);
    const note = String(fd.get("note") ?? "").trim();
    setDepositMsg(null);
    startTransition(async () => {
      const res = await createDeposit(accountId, amount, note || undefined);
      setDepositMsg(res.ok ? "הפקדה נקלטה" : res.message);
      if (res.ok) {
        e.currentTarget.reset();
        router.refresh();
      }
    });
  }

  function submitRate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = String(fd.get("rate") ?? "").replace(",", ".");
    const rate = parseFloat(raw);
    setRateMsg(null);
    startTransition(async () => {
      const res = await updateAnnualInterest(accountId, rate);
      setRateMsg(res.ok ? "האחוז עודכן" : res.message);
      if (res.ok) {
        router.refresh();
      }
    });
  }

  async function copyLink() {
    if (!inviteToken) return;
    const link = `${window.location.origin}/join/${inviteToken}`;
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <article className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-[var(--card)]">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-right"
      >
        <div className="flex items-center gap-3">
          {avatarSrc ? (
            <img src={avatarSrc} alt="" className="h-10 w-10 rounded-full object-cover" />
          ) : (
            <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-lg">
              {(childName || "ילד")[0]}
            </div>
          )}
          <h2 className="text-lg font-semibold">{childName || "ילד"}</h2>
          <span className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
            {formatIls(balance)}
          </span>
        </div>
        <svg
          className={`h-5 w-5 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-5">
          <header>
            <div className="flex items-center gap-2">
              {editingName ? (
                <form onSubmit={submitName} className="flex items-center gap-2 flex-1">
                  <input
                    value={nameValue}
                    onChange={(e) => setNameValue(e.target.value)}
                    required
                    disabled={pending}
                    className="flex-1 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-1.5 text-base font-semibold"
                  />
                  <button
                    type="submit"
                    disabled={pending}
                    className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700 disabled:opacity-60"
                  >
                    שמור
                  </button>
                  <button
                    type="button"
                    onClick={() => { setEditingName(false); setNameValue(childName ?? ""); }}
                    className="rounded-lg border border-slate-300 dark:border-slate-600 px-3 py-1.5 text-sm hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    ביטול
                  </button>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => setEditingName(true)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 flex items-center gap-1 text-sm"
                  title="ערוך שם"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  ערוך שם
                </button>
              )}
            </div>
            {nameMsg && (
              <p className={`text-sm mt-1 ${nameMsg === "השם עודכן" ? "text-emerald-600" : "text-red-600"}`}>
                {nameMsg}
              </p>
            )}
            <div className="mt-3 flex items-center gap-3">
              <label className="cursor-pointer text-sm text-blue-600 dark:text-blue-400 hover:underline">
                {uploadingAvatar ? "מעלה..." : "📷 שנה תמונה"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpload}
                  disabled={uploadingAvatar}
                />
              </label>
            </div>
            <p className="mt-2 text-sm text-slate-500">
              אחוז שנתי: <span className="font-medium text-slate-800 dark:text-slate-200">{annualInterestPercent}%</span>
            </p>
            <div className="mt-2 space-y-3">
              {showChildGames ? (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-600 dark:bg-slate-800/50">
                  <h3 className="text-sm font-medium">התקדמות במשחקים</h3>
                  {gameProgressSnapshot ? (
                    <ChildGameProgressPanel snapshot={gameProgressSnapshot} />
                  ) : (
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                      עדיין אין נתונים מהמכשיר של הילד. הנתונים מסתנכרנים לשרת כשהילד משחק דרך קישור ההזמנה
                      (גם בלי שינוי בדפדפן זה).
                    </p>
                  )}
                </div>
              ) : null}
              {inviteToken && (
                <>
                  <button
                    type="button"
                    onClick={copyLink}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {copied ? "הקישור הועתק!" : "📋 העתק קישור לילד"}
                  </button>
                  {showChildGames ? (
                    <a
                      href={`/join/${inviteToken}/games`}
                      className="block text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
                    >
                      פתיחת בחירת משחקים (בדפדפן זה)
                    </a>
                  ) : null}
                </>
              )}
            </div>
            <div className="mt-3">
              {confirmDelete ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-red-600">למחוק את הילד?</span>
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={pending}
                    className="rounded-lg bg-red-600 px-3 py-1 text-xs text-white hover:bg-red-700 disabled:opacity-60"
                  >
                    כן, מחק
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmDelete(false)}
                    className="rounded-lg border border-slate-300 dark:border-slate-600 px-3 py-1 text-xs hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    ביטול
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirmDelete(true)}
                  className="text-sm text-red-500 hover:text-red-700 dark:hover:text-red-400"
                >
                  🗑️ מחק ילד
                </button>
              )}
            </div>
          </header>

          <form onSubmit={submitDeposit} className="space-y-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 p-4">
        <h3 className="text-sm font-medium">הפקדה לילד</h3>
        <div className="flex flex-wrap gap-2 items-end">
          <div className="flex-1 min-w-[120px]">
            <label className="block text-xs text-slate-500 mb-1">סכום (₪)</label>
            <input
              name="amount"
              type="number"
              min={0.01}
              step="0.01"
              required
              disabled={pending}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-left"
              dir="ltr"
            />
          </div>
          <div className="flex-[2] min-w-[160px]">
            <label className="block text-xs text-slate-500 mb-1">הערה (אופציונלי)</label>
            <input
              name="note"
              type="text"
              disabled={pending}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2"
            />
          </div>
          <button
            type="submit"
            disabled={pending}
            className="rounded-xl bg-blue-600 px-4 py-2 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-60"
          >
            הפקד
          </button>
        </div>
        {depositMsg && (
          <p className={`text-sm ${depositMsg === "הפקדה נקלטה" ? "text-emerald-600" : "text-red-600"}`}>
            {depositMsg}
          </p>
        )}
      </form>

      <form onSubmit={submitRate} className="space-y-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 p-4">
        <h3 className="text-sm font-medium">אחוז שנתי לחישוב תשואה משוערת (למסך הילד)</h3>
        <div className="flex flex-wrap gap-2 items-end">
          <div className="flex-1 min-w-[100px]">
            <label className="block text-xs text-slate-500 mb-1">אחוז שנתי</label>
            <input
              name="rate"
              type="number"
              min={0}
              max={100}
              step="0.01"
              defaultValue={annualInterestPercent}
              required
              disabled={pending}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-left"
              dir="ltr"
            />
          </div>
          <button
            type="submit"
            disabled={pending}
            className="rounded-xl border border-slate-300 dark:border-slate-600 px-4 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-60"
          >
            עדכן אחוז
          </button>
        </div>
        {rateMsg && (
          <p className={`text-sm ${rateMsg === "האחוז עודכן" ? "text-emerald-600" : "text-red-600"}`}>
            {rateMsg}
          </p>
        )}
      </form>
        </div>
      )}
    </article>
  );
}

function ChildGameProgressPanel({ snapshot }: { snapshot: GameProgressSnapshot }) {
  const p = parseGameProgressFromJson(snapshot.data);
  const total = totalCompletedRounds(p);
  const mistakesNewestFirst = [...p.recentMistakes].reverse();
  return (
    <div className="mt-3 space-y-2 text-sm">
      <p className="font-semibold text-slate-800 dark:text-slate-100">
        סה״כ סיבובים שהושלמו: {total}
      </p>
      <ul className="grid gap-2 text-slate-700 dark:text-slate-300">
        {GAME_LIST.map(({ id, title }) => {
          if (id === "shape-hero") {
            return (
              <li
                key={id}
                className="rounded-lg border border-slate-200/90 bg-white/60 px-3 py-2 dark:border-slate-600/80 dark:bg-slate-900/30"
              >
                <div className="flex justify-between gap-2">
                  <span>{title}</span>
                  <span className="font-medium tabular-nums">{p.shapeHero.roundsCompleted} סיבובים</span>
                </div>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                  {formatAttemptsLine(p.shapeHero.correctCount, p.shapeHero.wrongCount)}
                </p>
              </li>
            );
          }
          if (id === "power-memory") {
            return (
              <li
                key={id}
                className="rounded-lg border border-slate-200/90 bg-white/60 px-3 py-2 dark:border-slate-600/80 dark:bg-slate-900/30"
              >
                <div className="flex justify-between gap-2">
                  <span>{title}</span>
                  <span className="font-medium tabular-nums">עד {p.powerMemory.maxPairs} זוגות</span>
                </div>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                  התאמות: {formatAttemptsLine(p.powerMemory.correctCount, p.powerMemory.wrongCount)}
                </p>
              </li>
            );
          }
          if (id === "category-pick") {
            return (
              <li
                key={id}
                className="rounded-lg border border-slate-200/90 bg-white/60 px-3 py-2 dark:border-slate-600/80 dark:bg-slate-900/30"
              >
                <div className="flex justify-between gap-2">
                  <span>{title}</span>
                  <span className="font-medium tabular-nums">{p.categoryPick.roundsCompleted} סיבובים</span>
                </div>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                  {formatAttemptsLine(p.categoryPick.correctCount, p.categoryPick.wrongCount)}
                </p>
              </li>
            );
          }
          const mk = MODULE_GAME_PROGRESS_KEYS[id];
          if (!mk) return null;
          const mod = p[mk] as ModuleProgress;
          return (
            <li
              key={id}
              className="rounded-lg border border-slate-200/90 bg-white/60 px-3 py-2 dark:border-slate-600/80 dark:bg-slate-900/30"
            >
              <div className="flex justify-between gap-2">
                <span>{title}</span>
                <span className="font-medium tabular-nums">{mod.roundsCompleted} סיבובים</span>
              </div>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                {formatAttemptsLine(mod.correctCount, mod.wrongCount)}
              </p>
            </li>
          );
        })}
      </ul>
      <details className="rounded-lg border border-slate-200 bg-slate-50/80 px-3 py-2 dark:border-slate-600 dark:bg-slate-800/50">
        <summary className="cursor-pointer text-sm font-medium text-slate-800 dark:text-slate-200">
          במה טעו? — פירוט אחרון
          {mistakesNewestFirst.length > 0 ? ` (${mistakesNewestFirst.length})` : ""}
        </summary>
        {mistakesNewestFirst.length === 0 ? (
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            כאן יופיע פירוט (למשל איזו צורה נבחרה, איזו מילה, מה נשמע במיקרופון) אחרי שהילד טועה במשחק — רק מניסיונות אחרי עדכון האפליקציה.
          </p>
        ) : (
          <ol className="mt-2 max-h-48 list-decimal space-y-2 overflow-y-auto pr-5 text-xs text-slate-700 dark:text-slate-300">
            {mistakesNewestFirst.map((m, i) => (
              <li key={`${m.at}-${i}`} className="leading-snug">
                <span className="font-medium text-slate-800 dark:text-slate-100">{gameLabel(m.game)}</span>
                <span className="text-slate-500 dark:text-slate-500"> · {formatProgressUpdatedAt(m.at)}</span>
                <span className="mt-0.5 block text-slate-600 dark:text-slate-400">{m.detail}</span>
              </li>
            ))}
          </ol>
        )}
      </details>
      <p className="text-xs text-slate-500 dark:text-slate-400">
        עודכן בשרת: {formatProgressUpdatedAt(snapshot.updatedAt)}
      </p>
    </div>
  );
}
