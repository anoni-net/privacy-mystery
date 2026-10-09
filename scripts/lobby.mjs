// The lobby at /mystery/: the 霧港 privacy aid station's case board, one folder per case
// (cases/*/case.json) plus a "next case" placeholder. Plain HTML and CSS so it works without
// JavaScript (Tor Browser at "Safest"); a small script only adds progress stamps, read from
// the summary each case writes to localStorage under mystery-progress:<slug>.
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { esc } from './case-data.mjs';
import { iconTags, ogTags, swScript, SITE_NAME } from './meta.mjs';

const CSS = `
/* Layout: a dark cork board with cream case folders pinned to it, then how to play below. */
:root {
  color-scheme: dark;
  --board: #11161d;
  --board-2: #19202a;
  --fg: #e7eaee;
  --muted: #94a0b0;
  --line: #333f4e;
  --paper: #efe6d2;
  --paper-2: #e4d8bf;
  --paper-ink: #2a2418;
  --paper-muted: #6f6553;
  --accent: #e3a33b;
  --accent-ink: #1a1206;
  --stamp: #b5361f;
  --font-sans: "PingFang TC", "Noto Sans CJK TC", "Noto Sans TC", "Microsoft JhengHei", "Heiti TC", sans-serif;
  --font-serif: "Songti TC", "Noto Serif CJK TC", "Noto Serif TC", "PMingLiU", serif;
  --font-mono: ui-monospace, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
}
* { box-sizing: border-box; }
[hidden] { display: none !important; }
html { background: var(--board); }
body {
  margin: 0; padding-inline: 16px; color: var(--fg); font-family: var(--font-sans); font-size: 15px; line-height: 1.75;
  background:
    radial-gradient(1100px 600px at 80% -10%, rgba(227,163,59,.09), transparent 60%),
    radial-gradient(rgba(255,255,255,.035) 1px, transparent 1px) 0 0 / 14px 14px,
    var(--board);
}
a { color: var(--accent); }
:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
.wrap { max-width: 1040px; margin: 0 auto; padding-block: 40px 56px; }
h1, h2, h3 { text-wrap: balance; line-height: 1.3; }

/* header */
.kicker { font: 12px var(--font-mono); letter-spacing: .3em; color: var(--accent); margin: 0; }
h1 { font-family: var(--font-serif); font-size: clamp(40px, 8vw, 64px); letter-spacing: .12em; margin: 6px 0 10px; }
.lead { color: var(--muted); max-width: 34em; margin: 0; font-size: 16px; }

/* the board */
.board { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr)); gap: 34px 26px; margin-top: 40px; }
.folder { position: relative; padding-top: 22px; }
.folder:nth-child(2n) { transform: rotate(.6deg); }
.folder:nth-child(2n+1) { transform: rotate(-.5deg); }
.tab { position: absolute; top: 0; left: 18px; height: 26px; padding: 3px 14px 0; background: var(--paper-2); color: var(--paper-muted); font: 600 11px var(--font-mono); letter-spacing: .18em; border-radius: 6px 6px 0 0; }
.paper { position: relative; height: 100%; display: flex; flex-direction: column; gap: 10px; background: var(--paper); color: var(--paper-ink); border-radius: 2px 8px 8px 8px; padding: 26px 22px 20px; box-shadow: 0 18px 40px rgba(0,0,0,.45); }
.pin { position: absolute; top: -8px; left: 50%; width: 16px; height: 16px; margin-left: -8px; border-radius: 50%; background: radial-gradient(circle at 35% 35%, #f4a28f, var(--stamp) 60%, #6e1d10); box-shadow: 0 3px 4px rgba(0,0,0,.4); }
.paper h2 { font-family: var(--font-serif); font-size: 28px; letter-spacing: .08em; margin: 0; }
.hook { font-family: var(--font-serif); font-size: 17px; margin: 0; }
.summary { margin: 0; color: #3e3626; font-size: 14.5px; }
.skills { display: flex; flex-wrap: wrap; gap: 6px; list-style: none; margin: 0; padding: 0; }
.skills li { font-size: 12px; padding: 1px 9px; border: 1px solid #c9bb9b; border-radius: 999px; color: var(--paper-muted); }
.meta { margin: 0; font-size: 13px; color: var(--paper-muted); }
.plays { display: flex; flex-wrap: wrap; gap: 8px; margin-top: auto; padding-top: 6px; }
.play { display: inline-flex; align-items: center; min-height: 44px; padding: 0 16px; border-radius: 8px; border: 1px solid #b9ab8b; color: var(--paper-ink); text-decoration: none; font-weight: 600; font-size: 14px; }
.play:hover { border-color: var(--paper-ink); }
.play.primary { background: var(--paper-ink); color: var(--paper); border-color: var(--paper-ink); }
.play.primary:hover { background: #000; }
/* stamped across the folder's top-right corner, clear of the title in any language */
.stamp { position: absolute; top: -22px; right: -10px; z-index: 2; background: rgba(239,230,210,.92); transform: rotate(9deg); border: 3px solid var(--stamp); color: var(--stamp); padding: 2px 10px 4px; text-align: center; font-weight: 700; letter-spacing: .2em; line-height: 1.3; border-radius: 3px; opacity: .85; pointer-events: none; }
.stamp small { display: block; font-size: 10px; letter-spacing: .05em; font-weight: 600; }
.stamp.open { border-color: #8a6a1f; color: #8a6a1f; }

/* the placeholder folder */
.soon .paper { background: transparent; color: var(--muted); border: 2px dashed var(--line); box-shadow: none; }
.soon .tab { background: var(--board-2); color: var(--muted); }
.soon h2 { color: var(--fg); }
.redact { display: flex; flex-direction: column; gap: 8px; margin: 6px 0; }
.redact span { display: block; height: 12px; border-radius: 2px; background: #2a3441; }
.redact span:nth-child(1) { width: 82%; }
.redact span:nth-child(2) { width: 64%; }
.redact span:nth-child(3) { width: 74%; }
.soon p { margin: 0; font-size: 14px; }

/* how to play */
section.info { margin-top: 64px; }
section.info h2 { font-size: 13px; letter-spacing: .25em; color: var(--accent); font-weight: 600; margin: 0 0 16px; }
.modes { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr)); gap: 14px; }
.mode { border: 1px solid var(--line); border-radius: 10px; padding: 16px 18px; background: rgba(25,32,42,.7); }
.mode h3 { margin: 0 0 4px; font-size: 16px; }
.mode p { margin: 0; color: var(--muted); font-size: 14px; }
.skillmap { display: flex; flex-wrap: wrap; gap: 8px; list-style: none; padding: 0; margin: 0 0 14px; }
.skillmap li { border: 1px solid var(--line); border-radius: 999px; padding: 3px 12px; font-size: 13.5px; }
.skillmap small { color: var(--muted); margin-left: 4px; }
.reading { margin: 0; padding-left: 1.2em; color: var(--muted); }
footer { margin-top: 64px; padding-top: 18px; border-top: 1px solid var(--line); color: var(--muted); font-size: 13px; }
footer p { margin: 0 0 4px; }
@media (prefers-reduced-motion: reduce) { .folder { transform: none !important; } }
`;

// Progress stamps: each case writes { status: 'started' | 'solved', level } to localStorage;
// the lobby names the rank in its own language.
const SCRIPT = L => `
(function () {
  var W = ${JSON.stringify(L.stamp)};
  var folders = document.querySelectorAll('[data-slug]');
  for (var i = 0; i < folders.length; i++) {
    var f = folders[i], p = null;
    try { p = JSON.parse(localStorage.getItem('mystery-progress:' + f.getAttribute('data-slug')) || 'null'); } catch (e) {}
    if (!p || !p.status) continue;
    var stamp = f.querySelector('.stamp'), go = f.querySelector('.play.primary');
    if (p.status === 'solved') {
      stamp.textContent = W.solved;
      var r = W.ranks[p.level];
      if (r) { var s = document.createElement('small'); s.textContent = r; stamp.appendChild(s); }
      go.textContent = W.back;
    } else {
      stamp.textContent = W.open;
      stamp.className = 'stamp open';
      go.textContent = W.resume;
    }
    stamp.hidden = false;
  }
})();
`;

const T = {
  zh: {
    lang: 'zh-Hant-TW', skills: '會練到的技巧', start: '開始調查', stat: '靜態版', pdf: 'PDF 版',
    desc: 'anoni.net 的隱私推理遊戲。每一份委託都是一個案件：從照片、檔案與文字裡找出破綻，學會保護自己和別人的隱私。',
    title: '霧港委託板｜隱私推理遊戲', kicker: '霧港隱私互助站 · PRIVACY MYSTERY', h1: '委託板',
    lead: '今晚有人需要你。每一份委託都是一個案件：從照片、檔案和文字裡找出破綻，在別人之前找到它們，也學會怎麼不留下它們。',
    langLink: '<a href="en/" lang="en">English</a>', next: '下一份委託',
    soon: '準備中。想看哪一種隱私主題？<a href="https://github.com/anoni-net/privacy-mystery/issues">到 GitHub 告訴我們</a>。',
    modes: '三種玩法',
    modeList: [['互動版', '模擬一台調查員的電腦：瀏覽器、終端機、看圖工具和調查板。需要 JavaScript，手機也能玩。'], ['靜態版', '只用 HTML 和 CSS，不需要 JavaScript。Tor Browser 的「最安全」等級也能完整破案。'], ['PDF 版', '離線或印出來玩，適合讀書會與課堂。解答在最後幾頁，上下顛倒印刷。']],
    learn: '你會練到的技巧',
    reading: '<li><a href="https://anoni.net/docs/basics/">anoni.net 文件庫：概念篇</a>（中繼資料、去匿名化）</li><li><a href="https://anoni.net/docs/scenarios/journalist/">記者情境：消息來源保護</a></li><li><a href="https://anoni.net/docs/tools/">工具篇：威脅模型與工具評估</a></li>',
    foot: '<p>霧港隱私互助站與所有案件裡的人物、公司和事件都是虛構的。</p><p>由 <a href="https://anoni.net/">anoni.net 匿名網路社群</a>製作 · 內容 CC BY 4.0 · 程式 MIT · <a href="https://github.com/anoni-net/privacy-mystery">原始碼</a></p>',
    stamp: { solved: '已結案', open: '調查中', back: '回到案件', resume: '繼續調查', ranks: ['洋蔥首席調查員', '資深隱私志工', '見習調查員'] },
  },
  en: {
    lang: 'en', skills: 'Skills you practise', start: 'Start investigating', stat: 'Static version', pdf: 'PDF',
    desc: 'Privacy mysteries from anoni.net. Each request is a case: find the leaks in photos, files and writing, and learn to protect your own privacy and other people’s.',
    title: 'Mistport case board | privacy mysteries', kicker: 'MISTPORT PRIVACY AID · PRIVACY MYSTERY', h1: 'Case board',
    lead: 'Someone needs you tonight. Each request is a case: find the leaks in photos, files and writing before anyone else does, and learn not to leave them yourself.',
    langLink: '<a href="../" lang="zh-Hant-TW">中文</a>', next: 'The next case',
    soon: 'In preparation. Which privacy topic would you like to see? <a href="https://github.com/anoni-net/privacy-mystery/issues">Tell us on GitHub</a>.',
    modes: 'Three ways to play',
    modeList: [['Interactive', 'A simulated investigator’s computer: browser, terminal, image viewer and evidence board. Needs JavaScript; works on phones.'], ['Static', 'Plain HTML and CSS, no JavaScript. The whole case works at Tor Browser’s “Safest” level.'], ['PDF', 'Offline or on paper, for reading groups and classrooms. The solution is on the last pages, printed upside down.']],
    learn: 'Skills you practise',
    reading: '<li><a href="https://anoni.net/docs/basics/">anoni.net docs: concepts</a> (metadata, de-anonymisation; in Chinese)</li><li><a href="https://anoni.net/docs/scenarios/journalist/">For journalists: protecting sources</a> (in Chinese)</li><li><a href="https://anoni.net/docs/tools/">Tools: threat models and choosing tools</a> (in Chinese)</li>',
    foot: '<p>The Mistport Privacy Aid and every person, company and event in these cases are fictional.</p><p>Made by the <a href="https://anoni.net/">anoni.net community</a> · content CC BY 4.0 · code MIT · <a href="https://github.com/anoni-net/privacy-mystery">source</a></p>',
    stamp: { solved: 'CLOSED', open: 'OPEN', back: 'Back to the case', resume: 'Keep investigating', ranks: ['Chief Onion Investigator', 'Senior Privacy Volunteer', 'Trainee Investigator'] },
  },
};

export function buildLobby({ out, cases, analytics = '', lang = 'zh' }) {
  const L = T[lang];
  cases = cases.map(c => Object.assign({}, c, (c.i18n || {})[lang] || {}));
  const next = String(cases.length + 1).padStart(2, '0');
  const folder = c => `<article class="folder" data-slug="${esc(c.slug)}">
  <div class="tab">CASE ${esc(c.number)}</div>
  <div class="paper">
    <span class="pin" aria-hidden="true"></span>
    <div class="stamp" hidden></div>
    <h2>${esc(c.title)}</h2>
    <p class="hook">${esc(c.hook)}</p>
    <p class="summary">${esc(c.summary)}</p>
    <ul class="skills" aria-label="${L.skills}">${c.skills.map(s => `<li>${esc(s)}</li>`).join('')}</ul>
    <p class="meta">${esc(c.time)} · ${esc(c.players)}</p>
    <div class="plays">
      <a class="play primary" href="${esc(c.slug)}/">${L.start}</a>
      <a class="play" href="${esc(c.slug)}/static/">${L.stat}</a>
      <a class="play" href="${esc(c.slug)}/${esc(c.pdf)}" download="${esc(c.pdfName)}">${L.pdf}</a>
    </div>
  </div>
</article>`;
  const skills = cases.flatMap(c => c.skills.map(s => [s, c.title]));
  const html = `<!doctype html>
<html lang="${L.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="referrer" content="no-referrer">
<meta name="description" content="${L.desc}">
<title>${L.title}</title>
${iconTags(lang === 'en' ? '../' : '', lang)}
${ogTags({ lang, siteName: SITE_NAME[lang], title: L.title, desc: L.desc, path: lang === 'en' ? 'en/' : '', image: lang === 'en' ? 'og-en.png' : 'og.png' })}
${analytics}<style>${CSS}</style>
</head>
<body>
<div class="wrap">
<header>
  <p class="kicker">${L.kicker} · ${L.langLink}</p>
  <h1>${L.h1}</h1>
  <p class="lead">${L.lead}</p>
</header>

<main>
<div class="board">
${cases.map(folder).join('\n')}
<article class="folder soon">
  <div class="tab">CASE ${next}</div>
  <div class="paper">
    <h2>${L.next}</h2>
    <div class="redact" aria-hidden="true"><span></span><span></span><span></span></div>
    <p>${L.soon}</p>
  </div>
</article>
</div>

<section class="info" aria-labelledby="h-modes">
  <h2 id="h-modes">${L.modes}</h2>
  <div class="modes">${L.modeList.map(([h, p]) => `<div class="mode"><h3>${h}</h3><p>${p}</p></div>`).join('')}</div>
</section>

<section class="info" aria-labelledby="h-skills">
  <h2 id="h-skills">${L.learn}</h2>
  <ul class="skillmap">${skills.map(([s, t]) => `<li>${esc(s)}<small>${esc(t)}</small></li>`).join('')}</ul>
  <ul class="reading">${L.reading}</ul>
</section>
</main>

<footer>
  ${L.foot}
</footer>
</div>
<script>${SCRIPT(L)}
${swScript(lang === 'en' ? '../' : '', lang)}</script>
</body>
</html>
`;
  writeFileSync(join(out, 'index.html'), html);
}
