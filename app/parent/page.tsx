import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { SignOutButton } from "@/components/SignOutButton";
import { ParentChildCard } from "@/components/ParentChildCard";
import { InviteChildForm } from "@/components/InviteChildForm";
import { createClient } from "@/utils/supabase/server";

export default async function ParentPage() {
  const supabase = createClient(await cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, email, full_name")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile || profile.role !== "parent") {
    redirect("/child");
  }

  const { data: accounts } = await supabase
    .from("child_accounts")
    .select("id, balance, annual_interest_percent, child_user_id")
    .eq("parent_id", user.id);

  const childIds = accounts?.map((a) => a.child_user_id) ?? [];
  const { data: children } =
    childIds.length > 0
      ? await supabase
          .from("profiles")
          .select("id, full_name, email")
          .in("id", childIds)
      : { data: [] as { id: string; full_name: string | null; email: string }[] };

  const byId = new Map(children?.map((c) => [c.id, c]) ?? []);

  return (
    <div className="flex flex-1 flex-col max-w-3xl mx-auto w-full px-4 py-8">
      <header className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold">לוח הורה</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            שלום{profile.full_name ? `, ${profile.full_name}` : ""}
          </p>
        </div>
        <SignOutButton />
      </header>

      <div className="mb-8">
        <InviteChildForm />
      </div>

      {!accounts?.length ? (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-600 p-10 text-center space-y-2">
          <p className="font-medium">עדיין אין ילדים מקושרים</p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            צור קישור הזמנה למעלה ושתף אותו עם הילד
          </p>
        </div>
      ) : (
        <ul className="space-y-6">
          {accounts.map((acc) => {
            const child = byId.get(acc.child_user_id);
            return (
              <li key={acc.id}>
                <ParentChildCard
                  accountId={acc.id}
                  childName={child?.full_name ?? null}
                  childEmail={child?.email ?? ""}
                  balance={Number(acc.balance)}
                  annualInterestPercent={Number(acc.annual_interest_percent)}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
