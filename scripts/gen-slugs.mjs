// Reads src/data/slugs.txt and writes the typed module used by the app.
import fs from "node:fs";

const slugs = fs
  .readFileSync(new URL("../src/data/slugs.txt", import.meta.url), "utf8")
  .split("\n")
  .map((line) => line.trim())
  .filter(Boolean);

const out = `// AUTO-GENERATED from src/data/slugs.txt — do not edit by hand.
// Regenerate with: node scripts/gen-slugs.mjs
export const RAW_SLUGS: string[] = [
${slugs.map((s) => `  ${JSON.stringify(s)},`).join("\n")}
];
`;

fs.writeFileSync(new URL("../src/data/rawSlugs.ts", import.meta.url), out);
console.log(`Wrote ${slugs.length} slugs`);
