"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { createDeposit } from "@/app/actions/deposits";
import { updateAnnualInterest } from "@/app/actions/interest";
import { formatIls } from "@/lib/format";

type Props = {
  accountId: string;
  childName: string | null;
  childEmail: string;
  balance: number;
  annualInterestPercent: number;
};

export function ParentChildCard({
  accountId,
  childName,
  childEmail,
  balance,
  annualInterestPercent,
}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [depositMsg, setDepositMsg] = useState<string | null>(null);
  const [rateMsg, setRateMsg] = useState<string | null>(null);

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

  return (
    <article className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-[var(--card)] p-6 space-y-5">
      <header>
        <h2 className="text-xl font-semibold">{childName || "ילד"}</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400" dir="ltr">
          {childEmail}
        </p>
        <p className="mt-3 text-2xl font-bold text-emerald-700 dark:text-emerald-400">
          יתרה: {formatIls(balance)}
        </p>
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
    </article>
  );
}
