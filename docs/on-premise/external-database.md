---
hide:
  - footer
---

# Работа инсталляции CodeScoring в Docker Compose со внешней СУБД
1. Необходимо сконфигурировать соответствующие параметры в файле `.env`:
    - `POSTGRES_DB`
    - `POSTGRES_USER`
    - `POSTGRES_PASSWORD`
    - `POSTGRES_HOST`
    - `POSTGRES_PORT`
2. Для администрирования инсталляции, необходимо применять файл `external-db.override.yml`, который поставляется вместе с файлом `docker-compose.yml`:
    - Запуск инсталляции:
        ```bash
        docker compose -f ./docker-compose.yml -f external-db.override.yml up -d --force-recreate --remove-orphans --renew-anon-volumes
        ```
    - Просмотр логов:
        ```bash
        docker compose -f ./docker-compose.yml -f external-db.override.yml logs -f
        ```
    - Остановка инсталляции:
        ```bash
          docker compose -f ./docker-compose.yml -f external-db.override.yml down --remove-orphans
        ```

