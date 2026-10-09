// Usage: CASE_KEY=<culprit name> node scripts/decrypt.mjs cases/01-night-heron
// Writes <case>/solution.html for editing. It is git-ignored; re-run encrypt.mjs when done.
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { requireKey, decryptB64 } from './crypt.mjs';

const dir = process.argv[2];
if (!dir) { console.error('Usage: node scripts/decrypt.mjs <case dir>'); process.exit(1); }
const plain = decryptB64(readFileSync(join(dir, 'solution.enc'), 'utf8'), requireKey());
if (plain == null) { console.error('Wrong key.'); process.exit(1); }
writeFileSync(join(dir, 'solution.html'), plain);
console.log(`wrote ${join(dir, 'solution.html')} (do not commit it)`);
