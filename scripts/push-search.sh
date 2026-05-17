#!/usr/bin/env bash
# 用法：BAIDU_PUSH_TOKEN=xxx INDEXNOW_KEY=yyy ./scripts/push-search.sh urls.txt
# urls.txt 每行一个完整 URL
set -euo pipefail

URLS_FILE="${1:?usage: $0 urls.txt}"
BAIDU_TOKEN="${BAIDU_PUSH_TOKEN:?need env BAIDU_PUSH_TOKEN}"
INDEXNOW_KEY="${INDEXNOW_KEY:?need env INDEXNOW_KEY}"

SITE="https://52hub.org"
HOST="52hub.org"

if [ ! -f "${URLS_FILE}" ]; then
  echo "ERROR: ${URLS_FILE} not found" >&2
  exit 1
fi

URL_COUNT=$(grep -c '^https' "${URLS_FILE}" || true)
echo "Pushing ${URL_COUNT} URLs to Baidu + Bing IndexNow..."
echo ""

# ===== 1. 百度 =====
echo "=== Baidu push ==="
BAIDU_API="http://data.zz.baidu.com/urls?site=${SITE}&token=${BAIDU_TOKEN}"
BAIDU_RESP=$(curl -sS -H 'Content-Type: text/plain' \
  --data-binary @"${URLS_FILE}" \
  "${BAIDU_API}")
echo "Response: ${BAIDU_RESP}"
echo ""

# ===== 2. Bing IndexNow =====
echo "=== Bing IndexNow push ==="
URLS_JSON=$(jq -R . < "${URLS_FILE}" | jq -s '[.[] | select(length > 0)]')
PAYLOAD=$(jq -n \
  --arg host "${HOST}" \
  --arg key "${INDEXNOW_KEY}" \
  --arg keyLocation "${SITE}/${INDEXNOW_KEY}.txt" \
  --argjson urlList "${URLS_JSON}" \
  '{host: $host, key: $key, keyLocation: $keyLocation, urlList: $urlList}')

BING_HTTP=$(curl -sS -o /tmp/indexnow_resp -w '%{http_code}' \
  -X POST -H 'Content-Type: application/json' \
  -d "${PAYLOAD}" \
  'https://www.bing.com/indexnow')

echo "HTTP: ${BING_HTTP}"
echo "Response: $(cat /tmp/indexnow_resp)"
echo ""

if [[ "${BING_HTTP}" =~ ^2 ]]; then
  echo "✓ Bing IndexNow accepted"
else
  echo "⚠ Bing IndexNow returned non-2xx; check key file is reachable at ${SITE}/${INDEXNOW_KEY}.txt"
fi

echo ""
echo "Done."
