/** קטגוריות תוכן לילד — ניתן להרחבה (משחקים, חיסכון, ועוד בעתיד) */
export const CHILD_CATEGORY_IDS = ["savings", "games"] as const;

export type ChildCategoryId = (typeof CHILD_CATEGORY_IDS)[number];

export const CHILD_CATEGORY_LABELS: Record<ChildCategoryId, string> = {
  savings: "חיסכון",
  games: "משחקים",
};

export const DEFAULT_CHILD_CATEGORIES: ChildCategoryId[] = ["savings", "games"];

export function isChildCategoryId(v: string): v is ChildCategoryId {
  return (CHILD_CATEGORY_IDS as readonly string[]).includes(v);
}

/** מסנן ערכים לא מוכרים; אם ריק — ברירת מחדל בטוחה */
export function normalizeEnabledCategories(
  raw: string[] | null | undefined
): ChildCategoryId[] {
  const set = new Set<ChildCategoryId>();
  for (const x of raw ?? []) {
    if (isChildCategoryId(x)) set.add(x);
  }
  const arr = [...set];
  if (arr.length === 0) return [...DEFAULT_CHILD_CATEGORIES];
  return arr;
}

export function parseCategoriesFromFormData(formData: FormData): ChildCategoryId[] {
  const all = formData.getAll("categories");
  const out: ChildCategoryId[] = [];
  for (const x of all) {
    const s = String(x);
    if (isChildCategoryId(s)) out.push(s);
  }
  return out;
}
