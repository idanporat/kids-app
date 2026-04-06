import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

/**
 * Same-origin sync so mobile browsers / strict environments don't rely on
 * cross-origin calls from the Supabase JS client to the project URL.
 * Prefer SUPABASE_SERVICE_ROLE_KEY for a direct upsert (bypasses RLS reliably).
 */
export async function POST(request: Request) {
  let body: { token?: unknown; data?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const token = body.token;
  const data = body.data;
  if (typeof token !== "string" || token.length < 8) {
    return NextResponse.json({ error: "invalid token" }, { status: 400 });
  }
  if (data === null || typeof data !== "object") {
    return NextResponse.json({ error: "invalid data" }, { status: 400 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !anonKey) {
    return NextResponse.json({ error: "server misconfigured" }, { status: 500 });
  }

  const supabase = createClient(url, serviceRole ?? anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  if (serviceRole) {
    const { data: invite, error: invErr } = await supabase
      .from("child_invites")
      .select("child_account_id")
      .eq("token", token)
      .maybeSingle();

    if (invErr) {
      return NextResponse.json({ error: invErr.message }, { status: 500 });
    }
    if (!invite?.child_account_id) {
      return NextResponse.json({ error: "invalid token" }, { status: 400 });
    }

    const { error: upErr } = await supabase.from("child_game_progress").upsert(
      {
        child_account_id: invite.child_account_id,
        data,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "child_account_id" }
    );

    if (upErr) {
      return NextResponse.json({ error: upErr.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  }

  const { error: rpcErr } = await supabase.rpc("sync_game_progress_by_token", {
    p_token: token,
    p_data: data,
  });

  if (rpcErr) {
    return NextResponse.json({ error: rpcErr.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
