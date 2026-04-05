"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export type CompleteResult =
  | { ok: true }
  | { ok: false; message: string };

export async function completeParentProfile(
  _prev: CompleteResult | null,
  formData: FormData
): Promise<CompleteResult> {
  const fullName = String(formData.get("fullName") ?? "").trim();
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
      revalidatePath("/", "layout");
      return { ok: true };
    }
    return { ok: false, message: error.message };
  }

  revalidatePath("/", "layout");
  return { ok: true };
}


