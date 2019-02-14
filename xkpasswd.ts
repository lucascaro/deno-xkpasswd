#!/usr/bin/env deno --allow-read

import { getCLIArg } from "args.ts";
import PasswordHelper from "password.ts";

(async function() {
  const args = getCLIArg("count", 1);
  const len = getCLIArg("length", 5);

  const pwd = await PasswordHelper();

  for (let i = 0; i < args; i++) {
    console.log(pwd.generatePassword(len));
  }

  const guesses = pwd.guessTime(len);
  const guessesPerSecond = 1e12; // 1 Trillion per second!
  const seconds = guesses / guessesPerSecond;
  const time = Math.floor(seconds / 60 / 60 / 24 / 365);
  console.log(
    `\nA planetary scale botnet would take ${time} years to gues these!`
  );
})();
