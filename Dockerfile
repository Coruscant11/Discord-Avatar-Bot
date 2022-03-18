FROM node:17-alpine

WORKDIR /kiyoyo
COPY . .

RUN npm install --production
RUN node deploy-commands.js
ENTRYPOINT node main.js