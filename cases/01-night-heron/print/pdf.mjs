// Night Heron's printable edition: an A4 case file generated from the same case data, with the
// solution at the back, laid out with the shared kit (scripts/pdf-kit.mjs).
import { loadCase } from '../../../scripts/case-data.mjs';
import { CSS, esc, csv, file, introChat, chatHTML, splitSolution, cover, briefing, grid, hintsSection, stopAndSolution, printPdf, assetsFrom } from '../../../scripts/pdf-kit.mjs';

// What this file reads from case.js
const EXPORTS = ['PEOPLE', 'PIC', 'SLACK', 'TEXTS', 'INTRO', 'PXL', 'EXIF_PXL', 'EXIF_PXL_NOTE', 'FILE_KEYS', 'INITIAL', 'SOL_PREFIX', 'POST_PARAS', 'FORUM_REPLIES', 'Q1', 'Q2', 'Q3'];

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
  'zh-cn': {
    lang: 'zh-Hans', title: '夜鹭事件', sub: '一张「已经关掉定位」的照片，能说出多少秘密？',
    meta: '<b>类型</b>　隐私推理／单人或 2–4 人合作<br><b>时间</b>　约 45–75 分钟<br><b>需要</b>　笔、这份文件、怀疑一切的眼睛<br><br>anoni.net 匿名网络社群 · anoni.net/mystery<br>本作品为虚构，人物、公司与事件皆非真实。内容以 CC BY 4.0 授权。',
    warn: '最后几页是解答，上下颠倒印刷。破案之前，请不要翻到最后。',
    briefing: '游戏说明', briefLead: '你是「雾港隐私互助站」的志愿者。我们帮助需要匿名的人：记者、吹哨者，以及任何不想被找到的人。',
    job: '今晚的委托',
    jobBody: '<p>一位化名「<b>夜鹭</b>」的吹哨者在匿名论坛揭露：健康 App 公司「心跳鸟科技」打算把用户的睡眠、心率与月经周期数据卖给保险公司。公司已经对全体员工宣布，会在 <b>72 小时内找出泄密者</b>。</p><p style="margin:0">夜鹭把公司内部看得到的数据交给你，请你<b>模拟公司调查员的思路</b>，比公司早一步找出破绽。夜鹭不会告诉你自己是谁：「如果你推得出来，公司也推得出来。」</p>',
    task: '你的任务', taskBody: '<p><b>第一阶段・找出破绽</b>　夜鹭不小心暴露了哪些隐私？</p><p style="margin:0"><b>第二阶段・找出夜鹭</b>　只靠文件里的信息，把六位嫌疑人缩小到一人。答案写在后面的答题卡上。</p>',
    rules: '规则', ruleItems: ['破案需要的信息都在文件 01–10 里，不需要上网。', '每一条结论都要有<b>证据</b>支撑。直觉不算数，公司的律师也不会接受直觉。', '小心过期的数据、巧合，以及「看起来很像」的人。', '卡关时看答题卡后面的提示，每一条都会影响最后的自评。', '解答在最后，前面有一页黑色的「停」。'],
    files: '文件', fileNames: ['夜鹭的加密消息', '匿名论坛爆料文', '爆料附图（含放大区）', '附图的元数据', '收件名单与人物简介', '差勤表', 'BYOD 设备登记表', '公司 Slack 记录', '员工公开社交平台帖子', '附录：网络上查得到的数据'],
    f01: ['夜鹭的加密消息', '2026 年 9 月 16 日（三）晚上，通过端对端加密通信软件传来。'], opening: '— 安全码已验证 · 消息 24 小时后自动销毁 —', zipSys: '夜鹭发送了 夜鹭导出.zip（48 KB）· 已接收',
    f02: ['匿名论坛爆料文', '发布于「无名广场」匿名论坛。论坛会保留上传附件的原始文件。'], forumBar: '无名广场 › 科技业 › 爆料', postTitle: '【爆料】心跳鸟 BeatBird 正在把你的睡眠和心率卖给保险公司', postMeta: 'night_heron_0914 · 2026-09-14 22:52（UTC+8 台北时间）· 回复 1,284', attach: (f, s) => `附件：${f}（${s}）`, replies: '回复',
    f03: (f) => ['爆料附图', `${f}。照片拍的是笔记本屏幕上的备忘录。下方两格是调查员截取的局部放大。`], cropA: '放大区 A｜触摸板右侧', cropB: '放大区 B｜左下角',
    f04: ['附图的元数据', '调查员从论坛下载原始附件，用 exiftool 读出以下内容。'], glossary: '调查员小辞典',
    glossaryItems: ['<b>EXIF</b>：相机或手机拍照时自动写进照片文件的元数据，记录拍摄设备、时间、参数，有时还有 GPS 座标。', '<b>时区偏移（Offset Time）</b>：拍摄当下手机设置的时区。手机到了国外通常会<b>自动切换</b>成当地时区。', '<b>Make／Camera Model Name</b>：设备制造商与型号。'],
    f05: ['收件名单与人物简介', '2026/09/11（五）17:30，首席运营官室寄出〈鼎岳保险 健康数据合作案（第二阶段）〉备忘录。邮件系统记录显示只有以下 6 人收件，没有转发记录。'],
    anonSet: '在隐私领域，这叫「<b>匿名集合</b>」：和你无法区分的人有多少个。夜鹭的匿名集合一开始只有 <b>6 人</b>，每一条泄露的信息都会让它变得更小。',
    f06: ['差勤表 · 2026/09/12–09/16', '人事系统导出。'], f07: ['BYOD 个人设备登记表', '员工若要用私人手机收公司信件，须向 IT 部门登记。'],
    f08: ['公司 Slack 记录', '夜鹭导出，公司 IT 可以读取所有公开频道。原文照录，未修改任何标点与空格。'],
    f09: ['员工公开社交平台帖子', 'PicNote 上设为公开的帖子，任何人都看得到。时间为台北时间（UTC+8）。'], postHead: (h, n, w, t) => `<b>@${h}</b>（${n}）· ${w}${t ? ' · ' + t : ''}`, where: '地点：', noAccount: list => `${list.join('、')}：查无公开账号。`,
    f10: ['附录：网络上查得到的数据', '调查员用搜索引擎查到的公开信息。'],
    appendix: `<h3>世界时区对照</h3><table><tr><th style="width:20%">偏移</th><th>城市</th></tr>
<tr><td class="mono">UTC+7</td><td>曼谷、河内、雅加达</td></tr><tr><td class="mono">UTC+8</td><td>台北、新加坡、香港、上海、吉隆坡、马尼拉</td></tr><tr><td class="mono">UTC+9</td><td>东京、大阪、首尔</td></tr></table>
<p class="note">智能手机默认自动设置时区，到了国外连上当地网络就会切换，相机也会照当下的时区记录。</p>
<h3>手机相机的文件名规则</h3><table><tr><th>品牌</th><th>格式</th></tr><tr><td>Google Pixel</td><td class="mono">PXL_年月日_时分秒毫秒（UTC 时间）</td></tr><tr><td>Apple iPhone</td><td class="mono">IMG_流水号</td></tr><tr><td>Samsung Galaxy</td><td class="mono">年月日_时分秒（当地时间）</td></tr></table>
<h3>Hotel Sakura 新宿</h3><p>新宿站南口徒步 6 分钟。每间客房备有本馆专属便条纸：红色抬头印着「HOTEL SAKURA」，下方是「SHINJUKU · TOKYO」。</p>
<h3>开源嘉年华 2026</h3><div style="display:flex;gap:4mm;align-items:flex-start"><img src="__CAT__" alt="" style="width:42mm;border-radius:2mm"><p>8/22–8/23 在台北举办。今年的纪念品是限量 300 张的「洋葱猫」贴纸：橘色猫头，头顶长出一株洋葱芽。很多参加者把它贴在笔记本上。</p></div>
<h3>BeatBird 隐私权政策（最后更新 2024/05/01）</h3><p>搜集姓名、生日、Email、邮政编码、健康数据与设备 ID。「我们不会在未经你同意的情况下，将个人数据提供给第三方。」</p>`,
    sheet: '答题卡', sheetLead: '每题都要写下证据来自哪个文件。', stage1: '第一阶段・找出破绽', stage2: '第二阶段・找出夜鹭',
    sq: ['1. 夜鹭关掉了 GPS，照片的元数据还是泄露了哪些信息？', '2. 照片「画面本身」泄露了什么？', '3. 爆料文的「文本」泄露了什么？', '4. 夜鹭是谁？列出至少三条独立证据。'],
    marks: '符合打 ○，排除打 ✕。', clue: '线索', clueRows: ['收到备忘录', '时区 +09:00', '手机型号', '照片画面', '写作风格'], sep: '　',
    bonus: '加分题', b1: 'B1. 就算夜鹭把 EXIF 全部清干净，还有一个地方会透露手机品牌。是哪里？', b2: 'B2. 有两位嫌疑人第一眼很容易误判。是谁？为什么？',
    hints: '提示', hintsLead: '真的卡住再看。用纸遮住，一次只露出一条，并记下看了几条。', hint: (i, t) => `提示 ${i}・${t}`,
    hintList: [['从照片开始', '夜鹭说关掉了 GPS。文件 04 里，除了 GPS 之外，还有哪些字段不是「拍摄参数」？'], ['时区', '「+09:00」不是台湾的时区。对照附录的时区表，再看文件 06 的差勤表，9/14 晚上谁在哪里？新加坡要小心。'], ['手机型号', 'BYOD 登记表是三月的数据。这半年有没有人换过手机？看看文件 08 的 Slack，以及文件 09 的社交平台帖子。'], ['照片画面', '文件 03 的两个放大区：便条纸能对照差勤表的住宿安排，贴纸和笔记本颜色能在 Slack 与社交平台帖子里找到对应。'], ['文本', '比较中英文之间有没有空格、标点是全角还是半角、句尾的「以上。」有没有句号。有一个人的习惯也很像，但那天晚上在台北。'], ['加分题', '看看论坛附件的文件名，再看附录的文件名规则。']],
    stop: '停', stopBody: '破案了吗？<br>翻过这页就是真相。还没写完答题卡的话，请回到前面。', stopNote: '接下来的解答页上下颠倒印刷，把整份文件转过来就能阅读。',
    truth: '真相', named: name => `夜鹭是${name}。`, trapsH3: '<h3>陷阱</h3>',
    key: `<div class="key"><b>答题卡对答案</b><br>
  1. 手机型号、拍摄时区（GPS 确实关掉了）　2. 酒店便条纸、笔记本上的贴纸　3. 用字与标点习惯<br>
  加分 B1：论坛保留了源文件名 PXL_…，「PXL_」是 Pixel 相机的命名格式。加分 B2：见上方「陷阱」。<br>
  <b>自评</b>　没看提示、一次指认正确：洋葱首席调查员　·　看了 3 条以内提示：资深隐私志愿者　·　其他：见习调查员</div>`,
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

export function buildPdf({ caseDir, out, solution, assetSizes, srcDir, lang = 'zh' }) {
  const pxlSize = assetSizes['PXL_20260914_144712345.jpg'];
  const C = loadCase(caseDir, lang, EXPORTS, { __PXL_SIZE__: pxlSize });
  const L = T[lang];
  const A = assetsFrom(srcDir, out);
  const color = Object.fromEntries(C.PEOPLE.map(p => [p.name, p.color]));

  /* the opening chat, following the first reply at every turn */
  let tick = 3;
  const chat = introChat(C.INTRO, L.zipSys, () => '21:' + String(Math.min(17, Math.floor(tick++ * 0.6) + 3)).padStart(2, '0'));

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

  const html = `<!doctype html>
<html lang="${L.lang}"><head><meta charset="utf-8"><title>${L.title}</title><style>${CSS}</style></head><body>

${cover('01', L)}

${briefing(L)}

${file('01', L.f01, chatHTML(L.opening, chat))}

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
${grid(L, C.PEOPLE)}
<div class="q" style="margin-top:4mm"><b>${L.sq[3]}</b><div class="line"></div><div class="line"></div></div>
<h3>${L.bonus}</h3>
<div class="q"><b>${L.b1}</b><div class="line"></div></div>
<div class="q"><b>${L.b2}</b><div class="line"></div></div>
</section>

${hintsSection(L)}

${stopAndSolution(L, splitSolution(solution, C.SOL_PREFIX, L))}

</body></html>`;

  return printPdf({ html, srcDir, out, name: 'night-heron' });
}
