// The plan make.fun will carry out in public.
// main.ts (Node 22, stdlib only): writes the 30-day plan to /output/entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const PLAN =
  "Day 1: list on Fiverr: turn a 1-hour meeting recording into a brief + action list, $25, done in 30 min. " +
  "Days 2-7: fulfil orders yourself, sell each buyer a weekly slot. " +
  "Days 8-30: price $35, add a $99/week plan for estate teams, promote with $20. " +
  "Expect $600-900 by day 30.";

const OUTPUT = "/output/entry.txt";

function validate(text: string): number {
  const chars = [...text].length;
  if (chars < 1 || chars > 280) {
    throw new Error(`plan must be 1-280 characters, got ${chars}`);
  }
  if (!text.trim()) {
    throw new Error("plan must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("plan must be a single line");
  }
  return chars;
}

function main(): void {
  const chars = validate(PLAN);
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUTPUT, PLAN, "utf8");
  // Read back and verify: the file on disk must be byte-identical to the
  // plan, so a partial write or encoding slip fails loudly instead of
  // silently submitting a broken entry.
  const onDisk = readFileSync(OUTPUT, "utf8");
  if (onDisk !== PLAN) {
    throw new Error("verification failed: /output/entry.txt differs from the plan");
  }
  if (validate(onDisk) !== chars) {
    throw new Error("verification failed: character count changed on disk");
  }
  console.log(`wrote ${OUTPUT}: ${chars} characters, verified`);
}

main();
