/* Night Heron's interface text, 中文, on top of the engine's (engine/ui.zh.js). The build
   inlines both; lines here add to or replace the engine's.
   Keys used in the page's HTML as {{key}} must be plain strings; the rest may be functions. */
const UI = Object.assign({}, ENGINE_UI, {
  lang: 'zh-Hant-TW',
  caseTitle: '夜鷺事件',
  pdfName: '夜鷺事件.pdf',
  description: '隱私推理遊戲：從一張照片的中繼資料、背景與文字習慣，找出不小心暴露身分的吹哨者。',
  // no-JS notice (HTML)
  nojsBody: '《夜鷺事件》互動版模擬一台調查員的電腦，需要 JavaScript 才能運作。你的瀏覽器目前停用了 JavaScript，例如 Tor Browser 的「最安全」安全等級。',
  nojsPdf: '想離線或印出來玩，也可以<a href="night-heron.pdf" download="夜鷺事件.pdf">下載 PDF 版</a>（解答在最後幾頁）。',
  // desktop
  sticky1: '讀夜鷺的訊息',
  sticky2: '找出照片洩漏了什麼',
  sticky3: '把 6 人縮到 1 人',
  sticky4: '交出結案報告',
  clockDate: '9月16日 週三 ',
  termDate: 'Wed Sep 16',
  lockedToast: ['還不能開始調查', '先和夜鷺聊完、收下資料再說。'],
  // the client: Night Heron
  client: '夜鷺',
  clientAvatar: '鷺',
  clientColor: '#e3a33b',
  headClient: '夜鷺 · 安全碼已驗證',
  headClientTyping: '夜鷺正在輸入…',
  typingAria: '夜鷺正在輸入',
  zipName: '夜鷺匯出.zip',
  zipMeta: '48 KB · 加密傳送',
  zipSent: '傳送了一個檔案：夜鷺匯出.zip',
  zipReceived: '已接收 夜鷺匯出.zip · 解壓縮到 ~/夜鷺匯出',
  awuHello: '我是阿霧，今晚值班。夜鷺的案子你接了吧？',
  openFiles: '打開夜鷺匯出的資料',
  // the online EXIF tool and its trap
  uploaded: '已上傳',
  upload: '上傳',
  trap: ['等一下，你剛把夜鷺的原始照片上傳到一個不明網站？', '那個網站現在也有這張照片了，還記下了你的 IP 和上傳時間。要是公司的調查員也找上它……\n下次請用自己電腦上的工具查，例如終端機的 exiftool。這次結案評等會降一級。'],
  // files
  sideSlack: 'Slack 紀錄',
  checkInTerminal: '終端機檢查',
  // viewer
  viewerEmpty: '還沒有開啟任何圖片。<br>在「檔案」的下載項目，或論壇附件上點一下就能打開。',
  cameraInfo: '相機資訊',
  noCamera: '這個檔案沒有相機資訊。',
  tipDownloaded: '這裡只列出常見欄位，有些欄位不會顯示。用 EXIF 工具可以讀到更完整的中繼資料。',
  tipNotDownloaded: '要查看相機資訊，請先把原始檔<b>下載</b>下來。',
  saveFile: '把這個檔案存到你的電腦',
  realJpeg: '它是真的 JPEG，也可以用你自己的工具檢查。',
  // terminal
  help: `可用指令：
  <span class="k">ls</span> [資料夾]          列出檔案
  <span class="k">cd</span> &lt;資料夾&gt;          切換資料夾（cd .. 回上一層）
  <span class="k">pwd</span>                  顯示目前位置
  <span class="k">cat</span> &lt;檔案&gt;           顯示文字檔內容
  <span class="k">exiftool</span> &lt;檔案&gt;      讀取檔案的中繼資料
  <span class="k">grep</span> [-i] &lt;字&gt; &lt;檔案...&gt;  在檔案中搜尋文字，支援 *.log
  <span class="k">file</span> &lt;檔案&gt;          判斷檔案類型
  <span class="k">open</span> &lt;檔案&gt;          用圖形介面開啟
  <span class="k">clear</span>                清除畫面
<span class="d">小技巧：按 Tab 自動補完檔名，↑ ↓ 叫出之前的指令。</span>`,
  binary: '（二進位檔案，看不懂的亂碼……試試 exiftool 或 open）',
  usageExif: '用法：exiftool &lt;檔案&gt;</span>\n<span class="d">例如：exiftool PXL_20260914_144712345.jpg',
  usageGrep: '用法：grep [-i] &lt;要找的字&gt; &lt;檔案...&gt;</span>\n<span class="d">例如：grep Pixel slack/*.log',
  // 阿霧's coaching (optional helper)
  coachStart: hasPhoto => hasPhoto
    ? '我帶你。終端機下方的按鈕會幫你填好指令：先點「cd Downloads」，再按「執行」或 Enter。'
    : '我帶你。先打開瀏覽器，到書籤列的「無名廣場」，在爆料文的附件按「下載原始檔」。下載好再回來終端機。',
  coachDownloaded: '下載好了。回到終端機，點「cd Downloads」再按執行。',
  coachInDownloads: hasPhoto => hasPhoto ? '很好，你現在在「下載項目」裡。點「exiftool PXL_…」那一顆，再按執行。' : '你已經在下載項目了，不過裡面還沒有照片。先去論壇把附件下載下來。',
  coachAfterExif: '這些就是藏在照片裡的資料，每一行是一個欄位。慢慢看：有哪幾行，是夜鷺沒想到會留下來的？',
  // board
  noClues: '還沒有發現。讀取照片的中繼資料、放大照片細節，都會自動記錄在這裡。',
  noPins: '在網頁、Slack 紀錄、表格旁按「📌 釘選」，就會存到這裡。',
  // report
  reportNote: '交給夜鷺的報告。每一題都要有證據支撐；指認錯人，夜鷺會告訴你。',
  q1: '1. 照片的中繼資料洩漏了哪些資訊？（複選）',
  q2: '2. 照片畫面本身洩漏了什麼？（複選）',
  q3: '3. 爆料文的文字洩漏了什麼？',
  q4: '4. 夜鷺是誰？',
  fb1: '✕ 再看一次 exiftool 的輸出。夜鷺關掉了什麼？沒關掉什麼？',
  fb2: '✕ 用看圖 App 放大照片，畫面裡有兩樣東西能對應到現實。',
  fb3: '✕ 夜鷺用了新帳號、沒用公司網路。剩下能出賣人的是什麼？',
  clientWrong: '我讀了你的報告……不是那個人。但公司的調查員也可能這樣誤判，冤枉一個無辜的同事。可以再查一次嗎？',
  clientSolved: '……你找到我了。謝謝你比他們早一步。我會照你的建議處理。',
  ranks: [['洋蔥首席調查員', '公司的調查員還在喝咖啡，你已經破案了。'], ['資深隱私志工', '夜鷺得救了。'], ['見習調查員', '至少你知道下次發文前要先清 EXIF 了。']],
  rankStats: (hints, wrong, mistakes) => `用了 ${hints} 個提示、誤判 ${wrong} 次${mistakes ? '，還把原始照片上傳到線上工具' : ''}。`,
});
// Saves from before the engine was shared refer to these names for the same lines
UI.yeluWrong = UI.clientWrong;
UI.yeluSolved = UI.clientSolved;
