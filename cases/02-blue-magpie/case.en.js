/* Blue Magpie (藍鵲事件), English — story data and in-game websites, same structure as case.js.
   The setting stays in Taiwan; names are romanised and PEOPLE[].key stays in Chinese (it is
   the solution's key and where saves keep marks and notes, shared by every language).
   Nothing here may name the culprit: the answer only exists in solution.en.enc. */

// The interactive page's chat thread for the client, Chou Chih-ning (also where saves keep it)
const CLIENT_ID = 'zhining';
// The opening starts at 21:02 on Wednesday 9 December 2026; play at 21:20
const CASE_CLOCK = { intro: [21, 2], play: [21, 20] };

// Everyone who downloaded one of BeatBird's pilot files: the anonymity set
const PEOPLE = [
  { name: 'Lo Mei-chun', key: '羅美君', initial: 'LM', role: 'Project manager, Langhua Marketing · 38', color: '#3d7fa6' },
  { name: 'Ho Chia-ying', key: '何佳穎', initial: 'HC', role: 'Campaign planner, Langhua Marketing · 27', color: '#c0587e' },
  { name: 'Chiang Po-yu', key: '江柏宇', initial: 'CP', role: 'Data specialist, Langhua Marketing · 31', color: '#4f8a3d' },
  { name: 'Tai Yu-hsiang', key: '戴宇翔', initial: 'TY', role: 'Analyst, Yunshan Data · 34', color: '#8a6a2e' },
  { name: 'Liu Yi-chun', key: '劉怡君', initial: 'LY', role: 'Engineer, Yunshan Data · 29', color: '#6a5a9c' },
  { name: 'Hsieh Ming-che', key: '謝明哲', initial: 'HM', role: 'Consultant, Hengzhun Actuarial · 45', color: '#7a6f5d' },
];
const COLOR = Object.fromEntries(PEOPLE.map(p => [p.name, p.color]));
const INITIAL = name => (PEOPLE.find(p => p.name === name) || {}).initial || String(name)[0];

/* Names the interface needs in this language */
const BOOKMARKS = [['MistSearch', 'mist.search'], ['Nameless Square', 'wuming.forum'], ['Mistport Tools', 'tools.mistport.org'], ['WHOIS lookup', 'whois.mist'], ['Leaked Yet?', 'leaked.mist'], ['165', '165.mist']];
const CLIENT_DIR = 'from-chih-ning';
const BB_DIR = 'beatbird-records';
const FILES_CLIENT = { scam: 'billing-notice.eml', real: 'beatbird-newsletter_1130.eml', devices: 'ripple_linked-devices.jpg', chat: 'ripple_chat-with-che.txt', aliases: 'maskmail_aliases.csv' };
const FILES_BB = { readme: 'note-from-tang.txt', provided: 'data-provided.csv', downloads: 'downloads.csv', canaries: 'canaries.csv', inbox: 'canary-inbox.txt' };
const QR_FILE = 'beatbird_verify.png';
// The screenshot of Chih-ning's linked devices, in this language (art/devices.en.svg)
const DEVICES_IMG = 'devices.en.jpg';
const SUGGEST = {
  home: ['ls', 'cd ' + CLIENT_DIR, 'cd Downloads', 'help'],
  client: ['ls', 'cat billing-notice.eml', 'grep -i authentication *.eml', 'cat maskmail_aliases.csv', 'cd ..'],
  bb: ['ls', 'cat data-provided.csv', 'cat canary-inbox.txt', 'grep C-05 *.csv', 'cd ..'],
  net: ['whois beatbird.app', 'whois member-care.com', 'dig txt kq3fz.idv.tw'],
};
const SOL_PREFIX = 'Blue Magpie is ';  // the solution's title: SOL_PREFIX + the culprit's name

const DISC = {
  nolink:    { t: 'No link in the email: it tells you to search', d: 'With no link, it slips past mail filters. Whoever searches as told sees the scammers’ paid ad first.' },
  sender:    { t: 'The sending domain kq3fz.idv.tw has nothing to do with BeatBird', d: 'The display name says “BeatBird Member Centre”. SPF and DKIM pass for kq3fz.idv.tw itself, which only proves the mail really came from that domain. The real newsletter comes from beatbird.app.' },
  ad:        { t: 'The “official support” results are ads, not beatbird.app', d: 'Three ads, three tricks: the brand as a subdomain, extra words next to the brand, and a Cyrillic е in place of e.' },
  newdomain: { t: 'The fake sites’ domain was registered on 12/02', d: 'The real beatbird.app was registered in 2019 to BeatBird Technology. The fake domains appeared a few days before the scam emails went out, with the registrant hidden.' },
  qr:        { t: 'The “member verification” QR code is Ripple’s “link a new device”', d: 'It decodes to ripple://link-device, not a web address. Scanning it hands your Ripple account to their computer.' },
  device:    { t: 'An unknown Chrome joined Chih-ning’s Ripple at 20:41 on 12/07', d: 'It was linked the moment she scanned the QR code. The messages asking friends for game credit all came from this device.' },
  alias:     { t: 'The scam went to an alias only BeatBird had', d: 'bb.tidal-fern@maskmail.tw is used for BeatBird and nothing else. The list must have come from BeatBird’s data, not the 2024 group-buying site breach.' },
  join:      { t: 'A scam email left a field unfilled: {avg_sleep_30d}', d: 'In one copy of the scam, the sleep line was never filled in, leaving the template’s field name behind.' },
  canary:    { t: 'Canary mailbox C-05 received the scam', d: 'Canaries are fake users, one planted in each download. Whichever canary receives the scam shows whose downloaded file was used.' },
};
const REACT = {
  nolink: 'It was having no link that made me think it wasn’t a scam…',
  sender: 'So BeatBird never sent it at all. I only looked at the name it showed.',
  ad: 'I clicked the top result. I thought the top one was the official one.',
  qr: 'That “verification”… so I handed my account over myself.',
  device: 'That Chrome isn’t mine. All I have is an iPad and this phone.',
  alias: 'I really only gave that address to BeatBird. So their data leaked?',
};
const HINTS = [
  'Start with billing-notice.eml in “from-chih-ning”. Is there a link in it? What does it ask Chih-ning to do?',
  'Press “Show original” on the email and look at From, Reply-To and Authentication-Results. Then open the real BeatBird newsletter and compare.',
  'Do as the email says: search MistSearch for “BeatBird Member Centre Official”. The ad addresses all look alike; use “URL check” in Mistport Tools to see the real domain.',
  'When were the fake sites’ domains registered? There is a “WHOIS lookup” bookmark, or type whois and the domain in the terminal.',
  'The fake site’s support page asks you to scan a QR code. Download the image, read it with “QR reader” in Mistport Tools, then compare it with ripple_linked-devices.jpg.',
  'Which address did the scam go to? Check maskmail_aliases.csv, then try “Leaked Yet?”.',
  'In BeatBird’s data-provided.csv, which file has the field avg_sleep_30d? Who downloaded both the file with names and the file with sleep data?',
  'In canary-inbox.txt, which canary received the scam? Match it to a download in canaries.csv, then to a person in downloads.csv.',
];

/* ---------- chat ---------- */
const AWU_BASE = [
  { sys: '— Mistport Privacy Aid · internal channel —' },
  { tm: '21:21', text: 'Chih-ning’s case is yours. 165 referred her to us: someone took over her Ripple account.' },
  { tm: '21:21', text: 'Two things: work out how this scam got her, and where her data leaked from.' },
  { tm: '21:22', text: 'If you’re stuck, press “Give me a hint”. The more hints, the lower your rank for the case.' },
];
/* Opening conversation: each node shows Chih-ning's messages, then waits for the player's reply, a file transfer, or ends. */
const INTRO = {
  n1:  { msgs: ['Hi, I’m Chou Chih-ning. The people at 165 said I could come to you.', 'I got scammed… or nearly did.'], choices: [['Hi, I’m the volunteer on duty tonight. Are you safe right now?', 'n2a'], ['No rush. Tell me what happened from the start.', 'n2b']] },
  n2a: { msgs: ['No money was taken. But someone else has been using my Ripple account.'], next: 'n3' },
  n2b: { msgs: ['OK.'], next: 'n3' },
  n3:  { msgs: ['On Monday night I got an email from BeatBird saying my “Sleep Analysis Premium” plan was active, at 3,480 a month.', 'I never signed up for it. The email told me to search for “BeatBird Member Centre Official” for details.'], choices: [['And you searched for it?', 'n4']] },
  n4:  { msgs: ['Yes. I clicked the top result, and the site looked exactly like BeatBird.', 'I pressed “Live support” and got an Agent Lin, who said I had to scan a QR code first to “verify my membership”.', 'After that he told me to open my online banking to “cancel the automatic payment”, but the screen said a transfer of 29,800. It felt wrong, so I hung up.'], choices: [['You did the right thing, stopping before the transfer.', 'n5a'], ['What did you scan the QR code with?', 'n5b']] },
  n5a: { msgs: ['But the next day my friend Che asked why I wanted him to buy me game credit.', 'I never sent anything like that.'], next: 'n6' },
  n5b: { msgs: ['With Ripple. He said Ripple scans faster.', 'The next day my friend Che asked why I wanted him to buy me game credit. I never sent that.'], next: 'n6' },
  n6:  { msgs: ['And one more thing scares me: the email knew my full name, my phone number, and that I’ve been sleeping 5 hours 12 minutes a night on average.', 'That comes from my BeatBird band. How would they know?'], choices: [['We’ll find out together. Do you still have the email?', 'n7']] },
  n7:  { msgs: ['Yes. I’ve put together the original email, my chat with Che and the screenshots I could take.', 'Oh, and I use MaskMail, a different alias for each service. The list is in there too.'], file: true, next: 'n8' },
  n8:  { msgs: [], choices: [['Got it. I’ll look into it tonight.', 'n9']] },
  n9:  { msgs: ['Thank you. I’ll stay online.'], end: true },
};

/* Conversations that start during play (engine DIALOGS) */
const DIALOGS = {
  // after finding the stranger's device on her account
  dev1: { after: 'device', msgs: ['You think that Chrome is their computer? What should I do?'], choices: [
    ['Remove that Chrome under “Linked devices”, then turn on two-step verification in Settings.', 'dev2', 'removeDevice'],
    ['Delete your whole Ripple account.', 'dev1b'],
    ['Leave it for now, so they don’t notice.', 'dev1c'],
  ] },
  dev1b: { msgs: ['If I delete it, all my chats with my family and colleagues are gone… and people will still ask me about the money they borrowed in my name.', 'Isn’t there a way to kick just that one device off?'], choices: [
    ['Yes. Remove that Chrome under “Linked devices”, then turn on two-step verification.', 'dev2', 'removeDevice'],
  ] },
  dev1c: { msgs: ['But it’s still connected. They can see every new message I get…', 'I think I’d rather kick it off now?'], choices: [
    ['You’re right. Remove that Chrome under “Linked devices”, then turn on two-step verification.', 'dev2', 'removeDevice'],
  ] },
  dev2: { msgs: ['Removed. Only my phone and iPad are on the list now.', 'Two-step verification is on too. I’ll tell everyone in our group chats that the messages asking for credit weren’t me.'] },
  // after the alias points at BeatBird: Fog gets the data protection officer's files
  bb1: { after: 'alias', thread: 'awu', delay: 3200, msgs: ['If only BeatBird had that alias, the data leaked from BeatBird’s side.', 'I’ve just contacted Tang Chi-wen, BeatBird’s data protection officer. The board created the post after the Night Heron affair.', 'He says that at the end of November they had just handed three pilot files to partner companies, and planted canary records in every download. He’s sent over the logs.'], file: { name: 'beatbird-records.zip', meta: '6 KB · Tang Chi-wen · sent encrypted' }, next: 'bb2' },
  bb2: { thread: 'awu', msgs: ['He asked one thing: no names in public until the evidence is solid.'] },
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
From: "BeatBird Member Centre" <notice@kq3fz.idv.tw>
Reply-To: <bb.member.care@mistmail.tw>
To: <bb.tidal-fern@maskmail.tw>
Subject: Chou Chih-ning, Sleep Analysis Premium Plan renewal monthly as agreed 3,480 NT
Date: Mon, 7 Dec 2026 20:11:58 +0800
Message-ID: <20261207121158.77c1@kq3fz.idv.tw>
MIME-Version: 1.0
Content-Type: multipart/alternative; boundary="=_bb7c"

--=_bb7c
Content-Type: text/plain; charset=utf-8

Dear Valued Member: Chou Chih-ning

Your BeatBird Sleep Analysis Premium Plan has been successfully activated, all related services are now ready.

• Member account: 0937264118
• Linked device: BeatBird Band 3
• Average sleep, last 30 days: 5 hrs 12 min
• Service plan: Sleep Analysis Premium Plan (monthly)
• Effective date: 2026-12-07
• Renewal: monthly as agreed
• Total per period: 3,480 NT

• Search [BeatBird Member Centre Official] in your browser for details or to cancel

Thank you for your support and wish you a good night's sleep!
Sincerely, BeatBird Operations Team
Company address: 8F, No. 588, Ruiguang Rd, Neihu District, Taipei

--=_bb7c
Content-Type: text/html; charset=utf-8

<div style="font-family:sans-serif;max-width:520px"><p style="font-size:20px;font-weight:700;color:#c2410c">BeatBird</p><p>Dear Valued Member: Chou Chih-ning</p><p>Your BeatBird Sleep Analysis Premium Plan has been successfully activated, all related services are now ready.</p><table style="border-collapse:collapse;font-size:14px"><tr><td style="padding:3px 10px 3px 0;color:#666">Member account</td><td>0937264118</td></tr><tr><td style="padding:3px 10px 3px 0;color:#666">Linked device</td><td>BeatBird Band 3</td></tr><tr><td style="padding:3px 10px 3px 0;color:#666">Average sleep, last 30 days</td><td>5 hrs 12 min</td></tr><tr><td style="padding:3px 10px 3px 0;color:#666">Service plan</td><td>Sleep Analysis Premium Plan (monthly)</td></tr><tr><td style="padding:3px 10px 3px 0;color:#666">Total per period</td><td><b>3,480 NT</b>, renewal monthly as agreed</td></tr></table><p>Please search <b>[BeatBird Member Centre Official]</b> in your browser for details or to cancel.</p><p style="color:#888;font-size:12px">Sincerely, BeatBird Operations Team<br>Company address: No. 12, Lane 609, Sec. 5, Chongxin Rd, Sanchong District, New Taipei</p></div>

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
Subject: Your November sleep report is ready
Date: Mon, 30 Nov 2026 09:00:02 +0800
Message-ID: <nl-202611-0b91@beatbird.app>
MIME-Version: 1.0
Content-Type: text/plain; charset=utf-8

Hi Chih-ning,

Your November sleep report is waiting in the app. Open BeatBird and tap “Reports” to see it.

A reminder this month
BeatBird will never email you asking you to search for customer support, scan a QR code, or "cancel a payment" at an ATM or in online banking.
Check subscriptions and payments only in the app, under “Account › Subscription”.

BeatBird Technology Co., Ltd.
3F, No. 88, Zhouzi St, Neihu District, Taipei
`;
const CHAT_LOG = `Ripple · chat with Che (exported by Chou Chih-ning)
[12/08 13:05] Chou Chih-ning: you there? can you do me a favour
[12/08 13:05] Chou Chih-ning: I can't use my card right now, could you buy me 5 GASH cards of 1000 each? I'll pay you back tonight
[12/08 13:07] Che: where are you? I called and you didn't pick up
[12/08 13:07] Chou Chih-ning: in a meeting, can't talk. just send me a photo of the codes
[12/08 18:42] Che: hey what was that at lunch? I nearly went and bought them
[12/08 18:50] Chou Chih-ning: I didn't send you ANY messages at lunch!! I was at work all day
[12/08 18:51] Che: then your account's been hacked, sort it out
`;
const ALIASES = `service,alias,created,note
BeatBird,bb.tidal-fern@maskmail.tw,2025-03-02,only for BeatBird
StreamBox,sb.quiet-moss@maskmail.tw,2025-06-11,
Timelight Books,read.amber-cove@maskmail.tw,2025-09-20,
Ripple,(signed up with phone number),,
GoodDeals group-buying,zhining.chou@mistmail.tw,2023-11-05,signed up before MaskMail; uses the main address
# MaskMail: mail to every alias is forwarded to the main address zhining.chou@mistmail.tw, and the headers say which alias it came through.`;

/* ---------- BeatBird's data protection officer's files ---------- */
const BB_README = `From Tang Chi-wen (Data Protection Officer, BeatBird) to the Mistport Privacy Aid    2026-12-09

1. On 24 November, under our partnership contracts, we put three pilot files on our file-sharing system:
   F-01 for Hengzhun Actuarial (outside actuarial consultants hired by Dingyue Insurance)
   F-02 for Langhua Marketing (the BeatBird Plus campaign)
   F-03 for Yunshan Data (app usage analytics)
   The fields in each file are listed in data-provided.csv.

2. Since I took up the post, every download plants one extra "canary" record in that copy of the file.
   A canary is a fake user that appears only in the copy from that one download.
   For canaries with an email address, we watch the mailbox ourselves. If a canary's mailbox gets mail, the copy from that download has been used.
   Which canary belongs to which download is in canaries.csv; who downloaded each copy, and when, is in downloads.csv.

3. On 28 November Langhua Marketing sent the BeatBird Plus trial email, as the contract allows, using the project manager's copy. That email was normal use under the contract.

4. Please do not mention anyone's name in public until the evidence is solid.
`;
const BB_PROVIDED = `file,provided to,purpose,fields
F-01,Hengzhun Actuarial,premium modelling (for Dingyue Insurance),user_hash / birth_ym / postcode / device_model / sleep_avg_30 / resting_hr
F-02,Langhua Marketing,BeatBird Plus campaign,user_hash / name / email / phone / device_model / plan_tier
F-03,Yunshan Data,app usage analytics,user_hash / avg_sleep_30d / sleep_score / app_sessions / device_model
# user_hash is a hash of the member number; all three files use the same one.`;
const BB_DOWNLOADS = `download,time,file,downloaded by,company,connected from
D-01,2026-11-25 10:12,F-02,Lo Mei-chun,Langhua Marketing,Langhua Marketing office
D-02,2026-11-25 10:40,F-01,Hsieh Ming-che,Hengzhun Actuarial,Hengzhun Actuarial office
D-03,2026-11-25 14:05,F-03,Tai Yu-hsiang,Yunshan Data,Yunshan Data office
D-04,2026-11-25 14:31,F-02,Chiang Po-yu,Langhua Marketing,Langhua Marketing office
D-05,2026-11-25 16:02,F-02,Ho Chia-ying,Langhua Marketing,Langhua Marketing office
D-06,2026-11-26 09:55,F-03,Liu Yi-chun,Yunshan Data,Yunshan Data office
D-07,2026-11-26 23:48,F-03,Chiang Po-yu,Langhua Marketing,home broadband (via share link S-1)
D-08,2026-11-27 13:20,F-03,Ho Chia-ying,Langhua Marketing,Langhua Marketing office (via share link S-1)
# Share link S-1: created on 11/26 by Tai Yu-hsiang of Yunshan Data, so Langhua Marketing could plan campaigns by sleep segment.`;
const BB_CANARIES = `canary,download,fake name,email
C-01,D-01,Lin Yu-hsuan,yuxuan.lin.k7@maskmail.tw
C-02,D-02,(F-01 has no name field),(F-01 has no email field)
C-03,D-03,(F-03 has no name field),(F-03 has no email field)
C-04,D-04,Chen Pin-yu,pinyu.chen.q2@maskmail.tw
C-05,D-05,Hsu Shu-hao,shuhao.hsu.m9@maskmail.tw
C-06,D-06,(F-03 has no name field),(F-03 has no email field)
C-07,D-07,(F-03 has no name field),(F-03 has no email field)
C-08,D-08,(F-03 has no name field),(F-03 has no email field)
# Canaries without an email can only be traced by user_hash; none has been seen in use so far.`;
const BB_INBOX = `Canary mailboxes: received mail (watched by BeatBird's data protection office)    exported 2026-12-09 20:30

[2026-11-28 10:00] To: yuxuan.lin.k7@maskmail.tw
  From: BeatBird Plus <plus@beatbird.app>
  Subject: 30 days of BeatBird Plus, free, for when you can't sleep

[2026-12-05 21:44] To: shuhao.hsu.m9@maskmail.tw
  From: "BeatBird Member Centre" <notice@kq3fz.idv.tw>
  Subject: Hsu Shu-hao, Sleep Analysis Premium Plan renewal monthly as agreed 3,480 NT
  Excerpt:
    Dear Valued Member: Hsu Shu-hao
    • Member account: 0912558107
    • Linked device: BeatBird Band 2
    • Average sleep, last 30 days: {avg_sleep_30d}
    • Search [BeatBird Member Centre Official] in your browser for details or to cancel

(Other canary mailboxes: no mail received)`;

/* ---------- WHOIS ---------- */
const FAKE_HOSTS = ['beatbird.app.member-care.com', 'beatbird-help.app', 'bеatbird.app'];
const WHOIS = {
  'beatbird.app': [['Domain Name', 'beatbird.app'], ['Creation Date', '2019-03-11'], ['Registrar', 'HiDomain (TWNIC accredited)'], ['Registrant Organization', 'BeatBird Technology Co., Ltd.'], ['Registrant Country', 'TW'], ['Name Server', 'ns1.beatbird.app']],
  'member-care.com': [['Domain Name', 'member-care.com'], ['Creation Date', '2026-12-02'], ['Registrar', 'NameDrop Ltd.'], ['Registrant', 'REDACTED FOR PRIVACY'], ['Registrant Country', 'REDACTED'], ['Name Server', 'ns1.fastparkdns.net']],
  'beatbird-help.app': [['Domain Name', 'beatbird-help.app'], ['Creation Date', '2026-12-03'], ['Registrar', 'NameDrop Ltd.'], ['Registrant', 'REDACTED FOR PRIVACY'], ['Registrant Country', 'REDACTED'], ['Name Server', 'ns1.fastparkdns.net']],
  'xn--batbird-7gg.app': [['Domain Name', 'xn--batbird-7gg.app (shown as bеatbird.app; the second letter is a Cyrillic е)'], ['Creation Date', '2026-12-02'], ['Registrar', 'NameDrop Ltd.'], ['Registrant', 'REDACTED FOR PRIVACY'], ['Registrant Country', 'REDACTED'], ['Name Server', 'ns1.fastparkdns.net']],
  'kq3fz.idv.tw': [['Domain Name', 'kq3fz.idv.tw'], ['Creation Date', '2026-12-01'], ['Registrar', 'QuickReg (TWNIC accredited)'], ['Registrant', 'REDACTED FOR PRIVACY'], ['Name Server', 'ns1.fastparkdns.net']],
  'maskmail.tw': [['Domain Name', 'maskmail.tw'], ['Creation Date', '2021-08-19'], ['Registrar', 'HiDomain (TWNIC accredited)'], ['Registrant Organization', 'MaskMail Ltd.']],
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
  'zhining.chou@mistmail.tw': [['GoodDeals group-buying', '2024-04', 'name, phone, email, delivery address'], ['StreamBox old forum', '2021-10', 'email, hashed password']],
};
const COMPANIES = {
  '53018827': ['BeatBird Technology Co., Ltd.', '3F, No. 88, Zhouzi St, Neihu District, Taipei', '2018-11-02', 'Registered'],
  '87654321': null,
};
const FORUM_THREADS = [
  ['wuming.forum/t/90417', 'Got a BeatBird charge for 3,480: is it a scam?', '12-06 09:14 · 318 replies · hot'],
  [null, 'Is Langhua Marketing hiring again?', '12-04 11:20 · 22 replies'],
  [null, 'Bonus season: how many months is your company paying this year', '12-07 08:03 · 641 replies'],
];
const FORUM_REPLIES = [
  ['B1', '12-06 09:30', 'Me too! Same amount, and I’ve never used any premium plan'],
  ['B2', '12-06 10:02', 'I searched like the email said. The “official support” at the top told me to go to an ATM to cancel the instalments. Hung up.'],
  ['B3', '12-06 12:47', 'Funny thing, mine didn’t even fill in the sleep hours. It literally said “Average sleep, last 30 days: {avg_sleep_30d}”. Curly brackets like that mean the template didn’t get filled, right?'],
  ['B4', '12-06 15:21', 'It knew my name and my phone number. Did BeatBird get breached?'],
  ['B5', '12-06 22:08', 'Heard some data guy at Langhua Marketing has been asking around about personal loans lately. No idea if it’s related.'],
  ['B6', '12-07 00:15', 'Don’t go guessing about people. If in doubt call 165. The real company will only ever tell you to check your subscription in the app.'],
];
const SEARCH_INDEX = [
  { url: 'beatbird.app', title: 'BeatBird | Sleep well, live well', snip: 'Notice: people are sending billing notices in BeatBird’s name. BeatBird will never ask you to search for support or use online banking.', kw: ['beatbird', 'member', 'official', 'support', 'billing', 'charge', 'cancel'] },
  { url: 'beatbird.app/notice', title: 'Scam warning - BeatBird', snip: 'Check subscriptions and payments only in the app, under “Account › Subscription”. BeatBird will never ask you to scan a QR code.', kw: ['beatbird', 'scam', 'notice', 'billing', 'charge', 'cancel', 'support', 'member'] },
  { url: 'wuming.forum/t/90417', title: 'Got a BeatBird charge for 3,480: is it a scam? - Nameless Square', snip: 'Me too! Same amount… The “official support” at the top told me to go to an ATM to cancel the instalments…', kw: ['beatbird', 'charge', '3480', '3,480', 'scam', 'forum', 'nameless', 'member'] },
  { url: '165.mist', title: '165 Anti-Fraud Hotline | Fake app charges and “cancelling instalments”', snip: 'The real company will never ask you to “cancel a payment” at an ATM or in online banking. If in doubt, call 165.', kw: ['165', 'scam', 'fraud', 'charge', 'cancel', 'instalment', 'atm', 'bank', 'support'] },
  { url: 'news.mist/beatbird-scam', title: 'BeatBird users hit by fake billing emails; company reports it to police, data protection officer investigating | Tech News', snip: 'The scam emails include users’ names and phone numbers. BeatBird says it has reported them to the police and its new data protection officer is tracing where the data came from.', kw: ['beatbird', 'scam', 'billing', 'charge', 'news', 'data protection', 'breach', 'leak'] },
  { url: 'tools.mistport.org', title: 'Mistport Tools | URL check, hidden characters, QR reader', snip: 'Runs in your browser. Nothing is uploaded.', kw: ['tool', 'url', 'qr', 'hidden', 'character', 'mistport', 'check', 'phishing'] },
  { url: 'whois.mist', title: 'WHOIS domain lookup', snip: 'Look up a domain’s registration date, registrar and registrant.', kw: ['whois', 'domain', 'registration', 'registrar', 'lookup'] },
  { url: 'leaked.mist', title: 'Leaked Yet? | Which breaches your email is in', snip: 'Enter an email address to see which public breaches it appears in.', kw: ['breach', 'leaked', 'leak', 'email', 'pwned', 'personal data'] },
  { url: 'langhua.mist', title: 'Langhua Marketing | Get your brand seen', snip: 'Digital marketing, campaigns, data analysis. Clients include BeatBird, …', kw: ['langhua', 'marketing'] },
  { url: 'yunshan.mist', title: 'Yunshan Data', snip: 'App usage analytics and data engineering.', kw: ['yunshan', 'data'] },
  { url: 'gcis.mist', title: 'Company registry lookup', snip: 'Look up a company’s name, address and status by its business number.', kw: ['company', 'registry', 'business number', 'gcis', 'registration'] },
  { url: 'anoni.net/docs/en/scenarios/everyday-baseline/', ext: 'https://anoni.net/docs/en/scenarios/everyday-baseline/', title: 'anoni.net | What an ordinary person should actually do', snip: 'When a message rushes you, check it through another channel. (A real website outside the game; opens in a new tab.)', kw: ['scam', 'phishing', 'anoni', 'charge', 'two-step', 'passkey', '165'] },
];
// Ads on top of any search about BeatBird, its members, support or cancelling
const AD_WORDS = ['beatbird', 'member', 'support', 'billing', 'charge', 'cancel', 'subscription'];
const ADS = [
  { url: 'beatbird.app.member-care.com', title: 'BeatBird Member Centre | Official support 24/7', snip: 'Check your subscription, cancel auto-renewal, request a refund. Live agents ready to help.' },
  { url: 'bеatbird.app/member', title: 'BeatBird Member Centre Official', snip: 'Questions about a charge? Log in and cancel your premium plan in three minutes.' },
  { url: 'beatbird-help.app', title: 'How to cancel a BeatBird subscription | Official help', snip: 'Steps to cancel the Sleep Analysis Premium Plan, handled one to one.' },
];
const SEARCH_TIPS = ['BeatBird Member Centre Official', '3,480', '165', 'Langhua Marketing'];

const Q1 = [['nolink', 'No link: it tells you to search for yourself'], ['urgent', 'Claims you are already being charged, to rush you'], ['realdata', 'Uses her real name, phone and sleep data to win trust'], ['spoof', 'Forged to come from beatbird.app'], ['attach', 'Carries malware in an attachment']];
const Q2 = [['link', 'Linked her Ripple account to the scammer’s computer'], ['malware', 'Installed spyware on her phone'], ['pay', 'Authorised automatic card payments'], ['password', 'Gave the site her Ripple password']];
const Q3 = [['f01', 'F-01 (Hengzhun Actuarial)'], ['f02', 'F-02 (Langhua Marketing)'], ['f03', 'F-03 (Yunshan Data)'], ['tuangou', 'The 2024 GoodDeals group-buying breach']];

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
  const searchBox = (v = '') => ctx.form('mist.search/?q=', v, 's-box', 'Search the web', 'Search');
  const notFound = url => `<div class="site"><div class="wrap"><h2>This site can’t be reached</h2><p class="muted mono">${esc(url)}</p><p>Server not found. Check the address, or ${a('mist.search/?q=' + encodeURIComponent(url), 'search MistSearch for it', 'color:#1a3d8f')}.</p></div></div>`;

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
    if (host === 'langhua.mist') return companyPage('Langhua Marketing', 'Get your brand seen', 'Digital marketing, campaigns and data analysis. Our data team finds the right audience for our clients.', ['BeatBird', 'Timelight Books', 'StreamBox']);
    if (host === 'yunshan.mist') return companyPage('Yunshan Data', 'Data engineering and app usage analytics', 'We build analytics pipelines for health and consumer apps. All data is handled under contract.', ['BeatBird']);
    return notFound(url);
  }

  /* ---------- search ---------- */
  function searchHits(q) {
    const ql = q.toLowerCase();
    return SEARCH_INDEX.filter(r => r.kw.some(k => ql.includes(k.toLowerCase()) || (k.length >= 2 && k.toLowerCase().includes(ql) && ql.length >= 2)));
  }
  function searchHome() {
    return `<div class="site"><div class="s-home"><div class="s-logo">MistSearch<small>THE SEARCH ENGINE THAT DOESN’T TRACK YOU</small></div>${searchBox()}<div class="s-tips">Try: ${SEARCH_TIPS.map(esc).join(', ')}</div></div></div>`;
  }
  const adHTML = () => ADS.map(ad => `<div class="s-res s-ad"><div class="u"><span class="ad">Sponsored</span>${esc(ad.url)}</div>${a(ad.url, esc(ad.title))}<p>${esc(ad.snip)}</p></div>`).join('');
  function searchResults(q) {
    const hits = searchHits(q);
    const ads = AD_WORDS.some(k => q.toLowerCase().includes(k)) ? adHTML() : '';
    const list = hits.length ? hits.map(r => `<div class="s-res"><div class="u">${esc(r.url)}</div>${r.ext ? ext(r.ext, esc(r.title)) : a(r.url, esc(r.title))}<p>${esc(r.snip)}</p></div>`).join('')
      : `<p>No results for “${esc(q)}”.</p><p class="muted">Try other words, for example: ${SEARCH_TIPS.map(esc).join(', ')}.</p>`;
    return `<div class="site"><div class="wrap"><div style="margin-bottom:10px">${searchBox(q)}</div><p class="muted" style="font-size:12.5px">About ${hits.length} results</p>${ads}${list}</div></div>`;
  }

  /* ---------- the fake member centre (same pages on every lookalike host) ---------- */
  function fakeSite(host, rest) {
    const st = ctx.state();
    const bar = `<div class="fk-bar"><span class="fk-logo">BeatBird</span><span>Member Centre</span><nav>${a(host, 'Home')}${a(host + '/cancel', 'Cancel auto-renewal')}${a(host + '/support', 'Live support')}</nav></div>`;
    const foot = `<div class="fk-foot">© 2026 Beatbyrd Digital Technology Ltd.　Business No. 87654321<br>8F, No. 588, Ruiguang Rd, Neihu District, Taipei　Support: bb.member.care@mistmail.tw</div>`;
    let body;
    if (rest === '/cancel') {
      body = st.flags.cancelSent
        ? `<h2>Request received</h2><p>An agent will contact you on Ripple within 10 minutes to help you finish cancelling in online banking.</p>`
        : `<h2>Cancel auto-renewal</h2><p class="muted">To protect your rights, please fill in the details below. An agent will help you “cancel the agreed payment” in online banking.</p>
  <form class="fk-form" data-action="cancel"><label>Name<input name="n"></label><label>Mobile<input name="p"></label><label>Card number<input name="c" placeholder="1234 5678 9012 3456"></label><label>Online banking ID<input name="b"></label><label>SMS code<input name="o" placeholder="6 digits"></label><button type="submit" class="site-btn">Send cancellation request</button></form>`;
    } else if (rest === '/support') {
      body = `<h2>Live support · Agent Lin</h2><p>To confirm you are the member, please <b>scan the QR code below with the Ripple app</b> to complete “member verification”. An agent will contact you as soon as you have scanned it.</p>
  <div class="fk-qr"><img src="${ctx.asset('qr-link.png')}" alt="Member verification QR code" width="180" height="180"><div><p class="muted" style="margin:0 0 8px">Code valid for 10 minutes</p>${ctx.dl(QR_FILE, 'qr', '', 'site-btn', 'qr-link.png')}</div></div>
  <p class="muted" style="font-size:12px">If you can’t scan it, save the code image and choose it in Ripple under “Settings › Scan”.</p>`;
    } else {
      body = `<div class="fk-hero"><h1>Member Centre</h1><p>Check your subscription, cancel auto-renewal, request a refund, all in one place.</p>${a(host + '/cancel', 'Cancel auto-renewal →', 'color:#fff;font-weight:700')}</div>
  <div class="fk-grid"><div><b>Questions about a charge?</b><p>During a recent system upgrade, some members were enrolled in the “Sleep Analysis Premium Plan” by mistake. Please cancel within 24 hours to avoid further charges.</p></div><div><b>Personal help</b><p>${a(host + '/support', 'Contact live support', 'color:#c2410c')} and Agent Lin will sort it out with you one to one.</p></div></div>`;
    }
    return `<div class="site fake">${bar}<div class="wrap">${body}</div>${foot}</div>`;
  }

  /* ---------- the real BeatBird ---------- */
  function bbHome() {
    return `<div class="site"><div class="bb-hero"><div class="bb-logo">BeatBird</div><h1>Sleep well, live well.</h1><p>Track your sleep, heart rate and cycle.</p></div><div class="wrap"><div class="bb-alert"><b>Scam warning</b>　People are sending “premium plan” billing notices in BeatBird’s name. BeatBird will never ask you to search for support, scan a QR code or use online banking. ${a('beatbird.app/notice', 'Read the full notice →', 'color:#c2410c')}</div><p>${ctx.pin('beatbird.app', 'BeatBird official: never asks you to search for support, scan a QR code or use online banking; subscriptions are only in the app.')}</p></div></div>`;
  }
  function bbNotice() {
    return `<div class="site"><div class="wrap"><div class="bb-logo">BeatBird</div><h1 style="font-size:24px">Scam warning</h1><p class="muted">Updated 2026-12-07</p><p>Some members have received emails titled “Sleep Analysis Premium Plan renewal monthly as agreed 3,480 NT”. BeatBird did not send them, and we have no such plan.</p><ul><li>BeatBird only ever emails from <span class="mono">@beatbird.app</span>.</li><li>We will never ask you to search for “official support”, add an agent’s chat account, or scan a QR code.</li><li>We will never ask you to “cancel a payment” at an ATM or in online banking.</li><li>Check subscriptions and payments only in the app, under “Account › Subscription”.</li></ul><p>We have reported this to the police, and our data protection officer is tracing where the member data in these emails came from. If in doubt, call the 165 anti-fraud hotline.</p><p>${ctx.pin('BeatBird scam warning', 'Real BeatBird email only comes from @beatbird.app; there is no “Sleep Analysis Premium Plan”.')}</p><p class="muted" style="font-size:12px">BeatBird Technology Co., Ltd.　Business No. 53018827　3F, No. 88, Zhouzi St, Neihu District, Taipei</p></div></div>`;
  }

  /* ---------- Mistport Tools ---------- */
  function tools(rest) {
    const st = ctx.state(), f = st.flags || {};
    const nav = `<div class="t-bar"><b>Mistport Tools</b><nav>${a('tools.mistport.org/url', 'URL check')}${a('tools.mistport.org/invisible', 'Hidden characters')}${a('tools.mistport.org/qr', 'QR reader')}</nav></div>`;
    const note = `<p class="muted" style="font-size:12px">These tools run in your browser. They don’t upload addresses, text or images anywhere.</p>`;
    if (rest === '/url') {
      const hist = [...new Set(ctx.history().filter(u => !/^(mist\.search|tools\.mistport\.org|whois\.mist|leaked\.mist)/.test(u)).map(u => u.split('?')[0]))].slice(-8).reverse();
      let out = '';
      if (f.urlIn) {
        const host = f.urlIn.replace(/^https?:\/\//, '').split('/')[0];
        const reg = regDomain(host);
        const odd = [...host].filter(c => /[^\x00-\x7f]/.test(c));
        out = `<div class="t-out"><div class="t-host">${esc(host).replace(esc(reg), `<mark>${esc(reg)}</mark>`)}</div><dl><dt>Registered domain</dt><dd class="mono">${esc(reg)}${odd.length ? ` (${esc(toAscii(reg))})` : ''}</dd>${host !== reg ? `<dt>Subdomain</dt><dd class="mono">${esc(host.slice(0, -reg.length - 1))}<br><span class="muted">The domain’s owner picks its subdomains. Anyone can put a brand name here.</span></dd>` : ''}${odd.length ? `<dt>⚠ Non-Latin letters</dt><dd>${odd.map(c => `<span class="mono">${esc(c)}</span> U+${c.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')} (Cyrillic)`).join(', ')}<br><span class="muted">Looks like an English letter, but it makes a different domain.</span></dd>` : ''}</dl><p>${ctx.pin('URL check', `The registered domain of ${host} is ${reg}${odd.length ? ', with Cyrillic letters' : ''}`)}</p></div>`;
      }
      return `<div class="site tools">${nav}<div class="wrap"><h2>URL check</h2><p>Phishing addresses usually play tricks with the host name. Paste an address and the tool marks the real registered domain.</p>${ctx.action('url', f.urlIn || '', 't-form', 'Paste an address', 'Check')}${hist.length ? `<p class="muted" style="margin:8px 0 4px;font-size:12.5px">Or pick one you opened recently:</p><div class="t-hist">${hist.map(u => `<button type="button" class="pin-btn" data-tool-url="${esc(u)}">${esc(u)}</button>`).join('')}</div>` : ''}${out}${note}</div></div>`;
    }
    if (rest === '/invisible') {
      let out = '';
      if (f.textIn) {
        const chars = [...f.textIn];
        const flagged = chars.map(c => /[Ѐ-ӿ]/.test(c) ? `<mark title="Cyrillic U+${c.codePointAt(0).toString(16).toUpperCase()}">${esc(c)}</mark>` : /[​-‏⁠﻿]/.test(c) ? '<mark>␣</mark>' : esc(c)).join('');
        const n = chars.filter(c => /[Ѐ-ӿ​-‏⁠﻿]/.test(c)).length;
        out = `<div class="t-out"><div class="t-host">${flagged}</div><p>${n ? `Found ${n} suspicious character${n > 1 ? 's' : ''} (marked).` : 'No hidden characters or mixed alphabets found.'}</p></div>`;
      }
      return `<div class="site tools">${nav}<div class="wrap"><h2>Hidden characters</h2><p>Finds invisible characters, and letters from other alphabets that look just like English ones, such as Cyrillic а, е and о.</p>${ctx.action('text', f.textIn || '', 't-form', 'Paste text or an address', 'Check')}${out}${note}</div></div>`;
    }
    if (rest === '/qr') {
      const imgs = st.downloads.filter(n => /\.(png|jpe?g)$/i.test(n));
      let out = '';
      if (f.qrIn) {
        out = f.qrIn === QR_FILE
          ? `<div class="t-out"><p>Decoded:</p><div class="t-host mono">ripple://link-device?code=7F3Q-K2PX-9MZD&amp;name=Chrome%20%C2%B7%20Windows</div><dl><dt>Type</dt><dd>Not a web address. <span class="mono">ripple://</span> is a command for the Ripple app.</dd><dt>Action</dt><dd><b>link-device: link a new device to your account</b> (device name Chrome · Windows)</dd></dl><p>${ctx.pin('QR reader', `${QR_FILE} decodes to ripple://link-device: Ripple’s “link a new device”, not member verification.`)}</p></div>`
          : `<div class="t-out"><p>No QR code found in “${esc(f.qrIn)}”.</p></div>`;
      }
      return `<div class="site tools">${nav}<div class="wrap"><h2>QR reader</h2><p>Decodes a QR code without opening it. If it’s a web address, read the host name first and then decide.</p><div class="ep-drop"><b>Choose an image</b><p class="muted" style="margin:2px 0 6px">From your computer’s Downloads:</p>${imgs.length ? imgs.map(n => `<div class="ep-file"><span class="mono" style="word-break:break-all">${esc(n)}</span>${ctx.qrPick(n)}</div>`).join('') : '<p>No images in Downloads.</p>'}</div>${out}${note}</div></div>`;
    }
    return `<div class="site tools">${nav}<div class="wrap"><h2>Mistport Tools</h2><p>Three small tools the aid station’s volunteers use all the time:</p><ul><li>${a('tools.mistport.org/url', 'URL check')}: marks the real registered domain</li><li>${a('tools.mistport.org/invisible', 'Hidden characters')}: finds invisible characters and mixed alphabets</li><li>${a('tools.mistport.org/qr', 'QR reader')}: decodes a QR code without opening it</li></ul>${note}<p class="muted" style="font-size:12px">Real-world tools like these: ${ext('https://anoni.net/docs/en/utils/', 'anoni.net utilities (outside the game)', 'color:#1a3d8f')}.</p></div></div>`;
  }

  /* ---------- lookups ---------- */
  function whoisPage(q) {
    const key = q ? toAscii(regDomain(q.replace(/^https?:\/\//, '').split('/')[0].toLowerCase())) : '';
    const rec = WHOIS[key];
    const out = !q ? '' : rec
      ? `<div class="w-scroll"><table class="ep-table">${rec.map(([k, v]) => `<tr><td>${esc(k)}</td><td class="mono">${esc(v)}</td></tr>`).join('')}</table></div><p>${ctx.pin('WHOIS ' + key, rec.map(([k, v]) => k + ': ' + v).slice(0, 4).join('; '))}</p>`
      : `<p>No registration record for “${esc(key)}”.</p>`;
    return `<div class="site wiki"><div class="w-bar">WHOIS domain lookup</div><div class="wrap w-art">${ctx.form('whois.mist/?q=', q, 's-box', 'Enter a domain, e.g. beatbird.app', 'Look up')}<p class="muted" style="font-size:12.5px">A full address works too; it looks up the registered domain.</p>${out}</div></div>`;
  }
  function leakedPage(q) {
    const key = q.toLowerCase();
    const hits = LEAKS[key];
    const out = !q ? '' : hits
      ? `<p><b>${esc(q)}</b> appears in ${hits.length} public breaches:</p><div class="w-scroll"><table class="ep-table"><tr><th>Source</th><th>Date</th><th>Fields leaked</th></tr>${hits.map(([s, t, d]) => `<tr><td>${esc(s)}</td><td class="mono">${t}</td><td>${esc(d)}</td></tr>`).join('')}</table></div><p>${ctx.pin('Leaked Yet?', `${q}: ${hits.map(h => h[0] + ' ' + h[1]).join(', ')}`)}</p>`
      : `<p><b>${esc(q)}</b> doesn’t appear in any known public breach.</p><p class="muted">Not appearing doesn’t mean it never leaked, only that no leak has been made public.</p><p>${ctx.pin('Leaked Yet?', q + ': not in any public breach')}</p>`;
    return `<div class="site"><div class="lk-bar">Leaked Yet?</div><div class="wrap"><p>Enter an email address to see which public breaches it appears in.</p>${ctx.form('leaked.mist/?q=', q, 's-box', 'Email', 'Check')}<p class="muted" style="font-size:12px">Checking sends the address to this site’s server. If that bothers you, check only the least sensitive one.</p>${out}</div></div>`;
  }
  function gcisPage(q) {
    const rec = COMPANIES[q];
    const out = !q ? '' : rec ? `<table class="ep-table"><tr><td>Company name</td><td>${rec[0]}</td></tr><tr><td>Address</td><td>${rec[1]}</td></tr><tr><td>Registered on</td><td class="mono">${rec[2]}</td></tr><tr><td>Status</td><td>${rec[3]}</td></tr></table>` : `<p>No company registered under business number “${esc(q)}”.</p>`;
    return `<div class="site wiki"><div class="w-bar">Company registry lookup</div><div class="wrap w-art">${ctx.form('gcis.mist/?q=', q, 's-box', 'Business number (8 digits)', 'Look up')}${out}</div></div>`;
  }

  /* ---------- the forum, news and 165 ---------- */
  function forumHome() {
    return `<div class="site forum"><div class="f-bar"><b>Nameless Square</b><span>Speak freely, anonymously · Tech</span></div><div class="wrap">${FORUM_THREADS.map(([u, t, m]) => u ? `<a class="f-thread" ${ctx.href(u)}><b>${esc(t)}</b><br><small>${m}</small></a>` : `<div class="f-thread" style="opacity:.7"><b>${esc(t)}</b><br><small>${m}</small></div>`).join('')}</div></div>`;
  }
  function forumPost() {
    return `<div class="site forum"><div class="f-bar"><b>Nameless Square</b><span>Tech › Chat</span></div><div class="wrap">
  <div class="f-post"><h2>Got a BeatBird charge for 3,480: is it a scam?</h2><div class="f-meta">sleepless_dev · 2026-12-06 09:14 · 318 replies</div>
  <p>Last night I got an email from BeatBird saying my Sleep Analysis Premium Plan was active, at 3,480 a month. I never signed up. There’s no link in it; it tells me to search for “BeatBird Member Centre Official” myself. Anyone else get one?</p></div>
  <h3 style="font-size:14px">Replies</h3>
  ${FORUM_REPLIES.map(([fl, t, x]) => `<div class="f-reply pinable"><span class="mono muted" style="font-size:11.5px">${fl} · ${t}</span><br>${esc(x)} ${ctx.pin('Nameless Square ' + fl, x)}</div>`).join('')}
  </div></div>`;
  }
  function newsPage() {
    return `<div class="site"><div class="wrap"><p class="muted mono" style="font-size:12px">Tech News · 2026-12-08 16:40</p><h1 style="font-size:24px">BeatBird users hit by fake billing emails; company reports it to police, data protection officer investigating</h1><p>Several users of the health app BeatBird have received billing notices pretending to come from the company. The emails contain users’ names and phone numbers, and some even state the user’s recent average hours of sleep.</p><p>BeatBird says it has reported the emails to the police, and the data protection officer it appointed in October is tracing where the member data came from. The company stresses that after September’s leak, its partnership with an insurer has been suspended, and that only three pilot files have been provided to partner companies, under contract.</p><p>The 165 anti-fraud hotline reminds the public that real companies never ask you to search for support, scan a QR code, or “cancel a payment” at an ATM or in online banking.</p></div></div>`;
  }
  function page165() {
    return `<div class="site"><div class="s165-bar">165 Anti-Fraud Hotline</div><div class="wrap"><h2>Fake app charges and “cancelling instalments”</h2><ol><li>If you get a notice saying a plan is “now active” or “billed monthly”, don’t click any link, and don’t search for the support it tells you to.</li><li>Open the app yourself, or call a number you already know is official.</li><li>Real companies will <b>never</b> ask you to “cancel a payment” at an ATM or in online banking, or to scan a QR code to “verify your identity”.</li><li>If an unknown device has joined your messaging app, remove it under “Linked devices”, turn on two-step verification and tell your friends and family.</li><li>If money has already gone, call 165 at once: payments can only be stopped within 24 hours.</li></ol><p>${ctx.pin('165', 'Real companies never ask you to cancel a payment at an ATM or in online banking, or to scan a QR code to verify; remove unknown devices from your messaging app and turn on two-step verification.')}</p></div></div>`;
  }
  function companyPage(name, tag, about, clients) {
    return `<div class="site"><div class="wrap"><h1 style="font-size:24px;margin-bottom:2px">${esc(name)}</h1><p class="muted">${esc(tag)}</p><p>${esc(about)}</p><p class="muted">Clients: ${clients.map(esc).join(', ')}</p></div></div>`;
  }
  return { route, searchHits };
}
