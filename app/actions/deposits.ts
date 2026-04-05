"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export type ActionResult = { ok: true } | { ok: false; message: string };

export async function createDeposit(
  childAccountId: string,
  amount: number,
  note: string | undefined
): Promise<ActionResult> {
  if (!Number.isFinite(amount) || amount <= 0) {
    return { ok: false, message: "סכום לא תקין" };
  }

  const supabase = createClient(await cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { ok: false, message: "לא מחובר" };
  }

  const { error } = await supabase.from("deposits").insert({
    child_account_id: childAccountId,
    amount,
    note: note?.trim() || null,
    created_by: user.id,
  });

  if (error) {
    return { ok: false, message: error.message };
  }

  revalidatePath("/parent");
  revalidatePath("/child");
  return { ok: true };
}
