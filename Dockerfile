FROM node:16.17.0

WORKDIR /web

COPY package*.json ./

COPY lerna.json ./

COPY yarn.lock ./

RUN yarn install

COPY . ./

RUN yarn lerna bootstrap

RUN rm -rf /web/packages/server/dist/
RUN rm -rf /web/packages/client/dist/

RUN yarn build

CMD yarn preview --scope client
