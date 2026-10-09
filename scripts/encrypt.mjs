// Usage: CASE_KEY=<culprit name> node scripts/encrypt.mjs cases/01-night-heron [lang]
// Reads <case>/solution.html (or solution.<lang>.html; never committed) and writes
// <case>/solution.enc (or solution.<lang>.enc). Every language uses the same key.
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { MAGIC, xor, requireKey, decryptB64 } from './crypt.mjs';

const [dir, lang] = process.argv.slice(2);
if (!dir) { console.error('Usage: node scripts/encrypt.mjs <case dir> [lang]'); process.exit(1); }
const suffix = lang && lang !== 'zh' ? `.${lang}` : '';
const key = requireKey();
const plain = readFileSync(join(dir, `solution${suffix}.html`), 'utf8');
const b64 = xor(Buffer.from(MAGIC + plain, 'utf8'), key).toString('base64');
if (decryptB64(b64, key) !== plain) throw new Error('round trip failed');
writeFileSync(join(dir, `solution${suffix}.enc`), b64 + '\n');
console.log(`wrote ${join(dir, `solution${suffix}.enc`)}`);
