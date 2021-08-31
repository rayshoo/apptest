FROM nginx
RUN mkdir -p /tmp/nginx 
COPY ./app.conf /etc/nginx/conf.d/app.conf
WORKDIR /etc/nginx 
CMD ["nginx", "-g", "daemon off;"]