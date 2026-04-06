"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { flushProgressToServer } from "@/lib/game-progress";

/** When the child is under /join/:token/games, push local progress to the server (for parent dashboard). */
export function GameProgressSyncMount({ token }: { token: string }) {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname.includes("/games")) return;
    void flushProgressToServer(token);
  }, [token, pathname]);

  return null;
}
