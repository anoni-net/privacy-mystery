/* Night Heron's own code in the interactive page, plugged into the engine through HOOKS
   (engine/index.src.html). The story data is in case.js; this is how the page behaves:
   the leaked photo and its EXIF, the online EXIF tool trap, zooming into the photo, the
   export folder, Fog's terminal coaching and the report's answers. */
const EXPORT = '~/' + EXPORT_DIR;
const PXL_ASSET = 'PXL_20260914_144712345.jpg';
const IMAGES = {
  [PXL]: { src: 'assets/' + PXL, w: 4080, h: 3072, size: ASSET_SIZES[PXL_ASSET], full: true },
};

Object.assign(HOOKS, {
  /* ---------- in-game sites ---------- */
  siteCtx: () => ({
    upload: fn => `<button type="button" class="site-btn" data-upload="${esc(fn)}">${S.uploaded.includes(fn) ? UI.uploaded : UI.upload}</button>`,
    pxlSize: ASSET_SIZES[PXL_ASSET],
  }),
  siteClick(e) {
    const u = e.target.closest('[data-upload]'); if (u) { uploadPeek(u.dataset.upload); return true; }
    return false;
  },
  onPage(url) { if (url === 'techwiki.org/pxl') discover('fname'); },
  afterDownload(fn, kind) {
    if (kind !== 'pxl') return;
    discover('attach');
    if (S.helper && S.coach === 1) setTimeout(() => pushMsg('awu', ['ui', 'coachDownloaded']), 900);
  },

  /* ---------- images ---------- */
  imageInfo(fn) {
    if (IMAGES[fn]) return IMAGES[fn];
    const s = S.social[fn];
    if (!s) return null;
    const post = PIC[s.handle].posts.find(p => p.id === s.postId);
    return { src: `assets/social/${post.img}.jpg`, w: 1080, h: 810, size: ASSET_SIZES[`social/${post.img}.jpg`], full: false };
  },
  // Like Windows「內容 › 詳細資料」or macOS 預覽程式的檢閱器: common fields only, no time-zone offset.
  viewerInfo(fn, info, downloaded) {
    const cam = !downloaded ? '' : info.full
      ? `<h4 class="v-h">${UI.cameraInfo}</h4><dl>${CAMERA_INFO.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>`
      : `<h4 class="v-h">${UI.cameraInfo}</h4><p class="v-none">${UI.noCamera}</p>`;
    return `${cam}
  <div class="tip">${downloaded ? UI.tipDownloaded : UI.tipNotDownloaded}</div>
  <p style="font-size:12px;margin-top:10px"><a href="${info.src}" download="${esc(fn)}" style="color:var(--accent)">${UI.saveFile}</a><br><span style="color:var(--muted)">${UI.realJpeg}</span></p>`;
  },
  onViewImage(fn, info, downloaded) {
    if (downloaded && info.full) { discover('nogps'); setTimeout(() => discover('model'), 700); }
    else if (downloaded) discover('strip');
  },
  // the two details in the photo: zoomed in to at least 2×, with the spot on screen
  onViewport(fn, scale, v) {
    if (fn !== PXL || scale < 2) return;
    // the art's coordinates (viewBox 0 -21 800 602) as fractions of the image
    const inView = (px, py) => { const x = px / 800, y = (py + 21) / 602; return x > v.left && x < v.right && y > v.top && y < v.bottom; };
    if (inView(540, 478)) discover('sticker');
    if (inView(45, 470)) discover('note');
  },

  /* ---------- files ---------- */
  filesHome: EXPORT,
  dirs: () => ({
    '~': () => ['README.txt', 'Downloads/', EXPORT_DIR + '/'],
    [EXPORT]: () => EXPORT_FILES.concat('slack/'),
    [EXPORT + '/slack']: () => Object.keys(SLACK),
  }),
  fileContent(path) {
    const name = path.split('/').pop();
    if (path.startsWith(EXPORT + '/slack/') && SLACK[name] != null) return SLACK[name];
    if ((path.startsWith(EXPORT + '/') || path === '~/README.txt') && TEXTS[name] != null) return TEXTS[name];
    return null;
  },
  filesSide: () => [[EXPORT, EXPORT_DIR], [EXPORT + '/slack', UI.sideSlack]],
  fileAction: (full, n) => S.helper && /\.jpg$/.test(n) ? `<button type="button" class="f-act" data-term="exiftool" data-path="${full}">${UI.checkInTerminal}</button>` : '',

  /* ---------- terminal ---------- */
  termBuilder: ['ls', 'cd', 'cat', 'exiftool', 'grep', 'file', 'help', 'clear'],
  termArgs(cmd, files) {
    if (cmd === 'exiftool') return files.slice().sort((x, y) => /\.jpg$/.test(y) - /\.jpg$/.test(x));
    return null;
  },
  termSuggest(c) {
    if (c === '~') return SUGGEST.home;
    if (c === '~/Downloads') return DIRS[c]().filter(n => /\.jpg$/.test(n)).map(n => 'exiftool ' + n).concat(['ls', 'cd ..']);
    if (c === EXPORT) return SUGGEST.export;
    if (c === EXPORT + '/slack') return SUGGEST.slack;
    return null;
  },
  fileType(p) {
    if (!/\.jpg$/.test(p)) return null;
    return 'JPEG image data, ' + (imageInfo(p.split('/').pop()).full ? 'Exif standard: [TIFF image data, big-endian]' : 'JFIF standard 1.01');
  },
  cmds: {
    exiftool(args) {
      const files = args.filter(a => !a.startsWith('-')).flatMap(glob);
      if (!files.length) return out(`<span class="e">${UI.usageExif}</span>`);
      for (const a of files) {
        const p = resolve(a);
        if (!exists(p) || isDir(p)) { out(`<span class="e">Error: File not found - ${esc(a)}</span>`); continue; }
        exif(p);
      }
    },
  },
  // Fog's optional coaching: start when beginner help is turned on, then follow along
  onHelper(on) {
    if (on && !S.coach) {
      S.coach = 1; save();
      pushMsg('awu', ['ui', 'coachStart', S.downloads.includes(PXL)]);
    }
  },
  afterCmd(line) {
    if (!S.helper) return;
    if (S.coach < 2 && term.cwd === '~/Downloads') {
      S.coach = 2; save();
      setTimeout(() => pushMsg('awu', ['ui', 'coachInDownloads', S.downloads.includes(PXL)]), 500);
    } else if (S.coach < 3 && /^exiftool\s+PXL_/.test(line)) {
      S.coach = 3; save();
      setTimeout(() => pushMsg('awu', ['ui', 'coachAfterExif']), 1200);
    }
  },
  // interface lines that end up in the chat, so they follow a language switch
  refUI: [['coachDownloaded'], ['coachAfterExif'], ['trap', 0], ['trap', 1], ['coachStart', true], ['coachStart', false], ['coachInDownloads', true], ['coachInDownloads', false], ['yeluWrong'], ['yeluSolved']],

  /* ---------- report ---------- */
  report: [
    { opts: Q1, type: 'checkbox', need: ['model', 'tz'], deny: ['gps', 'name'] },
    { opts: Q2, type: 'checkbox', exact: ['note', 'sticker'] },
    { opts: Q3, type: 'radio', answer: 'style' },
  ],
});

// The online EXIF tool: uploading the original photo there is the case's trap
function uploadPeek(fn) {
  S.peekLast = fn;
  if (!S.uploaded.includes(fn)) S.uploaded.push(fn);
  save(); renderPage();
  if (fn !== PXL) { discover('strip'); return; }
  discover('nogps');
  setTimeout(() => discover('model'), 600);
  setTimeout(() => discover('tz'), 1200);
  if (!S.mistakes) {
    S.mistakes = 1; save();
    setTimeout(() => pushMsg('awu', ['ui', 'trap', 0]), 2400);
    setTimeout(() => pushMsg('awu', ['ui', 'trap', 1]), 4600);
  }
}

function exif(p) {
  const name = p.split('/').pop();
  const row = (k, v) => `<span class="k">${k.padEnd(isPhone() ? 24 : 32)}</span>: ${esc(v)}`;
  if (!/\.jpg$/.test(name)) {
    out([row('ExifTool Version Number', '12.76'), row('File Name', name), row('File Size', sizeOf(p)), row('File Type', 'TXT'), row('MIME Type', 'text/plain')].join('\n'));
    return;
  }
  const info = imageInfo(name);
  if (info.full) {
    out(EXIF_PXL.map(([k, v]) => row(k, v)).concat(`<span class="d">${EXIF_PXL_NOTE}</span>`).join('\n'));
    discover('nogps');
    setTimeout(() => discover('model'), 900);
    setTimeout(() => discover('tz'), 1800);
  } else {
    out(EXIF_SOCIAL(name, info.size).map(([k, v]) => row(k, v)).concat(`<span class="d">${EXIF_SOCIAL_NOTE}</span>`).join('\n'));
    discover('strip');
  }
}
