"use client";

import { CategoryPick } from "@/components/games/CategoryPick";
import { HeroWords } from "@/components/games/HeroWords";
import { PowerMemory } from "@/components/games/PowerMemory";
import { ShapeHero } from "@/components/games/ShapeHero";
import { SpeakIt } from "@/components/games/SpeakIt";
import type { GameId } from "@/lib/game-data";

export function GamePlayClient({ token, gameId }: { token: string; gameId: GameId }) {
  switch (gameId) {
    case "shape-hero":
      return <ShapeHero token={token} />;
    case "power-memory":
      return <PowerMemory token={token} />;
    case "hero-words":
      return <HeroWords token={token} />;
    case "category-pick":
      return <CategoryPick token={token} />;
    case "speak-it":
      return <SpeakIt token={token} />;
    default:
      return null;
  }
}
