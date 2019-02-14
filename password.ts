import { readFileSync } from "deno";
import { random, seed } from "random.ts";

export default function() {
  const decoder = new TextDecoder("utf-8");
  const file = readFileSync("/usr/share/dict/words");
  const words = decoder
    .decode(file)
    .split("\n")
    .filter((w) => w.length > 4);

  return {
    randomWord(): string {
      seed(Math.random() * Number.MAX_SAFE_INTEGER);
      return words[Math.floor(random() * words.length)];
    },
    generatePassword(length: number = 5): string {
      return Array(length)
        .fill("1")
        .map(this.randomWord)
        .join(" ");
    }
  };
}
