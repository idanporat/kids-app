import { cache } from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { createClient } from "@/utils/supabase/server";
import {
  normalizeEnabledCategories,
  type ChildCategoryId,
} from "@/lib/child-categories";

/** שורת חשבון לפי טוקן — מטמון לבקשה אחת (layout + דפים) */
export const getJoinAccountByToken = cache(async (token: string) => {
  const supabase = createClient(await cookies());
  const { data } = await supabase.rpc("get_child_account_by_token", {
    p_token: token,
  });
  return data?.[0] ?? null;
});

/** נתוני קטגוריות לפי טוקן הצטרפות — מפנה להתחברות אם הטוקן לא תקין */
export async function loadJoinCategories(token: string): Promise<{
  categories: ChildCategoryId[];
}> {
  const account = await getJoinAccountByToken(token);
  if (!account) {
    redirect("/login");
  }
  const categories = normalizeEnabledCategories(
    account.enabled_child_categories as string[] | undefined
  );
  return { categories };
}
