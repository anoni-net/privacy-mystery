/* 藍鵲事件 — story data and in-game websites, shared by every edition of case 02.
   The build inlines this file into the interactive page. Nothing here may name the culprit:
   the answer only exists in solution.enc. */

// The interactive page's chat thread for the client, 周芷寧 (also where saves keep it)
const CLIENT_ID = 'zhining';
// The opening starts at 21:02 on Wednesday 9 December 2026; play at 21:20
const CASE_CLOCK = { intro: [21, 2], play: [21, 20] };

// Everyone who downloaded one of BeatBird's pilot files: the anonymity set
const PEOPLE = [
  { name: '羅美君', key: '羅美君', role: '浪花行銷 專案經理｜38 歲', color: '#3d7fa6' },
  { name: '何佳穎', key: '何佳穎', role: '浪花行銷 企劃｜27 歲', color: '#c0587e' },
  { name: '江柏宇', key: '江柏宇', role: '浪花行銷 數據專員｜31 歲', color: '#4f8a3d' },
  { name: '戴宇翔', key: '戴宇翔', role: '雲杉數據 分析師｜34 歲', color: '#8a6a2e' },
  { name: '劉怡君', key: '劉怡君', role: '雲杉數據 工程師｜29 歲', color: '#6a5a9c' },
  { name: '謝明哲', key: '謝明哲', role: '衡準精算 顧問｜45 歲', color: '#7a6f5d' },
];
const COLOR = Object.fromEntries(PEOPLE.map(p => [p.name, p.color]));
const INITIAL = name => (PEOPLE.find(p => p.name === name) || {}).initial || String(name)[0];

/* Names the interface needs in this language */
const BOOKMARKS = [['霧搜', 'mist.search'], ['無名廣場', 'wuming.forum'], ['霧港小工具', 'tools.mistport.org'], ['網域查詢', 'whois.mist'], ['洩了沒', 'leaked.mist'], ['165', '165.mist']];
const CLIENT_DIR = '芷寧給的資料';
const BB_DIR = 'BeatBird提供資料';
const FILES_CLIENT = { scam: '扣款通知.eml', real: 'BeatBird電子報_1130.eml', devices: '漣漪_已連結裝置.jpg', chat: '漣漪_與阿哲的對話.txt', aliases: '面具信箱_別名清單.csv' };
const FILES_BB = { readme: '唐啟文的說明.txt', provided: '資料提供紀錄.csv', downloads: '下載紀錄.csv', canaries: '陷阱名單.csv', inbox: '陷阱信箱收件紀錄.txt' };
const QR_FILE = 'beatbird_驗證碼.png';
// The screenshot of 芷寧's linked devices, in this language (art/devices.svg)
const DEVICES_IMG = 'devices.jpg';
const SUGGEST = {
  home: ['ls', 'cd ' + CLIENT_DIR, 'cd Downloads', 'help'],
  client: ['ls', 'cat 扣款通知.eml', 'grep -i authentication *.eml', 'cat 面具信箱_別名清單.csv', 'cd ..'],
  bb: ['ls', 'cat 資料提供紀錄.csv', 'cat 陷阱信箱收件紀錄.txt', 'grep C-05 *.csv', 'cd ..'],
  net: ['whois beatbird.app', 'whois member-care.com', 'dig txt kq3fz.idv.tw'],
};
const SOL_PREFIX = '藍鵲是';  // the solution's title: SOL_PREFIX + the culprit's name

const DISC = {
  nolink:    { t: '信裡沒有任何連結，只叫人自己去搜尋', d: '沒有連結就躲得過郵件過濾。收信的人照著搜尋，第一個看到的是對方買的廣告。' },
  sender:    { t: '寄件網域 kq3fz.idv.tw 跟 BeatBird 無關', d: '顯示名稱寫「BeatBird 會員中心」。SPF、DKIM 通過的是 kq3fz.idv.tw 自己，只證明信真的從那個網域寄出。真的電子報來自 beatbird.app。' },
  ad:        { t: '「官方客服」是廣告，網域不是 beatbird.app', d: '三個廣告用了三種障眼法：品牌放在子網域、品牌旁邊加字、把 e 換成西里爾字母 е。' },
  newdomain: { t: '假網站的網域 12/02 才註冊', d: '真的 beatbird.app 是 2019 年註冊、登記在心跳鳥科技名下。假網域都在詐騙信寄出前幾天才出現，註冊人資料全部隱藏。' },
  qr:        { t: '「驗證會員身分」的 QR code 是漣漪的「連結新裝置」', d: '解出來是 ripple://link-device，不是網址。掃了它，就是把自己的漣漪帳號接到對方的電腦上。' },
  device:    { t: '陌生的 Chrome 裝置 12/07 20:41 接上芷寧的漣漪', d: '連結時間就是她掃 QR 的時候。之後朋友收到的借點數訊息，都是從這台裝置發出的。' },
  alias:     { t: '詐騙信寄到只給過 BeatBird 的別名', d: 'bb.tidal-fern@maskmail.tw 只用在 BeatBird。名單一定是從 BeatBird 的資料流出去的，不是 2024 年團購網那次外洩。' },
  join:      { t: '詐騙信漏填的欄位叫 {avg_sleep_30d}', d: '有人收到的詐騙信，睡眠時數那一行沒有填上，留下了範本裡的欄位名稱。' },
  canary:    { t: '陷阱信箱 C-05 收到了詐騙信', d: '陷阱資料是不存在的假使用者，每次下載各埋一筆。哪個陷阱收到詐騙信，就是哪一次下載的檔案被拿去用了。' },
};
const REACT = {
  nolink: '我就是因為沒有連結，才覺得它不像詐騙……',
  sender: '所以信根本不是 BeatBird 寄的。我只看了寄件人顯示的名字。',
  ad: '我點的是搜尋結果最上面那個，我以為最上面就是官方。',
  qr: '那個「驗證」……原來我是自己把帳號交出去的。',
  device: '那台 Chrome 不是我的。我家只有一台 iPad 跟這支手機。',
  alias: '那個信箱我真的只給過 BeatBird。所以是他們的資料外洩？',
};
const HINTS = [
  '先打開「芷寧給的資料」裡的扣款通知.eml。信裡有沒有連結？它要芷寧做什麼？',
  '在信件上按「顯示原始郵件」，看 From、Reply-To 和 Authentication-Results。再打開真的 BeatBird 電子報比一比。',
  '照信上說的，在霧搜查「BeatBird 會員中心 官方」。廣告的網址看起來都很像，用霧港小工具的「網址檢查」看真正的網域。',
  '假網站的網域是什麼時候註冊的？書籤列有「網域查詢」，終端機也可以輸入 whois 加網域。',
  '假網站的客服頁要人掃 QR。把 QR 圖下載下來，用霧港小工具的「QR 讀取」看它到底是什麼，再對照「漣漪_已連結裝置.jpg」。',
  '詐騙信寄到哪個信箱？對照「面具信箱_別名清單.csv」，再到「洩了沒」查查看。',
  'BeatBird 的資料提供紀錄裡，哪一份檔案有 avg_sleep_30d 這個欄位？誰同時下載過有姓名的那份和有睡眠資料的那份？',
  '陷阱信箱收件紀錄裡，哪個陷阱收到的是詐騙信？用陷阱名單對到下載編號，再對到下載紀錄。',
];

/* ---------- chat ---------- */
const AWU_BASE = [
  { sys: '— 互助站內部頻道 —' },
  { tm: '21:21', text: '芷寧的案子交給你了。165 轉介過來的，她的漣漪帳號被人接走過。' },
  { tm: '21:21', text: '兩件事：搞清楚這套詐騙怎麼騙到她，還有她的資料是從哪裡流出去的。' },
  { tm: '21:22', text: '卡住就按「給我提示」。看越多提示，結案評等會越低。' },
];
/* Opening conversation: each node shows 芷寧's messages, then waits for the player's reply, a file transfer, or ends. */
const INTRO = {
  n1:  { msgs: ['你好，我是周芷寧，165 的人說可以找你們。', '我被騙了……應該說，差一點被騙。'], choices: [['你好，我是今晚值班的志工。你現在安全嗎？', 'n2a'], ['先別急。發生什麼事，從頭說。', 'n2b']] },
  n2a: { msgs: ['錢沒有被轉走。可是我的漣漪帳號被別人用了。'], next: 'n3' },
  n2b: { msgs: ['好。'], next: 'n3' },
  n3:  { msgs: ['禮拜一晚上我收到一封 BeatBird 的信，說我的「睡眠分析進階方案」已經開通，每個月扣 3,480。', '我根本沒申請過。信裡叫我自己去搜尋「BeatBird 會員中心 官方」看詳情。'], choices: [['你照著搜尋了？', 'n4']] },
  n4:  { msgs: ['對。點了最上面那個，網站跟 BeatBird 長得一模一樣。', '我按「線上客服」，有一位林專員，說要先掃一個 QR code「驗證會員身分」。', '掃完他叫我打開網銀「解除自動扣款」，可是畫面寫的是轉出 29,800。我覺得不對，就掛掉了。'], choices: [['你做得很對，停在轉帳前面。', 'n5a'], ['QR code 是用什麼掃的？', 'n5b']] },
  n5a: { msgs: ['可是隔天，我朋友阿哲問我為什麼要他幫我買遊戲點數。', '我沒有傳過那種訊息。'], next: 'n6' },
  n5b: { msgs: ['用漣漪掃的，他說漣漪掃比較快。', '隔天我朋友阿哲問我為什麼要他幫我買遊戲點數，我沒有傳過。'], next: 'n6' },
  n6:  { msgs: ['還有一件事讓我很怕：那封信知道我的全名、手機，還知道我最近平均只睡 5 小時 12 分。', '那是 BeatBird 手環量的。他們怎麼會知道？'], choices: [['我們會一起查。你手上有那封信嗎？', 'n7']] },
  n7:  { msgs: ['有，我把原始信件、跟阿哲的對話、還有我能截的圖都整理好了。', '對了，我用面具信箱，每個服務一個別名，清單也放進去了。'], file: true, next: 'n8' },
  n8:  { msgs: [], choices: [['收到了。今晚就幫你查。', 'n9']] },
  n9:  { msgs: ['謝謝。我會一直在線上。'], end: true },
};

/* Conversations that start during play (engine DIALOGS) */
const DIALOGS = {
  // after finding the stranger's device on her account
  dev1: { after: 'device', msgs: ['你說那台 Chrome 是對方的電腦？我要怎麼做？'], choices: [
    ['在「已連結的裝置」把那台 Chrome 移除，然後到設定開啟兩步驟驗證。', 'dev2', 'removeDevice'],
    ['直接把漣漪的帳號整個刪掉。', 'dev1b'],
    ['先不用動，免得打草驚蛇。', 'dev1c'],
  ] },
  dev1b: { msgs: ['刪掉的話，我跟家人、同事的對話全都沒了……而且對方用我的名字借錢的事，大家還是會問我。', '有沒有只把那台裝置踢掉的方法？'], choices: [
    ['有。在「已連結的裝置」把那台 Chrome 移除，再開啟兩步驟驗證。', 'dev2', 'removeDevice'],
  ] },
  dev1c: { msgs: ['可是它現在還連著，對方看得到我所有新訊息……', '我覺得還是先把它踢掉比較好？'], choices: [
    ['你說得對。在「已連結的裝置」把那台 Chrome 移除，再開啟兩步驟驗證。', 'dev2', 'removeDevice'],
  ] },
  dev2: { msgs: ['移除了。清單上只剩我的手機跟 iPad。', '兩步驟驗證也開了。我會在群組裡跟大家說，那幾天要點數的訊息都不是我。'] },
  // after the alias points at BeatBird: Fog gets the data protection officer's files
  bb1: { after: 'alias', thread: 'awu', delay: 3200, msgs: ['別名只給過 BeatBird 的話，資料就是從 BeatBird 那邊流出去的。', '我剛聯絡了 BeatBird 的資料保護長唐啟文。夜鷺那件事之後，董事會才設了這個職位。', '他說 11 月底他們剛把三份試辦資料交給合作廠商，每次下載都埋了陷阱資料。他把紀錄傳過來了。'], file: { name: 'BeatBird提供資料.zip', meta: '6 KB · 唐啟文 · 加密傳送' }, next: 'bb2' },
  bb2: { thread: 'awu', msgs: ['他只提一個要求：在證據確定之前，不要對外講任何名字。'] },
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
From: "BeatBird 會員中心" <notice@kq3fz.idv.tw>
Reply-To: <bb.member.care@mistmail.tw>
To: <bb.tidal-fern@maskmail.tw>
Subject: 周芷寧，睡眠分析進階方案 按月依約延續 3,480 NT
Date: Mon, 7 Dec 2026 20:11:58 +0800
Message-ID: <20261207121158.77c1@kq3fz.idv.tw>
MIME-Version: 1.0
Content-Type: multipart/alternative; boundary="=_bb7c"

--=_bb7c
Content-Type: text/plain; charset=utf-8

親愛的會員您好：周芷寧

您的 BeatBird 睡眠分析進階方案已成功開通，相關配套服務皆已就緒。

• 會員帳號：0937264118
• 綁定裝置：BeatBird Band 3
• 近 30 日平均睡眠：5 小時 12 分
• 服務方案：睡眠分析進階方案（月繳）
• 生效日期：2026-12-07
• 續期方式：按月依約延續
• 每期共計：3,480 NT

• 瀏覽器搜尋 [BeatBird 會員中心 官方] 查看詳情或取消

感謝您的支持，祝您一夜好眠！
BeatBird 營運團隊 敬上
公司地址：台北市內湖區瑞光路 588 號 8 樓

--=_bb7c
Content-Type: text/html; charset=utf-8

<div style="font-family:sans-serif;max-width:520px"><p style="font-size:20px;font-weight:700;color:#c2410c">BeatBird</p><p>親愛的會員您好：周芷寧</p><p>您的 BeatBird 睡眠分析進階方案已成功開通，相關配套服務皆已就緒。</p><table style="border-collapse:collapse;font-size:14px"><tr><td style="padding:3px 10px 3px 0;color:#666">會員帳號</td><td>0937264118</td></tr><tr><td style="padding:3px 10px 3px 0;color:#666">綁定裝置</td><td>BeatBird Band 3</td></tr><tr><td style="padding:3px 10px 3px 0;color:#666">近 30 日平均睡眠</td><td>5 小時 12 分</td></tr><tr><td style="padding:3px 10px 3px 0;color:#666">服務方案</td><td>睡眠分析進階方案（月繳）</td></tr><tr><td style="padding:3px 10px 3px 0;color:#666">每期共計</td><td><b>3,480 NT</b>，按月依約延續</td></tr></table><p>請在瀏覽器搜尋 <b>[BeatBird 會員中心 官方]</b> 查看詳情或取消。</p><p style="color:#888;font-size:12px">BeatBird 營運團隊 敬上<br>公司地址：新北市三重區重新路五段 609 巷 12 號</p></div>

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
Subject: 你的 11 月睡眠報告出爐了
Date: Mon, 30 Nov 2026 09:00:02 +0800
Message-ID: <nl-202611-0b91@beatbird.app>
MIME-Version: 1.0
Content-Type: text/plain; charset=utf-8

芷寧，你好：

你的 11 月睡眠報告已經在 App 裡了。打開 BeatBird，點「報告」就能看到。

本月提醒
BeatBird 不會寄信要你搜尋客服、不會要你掃 QR code，也不會要你到 ATM 或網銀「解除扣款」。
訂閱與付款請一律在 App 的「帳號 › 訂閱」查看。

心跳鳥科技股份有限公司
台北市內湖區洲子街 88 號 3 樓
`;
const CHAT_LOG = `漣漪 · 與 阿哲 的對話（周芷寧匯出）
[12/08 13:05] 周芷寧: 在嗎？可以幫我一個忙嗎
[12/08 13:05] 周芷寧: 我現在不方便刷卡，可以先幫我買 5 張 1000 的 GASH 點數嗎？晚上還你
[12/08 13:07] 阿哲: 你在哪？打給你都沒接
[12/08 13:07] 周芷寧: 在開會不方便講電話，序號拍照傳給我就好
[12/08 18:42] 阿哲: 欸你中午那個是怎樣？我差點就去買了
[12/08 18:50] 周芷寧: 我中午沒有傳任何訊息給你！！我一直在公司
[12/08 18:51] 阿哲: 那你帳號被盜了吧，快去處理
`;
const ALIASES = `服務,別名,建立日期,備註
BeatBird,bb.tidal-fern@maskmail.tw,2025-03-02,只給 BeatBird 用
StreamBox,sb.quiet-moss@maskmail.tw,2025-06-11,
拾光讀冊,read.amber-cove@maskmail.tw,2025-09-20,
漣漪 Ripple,（用手機號碼註冊）,,
好物團購網,zhining.chou@mistmail.tw,2023-11-05,用面具信箱之前註冊的，填的是主信箱
# 面具信箱：每個別名收到的信都會轉到主信箱 zhining.chou@mistmail.tw，信件標頭會註明是從哪個別名轉來的。`;

/* ---------- BeatBird's data protection officer's files ---------- */
const BB_README = `唐啟文（BeatBird 資料保護長）給霧港互助站的說明　2026-12-09

1. 11 月 24 日，公司依合作合約把三份試辦資料放上檔案分享系統：
   F-01 給衡準精算（鼎岳保險委託的外部精算顧問）
   F-02 給浪花行銷（BeatBird Plus 推廣活動）
   F-03 給雲杉數據（App 使用分析）
   各份的欄位見「資料提供紀錄.csv」。

2. 我到任後要求：每一次下載，系統都會在那一份檔案裡多埋一筆「陷阱資料」。
   陷阱資料是不存在的假使用者，只會出現在那一次下載的檔案裡。
   有信箱的陷阱資料，信箱由我們自己監看。哪個陷阱信箱收到信，就代表那一次下載的檔案被拿去用了。
   哪一筆陷阱屬於哪一次下載，見「陷阱名單.csv」；每一次下載是誰、什麼時候，見「下載紀錄.csv」。

3. 11 月 28 日浪花行銷照合約寄出 BeatBird Plus 體驗活動信，用的是專案經理那一份。那封信屬於合約內的正常使用。

4. 請在證據確定之前，不要對外提任何人的名字。
`;
const BB_PROVIDED = `檔案,提供對象,用途,欄位
F-01,衡準精算,保費精算試算（鼎岳保險委託）,user_hash / birth_ym / postcode / device_model / sleep_avg_30 / resting_hr
F-02,浪花行銷,BeatBird Plus 推廣活動,user_hash / name / email / phone / device_model / plan_tier
F-03,雲杉數據,App 使用分析,user_hash / avg_sleep_30d / sleep_score / app_sessions / device_model
# user_hash 是把會員編號雜湊後的代號，三份檔案用的是同一套。`;
const BB_DOWNLOADS = `下載編號,時間,檔案,下載者,單位,連線位置
D-01,2026-11-25 10:12,F-02,羅美君,浪花行銷,浪花行銷辦公室
D-02,2026-11-25 10:40,F-01,謝明哲,衡準精算,衡準精算辦公室
D-03,2026-11-25 14:05,F-03,戴宇翔,雲杉數據,雲杉數據辦公室
D-04,2026-11-25 14:31,F-02,江柏宇,浪花行銷,浪花行銷辦公室
D-05,2026-11-25 16:02,F-02,何佳穎,浪花行銷,浪花行銷辦公室
D-06,2026-11-26 09:55,F-03,劉怡君,雲杉數據,雲杉數據辦公室
D-07,2026-11-26 23:48,F-03,江柏宇,浪花行銷,住家寬頻（經分享連結 S-1）
D-08,2026-11-27 13:20,F-03,何佳穎,浪花行銷,浪花行銷辦公室（經分享連結 S-1）
# 分享連結 S-1：雲杉數據的戴宇翔在 11/26 建立，提供浪花行銷依睡眠分群規劃活動。`;
const BB_CANARIES = `陷阱編號,下載編號,假名,信箱
C-01,D-01,林雨萱,yuxuan.lin.k7@maskmail.tw
C-02,D-02,（F-01 沒有姓名欄位）,（F-01 沒有信箱欄位）
C-03,D-03,（F-03 沒有姓名欄位）,（F-03 沒有信箱欄位）
C-04,D-04,陳品妤,pinyu.chen.q2@maskmail.tw
C-05,D-05,許書豪,shuhao.hsu.m9@maskmail.tw
C-06,D-06,（F-03 沒有姓名欄位）,（F-03 沒有信箱欄位）
C-07,D-07,（F-03 沒有姓名欄位）,（F-03 沒有信箱欄位）
C-08,D-08,（F-03 沒有姓名欄位）,（F-03 沒有信箱欄位）
# 沒有信箱的陷阱資料只能靠 user_hash 追，目前沒有發現被使用。`;
const BB_INBOX = `陷阱信箱收件紀錄（BeatBird 資料保護室監看）　匯出時間 2026-12-09 20:30

[2026-11-28 10:00] 收件：yuxuan.lin.k7@maskmail.tw
  寄件：BeatBird Plus <plus@beatbird.app>
  主旨：BeatBird Plus 免費體驗 30 天，送給睡不好的你

[2026-12-05 21:44] 收件：shuhao.hsu.m9@maskmail.tw
  寄件："BeatBird 會員中心" <notice@kq3fz.idv.tw>
  主旨：許書豪，睡眠分析進階方案 按月依約延續 3,480 NT
  內文節錄：
    親愛的會員您好：許書豪
    • 會員帳號：0912558107
    • 綁定裝置：BeatBird Band 2
    • 近 30 日平均睡眠：{avg_sleep_30d}
    • 瀏覽器搜尋 [BeatBird 會員中心 官方] 查看詳情或取消

（其他陷阱信箱：沒有收到任何信）`;

/* ---------- WHOIS ---------- */
const FAKE_HOSTS = ['beatbird.app.member-care.com', 'beatbird-help.app', 'bеatbird.app'];
const WHOIS = {
  'beatbird.app': [['Domain Name', 'beatbird.app'], ['Creation Date', '2019-03-11'], ['Registrar', 'TWNIC 認證註冊商 HiDomain'], ['Registrant Organization', '心跳鳥科技股份有限公司'], ['Registrant Country', 'TW'], ['Name Server', 'ns1.beatbird.app']],
  'member-care.com': [['Domain Name', 'member-care.com'], ['Creation Date', '2026-12-02'], ['Registrar', 'NameDrop Ltd.'], ['Registrant', 'REDACTED FOR PRIVACY'], ['Registrant Country', 'REDACTED'], ['Name Server', 'ns1.fastparkdns.net']],
  'beatbird-help.app': [['Domain Name', 'beatbird-help.app'], ['Creation Date', '2026-12-03'], ['Registrar', 'NameDrop Ltd.'], ['Registrant', 'REDACTED FOR PRIVACY'], ['Registrant Country', 'REDACTED'], ['Name Server', 'ns1.fastparkdns.net']],
  'xn--batbird-7gg.app': [['Domain Name', 'xn--batbird-7gg.app（顯示為 bеatbird.app，第二個字母是西里爾字母 е）'], ['Creation Date', '2026-12-02'], ['Registrar', 'NameDrop Ltd.'], ['Registrant', 'REDACTED FOR PRIVACY'], ['Registrant Country', 'REDACTED'], ['Name Server', 'ns1.fastparkdns.net']],
  'kq3fz.idv.tw': [['Domain Name', 'kq3fz.idv.tw'], ['Creation Date', '2026-12-01'], ['Registrar', 'TWNIC 認證註冊商 QuickReg'], ['Registrant', 'REDACTED FOR PRIVACY'], ['Name Server', 'ns1.fastparkdns.net']],
  'maskmail.tw': [['Domain Name', 'maskmail.tw'], ['Creation Date', '2021-08-19'], ['Registrar', 'TWNIC 認證註冊商 HiDomain'], ['Registrant Organization', '面具信箱有限公司']],
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
  'zhining.chou@mistmail.tw': [['好物團購網', '2024-04', '姓名、電話、Email、收件地址'], ['StreamBox 舊論壇', '2021-10', 'Email、雜湊過的密碼']],
};
const COMPANIES = {
  '53018827': ['心跳鳥科技股份有限公司', '台北市內湖區洲子街 88 號 3 樓', '2018-11-02', '核准設立'],
  '87654321': null,
};
const FORUM_THREADS = [
  ['wuming.forum/t/90417', '收到 BeatBird 扣款 3,480 是詐騙嗎？', '12-06 09:14 · 回覆 318 · 熱門'],
  [null, '浪花行銷是不是又在開缺？', '12-04 11:20 · 回覆 22'],
  [null, '年終快到了，大家公司今年發幾個月', '12-07 08:03 · 回覆 641'],
];
const FORUM_REPLIES = [
  ['B1', '12-06 09:30', '我也收到！金額一樣，但我根本沒用過什麼進階方案'],
  ['B2', '12-06 10:02', '我照信上搜尋，最上面的「官方客服」叫我去 ATM 解除分期，掛掉了'],
  ['B3', '12-06 12:47', '好笑的是我收到的那封連睡眠時數都沒填好，直接寫「近 30 日平均睡眠：{avg_sleep_30d}」，這種大括號是範本沒套好吧'],
  ['B4', '12-06 15:21', '它知道我的名字跟手機，BeatBird 是不是外洩了？'],
  ['B5', '12-06 22:08', '聽說浪花行銷有個做數據的最近到處在問信貸，不知道有沒有關係'],
  ['B6', '12-07 00:15', '不要亂猜人。有問題打 165，官方只會叫你去 App 裡看訂閱'],
];
const SEARCH_INDEX = [
  { url: 'beatbird.app', title: 'BeatBird 心跳鳥｜睡得好，活得好', snip: '公告：近期有人冒用 BeatBird 名義寄送扣款通知。BeatBird 不會要你搜尋客服或操作網銀。', kw: ['beatbird', '心跳鳥', '會員', '官方', '客服', '扣款', '取消'] },
  { url: 'beatbird.app/notice', title: '防詐公告 - BeatBird', snip: '訂閱與付款請一律在 App 的「帳號 › 訂閱」查看。BeatBird 不會要求你掃描 QR code。', kw: ['beatbird', '詐騙', '公告', '扣款', '取消', '客服', '會員'] },
  { url: 'wuming.forum/t/90417', title: '收到 BeatBird 扣款 3,480 是詐騙嗎？ - 無名廣場', snip: '我也收到！金額一樣……最上面的「官方客服」叫我去 ATM 解除分期……', kw: ['beatbird', '扣款', '3480', '3,480', '詐騙', '論壇', '無名', '會員'] },
  { url: '165.mist', title: '165 反詐騙專線｜假冒 App 扣款、解除分期', snip: '官方不會要你到 ATM 或網銀「解除扣款」。有疑問撥 165。', kw: ['165', '詐騙', '扣款', '解除', '分期', 'atm', '網銀', '客服'] },
  { url: 'news.mist/beatbird-scam', title: 'BeatBird 用戶接連收到假扣款信　公司：已報案、資料保護長調查中｜科技新聞', snip: '詐騙信內含用戶姓名與手機。BeatBird 表示已報案，並由新任資料保護長追查資料來源。', kw: ['beatbird', '心跳鳥', '詐騙', '扣款', '新聞', '資料保護長', '外洩'] },
  { url: 'tools.mistport.org', title: '霧港小工具｜網址檢查、隱形字元、QR 讀取', snip: '在你的瀏覽器裡執行，不上傳任何東西。', kw: ['工具', '網址', 'url', 'qr', '隱形', '字元', '霧港', '檢查', '釣魚'] },
  { url: 'whois.mist', title: '網域查詢 WHOIS', snip: '查詢網域的註冊日期、註冊商與註冊人。', kw: ['whois', '網域', 'domain', '註冊', '查詢'] },
  { url: 'leaked.mist', title: '洩了沒｜你的 Email 出現在哪些外洩事件裡', snip: '輸入 Email，查詢它出現在哪些公開的外洩資料中。', kw: ['外洩', '洩了沒', 'email', '個資', 'leak', 'pwned'] },
  { url: 'langhua.mist', title: '浪花行銷｜讓品牌被看見', snip: '數位行銷、活動企劃、數據分析。合作客戶：BeatBird、……', kw: ['浪花', '行銷', 'langhua'] },
  { url: 'yunshan.mist', title: '雲杉數據 Yunshan Data', snip: 'App 使用分析與資料工程服務。', kw: ['雲杉', '數據', 'yunshan'] },
  { url: 'gcis.mist', title: '公司登記查詢', snip: '用統一編號查詢公司名稱、地址與登記狀態。', kw: ['公司', '登記', '統編', '統一編號', 'gcis'] },
  { url: 'anoni.net/docs/scenarios/everyday-baseline/', ext: 'https://anoni.net/docs/scenarios/everyday-baseline/', title: 'anoni.net｜一般人平常該做到什麼', snip: '對急著要你處理的訊息，換一個管道確認。（外部真實網站，會在新分頁開啟）', kw: ['詐騙', '釣魚', 'anoni', '扣款', '兩步驟', 'passkey', '165'] },
];
// Ads on top of any search about BeatBird, its members, support or cancelling
const AD_WORDS = ['beatbird', '心跳鳥', '會員', '客服', '扣款', '取消', '訂閱'];
const ADS = [
  { url: 'beatbird.app.member-care.com', title: 'BeatBird 會員中心｜官方客服 24 小時', snip: '訂閱查詢、取消自動續約、退款申請，線上專員立即協助。' },
  { url: 'bеatbird.app/member', title: 'BeatBird 會員中心 官方', snip: '扣款有疑問？登入會員中心，三分鐘取消進階方案。' },
  { url: 'beatbird-help.app', title: 'BeatBird 取消訂閱教學｜官方協助', snip: '睡眠分析進階方案取消步驟，專人一對一處理。' },
];
const SEARCH_TIPS = ['BeatBird 會員中心 官方', '3,480', '165', '浪花行銷'];

const Q1 = [['nolink', '不放連結，叫你自己去搜尋'], ['urgent', '宣稱已經開始扣款，製造急迫感'], ['realdata', '用真實的姓名、手機與睡眠資料取得信任'], ['spoof', '偽造成 beatbird.app 寄出'], ['attach', '附件夾帶惡意程式']];
const Q2 = [['link', '把她的漣漪帳號連結到詐騙者的電腦'], ['malware', '在她手機上安裝監控程式'], ['pay', '授權信用卡自動扣款'], ['password', '讓網站取得她的漣漪密碼']];
const Q3 = [['f01', 'F-01（衡準精算）'], ['f02', 'F-02（浪花行銷）'], ['f03', 'F-03（雲杉數據）'], ['tuangou', '2024 年好物團購網外洩名單']];

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
  const searchBox = (v = '') => ctx.form('mist.search/?q=', v, 's-box', '搜尋網路', '搜尋');
  const notFound = url => `<div class="site"><div class="wrap"><h2>無法連上這個網站</h2><p class="muted mono">${esc(url)}</p><p>找不到伺服器。檢查網址是否正確，或${a('mist.search/?q=' + encodeURIComponent(url), '在霧搜中搜尋', 'color:#1a3d8f')}。</p></div></div>`;

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
    if (host === 'langhua.mist') return companyPage('浪花行銷', '讓品牌被看見', '數位行銷、活動企劃與數據分析。我們的數據團隊幫客戶找到對的受眾。', ['BeatBird', '拾光讀冊', 'StreamBox']);
    if (host === 'yunshan.mist') return companyPage('雲杉數據 Yunshan Data', '資料工程與 App 使用分析', '我們替健康與消費類 App 建立分析流程，所有資料依合約處理。', ['BeatBird']);
    return notFound(url);
  }

  /* ---------- search ---------- */
  function searchHits(q) {
    const ql = q.toLowerCase();
    return SEARCH_INDEX.filter(r => r.kw.some(k => ql.includes(k.toLowerCase()) || (k.length >= 2 && k.toLowerCase().includes(ql) && ql.length >= 2)));
  }
  function searchHome() {
    return `<div class="site"><div class="s-home"><div class="s-logo">霧搜<small>MIST SEARCH · 不追蹤你的搜尋引擎</small></div>${searchBox()}<div class="s-tips">試試：${SEARCH_TIPS.map(esc).join('、')}</div></div></div>`;
  }
  const adHTML = () => ADS.map(ad => `<div class="s-res s-ad"><div class="u"><span class="ad">贊助</span>${esc(ad.url)}</div>${a(ad.url, esc(ad.title))}<p>${esc(ad.snip)}</p></div>`).join('');
  function searchResults(q) {
    const hits = searchHits(q);
    const ads = AD_WORDS.some(k => q.toLowerCase().includes(k)) ? adHTML() : '';
    const list = hits.length ? hits.map(r => `<div class="s-res"><div class="u">${esc(r.url)}</div>${r.ext ? ext(r.ext, esc(r.title)) : a(r.url, esc(r.title))}<p>${esc(r.snip)}</p></div>`).join('')
      : `<p>找不到和「${esc(q)}」相關的結果。</p><p class="muted">換個關鍵字試試，例如：${SEARCH_TIPS.map(esc).join('、')}。</p>`;
    return `<div class="site"><div class="wrap"><div style="margin-bottom:10px">${searchBox(q)}</div><p class="muted" style="font-size:12.5px">約 ${hits.length} 項結果</p>${ads}${list}</div></div>`;
  }

  /* ---------- the fake member centre (same pages on every lookalike host) ---------- */
  function fakeSite(host, rest) {
    const st = ctx.state();
    const bar = `<div class="fk-bar"><span class="fk-logo">BeatBird</span><span>會員中心</span><nav>${a(host, '首頁')}${a(host + '/cancel', '取消自動續約')}${a(host + '/support', '線上客服')}</nav></div>`;
    const foot = `<div class="fk-foot">© 2026 貝特博德數位科技有限公司　統一編號 87654321<br>台北市內湖區瑞光路 588 號 8 樓　客服信箱 bb.member.care@mistmail.tw</div>`;
    let body;
    if (rest === '/cancel') {
      body = st.flags.cancelSent
        ? `<h2>申請已送出</h2><p>線上專員將於 10 分鐘內以漣漪與您聯繫，協助完成網銀解除設定。</p>`
        : `<h2>取消自動續約</h2><p class="muted">為保障您的權益，請填寫以下資料，專員將協助您於網銀完成「解除約定扣款」。</p>
  <form class="fk-form" data-action="cancel"><label>姓名<input name="n"></label><label>手機<input name="p"></label><label>信用卡號<input name="c" placeholder="1234 5678 9012 3456"></label><label>網路銀行帳號<input name="b"></label><label>簡訊驗證碼<input name="o" placeholder="6 位數"></label><button type="submit" class="site-btn">送出取消申請</button></form>`;
    } else if (rest === '/support') {
      body = `<h2>線上客服 · 林專員</h2><p>為確認是會員本人，請用<b>漣漪 App 掃描</b>下方 QR code 完成「會員身分驗證」，掃描後專員會立即與您聯繫。</p>
  <div class="fk-qr"><img src="${ctx.asset('qr-link.png')}" alt="會員身分驗證 QR code" width="180" height="180"><div><p class="muted" style="margin:0 0 8px">驗證碼 10 分鐘內有效</p>${ctx.dl(QR_FILE, 'qr', '', 'site-btn', 'qr-link.png')}</div></div>
  <p class="muted" style="font-size:12px">若無法掃描，請將驗證碼圖片儲存後於漣漪「設定 › 掃描」選擇圖片。</p>`;
    } else {
      body = `<div class="fk-hero"><h1>會員中心</h1><p>訂閱查詢、取消自動續約、退款申請，一次完成。</p>${a(host + '/cancel', '取消自動續約 →', 'color:#fff;font-weight:700')}</div>
  <div class="fk-grid"><div><b>扣款有疑問？</b><p>近期系統升級，部分會員誤開通「睡眠分析進階方案」，請於 24 小時內完成取消，以免持續扣款。</p></div><div><b>專人協助</b><p>${a(host + '/support', '聯絡線上客服', 'color:#c2410c')}，林專員一對一為您處理。</p></div></div>`;
    }
    return `<div class="site fake">${bar}<div class="wrap">${body}</div>${foot}</div>`;
  }

  /* ---------- the real BeatBird ---------- */
  function bbHome() {
    return `<div class="site"><div class="bb-hero"><div class="bb-logo">BeatBird</div><h1>睡得好，活得好。</h1><p>追蹤你的睡眠、心率與生理週期。</p></div><div class="wrap"><div class="bb-alert"><b>防詐公告</b>　近期有人冒用 BeatBird 名義寄送「進階方案扣款」通知。BeatBird 不會要你搜尋客服、掃描 QR code 或操作網銀。${a('beatbird.app/notice', '看完整公告 →', 'color:#c2410c')}</div><p>${ctx.pin('beatbird.app', 'BeatBird 官方：不會要你搜尋客服、掃 QR code 或操作網銀；訂閱一律在 App 內查看。')}</p></div></div>`;
  }
  function bbNotice() {
    return `<div class="site"><div class="wrap"><div class="bb-logo">BeatBird</div><h1 style="font-size:24px">防詐公告</h1><p class="muted">2026-12-07 更新</p><p>近期部分會員收到「睡眠分析進階方案 按月依約延續 3,480 NT」的信件。這不是 BeatBird 寄出的，我們沒有這個方案。</p><ul><li>BeatBird 的信只會從 <span class="mono">@beatbird.app</span> 寄出。</li><li>我們不會要你搜尋「官方客服」、加入任何專員的聊天帳號，或掃描 QR code。</li><li>我們不會要你到 ATM 或網銀「解除扣款」。</li><li>訂閱與付款請一律在 App 的「帳號 › 訂閱」查看。</li></ul><p>我們已經報案，並由資料保護長追查信中會員資料的來源。有疑問請撥 165 反詐騙專線。</p><p>${ctx.pin('BeatBird 防詐公告', '真的信只會從 @beatbird.app 寄出；沒有「睡眠分析進階方案」。')}</p><p class="muted" style="font-size:12px">心跳鳥科技股份有限公司　統一編號 53018827　台北市內湖區洲子街 88 號 3 樓</p></div></div>`;
  }

  /* ---------- 霧港小工具 ---------- */
  function tools(rest) {
    const st = ctx.state(), f = st.flags || {};
    const nav = `<div class="t-bar"><b>霧港小工具</b><nav>${a('tools.mistport.org/url', '網址檢查')}${a('tools.mistport.org/invisible', '隱形字元')}${a('tools.mistport.org/qr', 'QR 讀取')}</nav></div>`;
    const note = `<p class="muted" style="font-size:12px">這些工具在你的瀏覽器裡執行，不會把網址、文字或圖片上傳到任何地方。</p>`;
    if (rest === '/url') {
      const hist = [...new Set(ctx.history().filter(u => !/^(mist\.search|tools\.mistport\.org|whois\.mist|leaked\.mist)/.test(u)).map(u => u.split('?')[0]))].slice(-8).reverse();
      let out = '';
      if (f.urlIn) {
        const host = f.urlIn.replace(/^https?:\/\//, '').split('/')[0];
        const reg = regDomain(host);
        const odd = [...host].filter(c => /[^\x00-\x7f]/.test(c));
        out = `<div class="t-out"><div class="t-host">${esc(host).replace(esc(reg), `<mark>${esc(reg)}</mark>`)}</div><dl><dt>真正的註冊網域</dt><dd class="mono">${esc(reg)}${odd.length ? `（${esc(toAscii(reg))}）` : ''}</dd>${host !== reg ? `<dt>子網域</dt><dd class="mono">${esc(host.slice(0, -reg.length - 1))}<br><span class="muted">子網域是網域擁有者自己取的名字，誰都可以把品牌名放在這裡。</span></dd>` : ''}${odd.length ? `<dt>⚠ 非拉丁字母</dt><dd>${odd.map(c => `<span class="mono">${esc(c)}</span> U+${c.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')}（西里爾字母）`).join('、')}<br><span class="muted">看起來跟英文字母一樣，其實是另一個網域。</span></dd>` : ''}</dl><p>${ctx.pin('網址檢查', `${host} 的註冊網域是 ${reg}${odd.length ? '，含西里爾字母' : ''}`)}</p></div>`;
      }
      return `<div class="site tools">${nav}<div class="wrap"><h2>網址檢查</h2><p>釣魚網址的手法多半在主機名上。把網址貼進來，工具會把真正的註冊網域單獨標出來。</p>${ctx.action('url', f.urlIn || '', 't-form', '貼上網址', '檢查')}${hist.length ? `<p class="muted" style="margin:8px 0 4px;font-size:12.5px">或從最近開過的網址選一個：</p><div class="t-hist">${hist.map(u => `<button type="button" class="pin-btn" data-tool-url="${esc(u)}">${esc(u)}</button>`).join('')}</div>` : ''}${out}${note}</div></div>`;
    }
    if (rest === '/invisible') {
      let out = '';
      if (f.textIn) {
        const chars = [...f.textIn];
        const flagged = chars.map(c => /[Ѐ-ӿ]/.test(c) ? `<mark title="西里爾字母 U+${c.codePointAt(0).toString(16).toUpperCase()}">${esc(c)}</mark>` : /[​-‏⁠﻿]/.test(c) ? '<mark>␣</mark>' : esc(c)).join('');
        const n = chars.filter(c => /[Ѐ-ӿ​-‏⁠﻿]/.test(c)).length;
        out = `<div class="t-out"><div class="t-host">${flagged}</div><p>${n ? `找到 ${n} 個可疑字元（已標出）。` : '沒有找到隱形字元或混用的字母。'}</p></div>`;
      }
      return `<div class="site tools">${nav}<div class="wrap"><h2>隱形字元</h2><p>找出看不見的字元，以及長得跟英文一樣的其他文字的字母，例如西里爾字母的 а、е、о。</p>${ctx.action('text', f.textIn || '', 't-form', '貼上文字或網址', '檢查')}${out}${note}</div></div>`;
    }
    if (rest === '/qr') {
      const imgs = st.downloads.filter(n => /\.(png|jpe?g)$/i.test(n));
      let out = '';
      if (f.qrIn) {
        out = f.qrIn === QR_FILE
          ? `<div class="t-out"><p>解出的內容：</p><div class="t-host mono">ripple://link-device?code=7F3Q-K2PX-9MZD&amp;name=Chrome%20%C2%B7%20Windows</div><dl><dt>類型</dt><dd>這不是網址。<span class="mono">ripple://</span> 是漣漪 App 自己的指令。</dd><dt>動作</dt><dd><b>link-device：把新裝置連結到你的帳號</b>（裝置名稱 Chrome · Windows）</dd></dl><p>${ctx.pin('QR 讀取', 'beatbird_驗證碼.png 解出 ripple://link-device：漣漪的「連結新裝置」，不是會員驗證。')}</p></div>`
          : `<div class="t-out"><p>「${esc(f.qrIn)}」裡找不到 QR code。</p></div>`;
      }
      return `<div class="site tools">${nav}<div class="wrap"><h2>QR 讀取</h2><p>解出 QR code 的內容，但不幫你開啟。是網址的話先看清楚主機名，再自己決定。</p><div class="ep-drop"><b>選擇圖片</b><p class="muted" style="margin:2px 0 6px">從你電腦的「下載項目」選：</p>${imgs.length ? imgs.map(n => `<div class="ep-file"><span class="mono" style="word-break:break-all">${esc(n)}</span>${ctx.qrPick(n)}</div>`).join('') : '<p>下載項目裡沒有圖片。</p>'}</div>${out}${note}</div></div>`;
    }
    return `<div class="site tools">${nav}<div class="wrap"><h2>霧港小工具</h2><p>互助站志工常用的三個小工具：</p><ul><li>${a('tools.mistport.org/url', '網址檢查')}：標出真正的註冊網域</li><li>${a('tools.mistport.org/invisible', '隱形字元')}：找出看不見的字元與混用的字母</li><li>${a('tools.mistport.org/qr', 'QR 讀取')}：解出 QR code 的內容，不幫你開啟</li></ul>${note}<p class="muted" style="font-size:12px">真實世界的同款工具在 ${ext('https://anoni.net/docs/utils/', 'anoni.net 小工具（外部網站）', 'color:#1a3d8f')}。</p></div></div>`;
  }

  /* ---------- lookups ---------- */
  function whoisPage(q) {
    const key = q ? toAscii(regDomain(q.replace(/^https?:\/\//, '').split('/')[0].toLowerCase())) : '';
    const rec = WHOIS[key];
    const out = !q ? '' : rec
      ? `<div class="w-scroll"><table class="ep-table">${rec.map(([k, v]) => `<tr><td>${esc(k)}</td><td class="mono">${esc(v)}</td></tr>`).join('')}</table></div><p>${ctx.pin('WHOIS ' + key, rec.map(([k, v]) => k + ': ' + v).slice(0, 4).join('；'))}</p>`
      : `<p>查無「${esc(key)}」的註冊資料。</p>`;
    return `<div class="site wiki"><div class="w-bar">網域查詢 WHOIS</div><div class="wrap w-art">${ctx.form('whois.mist/?q=', q, 's-box', '輸入網域，例如 beatbird.app', '查詢')}<p class="muted" style="font-size:12.5px">輸入完整網址也可以，會查它的註冊網域。</p>${out}</div></div>`;
  }
  function leakedPage(q) {
    const key = q.toLowerCase();
    const hits = LEAKS[key];
    const out = !q ? '' : hits
      ? `<p><b>${esc(q)}</b> 出現在 ${hits.length} 次公開外洩事件：</p><div class="w-scroll"><table class="ep-table"><tr><th>來源</th><th>時間</th><th>外洩的欄位</th></tr>${hits.map(([s, t, d]) => `<tr><td>${esc(s)}</td><td class="mono">${t}</td><td>${esc(d)}</td></tr>`).join('')}</table></div><p>${ctx.pin('洩了沒', `${q}：${hits.map(h => h[0] + ' ' + h[1]).join('、')}`)}</p>`
      : `<p><b>${esc(q)}</b> 沒有出現在已知的公開外洩事件裡。</p><p class="muted">沒有出現不代表沒有外洩，只代表還沒有被公開。</p><p>${ctx.pin('洩了沒', q + '：沒有出現在公開外洩事件')}</p>`;
    return `<div class="site"><div class="lk-bar">洩了沒</div><div class="wrap"><p>輸入 Email，查詢它出現在哪些公開的外洩資料中。</p>${ctx.form('leaked.mist/?q=', q, 's-box', 'Email', '查詢')}<p class="muted" style="font-size:12px">查詢會把信箱送到這個網站的伺服器。介意的話，只查最不敏感的那個。</p>${out}</div></div>`;
  }
  function gcisPage(q) {
    const rec = COMPANIES[q];
    const out = !q ? '' : rec ? `<table class="ep-table"><tr><td>公司名稱</td><td>${rec[0]}</td></tr><tr><td>地址</td><td>${rec[1]}</td></tr><tr><td>核准設立</td><td class="mono">${rec[2]}</td></tr><tr><td>狀態</td><td>${rec[3]}</td></tr></table>` : `<p>查無統一編號「${esc(q)}」的登記資料。</p>`;
    return `<div class="site wiki"><div class="w-bar">公司登記查詢</div><div class="wrap w-art">${ctx.form('gcis.mist/?q=', q, 's-box', '統一編號（8 碼）', '查詢')}${out}</div></div>`;
  }

  /* ---------- the forum, news and 165 ---------- */
  function forumHome() {
    return `<div class="site forum"><div class="f-bar"><b>無名廣場</b><span>匿名說真話 · 科技業板</span></div><div class="wrap">${FORUM_THREADS.map(([u, t, m]) => u ? `<a class="f-thread" ${ctx.href(u)}><b>${esc(t)}</b><br><small>${m}</small></a>` : `<div class="f-thread" style="opacity:.7"><b>${esc(t)}</b><br><small>${m}</small></div>`).join('')}</div></div>`;
  }
  function forumPost() {
    return `<div class="site forum"><div class="f-bar"><b>無名廣場</b><span>科技業 › 閒聊</span></div><div class="wrap">
  <div class="f-post"><h2>收到 BeatBird 扣款 3,480 是詐騙嗎？</h2><div class="f-meta">sleepless_dev · 2026-12-06 09:14 · 回覆 318</div>
  <p>昨晚收到一封 BeatBird 的信，說我的睡眠分析進階方案開通了，每月 3,480。我根本沒申請。信裡沒有連結，叫我自己搜尋「BeatBird 會員中心 官方」。有人也收到嗎？</p></div>
  <h3 style="font-size:14px">回覆</h3>
  ${FORUM_REPLIES.map(([fl, t, x]) => `<div class="f-reply pinable"><span class="mono muted" style="font-size:11.5px">${fl} · ${t}</span><br>${esc(x)} ${ctx.pin('無名廣場 ' + fl, x)}</div>`).join('')}
  </div></div>`;
  }
  function newsPage() {
    return `<div class="site"><div class="wrap"><p class="muted mono" style="font-size:12px">科技新聞 · 2026-12-08 16:40</p><h1 style="font-size:24px">BeatBird 用戶接連收到假扣款信　公司：已報案、資料保護長調查中</h1><p>近日多位健康 App「心跳鳥 BeatBird」的用戶收到假冒官方的扣款通知，信中含有用戶的姓名與手機號碼，部分還寫出用戶近期的平均睡眠時數。</p><p>BeatBird 表示已經報案，並由今年 10 月新設的資料保護長追查會員資料的來源。公司強調，今年 9 月的爆料事件後，與保險公司的合作已經暫停，目前只有三份試辦資料依合約提供給合作廠商。</p><p>165 反詐騙專線提醒，官方不會要求民眾搜尋客服、掃描 QR code，或到 ATM、網銀「解除扣款」。</p></div></div>`;
  }
  function page165() {
    return `<div class="site"><div class="s165-bar">165 反詐騙專線</div><div class="wrap"><h2>假冒 App 扣款、解除分期</h2><ol><li>收到「已開通」「按月扣款」的通知，先不要點任何連結，也不要照信上說的去搜尋客服。</li><li>自己打開 App，或撥打你原本就知道的官方電話確認。</li><li>官方<b>不會</b>要你到 ATM 或網銀「解除扣款」，也不會要你掃 QR code「驗證身分」。</li><li>通訊軟體被接上陌生裝置：到設定的「已連結的裝置」移除它，開啟兩步驟驗證，並通知親友。</li><li>錢已經匯出去：立刻撥 165，攔阻有 24 小時的時效。</li></ol><p>${ctx.pin('165', '官方不會要你到 ATM／網銀解除扣款或掃 QR 驗證；通訊軟體有陌生裝置要移除並開兩步驟驗證。')}</p></div></div>`;
  }
  function companyPage(name, tag, about, clients) {
    return `<div class="site"><div class="wrap"><h1 style="font-size:24px;margin-bottom:2px">${esc(name)}</h1><p class="muted">${esc(tag)}</p><p>${esc(about)}</p><p class="muted">合作客戶：${clients.map(esc).join('、')}</p></div></div>`;
  }
  return { route, searchHits };
}
