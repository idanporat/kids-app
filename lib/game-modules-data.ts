/** Round data for educational mini-modules (Hebrew) — Twemoji 14.0.2 filenames. */

/** G1 — כלי/תוצאה (מצלמה→תמונה) */
export type AssociationRound = {
  cueLabel: string;
  cueFile: string;
  correct: string;
  options: [string, string, string];
};

export const ASSOCIATION_ROUNDS: AssociationRound[] = [
  { cueLabel: "מצלמה", cueFile: "1f4f7.png", correct: "1f5bc.png", options: ["1f5bc.png", "1f4fa.png", "1f4f1.png"] },
  { cueLabel: "מיקרופון", cueFile: "1f3a4.png", correct: "1f3b5.png", options: ["1f3b5.png", "1f4fa.png", "1f3a7.png"] },
  { cueLabel: "מברשת", cueFile: "1f58c.png", correct: "1f3a8.png", options: ["1f3a8.png", "1f4dd.png", "1f4d2.png"] },
  { cueLabel: "מחבת", cueFile: "1f373.png", correct: "1f95e.png", options: ["1f95e.png", "1f34e.png", "1f35e.png"] },
  { cueLabel: "מפתח", cueFile: "1f511.png", correct: "1f6aa.png", options: ["1f6aa.png", "1f3e0.png", "1f697.png"] },
  { cueLabel: "מספריים", cueFile: "2702.png", correct: "1f458.png", options: ["1f458.png", "1f45e.png", "1f392.png"] },
  { cueLabel: "עיפרון", cueFile: "270f.png", correct: "1f4dd.png", options: ["1f4dd.png", "1f4d5.png", "1f4bb.png"] },
  { cueLabel: "טלפון", cueFile: "1f4f1.png", correct: "1f4ac.png", options: ["1f4ac.png", "1f4f7.png", "1f4fa.png"] },
  { cueLabel: "פנס", cueFile: "1f526.png", correct: "1f441.png", options: ["1f441.png", "1f442.png", "1f445.png"] },
  { cueLabel: "מחפר", cueFile: "26cf.png", correct: "1f333.png", options: ["1f333.png", "1f3dd.png", "1f3d4.png"] },
  { cueLabel: "חכה", cueFile: "1f3a3.png", correct: "1f41f.png", options: ["1f41f.png", "1f42c.png", "1f433.png"] },
  { cueLabel: "מזלג", cueFile: "1f374.png", correct: "1f37d.png", options: ["1f37d.png", "1f963.png", "1f35e.png"] },
  { cueLabel: "כפית", cueFile: "1f944.png", correct: "1f366.png", options: ["1f366.png", "2615.png", "1f37a.png"] },
  { cueLabel: "מטרייה", cueFile: "1f302.png", correct: "1f327.png", options: ["1f327.png", "2600.png", "1f525.png"] },
  { cueLabel: "משקפיים", cueFile: "1f453.png", correct: "1f440.png", options: ["1f440.png", "1f443.png", "1f444.png"] },
  { cueLabel: "מגבת", cueFile: "1f9fc.png", correct: "1f6c1.png", options: ["1f6c1.png", "1f4a6.png", "1f4a7.png"] },
  { cueLabel: "משחת שיניים", cueFile: "1f9b7.png", correct: "1f9b4.png", options: ["1f9b4.png", "1f445.png", "1f442.png"] },
  { cueLabel: "מברשת שיניים", cueFile: "1faa5.png", correct: "1f9b7.png", options: ["1f9b7.png", "1f445.png", "1f444.png"] },
  { cueLabel: "מחט", cueFile: "1faa1.png", correct: "1f9e5.png", options: ["1f9e5.png", "1f45f.png", "1f392.png"] },
  { cueLabel: "פטיש", cueFile: "1f528.png", correct: "1f6e0.png", options: ["1f6e0.png", "1f3e0.png", "1f697.png"] },
  { cueLabel: "מקלחת", cueFile: "1f6bf.png", correct: "1f6c0.png", options: ["1f6c0.png", "1f9b8.png", "1f9b9.png"] },
  { cueLabel: "מגבה אש", cueFile: "1f692.png", correct: "1f525.png", options: ["1f525.png", "1f4a7.png", "1f327.png"] },
  { cueLabel: "מצפן", cueFile: "1f9ed.png", correct: "1f5fa.png", options: ["1f5fa.png", "1f3dd.png", "1f3de.png"] },
  { cueLabel: "מחשבון", cueFile: "1f5a9.png", correct: "1f4b0.png", options: ["1f4b0.png", "1f4b3.png", "1f4b5.png"] },
  { cueLabel: "מד", cueFile: "1f4cf.png", correct: "1f4d0.png", options: ["1f4d0.png", "1f4da.png", "1f4d2.png"] },
  { cueLabel: "מזרקה", cueFile: "1f489.png", correct: "1f912.png", options: ["1f912.png", "1f637.png", "1f915.png"] },
  { cueLabel: "משקולת", cueFile: "1f3cb.png", correct: "1f4aa.png", options: ["1f4aa.png", "1f9b5.png", "1f9b6.png"] },
  { cueLabel: "מקל נגינה", cueFile: "1f3b9.png", correct: "1f3b6.png", options: ["1f3b6.png", "1f3ba.png", "1f3bb.png"] },
  { cueLabel: "סיר", cueFile: "1f963.png", correct: "1f35d.png", options: ["1f35d.png", "1f35f.png", "1f35e.png"] },
  { cueLabel: "מסרק", cueFile: "1f488.png", correct: "1f9b3.png", options: ["1f9b3.png", "1f9b2.png", "1f9b0.png"] },
];

/** G2 — איפה שייך החפץ */
export type EnvironmentRound = {
  itemLabel: string;
  itemFile: string;
  correctEnv: "sea" | "sky" | "land" | "home";
  /** שלוש סביבות לבחירה */
  envs: [EnvironmentRound["correctEnv"], EnvironmentRound["correctEnv"], EnvironmentRound["correctEnv"]];
};

const ENV_META: Record<
  EnvironmentRound["correctEnv"],
  { label: string; file: string; bg: string }
> = {
  sea: { label: "ים", file: "1f30a.png", bg: "from-cyan-400/40 to-blue-600/50" },
  sky: { label: "שמיים", file: "1f324.png", bg: "from-sky-300/50 to-indigo-400/50" },
  land: { label: "יבשה", file: "1f3d4.png", bg: "from-amber-600/40 to-emerald-700/50" },
  home: { label: "בית", file: "1f3e0.png", bg: "from-orange-200/50 to-rose-300/50" },
};

export function environmentMeta(env: EnvironmentRound["correctEnv"]) {
  return ENV_META[env];
}

export const ENVIRONMENT_ROUNDS: EnvironmentRound[] = [
  { itemLabel: "סירה", itemFile: "26f5.png", correctEnv: "sea", envs: ["sea", "sky", "land"] },
  { itemLabel: "דג", itemFile: "1f41f.png", correctEnv: "sea", envs: ["land", "sea", "home"] },
  { itemLabel: "לווייתן", itemFile: "1f433.png", correctEnv: "sea", envs: ["sky", "sea", "home"] },
  { itemLabel: "סוס ים", itemFile: "1f9ad.png", correctEnv: "sea", envs: ["sea", "land", "sky"] },
  { itemLabel: "צדפה", itemFile: "1f41a.png", correctEnv: "sea", envs: ["home", "sea", "sky"] },
  { itemLabel: "תמנון", itemFile: "1f419.png", correctEnv: "sea", envs: ["land", "sea", "home"] },
  { itemLabel: "ציפור", itemFile: "1f426.png", correctEnv: "sky", envs: ["sea", "sky", "land"] },
  { itemLabel: "מטוס", itemFile: "2708.png", correctEnv: "sky", envs: ["land", "sky", "home"] },
  { itemLabel: "בלון", itemFile: "1f388.png", correctEnv: "sky", envs: ["sky", "sea", "home"] },
  { itemLabel: "קשת", itemFile: "1f308.png", correctEnv: "sky", envs: ["home", "sky", "land"] },
  { itemLabel: "ענן", itemFile: "2601.png", correctEnv: "sky", envs: ["sea", "sky", "land"] },
  { itemLabel: "ברק", itemFile: "26c8.png", correctEnv: "sky", envs: ["sky", "land", "sea"] },
  { itemLabel: "גמל", itemFile: "1f42b.png", correctEnv: "land", envs: ["sea", "sky", "land"] },
  { itemLabel: "עץ", itemFile: "1f333.png", correctEnv: "land", envs: ["land", "sea", "home"] },
  { itemLabel: "פרח", itemFile: "1f33c.png", correctEnv: "land", envs: ["sky", "land", "sea"] },
  { itemLabel: "בניין", itemFile: "1f3d7.png", correctEnv: "land", envs: ["sea", "land", "sky"] },
  { itemLabel: "אופניים", itemFile: "1f6b2.png", correctEnv: "land", envs: ["land", "sea", "home"] },
  { itemLabel: "בית", itemFile: "1f3e0.png", correctEnv: "home", envs: ["sea", "home", "sky"] },
  { itemLabel: "מיטה", itemFile: "1f6cf.png", correctEnv: "home", envs: ["home", "land", "sea"] },
  { itemLabel: "ספה", itemFile: "1f6cb.png", correctEnv: "home", envs: ["sky", "home", "land"] },
  { itemLabel: "אמבטיה", itemFile: "1f6c0.png", correctEnv: "home", envs: ["home", "sea", "sky"] },
  { itemLabel: "טלוויזיה", itemFile: "1f4fa.png", correctEnv: "home", envs: ["land", "home", "sea"] },
  { itemLabel: "ספר", itemFile: "1f4d5.png", correctEnv: "home", envs: ["home", "sky", "land"] },
  { itemLabel: "דולפין", itemFile: "1f42c.png", correctEnv: "sea", envs: ["sea", "land", "home"] },
  { itemLabel: "כריש", itemFile: "1f988.png", correctEnv: "sea", envs: ["sky", "sea", "land"] },
  { itemLabel: "מסוק", itemFile: "1f681.png", correctEnv: "sky", envs: ["sea", "sky", "land"] },
  { itemLabel: "כדור פורח", itemFile: "1f388.png", correctEnv: "sky", envs: ["land", "sky", "sea"] },
  { itemLabel: "נמלה", itemFile: "1f41c.png", correctEnv: "land", envs: ["home", "land", "sea"] },
  { itemLabel: "סלע", itemFile: "1faa8.png", correctEnv: "land", envs: ["land", "sea", "sky"] },
  { itemLabel: "מנורה", itemFile: "1f4a1.png", correctEnv: "home", envs: ["home", "land", "sea"] },
];

/** G4 — מקום לחפץ (תמונת הקשר בלבד — בלי מילים) */
export type ContextMatchRound = {
  placeImage: string;
  correct: string;
  options: [string, string, string];
};

export const CONTEXT_MATCH_ROUNDS: ContextMatchRound[] = [
  { placeImage: "1f373.png", correct: "1f944.png", options: ["1f944.png", "1f4a3.png", "1f9fc.png"] },
  { placeImage: "1f634.png", correct: "1f6cf.png", options: ["1f6cf.png", "1f6bd.png", "1f9f9.png"] },
  { placeImage: "1f6bf.png", correct: "1f9fc.png", options: ["1f9fc.png", "1f4a1.png", "1f4bb.png"] },
  { placeImage: "1f3e0.png", correct: "1f37d.png", options: ["1f37d.png", "1f6cb.png", "1f6cf.png"] },
  { placeImage: "1f3e0.png", correct: "1f331.png", options: ["1f331.png", "1f4d5.png", "1f697.png"] },
  { placeImage: "1f386.png", correct: "1f3ae.png", options: ["1f3ae.png", "1f4da.png", "1f4d6.png"] },
  { placeImage: "1f3ec.png", correct: "1f6d2.png", options: ["1f6d2.png", "1f3e0.png", "1f697.png"] },
  { placeImage: "1f3eb.png", correct: "1f4d2.png", options: ["1f4d2.png", "1f3c0.png", "1f3ae.png"] },
  { placeImage: "1f3df.png", correct: "26bd.png", options: ["26bd.png", "1f3c0.png", "1f3be.png"] },
  { placeImage: "1f30a.png", correct: "1f3d6.png", options: ["1f3d6.png", "1f3d4.png", "1f3de.png"] },
  { placeImage: "1f4c4.png", correct: "1f4bb.png", options: ["1f4bb.png", "1f4d5.png", "1f4f1.png"] },
  { placeImage: "1f697.png", correct: "1f527.png", options: ["1f527.png", "1f4d5.png", "1f3ae.png"] },
  { placeImage: "1f487.png", correct: "1f488.png", options: ["1f488.png", "1f4d6.png", "1f3ae.png"] },
  { placeImage: "1f9ea.png", correct: "1f52c.png", options: ["1f52c.png", "1f3ae.png", "1f3c0.png"] },
  { placeImage: "1f3db.png", correct: "1f5bc.png", options: ["1f5bc.png", "1f3ae.png", "1f3c0.png"] },
  { placeImage: "1f3eb.png", correct: "1f4da.png", options: ["1f4da.png", "1f4bb.png", "1f3ae.png"] },
  { placeImage: "1f963.png", correct: "1f373.png", options: ["1f373.png", "1f4d5.png", "1f4bb.png"] },
  { placeImage: "2744.png", correct: "1f9ca.png", options: ["1f9ca.png", "1f525.png", "1f4a7.png"] },
  { placeImage: "1f319.png", correct: "1f6cf.png", options: ["1f6cf.png", "1f392.png", "1f45c.png"] },
  { placeImage: "1f4d1.png", correct: "270f.png", options: ["270f.png", "1f3c0.png", "26bd.png"] },
  { placeImage: "1f3e0.png", correct: "1f9f8.png", options: ["1f9f8.png", "1f4d5.png", "1f4bb.png"] },
  { placeImage: "1f6c0.png", correct: "1f6bf.png", options: ["1f6bf.png", "1f4d5.png", "1f3ae.png"] },
  { placeImage: "1f6bb.png", correct: "1f6bd.png", options: ["1f6bd.png", "1f6c0.png", "1f4d5.png"] },
  { placeImage: "1f37f.png", correct: "1f963.png", options: ["1f963.png", "1f4d5.png", "1f4da.png"] },
  { placeImage: "1f373.png", correct: "1f37c.png", options: ["1f37c.png", "1f37a.png", "1f377.png"] },
  { placeImage: "1f33f.png", correct: "1f331.png", options: ["1f331.png", "1f3e0.png", "1f697.png"] },
  { placeImage: "1f4bc.png", correct: "1f4c4.png", options: ["1f4c4.png", "1f3c0.png", "26bd.png"] },
  { placeImage: "1f3eb.png", correct: "1f4dd.png", options: ["1f4dd.png", "1f3c0.png", "1f3ae.png"] },
  { placeImage: "1f3df.png", correct: "1f3c0.png", options: ["1f3c0.png", "1f3be.png", "26bd.png"] },
  { placeImage: "1f30a.png", correct: "1f3d6.png", options: ["1f3d6.png", "1f3d4.png", "1f3de.png"] },
];

/** G5 — מקום לפעולה */
export type ActionMatchRound = {
  place: string;
  actionHint: string;
  correct: string;
  options: [string, string, string];
};

export const ACTION_MATCH_ROUNDS: ActionMatchRound[] = [
  { place: "מסעדה", actionHint: "לאכול", correct: "1f37d.png", options: ["1f37d.png", "1f3c0.png", "1f3ae.png"] },
  { place: "בית ספר", actionHint: "ללמוד", correct: "1f4da.png", options: ["1f4da.png", "1f3c0.png", "1f3ae.png"] },
  { place: "מגרש", actionHint: "לשחק", correct: "26bd.png", options: ["26bd.png", "1f4da.png", "1f4d5.png"] },
  { place: "חוף", actionHint: "לשחות", correct: "1f3ca.png", options: ["1f3ca.png", "1f3c0.png", "1f3d4.png"] },
  { place: "מטבח", actionHint: "לבשל", correct: "1f373.png", options: ["1f373.png", "1f4da.png", "1f4d5.png"] },
  { place: "מיטה", actionHint: "לישון", correct: "1f634.png", options: ["1f634.png", "1f4da.png", "1f3c0.png"] },
  { place: "מקלחת", actionHint: "להתרחץ", correct: "1f6c0.png", options: ["1f6c0.png", "1f4da.png", "1f3c0.png"] },
  { place: "חנות", actionHint: "לקנות", correct: "1f6d2.png", options: ["1f6d2.png", "1f3e0.png", "1f697.png"] },
  { place: "ספרייה", actionHint: "לקרוא", correct: "1f4d6.png", options: ["1f4d6.png", "1f3c0.png", "1f3ae.png"] },
  { place: "גן חיות", actionHint: "לצפות בחיות", correct: "1f410.png", options: ["1f410.png", "1f3c0.png", "1f3d4.png"] },
  { place: "קולנוע", actionHint: "לצפות", correct: "1f3ac.png", options: ["1f3ac.png", "1f3ae.png", "1f3c0.png"] },
  { place: "תחנת רכבת", actionHint: "לנסוע", correct: "1f684.png", options: ["1f684.png", "1f697.png", "1f6b2.png"] },
  { place: "מגרש כדורגל", actionHint: "לבעוט", correct: "26bd.png", options: ["26bd.png", "1f3be.png", "1f3c0.png"] },
  { place: "מגרש טניס", actionHint: "להכות בכדור", correct: "1f3be.png", options: ["1f3be.png", "26bd.png", "1f3c0.png"] },
  { place: "בריכה", actionHint: "לשחות", correct: "1f3ca.png", options: ["1f3ca.png", "1f3c4.png", "26f5.png"] },
  { place: "יער", actionHint: "לטייל", correct: "1f6b6.png", options: ["1f6b6.png", "1f697.png", "2708.png"] },
  { place: "משרד", actionHint: "לעבוד", correct: "1f4bb.png", options: ["1f4bb.png", "1f3c0.png", "1f3ae.png"] },
  { place: "בית", actionHint: "לנוח", correct: "1f6cb.png", options: ["1f6cb.png", "1f3c0.png", "1f697.png"] },
  { place: "מספרה", actionHint: "להסתפר", correct: "1f488.png", options: ["1f488.png", "1f4da.png", "1f3c0.png"] },
  { place: "מגרש משחקים", actionHint: "לגלוש", correct: "1f6fc.png", options: ["1f6fc.png", "1f3c0.png", "26bd.png"] },
  { place: "מוזיאון", actionHint: "להסתכל", correct: "1f441.png", options: ["1f441.png", "1f3c0.png", "1f3ae.png"] },
  { place: "מעבדה", actionHint: "לנסות", correct: "1f9ea.png", options: ["1f9ea.png", "1f4da.png", "1f3c0.png"] },
  { place: "מגרש כדורסל", actionHint: "לזרוק לסל", correct: "1f3c0.png", options: ["1f3c0.png", "26bd.png", "1f3be.png"] },
  { place: "חדר כושר", actionHint: "להתאמן", correct: "1f3cb.png", options: ["1f3cb.png", "1f6c0.png", "1f3c0.png"] },
  { place: "בית קפה", actionHint: "לשתות קפה", correct: "2615.png", options: ["2615.png", "1f37a.png", "1f37d.png"] },
  { place: "מאפייה", actionHint: "לקנות לחם", correct: "1f35e.png", options: ["1f35e.png", "1f35f.png", "1f354.png"] },
  { place: "מכולת", actionHint: "לקנות אוכל", correct: "1f96d.png", options: ["1f96d.png", "1f3e0.png", "1f697.png"] },
  { place: "פארק", actionHint: "לרכב על אופניים", correct: "1f6b2.png", options: ["1f6b2.png", "1f6b6.png", "26bd.png"] },
  { place: "שוק", actionHint: "לקנות ירקות", correct: "1f345.png", options: ["1f345.png", "1f3e0.png", "1f697.png"] },
  { place: "מגרש", actionHint: "לרוץ", correct: "1f3c3.png", options: ["1f3c3.png", "1f6b6.png", "26bd.png"] },
  { place: "בית", actionHint: "לאכול ביחד", correct: "1f37d.png", options: ["1f37d.png", "1f4da.png", "1f3c0.png"] },
];

/** G6 — השלמת תמונה — בוחרים את חצי התמונה הימני שמשלים את השמאלי */
export type VisualClosureRound = {
  file: string;
  wrong: [string, string];
};

const VISUAL_CLOSURE_FILES = [
  "1f436.png",
  "1f431.png",
  "1f430.png",
  "1f34e.png",
  "1f34c.png",
  "1f353.png",
  "1f981.png",
  "1f418.png",
  "1f427.png",
  "1f433.png",
  "1f697.png",
  "1f68c.png",
  "2708.png",
  "1f6a2.png",
  "1f3e0.png",
  "26bd.png",
  "1f3c0.png",
  "1f4d5.png",
  "1f33c.png",
  "1f333.png",
  "1f355.png",
  "1f366.png",
  "1f414.png",
  "1f985.png",
  "1f984.png",
  "1f42c.png",
  "1f41f.png",
  "1f980.png",
  "1f419.png",
  "1f525.png",
] as const;

export const VISUAL_CLOSURE_ROUNDS: VisualClosureRound[] = VISUAL_CLOSURE_FILES.map((file, i) => {
  const n = VISUAL_CLOSURE_FILES.length;
  return {
    file,
    wrong: [VISUAL_CLOSURE_FILES[(i + 1) % n], VISUAL_CLOSURE_FILES[(i + 2) % n]] as [string, string],
  };
});

/** G7 — הפכים (גיל ~5: הפכים תמונתיים פשוטים; תמונת גירוי + בחירה + כיתובים) */
export type OppositeRound = {
  /** תמונה אחת בצד הזוג — בוחרים את ההפך שלה */
  promptImage: string;
  correct: string;
  options: [string, string, string];
  /** כיתוב לתמונת הגירוי למעלה */
  promptLabel: string;
  /** כיתוב לתשובה הנכונה (ההפך) */
  correctLabel: string;
  /** כיתוב לתמונת המסיח */
  distractorLabel: string;
};

/**
 * 17 זוגות × שני כיוונים — רק דברים שילד בן 5 מכיר מהחיים (מזג, כיוון, חיות, אוכל).
 * בלי סימוני מתמטיקה/טלפון קווי/וי־איקס — הוחלפו ברועש־שקט, חם־קר לאכול, גשם־שמש.
 * לכל סיבוב: `options` = [תשובה נכונה, תמונת הגירוי, מסיח] — ה־UI מערבב.
 */
export const OPPOSITE_ROUNDS: OppositeRound[] = [
  /* יום ↔ לילה */
  {
    promptImage: "2600.png",
    correct: "1f319.png",
    options: ["1f319.png", "2600.png", "2b50.png"],
    promptLabel: "יום (שמש)",
    correctLabel: "לילה (ירח)",
    distractorLabel: "כוכב",
  },
  {
    promptImage: "1f319.png",
    correct: "2600.png",
    options: ["2600.png", "1f319.png", "1f31f.png"],
    promptLabel: "לילה (ירח)",
    correctLabel: "יום (שמש)",
    distractorLabel: "כוכב נופל",
  },
  /* חם ↔ קר (אש ↔ שלג) */
  {
    promptImage: "1f525.png",
    correct: "2744.png",
    options: ["2744.png", "1f525.png", "2600.png"],
    promptLabel: "חם (אש)",
    correctLabel: "קר (שלג)",
    distractorLabel: "שמש",
  },
  {
    promptImage: "2744.png",
    correct: "1f525.png",
    options: ["1f525.png", "2744.png", "1f327.png"],
    promptLabel: "קר (שלג)",
    correctLabel: "חם (אש)",
    distractorLabel: "גשם",
  },
  /* למעלה ↔ למטה */
  {
    promptImage: "2b06.png",
    correct: "2b07.png",
    options: ["2b07.png", "2b06.png", "27a1.png"],
    promptLabel: "למעלה",
    correctLabel: "למטה",
    distractorLabel: "ימינה",
  },
  {
    promptImage: "2b07.png",
    correct: "2b06.png",
    options: ["2b06.png", "2b07.png", "2b05.png"],
    promptLabel: "למטה",
    correctLabel: "למעלה",
    distractorLabel: "שמאלה",
  },
  /* שמאל ↔ ימין */
  {
    promptImage: "2b05.png",
    correct: "27a1.png",
    options: ["27a1.png", "2b05.png", "2b06.png"],
    promptLabel: "שמאל",
    correctLabel: "ימין",
    distractorLabel: "למעלה",
  },
  {
    promptImage: "27a1.png",
    correct: "2b05.png",
    options: ["2b05.png", "27a1.png", "2b07.png"],
    promptLabel: "ימין",
    correctLabel: "שמאל",
    distractorLabel: "למטה",
  },
  /* פתוח ↔ נעול (מנעול פתוח ↔ מנעול נעול — לא דלת) */
  {
    promptImage: "1f510.png",
    correct: "1f512.png",
    options: ["1f512.png", "1f510.png", "1f511.png"],
    promptLabel: "מנעול פתוח",
    correctLabel: "מנעול נעול",
    distractorLabel: "מפתח",
  },
  {
    promptImage: "1f512.png",
    correct: "1f510.png",
    options: ["1f510.png", "1f512.png", "1f511.png"],
    promptLabel: "מנעול נעול",
    correctLabel: "מנעול פתוח",
    distractorLabel: "מפתח",
  },
  /* רועש ↔ שקט (רמקול) */
  {
    promptImage: "1f50a.png",
    correct: "1f507.png",
    options: ["1f507.png", "1f50a.png", "1f508.png"],
    promptLabel: "רועש",
    correctLabel: "שקט",
    distractorLabel: "עוצמה בינונית",
  },
  {
    promptImage: "1f507.png",
    correct: "1f50a.png",
    options: ["1f50a.png", "1f507.png", "1f509.png"],
    promptLabel: "שקט",
    correctLabel: "רועש",
    distractorLabel: "עוצמה נמוכה",
  },
  /* מבוגר ↔ תינוק */
  {
    promptImage: "1f474.png",
    correct: "1f476.png",
    options: ["1f476.png", "1f474.png", "1f466.png"],
    promptLabel: "מבוגר",
    correctLabel: "תינוק",
    distractorLabel: "ילד",
  },
  {
    promptImage: "1f476.png",
    correct: "1f474.png",
    options: ["1f474.png", "1f476.png", "1f467.png"],
    promptLabel: "תינוק",
    correctLabel: "מבוגר",
    distractorLabel: "ילדה",
  },
  /* אגודל למעלה ↔ למטה */
  {
    promptImage: "1f44d.png",
    correct: "1f44e.png",
    options: ["1f44e.png", "1f44d.png", "1f44c.png"],
    promptLabel: "אגודל למעלה",
    correctLabel: "אגודל למטה",
    distractorLabel: "הכל בסדר",
  },
  {
    promptImage: "1f44e.png",
    correct: "1f44d.png",
    options: ["1f44d.png", "1f44e.png", "1f44a.png"],
    promptLabel: "אגודל למטה",
    correctLabel: "אגודל למעלה",
    distractorLabel: "אגרוף",
  },
  /* שמח ↔ עצוב */
  {
    promptImage: "1f603.png",
    correct: "1f641.png",
    options: ["1f641.png", "1f603.png", "1f610.png"],
    promptLabel: "שמח",
    correctLabel: "עצוב",
    distractorLabel: "רגיל",
  },
  {
    promptImage: "1f641.png",
    correct: "1f603.png",
    options: ["1f603.png", "1f641.png", "1f615.png"],
    promptLabel: "עצוב",
    correctLabel: "שמח",
    distractorLabel: "מבולבל",
  },
  /* משקה חם ↔ גלידה (חם ↔ קר לאכול) */
  {
    promptImage: "2615.png",
    correct: "1f366.png",
    options: ["1f366.png", "2615.png", "1f375.png"],
    promptLabel: "משקה חם",
    correctLabel: "גלידה קרה",
    distractorLabel: "תה",
  },
  {
    promptImage: "1f366.png",
    correct: "2615.png",
    options: ["2615.png", "1f366.png", "1f9c3.png"],
    promptLabel: "גלידה קרה",
    correctLabel: "משקה חם",
    distractorLabel: "מיץ",
  },
  /* גשם ↔ שמש (עם פנים) */
  {
    promptImage: "1f327.png",
    correct: "1f31e.png",
    options: ["1f31e.png", "1f327.png", "2601.png"],
    promptLabel: "גשם",
    correctLabel: "שמש",
    distractorLabel: "ענן",
  },
  {
    promptImage: "1f31e.png",
    correct: "1f327.png",
    options: ["1f327.png", "1f31e.png", "2b50.png"],
    promptLabel: "שמש",
    correctLabel: "גשם",
    distractorLabel: "כוכב",
  },
  /* אדום ↔ ירוק */
  {
    promptImage: "1f534.png",
    correct: "1f7e2.png",
    options: ["1f7e2.png", "1f534.png", "1f535.png"],
    promptLabel: "אדום",
    correctLabel: "ירוק",
    distractorLabel: "כחול",
  },
  {
    promptImage: "1f7e2.png",
    correct: "1f534.png",
    options: ["1f534.png", "1f7e2.png", "1f7e1.png"],
    promptLabel: "ירוק",
    correctLabel: "אדום",
    distractorLabel: "צהוב",
  },
  /* לבן ↔ שחור */
  {
    promptImage: "26aa.png",
    correct: "26ab.png",
    options: ["26ab.png", "26aa.png", "1f535.png"],
    promptLabel: "לבן",
    correctLabel: "שחור",
    distractorLabel: "כחול",
  },
  {
    promptImage: "26ab.png",
    correct: "26aa.png",
    options: ["26aa.png", "26ab.png", "1f534.png"],
    promptLabel: "שחור",
    correctLabel: "לבן",
    distractorLabel: "אדום",
  },
  /* מהר ↔ לאט (ארנב ↔ צב) */
  {
    promptImage: "1f430.png",
    correct: "1f422.png",
    options: ["1f422.png", "1f430.png", "1f407.png"],
    promptLabel: "מהר (ארנב)",
    correctLabel: "לאט (צב)",
    distractorLabel: "ארנב",
  },
  {
    promptImage: "1f422.png",
    correct: "1f430.png",
    options: ["1f430.png", "1f422.png", "1f40c.png"],
    promptLabel: "לאט (צב)",
    correctLabel: "מהר (ארנב)",
    distractorLabel: "חילזון",
  },
  /* גדול ↔ קטן (פיל ↔ נמלה) */
  {
    promptImage: "1f418.png",
    correct: "1f41c.png",
    options: ["1f41c.png", "1f418.png", "1f42d.png"],
    promptLabel: "גדול (פיל)",
    correctLabel: "קטן (נמלה)",
    distractorLabel: "עכבר",
  },
  {
    promptImage: "1f41c.png",
    correct: "1f418.png",
    options: ["1f418.png", "1f41c.png", "1f41b.png"],
    promptLabel: "קטן (נמלה)",
    correctLabel: "גדול (פיל)",
    distractorLabel: "חיפושית",
  },
  /* ספר פתוח ↔ ספר סגור */
  {
    promptImage: "1f4d6.png",
    correct: "1f4d5.png",
    options: ["1f4d5.png", "1f4d6.png", "1f4da.png"],
    promptLabel: "ספר פתוח",
    correctLabel: "ספר סגור",
    distractorLabel: "ספר ירוק",
  },
  {
    promptImage: "1f4d5.png",
    correct: "1f4d6.png",
    options: ["1f4d6.png", "1f4d5.png", "1f4d3.png"],
    promptLabel: "ספר סגור",
    correctLabel: "ספר פתוח",
    distractorLabel: "מחברת",
  },
  /* מים ↔ יבשה (גל ↔ אי מדברי) */
  {
    promptImage: "1f30a.png",
    correct: "1f3dd.png",
    options: ["1f3dd.png", "1f30a.png", "1f3d6.png"],
    promptLabel: "מים (גל)",
    correctLabel: "יבשה (אי)",
    distractorLabel: "חוף",
  },
  {
    promptImage: "1f3dd.png",
    correct: "1f30a.png",
    options: ["1f30a.png", "1f3dd.png", "1f332.png"],
    promptLabel: "יבשה (אי)",
    correctLabel: "מים (גל)",
    distractorLabel: "עץ",
  },
];

/** G8 — חרוזים (גיל ~5: מילים וחפצים מהיומיום; תמונות + כיתובים) */
export type RhymeRound = {
  anchorFile: string;
  correct: string;
  options: [string, string, string];
  /** כיתוב לתמונה העליונה (הגירוי) */
  anchorLabel: string;
  /** כיתוב לתשובה הנכונה (חורזת) */
  correctLabel: string;
  /** כיתוב לתמונת המסיח (האפשרות השלישית ב־options) */
  distractorLabel: string;
};

/**
 * 25 זוגות חרוזים × שני כיוונים = 50 סיבובים — לפי רשימת הורים (חיות, חפצים בבית/בגן, אוכל).
 * דג–חג: "חג" כ־1f38a (קונפטי) כדי שלא יתנגש עם עוגה–חגיגה (1f389).
 * לכל שורה: `options` = [תשובה נכונה, תמונת גירוי, מסיח] — ה־UI מערבב.
 * כיתובים: `correctLabel` ↔ התשובה הנכונה, `anchorLabel` ↔ גירוי (מופיע גם כאחת הבחירות), `distractorLabel` ↔ המסיח.
 */
export const RHYME_ROUNDS: RhymeRound[] = [
  /* פיל–חליל */
  {
    anchorFile: "1f418.png",
    correct: "1fa88.png",
    options: ["1fa88.png", "1f418.png", "1f404.png"],
    anchorLabel: "פיל",
    correctLabel: "חליל",
    distractorLabel: "פרה",
  },
  {
    anchorFile: "1fa88.png",
    correct: "1f418.png",
    options: ["1f418.png", "1fa88.png", "1f3b5.png"],
    anchorLabel: "חליל",
    correctLabel: "פיל",
    distractorLabel: "מוזיקה",
  },
  /* צב–גב */
  {
    anchorFile: "1f422.png",
    correct: "1f464.png",
    options: ["1f464.png", "1f422.png", "1f99f.png"],
    anchorLabel: "צב",
    correctLabel: "גוף (גב)",
    distractorLabel: "עצלן",
  },
  {
    anchorFile: "1f464.png",
    correct: "1f422.png",
    options: ["1f422.png", "1f464.png", "1f9b5.png"],
    anchorLabel: "גוף (גב)",
    correctLabel: "צב",
    distractorLabel: "רגל",
  },
  /* נחש–קש */
  {
    anchorFile: "1f40d.png",
    correct: "1f33e.png",
    options: ["1f33e.png", "1f40d.png", "1f422.png"],
    anchorLabel: "נחש",
    correctLabel: "קש",
    distractorLabel: "צב",
  },
  {
    anchorFile: "1f33e.png",
    correct: "1f40d.png",
    options: ["1f40d.png", "1f33e.png", "1f33f.png"],
    anchorLabel: "קש",
    correctLabel: "נחש",
    distractorLabel: "עלה",
  },
  /* דג–חג */
  {
    anchorFile: "1f41f.png",
    correct: "1f38a.png",
    options: ["1f38a.png", "1f41f.png", "1f420.png"],
    anchorLabel: "דג",
    correctLabel: "חג (קונפטי)",
    distractorLabel: "דג טרופי",
  },
  {
    anchorFile: "1f38a.png",
    correct: "1f41f.png",
    options: ["1f41f.png", "1f38a.png", "1f389.png"],
    anchorLabel: "חג (קונפטי)",
    correctLabel: "דג",
    distractorLabel: "מסיבה",
  },
  /* פרפר–סוכר */
  {
    anchorFile: "1f98b.png",
    correct: "1f36c.png",
    options: ["1f36c.png", "1f98b.png", "1f41b.png"],
    anchorLabel: "פרפר",
    correctLabel: "סוכר",
    distractorLabel: "זחל",
  },
  {
    anchorFile: "1f36c.png",
    correct: "1f98b.png",
    options: ["1f98b.png", "1f36c.png", "1f36f.png"],
    anchorLabel: "סוכר",
    correctLabel: "פרפר",
    distractorLabel: "דבש",
  },
  /* זבוב–כלוב (כלוב ≈ דלת) */
  {
    anchorFile: "1fab0.png",
    correct: "1f6aa.png",
    options: ["1f6aa.png", "1fab0.png", "1f40e.png"],
    anchorLabel: "זבוב",
    correctLabel: "כלוב (דלת)",
    distractorLabel: "סוס",
  },
  {
    anchorFile: "1f6aa.png",
    correct: "1fab0.png",
    options: ["1fab0.png", "1f6aa.png", "1f6a9.png"],
    anchorLabel: "כלוב (דלת)",
    correctLabel: "זבוב",
    distractorLabel: "דגל",
  },
  /* נמלה–עגלה */
  {
    anchorFile: "1f41c.png",
    correct: "1f6d2.png",
    options: ["1f6d2.png", "1f41c.png", "1f41b.png"],
    anchorLabel: "נמלה",
    correctLabel: "עגלה",
    distractorLabel: "זחל",
  },
  {
    anchorFile: "1f6d2.png",
    correct: "1f41c.png",
    options: ["1f41c.png", "1f6d2.png", "1f6a4.png"],
    anchorLabel: "עגלה",
    correctLabel: "נמלה",
    distractorLabel: "סירה קטנה",
  },
  /* עכבר–מדבר */
  {
    anchorFile: "1f42d.png",
    correct: "1f3dc.png",
    options: ["1f3dc.png", "1f42d.png", "1f432.png"],
    anchorLabel: "עכבר",
    correctLabel: "מדבר",
    distractorLabel: "תנין",
  },
  {
    anchorFile: "1f3dc.png",
    correct: "1f42d.png",
    options: ["1f42d.png", "1f3dc.png", "1f3dd.png"],
    anchorLabel: "מדבר",
    correctLabel: "עכבר",
    distractorLabel: "אי",
  },
  /* תרנגול–עגול */
  {
    anchorFile: "1f413.png",
    correct: "26aa.png",
    options: ["26aa.png", "1f413.png", "1f414.png"],
    anchorLabel: "תרנגול",
    correctLabel: "עגול",
    distractorLabel: "תרנגולת",
  },
  {
    anchorFile: "26aa.png",
    correct: "1f413.png",
    options: ["1f413.png", "26aa.png", "26ab.png"],
    anchorLabel: "עגול",
    correctLabel: "תרנגול",
    distractorLabel: "עיגול שחור",
  },
  /* בלון–חלון */
  {
    anchorFile: "1f388.png",
    correct: "1fa9f.png",
    options: ["1fa9f.png", "1f388.png", "1f389.png"],
    anchorLabel: "בלון",
    correctLabel: "חלון",
    distractorLabel: "חגיגה",
  },
  {
    anchorFile: "1fa9f.png",
    correct: "1f388.png",
    options: ["1f388.png", "1fa9f.png", "1f3e0.png"],
    anchorLabel: "חלון",
    correctLabel: "בלון",
    distractorLabel: "בית",
  },
  /* מפתח–ירח */
  {
    anchorFile: "1f511.png",
    correct: "1f319.png",
    options: ["1f319.png", "1f511.png", "1f6aa.png"],
    anchorLabel: "מפתח",
    correctLabel: "ירח",
    distractorLabel: "דלת",
  },
  {
    anchorFile: "1f319.png",
    correct: "1f511.png",
    options: ["1f511.png", "1f319.png", "2b50.png"],
    anchorLabel: "ירח",
    correctLabel: "מפתח",
    distractorLabel: "כוכב",
  },
  /* שולחן–ענן */
  {
    anchorFile: "1f37d.png",
    correct: "2601.png",
    options: ["2601.png", "1f37d.png", "1f374.png"],
    anchorLabel: "שולחן (ערוכה)",
    correctLabel: "ענן",
    distractorLabel: "סכו״ם",
  },
  {
    anchorFile: "2601.png",
    correct: "1f37d.png",
    options: ["1f37d.png", "2601.png", "26c5.png"],
    anchorLabel: "ענן",
    correctLabel: "שולחן (ערוכה)",
    distractorLabel: "שמש מענן",
  },
  /* מיטה–לביבה */
  {
    anchorFile: "1f6cf.png",
    correct: "1f95e.png",
    options: ["1f95e.png", "1f6cf.png", "1f6cb.png"],
    anchorLabel: "מיטה",
    correctLabel: "לביבה",
    distractorLabel: "ספה",
  },
  {
    anchorFile: "1f95e.png",
    correct: "1f6cf.png",
    options: ["1f6cf.png", "1f95e.png", "1f954.png"],
    anchorLabel: "לביבה",
    correctLabel: "מיטה",
    distractorLabel: "גזר",
  },
  /* בקבוק–חיבוק */
  {
    anchorFile: "1f9c3.png",
    correct: "1fac2.png",
    options: ["1fac2.png", "1f9c3.png", "1f964.png"],
    anchorLabel: "בקבוק (משקה)",
    correctLabel: "חיבוק",
    distractorLabel: "כוס",
  },
  {
    anchorFile: "1fac2.png",
    correct: "1f9c3.png",
    options: ["1f9c3.png", "1fac2.png", "1f46d.png"],
    anchorLabel: "חיבוק",
    correctLabel: "בקבוק (משקה)",
    distractorLabel: "חברות",
  },
  /* שעון–ארון */
  {
    anchorFile: "23f0.png",
    correct: "1f5c4.png",
    options: ["1f5c4.png", "23f0.png", "23f1.png"],
    anchorLabel: "שעון מעורר",
    correctLabel: "ארון",
    distractorLabel: "שעון שולחן",
  },
  {
    anchorFile: "1f5c4.png",
    correct: "23f0.png",
    options: ["23f0.png", "1f5c4.png", "1f5c3.png"],
    anchorLabel: "ארון",
    correctLabel: "שעון מעורר",
    distractorLabel: "מגירות",
  },
  /* מראה–קערה */
  {
    anchorFile: "1fa9e.png",
    correct: "1f963.png",
    options: ["1f963.png", "1fa9e.png", "1f4f7.png"],
    anchorLabel: "מראה",
    correctLabel: "קערה",
    distractorLabel: "מצלמה",
  },
  {
    anchorFile: "1f963.png",
    correct: "1fa9e.png",
    options: ["1fa9e.png", "1f963.png", "1f372.png"],
    anchorLabel: "קערה",
    correctLabel: "מראה",
    distractorLabel: "קדרה",
  },
  /* מזלג–שלג */
  {
    anchorFile: "1f374.png",
    correct: "2744.png",
    options: ["2744.png", "1f374.png", "1f37d.png"],
    anchorLabel: "מזלג",
    correctLabel: "שלג",
    distractorLabel: "שולחן",
  },
  {
    anchorFile: "2744.png",
    correct: "1f374.png",
    options: ["1f374.png", "2744.png", "1f328.png"],
    anchorLabel: "שלג",
    correctLabel: "מזלג",
    distractorLabel: "ענן שלג",
  },
  /* עוגה–חגיגה */
  {
    anchorFile: "1f382.png",
    correct: "1f389.png",
    options: ["1f389.png", "1f382.png", "1f370.png"],
    anchorLabel: "עוגה",
    correctLabel: "חגיגה",
    distractorLabel: "פאי",
  },
  {
    anchorFile: "1f389.png",
    correct: "1f382.png",
    options: ["1f382.png", "1f389.png", "1f38a.png"],
    anchorLabel: "חגיגה",
    correctLabel: "עוגה",
    distractorLabel: "קונפטי",
  },
  /* גבינה–ספינה */
  {
    anchorFile: "1f9c0.png",
    correct: "26f5.png",
    options: ["26f5.png", "1f9c0.png", "1f9c3.png"],
    anchorLabel: "גבינה",
    correctLabel: "ספינה",
    distractorLabel: "מיץ",
  },
  {
    anchorFile: "26f5.png",
    correct: "1f9c0.png",
    options: ["1f9c0.png", "26f5.png", "1f6a9.png"],
    anchorLabel: "ספינה",
    correctLabel: "גבינה",
    distractorLabel: "דגל",
  },
  /* לימון–פעמון */
  {
    anchorFile: "1f34b.png",
    correct: "1f514.png",
    options: ["1f514.png", "1f34b.png", "1f34a.png"],
    anchorLabel: "לימון",
    correctLabel: "פעמון",
    distractorLabel: "תפוז",
  },
  {
    anchorFile: "1f514.png",
    correct: "1f34b.png",
    options: ["1f34b.png", "1f514.png", "1f34e.png"],
    anchorLabel: "פעמון",
    correctLabel: "לימון",
    distractorLabel: "תפוח",
  },
  /* פרח–מלח */
  {
    anchorFile: "1f33c.png",
    correct: "1f9c2.png",
    options: ["1f9c2.png", "1f33c.png", "1f33b.png"],
    anchorLabel: "פרח",
    correctLabel: "מלח",
    distractorLabel: "ורד",
  },
  {
    anchorFile: "1f9c2.png",
    correct: "1f33c.png",
    options: ["1f33c.png", "1f9c2.png", "1f9c3.png"],
    anchorLabel: "מלח",
    correctLabel: "פרח",
    distractorLabel: "מיץ",
  },
  /* עץ–חץ */
  {
    anchorFile: "1f333.png",
    correct: "1f3f9.png",
    options: ["1f3f9.png", "1f333.png", "1f332.png"],
    anchorLabel: "עץ",
    correctLabel: "חץ",
    distractorLabel: "עץ נשיר",
  },
  {
    anchorFile: "1f3f9.png",
    correct: "1f333.png",
    options: ["1f333.png", "1f3f9.png", "1f32d.png"],
    anchorLabel: "חץ",
    correctLabel: "עץ",
    distractorLabel: "טאקו",
  },
  /* מים–שמיים */
  {
    anchorFile: "1f4a7.png",
    correct: "1f324.png",
    options: ["1f324.png", "1f4a7.png", "1f30a.png"],
    anchorLabel: "מים (טיפה)",
    correctLabel: "שמיים",
    distractorLabel: "גל",
  },
  {
    anchorFile: "1f324.png",
    correct: "1f4a7.png",
    options: ["1f4a7.png", "1f324.png", "2600.png"],
    anchorLabel: "שמיים",
    correctLabel: "מים (טיפה)",
    distractorLabel: "שמש",
  },
  /* בור–אור */
  {
    anchorFile: "1f573.png",
    correct: "1f4a1.png",
    options: ["1f4a1.png", "1f573.png", "1f5c4.png"],
    anchorLabel: "בור",
    correctLabel: "אור (נורה)",
    distractorLabel: "ארון",
  },
  {
    anchorFile: "1f4a1.png",
    correct: "1f573.png",
    options: ["1f573.png", "1f4a1.png", "1f505.png"],
    anchorLabel: "אור (נורה)",
    correctLabel: "בור",
    distractorLabel: "עמעום",
  },
  /* כלב–לב (השלמה ל־25 זוגות) */
  {
    anchorFile: "1f436.png",
    correct: "1f493.png",
    options: ["1f493.png", "1f436.png", "1f431.png"],
    anchorLabel: "כלב",
    correctLabel: "לב",
    distractorLabel: "חתול",
  },
  {
    anchorFile: "1f493.png",
    correct: "1f436.png",
    options: ["1f436.png", "1f493.png", "1f49a.png"],
    anchorLabel: "לב",
    correctLabel: "כלב",
    distractorLabel: "לב ירוק",
  },
];

/** G10 — סדרות מספרים (גיל ~5: כל המספרים 1–10 בלבד; רק קפיצות של אחד — הפרש קבוע 1) */
export type SequenceRound = {
  display: [string, string, string, string];
  answer: number;
  options: [number, number, number];
};

const SEQUENCE_MAX_N = 10;

/** זוגות (התחלה, הפרש) עם הפרש 1 בלבד, כך שארבעת האיברים בין 1 ל־10 כולל (1…4 עד 7…10) */
function sequenceStartStepPairs(): { start: number; step: number }[] {
  const pairs: { start: number; step: number }[] = [];
  const step = 1;
  const maxStart = SEQUENCE_MAX_N - 3 * step;
  for (let start = 1; start <= maxStart; start++) {
    pairs.push({ start, step });
  }
  return pairs;
}

function sequenceWrongOptions(answer: number): [number, number] {
  const pool = Array.from({ length: SEQUENCE_MAX_N }, (_, j) => j + 1).filter((n) => n !== answer);
  return [pool[0], pool[1]];
}

function buildSequenceRounds(): SequenceRound[] {
  const pairs = sequenceStartStepPairs();
  const out: SequenceRound[] = [];
  for (let i = 0; i < 30; i++) {
    const { start, step } = pairs[i % pairs.length];
    const seq = [start, start + step, start + 2 * step, start + 3 * step];
    const miss = 1 + (i % 2);
    const ans = seq[miss];
    const [w1, w2] = sequenceWrongOptions(ans);
    const opts: [number, number, number] = [ans, w1, w2];
    const labels: [string, string, string, string] = seq.map((n, idx) => (idx === miss ? "_" : String(n))) as [
      string,
      string,
      string,
      string,
    ];
    out.push({ display: labels, answer: ans, options: opts });
  }
  return out;
}

export const SEQUENCE_ROUNDS: SequenceRound[] = buildSequenceRounds();

/** G11 — ספירה */
export type CountingRound = {
  n: number;
  icon: string;
  correct: string;
  options: [string, string, string];
};

function buildCountingRounds(): CountingRound[] {
  const icons = [
    "1f36d.png",
    "1f34e.png",
    "1f353.png",
    "1f366.png",
    "1f36b.png",
    "1f36a.png",
    "1f95a.png",
    "1f34c.png",
    "1f347.png",
    "1f352.png",
  ];
  const out: CountingRound[] = [];
  for (let i = 0; i < 30; i++) {
    const n = 1 + (i % 9);
    const icon = icons[i % icons.length];
    let wrong1 = ((n + 2) % 9) + 1;
    let wrong2 = ((n + 5) % 9) + 1;
    if (wrong1 === n) wrong1 = (n % 9) + 1;
    if (wrong2 === n || wrong2 === wrong1) wrong2 = ((n + 3) % 9) + 1;
    if (wrong2 === wrong1) wrong2 = (wrong2 % 9) + 1;
    out.push({
      n,
      icon,
      correct: String(n),
      options: [String(n), String(wrong1), String(wrong2)],
    });
  }
  return out;
}

export const COUNTING_ROUNDS: CountingRound[] = buildCountingRounds();

/** G12 — אות ראשונה */
export type PhoneticsOption = { file: string; word: string };

export type PhoneticsRound = {
  letter: string;
  word: string;
  correct: string;
  options: [PhoneticsOption, PhoneticsOption, PhoneticsOption];
};

export const PHONETICS_ROUNDS: PhoneticsRound[] = [
  {
    letter: "א",
    word: "אגס",
    correct: "1f350.png",
    options: [
      { file: "1f350.png", word: "אגס" },
      { file: "1f34e.png", word: "תפוח" },
      { file: "1f34c.png", word: "בננה" },
    ],
  },
  {
    letter: "ב",
    word: "בננה",
    correct: "1f34c.png",
    options: [
      { file: "1f34c.png", word: "בננה" },
      { file: "1f34e.png", word: "תפוח" },
      { file: "1f353.png", word: "תות" },
    ],
  },
  {
    letter: "ג",
    word: "גזר",
    correct: "1f955.png",
    options: [
      { file: "1f955.png", word: "גזר" },
      { file: "1f966.png", word: "חסה" },
      { file: "1f345.png", word: "עגבנייה" },
    ],
  },
  {
    letter: "ד",
    word: "דג",
    correct: "1f41f.png",
    options: [
      { file: "1f41f.png", word: "דג" },
      { file: "1f419.png", word: "תמנון" },
      { file: "1f420.png", word: "דג טרופי" },
    ],
  },
  {
    letter: "ה",
    word: "היפופוטם",
    correct: "1f99b.png",
    options: [
      { file: "1f99b.png", word: "היפופוטם" },
      { file: "1f418.png", word: "פיל" },
      { file: "1f42c.png", word: "דולפין" },
    ],
  },
  {
    letter: "ו",
    word: "ורד",
    correct: "1f339.png",
    options: [
      { file: "1f339.png", word: "ורד" },
      { file: "1f33c.png", word: "פרח" },
      { file: "1f33b.png", word: "חמניה" },
    ],
  },
  {
    letter: "ז",
    word: "זברה",
    correct: "1f993.png",
    options: [
      { file: "1f993.png", word: "זברה" },
      { file: "1f992.png", word: "ג׳ירפה" },
      { file: "1f998.png", word: "קרנף" },
    ],
  },
  {
    letter: "ח",
    word: "חתול",
    correct: "1f431.png",
    options: [
      { file: "1f431.png", word: "חתול" },
      { file: "1f436.png", word: "כלב" },
      { file: "1f430.png", word: "ארנב" },
    ],
  },
  {
    letter: "ט",
    word: "טיגריס",
    correct: "1f405.png",
    options: [
      { file: "1f405.png", word: "טיגריס" },
      { file: "1f406.png", word: "נמר" },
      { file: "1f981.png", word: "אריה" },
    ],
  },
  {
    letter: "י",
    word: "ינשוף",
    correct: "1f989.png",
    options: [
      { file: "1f989.png", word: "ינשוף" },
      { file: "1f985.png", word: "נשר" },
      { file: "1f426.png", word: "ציפור" },
    ],
  },
  {
    letter: "כ",
    word: "כבשה",
    correct: "1f411.png",
    options: [
      { file: "1f411.png", word: "כבשה" },
      { file: "1f410.png", word: "עז" },
      { file: "1f404.png", word: "פרה" },
    ],
  },
  {
    letter: "ל",
    word: "לווייתן",
    correct: "1f433.png",
    options: [
      { file: "1f433.png", word: "לווייתן" },
      { file: "1f40b.png", word: "לוויתן" },
      { file: "1f988.png", word: "כריש" },
    ],
  },
  {
    letter: "מ",
    word: "מכונית",
    correct: "1f697.png",
    options: [
      { file: "1f697.png", word: "מכונית" },
      { file: "1f68c.png", word: "אוטובוס" },
      { file: "1f695.png", word: "מונית" },
    ],
  },
  {
    letter: "נ",
    word: "נשר",
    correct: "1f985.png",
    options: [
      { file: "1f985.png", word: "נשר" },
      { file: "1f986.png", word: "ברווז" },
      { file: "1f989.png", word: "ינשוף" },
    ],
  },
  {
    letter: "ס",
    word: "סוס",
    correct: "1f434.png",
    options: [
      { file: "1f434.png", word: "סוס" },
      { file: "1f40e.png", word: "פרצוף סוס" },
      { file: "1f402.png", word: "פר" },
    ],
  },
  {
    letter: "ע",
    word: "ענבים",
    correct: "1f347.png",
    options: [
      { file: "1f347.png", word: "ענבים" },
      { file: "1f34e.png", word: "תפוח" },
      { file: "1f352.png", word: "מלון" },
    ],
  },
  {
    letter: "פ",
    word: "פיל",
    correct: "1f418.png",
    options: [
      { file: "1f418.png", word: "פיל" },
      { file: "1f42f.png", word: "קרנף" },
      { file: "1f404.png", word: "פרה" },
    ],
  },
  {
    letter: "צ",
    word: "צפרדע",
    correct: "1f438.png",
    options: [
      { file: "1f438.png", word: "צפרדע" },
      { file: "1f422.png", word: "צב" },
      { file: "1f40d.png", word: "נחש" },
    ],
  },
  {
    letter: "ק",
    word: "קוף",
    correct: "1f435.png",
    options: [
      { file: "1f435.png", word: "קוף" },
      { file: "1f412.png", word: "קוף" },
      { file: "1f9a7.png", word: "גורילה" },
    ],
  },
  {
    letter: "ר",
    word: "רדיו",
    correct: "1f4fb.png",
    options: [
      { file: "1f4fb.png", word: "רדיו" },
      { file: "1f4fa.png", word: "טלוויזיה" },
      { file: "1f399.png", word: "מיקרופון" },
    ],
  },
  {
    letter: "ש",
    word: "שמש",
    correct: "2600.png",
    options: [
      { file: "2600.png", word: "שמש" },
      { file: "1f319.png", word: "ירח" },
      { file: "26c5.png", word: "ענן" },
    ],
  },
  {
    letter: "ת",
    word: "תפוח",
    correct: "1f34e.png",
    options: [
      { file: "1f34e.png", word: "תפוח" },
      { file: "1f34f.png", word: "תפוח אדום" },
      { file: "1f350.png", word: "אגס" },
    ],
  },
  {
    letter: "א",
    word: "אריה",
    correct: "1f981.png",
    options: [
      { file: "1f981.png", word: "אריה" },
      { file: "1f42f.png", word: "קרנף" },
      { file: "1f405.png", word: "טיגריס" },
    ],
  },
  {
    letter: "ב",
    word: "ברווז",
    correct: "1f986.png",
    options: [
      { file: "1f986.png", word: "ברווז" },
      { file: "1f427.png", word: "פינגווין" },
      { file: "1f424.png", word: "אפרוח" },
    ],
  },
  {
    letter: "ג",
    word: "ג׳ירפה",
    correct: "1f992.png",
    options: [
      { file: "1f992.png", word: "ג׳ירפה" },
      { file: "1f993.png", word: "זברה" },
      { file: "1f998.png", word: "קרנף" },
    ],
  },
  {
    letter: "ד",
    word: "דולפין",
    correct: "1f42c.png",
    options: [
      { file: "1f42c.png", word: "דולפין" },
      { file: "1f433.png", word: "לווייתן" },
      { file: "1f988.png", word: "כריש" },
    ],
  },
  {
    letter: "ח",
    word: "חד קרן",
    correct: "1f984.png",
    options: [
      { file: "1f984.png", word: "חד קרן" },
      { file: "1f981.png", word: "אריה" },
      { file: "1f434.png", word: "סוס" },
    ],
  },
  {
    letter: "כ",
    word: "כריש",
    correct: "1f988.png",
    options: [
      { file: "1f988.png", word: "כריש" },
      { file: "1f420.png", word: "דג טרופי" },
      { file: "1f41f.png", word: "דג" },
    ],
  },
  {
    letter: "מ",
    word: "מנגו",
    correct: "1f96d.png",
    options: [
      { file: "1f96d.png", word: "מנגו" },
      { file: "1f34e.png", word: "תפוח" },
      { file: "1f34c.png", word: "בננה" },
    ],
  },
  {
    letter: "ע",
    word: "עוף",
    correct: "1f414.png",
    options: [
      { file: "1f414.png", word: "עוף" },
      { file: "1f413.png", word: "תרנגול" },
      { file: "1f423.png", word: "אפרוח" },
    ],
  },
  {
    letter: "ש",
    word: "שועל",
    correct: "1f98a.png",
    options: [
      { file: "1f98a.png", word: "שועל" },
      { file: "1f43a.png", word: "זאב" },
      { file: "1f431.png", word: "חתול" },
    ],
  },
];
