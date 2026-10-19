// Night Heron's static edition: plain HTML and CSS, no JavaScript and no SVG, for Tor
// Browser's "Safest" security level. Generated from the same case data as the interactive
// page, in each language the case has, with the shared kit (scripts/static-kit.mjs).
import { loadCase } from '../../../scripts/case-data.mjs';
import { staticKit, BASE, esc, short } from '../../../scripts/static-kit.mjs';

// What this file reads from case.js
const EXPORTS = ['PEOPLE', 'PIC', 'SLACK', 'TEXTS', 'INTRO', 'PXL', 'EXIF_PXL', 'EXIF_PXL_NOTE', 'EXIF_SOCIAL',
  'EXIF_SOCIAL_NOTE', 'CAMERA_INFO', 'FILE_KEYS', 'EXPORT_DIR', 'BOOKMARKS', 'INITIAL', 'STYLE_GREP', 'SEARCH_TIPS', 'SOL_PREFIX', 'Q1', 'Q2', 'Q3', 'socialFile', 'makeSites'];
// Download names for the exported files (ASCII, so every server serves them)
const RAW = { recipients: 'recipients.txt', profiles: 'profiles.txt', attendance: 'attendance_0912-0916.csv', byod: 'byod_202603.csv' };

const T = {
  zh: {
    lang: 'zh-Hant-TW', title: '夜鷺事件', station: '霧港工作站', staticTag: '靜態版', navLabel: '工作站',
    nav: ['工作站', '通訊', '瀏覽器', '檔案', '照片', '終端機紀錄', '調查筆記', '提示', '結案報告'],
    start: '開始', lead: '一張「已經關掉定位」的照片，能說出多少祕密？', intro: '你是霧港隱私互助站的志工。今晚，一位吹哨者傳來了訊息。', open: '打開加密訊息',
    aside: ['這是不需要 JavaScript 的靜態版，給 Tor Browser「最安全」等級或停用 JavaScript 的瀏覽器使用。內容和互動版相同，但不會記錄你的進度，建議準備紙筆，或打開「調查筆記」頁一起使用。',
      '能執行 JavaScript 的話，可以玩<a href="../">互動版</a>。', '<a href="../../">回到委託板</a>，看看其他案件。',
      '想離線或印出來玩：<a href="../night-heron.pdf" download="夜鷺事件.pdf">下載 PDF 版</a>（解答在最後幾頁，上下顛倒印刷）。'],
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
  'zh-cn': {
    lang: 'zh-Hans', title: '夜鹭事件', station: '雾港工作站', staticTag: '静态版', navLabel: '工作站',
    nav: ['工作站', '通信', '浏览器', '文件', '照片', '终端记录', '调查笔记', '提示', '结案报告'],
    start: '开始', lead: '一张「已经关掉定位」的照片，能说出多少秘密？', intro: '你是雾港隐私互助站的志愿者。今晚，一位吹哨者传来了消息。', open: '打开加密消息',
    aside: ['这是不需要 JavaScript 的静态版，给 Tor Browser「最安全」等级或停用 JavaScript 的浏览器使用。内容和交互版相同，但不会记录你的进度，建议准备纸笔，或打开「调查笔记」页一起使用。',
      '能运行 JavaScript 的话，可以玩<a href="../">交互版</a>。', '<a href="../../">回到委托板</a>，看看其他案件。',
      '想离线或打印出来玩：<a href="../night-heron.pdf" download="夜鹭事件.pdf">下载 PDF 版</a>（解答在最后几页，上下颠倒印刷）。'],
    chat: '加密通信', yelu: '夜鹭', e2e: '端对端加密 · 安全码已验证', opening: '— 安全码已验证 · 消息 24 小时后自动销毁 —',
    zip: '夜鹭导出.zip', zipMeta: '48 KB · 加密发送', acceptHint: '按「接收」收下资料', accept: '接收文件', received: '已接收 夜鹭导出.zip · 解压缩到 ~/夜鹭导出',
    caseOpen: '— 委托成立 · 调查开始 —', begin: '开始调查', choose: '选择你的回复',
    tiles: [['通信', '重读夜鹭的委托，以及阿雾的建议。'], ['浏览器', '雾搜、无名广场、PicNote 和其他网站。'], ['文件', '夜鹭导出的收件名单、差勤表、设备登记与 Slack 记录。'], ['照片', '爆料附图的原图，可以放大和下载。'], ['终端记录', '调查员跑过的 exiftool 与 grep 命令和输出。'], ['调查笔记', '可以打印出来的排除表，用纸笔记录。'], ['提示', '卡住的时候，一次打开一条。'], ['结案报告', '对答案，然后指认夜鹭。']],
    mission: '今晚的任务', missionItems: ['读夜鹭的消息', '找出照片泄露了什么', '把 6 人缩到 1 人', '交出结案报告'],
    chatLog: '通信记录', awu: '阿雾 · 互助站', internal: '内部频道', awuSys: '— 互助站内部频道 —',
    awuMsgs: ['我是阿雾，今晚值班。夜鹭的案子你接了吧？', '建议顺序：先去论坛拿到原始照片 → 看照片的元数据 → 对照夜鹭导出的数据 → 放大照片找细节 → 交结案报告。', '卡住就去看「提示」页。看越多提示，结案的自评就越低喔。'],
    facts: '夜鹭说过的重点', factItems: ['发文用全新 Email 注册的账号，没有用公司网络。', '拍备忘录前，关掉了相机的「保存位置信息」，照片里没有 GPS。', '备忘录 9/11 只寄给 6 个人，夜鹭是其中之一。', '导出的公司数据在「文件」；大家的 PicNote 是公开的；论坛那篇文还在。'],
    replay: '重看一次开场对话',
    staticTips: '静态版不能输入文本，可以从这些关键字选：', extraQuery: 'EXIF 在线', viewAttachment: '查看附图', dlOriginal: '下载源文件', saveImage: '保存图片', upload: '上传', bookmarks: '书签',
    trapTitle: '阿雾（互助站）传来消息', trap: ['等一下，你刚把夜鹭的原始照片上传到一个不明网站？', '那个网站现在也有这张照片了，还记下了你的 IP 和上传时间。要是公司的调查员也找上它……下次请用自己电脑上的工具查，例如 exiftool。', '这次结案的自评要降一级。'],
    verbatim: '原文照录，未修改任何标点与空格。', files: '文件', filesLead: '夜鹭从公司系统导出的数据。公司的调查员手上也有这些。', fileCol: '文件', rawCol: '源文件', download: '下载',
    downloadsNote: '从网站下载的照片会在这里。爆料附图在<a href="../photo.html">照片</a>页。', downloadRaw: '下载源文件',
    photo: '照片', photoLead: c => `论坛附件的源文件。<a href="../assets/${c}">打开原图</a>后，用浏览器放大（Ctrl 或 ⌘ 加 +），仔细看画面的每个角落。`,
    photoAlt: '爆料附图：酒店书桌上的笔记本，屏幕显示心跳鸟科技的内部备忘录', fileSec: '文件', dims: '尺寸', size: '文件大小', camera: '相机信息',
    cameraNote: '这里只列出常见字段，就像电脑「内容」窗口里看到的一样，有些字段不会显示。完整的元数据请看<a href="terminal.html">终端记录</a>。', realJpeg: '它是真的 JPEG，可以用你自己的工具检查。',
    terminal: '终端记录', terminalLead: '调查员在工作站上跑过的命令。点一下命令，就像按下 Enter，会展开它的输出。',
    terminalNote: '会用终端的话，可以在<a href="photo.html">照片</a>页下载源文件，在自己的电脑上运行 <code>exiftool</code> 验证；Slack 记录的源文件在<a href="files/index.html">文件</a>页。',
    notes: '调查笔记', notesLead: '静态版不会记录进度。把这页打印出来，或抄在纸上：符合打 ○，排除打 ✕。', clue: '线索', clueRows: ['收到备忘录', '时区 +09:00', '手机型号', '照片画面', '写作风格'], suspects: '嫌疑人', sep: '　',
    hints: '提示', hintsLead: '卡住再看，一次打开一条。记下你看了几条，结案时自评会用到。', hint: n => `提示 ${n}`,
    hintList: ['先到「浏览器」里的无名广场，把爆料文附件的源文件下载下来。', '照片的完整元数据，可以看「终端记录」里 exiftool 的输出。会用命令行的人，也可以下载源文件，在自己的电脑上运行 exiftool。', '时区 +09:00 是哪里？在雾搜查「时区」，再对照「文件」里的差勤表。新加坡要小心。', '手机型号要对照 BYOD 登记表，但那是三月的数据。看看 Slack 记录的 random 频道，或 PicNote 上大家最近的帖子。', '打开「照片」页的原图，用浏览器放大（Ctrl 或 ⌘ 加 +），仔细看左下角和触摸板右侧。', '那张贴纸和笔记本的颜色，在 Slack 记录和 PicNote 的帖子里都找得到对应。雾搜也查得到贴纸的来历。', '写作习惯：比较中英文之间有没有空格、标点是全角还是半角、句尾的「以上。」有没有句号。终端记录里有 grep 以上 的结果。', '最后一步：在「调查笔记」把排除的人划掉，然后到「结案报告」指认。'],
    report: '结案报告', reportLead: '先在心里或纸上作答，再打开「对答案」。', check: '对答案',
    q: ['1. 照片的元数据泄露了哪些信息？（多选）', '2. 照片画面本身泄露了什么？（多选）', '3. 爆料文的文本泄露了什么？', '4. 夜鹭是谁？'],
    a: ['手机型号与拍摄时区。夜鹭确实关掉了 GPS，照片里也没有拍摄者姓名；拍摄时间有记录，但不是关键。', '酒店便条纸与笔记本上的贴纸。', '用字与标点习惯。夜鹭用了新账号、没用公司网络，剩下能出卖人的是写作风格。'],
    accuseLead: '想好了就点名字。指认错的话，夜鹭会告诉你。', closed: '结案', accused: '指认',
    selfRank: '<div class="rank"><b>自评</b><ul><li>没看提示、一次就指认正确：<b>洋葱首席调查员</b></li><li>看了 3 条以内的提示、误判 1 次以内：<b>资深隐私志愿者</b></li><li>其他：<b>见习调查员</b></li></ul><p>如果把原始照片上传到在线 EXIF 工具，再降一级。</p></div>',
    solved: '……你找到我了。谢谢你比他们早一步。我会照你的建议处理。', wrong: '我读了你的报告……不是那个人。但公司的调查员也可能这样误判，冤枉一个无辜的同事。可以再查一次吗？', backToReport: '回到结案报告',
  },
  en: {
    lang: 'en', title: 'Night Heron', station: 'Mistport Workstation', staticTag: 'static', navLabel: 'Workstation',
    nav: ['Workstation', 'Chat', 'Browser', 'Files', 'Photo', 'Terminal log', 'Notes', 'Hints', 'Case report'],
    start: 'Start', lead: 'A photo with “location turned off”. How many secrets can it still tell?', intro: 'You volunteer at the Mistport Privacy Aid. Tonight, a whistleblower has sent you a message.', open: 'Open the encrypted message',
    aside: ['This is the static version: no JavaScript needed, for Tor Browser’s “Safest” level or browsers with JavaScript off. It has the same case as the interactive version but doesn’t save your progress, so keep pen and paper handy, or use the Notes page.',
      'If your browser runs JavaScript, try the <a href="../">interactive version</a>.', '<a href="../../">Back to the case board</a> for other cases.',
      'To play offline or on paper: <a href="../night-heron.pdf" download="night-heron.pdf">download the PDF</a> (solution on the last pages, printed upside down).'],
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

export function buildStatic({ caseDir, sitesCss, out, solution, assetSizes, lang = 'zh', langs = [lang] }) {
  const pxlSize = assetSizes['PXL_20260914_144712345.jpg'];
  const socialSizes = Object.fromEntries(Object.entries(assetSizes).filter(([f]) => f.startsWith('social/')).map(([f, v]) => [f.slice(7, -4), v]));
  const C = loadCase(caseDir, lang, EXPORTS, { __PXL_SIZE__: pxlSize });
  const L = Object.assign({}, BASE[lang], T[lang]);
  const NAV = ['desk.html', 'chat.html', 'web/search.html', 'files/index.html', 'photo.html', 'terminal.html', 'notes.html', 'hints.html', 'report.html'].map((h, i) => [h, L.nav[i]]);
  const K = staticKit({ caseDir, out, lang, langs, L, nav: NAV });
  const { put, doc } = K;
  const EXPORT = '~/' + C.EXPORT_DIR;

  K.cover();
  K.intro({ nodes: C.INTRO, who: L.yelu, tm: count => '21:' + String(3 + Math.floor(count * 0.6)).padStart(2, '0') });

  /* ---------- workstation ---------- */
  K.desk(['chat.html', 'web/search.html', 'files/index.html', 'photo.html', 'terminal.html', 'notes.html', 'hints.html', 'report.html']);
  K.chatLog({ msgs: L.awuMsgs.map((text, i) => ({ tm: i ? '21:19' : '21:18', text })) });

  /* ---------- in-game websites (crawled from the shared site pages) ---------- */
  const queries = C.SEARCH_TIPS.concat([L.extraQuery], C.PEOPLE.map(p => p.name));
  K.sites({
    makeSites: C.makeSites,
    bookmarks: C.BOOKMARKS,
    slugOf: (path, q, qs) => {
      if (path === 'picnote.social/search') return 'picnote-search-' + short(q);
      if (path.startsWith('exifpeek.example')) return qs ? 'exifpeek-uploaded' : 'exifpeek';
    },
    ctx: ({ link, state }) => ({
      searchTips: false, // the static search box already lists every keyword
      form: K.staticForm(link, base => base.startsWith('picnote') ? C.PEOPLE.map(p => p.name) : queries),
      thumb: (fn, inner) => `<a class="thumb" href="../photo.html" aria-label="${L.viewAttachment}">${inner}</a>`,
      dl: (fn, kind, attrs, cls, path) => `<a class="${cls}" href="../../assets/${kind === 'pxl' ? fn : path}" download="${esc(fn)}">${kind === 'pxl' ? L.dlOriginal : L.saveImage}</a>`,
      upload: () => `<a class="site-btn" href="${link('exifpeek.example/?uploaded=1')}">${L.upload}</a>`,
      state: () => ({ downloads: [C.PXL], uploaded: [], peekLast: state.current.includes('uploaded') ? C.PXL : '' }),
      afterUpload: () => `<div class="awu-note"><b>${L.trapTitle}</b>${L.trap.map(p => `<p>${p}</p>`).join('')}</div>`,
      pxlSize,
    }),
  });

  /* ---------- exported files ---------- */
  const COLOR = Object.fromEntries(C.PEOPLE.map(p => [p.name, p.color]));
  const fileList = Object.entries(C.FILE_KEYS).map(([k, n]) => [n, RAW[k], C.TEXTS[n]]).concat(Object.keys(C.SLACK).map(n => ['slack/' + n, n, C.SLACK[n]]));
  put('files/index.html', doc({ title: L.files, up: '../', here: 'files/index.html', body: `<h1>${esc(EXPORT)}</h1>
<p class="lead">${L.filesLead}</p>
${K.fileTable(fileList)}
<h2>~/Downloads</h2>
<p>${L.downloadsNote}</p>` }));
  fileList.forEach(([name, raw, text]) => K.filePage({ name, raw, text, crumb: EXPORT, html: K.render(name, text, { color: COLOR, initial: C.INITIAL }) }));

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
  K.terminal([
    ['~', 'ls Downloads', [C.PXL, socialName].join('    ')],
    ['~/Downloads', `exiftool ${C.PXL}`, C.EXIF_PXL.map(row).join('\n') + '\n' + C.EXIF_PXL_NOTE],
    ['~/Downloads', `exiftool ${socialName}`, C.EXIF_SOCIAL(socialName, socialSizes[social.img]).map(row).join('\n') + '\n' + C.EXIF_SOCIAL_NOTE],
    [EXPORT, 'grep Pixel slack/*.log', grep('Pixel')],
    [EXPORT, `grep ${styleArg} slack/*.log`, grep(C.STYLE_GREP)],
  ]);

  /* ---------- notes, hints, report ---------- */
  K.notes(C.PEOPLE);
  K.hints();
  K.report({ qs: [C.Q1, C.Q2, C.Q3], people: C.PEOPLE, solution, solPrefix: C.SOL_PREFIX, who: L.yelu });

  return K.write(sitesCss);
}
