#!/usr/bin/env deno --allow-read

import { getCLIArg } from "args.ts";
import PasswordHelper from "password.ts";

const args = getCLIArg("count", 1);

const pwd = PasswordHelper();

for (let i = 0; i < args; i++) {
  generateAndPrint();
}

function generateAndPrint() {
  console.log(pwd.generatePassword());
}
