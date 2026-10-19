// Blue Magpie's printable edition: an A4 case file generated from the same case data, with the
// solution at the back, laid out with the shared kit (scripts/pdf-kit.mjs). The search results
// and the fake member centre are the in-game pages themselves, styled by web/sites.css scoped
// under .shot so it can't reach the rest of the file.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { loadCase } from '../../../scripts/case-data.mjs';
import { CSS, esc, csv, file, introChat, chatHTML, splitSolution, cover, briefing, grid, hintsSection, stopAndSolution, printPdf, assetsFrom } from '../../../scripts/pdf-kit.mjs';
import { T as STORY } from './text.mjs';
import { parseMail } from './static.mjs';

// What this file reads from case.js
const EXPORTS = ['PEOPLE', 'INTRO', 'MAIL_SCAM', 'MAIL_REAL', 'CHAT_LOG', 'ALIASES', 'LEAKS', 'BB_README', 'BB_PROVIDED', 'BB_DOWNLOADS', 'BB_CANARIES', 'BB_INBOX',
  'WHOIS', 'DNS_TXT', 'FAKE_HOSTS', 'FORUM_REPLIES', 'FILES_CLIENT', 'FILES_BB', 'DEVICES_IMG', 'SEARCH_TIPS', 'SOL_PREFIX', 'Q1', 'Q2', 'Q3', 'regDomain', 'toAscii', 'makeSites'];

const EXTRA = `
.mailcard { border: 1px solid var(--line); border-radius: 3px; padding: 4mm 5mm; background: #fff; break-inside: avoid; }
.mailcard h3 { margin: 0 0 2mm; }
.mailcard dl { display: grid; grid-template-columns: 18mm 1fr; gap: .5mm 3mm; font-size: 8.8pt; margin: 0 0 3mm; }
.mailcard dt { color: var(--muted); }
.mailcard dd { margin: 0; font-family: var(--font-mono); word-break: break-all; }
.mailcard pre { white-space: pre-wrap; font: 9.4pt/1.6 var(--font-sans); margin: 0; }
.term.wrap { white-space: pre-wrap; word-break: break-all; }
.shot { border: 1px solid #cfcfd4; border-radius: 3px; overflow: hidden; margin-bottom: 4mm; font-size: 9pt; }
.shots2 { display: grid; grid-template-columns: 1fr 1fr; gap: 4mm; break-inside: avoid; }
.shots2 .shot { margin: 0; }
.shots2 .site { font-size: 8.4pt; }
.shots2 .fk-grid { grid-template-columns: 1fr !important; }
.shot .addr { background: #eceef1; font: 8.3pt var(--font-mono); padding: 1.5mm 4mm; color: #444; }
.shot .site { min-height: 0; font-size: 9.6pt; }
.shot .site .wrap { padding: 4mm 6mm; max-width: none; }
.shot form input, .shot form button { pointer-events: none; }
.phone { display: grid; grid-template-columns: 62mm 1fr; gap: 6mm; align-items: start; }
.phone img { width: 100%; border: 1px solid var(--line); border-radius: 4mm; }
.qrnote { font-size: 8.5pt; color: var(--muted); }
`;

export function buildPdf({ caseDir, out, solution, srcDir, lang = 'zh' }) {
  const C = loadCase(caseDir, lang, EXPORTS);
  const L = STORY[lang].pdf;
  const A = assetsFrom(srcDir, out);
  const sitesCss = readFileSync(join(caseDir, 'web', 'sites.css'), 'utf8').replace(':root', '&');

  /* the opening chat, following the first reply at every turn */
  let tick = 3;
  const chat = introChat(C.INTRO, L.zipSys, () => '21:' + String(Math.min(19, Math.floor(tick++ * 0.6) + 3)).padStart(2, '0'));

  /* emails: as the mail app shows them, then the headers that matter */
  const RAW_HEADERS = /^(Return-Path|Received|Authentication-Results|X-MaskMail-Alias|From|Reply-To|To):/;
  const mail = raw => {
    const { headers: h, text } = parseMail(raw);
    const head = raw.split('\n\n')[0].split('\n');
    const kept = [];
    head.forEach(l => { if (RAW_HEADERS.test(l)) kept.push(l); else if (/^\s/.test(l) && kept.length && RAW_HEADERS.test(kept[kept.length - 1].split('\n')[0])) kept[kept.length - 1] += '\n' + l; });
    return `<div class="mailcard"><h3>${esc(h.subject)}</h3><dl>${[['from', L.mailFrom], ['reply-to', L.mailReplyTo], ['to', L.mailTo], ['date', L.mailDate]].filter(([k]) => h[k]).map(([k, t]) => `<dt>${t}</dt><dd>${esc(h[k])}</dd>`).join('')}</dl><pre>${esc(text)}</pre></div>
<h3>${L.rawHead}</h3><div class="term wrap">${esc(kept.join('\n'))}</div>`;
  };

  /* in-game pages, as printed screenshots */
  const sites = C.makeSites({
    esc, href: () => '', pin: () => '', asset: p => A + p,
    form: (base, v, cls, placeholder, button) => `<div class="${cls}"><input value="${esc(v)}" placeholder="${esc(placeholder)}"><button>${button}</button></div>`,
    action: () => '', history: () => [], qrPick: () => '',
    dl: (fn, kind, attrs, cls) => `<span class="${cls}">${esc(fn)}</span>`,
    state: () => ({ flags: {}, downloads: [] }),
  });
  const shot = (url, label = url) => `<div class="shot"><div class="addr">${esc(label)}</div>${sites.route(url)}</div>`;
  const query = C.SEARCH_TIPS[0];
  const fake = C.FAKE_HOSTS[0];

  /* lookups */
  const whois = d => `<span class="c">$ whois ${esc(d)}</span>\n` + C.WHOIS[C.toAscii(C.regDomain(d))].map(([k, v]) => `<span class="k">${k.padEnd(24)}</span>: ${esc(v)}`).join('\n');
  const dig = n => `<span class="c">$ dig txt ${n}</span>\n` + (C.DNS_TXT[n] ? C.DNS_TXT[n].map(r => `${n}.  300  IN  TXT  ${esc(r)}`).join('\n') : '—');
  const leaked = email => {
    const hits = C.LEAKS[email];
    return `<h3>${L.leakedTitle(email)}</h3>` + (hits ? `<table><tr>${L.leakedCols.map(c => `<th>${c}</th>`).join('')}</tr>${hits.map(r => `<tr>${r.map(x => `<td>${esc(x)}</td>`).join('')}</tr>`).join('')}</table>` : `<p>${L.leakedNone}</p>`);
  };

  const html = `<!doctype html>
<html lang="${L.lang}"><head><meta charset="utf-8"><title>${L.title}</title><style>${CSS}${EXTRA}.shot { ${sitesCss} }</style></head><body>

${cover('02', L)}

${briefing(L)}

${file('01', L.f01, chatHTML(L.opening, chat))}

${file('02', L.f02, mail(C.MAIL_SCAM))}

${file('03', L.f03, mail(C.MAIL_REAL))}

${file('04', L.f04, `${shot('mist.search/?q=' + encodeURIComponent(query), L.searchFor(query))}
<div class="shots2">${shot(fake, L.fakeHome + ' · ' + fake)}
${shot(fake + '/support', L.fakeSupport + ' · ' + fake + '/support')}</div>`)}

${file('05', L.f05, `<div class="term wrap">${['beatbird.app', 'member-care.com', 'beatbird-help.app', 'xn--batbird-7gg.app', 'kq3fz.idv.tw'].map(whois).join('\n\n')}</div>
<div class="term wrap" style="margin-top:3mm">${['kq3fz.idv.tw', 'beatbird.app', '_dmarc.beatbird.app'].map(dig).join('\n\n')}</div>
<h3>${L.qrTitle}</h3><div class="term wrap">${esc(L.qrOut)}</div>`)}

${file('06', L.f06, `<div class="phone"><img src="${A}${C.DEVICES_IMG}" alt=""><div>${csvLog(C.CHAT_LOG)}</div></div>`)}

${file('07', L.f07, `${csv(C.ALIASES)}
${leaked('zhining.chou@mistmail.tw')}
${leaked('bb.tidal-fern@maskmail.tw')}`)}

${file('08', L.f08, shot('wuming.forum/t/90417'))}

${file('09', L.f09, `<pre class="card" style="white-space:pre-wrap;font:9pt/1.6 var(--font-sans)">${esc(C.BB_README)}</pre>
<h3>${esc(C.FILES_BB.provided)}</h3>${csv(C.BB_PROVIDED)}
<h3>${esc(C.FILES_BB.downloads)}</h3>${csv(C.BB_DOWNLOADS)}
<h3>${esc(C.FILES_BB.canaries)}</h3>${csv(C.BB_CANARIES)}
<h3>${esc(C.FILES_BB.inbox)}</h3><div class="term wrap">${esc(C.BB_INBOX)}</div>`)}

${file('10', L.f10, L.appendix)}

<section class="file"><span class="tag">ANSWER SHEET</span><h1>${L.sheet}</h1><p class="lead">${L.sheetLead}</p>
<h3>${L.stage1}</h3>
<div class="q"><b>${L.sq[0]}</b><div class="opts">${C.Q1.map(([, l]) => '□ ' + l).join(L.sep)}</div><div class="line"></div></div>
<div class="q"><b>${L.sq[1]}</b><div class="opts">${C.Q2.map(([, l]) => '○ ' + l).join(L.sep)}</div><div class="line"></div></div>
<div class="q"><b>${L.sq[2]}</b><div class="opts">${C.Q3.map(([, l]) => '□ ' + l).join(L.sep)}</div><div class="line"></div></div>
<h3>${L.stage2}</h3><p class="note">${L.marks}</p>
${grid(L, C.PEOPLE)}
<div class="q" style="margin-top:4mm"><b>${L.sq[3]}</b><div class="line"></div><div class="line"></div></div>
<h3>${L.bonus}</h3>
<div class="q"><b>${L.b1}</b><div class="line"></div></div>
<div class="q"><b>${L.b2}</b><div class="line"></div></div>
</section>

${hintsSection(L)}

${stopAndSolution(L, splitSolution(solution, C.SOL_PREFIX, L))}

</body></html>`;

  return printPdf({ html, srcDir, out, name: 'blue-magpie' });
}

// The exported Ripple chat: a heading line, then "[time] name: text"
function csvLog(text) {
  const [head, ...lines] = text.trim().split('\n');
  return `<p class="chan">${esc(head)}</p>${lines.map(l => {
    const m = l.match(/^\[(.+?)\] (.+?): (.*)$/); if (!m) return '';
    return `<div class="msg"><div><div class="who">${esc(m[2])}<span class="when">${m[1]}</span></div>${esc(m[3])}</div></div>`;
  }).join('')}`;
}
