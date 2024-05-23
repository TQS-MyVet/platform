FROM node:21

WORKDIR /web_app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000
CMD npm run dev 