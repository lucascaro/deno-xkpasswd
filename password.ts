const { readFileSync } = Deno;

export default function(
  wordsFile: string,
  minWordLen: number,
  maxWordLen: number
) {
  const decoder = new TextDecoder("utf-8");
  const plainText = decoder.decode(readFileSync(wordsFile));
  const allWords = wordsFile.endsWith(".json")
    ? JSON.parse(plainText)
    : plainText.split("\n");
  const words = allWords.filter(
    (w) => w.length >= minWordLen && w.length <= maxWordLen
  );

  return {
    randomWord(): string {
      const rnd = (Math.random() * words.length) >>> 0;
      return words[rnd];
    },
    guessTime(l: number): number {
      const guesses = Math.pow(words.length, l) - words.length * l;
      const guessesPerSecond = 1e12; // 1 Trillion per second!
      const seconds = guesses / guessesPerSecond;
      return seconds;
    },
    generatePassword(length: number): string {
      return Array(length)
        .fill("1")
        .map(() => this.randomWord())
        .join(" ");
    }
  };
}
