/* Night Heron (夜鷺事件), English — story data and in-game websites, same structure as case.js.
   The setting stays in Taiwan; names are romanised. The writing-style clue is rebuilt for English:
   British spelling, single quotation marks and the sign-off "That's all." stand in for 臺,
   half-width spacing and 以上。 */

const PEOPLE = [
  { name: 'Chang Chia-hao', key: '張家豪', initial: 'CC', role: 'Data analyst · 32', color: '#3d8a6b' },
  { name: 'Lin Ya-ting', key: '林雅婷', initial: 'LY', role: 'Senior backend engineer · 35', color: '#c0587e' },
  { name: 'Hsu Chih-ming', key: '許志明', initial: 'HC', role: 'Legal counsel · 29', color: '#7a6f5d' },
  { name: 'Huang Mei-ling', key: '黃美玲', initial: 'HM', role: 'Product manager · 30', color: '#c98a2e' },
  { name: 'Wu Szu-yu', key: '吳思妤', initial: 'WS', role: 'Customer support lead · 41', color: '#6a5a9c' },
  { name: 'Chen Po-han', key: '陳柏翰', initial: 'CP', role: 'Sales manager · 38', color: '#4f7cac' },
];
const COLOR = Object.fromEntries(PEOPLE.map(p => [p.name, p.color]));
const INITIAL = name => (PEOPLE.find(p => p.name === name) || {}).initial || String(name)[0];

const BOOKMARKS = [['MistSearch', 'mist.search'], ['Nameless Square', 'wuming.forum'], ['PicNote', 'picnote.social'], ['TechWiki', 'techwiki.org/exif']];
const EXPORT_DIR = 'heron-export';
const FILE_KEYS = { recipients: 'recipients.txt', profiles: 'profiles.txt', attendance: 'attendance_0912-0916.csv', byod: 'byod_202603.csv' };
const EXPORT_FILES = Object.values(FILE_KEYS);
const STYLE_GREP = "That's all";
const SOL_PREFIX = 'Night Heron is ';
const SUGGEST = {
  home: ['ls', 'cd Downloads', 'cd heron-export', 'help'],
  export: ['ls', 'cat recipients.txt', 'cat attendance_0912-0916.csv', 'grep Pixel slack/*.log', `grep "${STYLE_GREP}" slack/*.log`, 'cd ..'],
  slack: ['ls', 'cat random.log', 'grep -i pixel *.log', 'cd ..'],
};

const DISC = {
  attach:  { t: 'Got the original attachment', d: 'The forum kept the uploaded file as it was: no recompression, nothing removed.' },
  nogps:   { t: 'No GPS fields in the photo', d: 'Night Heron really did turn location off. But GPS is only one field of the metadata.' },
  model:   { t: 'Camera: Google Pixel 7a', d: 'The Make and Camera Model Name fields in the EXIF.' },
  tz:      { t: 'Time zone offset +09:00', d: 'When the photo was taken, the phone was set to UTC+9, not Taiwan’s UTC+8.' },
  fname:   { t: 'PXL_ is the Pixel camera’s default file name', d: 'The digits are the UTC time, 14:47. Even with the EXIF wiped, the name gives away the brand and the time.' },
  note:    { t: 'In the photo, bottom left: a hotel notepad', d: 'A red header reading "HOTEL SAKU…" and "SHINJUKU · TOK…"; the right half is cut off.' },
  sticker: { t: 'In the photo: a sticker right of the trackpad', d: 'A black laptop, with an orange cat-head sticker beside the trackpad, a green sprout on its head.' },
  strip:   { t: 'Social networks strip photo metadata', d: 'Photos saved from PicNote carry no camera or time information at all.' },
};
const REACT = {
  model: 'My phone model is written into the photo? I thought turning off location was enough…',
  tz: 'The time zone? I never thought my phone would record that.',
  fname: 'So even if I wipe the data, the file name still gives me away?',
  note: 'The notepad is in the shot too? I was so nervous that night.',
  sticker: '…That sticker. I never noticed it was in the frame.',
};
const HINTS = [
  'First, download the original attachment from the forum post. "Nameless Square" is on the browser’s bookmarks bar.',
  'Read the photo’s full metadata in the terminal: type cd Downloads, then exiftool and the file name. Tab completes file names. If the terminal is new to you, turn on "Beginner help" under it.',
  'Where is +09:00? Search MistSearch for "time zone", then check the attendance sheet in the heron-export folder. Careful with Singapore.',
  'Check the phone model against the BYOD register, but that register is from March. In the terminal, try grep Pixel slack/*.log (after cd heron-export), or look at people’s recent PicNote posts.',
  'Zoom the photo to 200% or more in the image viewer and look closely at the bottom left and right of the trackpad.',
  'The sticker and the laptop’s colour both turn up in the Slack logs and on PicNote. MistSearch can tell you where the sticker comes from.',
  "Writing habits: compare British and American spelling (colour or color, realise or realize), the quote marks, and the sign-off \"That's all.\" Try grep \"That's all\" slack/*.log.",
  'Last step: cross out who you have ruled out on the evidence board, then open "Case report" and submit.',
];

/* ---------- social network ---------- */
const PIC = {
  'jiahao.chang': { name: 'Chang Chia-hao', bio: 'data / coffee / always on a plane', color: '#3d8a6b', posts: [
    { id: 'jh0914', when: '09/14 22:31', type: 'Story', text: 'back at the hotel after the dinner and DEAD 😵 booth duty again tomorrow lol', loc: 'Hotel Sakura Shinjuku', img: 'ceiling' },
    { id: 'jh0913', when: '09/13 20:10', text: 'Tokyo trip day 1, my desk for the week 💻☕ expo opens tomorrow!!! nervous', loc: 'Shinjuku, Tokyo', img: 'laptopRose' },
    { id: 'jh0820', when: '08/20 12:50', text: 'NEW PHONE!!! switched from iPhone to the Pixel 7a 📸 night mode is unreal 😍', loc: 'Taipei', img: 'phoneNew' },
  ]},
  'yating.dev': { name: 'Lin Ya-ting', bio: "Backend engineer. That's all", color: '#c0587e', posts: [
    { id: 'yt0914', when: '09/14 22:30', text: "Another day of debugging past midnight. Fourth coffee. That's all", loc: 'Taipei', img: 'desk101' },
  ]},
  'chiming_hsu': { name: 'Hsu Chih-ming', bio: 'Lawyer. Weekend traveler.', color: '#7a6f5d', posts: [
    { id: 'cm0914', when: '09/14 21:05', text: 'Day three in Seoul! Shot Myeongdong at night with the Pixel 8 Pro zoom, you can read every sign 🇰🇷', loc: 'Myeongdong, Seoul', img: 'seoul' },
  ]},
  'bohan.chen': { name: 'Chen Po-han', bio: 'Sales | Coffee | Travel', color: '#4f7cac', posts: [
    { id: 'bh0914', when: '09/14 21:40', text: 'marina bay at night never gets old. back to work tmr 💼', loc: 'Marina Bay, Singapore', img: 'marina' },
  ]},
  'siyu.wu': { name: 'Wu Szu-yu', bio: 'support life~ dramas are my real job', color: '#6a5a9c', posts: [
    { id: 'sy0914', when: '09/14 22:15', text: 'monday night = drama night~ 🍿 work again tomorrow tho', loc: 'New Taipei', img: 'tv' },
  ]},
};

/* ---------- exported company files ---------- */
const SLACK = {
  'random.log': `# random
[2026-08-20 12:41] Chang Chia-hao: NEW PHONE ARRIVED!!! finally switched from iPhone to the Pixel 7a 📸 night mode is insane 😍😍
[2026-08-20 12:45] Wu Szu-yu: congrats~ remember to update your BYOD registration with IT~
[2026-08-20 12:46] Chang Chia-hao: will do next week 🙏🙏
[2026-08-31 18:02] Huang Mei-ling: Finally stuck the 'Onion Cat' sticker from Open Source Fest on my laptop, right of the trackpad. This black ThinkPad has some colour at last. That's all.
[2026-08-31 18:10] Lin Ya-ting: Cute, love the color. I only got a T-shirt. Save me one next time. That's all`,
  'general.log': `# general
[2026-09-03 10:15] Hsu Chih-ming: A reminder to all colleagues: before signing an NDA with any outside organization, please send it to Legal for review. Thank you for your cooperation.
[2026-09-08 09:30] Chen Po-han: FYI im in singapore for client meetings 9/13-9/16, LINE me if urgent, will reply ASAP
[2026-09-15 09:12] Wu Szu-yu: did everyone see that forum post… 😨 the support lines haven't stopped ringing since this morning~
[2026-09-15 09:40] Hsu Chih-ming: Legal is now handling the matter. Please do not discuss it in any channel. Thank you for your cooperation.`,
  'tokyo-expo.log': `# tokyo-expo
[2026-09-10 16:20] Huang Mei-ling: The booth demo videos are in the 'Expo_2026' folder on the shared drive. Please familiarise yourselves with them before we leave. The spare phones for Taiwan stay with IT. That's all.
[2026-09-10 16:24] Chang Chia-hao: got it!!! tokyo here we come ✈️✈️ everyone back in taiwan send good vibes 💪
[2026-09-14 18:05] Chang Chia-hao: expo's done for today!!! dinner's at the place across from the hotel
[2026-09-14 18:07] Huang Mei-ling: Noted. Lobby at 19:00. That's all.`,
};
const TEXTS = {
  'README.txt': `Mistport Privacy Aid · Workstation 03

On this computer:
  Secure chat   Night Heron's messages, and Fog if you need a hint
  Browser       MistSearch, Nameless Square and PicNote are on the bookmarks bar
  Files         Night Heron's export of company data is in "heron-export"
  Images        zoom and drag photos
  Terminal      read metadata: exiftool <file>
  Evidence      collects the clues you find; rule suspects out here
  Case report   submit it once you've solved the case

"📌 Pin" next to web pages, Slack logs and posts saves them to the evidence board.`,
  'recipients.txt': `Mail system record · exported 2026-09-16 20:41

Subject: Dingyue Insurance health data partnership (phase two)
From:    Office of the COO
Sent:    2026-09-11 (Fri) 17:30
Marked:  Confidential · recipients only

Recipients (6)
  Chang Chia-hao   Data Analytics
  Lin Ya-ting      Engineering
  Hsu Chih-ming    Legal
  Huang Mei-ling   Product
  Wu Szu-yu        Customer Support
  Chen Po-han      Sales

Forwarded: none
Opened: all 6 opened the attachment between 09-11 and 09-12`,
  'profiles.txt': `Recipient profiles (HR system)

Chang Chia-hao | Data analyst | 32
  Builds the reports on users' health data. Outgoing, the most active person on Slack. Runs the data demo at the Tokyo expo.

Lin Ya-ting | Senior backend engineer | 35
  Owns the data pipeline; wrote the code that exports the data. Terse, often online late at night.

Hsu Chih-ming | Legal counsel | 29
  Reviewed the partnership contract. Precise with words. Questioned the scope of the data deal in a meeting.

Huang Mei-ling | Product manager | 30
  Product lead for the BeatBird app and the keynote speaker at the Tokyo expo. Quiet, detail-minded, goes to open-source community events.

Wu Szu-yu | Customer support lead | 41
  Answers users' privacy questions every day. The office's big sister, always reminding everyone about paperwork.

Chen Po-han | Sales manager | 38
  The key person behind the Dingyue Insurance deal, under heavy sales pressure. Mixes English into everything.`,
  'attendance_0912-0916.csv': `Name,Type,Dates,Location,Note
Chang Chia-hao,Business trip,09/13–09/16,Tokyo (Japan),Asia Digital Health Expo · data demo
Lin Ya-ting,Remote work,09/14–09/16,Home (Taipei),
Hsu Chih-ming,Annual leave,09/12–09/15,Seoul (Korea),Personal trip
Huang Mei-ling,Business trip,09/13–09/16,Tokyo (Japan),Asia Digital Health Expo · keynote
Wu Szu-yu,In office,—,Taipei office,
Chen Po-han,Business trip,09/13–09/16,Singapore,Client visits
# The Tokyo team stays at Hotel Sakura Shinjuku. 09/14: expo 09:00–18:00, client dinner 19:00–21:30 (Chang Chia-hao and Huang Mei-ling), free afterwards.`,
  'byod_202603.csv': `Name,Device,OS,Registered
Chang Chia-hao,Apple iPhone 15,iOS,2025/10/20
Lin Ya-ting,Google Pixel 7a,Android,2024/06/11
Hsu Chih-ming,Google Pixel 8 Pro,Android,2025/12/03
Huang Mei-ling,Google Pixel 7a,Android,2024/09/27
Wu Szu-yu,Samsung Galaxy S24,Android,2024/03/15
Chen Po-han,Google Pixel 7a,Android,2025/01/08
# Last updated 2026/03/02. IT policy: register a new device within 30 days of switching.`,
};

const AWU_BASE = [
  { sys: '— Mistport Privacy Aid · internal channel —' },
  { tm: '21:18', text: "I'm Fog, on duty tonight. You've taken the Night Heron case?" },
  { tm: '21:18', text: 'Suggested order: get the original photo from the forum → read its metadata in the terminal → check it against Night Heron’s export → zoom into the photo for details → file the case report.' },
  { tm: '21:19', text: 'Stuck? Tap "Give me a hint" below. The more hints you use, the lower your final rank, though.' },
  { tm: '21:19', text: 'New to the terminal? There’s "Beginner help" under it. Your call whether to turn it on; it doesn’t affect your rank.' },
];
/* Opening conversation: each node shows Night Heron's messages, then waits for a reply, a file, or ends. */
const INTRO = {
  n1:  { msgs: ['Hello… is this the Mistport Privacy Aid?', 'A friend said you help people who need to stay anonymous.'], choices: [["Yes, I'm the volunteer on duty tonight. Are you OK?", 'n2a'], ['Yes. First, a quick check: are your device and network safe right now?', 'n2b']] },
  n2a: { msgs: ['Honestly? Not really.'], next: 'n3' },
  n2b: { msgs: ["I'm on my own laptop, tethered to my phone, not on the company network.", '…You really are careful.'], next: 'n3' },
  n3:  { msgs: ['That BeatBird leak on Nameless Square… I posted it.', "Yesterday the company emailed every employee: 'We have engaged security consultants and will identify the leaker within 72 hours.'", "I've barely slept for two days."], choices: [["Take a breath. You did this to protect users.", 'n4a'], ['72 hours is not long. Tell me what you did to protect yourself when you posted.', 'n4b']] },
  n4a: { msgs: ["…Thank you. Nobody's said that to me in a long time."], choices: [['Tell me: what did you do to protect yourself when you posted?', 'n4b']] },
  n4b: { msgs: ["I signed up for the forum with a brand-new email, and I didn't use the company network.", "Before I photographed the memo, I even turned off the camera's 'save location' setting.", "So there's no GPS in the photo. That should keep me hidden, right?"], choices: [['Turning off GPS was right. But a photo can give away more than location.', 'n5a'], ["Let's not assume anything yet. We'll check together.", 'n5b']] },
  n5a: { msgs: ['…More than location? Like what?', "Now I'm even more nervous."], next: 'n6' },
  n5b: { msgs: ['OK.'], next: 'n6' },
  n6:  { msgs: ['One more thing. That memo went to only six people on 9/11. I’m one of them.'], choices: [['Only six? That’s a very small circle.', 'n7a'], ['Can the company see who received it?', 'n7b']] },
  n7a: { msgs: ['I know. That’s why I’m scared.'], next: 'n8' },
  n7b: { msgs: ['Yes. The mail system logs who got it and who opened the attachment.'], next: 'n8' },
  n8:  { msgs: [], choices: [['Can you tell me who you are? It would help me judge.', 'n9a'], ["I don't need to know who you are.", 'n9b']] },
  n9a: { msgs: ['No.', 'If you can work it out, so can the company. I want to know how short that road is.'], next: 'n10' },
  n9b: { msgs: ["Thank you. I wasn't going to say anyway.", 'But… if you can work it out, so can the company. I want to know how short that road is.'], next: 'n10' },
  n10: { msgs: ["I've exported everything the company can see internally: the recipient list, staff profiles, the attendance sheet, the phone register, the Slack logs.", "The company's investigators will have all of this too.", "Everyone's PicNote is public, you can look them up yourself. The forum post is still up."], file: true, next: 'n11' },
  n11: { msgs: [], choices: [['Got it. Give me one night.', 'n12']] },
  n12: { msgs: ['Please.', 'Find my mistakes before they do.'], end: true },
};

const SEARCH_INDEX = [
  { url: 'wuming.forum/t/88231', title: '[LEAK] BeatBird is selling your sleep and heart-rate data to an insurer - Nameless Square', snip: 'I work at BeatBird. I hesitated for a long time before writing this… The attached photo is of the memo.', kw: ['beatbird', 'leak', 'night heron', 'night_heron', 'nameless', 'forum', 'dingyue', 'insurance', 'memo', 'whistleblower'] },
  { url: 'beatbird.app', title: 'BeatBird | Sleep well, live well', snip: 'Track your sleep, heart rate and cycle. We care about your privacy.', kw: ['beatbird'] },
  { url: 'beatbird.app/privacy', title: 'Privacy policy - BeatBird', snip: 'We never share your personal data with third parties without your consent. Last updated: 2024/05/01', kw: ['beatbird', 'privacy policy', 'privacy'] },
  { url: 'hotel-sakura.jp', title: 'Hotel Sakura Shinjuku', snip: 'Six minutes from Shinjuku Station South Exit. Every room has our own notepad and pen.', kw: ['sakura', 'hotel', 'shinjuku', 'notepad', 'saku'] },
  { url: 'worldclock.info', title: 'World time zones: UTC offsets | WorldClock', snip: 'UTC+8: Taipei, Singapore, Hong Kong… UTC+9: Tokyo, Seoul…', kw: ['time zone', 'timezone', 'utc', '+09', '+9', 'gmt', 'offset', 'singapore', 'tokyo', 'seoul'] },
  { url: 'techwiki.org/exif', title: 'EXIF - TechWiki', snip: 'EXIF is the metadata a camera writes into a photo: device, time, time zone and GPS…', kw: ['exif', 'metadata', 'exiftool', 'photo', 'gps'] },
  { url: 'exifpeek.example', title: 'Free online EXIF viewer | ExifPeek', snip: 'No software to install! Upload a photo and see its camera model, time and location instantly.', kw: ['exif', 'online', 'viewer', 'metadata', 'photo info', 'tool'] },
  { url: 'techwiki.org/pxl', title: 'How phone cameras name their files - TechWiki', snip: 'Google Pixel: PXL_date_time.jpg (UTC). iPhone: IMG_1234.HEIC…', kw: ['pxl', 'pixel', 'file name', 'filename', 'naming', 'img_'] },
  { url: 'osfest.tw/2026', title: 'Open Source Fest 2026 | Limited Onion Cat stickers', snip: 'Taipei, 8/22–8/23. This year’s giveaway: 300 Onion Cat stickers.', kw: ['onion cat', 'sticker', 'open source', 'osfest', 'cat', 'fest'] },
  { url: 'news.example.tw/beatbird', title: 'BeatBird accused of selling health data; Dingyue Insurance says deal still under review | Tech News', snip: 'BeatBird said it will "pursue the leaker" and stressed that all data is de-identified.', kw: ['beatbird', 'dingyue', 'news', 'leak', 'insurance'] },
  { url: 'anoni.net/docs/', ext: 'https://anoni.net/docs/', title: 'anoni.net | Docs', snip: 'Global privacy issues, brought home to Taiwan. Concepts, tools and guides. (A real website; opens in a new tab. Mostly in Chinese.)', kw: ['privacy', 'anonymity', 'tor', 'anoni', 'exif', 'metadata', 'de-anonymisation', 'deanonymization'] },
];
// people → profile results
Object.entries(PIC).forEach(([h, p]) => SEARCH_INDEX.push({ url: 'picnote.social/@' + h, title: `${p.name} (@${h}) • PicNote`, snip: p.bio + ' · ' + p.posts.length + (p.posts.length === 1 ? ' post' : ' posts'), kw: [p.name.toLowerCase(), h, h.split(/[._]/)[0], p.name.split(' ')[0].toLowerCase()] }));

const Q1 = [['gps', 'GPS location'], ['model', 'Phone model'], ['tz', 'Time zone'], ['name', "Photographer's name"], ['time', 'Time taken']];
const Q2 = [['note', 'Hotel notepad'], ['sticker', 'Sticker on the laptop'], ['window', 'View from the window'], ['account', 'Logged-in account on screen'], ['cup', 'Café name on the cup']];
const Q3 = [['ip', 'The IP address it was posted from'], ['style', 'Spelling and punctuation habits'], ['email', 'The email used to register']];

/* ---------- leaked photo ---------- */
const PXL = 'PXL_20260914_144712345.jpg';
const EXIF_PXL = [
  ['ExifTool Version Number', '12.76'], ['File Name', PXL], ['File Size', '__PXL_SIZE__'], ['File Type', 'JPEG'], ['MIME Type', 'image/jpeg'],
  ['Make', 'Google'], ['Camera Model Name', 'Pixel 7a'], ['Software', 'HDR+ 1.0.641377693'], ['Orientation', 'Horizontal (normal)'],
  ['Date/Time Original', '2026:09:14 23:47:12'], ['Create Date', '2026:09:14 23:47:12'], ['Modify Date', '2026:09:14 23:47:12'],
  ['Offset Time', '+09:00'], ['Offset Time Original', '+09:00'], ['Offset Time Digitized', '+09:00'],
  ['F Number', '1.9'], ['Exposure Time', '1/30'], ['ISO', '1250'], ['Flash', 'Off, Did not fire'], ['Focal Length', '5.4 mm'],
  ['Image Width', '4080'], ['Image Height', '3072'], ['Image Size', '4080x3072'], ['Megapixels', '12.5'],
];
const EXIF_PXL_NOTE = '(no GPS fields at all)';
const EXIF_SOCIAL = (name, size) => [
  ['ExifTool Version Number', '12.76'], ['File Name', name], ['File Size', size], ['File Type', 'JPEG'], ['MIME Type', 'image/jpeg'],
  ['JFIF Version', '1.01'], ['Image Width', '1080'], ['Image Height', '810'], ['Comment', 'Processed by PicNote'],
];
const EXIF_SOCIAL_NOTE = '(no Make, Model, time or GPS fields: the platform removed them on upload)';
const CAMERA_INFO = [['Camera maker', 'Google'], ['Camera model', 'Pixel 7a'], ['Date taken', '9/14/2026 11:47 PM'], ['Location', '(no location data)']];
const PEEK_ROWS = [['File name', PXL], ['Camera maker', 'Google'], ['Camera model', 'Pixel 7a'], ['Taken', '2026:09:14 23:47:12'], ['Time zone', '+09:00'], ['Aperture', 'f/1.9'], ['Exposure', '1/30 s'], ['ISO', '1250'], ['GPS', '(none)']];
const socialFile = (post, handle) => `picnote_${handle}_${post.id.slice(2)}.jpg`;

/* ---------- the forum post ---------- */
const POST_PARAS = [
  'I work at BeatBird. I hesitated for a long time before writing this, but I realised users have a right to know.',
  "Last Friday, senior management sent an internal memo marked 'confidential': from October, BeatBird will package users' sleep data, resting heart rate and menstrual cycle records, 'de-identified', and hand them to Dingyue Insurance to help price premiums.",
  "The problems:\n1. The app's privacy policy has never mentioned this.\n2. The so-called 'de-identification' only swaps names for an ID. Birthdays, postcodes and device IDs are all still there. With those three, matching people back is not hard.\n3. The company's legal team has known about this deal all along and chose not to update the terms.",
  "The attached photo is of the memo. I turned off location and used a brand-new account.",
  "Taiwan's Personal Data Protection Act is not an ornament. That's all.",
];
const FORUM_THREADS = [
  ['wuming.forum/t/88231', '[LEAK] BeatBird is selling your sleep and heart-rate data to an insurer', '09-14 22:52 · 1,284 replies · hot'],
  [null, 'Hsinchu fab only paying 1.5 months bonus this year?', '09-15 10:03 · 412 replies'],
  [null, 'Anyone interviewed at that AI customer-service startup?', '09-15 18:40 · 57 replies'],
  [null, '[Story] One year after switching to TPM', '09-16 01:12 · 203 replies'],
];
const FORUM_REPLIES = [
  ['#1', '09-14 23:05', 'This "de-identification" is fake… birthday + postcode is enough to match people back'],
  ['#2', '09-14 23:20', 'OP run, the company will definitely look for you'],
  ['#3', '09-15 00:41', "Heads up: this forum doesn't touch your photos. What you upload is what everyone gets. If you know, you know."],
  ['#4', '09-15 00:58', 'Want to see the photo info? Just drop it into ExifPeek, no software needed.', 'exifpeek.example'],
  ['#5', '09-15 08:12', 'screenshotted for the record'],
  ['#6', '09-15 12:30', 'BeatBird PR says "all data is de-identified" lmao'],
];
const SEARCH_TIPS = ['BeatBird', 'EXIF', 'time zone', 'PXL', 'Onion Cat', 'Hotel Sakura'];

/* =====================================================================
   IN-GAME WEBSITES — same adapters as case.js
   ===================================================================== */
function makeSites(ctx) {
  const { esc } = ctx;
  const img = (path, alt) => `<img src="${ctx.asset(path)}" alt="${esc(alt)}" loading="lazy" decoding="async">`;
  const a = (url, text, style = '') => `<a ${ctx.href(url)}${style ? ` style="${style}"` : ''}>${text}</a>`;
  const ext = (url, text, style = '') => `<a href="${url}" target="_blank" rel="noopener"${style ? ` style="${style}"` : ''}>${text}</a>`;
  const searchBox = (v = '') => ctx.form('mist.search/?q=', v, 's-box', 'Search the web', 'Search');

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
    return `<div class="site"><div class="wrap"><h2>This site can’t be reached</h2><p class="muted mono">${esc(url)}</p><p>The server could not be found. Check the address, or ${a('mist.search/?q=' + encodeURIComponent(url), 'search for it on MistSearch', 'color:#1a3d8f')}.</p></div></div>`;
  }
  function searchHits(q) {
    const ql = q.toLowerCase();
    return SEARCH_INDEX.filter(r => r.kw.some(k => ql.includes(k.toLowerCase()) || (k.length >= 3 && k.toLowerCase().includes(ql) && ql.length >= 3)));
  }
  function searchHome() {
    const tips = ctx.searchTips === false ? '' : `<div class="s-tips">Try: ${SEARCH_TIPS.map(esc).join(', ')}, or a person’s name</div>`;
    return `<div class="site"><div class="s-home"><div class="s-logo">MistSearch<small>MIST SEARCH · THE SEARCH ENGINE THAT DOESN’T TRACK YOU</small></div>${searchBox()}${tips}</div></div>`;
  }
  const AD_WORDS = ['exif', 'photo', 'image', 'picture', 'metadata', 'time zone', 'timezone', 'pxl', 'camera', 'gps', 'tool'];
  const ad = q => AD_WORDS.some(k => q.toLowerCase().includes(k))
    ? `<div class="s-res s-ad"><div class="u"><span class="ad">Ad</span>exifpeek.example</div>${a('exifpeek.example', 'Free online EXIF viewer | Upload a photo, see everything about it')}<p>No software, no commands. Camera model, time taken, time zone, GPS, all at a glance.</p></div>` : '';
  function searchResults(q) {
    const hits = searchHits(q);
    const list = hits.length ? hits.map(r => `<div class="s-res"><div class="u">${esc(r.url)}</div>${r.ext ? ext(r.ext, esc(r.title)) : a(r.url, esc(r.title))}<p>${esc(r.snip)}</p></div>`).join('')
      : `<p>No results for “${esc(q)}”.</p><p class="muted">Try other words, such as BeatBird, EXIF, time zone, PXL, Onion Cat, Hotel Sakura, or someone’s name.</p>`;
    return `<div class="site"><div class="wrap"><div style="margin-bottom:10px">${searchBox(q)}</div><p class="muted" style="font-size:12.5px">About ${hits.length} result${hits.length === 1 ? '' : 's'}</p>${ad(q)}${list}</div></div>`;
  }
  function forumHome() {
    return `<div class="site forum"><div class="f-bar"><b>Nameless Square</b><span>Anonymous and honest · Tech jobs</span></div><div class="wrap">${FORUM_THREADS.map(([u, t, m]) => u ? `<a class="f-thread" ${ctx.href(u)}><b>${esc(t)}</b><br><small>${m}</small></a>` : `<div class="f-thread" style="opacity:.7"><b>${esc(t)}</b><br><small>${m}</small></div>`).join('')}</div></div>`;
  }
  function forumPost() {
    return `<div class="site forum"><div class="f-bar"><b>Nameless Square</b><span>Tech jobs › Leaks</span></div><div class="wrap">
  <div class="f-post"><h2>[LEAK] BeatBird is selling your sleep and heart-rate data to an insurer</h2>
  <div class="f-meta">night_heron_0914 · 2026-09-14 22:52 (UTC+8, Taipei time) · 1,284 replies</div>
  ${POST_PARAS.map(p => `<p class="pinable" style="white-space:pre-line">${esc(p)} ${ctx.pin('Nameless Square leak post', p)}</p>`).join('')}
  <div class="f-attach">${ctx.thumb(PXL, img(PXL, 'Thumbnail of the attached photo'))}<div style="flex:1;min-width:160px"><div class="fn">Attachment: ${PXL}</div><div class="muted" style="font-size:12px">${ctx.pxlSize} · original</div></div>${ctx.dl(PXL, 'pxl', '', 'site-btn')}</div>
  <p class="muted" style="font-size:12px;margin:6px 0 0">This is a real JPEG. To check it with exiftool on your own computer, <a href="${ctx.asset(PXL)}" download style="color:#1a3d8f">save it to your computer</a>.</p>
  <p class="muted" style="font-size:12px;margin:4px 0 0">The memo in the photo is in Chinese; you won’t need to read it to solve the case.</p>
  </div>
  <h3 style="font-size:14px">Replies</h3>
  ${FORUM_REPLIES.map(([f, t, x, url]) => `<div class="f-reply"><span class="mono muted" style="font-size:11.5px">${f} · ${t}</span><br>${esc(x)}${url ? ' ' + a(url, esc(url)) : ''}</div>`).join('')}
  </div></div>`;
  }
  const picBar = (v = '') => `<div class="p-bar"><a class="p-logo" ${ctx.href('picnote.social')}>PicNote</a>${ctx.form('picnote.social/search?q=', v, 'p-search', 'Search users or names', 'Search')}</div>`;
  function picHome() {
    return `<div class="site">${picBar()}<div class="wrap"><h2 style="margin-top:0">Explore</h2><p class="muted">Search for a name or a handle. Anyone can see posts from public accounts.</p><div style="max-width:360px;margin-top:10px;border-radius:12px;overflow:hidden">${img('social/cat.jpg', 'Onion Cat sticker')}</div><p class="muted" style="font-size:12.5px">Trending: #OpenSourceFest2026 #OnionCat</p></div></div>`;
  }
  function picSearch(q) {
    const ql = q.toLowerCase();
    const hits = Object.entries(PIC).filter(([h, p]) => h.includes(ql) || p.name.toLowerCase().includes(ql));
    return `<div class="site">${picBar(q)}<div class="wrap"><p class="muted">Results for “${esc(q)}”</p>${hits.length ? hits.map(([h, p]) => `<a class="p-user" ${ctx.href('picnote.social/@' + h)}><span class="p-av" style="background:${p.color}">${INITIAL(p.name)}</span><span><b>${esc(p.name)}</b><br><span class="muted">@${h} · ${esc(p.bio)}</span></span></a>`).join('') : `<p>No matching accounts. This person may not use PicNote, or keeps the account private.</p>`}</div></div>`;
  }
  function picProfile(h) {
    const p = PIC[h];
    if (!p) return `<div class="site">${picBar()}<div class="wrap"><p>This account doesn’t exist.</p></div></div>`;
    return `<div class="site">${picBar()}<div class="wrap"><div class="p-prof"><span class="p-av" style="background:${p.color}">${INITIAL(p.name)}</span><div><h2>${esc(p.name)}</h2><div class="muted">@${h}</div><div>${esc(p.bio)}</div></div></div>
  <div class="p-feed">${p.posts.map(po => `<article class="p-post"><div class="p-img">${img('social/' + po.img + '.jpg', po.text)}</div><div class="p-cap">${po.type ? `<span class="muted" style="font-size:11.5px">${po.type} · </span>` : ''}${esc(po.text)}<div class="when">${po.when} (Taipei time) · Location: ${esc(po.loc)}</div></div><div class="p-act">${ctx.pin('PicNote @' + h + ' ' + po.when, po.text + ' (Location: ' + po.loc + ')')}${ctx.dl(socialFile(po, h), 'social', `data-handle="${h}" data-post="${po.id}"`, 'pin-btn', 'social/' + po.img + '.jpg')}</div></article>`).join('')}</div></div></div>`;
  }
  function hotelPage() {
    return `<div class="site"><div class="h-hero"><div class="n">HOTEL SAKURA</div><div class="c">SHINJUKU · TOKYO</div></div><div class="wrap"><h2>Hotel Sakura Shinjuku</h2><p>Six minutes on foot from Shinjuku Station South Exit. A favourite with business and trade-show guests, walking distance from the Shinjuku convention centre.</p>
  <div class="h-grid"><div class="h-card"><b>In every room</b><p>Our own notepad and pen, and a USB charging dock.</p><div class="h-pad"><div class="h-pad-top">HOTEL SAKURA</div><div class="h-pad-sub">SHINJUKU · TOKYO</div><div class="h-pad-lines"></div></div></div>
  <div class="h-card"><b>Getting here</b><p>Shinjuku, Tokyo (fictional address)<br>Direct limousine bus from Narita Airport.</p></div><div class="h-card"><b>Check-in</b><p>From 15:00 · check-out 11:00<br>Times are Japan Standard Time (UTC+9).</p></div></div></div></div>`;
  }
  function clockPage() {
    const rows = [['UTC+7', 'Bangkok, Hanoi, Jakarta'], ['UTC+8', 'Taipei, Singapore, Hong Kong, Shanghai, Kuala Lumpur, Manila'], ['UTC+9', 'Tokyo, Osaka, Seoul'], ['UTC+10', 'Sydney, Brisbane']];
    return `<div class="site wiki"><div class="w-bar">WorldClock</div><div class="wrap w-art"><h1>World time zones</h1><p>UTC (Coordinated Universal Time) is the world’s reference time. Local times are written as “UTC + offset”.</p><div class="w-scroll"><table><tr><th>Offset</th><th>Cities</th></tr>${rows.map(r => `<tr><td class="mono">${r[0]}</td><td>${r[1]}</td></tr>`).join('')}</table></div>
  <p><b>Does my phone change time zone when I travel?</b><br>Yes. Smartphones set the time zone automatically: once on a local mobile network they switch to local time, and the camera records photos in that time zone.</p>
  <p>${ctx.pin('WorldClock', 'UTC+8: Taipei, Singapore, Hong Kong. UTC+9: Tokyo, Osaka, Seoul. Phones switch time zone automatically abroad.')}</p></div></div>`;
  }
  function wikiExif() {
    return `<div class="site wiki"><div class="w-bar">TechWiki</div><div class="wrap w-art"><h1>EXIF</h1><p><b>Exchangeable Image File Format</b> (EXIF) is the <b>metadata</b> that cameras and phones write into a photo file automatically when it is taken.</p>
  <h3>Common fields</h3><div class="w-scroll"><table><tr><th>Field</th><th>Meaning</th></tr><tr><td>Make / Camera Model Name</td><td>Device maker and model</td></tr><tr><td>Date/Time Original</td><td>When it was taken (local time)</td></tr><tr><td>Offset Time Original</td><td>The time zone offset when it was taken, e.g. +08:00</td></tr><tr><td>GPS Position</td><td>Where it was taken (if location was on)</td></tr><tr><td>Software</td><td>Software that processed the image</td></tr></table></div>
  <h3>How to read it</h3><p>The command-line tool <code>exiftool</code> is the most common way: <code>exiftool file.jpg</code></p>
  <h3>Privacy risks</h3><p>Many people think turning off location is enough, but the device model, time zone and time stay in the file. <b>Big social networks</b> usually strip EXIF on upload; <b>forums, email attachments and cloud drives</b> often keep the original file.</p>
  <p>Further reading: ${ext('https://anoni.net/docs/basics/', 'anoni.net concepts (external, in Chinese)', 'color:#1a3d8f')} · ${a('techwiki.org/pxl', 'How phone cameras name their files', 'color:#1a3d8f')}</p></div></div>`;
  }
  function wikiPxl() {
    return `<div class="site wiki"><div class="w-bar">TechWiki</div><div class="wrap w-art"><h1>How phone cameras name their files</h1><p>Each brand’s camera app has its own default file names. Often the name alone tells you which device took the photo.</p>
  <div class="w-scroll"><table><tr><th>Brand</th><th>Format</th><th>Example</th></tr><tr><td>Google Pixel</td><td><code>PXL_date_time+ms</code>, <b>in UTC</b></td><td><code>PXL_20260101_093012345.jpg</code></td></tr><tr><td>Apple iPhone</td><td><code>IMG_number</code></td><td><code>IMG_4821.HEIC</code></td></tr><tr><td>Samsung Galaxy</td><td><code>date_time</code>, local time</td><td><code>20260101_173012.jpg</code></td></tr></table></div>
  <p>In other words: even with the EXIF wiped clean, a file that hasn’t been renamed still carries metadata in its name.</p><p>${ctx.pin('TechWiki', 'Pixel camera file names PXL_date_time use UTC; even with EXIF wiped, the name gives away the brand and time.')}</p></div></div>`;
  }
  function osPage() {
    return `<div class="site"><div class="os-hero"><h1>Open Source Fest 2026</h1><p>8/22–8/23 · Taipei</p></div><div class="wrap"><h2>This year’s giveaway: Onion Cat</h2><div style="max-width:320px">${img('social/cat.jpg', 'Onion Cat sticker: an orange cat head with an onion sprout on top')}</div><p>An orange cat with an onion sprout on its head, a nod to onion routing and everyone who protects privacy. <b>Only 300 made</b>, all gone in two days.</p><p class="muted">Lots of people stuck theirs on their laptops. Share your Onion Cat! #OnionCat</p><p>${ctx.pin('Open Source Fest', 'Onion Cat sticker: orange cat head with an onion sprout, 300 given out at Open Source Fest, 8/22–8/23.')}</p></div></div>`;
  }
  function bbHome() {
    return `<div class="site"><div class="bb-hero"><div class="bb-logo">BeatBird</div><h1>Sleep well, live well.</h1><p>Track your sleep, heart rate and cycle for a healthier every day.</p><span class="site-btn">Download free</span></div><div class="wrap"><h3>We care about your privacy</h3><p>Your health data belongs to you. We protect it with industry-standard encryption.</p><p>${a('beatbird.app/privacy', 'Read our privacy policy →', 'color:#c2410c')}</p></div></div>`;
  }
  function bbPrivacy() {
    return `<div class="site"><div class="wrap"><div class="bb-logo">BeatBird</div><h1 style="font-size:24px">Privacy policy</h1><p class="muted">Last updated: 2024/05/01</p><h3>What we collect</h3><ul><li>Account: name, date of birth, email, postcode</li><li>Health: sleep, heart rate, menstrual cycle</li><li>Device: device ID, OS version</li></ul><h3>Sharing</h3><p>We never share your personal data with third parties without your consent.</p><p>${ctx.pin('BeatBird privacy policy', 'Privacy policy last updated 2024/05/01; says nothing is shared without consent; collects date of birth, postcode and device ID.')}</p></div></div>`;
  }
  function newsPage() {
    return `<div class="site"><div class="wrap"><p class="muted mono" style="font-size:12px">Tech News · 2026-09-15 14:20</p><h1 style="font-size:24px">BeatBird accused of selling health data; Dingyue Insurance says the deal is “under review”</h1><p>A post on an anonymous forum on the night of the 14th claimed that the health app BeatBird plans to give users’ sleep, heart-rate and menstrual-cycle data to Dingyue Insurance.</p><p>BeatBird said in a statement today that all data “is de-identified” and that it will “pursue the leaker to the full extent of the law”. The company is understood to have brought in outside security consultants for an internal investigation.</p><p>Privacy researchers point out that if birthdays, postcodes and device IDs are kept, people can very likely be re-identified even with their names removed.</p></div></div>`;
  }
  function exifPeek() {
    const st = ctx.state();
    const imgs = st.downloads.filter(n => /\.jpg$/.test(n));
    let result = '';
    if (st.peekLast) {
      result = `<h2 style="font-size:18px">Results</h2>${st.peekLast === PXL
        ? `<table class="ep-table">${PEEK_ROWS.map(([k, v]) => `<tr><td>${k}</td><td class="mono">${esc(v)}</td></tr>`).join('')}</table>`
        : `<p>“${esc(st.peekLast)}” has no EXIF data. It may have been removed when the photo was uploaded somewhere else.</p>`}${ctx.afterUpload ? ctx.afterUpload(st.peekLast) : ''}`;
    }
    return `<div class="site"><div class="ep-bar">ExifPeek</div><div class="wrap"><h1 style="font-size:24px;margin:0 0 4px">Free online EXIF viewer</h1><p class="muted">No software to install! Upload a photo and see its camera, time and location instantly.</p>
  <div class="ep-drop"><b>Choose a photo to upload</b><p class="muted" style="margin:2px 0 6px">From your computer’s Downloads:</p>${imgs.length ? imgs.map(n => `<div class="ep-file"><span class="mono" style="word-break:break-all">${esc(n)}</span>${ctx.upload(n)}</div>`).join('') : '<p>No photos in Downloads.</p>'}</div>
  ${result}
  <p class="ep-fine">By uploading you agree that we may keep your file and use it to improve our service or share it with partners. Retention is governed by our policies.</p></div></div>`;
  }
  return { route, searchHits };
}
