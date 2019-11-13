FROM node:10-buster as build

WORKDIR /app
COPY backend/. /app

RUN echo "unsafe-perm = true" >> ~/.npmrc
RUN npm install
RUN npm install pm2 -g
RUN npm link pm2

EXPOSE 3000

CMD ["pm2-runtime", "index.js"]
