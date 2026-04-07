"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { createClient } from "@/utils/supabase/client";
import { ChildCategoriesFieldset } from "@/components/ChildCategoriesFieldset";
import { isChildCategoryId } from "@/lib/child-categories";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleGoogleRegister() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  async function registerParent(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createClient();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const categoryRaw = fd.getAll("categories").map(String);
    const categories = categoryRaw.filter(isChildCategoryId);
    if (categories.length === 0) {
      setLoading(false);
      setError("בחר לפחות קטגוריה אחת (חיסכון או משחקים)");
      return;
    }

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
    if (profileError) {
      setLoading(false);
      setError(profileError.message);
      return;
    }
    const { error: settingsError } = await supabase.from("parent_settings").upsert(
      {
        parent_id: uid,
        enabled_child_categories: categories,
      },
      { onConflict: "parent_id" }
    );
    setLoading(false);
    if (settingsError) {
      setError(settingsError.message);
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
          <ChildCategoriesFieldset />
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

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-300 dark:border-slate-600" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-[var(--card)] px-2 text-slate-500">או</span>
          </div>
        </div>
        <button
          type="button"
          onClick={handleGoogleRegister}
          className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 py-3 font-medium hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden>
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          המשך עם Google (בחר קטגוריות אחרי ההתחברות)
        </button>

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
