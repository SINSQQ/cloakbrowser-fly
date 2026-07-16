#!/bin/bash
# start.sh — boot script for Fly.io

set -e

echo "[start] cloakbrowser-fly v1.0.0"
echo "[start] Node: $(node -v)"
echo "[start] Time: $(date -u)"

# Launch in background, log to stdout for Fly logs
exec node server.js
