import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const invite = searchParams.get("invite");

  if (code) {
    const supabase = createClient(await cookies());
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // If there's an invite token, try to consume it
        if (invite) {
          const { data: inviteData } = await supabase
            .from("child_invites")
            .select("used_by")
            .eq("token", invite)
            .maybeSingle();

          if (inviteData && !inviteData.used_by) {
            const { data: existingProfile } = await supabase
              .from("profiles")
              .select("role")
              .eq("id", user.id)
              .maybeSingle();

            if (!existingProfile) {
              await supabase.rpc("consume_child_invite", { p_token: invite });
              return NextResponse.redirect(`${origin}/child`);
            }
          }
        }

        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .maybeSingle();

        if (profile?.role === "parent") {
          return NextResponse.redirect(`${origin}/parent`);
        }
        if (profile?.role === "child") {
          return NextResponse.redirect(`${origin}/child`);
        }
        return NextResponse.redirect(`${origin}/complete-profile`);
      }
    }
  }

  return NextResponse.redirect(`${origin}/login?error=google`);
}
