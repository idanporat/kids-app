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

export async function completeChildProfile(
  _prev: CompleteResult | null,
  formData: FormData
): Promise<CompleteResult> {
  const parentEmail = String(formData.get("parentEmail") ?? "").trim();
  const fullName = String(formData.get("fullName") ?? "").trim();
  const rawPct = String(formData.get("annualPercent") ?? "0").replace(",", ".");
  const annualPercent = parseFloat(rawPct);

  const supabase = createClient(await cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { ok: false, message: "לא מחובר" };
  }

  const { error } = await supabase.rpc("finalize_child_registration", {
    p_parent_email: parentEmail,
    p_full_name: fullName,
    p_annual_percent: Number.isFinite(annualPercent) ? annualPercent : 0,
  });

  if (error) {
    if (
      error.message.includes("PARENT_NOT_FOUND") ||
      error.message.includes("P0001")
    ) {
      return { ok: false, message: "לא נמצא הורה עם האימייל הזה." };
    }
    return { ok: false, message: error.message };
  }

  revalidatePath("/", "layout");
  return { ok: true };
}
