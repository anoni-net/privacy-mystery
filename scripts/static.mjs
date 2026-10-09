// Static version: plain HTML and CSS, no JavaScript and no SVG, for Tor Browser's
// "Safest" security level. Generated from the same case data as the interactive page,
// in each language the case has (lang: 'zh' or 'en').
import { writeFileSync, mkdirSync, cpSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { loadCase, esc } from './case-data.mjs';
import { iconTags, ogTags, SITE_NAME } from './meta.mjs';

const short = s => createHash('sha256').update(s).digest('hex').slice(0, 10);
// Accusation pages are named by hash of each suspect's key, so a URL never reveals who is right.
const accuseSlug = key => 'accuse/' + createHash('sha256').update('night-heron:' + key).digest('hex').slice(0, 12) + '.html';
// Download names for the exported files (ASCII, so every server serves them)
const RAW = { recipients: 'recipients.txt', profiles: 'profiles.txt', attendance: 'attendance_0912-0916.csv', byod: 'byod_202603.csv' };

const T = {
  zh: {
    lang: 'zh-Hant-TW', title: '夜鷺事件', station: '霧港工作站', staticTag: '靜態版', navLabel: '工作站',
    nav: ['工作站', '通訊', '瀏覽器', '檔案', '照片', '終端機紀錄', '調查筆記', '提示', '結案報告'],
    start: '開始', lead: '一張「已經關掉定位」的照片，能說出多少祕密？', intro: '你是霧港隱私互助站的志工。今晚，一位吹哨者傳來了訊息。', open: '打開加密訊息',
    aside: ['這是不需要 JavaScript 的靜態版，給 Tor Browser「最安全」等級或停用 JavaScript 的瀏覽器使用。內容和互動版相同，但不會記錄你的進度，建議準備紙筆，或打開「調查筆記」頁一起使用。',
      '能執行 JavaScript 的話，可以玩<a href="../">互動版</a>。', '<a href="../../">回到委託板</a>，看看其他案件。',
      '想離線或印出來玩：<a href="../night-heron.pdf" download="夜鷺事件.pdf">下載 PDF 版</a>（解答在最後幾頁，上下顛倒印刷）。',
      '<a href="../../en/night-heron/static/" lang="en">English</a>'],
    chat: '加密通訊', yelu: '夜鷺', e2e: '端對端加密 · 安全碼已驗證', opening: '— 安全碼已驗證 · 訊息 24 小時後自動銷毀 —',
    zip: '夜鷺匯出.zip', zipMeta: '48 KB · 加密傳送', acceptHint: '按「接收」收下資料', accept: '接收檔案', received: '已接收 夜鷺匯出.zip · 解壓縮到 ~/夜鷺匯出',
    caseOpen: '— 委託成立 · 調查開始 —', begin: '開始調查', choose: '選擇你的回覆',
    tiles: [['通訊', '重讀夜鷺的委託，以及阿霧的建議。'], ['瀏覽器', '霧搜、無名廣場、PicNote 和其他網站。'], ['檔案', '夜鷺匯出的收件名單、差勤表、裝置登記與 Slack 紀錄。'], ['照片', '爆料附圖的原圖，可以放大和下載。'], ['終端機紀錄', '調查員跑過的 exiftool 與 grep 指令和輸出。'], ['調查筆記', '可以印出來的排除表，用紙筆記錄。'], ['提示', '卡住的時候，一次打開一條。'], ['結案報告', '對答案，然後指認夜鷺。']],
    mission: '今晚的任務', missionItems: ['讀夜鷺的訊息', '找出照片洩漏了什麼', '把 6 人縮到 1 人', '交出結案報告'],
    chatLog: '通訊紀錄', awu: '阿霧 · 互助站', internal: '內部頻道', awuSys: '— 互助站內部頻道 —',
    awuMsgs: ['我是阿霧，今晚值班。夜鷺的案子你接了吧？', '建議順序：先去論壇拿到原始照片 → 看照片的中繼資料 → 對照夜鷺匯出的資料 → 放大照片找細節 → 交結案報告。', '卡住就去看「提示」頁。看越多提示，結案的自評就越低喔。'],
    facts: '夜鷺說過的重點', factItems: ['發文用全新 Email 註冊的帳號，沒有用公司網路。', '拍備忘錄前，關掉了相機的「儲存位置資訊」，照片裡沒有 GPS。', '備忘錄 9/11 只寄給 6 個人，夜鷺是其中之一。', '匯出的公司資料在「檔案」；大家的 PicNote 是公開的；論壇那篇文還在。'],
    replay: '重看一次開場對話',
    staticTips: '靜態版不能輸入文字，可以從這些關鍵字選：', extraQuery: 'EXIF 線上', viewAttachment: '查看附圖', dlOriginal: '下載原始檔', saveImage: '儲存圖片', upload: '上傳', bookmarks: '書籤',
    trapTitle: '阿霧（互助站）傳來訊息', trap: ['等一下，你剛把夜鷺的原始照片上傳到一個不明網站？', '那個網站現在也有這張照片了，還記下了你的 IP 和上傳時間。要是公司的調查員也找上它……下次請用自己電腦上的工具查，例如 exiftool。', '這次結案的自評要降一級。'],
    verbatim: '原文照錄，未修改任何標點與空格。', files: '檔案', filesLead: '夜鷺從公司系統匯出的資料。公司的調查員手上也有這些。', fileCol: '檔案', rawCol: '原始檔', download: '下載',
    downloadsNote: '從網站下載的照片會在這裡。爆料附圖在<a href="../photo.html">照片</a>頁。', downloadRaw: '下載原始檔',
    photo: '照片', photoLead: c => `論壇附件的原始檔。<a href="../assets/${c}">開啟原圖</a>後，用瀏覽器放大（Ctrl 或 ⌘ 加 +），仔細看畫面的每個角落。`,
    photoAlt: '爆料附圖：飯店書桌上的筆電，螢幕顯示心跳鳥科技的內部備忘錄', fileSec: '檔案', dims: '尺寸', size: '檔案大小', camera: '相機資訊',
    cameraNote: '這裡只列出常見欄位，就像電腦「內容」視窗裡看到的一樣，有些欄位不會顯示。完整的中繼資料請看<a href="terminal.html">終端機紀錄</a>。', realJpeg: '它是真的 JPEG，可以用你自己的工具檢查。',
    terminal: '終端機紀錄', terminalLead: '調查員在工作站上跑過的指令。點一下指令，就像按下 Enter，會展開它的輸出。',
    terminalNote: '會用終端機的話，可以在<a href="photo.html">照片</a>頁下載原始檔，在自己的電腦上執行 <code>exiftool</code> 驗證；Slack 紀錄的原始檔在<a href="files/index.html">檔案</a>頁。',
    notes: '調查筆記', notesLead: '靜態版不會記錄進度。把這頁印出來，或抄在紙上：符合打 ○，排除打 ✕。', clue: '線索', clueRows: ['收到備忘錄', '時區 +09:00', '手機型號', '照片畫面', '寫作風格'], suspects: '嫌疑人', sep: '　',
    hints: '提示', hintsLead: '卡住再看，一次打開一條。記下你看了幾條，結案時自評會用到。', hint: n => `提示 ${n}`,
    hintList: ['先到「瀏覽器」裡的無名廣場，把爆料文附件的原始檔下載下來。', '照片的完整中繼資料，可以看「終端機紀錄」裡 exiftool 的輸出。會用指令的人，也可以下載原始檔，在自己的電腦上執行 exiftool。', '時區 +09:00 是哪裡？在霧搜查「時區」，再對照「檔案」裡的差勤表。新加坡要小心。', '手機型號要對照 BYOD 登記表，但那是三月的資料。看看 Slack 紀錄的 random 頻道，或 PicNote 上大家最近的貼文。', '打開「照片」頁的原圖，用瀏覽器放大（Ctrl 或 ⌘ 加 +），仔細看左下角和觸控板右側。', '那張貼紙和筆電的顏色，在 Slack 紀錄和 PicNote 的貼文裡都找得到對應。霧搜也查得到貼紙的來歷。', '寫作習慣：比較「台／臺」、中英文之間有沒有空格、句尾的「以上。」。終端機紀錄裡有 grep 以上 的結果。', '最後一步：在「調查筆記」把排除的人劃掉，然後到「結案報告」指認。'],
    report: '結案報告', reportLead: '先在心裡或紙上作答，再打開「對答案」。', check: '對答案',
    q: ['1. 照片的中繼資料洩漏了哪些資訊？（複選）', '2. 照片畫面本身洩漏了什麼？（複選）', '3. 爆料文的文字洩漏了什麼？', '4. 夜鷺是誰？'],
    a: ['手機型號與拍攝時區。夜鷺確實關掉了 GPS，照片裡也沒有拍攝者姓名；拍攝時間有記錄，但不是關鍵。', '飯店便條紙與筆電上的貼紙。', '用字與標點習慣。夜鷺用了新帳號、沒用公司網路，剩下能出賣人的是寫作風格。'],
    accuseLead: '想好了就點名字。指認錯的話，夜鷺會告訴你。', closed: '結案', accused: '指認',
    selfRank: '<div class="rank"><b>自評</b><ul><li>沒看提示、一次就指認正確：<b>洋蔥首席調查員</b></li><li>看了 3 條以內的提示、誤判 1 次以內：<b>資深隱私志工</b></li><li>其他：<b>見習調查員</b></li></ul><p>如果把原始照片上傳到線上 EXIF 工具，再降一級。</p></div>',
    solved: '……你找到我了。謝謝你比他們早一步。我會照你的建議處理。', wrong: '我讀了你的報告……不是那個人。但公司的調查員也可能這樣誤判，冤枉一個無辜的同事。可以再查一次嗎？', backToReport: '回到結案報告',
  },
  en: {
    lang: 'en', title: 'Night Heron', station: 'Mistport Workstation', staticTag: 'static', navLabel: 'Workstation',
    nav: ['Workstation', 'Chat', 'Browser', 'Files', 'Photo', 'Terminal log', 'Notes', 'Hints', 'Case report'],
    start: 'Start', lead: 'A photo with “location turned off”. How many secrets can it still tell?', intro: 'You volunteer at the Mistport Privacy Aid. Tonight, a whistleblower has sent you a message.', open: 'Open the encrypted message',
    aside: ['This is the static version: no JavaScript needed, for Tor Browser’s “Safest” level or browsers with JavaScript off. It has the same case as the interactive version but doesn’t save your progress, so keep pen and paper handy, or use the Notes page.',
      'If your browser runs JavaScript, try the <a href="../">interactive version</a>.', '<a href="../../">Back to the case board</a> for other cases.',
      'To play offline or on paper: <a href="../night-heron.pdf" download="night-heron.pdf">download the PDF</a> (solution on the last pages, printed upside down).',
      '<a href="../../../night-heron/static/" lang="zh-Hant-TW">中文</a>'],
    chat: 'Secure chat', yelu: 'Night Heron', e2e: 'End-to-end encrypted · safety number verified', opening: '— Safety number verified · messages disappear after 24 hours —',
    zip: 'heron-export.zip', zipMeta: '48 KB · sent encrypted', acceptHint: 'Tap “Accept” to receive the files', accept: 'Accept the file', received: 'Received heron-export.zip · unpacked to ~/heron-export',
    caseOpen: '— Case accepted · investigation open —', begin: 'Start investigating', choose: 'Choose your reply',
    tiles: [['Chat', 'Reread Night Heron’s request and Fog’s advice.'], ['Browser', 'MistSearch, Nameless Square, PicNote and other sites.'], ['Files', 'Night Heron’s export: recipients, attendance, device register and Slack logs.'], ['Photo', 'The leaked photo in full resolution, to zoom and download.'], ['Terminal log', 'The exiftool and grep commands the investigator ran, with output.'], ['Notes', 'A printable elimination grid for pen and paper.'], ['Hints', 'When you’re stuck, open one at a time.'], ['Case report', 'Check your answers, then name Night Heron.']],
    mission: 'Tonight’s job', missionItems: ['Read Night Heron’s messages', 'Find what the photo gave away', 'Narrow six people to one', 'File the case report'],
    chatLog: 'Messages', awu: 'Fog · Mistport Aid', internal: 'internal channel', awuSys: '— Mistport Privacy Aid · internal channel —',
    awuMsgs: ["I'm Fog, on duty tonight. You've taken the Night Heron case?", 'Suggested order: get the original photo from the forum → read its metadata → check it against Night Heron’s export → zoom into the photo for details → file the case report.', 'Stuck? Open the Hints page. The more hints you read, the lower your self-assessed rank.'],
    facts: 'What Night Heron told you', factItems: ['Posted from an account registered with a brand-new email, not on the company network.', 'Turned off the camera’s “save location” before photographing the memo: no GPS in the photo.', 'The memo went to only six people on 9/11; Night Heron is one of them.', 'The company export is under Files; everyone’s PicNote is public; the forum post is still up.'],
    replay: 'Replay the opening conversation',
    staticTips: 'The static version can’t take typing; pick one of these searches: ', extraQuery: 'EXIF online', viewAttachment: 'View the attachment', dlOriginal: 'Download original', saveImage: 'Save image', upload: 'Upload', bookmarks: 'Bookmarks',
    trapTitle: 'Message from Fog (Mistport Aid)', trap: ['Wait. Did you just upload Night Heron’s original photo to some website?', "That site has the photo now, along with your IP address and the upload time. If the company's investigators find it too… Next time, check it with a tool on your own computer, like exiftool.", 'Lower your self-assessed rank by one level for this case.'],
    verbatim: 'Quoted as written; punctuation and spacing are untouched.', files: 'Files', filesLead: 'Night Heron’s export from the company systems. The company’s investigators have all of this too.', fileCol: 'File', rawCol: 'Original', download: 'Download',
    downloadsNote: 'Photos you download from websites go here. The leaked photo is on the <a href="../photo.html">Photo</a> page.', downloadRaw: 'Download the original file',
    photo: 'Photo', photoLead: c => `The forum attachment, as uploaded. <a href="../assets/${c}">Open the full image</a> and zoom in with your browser (Ctrl or ⌘ and +) to check every corner.`,
    photoAlt: 'The leaked photo: a laptop on a hotel desk showing a BeatBird internal memo (in Chinese)', fileSec: 'File', dims: 'Dimensions', size: 'Size', camera: 'Camera',
    cameraNote: 'Only common fields are listed, as in a computer’s file-properties window; some are left out. For the full metadata, see the <a href="terminal.html">terminal log</a>.', realJpeg: 'It’s a real JPEG; check it with your own tools.',
    terminal: 'Terminal log', terminalLead: 'Commands the investigator ran on the workstation. Click a command, as if pressing Enter, to see its output.',
    terminalNote: 'If you use a terminal, download the original on the <a href="photo.html">Photo</a> page and run <code>exiftool</code> on your own computer; the raw Slack logs are on the <a href="files/index.html">Files</a> page.',
    notes: 'Notes', notesLead: 'The static version doesn’t save progress. Print this page or copy it onto paper: ○ if they fit, ✕ to rule them out.', clue: 'Clue', clueRows: ['Received the memo', 'Time zone +09:00', 'Phone model', 'In the picture', 'Writing style'], suspects: 'Suspects', sep: ' · ',
    hints: 'Hints', hintsLead: 'Open them only when stuck, one at a time, and keep count for your self-assessment.', hint: n => `Hint ${n}`,
    hintList: ['In the Browser, go to Nameless Square and download the original attachment from the leak post.', 'For the photo’s full metadata, see the exiftool output in the Terminal log. If you use a terminal, download the original and run exiftool yourself.', 'Where is +09:00? Search MistSearch for “time zone”, then check the attendance sheet under Files. Careful with Singapore.', 'Check the phone model against the BYOD register, but it dates from March. Look at the #random Slack log, or people’s recent PicNote posts.', 'Open the full image on the Photo page and zoom in with your browser (Ctrl or ⌘ and +). Look closely at the bottom left and right of the trackpad.', 'The sticker and the laptop’s colour both turn up in the Slack logs and on PicNote. MistSearch can tell you where the sticker comes from.', "Writing habits: compare British and American spelling (colour or color, realise or realize), the quote marks, and the sign-off \"That's all.\" The terminal log has a grep for it.", 'Last step: cross out who you’ve ruled out on the Notes page, then name your suspect in the Case report.'],
    report: 'Case report', reportLead: 'Answer in your head or on paper first, then open “Check”.', check: 'Check',
    q: ['1. What did the photo’s metadata give away? (choose all that apply)', '2. What did the picture itself give away? (choose all that apply)', '3. What did the post’s writing give away?', '4. Who is Night Heron?'],
    a: ['The phone model and the time zone. Night Heron really did turn off GPS, and the photo has no name in it; the time is recorded but isn’t the key.', 'The hotel notepad and the sticker on the laptop.', 'Spelling and punctuation habits. Night Heron used a new account and avoided the company network, so what was left to give them away was their writing.'],
    accuseLead: 'When you’re sure, click a name. If you’re wrong, Night Heron will tell you.', closed: 'Case closed', accused: 'Accusation',
    selfRank: '<div class="rank"><b>Rate yourself</b><ul><li>No hints, right first time: <b>Chief Onion Investigator</b></li><li>Three hints or fewer, at most one wrong guess: <b>Senior Privacy Volunteer</b></li><li>Otherwise: <b>Trainee Investigator</b></li></ul><p>If you uploaded the original photo to an online EXIF tool, drop one level.</p></div>',
    solved: '…You found me. Thank you for getting there before they did. I’ll do what you suggest.', wrong: 'I read your report… it isn’t them. But the company’s investigators could make the same mistake and blame an innocent colleague. Can you look again?', backToReport: 'Back to the case report',
  },
};

export function buildStatic({ caseDir, sitesCss, out, solution, pxlSize, socialSizes, lang = 'zh' }) {
  const C = loadCase(caseDir, pxlSize, lang);
  const L = T[lang];
  const root = join(out, 'static');
  const files = new Map();
  const put = (path, html) => files.set(path, html);
  const EXPORT = '~/' + C.EXPORT_DIR;

  /* ---------- page shell ---------- */
  const NAV = ['desk.html', 'chat.html', 'web/search.html', 'files/index.html', 'photo.html', 'terminal.html', 'notes.html', 'hints.html', 'report.html'].map((h, i) => [h, L.nav[i]]);
  // static/ sits in the case folder, which sits in the language folder (en/ for English)
  const toRoot = up => up + '../../' + (lang === 'zh' ? '' : '../');
  const casePath = (lang === 'zh' ? '' : lang + '/') + JSON.parse(readFileSync(join(caseDir, 'case.json'), 'utf8')).slug + '/';
  const doc = ({ title, up, body, nav = true, here = '', cls = '', og = false }) => `<!doctype html>
<html lang="${L.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="referrer" content="no-referrer">
<title>${esc(title)} · ${L.title}</title>
${iconTags(toRoot(up))}${og ? '\n' + ogTags({ lang, siteName: SITE_NAME[lang], title: `${L.title} · ${L.staticTag}`, desc: L.lead, path: casePath + 'static/', image: casePath + 'og.png' }) : ''}
<link rel="stylesheet" href="${up}static.css">
<link rel="stylesheet" href="${up}sites.css">
</head>
<body${cls ? ` class="${cls}"` : ''}>
${nav ? `<header class="top"><a class="brand" href="${up}desk.html">${L.station} <small>${L.staticTag}</small></a><nav aria-label="${L.navLabel}">${NAV.map(([h, t]) => `<a href="${up}${h}"${h === here ? ' aria-current="page"' : ''}>${t}</a>`).join('')}</nav></header>` : ''}
<main class="main">
${body}
</main>
</body>
</html>
`;

  /* ---------- entry ---------- */
  put('index.html', doc({ title: L.start, up: '', nav: false, og: true, body: `<div class="cover">
  <p class="kicker">PRIVACY MYSTERY · CASE FILE 01</p>
  <h1>${L.title}</h1>
  <p class="lead">${L.lead}</p>
  <p>${L.intro}</p>
  <p><a class="go" href="intro/start.html#reply">${L.open}</a></p>
  <div class="aside">
    ${L.aside.map(p => `<p>${p}</p>`).join('\n    ')}
  </div>
</div>` }));

  /* ---------- opening chat: one page per path through the conversation ---------- */
  const tm = count => '21:' + String(3 + Math.floor(count * 0.6)).padStart(2, '0');
  const bubbles = log => log.map(m => m.sys ? `<p class="sys">${esc(m.sys)}</p>` : m.file
    ? `<div class="filecard"><span class="fi">ZIP</span><span><b>${esc(m.file)}</b><br><small>${L.zipMeta}</small></span></div>`
    : `<div class="bub ${m.me ? 'me' : 'them'}">${esc(m.text)}<span class="tm">${m.tm}</span></div>`).join('');
  // Each reply loads a new page. Without JavaScript, two things keep the newest
  // messages in view: the log is a column-reverse scroller (it opens scrolled to the
  // bottom), and reply links carry #reply so small screens land on the replies.
  const chatPage = (id, log, actions) => put(`intro/${id}.html`, doc({ title: L.chat, up: '../', nav: false, cls: 'chat-page', body: `<section class="chat intro">
  <header class="chat-head"><b>${L.yelu}</b><span>${L.e2e}</span></header>
  <div class="log"><div class="log-in">${bubbles([{ sys: L.opening }].concat(log))}</div></div>
  <div class="replies" id="reply">${actions}</div>
</section>` }));
  function walk(nodeId, log, id) {
    const node = C.INTRO[nodeId];
    const said = log.filter(m => !m.sys).length;
    const say = log.concat(node.msgs.map((text, i) => ({ text, tm: tm(said + i) })));
    if (node.file) {
      const withFile = say.concat({ file: L.zip });
      chatPage(id, withFile, `<p class="label">${L.acceptHint}</p><a class="reply primary" href="${id}-f.html#reply">${L.accept}</a>`);
      return walk(node.next, withFile.concat({ sys: L.received }), id + '-f');
    }
    if (node.end) {
      chatPage(id, say.concat({ sys: L.caseOpen }), `<a class="reply primary" href="../desk.html">${L.begin}</a>`);
      return;
    }
    if (node.choices) {
      chatPage(id, say, `<p class="label">${L.choose}</p>${node.choices.map(([text], i) => `<a class="reply" href="${id}-${i}.html#reply">${esc(text)}</a>`).join('')}`);
      node.choices.forEach(([text, next], i) => walk(next, say.concat({ text, me: true, tm: tm(say.filter(m => !m.sys).length) }), `${id}-${i}`));
      return;
    }
    walk(node.next, say, id);
  }
  walk('n1', [], 'start');

  /* ---------- workstation ---------- */
  const tileLinks = ['chat.html', 'web/search.html', 'files/index.html', 'photo.html', 'terminal.html', 'notes.html', 'hints.html', 'report.html'];
  put('desk.html', doc({ title: L.nav[0], up: '', here: 'desk.html', body: `<h1>${L.mission}</h1>
<ol class="mission">${L.missionItems.map(m => `<li>${m}</li>`).join('')}</ol>
<div class="tiles">${L.tiles.map(([t, d], i) => `<a class="tile" href="${tileLinks[i]}"><b>${t}</b><span>${d}</span></a>`).join('')}</div>` }));

  put('chat.html', doc({ title: L.nav[1], up: '', here: 'chat.html', body: `<h1>${L.chatLog}</h1>
<section class="chat"><header class="chat-head"><b>${L.awu}</b><span>${L.internal}</span></header><div class="log">
${bubbles([{ sys: L.awuSys }].concat(L.awuMsgs.map((text, i) => ({ tm: i ? '21:19' : '21:18', text }))))}</div></section>
<h2>${L.facts}</h2>
<ul class="facts">${L.factItems.map(f => `<li>${f}</li>`).join('')}</ul>
<p><a href="intro/start.html#reply">${L.replay}</a></p>` }));

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
  const queries = C.SEARCH_TIPS.concat([L.extraQuery], C.PEOPLE.map(p => p.name));
  const sites = C.makeSites({
    esc,
    searchTips: false, // the static search box already lists every keyword
    href: url => `href="${link(url)}"`,
    pin: () => '',
    asset: path => '../../assets/' + path,
    form: (base, v, cls, placeholder) => {
      const list = base.startsWith('picnote') ? C.PEOPLE.map(p => p.name) : queries;
      return `<div class="${cls} static-box"><span class="sq">${esc(v || placeholder)}</span></div><p class="static-tips">${L.staticTips}${list.map(q => `<a href="${link(base + encodeURIComponent(q))}">${esc(q)}</a>`).join(L.sep)}</p>`;
    },
    thumb: (fn, inner) => `<a class="thumb" href="../photo.html" aria-label="${L.viewAttachment}">${inner}</a>`,
    dl: (fn, kind, attrs, cls, path) => `<a class="${cls}" href="../../assets/${kind === 'pxl' ? fn : path}" download="${esc(fn)}">${kind === 'pxl' ? L.dlOriginal : L.saveImage}</a>`,
    upload: () => `<a class="site-btn" href="${link('exifpeek.example/?uploaded=1')}">${L.upload}</a>`,
    state: () => ({ downloads: [C.PXL], uploaded: [], peekLast: current.includes('uploaded') ? C.PXL : '' }),
    afterUpload: () => `<div class="awu-note"><b>${L.trapTitle}</b>${L.trap.map(p => `<p>${p}</p>`).join('')}</div>`,
    pxlSize,
  });
  const BM = C.BOOKMARKS;
  BM.forEach(([, u]) => link(u));
  while (queue.length) {
    current = queue.shift();
    const body = `<div class="browser"><div class="b-bar"><span class="b-lock">https://</span><span class="b-url">${esc(current)}</span></div><nav class="b-bm" aria-label="${L.bookmarks}">${BM.map(([t, u]) => `<a href="${link(u)}">${t}</a>`).join('')}</nav><div class="b-view">${sites.route(current)}</div></div>`;
    put('web/' + slugs.get(current) + '.html', doc({ title: current, up: '../', here: 'web/search.html', body }));
  }

  /* ---------- exported files ---------- */
  const COLOR = Object.fromEntries(C.PEOPLE.map(p => [p.name, p.color]));
  const fileList = Object.entries(C.FILE_KEYS).map(([k, n]) => [n, RAW[k], C.TEXTS[n]]).concat(Object.keys(C.SLACK).map(n => ['slack/' + n, n, C.SLACK[n]]));
  const render = (name, text) => {
    if (/\.csv$/.test(name)) {
      const lines = text.split('\n'), rows = lines.filter(l => !l.startsWith('#')).map(l => l.split(','));
      return `<div class="scroll"><table class="data"><tr>${rows[0].map(h => `<th>${esc(h)}</th>`).join('')}</tr>${rows.slice(1).map(r => `<tr>${r.map(x => `<td>${esc(x)}</td>`).join('')}</tr>`).join('')}</table></div>${lines.filter(l => l.startsWith('#')).map(l => `<p class="note">※ ${esc(l.slice(1).trim())}</p>`).join('')}`;
    }
    if (/\.log$/.test(name)) {
      const lines = text.split('\n');
      return `<p class="chan">${esc(lines[0])}</p>${lines.slice(1).map(l => {
        const m = l.match(/^\[(.+?)\] (.+?): (.*)$/); if (!m) return '';
        return `<div class="slk"><span class="av" style="background:${COLOR[m[2]] || '#555'}">${C.INITIAL(m[2])}</span><div><b>${esc(m[2])}</b> <small>${m[1]}</small><br>${esc(m[3])}</div></div>`;
      }).join('')}<p class="note">${L.verbatim}</p>`;
    }
    return `<pre class="txt">${esc(text)}</pre>`;
  };
  const rawDir = join(root, 'files', 'raw');
  put('files/index.html', doc({ title: L.files, up: '../', here: 'files/index.html', body: `<h1>${esc(EXPORT)}</h1>
<p class="lead">${L.filesLead}</p>
<table class="data files"><tr><th>${L.fileCol}</th><th>${L.rawCol}</th></tr>${fileList.map(([n, raw]) => `<tr><td><a href="${raw.replace(/\.\w+$/, '')}.html">${esc(n)}</a></td><td><a href="raw/${raw}" download="${esc(n.split('/').pop())}">${L.download}</a></td></tr>`).join('')}</table>
<h2>~/Downloads</h2>
<p>${L.downloadsNote}</p>` }));
  fileList.forEach(([n, raw, text]) => {
    mkdirSync(rawDir, { recursive: true });
    writeFileSync(join(rawDir, raw), text + '\n');
    put(`files/${raw.replace(/\.\w+$/, '')}.html`, doc({ title: n, up: '../', here: 'files/index.html', body: `<p class="crumb"><a href="index.html">${esc(EXPORT)}</a> / ${esc(n)}</p><h1>${esc(n.split('/').pop())}</h1>${render(n, text)}<p><a href="raw/${raw}" download="${esc(n.split('/').pop())}">${L.downloadRaw}</a></p>` }));
  });

  /* ---------- the leaked photo ---------- */
  put('photo.html', doc({ title: L.photo, up: '', here: 'photo.html', body: `<h1>${C.PXL}</h1>
<p class="lead">${L.photoLead(C.PXL)}</p>
<a class="photo" href="../assets/${C.PXL}"><img src="../assets/${C.PXL}" alt="${L.photoAlt}"></a>
<div class="cols">
<section><h2>${L.fileSec}</h2><dl class="kv"><dt>${L.dims}</dt><dd>4080 × 3072</dd><dt>${L.size}</dt><dd>${pxlSize}</dd></dl></section>
<section><h2>${L.camera}</h2><dl class="kv">${C.CAMERA_INFO.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl><p class="note">${L.cameraNote}</p></section>
</div>
<p><a class="go" href="../assets/${C.PXL}" download>${L.dlOriginal}</a> ${L.realJpeg}</p>` }));

  /* ---------- terminal transcript ---------- */
  const row = ([k, v]) => `${k.padEnd(32)}: ${v}`;
  const grep = pat => Object.entries(C.SLACK).flatMap(([f, t]) => t.split('\n').filter(l => l.includes(pat)).map(l => `slack/${f}:${l}`)).join('\n');
  const social = C.PIC['jiahao.chang'].posts[1];
  const socialName = C.socialFile(social, 'jiahao.chang');
  const styleArg = /\s/.test(C.STYLE_GREP) ? `"${C.STYLE_GREP}"` : C.STYLE_GREP;
  const cmds = [
    ['~', 'ls Downloads', [C.PXL, socialName].join('    ')],
    ['~/Downloads', `exiftool ${C.PXL}`, C.EXIF_PXL.map(row).join('\n') + '\n' + C.EXIF_PXL_NOTE],
    ['~/Downloads', `exiftool ${socialName}`, C.EXIF_SOCIAL(socialName, socialSizes[social.img]).map(row).join('\n') + '\n' + C.EXIF_SOCIAL_NOTE],
    [EXPORT, 'grep Pixel slack/*.log', grep('Pixel')],
    [EXPORT, `grep ${styleArg} slack/*.log`, grep(C.STYLE_GREP)],
  ];
  put('terminal.html', doc({ title: L.terminal, up: '', here: 'terminal.html', body: `<h1>${L.terminal}</h1>
<p class="lead">${L.terminalLead}</p>
<div class="term">${cmds.map(([cwd, cmd, output]) => `<details><summary><span class="p">investigator@mistport</span>:<span class="k">${esc(cwd)}</span>$ ${esc(cmd)}</summary><pre>${esc(output)}</pre></details>`).join('')}</div>
<p class="note">${L.terminalNote}</p>` }));

  /* ---------- notes, hints, report ---------- */
  put('notes.html', doc({ title: L.notes, up: '', here: 'notes.html', body: `<h1>${L.notes}</h1>
<p class="lead">${L.notesLead}</p>
<div class="scroll"><table class="data grid"><tr><th>${L.clue}</th>${C.PEOPLE.map(p => `<th>${p.name}</th>`).join('')}</tr>${L.clueRows.map((r, i) => `<tr><td>${r}</td>${C.PEOPLE.map(() => `<td>${i === 0 ? '○' : ''}</td>`).join('')}</tr>`).join('')}</table></div>
<h2>${L.suspects}</h2><ul class="people">${C.PEOPLE.map(p => `<li><b>${p.name}</b>${L.sep}${p.role}</li>`).join('')}</ul>` }));

  put('hints.html', doc({ title: L.hints, up: '', here: 'hints.html', body: `<h1>${L.hints}</h1>
<p class="lead">${L.hintsLead}</p>
${L.hintList.map((h, i) => `<details class="hint"><summary>${L.hint(i + 1)}</summary><p>${esc(h)}</p></details>`).join('')}` }));

  const opts = list => `<ul class="opts">${list.map(([, l]) => `<li>${l}</li>`).join('')}</ul>`;
  put('report.html', doc({ title: L.report, up: '', here: 'report.html', body: `<h1>${L.report}</h1>
<p class="lead">${L.reportLead}</p>
${[C.Q1, C.Q2, C.Q3].map((q, i) => `<section class="q"><h2>${L.q[i]}</h2>${opts(q)}<details><summary>${L.check}</summary><p>${L.a[i]}</p></details></section>`).join('\n')}
<section class="q"><h2>${L.q[3]}</h2><p>${L.accuseLead}</p><div class="accuse">${C.PEOPLE.map(p => `<a href="${accuseSlug(p.key)}">${p.name}<small>${p.role}</small></a>`).join('')}</div></section>` }));

  const prefix = C.SOL_PREFIX.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const culprit = (solution.match(new RegExp(`<h2 class="sol-title">${prefix}(.+?)</h2>`)) || [])[1];
  if (!culprit) throw new Error('solution has no culprit title');
  C.PEOPLE.forEach(p => {
    const right = p.name === culprit;
    put(accuseSlug(p.key), doc({ title: right ? L.closed : L.accused, up: '../', here: 'report.html', body: right
      ? `<section class="chat"><div class="log"><div class="bub them">${L.solved}<span class="tm">${L.yelu}</span></div></div></section><div class="sol">${solution.replace('<h3>', L.selfRank + '<h3>')}</div>`
      : `<section class="chat"><div class="log"><div class="bub them">${L.wrong}<span class="tm">${L.yelu}</span></div></div></section><p><a class="go" href="../report.html">${L.backToReport}</a></p>` }));
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
