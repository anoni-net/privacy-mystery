// Loads a case's story data (case.js) in Node, the same file the interactive page inlines.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import vm from 'node:vm';

const EXPORTS = ['PEOPLE', 'PIC', 'SLACK', 'TEXTS', 'INTRO', 'PXL', 'EXIF_PXL', 'EXIF_PXL_NOTE', 'EXIF_SOCIAL',
  'EXIF_SOCIAL_NOTE', 'CAMERA_INFO', 'SEARCH_TIPS', 'POST_PARAS', 'FORUM_REPLIES', 'Q1', 'Q2', 'Q3', 'socialFile', 'makeSites'];

export function loadCase(caseDir, pxlSize) {
  const code = readFileSync(join(caseDir, 'case.js'), 'utf8').split('__PXL_SIZE__').join(pxlSize);
  return vm.runInNewContext(`${code}\n;({ ${EXPORTS.join(', ')} })`);
}

export const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
