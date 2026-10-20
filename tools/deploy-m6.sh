#!/bin/sh
# m6 上建置並發布 anoni.net/mystery，由 ubuntu 的 crontab 每 5 分鐘執行一次：
#
#   */5 * * * * /home/ubuntu/mystery-deploy.sh
#
# 本檔是那支腳本的原始檔，改了之後要複製到 m6 的 /home/ubuntu/mystery-deploy.sh。
# 做法跟 anoni-net/www 的 tools/deploy-m6.sh 相同。
#
# 目錄結構：
#   /srv/anoni-net-mystery/repo            anoni-net/privacy-mystery 的 clone，只拉 main
#   /srv/anoni-net-mystery/releases/<sha>  每個 commit 建置一份，保留最近 KEEP 份
#   /srv/anoni-net-mystery/current         symlink，nginx 的 /mystery/ 讀 current/clearnet，
#                                          mystery.<onion> 讀 current/onion，
#                                          IPFS 鏡像的組裝讀 current/ipfs
#
# clearnet、onion 與 ipfs 各建置一份（build.mjs 的 --target）。clearnet 的互動版載入流量統計，
# onion 那份不載入，連到 anoni.net 的網址也改成 onion 位址。ipfs 那份給 anoni.net 的 IPFS 鏡像
# （toomore/anoni-net-ws#422），連到 anoni.net 的網址改成根目錄的相對路徑，只有互動版：
# 志工 pin 過的內容收不回來，結局的明文不放上去。
#
# PDF 版用 docker 裡的 Chromium 產生（tools/pdf/Dockerfile，主機上不裝瀏覽器）。映像的標籤
# 是 Dockerfile 內容的雜湊，Dockerfile 改了才會重建，第一次建置要下載約 850 MB。
#
# 靜態版與 PDF 含有結局，要有案件的鑰匙才會建置。鑰匙放在 KEYFILE（案件 01）與
# KEYFILE_02（案件 02），權限 600，不進 repo。讀不到案件 01 的鑰匙就不發布，等鑰匙放上去的
# 下一輪再建置。案件 02 的鑰匙還沒放上去時照常發布，只是案件 02 先不提供靜態版與 PDF
# （build.mjs 會拿掉所有連到它們的連結）；放上去之後的下一輪會自動重建。
#
# 建置完成、檢查通過之後才切換 current，切換是原子操作，建置失敗時線上維持原本的版本。
# 只接受 fast-forward，main 的歷史被改寫時停下來寫進 log，不強制覆蓋，等人處理。
# 同一個 commit 加同一把鑰匙建置失敗過就不再重試，換了 commit 或更新鑰匙才會再建置。
# 有更新時才寫 log，沒有變動就安靜結束。上一輪還沒跑完時這一輪直接略過。
# 要暫停自動發布（例如手動退回上一版時），建立 /srv/anoni-net-mystery/hold，刪掉就恢復。
set -eu

BASE=/srv/anoni-net-mystery
REPO=$BASE/repo
LOG=/home/ubuntu/mystery-deploy.log
KEYFILE=/home/ubuntu/.config/mystery-case-key
KEYFILE_02=/home/ubuntu/.config/mystery-case-key-02
KEEP=5

exec 9>/tmp/mystery-deploy.lock
flock -n 9 || exit 0
[ -e "$BASE/hold" ] && exit 0

if [ ! -s "$KEYFILE" ]; then
    # 只在第一次發現時寫 log，避免每 5 分鐘寫一行
    if [ ! -e "$BASE/nokey" ]; then
        echo "$(date -Iseconds) 找不到 $KEYFILE，暫不發布" >>"$LOG"
        touch "$BASE/nokey"
    fi
    exit 0
fi
rm -f "$BASE/nokey"

before=$(git -C "$REPO" rev-parse --short=12 HEAD)
if ! git -C "$REPO" pull --ff-only -q origin main 2>>"$LOG"; then
    echo "$(date -Iseconds) 無法 fast-forward，停在 $before，需要人工處理" >>"$LOG"
    exit 1
fi
sha=$(git -C "$REPO" rev-parse --short=12 HEAD)
# 案件 02 有沒有鑰匙也算在版本裡：鑰匙放上去之後，同一個 commit 也要重建
key02=none
[ -s "$KEYFILE_02" ] && key02=$(stat -c %Y "$KEYFILE_02")
attempt="$sha $(stat -c %Y "$KEYFILE") $key02"
current=$(readlink "$BASE/current" 2>/dev/null || true)
[ "$current" = "releases/$sha" ] && [ "$(cat "$BASE/current-attempt" 2>/dev/null || true)" = "$attempt" ] && exit 0
[ "$(cat "$BASE/failed" 2>/dev/null || true)" = "$attempt" ] && exit 0

img=anoni-mystery-chromium:$(sha256sum "$REPO/tools/pdf/Dockerfile" | cut -c1-12)
if ! docker image inspect "$img" >/dev/null 2>&1; then
    if ! docker build -q -t "$img" "$REPO/tools/pdf" >/dev/null 2>>"$LOG"; then
        echo "$(date -Iseconds) $img 建置失敗，線上維持 ${current:-（尚未發布）}" >>"$LOG"
        exit 1
    fi
    echo "$(date -Iseconds) 建置 $img" >>"$LOG"
fi

dest=$BASE/releases/$sha
# 要檢查的檔案：案件 01 一定有靜態版與 PDF，案件 02 有鑰匙時才有
need="index.html night-heron/index.html night-heron/static/index.html night-heron/night-heron.pdf en/index.html en/night-heron/index.html en/night-heron/static/index.html en/night-heron/night-heron.pdf zh-cn/index.html zh-cn/night-heron/static/index.html zh-cn/night-heron/night-heron.pdf blue-magpie/index.html"
case02=""
if [ "$key02" != none ]; then
    case02="$(cat "$KEYFILE_02")"
    need="$need blue-magpie/static/index.html blue-magpie/blue-magpie.pdf en/blue-magpie/static/index.html en/blue-magpie/blue-magpie.pdf zh-cn/blue-magpie/static/index.html zh-cn/blue-magpie/blue-magpie.pdf"
fi
# ipfs 那份只有互動版與大廳
need_ipfs="index.html night-heron/index.html blue-magpie/index.html en/index.html en/night-heron/index.html zh-cn/index.html zh-cn/night-heron/index.html zh-cn/blue-magpie/index.html feedback/index.html"
rm -rf "$dest.tmp"
# onion 那份的頁面不能有任何指向 clearnet 的資源或連結，檢查不到才算建置成功。
# PDF 不在檢查範圍：它是給人下載列印的文件，解答裡連到文件庫的網址會留在裡面。
# ipfs 那份不能有靜態版與 PDF，連到 anoni.net 的網址只留分享預覽（content="…"）與
# 不在鏡像裡的 Gears、API。建置時不給鑰匙，build.mjs 的 ipfs 目標本來也不讀。
if ! (cd "$REPO" && export CASE_KEY="$(cat "$KEYFILE")" CASE_KEY_02="$case02" \
        CHROME_PATH="$REPO/tools/chrome-docker.sh" MYSTERY_PDF_MOUNT="$dest.tmp" MYSTERY_PDF_IMAGE="$img" \
        && node scripts/build.mjs --target clearnet --out "$dest.tmp/clearnet" \
        && node scripts/build.mjs --target onion --out "$dest.tmp/onion" \
        && env -u CASE_KEY -u CASE_KEY_02 node scripts/build.mjs --target ipfs --out "$dest.tmp/ipfs" \
        && for t in clearnet onion; do for f in $need; do test -s "$dest.tmp/$t/$f" || exit 1; done; done \
        && for f in $need_ipfs; do test -s "$dest.tmp/ipfs/$f" || exit 1; done \
        && ! grep -rqE --include='*.html' --include='*.css' --include='*.js' \
            'https://([a-z]+\.)?anoni\.net' "$dest.tmp/onion" \
        && [ -z "$(find "$dest.tmp/ipfs" \( -path '*/static/*' -o -name '*.pdf' \) -print -quit)" ] \
        && ! grep -rhoE --include='*.html' '(content=")?https://anoni\.net/[a-z]*' "$dest.tmp/ipfs" \
            | grep -qvE '^content="|^https://anoni\.net/(gears|api)$') >/dev/null 2>>"$LOG"; then
    echo "$(date -Iseconds) $sha 建置或檢查失敗，線上維持 ${current:-（尚未發布）}" >>"$LOG"
    echo "$attempt" >"$BASE/failed"
    rm -rf "$dest.tmp"
    exit 1
fi
# PDF 的列印原稿含有結局明文，nginx 雖然讀不到這裡，發布前還是刪掉
rm -rf "$dest.tmp/pdf-src" "$dest"
mv "$dest.tmp" "$dest"
ln -sfn "releases/$sha" "$BASE/current.tmp"
mv -T "$BASE/current.tmp" "$BASE/current"
rm -f "$BASE/failed"
echo "$attempt" >"$BASE/current-attempt"
echo "$(date -Iseconds) 發布 $sha $(git -C "$REPO" log -1 --format=%s)" >>"$LOG"

# 保留最近 KEEP 份，正在使用的那一份不會被刪
ls -1t "$BASE/releases" | tail -n +$((KEEP + 1)) | while read -r old; do
    [ "releases/$old" = "releases/$sha" ] || rm -rf "${BASE:?}/releases/$old"
done
