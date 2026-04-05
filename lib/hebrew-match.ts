/** Normalize Hebrew for comparing STT transcript to expected word */

const NIKKUD = /[\u0591-\u05C7\u05C8-\u05CF]/g;

export function normalizeHebrew(s: string): string {
  return s
    .replace(NIKKUD, "")
    .replace(/[^\u0590-\u05FFa-zA-Z0-9\s]/g, " ")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

/** True if transcript matches expected word or contains it (handles extra words from STT) */
export function transcriptMatchesExpected(
  transcript: string,
  expected: string,
  alternates: string[] = []
): boolean {
  const t = normalizeHebrew(transcript);
  const candidates = [expected, ...alternates].map((w) => normalizeHebrew(w)).filter(Boolean);
  for (const e of candidates) {
    if (!e) continue;
    if (t === e) return true;
    if (t.includes(e) || e.includes(t)) return true;
    const tw = t.split(/\s+/);
    if (tw.some((w) => w === e || (w.length > 1 && e.includes(w)) || (e.length > 1 && w.includes(e)))) {
      return true;
    }
  }
  return false;
}
