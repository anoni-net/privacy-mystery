/* 夜鹭事件 简体中文 — story data and in-game websites. Converted from case.js with mainland
   wording (scripts/zhcn.py), then edited by hand. PEOPLE[].key stays in Traditional Chinese: it is
   the solution's key and where saves keep marks and notes, shared by every language. The
   writing-style clue drops 台/臺, which Simplified Chinese writes the same way. */

// The interactive page's chat thread for the client, Night Heron (also where saves keep it)
const CLIENT_ID = 'yelu';
const PEOPLE = [
  { name: '张家豪', key: '張家豪', role: '数据分析师｜32 岁', color: '#3d8a6b' },
  { name: '林雅婷', key: '林雅婷', role: '资深后端工程师｜35 岁', color: '#c0587e' },
  { name: '许志明', key: '許志明', role: '法务专员｜29 岁', color: '#7a6f5d' },
  { name: '黄美玲', key: '黃美玲', role: '产品经理｜30 岁', color: '#c98a2e' },
  { name: '吴思妤', key: '吳思妤', role: '客服主管｜41 岁', color: '#6a5a9c' },
  { name: '陈柏翰', key: '陳柏翰', role: '业务经理｜38 岁', color: '#4f7cac' },
];
const COLOR = Object.fromEntries(PEOPLE.map(p => [p.name, p.color]));
const INITIAL = name => (PEOPLE.find(p => p.name === name) || {}).initial || String(name)[0];

/* Names the interface needs in this language: bookmarks, the exported folder and its files,
   and the helper's suggested commands. */
const BOOKMARKS = [['雾搜', 'mist.search'], ['无名广场', 'wuming.forum'], ['PicNote', 'picnote.social'], ['TechWiki', 'techwiki.org/exif']];
const EXPORT_DIR = '夜鹭导出';
const FILE_KEYS = { recipients: '收件名单.txt', profiles: '人物简介.txt', attendance: '差勤表_0912-0916.csv', byod: 'BYOD设备登记_202603.csv' };
const EXPORT_FILES = Object.values(FILE_KEYS);
const STYLE_GREP = '以上';
const SOL_PREFIX = '夜鹭是';  // the solution's title: SOL_PREFIX + the culprit's name  // the writing-style clue's word for grep
const SUGGEST = {
  home: ['ls', 'cd Downloads', 'cd 夜鹭导出', 'help'],
  export: ['ls', 'cat 收件名单.txt', 'cat 差勤表_0912-0916.csv', 'grep Pixel slack/*.log', 'grep 以上 slack/*.log', 'cd ..'],
  slack: ['ls', 'cat random.log', 'grep -i pixel *.log', 'cd ..'],
};

const DISC = {
  attach:  { t: '取得爆料附图原始文件', d: '论坛保留了上传的原始文件，没有重新压缩，也没有清除数据。' },
  nogps:   { t: '照片里没有 GPS 字段', d: '夜鹭确实关掉了定位。但 GPS 只是元数据的其中一栏。' },
  model:   { t: '拍摄设备：Google Pixel 7a', d: 'EXIF 的 Make 与 Camera Model Name 字段。' },
  tz:      { t: '时区偏移 +09:00', d: '拍摄当下手机设置在 UTC+9，不是台湾的 UTC+8。' },
  fname:   { t: '文件名 PXL_ 是 Pixel 相机的默认命名', d: '数字是 UTC 时间 14:47。就算清掉 EXIF，文件名还是会透露品牌与时间。' },
  note:    { t: '照片左下角：酒店便条纸', d: '红色抬头「HOTEL SAKU…」「SHINJUKU · TOK…」，右半边被切出画面。' },
  sticker: { t: '照片中：触摸板右侧的贴纸', d: '黑色笔记本，触摸板右边贴着一只橘色猫头贴纸，头顶长了一株绿芽。' },
  strip:   { t: '社交平台会清除照片元数据', d: '从 PicNote 存下的照片，没有任何拍摄设备或时间信息。' },
};
const REACT = {
  model: '连手机型号都写在照片里？我以为关掉定位就够了……',
  tz: '时区？我完全没想过手机会记这个。',
  fname: '所以就算我把数据清掉，文件名还是会出卖我？',
  note: '便条纸也拍进去了？我那时候太紧张了。',
  sticker: '……那张贴纸。我拍的时候根本没注意到它在画面里。',
};
const HINTS = [
  '先去论坛把爆料附图的「源文件」下载下来。浏览器书签栏有「无名广场」。',
  '照片的完整元数据要用终端读：先输入 cd Downloads，再输入 exiftool 加上文件名。按 Tab 可以自动补全文件名。不熟命令的话，打开终端下方的「新手辅助」。',
  '时区 +09:00 是哪里？用雾搜查「时区」，再对照「夜鹭导出」文件夹里的差勤表。新加坡要小心。',
  '手机型号要对照 BYOD 登记表，但那是三月的数据。在终端试试 grep Pixel slack/*.log（先 cd 到夜鹭导出），或到 PicNote 看看大家最近的帖子。',
  '用看图 App 把照片放大到 200% 以上，仔细看左下角和触摸板右侧。',
  '那张贴纸和笔记本的颜色，在 Slack 记录和 PicNote 的帖子里都找得到对应。雾搜也查得到贴纸的来历。',
  '写作习惯：比较中英文之间有没有空格、标点是全角还是半角、句尾的「以上。」有没有句号。试试 grep 以上 slack/*.log。',
  '最后一步：在调查板把排除的人划掉，然后打开「结案报告」提交。',
];

/* ---------- social network ---------- */
const PIC = {
  'jiahao.chang': { name: '张家豪', bio: '数据 / 咖啡 / 常出差', color: '#3d8a6b', posts: [
    { id: 'jh0914', when: '09/14 22:31', type: '限时动态', text: '晚宴完回酒店直接瘫😵 明天还要顾摊QQ', loc: 'Hotel Sakura 新宿', img: 'ceiling' },
    { id: 'jh0913', when: '09/13 20:10', text: '东京出差 Day1 工作桌💻☕ 明天开展!!! 紧张紧张', loc: '新宿, 东京', img: 'laptopRose' },
    { id: 'jh0820', when: '08/20 12:50', text: '新手机开箱!!! 从iPhone跳槽Pixel 7a 📸 夜景模式太神了😍', loc: '台北市', img: 'phoneNew' },
  ]},
  'yating.dev': { name: '林雅婷', bio: '后端工程师。以上', color: '#c0587e', posts: [
    { id: 'yt0914', when: '09/14 22:30', text: '又是 debug 到半夜的一天。咖啡第四杯。以上', loc: '台北市', img: 'desk101' },
  ]},
  'chiming_hsu': { name: '许志明', bio: '法律人。周末旅人。', color: '#7a6f5d', posts: [
    { id: 'cm0914', when: '09/14 21:05', text: '首尔第三天！用 Pixel 8 Pro 的变焦拍明洞夜景，连招牌上的字都看得清楚🇰🇷', loc: '明洞, 首尔', img: 'seoul' },
  ]},
  'bohan.chen': { name: '陈柏翰', bio: 'Sales | Coffee | Travel', color: '#4f7cac', posts: [
    { id: 'bh0914', when: '09/14 21:40', text: 'Marina Bay的夜景never gets old. Back to work tmr 💼', loc: 'Marina Bay, Singapore', img: 'marina' },
  ]},
  'siyu.wu': { name: '吴思妤', bio: '客服人生~ 追剧是本体', color: '#6a5a9c', posts: [
    { id: 'sy0914', when: '09/14 22:15', text: '周一晚上就是要追剧~🍿 明天又是上班日QQ', loc: '新北市', img: 'tv' },
  ]},
};

/* ---------- exported company files ---------- */
const SLACK = {
  'random.log': `# random
[2026-08-20 12:41] 张家豪: 新手机到货啦!!! 终于从iPhone跳槽到Pixel 7a 📸 夜景模式真的太神了吧😍😍
[2026-08-20 12:45] 吴思妤: 恭喜~ 记得去IT那边更新BYOD登记喔~
[2026-08-20 12:46] 张家豪: 好der 下周弄🙏🙏
[2026-08-31 18:02] 黄美玲: 上周在开源嘉年华拿到的「洋葱猫」 sticker 终于贴上去了，就在触摸板右边。这台黑色 ThinkPad 总算有点个性。以上。
[2026-08-31 18:10] 林雅婷: 好可爱，我只抢到 T-shirt。下次帮我多拿一张。以上`,
  'general.log': `# general
[2026-09-03 10:15] 许志明: 提醒各位同仁，与外部厂商签署NDA前，请先寄送法务部审阅。敬请参酌。
[2026-09-08 09:30] 陈柏翰: FYI 9/13-9/16我在新加坡跟client开会，有急事直接LINE我，会ASAP回复
[2026-09-15 09:12] 吴思妤: 大家看到论坛那篇了吗…😨 客服电话从早上就没停过~
[2026-09-15 09:40] 许志明: 法务部已介入处理，请各位同仁勿于任何频道讨论该事件。敬请配合。`,
  'tokyo-expo.log': `# tokyo-expo
[2026-09-10 16:20] 黄美玲: 展场要播的 demo 视频放在共用云端的「Expo_2026」文件夹，出发前请先看过一次。台湾这边的备用机留在 IT。以上。
[2026-09-10 16:24] 张家豪: 收到!!! 东京我来了✈️✈️ 台湾的同事要帮我们集气喔💪
[2026-09-14 18:05] 张家豪: 展场收工!!! 晚宴餐厅在酒店对面喔
[2026-09-14 18:07] 黄美玲: 收到，19:00 大厅集合。以上。`,
};
const TEXTS = {
  'README.txt': `雾港隐私互助站 · 工作站 03 使用说明

这台电脑上有：
  加密通信   夜鹭的消息，以及需要提示时可以找的阿雾
  浏览器     雾搜、无名广场、PicNote 都在书签栏
  文件       夜鹭导出的公司数据在「夜鹭导出」文件夹
  看图       可以放大、拖动照片
  终端     读取元数据：exiftool <文件名>
  调查板     自动记录你发现的线索，也可以在这里排除嫌疑人
  结案报告   破案后在这里提交

网页、Slack 记录、社交平台帖子旁的「📌 钉住」可以把内容存到调查板。`,
  '收件名单.txt': `邮件系统记录 · 导出时间 2026-09-16 20:41

主题：鼎岳保险 健康数据合作案（第二阶段）
寄件：首席运营官室
时间：2026-09-11（五）17:30
标记：机密・限收件人

收件人（6）
  张家豪  数据分析部
  林雅婷  工程部
  许志明  法务部
  黄美玲  产品部
  吴思妤  客服部
  陈柏翰  业务部

转发记录：无
下载记录：6 人皆于 09-11 至 09-12 间打开附件`,
  '人物简介.txt': `收件人简介（人事系统）

张家豪｜数据分析师｜32 岁
  负责用户健康数据的分析报表。个性外向，Slack 上最活跃的人。这次东京展览负责数据展示。

林雅婷｜资深后端工程师｜35 岁
  负责数据管线，数据导出的程序就出自这个人之手。说话简短，常在深夜上线。

许志明｜法务专员｜29 岁
  负责审阅这次合作的合约，用词严谨。曾在会议上对数据合作的范围提出疑问。

黄美玲｜产品经理｜30 岁
  BeatBird App 的产品负责人，东京展览的主讲人。安静、讲求细节，喜欢参加开源社群活动。

吴思妤｜客服主管｜41 岁
  每天处理用户对隐私的询问。公司的大姐头，常提醒大家行政事项。

陈柏翰｜业务经理｜38 岁
  促成鼎岳保险合作案的关键人物，业绩压力大。讲话习惯夹杂英文。`,
  '差勤表_0912-0916.csv': `姓名,类别,期间,地点,备注
张家豪,出差,09/13–09/16,日本东京,亚洲数字健康展・数据展示
林雅婷,远程工作,09/14–09/16,台北自宅,
许志明,年假,09/12–09/15,韩国首尔,个人旅游
黄美玲,出差,09/13–09/16,日本东京,亚洲数字健康展・主讲人
吴思妤,正常出勤,—,台北办公室,
陈柏翰,出差,09/13–09/16,新加坡,客户拜访
# 东京出差人员下榻 Hotel Sakura 新宿。09/14 行程：09:00–18:00 展场、19:00–21:30 客户晚宴（张家豪、黄美玲出席），之后自由活动。`,
  'BYOD设备登记_202603.csv': `姓名,设备型号,操作系统,登记日期
张家豪,Apple iPhone 15,iOS,2025/10/20
林雅婷,Google Pixel 7a,Android,2024/06/11
许志明,Google Pixel 8 Pro,Android,2025/12/03
黄美玲,Google Pixel 7a,Android,2024/09/27
吴思妤,Samsung Galaxy S24,Android,2024/03/15
陈柏翰,Google Pixel 7a,Android,2025/01/08
# 本表最后更新：2026/03/02。IT 规定：更换设备后请于 30 日内重新登记。`,
};

const AWU_BASE = [
  { sys: '— 互助站内部频道 —' },
  { tm: '21:18', text: '我是阿雾，今晚值班。夜鹭的案子你接了吧？' },
  { tm: '21:18', text: '建议顺序：先去论坛拿到原始照片 → 用终端读元数据 → 对照夜鹭导出的数据 → 放大照片找细节 → 交结案报告。' },
  { tm: '21:19', text: '卡住就按下面的「给我提示」。不过看越多提示，结案评级会越低喔。' },
  { tm: '21:19', text: '不熟终端也没关系：终端下方有「新手辅助」，要不要开由你决定，开了也不影响评级。' },
];
/* Opening conversation: each node shows 夜鹭's messages, then waits for the player's reply, a file transfer, or ends. */
const INTRO = {
  n1:  { msgs: ['你好……请问是雾港互助站吗？', '朋友说，你们会帮需要匿名的人。'], choices: [['是，我是今晚值班的志愿者。你还好吗？', 'n2a'], ['是的。先确认一下：你现在用的设备和网络安全吗？', 'n2b']] },
  n2a: { msgs: ['老实说，不太好。'], next: 'n3' },
  n2b: { msgs: ['我用自己的笔记本，连手机热点，没有用公司的网络。', '……你们果然很谨慎。'], next: 'n3' },
  n3:  { msgs: ['无名广场上那篇心跳鸟的爆料……是我发的。', '公司昨天寄信给所有员工，说「已委托信息安全顾问调查，将于 72 小时内查明泄密者」。', '我这两天几乎没睡。'], choices: [['先深呼吸。你做的事是为了保护用户。', 'n4a'], ['72 小时，时间不多。告诉我你发文时做了哪些防护。', 'n4b']] },
  n4a: { msgs: ['……谢谢。很久没人跟我说这句话了。'], choices: [['跟我说说，你发文的时候做了哪些防护？', 'n4b']] },
  n4b: { msgs: ['我用全新的 Email 注册论坛账号，也没有用公司网络。', '拍备忘录之前，我还特地把相机的「保存位置信息」关掉了。', '所以照片里没有 GPS。这样应该不会被找到吧？'], choices: [['关掉 GPS 是对的。不过照片能透露的，不只是位置。', 'n5a'], ['先别下结论，我们一起确认。', 'n5b']] },
  n5a: { msgs: ['……不只位置？还有什么？', '你这样说我更紧张了。'], next: 'n6' },
  n5b: { msgs: ['好。'], next: 'n6' },
  n6:  { msgs: ['还有一件事。那份备忘录 9/11 只寄给 6 个人，我是其中之一。'], choices: [['只有 6 个人？那范围非常小。', 'n7a'], ['公司查得到收件名单吗？', 'n7b']] },
  n7a: { msgs: ['我知道。所以我才怕。'], next: 'n8' },
  n7b: { msgs: ['查得到。邮件系统有记录，谁收到、谁打开过附件，一清二楚。'], next: 'n8' },
  n8:  { msgs: [], choices: [['你可以告诉我你是谁吗？这样我比较好判断。', 'n9a'], ['我不需要知道你是谁。', 'n9b']] },
  n9a: { msgs: ['不行。', '如果你推得出来，公司也推得出来。我想知道那条路到底有多短。'], next: 'n10' },
  n9b: { msgs: ['谢谢你。我本来也不打算说。', '不过……如果你推得出来，公司也推得出来。我想知道那条路到底有多短。'], next: 'n10' },
  n10: { msgs: ['我把公司内部看得到的数据都导出来了：收件名单、人物简介、差勤表、手机登记表、Slack 记录。', '公司的调查员手上一定也有这些。', '大家的 PicNote 是公开的，你自己查得到。论坛那篇文也还在。'], file: true, next: 'n11' },
  n11: { msgs: [], choices: [['收到。给我一个晚上。', 'n12']] },
  n12: { msgs: ['拜托了。', '在他们之前，找到我的破绽。'], end: true },
};

const SEARCH_INDEX = [
  { url: 'wuming.forum/t/88231', title: '【爆料】心跳鸟 BeatBird 正在把你的睡眠和心率卖给保险公司 - 无名广场', snip: '我是 BeatBird 的内部员工。这篇文我犹豫了很久……附图是备忘录的照片。', kw: ['心跳鸟', 'beatbird', '爆料', '夜鹭', 'night_heron', '无名', '论坛', '鼎岳', '保险', '备忘录'] },
  { url: 'beatbird.app', title: 'BeatBird 心跳鸟｜睡得好，活得好', snip: '追踪睡眠、心率与生理周期。我们重视你的隐私。', kw: ['心跳鸟', 'beatbird', '心跳鸟科技'] },
  { url: 'beatbird.app/privacy', title: '隐私权政策 - BeatBird', snip: '我们不会在未经你同意的情况下，将个人数据提供给第三方。最后更新：2024/05/01', kw: ['心跳鸟', 'beatbird', '隐私权', '隐私'] },
  { url: 'hotel-sakura.jp', title: 'Hotel Sakura Shinjuku｜樱馆 新宿', snip: '新宿站南口徒步 6 分钟。客房备有本馆专属便条纸与圆珠笔。', kw: ['sakura', 'hotel', '酒店', '旅馆', '新宿', 'shinjuku', '樱', '便条纸', 'saku'] },
  { url: 'worldclock.info', title: '世界时区对照表 UTC offset｜WorldClock', snip: 'UTC+8：台北、新加坡、香港……UTC+9：东京、首尔……', kw: ['时区', 'utc', 'timezone', '+09', '+9', 'gmt', 'offset', '时差', '新加坡', '东京', '首尔'] },
  { url: 'techwiki.org/exif', title: 'EXIF - TechWiki', snip: '可交换图像文件格式（EXIF）是相机写进照片文件的元数据，包含设备、时间、时区与 GPS……', kw: ['exif', '元数据', 'metadata', 'exiftool', '照片', 'gps', '元数据', '中继数据'] },
  { url: 'exifpeek.example', title: '免费在线 EXIF 查看器｜ExifPeek', snip: '不用安装任何软件！上传照片，立即查看相机型号、拍摄时间、位置等信息。', kw: ['exif', '在线', 'online', '查看', '查看', 'viewer', '元数据', 'metadata', '照片信息', '拍摄信息', '元数据'] },
  { url: 'techwiki.org/pxl', title: '手机相机的文件命名规则 - TechWiki', snip: 'Google Pixel：PXL_年月日_时分秒毫秒.jpg（UTC 时间）。iPhone：IMG_1234.HEIC……', kw: ['pxl', 'pixel', '文件名', '命名', 'img_', 'filename'] },
  { url: 'osfest.tw/2026', title: '开源嘉年华 2026｜限量洋葱猫贴纸', snip: '8/22–8/23 台北。今年纪念品：限量 300 张的洋葱猫贴纸。', kw: ['洋葱猫', '贴纸', 'sticker', '开源', '嘉年华', 'osfest', '猫'] },
  { url: 'news.example.tw/beatbird', title: '心跳鸟被爆贩售健康数据 鼎岳保险：合作仍在评估｜科技新闻', snip: '心跳鸟科技发声明表示将「严正追查泄密者」，并强调所有数据皆经过去标识化处理。', kw: ['心跳鸟', 'beatbird', '鼎岳', '新闻', '泄密', '保险'] },
  { url: 'anoni.net/docs/', ext: 'https://anoni.net/docs/', title: 'anoni.net 匿名网络社群｜文档库', snip: '把全球网络隐私议题，带回台湾脉络。概念、工具、情境指南。（外部真实网站，会在新标签页打开）', kw: ['隐私', '匿名', 'tor', 'anoni', 'exif', '元数据', '去匿名化'] },
];
// people → profile results
Object.entries(PIC).forEach(([h, p]) => SEARCH_INDEX.push({ url: 'picnote.social/@' + h, title: `${p.name} (@${h}) • PicNote`, snip: p.bio + ' · ' + p.posts.length + ' 则帖子', kw: [p.name, h, h.split(/[._]/)[0]] }));

const Q1 = [['gps', 'GPS 位置'], ['model', '手机型号'], ['tz', '拍摄时区'], ['name', '拍摄者姓名'], ['time', '拍摄时间']];
const Q2 = [['note', '酒店便条纸'], ['sticker', '笔记本上的贴纸'], ['window', '窗外景色'], ['account', '屏幕上的登录账号'], ['cup', '咖啡杯上的店名']];
const Q3 = [['ip', '发文的 IP 地址'], ['style', '用字与标点习惯'], ['email', '注册账号的 Email']];

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
const EXIF_PXL_NOTE = '（没有任何 GPS 字段）';
const EXIF_SOCIAL = (name, size) => [
  ['ExifTool Version Number', '12.76'], ['File Name', name], ['File Size', size], ['File Type', 'JPEG'], ['MIME Type', 'image/jpeg'],
  ['JFIF Version', '1.01'], ['Image Width', '1080'], ['Image Height', '810'], ['Comment', 'Processed by PicNote'],
];
const EXIF_SOCIAL_NOTE = '（没有 Make、Model、时间或 GPS 字段：上传时已被平台清除）';
/* What an OS file-properties panel shows: common fields only, no time-zone offset. */
const CAMERA_INFO = [['制造商', 'Google'], ['型号', 'Pixel 7a'], ['拍摄日期', '2026/9/14 下午 11:47'], ['拍摄地点', '（没有位置信息）']];
const PEEK_ROWS = [['文件名', PXL], ['相机制造商', 'Google'], ['相机型号', 'Pixel 7a'], ['拍摄时间', '2026:09:14 23:47:12'], ['时区', '+09:00'], ['光圈', 'f/1.9'], ['曝光时间', '1/30 秒'], ['ISO', '1250'], ['GPS 位置', '（无）']];
const socialFile = (post, handle) => `picnote_${handle}_${post.id.slice(2)}.jpg`;

/* ---------- the forum post ---------- */
const POST_PARAS = [
  '我是 BeatBird 的内部员工。这篇文我犹豫了很久，但我认为用户有权利知道。',
  '上周五，公司高层寄出一份标示「机密」的内部备忘录：BeatBird 将从 10 月起，把用户的 sleep data、resting heart rate 与月经周期记录，以「去标识化」的名义打包提供给鼎岳保险，作为保费精算的参考。',
  '问题在于：\n1. App 的隐私权政策从来没有提到这件事。\n2. 所谓的「去标识化」只是把姓名换成一串 ID，生日、邮政编码和设备 ID 都还在。只要有这三项，要把人对回去并不难。\n3. 公司法务早就知道这份合作，却选择不更新条款。',
  '附图是备忘录的照片。我已经关掉定位，也用了全新的账号。',
  '台湾的个资法不是装饰品。以上。',
];
const FORUM_THREADS = [
  ['wuming.forum/t/88231', '【爆料】心跳鸟 BeatBird 正在把你的睡眠和心率卖给保险公司', '09-14 22:52 · 回复 1,284 · 热门'],
  [null, '竹科某厂今年年终只有 1.5 个月？', '09-15 10:03 · 回复 412'],
  [null, '有人面过那间做 AI 客服的初创公司吗', '09-15 18:40 · 回复 57'],
  [null, '【心得】转岗 TPM 一年后的感想', '09-16 01:12 · 回复 203'],
];
const FORUM_REPLIES = [
  ['B1', '09-14 23:05', '这个去标识化根本假的吧……生日＋邮政编码就能对回去了'],
  ['B2', '09-14 23:20', '楼主快跑，公司一定会查'],
  ['B3', '09-15 00:41', '提醒一下，这个论坛不会帮你处理照片，上传什么就是什么。懂的就懂。'],
  // The upload trap's lure: a helpful stranger at exactly the moment players want the photo's data.
  ['B4', '09-15 00:58', '想看照片拍摄信息的话，丢 ExifPeek 就好，不用装任何软件。', 'exifpeek.example'],
  ['B5', '09-15 08:12', '已截图备份'],
  ['B6', '09-15 12:30', '心跳鸟公关说「所有数据皆经过去标识化」，笑死'],
];
const SEARCH_TIPS = ['心跳鸟', 'EXIF', '时区', 'PXL', '洋葱猫', 'Hotel Sakura'];

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
  const searchBox = (v = '') => ctx.form('mist.search/?q=', v, 's-box', '搜索网络', '搜索');

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
    return `<div class="site"><div class="wrap"><h2>无法连上这个网站</h2><p class="muted mono">${esc(url)}</p><p>找不到服务器。检查网址是否正确，或${a('mist.search/?q=' + encodeURIComponent(url), '在雾搜中搜索', 'color:#1a3d8f')}。</p></div></div>`;
  }
  function searchHits(q) {
    const ql = q.toLowerCase();
    return SEARCH_INDEX.filter(r => r.kw.some(k => ql.includes(k.toLowerCase()) || (k.length >= 2 && k.toLowerCase().includes(ql) && ql.length >= 2)));
  }
  function searchHome() {
    const tips = ctx.searchTips === false ? '' : `<div class="s-tips">试试：${SEARCH_TIPS.map(esc).join('、')}、人名</div>`;
    return `<div class="site"><div class="s-home"><div class="s-logo">雾搜<small>MIST SEARCH · 不追踪你的搜索引擎</small></div>${searchBox()}${tips}</div></div>`;
  }
  // A sponsored result sits on top of any search about photo data, the way real ads do.
  const AD_WORDS = ['exif', '照片', '相片', '元数据', '中继', 'metadata', '时区', 'pxl', '相机', '拍摄', 'gps', '工具'];
  const ad = q => AD_WORDS.some(k => q.toLowerCase().includes(k))
    ? `<div class="s-res s-ad"><div class="u"><span class="ad">广告</span>exifpeek.example</div>${a('exifpeek.example', '免费在线 EXIF 查看器｜上传照片，立即看到所有拍摄信息')}<p>不用安装软件、不用敲命令。相机型号、拍摄时间、时区、GPS，一次看清楚。</p></div>` : '';
  function searchResults(q) {
    const hits = searchHits(q);
    const list = hits.length ? hits.map(r => `<div class="s-res"><div class="u">${esc(r.url)}</div>${r.ext ? ext(r.ext, esc(r.title)) : a(r.url, esc(r.title))}<p>${esc(r.snip)}</p></div>`).join('')
      : `<p>找不到和「${esc(q)}」相关的结果。</p><p class="muted">换个关键字试试，例如：心跳鸟、EXIF、时区、PXL、洋葱猫、Hotel Sakura，或某个人的名字。</p>`;
    return `<div class="site"><div class="wrap"><div style="margin-bottom:10px">${searchBox(q)}</div><p class="muted" style="font-size:12.5px">约 ${hits.length} 项结果</p>${ad(q)}${list}</div></div>`;
  }
  function forumHome() {
    return `<div class="site forum"><div class="f-bar"><b>无名广场</b><span>匿名说真话 · 科技业板</span></div><div class="wrap">${FORUM_THREADS.map(([u, t, m]) => u ? `<a class="f-thread" ${ctx.href(u)}><b>${esc(t)}</b><br><small>${m}</small></a>` : `<div class="f-thread" style="opacity:.7"><b>${esc(t)}</b><br><small>${m}</small></div>`).join('')}</div></div>`;
  }
  function forumPost() {
    return `<div class="site forum"><div class="f-bar"><b>无名广场</b><span>科技业 › 爆料</span></div><div class="wrap">
  <div class="f-post"><h2>【爆料】心跳鸟 BeatBird 正在把你的睡眠和心率卖给保险公司</h2>
  <div class="f-meta">night_heron_0914 · 2026-09-14 22:52（UTC+8 台北时间）· 回复 1,284</div>
  ${POST_PARAS.map(p => `<p class="pinable" style="white-space:pre-line">${esc(p)} ${ctx.pin('无名广场 爆料文', p)}</p>`).join('')}
  <div class="f-attach">${ctx.thumb(PXL, img(PXL, '爆料附图缩略图'))}<div style="flex:1;min-width:160px"><div class="fn">附件：${PXL}</div><div class="muted" style="font-size:12px">${ctx.pxlSize} · 源文件</div></div>${ctx.dl(PXL, 'pxl', '', 'site-btn')}</div>
  <p class="muted" style="font-size:12px;margin:6px 0 0">这是一张真的 JPEG。想用自己电脑上的 exiftool 验证，可以<a href="${ctx.asset(PXL)}" download style="color:#1a3d8f">另存到你的电脑</a>。</p>
  </div>
  <h3 style="font-size:14px">回复</h3>
  ${FORUM_REPLIES.map(([f, t, x, url]) => `<div class="f-reply"><span class="mono muted" style="font-size:11.5px">${f} · ${t}</span><br>${esc(x)}${url ? ' ' + a(url, esc(url)) : ''}</div>`).join('')}
  </div></div>`;
  }
  const picBar = (v = '') => `<div class="p-bar"><a class="p-logo" ${ctx.href('picnote.social')}>PicNote</a>${ctx.form('picnote.social/search?q=', v, 'p-search', '搜索用户或姓名', '搜索')}</div>`;
  function picHome() {
    return `<div class="site">${picBar()}<div class="wrap"><h2 style="margin-top:0">探索</h2><p class="muted">输入姓名或账号，找找你想看的人。公开账号的帖子任何人都看得到。</p><div style="max-width:360px;margin-top:10px;border-radius:12px;overflow:hidden">${img('social/cat.jpg', '洋葱猫贴纸')}</div><p class="muted" style="font-size:12.5px">热门：#开源嘉年华2026 #洋葱猫</p></div></div>`;
  }
  function picSearch(q) {
    const ql = q.toLowerCase();
    const hits = Object.entries(PIC).filter(([h, p]) => h.includes(ql) || p.name.includes(q));
    return `<div class="site">${picBar(q)}<div class="wrap"><p class="muted">「${esc(q)}」的搜索结果</p>${hits.length ? hits.map(([h, p]) => `<a class="p-user" ${ctx.href('picnote.social/@' + h)}><span class="p-av" style="background:${p.color}">${INITIAL(p.name)}</span><span><b>${esc(p.name)}</b><br><span class="muted">@${h} · ${esc(p.bio)}</span></span></a>`).join('') : `<p>找不到符合的账号。这个人可能没有 PicNote，或账号设为不公开。</p>`}</div></div>`;
  }
  function picProfile(h) {
    const p = PIC[h];
    if (!p) return `<div class="site">${picBar()}<div class="wrap"><p>这个账号不存在。</p></div></div>`;
    return `<div class="site">${picBar()}<div class="wrap"><div class="p-prof"><span class="p-av" style="background:${p.color}">${INITIAL(p.name)}</span><div><h2>${esc(p.name)}</h2><div class="muted">@${h}</div><div>${esc(p.bio)}</div></div></div>
  <div class="p-feed">${p.posts.map(po => `<article class="p-post"><div class="p-img">${img('social/' + po.img + '.jpg', po.text)}</div><div class="p-cap">${po.type ? `<span class="muted" style="font-size:11.5px">${po.type} · </span>` : ''}${esc(po.text)}<div class="when">${po.when}（台北时间）· 地点：${esc(po.loc)}</div></div><div class="p-act">${ctx.pin('PicNote @' + h + ' ' + po.when, po.text + '（地点：' + po.loc + '）')}${ctx.dl(socialFile(po, h), 'social', `data-handle="${h}" data-post="${po.id}"`, 'pin-btn', 'social/' + po.img + '.jpg')}</div></article>`).join('')}</div></div></div>`;
  }
  function hotelPage() {
    return `<div class="site"><div class="h-hero"><div class="n">HOTEL SAKURA</div><div class="c">SHINJUKU · TOKYO</div></div><div class="wrap"><h2>樱馆 新宿</h2><p>新宿站南口徒步 6 分钟。商务与展览旅客的首选，步行可达新宿会展中心。</p>
  <div class="h-grid"><div class="h-card"><b>客房备品</b><p>每间客房皆备有本馆专属便条纸、圆珠笔与 USB 充电座。</p><div class="h-pad"><div class="h-pad-top">HOTEL SAKURA</div><div class="h-pad-sub">SHINJUKU · TOKYO</div><div class="h-pad-lines"></div></div></div>
  <div class="h-card"><b>交通</b><p>东京都新宿区（虚构地址）<br>成田机场机场大巴直达。</p></div><div class="h-card"><b>入住</b><p>15:00 起　退房 11:00<br>馆内时间为日本标准时间（UTC+9）。</p></div></div></div></div>`;
  }
  function clockPage() {
    const rows = [['UTC+7', '曼谷、河内、雅加达'], ['UTC+8', '台北、新加坡、香港、上海、吉隆坡、马尼拉'], ['UTC+9', '东京、大阪、首尔'], ['UTC+10', '悉尼、布里斯本']];
    return `<div class="site wiki"><div class="w-bar">WorldClock</div><div class="wrap w-art"><h1>世界时区对照表</h1><p>UTC（协调世界时）是全球时间的基准。各地时间以「UTC+偏移」表示。</p><div class="w-scroll"><table><tr><th>偏移</th><th>城市</th></tr>${rows.map(r => `<tr><td class="mono">${r[0]}</td><td>${r[1]}</td></tr>`).join('')}</table></div>
  <p><b>出国时手机的时区会变吗？</b><br>会。智能手机默认「自动设置时区」，连上当地移动网络后就会切换成当地时间，相机拍照时也会照当下的时区记录。</p>
  <p>${ctx.pin('WorldClock', 'UTC+8：台北、新加坡、香港；UTC+9：东京、大阪、首尔。手机出国会自动切换时区。')}</p></div></div>`;
  }
  function wikiExif() {
    return `<div class="site wiki"><div class="w-bar">TechWiki</div><div class="wrap w-art"><h1>EXIF</h1><p><b>可交换图像文件格式</b>（Exchangeable Image File Format，EXIF）是数字相机与手机在拍照时自动写进照片文件的<b>元数据</b>。</p>
  <h3>常见字段</h3><div class="w-scroll"><table><tr><th>字段</th><th>说明</th></tr><tr><td>Make / Camera Model Name</td><td>设备制造商与型号</td></tr><tr><td>Date/Time Original</td><td>拍摄时间（当地时间）</td></tr><tr><td>Offset Time Original</td><td>拍摄时的时区偏移，例如 +08:00</td></tr><tr><td>GPS Position</td><td>拍摄位置（若相机打开定位）</td></tr><tr><td>Software</td><td>处理图像的软件版本</td></tr></table></div>
  <h3>如何读取</h3><p>命令行工具 <code>exiftool</code> 是最常用的方式：<code>exiftool 文件名.jpg</code></p>
  <h3>隐私风险</h3><p>很多人以为关闭定位就安全了，但设备型号、时区、时间等字段仍会保留。<b>大型社交平台</b>通常会在上传时清除 EXIF；<b>论坛、电子邮件附件、云端硬盘</b>则常常保留原始文件。</p>
  <p>延伸阅读：${ext('https://anoni.net/docs/basics/', 'anoni.net 概念篇（外部网站）', 'color:#1a3d8f')}　·　${a('techwiki.org/pxl', '手机相机的文件命名规则', 'color:#1a3d8f')}</p></div></div>`;
  }
  function wikiPxl() {
    return `<div class="site wiki"><div class="w-bar">TechWiki</div><div class="wrap w-art"><h1>手机相机的文件命名规则</h1><p>不同品牌的相机 App 有各自的默认文件名格式。光看文件名，常常就能猜出拍摄设备。</p>
  <div class="w-scroll"><table><tr><th>品牌</th><th>格式</th><th>范例</th></tr><tr><td>Google Pixel</td><td><code>PXL_年月日_时分秒毫秒</code>，<b>UTC 时间</b></td><td><code>PXL_20260101_093012345.jpg</code></td></tr><tr><td>Apple iPhone</td><td><code>IMG_流水号</code></td><td><code>IMG_4821.HEIC</code></td></tr><tr><td>Samsung Galaxy</td><td><code>年月日_时分秒</code>，当地时间</td><td><code>20260101_173012.jpg</code></td></tr></table></div>
  <p>也就是说，就算把 EXIF 全部清干净，只要没有重命名，文件名本身仍是一份元数据。</p><p>${ctx.pin('TechWiki', 'Pixel 相机文件名 PXL_年月日_时分秒毫秒 使用 UTC 时间；清掉 EXIF 后文件名仍会泄露品牌与时间。')}</p></div></div>`;
  }
  function osPage() {
    return `<div class="site"><div class="os-hero"><h1>开源嘉年华 2026</h1><p>8/22–8/23 · 台北</p></div><div class="wrap"><h2>今年的纪念品：洋葱猫</h2><div style="max-width:320px">${img('social/cat.jpg', '洋葱猫贴纸：橘色猫头，头顶长洋葱芽')}</div><p>头顶长出洋葱芽的橘色猫咪，向守护隐私的洋葱路由致敬。<b>限量 300 张</b>，两天内全数发完。</p><p class="muted">很多参加者把它贴在笔记本上，快来分享你的洋葱猫！#洋葱猫</p><p>${ctx.pin('开源嘉年华官网', '洋葱猫贴纸：橘色猫头、头顶长洋葱芽，8/22–8/23 开源嘉年华限量 300 张。')}</p></div></div>`;
  }
  function bbHome() {
    return `<div class="site"><div class="bb-hero"><div class="bb-logo">BeatBird</div><h1>睡得好，活得好。</h1><p>追踪你的睡眠、心率与生理周期，让每一天都更健康。</p><span class="site-btn">免费下载</span></div><div class="wrap"><h3>我们重视你的隐私</h3><p>你的健康数据只属于你。我们使用业界标准的加密技术保护你的数据。</p><p>${a('beatbird.app/privacy', '阅读隐私权政策 →', 'color:#c2410c')}</p></div></div>`;
  }
  function bbPrivacy() {
    return `<div class="site"><div class="wrap"><div class="bb-logo">BeatBird</div><h1 style="font-size:24px">隐私权政策</h1><p class="muted">最后更新：2024/05/01</p><h3>我们搜集的数据</h3><ul><li>账号数据：姓名、生日、Email、邮政编码</li><li>健康数据：睡眠记录、心率、生理周期</li><li>设备数据：设备 ID、操作系统版本</li></ul><h3>数据分享</h3><p>我们不会在未经你同意的情况下，将个人数据提供给第三方。</p><p>${ctx.pin('BeatBird 隐私权政策', '隐私权政策最后更新 2024/05/01，声明不会在未经同意下提供第三方；搜集生日、邮政编码、设备 ID。')}</p></div></div>`;
  }
  function newsPage() {
    return `<div class="site"><div class="wrap"><p class="muted mono" style="font-size:12px">科技新闻 · 2026-09-15 14:20</p><h1 style="font-size:24px">心跳鸟被爆贩售健康数据　鼎岳保险：合作仍在评估</h1><p>匿名论坛 14 日晚间出现一篇爆料文，指称健康 App「心跳鸟 BeatBird」将把用户的睡眠、心率与生理周期数据提供给鼎岳保险。</p><p>心跳鸟科技今日发出声明，表示所有数据「皆经过去标识化处理」，并将「严正追查泄密者，依法究责」。据了解，公司已委托外部信息安全顾问进行内部调查。</p><p>多位隐私研究者指出，若数据保留生日、邮政编码与设备 ID，即使移除姓名，仍有很高几率能重新识别个人。</p></div></div>`;
  }
  function exifPeek() {
    const st = ctx.state();
    const imgs = st.downloads.filter(n => /\.jpg$/.test(n));
    let result = '';
    if (st.peekLast) {
      result = `<h2 style="font-size:18px">分析结果</h2>${st.peekLast === PXL
        ? `<table class="ep-table">${PEEK_ROWS.map(([k, v]) => `<tr><td>${k}</td><td class="mono">${esc(v)}</td></tr>`).join('')}</table>`
        : `<p>「${esc(st.peekLast)}」没有 EXIF 数据。照片可能在上传到其他平台时被移除了。</p>`}${ctx.afterUpload ? ctx.afterUpload(st.peekLast) : ''}`;
    }
    return `<div class="site"><div class="ep-bar">ExifPeek</div><div class="wrap"><h1 style="font-size:24px;margin:0 0 4px">免费在线 EXIF 查看器</h1><p class="muted">不用安装任何软件！上传照片，立即查看相机、时间、位置等拍摄信息。</p>
  <div class="ep-drop"><b>选择要上传的照片</b><p class="muted" style="margin:2px 0 6px">从你电脑的「下载」选择：</p>${imgs.length ? imgs.map(n => `<div class="ep-file"><span class="mono" style="word-break:break-all">${esc(n)}</span>${ctx.upload(n)}</div>`).join('') : '<p>下载里没有照片。</p>'}</div>
  ${result}
  <p class="ep-fine">上传即表示你同意本服务保存你的文件，并可能用于改善服务或提供给合作伙伴。保存期限依本服务政策而定。</p></div></div>`;
  }
  return { route, searchHits };
}
