import { notFound } from "next/navigation";

import { GamePlayClient } from "@/components/games/GamePlayClient";
import { isGameId } from "@/lib/game-data";

type Props = {
  params: Promise<{ token: string; gameId: string }>;
};

export default async function GamePage({ params }: Props) {
  const { token, gameId } = await params;
  if (!isGameId(gameId)) {
    notFound();
  }

  return <GamePlayClient token={token} gameId={gameId} />;
}
