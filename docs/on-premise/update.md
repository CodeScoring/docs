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

**Важно**: для обновления до версии **2023.31.0** или выше, необходимо предварительно выполнить следующие действия:

1. В зависимости от используемого Docker Compose:

- Если используется Docker Compose CodeScoring без изменений, необходимо взять актуальную версию файла `docker-compose.yml` из открытого репозитория Codescoring: https://github.com/CodeScoring/on-premise-docker-compose/blob/master/docker-compose.yml;
- Если используетcя собственный Docker Compose, требуется внести изменения в docker-compose.yaml согласно diff из следующего коммита: https://github.com/CodeScoring/on-premise-docker-compose/commit/197f40d083b7c71a115a63cf193281bc61c21b77).

2. Внести в `.env` файл две переменные со следующими значениями:

```
POSTGRES_HOST=psql
POSTGRES_PORT=5432
```

Если используется внешний Postgres, то в данные переменные необходимо проставить значения, соответствующие инстансу базы.
