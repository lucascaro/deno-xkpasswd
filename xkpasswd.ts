#!/usr/bin/env deno --allow-read
import { stripIndent } from "https://denopkg.com/lucascaro/denoversion/src/strings.ts";
import cliArgParser from "./args.ts";
import PasswordHelper from "./password.ts";

const getCLIArg = cliArgParser({
  c: ["count"],
  w: ["num-words"],
  t: ["show-time"],
  l: ["min-word-len"],
  L: ["max-word-len"],
  h: ["help"],
  f: ["words-file"]
});

const count = Number(getCLIArg("count", 1));
const len = Number(getCLIArg("num-words", 5));
const minWordLen = Number(getCLIArg("min-word-len", 4));
const maxWordLen = Number(getCLIArg("max-word-len", 10));
const wordsFile = getCLIArg("words-file", "/usr/share/dict/words");
const showTime = !!getCLIArg("show-time");
const showHelp = getCLIArg("help");

if (showHelp) {
  console.log(stripIndent`
  xkpasswd - xkcd-inspired password generator
  https://xkcd.com/936/

  Usage:
      xkpasswd [-cwtlLhf]

  Flags:
      -c, --count           Number of passwords to show. Defaults to 1.
      -w, --words           Number of words for a password. Defaults to 5.
      -t, --show-time       Display estimation of how long the passwords would take to crack. (Strictly for fun and non-scientific.)
      -l, --min-word-len    Minimum word length. Defaults to 4 characters.
      -L, --max-word-len    Maximum word length. Defaults to 10 characters.
      -h, --help            Show this help.
      -f, --words-file      Specify a dictionary file. Defaults to '/usr/share/dict/words'.
  `);
  Deno.exit();
}
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
