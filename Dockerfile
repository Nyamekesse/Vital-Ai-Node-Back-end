FROM node:16.15.1-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY prisma ./prisma/

RUN npx prisma generate

COPY . .

RUN npm run build

RUN apk update && apk add bash

SHELL ["/bin/bash", "-c"]

EXPOSE 8080

CMD ["/bin/bash", "docker-entrypoint.sh"]
