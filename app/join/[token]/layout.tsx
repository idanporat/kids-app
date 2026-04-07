import { redirect } from "next/navigation";

import { JoinSessionLayout } from "@/components/join/JoinSessionLayout";
import { getJoinAccountByToken } from "@/lib/join-session";
import { normalizeEnabledCategories } from "@/lib/child-categories";

type Props = {
  children: React.ReactNode;
  params: Promise<{ token: string }>;
};

export default async function JoinTokenLayout({ children, params }: Props) {
  const { token } = await params;

  const account = await getJoinAccountByToken(token);
  if (!account) {
    redirect("/login");
  }

  const enabledCategories = normalizeEnabledCategories(
    account.enabled_child_categories as string[] | undefined
  );

  return (
    <JoinSessionLayout
      token={token}
      childName={account.child_name ?? null}
      avatarUrl={account.avatar_url ?? null}
      enabledCategories={enabledCategories}
    >
      {children}
    </JoinSessionLayout>
  );
}
