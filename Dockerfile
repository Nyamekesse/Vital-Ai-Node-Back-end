FROM node:16.15.1-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY prisma ./prisma/

RUN npx prisma generate

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["/bin/bash", "docker-entrypoint.sh"]
