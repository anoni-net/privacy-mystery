// The feedback page at /mystery/feedback/ (and /mystery/zh-cn/feedback/, /mystery/en/feedback/): players write how the
// case went, an idea for a new case, where they got stuck or what went wrong. The page draws
// its own form and posts it to anoni.net's self-hosted form server (Formbricks, form.anoni.net)
// through its public client API, which needs no key. Nothing is sent until the player presses
// the button, and the request carries no cookies and no Referer. The onion build rewrites the
// address to the form server's onion address along with every other link to anoni.net.
//
// Traditional Chinese and English each have their own survey. The question ids (kind, message,
// difficulty, play, contact) and the hidden fields (case, from, rank, locale) match
// formbricks/mystery_survey.py in the anoni.net workspace. Formbricks stores the text of the
// chosen option, so the option labels below must match that file word for word: change both
// together. The Simplified Chinese page shows its own labels but sends the Traditional Chinese
// ones to the Traditional Chinese survey (SEND_AS), with locale zh-CN to tell them apart.
//
// The case, where the player came from and the rank come in the query string (the case page,
// the lobby and the static edition link here with them) and are checked against fixed lists
// before they are sent. Who the player accused and what they answered are never sent.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { esc } from './case-data.mjs';
import { iconTags } from './meta.mjs';

// The workspace's formbricks/mystery_survey.py has the same ids
const SURVEYS = { zh: 'cmvezavlt000o01o1kbzes7qy', en: 'cmvezaw9q000p01o15uavg68q' };
const SEND_AS = { zh: 'zh', 'zh-cn': 'zh', en: 'en' };
const ENVIRONMENT = 'cmc9borto0008lj014bq33jqq';
const ENDPOINT = `https://form.anoni.net/api/v1/client/${ENVIRONMENT}/responses`;
// Same as the form's character limits
const LIMITS = { min: 10, message: 3000, contact: 200 };
const FROM = ['solved', 'menu', 'lobby', 'static'];

const CSS = `
:root {
  color-scheme: dark;
  --board: #11161d; --fg: #e7eaee; --muted: #94a0b0; --line: #333f4e;
  --paper: #efe6d2; --paper-2: #e4d8bf; --paper-ink: #2a2418; --paper-muted: #6f6553;
  --accent: #e3a33b; --stamp: #b5361f;
  --font-sans: "PingFang TC", "Noto Sans CJK TC", "Noto Sans TC", "Microsoft JhengHei", "Heiti TC", sans-serif;
  --font-serif: "Songti TC", "Noto Serif CJK TC", "Noto Serif TC", "PMingLiU", serif;
  --font-mono: ui-monospace, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
}
* { box-sizing: border-box; }
[hidden] { display: none !important; }
html { background: var(--board); }
body {
  margin: 0; padding-inline: 16px; color: var(--fg); font-family: var(--font-sans); font-size: 15px; line-height: 1.75;
  background: radial-gradient(rgba(255,255,255,.035) 1px, transparent 1px) 0 0 / 14px 14px, var(--board);
}
a { color: var(--accent); }
:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
.wrap { max-width: 680px; margin: 0 auto; padding-block: 40px 56px; }
.kicker { font: 12px var(--font-mono); letter-spacing: .3em; color: var(--accent); margin: 0; }
h1 { font-family: var(--font-serif); font-size: clamp(32px, 7vw, 46px); letter-spacing: .1em; line-height: 1.3; margin: 6px 0 10px; }
.lead { color: var(--muted); margin: 0 0 6px; }
.privacy { color: var(--muted); font-size: 13px; margin: 0; }
.paper { margin-top: 28px; background: var(--paper); color: var(--paper-ink); border-radius: 8px; padding: 26px 22px 22px; box-shadow: 0 18px 40px rgba(0,0,0,.45); }
.paper a { color: #8a5a10; }
.about { display: inline-block; margin: 0 0 14px; font: 600 12px var(--font-mono); letter-spacing: .12em; color: var(--paper-muted); border: 1px solid #c9bb9b; border-radius: 999px; padding: 2px 12px; }
fieldset { border: 0; margin: 0 0 22px; padding: 0; }
legend, label.q { display: block; font-weight: 700; font-size: 16px; margin-bottom: 6px; padding: 0; }
.req { color: var(--stamp); font-weight: 400; font-size: 13px; margin-left: 4px; }
.opt { color: var(--paper-muted); font-weight: 400; font-size: 13px; margin-left: 4px; }
.sub { color: var(--paper-muted); font-size: 13.5px; margin: -2px 0 10px; }
.chips { display: flex; flex-wrap: wrap; gap: 8px; }
.chips label { position: relative; }
.chips input { position: absolute; opacity: 0; inset: 0; margin: 0; cursor: pointer; }
.chips span { display: inline-flex; align-items: center; min-height: 40px; padding: 0 14px; border: 1px solid #b9ab8b; border-radius: 999px; font-size: 14px; background: rgba(255,255,255,.35); }
.chips input:checked + span { background: var(--paper-ink); color: var(--paper); border-color: var(--paper-ink); }
.chips input:focus-visible + span { outline: 2px solid #8a5a10; outline-offset: 2px; }
.field { margin-bottom: 22px; }
textarea, input[type=text] { width: 100%; font: inherit; color: var(--paper-ink); background: #fbf7ee; border: 1px solid #b9ab8b; border-radius: 6px; padding: 10px 12px; }
textarea { min-height: 160px; resize: vertical; }
.count { text-align: right; font: 12px var(--font-mono); color: var(--paper-muted); margin-top: 4px; }
.actions { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
button { font: inherit; font-weight: 700; min-height: 46px; padding: 0 22px; border-radius: 8px; border: 1px solid var(--paper-ink); background: var(--paper-ink); color: var(--paper); cursor: pointer; }
button:disabled { opacity: .5; cursor: default; }
.status { margin: 0; font-size: 14px; }
.status.err { color: var(--stamp); }
.done h2 { font-family: var(--font-serif); font-size: 26px; margin: 0 0 8px; }
.done p { margin: 0 0 12px; }
noscript p { margin: 0; }
footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid var(--line); color: var(--muted); font-size: 13px; }
footer p { margin: 0; }
`;

const T = {
  zh: {
    lang: 'zh-Hant-TW', locale: 'zh-TW', toRoot: '../',
    title: '建議與回饋｜隱私推理遊戲', kicker: '霧港隱私互助站 · FEEDBACK', h1: '建議與回饋',
    desc: 'anoni.net 隱私推理遊戲的建議與回饋：遊玩感想、新案件的點子、卡關或遇到的錯誤。',
    lead: '玩完的感想、想看的案件主題、卡住或看不懂的地方，都可以寫在這裡。每一筆我們都會讀過整理，你寫的原文與聯絡方式不會公開。',
    privacy: '表單只記下送出時所在的國家與瀏覽器種類，不記錄你的 IP 位址。從遊戲連過來時，會一併帶上你玩的案件與語言，結案之後還有評等，不包含你指認了誰或答了什麼。',
    about: n => `關於 CASE ${n}`,
    required: '必填', optional: '選填',
    kind: '想告訴我們的是',
    kinds: { impression: '遊玩感想', idea: '新案件的點子', stuck: '卡關或看不懂的地方', bug: '遇到錯誤', other: '其他' },
    message: '想告訴我們什麼？',
    messageSub: '寫到解答也沒關係。請不要寫真實姓名或其他個資。',
    placeholders: {
      impression: '例如：哪一段印象最深、哪一條線索最意外',
      idea: '主題與方向就好，例如：想看一個從手機定位資料找出破綻的案件',
      stuck: '例如：在哪一個畫面、哪一個步驟卡住，當時以為要做什麼',
      bug: '例如：用手機開啟終端機之後，按下哪個按鈕沒有反應',
      other: '',
    },
    count: (n, max) => `${n} / ${max}`,
    tooShort: n => `再多寫一點，至少 ${n} 個字。`,
    difficulty: '難度如何？',
    difficulties: { easy: '太簡單', right: '剛好', hard: '有點難', 'too-hard': '太難' },
    play: '怎麼玩的？',
    plays: { solo: '自己玩', friends: '跟朋友一起', class: '在課堂或工作坊' },
    contact: '聯絡方式',
    contactSub: '留下你方便的聯絡方式，email 或通訊軟體的帳號都可以。需要細節，或想跟你一起發展案件的點子時會聯絡你。不留也沒關係，每一筆都會看。處理完之後就刪除聯絡方式。',
    contactPh: 'email 或通訊軟體的帳號',
    submit: '送出', sending: '送出中…',
    errors: {
      closed: '表單暫時沒有開放，請過一段時間再試。',
      network: '沒有連上表單伺服器，請確認網路連線之後再送一次。寫好的內容還在。',
      other: '送出時發生錯誤，請過一會兒再送一次。寫好的內容還在。',
    },
    thanks: '收到了，謝謝', thanksBody: '每一筆都會讀。下一份委託準備好時，會出現在委託板上。',
    backCase: '回到案件', backLobby: '回到委託板',
    noscript: '這個表單需要 JavaScript 才能送出。',
    foot: '<p>由 <a href="https://anoni.net/">anoni.net 匿名網路社群</a>製作 · <a href="../">回到委託板</a></p>',
  },
  'zh-cn': {
    lang: 'zh-Hans', locale: 'zh-CN', toRoot: '../../',
    title: '建议与反馈｜隐私推理游戏', kicker: '雾港隐私互助站 · FEEDBACK', h1: '建议与反馈',
    desc: 'anoni.net 隐私推理游戏的建议与反馈：游玩感想、新案件的点子、卡关或遇到的错误。',
    lead: '玩完的感想、想看的案件主题、卡住或看不懂的地方，都可以写在这里。每一条我们都会读过整理，你写的原文与联系方式不会公开。',
    privacy: '表单只记下提交时所在的国家与浏览器类型，不记录你的 IP 地址。从游戏链接过来时，会一并带上你玩的案件与语言，结案之后还有评级，不包含你指认了谁或答了什么。',
    about: n => `关于 CASE ${n}`,
    required: '必填', optional: '选填',
    kind: '想告诉我们的是',
    kinds: { impression: '游玩感想', idea: '新案件的点子', stuck: '卡关或看不懂的地方', bug: '遇到错误', other: '其他' },
    message: '想告诉我们什么？',
    messageSub: '写到解答也没关系。请不要写真实姓名或其他个人信息。',
    placeholders: {
      impression: '例如：哪一段印象最深、哪一条线索最意外',
      idea: '主题与方向就好，例如：想看一个从手机定位数据找出破绽的案件',
      stuck: '例如：在哪一个画面、哪一个步骤卡住，当时以为要做什么',
      bug: '例如：用手机打开终端之后，按下哪个按钮没有反应',
      other: '',
    },
    count: (n, max) => `${n} / ${max}`,
    tooShort: n => `再多写一点，至少 ${n} 个字。`,
    difficulty: '难度如何？',
    difficulties: { easy: '太简单', right: '刚好', hard: '有点难', 'too-hard': '太难' },
    play: '怎么玩的？',
    plays: { solo: '自己玩', friends: '跟朋友一起', class: '在课堂或工作坊' },
    contact: '联系方式',
    contactSub: '留下你方便的联系方式，email 或通信软件的账号都可以。需要细节，或想跟你一起发展案件的点子时会联系你。不留也没关系，每一条都会看。处理完之后就删除联系方式。',
    contactPh: 'email 或通信软件的账号',
    submit: '提交', sending: '提交中…',
    errors: {
      closed: '表单暂时没有开放，请过一段时间再试。',
      network: '没有连上表单服务器，请确认网络连接之后再提交一次。写好的内容还在。',
      other: '提交时发生错误，请过一会儿再提交一次。写好的内容还在。',
    },
    thanks: '收到了，谢谢', thanksBody: '每一条都会读。下一份委托准备好时，会出现在委托板上。',
    backCase: '回到案件', backLobby: '回到委托板',
    noscript: '这个表单需要 JavaScript 才能提交。',
    foot: '<p>由 <a href="https://anoni.net/">anoni.net 匿名网络社群</a>制作 · <a href="../">回到委托板</a></p>',
  },
  en: {
    lang: 'en', locale: 'en', toRoot: '../../',
    title: 'Feedback | privacy mysteries', kicker: 'MISTPORT PRIVACY AID · FEEDBACK', h1: 'Feedback',
    desc: 'Feedback for the anoni.net privacy mysteries: how the case went, ideas for new cases, where you got stuck or what went wrong.',
    lead: 'Tell us how the case went, which privacy topic you’d like a case about, or where you got stuck. We read and sort everything, and your original text and contact details stay private.',
    privacy: 'The form only records the country and browser type of each submission, not your IP address. When you come from the game, it also notes the case and language, plus your rank once the case is closed. It never includes whom you accused or what you answered.',
    about: n => `About CASE ${n}`,
    required: 'required', optional: 'optional',
    kind: 'What is it about?',
    kinds: { impression: 'How the case went', idea: 'An idea for a new case', stuck: 'Where I got stuck', bug: 'Something went wrong', other: 'Other' },
    message: 'What would you like to tell us?',
    messageSub: 'Spoilers are fine here. Please leave out real names and other personal details.',
    placeholders: {
      impression: 'e.g. The part you remember most, or the clue that surprised you',
      idea: 'The topic and a rough direction are enough, e.g. a case where the clue is in a phone’s location history',
      stuck: 'e.g. Which screen and which step, and what you thought you had to do',
      bug: 'e.g. On a phone, which button did nothing after opening the terminal',
      other: '',
    },
    count: (n, max) => `${n} / ${max}`,
    tooShort: n => `Please write a little more: at least ${n} characters.`,
    difficulty: 'How hard was it?',
    difficulties: { easy: 'Too easy', right: 'About right', hard: 'A bit hard', 'too-hard': 'Too hard' },
    play: 'How did you play?',
    plays: { solo: 'On my own', friends: 'With friends', class: 'In a class or workshop' },
    contact: 'Contact',
    contactSub: 'Leave any way to reach you, such as an email address or a messaging app account, if you’re happy for us to ask for details or to work on your case idea with you. It’s optional, and we read everything either way. We delete it once we’re done.',
    contactPh: 'Email or messaging app account',
    submit: 'Submit', sending: 'Sending…',
    errors: {
      closed: 'The form is closed for now. Please try again later.',
      network: 'Couldn’t reach the form server. Check your connection and submit again; what you wrote is still here.',
      other: 'Something went wrong while sending. Please submit again in a moment; what you wrote is still here.',
    },
    thanks: 'Thanks, we got it', thanksBody: 'We read every message. New cases appear on the case board when they’re ready.',
    backCase: 'Back to the case', backLobby: 'Back to the case board',
    noscript: 'This form needs JavaScript to send.',
    foot: '<p>Made by the <a href="https://anoni.net/">anoni.net community</a> · <a href="../">Back to the case board</a></p>',
  },
};

const chips = (name, labels) => `<div class="chips">${Object.entries(labels).map(([id, label]) =>
  `<label><input type="radio" name="${name}" value="${id}"><span>${esc(label)}</span></label>`).join('')}</div>`;

// The script runs in the page; L and the case list are filled in by the build
const SCRIPT = `
(function () {
  var form = document.getElementById('fb');
  var q = new URLSearchParams(location.search);
  // Only values from these lists are sent: anything else in the query is dropped
  var caseNo = CASES[q.get('case')] ? q.get('case') : '';
  var from = FROM.indexOf(q.get('from')) >= 0 ? q.get('from') : '';
  var rank = caseNo && from === 'solved' && /^[012]$/.test(q.get('rank') || '') ? q.get('rank') : '';
  var msg = form.elements.message, contact = form.elements.contact, status = document.getElementById('status');
  var count = document.getElementById('count'), button = form.querySelector('button');

  if (caseNo) {
    var about = document.getElementById('about');
    about.textContent = L.about(caseNo) + ' · ' + CASES[caseNo].title;
    about.hidden = false;
  }
  var back = document.getElementById('back');
  if (caseNo) { back.href = '../' + CASES[caseNo].slug + '/'; back.textContent = L.backCase; }

  function kind() { var k = form.querySelector('input[name=kind]:checked'); return k ? k.value : ''; }
  function picked(name) { var c = form.querySelector('input[name=' + name + ']:checked'); return c ? c.value : ''; }
  function update() {
    var k = kind();
    msg.placeholder = L.placeholders[k] || '';
    // Difficulty and how they played only make sense for a case they have played
    document.getElementById('played').hidden = k === 'idea';
    var n = msg.value.trim().length;
    count.textContent = L.count(n, LIMITS.message);
    button.disabled = !k || n < LIMITS.min;
    if (status.className !== 'status err') status.textContent = n > 0 && n < LIMITS.min ? L.tooShort(LIMITS.min) : '';
  }
  // The lobby's "next case" card asks for ideas; the solved screen for how the case went
  var preset = L.kinds[q.get('kind')] ? q.get('kind') : from === 'solved' ? 'impression' : '';
  if (preset) form.querySelector('input[name=kind][value=' + preset + ']').checked = true;
  form.addEventListener('input', function () { status.className = 'status'; update(); });
  form.addEventListener('change', update);
  form.hidden = false;
  update();

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var k = kind(), text = msg.value.trim();
    if (!k || text.length < LIMITS.min) return;
    var data = { kind: L.send.kinds[k], message: text, locale: L.locale };
    if (k !== 'idea') {
      if (picked('difficulty')) data.difficulty = L.send.difficulties[picked('difficulty')];
      if (picked('play')) data.play = L.send.plays[picked('play')];
    }
    if (contact.value.trim()) data.contact = contact.value.trim();
    if (caseNo) data['case'] = caseNo;
    if (from) data.from = from;
    if (rank) data.rank = rank;
    button.disabled = true;
    status.className = 'status';
    status.textContent = L.sending;
    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ surveyId: SURVEY, finished: true, data: data }),
      credentials: 'omit', referrerPolicy: 'no-referrer', cache: 'no-store'
    }).then(function (res) {
      if (res.ok) {
        form.hidden = true;
        document.getElementById('done').hidden = false;
        document.getElementById('done').querySelector('h2').focus();
        return;
      }
      fail(res.status === 403 ? 'closed' : 'other');
    }, function () { fail('network'); });
  });
  function fail(why) {
    status.className = 'status err';
    status.textContent = L.errors[why];
    button.disabled = false;
  }
})();
`;

// cases: the cases listed in this language's lobby, each with number, slug and title
export function buildFeedback({ out, cases, analytics = '', lang = 'zh' }) {
  const L = T[lang], S = T[SEND_AS[lang]];
  const caseMap = Object.fromEntries(cases.map(c => [c.number, { slug: c.slug, title: c.title }]));
  const clientText = {
    locale: L.locale, kinds: L.kinds, difficulties: L.difficulties, plays: L.plays,
    placeholders: L.placeholders, errors: L.errors, sending: L.sending, backCase: L.backCase,
    // the labels the survey stores
    send: { kinds: S.kinds, difficulties: S.difficulties, plays: S.plays },
  };
  // Functions do not survive JSON, so the few that build text are written out here
  const script = `var L = ${JSON.stringify(clientText)};
L.about = ${L.about.toString()};
L.count = ${L.count.toString()};
L.tooShort = ${L.tooShort.toString()};
var CASES = ${JSON.stringify(caseMap)};
var FROM = ${JSON.stringify(FROM)};
var LIMITS = ${JSON.stringify(LIMITS)};
var SURVEY = ${JSON.stringify(SURVEYS[SEND_AS[lang]])};
var ENDPOINT = ${JSON.stringify(ENDPOINT)};
${SCRIPT}`;

  const html = `<!doctype html>
<html lang="${L.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="referrer" content="no-referrer">
<meta name="description" content="${esc(L.desc)}">
<title>${L.title}</title>
${iconTags(L.toRoot, lang)}
${analytics}<style>${CSS}</style>
</head>
<body>
<div class="wrap">
<header>
  <p class="kicker">${L.kicker}</p>
  <h1>${L.h1}</h1>
  <p class="lead">${esc(L.lead)}</p>
  <p class="privacy">${esc(L.privacy)}</p>
</header>

<main class="paper">
<p class="about" id="about" hidden></p>
<noscript><p>${L.noscript}</p></noscript>
<form id="fb" hidden novalidate>
  <fieldset>
    <legend>${L.kind}<span class="req">${L.required}</span></legend>
    ${chips('kind', L.kinds)}
  </fieldset>
  <div class="field">
    <label class="q" for="message">${L.message}<span class="req">${L.required}</span></label>
    <p class="sub" id="message-sub">${esc(L.messageSub)}</p>
    <textarea id="message" name="message" maxlength="${LIMITS.message}" aria-describedby="message-sub count"></textarea>
    <div class="count" id="count" aria-live="polite"></div>
  </div>
  <div id="played">
    <fieldset>
      <legend>${L.difficulty}<span class="opt">${L.optional}</span></legend>
      ${chips('difficulty', L.difficulties)}
    </fieldset>
    <fieldset>
      <legend>${L.play}<span class="opt">${L.optional}</span></legend>
      ${chips('play', L.plays)}
    </fieldset>
  </div>
  <div class="field">
    <label class="q" for="contact">${L.contact}<span class="opt">${L.optional}</span></label>
    <p class="sub" id="contact-sub">${esc(L.contactSub)}</p>
    <input type="text" id="contact" name="contact" maxlength="${LIMITS.contact}" autocomplete="off" placeholder="${esc(L.contactPh)}" aria-describedby="contact-sub">
  </div>
  <div class="actions">
    <button type="submit" disabled>${L.submit}</button>
    <p class="status" id="status" role="status"></p>
  </div>
</form>
<div class="done" id="done" hidden>
  <h2 tabindex="-1">${L.thanks}</h2>
  <p>${L.thanksBody}</p>
  <p><a id="back" href="../">${L.backLobby}</a></p>
</div>
</main>

<footer>${L.foot}</footer>
</div>
<script>${script}</script>
</body>
</html>
`;
  const dir = join(out, 'feedback');
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), html);
}
