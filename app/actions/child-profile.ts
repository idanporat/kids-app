"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import type { ActionResult } from "./deposits";

export async function updateChildName(
  accountId: string,
  fullName: string
): Promise<ActionResult> {
  const name = fullName.trim();
  if (!name) {
    return { ok: false, message: "שם לא יכול להיות ריק" };
  }

  const supabase = createClient(await cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { ok: false, message: "לא מחובר" };
  }

  const { error } = await supabase
    .from("child_accounts")
    .update({ child_name: name })
    .eq("id", accountId)
    .eq("parent_id", user.id);

  if (error) {
    return { ok: false, message: error.message };
  }

  revalidatePath("/parent");
  return { ok: true };
}
