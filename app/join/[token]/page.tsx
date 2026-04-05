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
      redirect("/parent");
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
