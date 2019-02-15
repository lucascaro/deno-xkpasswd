#!/usr/bin/env deno --allow-read --allow-write

import getArgParser from "args.ts";
import { open, stdin, stdout } from "deno";

const getCLIArg = getArgParser({
  i: "in-file",
  o: "out-file",
  l: "min-len",
  L: "max-len"
});
const IN_FILE_NAME = getCLIArg("in-file");
const OUT_FILE_NAME = getCLIArg("out-file");
const MIN_WORD_LEN = Number(getCLIArg("min-len", "4"));
const MAX_WORD_LEN = Number(getCLIArg("max-len", "10"));

(async function() {
  const decoder = new TextDecoder("utf-8");
  const inFile = IN_FILE_NAME ? await open(IN_FILE_NAME, "r") : stdin;
  const outFile = OUT_FILE_NAME ? await open(OUT_FILE_NAME, "r") : stdout;
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
    .filter((w) => w.length >= MIN_WORD_LEN && w.length <= MAX_WORD_LEN);
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
