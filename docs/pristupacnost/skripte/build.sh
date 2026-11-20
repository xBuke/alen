#!/bin/bash
# Lokalni audit build: privremeno zamijeni google fontove lokalnima, builda, vrati original.
DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$DIR/../../.."   # korijen repozitorija
# Fontove (woff2) prethodno kopirati u src/lib/__localfonts/ (npm paketi @fontsource-variable/fraunces i instrument-sans).
cp src/lib/fonts.ts /tmp/fonts.orig.ts
cp "$DIR/fonts.local.ts" src/lib/fonts.ts
NEXT_PUBLIC_SITE_URL=${SITE:-http://localhost:3100} npm run build > /tmp/build.log 2>&1; rc=$?
cp /tmp/fonts.orig.ts src/lib/fonts.ts
tail -80 /tmp/build.log
exit $rc
