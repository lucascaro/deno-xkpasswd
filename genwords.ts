#!/usr/bin/env deno --allow-read --allow-write

import getArgParser from "./args.ts";
const { open, stdin, stdout } = Deno;

const getCLIArg = getArgParser({
  i: "in-file",
  o: "out-file",
  l: "min-len",
  L: "max-len"
});
const IN_FILE_NAME = String(getCLIArg("in-file", ""));
const OUT_FILE_NAME = String(getCLIArg("out-file", ""));
const MIN_WORD_LEN = Number(getCLIArg("min-len", "4"));
const MAX_WORD_LEN = Number(getCLIArg("max-len", "10"));

async function openFile(
  name: string,
  mode: Deno.OpenMode,
  fallback: Deno.File
): Promise<Deno.File> {
  return name !== "" ? await open(IN_FILE_NAME, mode) : fallback;
}

(async function() {
  const decoder = new TextDecoder("utf-8");
  const inFile = await openFile(IN_FILE_NAME, "r", stdin);
  const outFile = await openFile(OUT_FILE_NAME, "w", stdout);

  let text = "";

  const buffer = new Uint8Array(10);

  while (true) {
    const { eof, nread } = await inFile.read(buffer);
    if (eof) {
      break;
    }
    text += decoder.decode(buffer);
  }
  const words = text
    .split("\n")
    .filter(w => w.length >= MIN_WORD_LEN && w.length <= MAX_WORD_LEN)
    .map(w => w.replace(/\0+/g, "").trim());

  const encoder = new TextEncoder();
  const encoded = encoder.encode(JSON.stringify(words));
  await outFile.write(encoded);
  // console.log(words);
  // const words = decoder
  //   .decode(file)
  //   .split("\n")
  //   .filter((w) => w.length > 4);

  // const encoder = new TextEncoder();
  // const encoded = encoder.encode(
  //   JSON.stringify(words.filter((w) => w.length > 4))
  // );
  // writeFileSync("./english-words.json", encoded);
  // const decoder = new TextDecoder("utf-8");
  // const words = decoder
  //   .decode(file)
  //   .split("\n")
})();
