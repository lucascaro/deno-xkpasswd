import { args } from "deno";
import { parse } from "https://deno.land/x/flags/mod.ts";

export interface Aliases {
  [key: string]: string | [string];
}
export default function getArgParser(
  alias: Aliases
): <T>(name: string, defVal?: T) => T {
  let parsed = null;
  function parseArgs() {
    if (parsed === null) {
      parsed = parse(args.slice(1), {
        alias
      });
    }
    return parsed;
  }
  return function<T>(name: string, defVal?: T): T {
    const parsed = parseArgs();
    return parsed[name] ? parsed[name] : defVal;
  };
}
