#!/bin/sh
set -e

WEB_ROOT=/usr/share/nginx/html
CONFIG_FILE="${WEB_ROOT}/config.js"

if [ -f "$CONFIG_FILE" ]; then
  : "${REACT_APP_OWM_API_KEY:=}"
  sed -i "s|__REACT_APP_OWM_API_KEY__|${REACT_APP_OWM_API_KEY}|g" "$CONFIG_FILE"
fi

exec "$@"

