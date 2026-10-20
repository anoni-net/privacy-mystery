// Static edition kit: plain HTML and CSS, no JavaScript and no SVG, for Tor Browser's "Safest"
// security level. Each case's print/static.mjs builds its pages with these helpers and its own
// text; the kit holds what every case shares: the page shell, the opening chat as one page per
// path through it, the in-game websites crawled from the case's makeSites(), file pages, notes,
// hints, the report and one page per accusation.
import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { esc } from './case-data.mjs';
import { iconTags, ogTags, SITE_NAME, LANG_INFO, langLinks } from './meta.mjs';

export { esc };
const STATIC_CSS = join(dirname(fileURLToPath(import.meta.url)), '..', 'engine', 'static.css');
export const short = s => createHash('sha256').update(s).digest('hex').slice(0, 10);

// Text every case's static edition shares; a case's table goes on top (Object.assign)
export const BASE = {
  zh: {
    lang: 'zh-Hant-TW', station: '霧港工作站', staticTag: '靜態版', navLabel: '工作站', start: '開始',
    chat: '加密通訊', e2e: '端對端加密 · 安全碼已驗證', opening: '— 安全碼已驗證 · 訊息 24 小時後自動銷毀 —',
    acceptHint: '按「接收」收下資料', accept: '接收檔案', caseOpen: '— 委託成立 · 調查開始 —', begin: '開始調查', choose: '選擇你的回覆',
    chatLog: '通訊紀錄', awu: '阿霧 · 互助站', internal: '內部頻道', awuSys: '— 互助站內部頻道 —', replay: '重看一次開場對話',
    staticTips: '靜態版不能輸入文字，可以從這些關鍵字選：', bookmarks: '書籤',
    fileCol: '檔案', rawCol: '原始檔', download: '下載', downloadRaw: '下載原始檔',
    terminal: '終端機紀錄', notes: '調查筆記', clue: '線索', suspects: '嫌疑人', sep: '　',
    hints: '提示', hintsLead: '卡住再看，一次打開一條。記下你看了幾條，結案時自評會用到。', hint: n => `提示 ${n}`,
    report: '結案報告', reportLead: '先在心裡或紙上作答，再打開「對答案」。', check: '對答案',
    closed: '結案', accused: '指認', backToReport: '回到結案報告',
    feedback: url => `<p class="lead">玩完的感想、想看的案件主題，歡迎寫在<a href="${url}">建議與回饋</a>（送出需要 JavaScript）。</p>`,
  },
  'zh-cn': {
    lang: 'zh-Hans', station: '雾港工作站', staticTag: '静态版', navLabel: '工作站', start: '开始',
    chat: '加密通信', e2e: '端对端加密 · 安全码已验证', opening: '— 安全码已验证 · 消息 24 小时后自动销毁 —',
    acceptHint: '按「接收」收下资料', accept: '接收文件', caseOpen: '— 委托成立 · 调查开始 —', begin: '开始调查', choose: '选择你的回复',
    chatLog: '通信记录', awu: '阿雾 · 互助站', internal: '内部频道', awuSys: '— 互助站内部频道 —', replay: '重看一次开场对话',
    staticTips: '静态版不能输入文本，可以从这些关键字选：', bookmarks: '书签',
    fileCol: '文件', rawCol: '源文件', download: '下载', downloadRaw: '下载源文件',
    terminal: '终端记录', notes: '调查笔记', clue: '线索', suspects: '嫌疑人', sep: '　',
    hints: '提示', hintsLead: '卡住再看，一次打开一条。记下你看了几条，结案时自评会用到。', hint: n => `提示 ${n}`,
    report: '结案报告', reportLead: '先在心里或纸上作答，再打开「对答案」。', check: '对答案',
    closed: '结案', accused: '指认', backToReport: '回到结案报告',
    feedback: url => `<p class="lead">玩完的感想、想看的案件主题，欢迎写在<a href="${url}">建议与反馈</a>（提交需要 JavaScript）。</p>`,
  },
  en: {
    lang: 'en', station: 'Mistport Workstation', staticTag: 'static', navLabel: 'Workstation', start: 'Start',
    chat: 'Secure chat', e2e: 'End-to-end encrypted · safety number verified', opening: '— Safety number verified · messages disappear after 24 hours —',
    acceptHint: 'Tap “Accept” to receive the files', accept: 'Accept the file', caseOpen: '— Case accepted · investigation open —', begin: 'Start investigating', choose: 'Choose your reply',
    chatLog: 'Messages', awu: 'Fog · Mistport Aid', internal: 'internal channel', awuSys: '— Mistport Privacy Aid · internal channel —', replay: 'Replay the opening conversation',
    staticTips: 'The static version can’t take typing; pick one of these searches: ', bookmarks: 'Bookmarks',
    fileCol: 'File', rawCol: 'Original', download: 'Download', downloadRaw: 'Download the original file',
    terminal: 'Terminal log', notes: 'Notes', clue: 'Clue', suspects: 'Suspects', sep: ' · ',
    hints: 'Hints', hintsLead: 'Open them only when stuck, one at a time, and keep count for your self-assessment.', hint: n => `Hint ${n}`,
    report: 'Case report', reportLead: 'Answer in your head or on paper first, then open “Check”.', check: 'Check',
    closed: 'Case closed', accused: 'Accusation', backToReport: 'Back to the case report',
    feedback: url => `<p class="lead">Tell us how the case went, or which privacy topic you’d like a case about, on the <a href="${url}">feedback page</a> (it needs JavaScript to send).</p>`,
  },
};

// nav: [[page, label]] for the header; L: the case's text with BASE under it
export function staticKit({ caseDir, out, lang, langs = [lang], L, nav }) {
  const root = join(out, 'static');
  const files = new Map();
  const put = (path, html) => files.set(path, html);
  const meta = JSON.parse(readFileSync(join(caseDir, 'case.json'), 'utf8'));
  const slug = meta.slug;
  // Accusation pages are named by hash of each suspect's key, so a URL never reveals who is right.
  const accuseSlug = key => 'accuse/' + createHash('sha256').update(slug + ':' + key).digest('hex').slice(0, 12) + '.html';
  // static/ sits in the case folder, which sits in the language folder (en/, zh-cn/)
  const toRoot = up => up + '../../' + (LANG_INFO[lang].dir ? '../' : '');
  const casePath = LANG_INFO[lang].dir + slug + '/';
  // The feedback page (scripts/feedback.mjs); the onion build rewrites it with every other link
  const feedbackUrl = `https://anoni.net/mystery/${LANG_INFO[lang].dir}feedback/?case=${meta.number}&amp;from=static`;

  const doc = ({ title, up, body, nav: showNav = true, here = '', cls = '', og = false }) => `<!doctype html>
<html lang="${L.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="referrer" content="no-referrer">
<title>${esc(title)} · ${L.title}</title>
${iconTags(toRoot(up), lang)}${og ? '\n' + ogTags({ lang, siteName: SITE_NAME[lang], title: `${L.title} · ${L.staticTag}`, desc: L.lead, path: casePath + 'static/', image: casePath + 'og.png' }) : ''}
<link rel="stylesheet" href="${up}static.css">
<link rel="stylesheet" href="${up}sites.css">
</head>
<body${cls ? ` class="${cls}"` : ''}>
${showNav ? `<header class="top"><a class="brand" href="${up}desk.html">${L.station} <small>${L.staticTag}</small></a><nav aria-label="${L.navLabel}">${nav.map(([h, t]) => `<a href="${up}${h}"${h === here ? ' aria-current="page"' : ''}>${t}</a>`).join('')}</nav></header>` : ''}
<main class="main">
${body}
</main>
</body>
</html>
`;

  /* ---------- entry ---------- */
  function cover() {
    const aside = [...L.aside, langLinks(langs, lang, toRoot(''), l => LANG_INFO[l].dir + slug + '/static/').join(' · ')].filter(Boolean);
    put('index.html', doc({ title: L.start, up: '', nav: false, og: true, body: `<div class="cover">
  <p class="kicker">PRIVACY MYSTERY · CASE FILE ${meta.number}</p>
  <h1>${L.title}</h1>
  <p class="lead">${L.lead}</p>
  <p>${L.intro}</p>
  <p><a class="go" href="intro/start.html#reply">${L.open}</a></p>
  <div class="aside">
    ${aside.map(p => `<p>${p}</p>`).join('\n    ')}
  </div>
</div>` }));
  }

  /* ---------- conversations: one page per path through them ---------- */
  const bubbles = log => log.map(m => m.sys ? `<p class="sys">${esc(m.sys)}</p>` : m.file
    ? `<div class="filecard"><span class="fi">ZIP</span><span><b>${esc(m.file)}</b><br><small>${m.meta || L.zipMeta}</small></span></div>`
    : `<div class="bub ${m.me ? 'me' : 'them'}">${esc(m.text)}<span class="tm">${m.tm}</span></div>`).join('');
  // Each reply loads a new page. Without JavaScript, two things keep the newest
  // messages in view: the log is a column-reverse scroller (it opens scrolled to the
  // bottom), and reply links carry #reply so small screens land on the replies.
  // nodes: { id: { msgs, choices: [[text, next]], file, next, end } } as in case.js's INTRO.
  function conversation({ nodes, start = 'n1', dir = 'intro', who, opening = L.opening, tm, ending }) {
    const chatPage = (id, log, actions) => put(`${dir}/${id}.html`, doc({ title: L.chat, up: '../', nav: false, cls: 'chat-page', body: `<section class="chat intro">
  <header class="chat-head"><b>${who}</b><span>${L.e2e}</span></header>
  <div class="log"><div class="log-in">${bubbles([{ sys: opening }].concat(log))}</div></div>
  <div class="replies" id="reply">${actions}</div>
</section>` }));
    function walk(nodeId, log, id) {
      const node = nodes[nodeId];
      const said = log.filter(m => !m.sys).length;
      const say = log.concat(node.msgs.map((text, i) => ({ text, tm: tm(said + i) })));
      if (node.file) {
        const withFile = say.concat({ file: L.zip });
        chatPage(id, withFile, `<p class="label">${L.acceptHint}</p><a class="reply primary" href="${id}-f.html#reply">${L.accept}</a>`);
        return walk(node.next, withFile.concat({ sys: L.received }), id + '-f');
      }
      if (node.end || (!node.next && !node.choices)) {
        chatPage(id, ending ? say.concat(ending.log) : say, ending ? ending.actions : '');
        return;
      }
      if (node.choices) {
        chatPage(id, say, `<p class="label">${L.choose}</p>${node.choices.map(([text], i) => `<a class="reply" href="${id}-${i}.html#reply">${esc(text)}</a>`).join('')}`);
        node.choices.forEach(([text, next], i) => walk(next, say.concat({ text, me: true, tm: tm(say.filter(m => !m.sys).length) }), `${id}-${i}`));
        return;
      }
      walk(node.next, say, id);
    }
    walk(start, [], 'start');
  }
  const intro = ({ nodes, who, tm }) => conversation({ nodes, who, tm, ending: { log: [{ sys: L.caseOpen }], actions: `<a class="reply primary" href="../desk.html">${L.begin}</a>` } });

  /* ---------- workstation ---------- */
  function desk(tileLinks) {
    put('desk.html', doc({ title: L.nav[0], up: '', here: 'desk.html', body: `<h1>${L.mission}</h1>
<ol class="mission">${L.missionItems.map(m => `<li>${m}</li>`).join('')}</ol>
<div class="tiles">${L.tiles.map(([t, d], i) => `<a class="tile" href="${tileLinks[i]}"><b>${t}</b><span>${d}</span></a>`).join('')}</div>` }));
  }
  // Fog's channel, the facts so far, and links to replay the conversations
  function chatLog({ msgs, extra = '' }) {
    put('chat.html', doc({ title: L.nav[1], up: '', here: 'chat.html', body: `<h1>${L.chatLog}</h1>
<section class="chat"><header class="chat-head"><b>${L.awu}</b><span>${L.internal}</span></header><div class="log">
${bubbles([{ sys: L.awuSys }].concat(msgs))}</div></section>
<h2>${L.facts}</h2>
<ul class="facts">${L.factItems.map(f => `<li>${f}</li>`).join('')}</ul>
<p><a href="intro/start.html#reply">${L.replay}</a></p>${extra}` }));
  }

  /* ---------- in-game websites, crawled from the case's makeSites() ----------
     ctx: the case's adapters on top of the kit's (href, pin, asset); slugOf(path, q, qs) may
     name a page itself (return undefined for the default); after(url) adds HTML below a page. */
  function sites({ makeSites, bookmarks, ctx, slugOf = () => undefined, after = () => '' }) {
    const slugs = new Map();
    const queue = [];
    const makeSlug = url => {
      const [path, qs] = url.split('?');
      const q = qs ? decodeURIComponent((qs.match(/q=([^&]*)/) || [])[1] || '') : '';
      const own = slugOf(path, q, qs);
      if (own) return own;
      // the header's Browser link opens web/search.html
      if (path.startsWith('mist.search')) return q ? 'search-' + short(q) : 'search';
      return path.replace(/\/$/, '').replace(/[^a-zA-Z0-9]+/g, '-') + (qs ? '-' + short(qs) : '');
    };
    const link = url => { if (!slugs.has(url)) { slugs.set(url, makeSlug(url)); queue.push(url); } return slugs.get(url) + '.html'; };
    const state = { current: '' };
    const site = makeSites(Object.assign({
      esc,
      href: url => `href="${link(url)}"`,
      pin: () => '',
      asset: path => '../../assets/' + path,
    }, ctx({ link, state })));
    bookmarks.forEach(([, u]) => link(u));
    while (queue.length) {
      const current = state.current = queue.shift();
      const body = `<div class="browser"><div class="b-bar"><span class="b-lock">https://</span><span class="b-url">${esc(current)}</span></div><nav class="b-bm" aria-label="${L.bookmarks}">${bookmarks.map(([t, u]) => `<a href="${link(u)}">${t}</a>`).join('')}</nav><div class="b-view">${site.route(current)}${after(current)}</div></div>`;
      put('web/' + slugs.get(current) + '.html', doc({ title: current, up: '../', here: 'web/search.html', body }));
    }
    return link;
  }
  // A search box the static edition can't type into: the keywords to pick from, as links
  const staticForm = (link, list) => (base, v, cls, placeholder) =>
    `<div class="${cls} static-box"><span class="sq">${esc(v || placeholder)}</span></div><p class="static-tips">${L.staticTips}${list(base).map(q => `<a href="${link(base + encodeURIComponent(q))}">${esc(q)}</a>`).join(L.sep)}</p>`;

  /* ---------- files ---------- */
  // CSV as a table (# lines as notes), chat logs as messages, the rest as preformatted text
  const render = (name, text, { color = {}, initial = n => String(n)[0] } = {}) => {
    if (/\.csv$/.test(name)) {
      const lines = text.split('\n'), rows = lines.filter(l => !l.startsWith('#')).map(l => l.split(','));
      return `<div class="scroll"><table class="data"><tr>${rows[0].map(h => `<th>${esc(h)}</th>`).join('')}</tr>${rows.slice(1).map(r => `<tr>${r.map(x => `<td>${esc(x)}</td>`).join('')}</tr>`).join('')}</table></div>${lines.filter(l => l.startsWith('#')).map(l => `<p class="note">※ ${esc(l.slice(1).trim())}</p>`).join('')}`;
    }
    if (/\.log$/.test(name)) {
      const lines = text.split('\n');
      return `<p class="chan">${esc(lines[0])}</p>${lines.slice(1).map(l => {
        const m = l.match(/^\[(.+?)\] (.+?): (.*)$/); if (!m) return '';
        return `<div class="slk"><span class="av" style="background:${color[m[2]] || '#555'}">${initial(m[2])}</span><div><b>${esc(m[2])}</b> <small>${m[1]}</small><br>${esc(m[3])}</div></div>`;
      }).join('')}<p class="note">${L.verbatim}</p>`;
    }
    return `<pre class="txt">${esc(text)}</pre>`;
  };
  // One page per file plus its original for download. list: [[shown name, raw file name, text, html?]]
  function filePage({ name, raw, text, html, crumb }) {
    const rawDir = join(root, 'files', 'raw');
    mkdirSync(rawDir, { recursive: true });
    writeFileSync(join(rawDir, raw), text + '\n');
    put(`files/${raw.replace(/\.\w+$/, '')}.html`, doc({ title: name, up: '../', here: 'files/index.html', body: `<p class="crumb"><a href="index.html">${esc(crumb)}</a> / ${esc(name)}</p><h1>${esc(name.split('/').pop())}</h1>${html}<p><a href="raw/${raw}" download="${esc(name.split('/').pop())}">${L.downloadRaw}</a></p>` }));
  }
  const fileTable = list => `<table class="data files"><tr><th>${L.fileCol}</th><th>${L.rawCol}</th></tr>${list.map(([n, raw]) => `<tr><td><a href="${raw.replace(/\.\w+$/, '')}.html">${esc(n)}</a></td><td><a href="raw/${raw}" download="${esc(n.split('/').pop())}">${L.download}</a></td></tr>`).join('')}</table>`;

  /* ---------- terminal transcript ---------- */
  function terminal(cmds, lead = L.terminalLead, note = L.terminalNote) {
    put('terminal.html', doc({ title: L.terminal, up: '', here: 'terminal.html', body: `<h1>${L.terminal}</h1>
<p class="lead">${lead}</p>
<div class="term">${cmds.map(([cwd, cmd, output]) => `<details><summary><span class="p">investigator@mistport</span>:<span class="k">${esc(cwd)}</span>$ ${esc(cmd)}</summary><pre>${esc(output)}</pre></details>`).join('')}</div>
<p class="note">${note}</p>` }));
  }

  /* ---------- notes, hints, report ---------- */
  function notes(people) {
    put('notes.html', doc({ title: L.notes, up: '', here: 'notes.html', body: `<h1>${L.notes}</h1>
<p class="lead">${L.notesLead}</p>
<div class="scroll"><table class="data grid"><tr><th>${L.clue}</th>${people.map(p => `<th>${p.name}</th>`).join('')}</tr>${L.clueRows.map((r, i) => `<tr><td>${r}</td>${people.map(() => `<td>${i === 0 && L.firstRowAll !== false ? '○' : ''}</td>`).join('')}</tr>`).join('')}</table></div>
<h2>${L.suspects}</h2><ul class="people">${people.map(p => `<li><b>${p.name}</b>${L.sep}${p.role}</li>`).join('')}</ul>` }));
  }
  function hints() {
    put('hints.html', doc({ title: L.hints, up: '', here: 'hints.html', body: `<h1>${L.hints}</h1>
<p class="lead">${L.hintsLead}</p>
${L.hintList.map((h, i) => `<details class="hint"><summary>${L.hint(i + 1)}</summary><p>${esc(h)}</p></details>`).join('')}` }));
  }
  // qs: the report's multiple-choice questions ([[value, label]] each); who: the client's name
  // on the closing messages
  function report({ qs, people, solution, solPrefix, who }) {
    const opts = list => `<ul class="opts">${list.map(([, l]) => `<li>${l}</li>`).join('')}</ul>`;
    put('report.html', doc({ title: L.report, up: '', here: 'report.html', body: `<h1>${L.report}</h1>
<p class="lead">${L.reportLead}</p>
${qs.map((q, i) => `<section class="q"><h2>${L.q[i]}</h2>${opts(q)}<details><summary>${L.check}</summary><p>${L.a[i]}</p></details></section>`).join('\n')}
<section class="q"><h2>${L.q[qs.length]}</h2><p>${L.accuseLead}</p><div class="accuse">${people.map(p => `<a href="${accuseSlug(p.key)}">${p.name}<small>${p.role}</small></a>`).join('')}</div></section>` }));

    const prefix = solPrefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const culprit = (solution.match(new RegExp(`<h2 class="sol-title">${prefix}(.+?)</h2>`)) || [])[1];
    if (!culprit) throw new Error('solution has no culprit title');
    people.forEach(p => {
      const right = p.name === culprit;
      put(accuseSlug(p.key), doc({ title: right ? L.closed : L.accused, up: '../', here: 'report.html', body: right
        ? `<section class="chat"><div class="log"><div class="bub them">${L.solved}<span class="tm">${who}</span></div></div></section><div class="sol">${solution.replace('<h3>', L.selfRank + '<h3>')}</div>${L.feedback(feedbackUrl)}`
        : `<section class="chat"><div class="log"><div class="bub them">${L.wrong}<span class="tm">${who}</span></div></div></section><p><a class="go" href="../report.html">${L.backToReport}</a></p>` }));
    });
  }

  /* ---------- write ---------- */
  function write(sitesCss) {
    for (const [path, html] of files) {
      mkdirSync(dirname(join(root, path)), { recursive: true });
      writeFileSync(join(root, path), html);
    }
    writeFileSync(join(root, 'sites.css'), sitesCss);
    // the shared look (engine/static.css), then the case's own rules if it has any
    const own = join(caseDir, 'static.css');
    writeFileSync(join(root, 'static.css'), readFileSync(STATIC_CSS, 'utf8') + (existsSync(own) ? '\n' + readFileSync(own, 'utf8') : ''));
    return files.size;
  }

  return { root, put, doc, slug, meta, toRoot, cover, conversation, intro, desk, chatLog, sites, staticForm, render, filePage, fileTable, terminal, notes, hints, report, write, bubbles };
}
