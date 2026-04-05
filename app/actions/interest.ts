"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import type { ActionResult } from "./deposits";

export async function updateAnnualInterest(
  childAccountId: string,
  annualPercent: number
): Promise<ActionResult> {
  if (!Number.isFinite(annualPercent) || annualPercent < 0 || annualPercent > 100) {
    return { ok: false, message: "אחוז שנתי חייב להיות בין 0 ל־100" };
  }

  const supabase = createClient(await cookies());
  const { error } = await supabase
    .from("child_accounts")
    .update({ annual_interest_percent: annualPercent })
    .eq("id", childAccountId);

  if (error) {
    return { ok: false, message: error.message };
  }

  revalidatePath("/parent");
  revalidatePath("/child");
  return { ok: true };
}
