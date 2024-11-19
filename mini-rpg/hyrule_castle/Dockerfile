FROM node:18-alpine

WORKDIR /app

COPY package.json ./

COPY package-lock.json ./

RUN npm install

COPY . ./

VOLUME ["/app/ressourcesJson"]

RUN npx tsc

CMD ["node", "hyrule_castle.js"]