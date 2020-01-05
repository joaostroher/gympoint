FROM node:12-alpine as builder
RUN apk --no-cache add yarn
WORKDIR /app
COPY frontend/package.json frontend/yarn.lock ./

RUN yarn --production

COPY frontend/public ./public
COPY frontend/src ./src
COPY frontend/config-overrides.js .
COPY frontend/.env.* ./

RUN yarn build

FROM node:12-alpine
RUN apk --no-cache add yarn
WORKDIR /app

COPY backend/package.json backend/yarn.lock ./

RUN yarn --production

COPY backend/src ./src
COPY backend/.sequelizerc .
COPY --from=builder /app/build ./public

EXPOSE 3333

CMD ["yarn", "start"]
