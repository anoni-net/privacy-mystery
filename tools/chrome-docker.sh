#!/bin/sh
# CHROME_PATH for scripts/pdf.mjs on the anoni.net server: runs Chromium from the image
# built from tools/pdf/Dockerfile instead of a browser installed on the host.
#
# pdf.mjs passes a file:// URL and --print-to-pdf=<path>, both under the directory being
# built. MYSTERY_PDF_MOUNT names that directory; it is mounted at the same path so the
# paths in the arguments work inside the container. No network, and the files it writes
# belong to the calling user. tools/deploy-m6.sh sets both variables.
set -eu
dir=${MYSTERY_PDF_MOUNT:?set MYSTERY_PDF_MOUNT to the directory being built}
image=${MYSTERY_PDF_IMAGE:-anoni-mystery-chromium}
exec docker run --rm --network none --user "$(id -u):$(id -g)" -e HOME=/tmp \
    -v "$dir:$dir" "$image" "$@"
