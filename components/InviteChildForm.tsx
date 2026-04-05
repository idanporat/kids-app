"use client";

import { useState, useTransition } from "react";
import { createChildInvite } from "@/app/actions/invite";

export function InviteChildForm() {
  const [pending, startTransition] = useTransition();
  const [childName, setChildName] = useState("");
  const [annualPercent, setAnnualPercent] = useState("3");
  const [inviteLink, setInviteLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInviteLink(null);
    const pct = parseFloat(annualPercent.replace(",", "."));
    startTransition(async () => {
      const res = await createChildInvite(childName.trim(), Number.isFinite(pct) ? pct : 0);
      if (res.ok) {
        const link = `${window.location.origin}/join/${res.token}`;
        setInviteLink(link);
        setChildName("");
        setAnnualPercent("3");
      } else {
        setError(res.message);
      }
    });
  }

  async function copyLink() {
    if (!inviteLink) return;
    await navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-[var(--card)] p-6 space-y-4">
      <h2 className="text-lg font-semibold">הזמנת ילד חדש</h2>
      <p className="text-sm text-slate-600 dark:text-slate-400">
        צור קישור הזמנה לילד — שתף אותו והילד יירשם דרכו
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">שם הילד</label>
          <input
            required
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            disabled={pending}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">אחוז שנתי התחלתי</label>
          <input
            type="number"
            min={0}
            max={100}
            step="0.01"
            value={annualPercent}
            onChange={(e) => setAnnualPercent(e.target.value)}
            disabled={pending}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-left"
            dir="ltr"
          />
        </div>
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400" role="alert">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-xl bg-blue-600 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {pending ? "יוצר קישור…" : "צור קישור הזמנה"}
        </button>
      </form>

      {inviteLink && (
        <div className="rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-4 space-y-2">
          <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
            קישור ההזמנה נוצר! שתף אותו עם הילד:
          </p>
          <div className="flex items-center gap-2">
            <input
              readOnly
              value={inviteLink}
              className="flex-1 rounded-lg border border-emerald-300 dark:border-emerald-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-left"
              dir="ltr"
              onClick={(e) => (e.target as HTMLInputElement).select()}
            />
            <button
              type="button"
              onClick={copyLink}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
            >
              {copied ? "הועתק!" : "העתק"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
