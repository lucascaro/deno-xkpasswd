import { args } from "deno";
import { parse } from "https://deno.land/x/flags/mod.ts";

let parsed = null;

export function getCLIArg<T>(name: string, defVal: T): T {
  const parsed = parseArgs();
  return parsed[name] ? parsed[name] : defVal;
}

function parseArgs() {
  if (parsed === null) {
    parsed = parse(args.slice(1), {
      alias: {
        c: ["count"],
        l: ["length"]
      }
    });
  }
  return parsed;
}
