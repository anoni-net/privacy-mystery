// Blue Magpie's static edition: plain HTML and CSS, no JavaScript and no SVG, for Tor Browser's
// "Safest" security level. Generated from the same case data as the interactive page, in each
// language the case has, with the shared kit (scripts/static-kit.mjs).
// Without JavaScript nothing remembers what the player did, so everything the interactive page
// unlocks along the way is here from the start: BeatBird's records, and Chih-ning's follow-up
// conversation (linked from the Images page).
import { loadCase } from '../../../scripts/case-data.mjs';
import { staticKit, BASE, esc } from '../../../scripts/static-kit.mjs';
import { T as STORY } from './text.mjs';

// What this file reads from case.js
const EXPORTS = ['PEOPLE', 'COLOR', 'INITIAL', 'INTRO', 'DIALOGS', 'AWU_BASE', 'BOOKMARKS', 'CLIENT_DIR', 'BB_DIR', 'FILES_CLIENT', 'FILES_BB',
  'QR_FILE', 'DEVICES_IMG', 'MAIL_SCAM', 'MAIL_REAL', 'CHAT_LOG', 'ALIASES', 'BB_README', 'BB_PROVIDED', 'BB_DOWNLOADS', 'BB_CANARIES', 'BB_INBOX',
  'WHOIS', 'DNS_TXT', 'FAKE_HOSTS', 'SEARCH_TIPS', 'HINTS', 'SOL_PREFIX', 'Q1', 'Q2', 'Q3', 'regDomain', 'toAscii', 'makeSites'];
// Download names for the files (ASCII, so every server serves them)
const RAW = { scam: 'billing-notice.eml', real: 'newsletter_1130.eml', chat: 'chat-with-che.txt', aliases: 'aliases.csv',
  readme: 'tang-note.txt', provided: 'provided.csv', downloads: 'downloads.csv', canaries: 'canaries.csv', inbox: 'canary-inbox.txt' };

// An email's main headers and its plain-text part
export function parseMail(raw) {
  const [head, ...rest] = raw.split('\n\n');
  const headers = {};
  head.replace(/\n\s+/g, ' ').split('\n').forEach(l => { const m = l.match(/^([\w-]+):\s*(.*)$/); if (m) headers[m[1].toLowerCase()] = m[2]; });
  let text = rest.join('\n\n');
  const boundary = (headers['content-type'] || '').match(/boundary="([^"]+)"/);
  if (boundary) {
    const part = text.split('--' + boundary[1]).find(p => /Content-Type: text\/plain/i.test(p)) || '';
    text = part.replace(/^\s*Content-Type:[^\n]*\n/i, '');
  }
  return { headers, text: text.trim() };
}

export function buildStatic({ caseDir, sitesCss, out, solution, lang = 'zh', langs = [lang] }) {
  const C = loadCase(caseDir, lang, EXPORTS);
  const L = Object.assign({}, BASE[lang], STORY[lang].static, { hintList: C.HINTS });
  const NAV = ['desk.html', 'chat.html', 'web/search.html', 'files/index.html', 'images.html', 'terminal.html', 'notes.html', 'hints.html', 'report.html'].map((h, i) => [h, L.nav[i]]);
  const K = staticKit({ caseDir, out, lang, langs, L, nav: NAV });
  const { put, doc } = K;
  const HOME_CLIENT = '~/' + C.CLIENT_DIR, HOME_BB = '~/' + C.BB_DIR;

  K.cover();
  K.intro({ nodes: C.INTRO, who: L.client, tm: count => '21:' + String(3 + Math.floor(count * 0.6)).padStart(2, '0') });
  // Chih-ning's follow-up, once the stranger's device is found: one page per path, back to the desk
  K.conversation({ nodes: C.DIALOGS, start: 'dev1', dir: 'reply', who: L.client, tm: count => '21:' + String(40 + count).padStart(2, '0'),
    ending: { log: [], actions: `<a class="reply primary" href="../desk.html">${L.backToDesk}</a>` } });

  /* ---------- workstation ---------- */
  K.desk(['chat.html', 'web/search.html', 'files/index.html', 'images.html', 'terminal.html', 'notes.html', 'hints.html', 'report.html']);
  const bb1 = C.DIALOGS.bb1, bb2 = C.DIALOGS.bb2;
  K.chatLog({
    msgs: C.AWU_BASE.filter(m => !m.sys)
      .concat(bb1.msgs.map(text => ({ tm: '21:36', text })), [{ file: bb1.file.name, meta: bb1.file.meta }], bb2.msgs.map(text => ({ tm: '21:37', text }))),
    extra: `\n<p><a href="reply/start.html#reply">${L.followUp}</a></p>`,
  });

  /* ---------- in-game websites (crawled from the shared site pages) ---------- */
  const domains = Object.keys(C.WHOIS).map(d => d === 'xn--batbird-7gg.app' ? 'bеatbird.app' : d);
  const lists = {
    'mist.search/?q=': C.SEARCH_TIPS.concat(L.extraQueries),
    'whois.mist/?q=': domains,
    'leaked.mist/?q=': ['zhining.chou@mistmail.tw', 'bb.tidal-fern@maskmail.tw'],
    'gcis.mist/?q=': ['53018827', '87654321'],
  };
  const toolInputs = {
    url: C.FAKE_HOSTS.concat(['beatbird.app']),
    text: ['bеatbird.app/member', 'beatbird.app/notice'],
  };
  const param = (url, k) => decodeURIComponent((url.split('?')[1] || '').split('&').map(p => p.split('=')).filter(([n]) => n === k).map(([, v]) => v)[0] || '');
  let linkTo;
  K.sites({
    // The fake member centre's cancel form submits to a page of its own (the trap) instead of a script
    makeSites: ctx => {
      const s = C.makeSites(ctx);
      return { route: url => s.route(url).replace('<form class="fk-form" data-action="cancel">', () => `<form class="fk-form" action="${linkTo(url.split('?')[0].replace(/\/$/, '') + '?sent=1')}" method="get">`) };
    },
    bookmarks: C.BOOKMARKS,
    ctx: ({ link, state }) => {
      linkTo = link;
      return {
        form: K.staticForm(link, base => lists[base] || []),
        // the tools' own forms: the inputs to pick from, as links
        action: (name, v, cls, placeholder) => {
          const base = name === 'url' ? 'tools.mistport.org/url?u=' : 'tools.mistport.org/invisible?t=';
          return `<div class="${cls} static-box"><span class="sq">${esc(v || placeholder)}</span></div><p class="static-tips">${L.staticPick}${(toolInputs[name] || []).map(q => `<a href="${link(base + encodeURIComponent(q))}">${esc(q)}</a>`).join(L.sep)}</p>`;
        },
        history: () => [],
        qrPick: fn => `<a class="site-btn" href="${link('tools.mistport.org/qr?f=' + encodeURIComponent(fn))}">${L.qrRead}</a>`,
        dl: (fn, kind, attrs, cls, path) => `<a class="${cls}" href="../../assets/${path}" download="${esc(fn)}">${L.saveImage}</a>`,
        state: () => ({
          downloads: [C.QR_FILE],
          flags: { cancelSent: param(state.current, 'sent'), urlIn: param(state.current, 'u'), textIn: param(state.current, 't'), qrIn: param(state.current, 'f') },
        }),
      };
    },
    after: url => /\/cancel\?sent=1$/.test(url) ? `<div class="awu-note"><b>${L.trapTitle}</b>${L.trap.map(p => `<p>${p}</p>`).join('')}</div>` : '',
  });

  /* ---------- files ---------- */
  const mailHTML = raw => {
    const { headers: h, text } = parseMail(raw);
    return `<div class="mail"><h2>${esc(h.subject)}</h2><dl class="kv">${[['from', L.mailFrom], ['reply-to', L.mailReplyTo], ['to', L.mailTo], ['date', L.mailDate]].filter(([k]) => h[k]).map(([k, t]) => `<dt>${t}</dt><dd>${esc(h[k])}</dd>`).join('')}</dl><pre class="txt mail-body">${esc(text)}</pre></div>
<details class="raw"><summary>${L.showRaw}</summary><pre class="txt">${esc(raw)}</pre></details><p class="note">${L.mailNote}</p>`;
  };
  const clientFiles = [['scam', C.MAIL_SCAM], ['real', C.MAIL_REAL], ['chat', C.CHAT_LOG], ['aliases', C.ALIASES]].map(([k, text]) => [C.FILES_CLIENT[k], RAW[k], text]);
  const bbFiles = [['readme', C.BB_README], ['provided', C.BB_PROVIDED], ['downloads', C.BB_DOWNLOADS], ['canaries', C.BB_CANARIES], ['inbox', C.BB_INBOX]].map(([k, text]) => [C.FILES_BB[k], RAW[k], text]);
  put('files/index.html', doc({ title: L.files, up: '../', here: 'files/index.html', body: `<h1>${L.files}</h1>
<p class="lead">${L.filesLead}</p>
<h2>${esc(HOME_CLIENT)}</h2>
${K.fileTable(clientFiles)}
<p>${esc(C.FILES_CLIENT.devices)}：<a href="../images.html#devices">${L.images}</a></p>
<h2>${esc(HOME_BB)}</h2>
<p class="note">${L.bbNote}</p>
${K.fileTable(bbFiles)}
<h2>~/Downloads</h2>
<p>${L.downloadsNote}</p>` }));
  clientFiles.forEach(([name, raw, text]) => K.filePage({ name, raw, text, crumb: HOME_CLIENT, html: /\.eml$/.test(name) ? mailHTML(text) : K.render(name, text) }));
  bbFiles.forEach(([name, raw, text]) => K.filePage({ name, raw, text, crumb: HOME_BB, html: K.render(name, text) }));

  /* ---------- images ---------- */
  put('images.html', doc({ title: L.images, up: '', here: 'images.html', body: `<h1>${L.images}</h1>
<p class="lead">${L.imagesLead}</p>
<section id="devices"><h2>${esc(C.FILES_CLIENT.devices)}</h2>
<a class="photo shot" href="../assets/${C.DEVICES_IMG}"><img src="../assets/${C.DEVICES_IMG}" alt="${L.devicesAlt}"></a>
<p class="note">${esc(HOME_CLIENT)}</p>
<p><a class="go" href="reply/start.html#reply">${L.followUp}</a></p></section>
<section id="qr"><h2>${esc(C.QR_FILE)}</h2>
<img class="qr" src="../assets/qr-link.png" alt="${L.qrAlt}" width="172" height="172">
<p>${L.qrNote}</p></section>` }));

  /* ---------- terminal transcript ---------- */
  const whois = d => { const rec = C.WHOIS[C.toAscii(C.regDomain(d))]; return rec.map(([k, v]) => `${k.padEnd(24)}: ${v}`).join('\n'); };
  const dig = name => `;; QUESTION SECTION:\n;${name}.\t\tIN\tTXT\n\n;; ANSWER SECTION:\n` + (C.DNS_TXT[name] ? C.DNS_TXT[name].map(r => `${name}.\t300\tIN\tTXT\t${r}`).join('\n') : L.digNone);
  const grep = (files, re) => files.flatMap(([n, , t]) => t.split('\n').filter(l => re.test(l)).map(l => `${n}:${l}`)).join('\n');
  const emls = clientFiles.filter(([n]) => /\.eml$/.test(n)), csvs = bbFiles.filter(([n]) => /\.csv$/.test(n));
  K.terminal([
    [HOME_CLIENT, 'grep -i authentication *.eml', grep(emls, /authentication/i)],
    [HOME_CLIENT, 'grep ^From: *.eml', grep(emls, /^From:/)],
    ...['beatbird.app', 'member-care.com', 'beatbird-help.app', 'xn--batbird-7gg.app', 'kq3fz.idv.tw'].map(d => ['~', `whois ${d}`, whois(d)]),
    ...['kq3fz.idv.tw', 'beatbird.app', '_dmarc.beatbird.app'].map(n => ['~', `dig txt ${n}`, dig(n)]),
    [HOME_BB, 'grep avg_sleep_30d *.csv', grep(csvs, /avg_sleep_30d/)],
    [HOME_BB, 'grep C-05 *.csv', grep(csvs, /C-05/)],
  ]);

  /* ---------- notes, hints, report ---------- */
  K.notes(C.PEOPLE);
  K.hints();
  K.report({ qs: [C.Q1, C.Q2, C.Q3], people: C.PEOPLE, solution, solPrefix: C.SOL_PREFIX, who: L.client });

  return K.write(sitesCss);
}
