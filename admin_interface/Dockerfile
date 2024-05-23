FROM node:21-alpine

WORKDIR /web_app

COPY package.json package-lock.lock ./

RUN yarn install --silent

COPY . .

EXPOSE 3000
CMD yarn run dev 