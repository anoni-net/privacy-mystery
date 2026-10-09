// Solution files are XORed with a SHA-256 keystream derived from the culprit's name.
// This guards against accidental spoilers, not determined readers: with six suspects
// anyone can try every name. The game page decrypts with the same scheme (tryDecrypt).
import { createHash } from 'node:crypto';

export const MAGIC = 'YELU:';

export function xor(buf, key) {
  const out = Buffer.alloc(buf.length);
  for (let i = 0; i < buf.length; i += 32) {
    const block = createHash('sha256').update(key + '#' + (i / 32)).digest();
    for (let j = 0; j < 32 && i + j < buf.length; j++) out[i + j] = buf[i + j] ^ block[j];
  }
  return out;
}

export function requireKey() {
  const key = (process.env.CASE_KEY || '').trim();
  if (!key) {
    console.error('Set CASE_KEY to the culprit\'s full name (solve the case first).');
    process.exit(1);
  }
  return key;
}

export function decryptB64(b64, key) {
  const plain = xor(Buffer.from(b64.trim(), 'base64'), key).toString('utf8');
  return plain.startsWith(MAGIC) ? plain.slice(MAGIC.length) : null;
}
