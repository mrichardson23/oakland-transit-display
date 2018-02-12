FROM nginx
COPY public/ /usr/share/nginx/html/
COPY start.sh /start.sh
CMD /start.sh
