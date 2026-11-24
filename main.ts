import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

// Weirdest Job Title: one job title, 60 characters at most, nothing else.
// A real-sounding corporate title with one hilariously specific twist:
// a Senior Vice President whose whole job is untangling Christmas lights.
const TITLE = "Senior Vice President of Untangling Christmas Lights";

// Gate check (same rule the sealed scorer applies): entry.txt must be
// UTF-8 text of 1 to 60 characters, not only white space, one line.
// Count code points, not UTF-16 units, so the check matches the scorer.
const chars = [...TITLE];
if (chars.length < 1 || chars.length > 60) {
  throw new Error(`title is ${chars.length} characters, gate is 1-60`);
}
if (TITLE.trim().length === 0 || TITLE.includes("\n")) {
  throw new Error("title must be a single non-blank line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), TITLE + "\n", "utf8");
