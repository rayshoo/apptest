FROM node:14.17.5
LABEL maintainer "rayshoo <fire@dragonz.dev>"
USER root
WORKDIR /root/app
COPY app /root/app
RUN npm install
RUN npm install -g pm2
CMD ["pm2-docker", "app.js"]
EXPOSE 3000