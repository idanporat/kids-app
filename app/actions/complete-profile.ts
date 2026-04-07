"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import {
  parseCategoriesFromFormData,
  type ChildCategoryId,
} from "@/lib/child-categories";

export type CompleteResult =
  | { ok: true }
  | { ok: false; message: string };

async function upsertParentCategories(
  supabase: ReturnType<typeof createClient>,
  parentId: string,
  categories: ChildCategoryId[]
) {
  return supabase.from("parent_settings").upsert(
    {
      parent_id: parentId,
      enabled_child_categories: categories,
    },
    { onConflict: "parent_id" }
  );
}

export async function completeParentProfile(
  _prev: CompleteResult | null,
  formData: FormData
): Promise<CompleteResult> {
  const fullName = String(formData.get("fullName") ?? "").trim();
  const categories = parseCategoriesFromFormData(formData);
  if (categories.length === 0) {
    return { ok: false, message: "בחר לפחות קטגוריה אחת (חיסכון או משחקים)" };
  }

  const supabase = createClient(await cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) {
    return { ok: false, message: "לא מחובר" };
  }

  const { error } = await supabase.from("profiles").insert({
    id: user.id,
    email: user.email,
    full_name: fullName || null,
    role: "parent",
  });

  if (error) {
    if (error.code === "23505") {
      const { error: setErr } = await upsertParentCategories(
        supabase,
        user.id,
        categories
      );
      if (setErr) {
        return { ok: false, message: setErr.message };
      }
      revalidatePath("/", "layout");
      return { ok: true };
    }
    return { ok: false, message: error.message };
  }

  const { error: catErr } = await upsertParentCategories(
    supabase,
    user.id,
    categories
  );
  if (catErr) {
    return { ok: false, message: catErr.message };
  }

  revalidatePath("/", "layout");
  return { ok: true };
}


