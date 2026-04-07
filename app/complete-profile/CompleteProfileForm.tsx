"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

import type { CompleteResult } from "@/app/actions/complete-profile";
import { completeParentProfile } from "@/app/actions/complete-profile";
import { ChildCategoriesFieldset } from "@/components/ChildCategoriesFieldset";

const initial: CompleteResult | null = null;

export function CompleteProfileForm({ userEmail }: { userEmail: string }) {
  const router = useRouter();
  const [parentState, parentAction, parentPending] = useActionState(
    completeParentProfile,
    initial
  );

  useEffect(() => {
    if (parentState?.ok === true) {
      router.replace("/parent");
      router.refresh();
    }
  }, [parentState, router]);

  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-700 bg-[var(--card)] p-8 shadow-sm">
      <h1 className="text-2xl font-bold text-center mb-2">השלמת פרופיל</h1>
      <p className="text-center text-sm text-slate-600 dark:text-slate-400 mb-6">
        השלם את הפרופיל שלך כהורה
      </p>
      <p className="text-center text-xs text-slate-500 mb-4" dir="ltr">
        {userEmail}
      </p>

      <form action={parentAction} className="space-y-4">
        <div>
          <label htmlFor="pfn" className="block text-sm font-medium mb-1">
            שם מלא
          </label>
          <input
            id="pfn"
            name="fullName"
            required
            disabled={parentPending}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2"
          />
        </div>
        <ChildCategoriesFieldset disabled={parentPending} />
        {parentState?.ok === false && (
          <p className="text-sm text-red-600 dark:text-red-400" role="alert">
            {parentState.message}
          </p>
        )}
        <button
          type="submit"
          disabled={parentPending}
          className="w-full rounded-xl bg-blue-600 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {parentPending ? "שומר…" : "שמור והמשך כהורה"}
        </button>
      </form>
    </div>
  );
}
