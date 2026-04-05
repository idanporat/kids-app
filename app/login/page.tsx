import { Suspense } from "react";

import { LoginForm } from "./LoginForm";

function LoginFallback() {
  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-700 bg-[var(--card)] p-8 shadow-sm text-center text-slate-500">
      טוען…
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
      <Suspense fallback={<LoginFallback />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
