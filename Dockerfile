FROM node:18-alpine as builder

ARG ENV_NAME="staging"

WORKDIR /app

COPY "package.json" "yarn.lock" ./
COPY "./.env.${ENV_NAME}" ./.env

RUN yarn
COPY . .

RUN yarn build

CMD node dist/src/services/api/api.js