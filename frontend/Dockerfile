FROM node:12-alpine

WORKDIR /app

RUN apk update && apk upgrade
RUN apk add git

COPY ./frontend /app
RUN npm install

RUN npm run build

COPY frontend/nginx.conf /etc/nginx/nginx.conf
EXPOSE 8000

CMD [ "npm", "start" ]