import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { SignOutButton } from "@/components/SignOutButton";
import { estimatedEarningsFromAnnualPercent } from "@/lib/earnings";
import { formatIls } from "@/lib/format";
import { createClient } from "@/utils/supabase/server";

const dateFmt = new Intl.DateTimeFormat("he-IL", {
  dateStyle: "short",
  timeStyle: "short",
});

export default async function ChildPage() {
  const supabase = createClient(await cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile || profile.role !== "child") {
    redirect("/parent");
  }

  const { data: account } = await supabase
    .from("child_accounts")
    .select("id, balance, annual_interest_percent")
    .eq("child_user_id", user.id)
    .maybeSingle();

  if (!account) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <p className="text-center text-slate-600 dark:text-slate-400 max-w-md">
          לא נמצא חשבון חיסכון. ודא שסיימת הרשמה כילד עם אימייל ההורה הנכון.
        </p>
        <div className="mt-6">
          <SignOutButton />
        </div>
      </div>
    );
  }

  const balance = Number(account.balance);
  const rate = Number(account.annual_interest_percent);
  const est = estimatedEarningsFromAnnualPercent(balance, rate);

  const { data: deposits } = await supabase
    .from("deposits")
    .select("id, amount, note, created_at")
    .eq("child_account_id", account.id)
    .order("created_at", { ascending: false })
    .limit(30);

  return (
    <div className="flex flex-1 flex-col max-w-3xl mx-auto w-full px-4 py-8">
      <header className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold">החיסכון שלי</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            שלום{profile.full_name ? `, ${profile.full_name}` : ""}
          </p>
        </div>
        <SignOutButton />
      </header>

      <section className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-[var(--card)] p-6 mb-6">
        <p className="text-sm text-slate-500">יתרה נוכחית</p>
        <p className="text-3xl font-bold text-emerald-700 dark:text-emerald-400 mt-1">
          {formatIls(balance)}
        </p>
        <p className="text-sm text-slate-500 mt-2">
          אחוז שנתי לתצוגת תשואה:{" "}
          <span className="font-medium text-slate-800 dark:text-slate-200">{rate}%</span>
        </p>
      </section>

      <section className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-[var(--card)] p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">תשואה משוערת (לפי היתרה והאחוז הנוכחי)</h2>
        <p className="text-sm text-slate-500 mb-4">
          מחושב כריבית פשוטה מהאחוז השנתי — ממוצע יומי / חודשי / שנתי על היתרה כעת.
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 p-4">
            <p className="text-xs text-slate-500">יום (ממוצע)</p>
            <p className="text-lg font-semibold mt-1">{formatIls(est.day)}</p>
          </div>
          <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 p-4">
            <p className="text-xs text-slate-500">חודש (ממוצע)</p>
            <p className="text-lg font-semibold mt-1">{formatIls(est.month)}</p>
          </div>
          <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 p-4">
            <p className="text-xs text-slate-500">שנה</p>
            <p className="text-lg font-semibold mt-1">{formatIls(est.year)}</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">הפקדות</h2>
        {!deposits?.length ? (
          <p className="text-slate-500 text-sm">עדיין אין הפקדות.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/80">
                <tr>
                  <th className="text-right p-3 font-medium">תאריך</th>
                  <th className="text-right p-3 font-medium">סכום</th>
                  <th className="text-right p-3 font-medium">הערה</th>
                </tr>
              </thead>
              <tbody>
                {deposits.map((d) => (
                  <tr
                    key={d.id}
                    className="border-t border-slate-200 dark:border-slate-700"
                  >
                    <td className="p-3 whitespace-nowrap" dir="ltr">
                      {dateFmt.format(new Date(d.created_at))}
                    </td>
                    <td className="p-3 font-medium">{formatIls(Number(d.amount))}</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">
                      {d.note || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
