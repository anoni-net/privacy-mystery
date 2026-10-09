/* 夜鷺事件 — story data and in-game websites, shared by the interactive and static versions.
   The build inlines this file into the interactive page and evaluates it to generate the static pages. */

const PEOPLE = [
  { name: '張家豪', role: '資料分析師｜32 歲', color: '#3d8a6b' },
  { name: '林雅婷', role: '資深後端工程師｜35 歲', color: '#c0587e' },
  { name: '許志明', role: '法務專員｜29 歲', color: '#7a6f5d' },
  { name: '黃美玲', role: '產品經理｜30 歲', color: '#c98a2e' },
  { name: '吳思妤', role: '客服主管｜41 歲', color: '#6a5a9c' },
  { name: '陳柏翰', role: '業務經理｜38 歲', color: '#4f7cac' },
];
const COLOR = Object.fromEntries(PEOPLE.map(p => [p.name, p.color]));

const DISC = {
  attach:  { t: '取得爆料附圖原檔', d: '論壇保留了上傳的原始檔案，沒有重新壓縮，也沒有清除資料。' },
  nogps:   { t: '照片裡沒有 GPS 欄位', d: '夜鷺確實關掉了定位。但 GPS 只是中繼資料的其中一欄。' },
  model:   { t: '拍攝裝置：Google Pixel 7a', d: 'EXIF 的 Make 與 Camera Model Name 欄位。' },
  tz:      { t: '時區偏移 +09:00', d: '拍攝當下手機設定在 UTC+9，不是台灣的 UTC+8。' },
  fname:   { t: '檔名 PXL_ 是 Pixel 相機的預設命名', d: '數字是 UTC 時間 14:47。就算清掉 EXIF，檔名還是會透露品牌與時間。' },
  note:    { t: '照片左下角：飯店便條紙', d: '紅色抬頭「HOTEL SAKU…」「SHINJUKU · TOK…」，右半邊被切出畫面。' },
  sticker: { t: '照片中：觸控板右側的貼紙', d: '黑色筆電，觸控板右邊貼著一隻橘色貓頭貼紙，頭頂長了一株綠芽。' },
  strip:   { t: '社群平台會清除照片中繼資料', d: '從 PicNote 存下的照片，沒有任何拍攝裝置或時間資訊。' },
};
const REACT = {
  model: '連手機型號都寫在照片裡？我以為關掉定位就夠了……',
  tz: '時區？我完全沒想過手機會記這個。',
  fname: '所以就算我把資料清掉，檔名還是會出賣我？',
  note: '便條紙也拍進去了？我那時候太緊張了。',
  sticker: '……那張貼紙。我拍的時候根本沒注意到它在畫面裡。',
};
const HINTS = [
  '先去論壇把爆料附圖的「原始檔」下載下來。瀏覽器書籤列有「無名廣場」。',
  '照片的完整中繼資料要用終端機讀：先輸入 cd Downloads，再輸入 exiftool 加上檔名。按 Tab 可以自動補完檔名。不熟指令的話，打開終端機下方的「新手輔助」。',
  '時區 +09:00 是哪裡？用霧搜查「時區」，再對照「夜鷺匯出」資料夾裡的差勤表。新加坡要小心。',
  '手機型號要對照 BYOD 登記表，但那是三月的資料。在終端機試試 grep Pixel slack/*.log（先 cd 到夜鷺匯出），或到 PicNote 看看大家最近的貼文。',
  '用看圖 App 把照片放大到 200% 以上，仔細看左下角和觸控板右側。',
  '那張貼紙和筆電的顏色，在 Slack 紀錄和 PicNote 的貼文裡都找得到對應。霧搜也查得到貼紙的來歷。',
  '寫作習慣：比較「台／臺」、中英文之間有沒有空格、句尾的「以上。」。試試 grep 以上 slack/*.log。',
  '最後一步：在調查板把排除的人劃掉，然後打開「結案報告」提交。',
];

/* ---------- social network ---------- */
const PIC = {
  'jiahao.chang': { name: '張家豪', bio: '數據 / 咖啡 / 常出差', color: '#3d8a6b', posts: [
    { id: 'jh0914', when: '09/14 22:31', type: '限時動態', text: '晚宴完回飯店直接癱😵 明天還要顧攤QQ', loc: 'Hotel Sakura 新宿', img: 'ceiling' },
    { id: 'jh0913', when: '09/13 20:10', text: '東京出差 Day1 工作桌💻☕ 明天開展!!! 緊張緊張', loc: '新宿, 東京', img: 'laptopRose' },
    { id: 'jh0820', when: '08/20 12:50', text: '新手機開箱!!! 從iPhone跳槽Pixel 7a 📸 夜景模式太神了😍', loc: '台北市', img: 'phoneNew' },
  ]},
  'yating.dev': { name: '林雅婷', bio: '後端工程師。以上', color: '#c0587e', posts: [
    { id: 'yt0914', when: '09/14 22:30', text: '又是 debug 到半夜的一天。咖啡第四杯。以上', loc: '台北市', img: 'desk101' },
  ]},
  'chiming_hsu': { name: '許志明', bio: '法律人。週末旅人。', color: '#7a6f5d', posts: [
    { id: 'cm0914', when: '09/14 21:05', text: '首爾第三天！用 Pixel 8 Pro 的變焦拍明洞夜景，連招牌上的字都看得清楚🇰🇷', loc: '明洞, 首爾', img: 'seoul' },
  ]},
  'bohan.chen': { name: '陳柏翰', bio: 'Sales | Coffee | Travel', color: '#4f7cac', posts: [
    { id: 'bh0914', when: '09/14 21:40', text: 'Marina Bay的夜景never gets old. Back to work tmr 💼', loc: 'Marina Bay, Singapore', img: 'marina' },
  ]},
  'siyu.wu': { name: '吳思妤', bio: '客服人生~ 追劇是本體', color: '#6a5a9c', posts: [
    { id: 'sy0914', when: '09/14 22:15', text: '週一晚上就是要追劇~🍿 明天又是上班日QQ', loc: '新北市', img: 'tv' },
  ]},
};

/* ---------- exported company files ---------- */
const SLACK = {
  'random.log': `# random
[2026-08-20 12:41] 張家豪: 新手機到貨啦!!! 終於從iPhone跳槽到Pixel 7a 📸 夜景模式真的太神了吧😍😍
[2026-08-20 12:45] 吳思妤: 恭喜~ 記得去IT那邊更新BYOD登記喔~
[2026-08-20 12:46] 張家豪: 好der 下週弄🙏🙏
[2026-08-31 18:02] 黃美玲: 上週在開源嘉年華拿到的「洋蔥貓」 sticker 終於貼上去了，就在觸控板右邊。這台黑色 ThinkPad 總算有點個性。以上。
[2026-08-31 18:10] 林雅婷: 好可愛，我只搶到 T-shirt。下次幫我多拿一張。以上`,
  'general.log': `# general
[2026-09-03 10:15] 許志明: 提醒各位同仁，與外部廠商簽署NDA前，請先寄送法務部審閱。敬請參酌。
[2026-09-08 09:30] 陳柏翰: FYI 9/13-9/16我在新加坡跟client開會，有急事直接LINE我，會ASAP回覆
[2026-09-15 09:12] 吳思妤: 大家看到論壇那篇了嗎…😨 客服電話從早上就沒停過~
[2026-09-15 09:40] 許志明: 法務部已介入處理，請各位同仁勿於任何頻道討論該事件。敬請配合。`,
  'tokyo-expo.log': `# tokyo-expo
[2026-09-10 16:20] 黃美玲: 展場要播的 demo 影片放在共用雲端的「Expo_2026」資料夾，出發前請先看過一次。臺灣這邊的備用機留在 IT。以上。
[2026-09-10 16:24] 張家豪: 收到!!! 東京我來了✈️✈️ 台灣的同事要幫我們集氣喔💪
[2026-09-14 18:05] 張家豪: 展場收工!!! 晚宴餐廳在飯店對面喔
[2026-09-14 18:07] 黃美玲: 收到，19:00 大廳集合。以上。`,
};
const TEXTS = {
  'README.txt': `霧港隱私互助站 · 工作站 03 使用說明

這台電腦上有：
  加密通訊   夜鷺的訊息，以及需要提示時可以找的阿霧
  瀏覽器     霧搜、無名廣場、PicNote 都在書籤列
  檔案       夜鷺匯出的公司資料在「夜鷺匯出」資料夾
  看圖       可以放大、拖曳照片
  終端機     讀取中繼資料：exiftool <檔名>
  調查板     自動記錄你發現的線索，也可以在這裡排除嫌疑人
  結案報告   破案後在這裡提交

網頁、Slack 紀錄、社群貼文旁的「📌 釘選」可以把內容存到調查板。`,
  '收件名單.txt': `郵件系統紀錄 · 匯出時間 2026-09-16 20:41

主旨：鼎岳保險 健康資料合作案（第二階段）
寄件：營運長室
時間：2026-09-11（五）17:30
標記：機密・限收件人

收件人（6）
  張家豪  資料分析部
  林雅婷  工程部
  許志明  法務部
  黃美玲  產品部
  吳思妤  客服部
  陳柏翰  業務部

轉寄紀錄：無
下載紀錄：6 人皆於 09-11 至 09-12 間開啟附件`,
  '人物簡介.txt': `收件人簡介（人資系統）

張家豪｜資料分析師｜32 歲
  負責使用者健康數據的分析報表。個性外向，Slack 上最活躍的人。這次東京展覽負責數據展示。

林雅婷｜資深後端工程師｜35 歲
  負責資料管線，資料匯出的程式就出自這個人之手。說話簡短，常在深夜上線。

許志明｜法務專員｜29 歲
  負責審閱這次合作的合約，用詞嚴謹。曾在會議上對資料合作的範圍提出疑問。

黃美玲｜產品經理｜30 歲
  BeatBird App 的產品負責人，東京展覽的主講人。安靜、講求細節，喜歡參加開源社群活動。

吳思妤｜客服主管｜41 歲
  每天處理使用者對隱私的詢問。公司的大姐頭，常提醒大家行政事項。

陳柏翰｜業務經理｜38 歲
  促成鼎岳保險合作案的關鍵人物，業績壓力大。講話習慣夾雜英文。`,
  '差勤表_0912-0916.csv': `姓名,類別,期間,地點,備註
張家豪,出差,09/13–09/16,日本東京,亞洲數位健康展・數據展示
林雅婷,遠端工作,09/14–09/16,台北自宅,
許志明,特休,09/12–09/15,韓國首爾,個人旅遊
黃美玲,出差,09/13–09/16,日本東京,亞洲數位健康展・主講人
吳思妤,正常出勤,—,台北辦公室,
陳柏翰,出差,09/13–09/16,新加坡,客戶拜訪
# 東京出差人員下榻 Hotel Sakura 新宿。09/14 行程：09:00–18:00 展場、19:00–21:30 客戶晚宴（張家豪、黃美玲出席），之後自由活動。`,
  'BYOD裝置登記_202603.csv': `姓名,裝置型號,作業系統,登記日期
張家豪,Apple iPhone 15,iOS,2025/10/20
林雅婷,Google Pixel 7a,Android,2024/06/11
許志明,Google Pixel 8 Pro,Android,2025/12/03
黃美玲,Google Pixel 7a,Android,2024/09/27
吳思妤,Samsung Galaxy S24,Android,2024/03/15
陳柏翰,Google Pixel 7a,Android,2025/01/08
# 本表最後更新：2026/03/02。IT 規定：更換裝置後請於 30 日內重新登記。`,
};

const AWU_BASE = [
  { sys: '— 互助站內部頻道 —' },
  { tm: '21:18', text: '我是阿霧，今晚值班。夜鷺的案子你接了吧？' },
  { tm: '21:18', text: '建議順序：先去論壇拿到原始照片 → 用終端機讀中繼資料 → 對照夜鷺匯出的資料 → 放大照片找細節 → 交結案報告。' },
  { tm: '21:19', text: '卡住就按下面的「給我提示」。不過看越多提示，結案評等會越低喔。' },
  { tm: '21:19', text: '不熟終端機也沒關係：終端機下方有「新手輔助」，要不要開由你決定，開了也不影響評等。' },
];
/* Opening conversation: each node shows 夜鷺's messages, then waits for the player's reply, a file transfer, or ends. */
const INTRO = {
  n1:  { msgs: ['你好……請問是霧港互助站嗎？', '朋友說，你們會幫需要匿名的人。'], choices: [['是，我是今晚值班的志工。你還好嗎？', 'n2a'], ['是的。先確認一下：你現在用的裝置和網路安全嗎？', 'n2b']] },
  n2a: { msgs: ['老實說，不太好。'], next: 'n3' },
  n2b: { msgs: ['我用自己的筆電，連手機熱點，沒有用公司的網路。', '……你們果然很謹慎。'], next: 'n3' },
  n3:  { msgs: ['無名廣場上那篇心跳鳥的爆料……是我發的。', '公司昨天寄信給所有員工，說「已委託資安顧問調查，將於 72 小時內查明洩密者」。', '我這兩天幾乎沒睡。'], choices: [['先深呼吸。你做的事是為了保護使用者。', 'n4a'], ['72 小時，時間不多。告訴我你發文時做了哪些防護。', 'n4b']] },
  n4a: { msgs: ['……謝謝。很久沒人跟我說這句話了。'], choices: [['跟我說說，你發文的時候做了哪些防護？', 'n4b']] },
  n4b: { msgs: ['我用全新的 Email 註冊論壇帳號，也沒有用公司網路。', '拍備忘錄之前，我還特地把相機的「儲存位置資訊」關掉了。', '所以照片裡沒有 GPS。這樣應該不會被找到吧？'], choices: [['關掉 GPS 是對的。不過照片能透露的，不只是位置。', 'n5a'], ['先別下結論，我們一起確認。', 'n5b']] },
  n5a: { msgs: ['……不只位置？還有什麼？', '你這樣說我更緊張了。'], next: 'n6' },
  n5b: { msgs: ['好。'], next: 'n6' },
  n6:  { msgs: ['還有一件事。那份備忘錄 9/11 只寄給 6 個人，我是其中之一。'], choices: [['只有 6 個人？那範圍非常小。', 'n7a'], ['公司查得到收件名單嗎？', 'n7b']] },
  n7a: { msgs: ['我知道。所以我才怕。'], next: 'n8' },
  n7b: { msgs: ['查得到。郵件系統有紀錄，誰收到、誰打開過附件，一清二楚。'], next: 'n8' },
  n8:  { msgs: [], choices: [['你可以告訴我你是誰嗎？這樣我比較好判斷。', 'n9a'], ['我不需要知道你是誰。', 'n9b']] },
  n9a: { msgs: ['不行。', '如果你推得出來，公司也推得出來。我想知道那條路到底有多短。'], next: 'n10' },
  n9b: { msgs: ['謝謝你。我本來也不打算說。', '不過……如果你推得出來，公司也推得出來。我想知道那條路到底有多短。'], next: 'n10' },
  n10: { msgs: ['我把公司內部看得到的資料都匯出來了：收件名單、人物簡介、差勤表、手機登記表、Slack 紀錄。', '公司的調查員手上一定也有這些。', '大家的 PicNote 是公開的，你自己查得到。論壇那篇文也還在。'], file: true, next: 'n11' },
  n11: { msgs: [], choices: [['收到。給我一個晚上。', 'n12']] },
  n12: { msgs: ['拜託了。', '在他們之前，找到我的破綻。'], end: true },
};

const SEARCH_INDEX = [
  { url: 'wuming.forum/t/88231', title: '【爆料】心跳鳥 BeatBird 正在把你的睡眠和心率賣給保險公司 - 無名廣場', snip: '我是 BeatBird 的內部員工。這篇文我猶豫了很久……附圖是備忘錄的照片。', kw: ['心跳鳥', 'beatbird', '爆料', '夜鷺', 'night_heron', '無名', '論壇', '鼎岳', '保險', '備忘錄'] },
  { url: 'beatbird.app', title: 'BeatBird 心跳鳥｜睡得好，活得好', snip: '追蹤睡眠、心率與生理週期。我們重視你的隱私。', kw: ['心跳鳥', 'beatbird', '心跳鳥科技'] },
  { url: 'beatbird.app/privacy', title: '隱私權政策 - BeatBird', snip: '我們不會在未經你同意的情況下，將個人資料提供給第三方。最後更新：2024/05/01', kw: ['心跳鳥', 'beatbird', '隱私權', '隱私'] },
  { url: 'hotel-sakura.jp', title: 'Hotel Sakura Shinjuku｜櫻館 新宿', snip: '新宿站南口徒步 6 分鐘。客房備有本館專屬便條紙與原子筆。', kw: ['sakura', 'hotel', '飯店', '旅館', '新宿', 'shinjuku', '櫻', '便條紙', 'saku'] },
  { url: 'worldclock.info', title: '世界時區對照表 UTC offset｜WorldClock', snip: 'UTC+8：台北、新加坡、香港……UTC+9：東京、首爾……', kw: ['時區', 'utc', 'timezone', '+09', '+9', 'gmt', 'offset', '時差', '新加坡', '東京', '首爾'] },
  { url: 'techwiki.org/exif', title: 'EXIF - TechWiki', snip: '可交換圖檔格式（EXIF）是相機寫進照片檔的中繼資料，包含裝置、時間、時區與 GPS……', kw: ['exif', '中繼資料', 'metadata', 'exiftool', '照片', 'gps', '元數據', '詮釋資料'] },
  { url: 'exifpeek.example', title: '免費線上 EXIF 檢視器｜ExifPeek', snip: '不用安裝任何軟體！上傳照片，立即查看相機型號、拍攝時間、位置等資訊。', kw: ['exif', '線上', 'online', '檢視', '查看', 'viewer', '中繼資料', 'metadata', '照片資訊', '拍攝資訊', '元數據'] },
  { url: 'techwiki.org/pxl', title: '手機相機的檔案命名規則 - TechWiki', snip: 'Google Pixel：PXL_年月日_時分秒毫秒.jpg（UTC 時間）。iPhone：IMG_1234.HEIC……', kw: ['pxl', 'pixel', '檔名', '命名', 'img_', 'filename'] },
  { url: 'osfest.tw/2026', title: '開源嘉年華 2026｜限量洋蔥貓貼紙', snip: '8/22–8/23 台北。今年紀念品：限量 300 張的洋蔥貓貼紙。', kw: ['洋蔥貓', '貼紙', 'sticker', '開源', '嘉年華', 'osfest', '貓'] },
  { url: 'news.example.tw/beatbird', title: '心跳鳥被爆販售健康資料 鼎岳保險：合作仍在評估｜科技新聞', snip: '心跳鳥科技發聲明表示將「嚴正追查洩密者」，並強調所有資料皆經過去識別化處理。', kw: ['心跳鳥', 'beatbird', '鼎岳', '新聞', '洩密', '保險'] },
  { url: 'anoni.net/docs/', ext: 'https://anoni.net/docs/', title: 'anoni.net 匿名網路社群｜文件庫', snip: '把全球網路隱私議題，帶回台灣脈絡。概念、工具、情境指南。（外部真實網站，會在新分頁開啟）', kw: ['隱私', '匿名', 'tor', 'anoni', 'exif', '中繼資料', '去匿名化'] },
];
// people → profile results
Object.entries(PIC).forEach(([h, p]) => SEARCH_INDEX.push({ url: 'picnote.social/@' + h, title: `${p.name} (@${h}) • PicNote`, snip: p.bio + ' · ' + p.posts.length + ' 則貼文', kw: [p.name, h, h.split(/[._]/)[0]] }));

const Q1 = [['gps', 'GPS 位置'], ['model', '手機型號'], ['tz', '拍攝時區'], ['name', '拍攝者姓名'], ['time', '拍攝時間']];
const Q2 = [['note', '飯店便條紙'], ['sticker', '筆電上的貼紙'], ['window', '窗外景色'], ['account', '螢幕上的登入帳號'], ['cup', '咖啡杯上的店名']];
const Q3 = [['ip', '發文的 IP 位址'], ['style', '用字與標點習慣'], ['email', '註冊帳號的 Email']];

/* ---------- leaked photo ---------- */
const PXL = 'PXL_20260914_144712345.jpg';
/* exiftool output for the leaked photo; both terminals print exactly this. */
const EXIF_PXL = [
  ['ExifTool Version Number', '12.76'], ['File Name', PXL], ['File Size', '__PXL_SIZE__'], ['File Type', 'JPEG'], ['MIME Type', 'image/jpeg'],
  ['Make', 'Google'], ['Camera Model Name', 'Pixel 7a'], ['Software', 'HDR+ 1.0.641377693'], ['Orientation', 'Horizontal (normal)'],
  ['Date/Time Original', '2026:09:14 23:47:12'], ['Create Date', '2026:09:14 23:47:12'], ['Modify Date', '2026:09:14 23:47:12'],
  ['Offset Time', '+09:00'], ['Offset Time Original', '+09:00'], ['Offset Time Digitized', '+09:00'],
  ['F Number', '1.9'], ['Exposure Time', '1/30'], ['ISO', '1250'], ['Flash', 'Off, Did not fire'], ['Focal Length', '5.4 mm'],
  ['Image Width', '4080'], ['Image Height', '3072'], ['Image Size', '4080x3072'], ['Megapixels', '12.5'],
];
const EXIF_PXL_NOTE = '（沒有任何 GPS 欄位）';
const EXIF_SOCIAL = (name, size) => [
  ['ExifTool Version Number', '12.76'], ['File Name', name], ['File Size', size], ['File Type', 'JPEG'], ['MIME Type', 'image/jpeg'],
  ['JFIF Version', '1.01'], ['Image Width', '1080'], ['Image Height', '810'], ['Comment', 'Processed by PicNote'],
];
const EXIF_SOCIAL_NOTE = '（沒有 Make、Model、時間或 GPS 欄位：上傳時已被平台清除）';
/* What an OS file-properties panel shows: common fields only, no time-zone offset. */
const CAMERA_INFO = [['製造商', 'Google'], ['型號', 'Pixel 7a'], ['拍攝日期', '2026/9/14 下午 11:47'], ['拍攝地點', '（沒有位置資訊）']];
const PEEK_ROWS = [['檔名', PXL], ['相機製造商', 'Google'], ['相機型號', 'Pixel 7a'], ['拍攝時間', '2026:09:14 23:47:12'], ['時區', '+09:00'], ['光圈', 'f/1.9'], ['曝光時間', '1/30 秒'], ['ISO', '1250'], ['GPS 位置', '（無）']];
const socialFile = (post, handle) => `picnote_${handle}_${post.id.slice(2)}.jpg`;

/* ---------- the forum post ---------- */
const POST_PARAS = [
  '我是 BeatBird 的內部員工。這篇文我猶豫了很久，但我認為使用者有權利知道。',
  '上週五，公司高層寄出一份標示「機密」的內部備忘錄：BeatBird 將從 10 月起，把使用者的 sleep data、resting heart rate 與月經週期紀錄，以「去識別化」的名義打包提供給鼎岳保險，作為保費精算的參考。',
  '問題在於：\n1. App 的隱私權政策從來沒有提到這件事。\n2. 所謂的「去識別化」只是把姓名換成一串 ID，生日、郵遞區號和裝置 ID 都還在。只要有這三項，要把人對回去並不難。\n3. 公司法務早就知道這份合作，卻選擇不更新條款。',
  '附圖是備忘錄的照片。我已經關掉定位，也用了全新的帳號。',
  '臺灣的個資法不是裝飾品。以上。',
];
const FORUM_THREADS = [
  ['wuming.forum/t/88231', '【爆料】心跳鳥 BeatBird 正在把你的睡眠和心率賣給保險公司', '09-14 22:52 · 回覆 1,284 · 熱門'],
  [null, '竹科某廠今年年終只有 1.5 個月？', '09-15 10:03 · 回覆 412'],
  [null, '有人面過那間做 AI 客服的新創嗎', '09-15 18:40 · 回覆 57'],
  [null, '【心得】轉職 TPM 一年後的感想', '09-16 01:12 · 回覆 203'],
];
const FORUM_REPLIES = [
  ['B1', '09-14 23:05', '這個去識別化根本假的吧……生日＋郵遞區號就能對回去了'],
  ['B2', '09-14 23:20', '樓主快跑，公司一定會查'],
  ['B3', '09-15 00:41', '提醒一下，這個論壇不會幫你處理照片，上傳什麼就是什麼。懂的就懂。'],
  ['B4', '09-15 08:12', '已截圖備份'],
  ['B5', '09-15 12:30', '心跳鳥公關說「所有資料皆經過去識別化」，笑死'],
];
const SEARCH_TIPS = ['心跳鳥', 'EXIF', '時區', 'PXL', '洋蔥貓', 'Hotel Sakura'];

/* =====================================================================
   IN-GAME WEBSITES
   Each version passes its own adapters, so one set of pages serves both:
   esc(s), href(url) → link attribute, pin(src, text), asset(path),
   form(base, value, cls, placeholder, button), thumb(file, inner),
   dl(file, kind, attrs, cls, assetPath), upload(file), state() → { downloads, uploaded, peekLast },
   pxlSize; optional: afterUpload(file), searchTips (false hides the search-home tips)
   ===================================================================== */
function makeSites(ctx) {
  const { esc } = ctx;
  const img = (path, alt) => `<img src="${ctx.asset(path)}" alt="${esc(alt)}" loading="lazy" decoding="async">`;
  const a = (url, text, style = '') => `<a ${ctx.href(url)}${style ? ` style="${style}"` : ''}>${text}</a>`;
  const ext = (url, text, style = '') => `<a href="${url}" target="_blank" rel="noopener"${style ? ` style="${style}"` : ''}>${text}</a>`;
  const searchBox = (v = '') => ctx.form('mist.search/?q=', v, 's-box', '搜尋網路', '搜尋');

  function route(url) {
    const [path, qs] = url.split('?');
    const q = qs ? decodeURIComponent((qs.match(/q=([^&]*)/) || [])[1] || '').trim() : '';
    if (path === 'mist.search' || path === 'mist.search/') return q ? searchResults(q) : searchHome();
    if (path === 'wuming.forum' || path === 'wuming.forum/') return forumHome();
    if (path === 'wuming.forum/t/88231') return forumPost();
    if (path === 'picnote.social' || path === 'picnote.social/') return picHome();
    if (path === 'picnote.social/search') return picSearch(q);
    if (path.startsWith('picnote.social/@')) return picProfile(path.slice(16));
    if (path === 'hotel-sakura.jp') return hotelPage();
    if (path === 'worldclock.info') return clockPage();
    if (path === 'techwiki.org/exif') return wikiExif();
    if (path === 'techwiki.org/pxl') return wikiPxl();
    if (path === 'exifpeek.example' || path === 'exifpeek.example/') return exifPeek();
    if (path === 'osfest.tw/2026') return osPage();
    if (path === 'beatbird.app') return bbHome();
    if (path === 'beatbird.app/privacy') return bbPrivacy();
    if (path === 'news.example.tw/beatbird') return newsPage();
    return `<div class="site"><div class="wrap"><h2>無法連上這個網站</h2><p class="muted mono">${esc(url)}</p><p>找不到伺服器。檢查網址是否正確，或${a('mist.search/?q=' + encodeURIComponent(url), '在霧搜中搜尋', 'color:#1a3d8f')}。</p></div></div>`;
  }
  function searchHits(q) {
    const ql = q.toLowerCase();
    return SEARCH_INDEX.filter(r => r.kw.some(k => ql.includes(k.toLowerCase()) || (k.length >= 2 && k.toLowerCase().includes(ql) && ql.length >= 2)));
  }
  function searchHome() {
    const tips = ctx.searchTips === false ? '' : `<div class="s-tips">試試：${SEARCH_TIPS.map(esc).join('、')}、人名</div>`;
    return `<div class="site"><div class="s-home"><div class="s-logo">霧搜<small>MIST SEARCH · 不追蹤你的搜尋引擎</small></div>${searchBox()}${tips}</div></div>`;
  }
  function searchResults(q) {
    const hits = searchHits(q);
    const list = hits.length ? hits.map(r => `<div class="s-res"><div class="u">${esc(r.url)}</div>${r.ext ? ext(r.ext, esc(r.title)) : a(r.url, esc(r.title))}<p>${esc(r.snip)}</p></div>`).join('')
      : `<p>找不到和「${esc(q)}」相關的結果。</p><p class="muted">換個關鍵字試試，例如：心跳鳥、EXIF、時區、PXL、洋蔥貓、Hotel Sakura，或某個人的名字。</p>`;
    return `<div class="site"><div class="wrap"><div style="margin-bottom:10px">${searchBox(q)}</div><p class="muted" style="font-size:12.5px">約 ${hits.length} 項結果</p>${list}</div></div>`;
  }
  function forumHome() {
    return `<div class="site forum"><div class="f-bar"><b>無名廣場</b><span>匿名說真話 · 科技業板</span></div><div class="wrap">${FORUM_THREADS.map(([u, t, m]) => u ? `<a class="f-thread" ${ctx.href(u)}><b>${esc(t)}</b><br><small>${m}</small></a>` : `<div class="f-thread" style="opacity:.7"><b>${esc(t)}</b><br><small>${m}</small></div>`).join('')}</div></div>`;
  }
  function forumPost() {
    return `<div class="site forum"><div class="f-bar"><b>無名廣場</b><span>科技業 › 爆料</span></div><div class="wrap">
  <div class="f-post"><h2>【爆料】心跳鳥 BeatBird 正在把你的睡眠和心率賣給保險公司</h2>
  <div class="f-meta">night_heron_0914 · 2026-09-14 22:52（UTC+8 台北時間）· 回覆 1,284</div>
  ${POST_PARAS.map(p => `<p class="pinable" style="white-space:pre-line">${esc(p)} ${ctx.pin('無名廣場 爆料文', p)}</p>`).join('')}
  <div class="f-attach">${ctx.thumb(PXL, img(PXL, '爆料附圖縮圖'))}<div style="flex:1;min-width:160px"><div class="fn">附件：${PXL}</div><div class="muted" style="font-size:12px">${ctx.pxlSize} · 原始檔</div></div>${ctx.dl(PXL, 'pxl', '', 'site-btn')}</div>
  <p class="muted" style="font-size:12px;margin:6px 0 0">這是一張真的 JPEG。想用自己電腦上的 exiftool 驗證，可以<a href="${ctx.asset(PXL)}" download style="color:#1a3d8f">另存到你的電腦</a>。</p>
  </div>
  <h3 style="font-size:14px">回覆</h3>
  ${FORUM_REPLIES.map(([f, t, x]) => `<div class="f-reply"><span class="mono muted" style="font-size:11.5px">${f} · ${t}</span><br>${esc(x)}</div>`).join('')}
  </div></div>`;
  }
  const picBar = (v = '') => `<div class="p-bar"><a class="p-logo" ${ctx.href('picnote.social')}>PicNote</a>${ctx.form('picnote.social/search?q=', v, 'p-search', '搜尋使用者或姓名', '搜尋')}</div>`;
  function picHome() {
    return `<div class="site">${picBar()}<div class="wrap"><h2 style="margin-top:0">探索</h2><p class="muted">輸入姓名或帳號，找找你想看的人。公開帳號的貼文任何人都看得到。</p><div style="max-width:360px;margin-top:10px;border-radius:12px;overflow:hidden">${img('social/cat.jpg', '洋蔥貓貼紙')}</div><p class="muted" style="font-size:12.5px">熱門：#開源嘉年華2026 #洋蔥貓</p></div></div>`;
  }
  function picSearch(q) {
    const ql = q.toLowerCase();
    const hits = Object.entries(PIC).filter(([h, p]) => h.includes(ql) || p.name.includes(q));
    return `<div class="site">${picBar(q)}<div class="wrap"><p class="muted">「${esc(q)}」的搜尋結果</p>${hits.length ? hits.map(([h, p]) => `<a class="p-user" ${ctx.href('picnote.social/@' + h)}><span class="p-av" style="background:${p.color}">${p.name[0]}</span><span><b>${esc(p.name)}</b><br><span class="muted">@${h} · ${esc(p.bio)}</span></span></a>`).join('') : `<p>找不到符合的帳號。這個人可能沒有 PicNote，或帳號設為不公開。</p>`}</div></div>`;
  }
  function picProfile(h) {
    const p = PIC[h];
    if (!p) return `<div class="site">${picBar()}<div class="wrap"><p>這個帳號不存在。</p></div></div>`;
    return `<div class="site">${picBar()}<div class="wrap"><div class="p-prof"><span class="p-av" style="background:${p.color}">${p.name[0]}</span><div><h2>${esc(p.name)}</h2><div class="muted">@${h}</div><div>${esc(p.bio)}</div></div></div>
  <div class="p-feed">${p.posts.map(po => `<article class="p-post"><div class="p-img">${img('social/' + po.img + '.jpg', po.text)}</div><div class="p-cap">${po.type ? `<span class="muted" style="font-size:11.5px">${po.type} · </span>` : ''}${esc(po.text)}<div class="when">${po.when}（台北時間）· 地點：${esc(po.loc)}</div></div><div class="p-act">${ctx.pin('PicNote @' + h + ' ' + po.when, po.text + '（地點：' + po.loc + '）')}${ctx.dl(socialFile(po, h), 'social', `data-handle="${h}" data-post="${po.id}"`, 'pin-btn', 'social/' + po.img + '.jpg')}</div></article>`).join('')}</div></div></div>`;
  }
  function hotelPage() {
    return `<div class="site"><div class="h-hero"><div class="n">HOTEL SAKURA</div><div class="c">SHINJUKU · TOKYO</div></div><div class="wrap"><h2>櫻館 新宿</h2><p>新宿站南口徒步 6 分鐘。商務與展覽旅客的首選，步行可達新宿會展中心。</p>
  <div class="h-grid"><div class="h-card"><b>客房備品</b><p>每間客房皆備有本館專屬便條紙、原子筆與 USB 充電座。</p><div class="h-pad"><div class="h-pad-top">HOTEL SAKURA</div><div class="h-pad-sub">SHINJUKU · TOKYO</div><div class="h-pad-lines"></div></div></div>
  <div class="h-card"><b>交通</b><p>東京都新宿區（虛構地址）<br>成田機場利木津巴士直達。</p></div><div class="h-card"><b>入住</b><p>15:00 起　退房 11:00<br>館內時間為日本標準時間（UTC+9）。</p></div></div></div></div>`;
  }
  function clockPage() {
    const rows = [['UTC+7', '曼谷、河內、雅加達'], ['UTC+8', '台北、新加坡、香港、上海、吉隆坡、馬尼拉'], ['UTC+9', '東京、大阪、首爾'], ['UTC+10', '雪梨、布里斯本']];
    return `<div class="site wiki"><div class="w-bar">WorldClock</div><div class="wrap w-art"><h1>世界時區對照表</h1><p>UTC（協調世界時）是全球時間的基準。各地時間以「UTC+偏移」表示。</p><div class="w-scroll"><table><tr><th>偏移</th><th>城市</th></tr>${rows.map(r => `<tr><td class="mono">${r[0]}</td><td>${r[1]}</td></tr>`).join('')}</table></div>
  <p><b>出國時手機的時區會變嗎？</b><br>會。智慧型手機預設「自動設定時區」，連上當地行動網路後就會切換成當地時間，相機拍照時也會照當下的時區記錄。</p>
  <p>${ctx.pin('WorldClock', 'UTC+8：台北、新加坡、香港；UTC+9：東京、大阪、首爾。手機出國會自動切換時區。')}</p></div></div>`;
  }
  function wikiExif() {
    return `<div class="site wiki"><div class="w-bar">TechWiki</div><div class="wrap w-art"><h1>EXIF</h1><p><b>可交換圖檔格式</b>（Exchangeable Image File Format，EXIF）是數位相機與手機在拍照時自動寫進照片檔的<b>中繼資料</b>。</p>
  <h3>常見欄位</h3><div class="w-scroll"><table><tr><th>欄位</th><th>說明</th></tr><tr><td>Make / Camera Model Name</td><td>裝置製造商與型號</td></tr><tr><td>Date/Time Original</td><td>拍攝時間（當地時間）</td></tr><tr><td>Offset Time Original</td><td>拍攝時的時區偏移，例如 +08:00</td></tr><tr><td>GPS Position</td><td>拍攝位置（若相機開啟定位）</td></tr><tr><td>Software</td><td>處理影像的軟體版本</td></tr></table></div>
  <h3>如何讀取</h3><p>命令列工具 <code>exiftool</code> 是最常用的方式：<code>exiftool 檔名.jpg</code></p>
  <h3>隱私風險</h3><p>很多人以為關閉定位就安全了，但裝置型號、時區、時間等欄位仍會保留。<b>大型社群平台</b>通常會在上傳時清除 EXIF；<b>論壇、電子郵件附件、雲端硬碟</b>則常常保留原始檔案。</p>
  <p>延伸閱讀：${ext('https://anoni.net/docs/basics/', 'anoni.net 概念篇（外部網站）', 'color:#1a3d8f')}　·　${a('techwiki.org/pxl', '手機相機的檔案命名規則', 'color:#1a3d8f')}</p></div></div>`;
  }
  function wikiPxl() {
    return `<div class="site wiki"><div class="w-bar">TechWiki</div><div class="wrap w-art"><h1>手機相機的檔案命名規則</h1><p>不同品牌的相機 App 有各自的預設檔名格式。光看檔名，常常就能猜出拍攝裝置。</p>
  <div class="w-scroll"><table><tr><th>品牌</th><th>格式</th><th>範例</th></tr><tr><td>Google Pixel</td><td><code>PXL_年月日_時分秒毫秒</code>，<b>UTC 時間</b></td><td><code>PXL_20260101_093012345.jpg</code></td></tr><tr><td>Apple iPhone</td><td><code>IMG_流水號</code></td><td><code>IMG_4821.HEIC</code></td></tr><tr><td>Samsung Galaxy</td><td><code>年月日_時分秒</code>，當地時間</td><td><code>20260101_173012.jpg</code></td></tr></table></div>
  <p>也就是說，就算把 EXIF 全部清乾淨，只要沒有重新命名，檔名本身仍是一份中繼資料。</p><p>${ctx.pin('TechWiki', 'Pixel 相機檔名 PXL_年月日_時分秒毫秒 使用 UTC 時間；清掉 EXIF 後檔名仍會洩漏品牌與時間。')}</p></div></div>`;
  }
  function osPage() {
    return `<div class="site"><div class="os-hero"><h1>開源嘉年華 2026</h1><p>8/22–8/23 · 台北</p></div><div class="wrap"><h2>今年的紀念品：洋蔥貓</h2><div style="max-width:320px">${img('social/cat.jpg', '洋蔥貓貼紙：橘色貓頭，頭頂長洋蔥芽')}</div><p>頭頂長出洋蔥芽的橘色貓咪，向守護隱私的洋蔥路由致敬。<b>限量 300 張</b>，兩天內全數發完。</p><p class="muted">很多參加者把它貼在筆電上，快來分享你的洋蔥貓！#洋蔥貓</p><p>${ctx.pin('開源嘉年華官網', '洋蔥貓貼紙：橘色貓頭、頭頂長洋蔥芽，8/22–8/23 開源嘉年華限量 300 張。')}</p></div></div>`;
  }
  function bbHome() {
    return `<div class="site"><div class="bb-hero"><div class="bb-logo">BeatBird</div><h1>睡得好，活得好。</h1><p>追蹤你的睡眠、心率與生理週期，讓每一天都更健康。</p><span class="site-btn">免費下載</span></div><div class="wrap"><h3>我們重視你的隱私</h3><p>你的健康資料只屬於你。我們使用業界標準的加密技術保護你的資料。</p><p>${a('beatbird.app/privacy', '閱讀隱私權政策 →', 'color:#c2410c')}</p></div></div>`;
  }
  function bbPrivacy() {
    return `<div class="site"><div class="wrap"><div class="bb-logo">BeatBird</div><h1 style="font-size:24px">隱私權政策</h1><p class="muted">最後更新：2024/05/01</p><h3>我們蒐集的資料</h3><ul><li>帳號資料：姓名、生日、Email、郵遞區號</li><li>健康資料：睡眠紀錄、心率、生理週期</li><li>裝置資料：裝置 ID、作業系統版本</li></ul><h3>資料分享</h3><p>我們不會在未經你同意的情況下，將個人資料提供給第三方。</p><p>${ctx.pin('BeatBird 隱私權政策', '隱私權政策最後更新 2024/05/01，聲明不會在未經同意下提供第三方；蒐集生日、郵遞區號、裝置 ID。')}</p></div></div>`;
  }
  function newsPage() {
    return `<div class="site"><div class="wrap"><p class="muted mono" style="font-size:12px">科技新聞 · 2026-09-15 14:20</p><h1 style="font-size:24px">心跳鳥被爆販售健康資料　鼎岳保險：合作仍在評估</h1><p>匿名論壇 14 日晚間出現一篇爆料文，指稱健康 App「心跳鳥 BeatBird」將把使用者的睡眠、心率與生理週期資料提供給鼎岳保險。</p><p>心跳鳥科技今日發出聲明，表示所有資料「皆經過去識別化處理」，並將「嚴正追查洩密者，依法究責」。據了解，公司已委託外部資安顧問進行內部調查。</p><p>多位隱私研究者指出，若資料保留生日、郵遞區號與裝置 ID，即使移除姓名，仍有很高機率能重新識別個人。</p></div></div>`;
  }
  function exifPeek() {
    const st = ctx.state();
    const imgs = st.downloads.filter(n => /\.jpg$/.test(n));
    let result = '';
    if (st.peekLast) {
      result = `<h2 style="font-size:18px">分析結果</h2>${st.peekLast === PXL
        ? `<table class="ep-table">${PEEK_ROWS.map(([k, v]) => `<tr><td>${k}</td><td class="mono">${esc(v)}</td></tr>`).join('')}</table>`
        : `<p>「${esc(st.peekLast)}」沒有 EXIF 資料。照片可能在上傳到其他平台時被移除了。</p>`}${ctx.afterUpload ? ctx.afterUpload(st.peekLast) : ''}`;
    }
    return `<div class="site"><div class="ep-bar">ExifPeek</div><div class="wrap"><h1 style="font-size:24px;margin:0 0 4px">免費線上 EXIF 檢視器</h1><p class="muted">不用安裝任何軟體！上傳照片，立即查看相機、時間、位置等拍攝資訊。</p>
  <div class="ep-drop"><b>選擇要上傳的照片</b><p class="muted" style="margin:2px 0 6px">從你電腦的「下載項目」選擇：</p>${imgs.length ? imgs.map(n => `<div class="ep-file"><span class="mono" style="word-break:break-all">${esc(n)}</span>${ctx.upload(n)}</div>`).join('') : '<p>下載項目裡沒有照片。</p>'}</div>
  ${result}
  <p class="ep-fine">上傳即表示你同意本服務保存你的檔案，並可能用於改善服務或提供給合作夥伴。保存期限依本服務政策而定。</p></div></div>`;
  }
  return { route, searchHits };
}
