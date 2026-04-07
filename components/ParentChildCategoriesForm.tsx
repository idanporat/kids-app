"use client";

import { useActionState } from "react";

import {
  updateParentChildCategories,
  type ParentSettingsState,
} from "@/app/actions/parent-settings";
import { ChildCategoriesFieldset } from "@/components/ChildCategoriesFieldset";
import type { ChildCategoryId } from "@/lib/child-categories";

const initial: ParentSettingsState | null = null;

type Props = {
  defaultSelected: ChildCategoryId[];
};

export function ParentChildCategoriesForm({ defaultSelected }: Props) {
  const [state, formAction, pending] = useActionState(
    updateParentChildCategories,
    initial
  );

  return (
    <form action={formAction} className="space-y-4">
      <ChildCategoriesFieldset defaultSelected={defaultSelected} disabled={pending} />
      {state?.ok === false && (
        <p className="text-sm text-red-600 dark:text-red-400" role="alert">
          {state.message}
        </p>
      )}
      {state?.ok === true && (
        <p className="text-sm text-emerald-700 dark:text-emerald-400" role="status">
          ההגדרות נשמרו.
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50 disabled:opacity-60 dark:border-slate-600 dark:bg-slate-900 dark:hover:bg-slate-800"
      >
        {pending ? "שומר…" : "עדכן מה הילדים רואים"}
      </button>
    </form>
  );
}
