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
#                                          mystery.<onion> 讀 current/onion
#
# clearnet 與 onion 各建置一份（build.mjs 的 --target）。clearnet 的互動版載入流量統計，
# onion 那份不載入，連到 anoni.net 的網址也改成 onion 位址。
#
# PDF 版用 docker 裡的 Chromium 產生（tools/pdf/Dockerfile，主機上不裝瀏覽器）。映像的標籤
# 是 Dockerfile 內容的雜湊，Dockerfile 改了才會重建，第一次建置要下載約 850 MB。
#
# 靜態版的結局頁只有在設定 CASE_KEY 時才會建置，鑰匙放在 KEYFILE（權限 600，不進 repo）。
# 沒有鑰匙時互動版連到 static/ 的連結會 404，所以讀不到鑰匙就不發布，等鑰匙放上去的
# 下一輪再建置。
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
attempt="$sha $(stat -c %Y "$KEYFILE")"
current=$(readlink "$BASE/current" 2>/dev/null || true)
[ "$current" = "releases/$sha" ] && exit 0
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
rm -rf "$dest.tmp"
# onion 那份不能有任何指向 clearnet 的資源或連結，檢查不到才算建置成功
if ! (cd "$REPO" && export CASE_KEY="$(cat "$KEYFILE")" \
        CHROME_PATH="$REPO/tools/chrome-docker.sh" MYSTERY_PDF_MOUNT="$dest.tmp" MYSTERY_PDF_IMAGE="$img" \
        && node scripts/build.mjs --target clearnet --out "$dest.tmp/clearnet" \
        && node scripts/build.mjs --target onion --out "$dest.tmp/onion" \
        && for t in clearnet onion; do for f in index.html static/index.html night-heron.pdf; do test -s "$dest.tmp/$t/$f" || exit 1; done; done \
        && ! grep -rqE 'https://([a-z]+\.)?anoni\.net' "$dest.tmp/onion") >/dev/null 2>>"$LOG"; then
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
echo "$(date -Iseconds) 發布 $sha $(git -C "$REPO" log -1 --format=%s)" >>"$LOG"

# 保留最近 KEEP 份，正在使用的那一份不會被刪
ls -1t "$BASE/releases" | tail -n +$((KEEP + 1)) | while read -r old; do
    [ "releases/$old" = "releases/$sha" ] || rm -rf "${BASE:?}/releases/$old"
done
