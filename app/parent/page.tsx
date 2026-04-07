import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { SignOutButton } from "@/components/SignOutButton";
import { ParentChildCard } from "@/components/ParentChildCard";
import { InviteChildForm } from "@/components/InviteChildForm";
import { ParentChildCategoriesForm } from "@/components/ParentChildCategoriesForm";
import { normalizeEnabledCategories } from "@/lib/child-categories";
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

  const { data: settings } = await supabase
    .from("parent_settings")
    .select("enabled_child_categories")
    .eq("parent_id", user.id)
    .maybeSingle();

  const enabledChildCategories = normalizeEnabledCategories(
    settings?.enabled_child_categories as string[] | undefined
  );
  const showChildGames = enabledChildCategories.includes("games");

  const { data: accounts } = await supabase
    .from("child_accounts")
    .select("id, child_name, balance, annual_interest_percent, avatar_url")
    .eq("parent_id", user.id);

  const accountIds = accounts?.map((a) => a.id) ?? [];
  const { data: invites } =
    accountIds.length > 0
      ? await supabase
          .from("child_invites")
          .select("child_account_id, token")
          .in("child_account_id", accountIds)
      : { data: [] as { child_account_id: string; token: string }[] };

  const { data: progressRows } =
    accountIds.length > 0
      ? await supabase
          .from("child_game_progress")
          .select("child_account_id, data, updated_at")
          .in("child_account_id", accountIds)
      : { data: [] as { child_account_id: string; data: unknown; updated_at: string }[] };

  const tokenByAccountId = new Map(
    invites?.map((i) => [i.child_account_id, i.token]) ?? []
  );

  const progressByAccountId = new Map(
    progressRows?.map((r) => [
      r.child_account_id,
      { data: r.data, updatedAt: r.updated_at },
    ]) ?? []
  );

  return (
    <div className="flex flex-1 flex-col max-w-5xl mx-auto w-full px-4 py-8">
      <header className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold">לוח הורה</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            שלום{profile.full_name ? `, ${profile.full_name}` : ""}
          </p>
        </div>
        <SignOutButton />
      </header>

      <section className="mb-8 rounded-2xl border border-slate-200 bg-[var(--card)] p-6 dark:border-slate-700">
        <h2 className="text-lg font-semibold mb-1">מה הילדים רואים בקישור</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
          חיסכון (יתרה והפקדות), משחקים, או שניהם — ניתן לשנות בכל עת.
        </p>
        <ParentChildCategoriesForm defaultSelected={enabledChildCategories} />
      </section>

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
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {accounts.map((acc) => {
            const token = tokenByAccountId.get(acc.id);
            return (
              <li key={acc.id}>
                <ParentChildCard
                  accountId={acc.id}
                  childName={acc.child_name ?? null}
                  balance={Number(acc.balance)}
                  annualInterestPercent={Number(acc.annual_interest_percent)}
                  inviteToken={token ?? null}
                  avatarUrl={acc.avatar_url ?? null}
                  gameProgressSnapshot={progressByAccountId.get(acc.id) ?? null}
                  showChildGames={showChildGames}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
