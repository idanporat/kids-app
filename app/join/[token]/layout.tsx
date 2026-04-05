import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { JoinSessionLayout } from "@/components/join/JoinSessionLayout";
import { createClient } from "@/utils/supabase/server";

type Props = {
  children: React.ReactNode;
  params: Promise<{ token: string }>;
};

export default async function JoinTokenLayout({ children, params }: Props) {
  const { token } = await params;
  const supabase = createClient(await cookies());

  const { data: accountData } = await supabase.rpc("get_child_account_by_token", {
    p_token: token,
  });

  const account = accountData?.[0];
  if (!account) {
    redirect("/login");
  }

  return (
    <JoinSessionLayout
      token={token}
      childName={account.child_name ?? null}
      avatarUrl={account.avatar_url ?? null}
    >
      {children}
    </JoinSessionLayout>
  );
}
