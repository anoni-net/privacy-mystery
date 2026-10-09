// Usage: CASE_KEY=<culprit name> node scripts/decrypt.mjs cases/01-night-heron [lang]
// Writes <case>/solution.html (or solution.<lang>.html) for editing. It is git-ignored;
// re-run encrypt.mjs with the same arguments when done.
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { requireKey, decryptB64 } from './crypt.mjs';

const [dir, lang] = process.argv.slice(2);
if (!dir) { console.error('Usage: node scripts/decrypt.mjs <case dir> [lang]'); process.exit(1); }
const suffix = lang && lang !== 'zh' ? `.${lang}` : '';
const plain = decryptB64(readFileSync(join(dir, `solution${suffix}.enc`), 'utf8'), requireKey());
if (plain == null) { console.error('Wrong key.'); process.exit(1); }
writeFileSync(join(dir, `solution${suffix}.html`), plain);
console.log(`wrote ${join(dir, `solution${suffix}.html`)} (do not commit it)`);
