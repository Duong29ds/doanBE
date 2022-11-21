FROM node:16-alpine AS development

ENV NODE_ENV development

WORKDIR /usr/src/app

COPY package.json ./

COPY yarn.lock ./

RUN yarn install --production=false

COPY . .

RUN yarn build

EXPOSE 5000



FROM node:16-alpine AS production

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app


COPY package.json ./

COPY yarn.lock ./

RUN yarn install --production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["yarn", "start:prod"]
