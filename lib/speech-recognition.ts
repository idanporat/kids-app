"use client";

/** Web Speech API — Chrome/Edge; limited elsewhere */

type SRInstance = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((ev: { results: { [key: number]: { [key: number]: { transcript: string } } } }) => void) | null;
  onerror: ((ev: { error: string }) => void) | null;
  onend: (() => void) | null;
};

function getCtor(): (new () => SRInstance) | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: new () => SRInstance;
    webkitSpeechRecognition?: new () => SRInstance;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function isSpeechRecognitionAvailable(): boolean {
  return getCtor() !== null;
}

export type ListenResult =
  | { ok: true; transcript: string }
  | { ok: false; reason: "unavailable" | "not_allowed" | "no_speech" | "aborted" | "error"; message?: string };

/**
 * One-shot Hebrew dictation. Requires user gesture before start (tap).
 * Resolves when first final result arrives or on error/timeout.
 */
export function listenHebrewOnce(options?: { timeoutMs?: number }): Promise<ListenResult> {
  const Ctor = getCtor();
  if (!Ctor) {
    return Promise.resolve({ ok: false, reason: "unavailable" });
  }

  const timeoutMs = options?.timeoutMs ?? 12000;

  return new Promise((resolve) => {
    let settled = false;
    const r = new Ctor();
    r.lang = "he-IL";
    r.interimResults = false;
    r.continuous = false;
    r.maxAlternatives = 3;

    const finish = (result: ListenResult) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      try {
        r.abort();
      } catch {
        /* ignore */
      }
      resolve(result);
    };

    const timer = window.setTimeout(() => {
      finish({ ok: false, reason: "no_speech", message: "timeout" });
    }, timeoutMs);

    r.onresult = (ev) => {
      const text = ev.results[0]?.[0]?.transcript?.trim() ?? "";
      if (text) {
        finish({ ok: true, transcript: text });
      }
    };

    r.onerror = (ev) => {
      const err = ev.error;
      if (err === "not-allowed" || err === "service-not-allowed") {
        finish({ ok: false, reason: "not_allowed", message: err });
      } else if (err === "aborted" || err === "no-speech") {
        finish({ ok: false, reason: err === "aborted" ? "aborted" : "no_speech", message: err });
      } else {
        finish({ ok: false, reason: "error", message: err });
      }
    };

    r.onend = () => {
      if (!settled) {
        finish({ ok: false, reason: "no_speech" });
      }
    };

    try {
      r.start();
    } catch {
      finish({ ok: false, reason: "error", message: "start failed" });
    }
  });
}
