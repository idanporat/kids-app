"use client";

type Props = {
  variant: "stars" | "hero-fly" | "none";
  show: boolean;
};

/** Pure CSS — stars burst + flying hero emoji */
export function RewardAnimation({ variant, show }: Props) {
  if (!show || variant === "none") return null;

  if (variant === "hero-fly") {
    return (
      <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
        <div className="hero-fly text-8xl" aria-hidden>
          🦸
        </div>
        <div className="absolute bottom-1/4 rounded-3xl bg-emerald-500/95 px-8 py-4 text-2xl font-bold text-white shadow-lg animate-pulse-soft">
          כל הכבוד!
        </div>
      </div>
    );
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center"
      aria-hidden
    >
      <div className="stars-burst">
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="star-particle"
            style={{ "--i": i } as React.CSSProperties & { "--i": number }}
          >
            ✨
          </span>
        ))}
      </div>
    </div>
  );
}
