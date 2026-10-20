/* Blue Magpie's own code in the interactive page, plugged into the engine through HOOKS
   (engine/index.src.html). The story data is in case.js; this is how the page behaves: the
   lookalike sites and their trap, the tools at tools.mistport.org, whois and dig in the
   terminal, the files 芷寧 and BeatBird send, and the report's answers. */
const HOME_CLIENT = '~/' + CLIENT_DIR;
const HOME_BB = '~/' + BB_DIR;
const FAKE_DOMAINS = FAKE_HOSTS.map(h => toAscii(regDomain(h)));
const isFake = host => FAKE_DOMAINS.includes(toAscii(regDomain(host.replace(/^https?:\/\//, '').split('/')[0].toLowerCase())));
const IMAGES = {
  [FILES_CLIENT.devices]: { src: 'assets/' + DEVICES_IMG, w: 1080, h: 1920, size: ASSET_SIZES[DEVICES_IMG], where: HOME_CLIENT },
  [QR_FILE]: { src: 'assets/qr-link.png', w: 344, h: 344, size: ASSET_SIZES['qr-link.png'] },
};
const CLIENT_TEXT = { [FILES_CLIENT.scam]: MAIL_SCAM, [FILES_CLIENT.real]: MAIL_REAL, [FILES_CLIENT.chat]: CHAT_LOG, [FILES_CLIENT.aliases]: ALIASES };
const BB_TEXT = { [FILES_BB.readme]: BB_README, [FILES_BB.provided]: BB_PROVIDED, [FILES_BB.downloads]: BB_DOWNLOADS, [FILES_BB.canaries]: BB_CANARIES, [FILES_BB.inbox]: BB_INBOX };
const gotBB = () => !!S.got.bb1;

Object.assign(HOOKS, {
  /* ---------- in-game sites ---------- */
  siteCtx: () => ({
    // a form this case handles itself (HOOKS.siteSubmit)
    action: (name, v, cls, placeholder, button) => `<form class="${cls}" data-action="${name}"><input value="${esc(v)}" aria-label="${placeholder}" placeholder="${placeholder}" autocomplete="off" spellcheck="false"><button type="submit">${button}</button></form>`,
    history: () => br.hist.slice(0, br.i + 1),
    qrPick: fn => `<button type="button" class="site-btn" data-qr="${esc(fn)}">${UI.qrRead}</button>`,
  }),
  siteClick(e) {
    const u = e.target.closest('[data-tool-url]');
    if (u) { checkUrl(u.dataset.toolUrl); return true; }
    const q = e.target.closest('[data-qr]');
    if (q) { S.flags.qrIn = q.dataset.qr; save(); renderPage(); if (q.dataset.qr === QR_FILE) discover('qr'); return true; }
    return false;
  },
  siteSubmit(form) {
    const v = ($('input', form) || {}).value || '';
    if (form.dataset.action === 'url') checkUrl(v.trim());
    else if (form.dataset.action === 'text') { S.flags.textIn = v; save(); renderPage(); if (/[Ѐ-ӿ]/.test(v)) discover('ad'); }
    else if (form.dataset.action === 'cancel') submitCancel();
  },
  onPage(url) {
    if (url === 'wuming.forum/t/90417') discover('join');
    const m = url.match(/^whois\.mist\/\?q=(.+)$/);
    if (m && isFake(decodeURIComponent(m[1]))) discover('newdomain');
  },

  /* ---------- files ---------- */
  filesHome: HOME_CLIENT,
  dirs: () => ({
    '~': () => ['Downloads/', CLIENT_DIR + '/'].concat(gotBB() ? [BB_DIR + '/'] : []),
    [HOME_CLIENT]: () => Object.values(FILES_CLIENT),
    [HOME_BB]: () => gotBB() ? Object.values(FILES_BB) : [],
  }),
  fileContent(path) {
    const name = path.split('/').pop();
    if (path.startsWith(HOME_CLIENT + '/')) return CLIENT_TEXT[name] != null ? CLIENT_TEXT[name] : null;
    if (path.startsWith(HOME_BB + '/') && gotBB()) return BB_TEXT[name] != null ? BB_TEXT[name] : null;
    return null;
  },
  filesSide: () => [[HOME_CLIENT, CLIENT_DIR]].concat(gotBB() ? [[HOME_BB, BB_DIR]] : []),
  onOpenDoc(path) {
    const name = path.split('/').pop();
    if (name === FILES_CLIENT.aliases) discover('alias');
    if (name === FILES_BB.inbox) discover('canary');
  },
  onMail(name, view) {
    if (name === FILES_CLIENT.scam) { discover('nolink'); if (view === 'raw') discover('sender'); }
  },
  onFile(node) { if (node === 'bb1') { filesTrail = []; if (W.files) renderFiles(); } },

  /* ---------- images ---------- */
  imageInfo: fn => IMAGES[fn] || null,
  onViewImage(fn) { if (fn === FILES_CLIENT.devices) discover('device'); },

  /* ---------- terminal ---------- */
  termBuilder: ['ls', 'cd', 'cat', 'grep', 'file', 'whois', 'dig', 'help', 'clear'],
  termArgs(cmd) {
    if (cmd === 'whois') return ['beatbird.app', 'member-care.com', 'beatbird-help.app', 'xn--batbird-7gg.app', 'kq3fz.idv.tw', 'maskmail.tw'];
    if (cmd === 'dig') return ['kq3fz.idv.tw', 'beatbird.app', '_dmarc.beatbird.app'];
    return null;
  },
  termSuggest(c) {
    if (c === '~') return SUGGEST.home;
    if (c === HOME_CLIENT) return SUGGEST.client;
    if (c === HOME_BB) return SUGGEST.bb;
    return SUGGEST.net.concat(['cd ~']);
  },
  cmds: {
    whois(args) {
      const q = args.filter(a => !a.startsWith('-'))[0];
      if (!q) return out(`<span class="e">${UI.usageWhois}</span>`);
      const key = toAscii(regDomain(q.replace(/^https?:\/\//, '').split('/')[0].toLowerCase()));
      const rec = WHOIS[key];
      if (!rec) return out(`<span class="d">No match for "${esc(key.toUpperCase())}".</span>`);
      out(rec.map(([k, v]) => `<span class="k">${k.padEnd(24)}</span>: ${esc(v)}`).join('\n'));
      if (FAKE_DOMAINS.includes(key)) discover('newdomain');
    },
    dig(args) {
      const rest = args.filter(a => !a.startsWith('-') && !/^(txt|TXT|a|A|mx|MX)$/.test(a));
      if (!rest[0]) return out(`<span class="e">${UI.usageDig}</span>`);
      const name = rest[0].toLowerCase().replace(/\.$/, '');
      const recs = DNS_TXT[name];
      out(`;; QUESTION SECTION:\n;${esc(name)}.\t\tIN\tTXT\n\n;; ANSWER SECTION:\n` + (recs ? recs.map(r => `${esc(name)}.\t300\tIN\tTXT\t<span class="a">${esc(r)}</span>`).join('\n') : `<span class="d">${UI.digNone}</span>`));
    },
  },
  /* ---------- the conversations during play ---------- */
  effect(name) { if (name === 'removeDevice') { S.flags.deviceRemoved = Date.now(); save(); } },
  refUI: [['trap', 0], ['trap', 1]],

  /* ---------- report ---------- */
  report: [
    { opts: Q1, type: 'checkbox', exact: ['nolink', 'urgent', 'realdata'] },
    { opts: Q2, type: 'radio', answer: 'link' },
    { opts: Q3, type: 'checkbox', exact: ['f02', 'f03'] },
  ],
});

// tools.mistport.org/url: show the registrable domain; a lookalike counts as the ad clue
function checkUrl(v) {
  if (!v) return;
  S.flags.urlIn = v; save(); renderPage();
  if (isFake(v)) discover('ad');
}
// The fake member centre's cancel form: sending it is the case's trap
function submitCancel() {
  S.flags.cancelSent = Date.now();
  save(); renderPage();
  if (!S.mistakes) {
    S.mistakes = 1; save();
    setTimeout(() => pushMsg('awu', ['ui', 'trap', 0]), 1400);
    setTimeout(() => pushMsg('awu', ['ui', 'trap', 1]), 3600);
  }
}
