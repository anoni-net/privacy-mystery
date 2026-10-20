// Printable edition kit: an A4 case file with the solution at the back, rendered to PDF with a
// headless Chromium-based browser. Each case's print/pdf.mjs lays out its own files with these
// helpers; the kit holds the shared look (CSS), the cover, briefing, answer-sheet grid, hints,
// the stop page and the upside-down solution.
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';
import { esc } from './case-data.mjs';

export { esc };

export const CSS = `
:root {
  /* white paper: Chrome leaves page margins unpainted, and home printers save ink */
  --ink: #1d1d1f; --muted: #66625a; --paper: #ffffff; --card: #faf7f0; --line: #d8d0bf; --head: #ece5d6;
  --accent: #b5361f; --navy: #1f2a3a; --cream: #efe9dc; --gold: #c9b98f;
  --term-bg: #15181d; --term-fg: #cfd6df; --term-key: #8fb3d9; --term-dim: #6c7686;
  --font-sans: "Noto Sans CJK TC", "Noto Sans TC", "Source Han Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif;
  --font-serif: "Noto Serif CJK TC", "Noto Serif TC", "Source Han Serif TC", "Songti TC", serif;
  --font-mono: "Noto Sans Mono", "DejaVu Sans Mono", Menlo, Consolas, monospace;
}
:root:lang(zh-Hans) {
  --font-sans: "Noto Sans CJK SC", "Noto Sans SC", "Source Han Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif;
  --font-serif: "Noto Serif CJK SC", "Noto Serif SC", "Source Han Serif SC", "Songti SC", serif;
}
@page { size: A4; margin: 16mm 17mm 18mm; }
@page full { margin: 0; }
@page flipped { margin: 14mm 16mm; }
* { box-sizing: border-box; }
html { background: var(--paper); -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { margin: 0; color: var(--ink); font-family: var(--font-sans); font-size: 10.3pt; line-height: 1.68; }
h1 { font-size: 21pt; margin: 3mm 0 2mm; letter-spacing: .03em; }
h2 { font-size: 13pt; margin: 6mm 0 2mm; break-after: avoid; }
h3 { font-size: 11pt; margin: 4mm 0 1mm; break-after: avoid; }
p { margin: 0 0 2.4mm; }
.file { break-before: page; }
.tag { display: inline-block; font: 8.5pt var(--font-mono); letter-spacing: .12em; color: var(--accent); border: 1.5px solid var(--accent); padding: 0 7px; border-radius: 2px; }
.lead { color: var(--muted); font-size: 9.8pt; margin-bottom: 4mm; }
.card { background: var(--card); border: 1px solid var(--line); border-radius: 3px; padding: 4mm 5mm; margin-bottom: 4mm; break-inside: avoid; }
.index { display: grid; grid-template-columns: 1fr 1fr; gap: .5mm 8mm; font-size: 9.6pt; }
.note { font-size: 8.8pt; color: var(--muted); }
.mono { font-family: var(--font-mono); }
table { width: 100%; border-collapse: collapse; font-size: 9.4pt; }
th, td { border-bottom: 1px solid var(--line); padding: 1.6mm 2.2mm; text-align: left; vertical-align: top; }
th { background: var(--head); font-weight: 600; }
tr { break-inside: avoid; }
ul, ol { margin: 0 0 2mm; padding-left: 5mm; }
li { margin-bottom: 1mm; }

/* cover and the stop page are full-bleed */
.full { page: full; height: 297mm; overflow: hidden; break-before: page; }
.cover { break-before: auto; background: var(--navy); color: var(--cream); padding: 22mm 20mm; display: flex; flex-direction: column; justify-content: space-between; }
.cover .kicker { font: 9pt var(--font-mono); letter-spacing: .3em; color: var(--gold); }
.cover h1 { font-family: var(--font-serif); font-size: 52pt; letter-spacing: .14em; color: #fff; margin: 0; }
.cover .sub { font-size: 15pt; color: #d9cfb8; margin-top: 4mm; }
.cover .meta { font-size: 9.5pt; color: #b8ae98; line-height: 1.9; }
.cover .meta b { color: var(--cream); font-weight: 600; }
.cover .warn { margin-top: 6mm; border: 1px solid #5a6578; padding: 3mm 4mm; color: var(--cream); font-size: 9.5pt; }

/* chat */
.chat { display: flex; flex-direction: column; gap: 2mm; }
.bub { max-width: 82%; padding: 2mm 4mm; border-radius: 4mm; font-size: 9.6pt; line-height: 1.55; break-inside: avoid; }
.bub.them { background: #fff; border: 1px solid var(--line); align-self: flex-start; border-bottom-left-radius: 1mm; }
.bub.me { background: #dfe8f2; align-self: flex-end; border-bottom-right-radius: 1mm; }
.bub .t { display: block; font-size: 7.5pt; color: var(--muted); }
.sys { text-align: center; font-size: 8.5pt; color: var(--muted); margin: 0; }

/* forum */
.forum { background: #fff; border: 1px solid #cfcfd4; border-radius: 3px; overflow: hidden; }
.forum .bar { background: #33363d; color: #ddd; font: 8.5pt var(--font-mono); padding: 2mm 5mm; }
.forum .body { padding: 4mm 6mm; }
.forum .title { font-size: 12.5pt; font-weight: 700; }
.forum .info { font: 8.3pt var(--font-mono); color: var(--muted); margin-bottom: 3mm; }
.attach { font: 9pt var(--font-mono); background: #f2f2f4; padding: 2mm 3mm; border-radius: 2px; }
.reply { border-top: 1px solid #eee; padding: 1.6mm 0; font-size: 9.4pt; }
.reply span { font: 8pt var(--font-mono); color: var(--muted); }

/* photo */
.photo { width: 100%; border-radius: 3px; display: block; }
.crops { display: grid; grid-template-columns: 1fr 1fr; gap: 4mm; margin-top: 4mm; }
.crop { height: 46mm; border-radius: 2px; background-repeat: no-repeat; background-size: 520%; border: 1px solid var(--line); }

/* terminal */
.term { background: var(--term-bg); color: var(--term-fg); font: 8.8pt/1.7 var(--font-mono); padding: 4mm 5mm; border-radius: 3px; white-space: pre; }
.term .k { color: var(--term-key); }
.term .c { color: var(--term-dim); }

/* people, slack, social */
.people { display: grid; grid-template-columns: 1fr 1fr; gap: 3mm; }
.person { display: flex; gap: 3mm; background: var(--card); border: 1px solid var(--line); border-radius: 3px; padding: 3mm 3.5mm; break-inside: avoid; }
.av { flex: 0 0 11mm; height: 11mm; border-radius: 50%; color: #fff; font-weight: 700; display: flex; align-items: center; justify-content: center; font-size: 12pt; }
.person b { font-size: 10.5pt; }
.person .role { font-size: 8.3pt; color: var(--muted); }
.person p { font-size: 8.8pt; margin: 0; line-height: 1.55; }
.chan { font: 600 9pt var(--font-mono); color: var(--accent); margin: 3mm 0 0; }
.msg { display: flex; gap: 3mm; padding: 1.8mm 0; border-bottom: 1px dashed var(--line); break-inside: avoid; }
.msg .av { flex-basis: 7mm; height: 7mm; border-radius: 1.5mm; font-size: 8.5pt; }
.msg .who { font-weight: 700; font-size: 9.2pt; }
.msg .when { font: 7.5pt var(--font-mono); color: var(--muted); margin-left: 2mm; font-weight: 400; }
.posts { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 3mm; }
.post { background: #fff; border: 1px solid #ddd; border-radius: 2mm; overflow: hidden; font-size: 8.6pt; line-height: 1.5; break-inside: avoid; }
.post img { width: 100%; display: block; aspect-ratio: 4 / 3; object-fit: cover; }
.post div { padding: 2mm 2.5mm; }
.post .h { font-size: 8pt; color: var(--muted); }

/* answer sheet */
.line { border-bottom: 1px solid #b9b09c; height: 7.5mm; }
.q { margin-bottom: 3mm; break-inside: avoid; }
.q b { display: block; }
.opts { font-size: 9pt; color: var(--muted); }
.grid td, .grid th { text-align: center; height: 8mm; font-size: 9pt; }
.grid td:first-child, .grid th:first-child { text-align: left; }
.hint { border-left: 3px solid var(--accent); padding: 1.5mm 0 1.5mm 4mm; margin-bottom: 3mm; break-inside: avoid; }
.hint b { font: 8pt var(--font-mono); color: var(--accent); letter-spacing: .08em; display: block; }

/* stop page */
.stop { background: #111; color: #ddd; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 30mm; }
.stop .big { font-family: var(--font-serif); font-size: 46pt; letter-spacing: .3em; color: #fff; }
.stop p { font-size: 11pt; color: #aaa; max-width: 120mm; }

/* the solution: small, grey and printed upside down */
.flip { page: flipped; break-before: page; height: 260mm; overflow: hidden; padding-top: 3mm; }
/* flow-root stops the first heading's margin from pushing the block down (its overflow
   is clipped, and after the flip that clipped edge is the top of the text) */
.flip-in { display: flow-root; transform: rotate(180deg); height: 100%; color: #8b867c; font-size: 8.2pt; line-height: 1.55; }
.flip-in h2, .flip-in h3, .flip-in b, .flip-in th { color: #77726a; }
.flip-in table { font-size: 7.8pt; }
.flip-in th, .flip-in td { padding: 1mm 1.6mm; border-color: #e3dccd; }
.flip-in th { background: #efe9dd; }
.sol-kicker { font: 7.5pt var(--font-mono); letter-spacing: .2em; margin: 0; }
.sol-title { font-family: var(--font-serif); font-size: 13pt; margin: 1mm 0 2mm; }
.flip-in h3 { font-size: 9pt; letter-spacing: .1em; margin: 3.5mm 0 1mm; }
.sol-grid td, .sol-grid th { text-align: center; white-space: nowrap; }
.sol-grid td:first-child, .sol-grid th:first-child { text-align: left; }
.flip-in a { color: inherit; }
.key { border: 1px solid #e3dccd; padding: 2mm 3mm; margin-top: 3mm; }
`;

export function findChrome() {
  return [process.env.CHROME_PATH,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
    '/usr/bin/chromium', '/usr/bin/chromium-browser', '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable',
  ].find(p => p && existsSync(p));
}

// CSV as a table, # lines as notes underneath
export const csv = text => {
  const lines = text.split('\n');
  const rows = lines.filter(l => !l.startsWith('#')).map(l => l.split(','));
  return `<table><tr>${rows[0].map(h => `<th>${esc(h)}</th>`).join('')}</tr>${rows.slice(1).map(r => `<tr>${r.map(x => `<td>${esc(x)}</td>`).join('')}</tr>`).join('')}</table>${lines.filter(l => l.startsWith('#')).map(l => `<p class="note">※ ${esc(l.slice(1).trim())}</p>`).join('')}`;
};

// A file section of the case file
export const file = (no, [title, lead], body) => `<section class="file"><span class="tag">FILE ${no}</span><h1>${title}</h1>${lead ? `<p class="lead">${lead}</p>` : ''}${body}</section>`;

// The opening chat, following the first reply at every turn. at() gives each message's time.
export function introChat(nodes, zipSys, at) {
  const chat = [];
  for (let id = 'n1', guard = 0; id && guard < 40; guard++) {
    const node = nodes[id];
    node.msgs.forEach(text => chat.push({ text, t: at() }));
    if (node.file) { chat.push({ sys: zipSys }); id = node.next; continue; }
    if (node.end) break;
    if (node.choices) { chat.push({ text: node.choices[0][0], me: true, t: at() }); id = node.choices[0][1]; continue; }
    id = node.next;
  }
  return chat;
}
export const chatHTML = (opening, chat) => `<div class="chat"><p class="sys">${opening}</p>${chat.map(m => m.sys ? `<p class="sys">${esc(m.sys)}</p>` : `<div class="bub ${m.me ? 'me' : 'them'}">${esc(m.text)}<span class="t">${m.t}</span></div>`).join('')}</div>`;

// The solution with a neutral heading (the culprit's name moves into the first line), split at
// the traps section across two upside-down pages
export function splitSolution(solution, solPrefix, L) {
  const prefix = solPrefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const titleRe = new RegExp(`<h2 class="sol-title">${prefix}(.+?)</h2>\\s*<p>`);
  const culprit = (solution.match(titleRe) || [])[1];
  if (!culprit) throw new Error('solution has no culprit title');
  const sol = solution.replace(titleRe, `<h2 class="sol-title">${L.truth}</h2>\n<p>${L.named(culprit)}`);
  const cut = sol.indexOf(L.trapsH3);
  if (cut < 0) throw new Error('solution has no traps section');
  return [sol.slice(0, cut), sol.slice(cut)];
}

export const cover = (number, L) => `<section class="full cover">
  <div class="kicker">PRIVACY MYSTERY · CASE FILE ${number}</div>
  <div><h1>${L.title}</h1><div class="sub">${L.sub}</div></div>
  <div class="meta">
    ${L.meta}
    <div class="warn">${L.warn}</div>
  </div>
</section>`;

export const briefing = L => `<section class="file"><span class="tag">BRIEFING</span><h1>${L.briefing}</h1>
<p class="lead">${L.briefLead}</p>
<div class="card"><h3 style="margin-top:0">${L.job}</h3>${L.jobBody}</div>
<h2>${L.task}</h2>
<div class="card">${L.taskBody}</div>
<h2>${L.rules}</h2>
<ul>${L.ruleItems.map(r => `<li>${r}</li>`).join('')}</ul>
<h2>${L.files}</h2>
<div class="card index">${L.fileNames.map((t, i) => `<div><span class="mono">${String(i + 1).padStart(2, '0')}</span>　${t}</div>`).join('')}</div>
</section>`;

// The elimination grid on the answer sheet
export const grid = (L, people) => `<table class="grid"><tr><th style="width:28%">${L.clue}</th>${people.map(p => `<th>${p.name}</th>`).join('')}</tr>${L.clueRows.map((r, i) => `<tr><td>${r}</td>${people.map(() => `<td>${i === 0 && L.firstRowAll !== false ? '○' : ''}</td>`).join('')}</tr>`).join('')}</table>`;

export const hintsSection = L => `<section class="file"><span class="tag">HINTS</span><h1>${L.hints}</h1><p class="lead">${L.hintsLead}</p>
${L.hintList.map(([t, h], i) => `<div class="hint"><b>${L.hint(i + 1, t)}</b>${esc(h)}</div>`).join('')}
</section>`;

export const stopAndSolution = (L, [before, after]) => `<section class="full stop"><div class="big">${L.stop}</div><p>${L.stopBody}</p><p style="font-size:9pt;color:#777">${L.stopNote}</p></section>

<section class="flip"><div class="flip-in">${before}</div></section>
<section class="flip"><div class="flip-in">${after}${L.key}</div></section>`;

// Writes the print page outside the served site (it holds the ending in plain text) and prints
// it to <out>/<name>.pdf. Returns { pdf, html }; pdf is null when no browser is found.
export function printPdf({ html, srcDir, out, name }) {
  mkdirSync(srcDir, { recursive: true });
  const htmlPath = join(srcDir, name + '.html');
  writeFileSync(htmlPath, html);

  const chrome = findChrome();
  if (!chrome) return { pdf: null, html: htmlPath };
  const pdf = join(out, name + '.pdf');
  // Chrome writes its user agent (OS and version) into the PDF's Creator field;
  // a game about leaky metadata should not ship one, so give it a neutral name.
  const args = ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', '--user-agent=anoni.net mystery', `--print-to-pdf=${pdf}`, pathToFileURL(htmlPath).href];
  if (process.getuid && process.getuid() === 0) args.unshift('--no-sandbox');
  const r = spawnSync(chrome, args, { stdio: 'ignore', timeout: 120000 });
  return { pdf: r.status === 0 && existsSync(pdf) ? pdf : null, html: htmlPath };
}

// The print page's images live in the served site: the path to them from the print source
export const assetsFrom = (srcDir, out) => relative(srcDir, join(out, 'assets')).split(sep).join('/') + '/';
