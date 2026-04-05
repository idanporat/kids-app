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

  const pct = Number.isFinite(annualPercent) ? Math.max(0, annualPercent) : 0;
  const name = childName.trim();

  // Create the child account first
  const { data: account, error: accError } = await supabase
    .from("child_accounts")
    .insert({
      parent_id: user.id,
      child_name: name,
      annual_interest_percent: pct,
    })
    .select("id")
    .single();

  if (accError) {
    return { ok: false, message: accError.message };
  }

  // Create the invite linked to the account
  const { data: invite, error: invError } = await supabase
    .from("child_invites")
    .insert({
      parent_id: user.id,
      child_name: name,
      annual_interest_percent: pct,
      child_account_id: account.id,
    })
    .select("token")
    .single();

  if (invError) {
    return { ok: false, message: invError.message };
  }

  revalidatePath("/parent");
  return { ok: true, token: invite.token };
}
