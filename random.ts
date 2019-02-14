import { open } from "deno";

let m_w = 123456789;
let m_z = 987654321;
let mask = 0xffffffff;

async function randomSeed() {
  const urandom = await open("/dev/urandom", "r");
  const randomSeed = new Uint8Array(20);
  let i = 0;
  await urandom.read(randomSeed);
  i = randomSeed.reduce((p, c) => p * 5 + c, 0);
  console.log(`Random seed: ${i}`);
  urandom.close();
  return i;
}
export async function seed() {
  const i = await randomSeed();
  m_w = (123456789 + i) & mask;
  m_z = (987654321 - i) & mask;
}

// Returns number between 0 (inclusive) and 1.0 (exclusive),
// just like Math.random().
export function random() {
  m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask;
  m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask;
  let result = ((m_z << 16) + (m_w & 65535)) >>> 0;
  result /= 4294967296;
  return result;
}
