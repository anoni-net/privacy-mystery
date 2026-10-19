// Loads a case's story data (case.js, or case.<lang>.js) in Node, the same file the interactive
// page inlines. names: the top-level constants and functions to read from it. replace: tokens
// the file holds in place of values only the build knows (e.g. { __PXL_SIZE__: '2.1 MB' }).
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import vm from 'node:vm';

export function loadCase(caseDir, lang, names, replace = {}) {
  const file = lang === 'zh' ? 'case.js' : `case.${lang}.js`;
  let code = readFileSync(join(caseDir, file), 'utf8');
  for (const [token, value] of Object.entries(replace)) code = code.split(token).join(value);
  return vm.runInNewContext(`${code}\n;({ ${names.join(', ')} })`);
}

export const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
