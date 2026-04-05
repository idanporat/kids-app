import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { CompleteProfileForm } from "./CompleteProfileForm";
import { createClient } from "@/utils/supabase/server";

export default async function CompleteProfilePage() {
  const supabase = createClient(await cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    redirect("/login");
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

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
      <CompleteProfileForm userEmail={user.email} />
    </div>
  );
}
