// Cifra la chiave AssemblyAI con una password, per incollare il risultato in index.html (ENCRYPTED_KEY).
// Uso: node tools/encrypt-key.mjs "<chiave-assemblyai>" "<password>"
import { webcrypto as crypto } from "node:crypto";

const [apiKey, password] = process.argv.slice(2);
if (!apiKey || !password) {
  console.error('Uso: node tools/encrypt-key.mjs "<chiave>" "<password>"');
  process.exit(1);
}
const ITER = 600000;
const enc = new TextEncoder();
const salt = crypto.getRandomValues(new Uint8Array(16));
const iv = crypto.getRandomValues(new Uint8Array(12));
const base = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveKey"]);
const key = await crypto.subtle.deriveKey(
  { name: "PBKDF2", salt, iterations: ITER, hash: "SHA-256" },
  base, { name: "AES-GCM", length: 256 }, false, ["encrypt"]
);
const ct = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, enc.encode(apiKey)));
const b64 = u => Buffer.from(u).toString("base64");
console.log(JSON.stringify({ v: 1, iter: ITER, salt: b64(salt), iv: b64(iv), ct: b64(ct) }));
