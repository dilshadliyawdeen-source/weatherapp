#!/bin/sh
set -e
WEB_ROOT=/usr/share/nginx/html
CONFIG_FILE="${WEB_ROOT}/config.js"
if [ -f "$CONFIG_FILE" ]; then
  : "${REACT_APP_OWM_API_KEY:=}"
  : "${APP_NAME:=}"
  sed -i "s|__REACT_APP_OWM_API_KEY__|${REACT_APP_OWM_API_KEY}|g" "$CONFIG_FILE"
  sed -i "s|__APP_NAME__|${APP_NAME}|g" "$CONFIG_FILE"
fi
exec "$@"
