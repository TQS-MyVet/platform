FROM node:21-alpine

WORKDIR /web_app

COPY package.json package-lock.json ./

RUN npm install --silent

COPY . .

EXPOSE 3002
CMD npm run dev -- --host 0.0.0.0