# DEPLOY HEROKU

## CLIENT

### Dockerfile
```
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
```

### Запустить команды
```
docker build . -t chicago-client
docker run -p 3000:3000 -d chicago-client
```

Чтобы выбрать проект на хероку
```
heroku git:remote -a chicago-client
```

и запустить команды отсюда
https://dashboard.heroku.com/apps/chicago-client/deploy/heroku-container



## SERVER

### Dockerfile
```
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

CMD yarn preview --scope server
```

### Запустить команды
```
docker build . -t chicago-api
docker run -p 3001:3001 -d chicago-api
```

Чтобы выбрать проект на хероку
```
heroku git:remote -a chicago-api
```

и запустить команды отсюда
https://dashboard.heroku.com/apps/chicago-api/deploy/heroku-container



Рестарт бэк
heroku restart -a chicago-api



