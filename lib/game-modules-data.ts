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

/** G3 — צורה לחפץ */
export type ShapeMatchRound = {
  shapeName: string;
  shapeFile: string;
  correct: string;
  options: [string, string, string];
};

export const SHAPE_MATCH_ROUNDS: ShapeMatchRound[] = [
  { shapeName: "משולש", shapeFile: "1f53a.png", correct: "1f355.png", options: ["1f355.png", "1f35e.png", "1f36a.png"] },
  { shapeName: "עיגול", shapeFile: "26aa.png", correct: "1f34e.png", options: ["1f34e.png", "1f34c.png", "1f34a.png"] },
  { shapeName: "ריבוע", shapeFile: "1f7e6.png", correct: "1f4f0.png", options: ["1f4f0.png", "1f4d5.png", "1f4da.png"] },
  { shapeName: "כוכב", shapeFile: "2b50.png", correct: "1f31f.png", options: ["1f31f.png", "2728.png", "1f320.png"] },
  { shapeName: "לב", shapeFile: "1f496.png", correct: "1f495.png", options: ["1f495.png", "1f48c.png", "1f339.png"] },
  { shapeName: "עיגול", shapeFile: "26ab.png", correct: "1f35e.png", options: ["1f35e.png", "1f956.png", "1f35d.png"] },
  { shapeName: "משולש", shapeFile: "1f53a.png", correct: "1f384.png", options: ["1f384.png", "1f332.png", "1f333.png"] },
  { shapeName: "ריבוע", shapeFile: "1f7e6.png", correct: "1f4f1.png", options: ["1f4f1.png", "1f4bb.png", "1f4f2.png"] },
  { shapeName: "עיגול", shapeFile: "26aa.png", correct: "1f6e1.png", options: ["1f6e1.png", "1f3c0.png", "26bd.png"] },
  { shapeName: "משולש", shapeFile: "1f53a.png", correct: "1f3db.png", options: ["1f3db.png", "1f3d7.png", "1f3ed.png"] },
  { shapeName: "כוכב", shapeFile: "2b50.png", correct: "1f31f.png", options: ["1f31f.png", "2b50.png", "1f320.png"] },
  { shapeName: "עיגול", shapeFile: "26aa.png", correct: "1f95e.png", options: ["1f95e.png", "1f373.png", "1f372.png"] },
  { shapeName: "ריבוע", shapeFile: "1f7e6.png", correct: "1f4f0.png", options: ["1f4f0.png", "1f4d1.png", "1f4c4.png"] },
  { shapeName: "משולש", shapeFile: "1f53a.png", correct: "1f3c9.png", options: ["1f3c9.png", "26bd.png", "1f3c0.png"] },
  { shapeName: "עיגול", shapeFile: "26aa.png", correct: "1f37a.png", options: ["1f37a.png", "1f377.png", "1f378.png"] },
  { shapeName: "לב", shapeFile: "1f496.png", correct: "1f490.png", options: ["1f490.png", "1f33c.png", "1f339.png"] },
  { shapeName: "עיגול", shapeFile: "26ab.png", correct: "1f36e.png", options: ["1f36e.png", "1f36d.png", "1f36c.png"] },
  { shapeName: "משולש", shapeFile: "1f53a.png", correct: "1f3d4.png", options: ["1f3d4.png", "1f3de.png", "1f3d6.png"] },
  { shapeName: "ריבוע", shapeFile: "1f7e6.png", correct: "1f4f2.png", options: ["1f4f2.png", "1f4f1.png", "260e.png"] },
  { shapeName: "כוכב", shapeFile: "2b50.png", correct: "2728.png", options: ["2728.png", "1f4a1.png", "1f526.png"] },
  { shapeName: "עיגול", shapeFile: "26aa.png", correct: "1f34d.png", options: ["1f34d.png", "1f34b.png", "1f34a.png"] },
  { shapeName: "משולש", shapeFile: "1f53a.png", correct: "1f3c5.png", options: ["1f3c5.png", "1f396.png", "1f947.png"] },
  { shapeName: "עיגול", shapeFile: "26aa.png", correct: "1fbe1.png", options: ["1fbe1.png", "1f9c0.png", "1f95a.png"] },
  { shapeName: "ריבוע", shapeFile: "1f7e6.png", correct: "1f9f0.png", options: ["1f9f0.png", "1f4bd.png", "1f4bf.png"] },
  { shapeName: "לב", shapeFile: "1f496.png", correct: "1f48b.png", options: ["1f48b.png", "1f444.png", "1f445.png"] },
  { shapeName: "עיגול", shapeFile: "26ab.png", correct: "1f961.png", options: ["1f961.png", "1f35c.png", "1f35d.png"] },
  { shapeName: "משולש", shapeFile: "1f53a.png", correct: "1f3f4.png", options: ["1f3f4.png", "1f6a9.png", "1f3c1.png"] },
  { shapeName: "כוכב", shapeFile: "2b50.png", correct: "1f320.png", options: ["1f320.png", "1f52d.png", "1f52c.png"] },
  { shapeName: "עיגול", shapeFile: "26aa.png", correct: "1f950.png", options: ["1f950.png", "1f32e.png", "1f354.png"] },
  { shapeName: "ריבוע", shapeFile: "1f7e6.png", correct: "1f4f0.png", options: ["1f4f0.png", "1f392.png", "1f45c.png"] },
];

/** G4 — מקום לחפץ */
export type ContextMatchRound = {
  place: string;
  correct: string;
  options: [string, string, string];
};

export const CONTEXT_MATCH_ROUNDS: ContextMatchRound[] = [
  { place: "מטבח", correct: "1f944.png", options: ["1f944.png", "1f4a3.png", "1f9fc.png"] },
  { place: "מיטה", correct: "1f6cf.png", options: ["1f6cf.png", "1f6bd.png", "1f9f9.png"] },
  { place: "אמבטיה", correct: "1f9fc.png", options: ["1f9fc.png", "1f4a1.png", "1f4bb.png"] },
  { place: "שולחן אוכל", correct: "1f37d.png", options: ["1f37d.png", "1f6cb.png", "1f6cf.png"] },
  { place: "גן", correct: "1f331.png", options: ["1f331.png", "1f3e0.png", "1f4d5.png"] },
  { place: "חדר משחקים", correct: "1f3ae.png", options: ["1f3ae.png", "1f4da.png", "1f4d6.png"] },
  { place: "חנות", correct: "1f6d2.png", options: ["1f6d2.png", "1f3e0.png", "1f697.png"] },
  { place: "בית ספר", correct: "1f4d2.png", options: ["1f4d2.png", "1f3c0.png", "1f3ae.png"] },
  { place: "מגרש", correct: "26bd.png", options: ["26bd.png", "1f3c0.png", "1f3be.png"] },
  { place: "חוף ים", correct: "1f3d6.png", options: ["1f3d6.png", "1f3d4.png", "1f3de.png"] },
  { place: "משרד", correct: "1f4bb.png", options: ["1f4bb.png", "1f4d5.png", "1f4f1.png"] },
  { place: "מוסך", correct: "1f527.png", options: ["1f527.png", "1f4d5.png", "1f3ae.png"] },
  { place: "מספרה", correct: "1f488.png", options: ["1f488.png", "1f4d6.png", "1f3ae.png"] },
  { place: "מעבדה", correct: "1f52c.png", options: ["1f52c.png", "1f3ae.png", "1f3c0.png"] },
  { place: "מוזיאון", correct: "1f5bc.png", options: ["1f5bc.png", "1f3ae.png", "1f3c0.png"] },
  { place: "ספרייה", correct: "1f4da.png", options: ["1f4da.png", "1f4bb.png", "1f3ae.png"] },
  { place: "מטבח", correct: "1f373.png", options: ["1f373.png", "1f4d5.png", "1f4bb.png"] },
  { place: "מקרר", correct: "1f9ca.png", options: ["1f9ca.png", "1f525.png", "1f4a7.png"] },
  { place: "מיטה", correct: "1f6cf.png", options: ["1f6cf.png", "1f392.png", "1f45c.png"] },
  { place: "שולחן כתיבה", correct: "270f.png", options: ["270f.png", "1f3c0.png", "26bd.png"] },
  { place: "חדר ילדים", correct: "1f9f8.png", options: ["1f9f8.png", "1f4d5.png", "1f4bb.png"] },
  { place: "מקלחת", correct: "1f6bf.png", options: ["1f6bf.png", "1f4d5.png", "1f3ae.png"] },
  { place: "שירותים", correct: "1f6bd.png", options: ["1f6bd.png", "1f6c0.png", "1f4d5.png"] },
  { place: "מטבח", correct: "1f963.png", options: ["1f963.png", "1f4d5.png", "1f4da.png"] },
  { place: "מטבח", correct: "1f37c.png", options: ["1f37c.png", "1f37a.png", "1f377.png"] },
  { place: "גינה", correct: "1f331.png", options: ["1f331.png", "1f3e0.png", "1f697.png"] },
  { place: "משרד", correct: "1f4c4.png", options: ["1f4c4.png", "1f3c0.png", "26bd.png"] },
  { place: "כיתה", correct: "1f4dd.png", options: ["1f4dd.png", "1f3c0.png", "1f3ae.png"] },
  { place: "מגרש כדורסל", correct: "1f3c0.png", options: ["1f3c0.png", "1f3be.png", "26bd.png"] },
  { place: "חוף", correct: "1f3d6.png", options: ["1f3d6.png", "1f3d4.png", "1f3de.png"] },
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

/** G6 — השלמת תמונה (חצאי אימוג׳י) */
export type VisualClosureRound = { file: string; label: string };

export const VISUAL_CLOSURE_ROUNDS: VisualClosureRound[] = [
  { file: "1f436.png", label: "כלב" },
  { file: "1f431.png", label: "חתול" },
  { file: "1f430.png", label: "ארנב" },
  { file: "1f34e.png", label: "תפוח" },
  { file: "1f34c.png", label: "בננה" },
  { file: "1f353.png", label: "תות" },
  { file: "1f981.png", label: "אריה" },
  { file: "1f418.png", label: "פיל" },
  { file: "1f427.png", label: "פינגווין" },
  { file: "1f433.png", label: "לווייתן" },
  { file: "1f697.png", label: "מכונית" },
  { file: "1f68c.png", label: "אוטובוס" },
  { file: "2708.png", label: "מטוס" },
  { file: "1f6a2.png", label: "ספינה" },
  { file: "1f3e0.png", label: "בית" },
  { file: "26bd.png", label: "כדור" },
  { file: "1f3c0.png", label: "כדורסל" },
  { file: "1f4d5.png", label: "ספר" },
  { file: "1f33c.png", label: "פרח" },
  { file: "1f333.png", label: "עץ" },
  { file: "1f355.png", label: "פיצה" },
  { file: "1f366.png", label: "גלידה" },
  { file: "1f414.png", label: "תרנגולת" },
  { file: "1f985.png", label: "נשר" },
  { file: "1f984.png", label: "חד קרן" },
  { file: "1f42c.png", label: "דולפין" },
  { file: "1f41f.png", label: "דג" },
  { file: "1f980.png", label: "סרטן" },
  { file: "1f419.png", label: "תמנון" },
  { file: "1f525.png", label: "אש" },
];

/** G7 — הפכים */
export type OppositeRound = {
  prompt: string;
  correct: string;
  options: [string, string, string];
};

export const OPPOSITE_ROUNDS: OppositeRound[] = [
  { prompt: "גדול", correct: "1f41d.png", options: ["1f41d.png", "1f418.png", "1f433.png"] },
  { prompt: "קטן", correct: "1f418.png", options: ["1f418.png", "1f41d.png", "1f430.png"] },
  { prompt: "שמן", correct: "1f969.png", options: ["1f969.png", "1f969.png", "1f969.png"] },
  { prompt: "רזה", correct: "1f969.png", options: ["1f969.png", "1f969.png", "1f969.png"] },
  { prompt: "גבוה", correct: "1f3d7.png", options: ["1f3d7.png", "1fab9.png", "1f4d5.png"] },
  { prompt: "נמוך", correct: "1fab9.png", options: ["1fab9.png", "1f3d7.png", "1f4d5.png"] },
  { prompt: "חם", correct: "2744.png", options: ["2744.png", "1f525.png", "2600.png"] },
  { prompt: "קר", correct: "2600.png", options: ["2600.png", "2744.png", "1f327.png"] },
  { prompt: "יום", correct: "1f319.png", options: ["1f319.png", "2600.png", "26c5.png"] },
  { prompt: "לילה", correct: "2600.png", options: ["2600.png", "1f319.png", "2b50.png"] },
  { prompt: "מהר", correct: "1f430.png", options: ["1f430.png", "1f422.png", "1f40c.png"] },
  { prompt: "לאט", correct: "1f422.png", options: ["1f422.png", "1f430.png", "1f3c3.png"] },
  { prompt: "עבה", correct: "1f4d6.png", options: ["1f4d6.png", "1f4d2.png", "1f4d5.png"] },
  { prompt: "דק", correct: "1f4d2.png", options: ["1f4d2.png", "1f4d6.png", "1f4da.png"] },
  { prompt: "ריק", correct: "1f37d.png", options: ["1f37d.png", "1f963.png", "1f37c.png"] },
  { prompt: "מלא", correct: "1f963.png", options: ["1f963.png", "1f37d.png", "1f37c.png"] },
  { prompt: "ישן", correct: "1f476.png", options: ["1f476.png", "1f9d1.png", "1f468.png"] },
  { prompt: "חדש", correct: "1f4f1.png", options: ["1f4f1.png", "260e.png", "1f4bb.png"] },
  { prompt: "רחב", correct: "1f6d1.png", options: ["1f6d1.png", "1f697.png", "1f69a.png"] },
  { prompt: "צר", correct: "1f697.png", options: ["1f697.png", "1f69a.png", "1f68c.png"] },
  { prompt: "קשה", correct: "1faa8.png", options: ["1faa8.png", "1f9b8.png", "1f9b9.png"] },
  { prompt: "רך", correct: "1f9b8.png", options: ["1f9b8.png", "1faa8.png", "1f9b9.png"] },
  { prompt: "עבודה", correct: "1f4bb.png", options: ["1f4bb.png", "1f3c0.png", "1f3ae.png"] },
  { prompt: "מנוחה", correct: "1f6cb.png", options: ["1f6cb.png", "1f4bb.png", "1f3ae.png"] },
  { prompt: "עליון", correct: "2b06.png", options: ["2b06.png", "2b07.png", "27a1.png"] },
  { prompt: "תחתון", correct: "2b07.png", options: ["2b07.png", "2b06.png", "27a1.png"] },
  { prompt: "שמאל", correct: "2b05.png", options: ["2b05.png", "27a1.png", "2b06.png"] },
  { prompt: "ימין", correct: "27a1.png", options: ["27a1.png", "2b05.png", "2b06.png"] },
  { prompt: "פתוח", correct: "1f6aa.png", options: ["1f6aa.png", "1f512.png", "1f510.png"] },
  { prompt: "סגור", correct: "1f512.png", options: ["1f512.png", "1f6aa.png", "1f510.png"] },
];

/** Fix opposites with duplicate emojis / bad pairs */
OPPOSITE_ROUNDS[2] = { prompt: "שמן", correct: "1f42e.png", options: ["1f42e.png", "1f40d.png", "1f41f.png"] };
OPPOSITE_ROUNDS[3] = { prompt: "רזה", correct: "1f40d.png", options: ["1f40d.png", "1f42e.png", "1f418.png"] };

/** G8 — חרוזים */
export type RhymeRound = {
  anchor: string;
  correct: string;
  options: [string, string, string];
};

export const RHYME_ROUNDS: RhymeRound[] = [
  { anchor: "חץ", correct: "עץ", options: ["עץ", "בית", "דג"] },
  { anchor: "בית", correct: "קיץ", options: ["קיץ", "עץ", "דג"] },
  { anchor: "סוס", correct: "כוס", options: ["כוס", "בית", "דג"] },
  { anchor: "עט", correct: "חת", options: ["חת", "בית", "דג"] },
  { anchor: "אף", correct: "כף", options: ["כף", "עץ", "דג"] },
  { anchor: "יום", correct: "חלום", options: ["חלום", "לילה", "שמש"] },
  { anchor: "לילה", correct: "מילה", options: ["מילה", "יום", "שמש"] },
  { anchor: "עץ", correct: "חץ", options: ["חץ", "בית", "דג"] },
  { anchor: "יד", correct: "סיד", options: ["סיד", "רגל", "ראש"] },
  { anchor: "רגל", correct: "מגדל", options: ["מגדל", "יד", "עץ"] },
  { anchor: "מים", correct: "ים", options: ["ים", "אש", "אוויר"] },
  { anchor: "כלב", correct: "לב", options: ["לב", "חתול", "דג"] },
  { anchor: "צב", correct: "כב", options: ["כב", "דג", "עץ"] },
  { anchor: "כיסא", correct: "מסע", options: ["מסע", "שולחן", "חלון"] },
  { anchor: "ענן", correct: "גן", options: ["גן", "שמש", "ים"] },
  { anchor: "ים", correct: "ת׳ם", options: ["ת׳ם", "שמש", "עץ"] },
  { anchor: "שולחן", correct: "מטבח", options: ["מטבח", "כיסא", "חלון"] },
  { anchor: "חלון", correct: "כרון", options: ["כרון", "דלת", "קיר"] },
  { anchor: "דלת", correct: "בעלת", options: ["בעלת", "חלון", "קיר"] },
  { anchor: "ארנב", correct: "סב", options: ["סב", "דג", "עץ"] },
  { anchor: "מנורה", correct: "ספורה", options: ["ספורה", "שולחן", "קיר"] },
  { anchor: "חתול", correct: "גדול", options: ["גדול", "כלב", "דג"] },
  { anchor: "דג", correct: "חג", options: ["חג", "בית", "עץ"] },
  { anchor: "אש", correct: "קֶרֶש", options: ["קֶרֶש", "מים", "עץ"] },
  { anchor: "שמש", correct: "קֶרֶש", options: ["קֶרֶש", "עץ", "בית"] },
  { anchor: "בית", correct: "לילית", options: ["לילית", "ספר", "עץ"] },
  { anchor: "כובע", correct: "אבא", options: ["אבא", "אמא", "סבא"] },
  { anchor: "אריה", correct: "מלפפון", options: ["מלפפון", "בננה", "עגבנייה"] },
  { anchor: "סבא", correct: "אמא", options: ["אמא", "אבא", "דג"] },
  { anchor: "אמא", correct: "סבא", options: ["סבא", "אבא", "דג"] },
];

/** G10 — סדרות מספרים */
export type SequenceRound = {
  display: [string, string, string, string];
  answer: number;
  options: [number, number, number];
};

function buildSequenceRounds(): SequenceRound[] {
  const out: SequenceRound[] = [];
  for (let i = 0; i < 30; i++) {
    const start = 1 + (i % 4);
    const step = 1 + (i % 4);
    const seq = [start, start + step, start + 2 * step, start + 3 * step];
    const miss = 1 + (i % 2);
    const ans = seq[miss];
    let w1 = ans + 1;
    let w2 = ans - 1;
    if (w1 === ans) w1 = ans + 2;
    if (w2 === ans || w2 < 0) w2 = ans + 2;
    if (w1 === w2) w2 = w1 + 1;
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
export type PhoneticsRound = {
  letter: string;
  word: string;
  correct: string;
  options: [string, string, string];
};

export const PHONETICS_ROUNDS: PhoneticsRound[] = [
  { letter: "א", word: "אגס", correct: "1f350.png", options: ["1f350.png", "1f34e.png", "1f34c.png"] },
  { letter: "ב", word: "בננה", correct: "1f34c.png", options: ["1f34c.png", "1f34e.png", "1f353.png"] },
  { letter: "ג", word: "גזר", correct: "1f955.png", options: ["1f955.png", "1f966.png", "1f345.png"] },
  { letter: "ד", word: "דג", correct: "1f41f.png", options: ["1f41f.png", "1f419.png", "1f420.png"] },
  { letter: "ה", word: "היפופוטם", correct: "1f99b.png", options: ["1f99b.png", "1f418.png", "1f42c.png"] },
  { letter: "ו", word: "ורד", correct: "1f339.png", options: ["1f339.png", "1f33c.png", "1f33b.png"] },
  { letter: "ז", word: "זברה", correct: "1f993.png", options: ["1f993.png", "1f992.png", "1f998.png"] },
  { letter: "ח", word: "חתול", correct: "1f431.png", options: ["1f431.png", "1f436.png", "1f430.png"] },
  { letter: "ט", word: "טיגריס", correct: "1f405.png", options: ["1f405.png", "1f406.png", "1f981.png"] },
  { letter: "י", word: "ינשוף", correct: "1f989.png", options: ["1f989.png", "1f985.png", "1f426.png"] },
  { letter: "כ", word: "כבשה", correct: "1f411.png", options: ["1f411.png", "1f410.png", "1f404.png"] },
  { letter: "ל", word: "לווייתן", correct: "1f433.png", options: ["1f433.png", "1f40b.png", "1f988.png"] },
  { letter: "מ", word: "מכונית", correct: "1f697.png", options: ["1f697.png", "1f68c.png", "1f695.png"] },
  { letter: "נ", word: "נשר", correct: "1f985.png", options: ["1f985.png", "1f986.png", "1f989.png"] },
  { letter: "ס", word: "סוס", correct: "1f434.png", options: ["1f434.png", "1f40e.png", "1f402.png"] },
  { letter: "ע", word: "ענבים", correct: "1f347.png", options: ["1f347.png", "1f34e.png", "1f352.png"] },
  { letter: "פ", word: "פיל", correct: "1f418.png", options: ["1f418.png", "1f42f.png", "1f404.png"] },
  { letter: "צ", word: "צפרדע", correct: "1f438.png", options: ["1f438.png", "1f422.png", "1f40d.png"] },
  { letter: "ק", word: "קוף", correct: "1f435.png", options: ["1f435.png", "1f412.png", "1f9a7.png"] },
  { letter: "ר", word: "רדיו", correct: "1f4fb.png", options: ["1f4fb.png", "1f4fa.png", "1f399.png"] },
  { letter: "ש", word: "שמש", correct: "2600.png", options: ["2600.png", "1f319.png", "26c5.png"] },
  { letter: "ת", word: "תפוח", correct: "1f34e.png", options: ["1f34e.png", "1f34f.png", "1f350.png"] },
  { letter: "א", word: "אריה", correct: "1f981.png", options: ["1f981.png", "1f42f.png", "1f405.png"] },
  { letter: "ב", word: "ברווז", correct: "1f986.png", options: ["1f986.png", "1f427.png", "1f424.png"] },
  { letter: "ג", word: "ג׳ירפה", correct: "1f992.png", options: ["1f992.png", "1f993.png", "1f998.png"] },
  { letter: "ד", word: "דולפין", correct: "1f42c.png", options: ["1f42c.png", "1f433.png", "1f988.png"] },
  { letter: "ח", word: "חד קרן", correct: "1f984.png", options: ["1f984.png", "1f981.png", "1f434.png"] },
  { letter: "כ", word: "כריש", correct: "1f988.png", options: ["1f988.png", "1f420.png", "1f41f.png"] },
  { letter: "מ", word: "מנגו", correct: "1f96d.png", options: ["1f96d.png", "1f34e.png", "1f34c.png"] },
  { letter: "ע", word: "עוף", correct: "1f414.png", options: ["1f414.png", "1f413.png", "1f423.png"] },
  { letter: "ש", word: "שועל", correct: "1f98a.png", options: ["1f98a.png", "1f43a.png", "1f431.png"] },
];

/** G13 — זיהוי צליל (TTS בעברית) */
export type SoundIdRound = {
  speak: string;
  correct: string;
  options: [string, string, string];
};

export const SOUND_ID_ROUNDS: SoundIdRound[] = [
  { speak: "רכבת", correct: "1f682.png", options: ["1f682.png", "1f697.png", "2708.png"] },
  { speak: "מכונית", correct: "1f697.png", options: ["1f697.png", "1f68c.png", "1f6b2.png"] },
  { speak: "אוטובוס", correct: "1f68c.png", options: ["1f68c.png", "1f690.png", "1f695.png"] },
  { speak: "מטוס", correct: "2708.png", options: ["2708.png", "1f681.png", "1f6eb.png"] },
  { speak: "סירה", correct: "26f5.png", options: ["26f5.png", "1f6a2.png", "1f6a3.png"] },
  { speak: "אופניים", correct: "1f6b2.png", options: ["1f6b2.png", "1f6f5.png", "1f6b4.png"] },
  { speak: "מסוק", correct: "1f681.png", options: ["1f681.png", "2708.png", "1f6eb.png"] },
  { speak: "משאית", correct: "1f69a.png", options: ["1f69a.png", "1f697.png", "1f68c.png"] },
  { speak: "אמבולנס", correct: "1f691.png", options: ["1f691.png", "1f693.png", "1f692.png"] },
  { speak: "כלב", correct: "1f436.png", options: ["1f436.png", "1f431.png", "1f430.png"] },
  { speak: "חתול", correct: "1f431.png", options: ["1f431.png", "1f436.png", "1f984.png"] },
  { speak: "אריה", correct: "1f981.png", options: ["1f981.png", "1f42f.png", "1f405.png"] },
  { speak: "פיל", correct: "1f418.png", options: ["1f418.png", "1f42f.png", "1f404.png"] },
  { speak: "פרה", correct: "1f404.png", options: ["1f404.png", "1f411.png", "1f410.png"] },
  { speak: "סוס", correct: "1f434.png", options: ["1f434.png", "1f40e.png", "1f402.png"] },
  { speak: "כבשה", correct: "1f411.png", options: ["1f411.png", "1f410.png", "1f404.png"] },
  { speak: "עז", correct: "1f410.png", options: ["1f410.png", "1f411.png", "1f402.png"] },
  { speak: "דג", correct: "1f41f.png", options: ["1f41f.png", "1f420.png", "1f419.png"] },
  { speak: "ציפור", correct: "1f426.png", options: ["1f426.png", "1f427.png", "1f54a.png"] },
  { speak: "ברווז", correct: "1f986.png", options: ["1f986.png", "1f427.png", "1f424.png"] },
  { speak: "נשר", correct: "1f985.png", options: ["1f985.png", "1f426.png", "1f989.png"] },
  { speak: "ינשוף", correct: "1f989.png", options: ["1f989.png", "1f985.png", "1f426.png"] },
  { speak: "דוב", correct: "1f43b.png", options: ["1f43b.png", "1f43c.png", "1f428.png"] },
  { speak: "פנדה", correct: "1f43c.png", options: ["1f43c.png", "1f43b.png", "1f428.png"] },
  { speak: "קוף", correct: "1f435.png", options: ["1f435.png", "1f412.png", "1f9a7.png"] },
  { speak: "ארנב", correct: "1f430.png", options: ["1f430.png", "1f42d.png", "1f439.png"] },
  { speak: "חד קרן", correct: "1f984.png", options: ["1f984.png", "1f981.png", "1f434.png"] },
  { speak: "זברה", correct: "1f993.png", options: ["1f993.png", "1f992.png", "1f404.png"] },
  { speak: "ג׳ירפה", correct: "1f992.png", options: ["1f992.png", "1f993.png", "1f998.png"] },
  { speak: "תרנגול", correct: "1f413.png", options: ["1f413.png", "1f414.png", "1f423.png"] },
];
