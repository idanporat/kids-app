"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export type InviteResult =
  | { ok: true; token: string }
  | { ok: false; message: string };

export async function createChildInvite(
  childName: string,
  annualPercent: number
): Promise<InviteResult> {
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
    return { ok: false, message: "רק הורה יכול להזמין ילד" };
  }

  const { data, error } = await supabase
    .from("child_invites")
    .insert({
      parent_id: user.id,
      child_name: childName.trim(),
      annual_interest_percent: Number.isFinite(annualPercent)
        ? Math.max(0, annualPercent)
        : 0,
    })
    .select("token")
    .single();

  if (error) {
    return { ok: false, message: error.message };
  }

  revalidatePath("/parent");
  return { ok: true, token: data.token };
}
