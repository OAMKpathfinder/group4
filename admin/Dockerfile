FROM node:latest as build

ENV VUE_APP_API_PROXY=
ENV BASE_URL=

WORKDIR /app
COPY admin/package*.json ./
RUN npm install
COPY admin/ .
RUN npm run build

FROM nginx:alpine

RUN mkdir /app

COPY --from=build /app/dist /usr/share/nginx/html
COPY admin/nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]
