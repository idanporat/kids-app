import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { estimatedEarningsFromAnnualPercent } from "@/lib/earnings";
import { formatIls } from "@/lib/format";
import { normalizeEnabledCategories } from "@/lib/child-categories";
import { getJoinAccountByToken } from "@/lib/join-session";

const dateFmt = new Intl.DateTimeFormat("he-IL", {
  dateStyle: "short",
  timeStyle: "short",
});

type Props = {
  params: Promise<{ token: string }>;
};

export default async function ChildViewPage({ params }: Props) {
  const { token } = await params;
  const account = await getJoinAccountByToken(token);
  if (!account) {
    redirect("/login");
  }
  const categories = normalizeEnabledCategories(
    account.enabled_child_categories as string[] | undefined
  );
  if (!categories.includes("savings")) {
    redirect(`/join/${token}/games`);
  }

  const supabase = createClient(await cookies());

  const balance = Number(account.balance);
  const rate = Number(account.annual_interest_percent);
  const est = estimatedEarningsFromAnnualPercent(balance, rate);

  const { data: deposits } = await supabase.rpc("get_deposits_by_token", {
    p_token: token,
    p_limit: 30,
  });

  return (
    <>
      <section className="mb-6 rounded-2xl border border-slate-200 bg-[var(--card)] p-6 dark:border-slate-700">
        <p className="text-sm text-slate-500">יתרה נוכחית</p>
        <p className="mt-1 text-3xl font-bold text-emerald-700 dark:text-emerald-400">
          {formatIls(balance)}
        </p>
        <p className="mt-2 text-sm text-slate-500">
          אחוז שנתי:{" "}
          <span className="font-medium text-slate-800 dark:text-slate-200">{rate}%</span>
        </p>
      </section>

      <section className="mb-8 rounded-2xl border border-slate-200 bg-[var(--card)] p-6 dark:border-slate-700">
        <h2 className="mb-4 text-lg font-semibold">תשואה משוערת</h2>
        <p className="mb-4 text-sm text-slate-500">לפי היתרה והאחוז הנוכחי</p>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
            <p className="text-xs text-slate-500">יום (ממוצע)</p>
            <p className="mt-1 text-lg font-semibold">{formatIls(est.day)}</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
            <p className="text-xs text-slate-500">חודש (ממוצע)</p>
            <p className="mt-1 text-lg font-semibold">{formatIls(est.month)}</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
            <p className="text-xs text-slate-500">שנה</p>
            <p className="mt-1 text-lg font-semibold">{formatIls(est.year)}</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">הפקדות</h2>
        {!deposits?.length ? (
          <p className="text-sm text-slate-500">עדיין אין הפקדות.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/80">
                <tr>
                  <th className="p-3 text-right font-medium">תאריך</th>
                  <th className="p-3 text-right font-medium">סכום</th>
                  <th className="p-3 text-right font-medium">הערה</th>
                </tr>
              </thead>
              <tbody>
                {deposits.map(
                  (d: { id: string; amount: number; note: string | null; created_at: string }) => (
                    <tr key={d.id} className="border-t border-slate-200 dark:border-slate-700">
                      <td className="whitespace-nowrap p-3" dir="ltr">
                        {dateFmt.format(new Date(d.created_at))}
                      </td>
                      <td className="p-3 font-medium">{formatIls(Number(d.amount))}</td>
                      <td className="p-3 text-slate-600 dark:text-slate-400">{d.note || "—"}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
