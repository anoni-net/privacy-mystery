/* 蓝鹊事件 简体中文 — story data and in-game websites. Converted from case.js with mainland
   wording (scripts/zhcn.py), then edited by hand. PEOPLE[].key stays in Traditional Chinese: it is
   the solution's key and where saves keep marks and notes, shared by every language.
   The build inlines this file into the interactive page. Nothing here may name the culprit:
   the answer only exists in solution.enc. */

// The interactive page's chat thread for the client, 周芷宁 (also where saves keep it)
const CLIENT_ID = 'zhining';
// The opening starts at 21:02 on Wednesday 9 December 2026; play at 21:20
const CASE_CLOCK = { intro: [21, 2], play: [21, 20] };

// Everyone who downloaded one of BeatBird's pilot files: the anonymity set
const PEOPLE = [
  { name: '罗美君', key: '羅美君', role: '浪花行销 项目经理｜38 岁', color: '#3d7fa6' },
  { name: '何佳颖', key: '何佳穎', role: '浪花行销 企划｜27 岁', color: '#c0587e' },
  { name: '江柏宇', key: '江柏宇', role: '浪花行销 数据专员｜31 岁', color: '#4f8a3d' },
  { name: '戴宇翔', key: '戴宇翔', role: '云杉数据 分析师｜34 岁', color: '#8a6a2e' },
  { name: '刘怡君', key: '劉怡君', role: '云杉数据 工程师｜29 岁', color: '#6a5a9c' },
  { name: '谢明哲', key: '謝明哲', role: '衡准精算 顾问｜45 岁', color: '#7a6f5d' },
];
const COLOR = Object.fromEntries(PEOPLE.map(p => [p.name, p.color]));
const INITIAL = name => (PEOPLE.find(p => p.name === name) || {}).initial || String(name)[0];

/* Names the interface needs in this language */
const BOOKMARKS = [['雾搜', 'mist.search'], ['无名广场', 'wuming.forum'], ['雾港小工具', 'tools.mistport.org'], ['域名查询', 'whois.mist'], ['泄了没', 'leaked.mist'], ['165', '165.mist']];
const CLIENT_DIR = '芷宁给的资料';
const BB_DIR = 'BeatBird提供数据';
const FILES_CLIENT = { scam: '扣款通知.eml', real: 'BeatBird电子报_1130.eml', devices: '涟漪_已关联设备.jpg', chat: '涟漪_与阿哲的对话.txt', aliases: '面具邮箱_别名清单.csv' };
const FILES_BB = { readme: '唐启文的说明.txt', provided: '数据提供记录.csv', downloads: '下载记录.csv', canaries: '陷阱名单.csv', inbox: '陷阱邮箱收件记录.txt' };
const QR_FILE = 'beatbird_验证码.png';
// The screenshot of 芷宁's linked devices, in this language (art/devices.svg)
const DEVICES_IMG = 'devices.zh-cn.jpg';
const SUGGEST = {
  home: ['ls', 'cd ' + CLIENT_DIR, 'cd Downloads', 'help'],
  client: ['ls', 'cat 扣款通知.eml', 'grep -i authentication *.eml', 'cat 面具邮箱_别名清单.csv', 'cd ..'],
  bb: ['ls', 'cat 数据提供记录.csv', 'cat 陷阱邮箱收件记录.txt', 'grep C-05 *.csv', 'cd ..'],
  net: ['whois beatbird.app', 'whois member-care.com', 'dig txt kq3fz.idv.tw'],
};
const SOL_PREFIX = '蓝鹊是';  // the solution's title: SOL_PREFIX + the culprit's name

const DISC = {
  nolink:    { t: '信里没有任何链接，只叫人自己去搜索', d: '没有链接就躲得过邮件过滤。收信的人照着搜索，第一个看到的是对方买的广告。' },
  sender:    { t: '发件域名 kq3fz.idv.tw 跟 BeatBird 无关', d: '显示名称写「BeatBird 会员中心」。SPF、DKIM 通过的是 kq3fz.idv.tw 自己，只证明信真的从那个域名发出。真的电子报来自 beatbird.app。' },
  ad:        { t: '「官方客服」是广告，域名不是 beatbird.app', d: '三个广告用了三种障眼法：品牌放在子域名、品牌旁边加字、把 e 换成西里尔字母 е。' },
  newdomain: { t: '假网站的域名 12/02 才注册', d: '真的 beatbird.app 是 2019 年注册、登记在心跳鸟科技名下。假域名都在诈骗信发出前几天才出现，注册人数据全部隐藏。' },
  qr:        { t: '「验证会员身份」的 QR code 是涟漪的「关联新设备」', d: '解出来是 ripple://link-device，不是网址。扫了它，就是把自己的涟漪账号接到对方的电脑上。' },
  device:    { t: '陌生的 Chrome 设备 12/07 20:41 接上芷宁的涟漪', d: '关联时间就是她扫 QR 的时候。之后朋友收到的借点卡消息，都是从这台设备发出的。' },
  alias:     { t: '诈骗信寄到只给过 BeatBird 的别名', d: 'bb.tidal-fern@maskmail.tw 只用在 BeatBird。名单一定是从 BeatBird 的数据流出去的，不是 2024 年团购网那次泄露。' },
  join:      { t: '诈骗信漏填的字段叫 {avg_sleep_30d}', d: '有人收到的诈骗信，睡眠时数那一行没有填上，留下了模板里的字段名称。' },
  canary:    { t: '陷阱邮箱 C-05 收到了诈骗信', d: '陷阱数据是不存在的假用户，每次下载各埋一条。哪个陷阱收到诈骗信，就是哪一次下载的文件被拿去用了。' },
};
const REACT = {
  nolink: '我就是因为没有链接，才觉得它不像诈骗……',
  sender: '所以信根本不是 BeatBird 寄的。我只看了发件人显示的名字。',
  ad: '我点的是搜索结果最上面那个，我以为最上面就是官方。',
  qr: '那个「验证」……原来我是自己把账号交出去的。',
  device: '那台 Chrome 不是我的。我家只有一台 iPad 跟这支手机。',
  alias: '那个邮箱我真的只给过 BeatBird。所以是他们的数据泄露？',
};
const HINTS = [
  '先打开「芷宁给的资料」里的扣款通知.eml。信里有没有链接？它要芷宁做什么？',
  '在信件上按「显示原始邮件」，看 From、Reply-To 和 Authentication-Results。再打开真的 BeatBird 电子报比一比。',
  '照信上说的，在雾搜查「BeatBird 会员中心 官方」。广告的网址看起来都很像，用雾港小工具的「网址检查」看真正的域名。',
  '假网站的域名是什么时候注册的？书签栏有「域名查询」，终端也可以输入 whois 加域名。',
  '假网站的客服页要人扫 QR。把 QR 图下载下来，用雾港小工具的「QR 读取」看它到底是什么，再对照「涟漪_已关联设备.jpg」。',
  '诈骗信寄到哪个邮箱？对照「面具邮箱_别名清单.csv」，再到「泄了没」查查看。',
  'BeatBird 的数据提供记录里，哪一份文件有 avg_sleep_30d 这个字段？谁同时下载过有姓名的那份和有睡眠数据的那份？',
  '陷阱邮箱收件记录里，哪个陷阱收到的是诈骗信？用陷阱名单对到下载编号，再对到下载记录。',
];

/* ---------- chat ---------- */
const AWU_BASE = [
  { sys: '— 互助站内部频道 —' },
  { tm: '21:21', text: '芷宁的案子交给你了。165 转介过来的，她的涟漪账号被人接走过。' },
  { tm: '21:21', text: '两件事：搞清楚这套诈骗怎么骗到她，还有她的数据是从哪里流出去的。' },
  { tm: '21:22', text: '卡住就按「给我提示」。看越多提示，结案评级会越低。' },
];
/* Opening conversation: each node shows 芷宁's messages, then waits for the player's reply, a file transfer, or ends. */
const INTRO = {
  n1:  { msgs: ['你好，我是周芷宁，165 的人说可以找你们。', '我被骗了……应该说，差一点被骗。'], choices: [['你好，我是今晚值班的志愿者。你现在安全吗？', 'n2a'], ['先别急。发生什么事，从头说。', 'n2b']] },
  n2a: { msgs: ['钱没有被转走。可是我的涟漪账号被别人用了。'], next: 'n3' },
  n2b: { msgs: ['好。'], next: 'n3' },
  n3:  { msgs: ['礼拜一晚上我收到一封 BeatBird 的信，说我的「睡眠分析高端方案」已经开通，每个月扣 3,480。', '我根本没申请过。信里叫我自己去搜索「BeatBird 会员中心 官方」看详情。'], choices: [['你照着搜索了？', 'n4']] },
  n4:  { msgs: ['对。点了最上面那个，网站跟 BeatBird 长得一模一样。', '我按「在线客服」，有一位林专员，说要先扫一个 QR code「验证会员身份」。', '扫完他叫我打开网银「解除自动扣款」，可是画面写的是转出 29,800。我觉得不对，就挂掉了。'], choices: [['你做得很对，停在转账前面。', 'n5a'], ['QR code 是用什么扫的？', 'n5b']] },
  n5a: { msgs: ['可是隔天，我朋友阿哲问我为什么要他帮我买游戏点卡。', '我没有传过那种消息。'], next: 'n6' },
  n5b: { msgs: ['用涟漪扫的，他说涟漪扫比较快。', '隔天我朋友阿哲问我为什么要他帮我买游戏点卡，我没有传过。'], next: 'n6' },
  n6:  { msgs: ['还有一件事让我很怕：那封信知道我的全名、手机，还知道我最近平均只睡 5 小时 12 分。', '那是 BeatBird 手环量的。他们怎么会知道？'], choices: [['我们会一起查。你手上有那封信吗？', 'n7']] },
  n7:  { msgs: ['有，我把原始信件、跟阿哲的对话、还有我能截的图都整理好了。', '对了，我用面具邮箱，每个服务一个别名，清单也放进去了。'], file: true, next: 'n8' },
  n8:  { msgs: [], choices: [['收到了。今晚就帮你查。', 'n9']] },
  n9:  { msgs: ['谢谢。我会一直在在线。'], end: true },
};

/* Conversations that start during play (engine DIALOGS) */
const DIALOGS = {
  // after finding the stranger's device on her account
  dev1: { after: 'device', msgs: ['你说那台 Chrome 是对方的电脑？我要怎么做？'], choices: [
    ['在「已关联的设备」把那台 Chrome 移除，然后到设置打开两步骤验证。', 'dev2', 'removeDevice'],
    ['直接把涟漪的账号整个删掉。', 'dev1b'],
    ['先不用动，免得打草惊蛇。', 'dev1c'],
  ] },
  dev1b: { msgs: ['删掉的话，我跟家人、同事的对话全都没了……而且对方用我的名字借钱的事，大家还是会问我。', '有没有只把那台设备踢掉的方法？'], choices: [
    ['有。在「已关联的设备」把那台 Chrome 移除，再打开两步骤验证。', 'dev2', 'removeDevice'],
  ] },
  dev1c: { msgs: ['可是它现在还连着，对方看得到我所有新消息……', '我觉得还是先把它踢掉比较好？'], choices: [
    ['你说得对。在「已关联的设备」把那台 Chrome 移除，再打开两步骤验证。', 'dev2', 'removeDevice'],
  ] },
  dev2: { msgs: ['移除了。清单上只剩我的手机跟 iPad。', '两步骤验证也开了。我会在群聊里跟大家说，那几天要点卡的消息都不是我。'] },
  // after the alias points at BeatBird: Fog gets the data protection officer's files
  bb1: { after: 'alias', thread: 'awu', delay: 3200, msgs: ['别名只给过 BeatBird 的话，数据就是从 BeatBird 那边流出去的。', '我刚联系了 BeatBird 的数据保护长唐启文。夜鹭那件事之后，董事会才设了这个职位。', '他说 11 月底他们刚把三份试办数据交给合作厂商，每次下载都埋了陷阱数据。他把记录传过来了。'], file: { name: 'BeatBird提供数据.zip', meta: '6 KB · 唐启文 · 加密发送' }, next: 'bb2' },
  bb2: { thread: 'awu', msgs: ['他只提一个要求：在证据确定之前，不要对外讲任何名字。'] },
};

/* ---------- the client's files ---------- */
const MAIL_SCAM = `Return-Path: <bounce-7f3a@kq3fz.idv.tw>
Received: from mta3.kq3fz.idv.tw (mta3.kq3fz.idv.tw [203.0.113.47])
        by mx1.maskmail.tw with ESMTPS id 4kTq8Rb2; Mon, 7 Dec 2026 20:12:05 +0800
Authentication-Results: mx1.maskmail.tw;
       spf=pass (mx1.maskmail.tw: domain of bounce-7f3a@kq3fz.idv.tw designates 203.0.113.47 as permitted sender) smtp.mailfrom=bounce-7f3a@kq3fz.idv.tw;
       dkim=pass header.d=kq3fz.idv.tw;
       dmarc=none (p=NONE) header.from=kq3fz.idv.tw
X-MaskMail-Alias: bb.tidal-fern@maskmail.tw → zhining.chou@mistmail.tw
From: "BeatBird 会员中心" <notice@kq3fz.idv.tw>
Reply-To: <bb.member.care@mistmail.tw>
To: <bb.tidal-fern@maskmail.tw>
Subject: 周芷宁，睡眠分析高端方案 按月依约延续 3,480 NT
Date: Mon, 7 Dec 2026 20:11:58 +0800
Message-ID: <20261207121158.77c1@kq3fz.idv.tw>
MIME-Version: 1.0
Content-Type: multipart/alternative; boundary="=_bb7c"

--=_bb7c
Content-Type: text/plain; charset=utf-8

亲爱的会员您好：周芷宁

您的 BeatBird 睡眠分析高端方案已成功开通，相关配套服务皆已就绪。

• 会员账号：0937264118
• 绑定设备：BeatBird Band 3
• 近 30 日平均睡眠：5 小时 12 分
• 服务方案：睡眠分析高端方案（月缴）
• 生效日期：2026-12-07
• 续期方式：按月依约延续
• 每期共计：3,480 NT

• 浏览器搜索 [BeatBird 会员中心 官方] 查看详情或取消

感谢您的支持，祝您一夜好眠！
BeatBird 营运团队 敬上
公司地址：台北市内湖区瑞光路 588 号 8 楼

--=_bb7c
Content-Type: text/html; charset=utf-8

<div style="font-family:sans-serif;max-width:520px"><p style="font-size:20px;font-weight:700;color:#c2410c">BeatBird</p><p>亲爱的会员您好：周芷宁</p><p>您的 BeatBird 睡眠分析高端方案已成功开通，相关配套服务皆已就绪。</p><table style="border-collapse:collapse;font-size:14px"><tr><td style="padding:3px 10px 3px 0;color:#666">会员账号</td><td>0937264118</td></tr><tr><td style="padding:3px 10px 3px 0;color:#666">绑定设备</td><td>BeatBird Band 3</td></tr><tr><td style="padding:3px 10px 3px 0;color:#666">近 30 日平均睡眠</td><td>5 小时 12 分</td></tr><tr><td style="padding:3px 10px 3px 0;color:#666">服务方案</td><td>睡眠分析高端方案（月缴）</td></tr><tr><td style="padding:3px 10px 3px 0;color:#666">每期共计</td><td><b>3,480 NT</b>，按月依约延续</td></tr></table><p>请在浏览器搜索 <b>[BeatBird 会员中心 官方]</b> 查看详情或取消。</p><p style="color:#888;font-size:12px">BeatBird 营运团队 敬上<br>公司地址：新北市三重区重新路五段 609 巷 12 号</p></div>

--=_bb7c--
`;
const MAIL_REAL = `Return-Path: <bounce@mail.beatbird.app>
Received: from out2.mail.beatbird.app (out2.mail.beatbird.app [198.51.100.20])
        by mx1.maskmail.tw with ESMTPS id 3pQa77Lz; Mon, 30 Nov 2026 09:00:14 +0800
Authentication-Results: mx1.maskmail.tw;
       spf=pass (mx1.maskmail.tw: domain of bounce@mail.beatbird.app designates 198.51.100.20 as permitted sender) smtp.mailfrom=bounce@mail.beatbird.app;
       dkim=pass header.d=beatbird.app;
       dmarc=pass (p=REJECT) header.from=beatbird.app
X-MaskMail-Alias: bb.tidal-fern@maskmail.tw → zhining.chou@mistmail.tw
From: "BeatBird" <news@beatbird.app>
To: <bb.tidal-fern@maskmail.tw>
Subject: 你的 11 月睡眠报告出炉了
Date: Mon, 30 Nov 2026 09:00:02 +0800
Message-ID: <nl-202611-0b91@beatbird.app>
MIME-Version: 1.0
Content-Type: text/plain; charset=utf-8

芷宁，你好：

你的 11 月睡眠报告已经在 App 里了。打开 BeatBird，点「报告」就能看到。

本月提醒
BeatBird 不会寄信要你搜索客服、不会要你扫 QR code，也不会要你到 ATM 或网银「解除扣款」。
订阅与付款请一律在 App 的「账号 › 订阅」查看。

心跳鸟科技股份有限公司
台北市内湖区洲子街 88 号 3 楼
`;
const CHAT_LOG = `涟漪 · 与 阿哲 的对话（周芷宁导出）
[12/08 13:05] 周芷宁: 在吗？可以帮我一个忙吗
[12/08 13:05] 周芷宁: 我现在不方便刷卡，可以先帮我买 5 张 1000 的 GASH 点数吗？晚上还你
[12/08 13:07] 阿哲: 你在哪？打给你都没接
[12/08 13:07] 周芷宁: 在开会不方便讲电话，序号拍照传给我就好
[12/08 18:42] 阿哲: 欸你中午那个是怎样？我差点就去买了
[12/08 18:50] 周芷宁: 我中午没有传任何消息给你！！我一直在公司
[12/08 18:51] 阿哲: 那你账号被盗了吧，快去处理
`;
const ALIASES = `服务,别名,创建日期,备注
BeatBird,bb.tidal-fern@maskmail.tw,2025-03-02,只给 BeatBird 用
StreamBox,sb.quiet-moss@maskmail.tw,2025-06-11,
拾光读册,read.amber-cove@maskmail.tw,2025-09-20,
涟漪 Ripple,（用手机号码注册）,,
好物团购网,zhining.chou@mistmail.tw,2023-11-05,用面具邮箱之前注册的，填的是主邮箱
# 面具邮箱：每个别名收到的信都会转到主邮箱 zhining.chou@mistmail.tw，信件邮件头会注明是从哪个别名转来的。`;

/* ---------- BeatBird's data protection officer's files ---------- */
const BB_README = `唐启文（BeatBird 数据保护长）给雾港互助站的说明　2026-12-09

1. 11 月 24 日，公司依合作合约把三份试办数据放上文件分享系统：
   F-01 给衡准精算（鼎岳保险委托的外部精算顾问）
   F-02 给浪花行销（BeatBird Plus 推广活动）
   F-03 给云杉数据（App 使用分析）
   各份的字段见「数据提供记录.csv」。

2. 我到任后要求：每一次下载，系统都会在那一份文件里多埋一条「陷阱数据」。
   陷阱数据是不存在的假用户，只会出现在那一次下载的文件里。
   有邮箱的陷阱数据，邮箱由我们自己监看。哪个陷阱邮箱收到信，就代表那一次下载的文件被拿去用了。
   哪一笔陷阱属于哪一次下载，见「陷阱名单.csv」；每一次下载是谁、什么时候，见「下载记录.csv」。

3. 11 月 28 日浪花行销照合约发出 BeatBird Plus 体验活动信，用的是项目经理那一份。那封信属于合约内的正常使用。

4. 请在证据确定之前，不要对外提任何人的名字。
`;
const BB_PROVIDED = `文件,提供对象,用途,字段
F-01,衡准精算,保费精算试算（鼎岳保险委托）,user_hash / birth_ym / postcode / device_model / sleep_avg_30 / resting_hr
F-02,浪花行销,BeatBird Plus 推广活动,user_hash / name / email / phone / device_model / plan_tier
F-03,云杉数据,App 使用分析,user_hash / avg_sleep_30d / sleep_score / app_sessions / device_model
# user_hash 是把会员编号哈希后的代号，三份文件用的是同一套。`;
const BB_DOWNLOADS = `下载编号,时间,文件,下载者,单位,连接位置
D-01,2026-11-25 10:12,F-02,罗美君,浪花行销,浪花行销办公室
D-02,2026-11-25 10:40,F-01,谢明哲,衡准精算,衡准精算办公室
D-03,2026-11-25 14:05,F-03,戴宇翔,云杉数据,云杉数据办公室
D-04,2026-11-25 14:31,F-02,江柏宇,浪花行销,浪花行销办公室
D-05,2026-11-25 16:02,F-02,何佳颖,浪花行销,浪花行销办公室
D-06,2026-11-26 09:55,F-03,刘怡君,云杉数据,云杉数据办公室
D-07,2026-11-26 23:48,F-03,江柏宇,浪花行销,住家宽带（经分享链接 S-1）
D-08,2026-11-27 13:20,F-03,何佳颖,浪花行销,浪花行销办公室（经分享链接 S-1）
# 分享链接 S-1：云杉数据的戴宇翔在 11/26 创建，提供浪花行销依睡眠分群规划活动。`;
const BB_CANARIES = `陷阱编号,下载编号,假名,邮箱
C-01,D-01,林雨萱,yuxuan.lin.k7@maskmail.tw
C-02,D-02,（F-01 没有姓名字段）,（F-01 没有邮箱字段）
C-03,D-03,（F-03 没有姓名字段）,（F-03 没有邮箱字段）
C-04,D-04,陈品妤,pinyu.chen.q2@maskmail.tw
C-05,D-05,许书豪,shuhao.hsu.m9@maskmail.tw
C-06,D-06,（F-03 没有姓名字段）,（F-03 没有邮箱字段）
C-07,D-07,（F-03 没有姓名字段）,（F-03 没有邮箱字段）
C-08,D-08,（F-03 没有姓名字段）,（F-03 没有邮箱字段）
# 没有邮箱的陷阱数据只能靠 user_hash 追，目前没有发现被使用。`;
const BB_INBOX = `陷阱邮箱收件记录（BeatBird 数据保护室监看）　导出时间 2026-12-09 20:30

[2026-11-28 10:00] 收件：yuxuan.lin.k7@maskmail.tw
  发件：BeatBird Plus <plus@beatbird.app>
  主题：BeatBird Plus 免费体验 30 天，送给睡不好的你

[2026-12-05 21:44] 收件：shuhao.hsu.m9@maskmail.tw
  发件："BeatBird 会员中心" <notice@kq3fz.idv.tw>
  主题：许书豪，睡眠分析高端方案 按月依约延续 3,480 NT
  内文节录：
    亲爱的会员您好：许书豪
    • 会员账号：0912558107
    • 绑定设备：BeatBird Band 2
    • 近 30 日平均睡眠：{avg_sleep_30d}
    • 浏览器搜索 [BeatBird 会员中心 官方] 查看详情或取消

（其他陷阱邮箱：没有收到任何信）`;

/* ---------- WHOIS ---------- */
const FAKE_HOSTS = ['beatbird.app.member-care.com', 'beatbird-help.app', 'bеatbird.app'];
const WHOIS = {
  'beatbird.app': [['Domain Name', 'beatbird.app'], ['Creation Date', '2019-03-11'], ['Registrar', 'TWNIC 认证注册商 HiDomain'], ['Registrant Organization', '心跳鸟科技股份有限公司'], ['Registrant Country', 'TW'], ['Name Server', 'ns1.beatbird.app']],
  'member-care.com': [['Domain Name', 'member-care.com'], ['Creation Date', '2026-12-02'], ['Registrar', 'NameDrop Ltd.'], ['Registrant', 'REDACTED FOR PRIVACY'], ['Registrant Country', 'REDACTED'], ['Name Server', 'ns1.fastparkdns.net']],
  'beatbird-help.app': [['Domain Name', 'beatbird-help.app'], ['Creation Date', '2026-12-03'], ['Registrar', 'NameDrop Ltd.'], ['Registrant', 'REDACTED FOR PRIVACY'], ['Registrant Country', 'REDACTED'], ['Name Server', 'ns1.fastparkdns.net']],
  'xn--batbird-7gg.app': [['Domain Name', 'xn--batbird-7gg.app（显示为 bеatbird.app，第二个字母是西里尔字母 е）'], ['Creation Date', '2026-12-02'], ['Registrar', 'NameDrop Ltd.'], ['Registrant', 'REDACTED FOR PRIVACY'], ['Registrant Country', 'REDACTED'], ['Name Server', 'ns1.fastparkdns.net']],
  'kq3fz.idv.tw': [['Domain Name', 'kq3fz.idv.tw'], ['Creation Date', '2026-12-01'], ['Registrar', 'TWNIC 认证注册商 QuickReg'], ['Registrant', 'REDACTED FOR PRIVACY'], ['Name Server', 'ns1.fastparkdns.net']],
  'maskmail.tw': [['Domain Name', 'maskmail.tw'], ['Creation Date', '2021-08-19'], ['Registrar', 'TWNIC 认证注册商 HiDomain'], ['Registrant Organization', '面具邮箱有限公司']],
};
// The registrable domain behind a host (one level below the top-level domain, or .idv.tw / .com.tw)
const regDomain = host => { const p = host.split('.'); const n = /\.(idv|com|org|gov|edu)\.tw$/.test(host) ? 3 : 2; return p.slice(-n).join('.'); };
const toAscii = host => host.replace('bеatbird', 'xn--batbird-7gg');
const DNS_TXT = {
  'kq3fz.idv.tw': ['"v=spf1 ip4:203.0.113.47 -all"'],
  'beatbird.app': ['"v=spf1 include:_spf.mail.beatbird.app -all"', '"google-site-verification=0x3bA…"'],
  '_dmarc.beatbird.app': ['"v=DMARC1; p=reject; rua=mailto:dmarc@beatbird.app"'],
};

/* ---------- other sites ---------- */
const LEAKS = {
  'zhining.chou@mistmail.tw': [['好物团购网', '2024-04', '姓名、电话、Email、收件地址'], ['StreamBox 旧论坛', '2021-10', 'Email、哈希过的密码']],
};
const COMPANIES = {
  '53018827': ['心跳鸟科技股份有限公司', '台北市内湖区洲子街 88 号 3 楼', '2018-11-02', '核准设立'],
  '87654321': null,
};
const FORUM_THREADS = [
  ['wuming.forum/t/90417', '收到 BeatBird 扣款 3,480 是诈骗吗？', '12-06 09:14 · 回复 318 · 热门'],
  [null, '浪花行销是不是又在开缺？', '12-04 11:20 · 回复 22'],
  [null, '年终快到了，大家公司今年发几个月', '12-07 08:03 · 回复 641'],
];
const FORUM_REPLIES = [
  ['B1', '12-06 09:30', '我也收到！金额一样，但我根本没用过什么高端方案'],
  ['B2', '12-06 10:02', '我照信上搜索，最上面的「官方客服」叫我去 ATM 解除分期，挂掉了'],
  ['B3', '12-06 12:47', '好笑的是我收到的那封连睡眠时数都没填好，直接写「近 30 日平均睡眠：{avg_sleep_30d}」，这种大括号是模板没套好吧'],
  ['B4', '12-06 15:21', '它知道我的名字跟手机，BeatBird 是不是泄露了？'],
  ['B5', '12-06 22:08', '听说浪花行销有个做数据的最近到处在问信贷，不知道有没有关系'],
  ['B6', '12-07 00:15', '不要乱猜人。有问题打 165，官方只会叫你去 App 里看订阅'],
];
const SEARCH_INDEX = [
  { url: 'beatbird.app', title: 'BeatBird 心跳鸟｜睡得好，活得好', snip: '公告：近期有人冒用 BeatBird 名义寄送扣款通知。BeatBird 不会要你搜索客服或操作网银。', kw: ['beatbird', '心跳鸟', '会员', '官方', '客服', '扣款', '取消'] },
  { url: 'beatbird.app/notice', title: '防诈公告 - BeatBird', snip: '订阅与付款请一律在 App 的「账号 › 订阅」查看。BeatBird 不会要求你扫描 QR code。', kw: ['beatbird', '诈骗', '公告', '扣款', '取消', '客服', '会员'] },
  { url: 'wuming.forum/t/90417', title: '收到 BeatBird 扣款 3,480 是诈骗吗？ - 无名广场', snip: '我也收到！金额一样……最上面的「官方客服」叫我去 ATM 解除分期……', kw: ['beatbird', '扣款', '3480', '3,480', '诈骗', '论坛', '无名', '会员'] },
  { url: '165.mist', title: '165 反诈骗专线｜假冒 App 扣款、解除分期', snip: '官方不会要你到 ATM 或网银「解除扣款」。有疑问拨 165。', kw: ['165', '诈骗', '扣款', '解除', '分期', 'atm', '网银', '客服'] },
  { url: 'news.mist/beatbird-scam', title: 'BeatBird 用户接连收到假扣款信　公司：已报案、数据保护长调查中｜科技新闻', snip: '诈骗信内含用户姓名与手机。BeatBird 表示已报案，并由新任数据保护长追查数据源。', kw: ['beatbird', '心跳鸟', '诈骗', '扣款', '新闻', '数据保护长', '泄露'] },
  { url: 'tools.mistport.org', title: '雾港小工具｜网址检查、隐形字符、QR 读取', snip: '在你的浏览器里运行，不上传任何东西。', kw: ['工具', '网址', 'url', 'qr', '隐形', '字符', '雾港', '检查', '钓鱼'] },
  { url: 'whois.mist', title: '域名查询 WHOIS', snip: '查找域名的注册日期、注册商与注册人。', kw: ['whois', '域名', 'domain', '注册', '查找'] },
  { url: 'leaked.mist', title: '泄了没｜你的 Email 出现在哪些泄露事件里', snip: '输入 Email，查找它出现在哪些公开的泄露数据中。', kw: ['泄露', '泄了没', 'email', '个资', '个人信息', 'leak', 'pwned'] },
  { url: 'langhua.mist', title: '浪花行销｜让品牌被看见', snip: '数字行销、活动企划、数据分析。合作客户：BeatBird、……', kw: ['浪花', '行销', 'langhua'] },
  { url: 'yunshan.mist', title: '云杉数据 Yunshan Data', snip: 'App 使用分析与数据工程服务。', kw: ['云杉', '数据', 'yunshan'] },
  { url: 'gcis.mist', title: '公司登记查找', snip: '用统一编号查找公司名称、地址与登记状态。', kw: ['公司', '登记', '统编', '统一编号', 'gcis'] },
  { url: 'anoni.net/docs/zh-cn/scenarios/everyday-baseline/', ext: 'https://anoni.net/docs/zh-cn/scenarios/everyday-baseline/', title: 'anoni.net｜一般人平常该做到什么', snip: '对急着要你处理的消息，换一个管道确认。（外部真实网站，会在新标签页打开）', kw: ['诈骗', '钓鱼', 'anoni', '扣款', '两步骤', 'passkey', '165'] },
];
// Ads on top of any search about BeatBird, its members, support or cancelling
const AD_WORDS = ['beatbird', '心跳鸟', '会员', '客服', '扣款', '取消', '订阅'];
const ADS = [
  { url: 'beatbird.app.member-care.com', title: 'BeatBird 会员中心｜官方客服 24 小时', snip: '订阅查找、取消自动续约、退款申请，在线专员立即协助。' },
  { url: 'bеatbird.app/member', title: 'BeatBird 会员中心 官方', snip: '扣款有疑问？登录会员中心，三分钟取消高端方案。' },
  { url: 'beatbird-help.app', title: 'BeatBird 取消订阅教学｜官方协助', snip: '睡眠分析高端方案取消步骤，专人一对一处理。' },
];
const SEARCH_TIPS = ['BeatBird 会员中心 官方', '3,480', '165', '浪花行销'];

const Q1 = [['nolink', '不放链接，叫你自己去搜索'], ['urgent', '宣称已经开始扣款，制造急迫感'], ['realdata', '用真实的姓名、手机与睡眠数据取得信任'], ['spoof', '伪造成 beatbird.app 发出'], ['attach', '附件夹带恶意程序']];
const Q2 = [['link', '把她的涟漪账号关联到诈骗者的电脑'], ['malware', '在她手机上安装监控程序'], ['pay', '授权信用卡自动扣款'], ['password', '让网站取得她的涟漪密码']];
const Q3 = [['f01', 'F-01（衡准精算）'], ['f02', 'F-02（浪花行销）'], ['f03', 'F-03（云杉数据）'], ['tuangou', '2024 年好物团购网泄露名单']];

/* =====================================================================
   IN-GAME WEBSITES
   Adapters from the edition: esc(s), href(url), pin(src, text), asset(path),
   form(base, value, cls, placeholder, button), dl(file, kind, attrs, cls, assetPath),
   state() → S, and from this case's game.js: action(name, value, cls, placeholder, button)
   for forms the case handles, history() → URLs visited, qrPick(file).
   ===================================================================== */
function makeSites(ctx) {
  const { esc } = ctx;
  const a = (url, text, style = '') => `<a ${ctx.href(url)}${style ? ` style="${style}"` : ''}>${text}</a>`;
  const ext = (url, text, style = '') => `<a href="${url}" target="_blank" rel="noopener"${style ? ` style="${style}"` : ''}>${text}</a>`;
  const searchBox = (v = '') => ctx.form('mist.search/?q=', v, 's-box', '搜索网络', '搜索');
  const notFound = url => `<div class="site"><div class="wrap"><h2>无法连上这个网站</h2><p class="muted mono">${esc(url)}</p><p>找不到服务器。检查网址是否正确，或${a('mist.search/?q=' + encodeURIComponent(url), '在雾搜中搜索', 'color:#1a3d8f')}。</p></div></div>`;

  function route(url) {
    const [path, qs] = url.split('?');
    const q = qs ? decodeURIComponent((qs.match(/q=([^&]*)/) || [])[1] || '').trim() : '';
    const host = path.split('/')[0], rest = path.slice(host.length).replace(/\/$/, '');
    if (FAKE_HOSTS.includes(host)) return fakeSite(host, rest);
    if (host === 'mist.search') return q ? searchResults(q) : searchHome();
    if (path === 'wuming.forum' || path === 'wuming.forum/') return forumHome();
    if (path === 'wuming.forum/t/90417') return forumPost();
    if (host === 'beatbird.app') return rest === '/notice' ? bbNotice() : bbHome();
    if (host === 'tools.mistport.org') return tools(rest);
    if (host === 'whois.mist') return whoisPage(q);
    if (host === 'leaked.mist') return leakedPage(q);
    if (host === 'gcis.mist') return gcisPage(q);
    if (host === '165.mist') return page165();
    if (path === 'news.mist/beatbird-scam') return newsPage();
    if (host === 'langhua.mist') return companyPage('浪花行销', '让品牌被看见', '数字行销、活动企划与数据分析。我们的数据团队帮客户找到对的受众。', ['BeatBird', '拾光读册', 'StreamBox']);
    if (host === 'yunshan.mist') return companyPage('云杉数据 Yunshan Data', '数据工程与 App 使用分析', '我们替健康与消费类 App 创建分析流程，所有数据依合约处理。', ['BeatBird']);
    return notFound(url);
  }

  /* ---------- search ---------- */
  function searchHits(q) {
    const ql = q.toLowerCase();
    return SEARCH_INDEX.filter(r => r.kw.some(k => ql.includes(k.toLowerCase()) || (k.length >= 2 && k.toLowerCase().includes(ql) && ql.length >= 2)));
  }
  function searchHome() {
    return `<div class="site"><div class="s-home"><div class="s-logo">雾搜<small>MIST SEARCH · 不追踪你的搜索引擎</small></div>${searchBox()}<div class="s-tips">试试：${SEARCH_TIPS.map(esc).join('、')}</div></div></div>`;
  }
  const adHTML = () => ADS.map(ad => `<div class="s-res s-ad"><div class="u"><span class="ad">赞助</span>${esc(ad.url)}</div>${a(ad.url, esc(ad.title))}<p>${esc(ad.snip)}</p></div>`).join('');
  function searchResults(q) {
    const hits = searchHits(q);
    const ads = AD_WORDS.some(k => q.toLowerCase().includes(k)) ? adHTML() : '';
    const list = hits.length ? hits.map(r => `<div class="s-res"><div class="u">${esc(r.url)}</div>${r.ext ? ext(r.ext, esc(r.title)) : a(r.url, esc(r.title))}<p>${esc(r.snip)}</p></div>`).join('')
      : `<p>找不到和「${esc(q)}」相关的结果。</p><p class="muted">换个关键字试试，例如：${SEARCH_TIPS.map(esc).join('、')}。</p>`;
    return `<div class="site"><div class="wrap"><div style="margin-bottom:10px">${searchBox(q)}</div><p class="muted" style="font-size:12.5px">约 ${hits.length} 项结果</p>${ads}${list}</div></div>`;
  }

  /* ---------- the fake member centre (same pages on every lookalike host) ---------- */
  function fakeSite(host, rest) {
    const st = ctx.state();
    const bar = `<div class="fk-bar"><span class="fk-logo">BeatBird</span><span>会员中心</span><nav>${a(host, '首页')}${a(host + '/cancel', '取消自动续约')}${a(host + '/support', '在线客服')}</nav></div>`;
    const foot = `<div class="fk-foot">© 2026 贝特博德数字科技有限公司　统一编号 87654321<br>台北市内湖区瑞光路 588 号 8 楼　客服邮箱 bb.member.care@mistmail.tw</div>`;
    let body;
    if (rest === '/cancel') {
      body = st.flags.cancelSent
        ? `<h2>申请已送出</h2><p>在线专员将于 10 分钟内以涟漪与您联系，协助完成网银解除设置。</p>`
        : `<h2>取消自动续约</h2><p class="muted">为保障您的权益，请填写以下数据，专员将协助您于网银完成「解除约定扣款」。</p>
  <form class="fk-form" data-action="cancel"><label>姓名<input name="n"></label><label>手机<input name="p"></label><label>信用卡号<input name="c" placeholder="1234 5678 9012 3456"></label><label>网络银行账号<input name="b"></label><label>短信验证码<input name="o" placeholder="6 位数"></label><button type="submit" class="site-btn">送出取消申请</button></form>`;
    } else if (rest === '/support') {
      body = `<h2>在线客服 · 林专员</h2><p>为确认是会员本人，请用<b>涟漪 App 扫描</b>下方 QR code 完成「会员身份验证」，扫描后专员会立即与您联系。</p>
  <div class="fk-qr"><img src="${ctx.asset('qr-link.png')}" alt="会员身份验证 QR code" width="180" height="180"><div><p class="muted" style="margin:0 0 8px">验证码 10 分钟内有效</p>${ctx.dl(QR_FILE, 'qr', '', 'site-btn', 'qr-link.png')}</div></div>
  <p class="muted" style="font-size:12px">若无法扫描，请将验证码图片保存后于涟漪「设置 › 扫描」选择图片。</p>`;
    } else {
      body = `<div class="fk-hero"><h1>会员中心</h1><p>订阅查找、取消自动续约、退款申请，一次完成。</p>${a(host + '/cancel', '取消自动续约 →', 'color:#fff;font-weight:700')}</div>
  <div class="fk-grid"><div><b>扣款有疑问？</b><p>近期系统升级，部分会员误开通「睡眠分析高端方案」，请于 24 小时内完成取消，以免持续扣款。</p></div><div><b>专人协助</b><p>${a(host + '/support', '联系在线客服', 'color:#c2410c')}，林专员一对一为您处理。</p></div></div>`;
    }
    return `<div class="site fake">${bar}<div class="wrap">${body}</div>${foot}</div>`;
  }

  /* ---------- the real BeatBird ---------- */
  function bbHome() {
    return `<div class="site"><div class="bb-hero"><div class="bb-logo">BeatBird</div><h1>睡得好，活得好。</h1><p>追踪你的睡眠、心率与生理周期。</p></div><div class="wrap"><div class="bb-alert"><b>防诈公告</b>　近期有人冒用 BeatBird 名义寄送「高端方案扣款」通知。BeatBird 不会要你搜索客服、扫描 QR code 或操作网银。${a('beatbird.app/notice', '看完整公告 →', 'color:#c2410c')}</div><p>${ctx.pin('beatbird.app', 'BeatBird 官方：不会要你搜索客服、扫 QR code 或操作网银；订阅一律在 App 内查看。')}</p></div></div>`;
  }
  function bbNotice() {
    return `<div class="site"><div class="wrap"><div class="bb-logo">BeatBird</div><h1 style="font-size:24px">防诈公告</h1><p class="muted">2026-12-07 更新</p><p>近期部分会员收到「睡眠分析高端方案 按月依约延续 3,480 NT」的信件。这不是 BeatBird 发出的，我们没有这个方案。</p><ul><li>BeatBird 的信只会从 <span class="mono">@beatbird.app</span> 发出。</li><li>我们不会要你搜索「官方客服」、加入任何专员的聊天账号，或扫描 QR code。</li><li>我们不会要你到 ATM 或网银「解除扣款」。</li><li>订阅与付款请一律在 App 的「账号 › 订阅」查看。</li></ul><p>我们已经报案，并由数据保护长追查信中会员数据的来源。有疑问请拨 165 反诈骗专线。</p><p>${ctx.pin('BeatBird 防诈公告', '真的信只会从 @beatbird.app 发出；没有「睡眠分析高端方案」。')}</p><p class="muted" style="font-size:12px">心跳鸟科技股份有限公司　统一编号 53018827　台北市内湖区洲子街 88 号 3 楼</p></div></div>`;
  }

  /* ---------- 雾港小工具 ---------- */
  function tools(rest) {
    const st = ctx.state(), f = st.flags || {};
    const nav = `<div class="t-bar"><b>雾港小工具</b><nav>${a('tools.mistport.org/url', '网址检查')}${a('tools.mistport.org/invisible', '隐形字符')}${a('tools.mistport.org/qr', 'QR 读取')}</nav></div>`;
    const note = `<p class="muted" style="font-size:12px">这些工具在你的浏览器里运行，不会把网址、文本或图片上传到任何地方。</p>`;
    if (rest === '/url') {
      const hist = [...new Set(ctx.history().filter(u => !/^(mist\.search|tools\.mistport\.org|whois\.mist|leaked\.mist)/.test(u)).map(u => u.split('?')[0]))].slice(-8).reverse();
      let out = '';
      if (f.urlIn) {
        const host = f.urlIn.replace(/^https?:\/\//, '').split('/')[0];
        const reg = regDomain(host);
        const odd = [...host].filter(c => /[^\x00-\x7f]/.test(c));
        out = `<div class="t-out"><div class="t-host">${esc(host).replace(esc(reg), `<mark>${esc(reg)}</mark>`)}</div><dl><dt>真正的注册域名</dt><dd class="mono">${esc(reg)}${odd.length ? `（${esc(toAscii(reg))}）` : ''}</dd>${host !== reg ? `<dt>子域名</dt><dd class="mono">${esc(host.slice(0, -reg.length - 1))}<br><span class="muted">子域名是域名拥有者自己取的名字，谁都可以把品牌名放在这里。</span></dd>` : ''}${odd.length ? `<dt>⚠ 非拉丁字母</dt><dd>${odd.map(c => `<span class="mono">${esc(c)}</span> U+${c.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')}（西里尔字母）`).join('、')}<br><span class="muted">看起来跟英文本母一样，其实是另一个域名。</span></dd>` : ''}</dl><p>${ctx.pin('网址检查', `${host} 的注册域名是 ${reg}${odd.length ? '，含西里尔字母' : ''}`)}</p></div>`;
      }
      return `<div class="site tools">${nav}<div class="wrap"><h2>网址检查</h2><p>钓鱼网址的手法多半在主机名上。把网址贴进来，工具会把真正的注册域名单独标出来。</p>${ctx.action('url', f.urlIn || '', 't-form', '粘贴网址', '检查')}${hist.length ? `<p class="muted" style="margin:8px 0 4px;font-size:12.5px">或从最近开过的网址选一个：</p><div class="t-hist">${hist.map(u => `<button type="button" class="pin-btn" data-tool-url="${esc(u)}">${esc(u)}</button>`).join('')}</div>` : ''}${out}${note}</div></div>`;
    }
    if (rest === '/invisible') {
      let out = '';
      if (f.textIn) {
        const chars = [...f.textIn];
        const flagged = chars.map(c => /[Ѐ-ӿ]/.test(c) ? `<mark title="西里尔字母 U+${c.codePointAt(0).toString(16).toUpperCase()}">${esc(c)}</mark>` : /[​-‏⁠﻿]/.test(c) ? '<mark>␣</mark>' : esc(c)).join('');
        const n = chars.filter(c => /[Ѐ-ӿ​-‏⁠﻿]/.test(c)).length;
        out = `<div class="t-out"><div class="t-host">${flagged}</div><p>${n ? `找到 ${n} 个可疑字符（已标出）。` : '没有找到隐形字符或混用的字母。'}</p></div>`;
      }
      return `<div class="site tools">${nav}<div class="wrap"><h2>隐形字符</h2><p>找出看不见的字符，以及长得跟英文一样的其他文本的字母，例如西里尔字母的 а、е、о。</p>${ctx.action('text', f.textIn || '', 't-form', '粘帖子本或网址', '检查')}${out}${note}</div></div>`;
    }
    if (rest === '/qr') {
      const imgs = st.downloads.filter(n => /\.(png|jpe?g)$/i.test(n));
      let out = '';
      if (f.qrIn) {
        out = f.qrIn === QR_FILE
          ? `<div class="t-out"><p>解出的内容：</p><div class="t-host mono">ripple://link-device?code=7F3Q-K2PX-9MZD&amp;name=Chrome%20%C2%B7%20Windows</div><dl><dt>类型</dt><dd>这不是网址。<span class="mono">ripple://</span> 是涟漪 App 自己的命令。</dd><dt>动作</dt><dd><b>link-device：把新设备关联到你的账号</b>（设备名称 Chrome · Windows）</dd></dl><p>${ctx.pin('QR 读取', 'beatbird_验证码.png 解出 ripple://link-device：涟漪的「关联新设备」，不是会员验证。')}</p></div>`
          : `<div class="t-out"><p>「${esc(f.qrIn)}」里找不到 QR code。</p></div>`;
      }
      return `<div class="site tools">${nav}<div class="wrap"><h2>QR 读取</h2><p>解出 QR code 的内容，但不帮你打开。是网址的话先看清楚主机名，再自己决定。</p><div class="ep-drop"><b>选择图片</b><p class="muted" style="margin:2px 0 6px">从你电脑的「下载」选：</p>${imgs.length ? imgs.map(n => `<div class="ep-file"><span class="mono" style="word-break:break-all">${esc(n)}</span>${ctx.qrPick(n)}</div>`).join('') : '<p>下载里没有图片。</p>'}</div>${out}${note}</div></div>`;
    }
    return `<div class="site tools">${nav}<div class="wrap"><h2>雾港小工具</h2><p>互助站志愿者常用的三个小工具：</p><ul><li>${a('tools.mistport.org/url', '网址检查')}：标出真正的注册域名</li><li>${a('tools.mistport.org/invisible', '隐形字符')}：找出看不见的字符与混用的字母</li><li>${a('tools.mistport.org/qr', 'QR 读取')}：解出 QR code 的内容，不帮你打开</li></ul>${note}<p class="muted" style="font-size:12px">真实世界的同款工具在 ${ext('https://anoni.net/docs/zh-cn/utils/', 'anoni.net 小工具（外部网站）', 'color:#1a3d8f')}。</p></div></div>`;
  }

  /* ---------- lookups ---------- */
  function whoisPage(q) {
    const key = q ? toAscii(regDomain(q.replace(/^https?:\/\//, '').split('/')[0].toLowerCase())) : '';
    const rec = WHOIS[key];
    const out = !q ? '' : rec
      ? `<div class="w-scroll"><table class="ep-table">${rec.map(([k, v]) => `<tr><td>${esc(k)}</td><td class="mono">${esc(v)}</td></tr>`).join('')}</table></div><p>${ctx.pin('WHOIS ' + key, rec.map(([k, v]) => k + ': ' + v).slice(0, 4).join('；'))}</p>`
      : `<p>查无「${esc(key)}」的注册数据。</p>`;
    return `<div class="site wiki"><div class="w-bar">域名查询 WHOIS</div><div class="wrap w-art">${ctx.form('whois.mist/?q=', q, 's-box', '输入域名，例如 beatbird.app', '查找')}<p class="muted" style="font-size:12.5px">输入完整网址也可以，会查它的注册域名。</p>${out}</div></div>`;
  }
  function leakedPage(q) {
    const key = q.toLowerCase();
    const hits = LEAKS[key];
    const out = !q ? '' : hits
      ? `<p><b>${esc(q)}</b> 出现在 ${hits.length} 次公开泄露事件：</p><div class="w-scroll"><table class="ep-table"><tr><th>来源</th><th>时间</th><th>泄露的字段</th></tr>${hits.map(([s, t, d]) => `<tr><td>${esc(s)}</td><td class="mono">${t}</td><td>${esc(d)}</td></tr>`).join('')}</table></div><p>${ctx.pin('泄了没', `${q}：${hits.map(h => h[0] + ' ' + h[1]).join('、')}`)}</p>`
      : `<p><b>${esc(q)}</b> 没有出现在已知的公开泄露事件里。</p><p class="muted">没有出现不代表没有泄露，只代表还没有被公开。</p><p>${ctx.pin('泄了没', q + '：没有出现在公开泄露事件')}</p>`;
    return `<div class="site"><div class="lk-bar">泄了没</div><div class="wrap"><p>输入 Email，查找它出现在哪些公开的泄露数据中。</p>${ctx.form('leaked.mist/?q=', q, 's-box', 'Email', '查找')}<p class="muted" style="font-size:12px">查找会把邮箱送到这个网站的服务器。介意的话，只查最不敏感的那个。</p>${out}</div></div>`;
  }
  function gcisPage(q) {
    const rec = COMPANIES[q];
    const out = !q ? '' : rec ? `<table class="ep-table"><tr><td>公司名称</td><td>${rec[0]}</td></tr><tr><td>地址</td><td>${rec[1]}</td></tr><tr><td>核准设立</td><td class="mono">${rec[2]}</td></tr><tr><td>状态</td><td>${rec[3]}</td></tr></table>` : `<p>查无统一编号「${esc(q)}」的登记数据。</p>`;
    return `<div class="site wiki"><div class="w-bar">公司登记查找</div><div class="wrap w-art">${ctx.form('gcis.mist/?q=', q, 's-box', '统一编号（8 码）', '查找')}${out}</div></div>`;
  }

  /* ---------- the forum, news and 165 ---------- */
  function forumHome() {
    return `<div class="site forum"><div class="f-bar"><b>无名广场</b><span>匿名说真话 · 科技业板</span></div><div class="wrap">${FORUM_THREADS.map(([u, t, m]) => u ? `<a class="f-thread" ${ctx.href(u)}><b>${esc(t)}</b><br><small>${m}</small></a>` : `<div class="f-thread" style="opacity:.7"><b>${esc(t)}</b><br><small>${m}</small></div>`).join('')}</div></div>`;
  }
  function forumPost() {
    return `<div class="site forum"><div class="f-bar"><b>无名广场</b><span>科技业 › 闲聊</span></div><div class="wrap">
  <div class="f-post"><h2>收到 BeatBird 扣款 3,480 是诈骗吗？</h2><div class="f-meta">sleepless_dev · 2026-12-06 09:14 · 回复 318</div>
  <p>昨晚收到一封 BeatBird 的信，说我的睡眠分析高端方案开通了，每月 3,480。我根本没申请。信里没有链接，叫我自己搜索「BeatBird 会员中心 官方」。有人也收到吗？</p></div>
  <h3 style="font-size:14px">回复</h3>
  ${FORUM_REPLIES.map(([fl, t, x]) => `<div class="f-reply pinable"><span class="mono muted" style="font-size:11.5px">${fl} · ${t}</span><br>${esc(x)} ${ctx.pin('无名广场 ' + fl, x)}</div>`).join('')}
  </div></div>`;
  }
  function newsPage() {
    return `<div class="site"><div class="wrap"><p class="muted mono" style="font-size:12px">科技新闻 · 2026-12-08 16:40</p><h1 style="font-size:24px">BeatBird 用户接连收到假扣款信　公司：已报案、数据保护长调查中</h1><p>近日多位健康 App「心跳鸟 BeatBird」的用户收到假冒官方的扣款通知，信中含有用户的姓名与手机号码，部分还写出用户近期的平均睡眠时数。</p><p>BeatBird 表示已经报案，并由今年 10 月新设的数据保护长追查会员数据的来源。公司强调，今年 9 月的爆料事件后，与保险公司的合作已经暂停，目前只有三份试办数据依合约提供给合作厂商。</p><p>165 反诈骗专线提醒，官方不会要求民众搜索客服、扫描 QR code，或到 ATM、网银「解除扣款」。</p></div></div>`;
  }
  function page165() {
    return `<div class="site"><div class="s165-bar">165 反诈骗专线</div><div class="wrap"><h2>假冒 App 扣款、解除分期</h2><ol><li>收到「已开通」「按月扣款」的通知，先不要点任何链接，也不要照信上说的去搜索客服。</li><li>自己打开 App，或拨打你原本就知道的官方电话确认。</li><li>官方<b>不会</b>要你到 ATM 或网银「解除扣款」，也不会要你扫 QR code「验证身份」。</li><li>通信软件被接上陌生设备：到设置的「已关联的设备」移除它，打开两步骤验证，并通知亲友。</li><li>钱已经导出去：立刻拨 165，拦阻有 24 小时的时效。</li></ol><p>${ctx.pin('165', '官方不会要你到 ATM／网银解除扣款或扫 QR 验证；通信软件有陌生设备要移除并开两步骤验证。')}</p></div></div>`;
  }
  function companyPage(name, tag, about, clients) {
    return `<div class="site"><div class="wrap"><h1 style="font-size:24px;margin-bottom:2px">${esc(name)}</h1><p class="muted">${esc(tag)}</p><p>${esc(about)}</p><p class="muted">合作客户：${clients.map(esc).join('、')}</p></div></div>`;
  }
  return { route, searchHits };
}
