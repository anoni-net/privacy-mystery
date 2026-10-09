# Headless Chromium for the PDF edition (scripts/pdf.mjs), with the CJK fonts its CSS asks for.
FROM debian:bookworm-slim
RUN apt-get update \
 && apt-get install -y --no-install-recommends chromium fonts-noto-cjk fonts-noto-mono fonts-dejavu-core \
 && rm -rf /var/lib/apt/lists/*
# The container is the sandbox: it runs as an unprivileged user with no network
ENTRYPOINT ["chromium", "--no-sandbox", "--disable-dev-shm-usage", "--disable-crash-reporter"]
