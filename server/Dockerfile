FROM node:20

WORKDIR /usr/src/app

COPY  package* .

RUN npm install

COPY . .

EXPOSE 3000

ENV PORT=3000

CMD [ "node" ,"dist/index.js"]