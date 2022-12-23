#!/bin/bash

if [[ -z "${environment}" ]]; then
echo "environment is undefined"
else
runningenvironment="$environment"

case $runningenvironment in

  "dev")
    cd "/usr/share/nginx/html"
    find . -type f -exec sed -i -e 's/dev.itshere.com/dev.itshere.com/g' {} \;
    ;;

  "qa")
    cd "/usr/share/nginx/html"
    find . -type f -exec sed -i -e 's/dev.itshere.com/qa.itshere.com/g' {} \;
    find . -type f -exec sed -i -e 's/AIzaSyDEksCzAbC0kAihR6yBLfllyQSzboiadR0/AIzaSyD5Pyph41HjSmjC-tYM8_J14luuamnuBA4/g' {} \;
    ;;

  "stg")
    cd "/usr/share/nginx/html"
    find . -type f -exec sed -i -e 's/dev.itshere.com/stg.itshere.com/g' {} \;
    find . -type f -exec sed -i -e 's/AIzaSyDEksCzAbC0kAihR6yBLfllyQSzboiadR0/AIzaSyA6fSCQQJyEREnhIWxYq2EqsHKw-wgiEn8/g' {} \;
    find . -type f -exec sed -i -e 's/pay.sandbox.realexpayments.com/pay.realexpayments.com/g' {} \;
    ;;
  "prd")
    cd "/usr/share/nginx/html"
    find . -type f -exec sed -i -e 's/dev.itshere.com/itshere.com/g' {} \;
    find . -type f -exec sed -i -e 's/AIzaSyDEksCzAbC0kAihR6yBLfllyQSzboiadR0/AIzaSyA6fSCQQJyEREnhIWxYq2EqsHKw-wgiEn8/g' {} \;
    find . -type f -exec sed -i -e 's/pay.sandbox.realexpayments.com/pay.realexpayments.com/g' {} \;
    ;;


  *)
    echo "Oh my god you did not set the environment"
    ;;
esac


fi

sed -i -e "s,index.htm;,index.htm;\n        try_files \$uri /index.html;,g" /etc/nginx/conf.d/default.conf

nginx -g 'daemon off;'
