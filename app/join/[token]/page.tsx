import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { createClient } from "@/utils/supabase/server";
import { JoinForm } from "./JoinForm";

type Props = {
  params: Promise<{ token: string }>;
};

export default async function JoinPage({ params }: Props) {
  const { token } = await params;
  const supabase = createClient(await cookies());

  // Check if the invite exists and is unused
  const { data: invite } = await supabase
    .from("child_invites")
    .select("child_name, used_by")
    .eq("token", token)
    .maybeSingle();

  if (!invite || invite.used_by) {
    redirect("/login");
  }

  // Check if logged-in user already has a profile
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
      const link = `${process.env.NEXT_PUBLIC_SITE_URL || ""}/join/${token}`;
      return (
        <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-700 bg-[var(--card)] p-8 shadow-sm text-center space-y-4">
            <h1 className="text-2xl font-bold">קישור הזמנה לילד</h1>
            <p className="text-slate-600 dark:text-slate-400">
              הקישור הזה מיועד ל<span className="font-semibold">{invite.child_name}</span>. 
              שתף אותו עם הילד כדי שיוכל להירשם ולהצטרף.
            </p>
            <div className="rounded-lg bg-slate-50 dark:bg-slate-800 p-3 text-sm break-all text-left" dir="ltr">
              {link || `join/${token}`}
            </div>
            <a href="/parent" className="inline-block text-blue-600 dark:text-blue-400 font-medium text-sm">
              ← חזרה ללוח ההורה
            </a>
          </div>
        </div>
      );
    }
    if (profile?.role === "child") {
      redirect("/child");
    }
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
      <JoinForm token={token} childName={invite.child_name} isLoggedIn={!!user} />
    </div>
  );
}
