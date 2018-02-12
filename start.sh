#!/bin/bash -e

sed -i \
    -e "s/BART_KEY/$BART_KEY/g" \
    -e "s/AC_TRANSIT_TOKEN/$AC_TRANSIT_TOKEN/" \
    /usr/share/nginx/html/BART.js

nginx -g "daemon off;"
