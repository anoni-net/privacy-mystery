// Printable edition: an A4 case file generated from the same case data, with the
// solution at the back. Rendered to PDF with a headless Chromium-based browser.
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';
import { loadCase, esc } from './case-data.mjs';

const CSS = `
:root {
  /* white paper: Chrome leaves page margins unpainted, and home printers save ink */
  --ink: #1d1d1f; --muted: #66625a; --paper: #ffffff; --card: #faf7f0; --line: #d8d0bf; --head: #ece5d6;
  --accent: #b5361f; --navy: #1f2a3a; --cream: #efe9dc; --gold: #c9b98f;
  --term-bg: #15181d; --term-fg: #cfd6df; --term-key: #8fb3d9; --term-dim: #6c7686;
  --font-sans: "Noto Sans CJK TC", "Noto Sans TC", "Source Han Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif;
  --font-serif: "Noto Serif CJK TC", "Noto Serif TC", "Source Han Serif TC", "Songti TC", serif;
  --font-mono: "Noto Sans Mono", "DejaVu Sans Mono", Menlo, Consolas, monospace;
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

const T = {
  zh: {
    lang: 'zh-Hant-TW', title: '夜鷺事件', sub: '一張「已經關掉定位」的照片，能說出多少祕密？',
    meta: '<b>類型</b>　隱私推理／單人或 2–4 人合作<br><b>時間</b>　約 45–75 分鐘<br><b>需要</b>　筆、這份檔案、懷疑一切的眼睛<br><br>anoni.net 匿名網路社群 · anoni.net/mystery<br>本作品為虛構，人物、公司與事件皆非真實。內容以 CC BY 4.0 授權。',
    warn: '最後幾頁是解答，上下顛倒印刷。破案之前，請不要翻到最後。',
    briefing: '遊戲說明', briefLead: '你是「霧港隱私互助站」的志工。我們幫助需要匿名的人：記者、吹哨者，以及任何不想被找到的人。',
    job: '今晚的委託',
    jobBody: '<p>一位化名「<b>夜鷺</b>」的吹哨者在匿名論壇揭露：健康 App 公司「心跳鳥科技」打算把使用者的睡眠、心率與月經週期資料賣給保險公司。公司已經對全體員工宣布，會在 <b>72 小時內找出洩密者</b>。</p><p style="margin:0">夜鷺把公司內部看得到的資料交給你，請你<b>模擬公司調查員的思路</b>，比公司早一步找出破綻。夜鷺不會告訴你自己是誰：「如果你推得出來，公司也推得出來。」</p>',
    task: '你的任務', taskBody: '<p><b>第一階段・找出破綻</b>　夜鷺不小心暴露了哪些隱私？</p><p style="margin:0"><b>第二階段・找出夜鷺</b>　只靠檔案裡的資訊，把六位嫌疑人縮小到一人。答案寫在後面的答題卡上。</p>',
    rules: '規則', ruleItems: ['破案需要的資訊都在檔案 01–10 裡，不需要上網。', '每一條結論都要有<b>證據</b>支撐。直覺不算數，公司的律師也不會接受直覺。', '小心過期的資料、巧合，以及「看起來很像」的人。', '卡關時看答題卡後面的提示，每一條都會影響最後的自評。', '解答在最後，前面有一頁黑色的「停」。'],
    files: '檔案', fileNames: ['夜鷺的加密訊息', '匿名論壇爆料文', '爆料附圖（含放大區）', '附圖的中繼資料', '收件名單與人物簡介', '差勤表', 'BYOD 裝置登記表', '公司 Slack 紀錄', '員工公開社群貼文', '附錄：網路上查得到的資料'],
    f01: ['夜鷺的加密訊息', '2026 年 9 月 16 日（三）晚上，透過端對端加密通訊軟體傳來。'], opening: '— 安全碼已驗證 · 訊息 24 小時後自動銷毀 —', zipSys: '夜鷺傳送了 夜鷺匯出.zip（48 KB）· 已接收',
    f02: ['匿名論壇爆料文', '發布於「無名廣場」匿名論壇。論壇會保留上傳附件的原始檔案。'], forumBar: '無名廣場 › 科技業 › 爆料', postTitle: '【爆料】心跳鳥 BeatBird 正在把你的睡眠和心率賣給保險公司', postMeta: 'night_heron_0914 · 2026-09-14 22:52（UTC+8 台北時間）· 回覆 1,284', attach: (f, s) => `附件：${f}（${s}）`, replies: '回覆',
    f03: (f) => ['爆料附圖', `${f}。照片拍的是筆電螢幕上的備忘錄。下方兩格是調查員擷取的局部放大。`], cropA: '放大區 A｜觸控板右側', cropB: '放大區 B｜左下角',
    f04: ['附圖的中繼資料', '調查員從論壇下載原始附件，用 exiftool 讀出以下內容。'], glossary: '調查員小辭典',
    glossaryItems: ['<b>EXIF</b>：相機或手機拍照時自動寫進照片檔的中繼資料，記錄拍攝裝置、時間、參數，有時還有 GPS 座標。', '<b>時區偏移（Offset Time）</b>：拍攝當下手機設定的時區。手機到了國外通常會<b>自動切換</b>成當地時區。', '<b>Make／Camera Model Name</b>：裝置製造商與型號。'],
    f05: ['收件名單與人物簡介', '2026/09/11（五）17:30，營運長室寄出〈鼎岳保險 健康資料合作案（第二階段）〉備忘錄。郵件系統紀錄顯示只有以下 6 人收件，沒有轉寄紀錄。'],
    anonSet: '在隱私領域，這叫「<b>匿名集合</b>」：和你無法區分的人有多少個。夜鷺的匿名集合一開始只有 <b>6 人</b>，每一條洩漏的資訊都會讓它變得更小。',
    f06: ['差勤表 · 2026/09/12–09/16', '人資系統匯出。'], f07: ['BYOD 個人裝置登記表', '員工若要用私人手機收公司信件，須向 IT 部門登記。'],
    f08: ['公司 Slack 紀錄', '夜鷺匯出，公司 IT 可以讀取所有公開頻道。原文照錄，未修改任何標點與空格。'],
    f09: ['員工公開社群貼文', 'PicNote 上設為公開的貼文，任何人都看得到。時間為台北時間（UTC+8）。'], postHead: (h, n, w, t) => `<b>@${h}</b>（${n}）· ${w}${t ? ' · ' + t : ''}`, where: '地點：', noAccount: list => `${list.join('、')}：查無公開帳號。`,
    f10: ['附錄：網路上查得到的資料', '調查員用搜尋引擎查到的公開資訊。'],
    appendix: `<h3>世界時區對照</h3><table><tr><th style="width:20%">偏移</th><th>城市</th></tr>
<tr><td class="mono">UTC+7</td><td>曼谷、河內、雅加達</td></tr><tr><td class="mono">UTC+8</td><td>台北、新加坡、香港、上海、吉隆坡、馬尼拉</td></tr><tr><td class="mono">UTC+9</td><td>東京、大阪、首爾</td></tr></table>
<p class="note">智慧型手機預設自動設定時區，到了國外連上當地網路就會切換，相機也會照當下的時區記錄。</p>
<h3>手機相機的檔名規則</h3><table><tr><th>品牌</th><th>格式</th></tr><tr><td>Google Pixel</td><td class="mono">PXL_年月日_時分秒毫秒（UTC 時間）</td></tr><tr><td>Apple iPhone</td><td class="mono">IMG_流水號</td></tr><tr><td>Samsung Galaxy</td><td class="mono">年月日_時分秒（當地時間）</td></tr></table>
<h3>Hotel Sakura 新宿</h3><p>新宿站南口徒步 6 分鐘。每間客房備有本館專屬便條紙：紅色抬頭印著「HOTEL SAKURA」，下方是「SHINJUKU · TOKYO」。</p>
<h3>開源嘉年華 2026</h3><div style="display:flex;gap:4mm;align-items:flex-start"><img src="__CAT__" alt="" style="width:42mm;border-radius:2mm"><p>8/22–8/23 在台北舉辦。今年的紀念品是限量 300 張的「洋蔥貓」貼紙：橘色貓頭，頭頂長出一株洋蔥芽。很多參加者把它貼在筆電上。</p></div>
<h3>BeatBird 隱私權政策（最後更新 2024/05/01）</h3><p>蒐集姓名、生日、Email、郵遞區號、健康資料與裝置 ID。「我們不會在未經你同意的情況下，將個人資料提供給第三方。」</p>`,
    sheet: '答題卡', sheetLead: '每題都要寫下證據來自哪個檔案。', stage1: '第一階段・找出破綻', stage2: '第二階段・找出夜鷺',
    sq: ['1. 夜鷺關掉了 GPS，照片的中繼資料還是洩漏了哪些資訊？', '2. 照片「畫面本身」洩漏了什麼？', '3. 爆料文的「文字」洩漏了什麼？', '4. 夜鷺是誰？列出至少三條獨立證據。'],
    marks: '符合打 ○，排除打 ✕。', clue: '線索', clueRows: ['收到備忘錄', '時區 +09:00', '手機型號', '照片畫面', '寫作風格'], sep: '　',
    bonus: '加分題', b1: 'B1. 就算夜鷺把 EXIF 全部清乾淨，還有一個地方會透露手機品牌。是哪裡？', b2: 'B2. 有兩位嫌疑人第一眼很容易誤判。是誰？為什麼？',
    hints: '提示', hintsLead: '真的卡住再看。用紙遮住，一次只露出一條，並記下看了幾條。', hint: (i, t) => `提示 ${i}・${t}`,
    hintList: [['從照片開始', '夜鷺說關掉了 GPS。檔案 04 裡，除了 GPS 之外，還有哪些欄位不是「拍攝參數」？'], ['時區', '「+09:00」不是台灣的時區。對照附錄的時區表，再看檔案 06 的差勤表，9/14 晚上誰在哪裡？新加坡要小心。'], ['手機型號', 'BYOD 登記表是三月的資料。這半年有沒有人換過手機？看看檔案 08 的 Slack，以及檔案 09 的社群貼文。'], ['照片畫面', '檔案 03 的兩個放大區：便條紙能對照差勤表的住宿安排，貼紙和筆電顏色能在 Slack 與社群貼文裡找到對應。'], ['文字', '比較「台／臺」、中英文之間有沒有空格、句尾的「以上。」。有一個人的習慣也很像，但那天晚上在台北。'], ['加分題', '看看論壇附件的檔名，再看附錄的檔名規則。']],
    stop: '停', stopBody: '破案了嗎？<br>翻過這頁就是真相。還沒寫完答題卡的話，請回到前面。', stopNote: '接下來的解答頁上下顛倒印刷，把整份檔案轉過來就能閱讀。',
    truth: '真相', named: name => `夜鷺是${name}。`, trapsH3: '<h3>陷阱</h3>',
    key: `<div class="key"><b>答題卡對答案</b><br>
  1. 手機型號、拍攝時區（GPS 確實關掉了）　2. 飯店便條紙、筆電上的貼紙　3. 用字與標點習慣<br>
  加分 B1：論壇保留了原始檔名 PXL_…，「PXL_」是 Pixel 相機的命名格式。加分 B2：見上方「陷阱」。<br>
  <b>自評</b>　沒看提示、一次指認正確：洋蔥首席調查員　·　看了 3 條以內提示：資深隱私志工　·　其他：見習調查員</div>`,
  },
  en: {
    lang: 'en', title: 'Night Heron', sub: 'A photo with “location turned off”. How many secrets can it still tell?',
    meta: '<b>Type</b> privacy mystery, solo or 2–4 players together<br><b>Time</b> about 45–75 minutes<br><b>You need</b> a pen, this file, and a suspicious mind<br><br>anoni.net community · anoni.net/mystery/en/<br>A work of fiction: all people, companies and events are made up. Content licensed CC BY 4.0.',
    warn: 'The last pages are the solution, printed upside down. Don’t turn to the end before you’ve solved the case.',
    briefing: 'How to play', briefLead: 'You volunteer at the Mistport Privacy Aid. We help people who need to stay anonymous: journalists, whistleblowers, anyone who doesn’t want to be found.',
    job: 'Tonight’s case',
    jobBody: '<p>A whistleblower calling themselves <b>Night Heron</b> has posted on an anonymous forum: the health-app company BeatBird plans to sell users’ sleep, heart-rate and menstrual-cycle data to an insurer. The company has told every employee it will <b>identify the leaker within 72 hours</b>.</p><p style="margin:0">Night Heron has handed you everything the company can see internally. <b>Think like the company’s investigators</b> and find the mistakes before they do. Night Heron won’t say who they are: “If you can work it out, so can the company.”</p>',
    task: 'Your job', taskBody: '<p><b>Part one: find the leaks</b> What did Night Heron give away without meaning to?</p><p style="margin:0"><b>Part two: find Night Heron</b> Using only these files, narrow six suspects to one. Write your answers on the answer sheet at the back.</p>',
    rules: 'Rules', ruleItems: ['Everything you need is in files 01–10. No internet required.', 'Every conclusion needs <b>evidence</b>. Hunches don’t count, and the company’s lawyers won’t accept them either.', 'Watch out for stale data, coincidences, and people who only look like a match.', 'If you’re stuck, the hints come after the answer sheet; each one counts against your self-assessment.', 'The solution is at the very end, behind a black “stop” page.'],
    files: 'Files', fileNames: ['Night Heron’s messages', 'The forum leak post', 'The leaked photo (with close-ups)', 'The photo’s metadata', 'Recipients and profiles', 'Attendance', 'BYOD device register', 'Company Slack logs', 'Public social posts', 'Appendix: what’s on the web'],
    f01: ['Night Heron’s messages', 'Sent on the night of Wednesday 16 September 2026, through an end-to-end encrypted messenger.'], opening: '— Safety number verified · messages disappear after 24 hours —', zipSys: 'Night Heron sent heron-export.zip (48 KB) · received',
    f02: ['The forum leak post', 'Posted on the anonymous forum Nameless Square. The forum keeps uploaded attachments as they are.'], forumBar: 'Nameless Square › Tech jobs › Leaks', postTitle: '[LEAK] BeatBird is selling your sleep and heart-rate data to an insurer', postMeta: 'night_heron_0914 · 2026-09-14 22:52 (UTC+8, Taipei time) · 1,284 replies', attach: (f, s) => `Attachment: ${f} (${s})`, replies: 'Replies',
    f03: (f) => ['The leaked photo', `${f}. A photo of the memo on a laptop screen; the memo is in Chinese and you won’t need to read it. Below, two close-ups the investigator cropped.`], cropA: 'Close-up A · right of the trackpad', cropB: 'Close-up B · bottom left',
    f04: ['The photo’s metadata', 'The investigator downloaded the original attachment and read it with exiftool.'], glossary: 'Investigator’s glossary',
    glossaryItems: ['<b>EXIF</b>: metadata a camera or phone writes into a photo automatically: device, time, settings, sometimes GPS coordinates.', '<b>Time zone offset (Offset Time)</b>: the time zone the phone was set to. Phones usually <b>switch automatically</b> to local time abroad.', '<b>Make / Camera Model Name</b>: the device maker and model.'],
    f05: ['Recipients and profiles', 'At 17:30 on Friday 11 September 2026, the Office of the COO sent the memo “Dingyue Insurance health data partnership (phase two)”. The mail system shows only these six recipients and no forwards.'],
    anonSet: 'In privacy, this is called an <b>anonymity set</b>: how many people you can’t be told apart from. Night Heron’s starts at <b>six</b>, and every leak makes it smaller.',
    f06: ['Attendance · 2026/09/12–09/16', 'Exported from the HR system.'], f07: ['BYOD device register', 'Staff who read work email on a personal phone must register it with IT.'],
    f08: ['Company Slack logs', 'Exported by Night Heron; company IT can read every public channel. Quoted as written; punctuation and spacing are untouched.'],
    f09: ['Public social posts', 'Posts set to public on PicNote; anyone can see them. Times are Taipei time (UTC+8).'], postHead: (h, n, w, t) => `<b>@${h}</b> (${n}) · ${w}${t ? ' · ' + t : ''}`, where: 'Location: ', noAccount: list => `${list.join(', ')}: no public account found.`,
    f10: ['Appendix: what’s on the web', 'Public information the investigator found with a search engine.'],
    appendix: `<h3>World time zones</h3><table><tr><th style="width:20%">Offset</th><th>Cities</th></tr>
<tr><td class="mono">UTC+7</td><td>Bangkok, Hanoi, Jakarta</td></tr><tr><td class="mono">UTC+8</td><td>Taipei, Singapore, Hong Kong, Shanghai, Kuala Lumpur, Manila</td></tr><tr><td class="mono">UTC+9</td><td>Tokyo, Osaka, Seoul</td></tr></table>
<p class="note">Smartphones set the time zone automatically: abroad, they switch once on a local network, and the camera records photos in that time zone.</p>
<h3>How phone cameras name files</h3><table><tr><th>Brand</th><th>Format</th></tr><tr><td>Google Pixel</td><td class="mono">PXL_date_time+ms (UTC)</td></tr><tr><td>Apple iPhone</td><td class="mono">IMG_number</td></tr><tr><td>Samsung Galaxy</td><td class="mono">date_time (local time)</td></tr></table>
<h3>Hotel Sakura Shinjuku</h3><p>Six minutes from Shinjuku Station South Exit. Every room has the hotel’s own notepad: a red header reading “HOTEL SAKURA”, with “SHINJUKU · TOKYO” below.</p>
<h3>Open Source Fest 2026</h3><div style="display:flex;gap:4mm;align-items:flex-start"><img src="__CAT__" alt="" style="width:42mm;border-radius:2mm"><p>Held in Taipei on 8/22–8/23. This year’s giveaway was a limited run of 300 “Onion Cat” stickers: an orange cat head with an onion sprout on top. Many people stuck theirs on their laptops.</p></div>
<h3>BeatBird privacy policy (last updated 2024/05/01)</h3><p>Collects name, date of birth, email, postcode, health data and device ID. “We never share your personal data with third parties without your consent.”</p>`,
    sheet: 'Answer sheet', sheetLead: 'For every answer, note which file the evidence comes from.', stage1: 'Part one: find the leaks', stage2: 'Part two: find Night Heron',
    sq: ['1. Night Heron turned off GPS. What did the photo’s metadata still give away?', '2. What did the picture itself give away?', '3. What did the post’s writing give away?', '4. Who is Night Heron? Give at least three independent pieces of evidence.'],
    marks: '○ if they fit, ✕ to rule them out.', clue: 'Clue', clueRows: ['Received the memo', 'Time zone +09:00', 'Phone model', 'In the picture', 'Writing style'], sep: ' ',
    bonus: 'Bonus', b1: 'B1. Even with the EXIF wiped clean, one more thing gives away the phone’s brand. What is it?', b2: 'B2. Two suspects are easy to misjudge at first. Who, and why?',
    hints: 'Hints', hintsLead: 'Only when you’re really stuck. Cover them with paper, reveal one at a time, and keep count.', hint: (i, t) => `Hint ${i} · ${t}`,
    hintList: [['Start with the photo', 'Night Heron says GPS was off. In file 04, apart from GPS, which fields aren’t camera settings?'], ['Time zone', '+09:00 isn’t Taiwan’s time zone. Check the appendix, then the attendance sheet in file 06: who was where on the night of 9/14? Careful with Singapore.'], ['Phone model', 'The BYOD register dates from March. Did anyone change phones since? See the Slack logs in file 08 and the posts in file 09.'], ['In the picture', 'The two close-ups in file 03: the notepad matches someone’s hotel in the attendance sheet; the sticker and the laptop’s colour turn up in Slack and on PicNote.'], ['Writing', "Compare British and American spelling (colour or color, realise or realize), the quote marks, and the sign-off \"That's all.\" One person writes much the same way, but was in Taipei that night."], ['Bonus', 'Look at the attachment’s file name, then at the appendix on file names.']],
    stop: 'STOP', stopBody: 'Solved it?<br>The truth is on the other side of this page. If your answer sheet isn’t finished, go back.', stopNote: 'The solution pages are printed upside down: turn the whole file round to read them.',
    truth: 'The truth', named: name => `Night Heron is ${name}. `, trapsH3: '<h3>Traps</h3>',
    key: `<div class="key"><b>Answer sheet</b><br>
  1. The phone model and the time zone (GPS really was off)  2. The hotel notepad and the sticker on the laptop  3. Spelling and punctuation habits<br>
  Bonus B1: the forum kept the original file name PXL_…; “PXL_” is the Pixel camera’s naming. Bonus B2: see “Traps” above.<br>
  <b>Rate yourself</b>  No hints, right first time: Chief Onion Investigator · Three hints or fewer: Senior Privacy Volunteer · Otherwise: Trainee Investigator</div>`,
  },
};

export function buildPdf({ caseDir, out, solution, pxlSize, srcDir: printDir, lang = 'zh' }) {
  const C = loadCase(caseDir, pxlSize, lang);
  const L = T[lang];
  // The print page holds the ending in plain text: keep it outside the served site, and
  // reach the images from there through a relative path, whatever --out names the site.
  const srcDir = printDir || join(out, '..', 'pdf-src');
  const A = relative(srcDir, join(out, 'assets')).split(sep).join('/') + '/';
  const color = Object.fromEntries(C.PEOPLE.map(p => [p.name, p.color]));
  const file = (no, [title, lead], body) => `<section class="file"><span class="tag">FILE ${no}</span><h1>${title}</h1>${lead ? `<p class="lead">${lead}</p>` : ''}${body}</section>`;
  const csv = (text) => {
    const lines = text.split('\n');
    const rows = lines.filter(l => !l.startsWith('#')).map(l => l.split(','));
    return `<table><tr>${rows[0].map(h => `<th>${esc(h)}</th>`).join('')}</tr>${rows.slice(1).map(r => `<tr>${r.map(x => `<td>${esc(x)}</td>`).join('')}</tr>`).join('')}</table>${lines.filter(l => l.startsWith('#')).map(l => `<p class="note">※ ${esc(l.slice(1).trim())}</p>`).join('')}`;
  };

  /* the opening chat, following the first reply at every turn */
  const chat = [];
  let tick = 3;
  const at = () => '21:' + String(Math.min(17, Math.floor(tick++ * 0.6) + 3)).padStart(2, '0');
  for (let id = 'n1', guard = 0; id && guard < 40; guard++) {
    const node = C.INTRO[id];
    node.msgs.forEach(text => chat.push({ text, t: at() }));
    if (node.file) { chat.push({ sys: L.zipSys }); id = node.next; continue; }
    if (node.end) break;
    if (node.choices) { chat.push({ text: node.choices[0][0], me: true, t: at() }); id = node.choices[0][1]; continue; }
    id = node.next;
  }

  /* profiles: "name | role | age" (｜ in Chinese) followed by an indented description */
  const profiles = Object.fromEntries([...C.TEXTS[C.FILE_KEYS.profiles].matchAll(/^(.+?)\s*[｜|]\s*.+\n\s+(.+)$/gm)].map(m => [m[1].trim(), m[2]]));

  const slack = Object.values(C.SLACK).map(log => {
    const [head, ...lines] = log.split('\n');
    return `<p class="chan">${esc(head)}</p>${lines.map(l => {
      const m = l.match(/^\[(.+?)\] (.+?): (.*)$/); if (!m) return '';
      return `<div class="msg"><span class="av" style="background:${color[m[2]]}">${C.INITIAL(m[2])}</span><div><div class="who">${esc(m[2])}<span class="when">${m[1].slice(5)}</span></div>${esc(m[3])}</div></div>`;
    }).join('')}`;
  }).join('');

  const posts = Object.entries(C.PIC).flatMap(([h, p]) => p.posts.map(po => `<div class="post"><img src="${A}social/${po.img}.jpg" alt=""><div><span class="h">${L.postHead(h, esc(p.name), po.when, po.type)}</span><br>${esc(po.text)}<br><span class="h">${L.where}${esc(po.loc)}</span></div></div>`)).join('');
  const noAccount = C.PEOPLE.filter(p => !Object.values(C.PIC).some(x => x.name === p.name)).map(p => esc(p.name));

  const exif = C.EXIF_PXL.map(([k, v]) => `<span class="k">${k.padEnd(27)}</span>: ${esc(v)}`).join('\n');

  /* solution: neutral heading, split across two upside-down pages */
  const prefix = C.SOL_PREFIX.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const titleRe = new RegExp(`<h2 class="sol-title">${prefix}(.+?)</h2>\\s*<p>`);
  const culprit = (solution.match(titleRe) || [])[1];
  if (!culprit) throw new Error('solution has no culprit title');
  const sol = solution.replace(titleRe, `<h2 class="sol-title">${L.truth}</h2>\n<p>${L.named(culprit)}`);
  const cut = sol.indexOf(L.trapsH3);
  if (cut < 0) throw new Error('solution has no traps section');

  const html = `<!doctype html>
<html lang="${L.lang}"><head><meta charset="utf-8"><title>${L.title}</title><style>${CSS}</style></head><body>

<section class="full cover">
  <div class="kicker">PRIVACY MYSTERY · CASE FILE 01</div>
  <div><h1>${L.title}</h1><div class="sub">${L.sub}</div></div>
  <div class="meta">
    ${L.meta}
    <div class="warn">${L.warn}</div>
  </div>
</section>

<section class="file"><span class="tag">BRIEFING</span><h1>${L.briefing}</h1>
<p class="lead">${L.briefLead}</p>
<div class="card"><h3 style="margin-top:0">${L.job}</h3>${L.jobBody}</div>
<h2>${L.task}</h2>
<div class="card">${L.taskBody}</div>
<h2>${L.rules}</h2>
<ul>${L.ruleItems.map(r => `<li>${r}</li>`).join('')}</ul>
<h2>${L.files}</h2>
<div class="card index">${L.fileNames.map((t, i) => `<div><span class="mono">${String(i + 1).padStart(2, '0')}</span>　${t}</div>`).join('')}</div>
</section>

${file('01', L.f01, `<div class="chat"><p class="sys">${L.opening}</p>${chat.map(m => m.sys ? `<p class="sys">${esc(m.sys)}</p>` : `<div class="bub ${m.me ? 'me' : 'them'}">${esc(m.text)}<span class="t">${m.t}</span></div>`).join('')}</div>`)}

${file('02', L.f02, `<div class="forum"><div class="bar">${L.forumBar}</div><div class="body">
<div class="title">${L.postTitle}</div>
<div class="info">${L.postMeta}</div>
${C.POST_PARAS.map(p => `<p style="white-space:pre-line">${esc(p)}</p>`).join('')}
<div class="attach">${L.attach(C.PXL, pxlSize)}</div></div></div>
<h3>${L.replies}</h3>${C.FORUM_REPLIES.map(([f, t, x]) => `<div class="reply"><span>${f} · ${t}</span><br>${esc(x)}</div>`).join('')}`)}

${file('03', L.f03(C.PXL), `<img class="photo" src="${A}${C.PXL}" alt="">
<div class="crops"><div><div class="crop" style="background-image:url(${A}${C.PXL});background-position:66% 84%"></div><p class="note">${L.cropA}</p></div>
<div><div class="crop" style="background-image:url(${A}${C.PXL});background-position:2% 88%"></div><p class="note">${L.cropB}</p></div></div>`)}

${file('04', L.f04, `<div class="term"><span class="c">$ exiftool ${C.PXL}</span>\n\n${exif}\n<span class="c">${C.EXIF_PXL_NOTE}</span></div>
<div class="card" style="margin-top:4mm"><h3 style="margin-top:0">${L.glossary}</h3><ul style="margin:0">${L.glossaryItems.map(g => `<li>${g}</li>`).join('')}</ul></div>`)}

${file('05', L.f05, `<div class="people">${C.PEOPLE.map(p => `<div class="person"><span class="av" style="background:${p.color}">${C.INITIAL(p.name)}</span><div><b>${p.name}</b><div class="role">${p.role}</div><p>${esc(profiles[p.name] || '')}</p></div></div>`).join('')}</div>
<div class="card" style="margin-top:4mm"><p class="note" style="margin:0">${L.anonSet}</p></div>`)}

${file('06', L.f06, csv(C.TEXTS[C.FILE_KEYS.attendance]))}
${file('07', L.f07, csv(C.TEXTS[C.FILE_KEYS.byod]))}
${file('08', L.f08, slack)}
${file('09', [L.f09[0], `${L.f09[1]} ${L.noAccount(noAccount)}`], `<div class="posts">${posts}</div>`)}

${file('10', L.f10, L.appendix.replace('__CAT__', `${A}social/cat.jpg`))}

<section class="file"><span class="tag">ANSWER SHEET</span><h1>${L.sheet}</h1><p class="lead">${L.sheetLead}</p>
<h3>${L.stage1}</h3>
<div class="q"><b>${L.sq[0]}</b><div class="opts">${C.Q1.map(([, l]) => '□ ' + l).join(L.sep)}</div><div class="line"></div></div>
<div class="q"><b>${L.sq[1]}</b><div class="opts">${C.Q2.map(([, l]) => '□ ' + l).join(L.sep)}</div><div class="line"></div></div>
<div class="q"><b>${L.sq[2]}</b><div class="opts">${C.Q3.map(([, l]) => '○ ' + l).join(L.sep)}</div><div class="line"></div></div>
<h3>${L.stage2}</h3><p class="note">${L.marks}</p>
<table class="grid"><tr><th style="width:28%">${L.clue}</th>${C.PEOPLE.map(p => `<th>${p.name}</th>`).join('')}</tr>${L.clueRows.map((r, i) => `<tr><td>${r}</td>${C.PEOPLE.map(() => `<td>${i === 0 ? '○' : ''}</td>`).join('')}</tr>`).join('')}</table>
<div class="q" style="margin-top:4mm"><b>${L.sq[3]}</b><div class="line"></div><div class="line"></div></div>
<h3>${L.bonus}</h3>
<div class="q"><b>${L.b1}</b><div class="line"></div></div>
<div class="q"><b>${L.b2}</b><div class="line"></div></div>
</section>

<section class="file"><span class="tag">HINTS</span><h1>${L.hints}</h1><p class="lead">${L.hintsLead}</p>
${L.hintList.map(([t, h], i) => `<div class="hint"><b>${L.hint(i + 1, t)}</b>${esc(h)}</div>`).join('')}
</section>

<section class="full stop"><div class="big">${L.stop}</div><p>${L.stopBody}</p><p style="font-size:9pt;color:#777">${L.stopNote}</p></section>

<section class="flip"><div class="flip-in">${sol.slice(0, cut)}</div></section>
<section class="flip"><div class="flip-in">${sol.slice(cut)}${L.key}</div></section>

</body></html>`;

  mkdirSync(srcDir, { recursive: true });
  const htmlPath = join(srcDir, 'night-heron.html');
  writeFileSync(htmlPath, html);

  const chrome = findChrome();
  if (!chrome) return { pdf: null, html: htmlPath };
  const pdf = join(out, 'night-heron.pdf');
  // Chrome writes its user agent (OS and version) into the PDF's Creator field;
  // a game about leaky metadata should not ship one, so give it a neutral name.
  const args = ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', '--user-agent=anoni.net mystery', `--print-to-pdf=${pdf}`, pathToFileURL(htmlPath).href];
  if (process.getuid && process.getuid() === 0) args.unshift('--no-sandbox');
  const r = spawnSync(chrome, args, { stdio: 'ignore', timeout: 120000 });
  return { pdf: r.status === 0 && existsSync(pdf) ? pdf : null, html: htmlPath };
}
