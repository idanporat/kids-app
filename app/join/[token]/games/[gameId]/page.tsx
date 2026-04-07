import { notFound, redirect } from "next/navigation";

import { GamePlayClient } from "@/components/games/GamePlayClient";
import { isGameId } from "@/lib/game-data";
import { loadJoinCategories } from "@/lib/join-session";

type Props = {
  params: Promise<{ token: string; gameId: string }>;
};

export default async function GamePage({ params }: Props) {
  const { token, gameId } = await params;
  const { categories } = await loadJoinCategories(token);
  if (!categories.includes("games")) {
    redirect(`/join/${token}`);
  }
  if (!isGameId(gameId)) {
    notFound();
  }

  return <GamePlayClient token={token} gameId={gameId} />;
}
