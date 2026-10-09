<a id="zh-tw"></a>

# privacy-mystery

**正體中文** | [English](#en)

隱私推理遊戲，從一張照片的中繼資料、背景細節與文字習慣，找出不小心暴露身分的吹哨者。由[匿名網路社群 anoni.net](https://anoni.net/) 維護，網址是 <https://anoni.net/mystery>，英文版在 <https://anoni.net/mystery/en/>。

> 這份 README 不含任何解答。

## 案件

| 編號 | 案件 | 會用到的技巧 |
|---|---|---|
| `01` | 夜鷺事件 | EXIF 中繼資料、時區、檔名、照片背景、寫作風格、匿名集合 |

人物、公司與事件皆為虛構。

## 三種版本

### 互動版

預設的版本，模擬一台調查員工作站，有瀏覽器、終端機（真的要輸入 `exiftool`）、看圖工具與調查板，需要 JavaScript。不熟終端機的人可以打開終端機下方的「新手輔助」，開了也不影響評等。

手機上改成一次一個畫面的 app 介面，上方有返回鍵，下方是分頁列。終端機預設用「指令積木」，點選指令與檔案就能組出指令，想打字也可以切換。

### 靜態版

網址是 `/mystery/night-heron/static/`，只用 HTML 與 CSS，不需要 JavaScript，也不用 SVG，給使用 Tor Browser「最安全」安全等級的人。內容與互動版相同，開場對話的每個選擇是一頁，終端機指令點開就能看到輸出，公司資料可以下載原始檔。互動版偵測到 JavaScript 無法使用時，會提示改用靜態版。

### PDF 版

網址是 `/mystery/night-heron/night-heron.pdf`，可以離線或印出來玩的 A4 案件檔案。解答在最後，前面有一頁黑色的「停」，解答頁上下顛倒、字小、淺灰色，避免翻閱時不小心看到。互動版的選單、靜態版首頁與「需要 JavaScript」的提示都有下載連結。

爆料照片 `PXL_20260914_144712345.jpg` 是一張真的 JPEG，EXIF 是刻意寫入的，下載後可以用自己的工具檢查。

## 英文版

英文版的大廳在 `/mystery/en/`，案件在 `/mystery/en/night-heron/`，同樣有互動版、`static/` 靜態版與 `night-heron.pdf`，中英文之間都有切換連結。舞台仍在台灣，人名用拼音，爆料照片裡的備忘錄維持中文（解謎不需要讀懂）。寫作風格這條線索改用英文的習慣，包括英式或美式拼法、引號的樣式與固定的結尾語。

兩種語言共用同一份進度，玩到一半切換語言，對話與調查板會跟著換成另一種語言。

## 大廳

`/mystery/` 是霧港隱私互助站的「委託板」，每個案件一份檔案夾，另外有一張「準備中」的卡片。大廳只用 HTML 與 CSS，不需要 JavaScript。有 JavaScript 時會讀取瀏覽器裡的進度，在檔案夾蓋上「調查中」或「已結案」與評等（只有狀態與評等，沒有名字或答案）。

新增案件時，在 `cases/<編號>-<代號>/` 放一份 `case.json`，大廳就會出現它。

## 目錄

```
cases/01-night-heron/
  case.json            大廳卡片的資料：代號、名稱、引子、技巧標籤，英文寫在 i18n.en
  case.js              劇本資料與遊戲內網站，所有版本共用
  case.en.js           英文劇本，結構與 case.js 相同
  web/index.src.html   互動版原始碼
  web/ui.zh.js         互動版的介面文字（中文）
  web/ui.en.js         互動版的介面文字（英文）
  web/sites.css        遊戲內網站的樣式
  web/assets/          遊戲用的 JPEG（爆料照片帶有刻意的 EXIF）
  static.css           靜態版樣式
  art/                 圖片的 SVG 原稿
  solution.enc         加密的解答
  solution.en.enc      加密的英文解答，鑰匙相同
  og.png、og.en.png    案件的社群分享預覽圖
site/                  複製到網站最上層：icon 與大廳的分享預覽圖
scripts/
  build.mjs            建置網站
  static.mjs           產生靜態版
  pdf.mjs              產生 PDF 版，版面也寫在這裡
  lobby.mjs            產生大廳（委託板）
  case-data.mjs        在 Node 讀取 case.js
  meta.mjs             每一頁共用的 icon 與分享預覽標籤
  make_og.mjs          產生 PNG icon 與分享預覽圖
  encrypt.mjs          加密解答
  decrypt.mjs          解密解答
  make_images.py       PNG 轉 JPEG 並寫入 EXIF
tools/
  deploy-m6.sh         anoni.net 主機的自動部署
  chrome-docker.sh     在容器裡執行 Chromium 產生 PDF
  pdf/Dockerfile       上面那個容器的映像
  og/                  分享預覽圖的版型與 anoni.net logo
```

## 建置

需要 Node.js 18 以上，不需要安裝套件。

```sh
CASE_KEY=兇手全名 node scripts/build.mjs
```

輸出在 `dist/mystery/`，把整個資料夾放到網站的 `/mystery/` 底下即可。最上層是中文的大廳，`en/` 是英文版，每個案件在自己的代號底下，例如 `/mystery/night-heron/`。建置出來的頁面不會向其他網站發出請求，也不載入網路字型。

`--target clearnet` 與 `--target onion` 只給 anoni.net 部署用（見下方「anoni.net 的部署」），`--out <資料夾>` 可以改變輸出位置。

> [!IMPORTANT]
> 部署時一定要設定 `CASE_KEY`。靜態版的結局頁是一般的 HTML，建置時必須解開解答，沒有設定的話只會產生互動版，互動版裡「前往靜態版」的連結會找不到頁面。靜態版的結局明文只會出現在部署出去的網站上，不會進 repo。

### PDF 版的建置

PDF 版需要 Chrome、Chromium 或 Brave 來輸出，建置時會自動尋找，也可以用 `CHROME_PATH` 指定。找不到瀏覽器時只會跳過 PDF，並留下可列印的 HTML 原稿。

正式發布的 PDF 請在安裝了 Noto Sans CJK TC 與 Noto Serif CJK TC 的環境建置（例如 Debian 或 Ubuntu 的 `fonts-noto-cjk`）。這兩套字型是 SIL OFL 授權，可以隨 PDF 嵌入散布，版面會優先使用它們。macOS 內建的蘋方等系統字型，授權不一定允許隨文件散布。建置腳本也會把 PDF 的 Creator 欄位設成中性的名稱，不寫入作業系統與瀏覽器版本。

### 放在 CDN 後面

CDN 的圖片最佳化（例如 Cloudflare Polish）會移除 JPEG 的 EXIF，爆料照片裡的線索也會跟著消失。放在 CDN 後面時，`/mystery/` 底下的回應要帶 `Cache-Control: no-transform`。

### anoni.net 的部署

anoni.net 的主機用 cron 每 5 分鐘執行 `tools/deploy-m6.sh`，拉取 `main`、建置並切換到新版本，合併之後最慢約 5 分鐘上線。建置或檢查失敗時線上維持原本的版本。改了這支腳本之後，要再複製到主機上。

部署時建置兩份：

- `--target clearnet` 給 `anoni.net/mystery/`，互動版會載入流量統計
- `--target onion` 給 onion 站，連到 anoni.net 的網址改成對應的 onion 位址，不載入流量統計

主機上沒有安裝瀏覽器，PDF 版用 docker 裡的 Chromium 產生。映像由 `tools/pdf/Dockerfile` 建立（Debian 的 `chromium` 加上 `fonts-noto-cjk`），`tools/chrome-docker.sh` 透過 `CHROME_PATH` 接上 `scripts/pdf.mjs`，容器沒有網路。Dockerfile 改了之後，下一次部署會重建映像。

### 流量統計

clearnet 的互動版用 anoni.net 自架的 Umami 計算有多少人玩，不設 cookie，瀏覽器開啟 Do Not Track 或 Global Privacy Control 時不送出任何資料。送出之前先經過 `scripts/analytics.html` 的過濾，只送三種資料：

- 頁面瀏覽。網址只保留 `utm_` 開頭的四個參數，螢幕尺寸捨去到百位
- `case-start`：開場對話結束、開始調查
- `case-solved`：結案，附評等（`0` 到 `2`）

玩家選了誰、答了什麼、看了哪些提示都不會送出。onion 站、靜態版與不帶 `--target` 的建置都不做統計。新增事件時，要同時改 `scripts/analytics.html` 的 `EVENTS`，不在清單上的事件會被丟掉。

## 解答與防暴雷

repo 裡不放解答明文。解答以兇手的中文全名作為鑰匙加密成 `solution.enc`（英文版是 `solution.en.enc`，鑰匙相同），遊戲頁面在玩家指認正確時才解得開。破了案的人自然取得鑰匙，可以參與修改，還沒破案的人逛 repo 也不會被暴雷。

這個做法只能防止不小心看到，嫌疑人只有幾位，把每個名字都試一次就能解開。

修改解答：

```sh
CASE_KEY=兇手全名 node scripts/decrypt.mjs cases/01-night-heron      # 產生 solution.html（已在 .gitignore）
# 編輯 cases/01-night-heron/solution.html
CASE_KEY=兇手全名 node scripts/encrypt.mjs cases/01-night-heron      # 寫回 solution.enc

CASE_KEY=兇手全名 node scripts/decrypt.mjs cases/01-night-heron en   # 英文解答：solution.en.html
CASE_KEY=兇手全名 node scripts/encrypt.mjs cases/01-night-heron en   # 寫回 solution.en.enc
```

建置時若設定 `CASE_KEY`，會順便檢查鑰匙能否解開。請不要在 issue、PR 或 commit message 裡寫出兇手的名字。

## 重新產生圖片

`art/*.svg` 是原稿。把 `photo.svg` 輸出成 4080×3072、其他圖輸出成 1080×810 的 PNG，命名為 `art_<名稱>.png`，再執行：

```sh
pip install Pillow piexif
python3 scripts/make_images.py <PNG 所在資料夾> cases/01-night-heron
```

腳本只會在爆料照片寫入故事需要的 EXIF（Pixel 7a、時區 +09:00、沒有 GPS），社群照片則不帶任何拍攝資訊，模擬社群平台在上傳時清除中繼資料。

### icon 與分享預覽圖

icon 的原稿是 `site/favicon.svg`，分享預覽圖照文件站的[社群分享卡](https://anoni.net/docs/community/visual-guide/)版型，版面在 `tools/og/og.html`。改了 icon、版型，或案件 `case.json` 的標題、引言、簡介之後，重新產生 PNG：

```sh
node scripts/make_og.mjs --fonts <放 Noto Sans TC 與 Public Sans 的資料夾>
```

需要 Chrome、Chromium 或 Brave。字型已經安裝在系統上的話可以省略 `--fonts`。產生的 PNG 直接進 repo，建置與部署都不需要執行這支腳本。新增案件時記得一起產生它的預覽圖。

## 延伸閱讀

- [anoni.net 文件庫：概念篇](https://anoni.net/docs/basics/)
- [記者情境：消息來源保護](https://anoni.net/docs/scenarios/journalist/)

## 授權

- 程式碼：`scripts/` 以及遊戲頁面中的 HTML、CSS、JavaScript 程式，以 [MIT](LICENSE) 授權。
- 內容：劇本、人物、對話、提示、解答與圖片，以 [CC BY 4.0](LICENSE-CONTENT) 授權。轉載或改編時請註明「anoni.net 匿名網路社群」並附上連結。

---

<a id="en"></a>

# privacy-mystery

[正體中文](#zh-tw) | **English**

A privacy mystery game: unmask a whistleblower from a photo's metadata, the details in its background and their writing habits. It is maintained by [anoni.net](https://anoni.net/), a community based in Taiwan, and served at <https://anoni.net/mystery/en/> (Chinese at <https://anoni.net/mystery>).

> This README contains no spoilers.

## Cases

| No. | Case | Skills you will use |
|---|---|---|
| `01` | Night Heron | EXIF metadata, time zones, file names, photo backgrounds, writing style, anonymity sets |

All people, companies and events are fictional.

## Three editions

### Interactive edition

The default edition simulates an investigator's workstation with a browser, a terminal (you really do type `exiftool`), an image viewer and an evidence board. It needs JavaScript. Players who have never used a terminal can switch on the optional beginner help below it; doing so does not affect the rank.

On a phone it becomes an app that shows one screen at a time, with a back button at the top and a tab bar at the bottom. The terminal defaults to a command builder: tap a command and its files to compose a line, or switch to typing.

### Static edition

At `/mystery/en/night-heron/static/`, built from HTML and CSS only (no JavaScript, no SVG) for people using Tor Browser's "Safest" security level. It has the same content as the interactive edition: each choice in the opening conversation is its own page, terminal commands show their output when opened, and the company files can be downloaded as originals. The interactive page points players here when JavaScript is unavailable.

### PDF edition

At `/mystery/en/night-heron/night-heron.pdf`, an A4 case file to play offline or on paper. The solution is at the back behind a black "stop" page, printed small, light grey and upside down so that leafing through the file does not give it away. The interactive edition's menu, the static edition's front page and the "JavaScript needed" notice all link to it.

The leaked photo, `PXL_20260914_144712345.jpg`, is a real JPEG with deliberately written EXIF, so you can download it and inspect it with your own tools.

## English edition

The English lobby is at `/mystery/en/` and the case at `/mystery/en/night-heron/`, with the same interactive, `static/` and `night-heron.pdf` editions and language links both ways. The story stays in Taiwan and the names are romanised. The memo in the leaked photo stays in Chinese; you do not need to read it to solve the case. The writing-style clue uses English habits instead: British or American spelling, the style of quotation marks and a fixed sign-off.

Both languages share one save, so a player who switches language halfway through sees the conversation and the evidence board in the new language.

## Lobby

`/mystery/` is the case board of the Mistport Privacy Aid, with one folder per case and a "coming soon" card. The lobby uses only HTML and CSS and works without JavaScript. With JavaScript it reads the player's progress from the browser and stamps each folder "investigating" or "closed" with the rank (status and rank only, never names or answers).

To add a case, put a `case.json` in `cases/<number>-<slug>/` and it appears in the lobby.

## Layout

```
cases/01-night-heron/
  case.json            lobby card: slug, title, hook and skills; English under i18n.en
  case.js              story data and in-game sites, shared by every edition
  case.en.js           English story data, same structure as case.js
  web/index.src.html   interactive edition source
  web/ui.zh.js         interface text, Chinese
  web/ui.en.js         interface text, English
  web/sites.css        styles for the in-game sites
  web/assets/          JPEGs used in the game (the leaked photo carries crafted EXIF)
  static.css           static edition styles
  art/                 SVG sources for the images
  solution.enc         encrypted solution
  solution.en.enc      encrypted English solution, same key
  og.png, og.en.png    the case's social preview images
site/                  copied to the top of the site: icons and the lobby's preview images
scripts/
  build.mjs            build the site
  static.mjs           generate the static edition
  pdf.mjs              generate the PDF edition, including its layout
  lobby.mjs            generate the lobby (case board)
  case-data.mjs        load case.js in Node
  meta.mjs             icon and preview tags shared by every page
  make_og.mjs          draw the PNG icons and the preview images
  encrypt.mjs          encrypt a solution
  decrypt.mjs          decrypt a solution
  make_images.py       convert PNG to JPEG and write EXIF
tools/
  deploy-m6.sh         automatic deployment on the anoni.net server
  chrome-docker.sh     run Chromium in a container to print the PDF
  pdf/Dockerfile       image for that container
  og/                  preview image layout and the anoni.net logo
```

## Building

Requires Node.js 18 or later, with no packages to install.

```sh
CASE_KEY=<culprit's full name> node scripts/build.mjs
```

The output goes to `dist/mystery/`; put the whole folder under `/mystery/` on a web server. The top level is the Chinese lobby, `en/` is the English edition, and each case lives under its slug, for example `/mystery/night-heron/`. The pages make no requests to other sites and load no web fonts.

`--target clearnet` and `--target onion` are for the anoni.net deployment only (see "Deployment on anoni.net" below), and `--out <dir>` changes the output directory.

> [!IMPORTANT]
> Always set `CASE_KEY` when deploying. The static edition's ending is plain HTML, so the build has to decrypt the solution; without the key only the interactive edition is built, and its link to the static edition leads nowhere. The decrypted ending only ever appears on the deployed site and is never committed.

### Building the PDF

The PDF edition is printed by Chrome, Chromium or Brave. The build finds one automatically, or you can set `CHROME_PATH`. Without a browser it skips the PDF and leaves the printable HTML source.

Build release PDFs where Noto Sans CJK TC and Noto Serif CJK TC are installed (for example `fonts-noto-cjk` on Debian or Ubuntu). Both are under the SIL OFL, which allows embedding them in a distributed PDF, and the layout prefers them. System fonts such as PingFang on macOS may not be licensed for distribution in documents. The build also sets the PDF's Creator field to a neutral name, leaving out the operating system and browser version.

### Serving behind a CDN

Image optimisation on a CDN (Cloudflare Polish, for example) strips EXIF from JPEGs, and the clues in the leaked photo go with it. Behind a CDN, serve everything under `/mystery/` with `Cache-Control: no-transform`.

### Deployment on anoni.net

A cron job on the anoni.net server runs `tools/deploy-m6.sh` every 5 minutes: it pulls `main`, builds and switches to the new release, so a merge is live within about 5 minutes. If the build or its checks fail, the live site stays on the previous release. After changing the script, copy it to the server again.

The deployment builds twice:

- `--target clearnet` for `anoni.net/mystery/`, where the interactive edition loads analytics
- `--target onion` for the onion site, with links to anoni.net rewritten to the matching onion addresses and no analytics

The server has no browser installed, so the PDF is printed by Chromium in a container. The image is built from `tools/pdf/Dockerfile` (Debian's `chromium` plus `fonts-noto-cjk`), and `tools/chrome-docker.sh` connects it to `scripts/pdf.mjs` through `CHROME_PATH`. The container has no network access. When the Dockerfile changes, the next deployment rebuilds the image.

### Analytics

The clearnet interactive edition counts players with anoni.net's self-hosted Umami. It sets no cookies and sends nothing when the browser has Do Not Track or Global Privacy Control turned on. Everything passes through a filter in `scripts/analytics.html`, which lets three kinds of data through:

- Page views, with the query reduced to the four `utm_` parameters and the screen size rounded down to the hundred
- `case-start`, when the opening conversation ends and the investigation begins
- `case-solved`, when the case is closed, with the rank (`0` to `2`)

Who a player accused, what they answered and which hints they read are never sent. The onion site, the static edition and builds without `--target` have no analytics. A new event must also be added to `EVENTS` in `scripts/analytics.html`, or it is dropped.

## Solutions and spoilers

The repository holds no plaintext solutions. Each solution is encrypted with the culprit's full Chinese name as the key into `solution.enc` (and `solution.en.enc` for English, with the same key), and the game decrypts it only when a player names the right person. Anyone who has solved the case therefore has the key and can help edit the solution, while people browsing the repository before solving it are not spoiled.

This only prevents accidental spoilers: there are few suspects, and trying every name opens it.

Editing a solution:

```sh
CASE_KEY=<culprit's full name> node scripts/decrypt.mjs cases/01-night-heron      # writes solution.html (in .gitignore)
# edit cases/01-night-heron/solution.html
CASE_KEY=<culprit's full name> node scripts/encrypt.mjs cases/01-night-heron      # writes solution.enc

CASE_KEY=<culprit's full name> node scripts/decrypt.mjs cases/01-night-heron en   # English: solution.en.html
CASE_KEY=<culprit's full name> node scripts/encrypt.mjs cases/01-night-heron en   # writes solution.en.enc
```

When `CASE_KEY` is set, the build also checks that the key opens the solution. Please keep the culprit's name out of issues, pull requests and commit messages.

## Regenerating images

`art/*.svg` are the sources. Export `photo.svg` as a 4080×3072 PNG and the others as 1080×810 PNGs, name them `art_<name>.png`, then run:

```sh
pip install Pillow piexif
python3 scripts/make_images.py <folder with the PNGs> cases/01-night-heron
```

The script writes the EXIF the story needs into the leaked photo only (Pixel 7a, time zone +09:00, no GPS). The social media photos carry no camera data, as social platforms strip metadata on upload.

### Icons and preview images

The icon's source is `site/favicon.svg`. The preview images follow the docs site's [share card](https://anoni.net/docs/en/community/visual-guide/) layout, set in `tools/og/og.html`. After changing the icon, the layout, or a case's title, hook or summary in `case.json`, regenerate the PNGs:

```sh
node scripts/make_og.mjs --fonts <folder with Noto Sans TC and Public Sans>
```

It needs Chrome, Chromium or Brave, and `--fonts` can be left out when both fonts are installed. The PNGs are committed, so neither the build nor the deployment runs this script. A new case needs its preview images generated too.

## Further reading

- [anoni.net docs: the basics](https://anoni.net/docs/en/basics/)
- [Scenario for journalists: protecting sources](https://anoni.net/docs/en/scenarios/journalist/)

## License

- Code, meaning `scripts/` and the HTML, CSS and JavaScript in the game pages, is licensed under [MIT](LICENSE).
- Content, meaning the story, characters, dialogue, hints, solutions and images, is licensed under [CC BY 4.0](LICENSE-CONTENT). When you republish or adapt it, please credit "anoni.net" with a link.
