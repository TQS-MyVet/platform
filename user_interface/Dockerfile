FROM node:21-alpine

WORKDIR /web_app

COPY package.json package-lock.json ./

RUN npm install --silent

COPY . .

EXPOSE 3001
CMD npm run dev