"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { createClient } from "@/utils/supabase/client";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function registerParent(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createClient();
    const { data, error: signError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
    });
    if (signError) {
      setLoading(false);
      setError(signError.message);
      return;
    }
    const uid = data.user?.id;
    const session = data.session;
    if (!uid) {
      setLoading(false);
      setError("נדרש אישור מייל לפני המשך. אשר את המייל או כבה אישור ב-Supabase.");
      return;
    }
    if (!session) {
      setLoading(false);
      setError("אין סשן פעיל אחרי ההרשמה. אשר מייל או כבה Confirm email ב-Supabase.");
      return;
    }
    const { error: profileError } = await supabase.from("profiles").insert({
      id: uid,
      email: email.trim(),
      full_name: fullName.trim() || null,
      role: "parent",
    });
    setLoading(false);
    if (profileError) {
      setError(profileError.message);
      return;
    }
    router.replace("/parent");
    router.refresh();
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-700 bg-[var(--card)] p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-center mb-2">הרשמה</h1>
        <p className="text-center text-sm text-slate-600 dark:text-slate-400 mb-6">
          הרשמה כהורה — לאחר ההרשמה תוכל להזמין ילדים באמצעות קישור
        </p>

        <form onSubmit={registerParent} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">שם מלא</label>
            <input
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">אימייל</label>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-left"
              dir="ltr"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">סיסמה</label>
            <input
              type="password"
              required
              minLength={6}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-left"
              dir="ltr"
            />
          </div>
          {error && (
            <p className="text-sm text-red-600 dark:text-red-400" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "נרשם…" : "הרשם כהורה"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
          כבר רשומים?{" "}
          <Link href="/login" className="text-blue-600 dark:text-blue-400 font-medium">
            התחברות
          </Link>
        </p>
      </div>
    </div>
  );
}
