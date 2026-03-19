#!/usr/bin/env bash
# Triggered by Strapi webhook when blog content changes.
# Rebuilds the frontend and prerenders blog pages.

set -e

export NVM_DIR="$HOME/.nvm"
. "$NVM_DIR/nvm.sh"
nvm use 24

LOCKFILE="/tmp/legible-rebuild.lock"
LOGFILE="/home/ubuntu/legible-web/rebuild.log"
WEB_DIR="/home/ubuntu/legible-web"

# Prevent concurrent builds
if [ -f "$LOCKFILE" ]; then
  echo "$(date): Build already in progress, skipping" >> "$LOGFILE"
  exit 0
fi

trap 'rm -f "$LOCKFILE"' EXIT
touch "$LOCKFILE"

echo "$(date): Rebuild triggered" >> "$LOGFILE"

cd "$WEB_DIR"
npm run build >> "$LOGFILE" 2>&1

echo "$(date): Rebuild complete" >> "$LOGFILE"
