import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const s = fs.readFileSync(path.join(__dirname, "../lib/game-data.ts"), "utf8");
const block = s.split("export const WORD_ROUNDS")[1].split("export const CATEGORY_ROUNDS")[0];
const re =
  /\{\s*word:\s*"([^"]+)"\s*,\s*correct:\s*"([^"]+)"\s*,\s*options:\s*\[([^\]]+)\]/g;
const rounds = [];
let mm;
while ((mm = re.exec(block)) !== null) {
  const opts = mm[3].split(",").map((x) => x.trim().replace(/^"|"$/g, ""));
  rounds.push({
    word: mm[1],
    correct: mm[2],
    options: opts,
    sig: `${mm[1]}|${mm[2]}|${[...opts].sort().join(",")}`,
  });
}

const byWord = new Map();
for (const r of rounds) {
  if (!byWord.has(r.word)) byWord.set(r.word, []);
  byWord.get(r.word).push(r);
}

const dupWords = [...byWord.entries()].filter(([, arr]) => arr.length > 1);
const bySig = new Map();
for (const r of rounds) {
  bySig.set(r.sig, (bySig.get(r.sig) || 0) + 1);
}
const dupSigs = [...bySig.entries()].filter(([, n]) => n > 1);

console.log("Total rounds:", rounds.length);
console.log("Duplicate Hebrew words (same word string >1):", dupWords.length);
for (const [w, arr] of dupWords) {
  console.log(`  "${w}" ×${arr.length}`);
}
console.log("Exact duplicate rows (same word+correct+option multiset):", dupSigs.length);
for (const [sig, n] of dupSigs) {
  console.log(`  ×${n} ${sig}`);
}

let badUnique = 0;
for (const r of rounds) {
  const set = new Set(r.options);
  if (set.size !== 3) {
    badUnique++;
    console.log("NOT 3 UNIQUE OPTIONS:", r.word, r.options);
  }
  if (!r.options.includes(r.correct)) {
    console.log("CORRECT NOT IN OPTIONS:", r.word);
  }
}
console.log("Rounds without 3 unique options:", badUnique);
