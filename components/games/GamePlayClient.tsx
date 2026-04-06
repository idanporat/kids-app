"use client";

import { ActionMatchGame } from "@/components/games/ActionMatchGame";
import { AssociationsGame } from "@/components/games/AssociationsGame";
import { CategoryPick } from "@/components/games/CategoryPick";
import { ContextMatchGame } from "@/components/games/ContextMatchGame";
import { CountingGame } from "@/components/games/CountingGame";
import { EnvironmentsGame } from "@/components/games/EnvironmentsGame";
import { OppositesGame } from "@/components/games/OppositesGame";
import { PhoneticsGame } from "@/components/games/PhoneticsGame";
import { PowerMemory } from "@/components/games/PowerMemory";
import { RhymesGame } from "@/components/games/RhymesGame";
import { SequencesGame } from "@/components/games/SequencesGame";
import { ShapeHero } from "@/components/games/ShapeHero";
import { ShapeMatchGame } from "@/components/games/ShapeMatchGame";
import { SoundIdGame } from "@/components/games/SoundIdGame";
import { VisualClosureGame } from "@/components/games/VisualClosureGame";
import type { GameId } from "@/lib/game-data";

export function GamePlayClient({ token, gameId }: { token: string; gameId: GameId }) {
  switch (gameId) {
    case "shape-hero":
      return <ShapeHero token={token} />;
    case "power-memory":
      return <PowerMemory token={token} />;
    case "category-pick":
      return <CategoryPick token={token} />;
    case "associations":
      return <AssociationsGame token={token} />;
    case "environments":
      return <EnvironmentsGame token={token} />;
    case "shape-match":
      return <ShapeMatchGame token={token} />;
    case "context-match":
      return <ContextMatchGame token={token} />;
    case "action-match":
      return <ActionMatchGame token={token} />;
    case "visual-closure":
      return <VisualClosureGame token={token} />;
    case "opposites":
      return <OppositesGame token={token} />;
    case "rhymes":
      return <RhymesGame token={token} />;
    case "sequences":
      return <SequencesGame token={token} />;
    case "counting":
      return <CountingGame token={token} />;
    case "phonetics":
      return <PhoneticsGame token={token} />;
    case "sound-id":
      return <SoundIdGame token={token} />;
    default:
      return null;
  }
}
