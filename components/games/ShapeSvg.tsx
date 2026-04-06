"use client";

import type { ShapeId } from "@/lib/game-data";

/** Outlined geometric shape — same visual language as גיבור הצורות */
export function ShapeSvg({ shape, size = 140 }: { shape: ShapeId; size?: number }) {
  const s = size;
  const stroke = "currentColor";
  switch (shape) {
    case "circle":
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className="text-blue-600" aria-hidden>
          <circle cx="50" cy="50" r="38" fill="none" strokeWidth="8" stroke={stroke} />
        </svg>
      );
    case "square":
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className="text-emerald-600" aria-hidden>
          <rect x="18" y="18" width="64" height="64" rx="6" fill="none" strokeWidth="8" stroke={stroke} />
        </svg>
      );
    case "triangle":
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className="text-amber-600" aria-hidden>
          <polygon points="50,14 88,86 12,86" fill="none" strokeWidth="8" stroke={stroke} strokeLinejoin="round" />
        </svg>
      );
    case "star":
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className="text-violet-600" aria-hidden>
          <polygon
            points="50,8 61,38 94,38 68,58 78,90 50,72 22,90 32,58 6,38 39,38"
            fill="none"
            strokeWidth="6"
            stroke={stroke}
            strokeLinejoin="round"
          />
        </svg>
      );
    case "heart":
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className="text-rose-600" aria-hidden>
          <path
            d="M50 88 C20 60 5 40 5 28 C5 14 18 8 32 18 C42 24 48 32 50 36 C52 32 58 24 68 18 C82 8 95 14 95 28 C95 40 80 60 50 88 Z"
            fill="none"
            strokeWidth="7"
            stroke={stroke}
            strokeLinejoin="round"
          />
        </svg>
      );
    case "hexagon":
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className="text-cyan-600" aria-hidden>
          <polygon
            points="50,8 88,28 88,72 50,92 12,72 12,28"
            fill="none"
            strokeWidth="7"
            stroke={stroke}
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return null;
  }
}
