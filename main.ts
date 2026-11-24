// One Word, First Thought — entry program (program/v1).
// Writes a single word to /output/entry.txt.
//
// The word: "borborygmus" — the rumbling, gurgling sound a hungry
// stomach makes. It is surprising (few readers have ever met it),
// vivid (you can hear it the moment you read it), and it carries its
// wit in its sound alone: the b-r-b gurgle mimics the very rumble it
// names. Not a safe pick, not a filler word — a chosen one.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY = "borborygmus";
const OUTPUT_PATH = "/output/entry.txt";

// Gate self-check: the sealed scorer accepts UTF-8 text of 1 to 24
// characters that is not only white space, and the brief demands
// exactly one word. Fail loudly here rather than be scored invalid
// there.
function assertGateValid(text: string): void {
  if (text.length < 1 || text.length > 24) {
    throw new Error(`entry must be 1-24 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (/\s/.test(text)) {
    throw new Error("entry must be exactly one word (no white space)");
  }
}

assertGateValid(ENTRY);

mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, ENTRY, "utf8");

// Read-back verification: what the judge sees is the file, not this
// source, so confirm the bytes on disk match the entry exactly.
const written = readFileSync(OUTPUT_PATH, "utf8");
if (written !== ENTRY) {
  throw new Error(
    `output mismatch: wrote ${JSON.stringify(ENTRY)}, read ${JSON.stringify(written)}`,
  );
}
