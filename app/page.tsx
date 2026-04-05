import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = createClient(await cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
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
    // משתמש ב-Auth בלי שורה ב-profiles (למשל אחרי signUp בלי סשן)
    redirect("/complete-profile");
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-16">
      <div className="max-w-lg text-center space-y-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
          חיסכון משפחתי
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          הורים מפקידים כסף לחשבון הילדים, והילדים רואים יתרה, הפקדות ותשואה
          משוערת לפי אחוז שנתי שההורה מגדיר.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link
            href="/login"
            className="rounded-xl bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition-colors"
          >
            התחברות
          </Link>
          <Link
            href="/register"
            className="rounded-xl border border-slate-300 dark:border-slate-600 px-6 py-3 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            הרשמה
          </Link>
        </div>
      </div>
    </div>
  );
}
