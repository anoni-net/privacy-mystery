/* Blue Magpie's interface text, 中文, on top of the engine's (engine/ui.zh.js). The build
   inlines both; lines here add to or replace the engine's.
   Keys used in the page's HTML as {{key}} must be plain strings; the rest may be functions. */
const UI = Object.assign({}, ENGINE_UI, {
  lang: 'zh-Hant-TW',
  caseTitle: '藍鵲事件',
  pdfName: '藍鵲事件.pdf',
  description: '隱私推理遊戲：一封沒有連結的扣款通知，一個「驗證會員身分」的 QR code。拆穿這套詐騙，找出是誰把會員資料賣了出去。',
  // no-JS notice (HTML)
  nojsBody: '《藍鵲事件》互動版模擬一台調查員的電腦，需要 JavaScript 才能運作。你的瀏覽器目前停用了 JavaScript，例如 Tor Browser 的「最安全」安全等級。',
  nojsPdf: '想離線或印出來玩，也可以<a href="blue-magpie.pdf" download="藍鵲事件.pdf">下載 PDF 版</a>（解答在最後幾頁）。',
  // desktop
  sticky1: '聽芷寧說發生了什麼',
  sticky2: '拆穿扣款信和假網站',
  sticky3: '幫她把帳號拿回來',
  sticky4: '找出資料從誰手上流出',
  langHref: '../en/blue-magpie/',
  clockDate: '12月9日 週三 ',
  termDate: 'Wed Dec  9',
  lockedToast: ['還不能開始調查', '先和芷寧聊完、收下她整理的資料。'],
  // the client: 周芷寧
  client: '周芷寧',
  clientAvatar: '芷',
  clientColor: '#7cc49a',
  headClient: '周芷寧 · 安全碼已驗證',
  headClientTyping: '周芷寧正在輸入…',
  typingAria: '周芷寧正在輸入',
  zipName: '芷寧給的資料.zip',
  zipMeta: '1.2 MB · 加密傳送',
  zipSent: '傳送了一個檔案：芷寧給的資料.zip',
  zipReceived: '已接收 芷寧給的資料.zip · 解壓縮到 ~/芷寧給的資料',
  awuHello: '我是阿霧。芷寧的案子交給你了，資料都收到了嗎？',
  openFiles: '打開芷寧給的資料',
  // the fake member centre's cancel form
  trap: ['等等，你在那個「會員中心」的表單送出資料了？', '就算填的是假的，對方也知道這個瀏覽器、這個時間有人上鉤，下一步就是專員來電。查假網站只看、不填、不送出。這次結案評等會降一級。'],
  // tools
  qrRead: '讀取',
  // viewer
  viewerEmpty: '還沒有開啟任何圖片。<br>在「檔案」裡點一下圖片就能打開。',
  // terminal
  help: `可用指令：
  <span class="k">ls</span> [資料夾]          列出檔案
  <span class="k">cd</span> &lt;資料夾&gt;          切換資料夾（cd .. 回上一層）
  <span class="k">pwd</span>                  顯示目前位置
  <span class="k">cat</span> &lt;檔案&gt;           顯示文字檔內容（.eml 會顯示完整原始信件）
  <span class="k">grep</span> [-i] &lt;字&gt; &lt;檔案...&gt;  在檔案中搜尋文字，支援 *.csv
  <span class="k">whois</span> &lt;網域&gt;         查詢網域的註冊資料
  <span class="k">dig</span> txt &lt;網域&gt;       查詢網域的 TXT 紀錄（例如 SPF）
  <span class="k">file</span> &lt;檔案&gt;          判斷檔案類型
  <span class="k">open</span> &lt;檔案&gt;          用圖形介面開啟
  <span class="k">clear</span>                清除畫面
<span class="d">小技巧：按 Tab 自動補完檔名，↑ ↓ 叫出之前的指令。</span>`,
  usageGrep: '用法：grep [-i] &lt;要找的字&gt; &lt;檔案...&gt;</span>\n<span class="d">例如：grep -i authentication *.eml',
  usageWhois: '用法：whois &lt;網域&gt;</span>\n<span class="d">例如：whois beatbird.app',
  usageDig: '用法：dig txt &lt;網域&gt;</span>\n<span class="d">例如：dig txt kq3fz.idv.tw',
  // board
  noClues: '還沒有發現。讀信件、查網域、用小工具檢查，找到的線索都會記錄在這裡。',
  noPins: '在網頁、信件、表格旁按「📌 釘選」，就會存到這裡。',
  // report
  reportNote: '交給芷寧和 BeatBird 資料保護長的報告。每一題都要有證據支撐；指認錯人，資料保護長會告訴你。',
  q1: '1. 這封扣款通知用了哪些手法？（複選）',
  q2: '2. 假客服要芷寧掃的 QR code 做了什麼？',
  q3: '3. 詐騙名單是用哪兩份資料拼起來的？（複選）',
  q4: '4. 是誰把資料流出去的？',
  fb1: '✕ 再看一次信件和原始郵件。它真的是從 beatbird.app 寄的嗎？有沒有附件？',
  fb2: '✕ 用霧港小工具的「QR 讀取」解開那張圖，再對照芷寧的已連結裝置。',
  fb3: '✕ 詐騙信用到哪些欄位？對照資料提供紀錄，哪兩份合起來才有這些欄位？',
  clientWrong: '資料保護長看了你的報告，說證據對不上這個人……可以再查一次嗎？我不想有人被冤枉。',
  clientSolved: '……原來是這樣。謝謝你，我會把報告交給 165 和 BeatBird。',
  ranks: [['洋蔥首席調查員', '詐騙集團還在等下一個上鉤的人，你已經把源頭找出來了。'], ['資深隱私志工', '芷寧的帳號拿回來了，名單的源頭也找到了。'], ['見習調查員', '至少你知道下次看到「已開通、按月扣款」，要先打開 App 自己查了。']],
  rankStats: (hints, wrong, mistakes) => `用了 ${hints} 個提示、誤判 ${wrong} 次${mistakes ? '，還在假網站送出了表單' : ''}。`,
});
