import { readFileSync } from "deno";
import { random, seed } from "random.ts";

export default async function() {
  const decoder = new TextDecoder("utf-8");
  const file = readFileSync("/usr/share/dict/words");
  const words = decoder
    .decode(file)
    .split("\n")
    .filter((w) => w.length > 4);

  await seed();

  return {
    randomWord(): string {
      return words[Math.floor(random() * words.length)];
    },
    guessTime(l: number): number {
      return Math.pow(words.length, l) - words.length * l;
    },
    generatePassword(length: number): string {
      return Array(length)
        .fill("1")
        .map(this.randomWord)
        .join(" ");
    }
  };
}
