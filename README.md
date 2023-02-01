### Как запускать?

1. Убедитесь что у вас установлен `node v.16` и `docker`
2. Выполните команду `yarn bootstrap` - это обязательный шаг, без него ничего работать не будет :)
3. Выполните команду `yarn dev`
4. Выполните команду `yarn dev --scope=client` чтобы запустить только клиент
5. Выполните команду `yarn dev --scope=server` чтобы запустить только server


### Как добавить зависимости?
В этом проекте используется `monorepo` на основе [`lerna`](https://github.com/lerna/lerna)

Чтобы добавить зависимость для клиента
```yarn lerna add {your_dep} --scope client```

Для сервера
```yarn lerna add {your_dep} --scope server```

И для клиента и для сервера
```yarn lerna add {your_dep}```


Если вы хотите добавить dev зависимость, проделайте то же самое, но с флагом `dev`
```yarn lerna add {your_dep} --dev --scope server```


### Тесты

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)

```yarn test```

### Линтинг

```yarn lint```

### Форматирование prettier

```yarn format```

### Production build

```yarn build```

И чтобы посмотреть что получилось


`yarn preview --scope client`
`yarn preview --scope server`

## Хуки
В проекте используется [lefthook](https://github.com/evilmartians/lefthook)
Если очень-очень нужно пропустить проверки, используйте `--no-verify` (но не злоупотребляйте :)

## Ой, ничего не работает :(

Откройте issue, я приду :)

## Автодеплой статики на vercel
Зарегистрируйте аккаунт на [vercel](https://vercel.com/)
Следуйте [инструкции](https://vitejs.dev/guide/static-deploy.html#vercel-for-git)
В качестве `root directory` укажите `packages/client`

Все ваши PR будут автоматически деплоиться на vercel. URL вам предоставит деплоящий бот

## Production окружение в докере
Перед первым запуском:
- Выполните `node init.js`

`docker compose up` - запустит четыре сервиса
1. nginx, раздающий клиентскую статику (client)
2. node, ваш сервер (server)
3. postgres, вашу базу данных (postgres)
4. pgAdmin для визуального ковыряния в базе, по умолчанию доступен на 8080 порту, креденшелы в `.env`

- В pgAdmin должна быть видна база team-08-wonderful-game, это собственно наша база, если её нет - паникуйте.
Потом пкм по Servers => create => server => заполнить любой Name => Connection => host: host.docker.internal;
  database, user, password - из .env => save. Если база не появилась, продолжайте паниковать.
- Если получаете ошибку `user declined directory sharing`, идите на дашборд докера -> settings ->Resources -> FileSharing. Добавьте рабочую директорию, нажмите Apply & Restart, пересоберите образ.

Если вам понадобится только один сервис, просто уточните какой в команде
`docker compose up {sevice_name}`, например `docker compose up server`

## Git
- Рабочая ветка `dev`, в неё сливать уже готовую для релиза задачу, прошедшую ревью.
- Вносить какие-либо изменения в `dev` можно только через pr с прошедшим 2 code-review
- Формат именования веток task-{ID}-{DESCRIPTION}
- Ветка `main` - релизная
