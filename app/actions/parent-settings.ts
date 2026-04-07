"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import {
  parseCategoriesFromFormData,
  type ChildCategoryId,
} from "@/lib/child-categories";

export type ParentSettingsState = { ok: true } | { ok: false; message: string };

export async function updateParentChildCategories(
  _prev: ParentSettingsState | null,
  formData: FormData
): Promise<ParentSettingsState> {
  const categories = parseCategoriesFromFormData(formData);
  if (categories.length === 0) {
    return { ok: false, message: "בחר לפחות קטגוריה אחת (חיסכון או משחקים)" };
  }

  const supabase = createClient(await cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { ok: false, message: "לא מחובר" };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();
  if (profile?.role !== "parent") {
    return { ok: false, message: "רק הורה יכול לעדכן הגדרות" };
  }

  const { error } = await supabase.from("parent_settings").upsert(
    {
      parent_id: user.id,
      enabled_child_categories: categories as ChildCategoryId[],
    },
    { onConflict: "parent_id" }
  );

  if (error) {
    return { ok: false, message: error.message };
  }

  revalidatePath("/parent");
  return { ok: true };
}
