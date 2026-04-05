import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { estimatedEarningsFromAnnualPercent } from "@/lib/earnings";
import { formatIls } from "@/lib/format";

const dateFmt = new Intl.DateTimeFormat("he-IL", {
  dateStyle: "short",
  timeStyle: "short",
});

type Props = {
  params: Promise<{ token: string }>;
};

export default async function ChildViewPage({ params }: Props) {
  const { token } = await params;
  const supabase = createClient(await cookies());

  const { data: accountData } = await supabase.rpc("get_child_account_by_token", {
    p_token: token,
  });

  const account = accountData?.[0];
  if (!account) {
    redirect("/login");
  }

  const balance = Number(account.balance);
  const rate = Number(account.annual_interest_percent);
  const est = estimatedEarningsFromAnnualPercent(balance, rate);

  const { data: deposits } = await supabase.rpc("get_deposits_by_token", {
    p_token: token,
    p_limit: 30,
  });

  return (
    <div className="flex flex-1 flex-col max-w-3xl mx-auto w-full px-4 py-8">
      <header className="mb-8">
        <div className="flex items-center gap-4">
          {account.avatar_url ? (
            <img src={account.avatar_url} alt="" className="h-16 w-16 rounded-full object-cover" />
          ) : (
            <div className="h-16 w-16 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-2xl">
              {(account.child_name || "ילד")[0]}
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold">החיסכון שלי</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              שלום{account.child_name ? `, ${account.child_name}` : ""}
            </p>
          </div>
        </div>
      </header>

      <section className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-[var(--card)] p-6 mb-6">
        <p className="text-sm text-slate-500">יתרה נוכחית</p>
        <p className="text-3xl font-bold text-emerald-700 dark:text-emerald-400 mt-1">
          {formatIls(balance)}
        </p>
        <p className="text-sm text-slate-500 mt-2">
          אחוז שנתי:{" "}
          <span className="font-medium text-slate-800 dark:text-slate-200">{rate}%</span>
        </p>
      </section>

      <section className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-[var(--card)] p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">תשואה משוערת</h2>
        <p className="text-sm text-slate-500 mb-4">
          לפי היתרה והאחוז הנוכחי
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
                {deposits.map((d: { id: string; amount: number; note: string | null; created_at: string }) => (
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
