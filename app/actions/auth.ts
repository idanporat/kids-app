"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type SignInState = { error: string } | null;

/**
 * התחברות בצד השרת כדי שהסשן יישמר בעוגיות — אחרת השרת לא רואה משתמש אחרי login מהדפדפן.
 */
export async function signInWithEmail(
  _prev: SignInState,
  formData: FormData
): Promise<SignInState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) {
    return { error: "אימייל וסיסמה נדרשים" };
  }

  const supabase = createClient(await cookies());
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { error: "אימייל או סיסמה שגויים" };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { error: "התחברות נכשלה — נסה שוב" };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.role === "parent") {
    redirect("/parent");
  }
  if (profile?.role === "child") {
    redirect("/child");
  }
  redirect("/complete-profile");
}

export async function signOut() {
  const supabase = createClient(await cookies());
  await supabase.auth.signOut();
  redirect("/login");
}
