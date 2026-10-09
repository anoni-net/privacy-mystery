# privacy-mystery

隱私推理遊戲。從一張照片的中繼資料、背景細節與文字習慣，找出不小心暴露身分的吹哨者。由匿名網路社群 [anoni.net](https://anoni.net/) 維護，網址為 <https://anoni.net/mystery>。

Privacy mystery games: unmask a whistleblower from a photo's metadata, background details, and writing style. Maintained by the [anoni.net](https://anoni.net/) community and served at <https://anoni.net/mystery>.

> 這份 README 不含任何解答。This README contains no spoilers.

## 案件 Cases

| 編號 | 案件 | 你會用到的技巧 |
|---|---|---|
| 01 | 夜鷺事件 Night Heron | EXIF 中繼資料、時區、檔名、照片背景、寫作風格、匿名集合 |

人物、公司與事件皆為虛構。All people, companies and events are fictional.

## 怎麼玩 How to play

- **互動版**（預設）：模擬一台調查員工作站，有瀏覽器、終端機（真的要打 `exiftool`）、看圖工具和調查板。需要 JavaScript。不熟終端機的人可以打開終端機下方可選的「新手輔助」，它不影響評等。手機上的終端機預設用「指令積木」：點選指令和檔案組出指令，不必打字；想打字也可以切換。
- **靜態版**（`/mystery/static/`）：只用 HTML 和 CSS，不需要 JavaScript、不用 SVG，給使用 Tor Browser「最安全」安全等級的人。內容和互動版相同：開場對話的每個選擇是一頁、終端機指令點開就看得到輸出、公司資料可以下載原始檔。互動版偵測到 JavaScript 無法使用時，會提示改玩靜態版。

The static version uses only HTML and CSS (no JavaScript, no SVG) for Tor Browser's "Safest" level. The interactive page points players there when JavaScript is unavailable.

- **PDF 版**（`/mystery/night-heron.pdf`）：可以離線或印出來玩的 A4 案件檔案。解答在最後，前面有一頁黑色的「停」，解答頁上下顛倒、字小、淺灰色，避免翻書時不小心看到。互動版的選單列、靜態版首頁與「需要 JavaScript」提示都有下載連結。

The PDF edition is a printable A4 case file with the solution at the back, printed small, grey and upside down behind a "stop" page.

爆料照片 `PXL_20260914_144712345.jpg` 是一張真的 JPEG，裡面的 EXIF 是刻意寫入的。你可以下載後用自己的工具檢查。

The leaked photo is a real JPEG with deliberately crafted EXIF, so you can inspect it with your own tools.

## 目錄 Layout

```
cases/01-night-heron/
  case.js              劇本資料與遊戲內網站，兩個版本共用 Story data and in-game sites, shared by both versions
  web/index.src.html   互動版原始碼 Interactive version source
  web/sites.css        遊戲內網站的樣式 Styles for the in-game sites
  web/assets/          遊戲用的 JPEG（爆料照片帶有刻意的 EXIF）
  static.css           靜態版樣式 Static version styles
  (PDF 版的版面在 scripts/pdf.mjs PDF layout lives in scripts/pdf.mjs)
  art/                 圖片的 SVG 原稿 SVG sources for the images
  solution.enc         加密的解答 Encrypted solution
scripts/
  build.mjs            建置網站 Build the site
  static.mjs           產生靜態版 Generate the static version
  pdf.mjs              產生 PDF 版 Generate the PDF edition
  case-data.mjs        在 Node 讀取 case.js Load case.js in Node
  encrypt.mjs          加密解答 Encrypt a solution
  decrypt.mjs          解密解答 Decrypt a solution
  make_images.py       PNG 轉 JPEG 並寫入 EXIF
tools/
  deploy-m6.sh         anoni.net 主機的自動部署 Auto-deploy on the anoni.net server
  chrome-docker.sh     在容器裡執行 Chromium 產生 PDF Run Chromium in a container for the PDF
  pdf/Dockerfile       上面那個容器的映像 Image for that container
```

## 建置與部署 Build and deploy

需要 Node.js 18 以上，不需要安裝套件。Requires Node.js 18+, no dependencies.

```sh
CASE_KEY=兇手全名 node scripts/build.mjs
```

輸出在 `dist/mystery/`，把整個資料夾放到網站的 `/mystery/` 底下即可。這樣建置出來的頁面不會向其他網站發出請求，也不載入網路字型。

`--target clearnet` 與 `--target onion` 只給 anoni.net 部署用，見下方「anoni.net 的部署」。`--out <資料夾>` 可以改變輸出位置。

**部署時一定要設定 `CASE_KEY`。** 靜態版的結局頁是一般的 HTML，建置時必須解開解答；沒有設定的話只會產生互動版，互動版裡「前往靜態版」的連結會找不到頁面。靜態版的結局明文只會出現在部署出去的網站上，不會進 repo。

The output in `dist/mystery/` is a self-contained static site that makes no requests to other sites and loads no web fonts. `--target clearnet|onion` is for the anoni.net deployment only; `--out <dir>` changes the output directory. Always set `CASE_KEY` when deploying: the static version's ending is plain HTML, so without the key only the interactive page is built.

**PDF 版**需要 Chrome、Chromium 或 Brave 來輸出，建置時會自動尋找，也可以用 `CHROME_PATH` 指定。找不到瀏覽器時只會跳過 PDF，並留下可列印的 HTML 原稿。

正式發布的 PDF 請在安裝了 **Noto Sans CJK TC／Noto Serif CJK TC** 的環境建置（例如 Debian／Ubuntu 的 `fonts-noto-cjk`）。這兩套字型是 SIL OFL 授權，可以隨 PDF 嵌入散布；版面會優先使用它們。macOS 內建的蘋方等系統字型，授權不一定允許隨文件散布。建置腳本也會把 PDF 的 Creator 欄位設成中性的名稱，不寫入作業系統與瀏覽器版本。

The PDF needs a Chromium-based browser (found automatically, or set `CHROME_PATH`). Build release PDFs with Noto Sans/Serif CJK TC installed: they are OFL-licensed and safe to embed. The build also keeps OS and browser details out of the PDF's Creator field.

CDN 的圖片最佳化（例如 Cloudflare Polish）會移除 JPEG 的 EXIF，爆料照片就查不到線索了。放在 CDN 後面時，`/mystery/` 底下的回應要帶 `Cache-Control: no-transform`。

Image optimization on a CDN (such as Cloudflare Polish) strips JPEG EXIF, which removes the clues from the leaked photo. Behind a CDN, serve `/mystery/` with `Cache-Control: no-transform`.

### anoni.net 的部署 Deployment on anoni.net

anoni.net 的主機用 cron 每 5 分鐘執行 `tools/deploy-m6.sh`，拉取 `main`、建置並切換到新版本，合併之後最慢約 5 分鐘上線。建置或檢查失敗時線上維持原本的版本。改了這支腳本之後，要再複製到主機上。

On anoni.net, a cron job runs `tools/deploy-m6.sh` every 5 minutes: it pulls `main`, builds, and switches to the new release. A failed build leaves the live site unchanged.

部署時建置兩份：

- `--target clearnet` 給 `anoni.net/mystery/`，互動版會載入流量統計
- `--target onion` 給 onion 站，連到 anoni.net 的網址改成對應的 onion 位址，不載入流量統計

The deployment builds twice: `--target clearnet` for `anoni.net/mystery/` with analytics, and `--target onion` for the onion site, with links to anoni.net rewritten to onion addresses and no analytics.

主機上沒有安裝瀏覽器，PDF 版用 docker 裡的 Chromium 產生。映像由 `tools/pdf/Dockerfile` 建立（Debian 的 `chromium` 加上 `fonts-noto-cjk`），`tools/chrome-docker.sh` 透過 `CHROME_PATH` 接上 `scripts/pdf.mjs`，容器沒有網路。Dockerfile 改了之後，下一次部署會重建映像。

The server has no browser installed: the PDF is printed by Chromium in a container built from `tools/pdf/Dockerfile`, wired in through `CHROME_PATH` by `tools/chrome-docker.sh`, with no network access.

### 流量統計 Analytics

clearnet 的互動版用 anoni.net 自架的 Umami 計算有多少人玩，不設 cookie，瀏覽器開啟 Do Not Track 或 Global Privacy Control 時不送出任何資料。送出之前先經過 `scripts/analytics.html` 的過濾，只送三種資料：

- 頁面瀏覽。網址只保留 `utm_` 開頭的四個參數，螢幕尺寸捨去到百位
- `case-start`：開場對話結束、開始調查
- `case-solved`：結案，附評等（`0` 到 `2`）

玩家選了誰、答了什麼、看了哪些提示都不會送出。onion 站、靜態版與不帶 `--target` 的建置都不做統計。新增事件時，要同時改 `scripts/analytics.html` 的 `EVENTS`，不在清單上的事件會被丟掉。

On the clearnet interactive page, anoni.net's self-hosted Umami counts players. No cookies; nothing is sent when Do Not Track or Global Privacy Control is on. A filter in `scripts/analytics.html` only lets through page views (query reduced to four `utm_` parameters, screen size rounded down) and two events, `case-start` and `case-solved` with the rank. Choices, answers and hints are never sent. The onion site, the static version and builds without `--target` have no analytics. New events must be added to `EVENTS` in `scripts/analytics.html`, or they are dropped.

## 解答與防暴雷 Solutions and spoilers

repo 裡不放解答明文。解答以「兇手的全名」作為鑰匙加密成 `solution.enc`，遊戲頁面在玩家指認正確時才解得開。所以破了案的人自然拿得到鑰匙，可以參與修改；還沒破案的人逛 repo 也不會被暴雷。

這只能防止「不小心看到」，不是真正的保密：嫌疑人只有幾位，把每個名字都試一次就能解開。

No plaintext answers are committed. Each solution is encrypted with the culprit's full name as the key; the game decrypts it only when a player names the right person. This prevents accidental spoilers, not determined readers.

修改解答 Editing a solution:

```sh
CASE_KEY=兇手全名 node scripts/decrypt.mjs cases/01-night-heron   # 產生 solution.html（已在 .gitignore）
# 編輯 cases/01-night-heron/solution.html
CASE_KEY=兇手全名 node scripts/encrypt.mjs cases/01-night-heron   # 寫回 solution.enc
```

建置時若設定 `CASE_KEY`，會順便檢查鑰匙能否解開。請不要在 issue、PR 或 commit message 裡寫出兇手的名字。

Please keep the culprit's name out of issues, PRs and commit messages.

## 重新產生圖片 Regenerating images

`art/*.svg` 是原稿。把 `photo.svg` 輸出成 4080×3072、其他圖輸出成 1080×810 的 PNG，命名為 `art_<名稱>.png`，再執行：

```sh
pip install Pillow piexif
python3 scripts/make_images.py <PNG 所在資料夾> cases/01-night-heron
```

腳本只會在爆料照片寫入故事需要的 EXIF（Pixel 7a、時區 +09:00、沒有 GPS），社群照片則不帶任何拍攝資訊，模擬社群平台在上傳時清除中繼資料。

## 延伸閱讀 Further reading

- [anoni.net 文件庫：概念篇](https://anoni.net/docs/basics/)
- [記者情境：消息來源保護](https://anoni.net/docs/scenarios/journalist/)

## 授權 License

- 程式碼：`scripts/` 以及遊戲頁面中的 HTML、CSS、JavaScript 程式，以 [MIT](LICENSE) 授權。
- 內容：劇本、人物、對話、提示、解答與圖片，以 [CC BY 4.0](LICENSE-CONTENT) 授權。轉載或改編時請註明「anoni.net 匿名網路社群」並附上連結。

Code is licensed under [MIT](LICENSE); story content, solutions and images under [CC BY 4.0](LICENSE-CONTENT).
