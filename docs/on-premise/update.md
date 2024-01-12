---
hide:
  - footer
---
# Обновление установки

1. Перейти в директорию с файлами запуска:

    ```bash linenums="1"
    cd /path/to/docker-compose
    ```

2. Выполнить команду обновления образов:


    ```bash linenums="2"
    docker-compose -p PROJECT_NAME pull
    ```

3. Перезапустить инсталляцию:

    ```bash linenums="3"
    docker-compose -p PROJECT_NAME up -d --force-recreate
    ```

**Важно**: для обновления до версии **2023.38.0** или выше, необходимо предварительно выполнить следующие действия:

1. В зависимости от используемого Docker Compose:

    - Если используется Docker Compose CodeScoring без изменений, необходимо взять актуальную версию файлов `docker-compose.yml`, `app.env` и `.env` из [открытого репозитория Codescoring](https://github.com/CodeScoring/on-premise-docker-compose);
    - Если используетcя собственный Docker Compose, требуется внести изменения в `docker-compose.yml` согласно diff из [коммита](https://github.com/CodeScoring/on-premise-docker-compose/commit/913b2869ecc572541ea9dfd7a6c070d41677db58).

2. Внести в `.env` файл две переменные со следующими значениями:

```
POSTGRES_HOST=psql
POSTGRES_PORT=5432
```

Если используется внешний Postgres, то в данные переменные необходимо проставить значения, соответствующие инстансу базы.
