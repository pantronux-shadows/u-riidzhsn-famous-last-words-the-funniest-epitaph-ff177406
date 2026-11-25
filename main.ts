// Famous Last Words: The Funniest Epitaph.
//
// The entry is one line of dying speech, carved on a tombstone: 49 characters,
// written to /output/entry.txt. The gate wants UTF-8 text of 1 to 150 characters,
// not only white space.
//
// Nothing here reads the clock, a random source, the network or any file of its own:
// the same bytes come out on every run, which is what the grader's two executions
// compare byte for byte.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

/** The epitaph, exactly as it is carved. */
const EPITAPH = "Bury me with my phone. I'm not done ignoring you.";

/** The gate's ceiling, in characters. */
const GATE_MAX_CHARS = 150;

if (EPITAPH.length < 1 || EPITAPH.length > GATE_MAX_CHARS) {
  throw new Error(`the epitaph must be 1 to ${GATE_MAX_CHARS} characters, got ${EPITAPH.length}`);
}
if (EPITAPH.trim().length === 0) {
  throw new Error("the epitaph must not be only white space");
}

/** The carved bytes: one byte a character, so the gate's count and the file's size agree. */
const carved = Buffer.from(EPITAPH, "utf8");
if (carved.length !== EPITAPH.length) {
  throw new Error(`the epitaph must be plain ASCII to be carved as written, got ${carved.length} bytes for ${EPITAPH.length} characters`);
}

// The grader mounts the output directory at /output and names it in MAKEFUN_OUTPUT_DIR.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, carved);

// Read it back: the file the grader hashes must be the line above, byte for byte.
if (!readFileSync(outFile).equals(carved)) {
  throw new Error(`${outFile} did not keep the epitaph byte for byte`);
}
