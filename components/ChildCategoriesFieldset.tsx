import {
  CHILD_CATEGORY_IDS,
  CHILD_CATEGORY_LABELS,
  type ChildCategoryId,
} from "@/lib/child-categories";

type Props = {
  /** ברירת מחדל לצ'קבוקסים */
  defaultSelected?: ChildCategoryId[];
  disabled?: boolean;
};

const DESCRIPTIONS: Record<ChildCategoryId, string> = {
  savings: "יתרה, הפקדות ותשואה משוערת",
  games: "משחקי למידה בקישור ההזמנה",
};

export function ChildCategoriesFieldset({
  defaultSelected = ["savings", "games"],
  disabled = false,
}: Props) {
  return (
    <fieldset className="space-y-3 rounded-xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-600 dark:bg-slate-800/40">
      <legend className="px-1 text-sm font-semibold text-slate-800 dark:text-slate-100">
        מה הילדים יראו באפליקציה
      </legend>
      <p className="text-xs text-slate-600 dark:text-slate-400 -mt-1 mb-2">
        אפשר לבחור חיסכון, משחקים, או שניהם. ניתן לשנות בהמשך בלוח ההורה.
      </p>
      <ul className="space-y-3">
        {CHILD_CATEGORY_IDS.map((id) => (
          <li key={id}>
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                name="categories"
                value={id}
                defaultChecked={defaultSelected.includes(id)}
                disabled={disabled}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>
                <span className="font-medium text-slate-900 dark:text-slate-100">
                  {CHILD_CATEGORY_LABELS[id]}
                </span>
                <span className="block text-xs text-slate-600 dark:text-slate-400">
                  {DESCRIPTIONS[id]}
                </span>
              </span>
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  );
}
