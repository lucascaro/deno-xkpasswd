#!/usr/bin/env deno --allow-read

import cliArgParser from "args.ts";
import PasswordHelper from "password.ts";

const getCLIArg = cliArgParser({
  c: ["count"],
  w: ["num-words"],
  t: ["show-time"],
  l: ["min-word-len"],
  L: ["max-word-len"],
  f: ["words-file"]
});

const count = Number(getCLIArg("count", 1));
const len = Number(getCLIArg("numWords", 5));
const minWordLen = Number(getCLIArg("min-word-len", 4));
const maxWordLen = Number(getCLIArg("max-word-len", 10));
const wordsFile = getCLIArg("words-file", "/usr/share/dict/words");
const showTime = !!getCLIArg("show-time");

const pwd = PasswordHelper(wordsFile, minWordLen, maxWordLen);

for (let i = 0; i < count; i++) {
  console.log(pwd.generatePassword(len));
}

if (showTime) {
  const seconds = pwd.guessTime(len);
  const time = Math.floor(seconds / 60 / 60 / 24 / 365);
  console.log(
    `\nA planetary scale botnet would take ${time} years to gues these!`
  );
}
