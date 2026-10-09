// Static version: plain HTML and CSS, no JavaScript and no SVG, for Tor Browser's
// "Safest" security level. Generated from the same case data as the interactive page.
import { writeFileSync, mkdirSync, cpSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { loadCase, esc } from './case-data.mjs';

const short = s => createHash('sha256').update(s).digest('hex').slice(0, 10);
// Accusation pages are named by hash so a URL never reveals who is right.
const accuseSlug = name => 'accuse/' + createHash('sha256').update('night-heron:' + name).digest('hex').slice(0, 12) + '.html';

const RAW = {
  '收件名單.txt': 'recipients.txt',
  '人物簡介.txt': 'profiles.txt',
  '差勤表_0912-0916.csv': 'attendance_0912-0916.csv',
  'BYOD裝置登記_202603.csv': 'byod_202603.csv',
};

const HINTS = [
  '先到「瀏覽器」裡的無名廣場，把爆料文附件的原始檔下載下來。',
  '照片的完整中繼資料，可以看「終端機紀錄」裡 exiftool 的輸出。會用指令的人，也可以下載原始檔，在自己的電腦上執行 exiftool。',
  '時區 +09:00 是哪裡？在霧搜查「時區」，再對照「檔案」裡的差勤表。新加坡要小心。',
  '手機型號要對照 BYOD 登記表，但那是三月的資料。看看 Slack 紀錄的 random 頻道，或 PicNote 上大家最近的貼文。',
  '打開「照片」頁的原圖，用瀏覽器放大（Ctrl 或 ⌘ 加 +），仔細看左下角和觸控板右側。',
  '那張貼紙和筆電的顏色，在 Slack 紀錄和 PicNote 的貼文裡都找得到對應。霧搜也查得到貼紙的來歷。',
  '寫作習慣：比較「台／臺」、中英文之間有沒有空格、句尾的「以上。」。終端機紀錄裡有 grep 以上 的結果。',
  '最後一步：在「調查筆記」把排除的人劃掉，然後到「結案報告」指認。',
];

export function buildStatic({ caseDir, sitesCss, out, solution, pxlSize, socialSizes }) {
  const C = loadCase(caseDir, pxlSize);
  const root = join(out, 'static');
  const files = new Map();
  const put = (path, html) => files.set(path, html);

  /* ---------- page shell ---------- */
  const NAV = [['desk.html', '工作站'], ['chat.html', '通訊'], ['web/search.html', '瀏覽器'], ['files/index.html', '檔案'], ['photo.html', '照片'], ['terminal.html', '終端機紀錄'], ['notes.html', '調查筆記'], ['hints.html', '提示'], ['report.html', '結案報告']];
  const doc = ({ title, up, body, nav = true, here = '', cls = '' }) => `<!doctype html>
<html lang="zh-Hant-TW">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="referrer" content="no-referrer">
<title>${esc(title)} · 夜鷺事件</title>
<link rel="stylesheet" href="${up}static.css">
<link rel="stylesheet" href="${up}sites.css">
</head>
<body${cls ? ` class="${cls}"` : ''}>
${nav ? `<header class="top"><a class="brand" href="${up}desk.html">霧港工作站 <small>靜態版</small></a><nav aria-label="工作站">${NAV.map(([h, t]) => `<a href="${up}${h}"${h === here ? ' aria-current="page"' : ''}>${t}</a>`).join('')}</nav></header>` : ''}
<main class="main">
${body}
</main>
</body>
</html>
`;

  /* ---------- entry ---------- */
  put('index.html', doc({ title: '開始', up: '', nav: false, body: `<div class="cover">
  <p class="kicker">PRIVACY MYSTERY · CASE FILE 01</p>
  <h1>夜鷺事件</h1>
  <p class="lead">一張「已經關掉定位」的照片，能說出多少祕密？</p>
  <p>你是霧港隱私互助站的志工。今晚，一位吹哨者傳來了訊息。</p>
  <p><a class="go" href="intro/start.html#reply">打開加密訊息</a></p>
  <div class="aside">
    <p>這是不需要 JavaScript 的靜態版，給 Tor Browser「最安全」等級或停用 JavaScript 的瀏覽器使用。內容和互動版相同，但不會記錄你的進度，建議準備紙筆，或打開「調查筆記」頁一起使用。</p>
    <p>能執行 JavaScript 的話，可以玩<a href="../">互動版</a>。</p>
    <p><a href="../../">回到委託板</a>，看看其他案件。</p>
    <p>想離線或印出來玩：<a href="../night-heron.pdf" download="夜鷺事件.pdf">下載 PDF 版</a>（解答在最後幾頁，上下顛倒印刷）。</p>
  </div>
</div>` }));

  /* ---------- opening chat: one page per path through the conversation ---------- */
  const tm = count => '21:' + String(3 + Math.floor(count * 0.6)).padStart(2, '0');
  const bubbles = log => log.map(m => m.sys ? `<p class="sys">${esc(m.sys)}</p>` : m.file
    ? `<div class="filecard"><span class="fi">ZIP</span><span><b>${esc(m.file)}</b><br><small>48 KB · 加密傳送</small></span></div>`
    : `<div class="bub ${m.me ? 'me' : 'them'}">${esc(m.text)}<span class="tm">${m.tm}</span></div>`).join('');
  // Each reply loads a new page. Without JavaScript, two things keep the newest
  // messages in view: the log is a column-reverse scroller (it opens scrolled to the
  // bottom), and reply links carry #reply so small screens land on the replies.
  const chatPage = (id, log, actions) => put(`intro/${id}.html`, doc({ title: '加密通訊', up: '../', nav: false, cls: 'chat-page', body: `<section class="chat intro">
  <header class="chat-head"><b>夜鷺</b><span>端對端加密 · 安全碼已驗證</span></header>
  <div class="log"><div class="log-in">${bubbles([{ sys: '— 安全碼已驗證 · 訊息 24 小時後自動銷毀 —' }].concat(log))}</div></div>
  <div class="replies" id="reply">${actions}</div>
</section>` }));
  function walk(nodeId, log, id) {
    const node = C.INTRO[nodeId];
    const said = log.filter(m => !m.sys).length;
    const say = log.concat(node.msgs.map((text, i) => ({ text, tm: tm(said + i) })));
    if (node.file) {
      const withFile = say.concat({ file: '夜鷺匯出.zip' });
      chatPage(id, withFile, `<p class="label">按「接收」收下資料</p><a class="reply primary" href="${id}-f.html#reply">接收檔案</a>`);
      return walk(node.next, withFile.concat({ sys: '已接收 夜鷺匯出.zip · 解壓縮到 ~/夜鷺匯出' }), id + '-f');
    }
    if (node.end) {
      chatPage(id, say.concat({ sys: '— 委託成立 · 調查開始 —' }), `<a class="reply primary" href="../desk.html">開始調查</a>`);
      return;
    }
    if (node.choices) {
      chatPage(id, say, `<p class="label">選擇你的回覆</p>${node.choices.map(([text], i) => `<a class="reply" href="${id}-${i}.html#reply">${esc(text)}</a>`).join('')}`);
      node.choices.forEach(([text, next], i) => walk(next, say.concat({ text, me: true, tm: tm(say.filter(m => !m.sys).length) }), `${id}-${i}`));
      return;
    }
    walk(node.next, say, id);
  }
  walk('n1', [], 'start');

  /* ---------- workstation ---------- */
  const tiles = [
    ['chat.html', '通訊', '重讀夜鷺的委託，以及阿霧的建議。'],
    ['web/search.html', '瀏覽器', '霧搜、無名廣場、PicNote 和其他網站。'],
    ['files/index.html', '檔案', '夜鷺匯出的收件名單、差勤表、裝置登記與 Slack 紀錄。'],
    ['photo.html', '照片', '爆料附圖的原圖，可以放大和下載。'],
    ['terminal.html', '終端機紀錄', '調查員跑過的 exiftool 與 grep 指令和輸出。'],
    ['notes.html', '調查筆記', '可以印出來的排除表，用紙筆記錄。'],
    ['hints.html', '提示', '卡住的時候，一次打開一條。'],
    ['report.html', '結案報告', '對答案，然後指認夜鷺。'],
  ];
  put('desk.html', doc({ title: '工作站', up: '', here: 'desk.html', body: `<h1>今晚的任務</h1>
<ol class="mission"><li>讀夜鷺的訊息</li><li>找出照片洩漏了什麼</li><li>把 6 人縮到 1 人</li><li>交出結案報告</li></ol>
<div class="tiles">${tiles.map(([h, t, d]) => `<a class="tile" href="${h}"><b>${t}</b><span>${d}</span></a>`).join('')}</div>` }));

  put('chat.html', doc({ title: '通訊', up: '', here: 'chat.html', body: `<h1>通訊紀錄</h1>
<section class="chat"><header class="chat-head"><b>阿霧 · 互助站</b><span>內部頻道</span></header><div class="log">
${bubbles([
    { sys: '— 互助站內部頻道 —' },
    { tm: '21:18', text: '我是阿霧，今晚值班。夜鷺的案子你接了吧？' },
    { tm: '21:18', text: '建議順序：先去論壇拿到原始照片 → 看照片的中繼資料 → 對照夜鷺匯出的資料 → 放大照片找細節 → 交結案報告。' },
    { tm: '21:19', text: '卡住就去看「提示」頁。看越多提示，結案的自評就越低喔。' },
  ])}</div></section>
<h2>夜鷺說過的重點</h2>
<ul class="facts"><li>發文用全新 Email 註冊的帳號，沒有用公司網路。</li><li>拍備忘錄前，關掉了相機的「儲存位置資訊」，照片裡沒有 GPS。</li><li>備忘錄 9/11 只寄給 6 個人，夜鷺是其中之一。</li><li>匯出的公司資料在「檔案」；大家的 PicNote 是公開的；論壇那篇文還在。</li></ul>
<p><a href="intro/start.html#reply">重看一次開場對話</a></p>` }));

  /* ---------- in-game websites (crawled from the shared site pages) ---------- */
  const slugs = new Map();
  const queue = [];
  const makeSlug = url => {
    const [path, qs] = url.split('?');
    const q = qs ? decodeURIComponent((qs.match(/q=([^&]*)/) || [])[1] || '') : '';
    if (path.startsWith('mist.search')) return q ? 'search-' + short(q) : 'search';
    if (path === 'picnote.social/search') return 'picnote-search-' + short(q);
    if (path.startsWith('exifpeek.example')) return qs ? 'exifpeek-uploaded' : 'exifpeek';
    return path.replace(/\/$/, '').replace(/[^a-zA-Z0-9]+/g, '-');
  };
  const link = url => { if (!slugs.has(url)) { slugs.set(url, makeSlug(url)); queue.push(url); } return slugs.get(url) + '.html'; };
  let current = '';
  const queries = C.SEARCH_TIPS.concat(['EXIF 線上'], C.PEOPLE.map(p => p.name));
  const sites = C.makeSites({
    esc,
    searchTips: false, // the static search box already lists every keyword

    href: url => `href="${link(url)}"`,
    pin: () => '',
    asset: path => '../../assets/' + path,
    form: (base, v, cls, placeholder) => {
      const list = base.startsWith('picnote') ? C.PEOPLE.map(p => p.name) : queries;
      return `<div class="${cls} static-box"><span class="sq">${esc(v || placeholder)}</span></div><p class="static-tips">靜態版不能輸入文字，可以從這些關鍵字選：${list.map(q => `<a href="${link(base + encodeURIComponent(q))}">${esc(q)}</a>`).join('　')}</p>`;
    },
    thumb: (fn, inner) => `<a class="thumb" href="../photo.html" aria-label="查看附圖">${inner}</a>`,
    dl: (fn, kind, attrs, cls, path) => `<a class="${cls}" href="../../assets/${kind === 'pxl' ? fn : path}" download="${esc(fn)}">${kind === 'pxl' ? '下載原始檔' : '儲存圖片'}</a>`,
    upload: () => `<a class="site-btn" href="${link('exifpeek.example/?uploaded=1')}">上傳</a>`,
    state: () => ({ downloads: [C.PXL], uploaded: [], peekLast: current.includes('uploaded') ? C.PXL : '' }),
    afterUpload: () => `<div class="awu-note"><b>阿霧（互助站）傳來訊息</b><p>等一下，你剛把夜鷺的原始照片上傳到一個不明網站？</p><p>那個網站現在也有這張照片了，還記下了你的 IP 和上傳時間。要是公司的調查員也找上它……下次請用自己電腦上的工具查，例如 exiftool。</p><p>這次結案的自評要降一級。</p></div>`,
    pxlSize,
  });
  const BM = [['霧搜', 'mist.search'], ['無名廣場', 'wuming.forum'], ['PicNote', 'picnote.social'], ['TechWiki', 'techwiki.org/exif']];
  BM.forEach(([, u]) => link(u));
  while (queue.length) {
    current = queue.shift();
    const body = `<div class="browser"><div class="b-bar"><span class="b-lock">https://</span><span class="b-url">${esc(current)}</span></div><nav class="b-bm" aria-label="書籤">${BM.map(([t, u]) => `<a href="${link(u)}">${t}</a>`).join('')}</nav><div class="b-view">${sites.route(current)}</div></div>`;
    put('web/' + slugs.get(current) + '.html', doc({ title: current, up: '../', here: 'web/search.html', body }));
  }

  /* ---------- exported files ---------- */
  const COLOR = Object.fromEntries(C.PEOPLE.map(p => [p.name, p.color]));
  const fileList = Object.keys(RAW).map(n => [n, RAW[n], C.TEXTS[n]]).concat(Object.keys(C.SLACK).map(n => ['slack/' + n, n, C.SLACK[n]]));
  const render = (name, text) => {
    if (/\.csv$/.test(name)) {
      const lines = text.split('\n'), rows = lines.filter(l => !l.startsWith('#')).map(l => l.split(','));
      return `<div class="scroll"><table class="data"><tr>${rows[0].map(h => `<th>${esc(h)}</th>`).join('')}</tr>${rows.slice(1).map(r => `<tr>${r.map(x => `<td>${esc(x)}</td>`).join('')}</tr>`).join('')}</table></div>${lines.filter(l => l.startsWith('#')).map(l => `<p class="note">※ ${esc(l.slice(1).trim())}</p>`).join('')}`;
    }
    if (/\.log$/.test(name)) {
      const lines = text.split('\n');
      return `<p class="chan">${esc(lines[0])}</p>${lines.slice(1).map(l => {
        const m = l.match(/^\[(.+?)\] (.+?): (.*)$/); if (!m) return '';
        return `<div class="slk"><span class="av" style="background:${COLOR[m[2]] || '#555'}">${m[2][0]}</span><div><b>${esc(m[2])}</b> <small>${m[1]}</small><br>${esc(m[3])}</div></div>`;
      }).join('')}<p class="note">原文照錄，未修改任何標點與空格。</p>`;
    }
    return `<pre class="txt">${esc(text)}</pre>`;
  };
  const rawDir = join(root, 'files', 'raw');
  put('files/index.html', doc({ title: '檔案', up: '../', here: 'files/index.html', body: `<h1>~/夜鷺匯出</h1>
<p class="lead">夜鷺從公司系統匯出的資料。公司的調查員手上也有這些。</p>
<table class="data files"><tr><th>檔案</th><th>原始檔</th></tr>${fileList.map(([n, raw]) => `<tr><td><a href="${raw.replace(/\.\w+$/, '')}.html">${esc(n)}</a></td><td><a href="raw/${raw}" download="${esc(n.split('/').pop())}">下載</a></td></tr>`).join('')}</table>
<h2>~/Downloads</h2>
<p>從網站下載的照片會在這裡。爆料附圖在<a href="../photo.html">照片</a>頁。</p>` }));
  fileList.forEach(([n, raw, text]) => {
    mkdirSync(rawDir, { recursive: true });
    writeFileSync(join(rawDir, raw), text + '\n');
    put(`files/${raw.replace(/\.\w+$/, '')}.html`, doc({ title: n, up: '../', here: 'files/index.html', body: `<p class="crumb"><a href="index.html">~/夜鷺匯出</a> / ${esc(n)}</p><h1>${esc(n.split('/').pop())}</h1>${render(n, text)}<p><a href="raw/${raw}" download="${esc(n.split('/').pop())}">下載原始檔</a></p>` }));
  });

  /* ---------- the leaked photo ---------- */
  put('photo.html', doc({ title: '照片', up: '', here: 'photo.html', body: `<h1>${C.PXL}</h1>
<p class="lead">論壇附件的原始檔。<a href="../assets/${C.PXL}">開啟原圖</a>後，用瀏覽器放大（Ctrl 或 ⌘ 加 +），仔細看畫面的每個角落。</p>
<a class="photo" href="../assets/${C.PXL}"><img src="../assets/${C.PXL}" alt="爆料附圖：飯店書桌上的筆電，螢幕顯示心跳鳥科技的內部備忘錄"></a>
<div class="cols">
<section><h2>檔案</h2><dl class="kv"><dt>尺寸</dt><dd>4080 × 3072</dd><dt>檔案大小</dt><dd>${pxlSize}</dd></dl></section>
<section><h2>相機資訊</h2><dl class="kv">${C.CAMERA_INFO.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl><p class="note">這裡只列出常見欄位，就像電腦「內容」視窗裡看到的一樣，有些欄位不會顯示。完整的中繼資料請看<a href="terminal.html">終端機紀錄</a>。</p></section>
</div>
<p><a class="go" href="../assets/${C.PXL}" download>下載原始檔</a> 它是真的 JPEG，可以用你自己的工具檢查。</p>` }));

  /* ---------- terminal transcript ---------- */
  const row = ([k, v]) => `${k.padEnd(32)}: ${v}`;
  const grep = pat => Object.entries(C.SLACK).flatMap(([f, t]) => t.split('\n').filter(l => l.includes(pat)).map(l => `slack/${f}:${l}`)).join('\n');
  const social = C.PIC['jiahao.chang'].posts[1];
  const socialName = C.socialFile(social, 'jiahao.chang');
  const cmds = [
    ['~', 'ls Downloads', [C.PXL, socialName].join('    ')],
    ['~/Downloads', `exiftool ${C.PXL}`, C.EXIF_PXL.map(row).join('\n') + '\n' + C.EXIF_PXL_NOTE],
    ['~/Downloads', `exiftool ${socialName}`, C.EXIF_SOCIAL(socialName, socialSizes[social.img]).map(row).join('\n') + '\n' + C.EXIF_SOCIAL_NOTE],
    ['~/夜鷺匯出', 'grep Pixel slack/*.log', grep('Pixel')],
    ['~/夜鷺匯出', 'grep 以上 slack/*.log', grep('以上')],
  ];
  put('terminal.html', doc({ title: '終端機紀錄', up: '', here: 'terminal.html', body: `<h1>終端機紀錄</h1>
<p class="lead">調查員在工作站上跑過的指令。點一下指令，就像按下 Enter，會展開它的輸出。</p>
<div class="term">${cmds.map(([cwd, cmd, output]) => `<details><summary><span class="p">investigator@mistport</span>:<span class="k">${esc(cwd)}</span>$ ${esc(cmd)}</summary><pre>${esc(output)}</pre></details>`).join('')}</div>
<p class="note">會用終端機的話，可以在<a href="photo.html">照片</a>頁下載原始檔，在自己的電腦上執行 <code>exiftool</code> 驗證；Slack 紀錄的原始檔在<a href="files/index.html">檔案</a>頁。</p>` }));

  /* ---------- notes, hints, report ---------- */
  put('notes.html', doc({ title: '調查筆記', up: '', here: 'notes.html', body: `<h1>調查筆記</h1>
<p class="lead">靜態版不會記錄進度。把這頁印出來，或抄在紙上：符合打 ○，排除打 ✕。</p>
<div class="scroll"><table class="data grid"><tr><th>線索</th>${C.PEOPLE.map(p => `<th>${p.name}</th>`).join('')}</tr>${['收到備忘錄', '時區 +09:00', '手機型號', '照片畫面', '寫作風格'].map((r, i) => `<tr><td>${r}</td>${C.PEOPLE.map(() => `<td>${i === 0 ? '○' : ''}</td>`).join('')}</tr>`).join('')}</table></div>
<h2>嫌疑人</h2><ul class="people">${C.PEOPLE.map(p => `<li><b>${p.name}</b>　${p.role}</li>`).join('')}</ul>` }));

  put('hints.html', doc({ title: '提示', up: '', here: 'hints.html', body: `<h1>提示</h1>
<p class="lead">卡住再看，一次打開一條。記下你看了幾條，結案時自評會用到。</p>
${HINTS.map((h, i) => `<details class="hint"><summary>提示 ${i + 1}</summary><p>${esc(h)}</p></details>`).join('')}` }));

  const opts = list => `<ul class="opts">${list.map(([, l]) => `<li>${l}</li>`).join('')}</ul>`;
  put('report.html', doc({ title: '結案報告', up: '', here: 'report.html', body: `<h1>結案報告</h1>
<p class="lead">先在心裡或紙上作答，再打開「對答案」。</p>
<section class="q"><h2>1. 照片的中繼資料洩漏了哪些資訊？（複選）</h2>${opts(C.Q1)}<details><summary>對答案</summary><p>手機型號與拍攝時區。夜鷺確實關掉了 GPS，照片裡也沒有拍攝者姓名；拍攝時間有記錄，但不是關鍵。</p></details></section>
<section class="q"><h2>2. 照片畫面本身洩漏了什麼？（複選）</h2>${opts(C.Q2)}<details><summary>對答案</summary><p>飯店便條紙與筆電上的貼紙。</p></details></section>
<section class="q"><h2>3. 爆料文的文字洩漏了什麼？</h2>${opts(C.Q3)}<details><summary>對答案</summary><p>用字與標點習慣。夜鷺用了新帳號、沒用公司網路，剩下能出賣人的是寫作風格。</p></details></section>
<section class="q"><h2>4. 夜鷺是誰？</h2><p>想好了就點名字。指認錯的話，夜鷺會告訴你。</p><div class="accuse">${C.PEOPLE.map(p => `<a href="${accuseSlug(p.name)}">${p.name}<small>${p.role}</small></a>`).join('')}</div></section>` }));

  const culprit = (solution.match(/<h2 class="sol-title">夜鷺是(.+?)<\/h2>/) || [])[1];
  if (!culprit) throw new Error('solution has no culprit title');
  const selfRank = `<div class="rank"><b>自評</b><ul><li>沒看提示、一次就指認正確：<b>洋蔥首席調查員</b></li><li>看了 3 條以內的提示、誤判 1 次以內：<b>資深隱私志工</b></li><li>其他：<b>見習調查員</b></li></ul><p>如果把原始照片上傳到線上 EXIF 工具，再降一級。</p></div>`;
  C.PEOPLE.forEach(p => {
    const right = p.name === culprit;
    put(accuseSlug(p.name), doc({ title: right ? '結案' : '指認', up: '../', here: 'report.html', body: right
      ? `<section class="chat"><div class="log"><div class="bub them">……你找到我了。謝謝你比他們早一步。我會照你的建議處理。<span class="tm">夜鷺</span></div></div></section><div class="sol">${solution.replace('<h3>', selfRank + '<h3>')}</div>`
      : `<section class="chat"><div class="log"><div class="bub them">我讀了你的報告……不是那個人。但公司的調查員也可能這樣誤判，冤枉一個無辜的同事。可以再查一次嗎？<span class="tm">夜鷺</span></div></div></section><p><a class="go" href="../report.html">回到結案報告</a></p>` }));
  });

  /* ---------- write ---------- */
  for (const [path, html] of files) {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), html);
  }
  writeFileSync(join(root, 'sites.css'), sitesCss);
  cpSync(join(caseDir, 'static.css'), join(root, 'static.css'));
  return files.size;
}
