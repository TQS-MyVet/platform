FROM node:21-alpine

WORKDIR /web_app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000
CMD npm run dev 